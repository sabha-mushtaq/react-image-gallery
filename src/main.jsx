import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from './App'; // Main layout with Navbar
import Home from './pages/home';
import Gallery from './pages/Gallery';
import ImageDetail from './pages/ImageDetails';
import About from'./pages/About';
import Contact from'./pages/Contact';
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="gallery/:id" element={<ImageDetail />} />
        <Route path="contact" element={<Contact />} />
        <Route path="about" element={<About />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

