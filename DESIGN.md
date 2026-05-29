# Echofive Solutions — Design System ("Operations / Instrument")

The implementation reference. Tokens live in the `@theme` block of
`app/globals.css`; this document explains the intent behind them.

This is the v3 rebuild: a dark-first, technical, data-forward identity. The site
should feel like serious infrastructure software, the adoption-analytics product
itself, not a consultancy brochure. Restraint over hype.

## Color

Strategy: **one committed accent on graphite**. Cool graphite grounds carry the
weight, one signal green carries meaning (live state, progress, key words, CTAs),
and the page closes on a full signal-drenched contact. All values are OKLCH.

| Token | OKLCH | Role |
| --- | --- | --- |
| `--color-bg` | `0.17 0.012 250` | Base ground |
| `--color-bg-raised` | `0.205 0.014 250` | Alternate section ground (rhythm) |
| `--color-bg-elev` | `0.245 0.016 250` | Panels, fields, inset readouts |
| `--color-ink` | `0.96 0.008 250` | Primary text |
| `--color-ink-soft` | `0.8 0.012 250` | Secondary text |
| `--color-ink-muted` | `0.64 0.013 250` | Tertiary text (AA on `--color-bg`) |
| `--color-signal` | `0.84 0.19 150` | The committed accent: motif, progress, CTAs, key words |
| `--color-signal-bright` | `0.9 0.2 150` | Hover / emphasis |
| `--color-signal-deep` | `0.5 0.13 150` | Signal as text on light/signal grounds |
| `--color-ink-on-signal` | `0.19 0.03 155` | Dark ink on signal fills + the drenched close |
| `--color-line` | `ink / 0.10` | Keylines |
| `--color-line-strong` | `ink / 0.20` | Stronger keylines |
| `--color-line-signal` | `signal / 0.32` | Accent keylines |

Rhythm comes from **panel elevation**, not light/dark flips: base ground alternates
with `bg-raised`, panels sit on `bg-elev`, and the page ends on a full
**signal-drenched** contact (`bg-signal` with `ink-on-signal` text).

## Typography

- **Display:** Archivo (700-800). Tight tracking, near-1.0 line height. Technical,
  confident, reads as engineered.
- **Body:** Geist (400-600). Base 1.0625rem, line height ~1.6.
- **Mono:** Geist Mono (400-500). Section coordinates (CH.NN), labels, data, chips.

Scale via `clamp()` utilities in `globals.css`: `.t-display`, `.t-h2`, `.t-h3`,
`.t-lead`, `.t-body`, `.t-coord`. Hierarchy is carried by scale + weight, with signal
green reserved for emphasis. The display floor is set so the hero never clips at 360px.

## Layout

- `.u-container`: max 80rem, fluid side padding `clamp(1.25rem, 5vw, 4.5rem)`.
- **Vertical rhythm scale**: `--pad-2xl/xl/lg/md` tokens applied via `.pad-block-*`
  and `.pad-top-*` / `.pad-bot-*` so the scroll has a beat (generous around pivots).
  `--gutter-num` reserves the left margin for oversized list numerals/letters.
- **Section coordinate** (`SectionMark`): a live status dot + `CH.NN` channel number +
  plainly-set label opens each section. One constant system; composition varies.
- **No decorative card grids.** Why, Services, and Credentials are divided editorial
  lists (hairline separators, gutter markers). Clients is a mono data-grid.
- Atmosphere: a faint instrument grid (`.bg-grid`) and grain overlay on the hero.

## Motion (the "alive" layer)

- Entrance: fade + 20px rise, exponential ease-out `cubic-bezier(0.16, 1, 0.3, 1)`,
  once, via `Reveal` (IntersectionObserver + CSS). No animation library.
- `SignalField`: the hero oscilloscope canvas, two drifting waveform traces over a tick
  grid with echo rings propagating from the left focal point.
- `AdkarStepper`: a progress rail that fills and lights the five nodes in sequence when
  scrolled into view.
- `StatCounter`: count-up on scroll-in.
- `StickyCTA`: slides in after the hero, retracts over the contact section.
- The trust ticker: a linear marquee, paused on hover.
- Everything respects `prefers-reduced-motion` (CSS fallbacks + direct `matchMedia`
  checks in the canvas and counters). No animated layout properties.

## Components

- `SignalField` — the live hero canvas. Self-cleaning RAF, reduced-motion static frame,
  always `aria-hidden`.
- `SectionMark` — the instrument coordinate that opens each section (`tone="dark" | "signal"`).
- `AdkarStepper` — the interactive ADKAR progress rail (desktop horizontal, mobile vertical).
- `ClientGrid` — the mono data-grid client roster with a scanline sweep.
- `StatCounter`, `StickyCTA`, `TrustStrip` — supporting interactive pieces.
- `ContactForm` — the accessible contact form with mailto fallback.
- `Reveal` — scroll-in wrapper, polymorphic (`div | li | section`).
- Buttons: `.btn` with `.btn-primary` (signal) and `.btn-ghost`. `.link-arrow` for mono
  underline links. `.status-dot` for the live pulse. `.panel` / `.panel-elev` for surfaces.

## Accessibility

- WCAG AA contrast floor on every text/ground pairing (muted tokens tuned for it).
- Skip link, visible `:focus-visible` ring in `--color-signal`.
- Single `<h1>`, ordered heading levels, semantic `<ol>`/`<ul>` for lists.
- The YouTube embed is a click-to-load facade (a real `<button>`).
- The contact form has labels, `aria-describedby` errors, and a live-region status.
- Decorative SVG/canvas is `aria-hidden`. No em dashes anywhere.
