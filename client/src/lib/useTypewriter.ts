import { useEffect, useState } from 'react';
import { appStarted } from './ready';
import { playTalkBlip } from './sound';

export interface TypedLine {
  text: string;
  /** Milliseconds per character. */
  speed: number;
}

// The animation plays once per page load, not on every return to the home page.
let hasPlayed = false;

/**
 * Types several lines one after another. `counts` is how many characters of
 * each line are visible; once `finished` is true, show the lines in full
 * (the text may have changed since, e.g. after a language switch). Skipped
 * when the user prefers reduced motion. The lines are read once, on mount.
 */
export function useTypewriter(lines: TypedLine[]): { counts: number[]; finished: boolean } {
  const [play] = useState(
    () => !hasPlayed && !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  const [script] = useState(lines);
  const [counts, setCounts] = useState<number[]>(() => script.map(() => 0));
  const [finished, setFinished] = useState(!play);

  useEffect(() => {
    if (!play) return;

    let line = 0;
    let shown = 0;
    let timer: ReturnType<typeof setTimeout>;
    let cancelled = false;

    const tick = () => {
      shown += 1;
      const current = line;
      const visible = shown;
      setCounts((prev) => prev.map((n, i) => (i === current ? visible : n)));
      playTalkBlip(script[current].text[visible - 1]);

      if (shown < script[line].text.length) {
        timer = setTimeout(tick, script[line].speed);
        return;
      }
      line += 1;
      shown = 0;
      if (line < script.length) {
        timer = setTimeout(tick, 350);
      } else {
        hasPlayed = true;
        setFinished(true);
      }
    };

    // Start typing only once the visitor has pressed start.
    appStarted.then(() => {
      // Leave room for the start flicker to finish before the talking begins.
      if (!cancelled) timer = setTimeout(tick, 800);
    });
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [play, script]);

  return { counts, finished };
}
