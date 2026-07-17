import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { ClipboardList, ExternalLink, HelpCircle, ChevronDown, ChevronUp, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SurveySection = () => {
  const { surveyConfig, surveyQuestions } = useContext(AppContext);
  const [openAccordion, setOpenAccordion] = useState(null);

  const toggleAccordion = (id) => {
    setOpenAccordion(prev => (prev === id ? null : id));
  };

  return (
    <section id="survey" className="py-24 bg-dairy-cream dark:bg-dairy-dark transition-colors duration-300 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display font-black text-xs uppercase tracking-widest text-dairy-green-600 dark:text-dairy-green-400 mb-3">
            Public Input
          </h2>
          <h3 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-800 dark:text-white leading-tight">
            Take Our Dairy Safety Survey
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mt-4 text-lg">
            Your responses help us collect real-time data regarding household milk storage habits, awareness of chemical adulterants, and ethical opinions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Embed & CTA */}
          <div className="lg:col-span-7 space-y-6">
            <div className="glass-card dark:dark-glass-card border-slate-200/40 dark:border-white/5 rounded-3xl p-6 sm:p-8 shadow-sm">
              <h4 className="font-display font-extrabold text-xl text-slate-800 dark:text-white mb-4 flex items-center space-x-2">
                <ClipboardList className="w-5 h-5 text-dairy-green-600 dark:text-dairy-green-400" />
                <span>Fill out the Survey</span>
              </h4>
              
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6">
                Please complete our brief survey. Submitting this form anonymously provides vital data that is reflected instantly on our community statistics dashboard below.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <a
                  href={surveyConfig.formLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center space-x-2 bg-dairy-green-700 hover:bg-dairy-green-600 text-white font-bold px-6 py-3.5 rounded-2xl shadow-md transition-colors cursor-pointer text-sm"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Open Survey Form (New Tab)</span>
                </a>
              </div>

              {/* Survey Explainer note */}
              <p className="text-xs text-slate-500 dark:text-slate-500 italic">
                * Note: Your details remain 100% private. We only compile structural charts to publish safety indicators.
              </p>
            </div>

            {/* Embedded Iframe Container */}
            <div className="w-full bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-white/5 rounded-3xl overflow-hidden shadow-sm aspect-[4/3] lg:aspect-[16/10] relative">
              <iframe
                src={surveyConfig.embedLink}
                className="w-full h-full border-0 absolute inset-0"
                title="Dairy Safety Survey Form"
                loading="lazy"
              >
                Loading survey form...
              </iframe>
            </div>
          </div>

          {/* Right Column: Expandable Accordion of Questions */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-card dark:dark-glass-card border-slate-200/40 dark:border-white/5 rounded-3xl p-6 sm:p-8 shadow-sm">
              <h4 className="font-display font-extrabold text-xl text-slate-800 dark:text-white mb-6">
                Survey Topics & Questions
              </h4>

              <div className="space-y-3">
                {surveyQuestions.map((q) => {
                  const isOpen = openAccordion === q.id;
                  
                  return (
                    <div 
                      key={q.id}
                      className="border border-slate-200/40 dark:border-white/5 rounded-2xl overflow-hidden bg-white/50 dark:bg-slate-900/30 transition-all"
                    >
                      <button
                        onClick={() => toggleAccordion(q.id)}
                        className="w-full px-5 py-4 flex justify-between items-center text-left hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors cursor-pointer"
                      >
                        <span className="font-bold text-sm text-slate-800 dark:text-white pr-4">
                          {q.question}
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
                            <div className="px-5 pb-5 pt-1 space-y-2 border-t border-slate-100 dark:border-white/5">
                              {q.options.map((option, idx) => (
                                <div 
                                  key={idx}
                                  className="flex items-center space-x-2 text-xs text-slate-600 dark:text-slate-400 py-1"
                                >
                                  <CheckCircle2 className="w-4 h-4 text-dairy-green-600 dark:text-dairy-green-400 shrink-0" />
                                  <span>{option}</span>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default SurveySection;
