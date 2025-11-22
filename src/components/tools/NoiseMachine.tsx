'use client';

import {useEffect, useRef} from 'react';
import * as Slider from '@radix-ui/react-slider';
import clsx from 'clsx';

import {useNoise} from '@/hooks/useNoise';

const sliderThumbClassName =
  'block h-5 w-5 rounded-full border border-zinc-500 bg-gradient-to-br from-zinc-300 via-zinc-200 to-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-300 focus:ring-offset-2 focus:ring-offset-zinc-800';

type VolumeSliderProps = {
  level: number;
  // eslint-disable-next-line no-unused-vars
  onChange: (value: number) => void;
};

function VolumeSlider(props: VolumeSliderProps) {
  return (
    <Slider.Root
      className="relative flex h-full w-full cursor-pointer items-center"
      value={[props.level]}
      max={1}
      step={0.01}
      onValueChange={vals => props.onChange(vals[0])}
      aria-label="Volume"
    >
      <Slider.Track className="relative h-2 w-full rounded-full bg-gradient-to-b from-[#4a4a4a] to-[#1f1f1f]">
        <Slider.Range className="absolute h-full rounded-full bg-gradient-to-b from-[#d6d8dc] to-[#a8aaae]" />
      </Slider.Track>
      <Slider.Thumb className={sliderThumbClassName} />
    </Slider.Root>
  );
}

function NoiseButton({
  label,
  active,
  onClick,
  className,
  accentColor,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  className?: string;
  accentColor: string;
}) {
  return (
    <div className={clsx('flex flex-col items-center gap-2', className)}>
      <div
        className={clsx(
          'h-3 w-3 rounded-full border border-neutral-400 transition-colors duration-300',
          active ? '' : 'bg-orange-900/50'
        )}
        style={active ? {backgroundColor: '#10b981', boxShadow: '0 0 8px #10b981cc'} : undefined}
      />
      <button
        onClick={onClick}
        className="relative w-full cursor-pointer touch-none transition-transform active:scale-95"
      >
        <div className="w-full aspect-square rounded-xl p-1" style={{backgroundColor: accentColor}}>
          <div
            className={clsx(
              'flex h-full w-full items-center justify-center rounded-lg bg-neutral-200 transition-all duration-150 ease-out',
              active ? 'translate-y-1 border-t border-black/10' : '-translate-y-0.5 hover:bg-white'
            )}
          >
            <div
              className={clsx(
                'h-1/2 w-1/2 rounded-md transition-all',
                active ? 'bg-neutral-300/20' : 'bg-neutral-300/30'
              )}
            />
          </div>
        </div>
      </button>
      <span className="w-full text-center text-sm font-bold leading-tight tracking-tight text-neutral-700">
        {label}
      </span>
    </div>
  );
}

