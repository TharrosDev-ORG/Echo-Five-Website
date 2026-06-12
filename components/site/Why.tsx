import SectionHead from "./SectionHead";
import { why } from "@/lib/content";

export default function Why() {
  return (
    <section id="why" className="pad-block-2xl relative bg-bg" aria-labelledby="why-heading">
      <div className="u-container">
        <SectionHead index={why.index} kicker={why.kicker} heading={why.heading} headingId="why-heading" />

        <p data-reveal className="t-lead measure-wide mt-9">
          {why.body}
        </p>

        <div data-reveal-group className="mt-16 grid gap-px border border-line bg-line md:grid-cols-3">
          {why.failures.map((f) => (
            <article key={f.n} data-reveal className="group relative bg-bg p-8 transition-colors duration-500 hover:bg-bg-raised md:p-10">
              <span
                aria-hidden="true"
                className="font-display text-6xl font-[720] tracking-tight text-bg-elev transition-colors duration-500 group-hover:text-signal md:text-7xl"
              >
                {f.n}
              </span>
              <h3 className="t-h3 mt-6 text-ink">{f.title}</h3>
              <p className="t-body mt-4 text-ink-muted">{f.body}</p>
            </article>
          ))}
        </div>

        <p data-reveal className="t-h3 mt-16 text-signal">
          {why.close}
        </p>
      </div>
    </section>
  );
}
