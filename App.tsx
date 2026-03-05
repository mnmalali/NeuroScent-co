import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Layout } from './components/Layout';
import PageWrapper from './components/PageWrapper';
import { Landing } from './pages/Landing';
import { Products } from './pages/Products';
import { ScentProfiles } from './pages/ScentProfiles';
import { About } from './pages/About';
import { HowItWorks } from './pages/HowItWorks';
import { Science } from './pages/Science';
import { Machine } from './pages/Machine';
import { Future } from './pages/Future';
import { FAQ } from './pages/FAQ';
import { Admin } from './pages/Admin';

const AppRoutes: React.FC = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Landing /></PageWrapper>} />
        <Route path="/products" element={<PageWrapper><Products /></PageWrapper>} />
        <Route path="/scent-profiles" element={<PageWrapper><ScentProfiles /></PageWrapper>} />
        <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
        <Route path="/how-it-works" element={<PageWrapper><HowItWorks /></PageWrapper>} />
        <Route path="/science" element={<PageWrapper><Science /></PageWrapper>} />
        <Route path="/machine" element={<PageWrapper><Machine /></PageWrapper>} />
        <Route path="/future" element={<PageWrapper><Future /></PageWrapper>} />
        <Route path="/faq" element={<PageWrapper><FAQ /></PageWrapper>} />
        <Route path="/admin" element={<PageWrapper><Admin /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
};

export const App: React.FC = () => {
  return (
    <HashRouter>
      <Layout>
        <AppRoutes />
      </Layout>
    </HashRouter>
  );
};