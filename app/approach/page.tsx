import { method, pages, process as adkar, why } from "@/lib/content";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/metadata";
import { ArrowOut } from "@/components/site/icons";
import PageHeader from "@/components/site/PageHeader";
import Intro from "@/components/blocks/Intro";
import Failures from "@/components/blocks/Failures";
import AdkarSteps from "@/components/blocks/AdkarSteps";
import MethodPoints from "@/components/blocks/MethodPoints";
import Talk from "@/components/blocks/Talk";
import CtaBand from "@/components/site/CtaBand";

const page = pages.approach;
export const metadata = pageMetadata("/approach", page.title, page.description);

export default function ApproachPage() {
  return (
    <>
      <PageHeader label={page.label} heading={page.heading} lead={page.lead} />

      <section className="section" aria-labelledby="why-heading">
        <div className="container">
          <Intro
            id="why-heading"
            label={why.kicker}
            heading="Where rollouts go wrong."
            side={<p className="t-body measure">{why.body}</p>}
          />
          <Failures />
        </div>
      </section>

      <section className="section band" aria-labelledby="process-heading">
        <div className="container">
          <Intro
            id="process-heading"
            label={adkar.kicker}
            heading={adkar.heading}
            side={<p className="t-body measure">{adkar.intro}</p>}
          />
          <AdkarSteps />
        </div>
      </section>

      <section className="section" aria-labelledby="method-heading">
        <div className="container two-col">
          <div>
            <Intro id="method-heading" label={method.kicker} heading={method.heading} />
            <p className="t-body measure" data-reveal>
              {method.body}
            </p>
            <a
              href={site.advantaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="link"
              style={{ marginTop: "1.75rem" }}
              data-reveal
            >
              {method.cta}
              <ArrowOut />
            </a>
          </div>
          <div className="card" style={{ padding: "clamp(1.5rem, 3vw, 2rem)" }} data-reveal>
            <p className="t-label" style={{ marginBottom: "1rem" }}>
              What every programme gets
            </p>
            <MethodPoints />
          </div>
        </div>
      </section>

      <section className="section band" aria-label="Conference talk">
        <div className="container">
          <Talk />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
