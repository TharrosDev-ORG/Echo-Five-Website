"use client";

import { useEffect, useRef } from "react";
import { advanta } from "@/lib/content/advanta";
import { cx } from "@/lib/cx";

const phases = advanta.phases;
const n = phases.length;
const samplePhases = new Set(advanta.freeSamples.map((s) => s.phase));

/**
 * The eleven phases as stations on one line. Horizontal from 1200px with
 * labels alternating above and below; vertical below that, so every name
 * stays legible on a phone.
 *
 * The line draws with the scroll: `--p` (0 to 1) fills each segment in
 * turn and lights each station as the line reaches it. Without JS, or with
 * reduced motion, `--p` stays at 1 and the whole line is simply there.
 */
export default function PhaseLine({ className }: { className?: string }) {
  const ref = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const wide = window.matchMedia("(min-width: 1200px)");
    let raf = 0;

    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // Wide: the whole line is on screen at once, so it draws over the half
      // viewport after it enters. Narrow: the tip follows a reading point
      // just past the middle of the screen.
      const p = wide.matches ? (vh * 0.92 - r.top) / (vh * 0.5) : (vh * 0.62 - r.top) / r.height;
      el.style.setProperty("--p", Math.min(1, Math.max(0, p)).toFixed(4));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <ol
      ref={ref}
      aria-label={advanta.page.phasesListLabel}
      className={cx("relative grid [--p:1] min-[1200px]:grid-cols-11 min-[1200px]:px-8", className)}
    >
      {phases.map((name, i) => {
        const last = i === n - 1;
        const up = i % 2 === 0;
        const sample = samplePhases.has(name);
        // How much of the segment after this station is drawn, and how lit the station is.
        const fill = `clamp(0, calc(var(--p) * ${n - 1} - ${i}), 1)`;
        const lit = `clamp(0, calc((var(--p) * ${n - 1} - ${i}) * 4 + 1), 1)`;

        return (
          <li
            key={name}
            className="relative grid grid-cols-[1.75rem_minmax(0,1fr)] gap-x-5 pb-9 last:pb-0 min-[1200px]:grid-cols-1 min-[1200px]:grid-rows-[8.5rem_1.75rem_8.5rem] min-[1200px]:gap-x-0 min-[1200px]:pb-0"
          >
            {/* Segment to the next station: a hairline track and the drawn line. */}
            {!last && (
              <span
                aria-hidden="true"
                className="absolute left-[0.875rem] top-[0.875rem] h-full w-px bg-rule-strong min-[1200px]:left-1/2 min-[1200px]:top-[9.375rem] min-[1200px]:h-px min-[1200px]:w-full"
              >
                <span
                  className="absolute -left-px top-0 h-full w-[3px] origin-top bg-accent [transform:scaleY(var(--f))] min-[1200px]:-top-px min-[1200px]:left-0 min-[1200px]:h-[3px] min-[1200px]:w-full min-[1200px]:origin-left min-[1200px]:[transform:scaleX(var(--f))]"
                  style={{ "--f": fill } as React.CSSProperties}
                />
              </span>
            )}

            {/* Station */}
            <span
              aria-hidden="true"
              className="relative z-10 col-start-1 row-start-1 flex h-7 w-7 items-center justify-center min-[1200px]:row-start-2 min-[1200px]:justify-self-center"
            >
              <span
                className={cx(
                  "relative rounded-full border-2 border-fg bg-bg",
                  last ? "h-5 w-5" : "h-3.5 w-3.5",
                )}
              >
                <span
                  className="absolute -inset-[2px] rounded-full bg-accent"
                  style={{ opacity: lit }}
                />
              </span>
            </span>

            {/* Label */}
            <div
              className={cx(
                "col-start-2 row-start-1 pt-0.5 min-[1200px]:col-start-1 min-[1200px]:flex min-[1200px]:w-[11.5rem] min-[1200px]:flex-col min-[1200px]:items-center min-[1200px]:justify-self-center min-[1200px]:pt-0 min-[1200px]:text-center",
                up
                  ? "min-[1200px]:row-start-1 min-[1200px]:justify-end"
                  : "min-[1200px]:row-start-3 min-[1200px]:flex-col-reverse min-[1200px]:justify-end",
              )}
            >
              <div className="min-[1200px]:flex min-[1200px]:flex-col min-[1200px]:items-center">
                <span className="label text-fg-3" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="serif mt-1 block text-[1.375rem] leading-[1.15] tracking-[-0.01em] text-fg min-[1200px]:text-[1.25rem]">
                  {name}
                  {sample && <span className="sr-only"> ({advanta.page.sampleTagSr})</span>}
                </span>
                {/*
                  The chip row is reserved on every station from 1200px, empty
                  when there is no sample, so all labels above the line share
                  one baseline and all labels below it start level.
                */}
                <span
                  aria-hidden="true"
                  className={cx("mt-2 h-5 items-center", sample ? "flex" : "hidden min-[1200px]:flex")}
                >
                  {sample && (
                    <span className="label rounded-[3px] bg-mark px-1.5 py-0.5 text-[0.6875rem] leading-none text-mark-ink">
                      {advanta.page.sampleTag}
                    </span>
                  )}
                </span>
              </div>
              <span aria-hidden="true" className="hidden h-5 w-px shrink-0 bg-rule-strong min-[1200px]:my-3 min-[1200px]:block" />
            </div>
          </li>
        );
      })}
    </ol>
  );
}
