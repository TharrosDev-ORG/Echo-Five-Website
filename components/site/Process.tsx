import Reveal from "@/components/site/Reveal";
import SectionMark from "@/components/site/SectionMark";
import { process } from "@/lib/content";

export default function Process() {
  return (
    <section id="process" className="pad-top-xl pad-bot-lg bg-paper">
      <div className="u-container">
        <Reveal>
          <SectionMark index={process.index} kicker={process.kicker} />
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="t-h2 mt-14 max-w-[18ch] text-balance">{process.heading}</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="t-body mt-10 max-w-[58ch] text-pretty text-muted">{process.intro}</p>
        </Reveal>

        {/* ADKAR as a connected sequence: horizontal track on desktop, a
            vertical connected timeline on mobile. The order carries meaning. */}
        <ol className="relative mt-24">
          <div
            className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-line via-signal-deep/30 to-signal-deep/50 lg:block"
            aria-hidden="true"
          />
          <div className="grid gap-y-16 lg:grid-cols-5 lg:gap-x-6 lg:gap-y-0">
            {process.stages.map((s, i) => (
              <Reveal as="li" key={`${s.key}-${s.name}`} delay={i * 0.08} className="relative flex gap-5 lg:block">
                {i < process.stages.length - 1 && (
                  <span
                    className="absolute left-7 top-14 -bottom-16 w-px bg-line lg:hidden"
                    aria-hidden="true"
                  />
                )}
                <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-line bg-paper font-display text-xl text-signal-deep">
                  {s.key}
                </div>
                <div className="min-w-0 lg:mt-8">
                  <p className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-muted">
                    Step {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="t-h3 mt-3">{s.name}</h3>
                  <p className="t-body mt-4 text-muted">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </ol>
      </div>
    </section>
  );
}
