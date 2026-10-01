import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const adminMainLinks = [
  { to: '/admin', label: 'Dashboard', icon: '🏠', end: true },
  { to: '/admin/members', label: 'Members', icon: '👥', badge: '1.2K' },
  { to: '/admin/projects', label: 'Projects', icon: '🧩', badge: '48' },
  { to: '/admin/events', label: 'Events', icon: '📅', badge: '24' },
  { to: '/admin/hackathons', label: 'Hackathons', icon: '🚀', badge: '6' },
];

const memberMainLinks = [
  { to: '/member/dashboard', label: 'My Dashboard', icon: '🏠', end: true },
  { to: '/admin/projects', label: 'Projects', icon: '🧩' },
  { to: '/admin/events', label: 'Events', icon: '📅' },
  { to: '/admin/hackathons', label: 'Hackathons', icon: '🚀' },
];

const managementLinks = [
  { to: '/admin/announcements', label: 'Announcements', icon: '📣' },
  { to: '/admin/resources', label: 'Resources & Paths', icon: '📚' },
  { to: '/admin/reports', label: 'Reports & Analytics', icon: '📈' },
];

export default function AdminSidebar({ isOpen, onClose }) {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  const mainLinks = isAdmin ? adminMainLinks : memberMainLinks;

  return (
    <>
      {/* Mobile backdrop overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-40 md:hidden transition-opacity"
        />
      )}

      <aside
        className={`fixed top-16 left-0 bottom-0 w-64 bg-slate-950/95 backdrop-blur-2xl border-r border-ink-border overflow-y-auto z-40 flex flex-col justify-between py-4 px-3 transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="space-y-6">
          <div>
            <p className="text-[0.65rem] font-bold text-text-dim/60 uppercase tracking-[0.22em] px-3 mb-3">
              Main Menu
            </p>
            <div className="space-y-1">
              {mainLinks.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.end}
                  onClick={() => onClose && onClose()}
                  className={({ isActive }) =>
                    `flex items-center justify-between w-full px-3.5 py-2.5 rounded-xl text-sm font-medium transition ${
                      isActive
                        ? 'bg-primary/20 text-white font-semibold border border-primary/30 shadow-[0_4px_20px_rgba(16,185,129,0.15)]'
                        : 'text-text-dim hover:bg-ink-surface hover:text-white'
                    }`
                  }
                >
                  <div className="flex items-center gap-3">
                    <span className="text-base">{l.icon}</span>
                    <span>{l.label}</span>
                  </div>
                  {l.badge && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/20 text-accent border border-primary/30">
                      {l.badge}
                    </span>
                  )}
                </NavLink>
              ))}
            </div>
          </div>

          {isAdmin && <div>
            <p className="text-[0.65rem] font-bold text-text-dim/60 uppercase tracking-[0.22em] px-3 mb-3">
              Management
            </p>
            <div className="space-y-1">
              {managementLinks.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  onClick={() => onClose && onClose()}
                  className={({ isActive }) =>
                    `flex items-center gap-3 w-full px-3.5 py-2.5 rounded-xl text-sm font-medium transition ${
                      isActive
                        ? 'bg-primary/20 text-white font-semibold border border-primary/30 shadow-[0_4px_20px_rgba(16,185,129,0.15)]'
                        : 'text-text-dim hover:bg-ink-surface hover:text-white'
                    }`
                  }
                >
                  <span className="text-base">{l.icon}</span>
                  <span>{l.label}</span>
                </NavLink>
              ))}
            </div>
          </div>}
        </div>

        <div className="pt-4 border-t border-ink-border">
          <div className="glass-card p-3 rounded-2xl bg-slate-900/60 text-xs text-text-dim space-y-1">
            <div className="flex items-center justify-between font-semibold text-white">
              <span>Code Club Rwanda</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            </div>
            <p className="text-[0.7rem] text-text-dim/80">System Status: Operational</p>
          </div>
        </div>
      </aside>
    </>
  );
}
