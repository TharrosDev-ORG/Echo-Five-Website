import Reveal from "@/components/site/Reveal";
import SectionMark from "@/components/site/SectionMark";
import { method } from "@/lib/content";
import { site } from "@/lib/site";

/** Minimal custom "adoption climbing" mark: a stepped signal rising. */
function AdoptionMark() {
  return (
    <svg viewBox="0 0 320 180" className="h-full w-full" aria-hidden="true">
      <g stroke="var(--color-line-dark)" strokeWidth="1">
        <line x1="0" y1="45" x2="320" y2="45" />
        <line x1="0" y1="90" x2="320" y2="90" />
        <line x1="0" y1="135" x2="320" y2="135" />
      </g>
      <polyline
        points="20,150 80,140 140,108 200,76 260,48 300,28"
        fill="none"
        stroke="var(--color-signal)"
        strokeWidth="2.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {[
        [20, 150],
        [80, 140],
        [140, 108],
        [200, 76],
        [260, 48],
        [300, 28],
      ].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="3.5" fill="var(--color-signal)" />
      ))}
    </svg>
  );
}

export default function Method() {
  return (
    <section id="method" className="section-pad bg-paper">
      <div className="u-container">
        <div className="grid items-center gap-x-12 gap-y-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Reveal>
              <SectionMark index={method.index} kicker={method.kicker} />
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="t-h2 mt-8 max-w-[16ch] text-balance">{method.heading}</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="t-body mt-6 text-muted measure-wide">{method.body}</p>
            </Reveal>
            <Reveal delay={0.15}>
              <a
                href={site.advantaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="link-arrow mt-8"
              >
                {method.cta}
                <span aria-hidden="true">&rarr;</span>
              </a>
            </Reveal>
          </div>

          <div className="lg:col-span-6">
            <Reveal delay={0.1}>
              <figure className="border border-line bg-ink-deep p-8">
                <figcaption className="font-mono text-[0.74rem] uppercase tracking-[0.14em] text-muted-on-dark">
                  Adoption, week over week
                </figcaption>
                <div className="mt-6 h-44">
                  <AdoptionMark />
                </div>
                <p className="mt-6 font-mono text-[0.74rem] tracking-[0.04em] text-muted-on-dark">
                  Powered by Advanta365
                </p>
              </figure>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
