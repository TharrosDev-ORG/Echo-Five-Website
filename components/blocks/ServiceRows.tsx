import { services } from "@/lib/content";

/** The full service list as editorial rows (services page). */
export default function ServiceRows() {
  return (
    <ol className="rows">
      {services.items.map((item) => (
        <li key={item.n} data-reveal>
          <span className="row-num" aria-hidden="true">
            {item.n}
          </span>
          <h3 className="t-h3">{item.title}</h3>
          <p className="t-body">{item.body}</p>
          <span className="chip row-tag">{item.tag}</span>
        </li>
      ))}
    </ol>
  );
}
