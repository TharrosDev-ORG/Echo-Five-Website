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

Entrance reveals are deliberately **not** coupled to the smooth-scroll layer — that
coupling (ScrollTrigger position calculation vs. Lenis/ticker/refresh timing) proved
fragile and left content stuck hidden. The rule that keeps the system robust:
**anything that controls visibility runs on IntersectionObserver; ScrollTrigger is used
only for additive scrub effects** (parallax, pins, progress rails) whose failure leaves
content fully visible.

- **Smooth scroll:** `SmoothScroll` creates a Lenis instance and drives `lenis.raf` from
  `gsap.ticker` (`lagSmoothing(0)`). It emits `ScrollTrigger.update` on scroll and
  refreshes trigger positions after fonts load and when the preloader lifts. It only
  smooths scrolling — nothing depends on it to become visible.
- **Reveals (robust):** `hooks/useReveal.ts` uses an **IntersectionObserver** to reveal
  `[data-reveal]` items (grouped or solo) and the `.split-word` fragments of `[data-split]`
  headings as they enter the viewport; GSAP runs the tween. `RevealRoot` provides one client
  scope so the content sections stay server components.
- **Scrub moments (additive):** `lib/gsap.ts` registers ScrollTrigger for: the hero's
  scroll-exit drift, `fx/TextScrub` statements (words flood from faint to full ink; the
  faint state is applied only after the trigger exists), the Proof frame swell, and the
  pinned horizontal ADKAR sequence (`sections/Adkar`), which opts in via classes on
  wide screens and falls back to a vertical list everywhere else.
- **Velocity FX:** `fx/SkewMarquee` skews the giant roster marquee with scroll velocity
  on top of the CSS-driven loop; `fx/AdoptionChart` grows its bars and counts up via its
  own IntersectionObserver.
- **Progress + scrollspy:** the progress bar (`fx/ScrollProgress`), the nav scrollspy,
  and the hide-on-scroll-down header use rAF-batched native scroll listeners.
- **Hero intro:** self-contained and idempotent — plays on whichever fires first
  (already-loaded / the preloader's `ef:loaded` event / a safety timer), so the headline can
  never be left hidden.

One GSAP gotcha is load-bearing: the stylesheet's hidden state for split words is
`translateY(110%)`, which GSAP parses from the computed matrix as **pixels**. Every
percent-based rise therefore sets `y: 0` alongside `yPercent` so the parsed pixel
channel is cleared; otherwise the tween completes but the words stay shifted.

## Server vs client components

Server components by default. The `"use client"` components need browser APIs or
interaction:

| Component | Why it is a client component |
| --- | --- |
| `SmoothScroll` | Lenis instance, GSAP ticker sync, ScrollTrigger updates, scroll context |
| `Nav` | condensed / hide-on-scroll state, scrollspy (`aria-current`), mobile-menu dialog, smooth anchor scroll |
| `Hero` | load-triggered intro timeline, scroll-exit drift; renders `FlowField` |
| `FlowField` | Three.js renderer on rAF; reduced-motion / no-WebGL fallback |
| `Adkar` | pinned horizontal scrub on wide screens (class opt-in, static fallback) |
| `Proof` | click-to-load YouTube facade (`useState`), frame swell scrub |
| `ContactForm` | submission, validation/error state, mailto fallback |
| `RevealRoot` | hosts the `useReveal` scope for content sections |
| `SplitText` | splits text into animatable spans on mount |
| `TextScrub` | scroll-scrubbed word flood for pull statements |
| `SkewMarquee` / `AdoptionChart` / `LocalTime` / `ToTop` | scroll-velocity skew, chart count-up, footer clock, smooth back-to-top |
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
same file, alongside component-specific blocks (`.svc-row`, `.stack-card`, `.adkar-*`,
`.marquee-giant`, `.drench`, `.footer-mega`, `.client-cell`, `.cred-row`, `.proof-*`,
`.founder`).

## Performance & headers

`next.config.ts` sets AVIF/WebP image formats, a one-year cache TTL, security headers, and
`optimizePackageImports` for `gsap` / `three`. The page is fully static; only
`/api/contact` and `/opengraph-image` run on demand.
