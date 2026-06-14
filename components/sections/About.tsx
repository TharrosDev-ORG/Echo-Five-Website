import { about, principal } from "@/lib/content";
import SplitText from "@/components/ui/SplitText";

export default function About() {
  return (
    <section id="about" className="pad-block-xl rule-top band-3">
      <div className="u-container">
        <div className="mb-8 flex items-center gap-4" data-reveal="fade">
          <span className="t-coord">{about.kicker}</span>
        </div>

        <h2 className="t-display" style={{ maxWidth: "14ch" }}>
          {about.heading.map((line, i) => (
            <SplitText
              key={i}
              as="span"
              className={`block${i === about.heading.length - 1 ? " cobalt" : ""}`}
              text={line}
            />
          ))}
        </h2>

        <div className="mt-16 grid gap-12 md:mt-24 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-7" data-reveal-group>
            {about.body.map((p, i) => (
              <p
                key={i}
                data-reveal
                className="t-body measure-wide"
                style={{ marginTop: i === 0 ? 0 : "1.5rem", color: i === 0 ? "var(--color-ink)" : "var(--color-ink-soft)" }}
              >
                {p}
              </p>
            ))}
          </div>

          <aside className="md:col-span-5" data-reveal="scale">
            <div className="card founder">
              <div className="founder-top">
                <span className="founder-mono" aria-hidden="true">
                  {principal.monogram}
                </span>
                <div>
                  <div className="founder-name font-display">{principal.name}</div>
                  <div className="t-coord" style={{ marginTop: 4 }}>
                    {principal.role}
                  </div>
                </div>
              </div>
              <p className="t-body" style={{ color: "var(--color-ink-muted)" }}>
                {principal.bio}
              </p>
              <div className="founder-creds t-coord">{principal.credentials}</div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
