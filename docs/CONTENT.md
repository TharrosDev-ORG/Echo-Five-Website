# Content map

All copy lives in `lib/content.ts`; site-wide constants live in `lib/site.ts`.
Components never hard-code marketing copy.

| Page / block | Where | Data in `content.ts` |
| --- | --- | --- |
| Header and mobile menu | `site/Header` | `nav`, `navCta`, `site` |
| Mobile CTA bar | `site/MobileCtaBar` | `mobileCta` |
| Closing call to action | `site/CtaBand` | `ctaBand` |
| Footer | `site/Footer` | `footer`, `nav`, `navCta`, `advanta`, `site` |
| Inner page headers + SEO descriptions | `site/PageHero`, `lib/metadata.ts` | `pages` |
| Home hero | `app/page.tsx` | `hero` |
| Proof strip | `app/page.tsx` | `proofStrip` |
| Client marquee and roster | `ui/Marquee`, About page | `clients` |
| Why rollouts stall | Home, Approach | `why` |
| Services | Home, Services | `services` (incl. `pairWithAdvanta`) |
| ADKAR stages | Home teaser, Approach stepper | `process` |
| How an engagement runs | Approach | `engagement` |
| Conference talk | `site/Talk` | `talk`, `site.video` |
| Advanta365 band, product page | Home, `app/product/page.tsx` | `advanta` |
| Firm story, founder | About | `about`, `principal` |
| Credentials | About, Contact | `credentials`, `hero.facts` |
| Contact page | `app/contact/page.tsx`, `contact/ContactForm` | `contact`, `contactForm`, `pages.contact` |
| 404 and error pages | `app/not-found.tsx`, `app/error.tsx` | `notFound`, `errorPage` |

## Rules

- Only claims already made elsewhere on the site appear in summaries (e.g. `hero.facts`
  and `proofStrip` restate the credentials list). Don't add numbers or outcomes without
  a source.
- Experience is 30+ years ("more than thirty years" in prose).
- Advanta365 copy uses only the facts in `PRODUCT.md`. It is a document toolkit; never
  describe it as an analytics or governance platform.
- No em dashes in body copy.
- Avoid "X, not Y" constructions, stacked sentence fragments, and stock phrases. The two
  taglines in `hero.headline` and `pages.about.heading` are kept on purpose.
- Section headings are plain and sentence case ("What we do", "Credentials").

## Constants worth knowing (`lib/site.ts`)

- `email`: the public owned-domain address shown on the site and used as the email
  fallback (`mark@echo-five.ca`). Live form delivery is configured via env, not here
  (see `app/api/contact/route.ts`).
- `video`: the YouTube ID for the conference talk.
- `advantaUrl`, `advantaPurchaseUrl`, `advantaSamplesUrl`, `advantaEmail`: Advanta365
  links, also exposed as `advanta.urls` in `content.ts`.
