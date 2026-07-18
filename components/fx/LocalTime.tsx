"use client";

import { useEffect, useState } from "react";

/**
 * Live Eastern-time readout for the footer. Renders nothing until mounted so
 * server and client markup never disagree.
 */
export default function LocalTime() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-CA", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "America/Toronto",
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span suppressHydrationWarning>
      {time ? `${time} ET` : "— ET"}
    </span>
  );
}
