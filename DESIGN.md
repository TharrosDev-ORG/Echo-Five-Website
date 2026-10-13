# Echofive Solutions: Design System ("Signal")

The implementation reference. Tokens live in the `@theme` blocks of `app/globals.css`;
shared components live in `components/ui/`, `components/illustrations/`, and
`components/site/`. This document explains the intent behind them.

Premium and confident, built for risk-averse, procurement-literate public-sector buyers.
Black and white grounds carry weight and reading. One saturated blue marks actions, key
data, and the signal line: a thin blue line, drawn from the Echofive name, that starts as
the adoption curve and travels down every page, becoming each page's key diagram. Giant
typographic numerals carry the proof.

## Color

| Token | Hex | Role |
| --- | --- | --- |
| `black` | `#0A0A0B` | Dark grounds: home hero, Advanta365 hero and band, ADKAR band, footer, drawer |
| `black-2` | `#141416` | Raised surface on dark (cards, panels) |
| `white` | `#FFFFFF` | Base reading ground |
| `mist` | `#F4F4F5` | Alternate light band |
| `ink` / `ink-2` / `ink-3` | `#0A0A0B` / `#3F3F46` / `#52525B` | Primary / body / muted text on light |
| `line`, `line-strong` | ink at 10% / 22% | Hairlines and borders on light |
| `line-dark`, `line-dark-strong` | white at 12% / 28% | The same on dark grounds |
| `line-input` | `#71717A` | Empty form field outline (4.8:1 on white) |
| `blue` | `#2F5BFF` | Signal line, primary button fill, links and markers on light, the CTA band ground |
| `blue-d` | `#1F45E6` | Hover and pressed fill; the raised surface and text color on the blue band |
| `blue-l` | `#6E8CFF` | Blue text and small marks on dark |
| `on-dark` / `on-dark-2` | `#FFFFFF` / `#A1A1AA` | Text on black |
| `danger` | `#B42318` | Form errors |

Measured contrast (WCAG 2.1): ink/white 19.8, ink-2/white 10.4, ink-3/white 7.7,
ink-3/mist 7.0, blue/white 5.17, white on blue 5.17, blue-d/white 6.88, blue/mist 4.70,
blue-l/black 6.46, blue-l/black-2 6.0, on-dark-2/black 7.72, on-dark-2/black-2 7.2,
line-input/white 4.8, danger/white 6.6, white on blue-d 6.88.

**`#2F5BFF` on black is 3.83:1.** On dark grounds it may be used only for lines, fills,
focus rings, and large text (24px and up, or 18.66px and up at 700). Small blue text on
dark uses `blue-l`. The surface tokens make this automatic.

### Surface tokens (use these in components)

Every ground sets a small set of CSS variables, exposed as Tailwind colors, so the same
markup works on light, dark, and blue sections:

| Utility | Light / alt | Dark | Blue |
| --- | --- | --- | --- |
| `text-fg` | ink | on-dark | white |
| `text-fg-2` | ink-2 | on-dark-2 | white |
| `text-fg-3` | ink-3 | on-dark-2 | white |
| `text-accent` (blue text) | blue | blue-l | white |
| `bg-accent-fill` (buttons, the line) | blue | blue | white |
| `bg-accent-hover` | blue-d | blue-d | `#EEF2FF` |
| `text-on-accent` | white | white | blue-d |
| `border-edge`, `border-edge-strong` | line, line-strong | line-dark, line-dark-strong | white at 24% / 50% |
| `bg-raised` | white | black-2 | blue-d |
| `--focus` (outline color) | blue | blue-l | white |

