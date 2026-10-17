import { advanta } from "@/lib/content/advanta";
import Index from "@/components/ui/Index";
import Lines from "@/components/ui/Lines";
import Button from "@/components/ui/Button";

/**
 * How the product and the firm fit together, then the non-affiliation
 * disclaimer before the closing ask.
 */
export default function Relationship() {
  return (
    <section aria-labelledby="advanta-relationship-heading" className="tone-paper band-tight">
      <div className="wrap">
        <div className="grid-12 gap-y-10 border-t border-fg pt-12 min-[900px]:pt-16">
          <div className="col-span-12 min-[1200px]:col-span-6">
            <Index n="08">{advanta.page.relationshipIndex}</Index>
            <Lines
              as="h2"
              id="advanta-relationship-heading"
              className="serif mt-8 max-w-[18ch] text-h3 min-[900px]:text-[2.75rem] min-[900px]:leading-[1.08]"
              lines={[advanta.relationship.heading]}
            />
          </div>
          <div className="col-span-12 min-[1200px]:col-span-5 min-[1200px]:col-start-8 min-[1200px]:pt-14">
            <p className="text-lead text-fg-2" data-reveal="">
              {advanta.relationship.body}
            </p>
            <div className="mt-8" data-reveal="" style={{ "--d": 100 } as React.CSSProperties}>
              <Button href="/contact" variant="secondary">
                {advanta.relationship.cta}
              </Button>
            </div>
          </div>
        </div>

        <p className="label mt-16 max-w-[60rem] text-fg-3 min-[900px]:mt-24">{advanta.disclaimer}</p>
      </div>
    </section>
  );
}
