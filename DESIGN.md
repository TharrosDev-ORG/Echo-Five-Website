# Echofive Solutions — Design System ("Bone & Cobalt")

The implementation reference. Tokens live in the `@theme` block of `app/globals.css`;
this document explains the intent behind them.

A light editorial identity. The concept is **change, flow, and alignment** — the human
work between *buying* software and *actually using it*, expressed visually as
*scattered → aligned* (disorder coming into order = adoption). Warm bone paper, deep warm
ink, one electric cobalt accent. A Three.js curl-noise particle field drifts behind the
hero like slow currents; Lenis smooth scroll drives a GSAP ScrollTrigger narrative. The
site should feel confident and precise for serious public-sector buyers — captivating,
never gimmicky.

## Color

Strategy: **one committed accent on a warm light field**. Grounds are layered bone tones
for depth; deep warm ink carries text; one electric cobalt carries meaning (key words,
progress, links, CTAs, the founder mark). All OKLCH.

| Token | Role |
| --- | --- |
| `--color-paper` | Base bone ground (`#F3EFE7`) |
| `--color-paper-2` / `--color-paper-3` | Deeper bands for section rhythm |
| `--color-card` | Near-white raised surfaces |
| `--color-ink` | Primary text (`#14110D`-warm near-black) |
| `--color-ink-soft` / `--color-ink-muted` | Secondary / tertiary text (AA on paper) |
| `--color-cobalt` | The committed accent (`#2540FF`): key words, progress, links, CTAs |
| `--color-cobalt-deep` / `--color-cobalt-soft` | Emphasis / tints |
| `--color-on-cobalt` | Light text on cobalt fills |
| `--color-line*` | Keylines (ink at alpha) and cobalt keylines |

Rhythm comes from alternating `paper` / `paper-2` / `paper-3` section grounds, closing on
a single **deep-ink footer** for contrast.

## Typography

- **Display:** Bricolage Grotesque (variable), tight tracking, near-1.0 line height.
- **Body:** Public Sans (variable) — the USWDS government typeface, a quiet trust signal.
- **Mono:** IBM Plex Mono for "coordinates": section indices, kickers, labels, buttons.
  `.t-coord` is the canonical label (0.72rem, 0.22em tracking, uppercase).

Scale utilities (all `clamp()`-based): `.t-display`, `.t-h2`, `.t-h3`, `.t-lead`,
`.t-body`, `.t-mega-num`, plus `.index-num` (stroked numerals). No serif, no italic, no
em-dashes in copy.

## Motion

Each mechanism stands alone so a hiccup in one can't leave content stuck hidden.
Visibility runs on IntersectionObserver; **ScrollTrigger carries only additive scrub
moments** whose failure leaves everything readable:

- **Lenis** (`components/providers/SmoothScroll.tsx`): smooth scroll on the GSAP ticker.
  It only smooths — nothing depends on it to become visible. Held during the preloader,
  released on the `ef:loaded` event; emits `ScrollTrigger.update` and refreshes trigger
  positions after fonts/preloader; also handles deep-link hashes.
- **Three.js** (`components/three/FlowField.tsx`): the hero particle field. Custom
  shaders displace points along a curl-noise flow field; the pointer scatters them and
  they settle back. DPR capped at 2, normal blending tuned for a light ground, pauses
  off-screen / hidden tab, full dispose on unmount, context-loss handled.
- **Reveals (IntersectionObserver + GSAP):**
  - `useReveal` (via `RevealRoot`) reveals all `[data-reveal]` / `[data-reveal-group]`
    rises and `[data-split]` masked headlines as they enter the viewport, so content
    sections stay server components.
  - Hero entrance: line-mask headline reveal + staggered sub/CTAs/meta bar, played on
    `ef:loaded` with a safety timer so it can never be left hidden.
- **Scrub moments (ScrollTrigger, additive only):**
  - Hero scroll-exit drift (composition rises and softens as the hero leaves).
  - `TextScrub` pull statements: words flood from faint to full ink with scroll; the
    faint start state is applied only after the trigger exists.
  - The Proof video frame swells from 0.88 → 1 as it enters.
  - **The ADKAR sequence pins** on wide screens and travels horizontally under a
    filling progress rail — the signature scroll moment. It opts in via classes from
    `Adkar.tsx` (`gsap.matchMedia`, ≥1024px and ≥720px tall) and falls back to a
    vertical editorial list on small screens, no JS, or reduced motion.
- **Signature surfaces:** sticky stacking failure cards (CSS `position: sticky`), the
  giant outlined roster marquee with scroll-velocity skew (`SkewMarquee`), full-row
  cobalt hover floods on the service rows, the cobalt-drenched contact close, and the
  oversized stroked footer wordmark.
- FX: custom cursor, wordmark-cascade preloader with cobalt flash curtain,
  scroll-progress bar, magnetic CTAs, hide-on-scroll-down nav, live ET clock.

Rules: initial hidden states are gated behind the `.js` class (no-JS users see
everything); `prefers-reduced-motion` forces all final states in CSS and skips every
GSAP / Lenis / WebGL / marquee animation; never `clearProps` on elements whose hidden
state lives in the stylesheet.

### Three cascade/transform gotchas (still true)

0. **GSAP parses stylesheet `translateY(110%)` as pixels.** Every percent-based rise
   (`yPercent`) must also set `y: 0`, or the tween completes while the parsed pixel
   offset keeps the words shifted out of their masks.

1. **No unlayered universal resets.** An unlayered `* { margin: 0 }` beats every Tailwind
   utility (they live in `@layer utilities`). Tailwind v4 preflight handles the reset.
2. **Tailwind v4 `scale-*` uses the `scale` property**, which composes with GSAP's
   `transform`. Anything GSAP scales must get its initial scale from GSAP (`fromTo`) or a
   plain `transform` rule, not Tailwind scale classes.

## Layout

- `.u-container`: max 84rem, fluid inline padding (`--gutter`).
- Section padding via `.pad-block-2xl/xl/lg` so the scroll has a beat.
- Faint `.bg-grid` + `.grain` atmosphere; keylines (`--color-line`) structure
  grids-of-cells (clients, failure cards) and editorial rows (services, credentials).
- One-page narrative: Hero → Trust → Why → Services → ADKAR → Method → Proof →
  Clients → Credentials → About → Contact (cobalt drench) → Footer (deep ink,
  oversized wordmark).

## Conversion

Primary action everywhere is `#contact` / the founder's email (nav CTA, hero chips,
contact section). Contact is a real form → `/api/contact` (Resend; env: `RESEND_API_KEY`,
`CONTACT_TO`, `CONTACT_FROM`) with honeypot + field validation + live-region errors, and a
graceful mailto fallback when the mail service is unconfigured.

## Accessibility floor

WCAG AA contrast on every text/ground pair. Skip link, single `h1`, ordered headings,
semantic lists, keyboard-operable nav with smooth anchor scroll, focus-visible ring in
cobalt, click-to-load video facade, and reduced-motion fallbacks on every animated
element. The custom cursor is decorative, additive, and fine-pointer only.
