import Reveal from "@/components/site/Reveal";
import SectionMark from "@/components/site/SectionMark";
import { method } from "@/lib/content";
import { site } from "@/lib/site";

/** A stepped signal rising: adoption climbing, week over week. */
function AdoptionMark() {
  const pts: [number, number][] = [
    [20, 150],
    [80, 140],
    [140, 108],
    [200, 76],
    [260, 48],
    [300, 28],
  ];
  return (
    <svg viewBox="0 0 320 180" className="h-full w-full" aria-hidden="true">
      <g stroke="var(--color-line)" strokeWidth="1">
        <line x1="0" y1="45" x2="320" y2="45" />
        <line x1="0" y1="90" x2="320" y2="90" />
        <line x1="0" y1="135" x2="320" y2="135" />
      </g>
      <polyline
        points="20,150 80,140 140,108 200,76 260,48 300,28 300,180 20,180"
        fill="var(--color-signal)"
        opacity="0.08"
        stroke="none"
      />
      <polyline
        points={pts.map(([x, y]) => `${x},${y}`).join(" ")}
        fill="none"
        stroke="var(--color-signal)"
        strokeWidth="2.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {pts.map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="3.5" fill="var(--color-signal)" />
      ))}
    </svg>
  );
}

export default function Method() {
  return (
    <section id="method" className="rule-top bg-bg-raised pad-block-xl">
      <div className="u-container">
        <div className="grid items-center gap-x-12 gap-y-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <SectionMark index={method.index} kicker={method.kicker} />
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="t-h2 mt-10 max-w-[16ch] text-balance">{method.heading}</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="t-body mt-8 text-pretty text-ink-muted measure-wide">{method.body}</p>
            </Reveal>
            <Reveal delay={0.15}>
              <a
                href={site.advantaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="link-arrow mt-10"
              >
                {method.cta}
                <span aria-hidden="true">&rarr;</span>
              </a>
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal delay={0.1}>
              <figure className="panel-elev p-8 sm:p-10">
                <figcaption className="flex items-center gap-2.5">
                  <span className="status-dot" aria-hidden="true" />
                  <span className="t-coord text-ink-muted">Adoption // week over week</span>
                </figcaption>
                <div className="mt-7 h-56">
                  <AdoptionMark />
                </div>
                <div className="mt-7 flex items-center justify-between border-t border-line pt-5">
                  <span className="font-mono text-[0.74rem] tracking-[0.04em] text-ink-muted">
                    Powered by Advanta365
                  </span>
                  <span className="font-mono text-[0.74rem] tracking-[0.04em] text-signal">
                    ▲ trending
                  </span>
                </div>
              </figure>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
