// The loading screen in index.html has two stages:
// 1. "Loading..." until the fonts are in (so text does not change shape after
//    appearing) and it has been visible long enough to read;
// 2. a "Press Start" button. The visitor's click or key press both opens the
//    page and unlocks sound, which browsers block until there is one.
const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

/** Stage 1 is over: the page behind the loading screen is ready to show. */
export const appReady: Promise<void> = Promise.all([
  Promise.race([document.fonts.ready, wait(3000)]),
  wait(900),
]).then(() => {});

let markStarted: () => void = () => {};

/** Stage 2 is over: the visitor pressed start and the loading screen is leaving. */
export const appStarted = new Promise<void>((resolve) => {
  markStarted = resolve;
});

/**
 * Swaps "Loading..." for the "Press Start" button and waits for a click, a
 * tap or a key press. `onStart` runs inside that event, so it may play sound.
 */
export function showStart(onStart: () => void) {
  const loader = document.getElementById('loader');
  const button = document.getElementById('loader-start');
  if (!loader || !button) {
    markStarted();
    return;
  }
  document.getElementById('loader-status')?.setAttribute('hidden', '');
  button.removeAttribute('hidden');
  button.focus();

  const start = () => {
    window.removeEventListener('keydown', onKey);
    button.removeEventListener('click', start);
    onStart();
    loader.classList.add('loader--done');
    setTimeout(() => loader.remove(), 400);
    markStarted();
  };
  // Any key starts, except the ones used to move around or with shortcuts.
  const onKey = (event: KeyboardEvent) => {
    if (event.key === 'Tab' || event.ctrlKey || event.metaKey || event.altKey) return;
    if (['Shift', 'Control', 'Alt', 'Meta'].includes(event.key)) return;
    event.preventDefault();
    start();
  };
  button.addEventListener('click', start);
  window.addEventListener('keydown', onKey);
}
