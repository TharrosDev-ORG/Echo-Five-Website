import { adkar } from "@/lib/content/approach";
import { cx } from "@/lib/cx";

/**
 * The five Prosci ADKAR stages as rising bars: the same shape as the Echofive
 * mark. Each stage builds on the one before; the last carries the accent.
 * An ordered list, so it reads in order without the drawing.
 */
export default function AdkarBars({ className }: { className?: string }) {
  const n = adkar.stages.length;
  return (
    <ol aria-label={adkar.stagesLabel} className={cx("grid gap-px min-[900px]:grid-cols-5", className)}>
      {adkar.stages.map((s, i) => {
        const last = i === n - 1;
        const height = 34 + i * 16; // percent of the bar track
        return (
          <li key={s.name} className="relative flex flex-col">
            {/* Bar track (wide screens) */}
            <div aria-hidden="true" className="relative hidden h-[22rem] items-end min-[900px]:flex">
              <div
                data-grow=""
                style={{ height: `${height}%`, "--d": 200 + i * 140 } as React.CSSProperties}
                className={cx(
                  "relative w-full rounded-t-[0.375rem]",
                  last ? "bg-accent" : "bg-surface-2",
                )}
              >
                <span
                  className={cx(
                    "serif absolute left-5 top-4 text-[clamp(3rem,2rem+3vw,5.5rem)] leading-none",
                    last ? "text-accent-ink" : "text-fg",
                  )}
                >
                  {s.key}
                </span>
              </div>
            </div>

            {/* Bar (small screens): grows sideways */}
            <div aria-hidden="true" className="flex items-center gap-4 min-[900px]:hidden">
              <span className="serif w-8 text-[2.5rem] leading-none text-fg">{s.key}</span>
              <span className="h-3 flex-1 overflow-hidden rounded-full bg-surface">
                <span
                  data-grow-x=""
                  style={{ width: `${height}%`, "--d": 150 + i * 120 } as React.CSSProperties}
                  className={cx("block h-full rounded-full", last ? "bg-accent" : "bg-fg-3")}
                />
              </span>
            </div>

            <div className="border-t border-fg pb-8 pt-4 min-[900px]:pr-5">
              <p className="label text-fg-3" aria-hidden="true">
                0{i + 1}
              </p>
              <h3 className="mt-2 text-h4 font-medium text-fg">{s.name}</h3>
              <p className="mt-2 text-[0.9375rem] text-fg-2">{s.body}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
