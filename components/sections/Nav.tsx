"use client";

import { useEffect, useRef, useState } from "react";
import { nav } from "@/lib/content";
import { site, mailtoBook } from "@/lib/site";
import { useSmoothScroll } from "@/components/providers/SmoothScroll";
import Magnetic from "@/components/fx/Magnetic";

export default function Nav() {
  const { scrollTo } = useSmoothScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    scrollTo(href);
  };

  return (
    <header
      ref={headerRef}
      className="fixed inset-x-0 top-0 z-50"
      style={{
        transition: "background 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s ease",
        background: scrolled ? "color-mix(in oklch, var(--color-paper) 78%, transparent)" : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        borderBottom: scrolled ? "1px solid var(--color-line)" : "1px solid transparent",
      }}
    >
      <div className="u-container flex items-center justify-between" style={{ height: "var(--nav-h, 4.5rem)" }}>
        <a
          href="#top"
          onClick={go("#top")}
          className="font-display"
          style={{ fontWeight: 760, fontSize: "1.18rem", letterSpacing: "-0.02em" }}
          aria-label={`${site.name} — home`}
        >
          Echo<span style={{ color: "var(--color-cobalt)" }}>five</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={go(item.href)}
              className="t-coord"
              style={{ color: "var(--color-ink-soft)" }}
              data-cursor
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <Magnetic>
            <a href={mailtoBook} className="btn btn-primary" data-cursor>
              Start a conversation
            </a>
          </Magnetic>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          style={{ display: "inline-flex", flexDirection: "column", gap: 5, padding: 8 }}
        >
          <span
            style={{
              width: 26,
              height: 2,
              background: "var(--color-ink)",
              transition: "transform 0.3s ease, opacity 0.3s ease",
              transform: open ? "translateY(7px) rotate(45deg)" : "none",
            }}
          />
          <span
            style={{
              width: 26,
              height: 2,
              background: "var(--color-ink)",
              transition: "opacity 0.3s ease",
              opacity: open ? 0 : 1,
            }}
          />
          <span
            style={{
              width: 26,
              height: 2,
              background: "var(--color-ink)",
              transition: "transform 0.3s ease",
              transform: open ? "translateY(-7px) rotate(-45deg)" : "none",
            }}
          />
        </button>
      </div>

      {/* Mobile overlay menu */}
      <div
        className="md:hidden"
        style={{
          position: "fixed",
          inset: 0,
          top: "var(--nav-h, 4.5rem)",
          background: "var(--color-paper)",
          padding: "var(--gutter)",
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
          transform: open ? "translateY(0)" : "translateY(-110%)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "transform 0.5s var(--ease-expo), opacity 0.4s ease",
        }}
      >
        {nav.map((item) => (
          <a
            key={item.href}
            href={item.href}
            onClick={go(item.href)}
            className="t-h3 font-display"
            style={{ color: "var(--color-ink)" }}
          >
            {item.label}
          </a>
        ))}
        <a href={mailtoBook} className="btn btn-primary" style={{ alignSelf: "flex-start", marginTop: "1rem" }}>
          Start a conversation
        </a>
      </div>
    </header>
  );
}
