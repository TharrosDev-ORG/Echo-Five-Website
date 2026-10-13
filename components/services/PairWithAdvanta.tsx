import { advanta, services } from "@/lib/content";
import Button from "@/components/ui/Button";
import ToolkitStack from "@/components/illustrations/ToolkitStack";

const { pairWithAdvanta } = services;

/** Dark promo panel pointing service buyers at the Advanta365 toolkit. */
export default function PairWithAdvanta({ headingId }: { headingId: string }) {
  return (
    <div className="surface-dark texture grid gap-10 overflow-hidden rounded-panel px-5 py-10 sm:p-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-center lg:gap-14 lg:p-14">
      <div className="min-w-0">
        <p className="mb-4 text-small font-medium text-fg-2">{advanta.byline}</p>
        <h2 id={headingId} className="text-h2 text-fg">
          {pairWithAdvanta.heading}
        </h2>
        <p className="mt-5 max-w-[56ch] text-lead text-fg-2">{pairWithAdvanta.body}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/product" arrow>
            {pairWithAdvanta.cta}
          </Button>
          <Button href={advanta.urls.samples} external variant="secondary">
            {advanta.cta.samplesShort}
          </Button>
        </div>
      </div>
      <ToolkitStack className="mx-auto w-full max-w-xs sm:max-w-sm" />
    </div>
  );
}
