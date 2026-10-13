import { why } from "@/lib/content";

/** The three ways rollouts stall, then the line that answers them. */
export default function Failures() {
  return (
    <>
      <ol className="failures">
        {why.failures.map((f, i) => (
          <li key={f.n} className="card failure" data-reveal style={{ ["--reveal-i" as string]: i }}>
            <span className="failure-key">
              Failure mode {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="t-h3">{f.title}</h3>
            <p className="t-small">{f.body}</p>
          </li>
        ))}
      </ol>
      <p className="statement on-night" data-reveal>
        {why.close}
      </p>
    </>
  );
}
