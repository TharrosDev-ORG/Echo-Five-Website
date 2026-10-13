# Echofive site overhaul: "Spruce & Citron"

Status: approved 2026-10-13. This spec is the single source of truth for the build agents.

## Goal

Turn the current plain, document-style site into a premium, conversion-focused marketing
site for the same B2B audience (Canadian federal, provincial, municipal, Crown, and
enterprise program leads buying Microsoft 365 change management). Fix four problems:

1. Too plain, not premium.
2. Weak conversion.
3. Advanta365 is buried and described incorrectly.
4. Mobile experience.

Same six routes: `/`, `/services`, `/approach`, `/product` (Advanta365), `/about`, `/contact`.
Same stack: Next.js 16 App Router, React 19, TypeScript strict, Tailwind CSS v4. No new
runtime dependencies (no animation libraries, no icon packs, no UI kits).

## Non-negotiable rules

- **No invented facts.** Every claim must come from `lib/content.ts` (after the corrections
  below) or the Advanta365 facts in this spec. No testimonials, outcome percentages, client
  logos, team sizes, or FAQ answers that are not sourced.
- **No em dashes** in any user-visible copy or metadata. Avoid "X, not Y" constructions.
- **All copy lives in `lib/content.ts`** (and `lib/site.ts` for constants). Components do
  not hard-code marketing copy. Small UI microcopy (aria labels, "Menu") is fine inline.
- **WCAG 2.1 AA** minimum: contrast, keyboard access, visible focus, one `h1` per page,
  landmarks, alt text / `aria-hidden` on decorative SVG, 44px minimum tap targets.
