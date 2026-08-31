import { Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';

export default function Home() {
  const { projects, events, announcements } = useData();
  const { user } = useAuth();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Hero Section */}
      <section style={{ backgroundColor: '#f4f6f8', padding: '2.5rem', borderRadius: '8px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>Welcome to Coding Club</h1>
        <p style={{ fontSize: '1.1rem', color: '#555', maxWidth: '600px', margin: '0 auto 1.5rem' }}>
          Connect with fellow developers, build real-world software projects, participate in hackathons, and sharpen your coding skills.
        </p>
        {!user ? (
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link to="/register" style={{ padding: '0.6rem 1.2rem', backgroundColor: '#007bff', color: '#fff', borderRadius: '4px', textDecoration: 'none' }}>
              Join the Club
            </Link>
            <Link to="/projects" style={{ padding: '0.6rem 1.2rem', border: '1px solid #007bff', color: '#007bff', borderRadius: '4px', textDecoration: 'none' }}>
              Explore Projects
            </Link>
          </div>
        ) : (
          <Link to={user.role === 'admin' ? '/admin/dashboard' : '/dashboard'} style={{ padding: '0.6rem 1.2rem', backgroundColor: '#28a745', color: '#fff', borderRadius: '4px', textDecoration: 'none' }}>
            Go to Your Dashboard
          </Link>
        )}
      </section>

      {/* Announcements Banner */}
      {announcements.length > 0 && (
        <section style={{ border: '1px solid #ffeba2', backgroundColor: '#fff8e1', padding: '1rem', borderRadius: '6px' }}>
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#856404' }}>📢 Latest Announcement</h3>
          <p style={{ margin: 0 }}><strong>{announcements[0].title}:</strong> {announcements[0].content}</p>
        </section>
      )}

      {/* Featured Sections Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
        {/* Featured Projects Preview */}
        <div style={{ border: '1px solid #ddd', padding: '1.2rem', borderRadius: '6px' }}>
          <h3>🚀 Active Projects ({projects.length})</h3>
          <ul style={{ paddingLeft: '1.2rem', margin: '0.8rem 0' }}>
            {projects.slice(0, 3).map((p) => (
              <li key={p.id} style={{ marginBottom: '0.4rem' }}>
                <strong>{p.title}</strong> — <small>{p.status}</small>
              </li>
            ))}
          </ul>
          <Link to="/projects" style={{ color: '#007bff', textDecoration: 'none', fontWeight: 'bold' }}>View all projects →</Link>
        </div>

        {/* Upcoming Events Preview */}
        <div style={{ border: '1px solid #ddd', padding: '1.2rem', borderRadius: '6px' }}>
          <h3>📅 Upcoming Events ({events.length})</h3>
          <ul style={{ paddingLeft: '1.2rem', margin: '0.8rem 0' }}>
            {events.slice(0, 3).map((e) => (
              <li key={e.id} style={{ marginBottom: '0.4rem' }}>
                <strong>{e.title}</strong> ({e.date})
              </li>
            ))}
          </ul>
          <Link to="/events" style={{ color: '#007bff', textDecoration: 'none', fontWeight: 'bold' }}>View all events →</Link>
        </div>
      </div>
    </div>
  );
}