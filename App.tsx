import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
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

export const App: React.FC = () => {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/products" element={<Products />} />
          <Route path="/scent-profiles" element={<ScentProfiles />} />
          <Route path="/about" element={<About />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/science" element={<Science />} />
          <Route path="/machine" element={<Machine />} />
          <Route path="/future" element={<Future />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};