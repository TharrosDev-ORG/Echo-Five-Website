import { credentials, proofStrip } from "@/lib/content";
import Section from "@/components/ui/Section";
import Stat from "@/components/ui/Stat";
import { Icon } from "@/components/ui/icons";

/** Four short credentials directly under the hero. Not revealed: it can sit above the fold. */
export default function ProofStrip() {
  return (
    <Section aria-label={credentials.heading} spacing="sm" className="border-b border-edge">
      <ul className="grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-0">
        {proofStrip.map((item) => (
          <li
            key={item.value}
            className="flex items-start gap-4 lg:flex-col lg:border-l lg:border-edge lg:px-8 lg:first:border-l-0 lg:first:pl-0"
          >
            <span
              aria-hidden="true"
              className="inline-flex size-11 shrink-0 items-center justify-center rounded-control bg-accent/12 text-accent"
            >
              <Icon name={item.icon} size={22} />
            </span>
            <Stat size="md" value={item.value} label={item.label} className="min-w-0 pt-1 lg:pt-0" />
          </li>
        ))}
      </ul>
    </Section>
  );
}
