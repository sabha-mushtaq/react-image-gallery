import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './nav.css';
import logo from '../assets/logo.svg';
import menubar from '../assets/menuicon.svg';
import line from '../assets/line.svg';
export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) setMenuOpen(false);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <nav>
        <img 
          src={logo} 
          alt="logo" 
          className="logo"
          style={isMobile ? { height: '30px' } : {}}
        />
        
        {/* Desktop Links - Centered */}
        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
          <Link to="/about" className="nav-link">About</Link>
        </div>
        
        {/* Mobile Menu Button - Right-aligned */}
        <img
          src={menubar}
          alt="menu"
          className="menu-icon"
          onClick={toggleMenu}
          style={menuOpen ? { transform: 'rotate(90deg)' } : {}}
        />
        
        {/* Mobile Menu Dropdown */}
        <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
          <Link to="/" className="nav-link" onClick={closeMenu}>Home</Link>
          <Link to="/contact" className="nav-link" onClick={closeMenu}>Contact</Link>
          <Link to="/about" className="nav-link" onClick={closeMenu}>About</Link>
        </div>
      </nav>
      <img src={line} alt="divider" className="nav-divider" />
    </>
  );
}