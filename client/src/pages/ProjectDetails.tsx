import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Code } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  fullDescription: string;
  images: string[];
  technologies: string[];
  status: string;
  githubLink: string;
  liveDemoLink: string;
  myRole: string;
}

export default function ProjectDetails() {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/api/projects/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Not found');
        return res.json();
      })
      .then(data => {
        setProject(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="container"><p>Loading...</p></div>;
  if (!project) return <div className="container"><p>Project not found.</p></div>;

  return (
    <div className="container">
      <Link to="/projects" className="btn btn-outline mb-8" style={{ display: 'inline-flex' }}>
        <ArrowLeft size={20} /> Back to Projects
      </Link>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          {project.images && project.images.length > 0 ? (
            <div className="flex-col flex gap-4">
              <img 
                src={`http://localhost:5000${project.images[0]}`} 
                alt={project.title} 
                style={{ width: '100%', borderRadius: '12px', objectFit: 'cover' }}
              />
              <div className="grid grid-cols-2 gap-4">
                {project.images.slice(1).map((img, idx) => (
                  <img 
                    key={idx}
                    src={`http://localhost:5000${img}`} 
                    alt={`${project.title} - ${idx}`} 
                    style={{ width: '100%', borderRadius: '8px', objectFit: 'cover' }}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="card flex items-center justify-center" style={{ height: '300px' }}>
              <p className="text-muted">No images available</p>
            </div>
          )}
        </div>

        <div>
          <h1 className="mb-4">{project.title}</h1>
          <div className="flex flex-wrap gap-2 mb-6">
            <span style={{ padding: '4px 12px', borderRadius: '16px', border: '1px solid var(--border-color)', fontSize: '0.875rem' }}>
              Status: {project.status}
            </span>
            {project.myRole && (
              <span style={{ padding: '4px 12px', borderRadius: '16px', border: '1px solid var(--border-color)', fontSize: '0.875rem' }}>
                Role: {project.myRole}
              </span>
            )}
          </div>

          <div className="flex gap-4 mb-8">
            {project.liveDemoLink && (
              <a href={project.liveDemoLink} target="_blank" rel="noopener noreferrer" className="btn">
                <ExternalLink size={20} /> Live Demo
              </a>
            )}
            {project.githubLink && (
              <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                <Code size={20} /> Source Code
              </a>
            )}
          </div>

          <h3 className="mb-2">Technologies Used</h3>
          <div className="flex flex-wrap gap-2 mb-8">
            {project.technologies.map(tech => (
              <span key={tech} className="text-sm font-bold" style={{ background: 'var(--primary)', color: 'var(--surface)', padding: '4px 12px', borderRadius: '16px' }}>
                {tech}
              </span>
            ))}
          </div>

          <h3 className="mb-2">About This Project</h3>
          <p style={{ whiteSpace: 'pre-wrap' }}>{project.fullDescription}</p>
        </div>
      </div>
    </div>
  );
}
