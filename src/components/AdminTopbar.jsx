import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AdminTopbar({ onToggleSidebar }) {
  const { user, logout } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-slate-950/90 backdrop-blur-2xl border-b border-ink-border flex items-center justify-between px-4 sm:px-6 gap-4">
      <div className="flex items-center gap-3 md:gap-6">
        <button
          onClick={onToggleSidebar}
          className="md:hidden p-2 rounded-xl border border-ink-border bg-ink-surface text-text-dim hover:text-white transition"
          aria-label="Toggle Navigation Menu"
        >
          ☰
        </button>

        <Link to={user?.role === 'admin' ? '/admin' : '/member/dashboard'} className="flex items-center gap-3 shrink-0">
          <img src="/code_club_logo.svg" alt="Code Club logo" className="h-9 w-9 rounded-xl object-cover" />
          <span className="text-base sm:text-lg font-black tracking-widest bg-gradient-to-r from-white to-accent bg-clip-text text-transparent">
            CODE CLUB <span className="text-xs font-semibold tracking-normal text-text-dim">MIS</span>
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-2 bg-ink-surface/80 border border-ink-border rounded-xl px-3.5 py-1.5 w-72">
          <span className="text-text-dim text-sm">🔍</span>
          <input
            type="text"
            placeholder="Search members, projects, events..."
            className="bg-transparent border-none text-xs text-white placeholder:text-text-dim/60 focus:outline-none w-full"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        <Link to="/" className="hidden sm:inline-flex nav-link text-xs font-medium border border-ink-border rounded-lg px-3 py-1.5 hover:border-primary/40">
          🌐 View Site
        </Link>

        <div className="flex items-center gap-1.5 border-r border-ink-border pr-3 sm:pr-4">
          <button className="relative p-2 rounded-lg text-text-dim hover:bg-ink-surface hover:text-white transition" title="Notifications">
            🔔
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-accent animate-pulse"></span>
          </button>
          <button className="p-2 rounded-lg text-text-dim hover:bg-ink-surface hover:text-white transition" title="Messages">
            ✉️
          </button>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-2 bg-ink-surface/80 border border-ink-border rounded-full pl-1 pr-3 py-1">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-xs font-bold text-slate-950 shadow-md">
              {user?.name?.[0]?.toUpperCase() || 'A'}
            </div>
            <div className="leading-tight text-left hidden sm:block">
              <p className="text-xs font-bold text-white">{user?.name || 'Admin User'}</p>
              <p className="text-[0.62rem] text-accent font-bold uppercase tracking-wider">{user?.role || 'Admin'}</p>
            </div>
          </div>

          <button onClick={logout} className="text-xs font-semibold text-danger hover:text-red-300 border border-danger/20 hover:border-danger/40 rounded-lg px-2.5 sm:px-3 py-1.5 transition">
            Log Out
          </button>
        </div>
      </div>
    </header>
  );
}
