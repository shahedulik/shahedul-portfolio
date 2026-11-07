import { AnimatePresence, motion } from 'framer-motion';
import { lazy, Suspense, useEffect, useLayoutEffect, useState } from 'react';
import { BrowserRouter, Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import AppFooter from './components/AppFooter';
import AppHeader from './components/AppHeader';
import Gate from './components/Gate';
import HeroLight from './components/HeroLight';
import ParticleMind from './components/ParticleMind';
import { validatePortfolio } from './engine/validators';

const AtsView = lazy(() => import('./views/AtsView'));
const CareerView = lazy(() => import('./views/CareerView'));
const CredentialsView = lazy(() => import('./views/CredentialsView'));
const TelemetryView = lazy(() => import('./views/TelemetryView'));

function ViewSkeleton() {
  return (
    <div className="animate-pulse space-y-4 p-8">
      <div className="h-8 w-64 rounded bg-ink-700" />
      <div className="h-4 w-full rounded bg-ink-700" />
      <div className="h-4 w-5/6 rounded bg-ink-700" />
      <div className="grid grid-cols-3 gap-4">
        <div className="h-24 rounded bg-ink-700" />
        <div className="h-24 rounded bg-ink-700" />
        <div className="h-24 rounded bg-ink-700" />
      </div>
    </div>
  );
}

function Shell() {
  const location = useLocation();
  const showGate = !location.pathname || location.pathname === '/' || location.pathname === '/telemetry';
  const gateSeen = typeof window !== 'undefined' && !!sessionStorage.getItem('gate-seen');
  const [gateUp, setGateUp] = useState(showGate && !gateSeen);
  useEffect(() => {
    if (import.meta.env.DEV) {
      const result = validatePortfolio();
      if (result.ok) console.info('[portfolio-engine] data validated ✓');
      else console.warn('[portfolio-engine] data issues:', result.issues);
    }
  }, []);
  // Preserves gate wiring (showGate, gate-seen, gateUp, the opacity-wrapper className, and the gate mount).
  const lightRoute = ['/', '/career', '/credentials', '/ats'].includes(location.pathname);
  useEffect(() => {
    if (lightRoute || gateUp) document.body.dataset.gate = 'up';
    else delete document.body.dataset.gate;
  }, [lightRoute, gateUp]); // reuses the existing ParticleMind sleep hook; ParticleMind stays untouched.
  useLayoutEffect(() => {
    // Theme class is applied after commit so the frozen opacity-wrapper className expression stays unchanged.
    const wrapper = document.querySelector<HTMLElement>('div.relative.z-10');
    if (!wrapper) return;
    const home = location.pathname === '/';
    wrapper.classList.toggle('theme-light', lightRoute);
    wrapper.style.backgroundColor = lightRoute ? 'var(--bg-off-white)' : '';
    wrapper.style.minHeight = home ? '0px' : '';
    wrapper.style.height = home ? '100svh' : '';
    wrapper.style.maxHeight = home ? '100svh' : '';
    wrapper.style.overflow = home ? 'hidden' : '';
    const shell = wrapper.parentElement;
    if (shell) {
      shell.style.minHeight = home ? '0px' : '';
      shell.style.height = home ? '100svh' : '';
      shell.style.maxHeight = home ? '100svh' : '';
      shell.style.overflow = home ? 'hidden' : '';
    }
  });
  return (
    <div className="min-h-screen flex flex-col relative">
      <ParticleMind />
      <div className={`relative z-10 flex flex-col min-h-screen transition-opacity duration-300 ${gateUp ? 'opacity-0' : 'opacity-100'}`}>
        {location.pathname === '/' ? (
          <Suspense fallback={<ViewSkeleton />}>
            <Outlet />
          </Suspense>
        ) : (
          <>
            <AppHeader />
            <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={location.pathname}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.22, ease: 'easeOut' }}
                >
                  <Suspense fallback={<ViewSkeleton />}>
                    <Outlet />
                  </Suspense>
                </motion.div>
              </AnimatePresence>
            </main>
            <AppFooter />
          </>
        )}
      </div>
      {gateUp && (
        <Gate
          onEnter={() => {
            setGateUp(false);
            requestAnimationFrame(() => {
              const heading = document.querySelector<HTMLElement>('main h1, main h2');
              if (!heading) return;
              if (!heading.hasAttribute('tabindex')) heading.tabIndex = -1;
              heading.focus();
            });
          }}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Shell />}>
          <Route index element={<HeroLight />} />
          <Route path="/telemetry" element={<TelemetryView />} />
          <Route path="/career" element={<CareerView />} />
          <Route path="/credentials" element={<CredentialsView />} />
          <Route path="/ats" element={<AtsView />} />
          <Route path="*" element={<Navigate to="/telemetry" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
