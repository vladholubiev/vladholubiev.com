'use client';

import { useEffect, useRef, useState } from 'react';

import {
  generateSpectrumData,
  type SimulationState,
} from '@/lib/audioSimulation';

interface SpectrumVisualizerProps {
  state: SimulationState;
  showNoiseRemaining?: boolean;
}

export function SpectrumVisualizer({
  state,
  showNoiseRemaining = true,
}: SpectrumVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number | null>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 520 });
  const smoothPeakRef = useRef<number | null>(null);

  // Keep canvas sharp on resize
  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return;
      const { width } = containerRef.current.getBoundingClientRect();
      setDimensions({ width: width * 2, height: 520 });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let smoothPercent = 100;

    const render = () => {
      const width = dimensions.width;
      const height = dimensions.height;

      ctx.clearRect(0, 0, width, height);

      const data = generateSpectrumData(state);

      const barWidth = width / data.length - 4;
      let x = 0;

      let maxPeakY = 0;
      const lowDistraction = state.keyboardVolume * (1 - state.ancGain * 0.9);
      const voiceDistraction = state.chatterVolume * (1 - state.ancGain * 0.2);
      const sirenDistraction = state.sirenVolume * (1 - state.ancGain * 0.05);
      const maxDistraction = Math.max(
        lowDistraction,
        voiceDistraction,
        sirenDistraction,
      );
      const maskingLevel = state.pinkNoiseVolume * 0.5;
      const exposedSignal = Math.max(0, maxDistraction - maskingLevel);
      const baseSignal = Math.max(
        state.keyboardVolume,
        state.chatterVolume,
        state.sirenVolume,
      );
      const targetPercent =
        baseSignal > 0.05
          ? Math.min(100, Math.round((exposedSignal / baseSignal) * 100))
          : 0;
      smoothPercent = smoothPercent + (targetPercent - smoothPercent) * 0.1;

      data.forEach((point) => {
        if (point.f > 12 && point.f < 35) {
          const barH = point.a * height * 0.9;
          if (barH > maxPeakY) maxPeakY = barH;
        }
      });

      const visualMaskingHeight = maskingLevel * height * 0.9;
      const peakYPos = height - maxPeakY - 20;
      const floorYPos = height - visualMaskingHeight - 20;

      // Smooth the peak line to reduce jitter
      const prev = smoothPeakRef.current ?? peakYPos;
      const smoothedPeak = prev + (peakYPos - prev) * 0.08; // lower factor = smoother
      smoothPeakRef.current = smoothedPeak;

      data.forEach((point) => {
        const barHeight = point.a * height * 0.9;
        const currentY = height - barHeight;

        let color = 'oklch(0.6 0.18 250)';

        if (point.f < 12) {
          color =
            state.keyboardVolume > 0 && point.a > 0.1
              ? 'oklch(0.55 0.2 260)'
              : 'oklch(0.65 0.15 250)';
        } else if (point.f >= 12 && point.f < 28) {
          if (
            state.chatterVolume > 0 &&
            point.a > 0.3 + state.pinkNoiseVolume * 0.3
          ) {
            color = 'oklch(0.65 0.22 30)';
          } else if (state.chatterVolume > 0) {
            color = 'oklch(0.7 0.1 30)';
          }
        } else if (
          state.sirenVolume > 0 &&
          point.f > 25 &&
          point.f < 32 &&
          point.a > 0.2
        ) {
          color = 'oklch(0.6 0.25 0)';
        }

        const expectedNoise = (0.4 - point.f * 0.008) * state.pinkNoiseVolume;
        if (state.pinkNoiseVolume > 0 && point.a <= expectedNoise + 0.05) {
          color = 'oklch(0.75 0.12 340)';
        }

        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.roundRect(x, currentY, barWidth, barHeight, [4, 4, 0, 0]);
        ctx.fill();

        x += barWidth + 4;
      });

      if (showNoiseRemaining && baseSignal > 0.05) {
        const drawnPeakY = Math.min(smoothedPeak, floorYPos);
        const drawnFloorY = floorYPos;
        const displayValue = Math.round(smoothPercent);

        ctx.lineWidth = 4;
        ctx.strokeStyle = '#fbbf24';
        ctx.beginPath();
        ctx.moveTo(0, drawnPeakY);
        ctx.lineTo(width, drawnPeakY);
        ctx.stroke();

        ctx.strokeStyle = '#60a5fa';
        ctx.beginPath();
        ctx.moveTo(0, drawnFloorY);
        ctx.lineTo(width, drawnFloorY);
        ctx.stroke();

        const arrowX = width - 50;

        if (displayValue > 0) {
          ctx.strokeStyle = '#4ade80';
          ctx.beginPath();
          ctx.moveTo(arrowX, drawnPeakY);
          ctx.lineTo(arrowX, drawnFloorY);
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(arrowX - 10, drawnPeakY + 10);
          ctx.lineTo(arrowX, drawnPeakY);
          ctx.lineTo(arrowX + 10, drawnPeakY + 10);
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(arrowX - 10, drawnFloorY - 10);
          ctx.lineTo(arrowX, drawnFloorY);
          ctx.lineTo(arrowX + 10, drawnFloorY - 10);
          ctx.stroke();
        }

        ctx.fillStyle = '#4ade80';
        ctx.font =
          'bold 60px Inter, -apple-system, BlinkMacSystemFont, sans-serif';
        ctx.textAlign = 'right';

        const textY = (drawnPeakY + drawnFloorY) / 2 + 20;
        ctx.fillText(`${displayValue}%`, arrowX - 20, textY);

        ctx.font =
          'bold 24px Inter, -apple-system, BlinkMacSystemFont, sans-serif';
        ctx.fillStyle = '#86efac';
        ctx.fillText('NOISE REM', arrowX - 20, textY + 30);
      }

      requestRef.current = requestAnimationFrame(render);
    };

    requestRef.current = requestAnimationFrame(render);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [state, dimensions, showNoiseRemaining]);

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden rounded-2xl border border-zinc-200/60 bg-gradient-to-b from-[#0b1220] via-[#0a0c14] to-black shadow-2xl dark:border-zinc-800"
    >
      <div className="absolute left-4 top-4 z-10 text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-500">
        Frequency spectrum
      </div>

      <div className="pointer-events-none absolute inset-0 opacity-15">
        <div className="absolute left-0 h-full w-[30%] bg-blue-500/40" />
        <div className="absolute left-[30%] h-full w-[40%] bg-yellow-400/40" />
        <div className="absolute left-[70%] h-full w-[30%] bg-red-500/35" />
      </div>

      <div className="pointer-events-none absolute bottom-3 left-0 flex w-full justify-between px-4 text-[10px] font-mono font-semibold uppercase tracking-[0.12em] text-zinc-300">
        <span className="bg-black/40 px-2 py-1 rounded-md text-blue-300">
          Low freq
        </span>
        <span className="bg-black/40 px-2 py-1 rounded-md text-amber-400">
          Voice freq
        </span>
        <span className="bg-black/40 px-2 py-1 rounded-md text-red-300">
          High freq
        </span>
      </div>

      <canvas
        ref={canvasRef}
        width={dimensions.width}
        height={dimensions.height}
        className="block h-64 w-full"
      />
    </div>
  );
}
