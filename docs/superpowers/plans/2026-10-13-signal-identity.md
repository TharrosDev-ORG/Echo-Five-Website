# "Signal" Identity Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the "Spruce & Citron" identity with the black, white, and electric-blue "Signal" identity and re-composed layouts across all six routes, without changing copy, routes, or the contact API.

**Architecture:** Tokens and surface variables in `app/globals.css` drive every color, so Task 2 swaps the palette for the whole site at once and later tasks re-compose layouts on top. A new `SignalRail` primitive inside `Section` draws the motif with CSS scroll-driven animation. A Playwright check script (no repo dependency; uses the preinstalled global Playwright) is the test suite: each task adds the checks that prove it.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript strict, Tailwind CSS v4 (`@theme`), `next/font/local`, CSS only for motion. Playwright 1.56 (global, `/opt/node-tools/node_modules`) for checks.

**Spec:** `docs/superpowers/specs/2026-10-13-signal-identity-design.md` (read it; exact hex values, scale, and per-page layouts live there). Older content rules: `docs/superpowers/specs/2026-10-13-site-overhaul-design.md`.

## Global Constraints

- No new runtime or dev dependencies in `package.json`. Bricolage Grotesque ships as a committed woff2 file.
- All marketing copy stays in `lib/content.ts` / `lib/site.ts`. The only content addition is the display-only `mark` field on `proofStrip` items: `"30+"`, `"II"`, `"ADKAR"`, `"365"`.
- No em dashes in any user-visible string or metadata. No "X, not Y" constructions in new copy.
- `app/api/contact/route.ts`, `lib/contact.ts`, and the `ContactForm` state machine are not modified (styling classes only).
- Everything visible without JS: default CSS state is final state; motion only under `html.js` and `@media (prefers-reduced-motion: no-preference)`.
- Never wrap above-the-fold hero content in `Reveal`.
- WCAG 2.1 AA: text 4.5:1, large text (24px+, or 18.66px+ at 700) and UI 3:1. `#2F5BFF` never used for small text on `#0A0A0B`; use `blue-l` `#6E8CFF`.
- 44px minimum tap targets; one `h1` per page; decorative SVG `aria-hidden`.
- No horizontal overflow at 360, 390, 768, 1024, 1440.
- Header and mobile CTA bar breakpoint stays 900px. Rail breakpoint is 1024px.
- Before every commit: `npm run lint && npm run typecheck && npm run build` pass.

## How to run the checks

One-time per session: `npm ci`.

```bash
npm run build && (npx next start -p 3100 > /tmp/next.log 2>&1 &) && sleep 4
npm run check:ui                     # all checks
npm run check:ui -- --only=rail,contrast
npm run check:ui -- --shots          # also writes .screenshots/<route>-<width>.png
npm run check:copy
```

Restart the server after each rebuild (`pkill -f "next start"`). Review screenshots by reading the PNGs.

## Review Focus

1. **Long words and 360px phones:** the `text-mega` headline and giant numerals ("ADKAR", "10,000") must wrap or fit, never clip. Pinned by `hero-fit` and `no-overflow` (Tasks 1, 6, 8).
2. **Browsers without scroll-driven animation (Firefox) and no-JS visitors:** the rail must be fully drawn, not stuck at `scaleY(0)`. Pinned by `nojs-visible` and `rail-static` (Task 4).
3. **Header over dark heroes:** the header switches to dark only where the page opens on black (`/`, `/product`); on every other route it must stay light, including after client navigation from `/` to `/about`. Pinned by `header-tone` (Task 5).
4. **Blue band text:** every text node on `.surface-blue` must be solid white or `blue-d` on white; any translucent white fails AA. Pinned by `contrast` (Tasks 1, 5).
5. **Keyboard focus on blue-flooded index rows:** focus ring must stay visible when the row background is `--accent-fill` (ring color switches to `--on-accent`). Pinned by `index-row-focus` (Task 3).

---

### Task 1: Check harness

**Files:**
- Create: `scripts/check-ui.mjs`, `scripts/check-copy.mjs`
- Modify: `package.json` (scripts), `.gitignore` (already ignores `.screenshots`)

