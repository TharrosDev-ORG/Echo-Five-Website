import { advanta } from "@/lib/content/advanta";
import { pages } from "@/lib/content/pages";
import Lines from "@/components/ui/Lines";
import Mark from "@/components/ui/Mark";
import Button from "@/components/ui/Button";
import Desk from "@/components/advanta/Desk";

const page = pages.advanta365;

/**
 * Opens the product page the way advanta365.com does: the headline with the
 * highlighter on "blank page.", the promise, both routes to the storefront,
 * and finished documents covering a blank page.
 */
export default function Hero() {
  return (
    <section aria-labelledby="advanta-hero-heading" className="tone-paper relative overflow-hidden pb-20 pt-32 min-[900px]:pb-28 min-[900px]:pt-40">
      <div className="wrap">
        <div className="label flex flex-wrap justify-between gap-x-6 gap-y-1 text-fg-3" data-reveal="fade">
          <p>
            <span className="font-medium text-fg">{advanta.name}</span>
            <span aria-hidden="true"> · </span>
            <span className="sr-only">, </span>
            {advanta.byline}
          </p>
          <p>{advanta.page.heroAside}</p>
        </div>

        <div className="mt-10 grid gap-14 min-[900px]:mt-14 min-[1200px]:grid-cols-[minmax(0,1.08fr)_minmax(0,1fr)] min-[1200px]:items-center min-[1200px]:gap-16">
          <div>
            <Lines
              as="h1"
              id="advanta-hero-heading"
              className="serif text-display"
              lines={[
                <span key="1" className="block">
                  {page.heading[0]}
                </span>,
                <span key="2" className="block">
                  a <Mark>{page.heading[1].replace(/^a /, "")}</Mark>
                </span>,
              ]}
            />
            <p
              className="mt-10 max-w-[34rem] text-lead text-fg-2"
              data-reveal=""
              style={{ "--d": 300 } as React.CSSProperties}
            >
              {page.lead}
            </p>
            <div
              className="mt-10 flex flex-wrap gap-3"
              data-reveal=""
              style={{ "--d": 420 } as React.CSSProperties}
            >
              <Button href={advanta.urls.purchase} size="lg">
                {advanta.cta.purchase}
              </Button>
              <Button href={advanta.urls.samples} variant="secondary" size="lg">
                {advanta.cta.samples}
              </Button>
            </div>
          </div>

          <Desk className="mx-auto max-w-[40rem]" />
        </div>
      </div>
    </section>
  );
}
