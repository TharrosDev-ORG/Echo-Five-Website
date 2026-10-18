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
the authority. `normalize()` NFC-normalizes every value, strips control, bidi-override
and zero-width characters, folds all line breaks (including U+2028/2029 and NEL) out of
single-line fields, and caps each field at `LIMITS`; `validate()` accepts only a plain
address (no display names, commas or quotes), so nothing a visitor types can add a mail
header or a second recipient.

The route accepts only `POST` (other methods get a JSON `405` with `Allow: POST`) and:

- rejects cross-site posts (`Sec-Fetch-Site` other than `same-origin`, or an `Origin`
  whose host is not `Host`) with `403`
- requires `Content-Type: application/json` (`415` otherwise), which also shuts out
  plain cross-site HTML forms
- throttles each client to 5 messages per 10 minutes (in memory, per server instance),
  `429` with `Retry-After`. The key is a platform-set header: on Vercel `x-real-ip`
  (the edge overwrites it); elsewhere the right-most `x-forwarded-for` entry, since the
  left-most is client-controlled
- streams the body and stops at 16 KB (`413`), rejects malformed UTF-8 and anything
  but a JSON object (`400`)
- drops honeypot submissions silently, returns `422 { errors }` for invalid fields,
  and sends via Resend. Without `RESEND_API_KEY` it returns `503 { fallback: true }`
  and the form shows the email address instead. Unexpected failures return a generic
  `500 { fallback: true }`; details go to the server log only.

## Security headers

`next.config.ts` sets them for every path. Pages are prerendered, so the
Content-Security-Policy is static (no nonces, which would force dynamic rendering):

- `script-src 'self' 'unsafe-inline'`. The App Router inlines its bootstrap and RSC
  payload scripts, which differ per page and per build, so they cannot be hashed; the
  pre-paint script in `app/layout.tsx` is covered by the same allowance. Dev adds
  `'unsafe-eval'` (React dev tooling) and `ws:` in `connect-src` (HMR).
- `style-src 'self' 'unsafe-inline'` for React `style` attributes; `img-src 'self' data:
  blob:` (the grain texture is a data URI); `font-src 'self'` (fonts are self-hosted).
- `frame-src https://www.youtube-nocookie.com` for the talk player. Its poster
  (`/talk-poster.jpg`) is self-hosted. Adding any other embed or third-party script
  means adding its origin here.
- `form-action 'self' mailto:`: the contact form's no-JavaScript fallback posts to a
  `mailto:` link.
- `object-src 'none'`, `base-uri 'self'`, `frame-ancestors 'none'` (with
  `X-Frame-Options: DENY`), `upgrade-insecure-requests` (production only).

Also `Cross-Origin-Opener-Policy: same-origin`, HSTS, `nosniff`, `Referrer-Policy`,
`Permissions-Policy`. `/api/*` overrides the CSP with `default-src 'none'` and sends
`Cache-Control: no-store`.

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
