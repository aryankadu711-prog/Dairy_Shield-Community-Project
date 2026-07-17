import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { FiLinkedin, FiTwitter, FiMail } from 'react-icons/fi';


const Team = () => {
  const members = [
    {
      name: "Dr. Aryan Kadu",
      role: "Project Director & Advocacy Lead",
      photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80", // standard portrait
      desc: "Directs outreach logistics, coordinates field surveys, and handles policy correspondence with food safety administrators.",
      linkedin: "#",
      twitter: "#",
      email: "aryan@dairyshield.org"
    },
    {
      name: "Dr. Sarah Henderson",
      role: "Chief Dairy Micro-Biologist",
      photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=300&q=80",
      desc: "Supervises raw milk bacterial diagnostics, compiles FSSAI standards, and verifies household test procedures.",
      linkedin: "#",
      twitter: "#",
      email: "sarah@dairyshield.org"
    },
    {
      name: "Dr. Evelyn Martinez",
      role: "Veterinary Care Consultant",
      photo: "https://images.unsplash.com/photo-1594744803329-e58b31de215f?auto=format&fit=crop&w=300&q=80",
      desc: "Specialist in cattle mastitis and stress indicators. Conducts cattle nutrition training workshops in rural dairy co-ops.",
      linkedin: "#",
      twitter: "#",
      email: "evelyn@dairyshield.org"
    },
    {
      name: "Rajesh Verma",
      role: "Field Coordinator & Outreach Specialist",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
      desc: "Coordinates municipal audits, sets up village cold storage chilling centers, and distributes survey leaflets.",
      linkedin: "#",
      twitter: "#",
      email: "rajesh@dairyshield.org"
    }
  ];

  return (
    <section className="py-24 bg-dairy-cream dark:bg-dairy-dark transition-colors duration-300 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="font-display font-black text-xs uppercase tracking-widest text-dairy-green-600 dark:text-dairy-green-400 mb-3">
            Our Coalition
          </h2>
          <h3 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-800 dark:text-white leading-tight">
            Meet the DairyShield Panel
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mt-4 text-lg">
            Our multi-disciplinary team brings together food lawyers, micro-biologists, and veterinary officers to fight for safe milk.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {members.map((m, idx) => (
            <div 
              key={idx}
              className="bg-white dark:bg-dairy-dark/65 border border-slate-200/50 dark:border-white/5 rounded-3xl p-6 shadow-sm hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300 flex flex-col items-center text-center group"
            >
              {/* Photo Frame */}
              <div className="relative w-32 h-32 rounded-full overflow-hidden mb-6 border-4 border-slate-50 dark:border-slate-800 shadow-inner group-hover:scale-105 transition-transform duration-300">
                <img 
                  src={m.photo} 
                  alt={m.name} 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Name */}
              <h4 className="font-display font-bold text-lg text-slate-800 dark:text-white mb-1">
                {m.name}
              </h4>
              
              {/* Role */}
              <span className="inline-flex items-center text-xs font-black uppercase text-dairy-green-600 dark:text-dairy-green-400 tracking-wider mb-4">
                <ShieldCheck className="w-3.5 h-3.5 mr-1" />
                {m.role}
              </span>

              {/* Description */}
              <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed mb-6 flex-grow">
                {m.desc}
              </p>

              {/* Social Channels */}
              <div className="flex items-center justify-center space-x-3 pt-4 border-t border-slate-100 dark:border-white/5 w-full">
                <a 
                  href={m.linkedin} 
                  className="p-2 rounded-xl bg-slate-50 dark:bg-slate-900 text-slate-400 hover:text-dairy-green-700 hover:bg-dairy-green-50 dark:hover:bg-slate-800 transition-colors"
                  aria-label="LinkedIn Profile"
                >
                  <FiLinkedin className="w-4 h-4" />
                </a>
                
                <a 
                  href={m.twitter} 
                  className="p-2 rounded-xl bg-slate-50 dark:bg-slate-900 text-slate-400 hover:text-dairy-green-700 hover:bg-dairy-green-50 dark:hover:bg-slate-800 transition-colors"
                  aria-label="Twitter Profile"
                >
                  <FiTwitter className="w-4 h-4" />
                </a>

                <a 
                  href={`mailto:${m.email}`} 
                  className="p-2 rounded-xl bg-slate-50 dark:bg-slate-900 text-slate-400 hover:text-dairy-green-700 hover:bg-dairy-green-50 dark:hover:bg-slate-800 transition-colors"
                  aria-label="Email Address"
                >
                  <FiMail className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Team;
