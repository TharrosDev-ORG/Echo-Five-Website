import { process } from "@/lib/content";
import AdkarPath from "@/components/illustrations/AdkarPath";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";

/**
 * The five ADKAR stages in brief. From lg the stages sit in five equal columns
 * under the decorative path; below that they form a vertical timeline.
 */
export default function AdkarTeaser() {
  const last = process.stages.length - 1;

  return (
    <Section id="process" labelledBy="process-heading">
      <SectionHeading
        id="process-heading"
        title={process.heading}
        lead={process.intro}
        action={
          <Button href="/approach" variant="ghost" arrow>
            {process.cta}
          </Button>
        }
      />

      <div className="card card-panel mt-12">
        {/* The path's nodes sit at the centres of the five columns below; negative margins trim the SVG's empty bands. */}
        <div className="-mt-[3%] -mb-[2%] hidden lg:block">
          <AdkarPath />
        </div>
        <ol aria-label={process.stagesLabel} className="grid gap-6 lg:grid-cols-5 lg:gap-x-0 lg:text-center">
          {process.stages.map((stage, i) => (
            <Reveal as="li" index={i} key={stage.name} className="relative flex gap-4 lg:block lg:px-3">
              {i < last ? (
                <span
                  aria-hidden="true"
                  className="absolute top-12 -bottom-4 left-5 w-0.5 -translate-x-1/2 bg-edge-strong lg:hidden"
                />
              ) : null}
              <span
                aria-hidden="true"
                className="flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-accent bg-raised font-display font-semibold text-fg lg:hidden"
              >
                {stage.key}
              </span>
              <div className="min-w-0 pt-1.5 lg:pt-0">
                <h3 className="text-body font-semibold text-fg">{stage.name}</h3>
                <p className="mt-1 text-small text-fg-2">{stage.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </Section>
  );
}
