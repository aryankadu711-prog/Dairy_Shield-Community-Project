import React from 'react';
import { ShieldCheck, Mail, ArrowUpRight, Heart } from 'lucide-react';
import { FiGithub } from 'react-icons/fi';


const Footer = () => {
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
    <footer className="bg-dairy-green-900 text-white relative overflow-hidden pt-20 pb-10">
      
      {/* Decorative Blob */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-dairy-green-700/20 rounded-full filter blur-3xl pointer-events-none -mr-32 -mb-32" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Footer Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-16">
          
          {/* Col 1: Brand details */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-black text-xl tracking-tight">DairyShield</span>
                <span className="text-[10px] tracking-wider uppercase font-semibold text-dairy-green-300 -mt-1">Public Awareness Initiative</span>
              </div>
            </div>
            
            <p className="text-slate-350 text-sm leading-relaxed max-w-sm">
              Securing food supply chains, advocating for humane livestock treatment, and raising consumer awareness about chemical adulterants.
            </p>
            
            <div className="flex items-center space-x-3">
              <a href="#" className="w-8 h-8 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 flex items-center justify-center text-white hover:scale-105 transition-all" aria-label="Github Link">
                <FiGithub className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-2 space-y-4">
            <h5 className="font-display font-extrabold text-sm uppercase tracking-wider text-dairy-green-300">Quick Links</h5>
            <ul className="space-y-2 text-sm text-slate-350">
              <li>
                <a href="#home" onClick={(e) => { e.preventDefault(); handleScrollTo('#home'); }} className="hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#mission" onClick={(e) => { e.preventDefault(); handleScrollTo('#mission'); }} className="hover:text-white transition-colors">
                  Our Mission
                </a>
              </li>
              <li>
                <a href="#why-safety" onClick={(e) => { e.preventDefault(); handleScrollTo('#why-safety'); }} className="hover:text-white transition-colors">
                  Dairy Safety
                </a>
              </li>
              <li>
                <a href="#animal-welfare" onClick={(e) => { e.preventDefault(); handleScrollTo('#animal-welfare'); }} className="hover:text-white transition-colors">
                  Animal Welfare
                </a>
              </li>
              <li>
                <a href="#gallery" onClick={(e) => { e.preventDefault(); handleScrollTo('#gallery'); }} className="hover:text-white transition-colors">
                  Outreach Gallery
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Resources & Agencies */}
          <div className="lg:col-span-3 space-y-4">
            <h5 className="font-display font-extrabold text-sm uppercase tracking-wider text-dairy-green-300">Regulatory Resources</h5>
            <ul className="space-y-2.5 text-sm text-slate-350">
              <li>
                <a href="https://www.fssai.gov.in/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center space-x-1">
                  <span>FSSAI National Standards</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </li>
              <li>
                <a href="https://www.who.int/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center space-x-1">
                  <span>WHO Food Safety Guides</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </li>
              <li>
                <a href="https://www.codexalimentarius.org/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center space-x-1">
                  <span>Codex Milk Guidelines</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </li>
              <li>
                <a href="#home-tests" onClick={(e) => { e.preventDefault(); handleScrollTo('#home-tests'); }} className="hover:text-white transition-colors">
                  Kitchen Testing Kits
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div className="lg:col-span-3 space-y-4">
            <h5 className="font-display font-extrabold text-sm uppercase tracking-wider text-dairy-green-300">Outreach Newsletter</h5>
            <p className="text-sm text-slate-350 leading-relaxed">
              Stay updated on local testing camps, policy updates, and farm audit campaigns.
            </p>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-12 text-sm text-white focus:outline-none focus:ring-1 focus:ring-dairy-green-400 placeholder-slate-400"
              />
              <button className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-dairy-green-700 hover:bg-dairy-green-600 text-white text-[10px] font-black uppercase tracking-wider px-2 py-1.5 rounded-lg transition-colors cursor-pointer">
                Join
              </button>
            </div>
          </div>

        </div>

        {/* Footer Bottom copyright bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-400 space-y-4 sm:space-y-0">
          <p>© {new Date().getFullYear()} DairyShield Alliance. All rights reserved.</p>
          <p className="flex items-center space-x-1">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-current" />
            <span>for Ethical Advocacy & Public Safety.</span>
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
