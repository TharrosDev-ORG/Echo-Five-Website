import { clients } from "@/lib/content";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import Reveal from "@/components/ui/Reveal";

/** The full client list, grouped by sector, with each organization's full name. */
export default function ClientRoster() {
  return (
    <Section id="clients" labelledBy="clients-heading">
      <SectionHeading id="clients-heading" title={clients.heading} lead={clients.intro} />
      <div className="mt-10 grid gap-5 md:mt-12 lg:grid-cols-3">
        {clients.groups.map((group, i) => (
          <Reveal key={group.label} index={i}>
            <Card className="h-full" title={group.label}>
              <ul className="sm:columns-2 sm:gap-8 lg:columns-1">
                {group.orgs.map((org) => (
                  <li key={org.name} className="flex break-inside-avoid gap-3 py-1.5 text-small">
                    <span aria-hidden="true" className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-accent" />
                    <span>
                      {org.name}
                      {/* Show the abbreviation only when the full name does not already contain it. */}
                      {!org.name.includes(org.short) ? (
                        <span className="ml-1.5 text-label font-semibold text-fg-3">{org.short}</span>
                      ) : null}
                    </span>
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
