import { useEffect, useState } from 'react';
import api from '../../api/axios';

const defaultStats = {
  members: 0,
  projects: 0,
  events: 0,
  hackathons: 0,
  grants: '$0',
  hackathonParticipants: 0,
  announcements: 0,
};

const activityBars = [
  { day: 'Sun', height: 45 },
  { day: 'Mon', height: 65 },
  { day: 'Tue', height: 50 },
  { day: 'Wed', height: 95, active: true },
  { day: 'Thu', height: 75 },
  { day: 'Fri', height: 60 },
  { day: 'Sat', height: 85 },
  { day: 'Sun', height: 40 },
  { day: 'Mon', height: 70 },
  { day: 'Tue', height: 55 },
  { day: 'Wed', height: 80 },
  { day: 'Thu', height: 60 },
];

const recentActivities = [
  {
    id: 1,
    icon: '🛍️',
    title: 'AI for Impact Portal',
    subtitle: 'Project Submission',
    amount: 'Stage 3 Project',
    type: 'project',
    color: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  },
  {
    id: 2,
    icon: '🚀',
    title: 'Kigali CodeFest 2026',
    subtitle: 'Hackathon Registration',
    amount: 'Team Alpha (4 members)',
    type: 'hackathon',
    color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  },
  {
    id: 3,
    icon: '⚡',
    title: 'Jean-Luc Nshimiyimana',
    subtitle: 'Promoted to Senior Developer',
    amount: 'Stage 3 Achieved',
    type: 'promotion',
    color: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
  },
  {
    id: 4,
    icon: '🎟️',
    title: 'Fullstack React & Vite',
    subtitle: 'Workshop RSVP',
    amount: '50 Seats Reserved',
    type: 'event',
    color: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  },
  {
    id: 5,
    icon: '📜',
    title: 'Advanced Python Guide',
    subtitle: 'Learning Resource Published',
    amount: '1,200 Views',
    type: 'resource',
    color: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  },
];

const memberStages = [
  { id: 'stage1', label: 'Stage 1 (Beginners)', count: '450 Coders', icon: '🏠' },
  { id: 'stage2', label: 'Stage 2 (Junior Devs)', count: '380 Coders', icon: '📱' },
  { id: 'stage3', label: 'Stage 3 (Senior Devs)', count: '270 Coders', icon: '🔌' },
  { id: 'stage4', label: 'Stage 4 (Pro Devs)', count: '148 Coders', icon: '🌐' },
  { id: 'mentors', label: 'Active Mentors', count: '32 Mentors', icon: '⛽' },
];

const memberRows = [
  {
    id: 1,
    name: 'Royal Arkin',
    email: 'royal@codeclub.rw',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
    status: 'In progress',
    statusStyle: 'bg-amber-500/15 text-amber-300 border border-amber-500/30',
    date: '22 Jan, 2026',
    activity: '12 Projects',
  },
  {
    id: 2,
    name: 'Saimon Tanvir',
    email: 'saimon@codeclub.rw',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
    status: 'Completed',
    statusStyle: 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30',
    date: '28 Dec, 2025',
    activity: '18 Projects',
  },
  {
    id: 3,
    name: 'Amina Umutoni',
    email: 'amina@codeclub.rw',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
    status: 'Completed',
    statusStyle: 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30',
    date: '15 Feb, 2026',
    activity: '14 Projects',
  },
  {
    id: 4,
    name: 'David Nkurunziza',
    email: 'david@codeclub.rw',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
    status: 'In progress',
    statusStyle: 'bg-amber-500/15 text-amber-300 border border-amber-500/30',
    date: '02 Mar, 2026',
    activity: '9 Projects',
  },
];

