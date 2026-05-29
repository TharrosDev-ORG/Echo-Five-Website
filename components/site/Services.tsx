import Reveal from "@/components/site/Reveal";
import SectionMark from "@/components/site/SectionMark";
import { services } from "@/lib/content";

export default function Services() {
  return (
    <section id="services" className="rule-top bg-bg-raised pad-block-xl">
      {/* Left rail holds the framing; the wide right column carries the list. */}
      <div className="u-container grid gap-x-12 gap-y-16 lg:grid-cols-12">
        <div className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <SectionMark index={services.index} kicker={services.kicker} />
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="t-h2 mt-10 text-balance">{services.heading}</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="t-body mt-8 text-pretty text-ink-muted">{services.intro}</p>
          </Reveal>
          <Reveal delay={0.15}>
            <ul className="mt-9 flex flex-wrap gap-2">
              {services.platforms.map((p) => (
                <li
                  key={p}
                  className="panel-elev px-3 py-1.5 font-mono text-[0.72rem] tracking-[0.04em] text-ink-soft"
                >
                  {p}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <ol className="border-t border-line lg:col-span-8">
          {services.items.map((s, i) => (
            <Reveal as="li" key={s.n} delay={i < 3 ? i * 0.06 : 0}>
              <div className="group border-b border-line py-11 transition-colors md:grid md:grid-cols-[1fr_auto] md:items-start md:gap-x-12">
                <div className="min-w-0">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-[0.8rem] tabular-nums text-signal">{s.n}</span>
                    <h3 className="t-h3 transition-colors group-hover:text-signal">{s.title}</h3>
                  </div>
                  <p className="t-body mt-5 max-w-[62ch] text-ink-muted">{s.body}</p>
                </div>
                <p className="mt-4 font-mono text-[0.72rem] uppercase tracking-[0.12em] text-ink-muted md:mt-1 md:text-right">
                  {s.tag}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
