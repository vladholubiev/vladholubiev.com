'use client';

import {useMemo, useState} from 'react';
import * as Slider from '@radix-ui/react-slider';

import {DEFAULT_STATE, type SimulationState} from '@/lib/audioSimulation';
import {SpectrumVisualizer} from '@/components/stacking-quiet/SpectrumVisualizer';
import {WaveVisualizer} from '@/components/stacking-quiet/WaveVisualizer';
import {Switch} from '@/components/ui/switch';

const cardClass = 'rounded-2xl border border-zinc-800/40 bg-zinc-900/80 p-0 sm:p-0 shadow-lg';

const thumbClass =
  'block h-5 w-5 rounded-full border border-zinc-300 bg-white shadow-[0_6px_18px_rgba(0,0,0,0.4)] focus:outline-none focus:ring-2 focus:ring-ua-blue-400 focus:ring-offset-2 focus:ring-offset-zinc-900';

type SliderControlProps = {
  label: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  helper?: string;
  onChange: (value: number) => void;
};

function SliderControl({
  label,
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  helper,
}: SliderControlProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm font-semibold text-zinc-100">
        <span>{label}</span>
        <span className="text-xs font-mono text-zinc-400">{value}%</span>
      </div>
      <Slider.Root
        className="relative flex h-6 w-full items-center"
        value={[value]}
        min={min}
        max={max}
        step={step}
        onValueChange={([val]) => onChange(val)}
        aria-label={label}
      >
        <Slider.Track className="relative h-2 w-full rounded-full bg-zinc-800">
          <Slider.Range className="absolute h-full rounded-full bg-gradient-to-r from-ua-blue-400 via-ua-blue-500 to-ua-yellow-500" />
        </Slider.Track>
        <Slider.Thumb className={thumbClass} />
      </Slider.Root>
      {helper ? <p className="text-[12px] text-zinc-400">{helper}</p> : null}
    </div>
  );
}

type ToggleRowProps = {
  label: string;
  description: string;
  checked: boolean;
  onChange: (next: boolean) => void;
};

function ToggleRow({label, description, checked, onChange}: ToggleRowProps) {
  const toggle = () => onChange(!checked);

  return (
    <div
      role="switch"
      tabIndex={0}
      aria-checked={checked}
      onClick={toggle}
      onKeyDown={event => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          toggle();
        }
      }}
      className="flex w-full items-start justify-between rounded-2xl border border-zinc-200/70 bg-white/80 px-4 py-3 text-left shadow-sm transition hover:border-ua-blue-300/70 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-ua-blue-400 focus:ring-offset-2 focus:ring-offset-white dark:border-zinc-800/80 dark:bg-zinc-900/90 dark:hover:border-ua-blue-400/60 dark:focus:ring-offset-zinc-900"
    >
      <div className="pr-4">
        <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{label}</p>
        <p className="text-[12px] text-zinc-600 dark:text-zinc-400">{description}</p>
      </div>
      <Switch
        checked={checked}
        onCheckedChange={onChange}
        onClick={event => event.stopPropagation()}
        className="mt-1 h-6 w-11 shrink-0 data-[state=checked]:bg-ua-blue-500 data-[state=unchecked]:bg-zinc-300 dark:data-[state=unchecked]:bg-zinc-700"
      />
    </div>
  );
}

export function BaselineBlock() {
  const baselineState: SimulationState = useMemo(() => ({...DEFAULT_STATE}), []);

  return (
    <div className={cardClass}>
      <SpectrumVisualizer state={baselineState} />
    </div>
  );
}

export function NoisyBlock() {
  const [noiseToggles, setNoiseToggles] = useState({
    chatter: false,
    keyboard: false,
    sirens: false,
  });

  const noisyState: SimulationState = useMemo(
    () => ({
      ...DEFAULT_STATE,
      keyboardVolume: noiseToggles.keyboard ? 0.8 : 0,
      chatterVolume: noiseToggles.chatter ? 0.8 : 0,
      sirenVolume: noiseToggles.sirens ? 0.7 : 0,
    }),
    [noiseToggles]
  );

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <ToggleRow
          label="Keyboard / train rumble"
          description="Low-frequency hum with mechanical spikes"
          checked={noiseToggles.keyboard}
          onChange={checked => setNoiseToggles(state => ({...state, keyboard: checked}))}
        />
        <ToggleRow
          label="Human chatter"
          description="Mid-frequency bursts around 500Hz–3kHz"
          checked={noiseToggles.chatter}
          onChange={checked => setNoiseToggles(state => ({...state, chatter: checked}))}
        />
        <ToggleRow
          label="Sharp alarms"
          description="High-frequency beeps and sirens"
          checked={noiseToggles.sirens}
          onChange={checked => setNoiseToggles(state => ({...state, sirens: checked}))}
        />
      </div>
      <WaveVisualizer state={noisyState} />
      <SpectrumVisualizer state={noisyState} />
    </div>
  );
}

export function AncBlock() {
  const [ancComparison, setAncComparison] = useState(50);

  const ancState: SimulationState = useMemo(
    () => ({
      ...DEFAULT_STATE,
      keyboardVolume: 0.8,
      chatterVolume: 0.7,
      ancGain: ancComparison / 100,
    }),
    [ancComparison]
  );

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-zinc-800/50 bg-zinc-900/80 px-4 py-3 shadow-lg">
        <SliderControl label="ANC intensity" value={ancComparison} onChange={setAncComparison} />
      </div>
      <WaveVisualizer state={ancState} />
      <SpectrumVisualizer state={ancState} />
    </div>
  );
}

export function PinkNoiseBlock() {
  const [pinkNoiseVolume, setPinkNoiseVolume] = useState(70);

  const pinkNoiseState: SimulationState = useMemo(
    () => ({
      ...DEFAULT_STATE,
      chatterVolume: 0.7,
      pinkNoiseVolume: pinkNoiseVolume / 100,
    }),
    [pinkNoiseVolume]
  );

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-zinc-200/60 bg-white/80 px-4 py-3 shadow-sm dark:border-zinc-800/60 dark:bg-zinc-900/80">
        <SliderControl
          label="Pink noise volume"
          value={pinkNoiseVolume}
          onChange={setPinkNoiseVolume}
        />
      </div>
      <WaveVisualizer state={pinkNoiseState} />
      <SpectrumVisualizer state={pinkNoiseState} />
    </div>
  );
}

export function ComboBlock() {
  const [pinkNoiseWithAnc, setPinkNoiseWithAnc] = useState(40);

  const comboState: SimulationState = useMemo(
    () => ({
      ...DEFAULT_STATE,
      keyboardVolume: 0.6,
      chatterVolume: 0.6,
      ancGain: 1,
      pinkNoiseVolume: pinkNoiseWithAnc / 100,
    }),
    [pinkNoiseWithAnc]
  );

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-zinc-200/60 bg-white/80 px-4 py-3 shadow-sm dark:border-zinc-800/60 dark:bg-zinc-900/80">
        <SliderControl
          label="Pink noise volume (ANC on)"
          value={pinkNoiseWithAnc}
          onChange={setPinkNoiseWithAnc}
          helper="Try 30–40%: the blue floor should meet the yellow peak."
        />
      </div>
      <WaveVisualizer state={comboState} />
      <SpectrumVisualizer state={comboState} />
    </div>
  );
}
