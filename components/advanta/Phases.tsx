import { advanta } from "@/lib/content/advanta";
import Index from "@/components/ui/Index";
import Lines from "@/components/ui/Lines";
import Exhibit from "@/components/ui/Exhibit";
import PhaseLine from "@/components/advanta/PhaseLine";

/** Exhibit 01: the eleven phases in rollout order, drawn as one line. */
export default function Phases() {
  return (
    <section aria-labelledby="advanta-phases-heading" className="tone-mist band overflow-hidden">
      <div className="wrap">
        <div className="grid-12 gap-y-10">
          <div className="col-span-12 min-[1200px]:col-span-6">
            <Index n="03">{advanta.page.phasesIndex}</Index>
            <Lines
              as="h2"
              id="advanta-phases-heading"
              className="serif mt-8 max-w-[16ch] text-h2"
              lines={[advanta.phasesHeading]}
            />
          </div>
          <div className="col-span-12 min-[1200px]:col-span-5 min-[1200px]:col-start-8 min-[1200px]:pt-14">
            <p className="measure text-lead text-fg-2" data-reveal="">
              {advanta.phasesIntro}
            </p>
          </div>
        </div>

        <Exhibit
          n="01"
          title={advanta.page.phasesExhibitTitle}
          note={advanta.page.phasesExhibitNote}
          className="mt-20 min-[900px]:mt-28"
        >
          <PhaseLine className="pt-8 min-[1200px]:pt-4" />
        </Exhibit>
      </div>
    </section>
  );
}
