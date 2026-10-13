# Echofive Solutions — Design System ("Midnight & Vermilion")

The implementation reference. Tokens live in the `@theme` block of `app/globals.css`;
this document explains the intent behind them.

A crisp institutional identity for risk-averse, procurement-literate public-sector
buyers. The site should read like a serious firm's brief: clear structure, plain
language, real specifics up front, and one confident accent. Premium through restraint,
not effects.

## Color

One committed accent on cool white paper, with midnight bands for weight. All OKLCH.

| Token | Hex (approx.) | Role |
| --- | --- | --- |
| `--color-paper` | `#F9FAFC` | Base ground |
| `--color-paper-2` | `#EFF3F6` | Alternate band (`.band`) |
| `--color-card` | `#FFFFFF` | Raised surfaces |
| `--color-night` / `--color-night-2` | `#0C1628` / `#162137` | Hero, statement, CTA band, footer (`.on-night`) |
| `--color-ink` | `#0F1828` | Primary text |
| `--color-ink-2` / `--color-ink-3` | `#444D5E` / `#59616F` | Body / tertiary text |
| `--color-on-night` / `--color-on-night-2` | `#F9FAFC` / `#B7BECB` | Text on night |
| `--color-accent` | `#BE2612` | Vermilion: CTAs, links, labels, key marks |
| `--color-accent-bright` | `#F77B5A` | Accent on night grounds |
| `--color-accent-soft` | | Focus halo, invalid-field fill |

Measured contrast (WCAG 2.x): ink on paper 17:1, ink-2 8.1:1, ink-3 6.0:1, accent on
paper 5.8:1, white on accent 6.1:1, on-night-2 on night 9.7:1, accent-bright on night
6.9:1. Every pair is AA; recheck if you change a token.

## Typography

- **Display:** Schibsted Grotesk, 700 to 800, tight tracking.
- **Body:** IBM Plex Sans, 400 to 600.
- **Labels:** IBM Plex Mono, uppercase, 0.12em tracking (`.t-label`).

Scale (all `clamp()`): `.t-display` (home hero), `.t-h1` (inner pages), `.t-h2`,
`.t-h3`, `.t-lead`, `.t-body`, `.t-small`. One `h1` per page.

## Layout

- `.container`: max 76rem with fluid gutters. `.section` gives consistent vertical rhythm.
- Grounds alternate `paper` / `.band`; `.on-night` marks the hero, the statement panel,
  the closing CTA band, and the footer.
- `Intro` opens every section: accent-ruled label, heading, then a lead or a link in a
  right column (`.intro--split`) on wide screens.
- Detail lives on inner pages; the home page summarizes and links to each one.

## Components

Header (sticky, active page underline, mobile dialog menu), PageHeader (breadcrumb, h1,
lead), CtaBand (closing ask on every page but Contact), service cards and rows, failure
cards, the ADKAR stepper (horizontal on desktop, vertical rail on mobile), stats,
credential rows, client roster grid, founder card, click-to-load talk video, and the
contact form.

## Motion

Deliberately minimal so pages are fast and easy to scan:

- Entrance fades (`[data-reveal]`): 14px rise and fade, staggered via `--reveal-i`, run
  by `components/site/Reveal.tsx` (one IntersectionObserver, re-armed per route, with a
  safety timer). The hidden start state is gated behind `.js`.
- Hover states on buttons, links, cards, and the video poster.
- `prefers-reduced-motion` turns all of it off.

No smooth-scroll hijacking, scroll-pinned sequences, preloaders, custom cursors, or
WebGL. These were removed in the redesign because they slowed reading and loading.

## Cascade gotcha

Component classes in `globals.css` are unlayered, so they beat Tailwind utilities (which
live in `@layer utilities`). Never rely on a utility like `md:hidden` to override a
component class's `display`; put the breakpoint in the component CSS instead (see
`.primary-nav` and `.menu-toggle`).

## Conversion

Every page ends on the CTA band, and the header carries "Start a conversation" at all
times. The contact page pairs the form with the direct email address, what happens next,
and the firm's credentials.
