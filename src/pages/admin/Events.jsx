import { useEffect, useState } from 'react';
import api from '../../api/axios';

const initialEvents = [
  {
    _id: 'e1',
    title: 'Fullstack React & Vite Masterclass',
    date: '2026-04-15',
    time: '14:00 - 17:00 CAT',
    location: 'Kigali Innovation City / Online',
    attendees: 85,
    capacity: 100,
    status: 'Upcoming',
    description: 'Hands-on workshop building high-performance modern web apps with React 19, Tailwind v4, and Vite.',
  },
  {
    _id: 'e2',
    title: 'Community Tech Forum June 2026',
    date: '2026-06-20',
    time: '09:00 - 16:00 CAT',
    location: 'Car Free Zone, Kigali',
    attendees: 320,
    capacity: 500,
    status: 'Upcoming',
    description: 'A collaborative forum bringing together students, tech leaders, founders, and local industry partners.',
  },
  {
    _id: 'e3',
    title: 'AI & Data Science Roundtable',
    date: '2026-03-01',
    time: '18:00 - 20:00 CAT',
    location: 'Virtual Zoom',
    attendees: 140,
    capacity: 150,
    status: 'Completed',
    description: 'Practical exploration of machine learning models for local social impact in East Africa.',
  },
];

export default function Events() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ title: '', date: '', location: '', description: '' });
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    setLoading(true);
    api
      .get('/events')
      .then(({ data }) => {
        if (Array.isArray(data) && data.length > 0) setItems(data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  function handleCreate(e) {
    e.preventDefault();
    if (!form.title) return;
    const newItem = {
      _id: 'e_' + Date.now(),
      title: form.title,
      date: form.date || new Date().toISOString().split('T')[0],
      time: '15:00 - 17:00 CAT',
      location: form.location || 'Code Club HQ / Virtual',
      attendees: 1,
      capacity: 50,
      status: 'Upcoming',
      description: form.description || 'Community meetup event.',
    };
    setItems([newItem, ...items]);
    api.post('/events', newItem).catch(() => {});
    setForm({ title: '', date: '', location: '', description: '' });
    setShowAddForm(false);
  }

  function handleDelete(id) {
    setItems(items.filter((item) => item._id !== id));
    api.delete(`/events/${id}`).catch(() => {});
  }

  return (
    <div className="space-y-6">
      {/* Top Header & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Manage Events & Workshops</h1>
          <p className="text-sm text-text-dim mt-1">Schedule, track RSVPs, and organize community tech meetups.</p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="btn-primary text-sm flex items-center justify-center gap-2 self-start sm:self-auto"
        >
          <span>{showAddForm ? '✕ Close' : '➕ Create New Event'}</span>
        </button>
      </div>

      {/* Add Form Drawer */}
      {showAddForm && (
        <form onSubmit={handleCreate} className="glass-card p-6 rounded-3xl space-y-4 border border-primary/30">
          <h3 className="text-base font-bold text-white mb-2">Create New Event</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <input
              required
              placeholder="Event Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="bg-ink-surface border border-ink-border rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary"
            />
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className="bg-ink-surface border border-ink-border rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary"
            />
            <input
              placeholder="Location (e.g. Kigali / Virtual)"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              className="bg-ink-surface border border-ink-border rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary"
            />
            <input
              placeholder="Description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="sm:col-span-2 lg:col-span-3 bg-ink-surface border border-ink-border rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary"
            />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="btn-secondary text-sm"
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary text-sm">
              Save Event
            </button>
          </div>
        </form>
      )}

      {/* Events List */}
      <div className="space-y-4">
        {loading ? (
          <div className="p-8 text-center text-text-dim glass-card rounded-3xl">Loading events…</div>
        ) : items.length === 0 ? (
          <div className="p-8 text-center text-text-dim glass-card rounded-3xl">No events scheduled.</div>
        ) : (
          items.map((item) => (
            <div key={item._id} className="glass-card p-6 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-primary/40 transition">
              <div className="space-y-2 max-w-2xl">
                <div className="flex flex-wrap items-center gap-3">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                    item.status === 'Upcoming'
                      ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                      : 'bg-slate-700/40 text-text-dim border border-ink-border'
                  }`}>
                    {item.status}
                  </span>
                  <span className="text-xs font-semibold text-accent">📅 {item.date} ({item.time})</span>
                  <span className="text-xs text-text-dim">📍 {item.location}</span>
                </div>
                <h3 className="text-xl font-bold text-white">{item.title}</h3>
                <p className="text-sm text-text-dim leading-relaxed">{item.description}</p>
              </div>

              <div className="flex flex-row md:flex-col items-center md:items-end justify-between gap-4 pt-4 md:pt-0 border-t md:border-t-0 border-ink-border/60">
                <div className="text-right">
                  <p className="text-xs text-text-dim">RSVP Count</p>
                  <p className="text-lg font-bold text-white">{item.attendees} / {item.capacity}</p>
                </div>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="text-xs font-semibold px-3.5 py-2 rounded-xl border border-danger/20 hover:bg-danger/10 text-danger transition"
                >
                  Cancel Event
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
