import { useEffect, useRef } from 'react';

// Width of the page content (.container max-width in index.css). Stars are
// drawn in the empty margins on either side of it.
const CONTENT_WIDTH = 1120;
const PIXEL = 3; // size of one "pixel" of the artwork, in CSS pixels

interface Star {
  x: number;
  y: number;
  size: number; // in art pixels
  phase: number;
  speed: number;
  tint: number; // index into the palette
  sparkle: boolean; // bright stars get a plus-shaped glint
}

interface Comet {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number; // seconds left
}

const PALETTES = {
  dark: ['232, 237, 244', '101, 212, 181', '77, 141, 255'],
  light: ['23, 35, 61', '15, 118, 110', '29, 95, 224'],
};

const random = (min: number, max: number) => min + Math.random() * (max - min);
const snap = (value: number) => Math.round(value / PIXEL) * PIXEL;

function makeStars(width: number, height: number): Star[] {
  const margin = (width - CONTENT_WIDTH) / 2;
  const stars: Star[] = [];
  const add = (x: number, y: number, dim: boolean) =>
    stars.push({
      x: snap(x),
      y: snap(y),
      size: Math.random() < 0.25 ? 2 : 1,
      phase: random(0, Math.PI * 2),
      speed: random(0.6, 2.2),
      tint: Math.random() < 0.7 ? 0 : Math.random() < 0.5 ? 1 : 2,
      sparkle: !dim && Math.random() < 0.12,
    });

  if (margin >= 40) {
    // Wide screen: fill both side margins.
    const count = Math.round((margin * height) / 5200);
    for (let i = 0; i < count; i++) {
      add(random(4, margin - 12), random(0, height), false);
      add(random(width - margin + 12, width - 4), random(0, height), false);
    }
  } else {
    // No margins (tablet, phone): a few faint stars behind the content.
    const count = Math.round((width * height) / 26000);
    for (let i = 0; i < count; i++) add(random(0, width), random(0, height), true);
  }
  return stars;
}

/**
 * A comet that crosses the whole screen on a shallow diagonal: from the top
 * left corner down to the right, or from the top right down to the left.
 */
function makeComet(width: number, height: number): Comet {
  const fromLeft = Math.random() < 0.5;
  const speed = random(520, 700);
  const angle = random(0.19, 0.33); // 11 to 19 degrees below horizontal
  return {
    x: fromLeft ? -40 : width + 40,
    y: random(height * 0.02, height * 0.14),
    vx: Math.cos(angle) * speed * (fromLeft ? 1 : -1),
    vy: Math.sin(angle) * speed,
    life: 8,
  };
}

/**
 * Fixed full-screen canvas behind the page: twinkling pixel stars in the side
 * margins and, on screens wide enough to have margins, an occasional comet
 * crossing diagonally. The comet is hidden behind the content column, so it
 * shows in one margin, disappears, and comes out in the other.
 */
export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let width = 0;
    let height = 0;
    let stars: Star[] = [];
    let comet: Comet | null = null;
    let nextComet = random(3, 7);
    let last = performance.now();
    let frame = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.imageSmoothingEnabled = false;
      stars = makeStars(width, height);
      if (still) draw(0, 0);
    };

    const draw = (time: number, dt: number) => {
      const light = document.documentElement.dataset.theme === 'light';
      const palette = light ? PALETTES.light : PALETTES.dark;
      const strength = light ? 0.55 : 1;
      const dimAll = width - CONTENT_WIDTH < 80 ? 0.35 : 1;
      ctx.clearRect(0, 0, width, height);

      for (const star of stars) {
        // Stepped brightness so stars blink like pixels rather than fade smoothly.
        const wave = still ? 0.6 : (Math.sin(time * star.speed + star.phase) + 1) / 2;
        const level = Math.round(wave * 4) / 4;
        const alpha = (0.15 + level * 0.75) * strength * dimAll;
        const size = star.size * PIXEL;
        ctx.fillStyle = `rgba(${palette[star.tint]}, ${alpha})`;
        ctx.fillRect(star.x, star.y, size, size);
        if (star.sparkle && level >= 0.75) {
          ctx.fillStyle = `rgba(${palette[star.tint]}, ${alpha * 0.55})`;
          ctx.fillRect(star.x - PIXEL, star.y, PIXEL, size);
          ctx.fillRect(star.x + size, star.y, PIXEL, size);
          ctx.fillRect(star.x, star.y - PIXEL, size, PIXEL);
          ctx.fillRect(star.x, star.y + size, size, PIXEL);
        }
      }

      // Comets show in the side margins only; without margins there are none.
      const margin = (width - CONTENT_WIDTH) / 2;
      if (still || margin < 40) return;

      if (!comet) {
        nextComet -= dt;
        if (nextComet <= 0) comet = makeComet(width, height);
        return;
      }

      comet.x += comet.vx * dt;
      comet.y += comet.vy * dt;
      comet.life -= dt;

      // Head, then a tail of shrinking, fading squares behind it.
      const length = Math.hypot(comet.vx, comet.vy);
      const ux = comet.vx / length;
      const uy = comet.vy / length;
      const segments = 14;
      // Never draw over the content column: the comet passes behind it.
      ctx.save();
      ctx.beginPath();
      ctx.rect(0, 0, margin - 8, height);
      ctx.rect(width - margin + 8, 0, margin - 8, height);
      ctx.clip();
      for (let i = 0; i < segments; i++) {
        const fade = 1 - i / segments;
        const size = i < 2 ? PIXEL * 2 : PIXEL;
        const tint = i < 3 ? palette[0] : palette[2];
        ctx.fillStyle = `rgba(${tint}, ${fade * fade * 0.9 * strength * dimAll})`;
        ctx.fillRect(
          snap(comet.x - ux * i * PIXEL * 2.2),
          snap(comet.y - uy * i * PIXEL * 2.2),
          size,
          size,
        );
      }
      ctx.restore();

      const gone =
        comet.life <= 0 || comet.y > height + 60 || comet.x < -120 || comet.x > width + 120;
      if (gone) {
        comet = null;
        nextComet = random(6, 14);
      }
    };

    const tick = (now: number) => {
      // Clamp the step so a background tab does not make the comet leap.
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      draw(now / 1000, dt);
      frame = requestAnimationFrame(tick);
    };

    resize();
    window.addEventListener('resize', resize);
    // Redraw the still version when the theme changes.
    const themeObserver = new MutationObserver(() => still && draw(0, 0));
    themeObserver.observe(document.documentElement, { attributeFilter: ['data-theme'] });
    if (!still) frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      themeObserver.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="starfield" aria-hidden="true" />;
}
