import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { HelpCircle, CheckCircle2, RotateCw } from 'lucide-react';

const MythsFacts = () => {
  const { myths } = useContext(AppContext);
  const [flippedCards, setFlippedCards] = useState({});

  const handleCardClick = (id) => {
    setFlippedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  return (
    <section id="myths" className="py-24 bg-dairy-cream-dark dark:bg-slate-900/50 transition-colors duration-300 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display font-black text-xs uppercase tracking-widest text-dairy-green-600 dark:text-dairy-green-400 mb-3">
            Busting Misconceptions
          </h2>
          <h3 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-800 dark:text-white leading-tight">
            Dairy Myths vs. Scientific Facts
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mt-4 text-lg">
            Let's separate common old-wives' tales from veterinary and chemical science. Click on any card below to flip it.
          </p>
        </div>

        {/* 3D Flip Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {myths.map((item) => {
            const isFlipped = !!flippedCards[item.id];
            
            return (
              <div 
                key={item.id}
                className="w-full h-80 perspective-1000 cursor-pointer"
                onClick={() => handleCardClick(item.id)}
              >
                <div className={`relative w-full h-full duration-500 transform-style-3d transition-transform ${
                  isFlipped ? 'rotate-y-180' : ''
                }`}>
                  
                  {/* Front Side: Myth */}
                  <div className="absolute inset-0 w-full h-full backface-hidden rounded-3xl bg-white dark:bg-dairy-dark border border-rose-200/50 dark:border-rose-950/20 p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
                    <div>
                      <div className="flex justify-between items-center mb-6">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400 border border-rose-100 dark:border-rose-950/30">
                          Myth
                        </span>
                        <HelpCircle className="w-5 h-5 text-rose-500" />
                      </div>
                      
                      <p className="font-display font-bold text-base sm:text-lg text-slate-800 dark:text-white leading-relaxed">
                        "{item.myth}"
                      </p>
                    </div>

                    <div className="flex items-center space-x-1.5 text-xs font-bold text-rose-500/80">
                      <RotateCw className="w-3.5 h-3.5 animate-spin-slow" />
                      <span>Click card to reveal fact</span>
                    </div>
                  </div>

                  {/* Back Side: Fact */}
                  <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-3xl bg-gradient-to-br from-dairy-green-800 to-dairy-green-900 text-white p-6 flex flex-col justify-between shadow-lg">
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-white/20 text-white border border-white/25">
                          Scientific Fact
                        </span>
                        <CheckCircle2 className="w-5 h-5 text-dairy-green-300" />
                      </div>

                      <p className="text-sm font-semibold leading-relaxed text-slate-100">
                        {item.fact}
                      </p>
                    </div>

                    <div className="flex items-center space-x-1.5 text-[10px] font-extrabold uppercase tracking-wider text-dairy-green-300">
                      <RotateCw className="w-3.5 h-3.5" />
                      <span>Click to flip back</span>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default MythsFacts;
