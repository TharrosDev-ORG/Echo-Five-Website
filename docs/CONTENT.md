# Content map

All copy lives in `lib/content.ts`; site-wide constants live in `lib/site.ts`.
Components never hard-code marketing copy.

| Page / block | Component | Data in `content.ts` |
| --- | --- | --- |
| Header and mobile menu | `site/Header` | `nav`, `site` |
| Home hero + at-a-glance panel | `app/page.tsx` | `hero` (`hero.facts`), `clients` |
| Why rollouts stall | `blocks/Failures` | `why` |
| Services overview / full list | `blocks/ServiceList` | `services` |
| ADKAR stages | `blocks/AdkarList` | `process` |
| Measurement (Advanta365) | `blocks/MethodList` + page copy | `method`, `methodPoints`, `site.advantaUrl` |
| Conference talk | `blocks/Talk` | `proof`, `site.video` |
| Figures (years, departments, organizations) | `blocks/Figures` | derived from `clients` |
| Credentials | `blocks/Credentials` | `credentials` |
| Client list | `blocks/ClientList` | `clients` |
| Founder card | `blocks/Principal` | `principal` |
| About page body | `app/about/page.tsx` | `about` |
| Inner page headers + SEO descriptions | `site/PageHeader` | `pages` |
| Closing call to action | `site/CtaBand` | `contact` |
| Contact page | `app/contact/page.tsx`, `contact/ContactForm` | `contact`, `pages.contact`, `hero.facts` |
| Footer | `site/Footer` | `footer`, `nav`, `site` |

## Rules

- Only claims already made elsewhere on the site appear in summaries (e.g. `hero.facts`
  restates the credentials list). Don't add numbers or outcomes without a source.
- No em dashes in body copy.
- Avoid "X, not Y" constructions, stacked sentence fragments, and stock phrases. The two
  taglines in `hero.headline` and `pages.about.heading` are kept on purpose.
- Section headings are plain and sentence case ("What we do", "Credentials").

## Constants worth knowing (`lib/site.ts`)

- `email` — the public owned-domain address shown on the site and used as the email
  fallback (`mark@echo-five.ca`). Live form delivery is configured via env, not here
  (see `app/api/contact/route.ts`).
- `video` — the YouTube ID for the conference talk.
- `advantaUrl` — the Advanta365 platform link.
