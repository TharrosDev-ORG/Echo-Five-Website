import { services } from "@/lib/content/services";
import { cx } from "@/lib/cx";
import { GO_LIVE, pct, spans, spanText } from "@/components/services/span";

/**
 * A small copy of one row of Exhibit 01, set beside each service: where it
 * sits across a rollout. The text above the track carries the meaning.
 */
export default function SpanTrack({ slug, className }: { slug: string; className?: string }) {
  const span = spans[slug];
  const phases = services.rollout.phases;
  return (
    <div className={className} data-observe="">
      <p className="label text-fg-3">
        {services.whereLabel} <span className="text-fg-3">·</span>{" "}
        <span className="text-fg">{spanText(slug)}</span>
      </p>
      <div aria-hidden="true" className="relative mt-4">
        <div className="grid grid-cols-3 gap-[3px]">
          {phases.map((p) => (
            <span key={p} className="h-2 rounded-full bg-surface-2" />
          ))}
        </div>
        <span
          className="absolute inset-y-0 rounded-full bg-accent"
          style={{ left: pct(span.start), width: pct(span.end - span.start), "--d": 250 } as React.CSSProperties}
          data-grow-x=""
        />
        {span.tail !== undefined && (
          <span
            className="absolute inset-y-0 rounded-r-full bg-mark"
            style={{ left: pct(span.end), width: pct(span.tail - span.end), "--d": 900 } as React.CSSProperties}
            data-grow-x=""
          />
        )}
        <span
          className="absolute -inset-y-1.5 w-0 border-l border-dashed border-fg"
          style={{ left: pct(GO_LIVE) }}
        />
      </div>
      <div aria-hidden="true" className="label mt-3 grid grid-cols-3 text-[0.6875rem] text-fg-3">
        {phases.map((p, i) => (
          <span key={p} className={cx("pr-2", i === 2 && "pl-2")}>
            {p}
          </span>
        ))}
      </div>
    </div>
  );
}
