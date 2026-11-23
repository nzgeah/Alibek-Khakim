import { useEffect, useMemo, useState } from 'react';
import ProjectCard from '../components/ProjectCard';
import { getProjects, type Project } from '../lib/api';

export default function Projects() {
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [filter, setFilter] = useState<string | null>(null);

  useEffect(() => {
    getProjects().then(setProjects);
  }, []);

  const technologies = useMemo(
    () => [...new Set((projects ?? []).flatMap((p) => p.technologies))].sort(),
    [projects],
  );
  const visible = (projects ?? []).filter((p) => !filter || p.technologies.includes(filter));

  return (
    <div className="container page">
      <header className="page-head">
        <h1>Projects</h1>
        <p className="lead">A collection of my recent work.</p>
      </header>

      {projects === null ? (
        <p className="muted" role="status">
          Loading projects…
        </p>
      ) : projects.length === 0 ? (
        <p className="muted">No projects published yet.</p>
      ) : (
        <>
          {technologies.length > 1 && (
            <div className="filters" role="group" aria-label="Filter by technology">
              <button
                type="button"
                className="chip"
                aria-pressed={filter === null}
                onClick={() => setFilter(null)}
              >
                All
              </button>
              {technologies.map((tech) => (
                <button
                  key={tech}
                  type="button"
                  className="chip"
                  aria-pressed={filter === tech}
                  onClick={() => setFilter(filter === tech ? null : tech)}
                >
                  {tech}
                </button>
              ))}
            </div>
          )}
          <div className="project-grid">
            {visible.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
