import type { ReactNode, SVGProps } from "react";

/**
 * Hand-drawn inline icons on a 24px grid, stroked in `currentColor`.
 * Decorative by default (`aria-hidden`); every use should sit next to visible
 * text or carry its own accessible name on the parent control.
 */
type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & { size?: number };

function svg(paths: ReactNode, displayName: string) {
  function Icon({ size = 20, strokeWidth = 1.75, ...rest }: IconProps) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        focusable="false"
        {...rest}
      >
        {paths}
      </svg>
    );
  }
  Icon.displayName = displayName;
  return Icon;
}

export const ArrowRight = svg(<path d="M5 12h14m-6-6 6 6-6 6" />, "ArrowRight");
export const External = svg(<path d="M7 17 17 7M8.5 7H17v8.5" />, "External");
export const Check = svg(<path d="m5 12.5 4.5 4.5L19 7.5" />, "Check");
export const Menu = svg(<path d="M4 8h16M4 16h16" />, "Menu");
export const Close = svg(<path d="M6 6l12 12M18 6 6 18" />, "Close");
export const Plus = svg(<path d="M12 5v14M5 12h14" />, "Plus");
export const Play = svg(
  <path d="M8 5.5v13l11-6.5-11-6.5Z" fill="currentColor" stroke="none" />,
  "Play",
);
export const Pause = svg(<path d="M9 6v12M15 6v12" />, "Pause");
export const Mail = svg(
  <>
    <rect x="3" y="5" width="18" height="14" rx="2.5" />
    <path d="m4 7 8 6 8-6" />
  </>,
  "Mail",
);
export const Shield = svg(
  <>
    <path d="M12 3 19.5 6v5.5c0 4.5-3.2 8.3-7.5 9.5-4.3-1.2-7.5-5-7.5-9.5V6L12 3Z" />
    <path d="m9 12 2 2 4-4" />
  </>,
  "Shield",
);
export const Certificate = svg(
  <>
    <circle cx="12" cy="9" r="5.5" />
    <path d="M8.6 13.4 7 21l5-2.5 5 2.5-1.6-7.6" />
  </>,
  "Certificate",
);
export const FileText = svg(
  <>
    <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z" />
    <path d="M14 3v5h5M9 13h6M9 17h4" />
  </>,
  "FileText",
);

/* Service and toolkit icons */
export const Compass = svg(
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" />
  </>,
  "Compass",
);
export const Megaphone = svg(
  <>
    <path d="M4 10v4a1 1 0 0 0 1 1h2l8 4V5L7 9H5a1 1 0 0 0-1 1Z" />
    <path d="M18.5 9.5a3.5 3.5 0 0 1 0 5M8 15l1 4.5" />
  </>,
  "Megaphone",
);
export const Users = svg(
  <>
    <circle cx="9" cy="8" r="3.25" />
    <path d="M3.5 19c.6-3 2.8-4.75 5.5-4.75S13.9 16 14.5 19M15.5 5.2a3 3 0 0 1 0 5.6M17 14.5c1.9.5 3.1 2 3.5 4.5" />
  </>,
  "Users",
);
export const Pen = svg(
  <path d="M14.5 5.5l4 4L9 19H5v-4l9.5-9.5ZM12.5 7.5l4 4" />,
  "Pen",
);
export const Sparkle = svg(
  <path d="M11 3.5 12.9 8.6 18 10.5l-5.1 1.9L11 17.5l-1.9-5.1L4 10.5l5.1-1.9L11 3.5ZM18.5 15.5v5M16 18h5" />,
  "Sparkle",
);
export const Migrate = svg(
  <path d="M4 8h13m-3.5-3.5L17 8l-3.5 3.5M20 16H7m3.5-3.5L7 16l3.5 3.5" />,
  "Migrate",
);
export const Book = svg(
  <path d="M12 6.5C10.5 5 8 4.5 4 4.5v13c4 0 6.5.5 8 2 1.5-1.5 4-2 8-2v-13c-4 0-6.5.5-8 2Zm0 0v13" />,
  "Book",
);
export const Template = svg(
  <>
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <path d="M4 9h16M10 9v11" />
  </>,
  "Template",
);
export const MapFold = svg(
  <path d="M9 4.5 4 6.5v13l5-2 6 2 5-2v-13l-5 2-6-2Zm0 0v13m6-11v13" />,
  "MapFold",
);
export const Clipboard = svg(
  <>
    <rect x="5.5" y="4.5" width="13" height="16" rx="2" />
    <path d="M9.5 3h5v3h-5zM9 11h6M9 15h4" />
  </>,
  "Clipboard",
);

/** Name-keyed lookup so content data can say which icon an item uses. */
export const icons = {
  "arrow-right": ArrowRight,
  external: External,
  check: Check,
  menu: Menu,
  close: Close,
  plus: Plus,
  play: Play,
  pause: Pause,
  mail: Mail,
  shield: Shield,
  certificate: Certificate,
  file: FileText,
  compass: Compass,
  megaphone: Megaphone,
  users: Users,
  pen: Pen,
  sparkle: Sparkle,
  migrate: Migrate,
  book: Book,
  template: Template,
  map: MapFold,
  clipboard: Clipboard,
} as const;

export type IconName = keyof typeof icons;

export function Icon({ name, ...rest }: IconProps & { name: IconName }) {
  const Component = icons[name];
  return <Component {...rest} />;
}
