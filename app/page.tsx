import type { Metadata } from "next";
import { hero, pages } from "@/lib/content";
import AdoptionCurve from "@/components/illustrations/AdoptionCurve";
import AdkarTeaser from "@/components/home/AdkarTeaser";
import AdvantaBand from "@/components/home/AdvantaBand";
import ClientMarquee from "@/components/home/ClientMarquee";
import ProofStrip from "@/components/home/ProofStrip";
import ServicesOverview from "@/components/home/ServicesOverview";
import WhyRolloutsStall from "@/components/home/WhyRolloutsStall";
import CtaBand from "@/components/site/CtaBand";
import PageHero from "@/components/site/PageHero";
import TalkSection from "@/components/site/TalkSection";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  description: pages.home.description,
  alternates: { canonical: "/" },
};

/** Home: the pitch and proof, a summary of each topic, then the ask. */
export default function Home() {
  return (
    <>
      <PageHero
        tone="dark"
        size="display"
        eyebrow={hero.context}
        title={
          <>
            <span className="block">{hero.headline[0]}</span>
            <span className="block text-accent">{hero.headline[1]}</span>
          </>
        }
        lead={hero.sub}
        actions={
          <>
            <Button href="/contact" size="lg" arrow>
              {hero.cta.primary}
            </Button>
            <Button href="/approach" variant="secondary" size="lg">
              {hero.cta.secondary}
            </Button>
          </>
        }
        visual={
          // Capped below lg so the panel does not take over the first screens on tablets.
          <div className="card card-panel max-w-md lg:max-w-none">
            <AdoptionCurve />
          </div>
        }
      />
      <ProofStrip />
      <ClientMarquee />
      <WhyRolloutsStall />
      <ServicesOverview />
      <AdkarTeaser />
      <AdvantaBand />
      <TalkSection />
      <CtaBand />
    </>
  );
}
