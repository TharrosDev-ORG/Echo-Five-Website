# Echo-Five Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-page, static-friendly marketing site for Echo-Five Consulting (change management + Microsoft 365 specialist for government clients) with placeholder content, then push to `TharrosDev-ORG/Echo-Five-Website`.

**Architecture:** Next.js 16 App Router single route at `/`. Eight section components composed in `app/page.tsx`. Each section owns its filler copy as a top-of-file `COPY` constant for trivial later swaps. Tailwind v4 CSS-first theming via `@theme` in `globals.css`. No backend, no CMS, no animations beyond `IntersectionObserver`-driven fade-ins.

**Tech Stack:** Next.js 16, React 19, TypeScript (strict), Tailwind CSS v4, `next/font` (Inter + Fraunces), Node 20+.

**Spec:** `docs/superpowers/specs/2026-05-18-echo-five-landing-design.md`

**Verification model:** Static marketing pages don't benefit from unit tests — the TypeScript compiler + `next build` catches what matters, and the rest is visual. Each task verifies via `npx tsc --noEmit` and/or `npm run build`. The contact form's success state is the one real interaction; it's verified manually in dev.

---

## File Structure

```
Echo-Five-Website/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── Logo.tsx
│   ├── ScrollReveal.tsx
│   └── sections/
│       ├── Nav.tsx
│       ├── Hero.tsx
│       ├── About.tsx
│       ├── Services.tsx
│       ├── Approach.tsx
│       ├── Credentials.tsx
│       ├── Contact.tsx
│       └── Footer.tsx
├── public/favicon.svg
├── .gitignore
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tsconfig.json
└── README.md
```

---

### Task 1: Scaffold project (package.json, tsconfig, next config)

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.ts`
- Create: `postcss.config.mjs`
- Create: `.gitignore`
- Create: `next-env.d.ts`

- [ ] **Step 1: Create `package.json`**

```json
{
  "name": "echo-five-website",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "next": "^16.0.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4.0.0",
    "@types/node": "^22.0.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "tailwindcss": "^4.0.0",
    "typescript": "^5.6.0"
  }
}
```

- [ ] **Step 2: Create `tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 3: Create `next.config.ts`**

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
};

export default nextConfig;
```

- [ ] **Step 4: Create `postcss.config.mjs`**

```js
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
export default config;
```

- [ ] **Step 5: Create `.gitignore`**

```
node_modules
.next
out
.env*
!.env.example
.DS_Store
*.log
.vercel
next-env.d.ts
```

- [ ] **Step 6: Create `next-env.d.ts`**

```ts
/// <reference types="next" />
/// <reference types="next/image-types/global" />
```

- [ ] **Step 7: Install dependencies**

Run: `npm install` from `C:\Users\magnu\dev\Echo-Five-Website`
Expected: `node_modules` populated, no peer-dep errors that block install.

- [ ] **Step 8: Commit**

```bash
git init
git add -A
git commit -m "chore: scaffold Next.js 16 + Tailwind v4 + TS project"
```

---

### Task 2: Global styles and Tailwind v4 theme

**Files:**
- Create: `app/globals.css`

- [ ] **Step 1: Create `app/globals.css`**

```css
@import "tailwindcss";

@theme {
  --color-bg: #FAFAF7;
  --color-surface: #FFFFFF;
  --color-ink: #0F1A2E;
  --color-ink-muted: #475569;
  --color-accent: #1A2740;
  --color-accent-warm: #8C7A5B;
  --color-rule: #E5E2DA;

  --font-sans: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
  --font-serif: var(--font-fraunces), ui-serif, Georgia, serif;
}

@layer base {
  html {
    scroll-behavior: smooth;
  }
  body {
    background: var(--color-bg);
    color: var(--color-ink);
    font-family: var(--font-sans);
    font-feature-settings: "ss01", "cv11";
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }
  ::selection {
    background: var(--color-accent);
    color: var(--color-bg);
  }
}

