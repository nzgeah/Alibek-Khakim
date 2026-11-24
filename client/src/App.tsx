import { useEffect, type ReactNode } from 'react';
import { BrowserRouter, Link, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import SocialLinks from './components/SocialLinks';
import Starfield from './components/Starfield';
import { useLanguage } from './i18n/context';
import LanguageProvider from './i18n/LanguageProvider';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';
import Home from './pages/Home';
import ProjectDetails from './pages/ProjectDetails';
import Projects from './pages/Projects';

/** Scrolls to the #hash target after navigation, or to the top of a new page. */
function ScrollManager() {
  const { pathname, search, hash, key } = useLocation();

  useEffect(() => {
    if (!hash) {
      // Jump, don't glide: the new page fades in already at the top, rather
      // than appearing scrolled down and then sliding up.
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }
    // Drop the #section from the address once it has been used, so reloading
    // the page opens it at the top instead of jumping back to that section.
    window.history.replaceState(
      window.history.state,
      '',
      window.location.pathname + window.location.search,
    );

    const scrollToTarget = (behavior: ScrollBehavior) =>
      document.getElementById(hash.slice(1))?.scrollIntoView({ behavior });

    // Wait a frame so the target page has rendered.
    const frame = requestAnimationFrame(() => scrollToTarget('smooth'));
    // Content that loads late (the project list) shifts the layout; keep the
    // target in place for a moment instead of landing above it. Stop as soon
    // as the visitor scrolls on their own.
    const observer = new ResizeObserver(() => scrollToTarget('instant'));
    const stopFollowing = () => observer.disconnect();
    const settle = setTimeout(() => observer.observe(document.body), 700);
    const stop = setTimeout(stopFollowing, 4000);
    const userEvents = ['wheel', 'touchmove', 'keydown', 'mousedown'] as const;
    userEvents.forEach((name) => window.addEventListener(name, stopFollowing, { passive: true }));
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(settle);
      clearTimeout(stop);
      stopFollowing();
      userEvents.forEach((name) => window.removeEventListener(name, stopFollowing));
    };
    // `key` changes on every navigation, so clicking Contact twice works.
  }, [pathname, search, hash, key]);

  return null;
}

function NotFound() {
  const { t } = useLanguage();
  return (
    <div className="container page">
      <h1>{t.pageNotFound}</h1>
      <p className="lead">{t.pageNotFoundLead}</p>
      <Link to="/" className="btn btn-outline">
        {t.backHome}
      </Link>
    </div>
  );
}

/** Replays the entrance animation each time the page (not the #hash) changes. */
function PageTransition({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  return (
    <main key={pathname} className="page-enter">
      {children}
    </main>
  );
}

function Shell() {
  const { t } = useLanguage();
  return (
    // The base path is "/" locally and "/<repository>/" on GitHub Pages.
    <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
      <ScrollManager />
      <Starfield />
      <div className="app-shell">
        <Navbar />
        <PageTransition>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetails />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/*" element={<AdminDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </PageTransition>
        <footer className="site-footer">
          <div className="container footer-inner">
            <p>
              © {new Date().getFullYear()} {t.name}
            </p>
            <SocialLinks variant="icons" />
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <Shell />
    </LanguageProvider>
  );
}
