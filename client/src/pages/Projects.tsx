import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface Project {
  id: string;
  title: string;
  shortDescription: string;
  images: string[];
  technologies: string[];
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/projects')
      .then(res => res.json())
      .then(data => setProjects(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container">
      <h2>My Projects</h2>
      <p className="text-muted mt-2 mb-8">A collection of some of my recent work.</p>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3">
        {projects.length === 0 ? (
          <p>Loading projects...</p>
        ) : (
          projects.map(project => (
            <div key={project.id} className="card flex-col flex justify-between">
              <div>
                {project.images && project.images[0] && (
                  <img 
                    src={`http://localhost:5000${project.images[0]}`} 
                    alt={project.title} 
                    style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px', marginBottom: '16px' }}
                  />
                )}
                <h3 className="mt-2">{project.title}</h3>
                <p className="text-muted mt-2">{project.shortDescription}</p>
                <div className="flex flex-wrap gap-2 mt-4 mb-4">
                  {project.technologies.map(tech => (
                    <span key={tech} className="text-sm" style={{ background: 'var(--border-color)', padding: '2px 8px', borderRadius: '12px' }}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <Link to={`/projects/${project.id}`} className="btn btn-outline" style={{ textAlign: 'center' }}>
                View Details
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
