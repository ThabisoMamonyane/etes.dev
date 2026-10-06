import React, { useState } from 'react';
import logoImg from '../../images/logo-1.png';
import { ShieldCheck } from 'lucide-react';

interface EtesLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'dark' | 'light' | 'gold';
  showSubtitle?: boolean;
  roomLabel?: string;
  tagline?: string;
  align?: 'left' | 'center';
  className?: string;
}

const DEFAULT_ROOM_TAGLINES: Record<string, string> = {
  'THRIVE COMMUNITY ROOM': 'PEOPLE. CONNECTION. OPPORTUNITY.',
  'THRIVE COMMUNITY': 'PEOPLE. CONNECTION. OPPORTUNITY.',
  'COMMUNITY': 'PEOPLE. CONNECTION. OPPORTUNITY.',
  'CONTRACTOR / FREELANCER ROOM': 'INDEPENDENT TODAY. GREATER TOMORROW',
  'CONTRACTOR ROOM': 'INDEPENDENT TODAY. GREATER TOMORROW',
  'CONTRACTOR': 'INDEPENDENT TODAY. GREATER TOMORROW',
  "CEO & DIRECTOR'S INTELLIGENCE ROOM": 'PEOPLE INSIGHTS. STRONGER DECISIONS.',
  'EXECUTIVE ROOM': 'PEOPLE INSIGHTS. STRONGER DECISIONS.',
  'EXECUTIVE': 'PEOPLE INSIGHTS. STRONGER DECISIONS.',
  'EMPLOYEE ROOM': 'YOUR JOURNEY. YOUR TRUST',
  'EMPLOYEE': 'YOUR JOURNEY. YOUR TRUST',
  'INVESTOR ROOM': 'TRUSTED FOUNDATIONS. A BRIGHTER FUTURE.',
  'INVESTOR': 'TRUSTED FOUNDATIONS. A BRIGHTER FUTURE.',
  'ADMIN ROOM': 'SECURITY. OVERSIGHT. INTEGRITY.',
  'ADMIN CONTROL ROOM': 'SECURITY. OVERSIGHT. INTEGRITY.',
  'ADMIN': 'SECURITY. OVERSIGHT. INTEGRITY.',
};

