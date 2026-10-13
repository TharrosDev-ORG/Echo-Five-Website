import { method, pages, services } from "@/lib/content";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/metadata";
import PageHeader from "@/components/site/PageHeader";
import Section from "@/components/site/Section";
import CtaBand from "@/components/site/CtaBand";
import ServiceList from "@/components/blocks/ServiceList";
import MethodList from "@/components/blocks/MethodList";

const page = pages.services;
export const metadata = pageMetadata("/services", page.title, page.description);

const platformList = (items: readonly string[]) =>
  `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;

export default function ServicesPage() {
  return (
    <>
      <PageHeader heading={page.heading} lead={page.lead} />

      <Section id="what-we-do" heading="What we do" note={`We work in ${platformList(services.platforms)}.`}>
        <ServiceList />
      </Section>

      <Section id="measurement" heading={method.heading} band>
        <p className="t-lead measure">{method.body}</p>
        <MethodList />
        <p>
          <a href={site.advantaUrl} target="_blank" rel="noopener noreferrer" className="link">
            {method.cta}
          </a>
        </p>
      </Section>

      <CtaBand />
    </>
  );
}
