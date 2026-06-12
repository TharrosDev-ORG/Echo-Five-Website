# Echofive Solutions — Design System ("Deep Field / Sonar")

The implementation reference. Tokens live in the `@theme` block of
`app/globals.css`; this document explains the intent behind them.

This is the v4 ground-zero rebuild: a dark depth-field identity built around the
echo/sonar callsign, rendered literally. A Three.js GPU particle field carries
propagating echo pulses in the hero; GSAP ScrollTrigger drives the scroll
narrative. The site should feel like precision instrumentation for serious
public-sector buyers — captivating, never gimmicky.

## Color

Strategy: **one committed accent on an ink-navy depth field**. The grounds are a
depth gradient (darkest at the poles: hero and footer on `bg-deep`), one electric
ice cyan "signal" carries meaning (the echo motif, live state, progress, key
words, CTAs), and the page closes on a full signal-drenched contact. All OKLCH.

| Token | OKLCH | Role |
| --- | --- | --- |
| `--color-bg` | `0.165 0.022 252` | Base ground |
| `--color-bg-deep` | `0.125 0.02 254` | Hero, alternating sections, footer |
| `--color-bg-raised` | `0.2 0.024 252` | Hover sweeps, panels |
| `--color-bg-elev` | `0.24 0.026 250` | Elevated panels (principal card, video) |
| `--color-ink` | `0.965 0.006 230` | Primary text |
| `--color-ink-soft` | `0.81 0.014 235` | Secondary text |
| `--color-ink-muted` | `0.66 0.02 238` | Tertiary text (AA on bg + bg-deep) |
| `--color-signal` | `0.85 0.131 210` | The committed accent: echo motif, progress, CTAs, key words |
| `--color-signal-bright` | `0.92 0.105 203` | Hover / emphasis |
| `--color-ink-on-signal` | `0.17 0.05 240` | Dark ink on signal fills + the drenched close |
| `--color-line` | `ink / 0.09` | Keylines |
| `--color-line-strong` | `ink / 0.18` | Stronger keylines |
| `--color-line-signal` | `signal / 0.35` | Accent keylines, glows |

Rhythm comes from alternating `bg` / `bg-deep` section grounds with panel
elevation inside, closing on the one **signal-drenched** contact section
(`bg-signal` + `ink-on-signal`).

## Typography

- **Display:** Bricolage Grotesque (variable). Weights ~620–750 via
  `font-[...]`, tight tracking, near-1.0 line height. Characterful without
  being decorative.
- **Body:** Public Sans (variable) — the USWDS government typeface, a quiet
  trust signal for the audience. Base 1.0625rem, line height ~1.62.
- **Mono:** IBM Plex Mono (400/500) for "coordinates": section indices,
  kickers, nav, labels, buttons, client shorts. `.t-coord` is the canonical
  label style (0.75rem, 0.2em tracking, uppercase).

Scale utilities: `.t-display`, `.t-h2`, `.t-h3`, `.t-lead`, `.t-body` (all
`clamp()`-based). No serif, no italic anywhere. No em-dashes in copy.

## Motion

Two engines, one discipline:

- **Three.js** (`components/three/EchoField.tsx`): the hero particle plane.
  Custom shader; echo rings propagate across ~24k points (12k mobile),
  pointer parallaxes the camera. DPR capped at 1.75, additive blending,
  single draw call. Pauses off-screen / hidden tab. Reduced motion renders
  one static frame with a frozen wavefront.
- **GSAP ScrollTrigger** (`lib/animation.ts` is the only import point):
  - `ScrollFX.tsx` (mounted once) drives all `[data-reveal]` /
    `[data-reveal-group]` rises and `[data-count]` count-ups, so content
    sections stay server components.
  - `Adkar.tsx` pins on desktop and scrubs a wavefront across the five
    stages (rail fill + per-stage lighting); unpinned vertical rail on
    mobile.
  - Hero entrance: line-mask headline reveal, staggered meta/chips.
  - `StickyCTA.tsx` slides in after the hero, retreats at contact.

Rules: initial hidden states are gated behind the `.js` class (no-JS users
see everything); `prefers-reduced-motion` forces all final states in CSS and
skips every GSAP/marquee animation; never `clearProps` on elements whose
hidden state lives in the stylesheet (it re-hides them).

### Two cascade gotchas (learned the hard way)

1. **No unlayered universal resets.** An unlayered `* { margin: 0 }` beats
   every Tailwind utility (they live in `@layer utilities`). Tailwind v4
   preflight already handles the reset.
2. **Tailwind v4 `scale-*` uses the `scale` property**, which composes with
   GSAP's `transform`. Anything GSAP scales must get its initial scale from
   GSAP (`fromTo`) or a plain `transform` rule, not Tailwind scale classes.

## Layout

- `.u-container`: max 82rem, fluid inline padding.
- Section padding via `.pad-block-2xl/xl/lg` so the scroll has a beat.
- Faint `.bg-grid` + `.grain` atmosphere on hero/process; keylines
  (`border-line`) structure everything else — grid-of-cells for clients and
  failure cards, editorial full-width rows for services and credentials.
- One-page narrative order: Hero → TrustStrip → Why → Services → ADKAR →
  Method → Proof → Clients → Credentials → About → Contact → Footer.

## Conversion

Primary action everywhere is `#contact` (nav CTA, hero, sticky bar). Contact
is a real form → `/api/contact` (Resend; env: `RESEND_API_KEY`, `CONTACT_TO`,
`CONTACT_FROM`) with honeypot + field validation + live-region errors, and a
graceful mailto fallback when the mail service is unconfigured.

## Accessibility floor

WCAG AA contrast on every text/ground pair (muted ink tuned for bg-deep;
small signal text only on dark grounds). Skip link, single `h1`, ordered
headings, semantic lists, `aria-current` nav state, focus-visible ring in
signal, click-to-load video facade, reduced-motion fallbacks on every
animated element.
