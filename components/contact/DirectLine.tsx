import { contact } from "@/lib/content/contact";
import { principal } from "@/lib/content/shared";

/**
 * Beside the contact hero: the promise that a person reads the note, with
 * the founder's monogram set in the serif as a small signature.
 */
export default function DirectLine() {
  return (
    <div className="border-t border-fg pt-6">
      <p className="label text-fg-3">{contact.directLineLabel}</p>
      <p className="serif mt-5 text-h3 text-fg">{contact.directLine}</p>
      <div className="mt-8 flex items-center gap-4">
        <span
          aria-hidden="true"
          className="tone-night serif inline-flex h-14 w-14 flex-none items-center justify-center rounded-full text-[1.375rem] leading-none tracking-[-0.02em]"
        >
          {principal.monogram}
        </span>
        <p className="leading-snug">
          <span className="block font-medium text-fg">{principal.name}</span>
          <span className="block text-small text-fg-3">{principal.role}</span>
        </p>
      </div>
    </div>
  );
}
