import { method, pages, process as adkar, why } from "@/lib/content";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/metadata";
import PageHeader from "@/components/site/PageHeader";
import Section from "@/components/site/Section";
import CtaBand from "@/components/site/CtaBand";
import Failures from "@/components/blocks/Failures";
import AdkarList from "@/components/blocks/AdkarList";
import MethodList from "@/components/blocks/MethodList";
import Talk from "@/components/blocks/Talk";

const page = pages.approach;
export const metadata = pageMetadata("/approach", page.title, page.description);

export default function ApproachPage() {
  return (
    <>
      <PageHeader heading={page.heading} lead={page.lead} />

      <Section id="why" heading={why.heading}>
        <p className="t-lead measure">{why.body}</p>
        <Failures />
      </Section>

      <Section id="process" heading={adkar.heading} band>
        <p className="t-lead measure">{adkar.intro}</p>
        <AdkarList />
      </Section>

      <Section id="measurement" heading={method.heading}>
        <p className="t-lead measure">{method.body}</p>
        <MethodList />
        <p>
          <a href={site.advantaUrl} target="_blank" rel="noopener noreferrer" className="link">
            {method.cta}
          </a>
        </p>
      </Section>

      <Section id="talk" heading="Conference talk" band>
        <Talk />
      </Section>

      <CtaBand />
    </>
  );
}
