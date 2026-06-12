import SectionHead from "./SectionHead";
import { credentials } from "@/lib/content";

export default function Credentials() {
  return (
    <section id="credentials" className="pad-block-xl rule-top bg-bg" aria-labelledby="credentials-heading">
      <div className="u-container">
        <SectionHead
          index={credentials.index}
          kicker={credentials.kicker}
          heading={credentials.heading}
          headingId="credentials-heading"
        />
        <p data-reveal className="t-lead measure-wide mt-9">
          {credentials.intro}
        </p>

        <ul data-reveal-group className="mt-14 border-t border-line">
          {credentials.items.map((item) => (
            <li
              key={item.title}
              data-reveal
              className="grid items-baseline gap-x-10 gap-y-1 border-b border-line py-6 md:grid-cols-[1.4fr_1fr_auto]"
            >
              <h3 className="t-h3 text-ink">{item.title}</h3>
              <p className="t-body text-ink-muted">{item.detail}</p>
              <p className="t-coord text-signal">{item.issuer}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
