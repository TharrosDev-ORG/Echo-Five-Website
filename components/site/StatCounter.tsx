"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Counts up to `value` once, when scrolled into view. Shows the final value
 * immediately under reduced motion or without IntersectionObserver.
 */
export default function StatCounter({
  value,
  suffix = "",
  prefix = "",
  label,
  durationMs = 1400,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  durationMs?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [n, setN] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce || !("IntersectionObserver" in window)) {
      setN(value);
      return;
    }

    let raf = 0;
    let started = false;
    const run = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / durationMs);
        const eased = 1 - Math.pow(1 - t, 3);
        setN(Math.round(value * eased));
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !started) {
            started = true;
            run();
            io.unobserve(el);
          }
        }
      },
      { rootMargin: "0px 0px -15% 0px" },
    );
    io.observe(el);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [value, durationMs]);

  return (
    <div ref={ref}>
      <div className="font-display text-4xl font-bold tabular-nums text-ink sm:text-5xl">
        {prefix}
        {n}
        {suffix}
      </div>
      <div className="mt-2 t-coord text-ink-muted">{label}</div>
    </div>
  );
}
