import { advanta } from "@/lib/content/advanta";
import Index from "@/components/ui/Index";
import Lines from "@/components/ui/Lines";
import Button from "@/components/ui/Button";
import Arrow from "@/components/ui/Arrow";

const [first, ...rest] = advanta.purchase.heading.split(". ");

/**
 * The buy box: one purchase, everything it includes, and the route to the
 * storefront. The price lives on advanta365.com, never here.
 */
export default function Purchase() {
  return (
    <section aria-labelledby="advanta-purchase-heading" className="tone-night grain band">
      <div className="wrap grid-12 gap-y-16">
        <div className="col-span-12 min-[1200px]:col-span-7">
          <Index n="07">{advanta.page.purchaseIndex}</Index>
          <Lines
            as="h2"
            id="advanta-purchase-heading"
            className="serif mt-8 text-h1"
            lines={[
              <span key="1" className="block">{`${first}.`}</span>,
              <span key="2" className="block text-accent">
                {rest.join(". ")}
              </span>,
            ]}
          />
          <p className="mt-10 max-w-[30rem] text-lead text-fg-2" data-reveal="">
            {advanta.purchase.note}
          </p>
          <div className="mt-10 flex flex-col items-start gap-6" data-reveal="" style={{ "--d": 120 } as React.CSSProperties}>
            <Button href={advanta.urls.purchase} size="lg">
              {advanta.cta.purchase}
            </Button>
            <a
              href={`mailto:${advanta.urls.email}`}
              className="inline-flex min-h-11 items-center gap-1.5 text-small text-fg-2"
            >
              <span className="link text-fg-2">{advanta.cta.contact}</span>
              <Arrow dir="up-right" />
            </a>
          </div>
        </div>

        <div className="col-span-12 min-[1200px]:col-span-5 min-[1200px]:col-start-8 min-[1200px]:self-end min-[1200px]:pb-2">
          <p className="label flex justify-between gap-6 border-b border-fg pb-3 text-fg-3">
            <span>{advanta.name}</span>
            <span>{advanta.page.purchaseAside}</span>
          </p>
          <ul>
            {advanta.purchase.includes.map((item, i) => (
              <li
                key={item}
                className="flex items-start gap-4 border-b border-rule py-4 text-fg"
                data-reveal=""
                style={{ "--d": 150 + i * 60 } as React.CSSProperties}
              >
                <svg viewBox="0 0 20 20" aria-hidden="true" className="mt-[0.2rem] h-5 w-5 flex-none text-accent">
                  <path d="M4 10.5 8.2 14.5 16 6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
