import Reveal from "@/components/site/Reveal";
import SectionMark from "@/components/site/SectionMark";
import { why } from "@/lib/content";

export default function Why() {
  return (
    <section id="why" className="section-pad bg-paper">
      <div className="u-container">
        <Reveal>
          <SectionMark index={why.index} kicker={why.kicker} />
        </Reveal>

        <div className="mt-10 grid gap-x-12 gap-y-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <h2 className="t-h2 max-w-[18ch] text-balance">{why.heading}</h2>
            </Reveal>
          </div>
          <div className="lg:col-span-5 lg:pt-2">
            <Reveal delay={0.1}>
              <p className="t-body text-muted measure-wide">{why.body}</p>
            </Reveal>
          </div>
        </div>

        <ol className="mt-16 grid gap-px overflow-hidden border-t border-line sm:grid-cols-3">
          {why.failures.map((f, i) => (
            <Reveal as="li" key={f.n} delay={i * 0.08}>
              <div className="h-full border-t border-line pt-5 sm:border-t-0 sm:border-l sm:border-line sm:pt-0 sm:pl-6 first:sm:border-l-0">
                <span className="font-display text-3xl text-signal-deep">{f.n}</span>
                <h3 className="t-h3 mt-3">{f.title}</h3>
                <p className="t-body mt-3 text-muted">{f.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={0.1}>
          <p className="mt-14 font-display text-2xl text-ink sm:text-3xl">
            {why.close}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
