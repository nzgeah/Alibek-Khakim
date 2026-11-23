import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiUrl, type Project } from '../lib/api';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState('');
  const token = localStorage.getItem('admin_token');

  const fetchProjects = useCallback(async () => {
    try {
      const res = await fetch(apiUrl('/api/projects'));
      if (!res.ok) throw new Error();
      setProjects(await res.json());
      setError('');
    } catch {
      setError('Could not load projects. Is the API running?');
    }
  }, []);

  useEffect(() => {
    if (!token) {
      navigate('/admin/login');
      return;
    }
    fetchProjects();
  }, [token, navigate, fetchProjects]);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    navigate('/admin/login');
  };

  const handleDelete = async (project: Project) => {
    if (!window.confirm(`Delete "${project.title}"? This cannot be undone.`)) return;
    try {
      const res = await fetch(apiUrl(`/api/projects/${project.id}`), {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 401) return handleLogout();
      if (!res.ok) throw new Error();
      fetchProjects();
    } catch {
      setError(`Could not delete "${project.title}".`);
    }
  };

  return (
    <div className="container page">
      <header className="section-head">
        <h1>Admin dashboard</h1>
        <button type="button" onClick={handleLogout} className="btn btn-outline">
          Log out
        </button>
      </header>

      {error && (
        <p className="error" role="alert">
          {error}
        </p>
      )}

      <section className="panel">
        <div className="section-head">
          <h2>Projects</h2>
          <button type="button" className="btn" disabled title="Not implemented yet">
            Add new project
          </button>
        </div>

        {projects.length === 0 ? (
          <p className="muted">No projects in the database yet.</p>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Status</th>
                  <th>Featured</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((p) => (
                  <tr key={p.id}>
                    <td>{p.title}</td>
                    <td>{p.status}</td>
                    <td>{p.isFeatured ? 'Yes' : 'No'}</td>
                    <td>
                      <div className="actions">
                        <button type="button" className="btn btn-outline btn-small" disabled title="Not implemented yet">
                          Edit
                        </button>
                        <button type="button" className="btn btn-danger btn-small" onClick={() => handleDelete(p)}>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
