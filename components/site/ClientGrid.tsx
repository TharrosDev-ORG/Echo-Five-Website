import Reveal from "@/components/site/Reveal";
import SectionMark from "@/components/site/SectionMark";
import { clients } from "@/lib/content";

export default function ClientGrid() {
  return (
    <section id="clients" className="rule-top bg-bg-raised pad-block-xl">
      <div className="u-container">
        <Reveal>
          <SectionMark index={clients.index} kicker={clients.kicker} />
        </Reveal>
        <div className="mt-10 grid gap-x-12 gap-y-6 lg:grid-cols-[1fr_1fr] lg:items-end">
          <Reveal delay={0.05}>
            <h2 className="t-h2 max-w-[18ch] text-balance">{clients.heading}</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="t-body text-pretty text-ink-muted measure-wide">{clients.intro}</p>
          </Reveal>
        </div>

        <div className="mt-14 space-y-px">
          {clients.groups.map((group, gi) => (
            <Reveal key={group.label} delay={gi * 0.06}>
              <div className="panel relative overflow-hidden">
                {/* scanline sweep for the "live readout" feel */}
                <div
                  className="scanline pointer-events-none absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-signal/10 to-transparent"
                  aria-hidden="true"
                />
                <div className="relative flex items-center justify-between border-b border-line px-5 py-3.5 sm:px-7">
                  <span className="font-mono text-[0.78rem] tracking-[0.04em] text-ink">
                    <span className="text-signal">&gt;</span> {group.label}
                  </span>
                  <span className="font-mono text-[0.74rem] tabular-nums text-ink-muted">
                    [{String(group.orgs.length).padStart(2, "0")}]
                  </span>
                </div>
                <ul className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                  {group.orgs.map((o) => (
                    <li
                      key={o.short}
                      className="flex items-baseline gap-3 border-b border-line px-5 py-4 last:border-b-0 sm:px-7"
                    >
                      <span className="min-w-[4.5rem] shrink-0 font-mono text-[0.82rem] font-medium tracking-[0.02em] text-signal">
                        {o.short}
                      </span>
                      <span className="t-body text-ink-soft">{o.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
