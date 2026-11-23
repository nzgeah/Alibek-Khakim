/**
 * Shows the first `shown` characters of `text`. The rest stays in the layout
 * but invisible, so nothing jumps while typing. Screen readers get the full
 * text straight away.
 */
export default function Typed({ text, shown, caret }: { text: string; shown: number; caret: boolean }) {
  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {text.slice(0, shown)}
        {caret && <span className="caret" />}
        <span className="untyped">{text.slice(shown)}</span>
      </span>
    </>
  );
}
