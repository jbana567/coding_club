import { Link } from 'react-router-dom';
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 82ea800619b4e5356edd52cd7b87dfce6dc254af
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';

export default function Home() {
  const { projects, events, announcements } = useData();
  const { user } = useAuth();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Hero Section */}
      <section style={{ backgroundColor: '#f4f6f8', padding: '2.5rem', borderRadius: '8px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>Welcome to Coding Club</h1>
        <p style={{ fontSize: '1.1rem', color: '#555', maxWidth: '600px', margin: '0 auto 1.5rem' }}>
          Connect with fellow developers, build real-world software projects, participate in hackathons, and sharpen your coding skills.
        </p>
        {!user ? (
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link to="/register" style={{ padding: '0.6rem 1.2rem', backgroundColor: '#007bff', color: '#fff', borderRadius: '4px', textDecoration: 'none' }}>
              Join the Club
            </Link>
            <Link to="/projects" style={{ padding: '0.6rem 1.2rem', border: '1px solid #007bff', color: '#007bff', borderRadius: '4px', textDecoration: 'none' }}>
              Explore Projects
            </Link>
          </div>
        ) : (
          <Link to={user.role === 'admin' ? '/admin/dashboard' : '/dashboard'} style={{ padding: '0.6rem 1.2rem', backgroundColor: '#28a745', color: '#fff', borderRadius: '4px', textDecoration: 'none' }}>
            Go to Your Dashboard
          </Link>
        )}
      </section>

      {/* Announcements Banner */}
      {announcements.length > 0 && (
        <section style={{ border: '1px solid #ffeba2', backgroundColor: '#fff8e1', padding: '1rem', borderRadius: '6px' }}>
          <h3 style={{ margin: '0 0 0.5rem 0', color: '#856404' }}>📢 Latest Announcement</h3>
          <p style={{ margin: 0 }}><strong>{announcements[0].title}:</strong> {announcements[0].content}</p>
        </section>
      )}

      {/* Featured Sections Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
        {/* Featured Projects Preview */}
        <div style={{ border: '1px solid #ddd', padding: '1.2rem', borderRadius: '6px' }}>
          <h3>🚀 Active Projects ({projects.length})</h3>
          <ul style={{ paddingLeft: '1.2rem', margin: '0.8rem 0' }}>
            {projects.slice(0, 3).map((p) => (
              <li key={p.id} style={{ marginBottom: '0.4rem' }}>
                <strong>{p.title}</strong> — <small>{p.status}</small>
              </li>
            ))}
          </ul>
          <Link to="/projects" style={{ color: '#007bff', textDecoration: 'none', fontWeight: 'bold' }}>View all projects →</Link>
        </div>

        {/* Upcoming Events Preview */}
        <div style={{ border: '1px solid #ddd', padding: '1.2rem', borderRadius: '6px' }}>
          <h3>📅 Upcoming Events ({events.length})</h3>
          <ul style={{ paddingLeft: '1.2rem', margin: '0.8rem 0' }}>
            {events.slice(0, 3).map((e) => (
              <li key={e.id} style={{ marginBottom: '0.4rem' }}>
                <strong>{e.title}</strong> ({e.date})
              </li>
            ))}
          </ul>
          <Link to="/events" style={{ color: '#007bff', textDecoration: 'none', fontWeight: 'bold' }}>View all events →</Link>
        </div>
      </div>
    </div>
  );
<<<<<<< HEAD
}
=======

const stats = [
  { label: 'Active members', value: '1.2K+' },
  { label: 'Projects launched', value: '48' },
  { label: 'Events hosted', value: '24' },
  { label: 'Partners', value: '18' },
];

const highlights = [
  {
    title: 'Hands-on learning',
    text: 'Build real-world apps, mentor each other, and turn curiosity into confidence.',
    icon: '⚙️',
  },
  {
    title: 'Community events',
    text: 'Workshops, hackathons, and meetups that help people connect and create together.',
    icon: '🚀',
  },
  {
    title: 'Career growth',
    text: 'From portfolio projects to internship pathways and technical exposure.',
    icon: '🎯',
  },
];

