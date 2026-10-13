# Echofive Solutions: Website

Marketing site for **Echofive Solutions Inc.**, a senior change management practice
specializing in Microsoft 365 adoption for Canadian public-sector and enterprise
organizations. The site's job is to earn a first conversation.

Six statically generated pages (Home, Services, Approach, Advanta365, About, Contact) plus
one server route for the contact form. The visual identity is **"Signal"**: black and
white grounds, one electric blue, and a thin signal line that runs down every page (see `DESIGN.md`).

## Stack

- **Next.js 16** (App Router, Turbopack) · **React 19** · **TypeScript** (strict)
- **Tailwind CSS v4** (`@tailwindcss/postcss`, tokens via `@theme`)
- Fonts self-hosted via `next/font/local` (`app/fonts`, OFL): **Bricolage Grotesque** (headings), **Geist** (text)
- No animation libraries: motion is CSS plus one small IntersectionObserver, and every
  page is fully readable without JavaScript.

No CMS, no database. All copy lives in `lib/content.ts`.

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint
npm run typecheck  # tsc --noEmit
npm run build      # production build
npm run check:copy # static copy and code rules (em dashes, legacy tokens, old years, Advanta claims)
npm run check:ui   # browser checks against a running build (see below)
```

`check:ui` drives Chromium through the built site: overflow at 360 to 1440px, contrast, one
`h1`, keyboard behavior, no-JS and reduced-motion states, and the signal rail. It uses a
Playwright install on `NODE_PATH` (it is not a project dependency) and expects a
production server:

```bash
npm run build && npx next start -p 3100 &
npm run check:ui                          # all checks
npm run check:ui -- --only=rail,contrast  # selected checks
npm run check:ui -- --shots               # also writes .screenshots/<route>-<width>.png
```

Restart the server after every rebuild; a stale server serves pages without CSS.

## Structure

```
app/
  layout.tsx           Fonts, metadata, JSON-LD, JS flag script, site chrome
  page.tsx             Home
  services/ approach/ product/ about/ contact/   Inner pages (product = Advanta365)
  opengraph-image.tsx  Generated 1200x630 social card (prerendered)
  sitemap.ts robots.ts not-found.tsx error.tsx
  globals.css          Design tokens (@theme) and component styles
  api/contact/route.ts Contact form delivery (Resend REST API)
components/
  ui/                  Primitives: Button, Container, Section, SectionHeading, Card,
                       Stat, Badge, IndexList, SignalRail, Reveal, RevealObserver, Accordion, Marquee, icons
  illustrations/       AdoptionCurve, AdkarPath, ToolkitStack, PhaseTrack
  site/                Chrome: Header, MobileCtaBar, CtaBand, Footer, PageHero, Logo, Talk
  contact/ContactForm  The contact form (client component)
lib/
  content.ts           All page copy and data
  site.ts              Site constants (name, email, URLs, video)
  contact.ts           Contact validation shared by form and API
  metadata.ts          Per-page title/description/canonical helper
  cx.ts                Class name joiner
docs/
  ARCHITECTURE.md      How the site is put together
  CONTENT.md           Where each piece of copy lives
PRODUCT.md             Brand context
DESIGN.md              Design system reference
```

## Editing content

- **Copy** for any page: `lib/content.ts`.
- **Public contact email, URLs, video, company name**: `lib/site.ts`.
- **Colors, type scale, radii**: the `@theme` blocks in `app/globals.css`.

## Contact form

The contact form posts to `app/api/contact/route.ts`, which delivers via the
[Resend](https://resend.com) REST API. Configure these environment variables (e.g. in
`.env.local` or your Vercel project) for live delivery:

| Var | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Resend API key. **If unset, the form tells visitors to email directly** so the site still works. |
| `CONTACT_TO` | Destination inbox (defaults to `site.email`). |
| `CONTACT_FROM` | Verified sender, e.g. `Echofive <mark@echo-five.ca>` (requires a verified domain in Resend). |

## Accessibility

WCAG AA contrast on every text/ground pair, one `h1` per page, skip link, keyboard-operable
menu (focus moves in and is trapped, page behind is inert and does not scroll, Escape
closes), labelled form fields with inline errors and focus management, 44px tap targets,
and `prefers-reduced-motion` support. Every page is fully readable without JavaScript:
reveal animations only engage once a script has marked `<html class="js">`.

## Client logos & certification badges

Client and certification marks are rendered as **typographic wordmarks**, not image
files, to avoid hosting third-party trademarks.
