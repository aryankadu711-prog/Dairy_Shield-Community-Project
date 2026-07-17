import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { ZoomIn, ChevronLeft, ChevronRight, X, Image as ImageIcon } from 'lucide-react';

const Gallery = () => {
  const { gallery } = useContext(AppContext);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const filters = [
    'All',
    'Awareness Campaigns',
    'Community Visits',
    'Helping Dairy Farmers',
    'Survey Collection',
    'Animal Care',
    'Education Sessions'
  ];

  const filteredImages = selectedFilter === 'All' 
    ? gallery 
    : gallery.filter(img => img.category === selectedFilter);

  const handlePrev = (e) => {
    e.stopPropagation();
    setLightboxIndex(prev => (prev === 0 ? filteredImages.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setLightboxIndex(prev => (prev === filteredImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="gallery" className="py-24 bg-dairy-cream dark:bg-dairy-dark transition-colors duration-300 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display font-black text-xs uppercase tracking-widest text-dairy-green-600 dark:text-dairy-green-400 mb-3">
            Visual Impact
          </h2>
          <h3 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-800 dark:text-white leading-tight">
            Our Action Gallery
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mt-4 text-lg">
            A visual capture of our field visits, farmer audits, testing booths, and public education campaigns.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setSelectedFilter(f)}
              className={`px-4 py-2.5 rounded-full font-bold text-xs tracking-wide transition-all cursor-pointer ${
                selectedFilter === f
                  ? 'bg-dairy-green-700 text-white shadow-md'
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Masonry Layout Grid */}
        {filteredImages.length === 0 ? (
          <div className="text-center py-20 bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-dashed border-slate-200 dark:border-white/5">
            <ImageIcon className="w-12 h-12 mx-auto text-slate-400 mb-3" />
            <p className="text-slate-500 dark:text-slate-400 font-semibold">No images in this category yet.</p>
          </div>
        ) : (
          <div className="gallery-masonry">
            {filteredImages.map((img, idx) => (
              <div
                key={img.id}
                onClick={() => setLightboxIndex(idx)}
                className="gallery-masonry-item relative rounded-3xl overflow-hidden group shadow-sm hover:shadow-xl cursor-zoom-in transition-all duration-300 border border-slate-200/50 dark:border-white/5"
              >
                <img
                  src={img.src}
                  alt={img.title}
                  loading="lazy"
                  className="w-full h-full object-cover max-h-[400px] min-h-[220px] transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <span className="text-[10px] font-black text-dairy-green-300 uppercase tracking-widest mb-1">
                    {img.category}
                  </span>
                  
                  <h4 className="text-white font-display font-extrabold text-base sm:text-lg mb-1 leading-snug">
                    {img.title}
                  </h4>
                  
                  <p className="text-slate-200 text-xs line-clamp-2 leading-relaxed">
                    {img.description}
                  </p>
                  
                  <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
                    <ZoomIn className="w-5 h-5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between p-4"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Lightbox Top Control bar */}
          <div className="flex justify-between items-center py-2 px-4 z-10">
            <span className="text-slate-400 font-bold text-xs tracking-wider uppercase">
              {lightboxIndex + 1} / {filteredImages.length}
            </span>
            <button
              onClick={() => setLightboxIndex(null)}
              className="p-2.5 bg-white/10 rounded-full border border-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Lightbox Center: Image and Controls */}
          <div className="flex-grow flex items-center justify-center relative my-4">
            <button
              onClick={handlePrev}
              className="absolute left-2 sm:left-6 p-3 bg-white/10 rounded-full border border-white/10 text-white hover:bg-white/20 transition-colors z-10 cursor-pointer"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <img
              src={filteredImages[lightboxIndex].src}
              alt={filteredImages[lightboxIndex].title}
              className="max-w-[90vw] max-h-[70vh] object-contain rounded-xl select-none"
              onClick={(e) => e.stopPropagation()}
            />

            <button
              onClick={handleNext}
              className="absolute right-2 sm:right-6 p-3 bg-white/10 rounded-full border border-white/10 text-white hover:bg-white/20 transition-colors z-10 cursor-pointer"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Lightbox Bottom Description */}
          <div 
            className="w-full max-w-4xl mx-auto text-center px-4 py-6 z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="text-xs font-black uppercase text-dairy-green-400 tracking-wider">
              {filteredImages[lightboxIndex].category}
            </span>
            <h4 className="font-display font-black text-xl sm:text-2xl text-white mt-1 mb-2">
              {filteredImages[lightboxIndex].title}
            </h4>
            <p className="text-slate-300 text-sm max-w-2xl mx-auto leading-relaxed">
              {filteredImages[lightboxIndex].description}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
