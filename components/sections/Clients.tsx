import { clients } from "@/lib/content";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Clients() {
  return (
    <section id="clients" className="pad-block-xl rule-top band-2">
      <div className="u-container">
        <div className="grid gap-10 md:grid-cols-12 md:gap-16">
          <SectionHeading
            className="md:col-span-7"
            index={clients.index}
            kicker={clients.kicker}
            heading={clients.heading}
          />
          <div className="md:col-span-5 md:self-end">
            <p data-reveal className="t-body measure-wide" style={{ color: "var(--color-ink-soft)" }}>
              {clients.intro}
            </p>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-14 md:mt-24">
          {clients.groups.map((group) => (
            <div key={group.label}>
              <div className="mb-6 flex items-center gap-3" data-reveal="fade">
                <span className="t-coord">{group.label}</span>
                <span style={{ flex: 1, height: 1, background: "var(--color-line)" }} aria-hidden="true" />
                <span className="t-coord">{String(group.orgs.length).padStart(2, "0")}</span>
              </div>
              <ul
                className="grid gap-px"
                data-reveal-group
                style={{
                  gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 15rem), 1fr))",
                  background: "var(--color-line)",
                  border: "1px solid var(--color-line)",
                }}
              >
                {group.orgs.map((org) => (
                  <li
                    key={org.short}
                    data-reveal
                    className="client-cell"
                    title={org.name}
                  >
                    <span className="client-short font-mono">{org.short}</span>
                    <span className="client-name">{org.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
