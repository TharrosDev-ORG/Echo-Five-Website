"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { gsap, EASE, prefersReducedMotion } from "@/lib/gsap";
import { hero } from "@/lib/content";
import SplitText from "@/components/ui/SplitText";
import Magnetic from "@/components/fx/Magnetic";
import { useSmoothScroll } from "@/components/providers/SmoothScroll";

// Three.js is heavy and purely decorative — keep it out of the above-the-fold
// bundle so the hero headline (LCP) isn't blocked. The CSS gradient fallback
// shows instantly behind the content (and during the preloader).
const FlowField = dynamic(() => import("@/components/three/FlowField"), {
  ssr: false,
  loading: () => <div className="flowfield" aria-hidden="true" />,
});

const ArrowDown = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M7 2v10m0 0 4-4m-4 4L3 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollTo } = useSmoothScroll();

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
      // so the headline can never get stuck hidden. `y: 0` zeroes the pixel
      // offset GSAP parses out of the stylesheet's translateY(110%) — without
      // it the percent tween lands but the parsed pixels remain.
      gsap.set(el.querySelectorAll("[data-hero]"), { opacity: 0, y: 22 });
      gsap.set(words, { y: 0, yPercent: 110 });
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
          el.querySelectorAll('[data-hero="cta"]'),
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.08 },
          "-=0.55",
        )
        .to(
          el.querySelectorAll('[data-hero="meta"]'),
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.05 },
          "-=0.5",
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

    // Scroll exit: the composition drifts up and softens as the hero leaves.
    // Purely additive (starts at identity), so it can never hide content.
    const drift = gsap.to(el.querySelector("[data-hero-inner]"), {
      yPercent: -14,
      opacity: 0.25,
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start: "top top",
        end: "bottom top",
        scrub: 0.4,
      },
    });

    return () => {
      window.removeEventListener("ef:loaded", play);
      window.clearTimeout(fallback);
      tl?.kill();
      drift.scrollTrigger?.kill();
      drift.kill();
    };
  }, []);

  const go = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    scrollTo(href);
  };

  return (
    <section
      ref={ref}
      id="top"
      className="hero-stage relative flex min-h-[100svh] flex-col overflow-hidden"
    >
      <FlowField />

      <div data-hero-inner className="relative z-10 flex flex-1 flex-col">
        <div className="u-container flex flex-1 flex-col justify-center pt-28 pb-10">
          <div
            data-hero="eyebrow"
            className="t-coord mb-9 flex flex-wrap items-center gap-x-3 gap-y-1"
          >
            <span className="status-dot" aria-hidden="true" />
            <span style={{ color: "var(--color-ink)" }}>{hero.eyebrow}</span>
            <span aria-hidden="true">/</span>
            <span>{hero.context}</span>
          </div>

          <h1 className="t-display" style={{ maxWidth: "13ch" }}>
            <SplitText as="span" className="block" text={hero.headline[0]} />
            <SplitText
              as="span"
              className="block cobalt"
              text={hero.headline[1]}
            />
          </h1>

          <div
            className="flex flex-wrap items-end justify-between gap-x-12 gap-y-8"
            style={{ marginTop: "clamp(2rem, 3.5vw, 3rem)" }}
          >
            <p data-hero="sub" className="t-lead measure-wide">
              {hero.sub}
            </p>

            <div className="flex flex-wrap items-center gap-5">
              <span data-hero="cta">
                <Magnetic>
                  <a href="#contact" onClick={go("#contact")} className="btn btn-primary" data-cursor>
                    {hero.cta.primary}
                  </a>
                </Magnetic>
              </span>
              <span data-hero="cta">
                <a href="#why" onClick={go("#why")} className="link-arrow" data-cursor>
                  {hero.cta.secondary}
                  <ArrowDown />
                </a>
              </span>
            </div>
          </div>
        </div>

        <div className="u-container pb-8">
          <dl className="hero-meta" aria-label="Credentials at a glance">
            {hero.trust.map((t, i) => (
              <div key={t} data-hero="meta" className="hero-meta-cell">
                <dt className="hero-meta-num">{String(i + 1).padStart(2, "0")}</dt>
                <dd className="hero-meta-val">{t}</dd>
              </div>
            ))}
            <div data-hero="meta" className="hero-meta-cell hidden md:flex" aria-hidden="true">
              <span className="hero-meta-num">Scroll</span>
              <span className="scroll-cue" style={{ height: 26 }} />
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
