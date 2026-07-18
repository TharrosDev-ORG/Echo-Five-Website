"use client";

import { useEffect, useRef } from "react";
import { gsap, EASE, prefersReducedMotion } from "@/lib/gsap";

// A simple rising "adoption" curve, drawn with bars.
const BARS = [18, 26, 31, 44, 52, 66, 73, 88, 96];
const FINAL = BARS[BARS.length - 1];

/**
 * The adoption readout: bars grow in sequence and the headline number counts
 * up when the figure enters the viewport. Start states are gated behind `.js`
 * (no-JS visitors see the finished chart) and reduced motion lands final.
 */
export default function AdoptionChart() {
  const ref = useRef<HTMLElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) return;

    const bars = el.querySelectorAll<HTMLElement>(".chart-bar");
    const tweens: gsap.core.Tween[] = [];

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        tweens.push(
          gsap.to(bars, {
            scaleY: 1,
            duration: 1,
            ease: EASE,
            stagger: 0.07,
          }),
        );
        const counter = { value: 0 };
        tweens.push(
          gsap.to(counter, {
            value: FINAL,
            duration: 1.4,
            ease: "power2.out",
            onUpdate: () => {
              if (numRef.current) {
                numRef.current.textContent = `+${Math.round(counter.value)}%`;
              }
            },
          }),
        );
      },
      { threshold: 0.35 },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      tweens.forEach((t) => t.kill());
    };
  }, []);

  return (
    <figure
      ref={ref}
      data-reveal="scale"
      className="card chart-live"
      style={{ borderRadius: 16, padding: "clamp(1.5rem,3vw,2.5rem)" }}
    >
      <figcaption className="t-coord mb-6 flex items-center justify-between">
        <span>Adoption · week over week</span>
        <span className="status-dot" aria-hidden="true" />
      </figcaption>
      <div style={{ display: "flex", alignItems: "flex-end", gap: "clamp(6px,1.2vw,14px)", height: "clamp(140px,22vw,230px)" }}>
        {BARS.map((h, i) => (
          <div
            key={i}
            className="chart-bar"
            style={{
              height: `${h}%`,
              background:
                i >= BARS.length - 2
                  ? "var(--color-cobalt)"
                  : "color-mix(in oklch, var(--color-cobalt) 26%, var(--color-paper-3))",
            }}
          />
        ))}
      </div>
      <div className="mt-5 flex items-baseline justify-between">
        <span
          ref={numRef}
          className="font-display"
          style={{ fontWeight: 740, fontSize: "clamp(1.8rem,3vw,2.4rem)", letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums" }}
        >
          +{FINAL}%
        </span>
        <span className="t-coord">Active usage at 8 weeks</span>
      </div>
    </figure>
  );
}
