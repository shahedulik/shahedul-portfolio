import { AnimatePresence, motion } from 'framer-motion';
import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import AppFooter from './components/AppFooter';
import AppHeader from './components/AppHeader';
import { validatePortfolio } from './engine/validators';

const ArchitectureView = lazy(() => import('./views/ArchitectureView'));
const AtsView = lazy(() => import('./views/AtsView'));
const CareerView = lazy(() => import('./views/CareerView'));
const CredentialsView = lazy(() => import('./views/CredentialsView'));
const TelemetryView = lazy(() => import('./views/TelemetryView'));
const VenturesView = lazy(() => import('./views/VenturesView'));

function ViewSkeleton() {
  return (
    <div className="animate-pulse space-y-4 p-8">
      <div className="h-8 w-64 rounded bg-slate-700" />
      <div className="h-4 w-full rounded bg-slate-700" />
      <div className="h-4 w-5/6 rounded bg-slate-700" />
      <div className="grid grid-cols-3 gap-4">
        <div className="h-24 rounded bg-slate-700" />
        <div className="h-24 rounded bg-slate-700" />
        <div className="h-24 rounded bg-slate-700" />
      </div>
    </div>
  );
}

function Shell() {
  const location = useLocation();

  useEffect(() => {
    if (import.meta.env.DEV) {
      const result = validatePortfolio();
      if (result.ok) console.info('[portfolio-engine] data validated ✓');
      else console.warn('[portfolio-engine] data issues:', result.issues);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col grid-bg">
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
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Shell />}>
          <Route index element={<Navigate to="/telemetry" replace />} />
          <Route path="/telemetry" element={<TelemetryView />} />
          <Route path="/architecture" element={<ArchitectureView />} />
          <Route path="/career" element={<CareerView />} />
          <Route path="/ventures" element={<VenturesView />} />
          <Route path="/credentials" element={<CredentialsView />} />
          <Route path="/ats" element={<AtsView />} />
          <Route path="*" element={<Navigate to="/telemetry" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}