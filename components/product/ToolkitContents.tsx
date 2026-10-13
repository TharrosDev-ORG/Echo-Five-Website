import { advanta } from "@/lib/content";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/icons";

/**
 * "What's inside": a 3x2 grid of hairline-bordered cells. The cells sit on an
 * `edge` ground one pixel apart, so neighbours share a single line.
 */
export default function ToolkitContents() {
  return (
    <Section id="inside" tone="alt" labelledBy="inside-heading">
      <SectionHeading id="inside-heading" title={advanta.contentsHeading} />
      <ul className="mt-10 grid gap-px border border-edge bg-edge sm:grid-cols-2 lg:mt-14 lg:grid-cols-3">
        {advanta.contents.map((item, i) => (
          <Reveal as="li" index={i} key={item.title} className="flex flex-col gap-3 bg-raised p-6 sm:p-8">
            <div className="mb-3 flex items-start justify-between gap-4 sm:mb-6">
              <span className="text-accent">
                <Icon name={item.icon} size={28} />
              </span>
              <span aria-hidden="true" className="text-label tabular-nums text-fg-3">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <h3 className="text-h3 text-pretty text-fg">{item.title}</h3>
            <p className="text-fg-2">{item.body}</p>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