**Interfaces:**
- Produces: `check-ui.mjs` exports nothing; it holds a `checks` array of
  `{ name: string, mode: "js" | "nojs" | "reduced", widths: number[], routes: string[], run(page, { route, width }): Promise<string[]> }`
  (returned strings are failures). CLI flags: `--only=a,b`, `--shots`. Env `BASE_URL` (default `http://localhost:3100`). Exits 1 if any failure. Later tasks append entries to `checks`.
- Constants: `ROUTES = ["/", "/services", "/approach", "/product", "/about", "/contact", "/missing-page"]`, `WIDTHS = [360, 390, 768, 1024, 1440]`, viewport height 900.
- `check-copy.mjs` holds `rules: { name, files: glob-ish dir list, pattern: RegExp }[]`; prints `file:line` per hit; exits 1 on any hit.

- [ ] **Step 1: Write `scripts/check-ui.mjs`** with `require` via `createRequire` resolving `playwright` from `process.env.NODE_PATH`; launch chromium once; one browser context per mode (`nojs`: `javaScriptEnabled: false`; `reduced`: `reducedMotion: "reduce"`). Before `run`, scroll to bottom in 400px steps then back to top (so reveals fire). Initial checks:
  - `no-overflow` (js, all widths, all routes): `document.documentElement.scrollWidth <= document.documentElement.clientWidth`.
  - `one-h1` (js, [1440], all routes): `document.querySelectorAll("h1").length === 1`.
  - `nojs-visible` (nojs, [390, 1440], all routes): every `[data-reveal]` has computed `opacity === "1"`.
  - `contrast` (reduced, [390, 1440], all routes): for each visible element not inside `[aria-hidden="true"]` that has a direct non-whitespace text node, composite its `color` (with alpha) over the first ancestor with an opaque-enough `background-color` (alpha > 0; composite stacked translucent layers; skip the element if an ancestor in between has a `background-image` other than `none`); WCAG ratio must be >= 4.5, or >= 3 when font-size >= 24px or (>= 18.66px and weight >= 700). Report at most 10 failures per page as `"<route>@<width> <tag>.<class> '<text 30 chars>' ratio=<x>"`.
- [ ] **Step 2: Write `scripts/check-copy.mjs`** with rule `em-dash`: dirs `app`, `components`, `lib`; pattern `/—|\\u2014/`.
- [ ] **Step 3: Add scripts** to `package.json`: `"check:ui": "NODE_PATH=/opt/node-tools/node_modules node scripts/check-ui.mjs"`, `"check:copy": "node scripts/check-copy.mjs"`.
- [ ] **Step 4: Run against the current site.** Build, start, `npm run check:ui && npm run check:copy`. Expected: PASS on the Spruce & Citron baseline. If `contrast` reports real failures in the current site, note them in the commit message; do not fix them here (later tasks restyle those elements).
- [ ] **Step 5: Commit** `git add scripts package.json && git commit -m "Add UI and copy check scripts"`

### Task 2: Palette, type, and surfaces

**Files:**
- Create: `app/fonts/BricolageGrotesque-Variable-latin.woff2` (download `https://cdn.jsdelivr.net/npm/@fontsource-variable/bricolage-grotesque@5.3.0/files/bricolage-grotesque-latin-wght-normal.woff2`)
- Modify: `app/globals.css` (`@theme`, surface blocks, base, `.surface-*`, `.link`, `.skip-link`, `.field*`, print), `app/layout.tsx` (font, `themeColor`), `components/ui/Section.tsx`
- Modify (remove `texture` usage only): `app/approach/page.tsx`, `components/home/AdvantaBand.tsx`, `components/product/Pricing.tsx`, `components/services/PairWithAdvanta.tsx`, `components/site/CtaBand.tsx`, `components/site/PageHero.tsx`, `components/about/FounderCard.tsx`

