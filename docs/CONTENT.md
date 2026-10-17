# Content map

All copy lives in `lib/content/*.ts`; site-wide constants live in `lib/site.ts`.
Components never hard-code marketing copy.

| Module | Exports | Used by |
| --- | --- | --- |
| `shared.ts` | `nav`, `navCta`, `closing`, `footer`, `ui`, `mobileCta`, `clients`, `clientCount`, `credentials`, `proof`, `principal`, `talk` | Header, Footer, Closing, MobileCta, home, About, Contact, Talk |
| `pages.ts` | `pages` (index label, h1 lines, lead, SEO title and description per inner page) | `PageHero`, `lib/metadata.ts` |
| `home.ts` | `hero`, `proofIntro`, `homeMeta` | Home |
| `approach.ts` | `why`, `adoptionGap`, `adkar`, `engagement`, `approachPage` | Home (problem, method), Approach, `exhibits/AdoptionGap`, `exhibits/AdkarBars` |
| `services.ts` | `services` (six services with deliverables, the rollout exhibit, platforms, pair with Advanta365) | Home (index), Services |
| `advanta.ts` | `advanta` (counts, contents, eleven phases, formats, six free samples, purchase list, URLs, `page` section copy) | Home band, Advanta365 page, Footer, `exhibits/DocStack` |
| `about.ts` | `aboutNav`, `aboutNavLabel`, `firm`, `founder`, `credentialsSection`, `clientsSection` | About |
| `contact.ts` | `contact`, `contactForm` | Contact, `contact/ContactForm` |
| `legal.ts` | `legalUi`, `privacy`, `accessibility`, `legalHeadings`, `notFoundPage`, `errorPage` | Privacy, Accessibility, 404, error |

## Rules

- No claim appears without a source. Summaries only restate what is said in full
  elsewhere (`proof` restates `credentials`; service deliverables restate the service
  body). Don't add numbers, outcomes, testimonials, or headcount.
- Experience is 30+ years ("more than thirty years" in prose).
- Advanta365 facts come from advanta365.com and its source (counts, the eleven phases,
  the six free samples). It is a document toolkit; never describe it as an analytics or
  governance platform. Never publish its price on this site.
- Diagrams that are not data say "Illustrative." in their exhibit note.
- No em dashes. "Microsoft 365" with a non-breaking space in visible copy; metadata
  descriptions use a plain space.
- Section headings are sentence case. The taglines "Change that lands. Tools that get
  used." and "Thirty years. One job. Done properly." are kept on purpose.
- `npm run check:copy` enforces the mechanical rules.

## Constants worth knowing (`lib/site.ts`)

- `email`: the public address shown on the site and used as the email fallback
  (`mark@echo-five.ca`). Live form delivery is configured via env (see
  `app/api/contact/route.ts`).
- `video`: the YouTube ID for the conference talk. Its poster is served locally from
  `public/talk-poster.jpg`.
- `advantaUrl`, `advantaPurchaseUrl`, `advantaSamplesUrl`, `advantaEmail`: Advanta365
  links, also exposed as `advanta.urls`.
