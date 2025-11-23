'use client';

import {useMemo, useRef, useState, type MouseEvent} from 'react';

import {DEFAULT_STATE, type SimulationState} from '@/lib/audioSimulation';
import {SpectrumVisualizer} from '@/components/stacking-quiet/SpectrumVisualizer';
import {WaveVisualizer} from '@/components/stacking-quiet/WaveVisualizer';
import {Slider as UiSlider} from '@/components/ui/slider';
import {Switch} from '@/components/ui/switch';

const cardClass = 'rounded-2xl border border-zinc-800/40 bg-zinc-900/80 p-0 sm:p-0 shadow-lg';

type SliderControlProps = {
  label: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  helper?: string;
  hoverAdjustable?: boolean;
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
  hoverAdjustable = false,
}: SliderControlProps) {
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleHover = (event: MouseEvent<HTMLDivElement>) => {
    if (!hoverAdjustable) return;
    const rect = sliderRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = Math.min(Math.max(event.clientX - rect.left, 0), rect.width);
    const ratio = rect.width === 0 ? 0 : x / rect.width;
    const raw = min + ratio * (max - min);
    const snapped = Math.round(raw / step) * step;
    const next = Math.min(max, Math.max(min, snapped));
    if (next !== value) {
      onChange(next);
    }
  };

  return (
    <div className="space-y-2" onMouseMove={handleHover} onMouseEnter={handleHover}>
      <div className="flex items-center justify-between text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        <span>{label}</span>
        <span className="text-xs font-mono text-zinc-600 dark:text-zinc-400">{value}%</span>
      </div>
      <div ref={sliderRef}>
        <UiSlider
          value={[value]}
          min={min}
          max={max}
          step={step}
          onValueChange={([val]) => onChange(val)}
          aria-label={label}
          className="pt-1"
        />
      </div>
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
      <SliderControl
        label="ANC intensity"
        value={ancComparison}
        onChange={setAncComparison}
        hoverAdjustable
      />
      <WaveVisualizer state={ancState} />
      <SpectrumVisualizer state={ancState} />
    </div>
  );
}

export function PinkNoiseBlock({withAmbientNoise = true}: {withAmbientNoise?: boolean}) {
  const [pinkNoiseVolume, setPinkNoiseVolume] = useState(70);

  const pinkNoiseState: SimulationState = useMemo(
    () => ({
      ...DEFAULT_STATE,
      chatterVolume: withAmbientNoise ? 0.7 : 0,
      pinkNoiseVolume: pinkNoiseVolume / 100,
    }),
    [pinkNoiseVolume, withAmbientNoise]
  );

  return (
    <div className="space-y-4">
      <SliderControl
        label="Pink noise volume"
        value={pinkNoiseVolume}
        onChange={setPinkNoiseVolume}
        hoverAdjustable
      />
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
      <SliderControl
        label="Pink noise volume (ANC on)"
        value={pinkNoiseWithAnc}
        onChange={setPinkNoiseWithAnc}
        hoverAdjustable
      />
      <WaveVisualizer state={comboState} />
      <SpectrumVisualizer state={comboState} />
    </div>
  );
}
