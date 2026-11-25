import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect, GitHubError, setToken } from '../lib/github';

export default function AdminLogin() {
  const [token, setValue] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      // GitHub decides who is the owner: the token must be allowed to write
      // to this site's repository.
      await connect(token.trim());
      setToken(token.trim());
      navigate('/admin');
    } catch (err) {
      const status = err instanceof GitHubError ? err.status : 0;
      setError(
        status === 401
          ? 'GitHub did not accept this token. Check that it was copied in full and has not expired.'
          : status === 403 || status === 404
            ? 'This token cannot write to the site’s repository. It needs “Contents: Read and write” for this repository.'
            : 'Could not reach GitHub. Check your connection and try again.',
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="container page narrow">
      <form className="panel form" onSubmit={handleLogin}>
        <h1>Admin</h1>
        <p className="muted">
          Publishing is done with a GitHub access token of the site’s owner. Visitors without one
          can only view the site.
        </p>
        {error && (
          <p className="error" role="alert">
            {error}
          </p>
        )}
        <label className="field">
          <span>GitHub access token</span>
          <input
            type="password"
            autoComplete="off"
            value={token}
            onChange={(e) => setValue(e.target.value)}
            required
          />
        </label>
        <button type="submit" className="btn" disabled={busy}>
          {busy ? 'Checking…' : 'Enter'}
        </button>
        <details className="muted hint">
          <summary>How do I get a token?</summary>
          <ol>
            <li>
              Open{' '}
              <a
                className="text-link"
                href="https://github.com/settings/personal-access-tokens/new"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub → Settings → Fine-grained tokens
              </a>
              .
            </li>
            <li>Repository access: “Only select repositories”, then pick this site’s repository.</li>
            <li>Permissions → Repository → Contents: “Read and write”.</li>
            <li>Generate the token and paste it here.</li>
          </ol>
          <p>
            The token is kept only in this browser tab and is forgotten when you close it or log
            out.
          </p>
        </details>
      </form>
    </div>
  );
}
