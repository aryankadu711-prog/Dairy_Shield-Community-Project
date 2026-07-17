import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Menu, X, Sun, Moon, ShieldAlert, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ onOpenAdmin }) => {
  const { isAdmin } = useContext(AppContext);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(() => {
    return localStorage.getItem('dairyshield_dark') === 'true';
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (dark) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
    localStorage.setItem('dairyshield_dark', dark);
  }, [dark]);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Mission', href: '#mission' },
    { name: 'Dairy Safety', href: '#why-safety' },
    { name: 'Welfare', href: '#animal-welfare' },
    { name: 'Adulteration', href: '#adulteration' },
    { name: 'Home Tests', href: '#home-tests' },
    { name: 'Myths', href: '#myths' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Dashboard', href: '#dashboard' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setIsOpen(false);
    const target = document.querySelector(href);
    if (target) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = target.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      scrolled 
        ? 'glass-navbar dark:dark-glass-navbar py-3 shadow-md' 
        : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-12">
          {/* Logo */}
          <a href="#home" onClick={(e) => handleLinkClick(e, '#home')} className="flex items-center space-x-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-dairy-green-700 to-dairy-blue-600 flex items-center justify-center text-white shadow-md transform group-hover:scale-105 transition-all">
              <ShieldAlert className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-xl tracking-tight bg-gradient-to-r from-dairy-green-700 to-dairy-blue-700 dark:from-dairy-green-400 dark:to-dairy-blue-400 bg-clip-text text-transparent">
                DairyShield
              </span>
              <span className="text-[10px] tracking-wider uppercase font-semibold text-dairy-green-600 dark:text-dairy-green-400 -mt-1">
                Public Awareness
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center space-x-0.5">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="px-2 py-1.5 rounded-lg text-xs xl:text-sm font-semibold text-slate-600 hover:text-dairy-green-700 dark:text-slate-300 dark:hover:text-dairy-green-400 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Utility Buttons */}
          <div className="hidden lg:flex items-center space-x-2">
            {/* Dark Mode Switch */}
            <button
              onClick={() => setDark(!dark)}
              className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label="Toggle Dark Mode"
            >
              {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Circular Admin Settings Icon */}
            <button
              onClick={onOpenAdmin}
              className={`p-2 rounded-xl transition-colors cursor-pointer ${
                isAdmin 
                  ? 'bg-dairy-green-100 text-dairy-green-800 dark:bg-dairy-green-900/40 dark:text-dairy-green-300' 
                  : 'text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
              }`}
              aria-label="Admin Settings"
            >
              <Settings className={`w-5 h-5 ${isAdmin ? 'animate-spin-slow text-dairy-green-750' : ''}`} />
            </button>
          </div>

          {/* Mobile Menu Buttons */}
          <div className="flex lg:hidden items-center space-x-2">
            <button
              onClick={() => setDark(!dark)}
              className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle Dark Mode"
            >
              {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Direct Mobile Admin Trigger */}
            <button
              onClick={onOpenAdmin}
              className={`p-2 rounded-xl transition-colors ${
                isAdmin 
                  ? 'bg-dairy-green-100 text-dairy-green-800 dark:bg-dairy-green-900/40 dark:text-dairy-green-300' 
                  : 'text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
              }`}
              aria-label="Admin Settings"
            >
              <Settings className="w-5 h-5 animate-spin-slow" />
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden absolute top-full left-0 w-full glass-navbar dark:dark-glass-navbar shadow-lg py-4 px-6 border-b border-slate-200/50 dark:border-slate-800/50"
          >
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="py-2.5 px-3 rounded-lg text-base font-semibold text-slate-700 hover:bg-dairy-green-50 hover:text-dairy-green-800 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-dairy-green-400 transition-all"
                >
                  {link.name}
                </a>
              ))}
              <div className="h-px bg-slate-200 dark:bg-slate-800 my-2" />
              <button
                onClick={() => {
                  setIsOpen(false);
                  onOpenAdmin();
                }}
                className={`flex items-center justify-center space-x-2 w-full py-3 rounded-xl font-bold transition-all ${
                  isAdmin 
                    ? 'bg-dairy-green-600 text-white shadow-md' 
                    : 'bg-slate-200 text-slate-800 dark:bg-slate-800 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-700'
                }`}
              >
                <Settings className="w-4 h-4" />
                <span>{isAdmin ? 'Access Admin Console' : 'Administrator Login'}</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
