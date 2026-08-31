import { useData } from '../../context/DataContext';

export default function ManageRegistrations() {
  const { hackathons, getHackathonParticipants, unregisterFromHackathon } = useData();

  return (
    <div>
      <h2>Hackathon Participant Overview</h2>
      <p>View member registrations and manage event attendance.</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginTop: '1.5rem' }}>
        {hackathons.map((hackathon) => {
          const participantUserIds = getHackathonParticipants(hackathon.id);

          return (
            <div
              key={hackathon.id}
              style={{
                border: '1px solid #ccc',
                borderRadius: '6px',
                padding: '1.25rem',
                backgroundColor: '#fff',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: 0 }}>{hackathon.title}</h3>
                <span
                  style={{
                    backgroundColor: '#007bff',
                    color: '#fff',
                    padding: '0.25rem 0.6rem',
                    borderRadius: '12px',
                    fontSize: '0.85rem',
                    fontWeight: 'bold',
                  }}
                >
                  {participantUserIds.length} Registered
                </span>
              </div>
              <p style={{ color: '#555', margin: '0.5rem 0 1rem 0' }}>
                📅 <strong>Date:</strong> {hackathon.date} | 📍 <strong>Venue:</strong> {hackathon.venue}
              </p>

              {/* Participants Table */}
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', marginTop: '0.5rem' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #ddd', backgroundColor: '#f8f9fa' }}>
                    <th style={{ padding: '0.5rem' }}>User ID</th>
                    <th style={{ padding: '0.5rem' }}>Status</th>
                    <th style={{ padding: '0.5rem' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {participantUserIds.length === 0 ? (
                    <tr>
                      <td colSpan="3" style={{ padding: '1rem', color: '#666', textAlign: 'center' }}>
                        No members registered for this hackathon yet.
                      </td>
                    </tr>
                  ) : (
                    participantUserIds.map((userId) => (
                      <tr key={userId} style={{ borderBottom: '1px solid #eee' }}>
                        <td style={{ padding: '0.5rem', fontWeight: 'bold' }}>{userId}</td>
                        <td style={{ padding: '0.5rem', color: '#28a745' }}>Confirmed</td>
                        <td style={{ padding: '0.5rem' }}>
                          <button
                            onClick={() => unregisterFromHackathon(userId, hackathon.id)}
                            style={{
                              color: '#dc3545',
                              border: 'none',
                              background: 'none',
                              cursor: 'pointer',
                              fontWeight: 'bold',
                            }}
                          >
                            Remove Participant
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          );
        })}
      </div>
    </div>
  );
}