"use client";

import { useState } from "react";
import { proof } from "@/lib/content";
import { site } from "@/lib/site";
import { Play } from "@/components/site/icons";

/**
 * "On the record": the SSC adoption talk behind a click-to-load facade, so
 * nothing from YouTube loads until the visitor chooses to watch.
 */
export default function Talk({ headingLevel = "h2" }: { headingLevel?: "h2" | "h3" }) {
  const [playing, setPlaying] = useState(false);
  const id = site.video.id;
  const thumb = (name: string) => `https://i.ytimg.com/vi/${id}/${name}.jpg`;
  const H = headingLevel;

  return (
    <div className="talk">
      <div data-reveal>
        <p className="t-label label-row">{proof.kicker}</p>
        <H className="t-h2" style={{ marginTop: "1rem" }}>
          {proof.heading}
        </H>
        <p className="t-body" style={{ marginTop: "1.25rem", maxWidth: "48ch" }}>
          {proof.sub}
        </p>
        <a href={site.video.url} target="_blank" rel="noopener noreferrer" className="link" style={{ marginTop: "1.5rem" }}>
          Open on YouTube
        </a>
      </div>

      <div className="video" data-reveal>
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
            title={proof.heading}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            className="video-poster"
            onClick={() => setPlaying(true)}
            aria-label={`${proof.cta}: ${proof.heading}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={thumb("hqdefault")}
              srcSet={`${thumb("hqdefault")} 480w, ${thumb("sddefault")} 640w, ${thumb("maxresdefault")} 1280w`}
              sizes="(min-width: 1000px) 44rem, 92vw"
              width={1280}
              height={720}
              alt=""
              loading="lazy"
              decoding="async"
            />
            <span className="video-play" aria-hidden="true">
              <Play />
              {proof.cta}
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
