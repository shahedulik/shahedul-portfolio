// src/components/Gate.tsx
import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { PROFILE } from '../data/portfolioData';
import {
  EXIT_MS,
  WATER_EASE,
  PULL_MAX_Y,
  TILT_MAX_DEG,
  PULL_LERP,
  prefersReducedMotion,
  subscribeReducedMotion,
  createPointerPull,
  spawnRipple,
} from './gateMotion';
const NAME = PROFILE?.name ?? 'Shahedul Islam Khan';
const ROLE = 'Business Intelligence Analyst';
const BIO = [
  'I build and ship data systems.',
  'Raw signal, turned into decisions a business can act on.',
];
const CHIP_LABEL = 'See the details';
export default function Gate({ onEnter }: { onEnter: () => void }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const chipRef = useRef<HTMLButtonElement>(null);
  const [exiting, setExiting] = useState(false);
  const [reduced, setReduced] = useState(prefersReducedMotion());
  useEffect(() => subscribeReducedMotion(setReduced), []);
  useEffect(() => {
    if (reduced || !railRef.current) return;
    const pull = createPointerPull(railRef.current, {
      maxY: PULL_MAX_Y,
      tiltDeg: TILT_MAX_DEG,
      lerp: PULL_LERP,
    });
    return () => pull.stop();
  }, [reduced]);
  const handleEnter = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (exiting) return;
      const chip = chipRef.current;
      if (chip) {
        const r = chip.getBoundingClientRect();
        spawnRipple(chip, e.clientX || r.left + r.width / 2, e.clientY || r.top + r.height / 2);
      }
      setExiting(true);
      sessionStorage.setItem('gate-seen', '1');
      const finish = () => onEnter();
      if (reduced) {
        finish();
        return;
      }
      rootRef.current?.addEventListener('transitionend', finish, { once: true });
      window.setTimeout(finish, EXIT_MS + 120);
    },
    [exiting, onEnter, reduced]
  );
  const rise = (i: number) =>
    reduced
      ? { initial: { opacity: 1 }, animate: { opacity: 1 } }
      : {
          initial: { opacity: 0, y: 14 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, ease: WATER_EASE, delay: i * 0.09 },
        };
  return (
    <div
      ref={rootRef}
      className={`gate-veil-root gate-perspective fixed inset-0 z-50 pointer-events-none${
        exiting ? ' is-exiting' : ''
      }`}
    >
      <div className="flex h-full w-full items-center pointer-events-none">
        <div className="mx-auto w-full max-w-[34rem] px-[clamp(20px,7vw,110px)]">
          <div ref={railRef} className="gate-rail space-y-7">
            <motion.h1 {...rise(0)} className="font-serif font-light leading-none tracking-tight text-cream/90 text-[clamp(1.25rem,2.2vw,1.9rem)]">
              {NAME}
            </motion.h1>
            <motion.p {...rise(1)} className="font-mono text-[10px] uppercase tracking-[0.3em] text-mut">
              {ROLE}
            </motion.p>
            <motion.div {...rise(2)} className="space-y-1">
              {BIO.map((line) => (
                <p key={line} className="font-serif text-base leading-relaxed text-cream/70">
                  {line}
                </p>
              ))}
            </motion.div>
            <motion.div {...rise(3)} className="pt-3">
              <button
                ref={chipRef}
                type="button"
                onClick={handleEnter}
                aria-label={CHIP_LABEL}
                className="gate-chip group pointer-events-auto relative inline-flex cursor-pointer items-center gap-3 overflow-hidden rounded-full border border-line/40 bg-ink-800/40 px-5 py-3 font-mono text-[11px] uppercase tracking-[0.18em] text-cream backdrop-blur-[6px] transition-[border-color,transform] duration-[180ms] ease-[cubic-bezier(.2,.7,.2,1)] hover:border-data/70 active:scale-[0.97] active:duration-[120ms] focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-data"
              >
                <span className="gate-chip-halo pointer-events-none absolute inset-0" />
                <span className="relative h-[6px] w-[6px] shrink-0 rounded-full bg-mut transition-colors group-hover:bg-data" />
                <span className="relative">{CHIP_LABEL}</span>
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
