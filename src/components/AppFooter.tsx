import { PROFILE } from '../data/portfolioData';

export default function AppFooter() {
  return (
    <footer className="border-t border-line/70 bg-ink-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between font-mono text-[11px] text-mut">
        <span>© 2026 {PROFILE.name} · Edge-rendered on Netlify · React 18 + TypeScript + Vite</span>
        <div className="flex items-center gap-4 flex-wrap">
  <span>Typography: Times New Roman serif spec · {PROFILE.email} · {PROFILE.phone}</span>
  <a href="https://thinking-portfolio.netlify.app" target="_blank" rel="noopener" className="text-data hover:text-white border-b border-data/40 transition-colors">
    [ VIEW LATENT SPACE / REASONING ENGINE ]
  </a>
</div>
      </div>
    </footer>
  );
}
