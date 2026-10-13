import { why } from "@/lib/content";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import { StallClose, StallReasonList } from "@/components/site/StallPoints";

/** The problem statement: three common failures, then what Echofive works on. */
export default function WhyRolloutsStall() {
  return (
    <Section id="why" labelledBy="why-heading">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-x-16">
        <div className="lg:col-span-5">
          <SectionHeading
            id="why-heading"
            title={why.heading}
            lead={why.body}
            className="lg:sticky lg:top-[calc(var(--header-h)+2rem)]"
          />
        </div>
        <StallReasonList className="lg:col-span-7" />
        {/* Full width under both columns, so it closes the whole section. */}
        <StallClose className="mt-2 md:mt-6 lg:col-span-12" />
      </div>
    </Section>
  );
}
