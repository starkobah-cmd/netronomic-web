import React, { useId } from 'react';
import { SiteLogoConfig } from '../data/siteConfig';

interface LogoProps {
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  className?: string;
  config?: Partial<SiteLogoConfig>;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'light',
  size = 'md',
  showTagline: showTaglineProp = true,
  className = '',
  config,
}) => {
  const uid = useId().replace(/:/g, '');

  const brandName = config?.brandName || 'NETRONOMIC';
  const taglineText = config?.taglineText || 'WEB AGENCY';
  const showTagline = config?.showTagline !== undefined ? config.showTagline : showTaglineProp;
  const showDot = config?.showDot !== undefined ? config.showDot : true;
  const customLogoUrl = config?.customLogoUrl || '';
  const iconVariant = config?.iconVariant || (customLogoUrl ? 'custom-image' : 'network-orb');

  const iconSizes = {
    sm: 'w-7 h-7 sm:w-8 sm:h-8',
    md: 'w-9 h-9 sm:w-10 sm:h-10',
    lg: 'w-11 h-11 sm:w-13 sm:h-13',
  };

  const textSizes = {
    sm: 'text-base sm:text-lg',
    md: 'text-lg sm:text-xl font-black',
    lg: 'text-2xl sm:text-3xl font-black',
  };

  const taglineSizes = {
    sm: 'text-[9px] tracking-[0.2em]',
    md: 'text-[10px] sm:text-[11px] tracking-[0.25em]',
    lg: 'text-[11px] sm:text-[12px] tracking-[0.28em]',
  };

  const isDark = variant === 'dark';

  return (
    <div className={`inline-flex items-center gap-2.5 sm:gap-3 select-none group/logo ${className}`}>
      {/* Icon (Custom Image or Vector Orb) */}
      <div className={`relative ${iconSizes[size]} shrink-0 flex items-center justify-center`}>
        {/* Soft Background Glow */}
        <div className="absolute inset-0 rounded-full bg-sky-400/10 blur-sm group-hover/logo:bg-sky-400/25 group-hover/logo:scale-110 transition-all duration-300" />
        
        {iconVariant === 'custom-image' && customLogoUrl ? (
          <img
            src={customLogoUrl}
            alt={brandName}
            className="w-full h-full object-contain relative z-10 drop-shadow-xs group-hover/logo:scale-105 transition-transform duration-300"
          />
        ) : (
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full relative z-10 drop-shadow-[0_2px_6px_rgba(2,132,199,0.2)] transform group-hover/logo:scale-105 transition-transform duration-300"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id={`orbGradCore_${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="50%" stopColor="#0284c7" />
                <stop offset="100%" stopColor="#0369a1" />
              </linearGradient>
              <linearGradient id={`ringGradGlow_${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="50%" stopColor="#0284c7" />
                <stop offset="100%" stopColor="#0369a1" />
              </linearGradient>
              <filter id={`softGlow_${uid}`} x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="1.5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Outer Orbital Ring (Back) */}
            <ellipse
              cx="50"
              cy="50"
              rx="43"
              ry="17"
              transform="rotate(-30 50 50)"
              stroke={`url(#ringGradGlow_${uid})`}
              strokeWidth="2.5"
              strokeDasharray="50 110"
              opacity="0.5"
            />

            {/* Geodesic Inner Grid Sphere */}
            <g filter={`url(#softGlow_${uid})`}>
              <circle cx="50" cy="50" r="28" stroke={`url(#orbGradCore_${uid})`} strokeWidth="2" fill="none" opacity="0.35" />
              <ellipse cx="50" cy="50" rx="28" ry="12" stroke="#0284c7" strokeWidth="1.2" fill="none" opacity="0.75" />
              <ellipse cx="50" cy="50" rx="12" ry="28" stroke="#0284c7" strokeWidth="1.2" fill="none" opacity="0.75" />
              
              {/* Diagonal Network Links */}
              <line x1="30" y1="34" x2="70" y2="66" stroke="#38bdf8" strokeWidth="1.4" />
              <line x1="70" y1="34" x2="30" y2="66" stroke="#38bdf8" strokeWidth="1.4" />
              <line x1="50" y1="22" x2="50" y2="78" stroke="#0284c7" strokeWidth="1.2" />
              <line x1="22" y1="50" x2="78" y2="50" stroke="#0284c7" strokeWidth="1.2" />
            </g>

            {/* Outer Orbital Ring (Front) */}
            <ellipse
              cx="50"
              cy="50"
              rx="45"
              ry="18"
              transform="rotate(-30 50 50)"
              stroke={`url(#ringGradGlow_${uid})`}
              strokeWidth="3"
              fill="none"
            />

            {/* Sharp Core Nodes */}
            <g fill="#38bdf8">
              <circle cx="50" cy="22" r="3" fill="#0284c7" />
              <circle cx="50" cy="78" r="3" fill="#0284c7" />
              <circle cx="22" cy="50" r="3" fill="#0284c7" />
              <circle cx="78" cy="50" r="3" fill="#0284c7" />
              <circle cx="30" cy="34" r="3.5" fill="#38bdf8" />
              <circle cx="70" cy="34" r="3.5" fill="#38bdf8" />
              <circle cx="30" cy="66" r="3.5" fill="#38bdf8" />
              <circle cx="70" cy="66" r="3.5" fill="#38bdf8" />
              <circle cx="50" cy="50" r="4.5" fill="#ffffff" stroke="#0284c7" strokeWidth="1.5" />
            </g>
          </svg>
        )}
      </div>

      {/* Brand Text & Agency Styling */}
      <div className="flex flex-col justify-center leading-none">
        <div className="flex items-center gap-1">
          <span
            className={`font-extrabold tracking-tight uppercase ${textSizes[size]} ${
              isDark ? 'text-white' : 'text-slate-900 group-hover/logo:text-sky-600 transition-colors duration-200'
            }`}
          >
            {brandName}
            {showDot && <span className="text-sky-500">.</span>}
          </span>
        </div>

        {showTagline && taglineText && (
          <div className="flex items-center gap-1.5 mt-0.5 sm:mt-1">
            <span
              className={`uppercase font-bold text-sky-600 ${taglineSizes[size]}`}
            >
              {taglineText}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

