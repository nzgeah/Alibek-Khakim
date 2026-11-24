import { Link, NavLink, useLocation } from 'react-router-dom';
import { Moon, Sun, Volume2, VolumeX } from 'lucide-react';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useLanguage } from '../i18n/context';
import { LANGUAGES, type Lang } from '../i18n/translations';
import { isSoundEnabled, playSound, setSoundEnabled } from '../lib/sound';

type Theme = 'dark' | 'light';

function initialTheme(): Theme {
  const saved = localStorage.getItem('theme');
  if (saved === 'light' || saved === 'dark') return saved;
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

export default function Navbar() {
  const { lang, setLang, t } = useLanguage();
  const [theme, setTheme] = useState<Theme>(initialTheme);
  const [sound, setSound] = useState(isSoundEnabled);
  const { pathname } = useLocation();
  const linksRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<HTMLSpanElement>(null);

  // The highlight behind the current page's link is one element that slides
  // from link to link, instead of a background that jumps between them.
  useLayoutEffect(() => {
    const links = linksRef.current;
    const marker = markerRef.current;
    if (!links || !marker) return;

    const place = () => {
      const active = links.querySelector<HTMLElement>('a.active');
      if (!active) {
        marker.style.opacity = '0';
        return;
      }
      marker.style.opacity = '1';
      marker.style.width = `${active.offsetWidth}px`;
      marker.style.height = `${active.offsetHeight}px`;
      marker.style.transform = `translate(${active.offsetLeft}px, ${active.offsetTop}px)`;
    };

    place();
    // Link widths change with the language, the font loading and the window.
    const observer = new ResizeObserver(place);
    observer.observe(links);
    links.querySelectorAll('a').forEach((link) => observer.observe(link));
    return () => observer.disconnect();
  }, [pathname, lang]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', next);
    setTheme(next);
  };

  const toggleSound = () => {
    const next = !sound;
    setSoundEnabled(next);
    setSound(next);
    // Confirm with a sound only when turning them on.
    if (next) playSound('toggle');
  };

  return (
    <header className="navbar">
      <nav className="container navbar-inner" aria-label={t.nav.main}>
        {/* A plain link on purpose: the logo reloads the whole site from the
            start screen, while Home only switches the page. */}
        <a href="/" className="brand">
          <img src="/profile-logo.jpg" alt="" width="32" height="32" />
          <span>{t.name}</span>
        </a>

        <div className="nav-links" ref={linksRef}>
          <span className="nav-marker" ref={markerRef} aria-hidden="true" />
          <NavLink to="/" end>
            {t.nav.home}
          </NavLink>
          <NavLink to="/projects">{t.nav.projects}</NavLink>
          <Link to="/#connect">{t.nav.contact}</Link>
          <select
            className="lang-select"
            value={lang}
            onChange={(e) => setLang(e.target.value as Lang)}
            aria-label={t.language}
          >
            {LANGUAGES.map((l) => (
              <option key={l.code} value={l.code} title={l.name}>
                {l.label}
              </option>
            ))}
          </select>
          <button
            type="button"
            className="theme-toggle"
            onClick={toggleSound}
            aria-label={sound ? t.soundOff : t.soundOn}
            aria-pressed={sound}
            data-sound="none"
          >
            {sound ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </button>
          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            data-sound="toggle"
            aria-label={theme === 'dark' ? t.toLight : t.toDark}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </nav>
    </header>
  );
}
