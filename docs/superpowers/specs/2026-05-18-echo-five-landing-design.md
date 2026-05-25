# Echo-Five Consulting — Landing Page Design

**Date:** 2026-05-18
**Status:** Superseded — see `DESIGN.md` for the current design system reference.
**Target domain:** echo-five.ca
**Repo:** `TharrosDev-ORG/Echo-Five-Website`

> **Note:** This document captures the original build specification. The implementation has evolved significantly since initial delivery: the visual language now uses Archivo (not Inter + Fraunces), a Swiss govtech grid system with institutional teal (not the originally specified editorial-serif approach), a `mailto:` CTA (not a form) for the contact section, and a full-bleed dark hero. Refer to `DESIGN.md` for the live design system and `README.md` for accurate stack details.

## Context

Echo-Five is a consulting firm run by the client's father. The firm focuses on
**change management with a Microsoft 365 integration specialty for government
and public sector clients**. Real copy, logo, and brand colors are not yet
available. This first version uses directionally-correct filler so swapping in
real content later is mechanical.

## Goals

- Establish a credible online presence at `echo-five.ca`.
- Communicate the firm's focus (change management, M365, public sector) clearly enough that a visitor in week one can pitch the firm in one sentence.
- Make later content swaps trivial — every piece of filler lives in one obvious place per section.
- Ship a single static-friendly Next.js page that deploys to Vercel without configuration.

## Non-Goals

- No CMS integration.
- No working contact form backend (form posts to a no-op handler or is purely visual; a `mailto:` fallback is acceptable).
- No multi-page routing. The site is a single scrollable page with anchor navigation.
- No animations beyond simple scroll-triggered fade-ins.
- No blog, case studies, or team bios in v1.

## Stack

- **Framework:** Next.js 16 (App Router) + React 19
- **Language:** TypeScript (strict)
- **Styling:** Tailwind CSS v4 (CSS-first config via `@theme` in `globals.css`)
- **Fonts:** Inter (UI), Fraunces (wordmark and section labels) — via `next/font/google`
- **Hosting target:** Vercel (zero-config)
- **Node:** 20+

## Visual System

| Token            | Value         | Use                                  |
|------------------|---------------|--------------------------------------|
| `--bg`           | `#FAFAF7`     | Page background (warm off-white)     |
| `--surface`      | `#FFFFFF`     | Card backgrounds                     |
| `--ink`          | `#0F1A2E`     | Primary text                         |
| `--ink-muted`    | `#475569`     | Secondary text                       |
| `--accent`       | `#1A2740`     | Primary accent (deep slate-navy)     |
| `--accent-warm`  | `#8C7A5B`     | Secondary accent (warm bronze)       |
| `--rule`         | `#E5E2DA`     | Hairline borders                     |

- Type scale: clamp-based, 16px body min / 18px desktop body / `clamp(36px, 6vw, 64px)` H1.
- Spacing: generous — sections separated by `clamp(80px, 12vh, 160px)` vertical padding.
- No drop shadows. Use 1px hairline borders (`--rule`) for elevation.
- Hover states: subtle (slight color shift, no scale or translate beyond 2px).
- Scroll-triggered fade-in on each section via `IntersectionObserver` (respect `prefers-reduced-motion`).

## Placeholder Identity

- **Wordmark:** `ECHO · FIVE` in Fraunces, slight letter-spacing.
- **Mark:** Five concentric arcs (suggesting echo/signal), SVG inline component.
- Both live in `components/Logo.tsx` so they can be replaced by a single file edit when real branding arrives.

## Page Structure

Single-route landing page at `/`. Top-to-bottom sections, each in its own component file under `components/sections/`.

### 1. Nav (`Nav.tsx`)
- Sticky top, transparent over hero, gains background + hairline border on scroll.
- Left: Logo. Right: anchor links (About, Services, Approach, Contact) + "Get in touch" button.
- Mobile: hamburger → full-screen overlay menu.

