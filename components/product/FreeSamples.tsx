import { advanta } from "@/lib/content";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { FileText } from "@/components/ui/icons";

/** The six free sample documents, with a link to the samples catalog. */
export default function FreeSamples() {
  return (
    <Section id="samples" tone="alt" labelledBy="samples-heading">
      <SectionHeading
        id="samples-heading"
        title={advanta.freeSamplesHeading}
        action={
          <Button href={advanta.urls.samples} external variant="secondary">
            {advanta.cta.samples}
          </Button>
        }
      />
      <ul className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:mt-12 lg:grid-cols-3">
        {advanta.freeSamples.map((sample, i) => (
          <Reveal as="li" index={i} key={sample.title}>
            {/* Icon and format share the top row so every title starts at the same height. */}
            <div className="card h-full">
              <div className="flex items-center justify-between gap-3">
                <span className="inline-flex size-11 items-center justify-center rounded-control bg-accent/12 text-accent">
                  <FileText size={22} />
                </span>
                <Badge tone="accent">{sample.format}</Badge>
              </div>
              <h3 className="mt-2 text-h3 text-pretty text-fg">{sample.title}</h3>
              {sample.detail ? <p className="text-fg-2">{sample.detail}</p> : null}
            </div>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
