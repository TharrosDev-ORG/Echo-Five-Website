"use client";

import { useEffect, useState } from "react";

/**
 * A slim persistent "Book a conversation" affordance. Appears once the hero is
 * scrolled past and retracts while the contact section (its destination) is on
 * screen, so it never competes with the form.
 */
export default function StickyCTA() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    let contactVisible = false;

    const onScroll = () => {
      const pastHero = window.scrollY > window.innerHeight * 0.85;
      setShown(pastHero && !contactVisible);
    };

    const contact = document.getElementById("contact");
    let io: IntersectionObserver | undefined;
    if (contact && "IntersectionObserver" in window) {
      io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) contactVisible = e.isIntersecting;
          onScroll();
        },
        { rootMargin: "0px 0px -25% 0px" },
      );
      io.observe(contact);
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      io?.disconnect();
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center px-4 pb-4 sm:justify-end sm:pr-6">
      <a
        href="#contact"
        className={`sticky-cta btn btn-primary pointer-events-auto shadow-[0_18px_50px_-18px_var(--color-signal)] ${
          shown ? "is-shown" : ""
        }`}
        aria-hidden={!shown}
        tabIndex={shown ? 0 : -1}
      >
        <span
          className="status-dot"
          style={{ background: "var(--color-ink-on-signal)" }}
          aria-hidden="true"
        />
        Book a conversation
      </a>
    </div>
  );
}
