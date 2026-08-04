import { Link, NavLink } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.setAttribute('data-theme', 'dark');
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  const scrollToConnect = (e: React.MouseEvent) => {
    e.preventDefault();
    window.dispatchEvent(new Event('connect-scroll-requested'));
    document.getElementById('connect')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="navbar container">
      <Link to="/" className="font-bold text-xl" style={{ color: 'var(--primary)' }}>
        <span className="logo-mark">&lt;/&gt;</span> MyLogo
      </Link>
      
      <div className="nav-links">
        <NavLink to="/" className={({isActive}) => isActive ? 'active' : ''}>Home</NavLink>
        <NavLink to="/projects" className={({isActive}) => isActive ? 'active' : ''}>Projects</NavLink>
        <a href="#connect" onClick={scrollToConnect}>Connect</a>
        
        <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </nav>
  );
}
