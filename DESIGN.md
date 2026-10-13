# Echofive Solutions — Design System ("Midnight & Vermilion")

The implementation reference. Tokens live in the `@theme` block of `app/globals.css`;
this document explains the intent behind them.

A plain, editorial identity for risk-averse, procurement-literate public-sector buyers.
The site should read like a well-made report from a serious firm: clear structure, plain
language, real specifics up front, and one accent color used sparingly.

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
| `--color-accent` | `#BE2612` | Vermilion: primary buttons, links, list markers, ADKAR initials |
| `--color-accent-bright` | `#F77B5A` | Accent on night grounds |
| `--color-accent-soft` | | Focus halo, invalid-field fill |

Measured contrast (WCAG 2.x): ink on paper 17:1, ink-2 8.1:1, ink-3 6.0:1, accent on
paper 5.8:1, white on accent 6.1:1, on-night-2 on night 9.7:1, accent-bright on night
6.9:1. Every pair is AA; recheck if you change a token.

## Typography

- **Headings:** Schibsted Grotesk, 700 to 800, light negative tracking (-0.01 to -0.02em).
- **Text:** IBM Plex Sans, 400 to 600. No mono font, no uppercase letter-spaced labels.

Scale (all `clamp()`): `.t-display` (home hero), `.t-h1` (inner pages), `.t-h2`,
`.t-h3`, `.t-lead`, `.t-muted`, `.t-small`. Headings are sentence case. One `h1` per page.

## Spacing and breakpoints

- Spacing comes only from the `--s-1` to `--s-9` scale (0.25rem to 6rem) in `:root`.
- Three breakpoints, nothing else: **640px** (two-column lists, form rows),
  **900px** (document layout, desktop nav, larger section padding), **1200px**
  (four-column hero facts).
- `--gutter`, `--section-y`, and `--header-h` step up at those breakpoints.

## Layout

- `.container`: max 72rem.
- **Document layout** (`components/site/Section.tsx`, `.doc`): each section's heading
  sits in a side column and all of its content in the main column on wide screens, like a
  well-set report. Stacks below 900px. The side heading is sticky.
- Grounds alternate `paper` / `.band`; `.on-night` marks the hero, closing CTA, and footer.
- Content is plain lists separated by hairlines (`.ruled`, `.ruled-2`, `.rowlist`,
  `.numbered`, `.bullets`), not card grids. The only bordered boxes are the contact form
  and the founder note.

## Avoided on purpose

These read as template or AI-generated design and were removed: kicker labels above
headings, pill badges with status dots, grid textures, icons in tinted tiles, identical
card grids, mono numbering, boxed stat cards, tag pills, arrows on every link, scroll
fade-ins, breadcrumbs on a five-page site, and monogram logo tiles. Copy avoids
"X, not Y" constructions and stock phrases. Don't reintroduce them.

## Motion

None beyond hover color changes. No scroll-triggered animation.

## Cascade gotcha

Component classes in `globals.css` are unlayered, so they beat Tailwind utilities (which
live in `@layer utilities`). Never rely on a utility like `md:hidden` to override a
component class's `display`; put the breakpoint in the component CSS instead (see
`.primary-nav` and `.menu-toggle`).

## Conversion

Every page except Contact ends on the CTA band, and the header carries "Start a
conversation" at all times. The contact page pairs the form with the direct email
address, what happens next, and the firm's credentials.
