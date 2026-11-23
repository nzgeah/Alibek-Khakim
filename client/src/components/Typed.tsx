import type { CSSProperties } from 'react';

interface TypedProps {
  text: string;
  /** How many characters are visible. */
  shown: number;
  caret: boolean;
  /** Once fully typed, run a highlight across the letters, left to right. */
  sweep?: boolean;
}

/**
 * Shows the first `shown` characters of `text`. The rest stays in the layout
 * but invisible, so nothing jumps while typing. Screen readers get the full
 * text straight away.
 */
export default function Typed({ text, shown, caret, sweep = false }: TypedProps) {
  const done = shown >= text.length;
  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {sweep && done
          ? [...text].map((char, i) => (
              <span key={i} className="sweep-letter" style={{ '--i': i } as CSSProperties}>
                {char}
              </span>
            ))
          : text.slice(0, shown)}
        {caret && <span className="caret" />}
        <span className="untyped">{text.slice(shown)}</span>
      </span>
    </>
  );
}
