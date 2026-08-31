import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

export default function Hackathons() {
  const { user } = useAuth();
  const { hackathons, registerForHackathon, unregisterFromHackathon, registrations } = useData();

  const userRegisteredIds = user ? registrations[user.id] || [] : [];

  return (
    <div>
      <h2>Hackathons</h2>
      <p>Join competitive coding events and showcase your technical skills.</p>

      <div style={{ display: 'grid', gap: '1rem', marginTop: '1rem' }}>
        {hackathons.map((hackathon) => {
          const isRegistered = userRegisteredIds.includes(hackathon.id);

          return (
            <div
              key={hackathon.id}
              style={{
                border: '1px solid #ccc',
                padding: '1rem',
                borderRadius: '6px',
                backgroundColor: isRegistered ? '#f0fff4' : '#fff',
              }}
            >
              <h3>{hackathon.title}</h3>
              <p><strong>Date:</strong> {hackathon.date} | <strong>Venue:</strong> {hackathon.venue}</p>
              {hackathon.requirements && (
                <p><strong>Requirements:</strong> {hackathon.requirements}</p>
              )}

              {user ? (
                <div>
                  {isRegistered ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.5rem' }}>
                      <span style={{ color: '#28a745', fontWeight: 'bold' }}>✓ Registered</span>
                      <button
                        onClick={() => unregisterFromHackathon(user.id, hackathon.id)}
                        style={{
                          padding: '0.4rem 0.8rem',
                          backgroundColor: '#dc3545',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                        }}
                      >
                        Cancel Registration
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => registerForHackathon(user.id, hackathon.id)}
                      style={{
                        padding: '0.5rem 1rem',
                        backgroundColor: '#007bff',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        marginTop: '0.5rem',
                      }}
                    >
                      Register Now
                    </button>
                  )}
                </div>
              ) : (
                <p style={{ marginTop: '0.5rem', color: '#666' }}>
                  <em>Please log in as a member to register.</em>
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}