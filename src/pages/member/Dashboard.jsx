import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../api/axios';
import { useAuth } from '../../context/AuthContext';

const starterProjects = [];
const starterEvents = [];

const emptyProject = { title: '', description: '', category: 'Web Development' };

function readStore(key, fallback) {
  try {
    const stored = JSON.parse(localStorage.getItem(key));
    if (!Array.isArray(stored)) return fallback;
    return stored.filter((item) => !['demo-project-1', 'event-1', 'event-2', 'event-3'].includes(item.id));
  } catch {
    return fallback;
  }
}

export default function MemberDashboard() {
  const { user, updateUser } = useAuth();
  const storageKey = user?.id || user?.email || 'guest';
  const [profile, setProfile] = useState({ name: user?.name || '', email: user?.email || '' });
  const [projects, setProjects] = useState(() => readStore(`ccms_member_projects_${storageKey}`, starterProjects));
  const [events, setEvents] = useState(() => readStore(`ccms_member_events_${storageKey}`, starterEvents));
  const [projectForm, setProjectForm] = useState(emptyProject);
  const [editingId, setEditingId] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [notice, setNotice] = useState('');

  useEffect(() => {
    localStorage.setItem(`ccms_member_projects_${storageKey}`, JSON.stringify(projects));
  }, [projects, storageKey]);

  useEffect(() => {
    localStorage.setItem(`ccms_member_events_${storageKey}`, JSON.stringify(events));
  }, [events, storageKey]);

  const registeredEvents = useMemo(() => events.filter((event) => event.registered).length, [events]);

  function showNotice(message) {
    setNotice(message);
    window.setTimeout(() => setNotice(''), 3000);
  }

  function saveProfile(event) {
    event.preventDefault();
    updateUser({ name: profile.name.trim(), email: profile.email.trim().toLowerCase() });
    showNotice('Profile updated successfully.');
  }

  function saveProject(event) {
    event.preventDefault();
    if (!projectForm.title.trim()) return;

    if (editingId) {
      setProjects((current) => current.map((project) => (
        project.id === editingId
          ? { ...project, ...projectForm, updatedAt: new Date().toISOString().split('T')[0] }
          : project
      )));
      api.put(`/projects/${editingId}`, projectForm).catch(() => {});
      showNotice('Project updated.');
    } else {
      const project = {
        ...projectForm,
        id: `member-project-${Date.now()}`,
        status: 'In progress',
        updatedAt: new Date().toISOString().split('T')[0],
      };
      setProjects((current) => [project, ...current]);
      api.post('/projects', { ...project, author: user?.name }).catch(() => {});
      showNotice('Project created.');
    }

    setProjectForm(emptyProject);
    setEditingId(null);
  }

  function editProject(project) {
    setProjectForm({ title: project.title, description: project.description, category: project.category });
    setEditingId(project.id);
    setActiveTab('projects');
  }

  function deleteProject(id) {
    setProjects((current) => current.filter((project) => project.id !== id));
    api.delete(`/projects/${id}`).catch(() => {});
    showNotice('Project deleted.');
  }

  function toggleEvent(event) {
    setEvents((current) => current.map((item) => (
      item.id === event.id ? { ...item, registered: !item.registered } : item
    )));
    showNotice(event.registered ? 'Event registration cancelled.' : 'You are registered for this event.');
  }

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'projects', label: 'My Projects' },
    { id: 'events', label: 'Events' },
    { id: 'profile', label: 'Profile' },
  ];

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">Member workspace</p>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-white">Welcome, {user?.name || 'Member'}</h1>
          <p className="mt-1 text-sm text-text-dim">Track your work, keep your profile current, and join the next Code Club session.</p>
        </div>
        <Link to="/" className="btn-secondary text-sm">View public site</Link>
      </div>

      {notice && <div className="rounded-xl border border-primary/30 bg-primary/10 px-4 py-3 text-sm text-emerald-200">{notice}</div>}

      <nav className="flex gap-2 overflow-x-auto border-b border-ink-border pb-2" aria-label="Member dashboard sections">
        {tabs.map((tab) => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm font-semibold transition ${activeTab === tab.id ? 'bg-primary text-slate-950' : 'text-text-dim hover:bg-ink-surface hover:text-white'}`}>
            {tab.label}
          </button>
        ))}
      </nav>

      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="glass-card p-5"><p className="text-xs text-text-dim">My projects</p><p className="mt-2 text-3xl font-black text-white">{projects.length}</p></div>
            <div className="glass-card p-5"><p className="text-xs text-text-dim">Registered events</p><p className="mt-2 text-3xl font-black text-white">{registeredEvents}</p></div>
            <div className="glass-card p-5"><p className="text-xs text-text-dim">Membership stage</p><p className="mt-2 text-xl font-bold text-white">Stage 1 · Beginner</p></div>
          </div>
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <section className="glass-card p-6">
              <div className="flex items-center justify-between gap-4"><h2 className="text-lg font-bold text-white">Recent projects</h2><button onClick={() => setActiveTab('projects')} className="text-sm font-semibold text-accent">Manage all</button></div>
              <div className="mt-5 space-y-3">
                {projects.slice(0, 3).map((project) => <div key={project.id} className="flex items-center justify-between gap-4 rounded-xl border border-ink-border bg-ink-surface p-4"><div><p className="font-semibold text-white">{project.title}</p><p className="mt-1 text-xs text-text-dim">{project.category} · Updated {project.updatedAt}</p></div><span className="text-xs text-accent">{project.status}</span></div>)}
              </div>
            </section>
            <section className="glass-card p-6"><h2 className="text-lg font-bold text-white">Next event</h2><p className="mt-4 text-xl font-bold text-white">{events.find((event) => !event.registered)?.title || 'You are all caught up'}</p><p className="mt-2 text-sm text-text-dim">Reserve a place from the Events tab.</p><button onClick={() => setActiveTab('events')} className="btn-primary mt-5 text-sm">Browse events</button></section>
          </div>
        </div>
      )}

      {activeTab === 'projects' && (
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <form onSubmit={saveProject} className="glass-card h-fit space-y-4 p-6">
            <div><h2 className="text-lg font-bold text-white">{editingId ? 'Edit project' : 'Create project'}</h2><p className="mt-1 text-xs text-text-dim">Keep your portfolio current for mentors and collaborators.</p></div>
            <input required placeholder="Project title" value={projectForm.title} onChange={(event) => setProjectForm({ ...projectForm, title: event.target.value })} className="w-full rounded-xl border border-ink-border bg-ink-surface px-4 py-3 text-sm text-white focus:border-primary focus:outline-none" />
            <select value={projectForm.category} onChange={(event) => setProjectForm({ ...projectForm, category: event.target.value })} className="w-full rounded-xl border border-ink-border bg-ink-surface px-4 py-3 text-sm text-white focus:border-primary focus:outline-none"><option>Web Development</option><option>AI / Data Science</option><option>Mobile Apps</option><option>IoT / Embedded</option></select>
            <textarea required rows="4" placeholder="What are you building?" value={projectForm.description} onChange={(event) => setProjectForm({ ...projectForm, description: event.target.value })} className="w-full rounded-xl border border-ink-border bg-ink-surface px-4 py-3 text-sm text-white focus:border-primary focus:outline-none" />
            <div className="flex gap-3"><button className="btn-primary text-sm" type="submit">{editingId ? 'Save changes' : 'Create project'}</button>{editingId && <button type="button" onClick={() => { setEditingId(null); setProjectForm(emptyProject); }} className="btn-secondary text-sm">Cancel</button>}</div>
          </form>
          <section className="space-y-4"><h2 className="text-lg font-bold text-white">Your projects</h2>{projects.map((project) => <article key={project.id} className="glass-card flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between"><div><div className="flex flex-wrap items-center gap-2"><span className="text-xs font-semibold text-accent">{project.category}</span><span className="text-xs text-text-dim">{project.status}</span></div><h3 className="mt-2 text-lg font-bold text-white">{project.title}</h3><p className="mt-1 text-sm text-text-dim">{project.description}</p></div><div className="flex shrink-0 gap-3"><button onClick={() => editProject(project)} className="text-sm font-semibold text-accent">Edit</button><button onClick={() => deleteProject(project.id)} className="text-sm font-semibold text-danger">Delete</button></div></article>)}</section>
        </div>
      )}

      {activeTab === 'events' && <section className="space-y-4"><h2 className="text-lg font-bold text-white">Community events</h2>{events.map((event) => <article key={event.id} className="glass-card flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-xs font-semibold uppercase tracking-wider text-accent">{event.date}</p><h3 className="mt-2 text-lg font-bold text-white">{event.title}</h3><p className="mt-1 text-sm text-text-dim">{event.location}</p></div><button onClick={() => toggleEvent(event)} className={event.registered ? 'btn-secondary text-sm' : 'btn-primary text-sm'}>{event.registered ? 'Cancel registration' : 'Register'}</button></article>)}</section>}

      {activeTab === 'profile' && <form onSubmit={saveProfile} className="glass-card max-w-2xl space-y-5 p-6"><div><h2 className="text-lg font-bold text-white">My profile</h2><p className="mt-1 text-sm text-text-dim">Update the details used by the Code Club community.</p></div><label className="block text-sm text-text-dim">Full name<input required value={profile.name} onChange={(event) => setProfile({ ...profile, name: event.target.value })} className="mt-2 w-full rounded-xl border border-ink-border bg-ink-surface px-4 py-3 text-white focus:border-primary focus:outline-none" /></label><label className="block text-sm text-text-dim">Email<input required type="email" value={profile.email} onChange={(event) => setProfile({ ...profile, email: event.target.value })} className="mt-2 w-full rounded-xl border border-ink-border bg-ink-surface px-4 py-3 text-white focus:border-primary focus:outline-none" /></label><button className="btn-primary text-sm" type="submit">Save profile</button></form>}
    </div>
  );
}