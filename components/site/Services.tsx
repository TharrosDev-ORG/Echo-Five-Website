import Reveal from "@/components/site/Reveal";
import SectionMark from "@/components/site/SectionMark";
import { services } from "@/lib/content";

export default function Services() {
  return (
    <section id="services" className="pad-block-xl relative isolate overflow-hidden bg-ink-deep text-paper">
      <div className="grain pointer-events-none absolute inset-0 -z-10" />
      {/* Left rail holds the framing; the wide right column carries the list. */}
      <div className="u-container grid gap-x-12 gap-y-20 lg:grid-cols-12">
        <div className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <SectionMark index={services.index} kicker={services.kicker} tone="dark" />
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="t-h2 mt-12 text-balance">{services.heading}</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="t-body mt-10 text-pretty text-muted-on-dark">{services.intro}</p>
          </Reveal>
          <Reveal delay={0.15}>
            <ul className="mt-10 flex flex-wrap gap-x-4 gap-y-2 font-mono text-[0.76rem] tracking-[0.04em] text-muted-on-dark">
              {services.platforms.map((p) => (
                <li key={p} className="flex items-center gap-2">
                  <span className="text-signal">·</span>
                  {p}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <ol className="border-t border-line-dark lg:col-span-8">
          {services.items.map((s, i) => (
            <Reveal as="li" key={s.n} delay={i < 3 ? i * 0.06 : 0}>
              <div className="border-b border-line-dark py-14 md:grid md:grid-cols-[1fr_auto] md:items-start md:gap-x-12">
                <div className="min-w-0">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-[0.8rem] text-signal tabular-nums">{s.n}</span>
                    <h3 className="t-h3">{s.title}</h3>
                  </div>
                  <p className="t-body mt-5 max-w-[62ch] text-muted-on-dark">{s.body}</p>
                </div>
                <p className="mt-4 font-mono text-[0.72rem] uppercase tracking-[0.12em] text-muted-on-dark md:mt-1 md:text-right">
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
