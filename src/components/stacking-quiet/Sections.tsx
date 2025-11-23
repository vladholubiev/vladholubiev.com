'use client';

import {useMemo, useRef, type MouseEvent} from 'react';
import {SpectrumVisualizer} from '@/components/stacking-quiet/SpectrumVisualizer';
import {WaveVisualizer} from '@/components/stacking-quiet/WaveVisualizer';
import {Slider as UiSlider} from '@/components/ui/slider';
import {Switch} from '@/components/ui/switch';
import {cn} from '@/lib/utils';
import {useStackingQuiet} from '@/components/stacking-quiet/StackingQuietProvider';

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
  compact?: boolean;
};

function ToggleRow({label, description, checked, onChange, compact = false}: ToggleRowProps) {
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
      className={cn(
        'flex w-full cursor-pointer items-center justify-between rounded-2xl border border-zinc-200/70 bg-white/90 text-left shadow-sm transition hover:border-ua-blue-300/70 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-ua-blue-400 focus:ring-offset-2 focus:ring-offset-white dark:border-zinc-800/80 dark:bg-zinc-900/90 dark:hover:border-ua-blue-400/60 dark:focus:ring-offset-zinc-900',
        compact ? 'px-4 py-2' : 'px-4 py-3'
      )}
    >
      <div className="pr-4">
        <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{label}</p>
        {!compact ? (
          <p className="text-[12px] text-zinc-600 dark:text-zinc-400">{description}</p>
        ) : null}
      </div>
      <Switch
        checked={checked}
        onCheckedChange={onChange}
        onClick={event => event.stopPropagation()}
        className={cn(
          'shrink-0 data-[state=checked]:bg-ua-blue-500 data-[state=unchecked]:bg-zinc-300 dark:data-[state=unchecked]:bg-zinc-700',
          compact ? 'h-6 w-11' : 'mt-1 h-6 w-11'
        )}
      />
    </div>
  );
}

export function BaselineBlock() {
  const {baselineState} = useStackingQuiet();

  return (
    <div className={cardClass}>
      <SpectrumVisualizer state={baselineState} showNoiseRemaining={false} />
    </div>
  );
}

export function NoisyBlock() {
  const {noisy} = useStackingQuiet();

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <ToggleRow
          label="Keyboard rumble"
          description="Low-frequency hum with mechanical spikes"
          checked={noisy.toggles.keyboard}
          onChange={checked => noisy.setToggle('keyboard', checked)}
          compact
        />
        <ToggleRow
          label="Human chatter"
          description="Mid-frequency bursts around 500Hz–3kHz"
          checked={noisy.toggles.chatter}
          onChange={checked => noisy.setToggle('chatter', checked)}
          compact
        />
        <ToggleRow
          label="Sharp alarms"
          description="High-frequency beeps and sirens"
          checked={noisy.toggles.sirens}
          onChange={checked => noisy.setToggle('sirens', checked)}
          compact
        />
      </div>
      <WaveVisualizer state={noisy.state} />
      <SpectrumVisualizer state={noisy.state} />
    </div>
  );
}

export function NoisyToggles() {
  const {noisy} = useStackingQuiet();
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      <ToggleRow
        label="Keyboard rumble"
        description="Low-frequency hum with mechanical spikes"
        checked={noisy.toggles.keyboard}
        onChange={checked => noisy.setToggle('keyboard', checked)}
        compact
      />
      <ToggleRow
        label="Human chatter"
        description="Mid-frequency bursts around 500Hz–3kHz"
        checked={noisy.toggles.chatter}
        onChange={checked => noisy.setToggle('chatter', checked)}
        compact
      />
      <ToggleRow
        label="Sharp alarms"
        description="High-frequency beeps and sirens"
        checked={noisy.toggles.sirens}
        onChange={checked => noisy.setToggle('sirens', checked)}
        compact
      />
    </div>
  );
}

export function NoisyWave() {
  const {noisy} = useStackingQuiet();
  return <WaveVisualizer state={noisy.state} />;
}

export function NoisySpectrum() {
  const {noisy} = useStackingQuiet();
  return <SpectrumVisualizer state={noisy.state} showNoiseRemaining={false} />;
}

export function AncControls() {
  const {anc} = useStackingQuiet();
  return (
    <SliderControl
      label="ANC intensity"
      value={anc.intensity}
      onChange={anc.setIntensity}
      hoverAdjustable
    />
  );
}

export function AncWave() {
  const {anc} = useStackingQuiet();
  return <WaveVisualizer state={anc.state} />;
}

export function AncSpectrum() {
  const {anc} = useStackingQuiet();
  return <SpectrumVisualizer state={anc.state} />;
}

export function AncBlock() {
  return (
    <div className="space-y-4">
      <AncControls />
      <AncWave />
      <AncSpectrum />
    </div>
  );
}

export function PinkNoiseBlock({withAmbientNoise = true}: {withAmbientNoise?: boolean}) {
  const {pink} = useStackingQuiet();
  const pinkNoiseState = useMemo(() => pink.getState({withAmbientNoise}), [pink, withAmbientNoise]);

  return (
    <div className="space-y-4">
      <SliderControl
        label="Pink noise volume"
        value={pink.volume}
        onChange={pink.setVolume}
        hoverAdjustable
      />
      <WaveVisualizer state={pinkNoiseState} />
      <SpectrumVisualizer state={pinkNoiseState} showNoiseRemaining={withAmbientNoise} />
    </div>
  );
}

export function ComboBlock() {
  const {combo} = useStackingQuiet();

  return (
    <div className="space-y-4">
      <SliderControl
        label="Pink noise volume (ANC on)"
        value={combo.volume}
        onChange={combo.setVolume}
        hoverAdjustable
      />
      <WaveVisualizer state={combo.state} />
      <SpectrumVisualizer state={combo.state} />
    </div>
  );
}

export function ComboControls() {
  const {combo} = useStackingQuiet();
  return (
    <SliderControl
      label="Pink noise + ANC"
      value={combo.volume}
      onChange={combo.setVolume}
      hoverAdjustable
    />
  );
}

export function ComboWave() {
  const {combo} = useStackingQuiet();
  return <WaveVisualizer state={combo.state} />;
}

export function ComboSpectrum() {
  const {combo} = useStackingQuiet();
  return <SpectrumVisualizer state={combo.state} />;
}
