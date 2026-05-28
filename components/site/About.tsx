import Reveal from "@/components/site/Reveal";
import { about } from "@/lib/content";

export default function About() {
  return (
    <section id="about" className="section-pad bg-paper">
      <div className="u-container grid gap-x-12 gap-y-12 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <Reveal>
            <p className="t-label text-muted">{about.kicker}</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="t-display mt-6 text-[clamp(2.4rem,6vw,4.6rem)]">
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
    </section>
  );
}
