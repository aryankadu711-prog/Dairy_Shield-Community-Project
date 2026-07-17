import React, { useState } from 'react';
import { AlertTriangle, ShieldCheck, Heart, Info, ChevronRight, RefreshCw } from 'lucide-react';

const Adulteration = () => {
  const [selectedAdulterant, setSelectedAdulterant] = useState(null);

  const adulterants = [
    {
      id: "water",
      name: "Water Dilution",
      dangerLevel: "Moderate",
      dangerColor: "bg-yellow-500",
      textColor: "text-yellow-700 dark:text-yellow-400",
      description: "Mixing plain tap water into milk to expand volume. This is the most common form of cheating.",
      risks: "Reduces nutritional density (diluting proteins and minerals) and introduces pathogens if the water source is unsterilized, leading to stomach flu and typhoid.",
      detection: "The slanted drop test (flowing drop leaves no trace on smooth metal or tiles)."
    },
    {
      id: "detergent",
      name: "Detergent",
      dangerLevel: "Severe",
      dangerColor: "bg-red-500",
      textColor: "text-red-700 dark:text-red-400",
      description: "Added to emulsify added oils in water to recreate the rich texture and froth of high-fat milk.",
      risks: "Highly toxic. Damages mucosal linings of the stomach and small intestine, causing chronic vomiting, food poisoning, and ulcers.",
      detection: "Shake test. Produces thick, dense foam that does not dissolve for hours."
    },
    {
      id: "starch",
      name: "Starch (Flour/Powder)",
      dangerLevel: "Moderate to High",
      dangerColor: "bg-orange-500",
      textColor: "text-orange-700 dark:text-orange-400",
      description: "Wheat flour, rice powder, or starch added to thicken watered-down milk and raise solid fat levels.",
      risks: "Difficult to digest, elevates sugar levels in diabetic patients, and causes indigestion and bloating.",
      detection: "Iodine solution test. Turns blue upon reaction with starch."
    },
    {
      id: "urea",
      name: "Urea (Chemical Fertilizer)",
      dangerLevel: "Critical",
      dangerColor: "bg-rose-600",
      textColor: "text-rose-700 dark:text-rose-400",
      description: "Fertilizer urea added to artificially inflate the Nitrogen content, which registers as 'protein value' on standard tests.",
      risks: "Extremely toxic. Causes severe strain on the kidneys and liver, potentially leading to chronic renal failure and cancer over long periods.",
      detection: "Soybean powder/urease indicator tests in laboratory conditions."
    },
    {
      id: "synthetic",
      name: "Synthetic Milk",
      dangerLevel: "Critical",
      dangerColor: "bg-rose-600",
      textColor: "text-rose-700 dark:text-rose-400",
      description: "A hazardous fake mix of detergent, oil, urea, emulsifiers, and warm water. Contains zero animal milk.",
      risks: "Severe chemical poisoning. Can cause permanent internal tissue damage, liver cirrhosis, organ failure, and heavy chemical toxicity.",
      detection: "Soapy feeling when rubbed, bitter chemical taste, and yellowing when heated."
    }
  ];

  return (
    <section id="adulteration" className="py-24 bg-dairy-cream-dark dark:bg-slate-900/50 transition-colors duration-300 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display font-black text-xs uppercase tracking-widest text-dairy-green-600 dark:text-dairy-green-400 mb-3">
            Threat Awareness
          </h2>
          <h3 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-800 dark:text-white leading-tight">
            Common Chemical Adulterants in Milk
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mt-4 text-lg">
            Understand the chemicals used to inflate milk volume, the health threats they carry, and the basic principles behind their testing.
          </p>
        </div>

        {/* Adulterants Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {adulterants.map((item) => (
            <div 
              key={item.id}
              className="bg-white dark:bg-dairy-dark/65 border border-slate-200/50 dark:border-white/5 rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Header Indicator */}
                <div className="flex justify-between items-center mb-6">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider text-white ${item.dangerColor}`}>
                    {item.dangerLevel} Hazard
                  </span>
                  <AlertTriangle className={`w-5 h-5 ${item.textColor}`} />
                </div>

                {/* Name */}
                <h4 className="font-display font-black text-xl text-slate-800 dark:text-white mb-3">
                  {item.name}
                </h4>

                {/* What it is */}
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6">
                  <span className="font-bold text-slate-700 dark:text-slate-300">What it is:</span> {item.description}
                </p>
              </div>

              {/* Action Button to reveal detail */}
              <button 
                onClick={() => setSelectedAdulterant(item)}
                className="w-full py-3 px-4 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-white/5 rounded-2xl text-xs font-bold text-dairy-green-700 dark:text-dairy-green-400 hover:bg-dairy-green-50 dark:hover:bg-slate-800 flex items-center justify-center space-x-1.5 transition-all cursor-pointer"
              >
                <Info className="w-4 h-4" />
                <span>View Risks & Detection</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Details Lightbox Overlay */}
      {selectedAdulterant && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div 
            className="bg-white dark:bg-dairy-dark rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative border border-slate-100 dark:border-white/5 animate-float-delayed"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider text-white mb-2 ${selectedAdulterant.dangerColor}`}>
                  {selectedAdulterant.dangerLevel}
                </span>
                <h4 className="font-display font-black text-2xl text-slate-800 dark:text-white">
                  {selectedAdulterant.name}
                </h4>
              </div>
              <button 
                onClick={() => setSelectedAdulterant(null)}
                className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="space-y-5 text-sm">
              <div className="bg-rose-50 dark:bg-rose-950/20 p-4 rounded-2xl border border-rose-100 dark:border-rose-950/50 flex space-x-3 items-start">
                <Heart className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-rose-950 dark:text-rose-300">Health Risks:</span>
                  <p className="text-slate-700 dark:text-slate-400 mt-1 leading-relaxed">{selectedAdulterant.risks}</p>
                </div>
              </div>

              <div className="bg-dairy-green-50/50 dark:bg-dairy-green-950/20 p-4 rounded-2xl border border-dairy-green-100 dark:border-dairy-green-950/50 flex space-x-3 items-start">
                <ShieldCheck className="w-5 h-5 text-dairy-green-600 dark:text-dairy-green-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-dairy-green-900 dark:text-dairy-green-300">Testing Principle:</span>
                  <p className="text-slate-700 dark:text-slate-400 mt-1 leading-relaxed">{selectedAdulterant.detection}</p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <button 
              onClick={() => setSelectedAdulterant(null)}
              className="w-full mt-8 py-3 bg-dairy-green-700 hover:bg-dairy-green-600 text-white font-bold rounded-2xl shadow-lg transition-colors cursor-pointer"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Adulteration;
