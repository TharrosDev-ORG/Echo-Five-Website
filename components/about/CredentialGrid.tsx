import { credentials } from "@/lib/content";
import { cx } from "@/lib/cx";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Reveal from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/icons";

/** Certifications and clearance, each with its issuing body. */
export default function CredentialGrid() {
  return (
    <Section id="credentials" tone="alt" labelledBy="credentials-heading">
      <SectionHeading id="credentials-heading" title={credentials.heading} lead={credentials.intro} />
      {/*
        Five cards fill evenly: from lg a six-column grid puts the first three
        (Prosci, Microsoft, Government of Canada) two columns wide and the last
        two three wide; at sm the odd card out spans the full row.
      */}
      <ul className="mt-10 grid gap-5 sm:grid-cols-2 md:mt-12 lg:grid-cols-6">
        {credentials.items.map((item, i) => (
          <Reveal
            as="li"
            key={item.title}
            index={i}
            className={cx(
              i < 3 ? "lg:col-span-2" : "lg:col-span-3",
              i === credentials.items.length - 1 && i % 2 === 0 && "sm:col-span-2",
            )}
          >
            <Card
              className="h-full"
              // The clearance is the one item that is not a certification.
              icon={<Icon name={item.issuer === "Government of Canada" ? "shield" : "certificate"} size={22} />}
              meta={<Badge>{item.issuer}</Badge>}
              title={item.title}
            >
              <p>{item.detail}</p>
            </Card>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
