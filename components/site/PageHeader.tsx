import Link from "next/link";
import type { ReactNode } from "react";

type Props = {
  label: string;
  heading: string;
  lead?: string;
  children?: ReactNode;
};

/** Inner-page opener: breadcrumb, the page's single h1, and its lead. */
export default function PageHeader({ label, heading, lead, children }: Props) {
  return (
    <header className="page-header">
      <div className="container">
        <nav aria-label="Breadcrumb">
          <ol className="breadcrumb t-label">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page">{label}</li>
          </ol>
        </nav>
        <h1 className="t-h1">{heading}</h1>
        {lead ? <p className="t-lead">{lead}</p> : null}
        {children}
      </div>
    </header>
  );
}
