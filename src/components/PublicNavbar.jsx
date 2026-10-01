import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/events', label: 'Events' },
  { to: '/hackathons', label: 'Hackathons' },
  { to: '/announcements', label: 'Announcements' },
  { to: '/resources', label: 'Resources' },
  { to: '/contact', label: 'Contact' },
  { to: '/member/dashboard', label: 'Member Dashboard' },
];

export default function PublicNavbar() {
  const { user } = useAuth();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-ink-border bg-ink-nav/95 backdrop-blur-2xl">
      <div className="section-shell flex h-20 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-3">
          <img src="/code_club_logo.svg" alt="Code Club logo" className="h-11 w-11 rounded-2xl" />
          <div>
            <div className="text-sm font-semibold uppercase tracking-[0.22em] text-accent">Code Club</div>
            <div className="text-xs text-text-dim">Rwanda</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) => `nav-link rounded-lg px-3 py-2 ${isActive ? 'active bg-white/5' : ''}`}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <Link to={user.role === 'admin' ? '/admin' : '/member/dashboard'} className="btn-primary text-sm">
              MIS Portal
            </Link>
          ) : (
            <>
              <Link to="/register" className="btn-secondary text-sm">Join Us</Link>
              <Link to="/login" className="btn-primary text-sm">Log In</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
