import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
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
}