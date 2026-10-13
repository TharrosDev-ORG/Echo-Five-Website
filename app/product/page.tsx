import Link from "next/link";
import { method, pages } from "@/lib/content";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/metadata";
import PageHeader from "@/components/site/PageHeader";
import Section from "@/components/site/Section";
import CtaBand from "@/components/site/CtaBand";
import MethodList from "@/components/blocks/MethodList";
import { ArrowRight } from "@/components/site/icons";

const page = pages.product;
export const metadata = pageMetadata("/product", page.title, page.description);

function Advanta365Link() {
  return (
    <a
      href={site.advantaUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="btn btn-primary"
    >
      {method.cta}
      <ArrowRight />
    </a>
  );
}

export default function ProductPage() {
  return (
    <>
      <PageHeader heading={page.heading} lead={page.lead} />

      <Section id="what-it-does" heading="What it does">
        <p className="t-lead measure">{method.body}</p>
        <MethodList />
        <div className="actions">
          <Advanta365Link />
        </div>
      </Section>

      <Section id="how-we-use-it" heading="How we use it" band>
        <p className="measure">
          Advanta365 is part of how we deliver our{" "}
          <Link href="/services" className="link">
            services
          </Link>{" "}
          and run the{" "}
          <Link href="/approach" className="link">
            ADKAR-based approach
          </Link>
          , so adoption is measured while the work is under way.
        </p>
        <div className="actions">
          <Advanta365Link />
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
