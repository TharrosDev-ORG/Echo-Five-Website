import { credentials } from "@/lib/content";
import Section from "@/components/ui/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";

/**
 * Certifications and clearance as an indexed list: number, title with its
 * detail, and the issuing body. The rows share the IndexList layout but are
 * plain list items, so they carry no hover flood.
 */
export default function CredentialGrid() {
  return (
    <Section id="credentials" tone="alt" labelledBy="credentials-heading">
      <SectionHeading id="credentials-heading" title={credentials.heading} lead={credentials.intro} />
      <ol className="mt-10 md:mt-14">
        {credentials.items.map((item, i) => (
          <Reveal
            as="li"
            key={item.title}
            index={i}
            className="grid items-start gap-3 border-t border-edge py-6 last:border-b md:grid-cols-[4rem_minmax(0,1fr)_auto] md:items-baseline md:gap-x-6"
          >
            <span aria-hidden="true" className="index-row-num text-label tabular-nums">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <h3 className="text-h3 text-fg">{item.title}</h3>
              <p className="index-row-body">{item.detail}</p>
            </div>
            <span className="index-row-tag w-fit text-label font-semibold">{item.issuer}</span>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
