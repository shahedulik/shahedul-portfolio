import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import { BrowserRouter, Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import AppFooter from './components/AppFooter';
import AppHeader from './components/AppHeader';
import { validatePortfolio } from './engine/validators';
import ArchitectureView from './views/ArchitectureView';
import AtsView from './views/AtsView';
import CareerView from './views/CareerView';
import CredentialsView from './views/CredentialsView';
import TelemetryView from './views/TelemetryView';
import VenturesView from './views/VenturesView';

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
            <Outlet />
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