- **Content visible without JavaScript.** Reveal animations are progressive enhancement:
  the default CSS state is fully visible; JS adds a class to opt in to animating.
  (Commit #10 in history broke this once. Do not repeat it.)
- **`prefers-reduced-motion: reduce`** disables all non-essential motion.
- **No horizontal overflow** at 360px. Test 360, 390, 768, 1024, 1440 widths.
- Keep the existing contact API (`app/api/contact/route.ts`) and validation
  (`lib/contact.ts`) behaviour unchanged. Restyle the form only.

## Content corrections (apply in `lib/content.ts` / `lib/site.ts`)

1. Experience is **30+ years** everywhere (was "20+" / "twenty years"). The tagline
   "Twenty years. One job. Done properly." becomes "Thirty years. One job. Done properly."
2. **Advanta365 is a document toolkit, not an analytics platform.** Remove every claim of
   "adoption analytics", "governance guardrails", "platform", "week to week" measurement.
   Replace with the facts below.
3. `opengraph-image.tsx`, `layout.tsx` metadata, JSON-LD, and `pages.*.description` must
   match the corrected facts.

### Advanta365 facts (sourced from advanta365.com, 2026-10-13)

- A product of Echofive. "The change management and user adoption toolkit behind real
  SharePoint Online rollouts." Ready to use as is or tailor with AI.
- Built by a Prosci-certified practitioner. Field-tested over 30+ years. Refined across
  decades of real rollouts.
- Contents: **59 playbooks** covering all seven phases; **130 ready-to-use templates**
  (emails, plans, checklists, worksheets, workshop kits); **4 field guides** for change
  practitioners and IM partners; training for three audiences (End users, Site Owners,
  IM Representatives) with facilitator guides, learning guides, and **58 job aids**;
  a complete worked example: a full change management strategy for a 10,000-person
  organization; Copilot-ready guides for readiness, rollout, and impact assessment for
  Microsoft 365 Copilot.
- Formats: DOCX, PPTX, XLSX, PDF.
- Seven phases: Make the case, Plan, Design, Prepare, Communicate, Execute, Sustain.
- Six free samples: Executive Sponsor Kickoff Deck (PPTX, 16 slides); Change Management
  Strategy (DOCX); SharePoint Governance Framework (DOCX); SharePoint End-User Training
  Deck (PPTX, a 60-minute instructor-led session); Master Communications Plan (XLSX);
  Go/No-Go Decision Checklist (XLSX).
- Do not publish the price on the site.
- Links: purchase `https://www.advanta365.com/purchase`; free samples
  `https://www.advanta365.com/catalog?free=1`; contact `hello@advanta365.com`.
- Disclaimer: Advanta365 and Echofive are independent and not affiliated with or endorsed
  by Prosci Inc. or Microsoft Corporation.

## Visual identity

### Color tokens (Tailwind v4 `@theme` in `app/globals.css`)

| Token | Hex | Role |
| --- | --- | --- |
| `spruce` | `#0F2B26` | Dark ground: hero, product band, CTA band, footer |
| `spruce-2` | `#173832` | Raised surface on dark |
| `paper` | `#F6F8F7` | Base light ground |
| `paper-2` | `#EAF0EE` | Alternate light band |
| `card` | `#FFFFFF` | Cards on light |
| `ink` | `#0E1A17` | Primary text on light |
| `ink-2` | `#3E4D49` | Body text on light |
| `ink-3` | `#5A6864` | Muted text on light |
| `line` | derive (e.g. ink at ~12% alpha) | Hairlines, card borders |
| `citron` | `#D9F26B` | Accent on DARK grounds only: primary CTA fill, highlights, data marks |
| `moss` | `#3D6B1F` | Accent on LIGHT grounds: links, primary CTA fill (white text), markers |
| `moss-d` | `#2F5418` | Hover state of moss |
| `on-dark` | `#F6F8F7` | Text on spruce |
| `on-dark-2` | `#B9C7C2` | Secondary text on spruce |

Measured contrast: ink/paper 16.7, ink-2/paper 8.3, ink-3/paper 5.5, ink-3/paper-2 5.1,
moss/paper 5.9, white/moss 6.3, citron/spruce 12.1, spruce text on citron 12.1,
on-dark-2/spruce 8.6, on-dark-2/spruce-2 7.3.
**Citron on any light ground is 1.17:1 and is forbidden** (text, borders, or icons that
carry meaning).

### Typography

- Headings: **Instrument Sans** (`next/font/google`, weights 500 to 700), tight tracking
  (-0.02em to -0.035em on display sizes).
- Text: **Geist** (`next/font/google`, 400 to 600).
- Fluid `clamp()` scale: display (home hero, floor ~2.25rem so it never clips at 360px),
  h1, h2, h3, lead, body, small. Sentence case. `text-wrap: balance` on headings,
  `pretty` on paragraphs.

### Shape, depth, texture

- Radius: 10px controls, 16px cards, 24px large panels. Pill only for small badges.
- Cards: white on paper with 1px `line` border and a soft, low shadow; on dark, `spruce-2`
  with a subtle light border. Hover: lift 2px + shadow increase (links only).
- Texture on dark grounds: a very subtle radial glow of citron at low opacity and/or a fine
  dot grid in SVG/CSS. Keep it quiet. No purple, no neon, no glassmorphism blur stacks.

### Motion (CSS + a tiny IntersectionObserver hook, no libraries)

- Reveal: fade + 12px rise, 500ms, ease-out, staggered 60ms in lists. Opt-in via a
  `data-reveal` attribute and a `.js` class on `<html>` set by an inline script; without JS
  everything is visible.
- Hero illustration: the adoption curve draws in (SVG stroke-dashoffset) once on load.
- Marquee of client names: slow CSS translate loop, pauses on hover/focus, static wrapped
  list under reduced motion.
- Buttons: 150ms color/translate; arrow nudges 2px on hover.
- All disabled under `prefers-reduced-motion`.

## Shared components (built in the Foundation phase)

Location `components/ui/` (primitives) and `components/site/` (chrome). Page agents
consume these and do not edit them.

- `Button` (variants: primary, secondary, ghost; `tone` light|dark selects moss vs citron;
  renders `Link` or `<a>`; optional trailing arrow).
- `Container`, `Section` (props: `tone: "light" | "alt" | "dark"`, `id`, spacing preset),
  `SectionHeading` (title, optional lead, alignment).
- `Card` (optional `href` makes the whole card a link with proper focus ring).
- `Stat` (value, label; used for 30+ / 59 / 130 etc.).
- `Badge` (small pill, e.g. file formats DOCX/PPTX).
- `Reveal` (wrapper applying `data-reveal`; server component friendly) and the
  `RevealObserver` client component mounted once in the layout.
- `Accordion` (native `<details>`/`<summary>` styled; no JS required).
- Illustrations in `components/illustrations/` (decorative, `aria-hidden`, inline SVG,
  use `currentColor` + CSS vars so they work on dark and light):
  - `AdoptionCurve`: a rising curve with five ADKAR waypoints labelled A, D, K, A, R.
  - `AdkarPath`: horizontal five-step path used by the Approach stepper.
  - `ToolkitStack`: stylised stack of document files with DOCX/PPTX/XLSX/PDF tabs.
  - `PhaseTrack`: seven numbered nodes on a line (Advanta365 phases).
- `icons.tsx`: small set of hand-drawn inline SVG icons as needed (arrow, check, menu,
  close, play, external, mail, shield, certificate, file). No icon library.
- Chrome:
  - `Header`: sticky, translucent paper with border on scroll; logo wordmark "Echofive"
    plus a small SVG mark; nav (Services, Approach, Advanta365, About); "Start a
    conversation" primary button always visible on desktop. Mobile: full-screen drawer,
    focus trap, Escape closes, body scroll lock, 44px targets.
  - `MobileCtaBar`: fixed bottom bar on <900px after the user scrolls past the hero, with
    "Start a conversation". Hidden on `/contact`. Respects safe-area inset. Must not cover
    the footer's last content (add bottom padding to body on mobile).
  - `CtaBand`: dark spruce closing band with headline, body, primary + email secondary.
  - `Footer`: dark; wordmark, short description, page links, contact, Advanta365 link,
    trademark disclaimer, copyright.
  - `PageHero`: inner-page header (title, lead, optional actions and visual slot).

## Pages

Each page ends with `CtaBand` except Contact. Each page sets metadata via `lib/metadata.ts`.

### Home (`app/page.tsx`)
1. **Hero (dark)**: small context line, display headline "Change that lands. Tools that get
   used.", sub, primary "Start a conversation" + secondary "How we work". Right side (or
   below on mobile): `AdoptionCurve` illustration in a framed panel.
