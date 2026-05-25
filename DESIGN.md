---
name: Echo-Five Consulting
description: Govtech-precision marketing site — Swiss grid, deep navy-slate + cool-white, one committed institutional teal. All text meets WCAG AA contrast on both dark and light backgrounds.
colors:
  paper: "#f4f6fb"
  surface: "#f8fafe"
  ink: "#0b1422"
  ink-muted: "#383f52"
  signal: "#1a8a9c"
  signal-deep: "#0c5f6b"
  keyline: "#d0d4de"
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
  button-inverted:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "16px 32px"
  nav-link:
    backgroundColor: "transparent"
    textColor: "{colors.ink-muted}"
---

# Design System: Echo-Five Consulting

## 1. Overview

**Creative North Star: "The Signal Grid"**

Echo-Five is a one-person public-sector consultancy, and the site has to read like rigor before it reads like marketing. The system borrows the discipline of the Swiss International Typographic Style: a strict, *visible* modular grid carries the structure, big grotesque type carries the hierarchy, and a single committed institutional teal carries the voice. The grid is not decoration; it is the argument. A program lead evaluating a vendor on an office laptop should feel measured competence in the first fold, the way a well-set timetable or a government form done right feels trustworthy.

The reference is Müller-Brockmann poster grids, deliberately not GOV.UK-blue cosplay. Color is Committed, not Restrained: institutional teal is allowed to take real surface (headline keyword, big numerals, the echo motif) rather than hiding as a 10% garnish. Imagery is fully abstract, a custom propagating-signal SVG on a ruled field, never stock photography or a colored block standing in for a photo.

This system explicitly rejects the aesthetic it replaced: the editorial-serif AI lane. No display serif, no italic flourishes, no tiny uppercase tracked label stacked above every section heading, no beige-and-slate monochrome, no hairline-everywhere timidity.

**Key Characteristics:**
- Strict visible modular grid as the primary structural voice.
- One committed institutional teal against cool near-white and near-black.
- Archivo grotesque at expanded width; scale and weight, never serif, carry hierarchy.
- Section identity from grid position, big numerals, and a single teal index, never a label kicker.
- Sharp corners (0 radius) everywhere; flat, no shadows.
- All text meets WCAG AA contrast on both dark (`bg-ink`) and light (`bg-paper`) sections.

## 2. Colors

A near-monochrome cool field, black on white, broken by one decisive red. Canonical values are OKLCH; the frontmatter carries sRGB hex equivalents for tooling.

### Primary
- **Signal Teal** (`#1a8a9c`, `oklch(0.56 0.17 196)`): the brand's one committed accent. Used at scale only: the highlighted headline word, large section numerals, the echo source node, CTA button hover. Contrast on paper ≈ 3.5:1 — sufficient for large display and UI text but **never** small body copy.
- **Deep Signal** (`#0c5f6b`, `oklch(0.40 0.13 196)`): the darker teal permitted on small text and links (≈ 5.9:1 on paper). The 2px `:focus-visible` ring on every interactive element; inline links on dark sections.

### Neutral
- **Paper** (`#f8fafd`, `oklch(0.985 0.004 255)`): page base, a cool near-white tinted toward the ink hue. Never pure `#fff`.
- **Surface** (`#fafcfe`, `oklch(0.99 0.003 255)`): a half-step lift off paper, reserved for any raised panel.
- **Ink** (`#141b26`, `oklch(0.22 0.025 260)`): primary text, primary-button ground, inverted blocks (16.6:1 on paper). Never pure `#000`.
- **Ink Muted** (`#383f52`, `oklch(0.38 0.03 255)`): secondary body and labels (≈ 6.6:1 on paper). Dark enough to meet WCAG AA at all body sizes without reading as primary ink.
- **Keyline** (`#d8dbe0`, `oklch(0.89 0.008 260)`): the visible grid lines, cell dividers, and field underlines. Stronger than a hairline on purpose; the lines are meant to be seen.

### Named Rules
**The Two-Teal Rule.** Signal Teal is structural and large; Deep Signal is the only teal permitted on small text or links. Putting `#1a8a9c` on body-sized text risks contrast failure and is forbidden.

**The Tinted-Neutral Rule.** Every neutral is tinted cool (hue ~255–260). Pure `#000` and `#fff` are prohibited.

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

Flat by doctrine. There are no drop shadows anywhere in the system. Depth and separation are conveyed entirely by the keyline grid and by inverted ink blocks (the full-bleed closing CTA section being the largest). The only "elevation" event is the scrolled nav gaining a translucent paper background with `backdrop-blur` and a bottom keyline.

### Named Rules
**The No-Shadow Rule.** Surfaces are flat. If something needs to feel separate, divide it with a keyline or invert it to ink, never with a `box-shadow`.

