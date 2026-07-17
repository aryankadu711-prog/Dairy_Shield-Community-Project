import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { BookOpen, Calendar, User, ArrowRight, X } from 'lucide-react';

const Learn = () => {
  const { articles } = useContext(AppContext);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [readingArticle, setReadingArticle] = useState(null);

  const categories = ['All', 'Milk Safety', 'Animal Welfare', 'Food Quality', 'Healthy Dairy Practices'];

  const filteredArticles = selectedCategory === 'All'
    ? articles
    : articles.filter(art => art.category === selectedCategory);

  return (
    <section id="learn" className="py-24 bg-dairy-cream dark:bg-dairy-dark transition-colors duration-300 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display font-black text-xs uppercase tracking-widest text-dairy-green-600 dark:text-dairy-green-400 mb-3">
            Education Center
          </h2>
          <h3 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-800 dark:text-white leading-tight">
            Safety & Advocacy Articles
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mt-4 text-lg">
            Browse our research articles, government standards (FSSAI), and guidelines (WHO) written by micro-biologists and food safety lawyers.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2.5 rounded-full font-bold text-xs tracking-wide transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-dairy-green-700 text-white shadow-md'
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredArticles.map((art) => (
            <div 
              key={art.id}
              className="bg-white dark:bg-dairy-dark/65 border border-slate-200/50 dark:border-white/5 rounded-3xl p-8 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Meta details */}
                <div className="flex items-center space-x-3 text-xs font-bold text-slate-400 mb-4">
                  <span className="px-2.5 py-1 bg-dairy-green-50 dark:bg-dairy-green-950/40 text-dairy-green-700 dark:text-dairy-green-300 rounded-lg">
                    {art.category}
                  </span>
                  <span>•</span>
                  <span>{art.readTime}</span>
                </div>

                {/* Title */}
                <h4 className="font-display font-black text-xl text-slate-800 dark:text-white mb-3 hover:text-dairy-green-700 cursor-pointer" onClick={() => setReadingArticle(art)}>
                  {art.title}
                </h4>

                {/* Summary */}
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6 line-clamp-3">
                  {art.summary}
                </p>
              </div>

              {/* Author & CTA */}
              <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-white/5">
                <div className="flex items-center space-x-2.5">
                  <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-bold">Written By</span>
                    <span className="text-xs text-slate-700 dark:text-slate-300 font-semibold">{art.author || 'Contributor'}</span>
                  </div>
                </div>

                <button
                  onClick={() => setReadingArticle(art)}
                  className="flex items-center space-x-1.5 text-xs font-black uppercase text-dairy-green-700 dark:text-dairy-green-400 hover:text-dairy-green-600 transition-colors cursor-pointer"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Full Article Reader Lightbox */}
      {readingArticle && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setReadingArticle(null)}>
          <div 
            className="bg-white dark:bg-dairy-dark rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl relative border border-slate-100 dark:border-white/5"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Control */}
            <button
              onClick={() => setReadingArticle(null)}
              className="absolute top-6 right-6 p-2 bg-slate-100 dark:bg-slate-800 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 transition-colors cursor-pointer"
            >
              ✕
            </button>

            {/* Content Header */}
            <div className="mb-6">
              <span className="inline-block px-3 py-1 bg-dairy-green-50 dark:bg-dairy-green-950/40 text-dairy-green-700 dark:text-dairy-green-300 text-xs font-black uppercase tracking-wider rounded-lg mb-3">
                {readingArticle.category}
              </span>
              
              <h3 className="font-display font-black text-2xl sm:text-3xl text-slate-800 dark:text-white leading-tight">
                {readingArticle.title}
              </h3>
              
              <div className="flex items-center space-x-4 text-xs font-bold text-slate-400 mt-4">
                <span className="flex items-center space-x-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{readingArticle.date}</span>
                </span>
                <span>•</span>
                <span>{readingArticle.readTime}</span>
              </div>
            </div>

            {/* Styled Article Body (Processes simple markdown or prints paragraphs) */}
            <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-350 text-sm sm:text-base leading-relaxed space-y-4 border-t border-slate-100 dark:border-white/5 pt-6">
              {readingArticle.content.split('\n\n').map((paragraph, index) => {
                if (paragraph.startsWith('### ')) {
                  return <h4 key={index} className="font-display font-extrabold text-lg text-slate-800 dark:text-white mt-6 mb-2">{paragraph.replace('### ', '')}</h4>;
                }
                if (paragraph.startsWith('* ')) {
                  return (
                    <ul key={index} className="list-disc pl-5 space-y-1 my-2">
                      {paragraph.split('\n').map((li, idx) => (
                        <li key={idx}>{li.replace('* ', '')}</li>
                      ))}
                    </ul>
                  );
                }
                if (paragraph.match(/^\d+\./)) {
                  return (
                    <ol key={index} className="list-decimal pl-5 space-y-1 my-2">
                      {paragraph.split('\n').map((li, idx) => (
                        <li key={idx}>{li.replace(/^\d+\.\s*/, '')}</li>
                      ))}
                    </ol>
                  );
                }
                return <p key={index}>{paragraph}</p>;
              })}
            </div>

            {/* Author Footer */}
            <div className="bg-slate-50 dark:bg-slate-900/40 rounded-2xl p-4 mt-8 flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400">
                <User className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block uppercase font-bold">Author Bio</span>
                <span className="text-sm font-bold text-slate-800 dark:text-white">{readingArticle.author || 'DairyShield Panel'}</span>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setReadingArticle(null)}
              className="w-full mt-8 py-3 bg-dairy-green-700 hover:bg-dairy-green-600 text-white font-bold rounded-2xl shadow-lg transition-colors cursor-pointer text-sm"
            >
              Close Article
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Learn;
