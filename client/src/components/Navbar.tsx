import { Link, NavLink } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';
import { site } from '../config/site';

type Theme = 'dark' | 'light';

function initialTheme(): Theme {
  const saved = localStorage.getItem('theme');
  if (saved === 'light' || saved === 'dark') return saved;
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

export default function Navbar() {
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
      <nav className="container navbar-inner" aria-label="Main">
        <Link to="/" className="brand">
          <img src="/profile-logo.jpg" alt="" width="32" height="32" />
          <span>{site.name}</span>
        </Link>

        <div className="nav-links">
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/projects">Projects</NavLink>
          <Link to="/#connect">Contact</Link>
          <button
            type="button"
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </nav>
    </header>
  );
}
