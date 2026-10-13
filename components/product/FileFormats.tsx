import { advanta } from "@/lib/content";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";

/** The file formats the toolkit ships in, set as four large labels on hairlines. */
export default function FileFormats() {
  return (
    <Section id="formats" tone="alt" spacing="sm" labelledBy="formats-heading">
      <h2 id="formats-heading" className="text-h3 text-fg">
        {advanta.formatsHeading}
      </h2>
      <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-6 md:grid-cols-4">
        {advanta.formats.map((format, i) => (
          <Reveal as="li" index={i} key={format} className="border-t border-edge-strong pt-4">
            <span className="font-display text-h1 tracking-[-0.03em] text-fg">{format}</span>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
