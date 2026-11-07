import { useLocation } from 'react-router-dom';
import { PROFILE } from '../data/portfolioData';

export default function AppFooter() {
  // Preserves the copyright line and the email · phone line on every route.
  const light = ['/', '/career', '/credentials', '/ats'].includes(useLocation().pathname);
  return (
    <footer className={light ? 'site-footer' : 'border-t border-line/40 bg-ink-900/60 backdrop-blur-sm'}>
      <div className={light ? 'site-footer-copy max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between' : 'max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between font-mono text-[11px] text-mut'}>
        <span>© 2026 {PROFILE.name}</span>
        <span>{PROFILE.email} · {PROFILE.phone}</span>
      </div>
    </footer>
  );
}
