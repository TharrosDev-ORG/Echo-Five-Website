"use client";

import { useEffect, useRef } from "react";

/**
 * A live radar: rings, a rotating sweep, and blips that light as the beam
 * crosses them. The Echo-Five callsign made literal, and the metaphor for
 * adoption reaching one part of an organization after another.
 *
 * Pointer adds a subtle parallax. Honors prefers-reduced-motion by drawing a
 * single static frame with no rotation.
 */
export default function RadarHero({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const context = el.getContext("2d");
    if (!context) return;
    const cv: HTMLCanvasElement = el;
    const ctx: CanvasRenderingContext2D = context;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const SIGNAL = "242, 168, 60";
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let w = 0;
    let h = 0;
    let raf = 0;
    let angle = -Math.PI / 2;
    let last = performance.now();
    const pointer = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };

    const blips = Array.from({ length: 9 }, (_, i) => ({
      a: (i / 9) * Math.PI * 2 + Math.random() * 0.5,
      r: 0.22 + Math.random() * 0.72,
      lit: reduce ? 0.5 : 0,
    }));

    function resize() {
      const rect = cv.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      cv.width = Math.max(1, Math.floor(w * dpr));
      cv.height = Math.max(1, Math.floor(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (reduce) draw(0);
    }

    function draw(dt: number) {
      pointer.x += (pointer.tx - pointer.x) * 0.05;
      pointer.y += (pointer.ty - pointer.y) * 0.05;
      const offX = reduce ? 0 : (pointer.x - 0.5) * 28;
      const offY = reduce ? 0 : (pointer.y - 0.5) * 28;
      const cx = w * 0.72 + offX;
      const cy = h * 0.52 + offY;
      const maxR = Math.hypot(w, h) * 0.42;

      ctx.clearRect(0, 0, w, h);

      // Rings
      ctx.lineWidth = 1;
      for (let i = 1; i <= 5; i++) {
        const r = (i / 5) * maxR;
        ctx.beginPath();
        ctx.strokeStyle = `rgba(${SIGNAL}, ${0.13 - i * 0.013})`;
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Crosshairs
      ctx.strokeStyle = `rgba(${SIGNAL}, 0.05)`;
      ctx.beginPath();
      ctx.moveTo(cx - maxR, cy);
      ctx.lineTo(cx + maxR, cy);
      ctx.moveTo(cx, cy - maxR);
      ctx.lineTo(cx, cy + maxR);
      ctx.stroke();

      if (!reduce) {
        angle += dt * 0.0008;
        const sweep = Math.PI * 0.55;
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, maxR, angle - sweep, angle);
        ctx.closePath();
        ctx.clip();
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxR);
        g.addColorStop(0, `rgba(${SIGNAL}, 0.18)`);
        g.addColorStop(1, `rgba(${SIGNAL}, 0)`);
        ctx.fillStyle = g;
        ctx.fillRect(cx - maxR, cy - maxR, maxR * 2, maxR * 2);
        ctx.restore();
        ctx.strokeStyle = `rgba(${SIGNAL}, 0.45)`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(angle) * maxR, cy + Math.sin(angle) * maxR);
        ctx.stroke();
      }

      // Blips
      for (const b of blips) {
        if (!reduce) {
          let d = (angle - b.a) % (Math.PI * 2);
          if (d < 0) d += Math.PI * 2;
          if (d < 0.05) b.lit = 1;
          b.lit *= 0.984;
        }
        const bx = cx + Math.cos(b.a) * b.r * maxR;
        const by = cy + Math.sin(b.a) * b.r * maxR;
        const alpha = Math.min(1, 0.18 + b.lit * 0.82);
        if (b.lit > 0.05) {
          const rad = 16 * (0.5 + b.lit);
          const glow = ctx.createRadialGradient(bx, by, 0, bx, by, rad);
          glow.addColorStop(0, `rgba(${SIGNAL}, ${0.4 * b.lit})`);
          glow.addColorStop(1, `rgba(${SIGNAL}, 0)`);
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(bx, by, rad, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.fillStyle = `rgba(${SIGNAL}, ${alpha})`;
        ctx.beginPath();
        ctx.arc(bx, by, 2.2, 0, Math.PI * 2);
        ctx.fill();
      }

      // Focal point
      ctx.fillStyle = `rgba(${SIGNAL}, 0.9)`;
      ctx.beginPath();
      ctx.arc(cx, cy, 3, 0, Math.PI * 2);
      ctx.fill();
    }

    function loop(now: number) {
      const dt = Math.min(50, now - last);
      last = now;
      draw(dt);
      raf = requestAnimationFrame(loop);
    }

    function onMove(e: PointerEvent) {
      const rect = cv.getBoundingClientRect();
      pointer.tx = (e.clientX - rect.left) / rect.width;
      pointer.ty = (e.clientY - rect.top) / rect.height;
    }

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(cv);

    if (reduce) {
      draw(0);
    } else {
      window.addEventListener("pointermove", onMove, { passive: true });
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className={className} />;
}
