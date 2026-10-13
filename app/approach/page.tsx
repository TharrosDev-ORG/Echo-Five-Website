import { engagement, navCta, pages, process as adkar, talk, why } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import PageHero from "@/components/site/PageHero";
import CtaBand from "@/components/site/CtaBand";
import TalkSection from "@/components/site/TalkSection";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { Play } from "@/components/ui/icons";
import { StallClose, StallReasonList } from "@/components/site/StallPoints";
import AdkarGlance from "@/components/approach/AdkarGlance";
import AdkarStepper from "@/components/approach/AdkarStepper";
import EngagementSteps from "@/components/approach/EngagementSteps";

const page = pages.approach;
export const metadata = pageMetadata("/approach", page.title, page.description);

export default function ApproachPage() {
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
            <Button href="#talk" size="lg" variant="secondary" icon={<Play size={16} />}>
              {talk.cta}
            </Button>
          </>
        }
        visual={<AdkarGlance />}
      />

      <Section id="why" tone="alt" labelledBy="why-heading">
        <SectionHeading id="why-heading" title={why.heading} lead={why.body} />
        <StallReasonList layout="columns" className="mt-10 md:mt-14" />
        <StallClose className="mt-12 md:mt-16" />
      </Section>

      <Section id="adkar" tone="dark" labelledBy="adkar-heading">
        <SectionHeading id="adkar-heading" title={adkar.heading} lead={adkar.intro} />
        <div className="mt-10 md:mt-14">
          <AdkarStepper />
        </div>
      </Section>

      <Section id="engagement" labelledBy="engagement-heading">
        <SectionHeading id="engagement-heading" title={engagement.heading} lead={engagement.intro} />
        <EngagementSteps />
      </Section>

      <TalkSection tone="alt" />

      <CtaBand />
    </>
  );
}
