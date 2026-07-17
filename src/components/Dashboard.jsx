import React, { useContext, useMemo, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { BarChart, Bar, Cell, PieChart, Pie, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { BarChart3, Users, CheckCircle, RefreshCw, Send } from 'lucide-react';

const Dashboard = () => {
  const { surveyResponses, submitSurveyResponse, surveyQuestions } = useContext(AppContext);
  const [localSubmission, setLocalSubmission] = useState({
    q1: "", q2: "", q3: "", q4: "", q5: "", q6: "", q7: "", q8: "", q9: "", q10: ""
  });
  const [showForm, setShowForm] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState(false);

  // Harmonious Colors
  const COLORS = ['#2d6a4f', '#457b9d', '#1d3557', '#52b788', '#e0f2fe', '#a8dadc'];

  // Process data from context state in real time
  const statsSummary = useMemo(() => {
    const total = surveyResponses.length;
    if (total === 0) return { productData: [], storageData: [], awarenessData: [], welfarePct: 0, testedNoPct: 0, packagedPct: 0 };

    const counts = {
      product: {},
      storage: {},
      awareness: {},
      welfare: 0,
      testedNo: 0,
      packaged: 0
    };

    surveyResponses.forEach(res => {
      // 1. Products
      counts.product[res.product] = (counts.product[res.product] || 0) + 1;
      
      // 2. Storage
      counts.storage[res.storage] = (counts.storage[res.storage] || 0) + 1;
      
      // 3. Awareness
      counts.awareness[res.awareness] = (counts.awareness[res.awareness] || 0) + 1;
      
      // 4. Welfare agreement
      if (res.welfare?.includes("Agree") || res.welfare?.includes("Strongly Agree")) {
        counts.welfare += 1;
      }
      
      // 5. Never tested
      if (res.tested?.includes("No")) {
        counts.testedNo += 1;
      }
      
      // 6. Safe packaged preference
      if (res.product?.includes("Packaged")) {
        counts.packaged += 1;
      }
    });

    const productData = Object.entries(counts.product).map(([name, value]) => ({
      name: name.split(' (')[0], // trim descriptions for labels
      value
    }));

    const storageData = Object.entries(counts.storage).map(([name, value]) => ({
      name: name.substring(0, 20) + '...', // trim for layout
      value
    }));

    const awarenessData = Object.entries(counts.awareness).map(([name, value]) => ({
      name: name.split(',')[0],
      value
    }));

    return {
      productData,
      storageData,
      awarenessData,
      welfarePct: Math.round((counts.welfare / total) * 100),
      testedNoPct: Math.round((counts.testedNo / total) * 100),
      packagedPct: Math.round((counts.packaged / total) * 100)
    };
  }, [surveyResponses]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    submitSurveyResponse(localSubmission);
    setSubmittedMessage(true);
    setTimeout(() => {
      setSubmittedMessage(false);
      setShowForm(false);
      setLocalSubmission({
        q1: "", q2: "", q3: "", q4: "", q5: "", q6: "", q7: "", q8: "", q9: "", q10: ""
      });
    }, 2000);
  };

  return (
    <section id="dashboard" className="py-24 bg-dairy-cream-dark dark:bg-slate-900/50 transition-colors duration-300 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display font-black text-xs uppercase tracking-widest text-dairy-green-600 dark:text-dairy-green-400 mb-3">
            Impact Dashboard
          </h2>
          <h3 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-800 dark:text-white leading-tight">
            Survey Results & Public Beliefs
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mt-4 text-lg">
            Real-time visual stats computed dynamically from all responses. Watch the dashboard react instantly.
          </p>
        </div>

        {/* Live Status Counter Banner */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-white dark:bg-dairy-dark border border-slate-200/50 dark:border-white/5 rounded-3xl p-6 mb-12 shadow-sm">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-dairy-green-500/10 flex items-center justify-center text-dairy-green-600 dark:text-dairy-green-400">
              <Users className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-bold block">Current Sample Base</span>
              <span className="font-display font-black text-2xl text-slate-800 dark:text-white">{surveyResponses.length} Responses Compiled</span>
            </div>
          </div>
          
          <button 
            onClick={() => setShowForm(!showForm)}
            className="flex items-center space-x-2 bg-dairy-green-700 hover:bg-dairy-green-600 text-white font-bold px-6 py-3 rounded-2xl transition-all shadow-md hover:shadow-dairy-green-950/20 text-sm cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>Simulate Survey Submission</span>
          </button>
        </div>

        {/* Local Simulation Form Dropdown */}
        {showForm && (
          <div className="bg-white dark:bg-dairy-dark border border-slate-200/50 dark:border-white/5 rounded-3xl p-8 mb-12 shadow-lg animate-float-delayed">
            {submittedMessage ? (
              <div className="text-center py-10 flex flex-col items-center justify-center">
                <CheckCircle className="w-12 h-12 text-dairy-green-600 mb-3 animate-bounce" />
                <h4 className="font-display font-extrabold text-xl text-slate-800 dark:text-white">Response Added!</h4>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Recalculating statistics dashboard...</p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <h4 className="font-display font-extrabold text-lg text-slate-800 dark:text-white mb-4">Quick Survey Input</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-xs font-bold text-slate-500 block mb-2">{surveyQuestions[0].question}</label>
                    <select 
                      required
                      value={localSubmission.q1} 
                      onChange={e => setLocalSubmission(prev => ({ ...prev, q1: e.target.value }))}
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-dairy-green-500"
                    >
                      <option value="">Select Option</option>
                      {surveyQuestions[0].options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-500 block mb-2">{surveyQuestions[1].question}</label>
                    <select 
                      required
                      value={localSubmission.q2} 
                      onChange={e => setLocalSubmission(prev => ({ ...prev, q2: e.target.value }))}
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-dairy-green-500"
                    >
                      <option value="">Select Option</option>
                      {surveyQuestions[1].options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-500 block mb-2">{surveyQuestions[2].question}</label>
                    <select 
                      required
                      value={localSubmission.q3} 
                      onChange={e => setLocalSubmission(prev => ({ ...prev, q3: e.target.value }))}
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-dairy-green-500"
                    >
                      <option value="">Select Option</option>
                      {surveyQuestions[2].options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-500 block mb-2">{surveyQuestions[6].question}</label>
                    <select 
                      required
                      value={localSubmission.q7} 
                      onChange={e => setLocalSubmission(prev => ({ ...prev, q7: e.target.value }))}
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-dairy-green-500"
                    >
                      <option value="">Select Option</option>
                      {surveyQuestions[6].options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-500 block mb-2">{surveyQuestions[7].question}</label>
                    <select 
                      required
                      value={localSubmission.q8} 
                      onChange={e => setLocalSubmission(prev => ({ ...prev, q8: e.target.value }))}
                      className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-dairy-green-500"
                    >
                      <option value="">Select Option</option>
                      {surveyQuestions[7].options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3 pt-4 border-t border-slate-100 dark:border-white/5">
                  <button 
                    type="button" 
                    onClick={() => setShowForm(false)}
                    className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-white/5 text-slate-600 dark:text-slate-400 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 text-sm cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="px-6 py-2.5 bg-dairy-green-700 hover:bg-dairy-green-600 text-white font-bold rounded-xl shadow-md text-sm cursor-pointer"
                  >
                    Submit Response
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Interactive KPI Panel (What People Believe) */}
        <div id="beliefs" className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="glass-card dark:dark-glass-card border-slate-200/40 dark:border-white/5 rounded-3xl p-8 shadow-sm flex flex-col justify-between">
            <span className="text-xs font-black uppercase text-dairy-green-600 dark:text-dairy-green-400 tracking-wider">
              Safety Perception
            </span>
            <div className="my-6">
              <span className="font-display font-black text-5xl sm:text-6xl text-slate-800 dark:text-white">
                {statsSummary.packagedPct}%
              </span>
              <p className="text-slate-600 dark:text-slate-400 text-sm font-semibold mt-2">
                believe packaged pasteurized milk is safer than raw dairy.
              </p>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
              <div className="bg-dairy-green-700 h-full rounded-full transition-all duration-500" style={{ width: `${statsSummary.packagedPct}%` }} />
            </div>
          </div>

          <div className="glass-card dark:dark-glass-card border-slate-200/40 dark:border-white/5 rounded-3xl p-8 shadow-sm flex flex-col justify-between">
            <span className="text-xs font-black uppercase text-dairy-green-600 dark:text-dairy-green-400 tracking-wider">
              Testing Gaps
            </span>
            <div className="my-6">
              <span className="font-display font-black text-5xl sm:text-6xl text-slate-800 dark:text-white">
                {statsSummary.testedNoPct}%
              </span>
              <p className="text-slate-600 dark:text-slate-400 text-sm font-semibold mt-2">
                have never performed an adulteration test at home.
              </p>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
              <div className="bg-blue-600 h-full rounded-full transition-all duration-500" style={{ width: `${statsSummary.testedNoPct}%` }} />
            </div>
          </div>

          <div className="glass-card dark:dark-glass-card border-slate-200/40 dark:border-white/5 rounded-3xl p-8 shadow-sm flex flex-col justify-between">
            <span className="text-xs font-black uppercase text-dairy-green-600 dark:text-dairy-green-400 tracking-wider">
              Welfare Connection
            </span>
            <div className="my-6">
              <span className="font-display font-black text-5xl sm:text-6xl text-slate-800 dark:text-white">
                {statsSummary.welfarePct}%
              </span>
              <p className="text-slate-600 dark:text-slate-400 text-sm font-semibold mt-2">
                believe cow welfare directly impacts milk quality parameters.
              </p>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full rounded-full transition-all duration-500" style={{ width: `${statsSummary.welfarePct}%` }} />
            </div>
          </div>
        </div>

        {/* Recharts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Chart 1: Pie Chart - Consumption */}
          <div className="bg-white dark:bg-dairy-dark border border-slate-200/50 dark:border-white/5 rounded-3xl p-6 sm:p-8 shadow-sm">
            <h4 className="font-display font-extrabold text-lg text-slate-800 dark:text-white mb-6 flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-dairy-green-600" />
              <span>Most Consumed Dairy Product</span>
            </h4>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statsSummary.productData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {statsSummary.productData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      background: 'rgba(255, 255, 255, 0.95)',
                      borderRadius: '16px',
                      border: '0px',
                      boxShadow: 'var(--shadow-glass)'
                    }} 
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 2: Bar Chart - Adulteration Awareness */}
          <div className="bg-white dark:bg-dairy-dark border border-slate-200/50 dark:border-white/5 rounded-3xl p-6 sm:p-8 shadow-sm">
            <h4 className="font-display font-extrabold text-lg text-slate-800 dark:text-white mb-6 flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              <span>Awareness of Chemical Adulteration</span>
            </h4>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={statsSummary.awarenessData}>
                  <XAxis dataKey="name" stroke="#888888" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis stroke="#888888" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip
                    cursor={{ fill: 'rgba(0,0,0,0.03)' }}
                    contentStyle={{ 
                      background: 'rgba(255, 255, 255, 0.95)',
                      borderRadius: '16px',
                      border: '0px',
                      boxShadow: 'var(--shadow-glass)'
                    }}
                  />
                  <Bar dataKey="value" radius={[10, 10, 0, 0]}>
                    {statsSummary.awarenessData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Dashboard;
