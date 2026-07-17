import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { Play, ClipboardList, BarChart3, ChevronDown, CheckCircle2 } from 'lucide-react';

const CountUp = ({ end, duration = 1.5, suffix = '' }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const endVal = parseInt(end);
    if (start === endVal) return;

    let totalMiliseconds = duration * 1000;
    let incrementTime = Math.abs(Math.floor(totalMiliseconds / endVal));
    
    // Safety cap
    if (incrementTime < 10) incrementTime = 10;
    
    const timer = setInterval(() => {
      start += Math.ceil(endVal / (totalMiliseconds / incrementTime));
      if (start >= endVal) {
        clearInterval(timer);
        setCount(endVal);
      } else {
        setCount(start);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [end, duration]);

  return <span>{count.toLocaleString()}{suffix}</span>;
};

const Hero = () => {
  const { stats } = useContext(AppContext);

  const handleScrollTo = (id) => {
    const target = document.querySelector(id);
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
    <section id="home" className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-20">
      {/* Background Image with Dark & Green Gradients */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1920&q=80" 
          alt="Dairy Pasture" 
          className="w-full h-full object-cover scale-105 filter brightness-[0.7] dark:brightness-[0.4]"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-dairy-dark/90 via-dairy-green-900/60 to-dairy-blue-900/40 z-0" />
      </div>

      {/* Decorative Wave Separator */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-10">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[60px] text-dairy-cream dark:text-dairy-dark fill-current">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C26.9,8.75,57.05,18.3,88.47,26.85,152.07,44.24,220.89,65.17,321.39,56.44Z"></path>
        </svg>
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex-grow flex flex-col justify-center">
        {/* NGO Badge */}
        <div className="inline-flex items-center space-x-2 bg-white/10 dark:bg-black/20 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 mb-8 mx-auto hover:border-dairy-green-400 transition-colors cursor-pointer" onClick={() => handleScrollTo('#mission')}>
          <span className="w-2.5 h-2.5 rounded-full bg-dairy-green-500 animate-pulse" />
          <span className="text-white text-xs font-semibold uppercase tracking-wider font-display">
            National Dairy Safety Alliance
          </span>
        </div>

        {/* Heading */}
        <h1 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-[1.1] max-w-4xl mx-auto mb-6">
          Protect Dairy Animals.<br/>
          <span className="bg-gradient-to-r from-dairy-green-400 to-dairy-green-200 bg-clip-text text-transparent">
            Ensure Safe Dairy Products.
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-lg sm:text-xl text-slate-200 font-medium max-w-2xl mx-auto mb-10 leading-relaxed">
          Creating awareness about ethical dairy farming, milk quality, food safety, and responsible consumption. Join our community-backed health initiative.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button 
            onClick={() => handleScrollTo('#survey')}
            className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-gradient-to-r from-dairy-green-600 to-dairy-green-500 hover:from-dairy-green-500 hover:to-dairy-green-400 text-white font-bold px-8 py-4 rounded-2xl shadow-lg hover:shadow-dairy-green-950/20 transform hover:-translate-y-0.5 transition-all text-base cursor-pointer"
          >
            <ClipboardList className="w-5 h-5" />
            <span>Take Survey</span>
          </button>
          
          <button 
            onClick={() => handleScrollTo('#dashboard')}
            className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-4 rounded-2xl border border-white/30 backdrop-blur-md shadow-lg transform hover:-translate-y-0.5 transition-all text-base cursor-pointer"
          >
            <BarChart3 className="w-5 h-5 text-dairy-green-300" />
            <span>View Community Results</span>
          </button>

          <button 
            onClick={() => handleScrollTo('#mission')}
            className="w-full sm:w-auto flex items-center justify-center space-x-2 text-white hover:text-dairy-green-300 font-semibold px-4 py-3 transition-colors text-base cursor-pointer"
          >
            <span>Learn More</span>
            <ChevronDown className="w-4 h-4 animate-bounce" />
          </button>
        </div>

        {/* Stats Panel (Glassmorphism layout) */}
        <div className="max-w-5xl mx-auto w-full grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 bg-white/10 dark:bg-black/10 backdrop-blur-lg border border-white/15 dark:border-white/5 rounded-3xl p-6 sm:p-8 shadow-2xl">
          <div className="flex flex-col items-center">
            <span className="font-display font-black text-3xl sm:text-4xl text-white">
              <CountUp end={stats.reached} suffix="+" />
            </span>
            <span className="text-xs sm:text-sm text-slate-300 font-semibold mt-1">
              People Reached
            </span>
          </div>
          
          <div className="flex flex-col items-center border-l border-white/15">
            <span className="font-display font-black text-3xl sm:text-4xl text-white">
              <CountUp end={stats.surveyResponses} />
            </span>
            <span className="text-xs sm:text-sm text-slate-300 font-semibold mt-1">
              Survey Responses
            </span>
          </div>

          <div className="flex flex-col items-center border-l border-white/15">
            <span className="font-display font-black text-3xl sm:text-4xl text-white">
              <CountUp end={stats.awarenessDrives} suffix="+" />
            </span>
            <span className="text-xs sm:text-sm text-slate-300 font-semibold mt-1">
              Awareness Drives
            </span>
          </div>

          <div className="flex flex-col items-center border-l border-white/15">
            <span className="font-display font-black text-3xl sm:text-4xl text-white">
              <CountUp end={stats.localCommunities} />
            </span>
            <span className="text-xs sm:text-sm text-slate-300 font-semibold mt-1">
              Local Communities
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
