import Link from "next/link";
import { engagement, approachPage } from "@/lib/content/approach";
import { cx } from "@/lib/cx";
import Index from "@/components/ui/Index";
import Lines from "@/components/ui/Lines";
import Arrow from "@/components/ui/Arrow";
import Exhibit from "@/components/ui/Exhibit";

const copy = approachPage.engagement;
const steps = engagement.steps;

/*
 * When each node appears, timed to the line drawing past it. The line draws
 * over 2.2s with an in-out curve (globals.css), so it reaches the quarter
 * marks at roughly 40%, 50% and 60% of that time.
 */
const NODE_DELAY = [300, 1180, 1400, 1620];
/** Height of the numeral row; the line runs just under it. Spaces matter inside clamp(). */
const NUM = "clamp(5.5rem, 4rem + 3vw, 8rem)";
const draw = (d: number) => ({ "--d": d }) as React.CSSProperties;

/**
 * How an engagement runs: the four steps as Exhibit 03, a drawn timeline.
 * Horizontal from 900px, vertical below. The list is the content; the line
 * and nodes are decoration.
 */
export default function Engagement() {
  return (
    <section
      id="engagement"
      aria-labelledby="engagement-heading"
      className="tone-mist band"
    >
      <div className="wrap">
        <div className="grid-12 gap-y-10">
          <div className="col-span-12 min-[1200px]:col-span-6">
            <Index n="03">{engagement.index}</Index>
            <Lines
              as="h2"
              id="engagement-heading"
              className="serif mt-8 text-h2"
              lines={[engagement.heading]}
            />
          </div>
          <div className="col-span-12 min-[1200px]:col-span-5 min-[1200px]:col-start-8 min-[1200px]:pt-14">
            <p className="measure text-lead text-fg-2" data-reveal="">
              {engagement.intro}
            </p>
          </div>
        </div>

        <Exhibit
          n="03"
          title={copy.exhibitTitle}
          note={copy.exhibitNote}
          className="mt-20 min-[900px]:mt-28"
        >
          <div className="relative mt-12 pb-6 min-[900px]:mt-16 min-[900px]:pb-10">
            {/* The line (wide screens): a quiet baseline with the accent drawn over it. */}
            <svg
              aria-hidden="true"
              viewBox="0 0 1000 16"
              preserveAspectRatio="none"
              className="pointer-events-none absolute inset-x-0 top-[calc(var(--num)_-_0.0625rem)] hidden h-4 w-full overflow-visible min-[900px]:block"
              style={
                {
                  "--num": NUM,
                } as React.CSSProperties
              }
            >
              <path
                d="M0 8H1000"
                stroke="var(--rule-strong)"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M0 8H1000"
                stroke="var(--accent)"
                strokeWidth="2"
                fill="none"
                vectorEffect="non-scaling-stroke"
                pathLength={1}
                data-draw=""
                style={draw(300)}
              />
            </svg>

            <ol className="grid min-[900px]:grid-cols-4">
              {steps.map((s, i) => {
                const last = i === steps.length - 1;
                return (
                  <li
                    key={s.n}
                    className="relative grid grid-cols-[1.75rem_minmax(0,1fr)] gap-x-5 pb-14 last:pb-0 min-[900px]:block min-[900px]:pb-0 min-[900px]:pr-[clamp(1.5rem,0.5rem+2vw,3.5rem)]"
                    style={
                      {
                        "--num": NUM,
                      } as React.CSSProperties
                    }
                  >
                    {/* Small screens: a vertical segment from this node down to the next. */}
                    {!last && (
                      <svg
                        aria-hidden="true"
                        viewBox="0 0 16 1000"
                        preserveAspectRatio="none"
                        className="pointer-events-none absolute left-[0.375rem] top-3 h-full w-4 overflow-visible min-[900px]:hidden"
                      >
                        <path
                          d="M8 0V1000"
                          stroke="var(--rule-strong)"
                          strokeWidth="1"
                          vectorEffect="non-scaling-stroke"
                        />
                        <path
                          d="M8 0V1000"
                          stroke="var(--accent)"
                          strokeWidth="2"
                          fill="none"
                          vectorEffect="non-scaling-stroke"
                          pathLength={1}
                          data-draw=""
                          style={draw(300 + i * 450)}
                        />
                      </svg>
                    )}

                    {/* Numeral (wide screens), set above the line. */}
                    <p
                      aria-hidden="true"
                      className="serif tabular hidden h-[var(--num)] text-[clamp(3.5rem,2.4rem+3vw,6.5rem)] leading-none tracking-[-0.035em] text-fg min-[900px]:block"
                    >
                      {s.n}
                    </p>

                    {/* Node */}
                    <span
                      aria-hidden="true"
                      data-fade=""
                      style={{ "--d": NODE_DELAY[i] } as React.CSSProperties}
                      className={cx(
                        "relative z-10 mt-[0.3125rem] block h-3.5 w-3.5 justify-self-center rounded-full min-[900px]:justify-self-start ring-4 ring-bg min-[900px]:mt-0",
                        last
                          ? "bg-accent"
                          : "bg-bg shadow-[inset_0_0_0_2px_var(--fg)]",
                      )}
                    />

                    <div className="min-[900px]:mt-10">
                      <p
                        className="label text-accent min-[900px]:hidden"
                        aria-hidden="true"
                      >
                        {s.n}
                      </p>
                      <h3 className="serif mt-2 text-h3 text-fg min-[900px]:mt-0">
                        {s.title}
                      </h3>
                      <p className="mt-4 max-w-[34rem] text-fg-2 min-[900px]:max-w-[30ch]">
                        {s.body}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </Exhibit>

        {/* Advanta365, used inside the work. */}
        <div
          className="mt-20 grid gap-6 border-t border-rule pt-8 min-[900px]:mt-28 min-[900px]:grid-cols-[minmax(0,0.6fr)_minmax(0,1.4fr)_auto] min-[900px]:items-baseline min-[900px]:gap-10"
          data-reveal=""
        >
          <p className="label text-fg-3">{copy.toolkit.label}</p>
          <p className="max-w-[44rem] text-lead text-fg-2">
            {copy.toolkit.body}
          </p>
          <Link
            href={copy.toolkit.href}
            className="inline-flex min-h-11 items-center gap-1.5 text-small font-medium text-fg"
          >
            <span className="link">{copy.toolkit.cta}</span>
            <Arrow />
          </Link>
        </div>
      </div>
    </section>
  );
}
