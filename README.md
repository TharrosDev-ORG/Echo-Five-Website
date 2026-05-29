# Echofive Solutions — Website

Marketing site for **Echofive Solutions Inc.**, a senior change management practice specializing in Microsoft 365 adoption for Canadian public-sector and enterprise organizations.

One page, server-rendered and statically generated, plus one server route for the
contact form. The job of the site is to earn a first conversation. The visual identity
is "Operations / Instrument": dark, technical, data-forward (see `DESIGN.md`).

## Stack

- **Next.js 16** (App Router, Turbopack) · **React 19** · **TypeScript** (strict)
- **Tailwind CSS v4** (`@tailwindcss/postcss`, tokens via `@theme`)
- No animation library: motion is CSS + IntersectionObserver + a small canvas (`SignalField`)
- Fonts via `next/font/google`: **Archivo** (display), **Geist** (body), **Geist Mono** (labels/data)

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
  layout.tsx           Fonts, metadata, viewport, JSON-LD, <head>
  page.tsx             Section composition
  opengraph-image.tsx  Generated 1200x630 dark social card (next/og)
  globals.css          Design tokens (@theme) + base + utilities
  api/contact/route.ts Contact form delivery (Resend REST API)
components/
  motif/SignalField    Live oscilloscope canvas behind the hero
  site/                Nav, Hero, TrustStrip, Why, Services, AdkarStepper,
                       Method, Proof, ClientGrid, Credentials, About,
                       Contact, ContactForm, Footer, Reveal, SectionMark,
                       StatCounter, StickyCTA
lib/
  site.ts              Site constants (name, email, URLs, video)
  content.ts           All page copy and data
public/
  favicon.svg
docs/
  ARCHITECTURE.md      How the site is put together
  CONTENT.md           Where each piece of copy lives
PRODUCT.md             Brand context (impeccable register: brand)
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

> The public address in `lib/site.ts` (`mark@echo-five.ca`) is shown on the site and
> used as the mailto fallback. Form submissions reach Mark Abdelnour, the founder,
> directly.

## Client logos & certification badges

Client and certification marks are rendered as **typographic wordmarks**, not image
files, to avoid hosting third-party trademarks. To swap in official logo art later,
replace the wordmark renderers in `components/site/Clients.tsx` and
`components/site/Credentials.tsx`.

## Deploy

Standard Next.js build. Deploys to Vercel from `main` with no extra configuration.
Security headers and image formats are set in `next.config.ts`.
