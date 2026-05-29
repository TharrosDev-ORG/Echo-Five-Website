import Reveal from "@/components/site/Reveal";
import { about, principal } from "@/lib/content";

export default function About() {
  return (
    <section id="about" className="pad-block-2xl bg-paper">
      <div className="u-container grid gap-x-12 gap-y-12 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <Reveal>
            <p className="t-label text-muted">{about.kicker}</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="t-display mt-7 text-[clamp(2.4rem,6vw,4.6rem)]">
              {about.heading[0]}
              <br />
              {about.heading[1]}
              <br />
              <span className="text-signal-deep">{about.heading[2]}</span>
            </h2>
          </Reveal>
        </div>
        <div className="flex flex-col gap-6 lg:col-span-5 lg:col-start-8 lg:pt-3">
          {about.body.map((p, i) => (
            <Reveal key={i} delay={0.1 + i * 0.06}>
              <p className={i === 0 ? "t-lead text-ink" : "t-body text-muted"}>{p}</p>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Who you'll be working with */}
      <div className="u-container mt-20 lg:mt-28">
        <Reveal>
          <div className="grid gap-x-12 gap-y-8 border-t border-line pt-12 lg:grid-cols-12">
            <div className="flex items-center gap-5 lg:col-span-5">
              <div
                className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-signal-deep/45 font-display text-xl text-signal-deep"
                aria-hidden="true"
              >
                {principal.monogram}
              </div>
              <div>
                <p className="font-display text-xl text-ink">{principal.name}</p>
                <p className="mt-1 font-mono text-[0.78rem] uppercase tracking-[0.12em] text-muted">
                  {principal.role}
                </p>
              </div>
            </div>
            <div className="lg:col-span-7">
              <p className="t-body text-muted measure-wide">{principal.bio}</p>
              <p className="mt-5 font-mono text-[0.78rem] tracking-[0.03em] text-signal-deep">
                {principal.credentials}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