@layer utilities {
  .container-tight {
    max-width: 72rem;
    margin-inline: auto;
    padding-inline: clamp(1.25rem, 4vw, 3rem);
  }
  .section-y {
    padding-block: clamp(5rem, 12vh, 10rem);
  }
  .reveal {
    opacity: 0;
    transform: translateY(12px);
    transition: opacity 700ms ease, transform 700ms ease;
  }
  .reveal[data-visible="true"] {
    opacity: 1;
    transform: translateY(0);
  }
  @media (prefers-reduced-motion: reduce) {
    .reveal { opacity: 1; transform: none; transition: none; }
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add app/globals.css
git commit -m "feat(styles): add Tailwind v4 theme tokens and base styles"
```

---

### Task 3: Root layout with fonts and metadata

**Files:**
- Create: `app/layout.tsx`

- [ ] **Step 1: Create `app/layout.tsx`**

```tsx
import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["SOFT", "WONK", "opsz"],
});

export const metadata: Metadata = {
  title: "Echo-Five Consulting — Change management for the public sector",
  description:
    "Echo-Five helps government and public-sector organizations adopt Microsoft 365 with change management that lands and tools that get used.",
  metadataBase: new URL("https://echo-five.ca"),
  openGraph: {
    title: "Echo-Five Consulting",
    description: "Change management for the public sector.",
    url: "https://echo-five.ca",
    siteName: "Echo-Five",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 2: Verify typecheck passes**

Run: `npx tsc --noEmit`
Expected: zero errors. (Type errors here would mean a wrong import or missing dep.)

- [ ] **Step 3: Commit**

```bash
git add app/layout.tsx
git commit -m "feat(app): root layout with Inter + Fraunces and metadata"
```

---

### Task 4: Logo component

**Files:**
- Create: `components/Logo.tsx`

- [ ] **Step 1: Create `components/Logo.tsx`**

```tsx
type LogoProps = {
  className?: string;
  monochrome?: boolean;
};

export function Logo({ className = "", monochrome = false }: LogoProps) {
  const stroke = monochrome ? "currentColor" : "var(--color-accent)";
  return (
    <a href="#top" aria-label="Echo-Five home" className={`inline-flex items-center gap-2 ${className}`}>
      <svg
        viewBox="0 0 40 40"
        width="28"
        height="28"
        fill="none"
        stroke={stroke}
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <path d="M20 22a4 4 0 1 0 0-8" />
        <path d="M20 26a8 8 0 1 0 0-16" />
        <path d="M20 30a12 12 0 1 0 0-24" />
        <path d="M20 34a16 16 0 1 0 0-32" />
        <circle cx="20" cy="18" r="1.25" fill={stroke} stroke="none" />
      </svg>
      <span
        className="font-serif text-[1.05rem] tracking-[0.18em] uppercase"
        style={{ color: monochrome ? "currentColor" : "var(--color-ink)" }}
      >
        Echo<span className="mx-1 opacity-60">·</span>Five
      </span>
    </a>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/Logo.tsx
git commit -m "feat(brand): placeholder logo with concentric-arcs mark"
```

---

### Task 5: ScrollReveal helper

**Files:**
- Create: `components/ScrollReveal.tsx`

- [ ] **Step 1: Create `components/ScrollReveal.tsx`**

```tsx
"use client";

import { useEffect, useRef } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

export function ScrollReveal({ children, className = "", delay = 0 }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            window.setTimeout(() => {
              el.setAttribute("data-visible", "true");
            }, delay);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/ScrollReveal.tsx
git commit -m "feat: ScrollReveal wrapper with IntersectionObserver"
```

---

### Task 6: Nav section (sticky, mobile menu)

**Files:**
- Create: `components/sections/Nav.tsx`

- [ ] **Step 1: Create `components/sections/Nav.tsx`**

```tsx
"use client";

import { useEffect, useState } from "react";
import { Logo } from "@/components/Logo";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#approach", label: "Approach" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-[color:var(--color-bg)]/85 backdrop-blur border-b border-[color:var(--color-rule)]" : "bg-transparent"
      }`}
    >
      <div className="container-tight flex h-16 items-center justify-between">
        <Logo />
        <nav className="hidden md:flex items-center gap-8 text-sm text-[color:var(--color-ink-muted)]">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-[color:var(--color-ink)] transition-colors">
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className="ml-2 inline-flex items-center rounded-full border border-[color:var(--color-ink)] px-4 py-1.5 text-[color:var(--color-ink)] hover:bg-[color:var(--color-ink)] hover:text-[color:var(--color-bg)] transition-colors"
          >
            Get in touch
          </a>
        </nav>
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--color-rule)]"
        >
          <span className="sr-only">Menu</span>
          <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
            {open ? (
              <path d="M3 3l12 12M15 3L3 15" stroke="currentColor" strokeWidth="1.5" />
            ) : (
              <path d="M2 5h14M2 13h14" stroke="currentColor" strokeWidth="1.5" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden fixed inset-0 top-16 bg-[color:var(--color-bg)] border-t border-[color:var(--color-rule)]">
          <nav className="container-tight flex flex-col gap-6 py-10 text-2xl font-serif">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-[color:var(--color-ink)]"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-4 inline-flex w-fit items-center rounded-full bg-[color:var(--color-ink)] px-5 py-2 text-base text-[color:var(--color-bg)]"
            >
              Get in touch
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/Nav.tsx
git commit -m "feat(nav): sticky nav with mobile overlay menu"
```

---

### Task 7: Hero section

**Files:**
- Create: `components/sections/Hero.tsx`

- [ ] **Step 1: Create `components/sections/Hero.tsx`**

```tsx
import { ScrollReveal } from "@/components/ScrollReveal";

const COPY = {
  eyebrow: "Change management · Microsoft 365 · Public Sector",
  headline: "Change that lands.\nTools that get used.",
  sub:
    "Echo-Five helps government teams adopt Microsoft 365 with strategies that move people, not just systems. Twenty years of public-sector experience, distilled into engagements that ship.",
  primaryCta: { label: "Get in touch", href: "#contact" },
  secondaryCta: { label: "See how we work", href: "#approach" },
};

export function Hero() {
  return (
    <section id="top" className="relative pt-32 md:pt-44 section-y">
      <div className="container-tight">
        <ScrollReveal>
          <p className="text-xs md:text-sm uppercase tracking-[0.28em] text-[color:var(--color-accent-warm)] mb-6">
            {COPY.eyebrow}
          </p>
        </ScrollReveal>
        <ScrollReveal delay={80}>
          <h1 className="font-serif text-[clamp(2.4rem,6vw,4.5rem)] leading-[1.04] tracking-[-0.01em] text-[color:var(--color-ink)] whitespace-pre-line max-w-4xl">
            {COPY.headline}
          </h1>
        </ScrollReveal>
        <ScrollReveal delay={160}>
          <p className="mt-8 max-w-2xl text-lg md:text-xl leading-relaxed text-[color:var(--color-ink-muted)]">
            {COPY.sub}
          </p>
        </ScrollReveal>
        <ScrollReveal delay={240}>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href={COPY.primaryCta.href}
              className="inline-flex items-center rounded-full bg-[color:var(--color-ink)] px-6 py-3 text-sm text-[color:var(--color-bg)] hover:bg-[color:var(--color-accent)] transition-colors"
            >
              {COPY.primaryCta.label}
            </a>
            <a
              href={COPY.secondaryCta.href}
              className="inline-flex items-center text-sm text-[color:var(--color-ink-muted)] hover:text-[color:var(--color-ink)] transition-colors"
            >
              {COPY.secondaryCta.label} →
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/Hero.tsx
git commit -m "feat(hero): typography-led hero with eyebrow + dual CTAs"
```

---

### Task 8: About section

**Files:**
- Create: `components/sections/About.tsx`

- [ ] **Step 1: Create `components/sections/About.tsx`**

```tsx
import { ScrollReveal } from "@/components/ScrollReveal";

const COPY = {
  label: "About",
  heading: "A practice built for the public sector.",
  body: [
    "Echo-Five is an independent consultancy focused on Microsoft 365 adoption inside government. We work alongside program leads, IT, and operational teams to turn rollouts into the kind of change people actually use — not the kind that gets quietly reverted six months later.",
    "Our work sits at the seam between technology and the people doing the work. Governance, training, communications, and measurement — handled together so adoption holds after the project closes.",
  ],
  stats: [
    { value: "20+", label: "years in public-sector transformation" },
    { value: "M365", label: "specialist focus" },
    { value: "Change", label: "managed end-to-end" },
  ],
};

export function About() {
  return (
    <section id="about" className="section-y border-t border-[color:var(--color-rule)]">
      <div className="container-tight grid gap-16 md:grid-cols-12">
        <div className="md:col-span-4">
          <ScrollReveal>
            <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--color-accent-warm)]">
              {COPY.label}
            </p>
            <h2 className="mt-4 font-serif text-[clamp(2rem,4vw,3rem)] leading-[1.1] tracking-[-0.01em]">
              {COPY.heading}
            </h2>
          </ScrollReveal>
        </div>
        <div className="md:col-span-7 md:col-start-6 space-y-6 text-lg leading-relaxed text-[color:var(--color-ink-muted)]">
          {COPY.body.map((p, i) => (
            <ScrollReveal key={i} delay={80 * i}>
              <p>{p}</p>
            </ScrollReveal>
          ))}
        </div>
      </div>

      <div className="container-tight mt-20 grid grid-cols-1 md:grid-cols-3 border-t border-[color:var(--color-rule)]">
        {COPY.stats.map((s, i) => (
          <ScrollReveal key={i} delay={80 * i} className="px-6 py-10 border-b md:border-b-0 md:border-r last:border-r-0 border-[color:var(--color-rule)]">
            <div className="font-serif text-4xl md:text-5xl tracking-[-0.02em] text-[color:var(--color-ink)]">
              {s.value}
            </div>
            <div className="mt-3 text-sm uppercase tracking-[0.2em] text-[color:var(--color-ink-muted)]">
              {s.label}
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/About.tsx
git commit -m "feat(about): firm overview with pull-stat strip"
```

---

### Task 9: Services section

**Files:**
- Create: `components/sections/Services.tsx`

- [ ] **Step 1: Create `components/sections/Services.tsx`**

```tsx
import { ScrollReveal } from "@/components/ScrollReveal";

const COPY = {
  label: "Services",
  heading: "Three engagements. One outcome — adoption that holds.",
  services: [
    {
      title: "Microsoft 365 Adoption",
      body:
        "Readiness assessments, deployment planning, and governance design for Teams, SharePoint, and the wider M365 stack. Rolled out in a way that fits how public-sector teams actually work.",
      points: ["Readiness & impact assessment", "Tenant and governance design", "Phased deployment planning"],
    },
    {
      title: "Change Management Strategy",
      body:
        "Stakeholder engagement, communications, and measurement built around Prosci-aligned change frameworks — adapted for the realities of government delivery cycles.",
      points: ["Stakeholder mapping", "Communications planning", "Adoption KPIs and reporting"],
    },
    {
      title: "Training & Enablement",
      body:
        "Role-based training, champions programs, and sustainment plans that keep momentum after the rollout team leaves.",
      points: ["Role-based curriculum", "Champion network design", "Sustainment & reinforcement"],
    },
  ],
};

export function Services() {
  return (
    <section id="services" className="section-y border-t border-[color:var(--color-rule)]">
      <div className="container-tight">
        <ScrollReveal>
          <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--color-accent-warm)]">
            {COPY.label}
          </p>
          <h2 className="mt-4 font-serif text-[clamp(2rem,4vw,3rem)] leading-[1.1] tracking-[-0.01em] max-w-3xl">
            {COPY.heading}
          </h2>
        </ScrollReveal>

        <div className="mt-16 grid gap-px bg-[color:var(--color-rule)] border border-[color:var(--color-rule)] md:grid-cols-3">
          {COPY.services.map((s, i) => (
            <ScrollReveal key={s.title} delay={80 * i} className="bg-[color:var(--color-surface)] p-8 md:p-10 flex flex-col">
              <div className="font-serif text-sm text-[color:var(--color-accent-warm)] mb-6">
                0{i + 1}
              </div>
              <h3 className="font-serif text-2xl leading-snug text-[color:var(--color-ink)]">
                {s.title}
              </h3>
              <p className="mt-4 text-[color:var(--color-ink-muted)] leading-relaxed">
                {s.body}
              </p>
              <ul className="mt-6 space-y-2 text-sm text-[color:var(--color-ink-muted)]">
                {s.points.map((p) => (
                  <li key={p} className="flex gap-3">
                    <span aria-hidden="true" className="mt-2 h-px w-4 bg-[color:var(--color-accent-warm)]" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/Services.tsx
git commit -m "feat(services): three-card service grid with bullet points"
```

---

### Task 10: Approach section

**Files:**
- Create: `components/sections/Approach.tsx`

- [ ] **Step 1: Create `components/sections/Approach.tsx`**

```tsx
import { ScrollReveal } from "@/components/ScrollReveal";

const COPY = {
  label: "Approach",
  heading: "A four-step path from kickoff to sustained adoption.",
  steps: [
    { n: "01", name: "Discover", body: "Stakeholder interviews, current-state assessment, and a clear picture of what's working and what isn't." },
    { n: "02", name: "Design", body: "Tailored change plan, governance model, and communications cadence — sized to your delivery reality." },
    { n: "03", name: "Deploy", body: "Phased rollout with hands-on training, champion enablement, and live measurement of adoption." },
    { n: "04", name: "Sustain", body: "Reinforcement plans, governance handover, and the playbook your team uses long after we're gone." },
  ],
};

export function Approach() {
  return (
    <section id="approach" className="section-y border-t border-[color:var(--color-rule)]">
      <div className="container-tight">
        <ScrollReveal>
          <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--color-accent-warm)]">
            {COPY.label}
          </p>
          <h2 className="mt-4 font-serif text-[clamp(2rem,4vw,3rem)] leading-[1.1] tracking-[-0.01em] max-w-3xl">
            {COPY.heading}
          </h2>
        </ScrollReveal>

        <ol className="mt-16 grid gap-10 md:grid-cols-4">
          {COPY.steps.map((s, i) => (
            <ScrollReveal key={s.n} delay={80 * i}>
              <li className="border-t border-[color:var(--color-ink)] pt-6">
                <div className="font-serif text-sm text-[color:var(--color-accent-warm)]">{s.n}</div>
                <div className="mt-4 font-serif text-2xl text-[color:var(--color-ink)]">{s.name}</div>
                <p className="mt-4 text-[color:var(--color-ink-muted)] leading-relaxed">{s.body}</p>
              </li>
            </ScrollReveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/Approach.tsx
git commit -m "feat(approach): four-step process row"
```

---

### Task 11: Credentials strip

**Files:**
- Create: `components/sections/Credentials.tsx`

- [ ] **Step 1: Create `components/sections/Credentials.tsx`**

```tsx
import { ScrollReveal } from "@/components/ScrollReveal";

const BADGES = [
  "Microsoft Partner",
  "Prosci-Aligned",
  "ITIL Foundations",
  "Gov. of Canada Cleared",
  "PMP",
];

export function Credentials() {
  return (
    <section className="border-t border-[color:var(--color-rule)] py-16">
      <div className="container-tight">
        <ScrollReveal>
          <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--color-ink-muted)] text-center">
            Credentials &amp; affiliations
          </p>
        </ScrollReveal>
        <ScrollReveal delay={80}>
          <ul className="mt-8 flex flex-wrap justify-center gap-x-10 gap-y-4 text-sm text-[color:var(--color-ink-muted)]">
            {BADGES.map((b) => (
              <li key={b} className="font-serif tracking-[0.06em]">
                {b}
              </li>
            ))}
          </ul>
        </ScrollReveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/Credentials.tsx
git commit -m "feat(credentials): placeholder credentials strip"
```

---

### Task 12: Contact section (no-op form with success state)

**Files:**
- Create: `components/sections/Contact.tsx`

- [ ] **Step 1: Create `components/sections/Contact.tsx`**

```tsx
"use client";

import { useState, type FormEvent } from "react";
import { ScrollReveal } from "@/components/ScrollReveal";

const COPY = {
  label: "Contact",
  heading: "Let's talk about what you're trying to change.",
  body:
    "Send a note and we'll come back within two business days. For sensitive engagements, ask about secure channels.",
  email: "hello@echo-five.ca",
  linkedin: "https://www.linkedin.com",
};

export function Contact() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <section id="contact" className="section-y border-t border-[color:var(--color-rule)]">
      <div className="container-tight grid gap-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <ScrollReveal>
            <p className="text-xs uppercase tracking-[0.28em] text-[color:var(--color-accent-warm)]">
              {COPY.label}
            </p>
            <h2 className="mt-4 font-serif text-[clamp(2rem,4vw,3rem)] leading-[1.1] tracking-[-0.01em]">
              {COPY.heading}
            </h2>
            <p className="mt-6 text-[color:var(--color-ink-muted)] leading-relaxed max-w-md">
              {COPY.body}
            </p>
            <div className="mt-10 space-y-3 text-sm">
              <div>
                <span className="text-[color:var(--color-ink-muted)]">Email · </span>
                <a className="text-[color:var(--color-ink)] underline-offset-4 hover:underline" href={`mailto:${COPY.email}`}>{COPY.email}</a>
              </div>
              <div>
                <span className="text-[color:var(--color-ink-muted)]">LinkedIn · </span>
                <a className="text-[color:var(--color-ink)] underline-offset-4 hover:underline" href={COPY.linkedin} target="_blank" rel="noreferrer">echo-five-consulting</a>
              </div>
            </div>
          </ScrollReveal>
        </div>

        <div className="md:col-span-6 md:col-start-7">
          <ScrollReveal delay={80}>
            {sent ? (
              <div className="border border-[color:var(--color-rule)] bg-[color:var(--color-surface)] p-10 text-center">
                <div className="font-serif text-2xl text-[color:var(--color-ink)]">Thank you.</div>
                <p className="mt-3 text-[color:var(--color-ink-muted)]">
                  Your note is in. We'll be in touch within two business days.
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="border border-[color:var(--color-rule)] bg-[color:var(--color-surface)] p-8 md:p-10 space-y-6">
                <Field label="Name" name="name" required />
                <Field label="Email" name="email" type="email" required />
                <Field label="Organization" name="organization" />
                <FieldArea label="What are you trying to change?" name="message" required />
                <button
                  type="submit"
                  className="inline-flex items-center rounded-full bg-[color:var(--color-ink)] px-6 py-3 text-sm text-[color:var(--color-bg)] hover:bg-[color:var(--color-accent)] transition-colors"
                >
                  Send message
                </button>
              </form>
            )}
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

function Field({ label, name, type = "text", required = false }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <label className="block">
      <span className="block text-xs uppercase tracking-[0.2em] text-[color:var(--color-ink-muted)]">
        {label}{required && <span aria-hidden="true"> *</span>}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        className="mt-2 block w-full border-b border-[color:var(--color-rule)] bg-transparent py-2 text-[color:var(--color-ink)] outline-none focus:border-[color:var(--color-ink)] transition-colors"
      />
    </label>
  );
}

function FieldArea({ label, name, required = false }: { label: string; name: string; required?: boolean }) {
  return (
    <label className="block">
      <span className="block text-xs uppercase tracking-[0.2em] text-[color:var(--color-ink-muted)]">
        {label}{required && <span aria-hidden="true"> *</span>}
      </span>
      <textarea
        name={name}
        required={required}
        rows={4}
        className="mt-2 block w-full border-b border-[color:var(--color-rule)] bg-transparent py-2 text-[color:var(--color-ink)] outline-none focus:border-[color:var(--color-ink)] transition-colors resize-none"
      />
    </label>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/Contact.tsx
git commit -m "feat(contact): contact section with no-op form and success state"
```

---

### Task 13: Footer

**Files:**
- Create: `components/sections/Footer.tsx`

- [ ] **Step 1: Create `components/sections/Footer.tsx`**

```tsx
import { Logo } from "@/components/Logo";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#approach", label: "Approach" },
  { href: "#contact", label: "Contact" },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-[color:var(--color-rule)] py-12">
      <div className="container-tight flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
        <Logo />
        <nav className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-[color:var(--color-ink-muted)]">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-[color:var(--color-ink)] transition-colors">
              {l.label}
            </a>
          ))}
        </nav>
        <p className="text-xs text-[color:var(--color-ink-muted)]">
          © {year} Echo-Five Consulting · Ottawa
        </p>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/Footer.tsx
git commit -m "feat(footer): minimal footer with logo, nav, and copyright"
```

---

### Task 14: Compose page, favicon, README

**Files:**
- Create: `app/page.tsx`
- Create: `public/favicon.svg`
- Create: `README.md`

- [ ] **Step 1: Create `app/page.tsx`**

```tsx
import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Approach } from "@/components/sections/Approach";
import { Credentials } from "@/components/sections/Credentials";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <About />
      <Services />
      <Approach />
      <Credentials />
      <Contact />
      <Footer />
    </main>
  );
}
```

- [ ] **Step 2: Create `public/favicon.svg`**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" fill="none" stroke="#1A2740" stroke-width="2">
  <path d="M20 22a4 4 0 1 0 0-8" />
  <path d="M20 26a8 8 0 1 0 0-16" />
  <path d="M20 30a12 12 0 1 0 0-24" />
  <path d="M20 34a16 16 0 1 0 0-32" />
  <circle cx="20" cy="18" r="1.5" fill="#1A2740" stroke="none" />
</svg>
```

- [ ] **Step 3: Create `README.md`**

```markdown
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
```

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx public/favicon.svg README.md
git commit -m "feat: compose landing page, favicon, README"
```

---

### Task 15: Verify build and typecheck

- [ ] **Step 1: Run typecheck**

Run: `npx tsc --noEmit`
Expected: zero errors.

- [ ] **Step 2: Run build**

Run: `npm run build`
Expected: build succeeds, route `/` listed in output, no errors.

- [ ] **Step 3: Spot-check dev server**

Run: `npm run dev` (in background), open http://localhost:3000, confirm all 8 sections render and the contact form shows the success state on submit. Stop the server.

- [ ] **Step 4: Commit any verification fixes**

If the build surfaced issues, fix them and commit. Otherwise skip.

---

### Task 16: Create GitHub repo and push

- [ ] **Step 1: Create empty repo via GitHub MCP**

Use `mcp__github-tharros__create_repository` with `owner=TharrosDev-ORG`, `name=Echo-Five-Website`, `description="Marketing site for Echo-Five Consulting"`, `private=false` (confirm visibility with user if unsure).

- [ ] **Step 2: Add remote and push**

```bash
git branch -M main
git remote add origin https://github.com/TharrosDev-ORG/Echo-Five-Website.git
git push -u origin main
```

Expected: push succeeds, `main` branch visible on GitHub with all commits.

- [ ] **Step 3: Report URL back to user**

Surface the repo URL: `https://github.com/TharrosDev-ORG/Echo-Five-Website`.

---

## Self-Review

- **Spec coverage:**
  - Stack (Next 16 + TS + Tailwind v4) → Task 1, 2, 3 ✓
  - Visual tokens → Task 2 ✓
  - Wordmark + mark → Task 4 ✓
  - All 8 sections → Tasks 6–13 ✓
  - Filler `COPY` constants → present in every section task ✓
  - No-op contact form with success state → Task 12 ✓
  - Build acceptance → Task 15 ✓
  - Repo creation + push → Task 16 ✓
- **Placeholder scan:** No "TBD" / "fill in later" — all code is concrete.
- **Type consistency:** `Logo` props, `ScrollReveal` props (`children`, `className`, `delay`), and `COPY` shapes are consistent across tasks.
