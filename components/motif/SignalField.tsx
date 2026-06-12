"use client";

import { useEffect, useRef } from "react";

/**
 * The hero's living backdrop: an oscilloscope-style signal field. Two stacked
 * waveform traces drift across a faint tick grid while echo rings propagate from
 * the left focal point, the "signal spreading through an organization" metaphor.
 *
 * Self-cleaning RAF loop, DPR-aware, ResizeObserver-driven. Under reduced motion
 * it paints a single static frame and never animates. Always decorative
 * (aria-hidden via the parent wrapper).
 */
export default function SignalField({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    let dpr = 1;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.max(1, Math.floor(w * dpr));
      canvas.height = Math.max(1, Math.floor(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const SIGNAL = "oklch(0.84 0.19 150)";

    type Ring = { t: number; speed: number };
    const rings: Ring[] = [];
    let lastSpawn = 0;

    const wave = (phase: number, amp: number, freq: number, yBase: number, alpha: number) => {
      ctx.beginPath();
      for (let x = 0; x <= w; x += 6) {
        const y =
          yBase +
          Math.sin(x * freq + phase) * amp +
          Math.sin(x * freq * 0.5 + phase * 1.7) * amp * 0.4;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = SIGNAL;
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.globalAlpha = 1;
    };

    const grid = () => {
      ctx.globalAlpha = 1;
      ctx.strokeStyle = "oklch(0.96 0.008 250 / 0.06)";
      ctx.lineWidth = 1;
      const step = 64;
      for (let x = (w % step) / 2; x < w; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, h * 0.5 - 6);
        ctx.lineTo(x, h * 0.5 + 6);
        ctx.stroke();
      }
    };

    const drawRings = () => {
      const cx = w * 0.12;
      const cy = h * 0.5;
      const max = Math.hypot(w, h) * 0.9;
      for (const r of rings) {
        const radius = r.t * max;
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.globalAlpha = Math.max(0, 0.28 * (1 - r.t));
        ctx.strokeStyle = SIGNAL;
        ctx.lineWidth = 1.25;
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
      // focal node
      ctx.beginPath();
      ctx.arc(cx, cy, 4, 0, Math.PI * 2);
      ctx.fillStyle = SIGNAL;
      ctx.fill();
    };

    let raf = 0;
    const render = (now: number) => {
      ctx.clearRect(0, 0, w, h);
      const phase = now / 900;
      grid();
      drawRings();
      wave(phase, h * 0.1, 0.012, h * 0.5, 0.55);
      wave(-phase * 0.6, h * 0.06, 0.02, h * 0.5, 0.22);

      if (now - lastSpawn > 2600) {
        rings.push({ t: 0, speed: 0.0016 });
        lastSpawn = now;
      }
      for (let i = rings.length - 1; i >= 0; i--) {
        rings[i].t += rings[i].speed * 16;
        if (rings[i].t >= 1) rings.splice(i, 1);
      }
      raf = requestAnimationFrame(render);
    };

    const staticFrame = () => {
      ctx.clearRect(0, 0, w, h);
      grid();
      const cx = w * 0.12;
      const cy = h * 0.5;
      for (const t of [0.25, 0.5, 0.78]) {
        ctx.beginPath();
        ctx.arc(cx, cy, t * Math.hypot(w, h) * 0.9, 0, Math.PI * 2);
        ctx.globalAlpha = 0.16 * (1 - t);
        ctx.strokeStyle = SIGNAL;
        ctx.lineWidth = 1.25;
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, 4, 0, Math.PI * 2);
      ctx.fillStyle = SIGNAL;
      ctx.fill();
      wave(0, h * 0.1, 0.012, h * 0.5, 0.5);
    };

    const ro = new ResizeObserver(() => {
      resize();
      if (reduce) staticFrame();
    });
    ro.observe(canvas);

    if (reduce) {
      staticFrame();
    } else {
      raf = requestAnimationFrame(render);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
