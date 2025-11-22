'use client';

import {useMemo, useState, type ReactNode} from 'react';
import * as Slider from '@radix-ui/react-slider';
import clsx from 'clsx';

import {DEFAULT_STATE, type SimulationState} from '@/lib/audioSimulation';
import {SpectrumVisualizer} from '@/components/stacking-quiet/SpectrumVisualizer';
import {WaveVisualizer} from '@/components/stacking-quiet/WaveVisualizer';

const thumbClass =
  'block h-5 w-5 rounded-full border border-zinc-300 bg-white shadow-[0_6px_18px_rgba(0,0,0,0.4)] focus:outline-none focus:ring-2 focus:ring-ua-blue-400 focus:ring-offset-2 focus:ring-offset-zinc-900';

type SliderControlProps = {
  label: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  icon?: ReactNode;
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
  icon,
  helper,
}: SliderControlProps) {
  return (
    <div className="rounded-2xl border border-zinc-800/70 bg-gradient-to-br from-zinc-900 via-zinc-900/70 to-black p-4 shadow-xl">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-semibold text-zinc-100">
          {icon}
          <span>{label}</span>
        </div>
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
      {helper ? <p className="mt-2 text-[12px] text-zinc-400">{helper}</p> : null}
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
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="flex w-full items-start justify-between rounded-2xl border border-zinc-800/80 bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 px-4 py-3 text-left shadow-lg transition hover:border-ua-blue-400/70"
    >
      <div className="pr-4">
        <p className="text-sm font-semibold text-zinc-100">{label}</p>
        <p className="text-[12px] text-zinc-400">{description}</p>
      </div>
      <span
        className={clsx(
          'relative mt-1 inline-flex h-6 w-11 items-center rounded-full transition',
          checked ? 'bg-ua-blue-500' : 'bg-zinc-700'
        )}
      >
        <span
          className={clsx(
            'absolute left-1 h-4 w-4 rounded-full bg-white shadow-md transition transform',
            checked ? 'translate-x-5' : 'translate-x-0'
          )}
        />
      </span>
    </button>
  );
}

function Panel({title, children, subtle}: {title?: string; children: ReactNode; subtle?: boolean}) {
  return (
    <div
      className={clsx(
        'rounded-3xl border shadow-2xl',
        subtle
          ? 'border-zinc-200/70 bg-white/60 backdrop-blur dark:border-zinc-800/70 dark:bg-zinc-900/60'
          : 'border-zinc-800/60 bg-gradient-to-b from-zinc-950 via-black to-black'
      )}
    >
      {title ? (
        <div className="flex items-center justify-between border-b border-zinc-800/40 px-4 py-3 text-[11px] font-mono uppercase tracking-[0.18em] text-zinc-400">
          <span>{title}</span>
          <span className="rounded-full bg-ua-blue-500/20 px-2 py-1 text-[10px] text-ua-blue-200">
            live
          </span>
        </div>
      ) : null}
      <div className="p-4 sm:p-6">{children}</div>
    </div>
  );
}

export function StackingQuietDemo() {
  const [noiseToggles, setNoiseToggles] = useState({
    chatter: false,
    keyboard: false,
    sirens: false,
  });
  const [ancComparison, setAncComparison] = useState(50);
  const [pinkNoiseVolume, setPinkNoiseVolume] = useState(70);
  const [pinkNoiseWithAnc, setPinkNoiseWithAnc] = useState(40);

  const baselineState: SimulationState = useMemo(() => ({...DEFAULT_STATE}), []);

  const noisyState: SimulationState = useMemo(
    () => ({
      ...DEFAULT_STATE,
      keyboardVolume: noiseToggles.keyboard ? 0.8 : 0,
      chatterVolume: noiseToggles.chatter ? 0.8 : 0,
      sirenVolume: noiseToggles.sirens ? 0.7 : 0,
    }),
    [noiseToggles]
  );

  const ancState: SimulationState = useMemo(
    () => ({
      ...DEFAULT_STATE,
      keyboardVolume: 0.8,
      chatterVolume: 0.7,
      ancGain: ancComparison / 100,
    }),
    [ancComparison]
  );

  const pinkNoiseState: SimulationState = useMemo(
    () => ({
      ...DEFAULT_STATE,
      chatterVolume: 0.7,
      pinkNoiseVolume: pinkNoiseVolume / 100,
    }),
    [pinkNoiseVolume]
  );

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
    <div className="flex flex-col gap-14">
      <Panel title="Baseline">
        <div className="space-y-4 text-sm text-zinc-400">
          <p className="text-base text-zinc-200">
            Start with a calm room. No rumble, no voices—this is the reference line everything else
            compares to.
          </p>
        </div>
        <div className="mt-6 space-y-3">
          <WaveVisualizer state={baselineState} />
          <SpectrumVisualizer state={baselineState} />
        </div>
      </Panel>

      <Panel title="Noisy environment">
        <div className="flex flex-col gap-4">
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
            <p className="text-[12px] text-zinc-400">
              Toggle the usual suspects to see how different noises land on the spectrum.
            </p>
          </div>
          <div className="space-y-3">
            <WaveVisualizer state={noisyState} />
            <SpectrumVisualizer state={noisyState} />
          </div>
        </div>
      </Panel>

      <Panel title="Enter ANC">
        <div className="flex flex-col gap-6">
          <div className="space-y-4">
            <p className="text-zinc-200">
              Push the slider to see how ANC crushes low frequencies while mid-band voices cling on.
            </p>
            <SliderControl
              label="ANC intensity"
              value={ancComparison}
              onChange={setAncComparison}
            />
            <div className="rounded-xl border border-amber-400/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">
              The left side drops fast, but the voice hump barely moves—exactly why voices feel
              louder once the rumble is gone.
            </div>
          </div>
          <div className="space-y-3">
            <WaveVisualizer state={ancState} />
            <SpectrumVisualizer state={ancState} />
          </div>
        </div>
      </Panel>

      <Panel title="Pink noise alone">
        <div className="flex flex-col gap-6">
          <div className="space-y-4">
            <p className="text-zinc-200">
              Pink noise blankets the spectrum. Without ANC you need more volume to hide chatter, so
              try pushing this up and watch the floor rise.
            </p>
            <SliderControl
              label="Pink noise volume"
              value={pinkNoiseVolume}
              onChange={setPinkNoiseVolume}
            />
          </div>
          <div className="space-y-3">
            <WaveVisualizer state={pinkNoiseState} />
            <SpectrumVisualizer state={pinkNoiseState} />
          </div>
        </div>
      </Panel>

      <Panel title="ANC + pink noise">
        <div className="flex flex-col gap-6">
          <div className="space-y-4">
            <p className="text-zinc-200">
              With ANC handling the low-end, you can run pink noise at a whisper and still smother
              speech. Aim for ~30–40% and see how little remains.
            </p>
            <SliderControl
              label="Pink noise volume (ANC on)"
              value={pinkNoiseWithAnc}
              onChange={setPinkNoiseWithAnc}
              helper="You should see the blue floor almost kiss the yellow peak when the volume is low."
            />
          </div>
          <div className="space-y-3">
            <WaveVisualizer state={comboState} />
            <SpectrumVisualizer state={comboState} />
          </div>
        </div>
      </Panel>
    </div>
  );
}
