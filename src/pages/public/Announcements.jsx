import { useEffect, useState } from 'react';
import api from '../../api/axios';

export default function Announcements() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/announcements')
      .then(({ data }) => setItems(data))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold mb-8">Announcements</h1>
      {loading && <p className="text-text-dim">Loading…</p>}
      {!loading && items.length === 0 && <p className="text-text-dim">No announcements yet.</p>}
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
