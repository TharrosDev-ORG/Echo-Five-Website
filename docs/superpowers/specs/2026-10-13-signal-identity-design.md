# Echofive identity overhaul: "Signal"

Status: approved in conversation 2026-10-13, pending written-spec review. Supersedes the
visual sections of `2026-10-13-site-overhaul-design.md` ("Spruce & Citron"). The content
rules, Advanta365 facts, page inventory, and verification rules of that spec still apply.

## Goal

Raise the site to award-level craft with a black, white, and electric-blue identity,
without hurting what the site exists to do: earn a first meeting with risk-averse,
procurement-literate public-sector buyers.

Agreed constraints:

- **Crafted restraint.** Award-quality typography, layout, and micro-interaction. CSS
  motion only. No new runtime dependencies (no GSAP, Lenis, three.js, Framer Motion).
- **Palette:** black and white grounds, one saturated blue for actions, data, and the
  signal line.
- **Scope:** new identity and re-composed layouts. All copy, routes, the contact API
  (`app/api/contact/route.ts`), and validation (`lib/contact.ts`) stay unchanged.
- **Concept:** the "signal line" motif (from the Echofive name) plus giant typographic
  numerals for proof.

## Non-negotiable rules (carried over)

- No invented facts. Copy stays in `lib/content.ts` / `lib/site.ts`. The only content
  additions allowed are display-only short forms of existing claims (see Proof).
- No em dashes in user-visible copy or metadata. No "X, not Y" constructions.
- WCAG 2.1 AA: contrast (measured below), keyboard access, visible focus, one `h1` per
  page, landmarks, `aria-hidden` on decorative SVG, 44px tap targets.
- Content visible without JavaScript. Every animation is progressive enhancement; the
  default CSS state is fully visible.
- `prefers-reduced-motion: reduce` disables all non-essential motion, including the
  scroll-driven line.
- No horizontal overflow at 360px. Test 360, 390, 768, 1024, 1440.

## Color

Tokens replace the Spruce & Citron palette in `app/globals.css` `@theme`.

| Token | Hex | Role |
| --- | --- | --- |
| `black` | `#0A0A0B` | Dark grounds: home hero, Advanta365 hero and band, footer |
| `black-2` | `#141416` | Raised surface on dark (cards, panels, inputs on dark) |
| `white` | `#FFFFFF` | Base reading ground |
| `mist` | `#F4F4F5` | Alternate light band |
| `ink` | `#0A0A0B` | Primary text on light |
| `ink-2` | `#3F3F46` | Body text on light |
| `ink-3` | `#52525B` | Muted text on light |
| `line` / `line-strong` | ink at 10% / 22% | Hairlines and borders on light |
| `line-dark` / `line-dark-strong` | white at 12% / 28% | Hairlines and borders on dark |
| `line-input` | `#71717A` | Empty input outline (4.8:1 on white) |
| `blue` | `#2F5BFF` | Signal line, primary button fill, links and markers on light |
| `blue-d` | `#1F45E6` | Hover on light |
| `blue-l` | `#6E8CFF` | Blue text and small marks on dark |
| `on-dark` | `#FFFFFF` | Text on black |
| `on-dark-2` | `#A1A1AA` | Secondary text on black |
| `danger` | `#B42318` | Form errors |

Measured contrast (WCAG 2.1): ink/white 19.8, ink-2/white 10.4, ink-3/white 7.7,
blue/white 5.17, white on blue 5.17, blue-d/white 6.88, blue/mist 4.70,
blue-l/black 6.46, black on blue-l 6.46, on-dark-2/black 7.72.

**Rule:** `#2F5BFF` on black is 3.83:1. On dark grounds it may be used only for lines,
fills, focus rings, and large text (24px+ or 19px+ bold). Small blue text on dark uses
`blue-l`. The surface tokens enforce this.

### Surface tokens

