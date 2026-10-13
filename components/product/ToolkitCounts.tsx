import { advanta } from "@/lib/content";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import Stat from "@/components/ui/Stat";

/**
 * The four headline counts (59 playbooks, 130 templates, ...) directly under
 * the hero, as giant numerals. Each cell sizes its numeral to its column
 * (see `.mega-fit`) so "130" never breaks.
 */
export default function ToolkitCounts() {
  return (
    <Section>
      <ul className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4">
        {advanta.counts.map((count, i) => (
          <Reveal
            as="li"
            index={i}
            key={count.label}
            className="mega-fit border-t border-edge-strong pt-6 [--fit:1.85]"
          >
            <Stat size="mega" value={count.value} label={count.label} />
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
