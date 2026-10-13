import type { CSSProperties } from "react";
import { cx } from "@/lib/cx";

type Props = {
  phases: readonly string[];
  /** Accessible name for the list. */
  label: string;
  className?: string;
};

/**
 * Numbered phases on the signal line. Phones get a vertical list aligned to a
 * 1px line on the left; from 768px the phases sit in equal columns and a single
 * line runs through every node centre. Rendered as an ordered list so the phase
 * names are real text; the line and nodes are decoration.
 *
 * Meant to sit inside a `Reveal` on a black ground (the nodes are filled black
 * so the line does not show through them): the line draws in and the nodes pop
 * when it scrolls into view, and it is fully drawn without JS or with reduced
 * motion.
 */
export default function PhaseTrack({ phases, label, className }: Props) {
  return (
    <ol
      aria-label={label}
      className={cx("relative grid md:grid-cols-[repeat(var(--phases),minmax(0,1fr))]", className)}
      style={{ "--phases": phases.length } as CSSProperties}
    >
      {/*
        One element for the whole connector. Phones: a vertical line from the first row's
        node to the last row's node (rows are 3.5rem tall, so the node centres sit 1.75rem
        in from each end). From md: a horizontal line from the first column's centre to the
        last column's centre (columns are equal, so those are 1/14 in from each edge), at
        the nodes' centre height (20px number + 12px gap + 4.5px).
      */}
      <span
        aria-hidden="true"
        data-phase-line=""
        className="phase-line absolute top-7 bottom-7 left-1 w-px origin-top bg-accent-fill md:top-9 md:right-[calc(100%/14)] md:bottom-auto md:left-[calc(100%/14)] md:h-px md:w-auto md:origin-left"
      />
      {phases.map((phase, i) => (
        <li
          key={phase}
          className="flex h-14 items-center gap-4 md:h-auto md:flex-col md:gap-0 md:text-center"
        >
          <span
            aria-hidden="true"
            className="w-6 shrink-0 text-label tabular-nums text-fg-3 md:block md:h-5 md:w-auto"
          >
            {String(i + 1).padStart(2, "0")}
          </span>
          <span
            aria-hidden="true"
            data-phase-node=""
            style={{ "--i": i } as CSSProperties}
            className="illo-pop relative order-first size-[9px] shrink-0 rounded-full border border-accent-fill bg-black md:order-none md:mt-3"
          >
            <span className="absolute top-1/2 left-1/2 size-[3px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-fill" />
          </span>
          {/* Seven columns are narrow below 1024px, so the names step down a size there. */}
          <span className="text-lead font-semibold text-fg md:mt-4 md:text-label lg:text-body">{phase}</span>
        </li>
      ))}
    </ol>
  );
}
