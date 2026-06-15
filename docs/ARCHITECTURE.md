# Architecture

A single statically-generated page plus one server route for the contact form, with a
client-side motion layer (Lenis + GSAP + Three.js) mounted over server-rendered content.

## Render model

- `app/layout.tsx` sets up the three font families (Bricolage Grotesque / Public Sans /
  IBM Plex Mono), metadata, light viewport `themeColor`, the `ProfessionalService`
  JSON-LD, and the skip link. It adds the `js` class before first paint so reveals opt in
  without a flash for no-JS / crawlers, and mounts the global FX (`Preloader`, `Cursor`,
  `ScrollProgress`) and the `SmoothScroll` provider around the page.
- `app/opengraph-image.tsx` generates the 1200x630 light social card via `next/og`.
- `app/page.tsx` composes the sections:
  `Nav → Hero → (RevealRoot: Trust → Why → Services → Adkar → Method → Proof → Clients →
  Credentials → About → Contact) → Footer`.
- `app/api/contact/route.ts` is a Node runtime Route Handler that delivers the contact
  form via the Resend REST API. See "Contact form" below.

## Motion architecture

Reveals are deliberately **not** coupled to the smooth-scroll layer — that coupling
(ScrollTrigger position calculation vs. Lenis/ticker/refresh timing) proved fragile and
left content stuck hidden. Each mechanism stands alone:

- **Smooth scroll:** `SmoothScroll` creates a Lenis instance and drives `lenis.raf` from
  `gsap.ticker` (`lagSmoothing(0)`). It only smooths scrolling, holds during the preloader,
  and handles deep links — nothing depends on it to become visible.
- **Reveals (robust):** `hooks/useReveal.ts` uses an **IntersectionObserver** to reveal
  `[data-reveal]` items (grouped or solo) and the `.split-word` fragments of `[data-split]`
  headings as they enter the viewport; GSAP runs the tween. `RevealRoot` provides one client
  scope so the content sections stay server components.
- **One GSAP entry:** `lib/gsap.ts` exports `gsap`, eases, and a `prefersReducedMotion()`
  guard. No ScrollTrigger plugin.
- **Progress + scrollspy:** the progress bar (`fx/ScrollProgress`) and the nav scrollspy use
  rAF-batched native scroll listeners.
- **Hero intro:** self-contained and idempotent — plays on whichever fires first
  (already-loaded / the preloader's `ef:loaded` event / a safety timer), so the headline can
  never be left hidden.

## Server vs client components

Server components by default. The `"use client"` components need browser APIs or
interaction:

| Component | Why it is a client component |
| --- | --- |
| `SmoothScroll` | Lenis instance, GSAP ticker sync, scroll context |
| `Nav` | condensed-on-scroll state, scrollspy (`aria-current`), mobile-menu dialog, smooth anchor scroll |
| `Hero` | load-triggered intro timeline; renders `FlowField` |
| `FlowField` | Three.js renderer on rAF; reduced-motion / no-WebGL fallback |
| `Proof` | click-to-load YouTube facade (`useState`) |
| `ContactForm` | submission, validation/error state, mailto fallback |
| `RevealRoot` | hosts the `useReveal` scope for content sections |
| `SplitText` | splits text into animatable spans on mount |
| `Cursor` / `Preloader` / `ScrollProgress` / `Magnetic` | DOM/rAF FX |

Each animated piece has a `prefers-reduced-motion` fallback (CSS in `globals.css` plus
`matchMedia` guards in the JS). Client components still server-render their initial HTML,
so all copy is present in the first response (verified: the homepage HTML contains every
headline and the full client roster without JavaScript).

## Contact form

`ContactForm` POSTs JSON to `/api/contact`. The route validates, drops honeypot
submissions silently, and sends via Resend. Configuration (env):

- `RESEND_API_KEY` — when absent, the route returns `503 { fallback: true }` and the form
  reveals the owned-domain mailto fallback, so the site still works unconfigured.
- `CONTACT_TO` — destination address (defaults to `site.email`).
- `CONTACT_FROM` — verified sender (defaults to the Resend onboarding sender for dev).

## Content flow

`lib/content.ts` and `lib/site.ts` are the single source of truth. Components import named
objects (`hero`, `services`, `clients`, ...) and render them. To change wording, edit
data, never markup.

## Styling

Tailwind v4 with tokens declared in `app/globals.css` via `@theme`. Light "Bone & Cobalt"
system. Sections use utility classes plus semantic helpers (`.t-display`, `.t-h2`, `.btn`,
`.u-container`, `.card`, `.chip`, `.pad-block-*`, `.t-coord`, `.index-num`) defined in the
same file, alongside component-specific blocks (`.svc`, `.adkar-*`, `.client-cell`,
`.cred-row`, `.proof-*`, `.founder`).

## Performance & headers

`next.config.ts` sets AVIF/WebP image formats, a one-year cache TTL, security headers, and
`optimizePackageImports` for `gsap` / `three`. The page is fully static; only
`/api/contact` and `/opengraph-image` run on demand.
