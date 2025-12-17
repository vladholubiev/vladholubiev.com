import {useCallback, useEffect, useRef, useState} from 'react';

const DEFAULT_VOLUME = 0.25;

export type NoiseType = 'white' | 'pink' | 'brown';

type NoiseBuffers = Record<NoiseType, AudioBuffer | null>;
type NoiseEngine = 'worklet' | 'buffer';

export function useNoise() {
  const [activeNoise, setActiveNoise] = useState<NoiseType | null>('pink');
  const [volume, setVolume] = useState(DEFAULT_VOLUME);
  const [isInitialized, setIsInitialized] = useState(false);
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);

  const audioContextRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null);
  const workletNodeRef = useRef<AudioWorkletNode | null>(null);
  const buffersRef = useRef<NoiseBuffers>({white: null, pink: null, brown: null});
  const engineRef = useRef<NoiseEngine>('buffer');

  // Create audio context and pre-generate noise buffers.
  useEffect(() => {
    if (typeof window === 'undefined' || audioContextRef.current) return;

    const AudioContextCtor =
      window.AudioContext ||
      (window as unknown as {webkitAudioContext?: typeof AudioContext}).webkitAudioContext;

    if (!AudioContextCtor) return;

    const ctx = new AudioContextCtor();
    const gain = ctx.createGain();
    const analyser = ctx.createAnalyser();

    gain.gain.value = DEFAULT_VOLUME;
    analyser.fftSize = 2048;

    gain.connect(analyser);
    analyser.connect(ctx.destination);

    audioContextRef.current = ctx;
    gainNodeRef.current = gain;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAnalyser(analyser);
    let canceled = false;

    const init = async () => {
      let engine: NoiseEngine = 'buffer';

      try {
        await ctx.audioWorklet.addModule('/worklets/noise-generator.js');
        engine = 'worklet';
      } catch {
        engine = 'buffer';
      }

      if (canceled) return;
      engineRef.current = engine;

      if (engine === 'buffer') {
        buffersRef.current = {
          white: createWhiteNoise(ctx),
          pink: createPinkNoise(ctx),
          brown: createBrownNoise(ctx),
        };
      }

      setIsInitialized(true);
    };

    void init();

    return () => {
      canceled = true;

      if (workletNodeRef.current) {
        try {
          workletNodeRef.current.port.postMessage({type: 'dispose'});
        } catch {
          // ignore
        }
        workletNodeRef.current.disconnect();
        workletNodeRef.current = null;
      }
      if (sourceNodeRef.current) {
        try {
          sourceNodeRef.current.stop();
        } catch {
          // ignore
        }
        sourceNodeRef.current.disconnect();
        sourceNodeRef.current = null;
      }
      gain.disconnect();
      analyser.disconnect();
      ctx.close();
      setAnalyser(null);
    };
  }, []);

  // Smoothly apply volume updates.
  useEffect(() => {
    const ctx = audioContextRef.current;
    const gain = gainNodeRef.current;

    if (ctx && gain) {
      gain.gain.setTargetAtTime(volume, ctx.currentTime, 0.1);
    }
  }, [volume]);

  // Start/stop playback whenever the active noise changes.
  useEffect(() => {
    const ctx = audioContextRef.current;
    const gain = gainNodeRef.current;

    if (!ctx || !gain || !isInitialized) return;

    if (activeNoise) {
      if (ctx.state === 'suspended') {
        void ctx.resume();
      }

      if (sourceNodeRef.current) {
        try {
          sourceNodeRef.current.stop();
        } catch {
          // ignore
        }
        sourceNodeRef.current.disconnect();
        sourceNodeRef.current = null;
      }

      if (workletNodeRef.current) {
        try {
          workletNodeRef.current.port.postMessage({type: 'dispose'});
        } catch {
          // ignore
        }
        workletNodeRef.current.disconnect();
        workletNodeRef.current = null;
      }

      if (engineRef.current === 'worklet') {
        try {
          const node = new AudioWorkletNode(ctx, 'noise-generator', {
            numberOfInputs: 0,
            numberOfOutputs: 1,
            outputChannelCount: [1],
          });
          node.port.postMessage({type: 'setNoiseType', noiseType: activeNoise});
          node.connect(gain);
          workletNodeRef.current = node;
          return;
        } catch {
          engineRef.current = 'buffer';
          buffersRef.current = {
            white: createWhiteNoise(ctx),
            pink: createPinkNoise(ctx),
            brown: createBrownNoise(ctx),
          };
        }
      }

      const buffer = buffersRef.current[activeNoise];
      if (!buffer) return;

      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.loop = true;
      source.connect(gain);
      source.start();
      sourceNodeRef.current = source;
      return;
    }

    if (workletNodeRef.current) {
      try {
        workletNodeRef.current.port.postMessage({type: 'dispose'});
      } catch {
        // ignore
      }
      workletNodeRef.current.disconnect();
      workletNodeRef.current = null;
    }

    if (sourceNodeRef.current) {
      try {
        sourceNodeRef.current.stop();
      } catch {
        // ignore
      }
      sourceNodeRef.current.disconnect();
      sourceNodeRef.current = null;
    }
  }, [activeNoise, isInitialized]);

  const hasResumedRef = useRef(false);

  const resumeAudio = useCallback(async () => {
    const ctx = audioContextRef.current;
    if (!ctx) return;
    if (ctx.state === 'suspended') {
      await ctx.resume();
    }
    if (ctx.state === 'running') {
      hasResumedRef.current = true;
    }
  }, []);

  // Best-effort auto-resume on user interactions.
  useEffect(() => {
    const handler = () => {
      if (hasResumedRef.current) return;
      void resumeAudio();
    };

    window.addEventListener('pointerdown', handler, {capture: true});
    window.addEventListener('pointerup', handler, {capture: true});
    window.addEventListener('click', handler, {capture: true});
    window.addEventListener('keydown', handler, {capture: true});
    window.addEventListener('keyup', handler, {capture: true});

    return () => {
      window.removeEventListener('pointerdown', handler, {capture: true});
      window.removeEventListener('pointerup', handler, {capture: true});
      window.removeEventListener('click', handler, {capture: true});
      window.removeEventListener('keydown', handler, {capture: true});
      window.removeEventListener('keyup', handler, {capture: true});
    };
  }, [resumeAudio]);

  // Resume on tab focus/visibility changes and immediately on mount (safe no-op if blocked).
  useEffect(() => {
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') void resumeAudio();
    };
    const handleFocus = () => {
      void resumeAudio();
    };

    void resumeAudio();
    window.addEventListener('visibilitychange', handleVisibility);
    window.addEventListener('focus', handleFocus);

    return () => {
      window.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('focus', handleFocus);
    };
  }, [resumeAudio]);

  // Attempt resume once on mount to catch fast navigations where the first gesture already happened.
  useEffect(() => {
    void resumeAudio();
  }, [resumeAudio]);

  const toggleNoise = useCallback((type: NoiseType) => {
    setActiveNoise(current => (current === type ? null : type));
  }, []);

  return {
    activeNoise,
    analyser,
    resumeAudio,
    setVolume,
    toggleNoise,
    volume,
  } as const;
}

