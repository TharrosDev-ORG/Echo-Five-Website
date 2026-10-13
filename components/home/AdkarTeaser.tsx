import type { CSSProperties } from "react";
import { process } from "@/lib/content";
import AdkarPath from "@/components/illustrations/AdkarPath";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";

/**
 * The five ADKAR stages in brief. From lg the acronym is set in five giant
 * letters over the signal path, with each stage's name and line under its
 * letter. Below lg each stage is a row: its letter, then its name and line.
 * The letters are decorative; the stage names are the real text. A hand-off
 * section: the rail stops above it and the ADKAR path carries the line.
 */
export default function AdkarTeaser() {
  return (
    <Section id="process" rail={false} labelledBy="process-heading">
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

      <Reveal className="mt-16 hidden lg:block">
        <div aria-hidden="true" className="grid grid-cols-5 text-center">
          {process.stages.map((stage, i) => (
            <span
              key={i}
              className="mega-rise font-display text-mega text-fg"
              style={{ "--i": i } as CSSProperties}
            >
              {stage.key}
            </span>
          ))}
        </div>
        <AdkarPath letters={false} className="mt-8" />
      </Reveal>

      <ol
        aria-label={process.stagesLabel}
        className="mt-12 grid lg:mt-8 lg:grid-cols-5 lg:text-center"
      >
        {process.stages.map((stage, i) => (
          <Reveal
            as="li"
            index={i}
            key={stage.name}
            className="grid grid-cols-[clamp(3.5rem,12vw,6rem)_minmax(0,1fr)] items-baseline gap-x-4 border-t border-edge py-6 last:border-b lg:block lg:border-0 lg:px-4 lg:py-0 lg:last:border-0"
          >
            <span aria-hidden="true" className="mega-rise font-display text-mega text-fg lg:hidden">
              {stage.key}
            </span>
            <div className="min-w-0">
              <h3 className="text-h3 text-fg">{stage.name}</h3>
              <p className="mt-1.5 text-small text-fg-2">{stage.body}</p>
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
