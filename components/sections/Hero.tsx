"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { gsap, EASE, prefersReducedMotion } from "@/lib/gsap";
import { hero } from "@/lib/content";
import SplitText from "@/components/ui/SplitText";

// Three.js is heavy and purely decorative — keep it out of the above-the-fold
// bundle so the hero headline (LCP) isn't blocked. The CSS gradient fallback
// shows instantly behind the content (and during the preloader).
const FlowField = dynamic(() => import("@/components/three/FlowField"), {
  ssr: false,
  loading: () => <div className="flowfield" aria-hidden="true" />,
});

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const el = ref.current;
    if (!el) return;

    let played = false;
    let tl: gsap.core.Timeline | null = null;

    // Idempotent: plays exactly once, on whichever trigger fires first.
    const play = () => {
      if (played) return;
      played = true;
      const words = el.querySelectorAll<HTMLElement>(".split-word");
      // Own the start states explicitly rather than trusting only the CSS gate,
      // so the headline can never get stuck hidden.
      gsap.set(el.querySelectorAll("[data-hero]"), { opacity: 0, y: 22 });
      gsap.set(words, { yPercent: 110 });
      tl = gsap.timeline({ defaults: { ease: EASE } });
      tl.to(el.querySelectorAll('[data-hero="eyebrow"]'), {
        opacity: 1,
        y: 0,
        duration: 0.7,
      })
        .to(words, { yPercent: 0, duration: 0.95, stagger: 0.045 }, "-=0.4")
        .to(
          el.querySelectorAll('[data-hero="sub"]'),
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.6",
        )
        .to(
          el.querySelectorAll('[data-hero="chip"]'),
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.06 },
          "-=0.55",
        )
        .to(
          el.querySelectorAll('[data-hero="cue"]'),
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.45",
        );
    };

    // Trigger on whichever happens first: the page is already past the
    // preloader, the preloader signals, or a safety timer (so a missed signal
    // can never leave the hero invisible).
    if (document.documentElement.dataset.loaded === "true") {
      play();
    } else {
      window.addEventListener("ef:loaded", play, { once: true });
    }
    const fallback = window.setTimeout(play, 3000);

    return () => {
      window.removeEventListener("ef:loaded", play);
      window.clearTimeout(fallback);
      tl?.kill();
    };
  }, []);

  return (
    <section
      ref={ref}
      id="top"
      className="hero-stage relative flex min-h-[100svh] flex-col overflow-hidden"
    >
      <FlowField />

      <div className="u-container relative z-10 flex flex-1 flex-col justify-center pt-28 pb-6">
        <div
          data-hero="eyebrow"
          className="t-coord mb-9 flex flex-wrap items-center gap-x-3 gap-y-1"
        >
          <span className="status-dot" aria-hidden="true" />
          <span style={{ color: "var(--color-ink)" }}>{hero.eyebrow}</span>
          <span aria-hidden="true">/</span>
          <span>{hero.context}</span>
        </div>

        <h1 className="t-display" style={{ maxWidth: "15ch" }}>
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
          style={{ marginTop: "clamp(2rem, 3.5vw, 3rem)" }}
        >
          {hero.sub}
        </p>

        <ul className="mt-11 flex flex-wrap gap-3" aria-label="Credentials at a glance">
          {hero.trust.map((t) => (
            <li key={t} data-hero="chip" className="chip">
              {t}
            </li>
          ))}
        </ul>
      </div>

      <div className="u-container relative z-10 pb-10">
        <div data-hero="cue" className="flex items-center gap-3 t-coord">
          <span aria-hidden="true" className="scroll-cue" />
          Scroll to begin
        </div>
      </div>
    </section>
  );
}
