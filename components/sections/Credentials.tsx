import { credentials } from "@/lib/content";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Credentials() {
  return (
    <section id="credentials" className="pad-block-xl rule-top">
      <div className="u-container">
        <div className="grid gap-10 md:grid-cols-12 md:gap-16">
          <SectionHeading
            className="md:col-span-5"
            index={credentials.index}
            kicker={credentials.kicker}
            heading={credentials.heading}
          />
          <div className="md:col-span-7 md:self-end">
            <p data-reveal className="t-body measure-wide" style={{ color: "var(--color-ink-soft)" }}>
              {credentials.intro}
            </p>
          </div>
        </div>

        <ul className="section-gap" data-reveal-group style={{ borderTop: "1px solid var(--color-line)" }}>
          {credentials.items.map((item) => (
            <li key={item.title} data-reveal className="cred-row">
              <span className="cred-issuer t-coord">{item.issuer}</span>
              <span className="cred-title">{item.title}</span>
              <span className="cred-detail">{item.detail}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
