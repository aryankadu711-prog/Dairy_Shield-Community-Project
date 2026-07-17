import React from 'react';
import { Microscope, Beaker, CheckCircle2, AlertOctagon, HelpCircle } from 'lucide-react';

const HomeTests = () => {
  const tests = [
    {
      id: "water",
      title: "Water Dilution Test",
      materials: "A smooth, polished slanted surface (like a clean marble floor tile, glass plate, or stainless steel sheet).",
      procedure: "Place a single drop of milk on the slanted surface and allow it to run downward.",
      result: "Pure milk will flow slowly, leaving a distinct, dense white trail behind it. Diluted milk will slide down immediately without leaving any trail, or leaving a faint, watery path."
    },
    {
      id: "detergent",
      title: "Detergent Shake Test",
      materials: "A clean, empty transparent glass jar or bottle, and 5-10 ml of water.",
      procedure: "Take 5 ml of milk in the bottle, mix it with an equal amount of pure water, and shake the bottle vigorously for about 1-2 minutes.",
      result: "If the milk is adulterated with detergent, it will form a thick, soap-like froth layer at the top that stays stable and does not dissolve. Natural milk will form a light, thin bubble layer that pops quickly."
    },
    {
      id: "starch",
      title: "Starch (Iodine) Test",
      materials: "Tincture of Iodine (available at local pharmacies), a small bowl/glass, and a boiling pan.",
      procedure: "Boil 10ml of milk, let it cool down to room temperature. Pour it into a cup and add 2-3 drops of Iodine solution.",
      result: "If the milk contains starch (rice powder, flour, or starches), it will instantly turn a deep, dark blue/violet color. If it remains light yellow/brown (the color of iodine), the milk is free from starch."
    },
    {
      id: "synthetic",
      title: "Synthetic Milk Check",
      materials: "Small saucepan (for heating) and your fingertips.",
      procedure: "1. Rub a drop of milk between your fingers. 2. Taste a tiny drop. 3. Heat 20ml of milk in a pan until warm.",
      result: "Synthetic milk will: 1. Feel soapy and slippery when rubbed. 2. Taste bitter, chemical-like, or soapy. 3. Turn a distinct yellowish hue when heated, whereas natural milk remains white."
    }
  ];

  return (
    <section id="home-tests" className="py-24 bg-dairy-cream dark:bg-dairy-dark transition-colors duration-300 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display font-black text-xs uppercase tracking-widest text-dairy-green-600 dark:text-dairy-green-400 mb-3">
            DIY Purity Checks
          </h2>
          <h3 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-800 dark:text-white leading-tight">
            How to Perform Simple Home Purity Tests
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mt-4 text-lg">
            Use these quick physical and chemical tests in your kitchen to screen your milk supply for common contaminants.
          </p>
        </div>

        {/* Home Tests Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {tests.map((test) => (
            <div 
              key={test.id} 
              className="glass-card dark:dark-glass-card border-slate-200/40 dark:border-white/5 rounded-3xl p-8 hover:bg-white dark:hover:bg-slate-800/10 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-dairy-green-50 dark:bg-dairy-green-950/40 flex items-center justify-center">
                    <Beaker className="w-5 h-5 text-dairy-green-700 dark:text-dairy-green-400" />
                  </div>
                  <h4 className="font-display font-bold text-xl text-slate-800 dark:text-white">
                    {test.title}
                  </h4>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <span className="text-xs font-black uppercase text-dairy-green-600 dark:text-dairy-green-400 block mb-1">
                      Materials Needed
                    </span>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                      {test.materials}
                    </p>
                  </div>
                  
                  <div>
                    <span className="text-xs font-black uppercase text-dairy-green-600 dark:text-dairy-green-400 block mb-1">
                      Procedure
                    </span>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                      {test.procedure}
                    </p>
                  </div>
                </div>
              </div>

              {/* Expected Result Container */}
              <div className="bg-dairy-green-50/50 dark:bg-dairy-green-950/20 border border-dairy-green-200/30 dark:border-dairy-green-900/30 rounded-2xl p-5">
                <span className="text-xs font-black uppercase text-dairy-green-800 dark:text-dairy-green-300 flex items-center space-x-1.5 mb-1.5">
                  <CheckCircle2 className="w-4 h-4 text-dairy-green-600 dark:text-dairy-green-400" />
                  <span>Expected Result</span>
                </span>
                <p className="text-slate-700 dark:text-slate-400 text-sm leading-relaxed">
                  {test.result}
                </p>
              </div>

            </div>
          ))}
        </div>

        {/* SAFETY WARNING NOTICE */}
        <div className="bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/30 rounded-3xl p-8 flex flex-col md:flex-row items-center md:space-x-8">
          <div className="w-16 h-16 rounded-2xl bg-rose-100 dark:bg-rose-900 flex items-center justify-center shrink-0 mb-6 md:mb-0">
            <AlertOctagon className="w-8 h-8 text-rose-600 dark:text-rose-400" />
          </div>
          <div className="text-center md:text-left">
            <h4 className="font-display font-extrabold text-lg text-rose-950 dark:text-rose-300">
              Critical Warning & Legal Disclaimer
            </h4>
            <p className="text-sm text-rose-900 dark:text-rose-400/80 leading-relaxed mt-2">
              These simple home tests are screening procedures designed solely for preliminary household awareness. They are **not replacements for standard laboratory chemical analyses**. Negative results do not guarantee absolute safety from trace toxins (like pesticides or aflatoxins), and positive results require validation from certified food safety bodies (such as FSSAI-approved analytical labs) before legal action.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HomeTests;
