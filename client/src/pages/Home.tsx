import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Download } from 'lucide-react';
import ProjectCard from '../components/ProjectCard';
import SocialLinks from '../components/SocialLinks';
import { site, skillGroups } from '../config/site';
import { getProjects, type Project } from '../lib/api';

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    getProjects().then((all) => {
      const featured = all.filter((p) => p.isFeatured);
      setProjects((featured.length ? featured : all).slice(0, 3));
    });
  }, []);

  return (
    <div className="container">
      <section className="hero">
        <p className="label">{site.roles.join(' · ')}</p>
        <h1>Hi, I'm {site.name}.</h1>
        <p className="lead">{site.intro}</p>
        <div className="actions">
          <Link to="/projects" className="btn">
            View my work <ArrowRight size={18} />
          </Link>
          <Link to="/#connect" className="btn btn-outline">
            Get in touch
          </Link>
        </div>
      </section>

      {projects.length > 0 && (
        <section className="section" aria-labelledby="featured-title">
          <div className="section-head">
            <h2 id="featured-title">Featured projects</h2>
            <Link to="/projects" className="text-link">
              All projects <ArrowRight size={16} />
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
        <h2 id="about-title">About me</h2>
        <div className="prose">
          {site.about.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          {site.resumeUrl && (
            <a href={site.resumeUrl} download className="btn btn-outline">
              <Download size={18} /> Download CV
            </a>
          )}
        </div>
      </section>

      <section className="section" aria-labelledby="skills-title">
        <h2 id="skills-title">Tech stack</h2>
        <div className="skill-grid">
          {skillGroups.map((group) => (
            <div className="skill-group" key={group.title}>
              <h3>{group.title}</h3>
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
        <p className="label">Contact</p>
        <h2 id="connect-title">Let's build something together.</h2>
        <p className="lead">
          Open to collaborating on meaningful EdTech and AI projects. Message me wherever is easiest for you.
        </p>
        <SocialLinks variant="cards" />
      </section>
    </div>
  );
}
