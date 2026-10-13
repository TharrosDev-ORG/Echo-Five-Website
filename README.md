# Echofive Solutions — Website

Marketing site for **Echofive Solutions Inc.**, a senior change management practice
specializing in Microsoft 365 adoption for Canadian public-sector and enterprise
organizations. The site's job is to earn a first conversation.

Five statically generated pages (Home, Services, Approach, About, Contact) plus one server
route for the contact form. The visual identity is **"Midnight & Vermilion"**: cool white
paper, midnight ink and bands, one vermilion accent (see `DESIGN.md`).

## Stack

- **Next.js 16** (App Router, Turbopack) · **React 19** · **TypeScript** (strict)
- **Tailwind CSS v4** (`@tailwindcss/postcss`, tokens via `@theme`)
- Fonts via `next/font/google`: **Schibsted Grotesk** (display), **IBM Plex Sans** (body),
  **IBM Plex Mono** (labels)
- No animation libraries: entrance fades are CSS transitions toggled by one small
  IntersectionObserver component.

No CMS, no database. All copy lives in `lib/content.ts`.

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint
npm run typecheck  # tsc --noEmit
npm run build      # production build
```

## Structure

```
app/
  layout.tsx           Fonts, metadata, JSON-LD, header/footer chrome
  page.tsx             Home: hero, problem, services, ADKAR, credentials, talk, CTA
  services/ approach/ about/ contact/   Inner pages
  opengraph-image.tsx  Generated 1200x630 social card (prerendered)
  sitemap.ts robots.ts not-found.tsx error.tsx
  globals.css          Design tokens (@theme) and component styles
  api/contact/route.ts Contact form delivery (Resend REST API)
components/
  site/                Header, Footer, PageHeader, CtaBand, Reveal, icons
  blocks/              Reusable content blocks (Intro, ServiceGrid, ServiceRows,
                       Failures, AdkarSteps, Stats, Credentials, ClientRoster,
                       Principal, MethodPoints, Talk)
  contact/ContactForm  The contact form (client component)
lib/
  content.ts           All page copy and data
  site.ts              Site constants (name, email, URLs, video)
  contact.ts           Contact validation shared by form and API
  metadata.ts          Per-page title/description/canonical helper
docs/
  ARCHITECTURE.md      How the site is put together
  CONTENT.md           Where each piece of copy lives
PRODUCT.md             Brand context
DESIGN.md              Design system reference
```

## Editing content

- **Copy** for any page: `lib/content.ts`.
- **Public contact email, URLs, video, company name**: `lib/site.ts`.
- **Colors, type scale, spacing**: the `@theme` block and `:root` in `app/globals.css`.

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
menu (focus moves in, page behind is inert, Escape closes), labelled form fields with
inline errors and focus management, and `prefers-reduced-motion` support. Entrance fades
are gated behind a `.js` class so no-JS visitors and crawlers always see all content.

## Client logos & certification badges

Client and certification marks are rendered as **typographic wordmarks**, not image
files, to avoid hosting third-party trademarks.
