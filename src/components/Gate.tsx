import { useRef, useEffect, useState, useCallback } from 'react';
import { PROFILE, EXPERIENCE, VENTURES } from '../data/portfolioData';
interface GateProps {
  onEnter: () => void;
}
export default function Gate({ onEnter }: GateProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [exiting, setExiting] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  useEffect(() => {
    if (reduceMotion || !containerRef.current) return;
    const planes = containerRef.current.querySelectorAll<HTMLElement>('.gate-plane');
    let targetX = 0, targetY = 0;
    let currentX = 0, currentY = 0;
    let rafId = 0;
    const onMove = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      targetX = nx * 3.5;
      targetY = ny * -3.5;
    };
    const onLeave = () => { targetX = 0; targetY = 0; };
    const loop = () => {
      currentX += (targetX - currentX) * 0.07;
      currentY += (targetY - currentY) * 0.07;
      planes.forEach((plane) => {
        const rank = parseFloat(plane.dataset.rank || '1');
        const tz = rank * 38;
        plane.style.transform = `translateZ(${tz}px) rotateY(${currentX}deg) rotateX(${currentY}deg)`;
      });
      rafId = requestAnimationFrame(loop);
    };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerleave', onLeave);
    rafId = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerleave', onLeave);
      cancelAnimationFrame(rafId);
      planes.forEach((plane) => { plane.style.transform = 'translateZ(0) rotateY(0) rotateX(0)'; });
    };
  }, [reduceMotion]);
  const handleEnter = useCallback(() => {
    if (exiting) return;
    setExiting(true);
    sessionStorage.setItem('gate-seen', '1');
    
    const duration = reduceMotion ? 0 : 300;
    setTimeout(() => {
      if (document.startViewTransition) {
        document.startViewTransition(() => { onEnter(); });
      } else {
        onEnter();
      }
    }, duration);
  }, [exiting, onEnter, reduceMotion]);
  const role = PROFILE.headline || 'Business Intelligence Analyst';
  const bio = PROFILE.summary || "I build and ship data systems that turn raw signal into decisions a business can act on. The work sits where machine learning, pipelines, and procurement meet the people who own the outcome.";
  
  const highlights = [
    ...(EXPERIENCE.slice(0, 2) || []).map(e => ({
      title: e.company,
      proof: e.bullets?.[0] || e.role,
      tags: e.tags?.join(' · ') || ''
    })),
    ...(VENTURES.slice(0, 1) || []).map(v => ({
      title: v.name,
      proof: v.mission || v.highlights?.[0] || '',
      tags: v.highlights?.join(' · ') || ''
    }))
  ].slice(0, 3);
  const nameFontSize = typeof window !== 'undefined' && window.innerWidth > 768 ? 'text-7xl' : 'text-5xl';
  return (
    <div 
      ref={containerRef}
      className={`gate-veil-root fixed inset-0 z-50 pointer-events-none gate-perspective transition-opacity ${exiting ? 'opacity-0 duration-300' : 'opacity-100'}`}
      style={reduceMotion ? { perspective: 'none' } : {}}
    >
      <div className="h-full w-full flex items-center pointer-events-none">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 w-full">
          <div className="max-w-2xl space-y-8">
            
            <div className="gate-plane" data-rank="0.8">
              <h1 
                className={`font-serif font-light leading-[0.95] tracking-tight text-cream ${nameFontSize}`}
                style={{ fontVariationSettings: "'opsz' 144, 'wght' 350" }}
              >
                {PROFILE.name}
              </h1>
            </div>
            <div className="gate-plane" data-rank="0.6">
              <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-data">
                {role}
              </p>
            </div>
            <div className="gate-plane" data-rank="0.4">
              <p className="font-serif text-xl text-cream/80 leading-relaxed max-w-[46ch]">
                {bio}
              </p>
            </div>
            <div className="gate-plane" data-rank="0.2">
              <ul className="gate-thread space-y-6">
                {highlights.map((item, i) => (
                  <li key={i} className="relative pl-8">
                    <span className="gate-node absolute left-0 top-[7px]" />
                    <h3 className="font-serif text-lg text-cream mb-1">{item.title}</h3>
                    <p className="font-serif text-sm text-mut leading-snug mb-2">{item.proof}</p>
                    {item.tags && (
                      <p className="font-mono text-[10px] tracking-wider text-gold uppercase">{item.tags}</p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <div className="gate-plane pt-4" data-rank="1.0">
              <button
                type="button"
                onClick={handleEnter}
                aria-label="Enter portfolio"
                className="gate-chip group relative inline-flex items-center justify-center px-6 py-3 bg-ink-800/40 backdrop-blur-[6px] border border-line/40 hover:border-data/70 active:scale-[0.97] transition-all duration-[180ms] ease-[cubic-bezier(.2,.7,.2,1)] active:duration-[120ms] focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-data pointer-events-auto cursor-pointer"
              >
                <span className="gate-chip-halo absolute inset-0 pointer-events-none" />
                <span className="w-[6px] h-[6px] rounded-full bg-mut group-hover:bg-data transition-colors" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
