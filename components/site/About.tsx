import { about, principal } from "@/lib/content";

export default function About() {
  return (
    <section id="about" className="pad-block-2xl rule-top bg-bg-deep" aria-labelledby="about-heading">
      <div className="u-container grid items-start gap-x-16 gap-y-12 lg:grid-cols-[1.2fr_1fr]">
        <div data-reveal-group>
          <p data-reveal className="t-coord flex items-baseline gap-4 text-ink-muted">
            <span className="text-signal">/</span>
            {about.kicker}
          </p>
          <h2 id="about-heading" className="t-h2 mt-7 text-ink">
            {about.heading.map((line, i) => (
              <span key={line} data-reveal className={`block ${i === 2 ? "text-signal" : ""}`}>
                {line}
              </span>
            ))}
          </h2>
          <div className="mt-9 flex max-w-[60ch] flex-col gap-5">
            {about.body.map((para) => (
              <p key={para.slice(0, 24)} data-reveal className="t-body text-ink-soft">
                {para}
              </p>
            ))}
          </div>
        </div>

        <aside data-reveal="scale" className="panel-elev p-8 md:p-10 lg:mt-16" aria-label="Principal">
          <div className="flex items-center gap-5">
            <span
              aria-hidden="true"
              className="flex h-16 w-16 items-center justify-center border border-line-signal bg-bg-deep font-display text-xl font-[700] text-signal"
            >
              {principal.monogram}
            </span>
            <div>
              <h3 className="t-h3 text-ink">{principal.name}</h3>
              <p className="t-coord mt-1 text-ink-muted">{principal.role}</p>
            </div>
          </div>
          <p className="t-body mt-7 text-ink-soft">{principal.bio}</p>
          <p className="t-coord mt-7 border-t border-line pt-5 text-signal">{principal.credentials}</p>
        </aside>
      </div>
    </section>
  );
}