### 2. Hero (`Hero.tsx`)
- Headline: *"Change that lands. Tools that get used."*
- Subhead: 2-line filler about M365 adoption in the public sector.
- Primary CTA: "Get in touch" (anchors to `#contact`).
- No hero image in v1 — typography-led.

### 3. About (`About.tsx`)
- Two short filler paragraphs about the firm's focus.
- Pull-stat strip: 3 stats (e.g. "20+ years public sector", "Microsoft 365 specialist", "Change Management certified") — all flagged with `<!-- PLACEHOLDER -->` style comments.

### 4. Services (`Services.tsx`)
- 3-card grid (1-col mobile, 3-col desktop):
  1. **Microsoft 365 Adoption** — readiness, deployment, governance
  2. **Change Management Strategy** — stakeholder engagement, communications, measurement
  3. **Training & Enablement** — role-based training, champions programs, sustainment

### 5. Approach (`Approach.tsx`)
- 4-step horizontal process: **Discover → Design → Deploy → Sustain**
- Each step: number, label, one-line filler description.

### 6. Credentials Strip (`Credentials.tsx`)
- Row of placeholder badges: "Microsoft Partner", "Prosci-certified", "ITIL", "Government of Canada cleared".
- Rendered as text-only "logo lipsum" boxes so the swap to real images is one file.

### 7. Contact (`Contact.tsx`)
- Left: short intro paragraph + email placeholder (`hello@echo-five.ca`) + LinkedIn placeholder.
- Right: simple form (Name / Email / Message / Submit) — form `onSubmit` is a no-op that shows a "Thanks, we'll be in touch" success state. No backend wiring.

### 8. Footer (`Footer.tsx`)
- Wordmark, copyright line ("© 2026 Echo-Five Consulting"), small anchor links repeat.

## File Layout

```
Echo-Five-Website/
├── app/
│   ├── layout.tsx          # Fonts, metadata, root html
│   ├── page.tsx            # Composes all sections
│   └── globals.css         # Tailwind v4 @theme + base styles
├── components/
│   ├── Logo.tsx
│   ├── ScrollReveal.tsx    # IntersectionObserver wrapper
│   └── sections/
│       ├── Nav.tsx
│       ├── Hero.tsx
│       ├── About.tsx
│       ├── Services.tsx
│       ├── Approach.tsx
│       ├── Credentials.tsx
│       ├── Contact.tsx
│       └── Footer.tsx
├── public/
│   └── favicon.ico         # Generated placeholder
├── docs/superpowers/specs/2026-05-18-echo-five-landing-design.md
├── .gitignore
├── next.config.ts
├── package.json
├── tsconfig.json
├── postcss.config.mjs
└── README.md
```

## Content Swap Plan (for later)

All filler strings live as exported constants at the top of each section file
(e.g. `const COPY = { headline: "...", sub: "..." }`). When the client provides
real content, the swap is a single string replacement per section. No copy is
inlined deep in JSX where it would be hard to find.

## Build & Deploy

- `npm install` then `npm run dev` for local dev (port 3000).
- `npm run build` must succeed cleanly before push.
- Vercel auto-detects Next.js — no `vercel.json` needed.
- Domain (`echo-five.ca`) wiring is out-of-scope for v1; user will point DNS after deployment.

## Acceptance Criteria

1. `npm run build` succeeds with zero errors and zero TypeScript errors.
2. Page renders all 8 sections on desktop (≥1280px) and mobile (375px) without layout breaks.
3. All anchor links scroll to their target section.
4. Mobile menu opens, closes, and links scroll on tap.
5. Contact form shows the success state on submit without making any network request.
6. Lighthouse Performance ≥ 90 on desktop (a typography-led static page should be ≥ 95).
7. Repo `TharrosDev-ORG/Echo-Five-Website` exists, contains the project, and `main` branch is pushed.
