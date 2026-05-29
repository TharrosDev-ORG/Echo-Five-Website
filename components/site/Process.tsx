import Reveal from "@/components/site/Reveal";
import SectionMark from "@/components/site/SectionMark";
import { process } from "@/lib/content";

export default function Process() {
  return (
    <section id="process" className="section-pad bg-paper">
      <div className="u-container">
        <div className="grid gap-x-12 gap-y-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <SectionMark index={process.index} kicker={process.kicker} />
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="t-h2 mt-8 max-w-[16ch] text-balance">{process.heading}</h2>
            </Reveal>
          </div>
          <div className="lg:col-span-5 lg:pt-2">
            <Reveal delay={0.1}>
              <p className="t-body text-muted measure-wide">{process.intro}</p>
            </Reveal>
          </div>
        </div>

        <ol className="relative mt-20 grid gap-y-12 lg:grid-cols-5 lg:gap-x-6">
          {/* Connecting line, desktop only */}
          <div
            className="absolute left-[10%] right-[10%] top-7 hidden h-px bg-gradient-to-r from-line via-line to-signal-deep/40 lg:block"
            aria-hidden="true"
          />
          {process.stages.map((s, i) => (
            <Reveal as="li" key={s.name} delay={i * 0.08} className="relative">
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-line bg-paper font-display text-xl text-signal-deep">
                {s.key}
              </div>
              <p className="mt-2 font-mono text-[0.72rem] uppercase tracking-[0.14em] text-muted">
                Step {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="t-h3 mt-3">{s.name}</h3>
              <p className="t-body mt-2 text-muted">{s.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
