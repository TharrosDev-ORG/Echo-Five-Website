import { advanta } from "@/lib/content";
import Section from "@/components/ui/Section";
import Stat from "@/components/ui/Stat";

/** The four headline counts (59 playbooks, 130 templates, ...) directly under the hero. */
export default function ToolkitCounts() {
  return (
    <Section spacing="sm">
      <ul className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4">
        {advanta.counts.map((count) => (
          <li key={count.label} className="border-t border-edge-strong pt-5">
            <Stat value={count.value} label={count.label} accent />
          </li>
        ))}
      </ul>
    </Section>
  );
}