export default function NoiseMachine() {
  const {activeNoise, analyser, setVolume, toggleNoise, volume} = useNoise();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const draw = () => {
      frameRef.current = requestAnimationFrame(draw);

      const width = canvas.width;
      const height = canvas.height;

      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, width, height);

      if (!analyser || !activeNoise) {
        ctx.beginPath();
        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 2;
        ctx.moveTo(0, height / 2);
        ctx.lineTo(width, height / 2);
        ctx.stroke();
        return;
      }

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      analyser.getByteTimeDomainData(dataArray);

      ctx.lineWidth = 3;
      ctx.strokeStyle = '#10b981';
      ctx.beginPath();

      const sliceWidth = width / bufferLength;
      let x = 0;

      for (let i = 0; i < bufferLength; i += 1) {
        const v = dataArray[i] / 128.0;
        const y = (v * height) / 2;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }

        x += sliceWidth;
      }

      ctx.lineTo(canvas.width, canvas.height / 2);
      ctx.stroke();
    };

    frameRef.current = requestAnimationFrame(draw);

    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, [activeNoise, analyser]);

  return (
    <div className="relative w-full max-w-md rounded-3xl border-t border-l border-white/50 bg-[rgb(233,224,211)] p-8">
      <Screw className="left-4 right-auto top-4" />
      <Screw className="right-4 top-4" />
      <Screw className="bottom-4 left-4" />
      <Screw className="bottom-4 right-4" />

      <div className="mb-8 flex items-start justify-between pl-4 pr-1">
        <div className="mt-2">
          <h1 className="font-sans text-2xl font-bold tracking-wider text-neutral-800">
            NOISE <span className="text-red-700">BOX</span>
          </h1>
        </div>
        <div className="relative grid h-16 w-24 grid-cols-6 gap-1 overflow-hidden rounded-lg border-b border-l border-white/50 bg-neutral-400/30 p-1">
          {Array.from({length: 24}).map((_, index) => (
            <div key={index} className="h-full w-full rounded-full bg-neutral-800/30" />
          ))}
        </div>
      </div>

      <div className="relative mb-10">
        <div className="relative h-32 overflow-hidden rounded-md border-4 border-neutral-400/50 bg-black">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-bl from-white/5 to-transparent" />
          <div className="absolute top-2 z-0 w-full text-center">
            <p className="flex items-center justify-center gap-2 font-mono text-[10px] tracking-widest text-neutral-400">
              <span
                className={clsx(
                  'h-2 w-2 rounded-full',
                  activeNoise ? 'bg-green-500 animate-pulse' : 'bg-neutral-600'
                )}
              />
              {activeNoise
                ? `ACTIVE • PLAYING ${activeNoise.toUpperCase()}`
                : 'IDLE • NOTHING PLAYING'}
            </p>
          </div>
          <canvas ref={canvasRef} width={400} height={128} className="h-full w-full opacity-90" />
        </div>
        <ScreenScrew className="-left-2 -top-2" />
        <ScreenScrew className="-right-2 -top-2" />
        <ScreenScrew className="-bottom-2 -left-2" />
        <ScreenScrew className="-bottom-2 -right-2" />
      </div>

      <div className="flex flex-col gap-8">
        <div className="flex w-full items-stretch gap-4">
          {/** Map unique accent colors to each noise type */}
          <NoiseButton
            label="WHITE"
            active={activeNoise === 'white'}
            onClick={() => toggleNoise('white')}
            className="flex-1"
            accentColor="#a8a29e"
          />
          <NoiseButton
            label="PINK"
            active={activeNoise === 'pink'}
            onClick={() => toggleNoise('pink')}
            className="flex-1"
            accentColor="#ec4899"
          />
          <NoiseButton
            label="BROWN"
            active={activeNoise === 'brown'}
            onClick={() => toggleNoise('brown')}
            className="flex-1"
            accentColor="#b45309"
          />
        </div>

        <div className="flex w-full flex-col items-center gap-2">
          <div className="relative flex h-12 w-full items-center rounded-full border border-[#b7afa3] bg-gradient-to-b from-[#d8d1c9] to-[#bfb6aa] px-4">
            <div className="pointer-events-none absolute inset-[6px] rounded-full border border-[#8f867a] bg-gradient-to-b from-[#b0a79a] to-[#9a9084]" />
            <div className="relative z-10 w-full">
              <VolumeSlider level={volume} onChange={nextValue => setVolume(nextValue)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Screw({className}: {className: string}) {
  return (
    <div
      className={clsx(
        'absolute h-3 w-3 rounded-full border border-neutral-500 bg-neutral-400',
        className
      )}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-[1px] w-2 rotate-45 bg-neutral-600" />
        <div className="absolute h-[1px] w-2 -rotate-45 bg-neutral-600" />
      </div>
    </div>
  );
}

function ScreenScrew({className}: {className: string}) {
  return (
    <div
      className={clsx(
        'absolute h-2 w-2 rounded-full border border-neutral-400 bg-neutral-300',
        className
      )}
    />
  );
}