function createWhiteNoise(ctx: AudioContext) {
  const bufferSize = 10 * ctx.sampleRate;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const output = buffer.getChannelData(0);

  for (let i = 0; i < bufferSize; i += 1) {
    output[i] = Math.random() * 2 - 1;
  }

  return buffer;
}

function createPinkNoise(ctx: AudioContext) {
  const bufferSize = 10 * ctx.sampleRate;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const output = buffer.getChannelData(0);

  let b0 = 0;
  let b1 = 0;
  let b2 = 0;
  let b3 = 0;
  let b4 = 0;
  let b5 = 0;
  let b6 = 0;

  for (let i = 0; i < bufferSize; i += 1) {
    const white = Math.random() * 2 - 1;
    b0 = 0.99886 * b0 + white * 0.0555179;
    b1 = 0.99332 * b1 + white * 0.0750759;
    b2 = 0.969 * b2 + white * 0.153852;
    b3 = 0.8665 * b3 + white * 0.3104856;
    b4 = 0.55 * b4 + white * 0.5329522;
    b5 = -0.7616 * b5 - white * 0.016898;
    output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
    output[i] *= 0.11;
    b6 = white * 0.115926;
  }

  return buffer;
}

function createBrownNoise(ctx: AudioContext) {
  const bufferSize = 10 * ctx.sampleRate;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const output = buffer.getChannelData(0);
  let lastOut = 0;

  for (let i = 0; i < bufferSize; i += 1) {
    const white = Math.random() * 2 - 1;
    output[i] = (lastOut + 0.02 * white) / 1.02;
    lastOut = output[i];
    output[i] *= 3.5;
  }

  return buffer;
}
