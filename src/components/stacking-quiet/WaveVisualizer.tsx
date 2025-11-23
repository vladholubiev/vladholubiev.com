'use client';

import {useEffect, useRef} from 'react';

import {generateWaveData, type SimulationState} from '@/lib/audioSimulation';

interface WaveVisualizerProps {
  state: SimulationState;
}

export function WaveVisualizer({state}: WaveVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const timeRef = useRef(0);
  const requestRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const render = () => {
      timeRef.current += 0.07; // moderate animation speed
      const width = canvas.width;
      const height = canvas.height;
      const centerY = height / 2;

      // Subtle trail
      ctx.fillStyle = 'rgba(12, 12, 12, 0.25)';
      ctx.fillRect(0, 0, width, height);

      // Center line
      ctx.strokeStyle = '#2f2f33';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, centerY);
      ctx.lineTo(width, centerY);
      ctx.stroke();

      const data = generateWaveData(timeRef.current, state);

      ctx.beginPath();
      ctx.lineWidth = 2;

      if (state.sirenVolume > 0 && state.ancGain < 0.5) {
        ctx.strokeStyle = 'oklch(0.6 0.25 0)'; // high-frequency spike
      } else if (state.chatterVolume > 0 && state.ancGain > 0.5 && state.pinkNoiseVolume < 0.3) {
        ctx.strokeStyle = 'oklch(0.65 0.22 30)'; // chatter poking through
      } else if (state.pinkNoiseVolume > 0.4) {
        ctx.strokeStyle = 'oklch(0.75 0.12 340)'; // pink noise tint
      } else if (state.ancGain > 0.8) {
        ctx.strokeStyle = 'oklch(0.65 0.2 150)';
      } else {
        ctx.strokeStyle = 'oklch(0.6 0.18 250)';
      }

      const sliceWidth = width / data.length;
      let x = 0;

      for (let i = 0; i < data.length; i++) {
        const v = data[i];
        const y = centerY - v * (height / 3);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
        x += sliceWidth;
      }
      ctx.stroke();

      requestRef.current = requestAnimationFrame(render);
    };

    requestRef.current = requestAnimationFrame(render);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [state]);

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-zinc-200/60 bg-gradient-to-b from-zinc-900 via-black to-black shadow-2xl dark:border-zinc-800">
      <div className="absolute left-4 top-3 text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-500">
        Monitor
      </div>
      <canvas ref={canvasRef} width={900} height={260} className="block h-64 w-full" />
    </div>
  );
}
