import Link from "next/link";
import { method, pages, services } from "@/lib/content";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/metadata";
import { ArrowOut, ArrowRight } from "@/components/site/icons";
import PageHeader from "@/components/site/PageHeader";
import Intro from "@/components/blocks/Intro";
import ServiceRows from "@/components/blocks/ServiceRows";
import MethodPoints from "@/components/blocks/MethodPoints";
import CtaBand from "@/components/site/CtaBand";

const page = pages.services;
export const metadata = pageMetadata("/services", page.title, page.description);

export default function ServicesPage() {
  return (
    <>
      <PageHeader label={page.label} heading={page.heading} lead={page.lead}>
        <div style={{ marginTop: "2rem" }}>
          <p className="t-label" style={{ marginBottom: "0.85rem" }}>
            Platforms we work in
          </p>
          <ul className="flex flex-wrap gap-2" aria-label="Platforms">
            {services.platforms.map((p) => (
              <li key={p} className="chip">
                {p}
              </li>
            ))}
          </ul>
        </div>
      </PageHeader>

      <section className="section" aria-labelledby="services-list">
        <div className="container">
          <h2 id="services-list" className="u-sr">
            What we deliver
          </h2>
          <ServiceRows />
        </div>
      </section>

      <section className="section band" aria-labelledby="method-heading">
        <div className="container two-col">
          <div>
            <Intro id="method-heading" label={method.kicker} heading={method.heading} />
            <p className="t-body measure" data-reveal>
              {method.body}
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-3" style={{ marginTop: "1.75rem" }} data-reveal>
              <a href={site.advantaUrl} target="_blank" rel="noopener noreferrer" className="link">
                {method.cta}
                <ArrowOut />
              </a>
              <Link href="/approach" className="link">
                Our approach
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
          <div className="card" style={{ padding: "clamp(1.5rem, 3vw, 2rem)" }} data-reveal>
            <p className="t-label" style={{ marginBottom: "1rem" }}>
              What every programme gets
            </p>
            <MethodPoints />
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
