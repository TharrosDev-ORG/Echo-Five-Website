"use client";

import { useEffect, useState } from "react";
import { nav } from "@/lib/content";
import { site, mailtoBook } from "@/lib/site";

function Mark() {
  return (
    <a href="#top" className="flex items-center gap-2.5" aria-label={`${site.name} home`}>
      <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" className="shrink-0">
        <g fill="none" stroke="currentColor">
          <circle cx="12" cy="12" r="3" />
          <circle cx="12" cy="12" r="7" opacity="0.55" />
          <circle cx="12" cy="12" r="11" opacity="0.28" />
          <circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" />
        </g>
      </svg>
      <span className="font-mono text-[0.92rem] font-medium tracking-[0.16em]">
        {site.callsign}
      </span>
    </a>
  );
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = nav
      .map((n) => document.getElementById(n.href.slice(1)))
      .filter((el): el is HTMLElement => el !== null);
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled
          ? "bg-paper/90 backdrop-blur-md border-b border-line"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="u-container flex h-[4.5rem] items-center justify-between">
        <Mark />

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {nav.map((item) => {
            const isActive = active === item.href.slice(1);
            return (
              <a
                key={item.href}
                href={item.href}
                aria-current={isActive ? "true" : undefined}
                className={`group relative font-mono text-[0.78rem] tracking-[0.06em] transition-colors ${
                  isActive ? "text-signal-deep" : "text-ink-soft hover:text-ink"
                }`}
              >
                {item.label}
                <span
                  className={`absolute -bottom-1.5 left-0 h-px bg-signal-deep transition-all duration-300 ${
                    isActive ? "w-full" : "w-0 group-hover:w-full group-hover:bg-line-strong"
                  }`}
                />
              </a>
            );
          })}
          <a href={mailtoBook} className="btn btn-primary !py-2.5 !px-4">
            Book a conversation
          </a>
        </nav>

        <button
          type="button"
          className="flex flex-col gap-[5px] p-2 lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={`block h-[1.5px] w-6 bg-ink transition-transform duration-300 ${
              open ? "translate-y-[6.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-[1.5px] w-6 bg-ink transition-opacity duration-300 ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-[1.5px] w-6 bg-ink transition-transform duration-300 ${
              open ? "-translate-y-[6.5px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile panel */}
      <div
        className={`lg:hidden overflow-hidden bg-paper transition-[max-height] duration-500 ease-out ${
          open ? "max-h-[28rem] border-b border-line" : "max-h-0"
        }`}
      >
        <nav className="u-container flex flex-col gap-1 py-6" aria-label="Mobile">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="font-display text-2xl py-2 text-ink"
            >
              {item.label}
            </a>
          ))}
          <a
            href={mailtoBook}
            onClick={() => setOpen(false)}
            className="btn btn-primary mt-4 justify-center"
          >
            Book a conversation
          </a>
        </nav>
      </div>
    </header>
  );
}