**Interfaces:**
- Produces Tailwind colors: `black`, `black-2`, `white`, `mist`, `ink`, `ink-2`, `ink-3`, `line`, `line-strong`, `line-dark`, `line-dark-strong`, `line-input`, `blue`, `blue-d`, `blue-l`, `on-dark`, `on-dark-2`, `danger` (hex values: spec "Color").
- Produces surface utilities (existing names kept): `text-fg`, `text-fg-2`, `text-fg-3`, `text-accent`, `bg-accent`, `border-accent`, `text-on-accent`, `border-edge`, `border-edge-strong`, `bg-raised`, `bg-sheet`; plus new `bg-accent-fill` / `stroke-accent-fill` / `fill-accent-fill` (`--color-accent-fill: var(--accent-fill)`) and `--accent-hover`. Values per ground: spec "Surface tokens".
- Produces classes `.surface-light`, `.surface-alt` (bg `mist`), `.surface-dark` (bg `black`), `.surface-blue` (bg `blue`), and `[data-tone="light" | "dark" | "blue"]`.
- Produces `Section` props: `tone?: "light" | "alt" | "dark" | "blue"`; `texture` prop removed. `toneClass` gains `blue: "surface-blue"`.
- Produces text utilities `text-mega`, `text-display`, `text-h1`, `text-h2` (new values from spec "Typography"); `text-h3`, `text-lead`, `text-body`, `text-small`, `text-label` unchanged.
- Produces radii `rounded-control` 4px, `rounded-card` 8px, `rounded-panel` 0.
- Font variable `--font-bricolage`; `--font-display: var(--font-bricolage), ui-sans-serif, system-ui, sans-serif`.

- [ ] **Step 1: Add check `tokens`** (js, [1440], ["/"]): body computed `background-color === "rgb(255, 255, 255)"`; a probe `<span style="color:var(--accent)">` appended to `body` computes `rgb(47, 91, 255)`; the same probe inside the first `.surface-dark` computes `rgb(110, 140, 255)`; `getComputedStyle(h1).fontFamily` includes `Bricolage`.
- [ ] **Step 2: Run** `npm run check:ui -- --only=tokens`. Expected: FAIL (body is `rgb(246, 248, 247)`).
- [ ] **Step 3: Implement.** Replace the palette and surface blocks with the spec values; `--card-shadow` and `--card-shadow-hover` become `none`; delete `.texture` and its `::before/::after`; `::selection` bg `blue`, color white; body bg `white`; `.skip-link` bg `black`, focus outline `blue-l`; `.field` focus border `blue` with `0 0 0 3px rgb(47 91 255 / 0.25)`; `.field[aria-invalid]` uses `danger` `#B42318`; print block maps dark grounds to ink/blue. `localFont` `src: "./fonts/BricolageGrotesque-Variable-latin.woff2"`, `variable: "--font-bricolage"`, `weight: "500 800"`. `viewport.themeColor: "#FFFFFF"`. Base `h1..h4` weight 700. Remove every `texture` prop/class from the files listed.
- [ ] **Step 4: Run** `npm run check:ui` (all checks). Expected: PASS, including `contrast` on every route. Fix any contrast failure the palette swap exposes (most likely hard-coded `text-ink-3` on dark, or `text-accent` small text) in place.
- [ ] **Step 5: Commit** `git commit -m "Swap to Signal palette, Bricolage display type, and blue surface"`

### Task 3: Primitives

**Files:**
- Modify: `components/ui/Button.tsx`, `components/ui/Card.tsx`, `components/ui/Stat.tsx`, `components/ui/SectionHeading.tsx`, `components/ui/Badge.tsx`, `app/globals.css` (`.btn*`, `.card*`, `.link`)
- Create: `components/ui/IndexList.tsx`

**Interfaces:**
- Consumes: Task 2 surface tokens.
- Produces `Button` prop `tone?: "light" | "dark" | "blue"` (sets `data-tone`). All other props unchanged.
- Produces `Stat` prop `size?: "md" | "lg" | "mega"`; `mega` renders the value as `<p class="stat-mega text-mega tabular-nums">`.
- Produces `SectionHeading` prop `index?: string` (e.g. `"01"`), rendered before the eyebrow as `<span aria-hidden="true" class="text-label tabular-nums text-fg-3" data-heading-index>`; also prop `stroke?: boolean` (default `true`) that renders `<span aria-hidden="true" data-rail-stroke class="mb-6 block h-px w-10 bg-accent-fill lg:hidden">` above the title; pass `stroke={false}` for nested sub-headings (e.g. `size="h3"` inside a section).
- Produces `IndexList({ items, className }: { items: IndexItem[]; className?: string })` and `type IndexItem = { href: string; index: string; title: string; body?: string; tag?: string; external?: boolean }`. Renders `<ol>` of rows; each row is a single `<a>`/`Link` with class `index-row`; title is `h3.text-h3`.