Grounds are set with `.surface-light`, `.surface-alt`, `.surface-dark`, and
`.surface-blue` (the `Section` component's `tone` prop). `data-tone="light" | "dark" |
"blue"` sets only the variables, which is how `Button`'s `tone` prop forces a look.

**Blue band text is solid white or `blue-d` on white, never translucent.** White at 85%
on blue is 4.18:1 and fails AA, so `--fg-2` and `--fg-3` are plain white there.

## Typography

- **Headings:** Bricolage Grotesque (OFL), variable, weights 500 to 800 (`font-display`),
  self-hosted at `app/fonts/BricolageGrotesque-Variable-latin.woff2`. Tight tracking on
  display sizes. Sentence case. `text-wrap: balance`.
- **Text:** Geist 400 to 600 (`font-sans`, the default). `text-wrap: pretty`.
- Fluid scale as Tailwind text utilities (each sets size, line height, tracking, and for
  headings weight):

| Utility | Size | Line height | Tracking | Weight |
| --- | --- | --- | --- | --- |
| `text-mega` (giant numerals, home headline) | `clamp(3rem, 0.9rem + 9vw, 10rem)` | 0.9 | -0.05em | 700 |
| `text-display` | `clamp(2.5rem, 1rem + 6vw, 6.5rem)` | 0.95 | -0.045em | 700 |
| `text-h1` | `clamp(2.25rem, 1.2rem + 4vw, 4.5rem)` | 1.0 | -0.04em | 700 |
| `text-h2` | `clamp(1.75rem, 1.2rem + 2.2vw, 3rem)` | 1.05 | -0.03em | 650 |
| `text-h3` | `clamp(1.1875rem, 1.1rem + 0.35vw, 1.375rem)` | 1.3 | -0.015em | 600 |

  `text-lead`, `text-body` (17px), `text-small` (15px), and `text-label` (13px) complete
  the scale.
- One `h1` per page. Heading elements get the display family from base styles; add
  `font-display` when a non-heading element should use it (stat values, the 404 numeral).
- Numerals that sit in a row use `tabular-nums`.

### Fitting giant type

Giant type must wrap or fit, never clip, down to a 360px phone. The `text-mega` floor
is 3rem; below that a headline breaks onto more lines instead of shrinking. Three
unlayered helpers in `globals.css` (unlayered so they win over the `text-mega` size
utility) size the type to its column:

- `.hero-mega`: the home headline, `clamp(3rem, min(0.9rem + 9vw, 100cqi / 8.6), 10rem)`.
  "Tools that get used." is about 8.45em wide, so it holds one line wherever the
  container allows and breaks to more lines at the floor.
- `.mega-fit`: makes a grid cell a query container. Its `.stat-mega` child is sized
  `min(clamp(3rem, 0.9rem + 9vw, 10rem), 100cqi / var(--fit))`, where `--fit` is the
  widest mark's width in em (for example `[--fit:3.6]` for "ADKAR"). The cap wraps the
  whole clamp, so it still wins in a cell narrower than the 3rem floor allows.
- `.footer-wordmark`: `min(23.5vw, 18.5rem)`. "Echofive" is about 3.7em wide, so
  23.5vw fits the container up to 1024px and the 18.5rem cap fits it from there.
- `.mega-404`: `clamp(7rem, 30vw, 18rem)`, larger than `text-mega` so the 404 numeral
  reads as the page's picture.

## Shape and depth

- Radius: `rounded-control` 4px (buttons, inputs), `rounded-card` 8px, `rounded-panel`
  0px (full-bleed panels). Pills (`rounded-full`) only for small badges and index tags.
- No drop shadows. Depth comes from black and white blocks and 1px edges.
- No gradients, glows, dot textures, or blur, with two exceptions: the sticky header and
  the mobile CTA bar each use one translucent backdrop blur, and the primary button's
  hover fill is a two-layer gradient used only to sweep the hover color in.
- Linked cards and rows do not lift. Hover is a color change.

## Layout

- `Container`: max 76rem (`max-w-site`), gutter 16px on phones, 24px from 640px, 32px
  from 1024px.
- `Section` spacing presets: `sm` 48/64px, `md` 64/96px, `lg` 80/128px (mobile/desktop).
- Breakpoints: Tailwind defaults (`sm` 640, `md` 768, `lg` 1024, `xl` 1280). The header
  and mobile CTA bar switch at **900px** (`min-[900px]:` in markup, media queries in CSS).
  The signal rail switches at **1024px**.
- No horizontal overflow at 360, 390, 768, 1024, or 1440. Long words (email addresses)
  use `break-all` or `overflow-wrap: anywhere`.

### The signal line and rail geometry

From 1024px, `SignalRail` draws a 1px vertical line in the left gutter, with a 9px ring
node (3px filled center) on the section heading. Below 1024px the rail is hidden and
each `SectionHeading` carries a 40px horizontal blue stroke above its title instead.

- The rail is a direct child of a full-width positioned element (`Section`, `PageHero`),
  so consecutive rails align into one column. Its x position is
  `--rail-x: max(1rem, calc((100% - var(--container-site)) / 2 - 2.5rem))`. The percentage
  resolves against the full-width section, so it tracks the `Container` with no `100vw`
  (which includes the scrollbar in some browsers). At 1440 the line sits 72px from the
  edge, 72px left of the content; at 1024 it clamps to 16px.
- The node's y position is `--rail-node-y`, set per spacing preset to the desktop top
  padding plus 0.75rem (`sm` 4.75rem, `md` 6.75rem, `lg` 8.75rem), so it lands on the
  heading's first line. `PageHero` sets its own (4.75rem for the home opener, 6.75rem
  for inner heroes).
- `Section` and `PageHero` isolate their stacking context, and the rail sits at
  `z-index: -1` inside it, so it stays above its own ground but behind in-flow content
  such as the full-bleed marquee.
- **Hand-off.** Where a diagram carries the line, the rail stops above it (`rail={false}`):
  the home hero (the full-width `AdoptionCurve` is the line), home `#process`
  (`AdkarPath`), `/approach` `#adkar` (the stepper's path), and `/product` `#phases`
  (`PhaseTrack`). The `blue` CTA band has no rail either. Everything else gets one.

## Motion

CSS only, all progressive enhancement. The default CSS state is the final state; motion
runs only under `html.js` and `@media (prefers-reduced-motion: no-preference)`.

- **Reveal:** fade plus 16px rise, 600ms `--ease-out-soft`, 60ms stagger
  (`<Reveal index={i}>`). An inline script in `<head>` adds `html.js`; only then do
  `[data-reveal]` elements start hidden. `RevealObserver` marks them `data-revealed` as
  they scroll in. If the app bundle never boots, the script removes `js` after 3 seconds
  so nothing stays hidden. Never wrap above-the-fold content (heroes) in `Reveal`.
- **Home headline:** each line (`.hero-line`) rises from a clip mask once on load (600ms,
  80ms stagger). This is the one above-the-fold animation; it is visible within 1s with
  no layout shift.
- **Giant numerals:** `.stat-mega` and `.mega-rise` rise out of a clip mask as their
  `Reveal` enters. No counting animation. The resting `clip-path` inset is negative so
  descenders and overhangs are never cut.
- **Adoption curve and diagrams:** the home hero curve draws once on load
  (`stroke-dashoffset`), waypoints pop in after it. `AdkarPath` and `PhaseTrack` draw when
  their `Reveal` enters, so no new script is needed. `PhaseTrack`'s connector draws down
  on phones and across from 768px.
- **Rail draw-in:** `scaleY(0 -> 1)` from the top, driven by `animation-timeline: view()`
  with `animation-range: entry 0% cover 50%`, inside `@supports (animation-timeline:
  view())` and `no-preference` and `html.js`. Everywhere else (Firefox, no JS, reduced
  motion) the line is static and fully drawn.
- **Buttons:** the primary hover fill sweeps in from the left (`background-size`
  transition, 200ms); the trailing arrow nudges 3px.
- **Links:** the `.link` underline is a gradient that thickens from 1px to 2px (200ms).
- **Index rows:** on hover and `focus-visible` the row floods with `--accent-fill`, text
  switches to `--on-accent`, and the arrow slides in (200ms). Touch devices keep the arrow
  visible at rest.
- **Marquee:** slow CSS loop; pauses on hover, focus, and via its own Pause toggle (a
  CSS-only checkbox). Under reduced motion it is a static, wrapped list.
- `prefers-reduced-motion: reduce` disables all of the above. Not used: custom cursor,
  smooth-scroll hijack, page transitions, WebGL, parallax.

## Components

| Component | Path | Notes |
| --- | --- | --- |
| `Button` | `components/ui/Button` | `variant` primary/secondary/ghost, `tone`, `size`, `arrow`, `external`; Link, `<a>`, or `<button>`. On the blue band primary is white with blue-d text |
| `Container`, `Section`, `SectionHeading` | `components/ui/` | Layout and section titles. `Section` takes `tone` (`light`, `alt`, `dark`, `blue`), `spacing`, `bleed`, and `rail`. `SectionHeading` takes an optional decorative `index` ("01") and `stroke` |
| `SignalRail` | `components/ui/SignalRail` | `aria-hidden` line plus node in the left gutter; rendered by `Section` and `PageHero`, never used directly in pages |
| `IndexList` | `components/ui/IndexList` | Numbered full-width rows (`IndexItem`: `href`, `index`, `title`, `body`, `tag`, `external`). The whole row is the link, bordered top and bottom with `edge`. Used for the home services, the Advanta365 free samples, and the About credentials. The Services jump list and Approach engagement steps are plain ruled lists in the same style |
| `Card`, `Stat`, `Badge` | `components/ui/` | Surface-aware. `Card` is 8px radius with a 1px edge and no shadow. `Stat` has `size="mega"` for giant numerals |
| `Reveal`, `RevealObserver` | `components/ui/` | Scroll reveal |
| `Accordion`, `AccordionItem` | `components/ui/Accordion` | Native `<details>` |
| `Marquee` | `components/ui/Marquee` | Client name loop in `text-h2` weight 600, names separated by a small blue node |
| `icons` | `components/ui/icons` | Hand-drawn 24px stroke icons, `Icon name="..."` |
| `AdoptionCurve`, `AdkarPath`, `ToolkitStack`, `PhaseTrack` | `components/illustrations/` | Decorative SVG (PhaseTrack is a real list) |
| `Header`, `MobileCtaBar`, `CtaBand`, `Footer`, `PageHero`, `Logo`, `Talk` | `components/site/` | Site chrome |

Notes on the chrome:

- **Brand mark:** five stacked horizontal bars of decreasing length (an echo fading out),
  in `--accent-fill`, used in `Logo`, `public/favicon.svg`, and the OG image. Wordmark
  "Echofive" in Bricolage 700.
- **Header:** white with a bottom hairline once scrolled. Over a black page hero (`/` and
  `/product`) it is solid black and takes the dark ground's tokens. That state is pure
  CSS, keyed on the server-rendered `[data-hero-tone="dark"]` on the page hero
  (`body:has(...) .site-header:not([data-past-hero])`), so it is correct on first paint
  and without JS. `Header.tsx` only sets `data-past-hero` once the hero has scrolled out
  from under it, and re-reads the hero on every route change. It is solid rather than
  translucent so no grey flashes while white page ground is behind it.
- **Mobile drawer:** full-screen black, links in `text-display`, current page in `blue-l`.
- **`MobileCtaBar`:** near-black bar with a blue primary button, below 900px.
- **`CtaBand`:** `.surface-blue`, `text-display` heading, white primary button and a white
  outline secondary.
- **`Footer`:** black; the oversized "Echofive" wordmark (`.footer-wordmark`, decorative,
  `aria-hidden`) runs across the bottom, then link columns, trademarks, disclaimer, and
  copyright.
- **`PageHero`:** `tone` light (inner pages) or dark (home, Advanta365); `size` page,
  display, or mega (the home opener, with `.hero-mega`).
- **Error pages:** `not-found.tsx` shows the `.mega-404` numeral in the accent color.
  `error.tsx` uses a broken-line motif: a signal line with a gap, where the line breaks and
  picks up again.
- **Contact:** the page uses `Section` like any other; the form sits on a mist panel, with
  4px inputs, `line-input` outlines, and a blue focus ring.

## Accessibility

WCAG 2.1 AA minimum. Focus rings are 2px, offset 3px, in `--focus`: blue on light,
`blue-l` on dark, white on blue. Index rows flood with `--accent-fill` on focus, so their
ring switches to `--on-accent` and sits inside the row (offset -4px). Form fields add a
3px blue halo on focus. Tap targets are at least 44px. Decorative SVG, the rail, section
numbers, and the footer wordmark are `aria-hidden`. The skip link is the first Tab stop on
every page. The mobile menu is a modal dialog: focus moves in, Tab is trapped, the page
behind is inert and does not scroll, Escape closes, focus returns to the toggle. Without
JS the Menu control is a link to the footer navigation. Every page is fully readable
without JS and under reduced motion, with the rail fully drawn.

## Cascade note

Component classes in `globals.css` sit in `@layer components`, below Tailwind utilities,
so a utility in markup (`hidden`, `w-full`, `min-[900px]:inline-flex`) always wins over a
component class. Where display depends on JS state (menu toggle, drawer, mobile CTA bar)
the rules live in the CSS instead. The fitting helpers (`.hero-mega`, `.mega-fit`,
`.footer-wordmark`, `.mega-404`) are deliberately unlayered, so they win over the
`text-mega` size utility on the same element.

## Avoided on purpose

Testimonials, outcome percentages, client logos, and anything else without a source.
Purple gradients, neon glow, stacked blur panels, drop shadows, dot textures,
identical icon-card walls without content, and uppercase letter-spaced kicker labels. Navy
or government-blue grounds (our dark is black). WebGL, pinned scroll scenes, and scroll
hijacking. Copy avoids em dashes and "X, not Y" constructions.
