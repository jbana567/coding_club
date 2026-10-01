import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

export default function MemberDashboard() {
  const { user } = useAuth();
  const { announcements, events, getUserRegistrations, unregisterFromHackathon } = useData();

  const userHackathons = user ? getUserRegistrations(user.id) : [];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h2>Welcome, {user?.name || 'Member'}! 👋</h2>
        <p>Role: <strong style={{ textTransform: 'capitalize' }}>{user?.role}</strong></p>
      </div>

      {/* Latest Announcements */}
      <section style={{ border: '1px solid #ddd', padding: '1.2rem', borderRadius: '6px' }}>
        <h3>📢 Latest Announcements</h3>
        {announcements.length === 0 ? (
          <p style={{ color: '#666' }}>No recent announcements.</p>
        ) : (
          announcements.map((item) => (
            <div
              key={item.id}
              style={{
                borderLeft: '4px solid #007bff',
                paddingLeft: '1rem',
                margin: '1rem 0',
                backgroundColor: '#f8f9fa',
                padding: '0.75rem',
              }}
            >
              <h4 style={{ margin: '0 0 0.25rem 0' }}>{item.title} <small style={{ fontWeight: 'normal', color: '#666' }}>({item.date})</small></h4>
              <p style={{ margin: 0 }}>{item.content}</p>
            </div>
          ))
        )}
      </section>

      {/* Registered Hackathons */}
      <section style={{ border: '1px solid #28a745', padding: '1.2rem', borderRadius: '6px', backgroundColor: '#f8fff9' }}>
        <h3>🏆 Your Registered Hackathons ({userHackathons.length})</h3>
        {userHackathons.length === 0 ? (
          <p style={{ color: '#666' }}>You haven't registered for any hackathons yet. Head over to the Hackathons tab to sign up!</p>
        ) : (
          <div style={{ display: 'grid', gap: '1rem', marginTop: '1rem' }}>
            {userHackathons.map((h) => (
              <div
                key={h.id}
                style={{
                  border: '1px solid #c3e6cb',
                  padding: '1rem',
                  borderRadius: '4px',
                  backgroundColor: '#fff',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div>
                  <h4 style={{ margin: '0 0 0.25rem 0' }}>{h.title}</h4>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: '#555' }}>
                    📅 {h.date} | 📍 {h.venue}
                  </p>
                </div>
                <button
                  onClick={() => unregisterFromHackathon(user.id, h.id)}
                  style={{
                    padding: '0.3rem 0.6rem',
                    backgroundColor: '#dc3545',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  Unregister
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Upcoming General Events */}
      <section style={{ border: '1px solid #ddd', padding: '1.2rem', borderRadius: '6px' }}>
        <h3>📅 Upcoming Club Events</h3>
        <ul style={{ paddingLeft: '1.2rem', margin: '0.8rem 0' }}>
          {events.map((ev) => (
            <li key={ev.id} style={{ marginBottom: '0.5rem' }}>
              <strong>{ev.title}</strong> — {ev.date} at {ev.venue}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}