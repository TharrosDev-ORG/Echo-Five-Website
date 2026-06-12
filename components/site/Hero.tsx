"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { gsap, EASE } from "@/lib/animation";
import { hero } from "@/lib/content";

const EchoField = dynamic(() => import("@/components/three/EchoField"), { ssr: false });

export default function Hero() {
  const stageRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia(stageRef);

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tl = gsap.timeline({ defaults: { ease: EASE } });
      tl.fromTo(
        '[data-hero="line"]',
        { yPercent: 112, opacity: 1 },
        { yPercent: 0, duration: 1.3, stagger: 0.14 },
        0.15,
      )
        .fromTo(
          '[data-hero="meta"]',
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, stagger: 0.1 },
          0.5,
        )
        .fromTo(
          '[data-hero="chip"]',
          { y: 14, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.07 },
          1.0,
        );
      return () => {
        tl.kill();
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="top"
      ref={stageRef}
      className="hero-stage relative isolate flex min-h-svh flex-col overflow-hidden bg-bg-deep"
    >
      {/* Depth-field backdrop: faint grid + Three.js echo field + scrim. */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div className="bg-grid absolute inset-0 opacity-50" />
        <EchoField />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, oklch(0.125 0.02 254 / 0.6), transparent 40%, oklch(0.125 0.02 254 / 0.85) 90%)",
          }}
        />
        <div className="grain absolute inset-0" />
      </div>

      <div className="u-container relative flex flex-1 flex-col justify-end pb-[clamp(3.5rem,8vh,6.5rem)] pt-36">
        <p data-hero="meta" className="t-coord flex flex-wrap items-center gap-x-3 gap-y-1 text-signal">
          <span className="status-dot" aria-hidden="true" />
          {hero.eyebrow}
          <span className="normal-case tracking-normal text-ink-muted">/ {hero.context}</span>
        </p>

        <h1 className="t-display mt-6 text-ink">
          {hero.headline.map((line, i) => (
            <span key={line} className="-mb-[0.1em] block overflow-hidden pb-[0.1em]">
              <span data-hero="line" className={`block ${i === 1 ? "text-signal" : ""}`}>
                {line}
              </span>
            </span>
          ))}
        </h1>

        <p data-hero="meta" className="t-lead measure-wide mt-7">
          {hero.sub}
        </p>

        <div data-hero="meta" className="mt-9 flex flex-wrap items-center gap-4">
          <a href="#contact" className="btn btn-primary">
            Book a conversation
          </a>
          <a href="#services" className="btn btn-ghost">
            What we do
          </a>
        </div>

        <ul
          className="mt-12 flex flex-wrap gap-x-7 gap-y-3 border-t border-line pt-6"
          aria-label="Credentials at a glance"
        >
          {hero.trust.map((item) => (
            <li key={item} data-hero="chip" className="t-coord text-ink-muted">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
