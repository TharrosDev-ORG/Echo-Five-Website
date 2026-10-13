import { advanta } from "@/lib/content";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { Check } from "@/components/ui/icons";

const { price } = advanta;

/** Single-price panel: a black block with the price, everything the purchase includes, and who built the toolkit. */
export default function Pricing() {
  return (
    <Section id="pricing" labelledBy="pricing-heading">
      <SectionHeading id="pricing-heading" eyebrow={advanta.name} title={price.heading} />

      <Reveal className="surface-dark mt-10 lg:mt-14">
        <div className="grid gap-12 px-5 py-10 sm:p-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-12 lg:p-14">
          <div className="min-w-0">
            <p className="text-small font-semibold text-fg-2">{advanta.name}</p>
            <p className="mt-4 flex flex-wrap items-baseline gap-x-3">
              <span className="font-display text-display tabular-nums text-fg">{price.amount}</span>
              <span className="text-lead font-medium text-fg-2">{price.currency}</span>
            </p>
            <p className="mt-4 max-w-[40ch] text-fg-2">{price.note}</p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button href={advanta.urls.purchase} external size="lg">
                {advanta.cta.purchase}
              </Button>
              <Button href={advanta.urls.samples} external variant="secondary" size="lg">
                {advanta.cta.samples}
              </Button>
            </div>
            <p className="mt-4 text-small">
              <a href={`mailto:${advanta.urls.email}`} className="link inline-flex min-h-11 items-center">
                {advanta.cta.contact}
              </a>
            </p>
          </div>

          <ul className="grid min-w-0 content-start gap-4 lg:border-l lg:border-edge lg:pl-12">
            {price.includes.map((item) => (
              <li key={item} className="flex gap-3 text-fg">
                <Check size={20} className="mt-0.5 shrink-0 text-accent" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <ul className="grid gap-3 border-t border-edge px-5 py-6 text-small text-fg-2 sm:px-10 md:grid-cols-3 md:gap-8 lg:px-14">
          {advanta.provenance.map((line) => (
            <li key={line} className="flex items-center gap-3">
              <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-accent-fill" />
              {line}
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}
