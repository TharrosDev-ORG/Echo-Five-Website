import { why } from "@/lib/content";

/** The three ways rollouts stall, then the line that answers them. */
export default function Failures() {
  return (
    <>
      <ol className="ruled numbered">
        {why.failures.map((f) => (
          <li key={f.n}>
            <div>
              <h3 className="t-h3">{f.title}</h3>
              <p className="t-muted">{f.body}</p>
            </div>
          </li>
        ))}
      </ol>
      <p className="statement">{why.close}</p>
    </>
  );
}
