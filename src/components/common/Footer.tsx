import React from 'react';
import { EtesLogo } from './EtesLogo';
import { useTheme } from '../../context/ThemeContext';
import { ShieldCheck, Lock, ExternalLink, Scale, FileText, Globe } from 'lucide-react';

interface FooterProps {
  onNavigateTab?: (tab: string) => void;
  onSelectTab?: (tab: string) => void;
  onSelectRole?: (role: any, scope?: any) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateTab, onSelectTab }) => {
  const { isDark } = useTheme();
  const handleTab = onNavigateTab || onSelectTab || (() => {});
  return (
    <footer className={`border-t pt-12 pb-8 text-xs relative z-10 transition-colors duration-200 ${
      isDark ? 'bg-[#070B13] text-stone-300 border-stone-800' : 'bg-[#F2ECE3] text-stone-700 border-[#E2DDD5]'
    }`} id="etes-institutional-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b ${
          isDark ? 'border-stone-800/80' : 'border-[#E0D9CE]'
        }`}>
          
          {/* Col 1: Brand & Institutional Identity */}
          <div className="lg:col-span-2 space-y-4">
            <EtesLogo size="md" variant={isDark ? 'light' : 'dark'} showSubtitle={true} />
            <p className={`text-xs leading-relaxed max-w-sm ${isDark ? 'text-stone-400' : 'text-stone-600'}`}>
              Employment Trust & Empowerment Solutions (ETES) is the institutional authority 
              measuring workplace trust, uncovering actionable intelligence, and advancing systemic organisational health.
            </p>
            <div className={`flex flex-col gap-1 text-[11px] font-mono-code ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
              <span className={isDark ? 'text-[#DFB76C]' : 'text-[#8C6B28] font-semibold'}>Reg. No. 2026/669815/07 • South Africa</span>
              <span>Document ID: ETES-DHQ-DEV-IMP-01 • Version 1.0</span>
              <span>Deep Institution. Simple Experience.</span>
            </div>
          </div>

          {/* Col 2: Institutional Architecture */}
          <div className="space-y-3">
            <h4 className={`font-semibold tracking-wider uppercase font-mono-code text-xs ${
              isDark ? 'text-[#DFB76C]' : 'text-[#8C6B28]'
            }`}>
              Ecosystem
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button 
                  onClick={() => handleTab('workplace-trust')}
                  className={`transition-colors text-left ${isDark ? 'hover:text-white' : 'hover:text-stone-950'}`}
                >
                  Workplace Trust Assessment™
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleTab('workplace-trust')}
                  className={`transition-colors text-left ${isDark ? 'hover:text-white' : 'hover:text-stone-950'}`}
                >
                  Workplace DNA Profile™
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleTab('workplace-trust')}
                  className={`transition-colors text-left ${isDark ? 'hover:text-white' : 'hover:text-stone-950'}`}
                >
                  Trust Signals™ Framework
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleTab('directory')}
                  className={`transition-colors text-left ${isDark ? 'hover:text-white' : 'hover:text-stone-950'}`}
                >
                  National Trust Directory
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleTab('constitution')}
                  className={`transition-colors text-left font-medium ${isDark ? 'text-[#C5A059] hover:text-white' : 'text-[#8C6B28] hover:text-stone-950'}`}
                >
                  Founding Constitution (Reader)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Knowledge & Research */}
          <div className="space-y-3">
            <h4 className={`font-semibold tracking-wider uppercase font-mono-code text-xs ${
              isDark ? 'text-[#DFB76C]' : 'text-[#8C6B28]'
            }`}>
              Research & Standards
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button 
                  onClick={() => handleTab('research')}
                  className={`transition-colors text-left ${isDark ? 'hover:text-white' : 'hover:text-stone-950'}`}
                >
                  State of Workplace Trust™ 2026
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleTab('research')}
                  className={`transition-colors text-left ${isDark ? 'hover:text-white' : 'hover:text-stone-950'}`}
                >
                  Founding Question Bank V1.0
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleTab('research')}
                  className={`transition-colors text-left ${isDark ? 'hover:text-white' : 'hover:text-stone-950'}`}
                >
                  Trigger Sensor Taxonomy
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleTab('about')}
                  className={`transition-colors text-left ${isDark ? 'hover:text-white' : 'hover:text-stone-950'}`}
                >
                  Safeguarding & Governance
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Trust & Legal Boundaries */}
          <div className="space-y-3">
            <h4 className={`font-semibold tracking-wider uppercase font-mono-code text-xs ${
              isDark ? 'text-[#DFB76C]' : 'text-[#8C6B28]'
            }`}>
              Governance & Privacy
            </h4>
            <div className={`text-[11px] space-y-2 leading-relaxed ${isDark ? 'text-stone-400' : 'text-stone-600'}`}>
              <p className="flex items-start gap-1.5">
                <Lock className="w-3.5 h-3.5 text-[#C5A059] shrink-0 mt-0.5" />
                <span>POPIA-aligned privacy-by-design architecture with small-n suppression bounds.</span>
              </p>
              <p className="flex items-start gap-1.5">
                <Scale className="w-3.5 h-3.5 text-[#C5A059] shrink-0 mt-0.5" />
                <span>ETES provides intelligence. People make decisions. Never automated legal verdicts.</span>
              </p>
              <p className={`text-[10px] font-mono-code mt-2 ${isDark ? 'text-stone-500' : 'text-stone-400'}`}>
                Restricted Institutional Property (Vol 01–09).
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className={`pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] ${
          isDark ? 'text-stone-400' : 'text-stone-600'
        }`}>
          <div>
            © {new Date().getFullYear()} Employment Trust and Empowerment Solutions (Pty) Ltd. All rights reserved.
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <span className={isDark ? 'hover:text-stone-300 cursor-pointer' : 'hover:text-stone-900 cursor-pointer'}>Privacy Charter</span>
            <span className={isDark ? 'hover:text-stone-300 cursor-pointer' : 'hover:text-stone-900 cursor-pointer'}>Terms of Governance</span>
            <span className={isDark ? 'hover:text-stone-300 cursor-pointer' : 'hover:text-stone-900 cursor-pointer'}>Whistleblower Safeguards</span>
            <span className={`${isDark ? 'text-[#DFB76C]' : 'text-[#8C6B28]'} font-mono-code`}>Version 1.0 • Phase 0–5 Architecture</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
