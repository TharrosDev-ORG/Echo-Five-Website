import Reveal from "@/components/site/Reveal";
import SectionMark from "@/components/site/SectionMark";
import { credentials } from "@/lib/content";

export default function Credentials() {
  return (
    <section id="credentials" className="rule-top pad-block-xl">
      <div className="u-container">
        <Reveal>
          <SectionMark index={credentials.index} kicker={credentials.kicker} />
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="t-h2 mt-12 max-w-[20ch] text-balance">{credentials.heading}</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="t-body mt-8 max-w-[58ch] text-pretty text-ink-muted">{credentials.intro}</p>
        </Reveal>

        {/* A divided ledger of qualifications: issuer / title / detail per row. */}
        <ul className="mt-16 border-t border-line">
          {credentials.items.map((c, i) => (
            <Reveal as="li" key={c.title} delay={Math.min(i, 5) * 0.05}>
              <div className="grid items-baseline gap-x-10 gap-y-3 border-b border-line py-9 md:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)_auto]">
                <span className="flex items-center gap-2.5">
                  <span className="status-dot" aria-hidden="true" />
                  <span className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-signal">
                    {c.issuer}
                  </span>
                </span>
                <h3 className="t-h3 min-w-0 text-balance">{c.title}</h3>
                <p className="font-mono text-[0.78rem] tracking-[0.03em] text-ink-muted md:text-right">
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