- [ ] **Step 1: Add check `index-row-focus`** (js, [1440], ["/", "/product"]): if the page has no `.index-row`, return `[]` (rows arrive in Tasks 6 and 8). Otherwise focus the first `.index-row` via keyboard (`page.keyboard.press("Tab")` until `document.activeElement.classList.contains("index-row")`, max 60 presses), assert computed `outline-style !== "none"` and outline color contrast >= 3 against the row's computed background.
- [ ] **Step 2: Implement.**
  - `.btn`: radius `--radius-control`; primary background is `linear-gradient(var(--accent-hover), var(--accent-hover)) no-repeat left / 0% 100%, var(--accent-fill)`; hover sets `background-size: 100% 100%`; transition `background-size 200ms var(--ease-out-soft)`; text `--on-accent`. Secondary: 1px `--edge-strong`, hover `background: var(--fg); color: var(--raised)` (black on white, white on black, white with blue-d text on blue). Arrow nudge 3px. On `[data-tone="blue"]`/`.surface-blue`: primary fill white, text `blue-d`.
  - `.card`: 8px radius, no shadow, no hover lift; `a.card:hover` border `--edge-strong`. `.card-panel` radius `--radius-card` (8px).
  - `.link`: `text-decoration: none; background: linear-gradient(currentColor,currentColor) no-repeat 0 100% / 100% 1px`; hover animates to 2px; under reduced motion no transition (global rule covers it).
  - `.index-row`: grid `[4rem_1fr_auto]` from 768px (index, title+body, tag+arrow), stacked below; `border-top: 1px solid var(--edge)`, last row also bottom border; min-height 44px; padding 1.5rem 0; hover and `:focus-visible` set `background: var(--accent-fill); color: var(--on-accent)` and descendants inherit (`.index-row *` color `inherit`); `:focus-visible` `outline-color: var(--on-accent); outline-offset: -4px`. Arrow slides from `translateX(-8px) opacity 0` to rest on hover (visible at rest on touch: `@media (hover: none)` keeps it shown).
  - `Badge`: stays `rounded-full`; 1px `--edge-strong` border, `text-fg` label, no tinted fill.
- [ ] **Step 3: Run** `npm run check:ui`. Expected: PASS (`index-row-focus` returns empty until rows exist).
- [ ] **Step 4: Commit** `git commit -m "Restyle primitives and add IndexList"`

### Task 4: Signal rail

**Files:**
- Create: `components/ui/SignalRail.tsx`
- Modify: `components/ui/Section.tsx`, `app/globals.css` (new `.signal-rail` block plus motion), `components/ui/Container.tsx` only if a gutter variable is needed

**Interfaces:**
- Produces `SignalRail(): JSX.Element`: `<span aria-hidden="true" data-rail class="signal-rail"><span class="signal-rail-line" /><span class="signal-rail-node" /></span>`.
- Produces `Section` prop `rail?: boolean` (default `true` for `tone` light/alt/dark, `false` for `blue`). When true, Section renders `SignalRail` as a direct child of `<section>` (outside the Container, so `left` is measured from the viewport edge), and the section gets `position: relative`.
- Geometry contract (CSS): from 1024px, `.signal-rail` is `position: absolute; top: 0; bottom: 0; left: calc(var(--rail-x))` where `--rail-x` is a single value set on `:root` = `max(1rem, (100vw - var(--container-site)) / 2 - 2.5rem)` clamped so it sits in the gutter (min 0.75rem). Line 1px wide, `background: var(--accent-fill)`, `transform-origin: top`. Node: 9px circle, 1px ring `--accent-fill`, 3px filled center, centered on the line at `top: var(--rail-node-y)`; Section sets `--rail-node-y` per spacing preset (desktop top padding + 0.75rem): `sm` 4.75rem, `md` 6.75rem, `lg` 8.75rem, `none` 0.75rem. At 1440 this puts the rail 72px from the viewport edge and 72px left of the content; at 1024 it is 16px from the edge and 16px left of the content. Below 1024px `.signal-rail { display: none }`.

