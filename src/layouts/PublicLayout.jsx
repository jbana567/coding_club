import { Outlet, Link } from 'react-router-dom';
import PublicNavbar from '../components/PublicNavbar';

const quickLinks = [
  { label: 'About', to: '/about' },
  { label: 'Projects', to: '/projects' },
  { label: 'Events', to: '/events' },
  { label: 'Hackathons', to: '/hackathons' },
  { label: 'Resources', to: '/resources' },
  { label: 'Member Dashboard', to: '/member/dashboard' },
];

const socials = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com' },
  { label: 'Instagram', href: 'https://www.instagram.com' },
  { label: 'X / Twitter', href: 'https://x.com' },
  { label: 'YouTube', href: 'https://www.youtube.com' },
];

export default function PublicLayout() {
  return (
    <div className="min-h-screen">
      <PublicNavbar />
      <main className="pt-20">
        <Outlet />
      </main>

      <footer className="mt-10 border-t border-ink-border bg-slate-950/60">
        <div className="section-shell grid gap-10 py-12 md:grid-cols-3">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <img src="/code_club_logo.svg" alt="Code Club logo" className="h-12 w-12 rounded-2xl" />
              <div>
                <div className="text-base font-semibold uppercase tracking-[0.2em] text-accent">Code Club</div>
                <div className="text-xs text-text-dim">Innovation. Impact. Community.</div>
              </div>
            </div>
            <p className="max-w-sm text-sm leading-6 text-text-dim">
              We bring together builders, researchers, and future technologists to learn, ship, and make Rwanda’s digital future more inclusive.
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-white">Quick Links</h3>
            <ul className="space-y-3 text-sm text-text-dim">
              {quickLinks.map((link) => (
                <li key={link.to}><Link to={link.to} className="hover:text-accent">{link.label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-white">Connect</h3>
            <ul className="space-y-3 text-sm text-text-dim">
              <li>Kigali, Rwanda</li>
              <li>hello@codeclub.rw</li>
              <li>+250 788 000 000</li>
              <li className="flex flex-wrap gap-3 pt-2">
                {socials.map((social) => (
                  <a key={social.label} href={social.href} target="_blank" rel="noreferrer" className="hover:text-accent">
                    {social.label}
                  </a>
                ))}
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-ink-border">
          <div className="section-shell flex flex-col items-center justify-between gap-3 py-5 text-sm text-text-dim md:flex-row">
            <span>© {new Date().getFullYear()} Code Club Rwanda. All rights reserved.</span>
            <span>Built by members, for the community.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
