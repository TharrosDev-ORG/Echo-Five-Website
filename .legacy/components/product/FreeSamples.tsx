import { advanta } from "@/lib/content";
import Button from "@/components/ui/Button";
import IndexList, { type IndexItem } from "@/components/ui/IndexList";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";

const items: IndexItem[] = advanta.freeSamples.map((sample, i) => ({
  href: advanta.urls.samples,
  external: true,
  index: String(i + 1).padStart(2, "0"),
  title: sample.title,
  tag: sample.format,
  body: sample.detail,
}));

/** The six free sample documents as an indexed list, each row a link to the samples catalog. */
export default function FreeSamples() {
  return (
    <Section id="samples" labelledBy="samples-heading">
      <SectionHeading
        id="samples-heading"
        title={advanta.freeSamplesHeading}
        action={
          <Button href={advanta.urls.samples} external variant="secondary">
            {advanta.cta.samples}
          </Button>
        }
      />
      <IndexList items={items} className="mt-10 lg:mt-14" />
    </Section>
  );
}
