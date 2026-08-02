import React, { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <div className="container" style={{ maxWidth: '600px' }}>
      <h2>Contact Me</h2>
      <p className="text-muted mt-2 mb-8">Feel free to reach out for collaborations or just a friendly hello!</p>
      
      <form onSubmit={handleSubmit} className="flex-col flex gap-4">
        <div>
          <label htmlFor="name" style={{ display: 'block', marginBottom: '8px' }}>Name</label>
          <input 
            id="name" 
            type="text" 
            className="input" 
            required 
            value={formData.name}
            onChange={e => setFormData({...formData, name: e.target.value})}
          />
        </div>
        <div>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '8px' }}>Email</label>
          <input 
            id="email" 
            type="email" 
            className="input" 
            required 
            value={formData.email}
            onChange={e => setFormData({...formData, email: e.target.value})}
          />
        </div>
        <div>
          <label htmlFor="message" style={{ display: 'block', marginBottom: '8px' }}>Message</label>
          <textarea 
            id="message" 
            className="textarea" 
            required
            value={formData.message}
            onChange={e => setFormData({...formData, message: e.target.value})}
          ></textarea>
        </div>
        <button type="submit" className="btn" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending...' : 'Send Message'}
        </button>
        {status === 'success' && <p style={{ color: 'green' }}>Message sent successfully!</p>}
        {status === 'error' && <p style={{ color: 'var(--error)' }}>Failed to send message. Please try again later.</p>}
      </form>
    </div>
  );
}
