import { why } from "@/lib/content";
import SectionHeading from "@/components/ui/SectionHeading";
import TextScrub from "@/components/fx/TextScrub";

/**
 * The problem statement. Failure modes stack as sticky cards — each one slides
 * up over the last as the visitor scrolls — and the section closes on a
 * scroll-scrubbed pull statement that floods to full ink.
 */
export default function Why() {
  return (
    <section id="why" className="pad-block-xl rule-top">
      <div className="u-container">
        <div className="grid gap-10 md:grid-cols-12 md:gap-16">
          <SectionHeading
            className="md:col-span-7"
            index={why.index}
            kicker={why.kicker}
            heading={why.heading}
          />
          <div className="md:col-span-5 md:self-end">
            <p data-reveal className="t-body measure-wide" style={{ color: "var(--color-ink-soft)" }}>
              {why.body}
            </p>
          </div>
        </div>

        <ol className="stack-cards section-gap">
          {why.failures.map((f, i) => (
            <li
              key={f.n}
              className="stack-card"
              style={{ ["--stack-i" as string]: i }}
            >
              <span className="stack-card-letter" aria-hidden="true">
                {f.n}
              </span>
              <h3 className="t-h3" style={{ maxWidth: "20ch" }}>
                {f.title}
              </h3>
              <div className="flex h-full flex-col justify-between gap-6">
                <p className="t-body" style={{ color: "var(--color-ink-muted)" }}>
                  {f.body}
                </p>
                <span className="t-coord" aria-hidden="true">
                  Failure mode {String(i + 1).padStart(2, "0")} / {String(why.failures.length).padStart(2, "0")}
                </span>
              </div>
            </li>
          ))}
        </ol>
        <div className="stack-runout" aria-hidden="true" />

        <div className="section-gap-lg">
          <TextScrub
            as="p"
            className="t-h2 measure-statement"
            text={why.close}
          />
        </div>
      </div>
    </section>
  );
}
