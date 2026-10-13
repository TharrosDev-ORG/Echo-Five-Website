import { credentials, proofStrip } from "@/lib/content";
import Stat from "@/components/ui/Stat";

/**
 * Hero visual for /about: the four headline credentials as giant marks in a
 * two-by-two grid of ruled cells. The mark restates the value beneath it, so
 * it is hidden from assistive tech and each entry is read once.
 */
export default function ProofPanel() {
  return (
    <ul
      aria-label={credentials.heading}
      className="grid max-w-xl grid-cols-2 gap-x-6 gap-y-10 lg:ml-auto lg:w-full lg:gap-x-10 lg:gap-y-12"
    >
      {proofStrip.map((item) => (
        <li key={item.mark} className="mega-fit min-w-0 border-t border-edge-strong pt-5 [--fit:3.6]">
          <Stat size="mega" accent value={item.mark} label={item.value} detail={item.label} valueHidden />
        </li>
      ))}
    </ul>
  );
}
