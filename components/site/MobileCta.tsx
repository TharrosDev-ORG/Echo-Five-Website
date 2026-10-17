"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { mobileCta } from "@/lib/content/shared";
import Button from "@/components/ui/Button";

/**
 * A fixed "Start a conversation" bar on phones. It appears once the reader is
 * past the first screen and steps aside near the footer and on /contact.
 */
export default function MobileCta() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);

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

  return (
    <div
      className="mobile-cta fixed inset-x-0 bottom-0 z-30 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] transition-transform duration-500 ease-[var(--ease-out-expo)] min-[900px]:hidden"
      style={{ transform: show ? "none" : "translateY(130%)" }}
      aria-hidden={!show}
      inert={!show}
    >
      <div className="tone-paper rounded-full p-1.5 shadow-[0_12px_40px_-12px_rgb(11_13_18/0.45)] ring-1 ring-rule">
        <Button href={mobileCta.href} className="w-full">
          {mobileCta.label}
        </Button>
      </div>
    </div>
  );
}