- [ ] **Step 1: Add checks.**
  - `rail` (js, [1440], ["/", "/services", "/about"]): every `[data-rail]` with `display !== "none"` has `.signal-rail-line` width `1px`; all their `getBoundingClientRect().left` values differ by <= 0.5px; there are >= 3 rails per route.
  - `rail-mobile` (js, [390], same routes): every `[data-rail]` computed `display === "none"`; at least one `[data-rail-stroke]` is visible with width `40px`.
  - `rail-static` (reduced and nojs, [1440], ["/"]): every `.signal-rail-line` computed `transform` is `none` or `matrix(1, 0, 0, 1, 0, 0)`.
- [ ] **Step 2: Run** `npm run check:ui -- --only=rail,rail-mobile,rail-static`. Expected: FAIL (`rail`: 0 rails).
- [ ] **Step 3: Implement** `SignalRail` and the `Section` prop; CSS draw-in:
  ```css
  @supports (animation-timeline: view()) {
    @media (prefers-reduced-motion: no-preference) {
      html.js .signal-rail-line {
        animation: rail-draw linear both;
        animation-timeline: view();
        animation-range: entry 0% cover 50%;
      }
    }
  }
  @keyframes rail-draw { from { transform: scaleY(0); } to { transform: scaleY(1); } }
  ```
  Ensure no content in the gutter overlaps the rail at 1024px (Container gutter is 32px there; the rail sits at `max(...)`, verify with screenshots).
- [ ] **Step 4: Run** the three checks plus `no-overflow`, `nojs-visible`. Expected: PASS. Take `--shots` at 1024 and 1440 for `/` and confirm the rail reads as one column across sections.
- [ ] **Step 5: Commit** `git commit -m "Add signal rail to sections"`

### Task 5: Brand mark and site chrome

**Files:**
- Modify: `components/site/Logo.tsx`, `public/favicon.svg`, `components/site/Header.tsx`, `components/site/MobileCtaBar.tsx`, `components/site/CtaBand.tsx`, `components/site/Footer.tsx`, `components/site/PageHero.tsx`, `components/site/Talk.tsx`, `app/opengraph-image.tsx`, `app/globals.css` (header, drawer, mobile-cta, footer blocks)

**Interfaces:**
- Produces `LogoMark({ size = 32 }: { size?: number })`: 32x32 viewBox, no background tile; five horizontal bars, x = 4, heights 3, widths `[24, 19, 14, 9, 4]`, y `[6, 11, 16, 21, 26]` (centered rows), `rx="1.5"`, `fill="currentColor"` with class `text-accent-fill`. `tone` prop removed; callers drop it.
- `Logo({ className, onClick })`: wordmark Bricolage 700, `text-fg`; `tone` prop removed.
- `PageHero` props unchanged; `tone: "light" | "dark"`. Adds `data-hero-tone={tone}` on the `<header>`.
- `Header` reads the first `[data-hero-tone]` on mount and on `pathname` change and sets `data-over-dark` on `.site-header` while `window.scrollY` is less than that hero's height minus header height and its tone is `dark`.
- `CtaBand` renders `.surface-blue`, heading `text-display`; buttons `tone="blue"` (primary white fill, secondary white outline).
- `PageHero` light variant: white ground, `border-b border-edge`, title `text-h1 max-w-[16ch]`; it renders `SignalRail` (Task 4) so inner pages start the line at the title.
- Footer: `surface-dark`, existing columns, then a final `<p aria-hidden="true" class="footer-wordmark">Echofive</p>` in `text-mega`, `leading-[0.8]`, `text-fg`, clipped to the container (`overflow: hidden`), above the trademark row.

- [ ] **Step 1: Add check `header-tone`** (js, [1440]): on `/` at scrollY 0 `.site-header` has attribute `data-over-dark`; on `/about` it does not; after `page.goto("/")` then clicking the `About` nav link and waiting for URL `/about`, it does not. Contrast check continues to cover CtaBand text.
- [ ] **Step 2: Run** `npm run check:ui -- --only=header-tone`. Expected: FAIL.
- [ ] **Step 3: Implement** the interfaces above and these styles: header default white 90% with blur, scrolled border `--color-line`; `[data-over-dark]` background `rgb(10 10 11 / 0.6)`, nav links `on-dark-2`, hover `on-dark`, current-page underline `blue-l`, logo color white, menu button border `line-dark-strong`. Drawer: `background: var(--color-black)`, `.drawer-link` in `text-display`, color white, current `blue-l`, border `line-dark`. Mobile CTA bar `rgb(10 10 11 / 0.96)`. Talk: replace `spruce`/`citron` classes with `black` panel, 0 radius, play button `bg-blue text-white`. OG image: background `#0A0A0B`, headline white then `#6E8CFF`, mark drawn as five bars in `#2F5BFF`, muted `#A1A1AA`. Favicon: same bars on a `#0A0A0B` 32px tile with `rx="6"`.
- [ ] **Step 4: Run** full `npm run check:ui` with `--shots`. Expected: PASS. Inspect `/`-390 and `/`-1440 screenshots: header legible over black hero, footer wordmark not clipped vertically.
- [ ] **Step 5: Commit** `git commit -m "Signal brand mark, header, drawer, CTA band, footer, OG image"`

