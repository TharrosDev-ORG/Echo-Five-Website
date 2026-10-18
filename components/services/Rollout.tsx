import { services } from "@/lib/content/services";
import Index from "@/components/ui/Index";
import Lines from "@/components/ui/Lines";
import Mark from "@/components/ui/Mark";
import Exhibit from "@/components/ui/Exhibit";
import RolloutMap from "@/components/services/RolloutMap";

const copy = services.rollout;

/** Mist band: where the six services sit across one rollout (Exhibit 01). */
export default function Rollout() {
  return (
    <section aria-labelledby="rollout-heading" className="tone-mist band">
      <div className="wrap">
        <div className="grid-12 gap-y-10">
          <div className="col-span-12 min-[1200px]:col-span-7">
            <Index n="01">{copy.index}</Index>
            <Lines
              as="h2"
              id="rollout-heading"
              className="serif mt-8 text-h2"
              lines={[
                copy.heading.first,
                <>
                  {copy.heading.before} <Mark>{copy.heading.mark}</Mark>
                </>,
                copy.heading.after,
              ]}
            />
          </div>
          <div className="col-span-12 min-[1200px]:col-span-4 min-[1200px]:col-start-9 min-[1200px]:pt-14">
            <p className="measure text-lead text-fg-2" data-reveal="">
              {copy.intro}
            </p>
          </div>
        </div>

        <Exhibit n="01" title={copy.exhibitTitle} note={copy.note} className="mt-16 min-[900px]:mt-24">
          <div className="pt-8 min-[900px]:pt-12">
            <RolloutMap />
          </div>
        </Exhibit>
      </div>
    </section>
  );
}
