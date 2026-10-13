import type { CSSProperties } from "react";
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

/**
 * Hero facts: two columns on phones, four from lg, with an edge line between
 * neighbours. Spelled out per position so no two border rules compete.
 */
const factClass = [
  "pr-4",
  "border-l border-edge pl-4 lg:pl-6",
  "pr-4 lg:border-l lg:border-edge lg:pl-6",
  "border-l border-edge pl-4 lg:pl-6",
];

/** Home: the pitch and proof, a summary of each topic, then the ask. */
export default function Home() {
  return (
    <>
      <PageHero
        tone="dark"
        size="mega"
        // Hand-off: the adoption curve carries the signal line here, so the rail starts in the next section.
        rail={false}
        eyebrow={hero.context}
        title={hero.headline.map((line, i) => (
          <span
            key={line}
            className={i === 0 ? "hero-line block" : "hero-line block text-accent"}
            style={{ "--i": i } as CSSProperties}
          >
            {line}
          </span>
        ))}
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
      >
        {/* From lg the curve takes whatever height is left in the first screen, within bounds. */}
        <AdoptionCurve variant="bleed" className="h-40 sm:h-48 lg:h-auto lg:max-h-60 lg:min-h-36 lg:flex-1" />
        <ul className="mt-10 grid grid-cols-2 gap-y-6 border-t border-edge pt-6 lg:grid-cols-4">
          {hero.facts.map((fact, i) => (
            <li key={fact.title} className={factClass[i]}>
              <p className="text-small font-semibold text-fg">{fact.title}</p>
              <p className="mt-0.5 text-small text-fg-2">{fact.detail}</p>
            </li>
          ))}
        </ul>
      </PageHero>
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
