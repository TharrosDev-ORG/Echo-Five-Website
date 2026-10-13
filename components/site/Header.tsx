"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav } from "@/lib/content";
import { site } from "@/lib/site";

const isCurrent = (pathname: string, href: string) =>
  pathname === href || pathname.startsWith(`${href}/`);

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Keyline under the header once the page has moved.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // While open: lock scroll, make the page behind inert (so Tab stays in the
  // menu), close on Escape, and hand focus back to the toggle on close.
  useEffect(() => {
    if (!open) return;
    const toggle = toggleRef.current;
    const behind = [document.getElementById("main"), document.querySelector("footer")].filter(
      (n): n is HTMLElement => n instanceof HTMLElement,
    );
    behind.forEach((n) => (n.inert = true));
    document.documentElement.style.overflow = "hidden";
    menuRef.current?.querySelector<HTMLElement>("a")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      behind.forEach((n) => (n.inert = false));
      document.documentElement.style.overflow = "";
      toggle?.focus();
    };
  }, [open]);

  // Close if the viewport grows to the desktop layout.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 900px)");
    const onChange = (e: MediaQueryListEvent) => e.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <header className="site-header" data-scrolled={scrolled || open ? "" : undefined}>
      <div className="container site-header-inner">
        <Link href="/" className="wordmark" aria-label={`${site.name}, home`}>
          Echofive
        </Link>

        <nav aria-label="Primary" className="primary-nav">
          {nav
            .filter((item) => item.href !== "/contact")
            .map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="nav-link"
                aria-current={isCurrent(pathname, item.href) ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
          <Link href="/contact" className="btn btn-primary btn-sm">
            Start a conversation
          </Link>
        </nav>

        <button
          ref={toggleRef}
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      <div
        ref={menuRef}
        id="mobile-menu"
        className="mobile-menu"
        data-open={open ? "" : undefined}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        inert={!open}
      >
        <Link
          href="/"
          className="mobile-link"
          aria-current={pathname === "/" ? "page" : undefined}
          onClick={() => setOpen(false)}
        >
          Home
        </Link>
        {nav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="mobile-link"
            aria-current={isCurrent(pathname, item.href) ? "page" : undefined}
            onClick={() => setOpen(false)}
          >
            {item.label}
          </Link>
        ))}
        <p className="t-small" style={{ marginTop: "var(--s-5)" }}>
          Or email{" "}
          <a href={`mailto:${site.email}`} className="link">
            {site.email}
          </a>
        </p>
      </div>
    </header>
  );
}
