import { credentials, proofStrip } from "@/lib/content";
import Stat from "@/components/ui/Stat";
import { Icon } from "@/components/ui/icons";

/** Hero panel for /about: the four headline credentials in a two-by-two grid. */
export default function ProofPanel() {
  return (
    <div className="card card-panel max-w-md lg:ml-auto lg:w-full">
      <ul aria-label={credentials.heading} className="grid gap-x-6 gap-y-7 min-[420px]:grid-cols-2">
        {proofStrip.map((item) => (
          <li key={item.value} className="flex flex-col gap-3">
            <span
              aria-hidden="true"
              className="inline-flex size-11 items-center justify-center rounded-control bg-accent/12 text-accent"
            >
              <Icon name={item.icon} size={22} />
            </span>
            <Stat size="md" value={item.value} label={item.label} />
          </li>
        ))}
      </ul>
    </div>
  );
}
