import Reveal from "@/components/site/Reveal";
import SectionMark from "@/components/site/SectionMark";
import { about, principal } from "@/lib/content";

export default function About() {
  return (
    <section id="about" className="rule-top bg-bg-raised pad-block-2xl">
      <div className="u-container grid gap-x-12 gap-y-12 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <Reveal>
            <SectionMark kicker={about.kicker} />
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="t-display mt-9 text-[clamp(2.2rem,6vw,4.6rem)]">
              <span className="block">{about.heading[0]}</span>
              <span className="block">{about.heading[1]}</span>
              <span className="block text-signal">{about.heading[2]}</span>
            </h2>
          </Reveal>
        </div>
        <div className="flex flex-col gap-7 lg:col-span-5 lg:col-start-8 lg:pt-3">
          {about.body.map((p, i) => (
            <Reveal key={i} delay={0.1 + i * 0.06}>
              <p className={i === 0 ? "t-lead text-ink" : "t-body text-ink-muted"}>{p}</p>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Who you'll be working with */}
      <div className="u-container mt-20 lg:mt-28">
        <Reveal>
          <div className="panel grid gap-x-12 gap-y-8 p-8 sm:p-10 lg:grid-cols-12">
            <div className="flex items-center gap-5 lg:col-span-5">
              <div
                className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-line-signal font-display text-xl font-bold text-signal"
                aria-hidden="true"
              >
                {principal.monogram}
              </div>
              <div>
                <p className="font-display text-xl font-semibold text-ink">{principal.name}</p>
                <p className="mt-2 font-mono text-[0.78rem] uppercase tracking-[0.12em] text-ink-muted">
                  {principal.role}
                </p>
              </div>
            </div>
            <div className="lg:col-span-7">
              <p className="t-body text-ink-muted measure-wide">{principal.bio}</p>
              <p className="mt-6 font-mono text-[0.78rem] tracking-[0.03em] text-signal">
                {principal.credentials}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
