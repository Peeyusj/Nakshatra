// src/App.tsx
import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import { PageLoader } from './components/ui/PageLoader';
import { CosmicWheel } from './components/visuals/CosmicWheel';
import { CustomCursor } from './components/ui/CustomCursor';

// Lazy load the pages - chunks will be split by Vite automatically
const Home = lazy(() => import('./pages/Home'));
const Generate = lazy(() => import('./pages/Generate'));
const Architecture = lazy(() => import('./pages/Architecture'));

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes key={location.pathname} location={location}>
        <Route 
          path="/" 
          element={
            <Suspense fallback={<PageLoader />}>
              <Home />
            </Suspense>
          } 
        />
        <Route 
          path="/generate" 
          element={
            <Suspense fallback={<PageLoader />}>
              <Generate />
            </Suspense>
          } 
        />
        <Route 
          path="/architecture" 
          element={
            <Suspense fallback={<PageLoader />}>
              <Architecture />
            </Suspense>
          } 
        />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <CustomCursor />
      <CosmicWheel />
      <AnimatedRoutes />
    </Router>
  );
}

export default App;