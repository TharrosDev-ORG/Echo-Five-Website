import { advanta } from "@/lib/content";
import ToolkitStack from "@/components/illustrations/ToolkitStack";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Stat from "@/components/ui/Stat";

/**
 * Black band introducing the Advanta365 toolkit: who built it, the four
 * counts as giant numerals across the container, then the two ways in.
 */
export default function AdvantaBand() {
  return (
    <Section id="advanta365" tone="dark" labelledBy="advanta-heading">
      <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-x-8">
        <div className="min-w-0 lg:col-span-7">
          <SectionHeading
            id="advanta-heading"
            eyebrow={advanta.name}
            title={advanta.band.heading}
            lead={advanta.band.body}
          />
          <ul className="mt-8 grid gap-2.5">
            {advanta.provenance.map((line) => (
              <li key={line} className="flex items-center gap-3 text-fg">
                <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-accent-fill" />
                {line}
              </li>
            ))}
          </ul>
        </div>
        <Reveal className="min-w-0 lg:col-span-5">
          <ToolkitStack className="mx-auto w-full max-w-xs sm:max-w-sm lg:mr-0 lg:max-w-md" />
        </Reveal>
      </div>

      <ul className="mt-16 grid grid-cols-2 gap-x-6 gap-y-12 md:mt-24 md:grid-cols-4">
        {advanta.counts.map((count, i) => (
          <Reveal
            as="li"
            index={i}
            key={count.label}
            className="mega-fit border-t border-edge-strong pt-6 [--fit:2.1]"
          >
            <Stat size="mega" value={count.value} label={count.label} accent />
          </Reveal>
        ))}
      </ul>

      <div className="mt-16 flex flex-col gap-3 border-t border-edge pt-8 sm:flex-row sm:flex-wrap md:mt-20">
        <Button href="/product" size="lg" arrow>
          {advanta.cta.explore}
        </Button>
        <Button href={advanta.urls.samples} external variant="secondary" size="lg">
          {advanta.cta.samplesShort}
        </Button>
      </div>
    </Section>
  );
}
