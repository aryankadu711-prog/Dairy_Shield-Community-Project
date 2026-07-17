import React, { useState, useEffect, useContext } from 'react';
import { AppProvider, AppContext } from './context/AppContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Mission from './components/Mission';
import WhySafety from './components/WhySafety';
import AnimalWelfare from './components/AnimalWelfare';
import Adulteration from './components/Adulteration';
import HomeTests from './components/HomeTests';
import MythsFacts from './components/MythsFacts';
import Gallery from './components/Gallery';
import Impact from './components/Impact';
import SurveySection from './components/SurveySection';
import Dashboard from './components/Dashboard';
import Learn from './components/Learn';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import { ShieldCheck, ArrowUp, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MainLayout = () => {
  const [loading, setLoading] = useState(true);
  const [adminOpen, setAdminOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  
  // Floating Cow States
  const [showCowBubble, setShowCowBubble] = useState(false);
  const [cowBubbleText, setCowBubbleText] = useState("Moo! Did you check your milk's expiry date today?");
  
  const cowQuotes = [
    "Moo! Ethical milking makes pure, healthy milk!",
    "Moo! Never store milk on the warm fridge door shelves.",
    "Moo! Boiling kills bacteria, but won't remove chemicals.",
    "Moo! Submerge paneer in fresh cold water to keep it soft.",
    "Moo! Have you tested your loose milk for water dilution?",
    "Moo! Happy cows make higher butterfat milk!",
    "Moo! Detergent is for washing, not drinking. Spread the word!"
  ];

  useEffect(() => {
    // Simulate loading screen
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1800);

    const handleScroll = () => {
      // Back to top trigger
      setShowScrollTop(window.scrollY > 300);

      // Scroll progress indicator
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    
    // Rotate cow quotes every 8 seconds
    const cowInterval = setInterval(() => {
      const randomQuote = cowQuotes[Math.floor(Math.random() * cowQuotes.length)];
      setCowBubbleText(randomQuote);
      setShowCowBubble(true);
      setTimeout(() => setShowCowBubble(false), 5000);
    }, 15000);

    // Initial cow wake-up bubble
    setTimeout(() => {
      setShowCowBubble(true);
      setTimeout(() => setShowCowBubble(false), 5000);
    }, 4000);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
      clearInterval(cowInterval);
    };
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Loading Screen */}
      <AnimatePresence>
        {loading && (
          <motion.div 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-dairy-cream dark:bg-dairy-dark flex flex-col items-center justify-center"
          >
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-dairy-green-700 to-dairy-blue-600 flex items-center justify-center text-white shadow-xl animate-bounce mb-6">
                <ShieldCheck className="w-10 h-10" />
              </div>
              <h2 className="font-display font-black text-2xl text-slate-800 dark:text-white mb-2">
                DairyShield
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm tracking-widest font-semibold uppercase animate-pulse">
                Loading safety protocols...
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Page Elements */}
      {!loading && (
        <div className="min-h-screen relative flex flex-col">
          
          {/* Top Scroll Progress bar */}
          <div 
            className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-dairy-green-500 via-dairy-green-400 to-dairy-blue-500 z-[60] transition-all"
            style={{ width: `${scrollProgress}%` }}
          />

          {/* Nav Header */}
          <Navbar onOpenAdmin={() => setAdminOpen(true)} />

          {/* Section stack */}
          <main className="flex-grow">
            <Hero />
            <Mission />
            <WhySafety />
            <AnimalWelfare />
            <Adulteration />
            <HomeTests />
            <MythsFacts />
            <Gallery />
            <Impact />
            <SurveySection />
            <Dashboard />
            <Learn />
            <FAQ />
            <Contact />
          </main>

          {/* Footer */}
          <Footer />

          {/* Admin panel overlay control */}
          <AdminPanel isOpen={adminOpen} onClose={() => setAdminOpen(false)} />

          {/* Back to Top Trigger Button */}
          <AnimatePresence>
            {showScrollTop && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={handleScrollToTop}
                className="fixed bottom-6 right-6 z-40 p-3.5 bg-dairy-green-700 hover:bg-dairy-green-600 text-white rounded-2xl shadow-lg border border-white/10 flex items-center justify-center cursor-pointer transition-colors"
                aria-label="Back to top"
              >
                <ArrowUp className="w-5 h-5" />
              </motion.button>
            )}
          </AnimatePresence>

          {/* Floating Cow Mascot Illustration */}
          <div className="fixed bottom-24 right-6 z-40 flex items-end space-x-2 pointer-events-none">
            {/* Bubble */}
            <AnimatePresence>
              {showCowBubble && (
                <motion.div
                  initial={{ opacity: 0, x: 20, scale: 0.85 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 20, scale: 0.85 }}
                  className="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-white/5 rounded-2xl py-3 px-4 shadow-lg text-slate-800 dark:text-slate-200 text-xs font-bold max-w-[180px] leading-relaxed relative pointer-events-auto"
                >
                  {cowBubbleText}
                  <button 
                    onClick={() => setShowCowBubble(false)}
                    className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-slate-100 dark:bg-slate-800 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 text-[10px] flex items-center justify-center cursor-pointer"
                  >
                    ✕
                  </button>
                  {/* Speech bubble arrow */}
                  <div className="absolute right-3 -bottom-1.5 w-3 h-3 bg-white dark:bg-slate-900 border-r border-b border-slate-200/50 dark:border-white/5 rotate-45" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* SVG Cow Icon Wrapper */}
            <div 
              onClick={() => {
                const randomQuote = cowQuotes[Math.floor(Math.random() * cowQuotes.length)];
                setCowBubbleText(randomQuote);
                setShowCowBubble(true);
              }}
              className="w-14 h-14 rounded-full bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-white/5 shadow-lg flex items-center justify-center cursor-pointer pointer-events-auto animate-float hover:scale-105 transition-transform"
              title="Click me for safety tips!"
            >
              {/* Custom SVG Drawing of a Happy Cow Head */}
              <svg viewBox="0 0 100 100" className="w-10 h-10 select-none">
                {/* Ears */}
                <ellipse cx="20" cy="40" rx="14" ry="7" fill="#cbd5e1" transform="rotate(-30 20 40)" />
                <ellipse cx="20" cy="40" rx="10" ry="4" fill="#fda4af" transform="rotate(-30 20 40)" />
                <ellipse cx="80" cy="40" rx="14" ry="7" fill="#cbd5e1" transform="rotate(30 80 40)" />
                <ellipse cx="80" cy="40" rx="10" ry="4" fill="#fda4af" transform="rotate(30 80 40)" />
                {/* Horns */}
                <path d="M 33,30 C 30,15 42,20 40,25" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" fill="none" />
                <path d="M 67,30 C 70,15 58,20 60,25" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" fill="none" />
                {/* Head Body */}
                <ellipse cx="50" cy="48" rx="26" ry="24" fill="#e2e8f0" />
                {/* Black spot */}
                <path d="M 38,30 C 45,30 45,45 35,42 C 28,40 30,30 38,30 Z" fill="#334155" />
                {/* Eyes */}
                <circle cx="38" cy="44" r="3.5" fill="#0f172a" />
                <circle cx="62" cy="44" r="3.5" fill="#0f172a" />
                <circle cx="39.5" cy="42.5" r="1" fill="#ffffff" />
                <circle cx="63.5" cy="42.5" r="1" fill="#ffffff" />
                {/* Muzzle */}
                <ellipse cx="50" cy="62" rx="22" ry="13" fill="#fda4af" />
                {/* Nostrils */}
                <circle cx="43" cy="61" r="2.5" fill="#f43f5e" />
                <circle cx="57" cy="61" r="2.5" fill="#f43f5e" />
                {/* Smile */}
                <path d="M 45,67 Q 50,71 55,67" stroke="#e11d48" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              </svg>
            </div>
          </div>

        </div>
      )}
    </>
  );
};

const App = () => {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
};

export default App;
