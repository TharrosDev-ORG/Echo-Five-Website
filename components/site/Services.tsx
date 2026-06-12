import SectionHead from "./SectionHead";
import { services } from "@/lib/content";

/**
 * Service index: large editorial rows rather than card grid. Each row
 * leads with its mono index, sweeps to a raised ground on hover, and
 * carries its discipline tag as a coordinate.
 */
export default function Services() {
  return (
    <section id="services" className="pad-block-2xl rule-top bg-bg-deep" aria-labelledby="services-heading">
      <div className="u-container">
        <SectionHead
          index={services.index}
          kicker={services.kicker}
          heading={services.heading}
          headingId="services-heading"
        />

        <div className="mt-9 flex flex-wrap items-start justify-between gap-x-12 gap-y-6">
          <p data-reveal className="t-lead measure-wide">
            {services.intro}
          </p>
          <ul data-reveal className="flex max-w-sm flex-wrap gap-2" aria-label="Platforms covered">
            {services.platforms.map((p) => (
              <li key={p} className="t-coord border border-line px-3 py-2 text-ink-muted">
                {p}
              </li>
            ))}
          </ul>
        </div>

        <ol data-reveal-group className="mt-16 border-t border-line">
          {services.items.map((item) => (
            <li key={item.n} data-reveal>
              <article className="group grid gap-x-10 gap-y-3 border-b border-line py-8 transition-colors duration-500 hover:bg-bg md:grid-cols-[5rem_1fr_minmax(0,38ch)_auto] md:items-baseline md:py-10">
                <span
                  aria-hidden="true"
                  className="t-coord text-ink-muted transition-colors duration-500 group-hover:text-signal"
                >
                  /{item.n}
                </span>
                <h3 className="t-h3 text-ink transition-transform duration-500 md:group-hover:translate-x-2">
                  {item.title}
                </h3>
                <p className="t-body text-ink-muted">{item.body}</p>
                <span className="t-coord hidden text-ink-muted lg:block">{item.tag}</span>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
