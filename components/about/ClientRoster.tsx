import { clients } from "@/lib/content";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

/** The full client list in three sector columns, each organization by its full name. */
export default function ClientRoster() {
  return (
    <Section id="clients" labelledBy="clients-heading">
      <SectionHeading id="clients-heading" title={clients.heading} lead={clients.intro} />
      <div className="mt-10 grid gap-12 md:mt-14 lg:grid-cols-3 lg:gap-x-10">
        {clients.groups.map((group, i) => (
          <Reveal key={group.label} index={i} as="section" className="min-w-0">
            <h3 className="border-t-2 border-fg pt-4 text-h3 text-fg">{group.label}</h3>
            <ul className="mt-4 sm:columns-2 sm:gap-8 lg:columns-1">
              {group.orgs.map((org) => (
                <li key={org.name} className="break-inside-avoid border-b border-edge py-3 text-small text-fg">
                  {org.name}
                  {/* Show the abbreviation only when the full name does not already contain it. */}
                  {!org.name.includes(org.short) ? (
                    <span className="ml-2 text-label font-semibold text-fg-3">{org.short}</span>
                  ) : null}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
