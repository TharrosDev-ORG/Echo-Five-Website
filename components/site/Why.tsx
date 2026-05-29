import Reveal from "@/components/site/Reveal";
import SectionMark from "@/components/site/SectionMark";
import { why } from "@/lib/content";

export default function Why() {
  return (
    <section id="why" className="pad-top-xl pad-bot-2xl bg-paper">
      <div className="u-container">
        <Reveal>
          <SectionMark index={why.index} kicker={why.kicker} />
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="t-h2 mt-14 max-w-[20ch] text-balance">{why.heading}</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="t-lead mt-10 max-w-[60ch] text-pretty text-muted">{why.body}</p>
        </Reveal>

        {/* Failure points as a vertical editorial list: big letter in the gutter,
            title and body split across the full width so the row fills the page
            instead of clustering in a left-hand column. */}
        <ol className="mt-24 border-t border-line">
          {why.failures.map((f, i) => (
            <Reveal as="li" key={f.n} delay={i * 0.06}>
              <div className="grid grid-cols-[var(--gutter-num)_1fr] items-baseline gap-x-6 border-b border-line py-14 sm:gap-x-10">
                <span className="font-display text-[clamp(2.4rem,6vw,4rem)] leading-none text-signal-deep">
                  {f.n}
                </span>
                <div className="min-w-0 lg:grid lg:grid-cols-[0.85fr_1.15fr] lg:items-baseline lg:gap-x-16">
                  <h3 className="t-h3 max-w-[20ch] text-balance">{f.title}</h3>
                  <p className="t-body mt-4 text-pretty text-muted lg:mt-0">{f.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={0.1}>
          <p className="mt-24 max-w-[22ch] text-balance font-display text-[clamp(1.7rem,3.6vw,2.7rem)] leading-[1.1] tracking-tight text-signal-deep">
            {why.close}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
