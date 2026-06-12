import { clients } from "@/lib/content";

/**
 * Early social proof under the hero: a count-up stat pair and a slow
 * marquee of client names. Marquee is CSS-only (cheap, pausable on
 * hover) and duplicated for the seamless loop.
 */
export default function TrustStrip() {
  const names = clients.groups.flatMap((g) => g.orgs.map((o) => o.short));

  return (
    <section className="rule-top border-b border-line bg-bg" aria-label="Track record">
      <div className="u-container grid items-center gap-x-10 gap-y-8 py-10 md:grid-cols-[auto_auto_1fr]">
        <p className="flex items-baseline gap-3">
          <span
            data-count="20"
            data-count-suffix="+"
            className="font-display text-5xl font-[720] tracking-tight text-signal"
          >
            20+
          </span>
          <span className="t-coord text-ink-muted">years in practice</span>
        </p>
        <p className="flex items-baseline gap-3">
          <span
            data-count="24"
            data-count-suffix="+"
            className="font-display text-5xl font-[720] tracking-tight text-signal"
          >
            24+
          </span>
          <span className="t-coord text-ink-muted">organizations served</span>
        </p>

        <div className="marquee relative overflow-hidden md:ml-4" aria-hidden="true">
          <div className="marquee-track gap-10">
            {[0, 1].map((copy) => (
              <ul key={copy} className="flex shrink-0 items-center gap-10 pr-10">
                {names.map((name) => (
                  <li key={`${copy}-${name}`} className="t-coord whitespace-nowrap text-ink-muted">
                    {name}
                  </li>
                ))}
              </ul>
            ))}
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-bg to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-bg to-transparent" />
        </div>
      </div>
    </section>
  );
}
