// Resolves when the page is ready to be shown: fonts have loaded (so text does
// not change shape after appearing) and the loading screen has been visible
// long enough to read. Fonts are given at most three seconds.
const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

export const appReady: Promise<void> = Promise.all([
  Promise.race([document.fonts.ready, wait(3000)]),
  wait(900),
]).then(() => {});

/** Fades out and removes the loading screen from index.html. */
export function hideLoader() {
  const loader = document.getElementById('loader');
  if (!loader) return;
  loader.classList.add('loader--done');
  setTimeout(() => loader.remove(), 400);
}
