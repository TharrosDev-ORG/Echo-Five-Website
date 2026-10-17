import { advanta } from "@/lib/content/advanta";
import Index from "@/components/ui/Index";
import Arrow from "@/components/ui/Arrow";

/**
 * A quiet band between the storefront and the closing ask: one line on how
 * the product and the firm fit together, with a link to how we work (the ask
 * itself is left to <Closing />), and the non-affiliation disclaimer.
 */
export default function Relationship() {
  return (
    <section aria-labelledby="advanta-relationship-heading" className="tone-paper py-14 min-[900px]:py-20">
      <div className="wrap">
        <div className="flex flex-col gap-y-4 min-[900px]:flex-row min-[900px]:items-baseline min-[900px]:gap-x-10">
          <Index n="08" className="shrink-0">
            {advanta.page.relationshipIndex}
          </Index>
          <div className="flex flex-wrap items-baseline gap-x-6 gap-y-3" data-reveal="">
            <h2 id="advanta-relationship-heading" className="serif text-h4 text-fg">
              {advanta.page.relationshipLine}
            </h2>
            <a href="/approach" className="inline-flex min-h-11 items-center gap-1.5 text-fg">
              <span className="link">{advanta.page.relationshipLink}</span>
              <Arrow />
            </a>
          </div>
        </div>

        <p className="label mt-8 max-w-[60rem] text-fg-3 min-[900px]:mt-10">{advanta.disclaimer}</p>
      </div>
    </section>
  );
}
