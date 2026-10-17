import { services } from "@/lib/content/services";
import { cx } from "@/lib/cx";
import { GO_LIVE, PHASES, pct, spans, spanText } from "@/components/services/span";

const copy = services.rollout;
const ticks = Array.from({ length: PHASES + 1 }, (_, i) => i);

/** Faint phase rules and the dashed go-live line, drawn behind each track. */
function Grid() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      {ticks.map((t) => (
        <span
          key={t}
          className={cx(
            "absolute inset-y-0 w-px",
            t === GO_LIVE ? "border-l border-dashed border-fg" : "bg-rule",
            t === PHASES && "-translate-x-px",
          )}
          style={{ left: pct(t) }}
        />
      ))}
    </div>
  );
}

/**
 * Exhibit 01 on /services: the six services laid on one rollout, from before
 * the migration to after go-live. Each row is a list item whose title links to
 * the service and whose span is also given in text, so it reads without the
 * drawing.
 */
export default function RolloutMap() {
  const cols = "grid min-[900px]:grid-cols-[17rem_minmax(0,1fr)] min-[900px]:gap-x-10 min-[1200px]:grid-cols-[21rem_minmax(0,1fr)]";
  return (
    <div className="relative">
      {/* Phase heads */}
      <div aria-hidden="true" className={cols}>
        <p className="label hidden self-end pb-4 text-fg-3 min-[900px]:block">{copy.serviceLabel}</p>
        <div className="relative grid grid-cols-3">
          <Grid />
          {copy.phases.map((p, i) => (
            <p key={p} className={cx("label relative pb-4 pl-3 pr-2 text-fg-3", i === 2 && "pl-4 text-fg")}>
              {p}
            </p>
          ))}
        </div>
      </div>

      <ol className="border-t border-fg">
        {services.items.map((s, i) => {
          const span = spans[s.slug];
          const notes = copy.annotations[s.slug] ?? [];
          const late = span.start >= 1.5;
          return (
            <li key={s.slug} className={cx(cols, "border-b border-rule")}>
              <a
                href={`#${s.slug}`}
                className="group flex min-h-14 items-center gap-4 pt-4 min-[900px]:py-4"
              >
                <span aria-hidden="true" className="label w-6 shrink-0 text-accent">
                  {s.n}
                </span>
                <span className="link-quiet text-small font-medium text-fg">{s.title}</span>
              </a>
              <p className="sr-only">{spanText(s.slug)}</p>
              <div aria-hidden="true" className="relative mt-1 h-11 min-[640px]:h-16 min-[900px]:mt-0 min-[900px]:h-[4.75rem]">
                <Grid />
                {/* Annotation, from the service's own copy */}
                <span
                  className="label absolute top-3 hidden whitespace-nowrap bg-bg px-2 text-fg-2 min-[640px]:block"
                  style={late ? { right: `calc(100% - ${pct(span.end)})` } : { left: pct(span.start) }}
                  data-fade=""
                >
                  {notes[0]}
                </span>
                {notes[1] && span.tail !== undefined && (
                  <span
                    className="label absolute top-3 hidden whitespace-nowrap bg-bg px-3 text-fg-2 min-[640px]:block"
                    style={{ left: pct(span.end) }}
                    data-fade=""
                  >
                    {notes[1]}
                  </span>
                )}
                {/* The span */}
                <span
                  className="absolute bottom-4 h-2.5 min-[640px]:bottom-5 rounded-full bg-accent min-[900px]:bottom-6"
                  style={{ left: pct(span.start), width: pct(span.end - span.start), "--d": 200 + i * 110 } as React.CSSProperties}
                  data-grow-x=""
                />
                {span.tail !== undefined && (
                  <span
                    className="absolute bottom-4 h-2.5 min-[640px]:bottom-5 rounded-r-full bg-mark min-[900px]:bottom-6"
                    style={{ left: pct(span.end), width: pct(span.tail - span.end), "--d": 1100 } as React.CSSProperties}
                    data-grow-x=""
                  />
                )}
                <span
                  className="absolute bottom-4 h-2.5 min-[640px]:bottom-5 w-2.5 -translate-x-1/2 rounded-full bg-fg ring-4 ring-bg min-[900px]:bottom-6"
                  style={{ left: pct(span.start) }}
                />
              </div>
            </li>
          );
        })}
      </ol>

      {/* Go-live tick under the tracks */}
      <div aria-hidden="true" className={cols}>
        <span className="hidden min-[900px]:block" />
        <div className="relative h-10">
          <span
            className="label absolute top-3 -translate-x-1/2 whitespace-nowrap bg-bg px-2 text-fg"
            style={{ left: pct(GO_LIVE) }}
          >
            {copy.goLive}
          </span>
        </div>
      </div>

      {/* Key */}
      <ul aria-hidden="true" className="label mt-4 flex flex-wrap gap-x-8 gap-y-2 text-fg-2">
        <li className="flex items-center gap-2.5">
          <span className="h-2.5 w-7 rounded-full bg-accent" />
          {copy.key.service}
        </li>
        <li className="flex items-center gap-2.5">
          <span className="h-2.5 w-7 rounded-r-full bg-mark" />
          {copy.key.agents}
        </li>
      </ul>
    </div>
  );
}
