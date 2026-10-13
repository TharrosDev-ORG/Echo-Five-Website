import { advanta } from "@/lib/content";
import PhaseTrack from "@/components/illustrations/PhaseTrack";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";

/** The seven rollout phases the playbooks cover. */
export default function ToolkitPhases() {
  return (
    <Section id="phases" labelledBy="phases-heading">
      <SectionHeading id="phases-heading" title={advanta.phasesHeading} lead={advanta.phasesIntro} />
      <PhaseTrack phases={advanta.phases} label={advanta.phasesHeading} className="mt-10 lg:mt-14" />
    </Section>
  );
}
