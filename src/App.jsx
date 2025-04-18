import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Nav from './components/nav.jsx';
import Footer from './components/footer.jsx';
import './App.css';

export default function App() {
  const TOTAL_IMAGES = 132;
  const LIMIT = 20;

  const [offset, _setOffset] = useState(0);

  return (
    <div className="app-wrapper">
      <Nav />

      {/* This pushes footer to bottom */}
      <main className="main-content" style={{ padding: '1rem' }}>
        <Outlet context={{ offset, limit: LIMIT }} />
      </main>

      <Footer />
    </div>
  );
}
