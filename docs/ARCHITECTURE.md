# Architecture

Next.js 16 App Router, statically generated. Eight content pages, the 404 and error pages,
a generated share card, and one API route.

## Rendering

- Every page is a server component, prerendered at build time.
- Client components are limited to what needs the browser:

| Component | Why it is a client component |
| --- | --- |
| `site/Header` | scroll state (frosted, hide on scroll down), active route, mobile menu dialog |
| `site/MobileCta` | shows after the first screen on phones; hidden on `/contact` |
| `site/Talk` | click-to-load YouTube facade (`youtube-nocookie.com`) |
| `home/ClientMarquee` | pause and play control for the scrolling client names |
| `motion/MotionRoot` | one IntersectionObserver that adds `is-in` to scroll-in elements |
| `contact/ContactForm` | submission, validation, focus management, email fallback |
| `approach/*` | the ADKAR sequence tracks the active stage while scrolling |

Interactive pieces render complete, readable content without JavaScript.

## Motion

`app/layout.tsx` runs a tiny inline script before paint that adds `js` to `<html>`. All
hide-then-reveal styles are scoped to `.js` and to `prefers-reduced-motion:
no-preference`, and the script removes `js` again after 2.5 seconds if the app never
boots (`MotionRoot` adds `reveal-ready`). So content is never stuck hidden.

Attributes `MotionRoot` watches: `data-reveal`, `data-lines` (from `ui/Lines`),
`data-sweep` (from `ui/Mark`), `data-observe` (figures), plus `data-draw`, `data-fade`,
`data-grow`, `data-grow-x` inside an observed figure. See `DESIGN.md`.

`app/template.tsx` gives each page a short enter transition.

## Contact form

`ContactForm` POSTs JSON to `/api/contact`. Validation rules live once in
`lib/contact.ts`: the form runs them for instant feedback, the route runs them again as
the authority. The route rejects cross-origin posts and oversized bodies, throttles each
IP to 5 messages per 10 minutes (in memory, per server instance), drops honeypot
submissions silently, and sends via Resend. Without `RESEND_API_KEY` it returns
`503 { fallback: true }` and the form shows the email address instead.

## Content flow

`lib/content/*.ts` and `lib/site.ts` are the single source of truth. Components import
named objects and render them. To change wording, edit data, never markup.

## Styling

Tailwind v4. `app/globals.css` holds the tone variables (`tone-paper`, `tone-mist`,
`tone-night`) in `@layer base`, the semantic color and type tokens in `@theme`, and the
house components (`.btn`, `.mark`, `.link`, `.field`, `.marquee`, motion) in
`@layer components`, so Tailwind utilities can always override them.

## Redirects

`/product` (the old Advanta365 page) redirects permanently to `/advanta365`
(`next.config.ts`).
