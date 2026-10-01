import { useEffect, useState } from 'react';
import api from '../../api/axios';

const initialResources = [
  {
    _id: 'r1',
    title: 'Python for Beginners & Automation',
    category: 'Stage 1 (Beginner)',
    type: 'Video Course & Code Lab',
    link: 'https://codeclub.rw/resources/python-101',
    downloads: 420,
    description: 'Master variables, loops, functions, and automated scripting in Python step-by-step.',
  },
  {
    _id: 'r2',
    title: 'Modern JavaScript & TypeScript Patterns',
    category: 'Stage 2 (Junior Dev)',
    type: 'PDF Guide & Repository',
    link: 'https://codeclub.rw/resources/js-ts-guide',
    downloads: 310,
    description: 'Data structures, DOM manipulation, async/await, and clean component patterns.',
  },
  {
    _id: 'r3',
    title: 'Fullstack Database Design with PostgreSQL & Prisma',
    category: 'Stage 3 (Senior Dev)',
    type: 'Interactive Workshop Code',
    link: 'https://codeclub.rw/resources/db-design',
    downloads: 195,
    description: 'Relational database schema normalization, indexing, ORMs, and secure API integration.',
  },
  {
    _id: 'r4',
    title: 'System Design & High Performance Architecture',
    category: 'Stage 4 (Pro Dev)',
    type: 'Architecture E-Book',
    link: 'https://codeclub.rw/resources/system-design',
    downloads: 140,
    description: 'Scalable system architecture, caching, microservices, and technical interview preparation.',
  },
];

export default function Resources() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ title: '', category: 'Stage 1 (Beginner)', type: 'PDF Guide', description: '' });
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    setLoading(true);
    api
      .get('/resources')
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
      _id: 'r_' + Date.now(),
      title: form.title,
      category: form.category || 'Stage 1 (Beginner)',
      type: form.type || 'PDF Guide',
      link: '#',
      downloads: 1,
      description: form.description || 'Learning path resource for Code Club members.',
    };
    setItems([newItem, ...items]);
    api.post('/resources', newItem).catch(() => {});
    setForm({ title: '', category: 'Stage 1 (Beginner)', type: 'PDF Guide', description: '' });
    setShowAddForm(false);
  }

  function handleDelete(id) {
    setItems(items.filter((item) => item._id !== id));
    api.delete(`/resources/${id}`).catch(() => {});
  }

  return (
    <div className="space-y-6">
      {/* Top Header & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Manage Learning Resources & Paths</h1>
          <p className="text-sm text-text-dim mt-1">Curate educational materials, courses, and documentation for members.</p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="btn-primary text-sm flex items-center justify-center gap-2 self-start sm:self-auto"
        >
          <span>{showAddForm ? '✕ Close' : '📚 Add New Resource'}</span>
        </button>
      </div>

      {/* Add Form Drawer */}
      {showAddForm && (
        <form onSubmit={handleCreate} className="glass-card p-6 rounded-3xl space-y-4 border border-primary/30">
          <h3 className="text-base font-bold text-white mb-2">Add New Resource</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <input
              required
              placeholder="Resource Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="bg-ink-surface border border-ink-border rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary"
            />
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="bg-ink-surface border border-ink-border rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary"
            >
              <option value="Stage 1 (Beginner)">Stage 1 (Beginner)</option>
              <option value="Stage 2 (Junior Dev)">Stage 2 (Junior Dev)</option>
              <option value="Stage 3 (Senior Dev)">Stage 3 (Senior Dev)</option>
              <option value="Stage 4 (Pro Dev)">Stage 4 (Pro Dev)</option>
            </select>
            <input
              placeholder="Format / Type (e.g. Video Course)"
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
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
              Save Resource
            </button>
          </div>
        </form>
      )}

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {loading ? (
          <div className="col-span-full p-8 text-center text-text-dim glass-card rounded-3xl">Loading resources…</div>
        ) : items.length === 0 ? (
          <div className="col-span-full p-8 text-center text-text-dim glass-card rounded-3xl">No resources available.</div>
        ) : (
          items.map((item) => (
            <div key={item._id} className="glass-card p-6 rounded-3xl flex flex-col justify-between hover:border-primary/40 transition">
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-accent px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20">
                      {item.category}
                    </span>
                    <h3 className="text-xl font-bold text-white mt-2">{item.title}</h3>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-sky-500/15 text-sky-300 border border-sky-500/30">
                    {item.type}
                  </span>
                </div>
                <p className="text-sm text-text-dim leading-relaxed mb-4">{item.description}</p>
              </div>

              <div className="pt-4 border-t border-ink-border/60 flex items-center justify-between text-xs">
                <span className="text-text-dim">📥 <strong>{item.downloads} Downloads</strong></span>
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
