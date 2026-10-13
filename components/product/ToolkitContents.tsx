import { advanta } from "@/lib/content";
import Card from "@/components/ui/Card";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { Icon } from "@/components/ui/icons";

/** "What's inside": one card per part of the toolkit. */
export default function ToolkitContents() {
  return (
    <Section id="inside" tone="alt" labelledBy="inside-heading">
      <SectionHeading id="inside-heading" title={advanta.contentsHeading} />
      <ul className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:mt-12 lg:grid-cols-3">
        {advanta.contents.map((item, i) => (
          <Reveal as="li" index={i} key={item.title}>
            <Card icon={<Icon name={item.icon} size={22} />} title={item.title} className="h-full">
              <p>{item.body}</p>
            </Card>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
