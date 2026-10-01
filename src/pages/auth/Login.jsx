import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 82ea800619b4e5356edd52cd7b87dfce6dc254af
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('member'); // Temporary role selector for testing
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simulate user payload from backend API response
    const mockUserData = {
      id: '1',
      name: email.split('@')[0],
      email: email,
      role: role // 'member' or 'admin'
    };
    const mockToken = 'dummy-jwt-token';

    login(mockUserData, mockToken);

    // Redirect based on role
    if (role === 'admin') {
      navigate('/admin/dashboard');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '2rem auto' }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>
        <div>
          <label>Test Role Assignment:</label>
          <select 
            value={role} 
            onChange={(e) => setRole(e.target.value)}
            style={{ width: '100%', padding: '0.5rem' }}
          >
            <option value="member">Member</option>
            <option value="admin">Administrator</option>
          </select>
        </div>
        <button type="submit" style={{ padding: '0.5rem', cursor: 'pointer' }}>Login</button>
      </form>
      <p>Don't have an account? <Link to="/register">Register here</Link></p>
    </div>
  );
<<<<<<< HEAD
}
=======
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const user = await login(form.email, form.password);
      navigate(user.role === 'admin' ? '/admin' : '/member/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="max-w-sm mx-auto px-6 py-20">
      <div className="flex flex-col items-center mb-6">
        <img src="/code_club_logo.svg" alt="Code Club logo" className="h-16 w-16 rounded-2xl mb-3" />
        <h1 className="text-2xl font-bold text-center">Log In</h1>
      </div>
      <form onSubmit={handleSubmit} className="glass-card p-6 space-y-4">
        {error && <p className="text-danger text-sm">{error}</p>}
        <input type="email" required placeholder="Email" value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full bg-ink-surface border border-ink-border rounded-lg px-4 py-2.5 text-sm" />
        <input type="password" required placeholder="Password" value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full bg-ink-surface border border-ink-border rounded-lg px-4 py-2.5 text-sm" />
        <button type="submit" disabled={submitting} className="btn-primary w-full">
          {submitting ? 'Logging in…' : 'Log In'}
        </button>
        <p className="text-xs text-text-dim text-center">
          Demo login works even without the backend service.
        </p>
        <p className="text-text-dim text-sm text-center">
          No account? <Link to="/register" className="text-accent">Register</Link>
        </p>
      </form>
    </section>
  );
}
>>>>>>> bc97c92 (Initial commit)
=======
}
>>>>>>> 82ea800619b4e5356edd52cd7b87dfce6dc254af
