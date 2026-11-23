import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiUrl } from '../lib/api';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch(apiUrl('/api/auth/login'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('admin_token', data.token);
        navigate('/admin');
      } else {
        setError(data.error || 'Login failed');
      }
    } catch {
      setError('Could not reach the server. Is the API running?');
    }
  };

  return (
    <div className="container page narrow">
      <form className="panel form" onSubmit={handleLogin}>
        <h1>Admin login</h1>
        {error && (
          <p className="error" role="alert">
            {error}
          </p>
        )}
        <label className="field">
          <span>Email</span>
          <input
            type="email"
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label className="field">
          <span>Password</span>
          <input
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit" className="btn">
          Log in
        </button>
      </form>
    </div>
  );
}
