import React from 'react';
import { Heart, Activity, ShieldCheck, HelpCircle, Users2 } from 'lucide-react';

const Mission = () => {
  const missions = [
    {
      icon: <Heart className="w-8 h-8 text-rose-500" />,
      title: "Dairy Animal Welfare",
      description: "Advocating for the 5 Freedoms of animals: ensuring cows are free from hunger, stress, disease, discomfort, and fear in local diaries."
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-emerald-500" />,
      title: "Ethical Farming Practices",
      description: "Providing training to local dairy farmers on hygienic milking processes, comfortable housing systems, and stress-free automated milking."
    },
    {
      icon: <Activity className="w-8 h-8 text-dairy-blue-500" />,
      title: "Milk Safety & Hygiene",
      description: "Preventing bacterial growth by promoting secure cooling chains (under 4°C) immediately after milking, and clean handling protocols."
    },
    {
      icon: <HelpCircle className="w-8 h-8 text-orange-500" />,
      title: "Reducing Adulteration",
      description: "Equipping households with knowledge and quick chemical screening tools to detect water dilution, urea, detergent, and starch."
    },
    {
      icon: <Users2 className="w-8 h-8 text-indigo-500" />,
      title: "Educating Consumers",
      description: "Clearing age-old myths regarding boiling, fridge storage, paneer shelf-life, and empowering consumers to make certified choices."
    }
  ];

  return (
    <section id="mission" className="py-24 bg-dairy-cream dark:bg-dairy-dark transition-colors duration-300 relative overflow-hidden">
      {/* Decorative Blob */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-dairy-green-100/30 dark:bg-dairy-green-950/10 rounded-full filter blur-3xl pointer-events-none -mr-48" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-dairy-blue-100/20 dark:bg-dairy-blue-950/10 rounded-full filter blur-3xl pointer-events-none -ml-48" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display font-black text-xs uppercase tracking-widest text-dairy-green-600 dark:text-dairy-green-400 mb-3">
            Our Foundation
          </h2>
          <h3 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-800 dark:text-white leading-tight">
            Why Dairy Animal Welfare & Product Safety Matters
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mt-4 text-lg">
            DairyShield stands for a complete lifecycle approach: wholesome conditions for cattle translate directly to pure, nutritious dairy products for our families.
          </p>
        </div>

        {/* Missions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {missions.map((m, index) => (
            <div 
              key={index}
              className="glass-card dark:dark-glass-card hover:bg-white dark:hover:bg-dairy-green-900/10 border-slate-200/40 dark:border-white/5 rounded-3xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group flex flex-col items-start"
            >
              {/* Icon Container */}
              <div className="w-16 h-16 rounded-2xl bg-slate-50 dark:bg-slate-900/50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-inner border border-slate-100 dark:border-slate-800/20">
                {m.icon}
              </div>

              {/* Title */}
              <h4 className="font-display font-bold text-xl text-slate-800 dark:text-white mb-3">
                {m.title}
              </h4>

              {/* Description */}
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed flex-grow">
                {m.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Mission;
