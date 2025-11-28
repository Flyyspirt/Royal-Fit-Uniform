import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail, MapPin, Instagram, Facebook, Linkedin } from 'lucide-react';
import { NAV_LINKS } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Skip to Content Link */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-royal-gold focus:text-royal-navy focus:font-bold focus:rounded-md"
      >
        Skip to main content
      </a>

      {/* Top Bar */}
      <div className="bg-royal-navy text-white py-2 px-4 text-xs md:text-sm hidden sm:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex gap-4">
            <span className="flex items-center gap-2">
              <Phone size={14} className="text-royal-gold" aria-hidden="true" /> 
              <a href="tel:+919346549694" className="hover:text-royal-gold focus:outline-none focus:underline">+91 93465 49694</a>
            </span>
            <span className="flex items-center gap-2">
              <Mail size={14} className="text-royal-gold" aria-hidden="true" /> 
              <a href="mailto:royalfituniform@gmail.com" className="hover:text-royal-gold focus:outline-none focus:underline">royalfituniform@gmail.com</a>
            </span>
          </div>
          <div className="flex gap-3">
             <a href="#" className="hover:text-royal-gold transition focus:outline-none focus:ring-1 focus:ring-royal-gold rounded" aria-label="Instagram"><Instagram size={14} /></a>
             <a href="#" className="hover:text-royal-gold transition focus:outline-none focus:ring-1 focus:ring-royal-gold rounded" aria-label="Facebook"><Facebook size={14} /></a>
             <a href="#" className="hover:text-royal-gold transition focus:outline-none focus:ring-1 focus:ring-royal-gold rounded" aria-label="LinkedIn"><Linkedin size={14} /></a>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-2xl md:text-3xl font-serif font-bold text-royal-navy flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-royal-gold rounded p-1">
                 <span className="text-royal-gold text-4xl" aria-hidden="true">♔</span> Royal Fit
              </Link>
            </div>

            {/* Desktop Menu */}
            <nav className="hidden md:flex space-x-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm uppercase tracking-wide font-medium transition-colors hover:text-royal-gold focus:outline-none focus:ring-2 focus:ring-royal-gold rounded px-1 ${
                    location.pathname === link.path ? 'text-royal-gold border-b-2 border-royal-gold' : 'text-royal-navy'
                  }`}
                  aria-current={location.pathname === link.path ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={toggleMenu}
                className="text-royal-navy hover:text-royal-gold focus:outline-none focus:ring-2 focus:ring-royal-gold rounded p-1"
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
              >
                {isMenuOpen ? <X size={28} aria-hidden="true" /> : <Menu size={28} aria-hidden="true" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div id="mobile-menu" className="md:hidden bg-royal-navy absolute w-full left-0 shadow-xl border-t border-gray-700">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-3 py-4 rounded-md text-base font-medium text-center focus:outline-none focus:ring-2 focus:ring-royal-gold ${
                    location.pathname === link.path ? 'bg-royal-gold text-royal-navy' : 'text-white hover:bg-gray-800'
                  }`}
                  aria-current={location.pathname === link.path ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main id="main-content" className="flex-grow focus:outline-none" tabIndex={-1}>
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-royal-navy text-white pt-12 pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-serif font-bold text-royal-gold mb-4">Royal Fit Uniform</h3>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              Second-generation B2B experts delivering ready-made and custom solutions for hospitality, healthcare, and corporate clients. Engineering confidence in every stitch.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4 border-b border-gray-700 pb-2 inline-block">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/hospitality" className="hover:text-royal-gold transition focus:outline-none focus:underline">Hospitality Uniforms</Link></li>
              <li><Link to="/healthcare" className="hover:text-royal-gold transition focus:outline-none focus:underline">Healthcare Uniforms</Link></li>
              <li><Link to="/corporate" className="hover:text-royal-gold transition focus:outline-none focus:underline">Corporate Uniforms</Link></li>
              <li><Link to="/bulk-order" className="hover:text-royal-gold transition focus:outline-none focus:underline">Request Bulk Quote</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4 border-b border-gray-700 pb-2 inline-block">Contact Us</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-royal-gold flex-shrink-0 mt-1" aria-hidden="true" />
                <span>House No: 5-6-105/1, Road No 7,<br/>Vaidehi Nagar, Vanasthalipuram,<br/>Hyderabad, Telangana 500070</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-royal-gold flex-shrink-0" aria-hidden="true" />
                <a href="tel:+919346549694" className="hover:text-royal-gold focus:outline-none focus:underline">+91 93465 49694</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-royal-gold flex-shrink-0" aria-hidden="true" />
                <a href="mailto:royalfituniform@gmail.com" className="hover:text-royal-gold focus:outline-none focus:underline">royalfituniform@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-6 text-center text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Royal Fit Uniform. All rights reserved. | GSTIN: 36CFAPC9753D1ZM</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;