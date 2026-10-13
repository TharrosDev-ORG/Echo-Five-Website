import { clients } from "@/lib/content";

/** Show the short form only when it is an acronym (DND, SSC), not a name. */
const isAcronym = (s: string) => /^[A-Z]{2,}$/.test(s);

/** The full client roster, grouped by sector, as plain names. */
export default function ClientList() {
  return (
    <div>
      {clients.groups.map((group) => (
        <div key={group.label} className="client-group">
          <h3 className="t-h3">{group.label}</h3>
          <ul className="client-list">
            {group.orgs.map((org) => (
              <li key={org.short}>
                {org.name}
                {isAcronym(org.short) ? (
                  <>
                    {" "}
                    <abbr title={org.name}>({org.short})</abbr>
                  </>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
