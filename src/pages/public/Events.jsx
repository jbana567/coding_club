<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 82ea800619b4e5356edd52cd7b87dfce6dc254af

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
<<<<<<< HEAD
}
=======
import { useEffect, useState } from 'react';
import api from '../../api/axios';

export default function Events() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/events')
      .then(({ data }) => setItems(data))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-8">Events</h1>
      {loading && <p className="text-text-dim">Loading…</p>}
      {!loading && items.length === 0 && <p className="text-text-dim">No events published yet.</p>}
      <div className="grid md:grid-cols-2 gap-5">
        {items.map((item) => (
          <div key={item._id} className="glass-card p-5">
            <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
            <p className="text-text-dim text-sm">{item.description || item.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
>>>>>>> bc97c92 (Initial commit)
=======
}
>>>>>>> 82ea800619b4e5356edd52cd7b87dfce6dc254af
