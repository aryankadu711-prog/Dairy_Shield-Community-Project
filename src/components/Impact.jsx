import React from 'react';
import { Calendar, Search, MapPin, Radio, FileCheck2, Target } from 'lucide-react';

const Impact = () => {
  const steps = [
    {
      title: "Planning Phase",
      icon: <Calendar className="w-5 h-5 text-white" />,
      color: "bg-emerald-600",
      date: "Month 1-2",
      desc: "Identifying key risk regions, designing the comprehensive dairy safety framework, and coordinating with veterinary doctors."
    },
    {
      title: "Survey Launch",
      icon: <Search className="w-5 h-5 text-white" />,
      color: "bg-blue-600",
      date: "Month 3",
      desc: "Distributing our digital Google Form survey and collecting physical responses to establish public awareness baselines."
    },
    {
      title: "Field & Audit Visits",
      icon: <MapPin className="w-5 h-5 text-white" />,
      color: "bg-teal-600",
      date: "Month 4-5",
      desc: "Visiting local collection hubs, assessing temperature control measures, and verifying milk fat SNF parameters."
    },
    {
      title: "Awareness Campaign",
      icon: <Radio className="w-5 h-5 text-white" />,
      color: "bg-orange-600",
      date: "Month 6-8",
      desc: "Hosting community checkup drives, training local farmers on stress-free husbandry, and teaching households home test tricks."
    },
    {
      title: "Data Analysis & Results",
      icon: <FileCheck2 className="w-5 h-5 text-white" />,
      color: "bg-indigo-600",
      date: "Month 9",
      desc: "Collating survey and field results into visual spreadsheets and dashboards to identify systemic milk storage and safety gaps."
    },
    {
      title: "Future Objectives",
      icon: <Target className="w-5 h-5 text-white" />,
      color: "bg-rose-600",
      date: "Onwards",
      desc: "Advocating for municipal cold chains, launching permanent chemical detection centers, and scaling ethical dairy labels."
    }
  ];

  return (
    <section className="py-24 bg-dairy-cream-dark dark:bg-slate-900/50 transition-colors duration-300 relative overflow-hidden">
      
      {/* Background Gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-dairy-green-200/20 dark:bg-dairy-green-950/5 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-dairy-blue-200/20 dark:bg-dairy-blue-950/5 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="font-display font-black text-xs uppercase tracking-widest text-dairy-green-600 dark:text-dairy-green-400 mb-3">
            Our Journey
          </h2>
          <h3 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-800 dark:text-white leading-tight">
            Community Impact Timeline
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mt-4 text-lg">
            A structured breakdown of our grassroots activities, data analysis milestones, and regulatory advocacy milestones.
          </p>
        </div>

        {/* Vertical Timeline Wrapper */}
        <div className="relative">
          {/* Middle vertical line for desktop */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-800 -translate-x-1/2" />

          {/* Mobile left vertical line */}
          <div className="md:hidden absolute left-6 top-0 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-800" />

          {/* Timeline steps */}
          <div className="space-y-12 md:space-y-16">
            {steps.map((step, idx) => {
              const isEven = idx % 2 === 0;
              
              return (
                <div key={idx} className="relative flex flex-col md:flex-row items-start md:items-center">
                  
                  {/* Left Column (Desktop) */}
                  <div className={`hidden md:block w-1/2 pr-12 text-right ${isEven ? 'opacity-100' : 'opacity-0 select-none pointer-events-none'}`}>
                    {isEven && (
                      <div>
                        <span className="text-xs font-black text-dairy-green-600 dark:text-dairy-green-400 tracking-wider uppercase">
                          {step.date}
                        </span>
                        <h4 className="font-display font-extrabold text-xl text-slate-800 dark:text-white mt-1 mb-2">
                          {step.title}
                        </h4>
                        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed max-w-md ml-auto">
                          {step.desc}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Icon Circle Marker */}
                  <div className="absolute left-1.5 md:left-1/2 w-10 h-10 rounded-full border-4 border-dairy-cream dark:border-dairy-dark flex items-center justify-center -translate-x-[0px] md:-translate-x-1/2 shadow-md z-10 group transform hover:scale-110 transition-transform duration-200 bg-slate-900">
                    <div className={`w-full h-full rounded-full flex items-center justify-center ${step.color}`}>
                      {step.icon}
                    </div>
                  </div>

                  {/* Right Column (Desktop) */}
                  <div className={`w-full md:w-1/2 pl-12 md:pl-12 text-left ${!isEven ? 'md:opacity-100' : 'md:opacity-0 md:select-none md:pointer-events-none'}`}>
                    {/* For mobile, always display card contents here. For desktop, only show odd steps */}
                    <div className="block md:hidden">
                      <span className="text-xs font-black text-dairy-green-600 dark:text-dairy-green-400 tracking-wider uppercase">
                        {step.date}
                      </span>
                      <h4 className="font-display font-extrabold text-xl text-slate-800 dark:text-white mt-1 mb-2">
                        {step.title}
                      </h4>
                      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                        {step.desc}
                      </p>
                    </div>

                    <div className="hidden md:block">
                      {!isEven && (
                        <div>
                          <span className="text-xs font-black text-dairy-green-600 dark:text-dairy-green-400 tracking-wider uppercase">
                            {step.date}
                          </span>
                          <h4 className="font-display font-extrabold text-xl text-slate-800 dark:text-white mt-1 mb-2">
                            {step.title}
                          </h4>
                          <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed max-w-md">
                            {step.desc}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Impact;
