import { process as adkar } from "@/lib/content";

/**
 * Hero panel for /approach: the five ADKAR stages at a glance, as a short
 * vertical timeline. The interactive stepper further down covers each stage.
 */
export default function AdkarGlance() {
  const last = adkar.stages.length - 1;

  return (
    <div className="card card-panel max-w-md lg:ml-auto lg:w-full">
      <p id="adkar-glance-label" className="text-small font-medium text-fg-2">
        {adkar.stagesLabel}
      </p>
      <ol aria-labelledby="adkar-glance-label" className="mt-3 grid gap-3">
        {adkar.stages.map((stage, i) => (
          <li key={stage.name} className="relative flex items-center gap-4">
            {i < last ? (
              <span
                aria-hidden="true"
                className="absolute top-10 -bottom-3 left-5 w-0.5 -translate-x-1/2 bg-edge-strong"
              />
            ) : null}
            <span
              aria-hidden="true"
              className="relative flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-accent bg-raised font-display font-semibold text-fg"
            >
              {stage.key}
            </span>
            <span className="font-display text-h3 text-fg">{stage.name}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
