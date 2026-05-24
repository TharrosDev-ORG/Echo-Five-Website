---
name: Echo-Five Consulting
description: Govtech-precision marketing site — Swiss grid, black + cool-white, one committed signal-red.
colors:
  paper: "#f8fafd"
  surface: "#fafcfe"
  ink: "#141b26"
  ink-muted: "#575e69"
  signal: "#e23726"
  signal-deep: "#a21c10"
  keyline: "#d8dbe0"
typography:
  display:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.75rem, 8vw, 6rem)"
    fontWeight: 800
    lineHeight: 0.94
    letterSpacing: "-0.02em"
    fontVariation: "'wdth' 125"
  headline:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2rem, 4.5vw, 3.4rem)"
    fontWeight: 700
    lineHeight: 0.98
    letterSpacing: "-0.02em"
    fontVariation: "'wdth' 125"
  title:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.85rem"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.015em"
    fontVariation: "'wdth' 125"
  body:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.125rem, 1.4vw, 1.25rem)"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "Archivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "0.2em"
rounded:
  none: "0"
spacing:
  gutter: "clamp(1.25rem, 4.5vw, 4rem)"
  section: "clamp(5rem, 12vh, 10rem)"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.none}"
    padding: "12px 28px"
  button-primary-hover:
    backgroundColor: "{colors.signal}"
    textColor: "{colors.paper}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    padding: "12px 0"
  input:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "10px 0"
  nav-link:
    backgroundColor: "transparent"
    textColor: "{colors.ink-muted}"
---

# Design System: Echo-Five Consulting

## 1. Overview

**Creative North Star: "The Signal Grid"**

Echo-Five is a one-person public-sector consultancy, and the site has to read like rigor before it reads like marketing. The system borrows the discipline of the Swiss International Typographic Style: a strict, *visible* modular grid carries the structure, big grotesque type carries the hierarchy, and a single committed signal-red carries the voice. The grid is not decoration; it is the argument. A program lead evaluating a vendor on an office laptop should feel measured competence in the first fold, the way a well-set timetable or a government form done right feels trustworthy.

The reference is Müller-Brockmann poster grids, deliberately not GOV.UK-blue cosplay. Color is Committed, not Restrained: vermilion is allowed to take real surface (headline keyword, big numerals, the echo motif) rather than hiding as a 10% garnish. Imagery is fully abstract, a custom propagating-signal SVG on a ruled field, never stock photography or a colored block standing in for a photo.

This system explicitly rejects the aesthetic it replaced: the editorial-serif AI lane. No display serif, no italic flourishes, no tiny uppercase tracked label stacked above every section heading, no beige-and-slate monochrome, no hairline-everywhere timidity.

**Key Characteristics:**
- Strict visible modular grid as the primary structural voice.
- One committed signal-red against cool near-white and near-black.
- Archivo grotesque at expanded width; scale and weight, never serif, carry hierarchy.
- Section identity from grid position, big numerals, and a single red index, never a label kicker.
- Sharp corners (0 radius) everywhere; flat, no shadows.

## 2. Colors

A near-monochrome cool field, black on white, broken by one decisive red. Canonical values are OKLCH; the frontmatter carries sRGB hex equivalents for tooling.

### Primary
- **Signal Vermilion** (`#e23726`, `oklch(0.60 0.21 30)`): the brand's one loud voice. Used at scale only: the highlighted headline line, large section numerals, the echo source node, button hover. Contrast on paper is 4.18:1, sufficient for large and UI text but **never** small text.
- **Deep Signal** (`#a21c10`, `oklch(0.46 0.17 30)`): the red that is allowed on small text and links (7.45:1 on paper). Required-field asterisks, inline links, error copy, the focus ring.

### Neutral
- **Paper** (`#f8fafd`, `oklch(0.985 0.004 255)`): page base, a cool near-white tinted toward the ink hue. Never pure `#fff`.
- **Surface** (`#fafcfe`, `oklch(0.99 0.003 255)`): the contact form and success panel, a half-step lift off paper.
- **Ink** (`#141b26`, `oklch(0.22 0.025 260)`): primary text, primary-button ground, inverted blocks (16.6:1 on paper). Never pure `#000`.
- **Ink Muted** (`#575e69`, `oklch(0.48 0.02 260)`): secondary body and labels (6.26:1 on paper).
- **Keyline** (`#d8dbe0`, `oklch(0.89 0.008 260)`): the visible grid lines, cell dividers, and field underlines. Stronger than a hairline on purpose; the lines are meant to be seen.

### Named Rules
**The Two-Red Rule.** Signal Vermilion is structural and large; Deep Signal is the only red permitted on small text or links. Putting `#e23726` on body-sized text is a contrast failure and is forbidden.

**The Tinted-Neutral Rule.** Every neutral is tinted cool (hue ~260). Pure `#000` and `#fff` are prohibited.

## 3. Typography

**Display Font:** Archivo (with ui-sans-serif, system-ui fallback)
**Body Font:** Archivo (same family, default width)
**Label Font:** Archivo (uppercase, tracked)

