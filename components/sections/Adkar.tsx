import { process as adkar } from "@/lib/content";
import SectionHeading from "@/components/ui/SectionHeading";

/**
 * ADKAR sequence as a dense five-up stepper: a connecting rail with five nodes
 * over five stage columns (collapses to two columns / a single column on
 * smaller screens). Stages reveal in order via the shared reveal system.
 */
export default function Adkar() {
  return (
    <section id="process" className="pad-block-xl rule-top band-3">
      <div className="u-container">
        <div className="grid gap-10 md:grid-cols-12 md:gap-16">
          <SectionHeading
            className="md:col-span-6"
            index={adkar.index}
            kicker={adkar.kicker}
            heading={adkar.heading}
          />
          <div className="md:col-span-6 md:self-end">
            <p data-reveal className="t-lead measure-wide">
              {adkar.intro}
            </p>
          </div>
        </div>

        <div className="section-gap">
          <div className="adkar-rail" aria-hidden="true">
            {adkar.stages.map((_, i) => (
              <span key={i} className="adkar-rail-node" />
            ))}
          </div>

          <ol className="adkar-grid" data-reveal-group>
            {adkar.stages.map((stage, i) => (
              <li key={i} data-reveal className="adkar-stage">
                <span className="adkar-stage-num t-coord">
                  {String(i + 1).padStart(2, "0")} / 05
                </span>
                <span className="adkar-stage-key" aria-hidden="true">
                  {stage.key}
                </span>
                <h3 className="adkar-stage-name">{stage.name}</h3>
                <p className="t-body" style={{ color: "var(--color-ink-muted)" }}>
                  {stage.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
