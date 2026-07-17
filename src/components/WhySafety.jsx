import React, { useState } from 'react';
import { Snowflake, Flame, Trash2, Milestone, Wine, CupSoda, Layers, ShieldCheck, ShoppingCart, HelpCircle } from 'lucide-react';

const WhySafety = () => {
  const [activeTab, setActiveTab] = useState('essential');

  const topics = {
    essential: [
      {
        icon: <Milestone className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />,
        title: "Milk Adulteration Overview",
        description: "Distributors often dilute milk with water to increase profit margins. To cover up the thinness and prevent spoiling, dangerous substances like starch, detergent, urea, and formalin are blended into the batch. This compromises nutritional value and creates long-term digestive and kidney hazards."
      },
      {
        icon: <Snowflake className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
        title: "Importance of Refrigeration",
        description: "Fresh milk should always be held below 4°C. Spoilage bacteria multiply rapidly above 8°C. Keeping milk inside the main compartment of your refrigerator (never on the door shelf) keeps the temperature stable and preserves shelf-life."
      },
      {
        icon: <Flame className="w-6 h-6 text-orange-600 dark:text-orange-400" />,
        title: "Proper Boiling Method",
        description: "Boil raw milk once by heating it on medium flame and stirring continuously. Kill active pathoges and turn off the burner immediately as soon as it rises. Avoid boiling milk multiple times, which strips vital B-complex vitamins."
      },
      {
        icon: <ShieldCheck className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />,
        title: "Pasteurized vs. Raw Milk",
        description: "Pasteurization heating kills all common raw pathogens (E. Coli, Salmonella) without reducing freshness. Pasteurized milk is ready to drink straight from the packet and does not require pre-boiling, unlike raw loose farm milk."
      }
    ],
    storage: [
      {
        icon: <Layers className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />,
        title: "Safe Paneer Storage",
        description: "Fresh cottage cheese (paneer) should be removed from plastic packing, submerged in a bowl of cold clean water, and placed in the fridge. Change the water daily to prevent it from going sour, and consume it within 3-4 days."
      },
      {
        icon: <CupSoda className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />,
        title: "Curd (Yogurt) Maintenance",
        description: "Keep curd in an airtight ceramic or glass container under 4°C. Active yogurt cultures will continue to ferment at warmer temperatures, making it excessively sour. Consume home curd within 3 days for maximum taste."
      },
      {
        icon: <Wine className="w-6 h-6 text-rose-600 dark:text-rose-400" />,
        title: "Cheese Shelf Life",
        description: "Hard cheese should be wrapped in greaseproof parchment paper (not plastic wrap) to allow it to breathe without drying out. Soft cheeses like mozzarella should be stored in their brine fluid. Throw away soft cheese if mold appears."
      },
      {
        icon: <Trash2 className="w-6 h-6 text-amber-600 dark:text-amber-400" />,
        title: "Butter Care",
        description: "Butter oxidizes quickly if exposed to bright light or room temperature air, leading to rancid off-flavors. Keep butter blocks wrapped in foil packaging in the cold dairy drawer. Salted butter keeps slightly longer than unsalted."
      }
    ]
  };

  return (
    <section id="why-safety" className="py-24 bg-dairy-cream dark:bg-dairy-dark transition-colors duration-300 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display font-black text-xs uppercase tracking-widest text-dairy-green-600 dark:text-dairy-green-400 mb-3">
            Core Knowledge
          </h2>
          <h3 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-800 dark:text-white leading-tight">
            Why Dairy Safety & Hygiene Matters
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mt-4 text-lg">
            Improper handling and common adulterants directly affect public health. Learn the essential physics and storage rules of dairy safety.
          </p>
        </div>

        {/* Tab Selection buttons */}
        <div className="flex justify-center space-x-4 mb-12">
          <button 
            onClick={() => setActiveTab('essential')}
            className={`px-6 py-3 rounded-2xl font-bold font-display text-sm transition-all cursor-pointer ${
              activeTab === 'essential'
                ? 'bg-dairy-green-700 text-white shadow-md'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            Essential Handling Guidelines
          </button>
          
          <button 
            onClick={() => setActiveTab('storage')}
            className={`px-6 py-3 rounded-2xl font-bold font-display text-sm transition-all cursor-pointer ${
              activeTab === 'storage'
                ? 'bg-dairy-green-700 text-white shadow-md'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            Product Storage & Shelf-Life
          </button>
        </div>

        {/* Dynamic Topics Display */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {topics[activeTab].map((topic, idx) => (
            <div 
              key={idx} 
              className="glass-card dark:dark-glass-card border-slate-200/40 dark:border-white/5 rounded-3xl p-8 hover:bg-white dark:hover:bg-slate-800/10 hover:shadow-lg transition-all duration-300 flex space-x-6 items-start"
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl bg-dairy-green-50 dark:bg-dairy-green-950/40 flex items-center justify-center shrink-0 shadow-inner">
                {topic.icon}
              </div>

              {/* Text */}
              <div className="flex-grow">
                <h4 className="font-display font-bold text-lg text-slate-800 dark:text-white mb-2">
                  {topic.title}
                </h4>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                  {topic.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Shelf-Life Info Notice */}
        <div className="bg-dairy-green-50/50 dark:bg-dairy-green-950/20 border border-dairy-green-200/50 dark:border-dairy-green-900/30 rounded-3xl p-6 sm:p-8 mt-12 flex flex-col sm:flex-row items-center sm:space-x-6">
          <div className="w-12 h-12 rounded-xl bg-dairy-green-100 dark:bg-dairy-green-900 flex items-center justify-center shrink-0 mb-4 sm:mb-0">
            <HelpCircle className="w-6 h-6 text-dairy-green-700 dark:text-dairy-green-300" />
          </div>
          <div>
            <h5 className="font-display font-bold text-sm text-dairy-green-900 dark:text-dairy-green-300">
              Pro-Tip on Expiry Dates
            </h5>
            <p className="text-xs text-dairy-green-800 dark:text-dairy-green-400 leading-relaxed mt-1">
              "Best Before" refers to optimal flavor quality. Dairy products stored at sub-4°C can sometimes remain safe for 1-2 days after, but always check for off-smells, gas pressure in packets, or curdling signs before consumption.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default WhySafety;
