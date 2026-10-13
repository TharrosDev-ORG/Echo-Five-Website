import { why } from "@/lib/content";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { StallClose, StallReasonList } from "@/components/site/StallPoints";

/**
 * The problem statement. From lg the heading holds still on the left while
 * the three failures, then the line on where Echofive comes in, scroll past
 * on the right.
 */
export default function WhyRolloutsStall() {
  return (
    <Section id="why" tone="alt" labelledBy="why-heading">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-x-10 xl:gap-x-16">
        <div className="lg:col-span-5">
          <SectionHeading
            id="why-heading"
            title={why.heading}
            lead={why.body}
            className="lg:sticky lg:top-[calc(var(--header-h)+2rem)]"
          />
        </div>
        <div className="min-w-0 lg:col-span-7">
          <StallReasonList />
          <StallClose className="mt-14 md:mt-20" />
        </div>
      </div>
    </Section>
  );
}
