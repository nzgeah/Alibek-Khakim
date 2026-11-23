import { Link, NavLink } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLanguage } from '../i18n/context';
import { LANGUAGES, type Lang } from '../i18n/translations';

type Theme = 'dark' | 'light';

function initialTheme(): Theme {
  const saved = localStorage.getItem('theme');
  if (saved === 'light' || saved === 'dark') return saved;
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

export default function Navbar() {
  const { lang, setLang, t } = useLanguage();
  const [theme, setTheme] = useState<Theme>(initialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', next);
    setTheme(next);
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
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? t.toLight : t.toDark}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </nav>
    </header>
  );
}
