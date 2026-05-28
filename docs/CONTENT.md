# Content map

Every word on the page comes from `lib/content.ts` (copy/data) or `lib/site.ts`
(constants). This maps each on-page section to its source export.

| # | Section | Component | Data export |
| --- | --- | --- | --- |
| — | Navigation | `Nav` | `nav`, `site` |
| — | Hero | `Hero` | `hero`, `site` |
| 01 | Why rollouts stall | `Why` | `why` |
| 02 | Where we shine (services) | `Services` | `services` |
| 03 | Selected clients | `Clients` | `clients` |
| 04 | On the record (video) | `Proof` | `proof`, `site.video` |
| 05 | How we make it measurable | `Method` | `method`, `site.advantaUrl` |
| 06 | Credentials | `Credentials` | `credentials` |
| — | The firm + founder (about) | `About` | `about`, `principal` |
| 07 | Contact | `Contact` | `contact`, `site` |
| — | Footer | `Footer` | `footer`, `nav`, `site` |

## Constants worth knowing (`lib/site.ts`)

- `email` — drives every contact link (`Mark.Abdelnour@gmail.com`). Messages reach the
  founder, Mark Abdelnour, directly.
- `video.id` — the YouTube ID for the SSC adoption talk (`4IycJ3ehz7g`).
- `advantaUrl` — the partner platform link.
- `callsign` — the `ECHO·FIVE` wordmark text.

## Editing notes

- The **client roster** (`clients.groups`) is grouped into Government of Canada, Crown
  corporations & agencies, and Enterprise & non-profit. Each org has a `short` (the
  large wordmark) and a `name` (the caption).
- **Credentials** (`credentials.items`) includes the Secret Level II clearance as a
  trust signal alongside the certifications.
- The **founder block** (`principal`) in the About section names Mark Abdelnour so a
  visitor knows who receives their email.
- House style: first-person plural, no em dashes, specifics over adjectives.
