import { cx } from "@/lib/cx";

type Dir = "right" | "down" | "up-right";

const paths: Record<Dir, string> = {
  right: "M3 10h13m-5-5 5 5-5 5",
  down: "M10 3v13m-5-5 5 5 5-5",
  "up-right": "M5.5 14.5 14.5 5.5M7 5.5h7.5V13",
};

function Glyph({ dir }: { dir: Dir }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d={paths[dir]} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * An arrow that slides out and back in when its link or button is hovered
 * (styles: `.arrow` in globals.css). Decorative; the link text carries meaning.
 */
export default function Arrow({ dir = "right", className }: { dir?: Dir; className?: string }) {
  return (
    <span className={cx("arrow", dir === "down" && "arrow-down", className)} aria-hidden="true">
      <Glyph dir={dir} />
      <Glyph dir={dir} />
    </span>
  );
}
