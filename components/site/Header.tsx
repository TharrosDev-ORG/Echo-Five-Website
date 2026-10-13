"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav, navCta, ui } from "@/lib/content";
import { site } from "@/lib/site";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { ArrowRight, Close, Menu } from "@/components/ui/icons";
import Logo from "@/components/site/Logo";

const isCurrent = (pathname: string, href: string) =>
  pathname === href || pathname.startsWith(`${href}/`);

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [overDark, setOverDark] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Hairline under the header once the page has moved, and the dark state while
  // it still sits over a black page hero. Re-reads the hero on every route change,
  // so client navigation from a dark hero to a light page flips it back.
  useEffect(() => {
    const hero = document.querySelector<HTMLElement>("[data-hero-tone]");
    const isDark = hero?.dataset.heroTone === "dark";
    const update = () => {
      setScrolled(window.scrollY > 8);
      if (!hero || !isDark) {
        setOverDark(false);
        return;
      }
      // Dark while more than half of the header still overlaps the hero.
      const headerH = headerRef.current?.offsetHeight ?? 0;
      setOverDark(hero.getBoundingClientRect().bottom > headerH / 2);
    };
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    const frame = requestAnimationFrame(update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [pathname]);

  // While the drawer is open: lock page scroll, make everything behind it
  // inert, trap Tab inside it, close on Escape, and restore focus on close.
  useEffect(() => {
    if (!open) return;
    const drawer = drawerRef.current;
    const toggle = toggleRef.current;
    const behind = [
      headerRef.current,
      document.getElementById("main"),
      document.querySelector("[data-site-footer]"),
      document.querySelector("[data-mobile-cta]"),
    ].filter((n): n is HTMLElement => n instanceof HTMLElement);

    behind.forEach((n) => (n.inert = true));
    document.documentElement.style.overflow = "hidden";
    drawer?.querySelector<HTMLElement>("nav a")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab" || !drawer) return;
      const items = Array.from(drawer.querySelectorAll<HTMLElement>(FOCUSABLE));
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
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
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) setOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const close = () => setOpen(false);

  return (
    <>
      <header
        ref={headerRef}
        className="site-header"
        data-scrolled={scrolled ? "" : undefined}
        data-over-dark={overDark ? "" : undefined}
      >
        <Container className="flex h-full items-center justify-between gap-6">
          <Logo />

          <nav aria-label="Primary" className="hidden items-center gap-1 min-[900px]:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="nav-link"
                aria-current={isCurrent(pathname, item.href) ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button
              href={navCta.href}
              size="sm"
              tone={overDark ? "dark" : "light"}
              className="hidden min-[900px]:inline-flex"
            >
              {navCta.label}
            </Button>
            <button
              ref={toggleRef}
              type="button"
              className="menu-toggle"
              aria-expanded={open}
              aria-controls="site-menu"
              onClick={() => setOpen(true)}
            >
              <Menu size={20} />
              Menu
            </button>
            {/* Without JS the menu cannot open, so this jumps to the footer links instead. */}
            <a href="#footer-nav" className="menu-fallback">
              <Menu size={20} />
              Menu
            </a>
          </div>
        </Container>
      </header>

      <div
        ref={drawerRef}
        id="site-menu"
        className="drawer"
        data-tone="dark"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        data-open={open ? "" : undefined}
        inert={!open}
      >
        <Container className="flex h-[var(--header-h)] shrink-0 items-center justify-between gap-6">
          <Logo onClick={close} />
          <button type="button" className="menu-toggle" onClick={close}>
            <Close size={20} />
            Close
          </button>
        </Container>

        <Container className="flex flex-1 flex-col pt-4 pb-[max(2rem,env(safe-area-inset-bottom))]">
          <nav aria-label="Site menu">
            <ul>
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="drawer-link"
                    aria-current={isCurrent(pathname, item.href) ? "page" : undefined}
                    onClick={close}
                  >
                    {item.label}
                    <ArrowRight size={22} className="text-fg-2" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-auto flex flex-col gap-4 pt-10">
            <Button href={navCta.href} size="lg" tone="dark" fullWidth arrow onClick={close}>
              {navCta.label}
            </Button>
            <p className="text-center text-small text-fg-2">
              {ui.drawerEmailPrefix}{" "}
              <a href={`mailto:${site.email}`} className="link">
                {site.email}
              </a>
            </p>
          </div>
        </Container>
      </div>
    </>
  );
}
