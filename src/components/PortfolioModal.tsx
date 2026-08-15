import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Tag, CheckCircle2, MessageSquare } from 'lucide-react';
import { PortfolioItem } from '../types';
import { agencyInfo } from '../data/agencyData';

interface PortfolioModalProps {
  item: PortfolioItem | null;
  onClose: () => void;
  onRequestSimilar: (categoryTitle: string) => void;
}

export const PortfolioModal: React.FC<PortfolioModalProps> = ({ item, onClose, onRequestSimilar }) => {
  if (!item) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 relative shadow-2xl overflow-hidden border border-sky-100 max-h-[90vh] overflow-y-auto"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 z-10 p-2 rounded-full bg-slate-900/40 text-white hover:bg-slate-900 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Banner image */}
          <div className="relative h-64 -mx-6 sm:-mx-8 -mt-6 sm:-mt-8 mb-6 overflow-hidden bg-slate-100">
            <img
              src={item.image}
              alt={item.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent flex items-end p-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider bg-sky-500 text-white px-2.5 py-0.5 rounded-full mb-2 inline-block">
                  {item.categoryLabel}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">{item.title}</h2>
              </div>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-semibold text-slate-600 bg-sky-50 p-3 rounded-xl border border-sky-100">
              <span>Client: <strong className="text-slate-900">{item.client}</strong></span>
              {item.stats && <span>Outcome: <strong className="text-sky-700 font-bold">{item.stats}</strong></span>}
            </div>

            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              {item.description}
            </p>

            <div className="flex flex-wrap gap-1.5 pt-2">
              {item.tags.map((t, i) => (
                <span key={i} className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700">
                  #{t}
                </span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-slate-100">
            <button
              onClick={() => {
                onClose();
                onRequestSimilar(item.categoryLabel);
              }}
              className="w-full sm:flex-1 py-3 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-sm shadow-md transition-colors cursor-pointer"
            >
              Order Similar {item.categoryLabel} Project
            </button>

            <a
              href={`https://wa.me/${agencyInfo.whatsappNumber}?text=${encodeURIComponent(`Hi Skyline Digital, I saw your portfolio item "${item.title}" and would like to build a similar project.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm transition-colors flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Ask on WhatsApp</span>
            </a>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
