import { services } from "@/lib/content";

/** Six services as scannable cards (home page overview). */
export default function ServiceGrid() {
  return (
    <ul className="grid-3">
      {services.items.map((item, i) => (
        <li
          key={item.n}
          className="card service-card"
          data-reveal
          style={{ ["--reveal-i" as string]: i % 3 }}
        >
          <span className="service-num">{item.n}</span>
          <h3 className="t-h3">{item.title}</h3>
          <p className="t-small">{item.body}</p>
          <span className="chip">{item.tag}</span>
        </li>
      ))}
    </ul>
  );
}
