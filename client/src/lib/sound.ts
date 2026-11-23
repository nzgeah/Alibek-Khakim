// Small interface sounds, synthesised with Web Audio (no audio files).
//
// Rules that keep them from being annoying:
// - they only ever play in answer to a click or a choice the visitor made,
//   never on load, hover, scroll or the background animation;
// - they are short (under 0.15s) and quiet;
// - one switch in the navbar turns them off, and the choice is remembered.

type SoundName = 'click' | 'toggle';

const STORAGE_KEY = 'sound';
const VOLUME = 0.05;
const MIN_GAP_MS = 70; // never stack sounds closer than this

let context: AudioContext | null = null;
let enabled = localStorage.getItem(STORAGE_KEY) !== 'off';
let lastPlayed = 0;

export const isSoundEnabled = () => enabled;

export function setSoundEnabled(value: boolean) {
  enabled = value;
  localStorage.setItem(STORAGE_KEY, value ? 'on' : 'off');
}

/** One soft note: a triangle wave with a quick fade-out. */
function note(ctx: AudioContext, frequency: number, start: number, duration: number) {
  const oscillator = ctx.createOscillator();
  const gain = ctx.createGain();
  oscillator.type = 'triangle';
  oscillator.frequency.setValueAtTime(frequency, start);
  gain.gain.setValueAtTime(0, start);
  gain.gain.linearRampToValueAtTime(VOLUME, start + 0.005);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  oscillator.connect(gain).connect(ctx.destination);
  oscillator.start(start);
  oscillator.stop(start + duration + 0.01);
}

export function playSound(name: SoundName) {
  if (!enabled) return;
  const now = performance.now();
  if (now - lastPlayed < MIN_GAP_MS) return;
  lastPlayed = now;

  try {
    // Browsers only allow audio after a user gesture; this is always called
    // from one, so the context can be created (or resumed) here.
    context ??= new AudioContext();
    if (context.state === 'suspended') void context.resume();
    const t = context.currentTime;
    if (name === 'click') {
      note(context, 620, t, 0.07);
    } else {
      note(context, 520, t, 0.06);
      note(context, 780, t + 0.06, 0.08);
    }
  } catch {
    // No audio support: stay silent.
  }
}

/**
 * Plays a sound for clicks on links and buttons anywhere on the page.
 * An element can pick its sound with data-sound="toggle", or opt out with
 * data-sound="none".
 */
export function initSounds() {
  document.addEventListener('click', (event) => {
    const target = event.target instanceof Element ? event.target : null;
    const control = target?.closest<HTMLElement>('a, button');
    if (!control || control.matches(':disabled')) return;
    const choice = control.dataset.sound;
    if (choice === 'none') return;
    playSound(choice === 'toggle' ? 'toggle' : 'click');
  });
  // Dropdowns (the language switch) confirm when a new value is picked.
  document.addEventListener('change', (event) => {
    if (event.target instanceof HTMLSelectElement) playSound('toggle');
  });
}
