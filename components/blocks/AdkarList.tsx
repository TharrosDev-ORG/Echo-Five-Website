import { process as adkar } from "@/lib/content";

/** The five ADKAR stages, in order. Their initials spell the acronym. */
export default function AdkarList() {
  return (
    <ol className="ruled rowlist" aria-label="The five Prosci ADKAR stages, in order">
      {adkar.stages.map((stage) => (
        <li key={stage.name}>
          <h3 className="t-h3">
            <span className="initial">{stage.name.charAt(0)}</span>
            {stage.name.slice(1)}
          </h3>
          <p className="t-muted">{stage.body}</p>
        </li>
      ))}
    </ol>
  );
}
