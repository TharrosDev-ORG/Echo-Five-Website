"use client";

import { useEffect, useRef } from "react";
import { gsap, EASE, prefersReducedMotion } from "@/lib/gsap";
import { hero } from "@/lib/content";
import FlowField from "@/components/three/FlowField";
import SplitText from "@/components/ui/SplitText";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const el = ref.current;
    if (!el) return;

    let tl: gsap.core.Timeline | null = null;
    const run = () => {
      const words = el.querySelectorAll<HTMLElement>(".split-word");
      tl = gsap.timeline({ defaults: { ease: EASE } });
      tl.to(el.querySelectorAll('[data-hero="eyebrow"]'), {
        opacity: 1,
        y: 0,
        duration: 0.9,
      })
        .to(
          words,
          { yPercent: 0, duration: 1.15, stagger: 0.05 },
          "-=0.5",
        )
        .to(
          el.querySelectorAll('[data-hero="sub"]'),
          { opacity: 1, y: 0, duration: 1 },
          "-=0.7",
        )
        .to(
          el.querySelectorAll('[data-hero="chip"]'),
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.07 },
          "-=0.7",
        )
        .to(
          el.querySelectorAll('[data-hero="cue"]'),
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.5",
        );
    };

    // gsap.set the slide offset for [data-hero] (CSS only sets opacity).
    gsap.set(el.querySelectorAll("[data-hero]"), { y: 22 });

    if (document.documentElement.dataset.loaded === "true") run();
    else {
      window.addEventListener("ef:loaded", run, { once: true });
    }

    return () => {
      window.removeEventListener("ef:loaded", run);
      tl?.kill();
    };
  }, []);

  return (
    <section
      ref={ref}
      id="top"
      className="hero-stage relative flex min-h-[100svh] flex-col justify-center overflow-hidden"
    >
      <FlowField />

      <div className="u-container relative z-10 pt-24">
        <div
          data-hero="eyebrow"
          className="t-coord mb-8 flex flex-wrap items-center gap-x-3 gap-y-1"
        >
          <span className="status-dot" aria-hidden="true" />
          <span style={{ color: "var(--color-ink)" }}>{hero.eyebrow}</span>
          <span aria-hidden="true">/</span>
          <span>{hero.context}</span>
        </div>

        <h1 className="t-display" style={{ maxWidth: "16ch" }}>
          <SplitText as="span" className="block" text={hero.headline[0]} />
          <SplitText
            as="span"
            className="block cobalt"
            text={hero.headline[1]}
          />
        </h1>

        <p
          data-hero="sub"
          className="t-lead measure-wide"
          style={{ marginTop: "clamp(1.75rem, 3vw, 2.75rem)" }}
        >
          {hero.sub}
        </p>

        <ul className="mt-10 flex flex-wrap gap-3" aria-label="Credentials at a glance">
          {hero.trust.map((t) => (
            <li key={t} data-hero="chip" className="chip">
              {t}
            </li>
          ))}
        </ul>
      </div>

      <div className="u-container relative z-10">
        <div
          data-hero="cue"
          className="mt-16 flex items-center gap-3 t-coord"
        >
          <span aria-hidden="true" className="scroll-cue" />
          Scroll to begin
        </div>
      </div>
    </section>
  );
}
