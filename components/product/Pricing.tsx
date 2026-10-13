import { advanta } from "@/lib/content";
import Button from "@/components/ui/Button";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { Check } from "@/components/ui/icons";

const { price } = advanta;

function CheckList({ items }: { items: readonly string[] }) {
  return (
    <ul className="grid gap-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-fg-2">
          <span className="mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
            <Check size={16} />
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}

/** Single-price card with everything the purchase includes, plus who built the toolkit. */
export default function Pricing() {
  return (
    <Section id="pricing" tone="dark" texture labelledBy="pricing-heading">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-16">
        <div className="min-w-0">
          <SectionHeading id="pricing-heading" eyebrow={advanta.name} title={price.heading} />
          <div className="mt-8">
            <CheckList items={advanta.provenance} />
          </div>
        </div>

        <div className="card card-panel min-w-0 gap-0 border-accent/35">
          <p className="text-small font-semibold text-fg">{advanta.name}</p>
          <p className="mt-3 flex flex-wrap items-baseline gap-x-2.5">
            <span className="font-display text-[clamp(2.5rem,1.9rem+2.4vw,3.5rem)] leading-none font-semibold tracking-[-0.04em] text-fg">
              {price.amount}
            </span>
            <span className="text-small font-semibold text-fg-2">{price.currency}</span>
          </p>
          <p className="mt-3 text-small text-fg-2">{price.note}</p>

          <hr className="my-7 border-edge" />

          <CheckList items={price.includes} />

          <div className="mt-8 grid gap-3">
            <Button href={advanta.urls.purchase} external size="lg" fullWidth>
              {advanta.cta.purchase}
            </Button>
            <Button href={advanta.urls.samples} external variant="secondary" size="lg" fullWidth>
              {advanta.cta.samples}
            </Button>
          </div>
          <p className="mt-5 text-center text-small">
            <a href={`mailto:${advanta.urls.email}`} className="link inline-flex min-h-11 items-center">
              {advanta.cta.contact}
            </a>
          </p>
        </div>
      </div>
    </Section>
  );
}