## 5. Components

### Buttons
- **Shape:** square, 0 radius (sharp Swiss corners).
- **Primary:** Ink ground (`#141b26`), Paper text, uppercase tracked label with a `→` glyph, padding `12px 28px`, min-height 44px.
- **Hover / Focus:** background shifts to Signal Vermilion; the `→` glyph translates 4px right. Focus shows the global 2px Deep Signal ring.
- **Ghost (secondary CTA / nav):** text-only Ink, no ground; hover shifts to Deep Signal. The arrow translates on hover.
- **Inverted (on the dark closing section):** Paper ground, Ink text, larger padding (`16px 32px`, min-height 56px) as the page's final focal CTA. Hover shifts to Signal Vermilion ground with Paper text.

### Cards / Containers
- **Doctrine:** avoid cards. Services are a numbered full-width ledger of keyline-divided rows, not a card grid. There are no input panels: the contact section is a CTA, not a form. The one large container is the full-bleed inverted closing block (Ink ground, Paper text), never a bordered card and never nested.
- **Internal Padding:** generous, `clamp` 28–56px.

### Contact (closing CTA)
- **No form.** The contact section is a full-bleed Ink band that ends the page. A Signal Teal index numeral and a large headline (one word in Signal Teal), then an Inverted CTA button that opens a prefilled `mailto:` to the principal, plus a keyline list of Email / LinkedIn / Office.
- **Dividers on dark:** a translucent paper hairline (`color-mix(in oklch, paper 15%, transparent)`), not the light `keyline`, which is too stark on Ink.
- **Links on dark:** Paper text with a Signal Teal underline (`decoration`), never small Signal-colored text, which risks contrast failure on Ink.
- **Text on dark:** body copy at `text-paper/90`, secondary note text at `text-paper/70`, row labels at `text-paper/65`. These minimums ensure WCAG AA on the Ink background.

### Navigation
- **Style:** fixed top, transparent over the hero, gaining translucent paper + `backdrop-blur` + bottom keyline after 24px scroll. Links are 13px uppercase tracked Ink-Muted, hover to Ink; the CTA is a square Ink button.
- **Over dark hero:** nav links render at `text-paper/80` (not fully opaque, to maintain hierarchy against the headline), hover to `text-paper`. The CTA uses an inverted Paper-ground button.
- **Mobile:** 44px square hamburger, full-screen Paper overlay with large expanded-width uppercase links, closes on link tap or Escape.

### Echo Visual (signature)
A custom SVG: a single source node (Signal Teal) on a ruled keyline field emits concentric rings that propagate outward, alternating ink and signal strokes, with corner registration ticks. Animation is transform/opacity only, on an ease-out-expo curve, and resolves to a static, fully visible state under `prefers-reduced-motion`. It renders on mobile.

**Hero placement:** the visual sits right-flush and vertically centered in the hero section (`right-0`, `top-1/2 -translate-y-1/2`), sized `clamp(380px, 50vmin, 600px)` square, at `opacity-[0.13]`. This keeps it clearly legible as a deliberate design element without competing with the headline.

## 6. Do's and Don'ts

### Do:
- **Do** keep the grid visible: use `keyline` (`#d0d4de`) cell dividers and column rules as structure.
- **Do** commit to the teal. Signal Teal may carry real surface (headline keyword, big numerals, the echo motif).
- **Do** use Deep Signal (`#0c5f6b`) for any teal on small text or links, and the 2px Deep Signal `:focus-visible` ring on every interactive element.
- **Do** set display type in expanded-width Archivo (`font-stretch: 125%`), uppercase, tight tracking.
- **Do** keep surfaces flat and corners sharp (0 radius).
- **Do** maintain minimum opacity floors on dark sections: body copy `paper/85`+, labels `paper/60`+, secondary text `paper/70`+.

### Don't:
- **Don't** reintroduce the editorial-serif AI lane: no Fraunces or any display serif, no italics, no tiny uppercase tracked label stacked above every section heading.
- **Don't** put Signal Teal (`#1a8a9c`) on body-sized text; at ≈ 3.5:1 it can fail WCAG AA for normal-weight copy.
- **Don't** reach for `text-paper/65` or lower on dark backgrounds for anything other than purely decorative elements; it fails contrast.
- **Don't** use beige or slate-navy monochrome, or hairline-everywhere timidity; this is a Committed palette, not Restrained.
- **Don't** build identical icon-heading-text card grids; use the keyline ledger instead.
- **Don't** add `box-shadow`, gradients, gradient text, glassmorphism, or `border-left`/`border-right` colored side-stripes.
- **Don't** GOV.UK-cosplay: no government-blue + Transport-font pastiche. The rigor is the grid, not a flag.
- **Don't** use pure `#000` or `#fff`; every neutral is tinted cool.
