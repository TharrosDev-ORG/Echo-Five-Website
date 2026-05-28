# Echofive Solutions — Design System

The implementation reference. Tokens live in the `@theme` block of
`app/globals.css`; this document explains the intent behind them.

## Color

Strategy: **Committed**. Ink carries weight, amber carries meaning, paper is the
ground. All values are OKLCH; neutrals are tinted warm (never pure black or white).

| Token | OKLCH | Role |
| --- | --- | --- |
| `--color-paper` | `0.978 0.007 80` | Default light section ground |
| `--color-paper-alt` | `0.949 0.011 74` | Alternate light ground (video block) |
| `--color-ink` | `0.205 0.018 45` | Primary text on paper |
| `--color-ink-deep` | `0.158 0.022 40` | Dark section grounds, hero, footer |
| `--color-ink-soft` | `0.305 0.02 45` | Secondary ink |
| `--color-muted` | `0.44 0.015 50` | Secondary text on paper (AA) |
| `--color-muted-on-dark` | `0.72 0.018 70` | Secondary text on ink |
| `--color-signal` | `0.78 0.158 68` | The committed amber: motif, fills, on-dark text |
| `--color-signal-deep` | `0.52 0.14 52` | Amber as text/links on paper (AA) |
| `--color-line` | `ink / 0.14` | Keylines on paper |
| `--color-line-dark` | `paper / 0.14` | Keylines on ink |

Section grounds alternate to create rhythm: ink hero, paper, ink, paper, paper-alt,
paper, ink, paper, then a full **amber-drenched** contact close.

## Typography

- **Display:** Bricolage Grotesque (500-800). Tight tracking, near-1.0 line height.
- **Body:** Hanken Grotesk (400-700). Base 1.0625rem, line height 1.6.
- **Mono:** Geist Mono (400-500). Section coordinates, tags, data, the callsign.

Fonts were chosen against the reflex-reject list (no IBM Plex, no Space Grotesk):
Bricolage carries character at display sizes, Hanken stays neutral and legible at
body, Geist Mono reads as deliberate engineering, not costume.

Scale via `clamp()` utilities in `globals.css`: `.t-display`, `.t-h2`, `.t-h3`,
`.t-lead`, `.t-body`, `.t-label`. Hierarchy is carried by scale + weight, not color.
Body measure capped (`.measure`, `.measure-wide`).

## Layout

- `.u-container`: max 80rem, fluid side padding `clamp(1.25rem, 5vw, 4.5rem)`.
- `.section-pad`: vertical rhythm `clamp(5rem, 11vw, 9rem)`.
- 12-column grids for asymmetric heading/body splits. Spacing varies by section on
  purpose; no uniform padding everywhere.
- No decorative cards. Services and the failure points are **divided editorial lists**
  (hairline separators), not boxed card grids.

## Motion

- Entrance: fade + 18-22px rise, exponential ease-out `cubic-bezier(0.16, 1, 0.3, 1)`,
  `whileInView` once. No bounce, no elastic.
- The echo motif: rings ping outward on a 6s loop, staggered.
- Everything respects `prefers-reduced-motion` (Framer `useReducedMotion` + a global
  CSS fallback). No animated layout properties.

## Components

- `EchoSignal` — the brand watermark. `tone="signal" | "ink"`, always `aria-hidden`.
- `SectionMark` — the echo coordinate that opens each section (glyph + channel
  number + plainly-set label). One deliberate system, `tone="light" | "dark"`.
- `Reveal` — scroll-in wrapper, polymorphic (`div | li | section`).
- Buttons: `.btn` with `.btn-primary` (amber), `.btn-ghost`, `.btn-on-dark`.
- `.link-arrow` — mono underline link with a widening gap on hover.

## Accessibility

- WCAG AA contrast floor on every text/ground pairing (muted tokens tuned for it).
- Skip link, visible `:focus-visible` ring in `--color-signal-deep`.
- Single `<h1>`, ordered heading levels, semantic `<ol>`/`<ul>` for lists.
- The YouTube embed is a click-to-load facade (a real `<button>` with an aria-label).
- Decorative SVG is `aria-hidden`.
