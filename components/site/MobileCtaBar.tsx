"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { mobileCta } from "@/lib/content";
import Button from "@/components/ui/Button";

/**
 * Fixed "Start a conversation" bar on screens under 900px. It slides up once
 * the visitor scrolls past the page hero (`[data-hero]`) and tucks away again
 * when the closing CTA band (or the footer) comes into view, since that offers
 * the same action. Not rendered on the contact page. Footer spacing and focus
 * scroll padding for it live in globals.css.
 */
export default function MobileCtaBar() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const hidden = pathname === mobileCta.href;

  useEffect(() => {
    if (hidden) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const hero = document.querySelector("[data-hero]");
      const threshold = hero
        ? hero.getBoundingClientRect().bottom + window.scrollY - 80
        : window.innerHeight * 0.75;
      const end = document.querySelector("[data-cta-band], [data-site-footer]");
      const reachedEnd = end ? end.getBoundingClientRect().top < window.innerHeight : false;
      setVisible(window.scrollY > threshold && !reachedEnd);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [hidden, pathname]);

  if (hidden) return null;

  return (
    <div
      className="mobile-cta"
      data-mobile-cta=""
      data-tone="dark"
      data-visible={visible ? "" : undefined}
      aria-hidden={!visible}
      inert={!visible}
    >
      <Button href={mobileCta.href} tone="dark" fullWidth arrow className="sm:max-w-sm">
        {mobileCta.label}
      </Button>
    </div>
  );
}
