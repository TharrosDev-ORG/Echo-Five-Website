import { services } from "@/lib/content";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/icons";

/** Six service cards, each linking to its section on /services. */
export default function ServicesOverview() {
  return (
    <Section id="services" tone="alt" labelledBy="services-heading">
      <SectionHeading
        id="services-heading"
        title={services.heading}
        lead={services.intro}
        action={
          <Button href="/services" variant="ghost" arrow>
            {services.cta}
          </Button>
        }
      />

      <ul className="mt-12 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
        {services.items.map((item, i) => (
          <Reveal as="li" index={i} key={item.slug}>
            <Card
              href={`/services#${item.slug}`}
              className="h-full"
              title={item.title}
              meta={
                <>
                  <span
                    aria-hidden="true"
                    className="mb-2 inline-flex size-11 items-center justify-center rounded-control bg-accent/12 text-accent"
                  >
                    <Icon name={item.icon} size={22} />
                  </span>
                  <Badge className="mb-2 ml-auto">{item.tag}</Badge>
                </>
              }
            >
              <p>{item.body}</p>
            </Card>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
