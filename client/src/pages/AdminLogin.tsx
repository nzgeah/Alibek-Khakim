import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('admin_token', data.token);
        navigate('/admin');
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred');
    }
  };

  return (
    <div className="container flex justify-center items-center" style={{ minHeight: '60vh' }}>
      <form className="card flex-col flex gap-4" style={{ width: '100%', maxWidth: '400px' }} onSubmit={handleLogin}>
        <h2 className="text-center mb-4">Admin Login</h2>
        {error && <p style={{ color: 'var(--error)', textAlign: 'center' }}>{error}</p>}
        <div>
          <label htmlFor="email">Email</label>
          <input 
            id="email" 
            type="email" 
            className="input mt-2" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input 
            id="password" 
            type="password" 
            className="input mt-2" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn mt-4">Login</button>
      </form>
    </div>
  );
}
