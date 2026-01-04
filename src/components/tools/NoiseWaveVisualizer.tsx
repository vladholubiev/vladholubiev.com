'use client';

import { useEffect, useRef } from 'react';

import { generateWaveData, type SimulationState } from '@/lib/audioSimulation';

interface WaveVisualizerProps {
  state: SimulationState;
  color?: string;
}

export function NoiseWaveVisualizer({ state, color }: WaveVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const timeRef = useRef(0);
  const requestRef = useRef<number>(0);

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

      // Clear with subtle trail
      ctx.fillStyle = 'rgba(10, 10, 10, 0.2)';
      ctx.fillRect(0, 0, width, height);

      // Center grid line
      ctx.strokeStyle = '#333';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, centerY);
      ctx.lineTo(width, centerY);
      ctx.stroke();

      const data = generateWaveData(timeRef.current, state);

      ctx.beginPath();
      ctx.lineWidth = 2;

      if (color) {
        ctx.strokeStyle = color;
      } else if (state.sirenVolume > 0 && state.ancGain < 0.5) {
        ctx.strokeStyle = 'oklch(0.6 0.25 0)';
      } else if (
        state.chatterVolume > 0 &&
        state.ancGain > 0.5 &&
        state.pinkNoiseVolume < 0.3
      ) {
        ctx.strokeStyle = 'oklch(0.65 0.22 30)';
      } else if (state.pinkNoiseVolume > 0.4) {
        ctx.strokeStyle = 'oklch(0.75 0.12 340)';
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
  }, [state, color]);

  return (
    <div className="relative h-full w-full overflow-hidden bg-transparent">
      <canvas
        ref={canvasRef}
        width={800}
        height={256}
        className="block h-full w-full"
      />
    </div>
  );
}
