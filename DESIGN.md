# Echofive Solutions: Design System ("Spruce & Citron")

The implementation reference. Tokens live in the `@theme` blocks of `app/globals.css`;
shared components live in `components/ui/`, `components/illustrations/`, and
`components/site/`. This document explains the intent behind them.

Premium and confident, built for risk-averse, procurement-literate public-sector buyers.
Deep spruce grounds carry weight; cool paper carries reading. One accent per ground:
citron on dark, moss on light.

## Color

| Token | Hex | Role |
| --- | --- | --- |
| `spruce` | `#0F2B26` | Dark ground: hero, product band, CTA band, footer |
| `spruce-2` | `#173832` | Raised surface on dark (cards, panels) |
| `paper` | `#F6F8F7` | Base light ground |
| `paper-2` | `#EAF0EE` | Alternate light band |
| `card` | `#FFFFFF` | Cards on light |
| `ink` / `ink-2` / `ink-3` | `#0E1A17` / `#3E4D49` / `#5A6864` | Primary / body / muted text on light |
| `line`, `line-strong` | ink at 12% / 24% | Hairlines, card borders, secondary button borders |
| `line-dark`, `line-dark-strong` | paper at 14% / 32% | The same on dark grounds |
| `citron` | `#D9F26B` | Accent on **dark grounds only**: primary CTA fill, highlights, data marks |
| `moss` / `moss-d` | `#3D6B1F` / `#2F5418` | Accent on light grounds: links, primary CTA fill (white text); hover |
| `on-dark` / `on-dark-2` | `#F6F8F7` / `#B9C7C2` | Text on spruce |
| `danger` | `#A3261B` | Form errors |

Measured contrast: ink/paper 16.7, ink-2/paper 8.3, ink-3/paper 5.5, ink-3/paper-2 5.1,
moss/paper 5.9, white/moss 6.3, citron/spruce 12.1, spruce text on citron 12.1,
on-dark-2/spruce 8.6, on-dark-2/spruce-2 7.3.

**Citron on any light ground is 1.17:1 and is forbidden** for text, borders, or icons
that carry meaning. The surface tokens below make this automatic.

### Surface tokens (use these in components)

Every ground sets a small set of CSS variables, exposed as Tailwind colors, so the same
markup works on light and dark sections:

| Utility | Light ground | Dark ground |
| --- | --- | --- |
| `text-fg` | ink | on-dark |
| `text-fg-2` | ink-2 | on-dark-2 |
| `text-fg-3` | ink-3 | on-dark-2 |
| `text-accent`, `bg-accent`, `border-accent` | moss | citron |
| `text-on-accent` | white | spruce |
| `border-edge`, `border-edge-strong` | line, line-strong | line-dark, line-dark-strong |
| `bg-raised` | card (white) | spruce-2 |