Keep the existing mechanism (`.surface-light`, `.surface-alt`, `.surface-dark`,
`data-tone`, and the `fg`, `fg-2`, `fg-3`, `accent`, `on-accent`, `edge`, `raised`
utilities). New values:

| Variable | Light / alt | Dark | Blue (new) |
| --- | --- | --- | --- |
| `--fg` | ink | on-dark | white |
| `--fg-2` | ink-2 | on-dark-2 | white |
| `--fg-3` | ink-3 | on-dark-2 | white |
| `--accent` (text) | blue | blue-l | white |
| `--accent-fill` (buttons, line) | blue | blue | white |
| `--on-accent` | white | white | blue-d |
| `--edge` | line | line-dark | white at 24% |
| `--raised` | white (alt: white on mist) | black-2 | blue-d |
| `--focus` | blue | blue-l | white |

Add `.surface-blue` (ground `blue`) for the CTA band. All text on it is solid white (5.17:1); translucent white fails AA there (85% is 4.18:1).

## Typography

- **Display:** Bricolage Grotesque (OFL), variable, self-hosted at
  `app/fonts/BricolageGrotesque-Variable-latin.woff2` via `next/font/local`, weights
  500 to 800. Source: the `@fontsource-variable/bricolage-grotesque` package files
  (latin subset). Replaces Instrument Sans; delete that file.
- **Text:** Geist (unchanged).
- Display scale gets larger and tighter:
  - `text-mega` (new, giant numerals and the home headline): `clamp(3rem, 0.9rem + 9vw, 10rem)`,
    line height 0.9, tracking -0.05em, weight 700. Floor must not clip "Tools that get
    used." at 360px; break to more lines instead of shrinking below 3rem.
  - `text-display`: `clamp(2.5rem, 1rem + 6vw, 6.5rem)`, line height 0.95, -0.045em, 700.
  - `text-h1`: `clamp(2.25rem, 1.2rem + 4vw, 4.5rem)`, 1.0, -0.04em, 700.
  - `text-h2`: `clamp(1.75rem, 1.2rem + 2.2vw, 3rem)`, 1.05, -0.03em, 650.
  - `text-h3`, `lead`, `body`, `small`, `label`: keep current sizes; h3 weight 600.
- Sentence case. `text-wrap: balance` on headings, `pretty` on paragraphs.
- Numerals use `font-variant-numeric: tabular-nums` where they sit in a row.

## Shape and depth

- Radius: `rounded-control` 4px, `rounded-card` 8px, full-bleed panels 0. Pills only for
  small badges.
- No drop shadows on light grounds. Depth comes from black/white blocks and 1px edges.
- Remove `.texture` (dot grid and glow). No gradients, glows, or blur, except the sticky
  header's single translucent backdrop.
- Linked rows and cards: no lift. Hover is a color change (see Interaction).

## The signal line

One visual idea runs through every page: a thin blue line that starts as the adoption
curve and travels down the site, becoming each page's key diagram.

### Implementation

- New component `components/ui/SignalRail.tsx`: an `aria-hidden` element rendered inside
  `Section` (opt-in prop `rail`, default true for content sections, false for the CTA
  band and footer).
- From 1024px: a 1px vertical line (`--accent-fill`) in the container's left gutter,
  positioned so rails in consecutive sections align into one column. A 9px node (ring
  with filled center) marks the section heading's baseline.
- Below 1024px: no vertical rail. Each section heading gets a 40px horizontal blue
  stroke above it instead.
- Draw-in: `transform: scaleY(0 -> 1)` from the top, driven by
  `animation-timeline: view(); animation-range: entry 0% cover 50%;` inside
  `@supports (animation-timeline: view())` and
  `@media (prefers-reduced-motion: no-preference)`. Outside both, the line is static and
  fully drawn. No JavaScript.
