import { services } from "@/lib/content";
import Button from "@/components/ui/Button";
import IndexList, { type IndexItem } from "@/components/ui/IndexList";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";

const items: IndexItem[] = services.items.map((item) => ({
  href: `/services#${item.slug}`,
  index: item.n,
  title: item.title,
  body: item.body,
  tag: item.tag,
}));

/** The six services as numbered rows, each linking to its section on /services. */
export default function ServicesOverview() {
  return (
    <Section id="services" labelledBy="services-heading">
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
      <Reveal className="mt-12 md:mt-16">
        <IndexList items={items} />
      </Reveal>
    </Section>
  );
}
