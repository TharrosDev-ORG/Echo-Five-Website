"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import Reveal from "@/components/site/Reveal";
import SectionMark from "@/components/site/SectionMark";
import { process } from "@/lib/content";

/**
 * The interactive heart of the page: the ADKAR sequence rendered as an
 * instrument progress rail. When it scrolls into view the rail fills and the
 * five nodes light in order, the same "in sequence, not a switch" idea the copy
 * states. Reduced motion / no-IO shows the completed state immediately (the
 * `stepper-fill` and node transitions collapse to ~0ms in globals.css).
 */
export default function AdkarStepper() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      el.classList.add("stepper-on");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            el.classList.add("stepper-on");
            io.unobserve(el);
          }
        }
      },
      { rootMargin: "0px 0px -20% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const stages = process.stages;
  const step = (i: number) => ({ "--node-delay": `${0.25 + i * 0.28}s` } as CSSProperties);

  return (
    <section id="process" className="rule-top pad-block-2xl">
      <div className="u-container">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal className="flex justify-center">
            <SectionMark index={process.index} kicker={process.kicker} />
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="t-h2 mt-10 text-balance">{process.heading}</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="t-lead mt-8 text-pretty">{process.intro}</p>
          </Reveal>
        </div>

        <div ref={ref} className="stepper mt-20">
          {/* Desktop: horizontal rail */}
          <div className="hidden md:block">
            <div className="relative">
              <div className="stepper-rail absolute inset-x-0 top-7 h-[2px]">
                <div className="stepper-fill" />
              </div>
              <ol className="relative grid grid-cols-5 gap-4">
                {stages.map((s, i) => (
                  <li key={`${s.key}-${i}`} className="flex flex-col items-center text-center">
                    <span
                      className="stepper-node lit flex h-14 w-14 items-center justify-center rounded-full font-display text-xl font-bold"
                      style={step(i)}
                    >
                      {s.key}
                    </span>
                    <span className="mt-6 t-coord text-ink">{s.name}</span>
                    <p className="mt-3 t-body text-pretty text-ink-muted">{s.body}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Mobile: vertical list with a signal rail */}
          <ol className="relative space-y-8 border-l-2 border-line-strong pl-8 md:hidden">
            {stages.map((s, i) => (
              <li key={`${s.key}-${i}`} className="relative">
                <span
                  className="stepper-node lit absolute -left-[2.6rem] flex h-12 w-12 items-center justify-center rounded-full font-display text-lg font-bold"
                  style={step(i)}
                >
                  {s.key}
                </span>
                <span className="t-coord text-ink">{s.name}</span>
                <p className="mt-2 t-body text-ink-muted">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
