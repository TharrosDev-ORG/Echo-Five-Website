import { advanta } from "@/lib/content";
import PhaseTrack from "@/components/illustrations/PhaseTrack";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";

/**
 * The seven rollout phases the playbooks cover. Hand-off: the phase line is the
 * continuation of the signal line, so this section carries no rail of its own.
 */
export default function ToolkitPhases() {
  return (
    <Section id="phases" tone="dark" rail={false} labelledBy="phases-heading">
      <SectionHeading id="phases-heading" title={advanta.phasesHeading} lead={advanta.phasesIntro} />
      <Reveal className="mt-12 md:mt-16">
        <PhaseTrack phases={advanta.phases} label={advanta.phasesHeading} />
      </Reveal>
    </Section>
  );
}
