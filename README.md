# Echofive Solutions — Website

Marketing site for **Echofive Solutions Inc.**, a senior change management practice
specializing in Microsoft 365 adoption for Canadian public-sector and enterprise
organizations.

A single immersive page, server-rendered and statically generated, plus one server route
for the contact form. The job of the site is to earn a first conversation. The visual
identity is **"Bone & Cobalt"**: a light editorial system on warm bone paper with one
electric cobalt accent, carried by smooth-scroll storytelling, scroll-scrubbed
narrative moments (a pinned horizontal ADKAR sequence, sticky stacking cards, a giant
outlined client marquee, a cobalt-drenched close), and WebGL motion (see `DESIGN.md`).

## Stack

- **Next.js 16** (App Router, Turbopack) · **React 19** · **TypeScript** (strict)
- **Tailwind CSS v4** (`@tailwindcss/postcss`, tokens via `@theme`)
- **GSAP** for animation (+ ScrollTrigger for additive scrub moments: the pinned ADKAR
  sequence, scrubbed statements, parallax), **IntersectionObserver** for entrance
  reveals (robust, decoupled from scroll); **Lenis** for smooth scroll; a
  dependency-free **raw-WebGL** hero flow field (~4KB instead of a 130KB library)
- Fonts via `next/font/google`: **Bricolage Grotesque** (display), **Public Sans**
  (body), **IBM Plex Mono** (labels/coordinates)

No CMS, no database. All copy lives in `lib/content.ts`.

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck  # tsc --noEmit
npm run build      # production build
```

## Structure

```
app/
  layout.tsx           Fonts, metadata, viewport, JSON-LD, providers, FX layers
  page.tsx             Section composition
  opengraph-image.tsx  Generated 1200x630 light social card (next/og)
  globals.css          Design tokens (@theme) + base + components + reveal states
  api/contact/route.ts Contact form delivery (Resend REST API)
components/
  providers/SmoothScroll  Lenis smooth scroll synced to GSAP ScrollTrigger
  fx/                     Cursor, Preloader, ScrollProgress, Magnetic, TextScrub,
                          SkewMarquee, AdoptionChart, LocalTime, ToTop
  gl/FlowField            Raw-WebGL curl-noise particle field behind the hero
  ui/                     SplitText, RevealRoot, SectionHeading
  sections/               Nav, Hero, Trust, Why, Services, Adkar, Method, Proof,
                          Clients, Credentials, About, Contact, ContactForm, Footer
hooks/
  useReveal.ts         Scoped GSAP reveal hook ([data-reveal] / [data-split])
lib/
  site.ts              Site constants (name, email, URLs, video)
  content.ts           All page copy and data
  gsap.ts              Single GSAP/ScrollTrigger entry point
  splitText.ts         Dependency-free word/char splitter for kinetic headlines
docs/
  ARCHITECTURE.md      How the site is put together
  CONTENT.md           Where each piece of copy lives
PRODUCT.md             Brand context
DESIGN.md              Design system reference
```

## Editing content

- **Copy** for any section: `lib/content.ts`.
- **Public contact email, URLs, video, company name**: `lib/site.ts`.
- **Colors, type scale, spacing**: the `@theme` block in `app/globals.css`.

## Contact form

The contact form posts to `app/api/contact/route.ts`, which delivers via the
[Resend](https://resend.com) REST API. Configure these environment variables (e.g. in
`.env.local` or your Vercel project) for live delivery:

| Var | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Resend API key. **If unset, the form degrades to a copyable mailto fallback** so the site still works. |
| `CONTACT_TO` | Destination inbox (defaults to `site.email`). |
| `CONTACT_FROM` | Verified sender, e.g. `Echofive <mark@echo-five.ca>` (requires a verified domain in Resend). |

> The public address in `lib/site.ts` (`mark@echo-five.ca`) is shown on the site and used
> as the mailto fallback. Form submissions reach Mark Abdelnour, the founder, directly.

## Motion & accessibility

Every animated piece degrades gracefully. Reveal start-states are gated behind a `.js`
class set before first paint, so no-JS visitors and crawlers see all content. The
preloader, custom cursor, Lenis smoothing, and the WebGL field are all skipped under
`prefers-reduced-motion`, and the WebGL hero falls back to a CSS gradient with no WebGL
support. The custom cursor is additive and fine-pointer only.

## Client logos & certification badges

Client and certification marks are rendered as **typographic wordmarks**, not image
files, to avoid hosting third-party trademarks.

## Deploy

Standard Next.js build. Deploys to Vercel from `main` with no extra configuration.
Security headers and image formats are set in `next.config.ts`.
