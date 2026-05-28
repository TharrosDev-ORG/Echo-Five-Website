# Architecture

A single statically-generated page. There is no routing beyond `/`, no API, and no
data fetching. Everything renders at build time.

## Render model

- `app/layout.tsx` sets up the three font families, metadata, the `ProfessionalService`
  JSON-LD block, the skip link, and the `js-on` class used for progressive enhancement.
- `app/page.tsx` composes the sections in order:
  `Nav → Hero → Why → Services → Clients → Proof → Method → Credentials → About →
  Contact → Footer`.
- Each section is its own component in `components/site/`.

## Server vs client components

Server components by default. Four components are client (`"use client"`) because they
need browser APIs or interaction:

| Component | Why it is a client component |
| --- | --- |
| `Nav` | scroll state, mobile menu toggle, body scroll lock |
| `Hero` | Framer Motion staggered entrance |
| `Proof` | click-to-load YouTube facade (`useState`) |
| `EchoSignal` / `Reveal` | Framer Motion + `useReducedMotion` |

Client components still server-render their initial HTML, so all copy is present in the
first response (verified: the homepage HTML contains every headline and the client
roster without JavaScript).

## Content flow

`lib/content.ts` and `lib/site.ts` are the single source of truth. Components import
named objects (`hero`, `services`, `clients`, ...) and render them. To change wording,
edit data, never markup.

## Styling

Tailwind v4 with tokens declared in `app/globals.css` via `@theme`. Section components
use utility classes plus a small set of semantic helpers (`.t-display`, `.btn`,
`.u-container`, `.section-pad`) defined in the same file.

## Performance & headers

`next.config.ts` sets AVIF/WebP image formats, a one-year cache TTL, and security
headers (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`,
`Permissions-Policy`). The page is fully static, so it serves from the edge.
