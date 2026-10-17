import { about } from "@/lib/content";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import FounderCard from "@/components/about/FounderCard";

/** The firm in two paragraphs, followed by the founder. */
export default function FirmStory() {
  // The hero lead already carries the first paragraph of `about.body`.
  const [first, ...rest] = about.body.slice(1);

  return (
    <Section labelledBy="firm-heading">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-16">
        <SectionHeading id="firm-heading" title={about.heading} />
        <div className="flex max-w-[65ch] flex-col gap-5">
          <p className="text-lead text-fg">{first}</p>
          {rest.map((p) => (
            <p key={p} className="text-fg-2">
              {p}
            </p>
          ))}
        </div>
      </div>

      <Reveal className="mt-14 md:mt-20">
        <FounderCard />
      </Reveal>
    </Section>
  );
}
