# Echofive Solutions — Website

Marketing site for **Echofive Solutions Inc.**, a senior change management practice specializing in Microsoft 365 adoption for Canadian public-sector and enterprise organizations.

One page, server-rendered, statically generated. The job of the site is to earn a first conversation.

## Stack

- **Next.js 16** (App Router, Turbopack) · **React 19** · **TypeScript** (strict)
- **Tailwind CSS v4** (`@tailwindcss/postcss`, tokens via `@theme`)
- **Framer Motion** for entrance and the echo motif
- Fonts via `next/font/google`: **Bricolage Grotesque** (display), **Hanken Grotesk** (body), **Geist Mono** (labels)

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
  layout.tsx        Fonts, metadata, JSON-LD, <head>
  page.tsx          Section composition
  globals.css       Design tokens (@theme) + base + utilities
components/
  motif/EchoSignal  The animated "echo" rings (brand watermark)
  site/             Nav, Hero, Why, Services, Clients, Proof,
                    Method, Credentials, About, Contact, Footer, Reveal
lib/
  site.ts           Site constants (name, email, URLs, video)
  content.ts        All page copy and data
public/
  favicon.svg
docs/
  ARCHITECTURE.md   How the site is put together
  CONTENT.md        Where each piece of copy lives
PRODUCT.md          Brand context (impeccable register: brand)
DESIGN.md           Design system reference
```

## Editing content

- **Copy** for any section: `lib/content.ts`.
- **Contact email, URLs, video, company name**: `lib/site.ts`.
- **Colors, type scale, spacing**: the `@theme` block in `app/globals.css`.

> The contact email lives in `lib/site.ts` (`Mark.Abdelnour@gmail.com`) and drives
> every contact link on the site. Messages reach Mark Abdelnour, the founder, directly.

## Client logos & certification badges

Client and certification marks are rendered as **typographic wordmarks**, not image
files, to avoid hosting third-party trademarks. To swap in official logo art later,
replace the wordmark renderers in `components/site/Clients.tsx` and
`components/site/Credentials.tsx`.

## Deploy

Standard Next.js build. Deploys to Vercel from `main` with no extra configuration.
Security headers and image formats are set in `next.config.ts`.
