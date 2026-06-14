"use client";

import { useEffect, useRef, useState } from "react";
import { nav } from "@/lib/content";
import { site, mailtoBook } from "@/lib/site";
import { useSmoothScroll } from "@/components/providers/SmoothScroll";
import Magnetic from "@/components/fx/Magnetic";

export default function Nav() {
  const { scrollTo, stop, start } = useSmoothScroll();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  // One rAF-batched scroll loop drives both the condensed header and the
  // scrollspy (which section is in view).
  useEffect(() => {
    const ids = nav.map((n) => n.href);
    let raf = 0;
    const update = () => {
      raf = 0;
      setScrolled(window.scrollY > 24);
      const line = window.innerHeight * 0.35;
      let current = "";
      for (const href of ids) {
        const el = document.querySelector(href);
        if (el && el.getBoundingClientRect().top <= line) current = href;
      }
      // At the very bottom, the last section is the active one.
      if (window.scrollY + window.innerHeight >= document.body.scrollHeight - 4) {
        current = ids[ids.length - 1];
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Lock background scroll while the mobile menu is open.
  useEffect(() => {
    if (open) stop();
    else start();
    return () => start();
  }, [open, stop, start]);

  // Mobile menu: Escape to close, move focus in on open, restore on close.
  useEffect(() => {
    if (!open) return;
    const opener = toggleRef.current;
    firstLinkRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      opener?.focus();
    };
  }, [open]);

  // Close the menu if the viewport grows past the mobile breakpoint.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = (e: MediaQueryListEvent) => e.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
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
          {nav.map((item) => {
            const isActive = active === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={go(item.href)}
                className="nav-link t-coord"
                data-active={isActive ? "" : undefined}
                aria-current={isActive ? "page" : undefined}
                data-cursor
              >
                {item.label}
              </a>
            );
          })}
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
          ref={toggleRef}
          type="button"
          className="flex flex-col md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
          style={{ gap: 5, padding: 8 }}
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
        id="mobile-menu"
        className="md:hidden"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
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
        inert={!open}
      >
        {nav.map((item, i) => (
          <a
            key={item.href}
            ref={i === 0 ? firstLinkRef : undefined}
            href={item.href}
            onClick={go(item.href)}
            className="t-h3 font-display"
            aria-current={active === item.href ? "page" : undefined}
            style={{ color: active === item.href ? "var(--color-cobalt)" : "var(--color-ink)" }}
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
