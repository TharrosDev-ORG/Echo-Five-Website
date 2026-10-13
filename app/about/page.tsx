import { about, clients, credentials, pages } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import PageHeader from "@/components/site/PageHeader";
import Intro from "@/components/blocks/Intro";
import Principal from "@/components/blocks/Principal";
import Stats from "@/components/blocks/Stats";
import Credentials from "@/components/blocks/Credentials";
import ClientRoster from "@/components/blocks/ClientRoster";
import CtaBand from "@/components/site/CtaBand";

const page = pages.about;
export const metadata = pageMetadata("/about", page.title, page.description);

export default function AboutPage() {
  return (
    <>
      <PageHeader label={page.label} heading={page.heading} lead={page.lead} />

      <section className="section" aria-label="About the firm">
        <div className="container two-col">
          <div>
            {about.body.slice(1).map((p, i) => (
              <p
                key={i}
                className={i === 0 ? "t-lead measure" : "t-body measure"}
                style={{ marginTop: i === 0 ? 0 : "1.5rem" }}
                data-reveal
              >
                {p}
              </p>
            ))}
            <div style={{ marginTop: "clamp(2.5rem, 4vw, 3rem)" }}>
              <Stats />
            </div>
          </div>
          <Principal />
        </div>
      </section>

      <section id="credentials" className="section band" aria-labelledby="credentials-heading">
        <div className="container">
          <Intro
            id="credentials-heading"
            label={credentials.kicker}
            heading={credentials.heading}
            side={<p className="t-body measure">{credentials.intro}</p>}
          />
          <Credentials />
        </div>
      </section>

      <section id="clients" className="section" aria-labelledby="clients-heading">
        <div className="container">
          <Intro
            id="clients-heading"
            label={clients.kicker}
            heading={clients.heading}
            side={<p className="t-body measure">{clients.intro}</p>}
          />
          <ClientRoster />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
