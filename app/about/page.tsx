import { about, clients, credentials, pages } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import PageHeader from "@/components/site/PageHeader";
import Section from "@/components/site/Section";
import CtaBand from "@/components/site/CtaBand";
import Principal from "@/components/blocks/Principal";
import Figures from "@/components/blocks/Figures";
import Credentials from "@/components/blocks/Credentials";
import ClientList from "@/components/blocks/ClientList";

const page = pages.about;
export const metadata = pageMetadata("/about", page.title, page.description);

export default function AboutPage() {
  return (
    <>
      <PageHeader heading={page.heading} lead={page.lead} />

      <Section id="firm" heading="The firm">
        {about.body.slice(1).map((p, i) => (
          <p key={i} className={i === 0 ? "t-lead measure" : "measure"}>
            {p}
          </p>
        ))}
        <Figures />
        <Principal />
      </Section>

      <Section id="credentials" heading={credentials.heading} band note={credentials.intro}>
        <Credentials />
      </Section>

      <Section id="clients" heading={clients.heading} note={clients.intro}>
        <ClientList />
      </Section>

      <CtaBand />
    </>
  );
}
