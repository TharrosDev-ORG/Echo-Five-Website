import { adkar } from "@/lib/content/approach";
import Index from "@/components/ui/Index";
import Lines from "@/components/ui/Lines";
import Button from "@/components/ui/Button";
import Exhibit from "@/components/ui/Exhibit";
import AdkarBars from "@/components/exhibits/AdkarBars";

/** The method: Prosci ADKAR as Exhibit 02. */
export default function Method() {
  return (
    <section aria-labelledby="method-heading" className="tone-mist band">
      <div className="wrap">
        <div className="grid-12 gap-y-10">
          <div className="col-span-12 min-[1200px]:col-span-6">
            <Index n="04">{adkar.index}</Index>
            <Lines as="h2" id="method-heading" className="serif mt-8 text-h2" lines={[adkar.heading]} />
          </div>
          <div className="col-span-12 min-[1200px]:col-span-5 min-[1200px]:col-start-8 min-[1200px]:pt-14">
            <p className="measure text-lead text-fg-2" data-reveal="">
              {adkar.intro}
            </p>
            <div className="mt-8" data-reveal="" style={{ "--d": 100 } as React.CSSProperties}>
              <Button href="/approach" variant="secondary">
                {adkar.cta}
              </Button>
            </div>
          </div>
        </div>

        <Exhibit n="02" title={adkar.exhibitTitle} note={adkar.exhibitNote} className="mt-20 min-[900px]:mt-28">
          <AdkarBars className="mt-10" />
        </Exhibit>
      </div>
    </section>
  );
}
