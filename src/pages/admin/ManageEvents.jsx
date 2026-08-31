import { useState } from 'react';
import { useData } from '../../context/DataContext';

export default function ManageEvents() {
  const { events, addEvent, deleteEvent } = useData();
  const [formData, setFormData] = useState({ title: '', date: '', venue: '', description: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    addEvent(formData);
    setFormData({ title: '', date: '', venue: '', description: '' });
  };

  return (
    <div>
      <h2>Event Management</h2>

      <form onSubmit={handleSubmit} style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '6px', marginBottom: '2rem', maxWidth: '500px', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <h3>Add New Event</h3>
        <input
          type="text"
          placeholder="Event Title"
          required
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          style={{ padding: '0.5rem' }}
        />
        <input
          type="date"
          required
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          style={{ padding: '0.5rem' }}
        />
        <input
          type="text"
          placeholder="Venue / Location"
          required
          value={formData.venue}
          onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
          style={{ padding: '0.5rem' }}
        />
        <textarea
          placeholder="Description"
          required
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          style={{ padding: '0.5rem', minHeight: '70px' }}
        />
        <button type="submit" style={{ padding: '0.5rem 1rem', cursor: 'pointer' }}>Create Event</button>
      </form>

      <h3>Scheduled Events</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #ccc' }}>
            <th style={{ padding: '0.5rem' }}>Title</th>
            <th style={{ padding: '0.5rem' }}>Date</th>
            <th style={{ padding: '0.5rem' }}>Venue</th>
            <th style={{ padding: '0.5rem' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map((e) => (
            <tr key={e.id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '0.5rem' }}>{e.title}</td>
              <td style={{ padding: '0.5rem' }}>{e.date}</td>
              <td style={{ padding: '0.5rem' }}>{e.venue}</td>
              <td style={{ padding: '0.5rem' }}>
                <button onClick={() => deleteEvent(e.id)} style={{ color: 'red', cursor: 'pointer' }}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}