export const EtesLogo: React.FC<EtesLogoProps> = ({
  size = 'md',
  variant = 'light',
  showSubtitle = true,
  roomLabel,
  tagline,
  align,
  className
}) => {
  const sizeMap: Record<string, { emblem: number; title: string; sub: string }> = {
    xs: { emblem: 39, title: 'text-lg', sub: 'text-[9.5px]' },
    sm: { emblem: 52, title: 'text-xl sm:text-2xl', sub: 'text-[10.5px]' },
    md: { emblem: 65, title: 'text-[28px] sm:text-[32px]', sub: 'text-[10px] sm:text-[11px] md:text-[12.5px]' },
    lg: { emblem: 86, title: 'text-[36px] sm:text-[42px]', sub: 'text-[13px] sm:text-[14px]' },
    xl: { emblem: 115, title: 'text-[48px] sm:text-[56px]', sub: 'text-[15px] sm:text-[16px]' }
  };

  const { emblem, title, sub } = sizeMap[size] || sizeMap.md;

  const textColor = variant === 'dark' ? 'text-[#0B111E]' : 'text-white';
  const subColor = variant === 'dark' ? 'text-[#8C6B28]' : 'text-[#DFB76C]';

  const [imgFailed, setImgFailed] = useState(false);

  // If a room label is specified (e.g. in internal dashboard rooms):
  // Top Row: Logo emblem + words ETES side-by-side
  // Middle: Title of the dashboard positioned beneath both the Logo and ETES words
  // Bottom: Dashboard unique motto / tagline in white full caps
  if (roomLabel) {
    const roomEmblemHeight = size === 'xs' ? 26 : size === 'sm' ? 36 : Math.round(emblem * 0.7);
    const normalizedKey = (roomLabel || '').toUpperCase().trim();
    const defaultTagline = DEFAULT_ROOM_TAGLINES[normalizedKey] || 'PEOPLE. CONNECTION. OPPORTUNITY.';
    const resolvedTagline = tagline !== undefined ? tagline : defaultTagline;
    const isCenter = align ? align === 'center' : size !== 'xs';

    return (
      <div 
        className={`flex flex-col ${isCenter ? 'items-center justify-center text-center' : 'items-start text-left'} select-none w-full ${className || ''}`} 
        id="etes-brand-header"
      >
        {/* Top Row: Official ETES Emblem + ETES Wordmark */}
        <div className={`flex items-center ${isCenter ? 'justify-center' : 'justify-start'} gap-2.5 w-full`}>
          {!imgFailed ? (
            <img
              src={logoImg}
              alt="ETES Logo"
              style={{ height: `${roomEmblemHeight}px`, width: 'auto' }}
              className="shrink-0 object-contain transition-transform duration-300 hover:scale-105"
              onError={() => setImgFailed(true)}
            />
          ) : (
            <div 
              style={{ height: `${roomEmblemHeight}px`, width: `${roomEmblemHeight}px` }} 
              className="rounded-lg bg-gradient-to-br from-[#C5A059] to-[#8C6B28] flex items-center justify-center text-white shadow-md shrink-0"
            >
              <ShieldCheck style={{ height: `${Math.round(roomEmblemHeight * 0.6)}px`, width: `${Math.round(roomEmblemHeight * 0.6)}px` }} />
            </div>
          )}
          <span className={`font-logo-serif font-bold tracking-[0.08em] ${title} ${textColor} leading-none drop-shadow-sm`}>
            ETES
          </span>
        </div>

        {/* Title of the dashboard positioned beneath both the Logo and ETES words */}
        <div className={`mt-2.5 w-full ${isCenter ? 'text-center' : 'text-left'}`}>
          <span className={`text-[10px] sm:text-[10.5px] uppercase font-mono-code font-bold tracking-wider ${subColor} leading-tight block ${isCenter ? 'text-center' : 'text-left'}`}>
            {roomLabel}
          </span>
        </div>

        {/* Tagline positioned below with padding, in white and full caps */}
        {resolvedTagline && size !== 'xs' && (
          <div className={`mt-2 pb-1 w-full ${isCenter ? 'text-center' : 'text-left'}`}>
            <span className={`text-[9px] sm:text-[9.5px] uppercase font-mono-code font-bold tracking-widest ${
              variant === 'dark' ? 'text-[#0B111E]' : 'text-white'
            } leading-tight block ${isCenter ? 'text-center' : 'text-left'} drop-shadow-xs`}>
              {resolvedTagline}
            </span>
          </div>
        )}
      </div>
    );
  }

  // Institutional Brand Lockup:
  // Top: Logo emblem + ETES words in classical serif font (white)
  // Bottom: Gold subtitle positioned below BOTH the logo and the ETES words
  return (
    <div className={`flex flex-col items-start select-none ${className || ''}`} id="etes-brand-header">
      {/* Top Row: Official ETES Emblem + ETES Wordmark in White Serif Font */}
      <div className="flex items-center gap-2.5">
        {!imgFailed ? (
          <img
            src={logoImg}
            alt="ETES Logo"
            style={{ height: `${emblem}px`, width: 'auto' }}
            className="shrink-0 object-contain transition-transform duration-300 hover:scale-105"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <div 
            style={{ height: `${emblem}px`, width: `${emblem}px` }} 
            className="rounded-lg bg-gradient-to-br from-[#C5A059] to-[#8C6B28] flex items-center justify-center text-white shadow-md shrink-0"
          >
            <ShieldCheck style={{ height: `${Math.round(emblem * 0.6)}px`, width: `${Math.round(emblem * 0.6)}px` }} />
          </div>
        )}

        <span className={`font-logo-serif font-bold tracking-[0.08em] ${title} ${textColor} leading-none drop-shadow-sm`}>
          ETES
        </span>
      </div>

      {/* Gold subtitle strictly positioned below both the emblem and the ETES words */}
      {showSubtitle && (
        <span className={`tracking-[0.13em] uppercase font-semibold ${sub} ${subColor} leading-tight mt-1.5 whitespace-nowrap block`}>
          EMPLOYMENT TRUST & EMPOWERMENT SOLUTIONS
        </span>
      )}
    </div>
  );
};
