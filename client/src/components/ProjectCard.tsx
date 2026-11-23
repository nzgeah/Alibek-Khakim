import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { imageUrl, type Project } from '../lib/api';

/** Cover image, or a generated placeholder with the project's initials. */
export function ProjectCover({ project }: { project: Project }) {
  const cover = project.images?.[0];
  if (cover) {
    return <img className="project-cover" src={imageUrl(cover)} alt="" loading="lazy" />;
  }
  const initials = project.title
    .split(/\s+/)
    .map((word) => word[0])
    .join('')
    .slice(0, 3)
    .toUpperCase();
  return (
    <div className="project-cover project-cover--empty" aria-hidden="true">
      {initials}
    </div>
  );
}

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="project-card">
      <ProjectCover project={project} />
      <div className="project-body">
        <p className="label">{project.status}</p>
        <h3>
          <Link to={`/projects/${project.id}`} className="stretched-link">
            {project.title}
          </Link>
        </h3>
        <p className="muted">{project.shortDescription}</p>
        <ul className="badges">
          {project.technologies.map((tech) => (
            <li key={tech} className="badge">
              {tech}
            </li>
          ))}
        </ul>
        <span className="card-more" aria-hidden="true">
          View project <ArrowRight size={16} />
        </span>
      </div>
    </article>
  );
}
