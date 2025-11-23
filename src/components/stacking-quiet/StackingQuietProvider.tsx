'use client';

import {createContext, useContext, useMemo, useState, type ReactNode} from 'react';

import {DEFAULT_STATE, type SimulationState} from '@/lib/audioSimulation';

type NoiseToggles = {
  keyboard: boolean;
  chatter: boolean;
  sirens: boolean;
};

type StackingQuietContextValue = {
  baselineState: SimulationState;
  noisy: {
    toggles: NoiseToggles;
    setToggle: (key: keyof NoiseToggles, next: boolean) => void;
    state: SimulationState;
  };
  pink: {
    volume: number;
    setVolume: (next: number) => void;
    getState: (opts?: {withAmbientNoise?: boolean}) => SimulationState;
  };
  anc: {
    intensity: number;
    setIntensity: (next: number) => void;
    state: SimulationState;
  };
  combo: {
    volume: number;
    setVolume: (next: number) => void;
    state: SimulationState;
  };
};

const StackingQuietContext = createContext<StackingQuietContextValue | null>(null);

export function StackingQuietProvider({children}: {children: ReactNode}) {
  const baselineState = useMemo<SimulationState>(() => ({...DEFAULT_STATE}), []);

  const [toggles, setToggles] = useState<NoiseToggles>({
    keyboard: false,
    chatter: true,
    sirens: false,
  });

  const noisyState = useMemo<SimulationState>(
    () => ({
      ...DEFAULT_STATE,
      keyboardVolume: toggles.keyboard ? 0.8 : 0,
      chatterVolume: toggles.chatter ? 0.8 : 0,
      sirenVolume: toggles.sirens ? 0.7 : 0,
    }),
    [toggles]
  );

  const [pinkVolume, setPinkVolume] = useState(0.7); // 0-1
  const [ancIntensity, setAncIntensity] = useState(0.5); // 0-1
  const [comboVolume, setComboVolume] = useState(0.4); // 0-1

  const pinkGetState = useMemo(
    () =>
      ({withAmbientNoise = true}: {withAmbientNoise?: boolean} = {}) =>
        ({
          ...DEFAULT_STATE,
          chatterVolume: withAmbientNoise ? 0.7 : 0,
          pinkNoiseVolume: pinkVolume,
        }) as SimulationState,
    [pinkVolume]
  );

  const ancState = useMemo<SimulationState>(
    () => ({
      ...DEFAULT_STATE,
      keyboardVolume: 0.8,
      chatterVolume: 0.7,
      ancGain: ancIntensity,
    }),
    [ancIntensity]
  );

  const comboState = useMemo<SimulationState>(
    () => ({
      ...DEFAULT_STATE,
      keyboardVolume: 0.6,
      chatterVolume: 0.6,
      ancGain: 1,
      pinkNoiseVolume: comboVolume,
    }),
    [comboVolume]
  );

  const value = useMemo<StackingQuietContextValue>(
    () => ({
      baselineState,
      noisy: {
        toggles,
        setToggle: (key, next) => setToggles(prev => ({...prev, [key]: next})),
        state: noisyState,
      },
      pink: {
        volume: Math.round(pinkVolume * 100),
        setVolume: next => setPinkVolume(Math.max(0, Math.min(100, next)) / 100),
        getState: pinkGetState,
      },
      anc: {
        intensity: Math.round(ancIntensity * 100),
        setIntensity: next => setAncIntensity(Math.max(0, Math.min(100, next)) / 100),
        state: ancState,
      },
      combo: {
        volume: Math.round(comboVolume * 100),
        setVolume: next => setComboVolume(Math.max(0, Math.min(100, next)) / 100),
        state: comboState,
      },
    }),
    [
      ancIntensity,
      ancState,
      baselineState,
      comboState,
      comboVolume,
      pinkGetState,
      pinkVolume,
      noisyState,
      toggles,
    ]
  );

  return <StackingQuietContext.Provider value={value}>{children}</StackingQuietContext.Provider>;
}

export function useStackingQuiet() {
  const ctx = useContext(StackingQuietContext);
  if (!ctx) {
    throw new Error('useStackingQuiet must be used within StackingQuietProvider');
  }
  return ctx;
}
