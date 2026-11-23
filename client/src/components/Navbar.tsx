import { Link, NavLink } from 'react-router-dom';
import { Moon, Sun, Volume2, VolumeX } from 'lucide-react';
import { useEffect, useState } from 'react';
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
        <Link to="/" className="brand">
          <img src="/profile-logo.jpg" alt="" width="32" height="32" />
          <span>{t.name}</span>
        </Link>

        <div className="nav-links">
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
