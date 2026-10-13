import { process as adkar } from "@/lib/content";

/**
 * Hero panel for /approach: the five ADKAR stages at a glance, as ruled rows
 * with the letter set large. The interactive stepper further down covers each stage.
 */
export default function AdkarGlance() {
  return (
    <div className="max-w-md lg:ml-auto lg:w-full">
      <p id="adkar-glance-label" className="text-label font-semibold text-fg-2">
        {adkar.stagesLabel}
      </p>
      <ol aria-labelledby="adkar-glance-label" className="mt-3 border-t border-edge-strong">
        {adkar.stages.map((stage, i) => (
          <li key={stage.name} className="flex items-baseline gap-5 border-b border-edge py-3">
            <span aria-hidden="true" className="w-9 shrink-0 font-display text-h2 text-accent">
              {stage.key}
            </span>
            <span className="text-h3 text-fg">{stage.name}</span>
            <span aria-hidden="true" className="ml-auto text-label tabular-nums text-fg-3">
              {String(i + 1).padStart(2, "0")}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
