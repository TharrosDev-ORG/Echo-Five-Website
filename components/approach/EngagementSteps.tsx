import { engagement } from "@/lib/content";
import { cx } from "@/lib/cx";
import Reveal from "@/components/ui/Reveal";

/**
 * The four-part engagement arc. Stacked on phones, two columns on tablets,
 * and a connected horizontal track from lg up.
 */
export default function EngagementSteps() {
  const last = engagement.steps.length - 1;
  return (
    <ol className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2 md:mt-14 lg:grid-cols-4 lg:gap-x-6">
      {engagement.steps.map((step, i) => (
        <Reveal as="li" key={step.n} index={i} className="min-w-0">
          <div className="flex items-center gap-4">
            <span
              aria-hidden="true"
              className="inline-flex size-11 shrink-0 items-center justify-center rounded-control bg-accent font-display text-h3 text-on-accent"
            >
              {step.n}
            </span>
            {/* Connector to the next step on the horizontal track. */}
            <span
              aria-hidden="true"
              className={cx("hidden h-px flex-1 bg-edge-strong", i < last && "lg:block")}
            />
          </div>
          <h3 className="mt-5 text-h3 text-fg">{step.title}</h3>
          <p className="mt-2 text-fg-2">{step.body}</p>
        </Reveal>
      ))}
    </ol>
  );
}
