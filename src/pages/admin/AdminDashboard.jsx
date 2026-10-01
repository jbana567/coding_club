import { Link } from 'react-router-dom';
import { useData } from '../../context/DataContext';

export default function AdminDashboard() {
  const { projects, events, announcements } = useData();

  return (
    <div>
      <h2>Administrator Dashboard</h2>
      <p>Overview of system statistics and management controls.</p>

      {/* Statistics Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '1rem',
          margin: '1.5rem 0',
        }}
      >
        <div style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '6px', textAlign: 'center' }}>
          <h3>Active Projects</h3>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{projects?.length || 0}</p>
        </div>
        <div style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '6px', textAlign: 'center' }}>
          <h3>Total Events</h3>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{events?.length || 0}</p>
        </div>
        <div style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '6px', textAlign: 'center' }}>
          <h3>Announcements</h3>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{announcements?.length || 0}</p>
        </div>
      </div>

      {/* Action Buttons */}
      <h3>Management Actions</h3>
      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap' }}>
        <Link
          to="/admin/projects"
          style={{
            padding: '0.5rem 1rem',
            border: '1px solid #007bff',
            borderRadius: '4px',
            textDecoration: 'none',
          }}
        >
          Manage Projects
        </Link>
        <Link
          to="/admin/events"
          style={{
            padding: '0.5rem 1rem',
            border: '1px solid #28a745',
            color: '#fff',
            backgroundColor: '#28a745',
            borderRadius: '4px',
            textDecoration: 'none',
          }}
        >
          Manage Events
        </Link>
        <Link
          to="/admin/announcements"
          style={{
            padding: '0.5rem 1rem',
            border: '1px solid #ffc107',
            color: '#212529',
            backgroundColor: '#ffc107',
            borderRadius: '4px',
            textDecoration: 'none',
          }}
        >
          Manage Announcements
        </Link>
        <Link
          to="/admin/registrations"
          style={{
            padding: '0.5rem 1rem',
            border: '1px solid #17a2b8',
            color: '#fff',
            backgroundColor: '#17a2b8',
            borderRadius: '4px',
            textDecoration: 'none',
          }}
        >
          View Registrations
        </Link>
      </div>
    </div>
  );
}