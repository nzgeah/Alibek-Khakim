import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProjectForm from '../components/ProjectForm';
import type { StoredProject } from '../data/projects';
import {
  clearToken,
  connect,
  getToken,
  GitHubError,
  loadProjects,
  publish,
  type NewImage,
  type Repo,
} from '../lib/github';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const token = getToken();
  const [repo, setRepo] = useState<Repo | null>(null);
  const [projects, setProjects] = useState<StoredProject[] | null>(null);
  // The project open in the form; 'new' for an empty form.
  const [editing, setEditing] = useState<StoredProject | 'new' | null>(null);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!token) {
      navigate('/admin/login');
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const connected = await connect(token);
        const list = await loadProjects(token, connected);
        if (cancelled) return;
        setRepo(connected);
        setProjects(list);
      } catch (err) {
        if (cancelled) return;
        // A token that stopped working (expired or revoked) means logging in again.
        if (err instanceof GitHubError && [401, 403, 404].includes(err.status)) {
          clearToken();
          navigate('/admin/login');
        } else {
          setError('Could not load the projects from GitHub. Check your connection and reload.');
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [token, navigate]);

  const handleLogout = () => {
    clearToken();
    navigate('/admin/login');
  };

  /** Commits a new project list; returns whether it worked. */
  const save = async (
    next: StoredProject[],
    message: string,
    newImages: NewImage[] = [],
    removedImages: string[] = [],
  ) => {
    if (!token || !repo) return false;
    setBusy(true);
    setError('');
    setNotice('');
    try {
      await publish(token, repo, next, newImages, removedImages, message);
      setProjects(next);
      setNotice('Published. The site will show the change in about a minute.');
      return true;
    } catch (err) {
      setError(
        err instanceof GitHubError
          ? `GitHub refused the change: ${err.message}`
          : 'Could not reach GitHub. Nothing was published; please try again.',
      );
      return false;
    } finally {
      setBusy(false);
    }
  };

  const handleSave = async (
    project: StoredProject,
    newImages: NewImage[],
    removedImages: string[],
  ) => {
    if (!projects) return;
    const exists = projects.some((p) => p.id === project.id);
    const next = exists
      ? projects.map((p) => (p.id === project.id ? project : p))
      : [project, ...projects];
    const title = project.text.en.title;
    const done = await save(
      next,
      exists ? `Update project: ${title}` : `Add project: ${title}`,
      newImages,
      removedImages,
    );
    if (done) {
      setEditing(null);
      window.scrollTo({ top: 0 });
    }
  };

  const handleDelete = (project: StoredProject) => {
    if (!projects) return;
    const title = project.text.en.title;
    if (!window.confirm(`Delete “${title}” and its images from the site?`)) return;
    void save(
      projects.filter((p) => p.id !== project.id),
      `Delete project: ${title}`,
      [],
      project.images,
    );
  };

  const handleMove = (index: number, step: -1 | 1) => {
    if (!projects) return;
    const next = [...projects];
    [next[index], next[index + step]] = [next[index + step], next[index]];
    void save(next, `Reorder projects: move ${projects[index].text.en.title}`);
  };

  if (editing && projects) {
    return (
      <div className="container page admin-form">
        <ProjectForm
          key={editing === 'new' ? 'new' : editing.id}
          initial={editing === 'new' ? null : editing}
          takenIds={projects.map((p) => p.id)}
          busy={busy}
          onSave={handleSave}
          onCancel={() => setEditing(null)}
        />
        {error && (
          <p className="error" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="container page">
      <header className="section-head">
        <h1>Admin</h1>
        <button type="button" onClick={handleLogout} className="btn btn-outline">
          Log out
        </button>
      </header>

      {notice && (
        <p className="notice" role="status">
          {notice}
        </p>
      )}
      {error && (
        <p className="error" role="alert">
          {error}
        </p>
      )}

      <section className="panel">
        <div className="section-head">
          <h2>Projects</h2>
          <button
            type="button"
            className="btn"
            disabled={!projects || busy}
            onClick={() => setEditing('new')}
          >
            Add new project
          </button>
        </div>

        {projects === null ? (
          !error && (
            <p className="muted" role="status">
              Loading…
            </p>
          )
        ) : projects.length === 0 ? (
          <p className="muted">No projects yet.</p>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Status</th>
                  <th>Featured</th>
                  <th>Order</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((p, i) => (
                  <tr key={p.id}>
                    <td>{p.text.en.title}</td>
                    <td>{p.text.en.status}</td>
                    <td>{p.isFeatured ? 'Yes' : 'No'}</td>
                    <td>
                      <div className="actions">
                        <button
                          type="button"
                          className="btn btn-outline btn-small"
                          disabled={busy || i === 0}
                          onClick={() => handleMove(i, -1)}
                          aria-label={`Move ${p.text.en.title} up`}
                        >
                          ↑
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline btn-small"
                          disabled={busy || i === projects.length - 1}
                          onClick={() => handleMove(i, 1)}
                          aria-label={`Move ${p.text.en.title} down`}
                        >
                          ↓
                        </button>
                      </div>
                    </td>
                    <td>
                      <div className="actions">
                        <button
                          type="button"
                          className="btn btn-outline btn-small"
                          disabled={busy}
                          onClick={() => setEditing(p)}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger btn-small"
                          disabled={busy}
                          onClick={() => handleDelete(p)}
                        >
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