Grounds are set with `.surface-light`, `.surface-alt`, and `.surface-dark` (the
`Section` component's `tone` prop). `data-tone="light" | "dark"` sets only the variables,
which is how `Button`'s `tone` prop forces a look.

## Typography

- **Headings:** Instrument Sans 500 to 700 (`font-display`), tight tracking
  (-0.015em to -0.035em on display sizes). Sentence case. `text-wrap: balance`.
- **Text:** Geist 400 to 600 (`font-sans`, the default). `text-wrap: pretty`.
- Fluid scale as Tailwind text utilities (each sets size, line height, tracking, and for
  headings weight): `text-display` (home hero, floor 2.25rem), `text-h1`, `text-h2`,
  `text-h3`, `text-lead`, `text-body`, `text-small`, `text-label`.
- One `h1` per page. Heading elements get the display family from base styles; add
  `font-display` when a non-heading element should use it (stat values).

## Shape, depth, texture

- Radius: `rounded-control` 10px (buttons, inputs), `rounded-card` 16px, `rounded-panel`
  24px. Pills (`rounded-full`) only for small badges.
- Cards: white on paper with a 1px `edge` border and a soft low shadow; on dark,
  `spruce-2` with a subtle light border and no shadow. Linked cards lift 2px on hover.
- `.texture` on dark grounds: a fine dot grid plus a low citron glow, top right. Quiet.
  No purple, no neon, no glassmorphism stacks (the sticky header's single translucent
  blur is the exception).

## Layout

- `Container`: max 76rem (`max-w-site`), gutter 16px on phones, 24px from 640px, 32px
  from 1024px.
- `Section` spacing presets: `sm` 48/64px, `md` 64/96px, `lg` 80/128px (mobile/desktop).
- Breakpoints: Tailwind defaults (`sm` 640, `md` 768, `lg` 1024, `xl` 1280). The header
  and mobile CTA bar switch at **900px** (`min-[900px]:` in markup, media queries in CSS).
- No horizontal overflow at 360px. Long words (email addresses) use `break-all` or
  `overflow-wrap: anywhere`.

## Motion

- **Reveal:** fade plus 12px rise, 500ms ease-out, 60ms stagger (`<Reveal index={i}>`).
  Visible by default. An inline script in `<head>` adds `html.js`; only then, and only
  without `prefers-reduced-motion`, do `[data-reveal]` elements start hidden.
  `RevealObserver` marks them `data-revealed` as they scroll in. If the app bundle never
  boots, the script removes `js` after 3 seconds so nothing stays hidden. Never wrap
  above-the-fold content (heroes) in `Reveal`.
- **Adoption curve:** the line draws in once on load (`stroke-dashoffset`), waypoints pop
  in after it.
- **Marquee:** slow CSS loop; pauses on hover, focus, and via its own Pause toggle (a
  CSS-only checkbox). Under reduced motion it is a static, wrapped list.
- **Buttons:** 150ms color changes; trailing arrows nudge 2px on hover.
- `prefers-reduced-motion: reduce` disables all of the above.

## Components

| Component | Path | Notes |
| --- | --- | --- |
| `Button` | `components/ui/Button` | `variant` primary/secondary/ghost, `tone`, `size`, `arrow`, `external`; Link, `<a>`, or `<button>` |
| `Container`, `Section`, `SectionHeading` | `components/ui/` | Layout and section titles |
| `Card`, `Stat`, `Badge` | `components/ui/` | Surface-aware |
| `Reveal`, `RevealObserver` | `components/ui/` | Scroll reveal |
| `Accordion`, `AccordionItem` | `components/ui/Accordion` | Native `<details>` |
| `Marquee` | `components/ui/Marquee` | Client name loop |
| `icons` | `components/ui/icons` | Hand-drawn 24px stroke icons, `Icon name="..."` |
| `AdoptionCurve`, `AdkarPath`, `ToolkitStack`, `PhaseTrack` | `components/illustrations/` | Decorative SVG (PhaseTrack is a real list) |
| `Header`, `MobileCtaBar`, `CtaBand`, `Footer`, `PageHero`, `Logo`, `Talk` | `components/site/` | Site chrome |

## Accessibility

WCAG 2.1 AA minimum. Focus rings are 2px, offset 3px, moss on light and citron on dark
(`--focus`). Tap targets are at least 44px. Decorative SVG is `aria-hidden`. The mobile
menu is a modal dialog: focus moves in, Tab is trapped, the page behind is inert and does
not scroll, Escape closes, focus returns to the toggle. Without JS the Menu control is a
link to the footer navigation.

## Cascade note

Component classes in `globals.css` sit in `@layer components`, below Tailwind utilities,
so a utility in markup (`hidden`, `w-full`, `min-[900px]:inline-flex`) always wins over a
component class. Where display depends on JS state (menu toggle, drawer, mobile CTA bar)
the rules live in the CSS instead.

## Avoided on purpose

Testimonials, outcome percentages, client logos, and anything else without a source.
Purple gradients, neon glow, stacked blur panels, identical icon-card walls without
content, and uppercase letter-spaced kicker labels. Copy avoids em dashes and "X, not Y"
constructions.
