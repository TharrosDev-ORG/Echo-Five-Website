import Link from "next/link";
import { cx } from "@/lib/cx";
import { ArrowRight, External } from "@/components/ui/icons";

export type IndexItem = {
  href: string;
  /** Row number such as "01". */
  index: string;
  title: string;
  body?: string;
  /** Short label at the trailing edge, e.g. a file format. */
  tag?: string;
  /** Open `href` in a new tab (adds an external icon and screen-reader note). */
  external?: boolean;
};

type Props = {
  items: IndexItem[];
  className?: string;
};

/**
 * Full-width numbered rows. The whole row is one link; on hover and keyboard
 * focus it floods with the accent fill and an arrow slides in.
 */
export default function IndexList({ items, className }: Props) {
  return (
    <ol className={cx("index-list", className)}>
      {items.map((item) => (
        <li key={item.href}>
          <Row item={item} />
        </li>
      ))}
    </ol>
  );
}

function Row({ item }: { item: IndexItem }) {
  const { href, index, title, body, tag, external } = item;
  const content = (
    <>
      <span className="index-row-num text-label tabular-nums">{index}</span>
      <div>
        <h3 className="text-h3">{title}</h3>
        {body ? <p className="index-row-body">{body}</p> : null}
      </div>
      <span className="index-row-end">
        {tag ? <span className="index-row-tag text-label font-semibold">{tag}</span> : null}
        {external ? (
          <External size={20} className="index-row-arrow" />
        ) : (
          <ArrowRight size={20} className="index-row-arrow" />
        )}
      </span>
      {external ? <span className="sr-only"> (opens in a new tab)</span> : null}
    </>
  );

  if (external) {
    return (
      <a href={href} className="index-row" target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  // Mailto, tel, hash, and absolute URLs are not client-side routes.
  if (/^(https?:|mailto:|tel:|#)/.test(href)) {
    return (
      <a href={href} className="index-row">
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className="index-row">
      {content}
    </Link>
  );
}
