"use client";

import { useEffect, useRef, useState } from "react";
import { talk } from "@/lib/content";
import { cx } from "@/lib/cx";
import { site } from "@/lib/site";
import { Play } from "@/components/ui/icons";

/**
 * The conference talk video behind a click-to-load facade: nothing from
 * YouTube loads until the visitor chooses to watch.
 */
export default function Talk({ className }: { className?: string }) {
  const [playing, setPlaying] = useState(false);
  const frame = useRef<HTMLIFrameElement>(null);
  const id = site.video.id;
  const thumb = (name: string) => `https://i.ytimg.com/vi/${id}/${name}.jpg`;

  // The facade button unmounts on play; hand focus to the player so keyboard
  // and screen-reader users keep their place.
  useEffect(() => {
    if (playing) frame.current?.focus();
  }, [playing]);

  return (
    <div
      className={cx(
        "relative aspect-video overflow-hidden rounded-panel border border-edge bg-spruce shadow-[var(--card-shadow)]",
        className,
      )}
    >
      {playing ? (
        <iframe
          ref={frame}
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={talk.heading}
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 size-full border-0"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`${talk.cta}: ${talk.heading}`}
          // The ring is drawn inset over the dark poster, so it takes the dark-ground focus color.
          data-tone="dark"
          className="group absolute inset-0 size-full cursor-pointer focus-visible:-outline-offset-4"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={thumb("hqdefault")}
            srcSet={`${thumb("hqdefault")} 480w, ${thumb("sddefault")} 640w, ${thumb("maxresdefault")} 1280w`}
            sizes="(min-width: 1024px) 50rem, 92vw"
            width={1280}
            height={720}
            alt=""
            loading="lazy"
            decoding="async"
            className="size-full object-cover"
          />
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-spruce/80 via-spruce/10 to-transparent"
          />
          <span
            aria-hidden="true"
            className="absolute bottom-4 left-4 inline-flex min-h-12 items-center gap-2.5 rounded-full bg-citron py-2 pr-5 pl-2 font-semibold text-spruce transition-transform duration-150 group-hover:-translate-y-0.5 sm:bottom-6 sm:left-6"
          >
            <span className="flex size-8 items-center justify-center rounded-full bg-spruce text-citron">
              <Play size={14} />
            </span>
            {talk.cta}
          </span>
        </button>
      )}
    </div>
  );
}
