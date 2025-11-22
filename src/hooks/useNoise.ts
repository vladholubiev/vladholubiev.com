import {useCallback, useEffect, useRef, useState} from 'react';

const DEFAULT_VOLUME = 0.25;

export type NoiseType = 'white' | 'pink' | 'brown';

type NoiseBuffers = Record<NoiseType, AudioBuffer | null>;

export function useNoise() {
  const [activeNoise, setActiveNoise] = useState<NoiseType | null>(null);
  const [volume, setVolume] = useState(DEFAULT_VOLUME);
  const [isInitialized, setIsInitialized] = useState(false);
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);

  const audioContextRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null);
  const buffersRef = useRef<NoiseBuffers>({white: null, pink: null, brown: null});

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
    buffersRef.current = {
      white: createWhiteNoise(ctx),
      pink: createPinkNoise(ctx),
      brown: createBrownNoise(ctx),
    };

    setIsInitialized(true);

    return () => {
      if (sourceNodeRef.current) {
        sourceNodeRef.current.stop();
        sourceNodeRef.current.disconnect();
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
        sourceNodeRef.current.stop();
        sourceNodeRef.current.disconnect();
      }

      const buffer = buffersRef.current[activeNoise];
      if (!buffer) return;

      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.loop = true;
      source.connect(gain);
      source.start();
      sourceNodeRef.current = source;
    } else if (sourceNodeRef.current) {
      sourceNodeRef.current.stop();
      sourceNodeRef.current.disconnect();
      sourceNodeRef.current = null;
    }
  }, [activeNoise, isInitialized]);

  const toggleNoise = useCallback((type: NoiseType) => {
    setActiveNoise(current => (current === type ? null : type));
  }, []);

  return {
    activeNoise,
    analyser,
    setVolume,
    toggleNoise,
    volume,
  } as const;
}

function createWhiteNoise(ctx: AudioContext) {
  const bufferSize = 2 * ctx.sampleRate;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const output = buffer.getChannelData(0);

  for (let i = 0; i < bufferSize; i += 1) {
    output[i] = Math.random() * 2 - 1;
  }

  return buffer;
}

function createPinkNoise(ctx: AudioContext) {
  const bufferSize = 2 * ctx.sampleRate;
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
  const bufferSize = 2 * ctx.sampleRate;
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
