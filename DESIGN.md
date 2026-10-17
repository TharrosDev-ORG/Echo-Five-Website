# Echofive Solutions: Design System ("Briefing")

Echofive is the senior firm behind Advanta365. The site should read like a
briefing from people who have done this for thirty years: calm, exact,
confident, with every argument made visible. It shares Advanta365's ink,
paper, and highlighter blue so the two read as one family, and it is the
more substantial of the two.

**Quality bar:** award-grade craft (Awwwards SOTD level) for a risk-averse,
procurement-literate public-sector reader. Restraint over effects. Every
page must be fully readable without JavaScript and with reduced motion.

## Signature ideas

1. **The highlighter.** `<Mark>` lays the Advanta365 highlighter (#86C1FF)
   behind the one or two words in a heading that carry the point, and sweeps
   in on scroll. Use at most once per section, never on body copy.
2. **Exhibits.** Arguments become numbered figures (`<Exhibit n="01" title
   note>`): a mono caption row over a hairline, a drawn diagram (SVG strokes
   with `data-draw` and `pathLength={1}`, bars with `data-grow`), and a mono
   note under it. Each page numbers its exhibits from 01. A diagram that is
   not data says "Illustrative." in its note.
3. **Giant serif numerals and statements.** Newsreader at very large sizes
   carries proof (30+, II, 59, 130) and the page headlines.
4. **Five rising bars.** The logo mark (signal strength, last bar in accent)
   rhymes with the five Prosci ADKAR stages (`AdkarBars`).
5. **Index labels.** Sections open with a mono label: `(03) Services`
   (`<Index n="03">`). Sentence case, never tracked uppercase.

## Color (semantic tokens; components never hard-code hex)

Every band sets a tone class: `tone-paper` (white), `tone-mist` (#F4F5F8),
or `tone-night` (#0B0D12). Inside, use only the semantic utilities:

| Token | Paper | Night | Use |
| --- | --- | --- | --- |
| `bg` / `surface` / `surface-2` | #FFF / #F4F5F8 / #ECEEF3 | #0B0D12 / #141823 / #1C2130 | grounds, cards, bars |
| `fg` | #0B0D12 | #F4F5F8 | headings, key text |
| `fg-2` | #3A3F4C | #C3C8D4 | body, leads |
| `fg-3` | #5B6173 (6.2:1) | #959BAD (7:1) | captions, labels |
| `rule` / `rule-strong` | #DADDE4 / #B9BDC8 | #262B39 / #3A4052 | hairlines |
| `accent` | #2348F5 (6.3:1) | #86C1FF (10.3:1) | links, data line, index numbers |
| `mark` | #86C1FF | #86C1FF | highlighter (text on it is always ink) |

Rhythm down a page alternates paper and mist with one or two night bands
for weight. Pages end with `<Closing />` (mist) before the night footer.
Do not add new colors. No gradients except image scrims.

## Type

- `serif` utility = Newsreader (variable, optical size auto). Weight 400.
  For headings and statements. Italic only for one-word emphasis inside
  exhibits.
- Body = Geist. `label` utility = Geist Mono 13px for index labels,
  captions, metadata, axis ticks.
- Scale utilities: `text-hero`, `text-display`, `text-h1` (inner page h1),
  `text-h2` (section heads), `text-h3`, `text-h4`, `text-lead`, `text-body`,
  `text-small`, `text-label`.
- One `h1` per page. Headings are sentence case. Measure for body: 34 to 40rem.

## Layout

- `wrap` (max 92rem, fluid gutter), `wrap-narrow` (64rem), `grid-12`.
- Breakpoints: 640, 900 (nav collapses), 1200. Use `min-[900px]:` style
  arbitrary variants as the existing components do.
- Vertical rhythm: `band` for full sections, `band-tight` for minor ones.
- Typical section head: index label + h2 on the left (cols 1 to 6), lead on
  the right (cols 8 to 12, nudged down `pt-14`), content below separated by a
  1px `border-fg` rule.
- Lists of items are rows separated by hairlines, not boxed cards. Cards
  only for things that are objects (documents, a form).

## Motion (all progressive enhancement)

`MotionRoot` adds `is-in` to elements as they enter the viewport:

- `data-reveal` (rise and fade), `data-reveal="fade"`; stagger with
  `style={{ "--d": ms }}`.
- `<Lines lines={[...]} as="h2">` sets a heading line by line, each rising
  from a clip.
- `data-observe` on a container plays its children's `data-draw`,
  `data-fade`, `data-grow`, `data-grow-x` once.
- Hover: `.btn` fills rise from below; `<Arrow>` slides through; `.link`
  redraws its underline; index rows slide 8px and draw a blue rule.
- Everything is off under `prefers-reduced-motion`, and nothing is hidden
  without the `html.js` flag. Never hide content behind interaction alone.

## Components

- `ui/Button` (pill; `variant` primary or secondary; `size` sm, md, lg;
  external links get the up-right arrow), `ui/Arrow`, `ui/Mark`,
  `ui/Lines`, `ui/Index`, `ui/Exhibit`, `ui/Logo`.
- `site/PageHero` (inner page opening), `site/Closing` (the ask),
  `site/Talk` (click-to-load video), `site/Header`, `site/Footer`,
  `site/MobileCta`.
- `exhibits/AdoptionGap`, `exhibits/AdkarBars`, `exhibits/DocStack`
  (Advanta365 document covers, `DocCover` for one).

## Accessibility (WCAG 2.1 AA is the floor)

AA contrast on every pair (tokens above are checked), one h1, skip link,
landmarks, visible focus (2px accent outline), 44px targets, labelled
controls, `aria-hidden` on decorative numerals and drawings with a text
equivalent nearby (or `role="img"` + `aria-label`), no motion that cannot be
paused, no horizontal scroll from 360px up.

## Copy rules

See `PRODUCT.md` (brand voice and facts) and `docs/CONTENT.md`. No em dashes.
"Microsoft 365" with a non-breaking space in visible copy. Never invent
facts, results, statistics, testimonials, or headcount. Never publish the
Advanta365 price on this site.