- Hand-off sections: the rail stops above, and the diagram continues the line:
  - Home hero: `AdoptionCurve` redrawn full-bleed along the hero's bottom edge.
  - `AdkarPath` (home teaser and Approach stepper).
  - `PhaseTrack` (Advanta365 seven phases).
  These diagrams draw in with the existing `stroke-dashoffset` technique, triggered by
  the existing `RevealObserver` (`data-revealed`), so no new script.

## Motion (CSS only)

- **Hero headline:** each line rises from a clip mask once on load (600ms,
  `--ease-out-soft`, 80ms stagger). Only under `html.js` and no reduced motion; the
  default state is visible. This is the one exception to "never animate above the fold",
  and it must be visible within 1s with no layout shift.
- **Reveal:** keep the current `Reveal` / `RevealObserver` mechanism; change to 16px rise,
  600ms.
- **Giant numerals:** reveal with a clip-mask rise (no counting animation).
- **Buttons:** primary fills from the left on hover (background-size transition on a
  linear-gradient of `--accent-fill` / `--accent-hover`), arrow nudges 3px. 200ms.
- **Links:** underline draws from left (`background-size` on an underline gradient).
- **Indexed rows:** on hover/focus-visible the row background floods with
  `--accent-fill`, text switches to `--on-accent`, arrow slides in. 200ms.
- Marquee: unchanged behavior, restyled.
- Not included: custom cursor, smooth-scroll hijack, page transitions, WebGL, parallax.

## Shared components

Restyle in place; keep props and APIs so pages change only where layouts change.

- `Button`: primary (blue fill, white text), secondary (1px `edge-strong` outline,
  hover fills `fg`), ghost. On `.surface-blue`, primary is white with blue-d text.
- `Section`: add `tone: "blue"` and the `rail` prop.
- `SectionHeading`: add optional `index` (e.g. "01") rendered in `text-label`,
  tabular, next to the rail node.
- `Card`: 8px radius, 1px edge, no shadow.
- `Stat`: add `size: "mega"` for giant numerals.
- New `IndexList` / `IndexRow` (`components/ui/IndexList.tsx`): full-width rows with
  index number, title, short body, tag, trailing arrow; whole row is the link; bordered
  top and bottom with `edge`. Used by home Services and the Services page jump list.
- `Header`: white with bottom edge on light pages; transparent-to-black over dark heroes
  (keep current scroll-state logic). Wordmark plus new mark (see Brand mark). Desktop CTA
  is a primary Button. Mobile drawer: full-screen black, giant nav links in
  `text-display`, existing focus trap and inert behavior unchanged.
- `MobileCtaBar`: black bar, blue primary button. Behavior unchanged.
- `CtaBand`: `.surface-blue`, heading in `text-display`, white primary + white-outline
  secondary.
- `Footer`: black; oversized "Echofive" wordmark in `text-mega` across the bottom
  (decorative, `aria-hidden`, the real name stays in text); existing link columns,
  trademarks, disclaimer, copyright.
- `PageHero`: white ground (Advanta365 and home: black), eyebrow, `text-h1` title at
  `max-w-[16ch]`, lead, actions; rail node at the title.

### Brand mark

Replace the current SVG mark with five short horizontal bars of decreasing length (an
echo fading out), stacked, in `--accent-fill`. Used in `Logo`, `favicon.svg`, and the OG
image. Wordmark "Echofive" in Bricolage 700.

## Pages

### Home (`app/page.tsx`)

1. **Hero (black, min-height `100svh` minus header on desktop, natural on phones):**
   eyebrow (`hero.context`); headline in `text-mega`, line 1 white, line 2 in `blue-l`
   (6.46:1); `hero.sub`;
   primary and secondary buttons. `AdoptionCurve` spans the full container width along
   the bottom of the hero, ADKAR waypoint letters on it. Below it, `hero.facts` in a
   four-column row (two on phones) separated by `edge` lines.
2. **Proof (white):** four giant entries. Add a display-only `mark` field to each
   `proofStrip` item restating its existing claim: "30+", "II", "ADKAR", "365". Mark in
   `text-mega`, value and label beneath. Asymmetric 12-column placement on desktop,
   2x2 on tablet, stacked on phones.
