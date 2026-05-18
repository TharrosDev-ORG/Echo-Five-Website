# Echo-Five Website

Marketing site for Echo-Five Consulting — change management with a Microsoft 365
specialty for government and public-sector clients.

## Status

V1 with placeholder content. All filler copy lives in a top-of-file `COPY`
constant inside each section component for trivial later swaps.

## Stack

- Next.js 16 (App Router) + React 19
- TypeScript (strict)
- Tailwind CSS v4
- `next/font` for Inter + Fraunces

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run typecheck  # tsc --noEmit
```

## Deploy

Vercel auto-detects Next.js. Push to `main` and connect the repo. Point the
`echo-five.ca` DNS at Vercel once the project is connected.

## Where to swap real content

Each section in `components/sections/*.tsx` exports a `COPY` constant at the
top of the file. Swap the strings there — no JSX edits required for copy
changes.

## Specs

See `docs/superpowers/specs/2026-05-18-echo-five-landing-design.md`.
