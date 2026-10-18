"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { mobileCta } from "@/lib/content/shared";
import Button from "@/components/ui/Button";

/**
 * A fixed "Start a conversation" bar on phones. It appears once the reader is
 * past the first screen and steps aside near the footer and on /contact.
 * While hidden it is inert; while it holds keyboard focus it never hides, so
 * focus is not dropped. Pages keep focus clear of it with
 * `scroll-padding-bottom` (globals.css).
 */
export default function MobileCta() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);
  const [focused, setFocused] = useState(false);

  // A new page starts with the bar hidden, even if its link had focus.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setFocused(false);
  }

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const nearEnd = window.innerHeight + y > document.body.scrollHeight - 900;
      setShow(y > window.innerHeight * 0.7 && !nearEnd);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  if (pathname === "/contact") return null;

  const visible = show || focused;
  // A labelled landmark, so the bar's content is not orphaned outside the
  // page regions when screen reader users browse by landmark.
  return (
    <aside
      aria-label={mobileCta.label}
      className="mobile-cta fixed inset-x-0 bottom-0 z-30 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] transition-transform duration-500 ease-[var(--ease-out-expo)] min-[900px]:hidden"
      style={{ transform: visible ? "none" : "translateY(130%)" }}
      aria-hidden={!visible}
      inert={!visible}
      onFocus={() => setFocused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocused(false);
      }}
    >
      <div className="tone-paper rounded-full p-1.5 shadow-[0_12px_40px_-12px_rgb(11_13_18/0.45)] ring-1 ring-rule">
        <Button href={mobileCta.href} className="w-full">
          {mobileCta.label}
        </Button>
      </div>
    </aside>
  );
}
