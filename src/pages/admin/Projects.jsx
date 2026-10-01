import { useEffect, useState } from 'react';
import api from '../../api/axios';

const initialProjects = [
  {
    _id: 'p1',
    title: 'AI for Impact Portal',
    description: 'An open-source AI platform connecting community projects with local healthcare & education challenges.',
    category: 'AI / Data Science',
    author: 'Royal Arkin',
    status: 'Published',
    stars: 42,
  },
  {
    _id: 'p2',
    title: 'Kigali Transit Bus Tracker',
    description: 'Real-time transit tracker for city buses built with React, Node.js, and WebSocket APIs.',
    category: 'Web Development',
    author: 'Saimon Tanvir',
    status: 'Published',
    stars: 28,
  },
  {
    _id: 'p3',
    title: 'Agritech Soil Moisture Monitor',
    description: 'IoT sensor dashboard monitoring soil conditions for sustainable farming in Northern Province.',
    category: 'IoT / Mobile',
    author: 'Amina Umutoni',
    status: 'In Review',
    stars: 19,
  },
  {
    _id: 'p4',
    title: 'Code Club Mobile Learning App',
    description: 'Cross-platform mobile app enabling offline interactive coding lessons for beginner students.',
    category: 'Mobile Apps',
    author: 'David Nkurunziza',
    status: 'Active',
    stars: 35,
  },
];

export default function Projects() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [form, setForm] = useState({ title: '', description: '', category: 'Web Development', author: '' });
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    setLoading(true);
    api
      .get('/projects')
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
      _id: 'p_' + Date.now(),
      title: form.title,
      description: form.description || 'Community project built by Code Club members.',
      category: form.category || 'Web Development',
      author: form.author || 'Club Member',
      status: 'Active',
      stars: 1,
    };
    setItems([newItem, ...items]);
    api.post('/projects', newItem).catch(() => {});
    setForm({ title: '', description: '', category: 'Web Development', author: '' });
    setShowAddForm(false);
  }

  function handleDelete(id) {
    setItems(items.filter((item) => item._id !== id));
    api.delete(`/projects/${id}`).catch(() => {});
  }

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'All' || item.category.includes(category);
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Top Header & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Manage Projects</h1>
          <p className="text-sm text-text-dim mt-1">Review, approve, and showcase projects created by Code Club builders.</p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="btn-primary text-sm flex items-center justify-center gap-2 self-start sm:self-auto"
        >
          <span>{showAddForm ? '✕ Close' : '➕ Submit New Project'}</span>
        </button>
      </div>

      {/* Add Form */}
      {showAddForm && (
        <form onSubmit={handleCreate} className="glass-card p-6 rounded-3xl space-y-4 border border-primary/30">
          <h3 className="text-base font-bold text-white mb-2">Submit New Project</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <input
              required
              placeholder="Project Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="bg-ink-surface border border-ink-border rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary"
            />
            <input
              placeholder="Author / Lead Name"
              value={form.author}
              onChange={(e) => setForm({ ...form, author: e.target.value })}
              className="bg-ink-surface border border-ink-border rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary"
            />
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="bg-ink-surface border border-ink-border rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary"
            >
              <option value="Web Development">Web Development</option>
              <option value="AI / Data Science">AI / Data Science</option>
              <option value="Mobile Apps">Mobile Apps</option>
              <option value="IoT / Embedded">IoT / Embedded</option>
            </select>
            <input
              placeholder="Short Description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="bg-ink-surface border border-ink-border rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-primary"
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
              Save Project
            </button>
          </div>
        </form>
      )}

      {/* Filter and Search Bar */}
      <div className="glass-card p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <span className="absolute left-3.5 top-2.5 text-text-dim text-sm">🔍</span>
          <input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-ink-surface border border-ink-border rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder:text-text-dim/60 focus:outline-none focus:border-primary"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {['All', 'Web', 'AI', 'Mobile', 'IoT'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                category === cat
                  ? 'bg-primary text-slate-950 shadow-md font-bold'
                  : 'bg-ink-surface text-text-dim hover:text-white border border-ink-border'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {loading ? (
          <div className="col-span-full p-8 text-center text-text-dim">Loading projects…</div>
        ) : filteredItems.length === 0 ? (
          <div className="col-span-full p-8 text-center text-text-dim">No projects found.</div>
        ) : (
          filteredItems.map((item) => (
            <div key={item._id} className="glass-card p-6 rounded-3xl flex flex-col justify-between hover:border-primary/40 transition">
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-accent px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20">
                      {item.category}
                    </span>
                    <h3 className="text-xl font-bold text-white mt-2">{item.title}</h3>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                    {item.status}
                  </span>
                </div>
                <p className="text-sm text-text-dim leading-relaxed mb-4">{item.description}</p>
              </div>

              <div className="pt-4 border-t border-ink-border/60 flex items-center justify-between text-xs">
                <span className="text-text-dim">By <strong className="text-white">{item.author}</strong></span>
                <div className="flex items-center gap-3">
                  <span className="text-amber-400 font-bold">⭐ {item.stars}</span>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="text-danger hover:text-red-300 font-semibold transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
