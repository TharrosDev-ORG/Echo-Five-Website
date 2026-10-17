"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { nav, navCta, ui } from "@/lib/content/shared";
import { site } from "@/lib/site";
import { cx } from "@/lib/cx";
import Logo from "@/components/ui/Logo";
import Button from "@/components/ui/Button";
import Arrow from "@/components/ui/Arrow";

/**
 * Site header. Transparent at the top, frosted once the page scrolls, hidden
 * while reading down and back on the way up. Under 900px the links move into
 * a full-screen menu: focus moves in and is trapped, the page behind is inert
 * and does not scroll, and Escape closes it.
 */
export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  // Scroll state: frosted after a few pixels; hide on the way down.
  useEffect(() => {
    let last = window.scrollY;
    let ticking = false;
    const update = () => {
      const y = window.scrollY;
      setScrolled(y > 8);
      if (Math.abs(y - last) > 6) {
        setHidden(y > last && y > 480);
        last = y;
      }
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = useCallback((restoreFocus = true) => {
    setOpen(false);
    if (restoreFocus) requestAnimationFrame(() => toggleRef.current?.focus());
  }, []);

  // Close the menu on navigation. Adjusting state while rendering (instead of
  // in an effect) is React's pattern for resetting state when a prop changes.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  // While open: page behind is inert and fixed, focus is trapped, Esc closes.
  useEffect(() => {
    if (!open) return;
    const main = document.getElementById("main");
    const footer = document.querySelector<HTMLElement>("footer");
    [main, footer].forEach((el) => el?.setAttribute("inert", ""));
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    const menu = menuRef.current;
    const focusables = () =>
      Array.from(
        document.querySelectorAll<HTMLElement>(
          "#site-menu a, #site-menu button, [data-menu-toggle]",
        ),
      );
    menu?.querySelector<HTMLElement>("a")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== "Tab") return;
      const items = focusables();
      const first = items[0];
      const lastItem = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        lastItem.focus();
      } else if (!e.shiftKey && document.activeElement === lastItem) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      [main, footer].forEach((el) => el?.removeAttribute("inert"));
      document.body.style.overflow = overflow;
    };
  }, [open, close]);

  // Close the menu if the viewport grows past the mobile breakpoint.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 900px)");
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <>
      <header
        className="site-header tone-paper fixed inset-x-0 top-0 z-50"
        data-scrolled={scrolled || open ? "true" : "false"}
        data-hidden={hidden && !open ? "true" : "false"}
      >
        <div className="wrap flex h-[4.5rem] items-center justify-between gap-6">
          <Link href="/" aria-label={ui.homeLabel} className="-m-2 rounded-md p-2">
            <Logo />
          </Link>

          <nav aria-label="Primary" className="hidden min-[900px]:block">
            <ul className="flex items-center gap-8 text-[0.9375rem] font-[450]">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={cx(
                      "link-quiet py-2 transition-colors",
                      isActive(item.href) ? "text-fg" : "text-fg-2 hover:text-fg",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Button
              href={navCta.href}
              size="sm"
              className={cx("hidden min-[900px]:inline-flex", pathname === "/contact" && "invisible")}
            >
              {navCta.label}
            </Button>
            <button
              ref={toggleRef}
              type="button"
              data-menu-toggle=""
              className="btn btn-secondary btn-sm min-[900px]:hidden"
              aria-expanded={open}
              aria-controls="site-menu"
              onClick={() => (open ? close(false) : setOpen(true))}
            >
              <span>{open ? ui.menuClose : ui.menuOpen}</span>
              <span aria-hidden="true" className="relative block h-2.5 w-4">
                <span
                  className={cx(
                    "absolute left-0 h-px w-full bg-current transition-transform duration-500 ease-[var(--ease-out-expo)]",
                    open ? "top-1/2 rotate-45" : "top-0",
                  )}
                />
                <span
                  className={cx(
                    "absolute left-0 h-px w-full bg-current transition-transform duration-500 ease-[var(--ease-out-expo)]",
                    open ? "top-1/2 -rotate-45" : "bottom-0",
                  )}
                />
              </span>
            </button>
          </div>
        </div>
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px">
          <div className="scroll-progress h-full bg-accent" id="scroll-progress" />
        </div>
      </header>

      {/* Mobile menu */}
      <div
        id="site-menu"
        ref={menuRef}
        role="dialog"
        aria-modal="true"
        aria-label={ui.menuLabel}
        hidden={!open}
        className="tone-night grain fixed inset-0 z-40 overflow-y-auto pt-[4.5rem] min-[900px]:hidden"
      >
        <div className="wrap flex min-h-full flex-col justify-between gap-12 pb-10 pt-10">
          <nav aria-label="Menu">
            <ul className="border-t border-rule">
              {[{ label: "Home", href: "/" }, ...nav].map((item, i) => (
                <li key={item.href} className="border-b border-rule">
                  <Link
                    href={item.href}
                    aria-current={pathname === item.href ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className="group flex items-baseline justify-between gap-4 py-4"
                  >
                    <span className="serif text-[2.5rem] leading-none tracking-[-0.02em] group-aria-[current=page]:text-accent">
                      {item.label}
                    </span>
                    <span aria-hidden="true" className="label text-fg-3">
                      0{i + 1}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="space-y-6" onClickCapture={() => setOpen(false)}>
            <Button href={navCta.href} size="lg" className="w-full">
              {navCta.label}
            </Button>
            <p className="text-small text-fg-2">
              {ui.drawerEmailPrefix}{" "}
              <a href={`mailto:${site.email}`} className="link inline-flex items-center gap-1 text-fg">
                {site.email}
                <Arrow dir="up-right" />
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
