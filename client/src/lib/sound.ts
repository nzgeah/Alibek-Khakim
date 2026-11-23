// Small interface sounds in an 8-bit, old-console style, synthesised with
// Web Audio (no audio files): pulse-wave blips with hard on/off edges, like
// a retro RPG menu. The tunes are original, not taken from any game.
//
// Rules that keep them from being annoying:
// - they only play in answer to a click or a choice the visitor made, plus
//   a fanfare when they press start and the typing of the greeting right
//   after it; never on hover,
//   scroll or the background animation;
// - they are short and quiet (clicks under 0.15s, the fanfare under a second);
// - one switch in the navbar turns them off, and the choice is remembered.

type SoundName = 'click' | 'toggle';

const STORAGE_KEY = 'sound';
const VOLUME = 0.035; // pulse waves are bright, so they run quieter
const MIN_GAP_MS = 70; // never stack sounds closer than this
const TALK_GAP_MS = 55; // typing blips: at most about 18 a second

let context: AudioContext | null = null;
let enabled = localStorage.getItem(STORAGE_KEY) !== 'off';
let lastPlayed = 0;
let lastTalk = 0;

export const isSoundEnabled = () => enabled;

export function setSoundEnabled(value: boolean) {
  enabled = value;
  localStorage.setItem(STORAGE_KEY, value ? 'on' : 'off');
}

// A 25% pulse wave: the thin, buzzy lead voice of 8-bit consoles.
let pulseWave: PeriodicWave | null = null;
function getPulseWave(ctx: AudioContext): PeriodicWave {
  if (!pulseWave) {
    const harmonics = 32;
    const duty = 0.25;
    const real = new Float32Array(harmonics + 1);
    const imag = new Float32Array(harmonics + 1);
    for (let n = 1; n <= harmonics; n++) {
      real[n] = (2 / (n * Math.PI)) * Math.sin(n * Math.PI * duty);
    }
    pulseWave = ctx.createPeriodicWave(real, imag);
  }
  return pulseWave;
}

/**
 * One chip note: full volume straight away, held, then cut. The few
 * milliseconds of fade at the end only prevent an audible pop.
 */
function note(
  ctx: AudioContext,
  frequency: number,
  start: number,
  duration: number,
  voice: 'pulse' | 'triangle' = 'pulse',
  loudness = 1,
) {
  const oscillator = ctx.createOscillator();
  const gain = ctx.createGain();
  if (voice === 'pulse') oscillator.setPeriodicWave(getPulseWave(ctx));
  else oscillator.type = 'triangle';
  oscillator.frequency.setValueAtTime(frequency, start);
  // The triangle is the soft bass voice, so it can sit a little louder.
  const level = (voice === 'pulse' ? VOLUME : VOLUME * 1.6) * loudness;
  gain.gain.setValueAtTime(level, start);
  gain.gain.setValueAtTime(level, start + duration - 0.012);
  gain.gain.linearRampToValueAtTime(0, start + duration);
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
      // Menu "select": one high blip with a tiny upward flick.
      note(context, 987.77, t, 0.03);
      note(context, 1318.5, t + 0.03, 0.04);
    } else {
      // Switch flipped: three quick steps up.
      note(context, 659.25, t, 0.04);
      note(context, 880, t + 0.04, 0.04);
      note(context, 1174.7, t + 0.08, 0.06);
    }
  } catch {
    // No audio support: stay silent.
  }
}

/**
 * The "talking" blip of retro RPG dialogue: one short low note per letter as
 * text types out. Fast text would turn into a buzz, so blips are spaced out
 * and letters in between stay silent. Spaces and punctuation are silent too,
 * which gives the speech its rhythm.
 */
export function playTalkBlip(character: string | undefined) {
  if (!enabled || !context || context.state !== 'running') return;
  if (!character || !/[\p{L}\p{N}]/u.test(character)) return;
  const now = performance.now();
  if (now - lastTalk < TALK_GAP_MS) return;
  lastTalk = now;
  try {
    note(context, 440, context.currentTime, 0.035, 'pulse', 0.6);
  } catch {
    // Stay silent.
  }
}

/**
 * A short 8-bit fanfare for the moment the visitor presses start.
 *
 * Browsers refuse to play sound until the visitor has interacted with the
 * page, which is why this is called from the Press Start click. If it is
 * blocked anyway it stays silent rather than playing late.
 */
export async function playReadyChime() {
  if (!enabled) return;
  try {
    context ??= new AudioContext();
    if (context.state !== 'running') {
      const refused = new Promise<void>((resolve) => setTimeout(resolve, 250));
      await Promise.race([context.resume(), refused]);
    }
    if (context.state !== 'running') return;
    lastPlayed = performance.now();
    // A fast arpeggio racing up two octaves (C5 E5 G5 C6 E6), landing on a
    // held G6, with a triangle bass note under each half.
    const t = context.currentTime + 0.02;
    const step = 0.065;
    [523.25, 659.25, 783.99, 1046.5, 1318.5].forEach((frequency, i) => {
      note(context!, frequency, t + i * step, step);
    });
    note(context, 1567.98, t + 5 * step, 0.3);
    note(context, 130.81, t, 5 * step, 'triangle');
    note(context, 196, t + 5 * step, 0.3, 'triangle');
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
