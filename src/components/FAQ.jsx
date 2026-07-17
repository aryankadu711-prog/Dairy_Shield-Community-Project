import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { HelpCircle, ChevronDown, ChevronUp, Search, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQ = () => {
  const { faqs } = useContext(AppContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaq, setOpenFaq] = useState(null);

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleFaq = (id) => {
    setOpenFaq(prev => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="py-24 bg-dairy-cream-dark dark:bg-slate-900/50 transition-colors duration-300 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display font-black text-xs uppercase tracking-widest text-dairy-green-600 dark:text-dairy-green-400 mb-3">
            Got Questions?
          </h2>
          <h3 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-800 dark:text-white leading-tight">
            Frequently Asked Questions
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mt-4 text-lg">
            Answers to your queries regarding milk hygiene, testing protocols, refrigeration rules, and livestock safety.
          </p>
        </div>

        {/* Live Search Input Bar */}
        <div className="relative mb-10">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search FAQs (e.g. boiling, paneer, water test)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-2xl glass-input dark:dark-glass-input text-slate-850 dark:text-white shadow-sm placeholder-slate-400 text-sm sm:text-base focus:outline-none"
          />
        </div>

        {/* FAQs Accordion List */}
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-slate-900/30 rounded-3xl border border-dashed border-slate-200 dark:border-white/5">
            <Info className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <p className="text-slate-500 dark:text-slate-400 font-semibold">No questions matches your query.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredFaqs.map((faq) => {
              const isOpen = openFaq === faq.id;
              
              return (
                <div 
                  key={faq.id} 
                  className="bg-white dark:bg-dairy-dark/65 border border-slate-200/50 dark:border-white/5 rounded-3xl overflow-hidden shadow-sm transition-all"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full px-6 py-5 flex justify-between items-center text-left hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors cursor-pointer"
                  >
                    <span className="font-display font-bold text-slate-800 dark:text-white text-base pr-6 flex items-start space-x-3">
                      <HelpCircle className="w-5 h-5 text-dairy-green-600 dark:text-dairy-green-400 shrink-0 mt-0.5" />
                      <span>{faq.question}</span>
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pt-2 border-t border-slate-100 dark:border-white/5 text-slate-600 dark:text-slate-350 text-sm leading-relaxed pl-14">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};

export default FAQ;
