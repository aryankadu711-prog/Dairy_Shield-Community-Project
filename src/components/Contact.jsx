import React from 'react';
import { GraduationCap, Users } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-dairy-cream-dark dark:bg-slate-900/50 transition-colors duration-300 relative overflow-hidden flex items-center justify-center">
      {/* Decorative Subtle Background Gradients */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-dairy-green-500/10 dark:bg-dairy-green-400/5 rounded-full filter blur-3xl -translate-y-1/2 pointer-events-none animate-pulse" />
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-dairy-blue-500/10 dark:bg-dairy-blue-400/5 rounded-full filter blur-3xl -translate-y-1/2 pointer-events-none animate-pulse" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Main Credits Card */}
        <div className="glass-card dark:dark-glass-card border-slate-200/50 dark:border-white/5 rounded-3xl p-8 sm:p-12 shadow-xl max-w-2xl mx-auto backdrop-blur-md transform hover:scale-[1.01] transition-all duration-300">
          
          {/* Cap Icon Badge */}
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-dairy-green-600 to-dairy-blue-600 flex items-center justify-center text-white mx-auto mb-6 shadow-md shadow-dairy-green-500/20">
            <GraduationCap className="w-8 h-8" />
          </div>

          {/* College Name */}
          <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-800 dark:text-white leading-tight mb-4 tracking-tight">
            Sardar Patel Institute of Technology
            <span className="block text-dairy-green-600 dark:text-dairy-green-400 text-xl font-bold mt-1">SPIT</span>
          </h3>

          {/* Divider */}
          <div className="w-20 h-1 bg-gradient-to-r from-dairy-green-500 to-dairy-blue-500 mx-auto my-6 rounded-full" />

          {/* Group 42 Details Badge */}
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-dairy-green-500/10 text-dairy-green-700 dark:text-dairy-green-400 text-xs font-black uppercase tracking-wider mb-4 border border-dairy-green-500/20">
            <Users className="w-3.5 h-3.5" />
            <span>Group No. 42</span>
          </div>

          {/* Student Description text */}
          <p className="font-sans text-sm sm:text-base text-slate-600 dark:text-slate-350 leading-relaxed font-semibold">
            This project is a dedicated public welfare initiative created and executed by Navi Mumbai students of Group Number 42, SPIT, raising awareness about dairy quality safety, household adulteration tests, and ethical cattle welfare.
          </p>

        </div>

      </div>
    </section>
  );
};

export default Contact;
