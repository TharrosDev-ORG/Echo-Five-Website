import { navCta, pages, services } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import PageHero from "@/components/site/PageHero";
import CtaBand from "@/components/site/CtaBand";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import ServiceJumpNav from "@/components/services/ServiceJumpNav";
import ServiceDetails from "@/components/services/ServiceDetails";
import PairWithAdvanta from "@/components/services/PairWithAdvanta";

const page = pages.services;
export const metadata = pageMetadata("/services", page.title, page.description);

export default function ServicesPage() {
  return (
    <>
      <PageHero
        title={page.heading}
        lead={page.lead}
        actions={
          <>
            <Button href={navCta.href} size="lg" arrow>
              {navCta.label}
            </Button>
            <Button href="/product" size="lg" variant="secondary">
              {services.pairWithAdvanta.cta}
            </Button>
          </>
        }
        visual={<ServiceJumpNav />}
      >
        <p id="platforms-label" className="text-small font-medium text-fg-2">
          {services.platformsLabel}
        </p>
        <ul aria-labelledby="platforms-label" className="mt-3 flex flex-wrap gap-2">
          {services.platforms.map((platform) => (
            <li key={platform}>
              <Badge>{platform}</Badge>
            </li>
          ))}
        </ul>
      </PageHero>

      <Section id="what-we-do" labelledBy="what-we-do-heading">
        <SectionHeading id="what-we-do-heading" title={services.heading} />
        <ServiceDetails />
      </Section>

      <Section tone="alt" labelledBy="pair-advanta-heading">
        <PairWithAdvanta headingId="pair-advanta-heading" />
      </Section>

      <CtaBand />
    </>
  );
}
