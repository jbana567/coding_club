
import { useData } from '../../context/DataContext';

export default function Events() {
  const { events } = useData();

  return (
    <div>
      <h2>Upcoming Club Events</h2>
      <div style={{ display: 'grid', gap: '1rem', marginTop: '1rem' }}>
        {events?.map((event) => (
          <div key={event.id} style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '4px' }}>
            <h3>{event.title}</h3>
            <p><strong>Date:</strong> {event.date} | <strong>Venue:</strong> {event.venue}</p>
            <p>{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}