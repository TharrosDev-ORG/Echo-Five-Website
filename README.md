# Echofive Solutions: Website

Marketing site for **Echofive Solutions Inc.**, a senior change management practice
specializing in Microsoft 365 adoption for Canadian public-sector and enterprise
organizations, and the company behind **Advanta365**. The site's job is to earn a first
conversation.

The visual identity is **"Briefing"**: paper and ink grounds shared with Advanta365, its
highlighter blue behind the words that matter, Newsreader statements, and arguments made
visible as numbered exhibits. See `DESIGN.md` for the system and `PRODUCT.md` for brand
and facts.

Live: https://echo-five-website.vercel.app (Vercel, deployed from `main`).

## Stack

- **Next.js 16** (App Router, Turbopack) · **React 19** · **TypeScript** (strict)
- **Tailwind CSS v4** (`@tailwindcss/postcss`; tokens in `app/globals.css`)
- Fonts self-hosted via `next/font/local` (`app/fonts`, OFL): **Newsreader** (statements),
  **Geist** (text), **Geist Mono** (labels and figures)
- No runtime dependencies beyond Next and React. Motion is CSS plus one
  IntersectionObserver (`components/motion/MotionRoot.tsx`); every page is fully readable
  without JavaScript and with reduced motion.

## Develop

Node 22 (pinned in `.nvmrc` and `package.json` `engines`; CI and Vercel use the same
major). With fnm or nvm: `fnm use` / `nvm use`.

```bash
npm ci
npm run dev          # http://localhost:3000
npm run lint         # ESLint (Next core-web-vitals, typescript-eslint, jsx-a11y); warnings fail
npm run typecheck    # tsc --noEmit
npm run build        # production build
npm run check:copy   # static copy rules (em dashes, old facts, Advanta365 claims, price)
npm run check:ui     # browser checks against a running server (see below)
npm run shoot -- --seg / /services   # full-page screenshots into .screenshots/
```

`check:ui` drives Chromium (Playwright, a dev dependency) through every route at 360 to
1440px: axe-core WCAG 2.1 A/AA rules, one `h1`, no horizontal overflow, images with alt,
internal links that resolve, and nothing hidden without JavaScript. It needs a running
server and the Playwright browser (`npx playwright install chromium`, once).

```bash
npm run build && npx next start -p 3100 &
npm run check:ui
BASE_URL=http://localhost:3000 ROUTES=/,/about npm run check:ui   # selected routes
WAIT_FOR_SERVER=60 npm run check:ui                              # wait for a starting server
```

The scripts exit `0` when clean, `1` when they find problems, and `2` when they cannot
run (no server answering, Chromium not installed, wrong working directory), with a
message saying what to do.

## CI

`.github/workflows/ci.yml` runs on every pull request and on pushes to `main`, with
read-only permissions, a 20 minute timeout, and superseded PR runs cancelled:

1. `npm ci`, then `npm audit --omit=dev --audit-level=high` (runtime dependencies)
2. `npm run lint`, `npm run typecheck`, `npm run check:copy`
3. `npm run build` (with `.next/cache` restored between runs)
4. Playwright Chromium install, `next start -p 3100` in the background, `npm run check:ui`

Dependabot (`.github/dependabot.yml`) opens weekly PRs for npm and GitHub Actions, with
minor and patch updates grouped into one PR each; majors arrive individually.

## Structure

```
app/
  layout.tsx            Fonts, metadata, JSON-LD, JS flag script, site chrome
  template.tsx          Page-enter transition
  page.tsx              Home
  services/ approach/ advanta365/ about/ contact/ privacy/ accessibility/
  opengraph-image.tsx   Generated 1200x630 share card
  icon.svg apple-icon.png manifest.ts sitemap.ts robots.ts not-found.tsx error.tsx
  globals.css           Design tokens, tones, type roles, motion, components
  api/contact/route.ts  Contact form delivery (Resend REST API)
components/
  ui/                   Button, Arrow, Mark (highlighter), Lines, Index, Exhibit, Logo
  site/                 Header, Footer, MobileCta, PageHero, Closing, Talk
  exhibits/             AdoptionGap, AdkarBars, DocStack (drawn figures)
  motion/MotionRoot     The one scroll-in observer
  home/ services/ approach/ advanta/ about/ contact/ legal/   Page sections
lib/
  content/              All copy, one module per area (see docs/CONTENT.md)
  site.ts               Site constants (name, email, URLs, video)
  contact.ts            Contact validation shared by form and API
  metadata.ts           Per-page title/description/canonical helper
scripts/                check-copy, check-ui, shoot
```

## Editing content

- **Copy** for any page: `lib/content/*.ts` (map in `docs/CONTENT.md`).
- **Public email, URLs, video, company name**: `lib/site.ts`.
- **Colors, type scale, motion**: `app/globals.css` (documented in `DESIGN.md`).

## Contact form

The form posts to `app/api/contact/route.ts`, which delivers via the
[Resend](https://resend.com) REST API. Environment variables (Vercel project settings):

| Var | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Resend API key. **If unset, the form tells visitors to email directly** so the site still works. |
| `CONTACT_TO` | Destination inbox (defaults to `site.email`). |
| `CONTACT_FROM` | Verified sender, e.g. `Echofive <mark@echo-five.ca>`. |

## Accessibility

WCAG 2.1 AA is the floor: checked contrast on every token pair, one `h1` per page, skip
link, landmarks, keyboard-operable menu (focus trapped, page behind inert, Escape closes),
labelled form fields with inline errors and focus management, 44px targets, pausable
marquee, and `prefers-reduced-motion` support. Reveal effects only engage once a script has
marked `<html class="js">`.
