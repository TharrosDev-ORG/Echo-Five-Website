import { credentials, proofStrip } from "@/lib/content";
import { cx } from "@/lib/cx";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import Stat from "@/components/ui/Stat";

/** Desktop placement on the 12-column grid: four quarters, every other one dropped a step. */
const place = [
  "lg:col-start-1",
  "lg:col-start-4 lg:mt-16",
  "lg:col-start-7",
  "lg:col-start-10 lg:mt-16",
];

/**
 * The four credentials as giant marks ("30+", "II", "ADKAR", "365"), each with
 * the claim it stands for beneath. Stacked on phones, two by two on tablets,
 * staggered quarters from lg. The marks share one size, fitted so "ADKAR"
 * holds a quarter column (see `.mega-fit`).
 */
export default function ProofStrip() {
  return (
    <Section aria-label={credentials.heading}>
      <ul className="grid gap-y-12 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-14 lg:grid-cols-12 lg:gap-x-6 lg:gap-y-0">
        {proofStrip.map((item, i) => (
          <Reveal
            as="li"
            index={i}
            key={item.mark}
            className={cx("mega-fit border-t border-edge pt-6 lg:col-span-3", place[i])}
          >
            <Stat size="mega" value={item.mark} label={item.value} detail={item.label} />
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
