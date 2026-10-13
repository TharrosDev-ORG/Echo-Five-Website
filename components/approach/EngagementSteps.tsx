import { engagement } from "@/lib/content";
import Reveal from "@/components/ui/Reveal";

/**
 * The four-part engagement arc as a numbered sequence: one ruled row per
 * step, with the numeral, the title, and the description in a line from md.
 */
export default function EngagementSteps() {
  return (
    <ol className="mt-10 border-b border-edge md:mt-14">
      {engagement.steps.map((step, i) => (
        <Reveal
          as="li"
          key={step.n}
          index={i}
          className="grid gap-x-8 gap-y-3 border-t border-edge py-8 md:grid-cols-[5rem_minmax(0,1fr)_minmax(0,1.1fr)] md:py-10 lg:grid-cols-[5.5rem_minmax(0,1fr)_minmax(0,1.1fr)]"
        >
          <span aria-hidden="true" className="font-display text-h2 text-accent tabular-nums">
            {step.n.padStart(2, "0")}
          </span>
          <h3 className="text-h2 text-fg md:text-h3 lg:text-h2">{step.title}</h3>
          <p className="max-w-[52ch] text-fg-2 md:pt-1">{step.body}</p>
        </Reveal>
      ))}
    </ol>
  );
}
