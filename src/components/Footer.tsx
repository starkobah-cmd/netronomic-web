import React from 'react';
import { Sparkles, Heart, MessageSquare, ArrowUpRight, Mail, Phone, MapPin, Lock } from 'lucide-react';
import { agencyInfo, servicesData } from '../data/agencyData';
import { Logo } from './Logo';
import { SiteConfig } from '../data/siteConfig';
import { BlogViewMode } from '../types';

interface FooterProps {
  onOpenQuote: (serviceTitle?: string) => void;
  onNavigate?: (view: BlogViewMode) => void;
  siteConfig?: SiteConfig;
}

export const Footer: React.FC<FooterProps> = ({ onOpenQuote, onNavigate, siteConfig }) => {
  const activeAgency = siteConfig?.agency || agencyInfo;

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Logo variant="dark" size="md" showTagline={true} config={siteConfig?.logo} />

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Full-service digital agency providing high-impact Website Design, Mobile Apps, Logo & Poster Design, Reel Video Editing, SEO, Profile & Social Backlinks.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <a
                href={`https://wa.me/${activeAgency.whatsappNumber}?text=Hi%20${encodeURIComponent(activeAgency.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold hover:bg-emerald-500/20 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp Live Chat</span>
              </a>
            </div>
          </div>

          {/* Col 2: Services List */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Our 9 Services</h4>
            <ul className="space-y-2 text-xs">
              {servicesData.map((s) => (
                <li key={s.id}>
                  <button
                    onClick={() => onOpenQuote(s.title)}
                    className="hover:text-sky-400 transition-colors text-left cursor-pointer"
                  >
                    {s.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Quick Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Quick Links</h4>
            <ul className="space-y-2 text-xs">
              <li><button onClick={() => onNavigate && onNavigate('blog-list')} className="text-sky-400 font-bold hover:underline flex items-center gap-1 cursor-pointer"><span>★ Blog & Articles</span></button></li>
              <li><a href="#services" className="hover:text-sky-400 transition-colors">Our Services</a></li>
              <li><a href="#about" className="hover:text-sky-400 transition-colors">About Us</a></li>
              <li><a href="#why-us" className="hover:text-sky-400 transition-colors">Why Choose Us</a></li>
              <li><a href="#process" className="hover:text-sky-400 transition-colors">Our 6-Step Process</a></li>
              <li><a href="#portfolio" className="hover:text-sky-400 transition-colors">Portfolio Showcase</a></li>
              <li><a href="#pricing" className="hover:text-sky-400 transition-colors">Pricing Packages</a></li>
              <li><a href="#testimonials" className="hover:text-sky-400 transition-colors">Testimonials</a></li>
              <li><a href="#faq" className="hover:text-sky-400 transition-colors">FAQ</a></li>
              <li><a href="#contact" className="hover:text-sky-400 transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Col 4: Direct Contact Info */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Contact Info</h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                <span>{activeAgency.email}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-sky-400 shrink-0" />
                <span>{activeAgency.phone}</span>
              </p>
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span>{activeAgency.address}</span>
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} {activeAgency.name}. Sky Blue & White Professional Studio.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-sky-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-sky-400 transition-colors">Terms of Service</a>
            <a href="#contact" className="hover:text-sky-400 transition-colors">Support</a>
            <button
              onClick={() => onNavigate && onNavigate('site-admin')}
              className="hover:text-sky-400 text-slate-400 font-semibold transition-colors flex items-center gap-1 cursor-pointer"
              title="Admin CMS Login"
            >
              <Lock className="w-3 h-3 text-sky-400" />
              <span>Admin Portal</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
