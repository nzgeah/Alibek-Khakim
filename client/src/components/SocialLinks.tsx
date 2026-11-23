import { site } from '../config/site';

// Pixel-art icons on a 16x16 grid: '#' is a filled pixel. Drawn by hand so
// they match the pixel fonts; edit a row to change the picture.
const ICONS: Record<string, string[]> = {
  GitHub: [
    '....########....',
    '..############..',
    '.##############.',
    '.##.########.##.',
    '###..######..###',
    '###..........###',
    '##............##',
    '##............##',
    '##............##',
    '###..........###',
    '####........####',
    '##.###....######',
    '###.##....######',
    '.###......#####.',
    '..####....####..',
    '....##....##....',
  ],
  Telegram: [
    '....########....',
    '..############..',
    '.##############.',
    '.##############.',
    '###########..###',
    '########.....###',
    '#####.....#..###',
    '###.....#...####',
    '#######.....####',
    '########....####',
    '#########..#####',
    '################',
    '.##############.',
    '.##############.',
    '..############..',
    '....########....',
  ],
  Instagram: [
    '..############..',
    '.##############.',
    '##............##',
    '##.........##.##',
    '##.........##.##',
    '##....####....##',
    '##...##..##...##',
    '##..##....##..##',
    '##..##....##..##',
    '##...##..##...##',
    '##....####....##',
    '##............##',
    '##............##',
    '##............##',
    '.##############.',
    '..############..',
  ],
};

/** One <rect> per horizontal run of filled pixels. */
function PixelIcon({ name, size }: { name: string; size: number }) {
  const rows = ICONS[name];
  if (!rows) return null;
  const runs: { x: number; y: number; width: number }[] = [];
  rows.forEach((row, y) => {
    for (const match of row.matchAll(/#+/g)) {
      runs.push({ x: match.index, y, width: match[0].length });
    }
  });
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="currentColor"
      shapeRendering="crispEdges"
      aria-hidden="true"
    >
      {runs.map((run) => (
        <rect key={`${run.x}-${run.y}`} x={run.x} y={run.y} width={run.width} height="1" />
      ))}
    </svg>
  );
}

/** `cards` shows name and handle (contact section); `icons` is the compact footer row. */
export default function SocialLinks({ variant }: { variant: 'cards' | 'icons' }) {
  if (variant === 'icons') {
    return (
      <ul className="social-icons">
        {site.socials.map((s) => (
          <li key={s.name}>
            <a href={s.url} target="_blank" rel="noopener noreferrer" aria-label={s.name}>
              <PixelIcon name={s.name} size={16} />
            </a>
          </li>
        ))}
      </ul>
    );
  }
  return (
    <ul className="social-cards">
      {site.socials.map((s) => (
        <li key={s.name}>
          <a href={s.url} target="_blank" rel="noopener noreferrer" className="social-card">
            <PixelIcon name={s.name} size={32} />
            <span>
              <strong>{s.name}</strong>
              <span className="muted">{s.handle}</span>
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
