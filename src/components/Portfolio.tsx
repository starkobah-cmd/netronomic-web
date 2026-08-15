import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Tag, Sparkles, Filter, Eye } from 'lucide-react';
import { portfolioData } from '../data/agencyData';
import { PortfolioItem, PortfolioCategory } from '../types';

interface PortfolioProps {
  onSelectPortfolio: (item: PortfolioItem) => void;
}

export const Portfolio: React.FC<PortfolioProps> = ({ onSelectPortfolio }) => {
  const [activeCategory, setActiveCategory] = useState<PortfolioCategory>('all');

  const categories: { id: PortfolioCategory; label: string }[] = [
    { id: 'all', label: 'All Projects' },
    { id: 'websites', label: 'Websites' },
    { id: 'logos', label: 'Logos' },
    { id: 'posters', label: 'Posters' },
    { id: 'apps', label: 'Apps' },
    { id: 'video', label: 'Video Editing' },
  ];

  const filteredItems = activeCategory === 'all'
    ? portfolioData
    : portfolioData.filter((item) => item.category === activeCategory);

  return (
    <section id="portfolio" className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-xs font-bold uppercase tracking-wider">
            <span>6. Portfolio</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Our Featured Work Across <span className="text-sky-600">5 Creative Domains</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Explore live samples of custom Websites, Logos, Posters, Mobile Apps, and Information Reel Editing crafted for global brands.
          </p>
        </div>

        {/* Portfolio Tabs (5 categories + All) */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-sky-500 text-white shadow-md shadow-sky-500/25'
                  : 'bg-slate-100 text-slate-700 hover:bg-sky-50 hover:text-sky-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl border border-sky-100 overflow-hidden shadow-sm hover:shadow-xl hover:border-sky-300 transition-all group flex flex-col justify-between"
              >
                <div>
                  {/* Image Container with hover overlay */}
                  <div className="relative h-52 overflow-hidden bg-slate-100">
                    <img
                      src={item.image}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                      <button
                        onClick={() => onSelectPortfolio(item)}
                        className="px-4 py-2 rounded-xl bg-white text-slate-900 text-xs font-bold shadow-lg hover:bg-sky-50 flex items-center gap-1.5 cursor-pointer"
                      >
                        <Eye className="w-4 h-4 text-sky-600" />
                        <span>Preview Details</span>
                      </button>
                    </div>

                    <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-slate-900 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg border border-slate-200">
                      {item.categoryLabel}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-3">
                    <div className="flex items-center justify-between text-xs text-sky-600 font-semibold">
                      <span>Client: {item.client}</span>
                      {item.stats && (
                        <span className="bg-sky-50 px-2 py-0.5 rounded text-sky-700 font-bold">
                          {item.stats}
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Footer Tags */}
                <div className="px-6 pb-6 pt-2 border-t border-slate-50 flex flex-wrap gap-1.5">
                  {item.tags.map((t, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-600"
                    >
                      #{t}
                    </span>
                  ))}
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
};
