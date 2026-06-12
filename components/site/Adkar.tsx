"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/animation";
import { process } from "@/lib/content";

/**
 * The interactive how: Prosci ADKAR rendered as a propagating signal.
 * Desktop pins the section while scroll scrubs a wavefront across the
 * five stages — the rail fills and each stage lights as the front
 * reaches it (sequence, not a switch — the copy's own argument).
 * Mobile keeps a vertical rail with the same scrubbed fill, unpinned.
 * Reduced motion shows everything lit, statically.
 */
export default function Adkar() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const mm = gsap.matchMedia(rootRef);

    const buildTimeline = (pin: boolean, axis: "x" | "y") => {
      const stages = gsap.utils.toArray<HTMLElement>("[data-stage]", root);
      const fill = root.querySelector<HTMLElement>("[data-rail-fill]");
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: pin
          ? {
              trigger: root,
              start: "top top",
              end: "+=220%",
              pin: true,
              scrub: 0.6,
              anticipatePin: 1,
            }
          : {
              trigger: root,
              start: "top 60%",
              end: "bottom 75%",
              scrub: 0.6,
            },
      });

      if (fill) {
        // Tailwind's scale-* utilities use the separate `scale` property,
        // which composes with (rather than being replaced by) GSAP's
        // transform — so the initial collapsed state is set here instead.
        tl.fromTo(
          fill,
          axis === "x"
            ? { scaleX: 0, scaleY: 1, transformOrigin: "left center" }
            : { scaleX: 1, scaleY: 0, transformOrigin: "center top" },
          axis === "x"
            ? { scaleX: 1, duration: stages.length }
            : { scaleY: 1, duration: stages.length },
          0,
        );
      }

      stages.forEach((stage, i) => {
        const letter = stage.querySelector("[data-stage-letter]");
        const body = stage.querySelector("[data-stage-body]");
        const at = i + 0.12;
        tl.to(letter, { color: "var(--color-signal)", opacity: 1, duration: 0.5, ease: "power1.inOut" }, at);
        tl.to(body, { opacity: 1, y: 0, duration: 0.5, ease: "power1.out" }, at + 0.1);
      });

      return tl;
    };

    mm.add(
      "(prefers-reduced-motion: no-preference) and (min-width: 768px)",
      () => {
        const tl = buildTimeline(true, "x");
        return () => {
          tl.scrollTrigger?.kill();
          tl.kill();
        };
      },
    );

    mm.add(
      "(prefers-reduced-motion: no-preference) and (max-width: 767px)",
      () => {
        const tl = buildTimeline(false, "y");
        return () => {
          tl.scrollTrigger?.kill();
          tl.kill();
        };
      },
    );

    return () => mm.revert();
  }, []);

  return (
    <section
      id="process"
      ref={rootRef}
      className="rule-top relative flex min-h-svh flex-col justify-center overflow-hidden bg-bg py-[clamp(5rem,10vh,8rem)]"
      aria-labelledby="process-heading"
    >
      <div className="bg-grid absolute inset-0 opacity-30" aria-hidden="true" />
      <div className="u-container relative">
        <p className="t-coord flex items-baseline gap-4 text-ink-muted">
          <span className="text-signal">{process.index}</span>
          {process.kicker}
          <span aria-hidden="true" className="h-px flex-1 self-center bg-line" />
        </p>
        <div className="mt-7 flex flex-wrap items-end justify-between gap-x-12 gap-y-5">
          <h2 id="process-heading" className="t-h2 max-w-[18ch] text-ink">
            {process.heading}
          </h2>
          <p className="t-body measure max-w-[44ch] text-ink-muted">{process.intro}</p>
        </div>

        {/* Rail: horizontal on md+, vertical on mobile. */}
        <div className="relative mt-14 md:mt-20">
          <div
            aria-hidden="true"
            className="absolute left-[1.05rem] top-0 h-full w-px bg-line-strong md:left-0 md:top-[2.1rem] md:h-px md:w-full"
          >
            <span
              data-rail-fill
              className="absolute inset-0 bg-signal"
              style={{ boxShadow: "0 0 12px var(--color-line-signal)" }}
            />
          </div>

          <ol className="grid gap-10 md:grid-cols-5 md:gap-6">
            {process.stages.map((stage, i) => (
              <li key={`${stage.key}-${i}`} data-stage className="relative pl-12 md:pl-0 md:pt-16">
                <span
                  data-stage-letter
                  aria-hidden="true"
                  className="absolute left-0 top-0 flex h-[2.1rem] w-[2.1rem] items-center justify-center border border-line-strong bg-bg-deep font-display text-lg font-[700] text-ink-muted md:-top-2 md:left-0"
                >
                  {stage.key}
                </span>
                <div data-stage-body>
                  <h3 className="t-h3 text-ink">{stage.name}</h3>
                  <p className="t-body mt-3 text-ink-muted">{stage.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