### Task 6: Home page

**Files:**
- Modify: `app/page.tsx`, `lib/content.ts` (`proofStrip` type and `mark` values only), `components/home/ProofStrip.tsx`, `components/home/ClientMarquee.tsx`, `components/home/WhyRolloutsStall.tsx`, `components/site/StallPoints.tsx`, `components/home/ServicesOverview.tsx`, `components/home/AdkarTeaser.tsx`, `components/home/AdvantaBand.tsx`, `components/illustrations/AdoptionCurve.tsx`, `components/illustrations/AdkarPath.tsx`, `components/illustrations/ToolkitStack.tsx`, `components/site/TalkSection.tsx`, `components/ui/Marquee.tsx` (classes only), `app/globals.css` (hero mask, illustration draw on reveal)

**Interfaces:**
- Consumes: `IndexList`/`IndexItem` (Task 3), `Stat size="mega"` (Task 3), `SectionHeading index` (Task 3), `Section tone/rail` (Tasks 2, 4).
- Produces `proofStrip: { mark: string; value: string; label: string; icon: IconName }[]` with marks in order `"30+"`, `"II"`, `"ADKAR"`, `"365"`.
- Produces `AdoptionCurve({ className, variant = "panel" }: { className?: string; variant?: "panel" | "bleed" })`; `bleed` uses a wider viewBox `0 0 1200 240` with the same curve shape scaled to it, no grid lines, waypoint letters 20px, stroke `--accent-fill` 2px.
- Produces `PageHero` prop `size?: "page" | "display" | "mega"` (`mega` = `text-mega`, `max-w-none`). Hero headline lines get class `hero-line` with `--i` index.
- CSS: for `AdkarPath` and `PhaseTrack`, `.illo-draw` / `.illo-pop` animate only under `html.js [data-revealed]` (no-preference), with `html.js [data-reveal]:not([data-revealed]) .illo-draw { stroke-dashoffset: 1 }` so there is no drawn-then-redrawn flash; the hero `AdoptionCurve` keeps its on-load animation.
- CSS: `[data-reveal]` changes to a 16px rise and 600ms (spec "Motion"). Mega numerals: `html.js [data-reveal]:not([data-revealed]) .stat-mega { clip-path: inset(0 0 100% 0); transform: translateY(0.25em) }`, transitioning `clip-path, transform` 600ms on reveal (`Stat size="mega"` adds class `stat-mega` in Task 3). `.hero-line` mask reveal: under `html.js` + no-preference, `animation: hero-rise 600ms var(--ease-out-soft) both; animation-delay: calc(var(--i) * 80ms)` with keyframes `from { clip-path: inset(0 0 100% 0); transform: translateY(0.3em) }`.

