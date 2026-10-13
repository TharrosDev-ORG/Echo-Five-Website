import { process as adkar } from "@/lib/content";

/** The five ADKAR states as a left-to-right sequence (top-to-bottom on mobile). */
export default function AdkarSteps() {
  return (
    <ol className="steps" aria-label="The Prosci ADKAR sequence">
      {adkar.stages.map((stage, i) => (
        <li key={stage.name} className="step" data-reveal style={{ ["--reveal-i" as string]: i }}>
          <span className="step-key" aria-hidden="true">
            {stage.key}
          </span>
          <h3 className="step-name">
            <span className="u-sr">Step {i + 1}: </span>
            {stage.name}
          </h3>
          <p className="step-body">{stage.body}</p>
        </li>
      ))}
    </ol>
  );
}
