import { NavLink } from 'react-router-dom';
import { PROFILE } from '../data/portfolioData';

const NAV = [
  { to: '/telemetry', label: '01 · BI Telemetry' },
  { to: '/architecture', label: '02 · Solution Architecture' },
  { to: '/career', label: '03 · Career Matrix' },
  { to: '/ventures', label: '04 · Ventures & Research' },
  { to: '/credentials', label: '05 · Credentials' },
  { to: '/ats', label: '06 · ATS Resume' },
];

export default function AppHeader() {
  return (
    <header data-testid="app-header" className="sticky top-0 z-40 border-b border-line/70 bg-ink-900/85 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
        <div className="flex items-baseline gap-3 flex-wrap">
          <span className="font-serif text-xl font-bold tracking-wide text-white">{PROFILE.name}</span>
          <span className="font-mono text-[11px] text-data border border-data/40 bg-data/10 px-2 py-0.5 rounded-sm">
            {PROFILE.headline}
          </span>
        </div>
        <nav className="flex gap-1 overflow-x-auto pb-1 lg:pb-0" aria-label="Primary">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              data-testid={`nav-link-${item.to.slice(1)}`}
              className={({ isActive }) =>
                `whitespace-nowrap px-3 py-1.5 font-mono text-xs rounded-sm transition-colors ${
                  isActive
                    ? 'bg-data/15 text-data border border-data/40'
                    : 'text-mut hover:text-white border border-transparent'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}