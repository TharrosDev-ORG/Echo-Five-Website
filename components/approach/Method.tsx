import { adkar } from "@/lib/content/approach";
import Index from "@/components/ui/Index";
import Lines from "@/components/ui/Lines";
import Exhibit from "@/components/ui/Exhibit";
import AdkarSequence from "@/components/approach/AdkarSequence";

/** The method: the five Prosci ADKAR stages as Exhibit 02, read in sequence. */
export default function Method() {
  return (
    <section id="method" aria-labelledby="method-heading" className="tone-paper band">
      <div className="wrap">
        <div className="grid-12 gap-y-10">
          <div className="col-span-12 min-[1200px]:col-span-6">
            <Index n="02">{adkar.index}</Index>
            <Lines
              as="h2"
              id="method-heading"
              className="serif mt-8 text-h2"
              lines={[adkar.heading]}
            />
          </div>
          <div className="col-span-12 min-[1200px]:col-span-5 min-[1200px]:col-start-8 min-[1200px]:pt-14">
            <p className="text-lead text-fg-2" data-reveal="">
              {adkar.intro}
            </p>
          </div>
        </div>

        <Exhibit n="02" title={adkar.exhibitTitle} note={adkar.exhibitNote} className="mt-20 min-[900px]:mt-28">
          <AdkarSequence />
        </Exhibit>
      </div>
    </section>
  );
}