- [ ] **Step 1: Add check `hero-fit`** (js, [360, 390], ["/"]): every element inside `h1` has `getBoundingClientRect().right <= innerWidth - 15.5`, and `h1` computed font-size >= 48px.
- [ ] **Step 2: Run** `npm run check:ui -- --only=hero-fit`. Expected: FAIL (current floor is 36px).
- [ ] **Step 3: Implement** the home layout exactly as spec "Pages > Home" items 1 to 9: hero `size="mega"` with `AdoptionCurve variant="bleed"` full container width below the actions and `hero.facts` row (4 columns from 1024px, 2 below, separated by `border-edge` left borders); proof marks via `Stat size="mega"` in a 12-column asymmetric grid (`lg:col-span-3`, offsets `lg:col-start-1/4/7/10` with alternating `lg:mt-16`); clients marquee items in `text-h2 font-semibold` with a 6px blue dot separator; why section on `tone="alt"` with sticky left heading and `StallReasonList` rendered as large numbered statements (no cards: `font-display text-h2` index in `text-accent`, `border-t border-edge` per item); services via `IndexList` built from `services.items` (`href: /services#slug`, `index: "01".."06"`, `title`, `body`, `tag`); ADKAR teaser with five `text-mega` letters over `AdkarPath` inside a `Reveal`; Advanta band counts via `Stat size="mega" accent`; `ToolkitStack` colors from tokens (`text-accent-fill` strokes, white/black fills); Talk section on white.
- [ ] **Step 4: Run** full `npm run check:ui -- --shots`. Expected: PASS. Inspect `/` at 360, 768, 1440.
- [ ] **Step 5: Commit** `git commit -m "Recompose home page for Signal"`

### Task 7: Services and Approach

**Files:**
- Modify: `app/services/page.tsx`, `components/services/ServiceDetails.tsx`, `components/services/ServiceJumpNav.tsx`, `components/services/PairWithAdvanta.tsx`, `app/approach/page.tsx`, `components/approach/AdkarStepper.tsx`, `components/approach/AdkarStepper.module.css`, `components/approach/AdkarGlance.tsx`, `components/approach/EngagementSteps.tsx`

**Interfaces:**
- Consumes: `IndexList`, `SectionHeading index`, `StallReasonList` (Task 6 restyle), `AdkarPath` reveal draw (Task 6).
- `AdkarStepper` keeps its tablist markup, ids, keyboard handling, and no-JS list fallback unchanged; only classes and the active-letter display change (active letter shown in `text-mega text-accent` beside the panel from 1024px).

- [ ] **Step 1: Add check `adkar-tabs`** (js, [1440], ["/approach"]): focus the first `[role="tab"]`, press `ArrowRight` twice, assert the third tab has `aria-selected="true"` and its controlled `[role="tabpanel"]` is visible. (Guards the restyle against breaking behavior; it should pass before and after.)
- [ ] **Step 2: Run** it. Expected: PASS on the current code.
- [ ] **Step 3: Implement** spec "Pages > Services" and "Pages > Approach": jump nav sticky from 1024px (`lg:sticky lg:top-[calc(var(--header-h)+2rem)]`) as a plain list with `index` numbers, six `ServiceDetails` sections each with `SectionHeading index="0n"`; `PairWithAdvanta` as a `surface-dark` 0-radius panel; Approach `adkar` section `tone="dark"` (no texture), `EngagementSteps` as numbered rows with `border-t border-edge` and `text-h2` numerals.
- [ ] **Step 4: Run** full `npm run check:ui -- --shots`. Expected: PASS. Inspect `/services` and `/approach` at 390 and 1440.
- [ ] **Step 5: Commit** `git commit -m "Restyle Services and Approach pages"`

### Task 8: Advanta365 page

**Files:**
- Modify: `app/product/page.tsx`, `components/product/*.tsx` (all nine), `components/illustrations/PhaseTrack.tsx`

**Interfaces:**
- Consumes: `Stat size="mega"`, `IndexList`, `PageHero tone="dark"`.
- `PhaseTrack` props unchanged. From 768px the connecting line is one continuous 1px `--accent-fill` line through all node centers (single absolutely positioned element on the `<ol>`, not per-item segments), drawn with `illo`-style `scaleX` on reveal; nodes are 9px rail-style nodes with the number in `text-label` above; vertical on phones aligned to a left 1px line.
- `FreeSamples` renders `IndexList` items: `{ href: advanta.urls.samples, external: true, index: "01".."06", title, tag: format, body: detail }`.

- [ ] **Step 1: Add check `phase-line`** (js, [1440], ["/product"]): the `ol[aria-label]` rendered by PhaseTrack contains exactly one element with `[data-phase-line]`, whose rect spans from the first node center to the last node center within 2px.
- [ ] **Step 2: Run** it. Expected: FAIL (no `[data-phase-line]`).
- [ ] **Step 3: Implement** spec "Pages > Advanta365": counts as `Stat size="mega"` (on "130" and "59" check no wrap at 360), contents as a 3x2 grid of `border-edge` cells with shared borders (`gap-px bg-edge` technique), free samples as `IndexList`, purchase panel `surface-dark`, relationship note and disclaimer.
- [ ] **Step 4: Run** full `npm run check:ui -- --shots`. Expected: PASS. Inspect `/product` at 360 and 1440.
- [ ] **Step 5: Commit** `git commit -m "Restyle Advanta365 page with the phase line"`

