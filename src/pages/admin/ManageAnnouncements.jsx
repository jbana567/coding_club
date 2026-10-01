import { useState } from 'react';
import { useData } from '../../context/DataContext';

export default function ManageAnnouncements() {
  const { announcements, addAnnouncement, deleteAnnouncement } = useData();
  const [formData, setFormData] = useState({ title: '', content: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    addAnnouncement(formData);
    setFormData({ title: '', content: '' });
  };

  return (
    <div>
      <h2>Announcement Management</h2>

      <form
        onSubmit={handleSubmit}
        style={{
          border: '1px solid #ccc',
          padding: '1rem',
          borderRadius: '6px',
          marginBottom: '2rem',
          maxWidth: '500px',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
        }}
      >
        <h3>Post New Announcement</h3>
        <input
          type="text"
          placeholder="Title"
          required
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          style={{ padding: '0.5rem' }}
        />
        <textarea
          placeholder="Announcement content..."
          required
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          style={{ padding: '0.5rem', minHeight: '80px' }}
        />
        <button
          type="submit"
          style={{
            padding: '0.5rem 1rem',
            cursor: 'pointer',
            backgroundColor: '#007bff',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
          }}
        >
          Publish Announcement
        </button>
      </form>

      <h3>Published Announcements</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #ccc' }}>
            <th style={{ padding: '0.5rem' }}>Title</th>
            <th style={{ padding: '0.5rem' }}>Date</th>
            <th style={{ padding: '0.5rem' }}>Content</th>
            <th style={{ padding: '0.5rem' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {announcements?.length === 0 ? (
            <tr>
              <td colSpan="4" style={{ padding: '1rem', textAlign: 'center' }}>
                No announcements published yet.
              </td>
            </tr>
          ) : (
            announcements?.map((a) => (
              <tr key={a.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '0.5rem', fontWeight: 'bold' }}>{a.title}</td>
                <td style={{ padding: '0.5rem' }}>{a.date}</td>
                <td style={{ padding: '0.5rem' }}>{a.content}</td>
                <td style={{ padding: '0.5rem' }}>
                  <button
                    onClick={() => deleteAnnouncement(a.id)}
                    style={{ color: 'red', cursor: 'pointer', border: 'none', background: 'none' }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}