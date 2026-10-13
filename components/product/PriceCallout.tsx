import { advanta } from "@/lib/content";

const { price } = advanta;

/** Compact price line for the hero: "$1,499.99 CAD" and the one-purchase note. */
export default function PriceCallout() {
  return (
    <div className="border-l border-accent-fill pl-5">
      <p className="font-display text-h2 tabular-nums text-fg">
        {price.amount}{" "}
        <span className="font-sans text-small font-semibold tracking-normal text-fg-2">
          {price.currency}
        </span>
      </p>
      <p className="mt-1 text-small text-fg-2">{price.note}</p>
    </div>
  );
}
