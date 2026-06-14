# Content map

Every word on the page comes from `lib/content.ts` (copy/data) or `lib/site.ts`
(constants). This maps each on-page section to its source export.

| # | Section | Component | Data export |
| --- | --- | --- | --- |
| — | Navigation | `Nav` | `nav`, `site` |
| 00 | Hero | `Hero` | `hero`, `site` |
| — | Trust strip (ticker + stats) | `Trust` | `clients` (short names + counts) |
| 01 | Why rollouts stall | `Why` | `why` |
| 02 | Where we shine (services) | `Services` | `services` |
| 03 | How adoption happens (ADKAR) | `Adkar` | `process` |
| 06 | How we make it measurable | `Method` | `method`, `site.advantaUrl` |
| 05 | On the record (video) | `Proof` | `proof`, `site.video` |
| 04 | Selected clients | `Clients` | `clients` |
| 07 | Credentials | `Credentials` | `credentials` |
| — | The firm + founder (about) | `About` | `about`, `principal` |
| 08 | Contact (form) | `Contact` / `ContactForm` | `contact`, `site` |
| — | Footer | `Footer` | `footer`, `nav`, `site` |

The `index` numbers in `content.ts` are stable section coordinates (CH.NN), so the
visual scroll order (which re-sequences Method before Proof, and Proof before Clients
for narrative flow) does not have to match the numeric order.

## Constants worth knowing (`lib/site.ts`)

- `email` — the public owned-domain address shown on the site and used as the mailto
  fallback (`mark@echo-five.ca`). Live form delivery is configured via env, not here
  (see `app/api/contact/route.ts`).
- `video.id` — the YouTube ID for the SSC adoption talk (`4IycJ3ehz7g`).
- `advantaUrl` — the partner platform link.
- `callsign` — legacy constant, retained but no longer rendered (the wordmark is now the
  "Echofive" lockup in `Nav` / `Footer`).

## Editing notes

- The **client roster** (`clients.groups`) is grouped into Government of Canada, Crown
  corporations & agencies, and Enterprise & non-profit. Each org has a `short` (the mono
  code in the grid) and a `name` (the full name). `TrustStrip` derives its counts from
  this data, so adding an org updates the stat automatically.
- **Credentials** (`credentials.items`) includes the Secret Level II clearance as a
  trust signal alongside the certifications.
- The **founder block** (`principal`) in the About section names Mark Abdelnour so a
  visitor knows who receives their message.
- House style: first-person plural, no em dashes, specifics over adjectives.