export default function Dashboard() {
  const [stats, setStats] = useState(defaultStats);
  const [filter, setFilter] = useState('newest');
  const [timeframe, setTimeframe] = useState('12 Days');

  useEffect(() => {
    api
      .get('/dashboard/stats')
      .then(({ data }) => setStats((prev) => ({ ...prev, ...data })))
      .catch(() => setStats(defaultStats));
  }, []);

  const displayedRows = [];

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* Top Welcome Header */}
      <div>
        <h1 className="text-3xl font-black tracking-tight text-white">Welcome back</h1>
        <p className="text-sm text-text-dim mt-1">
          Welcome to Code Club Rwanda MIS dashboard overview.
        </p>
      </div>

      {/* Row 1: 4 Metric Cards + Featured Chart Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Side: 2x2 Grid of 4 Stat Cards */}
        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Card 1: Total Members */}
          <div className="glass-card p-5 relative overflow-hidden flex flex-col justify-between hover:border-primary/40 transition">
            <div>
              <p className="text-xs font-semibold text-text-dim tracking-wide">Total Members</p>
              <h3 className="text-3xl font-extrabold text-white mt-2">
                {stats.members ? stats.members.toLocaleString() : '1,248'}
              </h3>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                ↗ 7.4%
              </span>
              <span className="text-[0.68rem] text-text-dim">vs last month</span>
            </div>
          </div>

          {/* Card 2: Projects Shipped */}
          <div className="glass-card p-5 relative overflow-hidden flex flex-col justify-between hover:border-primary/40 transition">
            <div>
              <p className="text-xs font-semibold text-text-dim tracking-wide">Projects Shipped</p>
              <h3 className="text-3xl font-extrabold text-white mt-2">
                {stats.projects ? stats.projects.toLocaleString() : '184'}
              </h3>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                ↗ 3.4%
              </span>
              <span className="text-[0.68rem] text-text-dim">vs last month</span>
            </div>
          </div>

          {/* Card 3: Event Attendees */}
          <div className="glass-card p-5 relative overflow-hidden flex flex-col justify-between hover:border-primary/40 transition">
            <div>
              <p className="text-xs font-semibold text-text-dim tracking-wide">Event Attendees</p>
              <h3 className="text-3xl font-extrabold text-white mt-2">
                {stats.events ? stats.events.toLocaleString() : '850'}
              </h3>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                ↗ 3.1%
              </span>
              <span className="text-[0.68rem] text-text-dim">vs last month</span>
            </div>
          </div>

          {/* Card 4: Hackathons & Grants */}
          <div className="glass-card p-5 relative overflow-hidden flex flex-col justify-between hover:border-primary/40 transition">
            <div>
              <p className="text-xs font-semibold text-text-dim tracking-wide">Hackathon Grants</p>
              <h3 className="text-3xl font-extrabold text-white mt-2">
                {stats.grants || '$12,500'}
              </h3>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                ↗ 11.4%
              </span>
              <span className="text-[0.68rem] text-text-dim">vs last month</span>
            </div>
          </div>
        </div>

        {/* Right Side: Featured Teal Activity Bar Chart Card */}
        <div className="lg:col-span-6 rounded-3xl p-6 bg-gradient-to-br from-teal-700/90 via-emerald-800/90 to-slate-900/90 border border-teal-500/30 shadow-[0_20px_60px_rgba(4,47,46,0.5)] flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-white tracking-tight">Code Activity</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-2xl font-extrabold text-white">1,200</span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-white/20 text-emerald-200">
                  +3.4%
                </span>
              </div>
            </div>

            <button
              onClick={() => setTimeframe(timeframe === '12 Days' ? '30 Days' : '12 Days')}
              className="px-3.5 py-1.5 rounded-xl bg-white/10 border border-white/20 text-xs font-semibold text-white hover:bg-white/20 transition flex items-center gap-2"
            >
              <span>{timeframe}</span>
              <span>📅</span>
            </button>
          </div>

          {/* Bar Chart Visualization */}
          <div className="mt-8 pt-4 border-t border-white/10 flex items-end justify-between gap-2 h-44">
            {activityBars.map((bar, index) => (
              <div key={index} className="flex flex-col items-center gap-2 flex-1 h-full justify-end group">
                <div
                  style={{ height: `${bar.height}%` }}
                  className={`w-full rounded-t-lg transition-all duration-300 ${
                    bar.active
                      ? 'bg-amber-200 shadow-[0_0_15px_rgba(253,230,138,0.8)] border-t-2 border-white'
                      : 'bg-amber-100/75 hover:bg-amber-100'
                  }`}
                ></div>
                <span className="text-[10px] font-semibold text-teal-100/80 tracking-tighter">
                  {bar.day}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 2: Recent Activity Feed + Quick Category Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Box: Recent Activity Feed */}
        <div className="lg:col-span-6 glass-card p-6 rounded-3xl">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-base font-bold text-white">Recent Activity</h3>
            <span className="text-text-dim text-xs font-bold cursor-pointer hover:text-white">•••</span>
          </div>

          <div className="space-y-4">
            {recentActivities.map((act) => (
              <div key={act.id} className="flex items-center justify-between p-3 rounded-2xl bg-ink-surface/40 hover:bg-ink-surface/80 transition border border-ink-border/40">
                <div className="flex items-center gap-3.5">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg border ${act.color}`}>
                    {act.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">{act.title}</h4>
                    <p className="text-xs text-text-dim">{act.subtitle}</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-accent">{act.amount}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Box: Quick Member Stages Cards */}
        <div className="lg:col-span-6 glass-card p-6 rounded-3xl">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-base font-bold text-white">Member Stages</h3>
            <span className="text-xs text-text-dim">Overview</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {memberStages.map((stage) => (
              <div key={stage.id} className="glass-card p-3.5 rounded-2xl flex flex-col items-center text-center hover:border-primary/40 transition">
                <div className="w-10 h-10 rounded-2xl bg-ink-surface flex items-center justify-center text-lg mb-2">
                  {stage.icon}
                </div>
                <h4 className="text-xs font-semibold text-white leading-tight mb-1">{stage.label}</h4>
                <p className="text-[0.68rem] text-accent font-bold">{stage.count}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 3: Members & Submissions Table */}
      <div className="glass-card p-6 rounded-3xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h3 className="text-lg font-bold text-white">Recent Registrations & Submissions</h3>

          <div className="flex items-center gap-2 bg-ink-surface p-1 rounded-xl border border-ink-border">
            <button
              onClick={() => setFilter('newest')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition ${
                filter === 'newest'
                  ? 'bg-white text-slate-950 shadow-md'
                  : 'text-text-dim hover:text-white'
              }`}
            >
              Newest
            </button>
            <button
              onClick={() => setFilter('oldest')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition ${
                filter === 'oldest'
                  ? 'bg-white text-slate-950 shadow-md'
                  : 'text-text-dim hover:text-white'
              }`}
            >
              Oldest
            </button>
          </div>
        </div>

        {/* Table Container */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-ink-border/60 text-xs uppercase tracking-wider text-text-dim">
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4 text-right">Projects / Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-border/40">
              {displayedRows.map((row) => (
                <tr key={row.id} className="hover:bg-ink-surface/50 transition">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={row.avatar}
                        alt={row.name}
                        className="w-9 h-9 rounded-full object-cover border border-ink-border"
                      />
                      <div>
                        <p className="text-sm font-semibold text-white">{row.name}</p>
                        <p className="text-xs text-text-dim">{row.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${row.statusStyle}`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-xs text-text-dim">{row.date}</td>
                  <td className="py-3.5 px-4 text-right text-sm font-bold text-white">{row.activity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
