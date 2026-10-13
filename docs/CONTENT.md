# Content map

All copy lives in `lib/content.ts`; site-wide constants live in `lib/site.ts`.
Components never hard-code marketing copy.

| Page / block | Component | Data in `content.ts` |
| --- | --- | --- |
| Header and mobile menu | `site/Header` | `nav`, `site` |
| Home hero + at-a-glance panel | `app/page.tsx` | `hero` (`hero.facts`), `clients` |
| Problem (failure modes) | `blocks/Failures` | `why` |
| Services overview / full list | `blocks/ServiceGrid`, `blocks/ServiceRows` | `services` |
| ADKAR sequence | `blocks/AdkarSteps` | `process` |
| Measurement (Advanta365) | `blocks/MethodPoints` + page copy | `method`, `methodPoints`, `site.advantaUrl` |
| Conference talk | `blocks/Talk` | `proof`, `site.video` |
| Stats | `blocks/Stats` | derived from `clients` |
| Credentials | `blocks/Credentials` | `credentials` |
| Client roster | `blocks/ClientRoster` | `clients` |
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

## Constants worth knowing (`lib/site.ts`)

- `email` — the public owned-domain address shown on the site and used as the email
  fallback (`mark@echo-five.ca`). Live form delivery is configured via env, not here
  (see `app/api/contact/route.ts`).
- `video` — the YouTube ID for the conference talk.
- `advantaUrl` — the Advanta365 platform link.