**Character:** One variable grotesque family doing all the work. The display register is pushed to the font's maximum width axis (`wdth` 125, applied as `font-stretch: 125%`) for a poster-grade, engineered feel; body text sits at normal width. Hierarchy comes from width, weight, and scale, not from a second typeface.

### Hierarchy
- **Display** (800, `clamp(2.75rem, 8vw, 6rem)`, line-height 0.94, expanded, uppercase): the hero headline only. One red line inside it.
- **Headline** (700, `clamp(2rem, 4.5vw, 3.4rem)`, line-height 0.98, expanded, uppercase): section H2s.
- **Title** (700, `1.85rem`, expanded, uppercase): service names, principal name, card-level headings.
- **Body** (400, `clamp(1.125rem, 1.4vw, 1.25rem)`, line-height 1.6): paragraphs, capped 65–75ch via an ~84rem container.
- **Label** (500, `0.6875rem` / 11px, letter-spacing 0.2em, uppercase): fact-strip keys, field labels, eyebrow metadata.

### Named Rules
**The No-Serif Rule.** This system has no serif and no italic. The old site used Fraunces italics as voice; that voice is retired. Emphasis is weight, width, scale, or red, never a serif cut.

**The Numeral Rule.** Section identity is a single red index numeral (01–04) plus the heading. Do not stack a tiny uppercase label above the heading; that scaffolding is the banned AI tell.

## 4. Elevation

Flat by doctrine. There are no drop shadows anywhere in the system. Depth and separation are conveyed entirely by the keyline grid, by inverted ink blocks, and by the half-step `surface` lift on the contact form. The only "elevation" event is the scrolled nav gaining a translucent paper background with `backdrop-blur` and a bottom keyline.

### Named Rules
**The No-Shadow Rule.** Surfaces are flat. If something needs to feel separate, divide it with a keyline or invert it to ink, never with a `box-shadow`.

## 5. Components

### Buttons
- **Shape:** square, 0 radius (sharp Swiss corners).
- **Primary:** Ink ground (`#141b26`), Paper text, uppercase tracked label with a `→` glyph, padding `12px 28px`, min-height 44px.
- **Hover / Focus:** background shifts to Signal Vermilion; the `→` glyph translates 4px right. Focus shows the global 2px Deep Signal ring.
- **Ghost (secondary CTA / nav):** text-only Ink, no ground; hover shifts to Deep Signal. The arrow translates on hover.

### Cards / Containers
- **Doctrine:** avoid cards. Services are a numbered full-width ledger of keyline-divided rows, not a card grid. Where a panel is unavoidable (contact form, success state), it is a single flat `surface` rectangle with a `keyline` (or `ink`) border, 0 radius, never nested.
- **Internal Padding:** generous, `clamp` 28–56px.

### Inputs / Fields
- **Style:** underline-only. Transparent background, single `keyline` bottom border, 0 radius, label in 11px uppercase tracked Ink-Muted.
- **Focus:** bottom border shifts to Ink; the global 2px Deep Signal `:focus-visible` ring is always present (never removed with `outline: none`).
- **Error:** message in Deep Signal with a faint signal-tinted background wash, surfaced via `role="alert"`.

### Navigation
- **Style:** fixed top, transparent over the hero, gaining translucent paper + `backdrop-blur` + bottom keyline after 24px scroll. Links are 13px uppercase tracked Ink-Muted, hover to Ink; the CTA is a square Ink button.
- **Mobile:** 44px square hamburger, full-screen Paper overlay with large expanded-width uppercase links, closes on link tap or Escape.

### Echo Visual (signature)
A custom SVG: a single source node (Signal Vermilion) on a ruled keyline field emits concentric rings that propagate outward, alternating ink and signal strokes, with corner registration ticks. Animation is transform/opacity only, on an ease-out-expo curve, and resolves to a static, fully visible state under `prefers-reduced-motion`. It renders on mobile.

## 6. Do's and Don'ts

### Do:
- **Do** keep the grid visible: use `keyline` (`#d8dbe0`) cell dividers and column rules as structure.
- **Do** commit to the red. Signal Vermilion may carry real surface (headline keyword, big numerals, the echo motif).
- **Do** use Deep Signal (`#a21c10`) for any red on small text or links, and the 2px Deep Signal `:focus-visible` ring on every interactive element.
- **Do** set display type in expanded-width Archivo (`font-stretch: 125%`), uppercase, tight tracking.
- **Do** keep surfaces flat and corners sharp (0 radius).

### Don't:
- **Don't** reintroduce the editorial-serif AI lane: no Fraunces or any display serif, no italics, no tiny uppercase tracked label stacked above every section heading.
- **Don't** put Signal Vermilion (`#e23726`) on body-sized text; it fails contrast (4.18:1).
- **Don't** use beige or slate-navy monochrome, or hairline-everywhere timidity; this is a Committed palette, not Restrained.
- **Don't** build identical icon-heading-text card grids; use the keyline ledger instead.
- **Don't** add `box-shadow`, gradients, gradient text, glassmorphism, or `border-left`/`border-right` colored side-stripes.
- **Don't** GOV.UK-cosplay: no government-blue + Transport-font pastiche. The rigor is the grid, not a flag.
- **Don't** use pure `#000` or `#fff`; every neutral is tinted cool.
