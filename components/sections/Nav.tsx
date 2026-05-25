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
  const [pastHero, setPastHero] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setPastHero(y > window.innerHeight * 0.85);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const onPaper = pastHero;

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        onPaper
          ? "bg-[color-mix(in_oklch,var(--color-paper)_88%,transparent)] backdrop-blur border-b border-keyline"
          : "bg-transparent"
      }`}
    >
      <div className="container-tight flex h-16 items-center justify-between">
        <Logo inverted={!onPaper} />

        <nav
          className={`hidden md:flex items-center gap-9 text-sm uppercase tracking-[0.08em] transition-colors ${
            onPaper ? "text-ink-muted" : "text-paper/65"
          }`}
        >
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`transition-colors ${onPaper ? "hover:text-ink" : "hover:text-paper"}`}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className={`inline-flex min-h-[40px] items-center px-5 py-2 font-medium transition-colors ${
              onPaper
                ? "bg-ink text-paper hover:bg-signal"
                : "bg-paper text-ink hover:bg-signal hover:text-paper"
            }`}
          >
            Get in touch
          </a>
        </nav>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className={`md:hidden inline-flex h-11 w-11 items-center justify-center border transition-colors ${
            onPaper ? "border-keyline text-ink" : "border-paper/30 text-paper"
          }`}
        >
          <span className="sr-only">Menu</span>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            {open ? (
              <path d="M3 3l12 12M15 3L3 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            ) : (
              <path d="M2 6h14M2 12h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden fixed inset-0 top-16 bg-paper border-t border-keyline">
          <nav className="container-tight flex flex-col gap-1 py-8">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-display font-bold uppercase text-3xl tracking-[-0.01em] text-ink py-3 border-b border-keyline"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-6 inline-flex min-h-[44px] w-fit items-center bg-ink px-6 py-3 text-sm font-medium uppercase tracking-[0.06em] text-paper"
            >
              Get in touch
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
