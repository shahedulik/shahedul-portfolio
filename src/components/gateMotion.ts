// src/components/gateMotion.ts
export const EXIT_MS = 820;
export const RIPPLE_MS = 720;
export const PULL_MAX_Y = 26;
export const TILT_MAX_DEG = 1.5;
export const PULL_LERP = 0.06;
export const WATER_EASE: readonly [number, number, number, number] = [0.22, 0.61, 0.36, 1];
export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
export const subscribeReducedMotion = (cb: (v: boolean) => void) => {
  if (typeof window === 'undefined') return () => {};
  const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  const handler = (e: MediaQueryListEvent) => cb(e.matches);
  mq.addEventListener('change', handler);
  return () => mq.removeEventListener('change', handler);
};
export const createPointerPull = (el: HTMLElement, opts?: { maxY?: number; tiltDeg?: number; lerp?: number }) => {
  if (prefersReducedMotion()) return { stop: () => {} };
  const maxY = opts?.maxY ?? PULL_MAX_Y;
  const tiltDeg = opts?.tiltDeg ?? TILT_MAX_DEG;
  const lerp = opts?.lerp ?? PULL_LERP;
  let targetX = 0, targetY = 0, targetRotX = 0, targetRotY = 0;
  let currentX = 0, currentY = 0, currentRotX = 0, currentRotY = 0;
  let rafId = 0;
  let active = true;
  const onMove = (e: PointerEvent) => {
    const nx = (e.clientX / window.innerWidth) * 2 - 1;
    const ny = (e.clientY / window.innerHeight) * 2 - 1;
    targetY = ny * maxY;
    targetRotX = -ny * tiltDeg;
    targetRotY = nx * tiltDeg * 0.5;
  };
  const onLeave = () => { targetY = 0; targetRotX = 0; targetRotY = 0; };
  const loop = () => {
    if (!active) return;
    currentX += (targetX - currentX) * lerp;
    currentY += (targetY - currentY) * lerp;
    currentRotX += (targetRotX - currentRotX) * lerp;
    currentRotY += (targetRotY - currentRotY) * lerp;
    el.style.transform = `translateY(${currentY}px) rotateX(${currentRotX}deg) rotateY(${currentRotY}deg)`;
    rafId = requestAnimationFrame(loop);
  };
  window.addEventListener('pointermove', onMove);
  window.addEventListener('pointerleave', onLeave);
  rafId = requestAnimationFrame(loop);
  return {
    stop: () => {
      active = false;
      cancelAnimationFrame(rafId);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerleave', onLeave);
      el.style.transform = '';
    },
  };
};
export const spawnRipple = (host: HTMLElement, clientX: number, clientY: number) => {
  if (!host) return;
  const rect = host.getBoundingClientRect();
  const x = clientX - rect.left;
  const y = clientY - rect.top;
  const ripple = document.createElement('span');
  ripple.className = 'gate-ripple';
  ripple.style.setProperty('--rx', `${x}px`);
  ripple.style.setProperty('--ry', `${y}px`);
  host.appendChild(ripple);
  const remove = () => { if (ripple.parentNode) ripple.parentNode.removeChild(ripple); };
  ripple.addEventListener('animationend', remove, { once: true });
  setTimeout(remove, RIPPLE_MS + 50);
};
