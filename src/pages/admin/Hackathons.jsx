import { useEffect, useState } from 'react';
import api from '../../api/axios';

const initialHackathons = [
  {
    _id: 'h1',
    title: 'Kigali CodeFest 2026',
    prizePool: '$5,000 USD',
    dates: 'May 10 - May 12, 2026',
    teams: 24,
    status: 'Registration Open',
    description: '48-hour buildathon focusing on smart city solutions, fintech, and digital services for Rwanda.',
  },
  {
    _id: 'h2',
    title: 'AI Social Impact Hackathon',
    prizePool: '$3,500 USD',
    dates: 'April 02 - April 04, 2026',
    teams: 18,
    status: 'Active',
    description: 'Build practical machine learning tools addressing education accessibility and healthcare triage.',
  },
  {
    _id: 'h3',
    title: 'GreenTech Innovators Challenge',
    prizePool: '$4,000 USD',
    dates: 'January 15 - January 17, 2026',
    teams: 30,
    status: 'Ended',
    description: 'Sustainability and renewable energy hackathon partnered with local agritech hubs.',
  },
];

export default function Hackathons() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ title: '', prizePool: '', dates: '', description: '' });
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    setLoading(true);
    api
      .get('/hackathons')
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
      _id: 'h_' + Date.now(),
      title: form.title,
      prizePool: form.prizePool || '$2,500 USD',
      dates: form.dates || 'Upcoming 2026',
      teams: 1,
      status: 'Registration Open',
      description: form.description || 'Code Club community hackathon competition.',
    };
    setItems([newItem, ...items]);
    api.post('/hackathons', newItem).catch(() => {});
    setForm({ title: '', prizePool: '', dates: '', description: '' });
    setShowAddForm(false);
  }

  function handleDelete(id) {
    setItems(items.filter((item) => item._id !== id));
    api.delete(`/hackathons/${id}`).catch(() => {});
  }

  return (
    <div className="space-y-6">
      {/* Top Header & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Manage Hackathons</h1>
          <p className="text-sm text-text-dim mt-1">Host competitive hackathons, award grants, and launch member startups.</p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="btn-primary text-sm flex items-center justify-center gap-2 self-start sm:self-auto"
        >
          <span>{showAddForm ? '✕ Close' : '🚀 Host Hackathon'}</span>
        </button>
      </div>

      {/* Add Form Drawer */}
      {showAddForm && (
        <form onSubmit={handleCreate} className="glass-card p-6 rounded-3xl space-y-4 border border-primary/30">
          <h3 className="text-base font-bold text-white mb-2">Host New Hackathon</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <input
              required
              placeholder="Hackathon Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="bg-ink-surface border border-ink-border rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary"
            />
            <input
              placeholder="Prize Pool (e.g. $5,000 USD)"
              value={form.prizePool}
              onChange={(e) => setForm({ ...form, prizePool: e.target.value })}
              className="bg-ink-surface border border-ink-border rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary"
            />
            <input
              placeholder="Dates (e.g. May 10 - 12, 2026)"
              value={form.dates}
              onChange={(e) => setForm({ ...form, dates: e.target.value })}
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
              Save Hackathon
            </button>
          </div>
        </form>
      )}

      {/* Hackathons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full p-8 text-center text-text-dim glass-card rounded-3xl">Loading hackathons…</div>
        ) : items.length === 0 ? (
          <div className="col-span-full p-8 text-center text-text-dim glass-card rounded-3xl">No hackathons hosted yet.</div>
        ) : (
          items.map((item) => (
            <div key={item._id} className="glass-card p-6 rounded-3xl flex flex-col justify-between hover:border-primary/40 transition">
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                    item.status === 'Registration Open'
                      ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                      : item.status === 'Active'
                      ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                      : 'bg-slate-700/40 text-text-dim border border-ink-border'
                  }`}>
                    {item.status}
                  </span>
                  <span className="text-xs font-bold text-accent">🏆 {item.prizePool}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-xs text-text-dim mb-3">📅 {item.dates}</p>
                <p className="text-sm text-text-dim leading-relaxed mb-4">{item.description}</p>
              </div>

              <div className="pt-4 border-t border-ink-border/60 flex items-center justify-between text-xs">
                <span className="text-text-dim">Registered: <strong className="text-white">{item.teams} Teams</strong></span>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="text-danger hover:text-red-300 font-semibold transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
