import { principal } from "@/lib/content";

export default function Principal() {
  return (
    <aside className="founder" aria-label="Founder">
      <p className="founder-name">{principal.name}</p>
      <p className="t-small">{principal.role}</p>
      <p className="t-muted">{principal.bio}</p>
    </aside>
  );
}
