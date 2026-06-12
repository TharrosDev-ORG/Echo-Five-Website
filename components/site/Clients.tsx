import SectionHead from "./SectionHead";
import { clients } from "@/lib/content";

export default function Clients() {
  return (
    <section id="clients" className="pad-block-2xl rule-top bg-bg-deep" aria-labelledby="clients-heading">
      <div className="u-container">
        <SectionHead
          index={clients.index}
          kicker={clients.kicker}
          heading={clients.heading}
          headingId="clients-heading"
        />
        <p data-reveal className="t-lead measure-wide mt-9">
          {clients.intro}
        </p>

        <div className="mt-16 flex flex-col gap-14">
          {clients.groups.map((group) => (
            <div key={group.label} data-reveal-group>
              <h3 data-reveal className="t-coord text-signal">
                {group.label}
              </h3>
              <ul className="mt-5 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
                {group.orgs.map((org) => (
                  <li
                    key={org.short}
                    data-reveal
                    className="group flex min-h-24 flex-col justify-between gap-2 bg-bg-deep p-5 transition-colors duration-400 hover:bg-bg-raised"
                  >
                    <span className="font-mono text-sm font-medium tracking-wide text-ink-muted transition-colors duration-400 group-hover:text-signal">
                      {org.short}
                    </span>
                    <span className="t-body text-ink-soft">{org.name}</span>
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
