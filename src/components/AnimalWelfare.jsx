import React from 'react';
import { Apple, Home, ActivitySquare, HeartHandshake, ShieldAlert, Sparkles, Smile, GlassWater, Users } from 'lucide-react';

const AnimalWelfare = () => {
  const pillars = [
    {
      icon: <Apple className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />,
      title: "Proper Nutrition",
      desc: "Balanced rations of silage, fresh green fodder, oil cakes, and key minerals to boost cow immunity and support milk quality."
    },
    {
      icon: <Home className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
      title: "Clean Shelters",
      desc: "Well-ventilated, spacious sheds with rubber bedding mats, dry standing areas, and regular dung clearance to avoid bacterial build-up."
    },
    {
      icon: <ActivitySquare className="w-6 h-6 text-purple-600 dark:text-purple-400" />,
      title: "Veterinary Care",
      desc: "Regular screening for subclinical mastitis, timely vaccinations, and strict withdrawal logs when cattle require antibiotics."
    },
    {
      icon: <Sparkles className="w-6 h-6 text-amber-600 dark:text-amber-400" />,
      title: "Stress-Free Milking",
      desc: "Gentle milking practices without physical duress or chemical boosters like oxytocin, preserving hormone balance."
    },
    {
      icon: <HeartHandshake className="w-6 h-6 text-rose-600 dark:text-rose-400" />,
      title: "Humane Treatment",
      desc: "Treating cattle with care, providing grazing access, and ensuring automated cow groomers for comfort."
    }
  ];

  const steps = [
    {
      icon: <Smile className="w-8 h-8 text-emerald-600 dark:text-emerald-400" />,
      title: "1. Healthy Animal",
      desc: "Ethical shelter conditions, veterinary checks, and zero-stress milking promote strong immune responses. Cortisol levels decrease while natural health improves."
    },
    {
      icon: <GlassWater className="w-8 h-8 text-blue-600 dark:text-blue-400" />,
      title: "2. Better Milk",
      desc: "Cows are free from mastitis and stress hormones, producing milk richer in natural milk-fat solids, and free from traces of emergency antibiotics."
    },
    {
      icon: <Users className="w-8 h-8 text-amber-600 dark:text-amber-400" />,
      title: "3. Healthy Families",
      desc: "Consumers receive clean, micro-pathogen-free dairy products, shielding young children and adults from food-borne sickness and AMR (Antimicrobial Resistance)."
    }
  ];

  return (
    <section id="animal-welfare" className="py-24 bg-dairy-cream-dark dark:bg-slate-900/50 transition-colors duration-300 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display font-black text-xs uppercase tracking-widest text-dairy-green-600 dark:text-dairy-green-400 mb-3">
            Ethical Focus
          </h2>
          <h3 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-800 dark:text-white leading-tight">
            Protecting Dairy Animals Promotes Public Health
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mt-4 text-lg">
            Cruelty-free dairy farming is not an option—it is a food safety imperative. Healthy cows yield premium-quality milk.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-20">
          {pillars.map((p, idx) => (
            <div 
              key={idx}
              className="bg-white dark:bg-dairy-dark/65 border border-slate-200/50 dark:border-white/5 rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-dairy-green-50 dark:bg-dairy-green-950/40 flex items-center justify-center mb-4">
                {p.icon}
              </div>
              <h4 className="font-display font-bold text-base text-slate-800 dark:text-white mb-2">
                {p.title}
              </h4>
              <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">
                {p.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Interactive Lifecycle Timeline */}
        <div className="bg-gradient-to-br from-dairy-green-800 to-dairy-blue-800 dark:from-dairy-green-950/80 dark:to-dairy-blue-950/80 rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/[0.03] pointer-events-none" />
          
          <h4 className="font-display font-extrabold text-2xl text-white text-center mb-12 relative z-10">
            The Virtuous Dairy Cycle
          </h4>

          {/* Timeline Connector Path */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 lg:gap-16">
            {steps.map((s, idx) => (
              <div key={idx} className="relative flex flex-col items-center text-center group">
                {/* Horizontal line indicator for desktop */}
                {idx < 2 && (
                  <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-0.5 border-t-2 border-dashed border-white/20 z-0" />
                )}

                {/* Step Circle */}
                <div className="w-20 h-20 rounded-full bg-white dark:bg-slate-900 shadow-lg flex items-center justify-center mb-6 border-4 border-dairy-green-400 z-10 group-hover:scale-105 transition-transform duration-300">
                  {s.icon}
                </div>

                {/* Content */}
                <h5 className="font-display font-bold text-lg text-white mb-2">
                  {s.title}
                </h5>
                
                <p className="text-slate-200 dark:text-slate-400 text-sm leading-relaxed max-w-xs">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnimalWelfare;
