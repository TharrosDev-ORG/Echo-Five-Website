import { method } from "@/lib/content";
import { site } from "@/lib/site";
import SectionHeading from "@/components/ui/SectionHeading";
import AdoptionChart from "@/components/fx/AdoptionChart";

const ArrowOut = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M3 11L11 3M11 3H4M11 3V10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function Method() {
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
            <AdoptionChart />
          </div>
        </div>
      </div>
    </section>
  );
}
