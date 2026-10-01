import { useEffect, useState } from 'react';
import api from '../../api/axios';

const initialAnnouncements = [
  {
    _id: 'a1',
    title: 'Q3 Mentorship Program Applications Open!',
    date: '2026-03-10',
    category: 'Mentorship',
    audience: 'All Members',
    description: 'Stage 1 & 2 members can now apply to pair with Stage 3 & 4 senior developers for 8 weeks of 1-on-1 mentorship.',
  },
  {
    _id: 'a2',
    title: 'New Python & TypeScript Learning Paths Released',
    date: '2026-02-28',
    category: 'Resources',
    audience: 'Beginners & Juniors',
    description: 'Explore step-by-step video tutorials, coding exercises, and portfolio starter projects under the Resources tab.',
  },
  {
    _id: 'a3',
    title: 'Kigali CodeFest 2026 Prize Pool Announced',
    date: '2026-02-15',
    category: 'Hackathons',
    audience: 'All Members',
    description: 'We are thrilled to announce a $5,000 USD total prize pool funded by our community tech partners!',
  },
];

export default function Announcements() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ title: '', category: 'General', audience: 'All Members', description: '' });
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    setLoading(true);
    api
      .get('/announcements')
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
      _id: 'a_' + Date.now(),
      title: form.title,
      date: new Date().toISOString().split('T')[0],
      category: form.category || 'General',
      audience: form.audience || 'All Members',
      description: form.description || 'Important update for Code Club community.',
    };
    setItems([newItem, ...items]);
    api.post('/announcements', newItem).catch(() => {});
    setForm({ title: '', category: 'General', audience: 'All Members', description: '' });
    setShowAddForm(false);
  }

  function handleDelete(id) {
    setItems(items.filter((item) => item._id !== id));
    api.delete(`/announcements/${id}`).catch(() => {});
  }

  return (
    <div className="space-y-6">
      {/* Top Header & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Manage Announcements</h1>
          <p className="text-sm text-text-dim mt-1">Broadcast news, learning path updates, and community alerts.</p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="btn-primary text-sm flex items-center justify-center gap-2 self-start sm:self-auto"
        >
          <span>{showAddForm ? '✕ Close' : '📢 Post Announcement'}</span>
        </button>
      </div>

      {/* Add Form Drawer */}
      {showAddForm && (
        <form onSubmit={handleCreate} className="glass-card p-6 rounded-3xl space-y-4 border border-primary/30">
          <h3 className="text-base font-bold text-white mb-2">Post New Announcement</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <input
              required
              placeholder="Announcement Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="bg-ink-surface border border-ink-border rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary"
            />
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="bg-ink-surface border border-ink-border rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary"
            >
              <option value="General">General News</option>
              <option value="Mentorship">Mentorship</option>
              <option value="Resources">Resources</option>
              <option value="Hackathons">Hackathons</option>
            </select>
            <input
              placeholder="Audience (e.g. All Members)"
              value={form.audience}
              onChange={(e) => setForm({ ...form, audience: e.target.value })}
              className="bg-ink-surface border border-ink-border rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary"
            />
            <input
              placeholder="Announcement Body Content"
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
              Publish Announcement
            </button>
          </div>
        </form>
      )}

      {/* Announcements List */}
      <div className="space-y-4">
        {loading ? (
          <div className="p-8 text-center text-text-dim glass-card rounded-3xl">Loading announcements…</div>
        ) : items.length === 0 ? (
          <div className="p-8 text-center text-text-dim glass-card rounded-3xl">No announcements published.</div>
        ) : (
          items.map((item) => (
            <div key={item._id} className="glass-card p-6 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-primary/40 transition">
              <div className="space-y-2 max-w-3xl">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-accent px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20">
                    {item.category}
                  </span>
                  <span className="text-xs font-semibold text-text-dim">👥 {item.audience}</span>
                  <span className="text-xs text-text-dim">📅 {item.date}</span>
                </div>
                <h3 className="text-xl font-bold text-white">{item.title}</h3>
                <p className="text-sm text-text-dim leading-relaxed">{item.description}</p>
              </div>

              <button
                onClick={() => handleDelete(item._id)}
                className="text-xs font-semibold px-3.5 py-2 rounded-xl border border-danger/20 hover:bg-danger/10 text-danger transition self-end md:self-center"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
