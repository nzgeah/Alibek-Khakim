import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Project {
  id: string;
  title: string;
  status: string;
  isFeatured: boolean;
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const token = localStorage.getItem('admin_token');

  useEffect(() => {
    if (!token) {
      navigate('/admin/login');
      return;
    }
    fetchProjects();
  }, [token, navigate]);

  const fetchProjects = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/projects');
      if (res.ok) {
        setProjects(await res.json());
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    navigate('/admin/login');
  };

  return (
    <div className="container">
      <div className="flex justify-between items-center mb-8">
        <h2>Admin Dashboard</h2>
        <button onClick={handleLogout} className="btn btn-outline">Logout</button>
      </div>

      <div className="card">
        <div className="flex justify-between items-center mb-4">
          <h3>Projects</h3>
          <button className="btn">Add New Project</button>
        </div>
        
        {projects.length === 0 ? (
          <p className="text-muted">No projects found.</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <th style={{ padding: '12px' }}>Title</th>
                <th style={{ padding: '12px' }}>Status</th>
                <th style={{ padding: '12px' }}>Featured</th>
                <th style={{ padding: '12px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map(p => (
                <tr key={p.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '12px' }}>{p.title}</td>
                  <td style={{ padding: '12px' }}>{p.status}</td>
                  <td style={{ padding: '12px' }}>{p.isFeatured ? 'Yes' : 'No'}</td>
                  <td style={{ padding: '12px' }} className="flex gap-2">
                    <button className="btn btn-outline" style={{ padding: '6px 12px' }}>Edit</button>
                    <button className="btn" style={{ padding: '6px 12px', backgroundColor: 'var(--error)' }}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
