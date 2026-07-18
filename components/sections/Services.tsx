import { services } from "@/lib/content";
import SectionHeading from "@/components/ui/SectionHeading";

const ArrowRight = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
    <path d="M4 11h14m0 0-6-6m6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/**
 * The service list as editorial rows: stroked numeral, title, body, tag.
 * Hovering floods the full row cobalt and flips the type to the on-cobalt
 * palette. All content is always visible — the flood is pure emphasis.
 */
export default function Services() {
  return (
    <section id="services" className="pad-block-xl rule-top band-2">
      <div className="u-container">
        <div className="grid gap-10 md:grid-cols-12 md:gap-16">
          <SectionHeading
            className="md:col-span-6"
            index={services.index}
            kicker={services.kicker}
            heading={services.heading}
          />
          <div className="md:col-span-6 md:self-end">
            <p data-reveal className="t-lead measure-wide">
              {services.intro}
            </p>
            <ul className="mt-7 flex flex-wrap gap-2" data-reveal aria-label="Platforms">
              {services.platforms.map((p) => (
                <li key={p} className="chip">
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="section-gap" data-reveal-group>
          {services.items.map((item) => (
            <article key={item.n} data-reveal className="svc-row" data-cursor>
              <span className="svc-num" aria-hidden="true">
                {item.n}
              </span>
              <h3 className="t-h3 svc-title" style={{ maxWidth: "18ch" }}>
                {item.title}
              </h3>
              <p className="t-body svc-body" style={{ maxWidth: "48ch" }}>
                {item.body}
              </p>
              <span className="t-coord svc-tag">{item.tag}</span>
              <span className="svc-arrow" aria-hidden="true">
                <ArrowRight />
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
