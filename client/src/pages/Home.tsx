import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Download } from 'lucide-react';
import ProjectCard from '../components/ProjectCard';
import SocialLinks from '../components/SocialLinks';
import Typed from '../components/Typed';
import { site, skillGroups } from '../config/site';
import { useLanguage } from '../i18n/context';
import { getProjects, type Project } from '../lib/api';
import { useTypewriter } from '../lib/useTypewriter';

export default function Home() {
  const { t } = useLanguage();
  const [projects, setProjects] = useState<Project[]>([]);
  const { counts, finished } = useTypewriter([
    { text: t.greeting, speed: 60 },
    { text: t.intro, speed: 14 },
  ]);
  const greetingShown = finished ? t.greeting.length : counts[0];
  const introShown = finished ? t.intro.length : counts[1];
  const greetingDone = greetingShown >= t.greeting.length;

  useEffect(() => {
    getProjects().then((all) => {
      const featured = all.filter((p) => p.isFeatured);
      setProjects((featured.length ? featured : all).slice(0, 3));
    });
  }, []);

  return (
    <div className="container">
      <section className="hero">
        <p className="label">{t.roles.join(' · ')}</p>
        <h1>
          <Typed text={t.greeting} shown={greetingShown} caret={!greetingDone} sweep />
        </h1>
        <p className="lead">
          <Typed text={t.intro} shown={introShown} caret={greetingDone} />
        </p>
        <div className="actions">
          <Link to="/projects" className="btn">
            {t.viewWork} <ArrowRight size={18} />
          </Link>
          <Link to="/#connect" className="btn btn-outline">
            {t.getInTouch}
          </Link>
        </div>
      </section>

      {projects.length > 0 && (
        <section className="section" aria-labelledby="featured-title">
          <div className="section-head">
            <h2 id="featured-title">{t.featured}</h2>
            <Link to="/projects" className="text-link">
              {t.allProjects} <ArrowRight size={16} />
            </Link>
          </div>
          <div className="project-grid">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>
      )}

      <section className="section about" aria-labelledby="about-title">
        <h2 id="about-title">{t.aboutTitle}</h2>
        <div className="prose">
          {t.about.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          {site.resumeUrl && (
            <a href={site.resumeUrl} download className="btn btn-outline">
              <Download size={18} /> {t.downloadCv}
            </a>
          )}
        </div>
      </section>

      <section className="section" aria-labelledby="skills-title">
        <h2 id="skills-title">{t.stackTitle}</h2>
        <div className="skill-grid">
          {skillGroups.map((group) => (
            <div className="skill-group" key={group.key}>
              <h3>{t.skillGroups[group.key]}</h3>
              <ul className="badges">
                {group.skills.map((skill) => (
                  <li className="badge" key={skill}>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="section connect" id="connect" aria-labelledby="connect-title">
        <p className="label">{t.contactLabel}</p>
        <h2 id="connect-title">{t.contactTitle}</h2>
        <p className="lead">{t.contactLead}</p>
        <SocialLinks variant="cards" />
      </section>
    </div>
  );
}