2. **Proof strip**: four stats/badges: 30+ years, Secret Level II cleared, Prosci ADKAR
   certified, Microsoft 365 certified.
3. **Client marquee**: "Trusted by teams across government and enterprise" + the client
   short names (full name as `title`/sr text), grouped visually is optional.
4. **Why rollouts stall (light)**: heading + body + three failure cards + closing line.
5. **Services (alt)**: six service cards with the tag as a badge; link to /services.
6. **ADKAR teaser (light)**: compact five-step `AdkarPath` with names; link to /approach.
7. **Advanta365 band (dark)**: "The toolkit behind real rollouts", key counts (59 / 130 /
   4 / 58), `ToolkitStack` visual, primary "Explore Advanta365" (to /product) + secondary
   "See free samples" (external).
8. **Conference talk (light)**: click-to-load YouTube (keep the lite-embed behaviour from
   current `Talk.tsx`: no YouTube request until click).
9. `CtaBand`.

### Services (`app/services/page.tsx`)
`PageHero` + platform badges (SharePoint Online, Teams, Copilot, OneDrive, Purview); jump
links; six detailed service sections (alternating layout on desktop, with a small icon and
the tag); a short "Pair it with Advanta365" card linking to /product; `CtaBand`.

### Approach (`app/approach/page.tsx`)
`PageHero`; "Why rollouts stall" with three failures; **interactive ADKAR stepper**:
a tablist (ARIA tabs pattern, arrow-key navigation) of the five stages with panel text.
Without JS, all five stages render as a visible list. Then "How an engagement runs" built
only from existing service copy (strategy, communications, training, reinforcement); the
conference talk; `CtaBand`.

### Advanta365 (`app/product/page.tsx`)
SaaS-style product page using only the Advanta365 facts:
1. Hero (dark): name, one-line description, "Get the toolkit" (purchase
   URL, external) + "See the free samples" (external), `ToolkitStack`.
2. Counts row: 59 playbooks, 130 templates, 4 field guides, 58 job aids.
3. What's inside: cards for playbooks, templates, field guides, training (three
   audiences), worked example (10,000-person org), Copilot-ready guides.
4. Seven phases: `PhaseTrack` + phase names.
5. Free samples: six cards with format badge and detail.
6. Formats row: DOCX / PPTX / XLSX / PDF badges.
7. Purchase card: one purchase, bullet list of contents, CTA.
8. Relationship note: "Echofive uses Advanta365 inside our engagements" + independence
   disclaimer; secondary CTA to Echofive contact.

### About (`app/about/page.tsx`)
`PageHero` with "Thirty years. One job. Done properly."; firm story (about.body); founder
card (monogram "MA" in a designed tile with a slot for a future photo, name, role, bio,
credentials); credentials as cards with issuer; client roster grouped in three sector
columns with full names; `CtaBand`.

### Contact (`app/contact/page.tsx`)
Two-column on desktop: left = heading, lead, "What happens next" three steps (1: you send
a note, 2: the founder replies directly, 3: a first conversation about your rollout; the
wording must reuse existing claims only: "Your message goes straight to Mark Abdelnour,
the founder." and "we will tell you plainly whether we can help"), direct email, compact
credentials list. Right = restyled `ContactForm` card. Keep all form states (idle,
submitting, success, error with mailto fallback) and field validation messages.

### Also restyle
`not-found.tsx`, `error.tsx`, `opengraph-image.tsx` (new palette + corrected facts),
`public/favicon.svg` (new mark in spruce/citron).

## Docs to update

Rewrite `DESIGN.md` for the new system and update `PRODUCT.md` (aesthetic direction, add
"Midnight & Vermilion" to the anti-reference list, Advanta365 facts, 30+ years), and
`docs/CONTENT.md` / `README.md` where they describe structure or fonts.

## Verification

- `npm run lint`, `npm run typecheck`, `npm run build` all pass.
- Playwright screenshots of every route at 390 and 1440 reviewed for overflow, clipping,
  broken layout, and contrast.
- Keyboard pass: skip link, nav drawer, ADKAR tabs, form, video button.
- Grep for "20+", "twenty", "analytics", "guardrails", "platform" (in Advanta context) and
  em dashes returns nothing user-visible.
