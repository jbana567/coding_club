import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // Updated relative path

export default function PublicLayout() {
  const { user, logout } = useAuth();

  return (
    <div>
      <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <Link to="/">Home</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/events">Events</Link>
        <Link to="/hackathons">Hackathons</Link>
        {user ? (
          <>
            <Link to={user.role === 'admin' ? "/admin/dashboard" : "/dashboard"}>Dashboard</Link>
            <button onClick={logout}>Logout ({user.name})</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
      <main style={{ padding: '1rem' }}>
        <Outlet />
      </main>
    </div>
  );
}