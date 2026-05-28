import Reveal from "@/components/site/Reveal";
import SectionMark from "@/components/site/SectionMark";
import { credentials } from "@/lib/content";

export default function Credentials() {
  return (
    <section id="credentials" className="section-pad bg-ink-deep text-paper">
      <div className="u-container">
        <div className="grid gap-x-12 gap-y-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <SectionMark index={credentials.index} kicker={credentials.kicker} tone="dark" />
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="t-h2 mt-8 max-w-[16ch] text-balance">{credentials.heading}</h2>
            </Reveal>
          </div>
          <div className="lg:col-span-5 lg:pt-2">
            <Reveal delay={0.1}>
              <p className="t-body text-muted-on-dark measure-wide">{credentials.intro}</p>
            </Reveal>
          </div>
        </div>

        <ul className="mt-14 grid border-t border-l border-line-dark sm:grid-cols-2 lg:grid-cols-3">
          {credentials.items.map((c, i) => (
            <Reveal as="li" key={c.title} delay={Math.min(i, 5) * 0.05}>
              <div className="flex h-full flex-col justify-between gap-8 border-b border-r border-line-dark bg-ink-deep p-7">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-signal">
                    {c.issuer}
                  </span>
                  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                    <g fill="none" stroke="var(--color-signal)">
                      <circle cx="12" cy="12" r="3" />
                      <circle cx="12" cy="12" r="8" opacity="0.5" />
                    </g>
                  </svg>
                </div>
                <div>
                  <h3 className="t-h3">{c.title}</h3>
                  <p className="mt-2 font-mono text-[0.78rem] tracking-[0.03em] text-muted-on-dark">
                    {c.detail}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
