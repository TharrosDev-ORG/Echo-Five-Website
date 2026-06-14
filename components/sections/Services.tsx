import { services } from "@/lib/content";
import SectionHeading from "@/components/ui/SectionHeading";

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

        <div
          className="section-gap grid gap-px md:grid-cols-2"
          data-reveal-group
          style={{ background: "var(--color-line)", border: "1px solid var(--color-line)" }}
        >
          {services.items.map((item) => (
            <article key={item.n} data-reveal className="svc">
              <div className="svc-top">
                <span className="svc-num">{item.n}</span>
                <span className="t-coord">{item.tag}</span>
              </div>
              <h3 className="t-h3 svc-title">{item.title}</h3>
              <p className="t-body" style={{ color: "var(--color-ink-muted)" }}>
                {item.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
