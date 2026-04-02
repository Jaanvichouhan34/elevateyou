import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Sun, Moon, Menu, X, Rocket, User, LogOut } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/login');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Scanner', path: '/outfit-scanner' },
    { name: 'Prep', path: '/event-prep' },
    { name: 'Trainer', path: '/trainer' },
    { name: 'Testimonials', path: '/#testimonials' },
    { name: 'Dashboard', path: '/dashboard' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 w-full glass border-b transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo with Floating Animation */}
          <Link to="/" className="flex items-center group">
            <motion.div 
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="text-indigo-600 dark:text-cyan-400 mr-2"
            >
              <Rocket size={28} className="group-hover:rotate-12 transition-transform duration-500" />
            </motion.div>
            <span className="text-2xl font-black tracking-tighter bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent group-hover:scale-105 transition-transform">
              ElevateU ✦
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-10 items-center">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path} 
                className={`text-sm font-bold tracking-tight transition-all duration-300 relative nav-underline ${
                  isActive(link.path) ? 'text-indigo-600 dark:text-cyan-400' : 'text-slate-500 hover:text-indigo-600 dark:hover:text-cyan-400'
                }`}
              >
                {link.name}
                {isActive(link.path) && (
                  <motion.div 
                    layoutId="activeDot"
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-indigo-600 dark:bg-cyan-400 rounded-full shadow-[0_0_8px_currentColor]"
                  />
                )}
              </Link>
            ))}
            
            <div className="h-6 w-[1px] bg-slate-200 dark:bg-slate-800 mx-2" />

            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800/50 hover:bg-slate-200 dark:hover:bg-slate-800 transition-all group"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isDarkMode ? 'dark' : 'light'}
                  initial={{ rotate: -90, scale: 0, opacity: 0 }}
                  animate={{ rotate: 0, scale: 1, opacity: 1 }}
                  exit={{ rotate: 90, scale: 0, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 10 }}
                >
                  {isDarkMode ? (
                    <Sun size={20} className="text-yellow-400 group-hover:rotate-45 transition-transform" />
                  ) : (
                    <Moon size={20} className="text-indigo-600 group-hover:-rotate-12 transition-transform" />
                  )}
                </motion.div>
              </AnimatePresence>
            </button>

            {token ? (
              <button 
                onClick={handleLogout}
                className="p-2.5 rounded-2xl bg-red-50 dark:bg-red-900/20 text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-sm"
                title="Logout"
              >
                <LogOut size={20} />
              </button>
            ) : (
              <Link to="/login" className="px-6 py-2.5 rounded-2xl bg-indigo-600 text-white font-black text-sm tracking-widest hover:bg-indigo-700 hover:scale-105 transition-all shadow-xl shadow-indigo-500/20 active:scale-95">
                Join Now
              </Link>
            )}
          </div>

          {/* Mobile hamburger */}
          <div className="md:hidden flex items-center space-x-4">
             <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800"
            >
               {isDarkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-indigo-600" />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-500 hover:text-indigo-600 dark:hover:text-cyan-400"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden glass overflow-hidden border-t"
          >
            <div className="px-4 pt-4 pb-8 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 rounded-2xl font-bold transition-all ${
                    isActive(link.path) ? 'bg-indigo-600 text-white shadow-lg' : 'hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              {!token && (
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 rounded-2xl font-black bg-indigo-600 text-white text-center shadow-lg shadow-indigo-500/20"
                >
                  Get Started
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
