import Reveal from "@/components/site/Reveal";
import SectionMark from "@/components/site/SectionMark";
import { services } from "@/lib/content";

export default function Services() {
  return (
    <section id="services" className="section-pad relative isolate overflow-hidden bg-ink-deep text-paper">
      <div className="grain pointer-events-none absolute inset-0 -z-10" />
      <div className="u-container">
        <div className="grid gap-x-12 gap-y-8 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Reveal>
              <SectionMark index={services.index} kicker={services.kicker} tone="dark" />
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="t-h2 mt-8 max-w-[16ch] text-balance">{services.heading}</h2>
            </Reveal>
          </div>
          <div className="lg:col-span-6 lg:pt-2">
            <Reveal delay={0.1}>
              <p className="t-lead text-muted-on-dark measure-wide">{services.intro}</p>
            </Reveal>
            <Reveal delay={0.15}>
              <ul className="mt-7 flex flex-wrap gap-x-4 gap-y-2 font-mono text-[0.76rem] tracking-[0.04em] text-muted-on-dark">
                {services.platforms.map((p) => (
                  <li key={p} className="flex items-center gap-2">
                    <span className="text-signal">·</span>
                    {p}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>

        <ol className="mt-16 border-t border-line-dark">
          {services.items.map((s, i) => (
            <Reveal as="li" key={s.n} delay={i < 3 ? i * 0.06 : 0}>
              <div className="group grid items-baseline gap-x-8 gap-y-4 border-b border-line-dark py-9 md:grid-cols-12">
                <div className="flex items-baseline gap-4 md:col-span-5">
                  <span className="font-mono text-sm text-signal">{s.n}</span>
                  <h3 className="t-h3">{s.title}</h3>
                </div>
                <p className="t-body text-muted-on-dark md:col-span-5">{s.body}</p>
                <p className="font-mono text-[0.72rem] uppercase tracking-[0.12em] text-muted-on-dark md:col-span-2 md:text-right">
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
