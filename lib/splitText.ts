/**
 * Minimal, dependency-free text splitter for kinetic reveals.
 *
 * Wraps each word in a two-element structure:
 *   <span class="split-line">   (overflow:hidden mask)
 *     <span class="split-word"> (the animated target)
 *
 * Words are the safe unit to split on — characters break screen readers and
 * line-splitting needs re-measurement on resize. Word masks give the classic
 * "lines rise out of a clip" award-site look without those costs.
 */

export type SplitResult = {
  /** The animatable word spans, in document order. */
  words: HTMLElement[];
  /** Restore the element to its original markup. */
  revert: () => void;
};

export function splitWords(el: HTMLElement): SplitResult {
  const original = el.innerHTML;
  const text = el.textContent ?? "";
  const tokens = text.split(/(\s+)/); // keep whitespace tokens

  el.innerHTML = "";
  const words: HTMLElement[] = [];

  for (const token of tokens) {
    if (token.trim() === "") {
      // Preserve spacing between word masks.
      el.appendChild(document.createTextNode(token));
      continue;
    }
    const mask = document.createElement("span");
    mask.className = "split-line";
    // The original text stays accessible via the parent's aria-label; hide the
    // visual fragments so AT never reassembles the headline word-by-word.
    mask.setAttribute("aria-hidden", "true");
    const word = document.createElement("span");
    word.className = "split-word";
    word.textContent = token;
    mask.appendChild(word);
    el.appendChild(mask);
    words.push(word);
  }

  return {
    words,
    revert: () => {
      el.innerHTML = original;
    },
  };
}

/**
 * Split into characters (each wrapped, no mask). Used sparingly for short
 * labels/wordmarks where a per-letter cascade reads well. aria-label should be
 * set by the caller so the original text stays accessible.
 */
export function splitChars(el: HTMLElement): SplitResult {
  const original = el.innerHTML;
  const text = el.textContent ?? "";
  el.innerHTML = "";
  const chars: HTMLElement[] = [];

  for (const ch of text) {
    const span = document.createElement("span");
    span.className = "split-char";
    span.setAttribute("aria-hidden", "true");
    span.textContent = ch === " " ? " " : ch;
    el.appendChild(span);
    chars.push(span);
  }

  return {
    words: chars,
    revert: () => {
      el.innerHTML = original;
    },
  };
}
