import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import CategoryPage from './pages/CategoryPage';
import Story from './pages/Story';
import BulkOrder from './pages/BulkOrder';
import Contact from './pages/Contact';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hospitality" element={<CategoryPage category="Hospitality" />} />
          <Route path="/healthcare" element={<CategoryPage category="Healthcare" />} />
          <Route path="/corporate" element={<CategoryPage category="Corporate" />} />
          <Route path="/story" element={<Story />} />
          <Route path="/bulk-order" element={<BulkOrder />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;