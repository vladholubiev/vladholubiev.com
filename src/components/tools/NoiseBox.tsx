'use client';

import {useState} from 'react';
import Link from 'next/link';
import {Caveat} from 'next/font/google';

import {NoiseWaveVisualizer} from '@/components/tools/NoiseWaveVisualizer';
import {DEFAULT_STATE, type SimulationState} from '@/lib/audioSimulation';
import {useNoise, type NoiseType} from '@/hooks/useNoise';
import {cn} from '@/lib/utils';

const caveat = Caveat({subsets: ['latin'], weight: ['400', '700']});

export function NoiseBox() {
  const {activeNoise, setVolume, toggleNoise, volume, resumeAudio} = useNoise();
  const [selectedNoise, setSelectedNoise] = useState<NoiseType>('pink');

  const isOn = Boolean(activeNoise);

  const simState: SimulationState = {
    ...DEFAULT_STATE,
    pinkNoiseVolume: isOn ? volume : 0,
    noiseColor: selectedNoise,
    keyboardVolume: isOn ? 0 : 0.05, // subtle motion when off
  };

  const handleSwitch = (type: NoiseType) => {
    setSelectedNoise(type);
    void resumeAudio();

    if (activeNoise === type) {
      toggleNoise(type); // toggle off
    } else {
      toggleNoise(type); // switch on to the chosen color
    }
  };

  const handleVolumeChange = (nextValue: number) => {
    setVolume(nextValue);
    void resumeAudio();
    if (!isOn && nextValue > 0) {
      toggleNoise(selectedNoise);
    }
  };

  return (
    <div
      className="flex min-h-screen w-full items-center justify-center bg-[#1a4c8f] p-4"
      style={{
        backgroundImage:
          'linear-gradient(#1e5aa8 1px, transparent 1px), linear-gradient(90deg, #1e5aa8 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }}
    >
      <div className="flex flex-col items-center">
        {/* Device Chassis */}
        <div className="relative w-full max-w-md rounded-3xl border-b-8 border-[#d1c7b8] bg-[#E8E0D5] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_2px_4px_rgba(255,255,255,0.8)]">
          <Screw className="left-4 top-4" />
          <Screw className="right-4 top-4" />
          <Screw className="bottom-4 left-4" />
          <Screw className="bottom-4 right-4" />

          {/* Header Section */}
          <div className="mt-2 mb-8 flex items-start justify-between">
            <div className="text-3xl font-bold tracking-tight text-neutral-800">
              NOISE <span className="text-red-600">BOX</span>
            </div>

            {/* Speaker grill */}
            <div className="grid h-16 w-16 grid-cols-6 grid-rows-6 gap-0.5 rounded-lg bg-[#2a2a2a] p-1.5 shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)]">
              {Array.from({length: 36}).map((_, i) => (
                <div
                  key={i}
                  className="h-full w-full rounded-full bg-[#111] shadow-[0_1px_0_rgba(255,255,255,0.1)]"
                />
              ))}
            </div>
          </div>

          {/* Screen Section */}
          <div className="relative mb-10">
            <div className="absolute -inset-1 translate-y-1 rounded-lg bg-black/5" />
            <div className="relative flex h-48 flex-col overflow-hidden rounded-md border-4 border-[#2a2a2a] bg-[#0a0a0a] shadow-[inset_0_0_20px_rgba(0,0,0,1)]">
              <div className="pointer-events-none absolute top-0 right-0 z-20 h-full w-full bg-gradient-to-bl from-white/5 to-transparent" />

              {/* Overlay text */}
              <div className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-between p-4">
                <div className="flex items-start justify-between">
                  <div className="flex gap-6 text-sm font-mono tracking-widest">
                    {(['WHITE', 'PINK', 'BROWN'] as const).map(type => {
                      const isActive = isOn && activeNoise?.toUpperCase() === type;
                      return (
                        <span
                          key={type}
                          className={cn(
                            'transition-all duration-150',
                            isActive
                              ? 'text-[#4ade80] drop-shadow-[0_0_8px_rgba(74,222,128,0.8)] opacity-100'
                              : 'text-[#1a3322] opacity-40'
                          )}
                        >
                          {type}
                        </span>
                      );
                    })}
                  </div>
                </div>

                <div className="flex items-end justify-end">
                  <div className="flex flex-col items-end gap-0.5">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#1a3322]">
                      Volume
                    </span>
                    <span
                      className={cn(
                        'text-2xl font-mono tracking-widest transition-all duration-150',
                        isOn
                          ? 'text-[#4ade80] drop-shadow-[0_0_8px_rgba(74,222,128,0.8)]'
                          : 'text-[#1a3322] opacity-40'
                      )}
                    >
                      {isOn
                        ? Math.round(volume * 100)
                            .toString()
                            .padStart(2, '0')
                        : '00'}
                    </span>
                  </div>
                </div>
              </div>

              <div
                className={cn(
                  'h-full w-full opacity-80 transition-opacity duration-500',
                  isOn ? 'opacity-100' : 'opacity-10'
                )}
              >
                <NoiseWaveVisualizer state={simState} color="#4ade80" />
              </div>

              <div className="pointer-events-none absolute inset-0 z-20 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px]" />
            </div>
          </div>

          {/* Controls */}
          <div className="mb-10 flex justify-center gap-6">
            {(['white', 'pink', 'brown'] as const).map(type => {
              const isSwitchOn = isOn && activeNoise === type;
              return (
                <div key={type} className="flex flex-col items-center gap-3">
                  <div
                    className={cn(
                      'mb-1 h-2 w-2 rounded-full transition-all duration-300',
                      isSwitchOn
                        ? 'bg-green-500 shadow-[0_0_8px_rgba(74,222,128,1)]'
                        : 'bg-[#bdb3a4]'
                    )}
                  />

                  <button
                    onClick={() => handleSwitch(type)}
                    className="relative h-20 w-14 rounded-md border border-[#b8ae9f] bg-[#d1c7b8] p-1 shadow-[inset_0_1px_4px_rgba(0,0,0,0.2),0_2px_0_rgba(255,255,255,0.5)]"
                  >
                    <div
                      className={cn(
                        'relative h-full w-full overflow-hidden rounded bg-gradient-to-b transition-all duration-200',
                        isSwitchOn
                          ? 'from-[#e0dbd5] to-[#f5f1ed] shadow-[inset_0_10px_10px_-5px_rgba(0,0,0,0.15),0_-2px_0_rgba(255,255,255,0.8)]'
                          : 'from-[#f5f1ed] to-[#e0dbd5] shadow-[inset_0_-10px_10px_-5px_rgba(0,0,0,0.15),0_2px_0_rgba(255,255,255,0.8)]'
                      )}
                    >
                      <div
                        className={cn(
                          'absolute top-2 left-0 w-full text-center text-[10px] font-bold text-neutral-400 transition-all duration-200',
                          isSwitchOn ? 'opacity-40 translate-y-[1px] scale-95' : 'opacity-80'
                        )}
                      >
                        I
                      </div>
                      <div
                        className={cn(
                          'absolute bottom-2 left-0 w-full text-center text-[10px] font-bold text-neutral-400 transition-all duration-200',
                          !isSwitchOn ? 'opacity-40 -translate-y-[1px] scale-95' : 'opacity-80'
                        )}
                      >
                        O
                      </div>
                    </div>
                  </button>

                  <span className="mt-1 text-xs font-bold uppercase tracking-wider text-neutral-600">
                    {type}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Volume Slider */}
          <div className="relative w-full px-2">
            <div className="pointer-events-none absolute -top-3 left-4 right-4 flex justify-between px-1">
              {Array.from({length: 11}).map((_, i) => (
                <div key={i} className="h-2 w-[1px] bg-[#bdb3a4]" />
              ))}
            </div>

            <div className="relative rounded-full bg-[#d1c7b8] p-1.5 shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]">
              <div className="absolute left-3 right-3 top-1/2 h-2 -translate-y-1/2 rounded-full bg-black/80 shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)]" />

              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={e => handleVolumeChange(Number.parseFloat(e.target.value))}
                className="relative z-10 h-10 w-full cursor-pointer appearance-none bg-transparent
                  [&::-webkit-slider-thumb]:relative
                  [&::-webkit-slider-thumb]:mt-[2px]
                  [&::-webkit-slider-thumb]:appearance-none
                  [&::-webkit-slider-thumb]:h-6
                  [&::-webkit-slider-thumb]:w-10
                  [&::-webkit-slider-thumb]:rounded-sm
                  [&::-webkit-slider-thumb]:border
                  [&::-webkit-slider-thumb]:border-[#968c7e]
                  [&::-webkit-slider-thumb]:bg-gradient-to-b
                  [&::-webkit-slider-thumb]:from-[#e0dbd5]
                  [&::-webkit-slider-thumb]:to-[#bfb6a8]
                  [&::-webkit-slider-thumb]:shadow-[0_4px_6px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.5)]
                  [&::-moz-range-thumb]:relative
                  [&::-moz-range-thumb]:margin-top:2px
                  [&::-moz-range-thumb]:height:1.5rem
                  [&::-moz-range-thumb]:width:2.5rem
                  [&::-moz-range-thumb]:border-radius:0.125rem
                  [&::-moz-range-thumb]:border:1px solid #968c7e
                  [&::-moz-range-thumb]:background:linear-gradient(180deg,#e0dbd5,#bfb6a8)
                  [&::-moz-range-thumb]:box-shadow:0_4px_6px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.5)
                "
              />
            </div>
          </div>
        </div>

        <Link
          href="/articles/the-missing-sound-your-anc-headphones-need"
          className={cn(
            caveat.className,
            'mt-12 inline-block -rotate-2 text-center text-3xl tracking-wide text-[#E8E0D5]/80 underline decoration-dashed decoration-white/30 underline-offset-8 transition-all hover:scale-105 hover:rotate-0 hover:text-white'
          )}
          style={{textShadow: '0 2px 4px rgba(0,0,0,0.2)'}}
        >
          Read: The Missing Sound Your ANC Headphones Need →
        </Link>
      </div>
    </div>
  );
}

function Screw({className}: {className: string}) {
  return (
    <div className={cn('absolute h-3 w-3 rounded-full bg-[#bdb3a4] shadow-inner', className)}>
      <div className="flex h-full w-full items-center justify-center">
        <div className="h-[1px] w-full rotate-45 bg-[#968c7e]" />
        <div className="absolute h-[1px] w-full -rotate-45 bg-[#968c7e]" />
      </div>
    </div>
  );
}
