import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 82ea800619b4e5356edd52cd7b87dfce6dc254af

export default function Register() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Temporary simulation of account creation
    alert('Registration successful! Please log in.');
    navigate('/login');
  };

  return (
    <div style={{ maxWidth: '400px', margin: '2rem auto' }}>
      <h2>Member Registration</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label>Full Name:</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            required
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>
        <button type="submit" style={{ padding: '0.5rem', cursor: 'pointer' }}>Register</button>
      </form>
      <p>Already have an account? <Link to="/login">Login here</Link></p>
    </div>
  );
<<<<<<< HEAD
}
=======
import { useAuth } from '../../context/AuthContext';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'member' });
  const [adminRegistered] = useState(() => {
    try {
      const users = JSON.parse(localStorage.getItem('ccms_demo_users') || '[]');
      return localStorage.getItem('ccms_admin_registered') === 'true' || users.some((user) => user.role === 'admin');
    } catch {
      return localStorage.getItem('ccms_admin_registered') === 'true';
    }
  });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const user = await register(form.name, form.email, form.password, form.role);
      navigate(user.role === 'admin' ? '/admin' : '/member/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Registration failed');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="max-w-sm mx-auto px-6 py-20">
      <div className="flex flex-col items-center mb-6">
        <img src="/code_club_logo.svg" alt="Code Club logo" className="h-16 w-16 rounded-2xl mb-3" />
        <h1 className="text-2xl font-bold text-center">Create Account</h1>
      </div>
      <form onSubmit={handleSubmit} className="glass-card p-6 space-y-4">
        {error && <p className="text-danger text-sm">{error}</p>}
        <input required placeholder="Full name" value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full bg-ink-surface border border-ink-border rounded-lg px-4 py-2.5 text-sm" />
        <input type="email" required placeholder="Email" value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full bg-ink-surface border border-ink-border rounded-lg px-4 py-2.5 text-sm" />
        <input type="password" required minLength={6} placeholder="Password" value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full bg-ink-surface border border-ink-border rounded-lg px-4 py-2.5 text-sm" />
        <label className="block text-sm text-text-dim">User category
          <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}
            className="mt-2 w-full bg-ink-surface border border-ink-border rounded-lg px-4 py-2.5 text-sm text-white">
            <option value="member">Normal member</option>
            <option value="agent">Agent</option>
            {!adminRegistered && <option value="admin">Admin user (one-time setup)</option>}
          </select>
        </label>
        <p className="text-xs leading-5 text-text-dim">
          Admin user registration is available only once. Admins can later change member and agent roles from the Members dashboard.
        </p>
        <button type="submit" disabled={submitting} className="btn-primary w-full">
          {submitting ? 'Creating account…' : 'Register'}
        </button>
        <p className="text-xs text-text-dim text-center">
          Demo registration is enabled for local testing without a backend API.
        </p>
        <p className="text-text-dim text-sm text-center">
          Already have an account? <Link to="/login" className="text-accent">Log In</Link>
        </p>
      </form>
    </section>
  );
}
>>>>>>> bc97c92 (Initial commit)
=======
}
>>>>>>> 82ea800619b4e5356edd52cd7b87dfce6dc254af
