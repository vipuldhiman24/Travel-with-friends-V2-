import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Bus', path: '/bus' },
    { label: 'Flights', path: '/flights' },
    { label: 'Hotels', path: '/hotels' },
    { label: 'Trip Packages', path: '/trip-packages' },
    { label: 'Visa', path: '/visa' },
  ];

  const isActive = (path) => {
    const cur = location.pathname.toLowerCase().replace(/\.html$/, '').replace(/^\//, '');
    const target = path.toLowerCase().replace(/\.html$/, '').replace(/^\//, '');
    if ((cur === '' || cur === 'index') && (target === '' || target === 'index')) return true;
    return cur === target;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#f4ece7] dark:border-[#3a2d25] bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md px-4 py-3 sm:px-10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <span className="material-symbols-outlined text-primary text-3xl group-hover:scale-110 transition-transform">
            flight_takeoff
          </span>
          <img
            src="/assets/logo.png"
            alt="Fly With Friends Logo"
            className="h-14 w-auto object-contain group-hover:opacity-80 transition-opacity"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-semibold transition-colors ${
                isActive(link.path)
                  ? 'text-primary font-bold'
                  : 'text-text-main dark:text-text-main-dark hover:text-primary'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <div className="flex flex-col text-right text-xs leading-tight">
            <span className="text-[10px] uppercase font-bold text-text-muted dark:text-text-muted-dark tracking-wider">24/7 Helpline</span>
            <div className="flex items-center gap-2 mt-0.5">
              <a
                href="tel:+918851722264"
                className="flex items-center gap-1 font-bold text-text-main dark:text-text-main-dark hover:text-primary transition-colors text-xs whitespace-nowrap"
              >
                <span className="material-symbols-outlined text-primary text-sm">call</span>
                +91 88517 22264
              </a>
              <span className="text-gray-300 dark:text-gray-600">|</span>
              <a
                href="tel:+919354962122"
                className="flex items-center gap-1 font-bold text-text-main dark:text-text-main-dark hover:text-primary transition-colors text-xs whitespace-nowrap"
              >
                +91 93549 62122
              </a>
            </div>
          </div>
          <Link
            to="/contact"
            className="flex items-center justify-center h-10 px-5 rounded-xl bg-primary text-white text-sm font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 shrink-0"
          >
            Contact Us
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          aria-label="Toggle Navigation Menu"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg hover:bg-primary/10 transition text-text-main dark:text-text-main-dark"
        >
          <span className="material-symbols-outlined">
            {mobileMenuOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-6 py-4 border-t border-[#f4ece7] dark:border-[#3a2d25] bg-surface-light dark:bg-surface-dark mt-2 rounded-xl shadow-lg">
          <nav className="flex flex-col gap-3 font-semibold text-text-main dark:text-text-main-dark">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`py-2 px-3 rounded-lg transition-colors ${
                  isActive(link.path)
                    ? 'bg-primary/10 text-primary font-bold'
                    : 'hover:bg-primary/5 hover:text-primary'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg bg-primary text-white text-center font-bold mt-2"
            >
              Contact Us
            </Link>
            <div className="flex flex-col gap-2 pt-2 border-t border-gray-100 dark:border-gray-800">
              <span className="text-[11px] font-bold uppercase tracking-wider text-text-muted dark:text-text-muted-dark">24/7 Helpline</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <a
                  href="tel:+918851722264"
                  className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-primary text-white text-center font-bold text-xs shadow-sm"
                >
                  <span className="material-symbols-outlined text-sm">call</span>
                  <span>+91 88517 22264</span>
                </a>
                <a
                  href="tel:+919354962122"
                  className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg border border-primary/30 text-primary text-center font-bold text-xs"
                >
                  <span className="material-symbols-outlined text-sm">call</span>
                  <span>+91 93549 62122</span>
                </a>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
