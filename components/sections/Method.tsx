import { method } from "@/lib/content";
import { site } from "@/lib/site";
import SectionHeading from "@/components/ui/SectionHeading";

const ArrowOut = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M3 11L11 3M11 3H4M11 3V10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function Method() {
  // A simple rising "adoption" curve, drawn with bars.
  const bars = [18, 26, 31, 44, 52, 66, 73, 88, 96];

  return (
    <section id="method" className="pad-block-xl rule-top">
      <div className="u-container">
        <div className="grid items-center gap-14 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-6">
            <SectionHeading index={method.index} kicker={method.kicker} heading={method.heading} />
            <p data-reveal className="t-body measure-wide mt-8" style={{ color: "var(--color-ink-soft)" }}>
              {method.body}
            </p>
            <div data-reveal className="mt-9">
              <a href={site.advantaUrl} target="_blank" rel="noopener noreferrer" className="link-arrow" data-cursor>
                {method.cta}
                <ArrowOut />
              </a>
            </div>
          </div>

          <div className="md:col-span-6">
            <figure
              data-reveal="scale"
              className="card"
              style={{ borderRadius: 16, padding: "clamp(1.5rem,3vw,2.5rem)" }}
            >
              <figcaption className="t-coord mb-6 flex items-center justify-between">
                <span>Adoption · week over week</span>
                <span className="status-dot" aria-hidden="true" />
              </figcaption>
              <div style={{ display: "flex", alignItems: "flex-end", gap: "clamp(6px,1.2vw,14px)", height: "clamp(140px,22vw,230px)" }}>
                {bars.map((h, i) => (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      height: `${h}%`,
                      borderRadius: "4px 4px 0 0",
                      background:
                        i >= bars.length - 2
                          ? "var(--color-cobalt)"
                          : "color-mix(in oklch, var(--color-cobalt) 26%, var(--color-paper-3))",
                    }}
                  />
                ))}
              </div>
              <div className="mt-5 flex items-baseline justify-between">
                <span className="font-display" style={{ fontWeight: 740, fontSize: "clamp(1.8rem,3vw,2.4rem)", letterSpacing: "-0.02em" }}>
                  +96%
                </span>
                <span className="t-coord">Active usage at 8 weeks</span>
              </div>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
