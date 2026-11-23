import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Code, ExternalLink } from 'lucide-react';
import { ProjectCover } from '../components/ProjectCard';
import { localizeProject, useLanguage } from '../i18n/context';
import { getProject, imageUrl, type Project } from '../lib/api';

export default function ProjectDetails() {
  const { id } = useParams<{ id: string }>();
  // undefined = loading, null = not found
  const { t } = useLanguage();
  const [loaded, setProject] = useState<Project | null | undefined>(undefined);
  const project = loaded && localizeProject(loaded, t);

  useEffect(() => {
    setProject(undefined);
    if (id) getProject(id).then(setProject);
  }, [id]);

  if (project === undefined) {
    return (
      <div className="container page">
        <p className="muted" role="status">
          {t.loading}
        </p>
      </div>
    );
  }

  if (project === null) {
    return (
      <div className="container page">
        <h1>{t.projectNotFound}</h1>
        <p className="lead">{t.projectNotFoundLead}</p>
        <Link to="/projects" className="btn btn-outline">
          <ArrowLeft size={18} /> {t.backToProjects}
        </Link>
      </div>
    );
  }

  return (
    <article className="container page">
      <Link to="/projects" className="text-link">
        <ArrowLeft size={16} /> {t.allProjects}
      </Link>

      <header className="page-head">
        <p className="label">
          {[project.status, project.myRole].filter(Boolean).join(' · ')}
        </p>
        <h1>{project.title}</h1>
        <p className="lead">{project.shortDescription}</p>
        <div className="actions">
          {project.liveDemoLink && (
            <a href={project.liveDemoLink} target="_blank" rel="noopener noreferrer" className="btn">
              <ExternalLink size={18} /> {t.liveDemo}
            </a>
          )}
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className={project.liveDemoLink ? 'btn btn-outline' : 'btn'}
            >
              <Code size={18} /> {t.sourceCode}
            </a>
          )}
        </div>
      </header>

      <div className="details">
        <div className="gallery">
          <ProjectCover project={project} />
          {project.images.slice(1).map((src) => (
            <img key={src} className="project-cover" src={imageUrl(src)} alt="" loading="lazy" />
          ))}
        </div>

        <div className="prose">
          <h2>{t.aboutProject}</h2>
          {project.fullDescription.split(/\n{2,}/).map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <h2>{t.builtWith}</h2>
          <ul className="badges">
            {project.technologies.map((tech) => (
              <li key={tech} className="badge">
                {tech}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
