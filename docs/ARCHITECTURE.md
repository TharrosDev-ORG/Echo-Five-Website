# Architecture

Next.js 16 App Router, statically generated. Five content pages and one API route.

## Rendering

- Every page is a server component and is prerendered at build time.
- Client components are limited to what needs the browser:

| Component | Why it is a client component |
| --- | --- |
| `site/Header` | scroll keyline, active route (`usePathname`), mobile dialog menu |
| `site/Reveal` | IntersectionObserver for entrance fades, re-armed per route |
| `blocks/Talk` | click-to-load YouTube facade (`useState`) |
| `contact/ContactForm` | submission, validation, focus management, email fallback |

- `app/layout.tsx` sets fonts, site-wide metadata, JSON-LD, the skip link, header,
  footer, and adds a `js` class before first paint so fade start-states never apply
  without JavaScript.
- `lib/metadata.ts` gives each inner page its own title, description, and canonical URL.
  The home page sets its canonical in `app/page.tsx`.

## Contact form

`ContactForm` POSTs JSON to `/api/contact`. Validation rules live once in
`lib/contact.ts`: the form runs them for instant feedback (and focuses the first invalid
field), the route runs them again as the authority. The route also rejects cross-origin
posts and bodies over 16K characters, throttles each IP to 5 messages per 10 minutes
(in-memory, so per server instance), drops honeypot submissions silently, and sends via
Resend. Configuration (env):

- `RESEND_API_KEY` — when absent, the route returns `503 { fallback: true }` and the form
  shows the owned-domain email address instead, so the site still works unconfigured.
- `CONTACT_TO` — destination address (defaults to `site.email`).
- `CONTACT_FROM` — verified sender (defaults to the Resend onboarding sender for dev).

## Content flow

`lib/content.ts` and `lib/site.ts` are the single source of truth. Components import named
objects (`hero`, `services`, `clients`, ...) and render them. To change wording, edit
data, never markup.

## Styling

Tailwind v4 with tokens in the `@theme` block of `app/globals.css`, plus named component
classes in the same file. See `DESIGN.md` for the system and the cascade gotcha.
