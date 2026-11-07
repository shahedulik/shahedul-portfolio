import { Menu, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { PROFILE } from '../data/portfolioData';

const NAV = [
  { to: '/telemetry', label: '01 · Telemetry' },
  { to: '/career', label: '02 · Career' },
  { to: '/credentials', label: '03 · Cred' },
  { to: '/ats', label: '04 · ATS' },
];

export default function AppHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  // Preserves tab labels, menu toggle, mailto CTA, CV download, and the availability line.
  const light = ['/', '/career', '/credentials', '/ats'].includes(useLocation().pathname);

  useEffect(() => {
    if (!menuOpen) return;
    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node;
      if (navRef.current?.contains(target) || toggleRef.current?.contains(target)) return;
      setMenuOpen(false);
    };
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [menuOpen]);

  return (
    <header data-testid="app-header" className={light ? 'site-header' : 'sticky top-0 z-40 border-b border-line/70 bg-ink-900/85 backdrop-blur'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-baseline gap-3 flex-wrap">
            <span className={light ? 'site-brand text-xl font-bold tracking-wide' : 'font-serif text-xl font-bold tracking-wide text-white'}>{PROFILE.name}</span>
            <span className={light ? 'site-kicker px-2 py-0.5 rounded-sm' : 'font-mono text-[11px] text-data border border-data/40 bg-data/10 px-2 py-0.5 rounded-sm'}>
              {PROFILE.headline}
            </span>
          </div>
          <button
            ref={toggleRef}
            type="button"
            data-testid="nav-menu-toggle"
            className="nav-menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="primary-nav"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            Menu
          </button>
        </div>
        <div className="flex flex-col gap-1.5 lg:items-end">
          <div className="flex flex-wrap items-center gap-2">
            <nav
              ref={navRef}
              id="primary-nav"
              className={`nav-tabs flex gap-1 overflow-x-auto pb-1 lg:pb-0 max-[720px]:w-full ${menuOpen ? 'open' : ''}`}
              aria-label="Primary"
            >
              {NAV.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setMenuOpen(false)}
                  data-testid={`nav-link-${item.to.slice(1)}`}
                  className={({ isActive }) =>
                    light
                      ? `nav-link-light whitespace-nowrap px-3 py-1.5 rounded-sm transition-colors${isActive ? ' is-active' : ''}`
                      : `whitespace-nowrap px-3 py-1.5 font-mono text-xs rounded-sm transition-colors ${
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
            <div className="flex items-center gap-2">
              <a data-testid="header-cta" className={light ? 'header-cta btn-primary' : 'header-cta'} href={`mailto:${PROFILE.email}`}>
                Book a 20-min call
              </a>
              <a
                data-testid="download-cv"
                href="/SHAH-CV.pdf"
                download
                className={light ? 'btn-ghost header-cv whitespace-nowrap transition-colors' : 'whitespace-nowrap font-mono text-xs text-data underline-offset-4 hover:text-white hover:underline transition-colors'}
              >
                Download CV
              </a>
            </div>
          </div>
          <div data-testid="availability" className={light ? 'site-avail' : 'font-mono text-[10px] text-mut'}>
            Available UTC+6 · Overlaps US EST 7pm–11pm weekdays
          </div>
        </div>
      </div>
    </header>
  );
}
