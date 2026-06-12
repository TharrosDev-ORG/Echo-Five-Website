"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, EASE } from "@/lib/animation";
import { nav } from "@/lib/content";
import { site } from "@/lib/site";

export default function Nav() {
  const barRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  // Condense the bar once the hero is left behind.
  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    const st = ScrollTrigger.create({
      start: "top -60",
      onUpdate: (self) => {
        bar.dataset.scrolled = self.scroll() > 60 ? "true" : "false";
      },
    });
    return () => st.kill();
  }, []);

  // Track the section currently in view for the active nav state.
  useEffect(() => {
    const ids = nav.map((n) => n.href.slice(1));
    const triggers = ids.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      return ScrollTrigger.create({
        trigger: el,
        start: "top 45%",
        end: "bottom 45%",
        onToggle: (self) => {
          if (self.isActive) setActive(id);
        },
      });
    });
    return () => triggers.forEach((t) => t?.kill());
  }, []);

  // Mobile panel open/close.
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (open) {
      panel.style.display = "flex";
      document.body.style.overflow = "hidden";
      if (!reduce) {
        gsap.fromTo(panel, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out" });
        gsap.fromTo(
          panel.querySelectorAll("a"),
          { y: 22, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.06, ease: EASE, delay: 0.08 },
        );
      }
    } else {
      panel.style.display = "none";
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close the panel on Escape and when a link is chosen.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      ref={barRef}
      data-scrolled="false"
      className="group/nav fixed inset-x-0 top-0 z-50 transition-colors duration-300 data-[scrolled=true]:border-b data-[scrolled=true]:border-line data-[scrolled=true]:bg-bg-deep/85 data-[scrolled=true]:backdrop-blur-md"
    >
      <div className="u-container flex h-[4.5rem] items-center justify-between gap-6">
        <a href="#top" className="t-coord flex items-center gap-3 text-ink" aria-label={`${site.name} home`}>
          <span className="status-dot" aria-hidden="true" />
          {site.callsign}
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-7 md:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              aria-current={active === item.href.slice(1) ? "true" : undefined}
              className={`t-coord transition-colors hover:text-signal ${
                active === item.href.slice(1) ? "text-signal" : "text-ink-muted"
              }`}
            >
              {item.label}
            </a>
          ))}
          <a href="#contact" className="btn btn-primary !px-5 !py-2.5">
            Book a conversation
          </a>
        </nav>

        <button
          type="button"
          className="t-coord flex items-center gap-2 text-ink md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
          <span aria-hidden="true" className="relative block h-3 w-5">
            <span
              className={`absolute left-0 top-0 block h-px w-full bg-current transition-transform duration-300 ${
                open ? "top-1/2 rotate-45" : ""
              }`}
            />
            <span
              className={`absolute bottom-0 left-0 block h-px w-full bg-current transition-transform duration-300 ${
                open ? "bottom-1/2 -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      {/* Mobile overlay */}
      <div
        id="mobile-nav"
        ref={panelRef}
        style={{ display: "none" }}
        className="fixed inset-0 top-[4.5rem] z-40 flex-col gap-2 border-t border-line bg-bg-deep/97 px-6 pt-10 backdrop-blur-lg md:hidden"
      >
        {nav.map((item, i) => (
          <a
            key={item.href}
            href={item.href}
            onClick={() => setOpen(false)}
            className="flex items-baseline gap-4 border-b border-line py-5"
          >
            <span className="t-coord text-signal">0{i + 1}</span>
            <span className="font-display text-3xl font-[650] tracking-tight text-ink">{item.label}</span>
          </a>
        ))}
        <a href="#contact" onClick={() => setOpen(false)} className="btn btn-primary mt-8 self-start">
          Book a conversation
        </a>
      </div>
    </header>
  );
}