3. **Clients (white, edge top and bottom):** marquee in `text-h2` weight 600, names
   separated by a small blue node.
4. **Why rollouts stall (mist):** two columns from 1024px; left column heading is
   `position: sticky`; right column holds the three failures as large numbered
   statements (`text-h2` title, body under), then the closing line.
5. **Services (white):** `SectionHeading` + `IndexList` of the six services (01 to 06,
   title, tag, one-line summary). Link to `/services`.
6. **ADKAR teaser (white):** five giant letters (`text-mega`) along `AdkarPath`, stage
   names under; link to `/approach`.
7. **Advanta365 band (black):** heading, provenance lines, the four counts as giant
   numerals in a row, primary "Explore Advanta365" and secondary free samples.
   Keep `ToolkitStack`, restyled to black/white/blue line art.
8. **Talk (white):** keep the click-to-load embed; frame is a 0-radius black panel with
   a blue play button.
9. **CtaBand (blue).**

### Services

`PageHero` with platform badges; sticky jump nav (from 1024px) beside six detailed
service sections, each with `SectionHeading index`; `PairWithAdvanta` as a black panel;
`CtaBand`.

### Approach

`PageHero`; why-rollouts-stall list (same treatment as home, non-sticky); `AdkarStepper`
keeps its ARIA tabs behavior, restyled so the tab row sits on the signal line with giant
active letter; `EngagementSteps` as an `IndexList`-style numbered sequence; talk;
`CtaBand`.

### Advanta365 (`/product`)

Black hero with `ToolkitStack`; counts as giant numerals; contents as
a 3x2 grid of edge-bordered cells (no shadows); `PhaseTrack` as the continuation of the
signal line with seven nodes and names; free samples as an indexed list with format
badges; formats; purchase panel (black); relationship note and
disclaimer; `CtaBand`.

### About

`PageHero` "Thirty years. One job. Done properly."; firm story in a wide two-column
layout; founder card (monogram tile in black with blue mark); credentials as an indexed
list with issuer; client roster in three sector columns; `CtaBand`.

### Contact

Two columns from 1024px: left (white) heading, lead, "What happens next" as three
numbered steps on a short signal line, direct email, credentials; right the form on a
`mist` panel. Inputs: 4px radius, `line-input` outline, blue focus ring. All form states
unchanged.

### Also restyle

`not-found.tsx`, `error.tsx` (giant "404" numeral), `opengraph-image.tsx` (black ground,
white headline, blue mark and line), `public/favicon.svg` (new mark), `viewport.themeColor`
to `#FFFFFF`.

## Docs to update

- `DESIGN.md`: rewrite for "Signal".
- `PRODUCT.md`: aesthetic direction section; move "Spruce & Citron" into the
  anti-reference list as a previous direction (premium but generic; lacked a signature).
  Note in anti-references that this direction must stay distinct from "Bone & Cobalt"
  (no WebGL, no pinned scenes) and from navy or gov-blue looks (black grounds, not navy).
- `README.md`: identity name and fonts.

## Verification

- `npm run lint`, `npm run typecheck`, `npm run build` pass.
- Playwright screenshots of all six routes plus 404 at 360, 390, 768, 1024, 1440;
  reviewed for overflow, clipping, and layout breaks. Specifically check the home
  headline at 360px and the rail alignment between consecutive sections at 1440.
- Screenshots with JS disabled and with `reducedMotion: "reduce"`: all content visible,
  line fully drawn and static.
- Keyboard pass: skip link, header, drawer, ADKAR tabs, index rows, form, video button.
- Grep: no em dashes, no "20+" or "twenty", no Advanta analytics/platform claims, no
  leftover `spruce`, `citron`, `moss`, or `instrument` references.
- Lighthouse (mobile) on home: performance not lower than current `main`;
  accessibility 100.
