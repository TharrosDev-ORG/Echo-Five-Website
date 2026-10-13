import { advanta } from "@/lib/content";
import Badge from "@/components/ui/Badge";
import Section from "@/components/ui/Section";
import { FileText } from "@/components/ui/icons";

/** Compact row listing the file formats the toolkit ships in. */
export default function FileFormats() {
  return (
    <Section id="formats" spacing="sm" labelledBy="formats-heading">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-10">
        <h2 id="formats-heading" className="text-h3 text-fg">
          {advanta.formatsHeading}
        </h2>
        <ul className="flex flex-wrap gap-2">
          {advanta.formats.map((format) => (
            <li key={format}>
              <Badge icon={<FileText size={14} className="text-accent" />} className="tracking-[0.06em]">
                {format}
              </Badge>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
