import { advanta } from "@/lib/content";
import ToolkitStack from "@/components/illustrations/ToolkitStack";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Stat from "@/components/ui/Stat";

/** Dark band introducing the Advanta365 toolkit, with its key counts. */
export default function AdvantaBand() {
  return (
    <Section id="advanta365" tone="dark" texture labelledBy="advanta-heading">
      <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
        <div className="min-w-0">
          <SectionHeading
            id="advanta-heading"
            eyebrow={advanta.name}
            title={advanta.band.heading}
            lead={advanta.band.body}
          />

          <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
            {advanta.counts.map((count, i) => (
              <Reveal as="li" index={i} key={count.label} className="border-t border-edge-strong pt-5">
                <Stat value={count.value} label={count.label} accent />
              </Reveal>
            ))}
          </ul>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button href="/product" size="lg" arrow>
              {advanta.cta.explore}
            </Button>
            <Button href={advanta.urls.samples} external variant="secondary" size="lg">
              {advanta.cta.samplesShort}
            </Button>
          </div>
        </div>

        <Reveal className="min-w-0">
          <ToolkitStack className="mx-auto w-full max-w-xs sm:max-w-sm lg:max-w-md" />
        </Reveal>
      </div>
    </Section>
  );
}
