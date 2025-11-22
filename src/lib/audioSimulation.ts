// Simulation helpers for the stacking-quiet article visualizers
// Ported from the standalone ANC + pink noise playground

export const SAMPLE_RATE = 100;
export const NUM_POINTS = 200;

export type SimulationState = {
  // Noise Sources (0.0 to 1.0)
  keyboardVolume: number;
  chatterVolume: number;
  sirenVolume: number;

  // System Controls (0.0 to 1.0)
  ancGain: number;
  pinkNoiseVolume: number;
};

export const DEFAULT_STATE: SimulationState = {
  keyboardVolume: 0,
  chatterVolume: 0,
  sirenVolume: 0,
  ancGain: 0,
  pinkNoiseVolume: 0,
};

// Generate wave data points for Time Domain visualization
export function generateWaveData(time: number, state: SimulationState) {
  const points: number[] = [];

  for (let i = 0; i < NUM_POINTS; i++) {
    let amplitude = 0;
    const t = time + i * 0.05; // time step

    // 1. Low Frequency (Keyboard/Rumble)
    // Low freq sine + periodic clicks
    if (state.keyboardVolume > 0) {
      // Rumble component
      const rumble = Math.sin(t * 0.5) * 0.5 + Math.sin(t * 0.2) * 0.3;

      // Click component (sharp spikes)
      const click = Math.sin(t * 15) * Math.pow(Math.sin(t * 0.8), 20);

      // ANC Effect on Low Freq: High reduction
      // residual factor = 1 - (ancGain * 0.9) -> implies max 90% reduction
      const ancFactor = 1 - state.ancGain * 0.85;

      amplitude += (rumble * 0.8 + click * 0.4) * state.keyboardVolume * ancFactor;
    }

    // 2. Mid Freq (Chatter)
    // Bursty, irregular
    if (state.chatterVolume > 0) {
      // Amplitude modulation to simulate speech cadence
      const envelope = Math.abs(Math.sin(t * 1.5) + Math.sin(t * 0.7)) * 0.5;
      const voice = Math.sin(t * 5) * Math.sin(t * 8) * envelope;

      // ANC Effect on Mid Freq: Low reduction
      const ancFactor = 1 - state.ancGain * 0.2;

      amplitude += voice * state.chatterVolume * ancFactor;
    }

    // 3. High Freq (Siren)
    // Constant piercing wave
    if (state.sirenVolume > 0) {
      // Fast sine wave
      const siren = Math.sin(t * 12) * 0.8;

      // ANC Effect on High Freq: Very low reduction (mostly passive isolation, not modeled here)
      const ancFactor = 1 - state.ancGain * 0.05;

      amplitude += siren * state.sirenVolume * ancFactor;
    }

    // 4. Pink Noise (Masking)
    if (state.pinkNoiseVolume > 0) {
      // Random noise
      const noise = (Math.random() - 0.5) * 0.6;
      amplitude += noise * state.pinkNoiseVolume;
    }

    // Soft clipping
    amplitude = Math.max(-1.5, Math.min(1.5, amplitude));

    points.push(amplitude);
  }
  return points;
}

// Generate spectrum data for Frequency Domain visualization
export function generateSpectrumData(state: SimulationState) {
  const data = [];
  // 40 bars representing 20Hz - 20kHz

  for (let i = 0; i < 40; i++) {
    let amp = 0;
    // i: 0-10 (Low), 11-25 (Mid), 26-40 (High)

    // 1. Keyboard (Low end dominance)
    if (state.keyboardVolume > 0) {
      if (i < 12) {
        // Decaying slope
        const shape = 1.0 - i / 12;
        // ANC heavily affects this range
        const reduction = 1 - state.ancGain * 0.9;
        amp += shape * state.keyboardVolume * reduction;
      }
      // Mechanical clicks (high freq snap)
      if (i > 30 && i < 35) {
        amp += 0.1 * state.keyboardVolume;
      }
    }

    // 2. Chatter (Mid range)
    if (state.chatterVolume > 0) {
      if (i > 12 && i < 28) {
        // Hump shape centered at 20
        const dist = Math.abs(i - 20);
        const shape = Math.max(0, 1 - dist / 8);
        // ANC weakly affects this
        const reduction = 1 - state.ancGain * 0.2;
        amp += shape * state.chatterVolume * reduction;
      }
    }

    // 3. Siren (High Mid)
    if (state.sirenVolume > 0) {
      if (i > 25 && i < 32) {
        // Sharp peak
        const dist = Math.abs(i - 29);
        const shape = Math.max(0, 1 - dist / 2);
        // ANC barely affects this
        const reduction = 1 - state.ancGain * 0.05;
        amp += shape * state.sirenVolume * reduction;
      }
    }

    // 4. Pink Noise (1/f slope across whole spectrum)
    if (state.pinkNoiseVolume > 0) {
      // 1/f approximation: linear drop in this log-ish scale view
      const noiseFloor = (0.4 - i * 0.008) * state.pinkNoiseVolume;

      // Add to signal, or raise floor?
      // Masking logic: The noise "covers" signals below it.
      // Visually, we stack it or take max.
      // For spectrum view, adding is more accurate to physical sound pressure
      amp += noiseFloor;

      // Ensure a minimum "fuzz" everywhere
      amp += Math.random() * 0.02 * state.pinkNoiseVolume;
    }

    // Jitter
    amp += Math.random() * 0.02;

    // Visibility floor: ensure single-source toggles still show energy
    if (state.keyboardVolume > 0 && i < 12) {
      const floor = 0.08 * state.keyboardVolume;
      amp = Math.max(amp, floor);
    }
    if (state.chatterVolume > 0 && i >= 12 && i < 28) {
      const floor = 0.06 * state.chatterVolume;
      amp = Math.max(amp, floor);
    }
    if (state.sirenVolume > 0 && i >= 25) {
      const floor = 0.05 * state.sirenVolume;
      amp = Math.max(amp, floor);
    }

    data.push({f: i, a: amp});
  }
  return data;
}
