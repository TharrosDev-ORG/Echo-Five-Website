import type { CSSProperties } from "react";
import { cx } from "@/lib/cx";

type Props = {
  phases: readonly string[];
  /** Accessible name for the list. */
  label: string;
  className?: string;
};

/**
 * Numbered phases on a line: a vertical list on phones, a single horizontal
 * track from 768px. Rendered as an ordered list so the phase names are real text.
 */
export default function PhaseTrack({ phases, label, className }: Props) {
  return (
    <ol
      aria-label={label}
      className={cx("grid md:grid-cols-[repeat(var(--phases),minmax(0,1fr))] md:gap-3", className)}
      style={{ "--phases": phases.length } as CSSProperties}
    >
      {phases.map((phase, i) => (
        <li
          key={phase}
          className="relative flex items-center gap-4 pb-6 last:pb-0 md:flex-col md:gap-3 md:pb-0 md:text-center"
        >
          {i < phases.length - 1 ? (
            <span
              aria-hidden="true"
              className="absolute top-11 bottom-1 left-[19px] w-0.5 bg-edge-strong md:top-5 md:right-[calc(-50%+0.75rem)] md:bottom-auto md:left-[calc(50%+1.5rem)] md:h-0.5 md:w-auto"
            />
          ) : null}
          <span
            aria-hidden="true"
            className="relative flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-accent bg-raised font-display text-[0.95rem] font-semibold text-fg"
          >
            {i + 1}
          </span>
          {/* Seven columns are narrow below 1024px, so the names step down a size there. */}
          <span className="text-small font-semibold text-fg md:max-lg:text-label">{phase}</span>
        </li>
      ))}
    </ol>
  );
}
