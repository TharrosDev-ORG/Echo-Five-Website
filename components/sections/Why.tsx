import { why } from "@/lib/content";
import SectionHeading from "@/components/ui/SectionHeading";
import SplitText from "@/components/ui/SplitText";

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

        <ol
          className="section-gap grid gap-px md:grid-cols-3"
          data-reveal-group
          style={{ background: "var(--color-line)", border: "1px solid var(--color-line)" }}
        >
          {why.failures.map((f) => (
            <li
              key={f.n}
              data-reveal
              className="flex flex-col gap-5"
              style={{ background: "var(--color-paper)", padding: "clamp(1.75rem,3vw,2.75rem)" }}
            >
              <span
                className="font-display"
                style={{
                  fontWeight: 740,
                  fontSize: "clamp(2.6rem,6vw,4rem)",
                  lineHeight: 1,
                  color: "var(--color-cobalt)",
                }}
                aria-hidden="true"
              >
                {f.n}
              </span>
              <h3 className="t-h3" style={{ maxWidth: "20ch" }}>
                {f.title}
              </h3>
              <p className="t-body" style={{ color: "var(--color-ink-muted)" }}>
                {f.body}
              </p>
            </li>
          ))}
        </ol>

        <div className="section-gap-lg">
          <SplitText
            as="p"
            className="t-h2 measure-statement"
            text={why.close}
          />
        </div>
      </div>
    </section>
  );
}