const featuredPrograms = [
  {
    name: 'Community Tech Forum',
    date: 'June 2026',
    image:
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80',
    summary: 'A collaborative space for coding, networking, and building with local partners.',
  },
  {
    name: 'AI for Impact',
    date: 'April 2026',
    image:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80',
    summary: 'Members explored practical AI tools and project ideas with meaningful social impact.',
  },
  {
    name: 'Build in Public',
    date: 'March 2026',
    image:
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80',
    summary: 'A showcase of prototypes, demos, and presentations from our growing tech community.',
  },
];

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-80 bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.18),_transparent_60%)]" />
        <div className="section-shell relative grid gap-12 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-28">
          <div>
            <span className="stat-pill mb-6">Innovation for the next generation</span>
            <h1 className="max-w-xl text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
              Build smarter ideas.<br />
              <span className="text-accent">Create real impact.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-text-dim">
              Code Club Rwanda connects students, founders, and builders through mentorship, projects, and events that turn creativity into measurable progress.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/register" className="btn-primary">Join the club</Link>
              <Link to="/events" className="btn-secondary">See upcoming events</Link>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="glass-card p-4">
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="mt-1 text-sm text-text-dim">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-grid glass-card relative overflow-hidden p-4 sm:p-6">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80"
              alt="Code Club members working together"
              className="h-[420px] w-full rounded-[26px] object-cover"
            />
            <div className="absolute bottom-8 left-8 right-8 glass-card p-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-xs uppercase tracking-[0.2em] text-accent">Featured program</div>
                  <div className="mt-2 text-xl font-bold text-white">Innovation Lab</div>
                </div>
                <span className="rounded-full bg-primary/15 px-3 py-1 text-xs font-medium text-success">Active</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell py-6">
        <div className="grid gap-5 md:grid-cols-3">
          {highlights.map((item) => (
            <article key={item.title} className="feature-card">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/15 text-2xl">{item.icon}</div>
              <h3 className="text-xl font-bold text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-text-dim">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell py-20">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <span className="stat-pill">What we do</span>
            <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">Programs that create momentum</h2>
          </div>
          <Link to="/projects" className="hidden text-sm font-semibold text-accent hover:text-white md:inline-flex">
            Explore all projects →
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {featuredPrograms.map((program) => (
            <article key={program.name} className="overflow-hidden rounded-[28px] border border-ink-border bg-slate-900/70 shadow-[0_30px_80px_rgba(2,6,23,0.45)]">
              <img src={program.image} alt={program.name} className="h-52 w-full object-cover" />
              <div className="p-6">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">{program.date}</span>
                  <span className="rounded-full border border-ink-border px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-text-dim">Event</span>
                </div>
                <h3 className="text-2xl font-bold text-white">{program.name}</h3>
                <p className="mt-3 text-sm leading-6 text-text-dim">{program.summary}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell pb-20">
        <div className="glass-card overflow-hidden p-8 md:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <span className="stat-pill">Why members stay</span>
              <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">A club designed for practical growth.</h2>
            </div>
            <div className="space-y-5 text-text-dim">
              <p className="text-lg leading-8">
                Whether you are learning your first language, preparing for an internship, or launching a startup idea, Code Club gives you the structure, community, and momentum to keep moving forward.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="rounded-full border border-primary/40 bg-primary/10 px-3 py-2 text-sm text-accent">Mentorship</span>
                <span className="rounded-full border border-primary/40 bg-primary/10 px-3 py-2 text-sm text-accent">Portfolio projects</span>
                <span className="rounded-full border border-primary/40 bg-primary/10 px-3 py-2 text-sm text-accent">Hackathons</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
>>>>>>> bc97c92 (Initial commit)
=======
}
>>>>>>> 82ea800619b4e5356edd52cd7b87dfce6dc254af
