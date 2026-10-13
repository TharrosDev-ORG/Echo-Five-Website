import { principal } from "@/lib/content";

export default function Principal() {
  return (
    <aside className="card principal" aria-label="Founder" data-reveal>
      <div className="principal-top">
        <span className="monogram" aria-hidden="true">
          {principal.monogram}
        </span>
        <div>
          <p className="principal-name">{principal.name}</p>
          <p className="t-label" style={{ marginTop: 2 }}>
            {principal.role}
          </p>
        </div>
      </div>
      <p className="t-small">{principal.bio}</p>
      <p className="principal-creds t-label">{principal.credentials}</p>
    </aside>
  );
}
