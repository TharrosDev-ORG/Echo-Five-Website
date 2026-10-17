/**
 * Re-mounts on every navigation, so each page enters with a short rise
 * (`.page-enter` in globals.css; off under reduced motion).
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
