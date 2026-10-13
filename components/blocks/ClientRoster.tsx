import { clients } from "@/lib/content";

/** The full client roster, grouped by sector. */
export default function ClientRoster() {
  return (
    <div>
      {clients.groups.map((group) => (
        <div key={group.label} className="roster-group" data-reveal>
          <div className="roster-head">
            <h3 className="t-label">{group.label}</h3>
            <span className="t-label">{group.orgs.length} organizations</span>
          </div>
          <ul className="roster">
            {group.orgs.map((org) => (
              <li key={org.short}>
                <span className="roster-short">{org.short}</span>
                {org.name !== org.short ? <span className="roster-name">{org.name}</span> : null}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
