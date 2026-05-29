import Reveal from "@/components/site/Reveal";
import SectionMark from "@/components/site/SectionMark";
import { credentials } from "@/lib/content";

export default function Credentials() {
  return (
    <section id="credentials" className="section-pad relative isolate overflow-hidden bg-ink-deep text-paper">
      <div className="grain pointer-events-none absolute inset-0 -z-10" />
      <div className="u-container">
        <Reveal>
          <SectionMark index={credentials.index} kicker={credentials.kicker} tone="dark" />
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="t-h2 mt-8 max-w-[20ch] text-balance">{credentials.heading}</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="t-body mt-6 max-w-[58ch] text-pretty text-muted-on-dark">{credentials.intro}</p>
        </Reveal>

        {/* A divided ledger of qualifications: issuer / title / detail per row,
            consistent with the editorial lists elsewhere (no card grid). */}
        <ul className="mt-14 border-t border-line-dark">
          {credentials.items.map((c, i) => (
            <Reveal as="li" key={c.title} delay={Math.min(i, 5) * 0.05}>
              <div className="grid items-baseline gap-x-10 gap-y-2 border-b border-line-dark py-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)_auto]">
                <span className="flex items-center gap-2.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true" className="shrink-0">
                    <g fill="none" stroke="var(--color-signal)">
                      <circle cx="12" cy="12" r="3" />
                      <circle cx="12" cy="12" r="8" opacity="0.5" />
                    </g>
                  </svg>
                  <span className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-signal">
                    {c.issuer}
                  </span>
                </span>
                <h3 className="t-h3 min-w-0 text-balance">{c.title}</h3>
                <p className="font-mono text-[0.78rem] tracking-[0.03em] text-muted-on-dark md:text-right">
                  {c.detail}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
