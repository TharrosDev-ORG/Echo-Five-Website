import SectionHead from "./SectionHead";
import { method } from "@/lib/content";
import { site } from "@/lib/site";

export default function Method() {
  return (
    <section id="method" className="pad-block-xl rule-top bg-bg-deep" aria-labelledby="method-heading">
      <div className="u-container grid items-start gap-x-16 gap-y-10 lg:grid-cols-[1.1fr_1fr]">
        <SectionHead index={method.index} kicker={method.kicker} heading={method.heading} headingId="method-heading" />

        <div data-reveal-group className="lg:pt-2">
          <p data-reveal className="t-body measure-wide text-ink-soft">
            {method.body}
          </p>
          <div data-reveal className="mt-8">
            <a href={site.advantaUrl} target="_blank" rel="noopener noreferrer" className="link-arrow">
              {method.cta}
              <span aria-hidden="true">→</span>
            </a>
          </div>

          {/* Instrument readout: a decorative adoption curve, signal-lit. */}
          <figure data-reveal aria-hidden="true" className="panel mt-12 p-6">
            <svg viewBox="0 0 400 120" className="block w-full" role="presentation">
              <g stroke="var(--color-line)" strokeWidth="1">
                {[0, 1, 2, 3].map((i) => (
                  <line key={i} x1="0" y1={20 + i * 26} x2="400" y2={20 + i * 26} />
                ))}
              </g>
              <path
                d="M0 104 C 70 102, 110 96, 150 78 S 240 30, 300 22 S 380 14, 400 13"
                fill="none"
                stroke="var(--color-signal)"
                strokeWidth="2"
              />
              <circle cx="300" cy="22" r="3.5" fill="var(--color-signal)" />
              <text x="290" y="50" fontFamily="var(--font-mono)" fontSize="10" fill="var(--color-ink-muted)">
                adoption, week over week
              </text>
            </svg>
          </figure>
        </div>
      </div>
    </section>
  );
}