### Task 9: About, Contact, 404, error

**Files:**
- Modify: `app/about/page.tsx`, `components/about/*.tsx`, `app/contact/page.tsx`, `components/contact/ContactForm.tsx` (classes only), `app/not-found.tsx`, `app/error.tsx`

**Interfaces:**
- `ContactForm` props, state, handlers, and `fetch` call unchanged; only `className` strings change. Form sits on a `surface-alt` panel.
- `CredentialGrid` renders an indexed list (index, title, issuer) with `border-t border-edge` rows; non-link rows use the same layout as `IndexList` but as `<li>` without `.index-row` hover.
- `not-found.tsx` shows `404` in `text-mega text-accent` (aria-hidden) above the existing heading copy.

- [ ] **Step 1: Add check `contact-form`** (js, [390, 1440], ["/contact"]): submit the empty form, assert at least one `.field[aria-invalid="true"]` and one visible `.field-error`; every `.field` has height >= 44px.
- [ ] **Step 2: Run** it. Expected: PASS on current code (behavior guard).
- [ ] **Step 3: Implement** spec "Pages > About", "Pages > Contact", and the 404/error lines. Founder monogram tile: `surface-dark`, 8px radius, `LogoMark size={40}` in a corner.
- [ ] **Step 4: Run** full `npm run check:ui -- --shots` (the `/missing-page` route covers 404). Expected: PASS.
- [ ] **Step 5: Commit** `git commit -m "Restyle About, Contact, and error pages"`

### Task 10: Cleanup, docs, final verification

**Files:**
- Delete: `app/fonts/InstrumentSans-Variable-latin.woff2`
- Modify: `scripts/check-copy.mjs`, `DESIGN.md`, `PRODUCT.md`, `README.md`

- [ ] **Step 1: Add copy rules**: `legacy-tokens` dirs `app`, `components`, `lib`, pattern `/spruce|citron|moss|paper-2|instrument|\btexture\b|card-shadow/i`; `old-years` dir `lib`, pattern `/20\+|\btwenty\b/i`; `advanta-claims` dir `lib`, pattern `/analytics|guardrail|week to week/i`.
- [ ] **Step 2: Run** `npm run check:copy`. Expected: FAIL only if leftovers exist; fix every hit (including comments mentioning old names).
- [ ] **Step 3: Rewrite docs.** `DESIGN.md` for Signal (same section headings as today: Color with measured contrast list from the spec, Surface tokens, Typography, Shape, Layout incl. rail geometry, Motion, Components incl. `SignalRail` and `IndexList`, Accessibility, Cascade note, Avoided on purpose). `PRODUCT.md` "Aesthetic direction" rewritten for Signal; add "Spruce & Citron" to anti-references with the reason in the spec; add the Bone & Cobalt and navy guardrail line. `README.md`: identity name, fonts (Bricolage Grotesque, Geist), and the two check scripts under Develop.
- [ ] **Step 4: Final verification.** `npm run lint && npm run typecheck && npm run build`, restart server, `npm run check:ui -- --shots && npm run check:copy`, all PASS. Review every screenshot (7 routes x 5 widths). Keyboard pass by hand in a headed-equivalent script is not available; instead confirm via the `adkar-tabs`, `index-row-focus`, `contact-form` checks plus a Tab-through of `/` asserting the skip link is the first focus stop. Lighthouse: try `npx -y lighthouse@12 http://localhost:3100/ --only-categories=performance,accessibility --form-factor=mobile --chrome-path=/opt/pw-browsers/chromium-*/chrome-linux/chrome --chrome-flags="--headless=new --no-sandbox" --output=json --quiet` for this branch and for `main` (checkout in a worktree, same commands); report both scores. If Lighthouse cannot be installed, say so in the PR body instead of claiming a score.
- [ ] **Step 5: Commit** `git commit -m "Remove Spruce & Citron leftovers; document Signal"`, push, update PR description with screenshots summary and Lighthouse results.
