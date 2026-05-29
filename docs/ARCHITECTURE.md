# Architecture

A single statically-generated page plus one server route for the contact form.
Everything else renders at build time.

## Render model

- `app/layout.tsx` sets up the three font families (Archivo / Geist / Geist Mono),
  metadata, viewport `themeColor`, the `ProfessionalService` JSON-LD block, and the skip
  link. It also adds the `js` class before first paint so reveals can opt in without a
  flash for no-JS / crawlers.
- `app/opengraph-image.tsx` generates the 1200x630 dark social card at build time via
  `next/og`.
- `app/page.tsx` composes the sections in order:
  `Nav → Hero → TrustStrip → Why → Services → AdkarStepper → Method → Proof →
  ClientGrid → Credentials → About → Contact → (StickyCTA) → Footer`.
- `app/api/contact/route.ts` is a Node runtime Route Handler that delivers the contact
  form via the Resend REST API. See "Contact form" below.

## Server vs client components

Server components by default. The client (`"use client"`) components need browser APIs
or interaction:

| Component | Why it is a client component |
| --- | --- |
| `Nav` | scroll state, mobile menu, body scroll lock, scrollspy (IntersectionObserver) |
| `SignalField` | oscilloscope canvas on `requestAnimationFrame`, reduced-motion static frame |
| `AdkarStepper` | IntersectionObserver toggles the rail fill / node-lighting sequence |
| `StatCounter` | count-up animation on scroll-in (rAF) |
| `StickyCTA` | scroll + contact-visibility tracking |
| `Proof` | click-to-load YouTube facade (`useState`) |
| `ContactForm` | form submission, validation/error state, mailto fallback |
| `Reveal` | IntersectionObserver fade-and-rise wrapper |

No animation library is used; motion is CSS + a little vanilla canvas/JS. Each animated
piece has a `prefers-reduced-motion` fallback (handled in `globals.css`, plus a direct
`matchMedia` check in `SignalField` and `StatCounter`).

Client components still server-render their initial HTML, so all copy is present in the
first response (verified: the homepage HTML contains every headline and the full client
roster without JavaScript).

## Contact form

`ContactForm` POSTs JSON to `/api/contact`. The route validates, drops honeypot
submissions silently, and sends via Resend. Configuration (env):

- `RESEND_API_KEY` — when absent, the route returns `503 { fallback: true }` and the
  form reveals the owned-domain mailto fallback, so the site still works unconfigured.
- `CONTACT_TO` — destination address (defaults to `site.email`).
- `CONTACT_FROM` — verified sender (defaults to the Resend onboarding sender for dev).

## Content flow

`lib/content.ts` and `lib/site.ts` are the single source of truth. Components import
named objects (`hero`, `services`, `clients`, ...) and render them. To change wording,
edit data, never markup.

## Styling

Tailwind v4 with tokens declared in `app/globals.css` via `@theme`. Dark-first
"Operations / Instrument" system: graphite grounds, one signal-green accent, mono
labels. Section components use utility classes plus semantic helpers (`.t-display`,
`.btn`, `.u-container`, `.panel`, `.pad-block-*`, `.t-coord`) defined in the same file.

## Performance & headers

`next.config.ts` sets AVIF/WebP image formats, a one-year cache TTL, and security
headers. The page is fully static; only `/api/contact` runs on demand.
