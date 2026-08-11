import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { HiMenuAlt3, HiX, HiPhone } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Contact', to: '/contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const navBg = scrolled ? 'bg-white shadow-lg shadow-gray-900/5' : 'bg-white shadow-sm';

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}>
      {/* Top bar */}
      <div className="hidden md:flex items-center justify-end gap-6 px-8 py-1.5 text-xs font-medium bg-gray-50 text-gray-500 border-b border-gray-100">
        <a href="tel:18665923118" className="flex items-center gap-1.5 hover:text-primary-600 transition-colors">
          <HiPhone className="w-3.5 h-3.5" />
          1-866-592-3118
        </a>
        <a href="mailto:info@lovingsourcelogistics.com" className="hover:text-primary-600 transition-colors">
          info@lovingsourcelogistics.com
        </a>
      </div>

      <div className="flex items-center justify-between px-6 md:px-10 py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img src="/logo.png" alt="Loving Source Logistics" className="h-10 w-auto object-contain" />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-primary-50 text-primary-600'
                    : 'text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <Link to="/request-quote" className="btn-primary text-sm py-2.5">
            Request a Quote
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden p-2 rounded-lg transition-colors text-gray-900 hover:bg-gray-100"
        >
          {open ? <HiX className="w-6 h-6" /> : <HiMenuAlt3 className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-100 shadow-xl"
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {navLinks.map(link => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-xl text-sm font-medium transition-colors ${isActive ? 'bg-primary-50 text-primary-600' : 'text-navy-900 hover:bg-gray-50'}`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <div className="pt-3 border-t border-gray-100 mt-2">
                <Link to="/request-quote" className="btn-primary w-full justify-center text-sm">
                  Request a Quote
                </Link>
              </div>
              <div className="flex flex-col gap-2 pt-3 text-sm text-gray-500">
                <a href="tel:18665923118" className="flex items-center gap-2"><HiPhone className="w-4 h-4 text-primary-500" />1-866-592-3118</a>
                <a href="mailto:info@lovingsourcelogistics.com" className="text-xs">info@lovingsourcelogistics.com</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
