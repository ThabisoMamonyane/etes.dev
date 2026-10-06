import React, { useState } from 'react';
import etesHeroBg from '../../images/ETE.png';
import etesLogoImg from '../../images/logo-1.png';
import { RelationshipType } from '../../types';
import { TRUST_DIMENSIONS_CONFIG } from '../../data/questionBank';
import { SAMPLE_ORGANISATIONS } from '../../data/mockDatabase';
import { useTheme } from '../../context/ThemeContext';
import { PublicContact } from './PublicContact';
import { SearchOrganisationSection } from './SearchOrganisationSection';
import { CompanyProfileView } from '../directory/CompanyProfileView';
import { DirectoryOrganisation } from '../directory/TrustDirectory';
import { 
  ShieldCheck, 
  ArrowRight, 
  FileText, 
  Search, 
  Users, 
  TrendingUp, 
  Award, 
  BookOpen, 
  Building2, 
  CheckCircle2, 
  ExternalLink,
  ChevronRight,
  Scale,
  Sparkles,
  Layers,
  HeartHandshake,
  Shield,
  Wheat,
  BarChart3,
  Infinity as InfinityIcon,
  Globe2
} from 'lucide-react';

interface PublicHeadquartersProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onSelectRole?: (role: any, scope?: any, targetTab?: string) => void;
  onNavigateToRole?: (role: any, scope?: any, targetTab?: string) => void;
  currentRole?: RelationshipType;
}

export const PublicHeadquarters: React.FC<PublicHeadquartersProps> = ({
  activeTab,
  setActiveTab,
  onSelectRole,
  onNavigateToRole,
  currentRole
}) => {
  const { isDark } = useTheme();
  const handleRoleSelect = onSelectRole || onNavigateToRole || (() => {});
  const [selectedConstitutionArticle, setSelectedConstitutionArticle] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrgModal, setSelectedOrgModal] = useState<DirectoryOrganisation | null>(null);

  // If viewing a selected organisation's profile
  if (selectedOrgModal) {
    return (
      <CompanyProfileView
        organisation={selectedOrgModal}
        onBack={() => setSelectedOrgModal(null)}
        currentRole={currentRole}
        onNavigateToRole={onNavigateToRole}
        onSelectRole={onSelectRole}
      />
    );
  }

  // 1. HOME VIEW
  if (activeTab === 'home') {
    return (
      <div 
        className={`min-h-screen transition-colors duration-200 ${
          isDark ? 'bg-[#070B13] text-stone-200' : 'bg-[#FAF7F2] text-stone-900'
        }`}
        id="public-home-screen"
      >
        
        {/* Institutional Hero Banner (Remains dark during theme toggling) */}
        <section className="relative pt-16 pb-20 sm:pt-20 sm:pb-24 px-4 sm:px-8 lg:px-12 xl:px-14 overflow-hidden border-b-2 border-[#C5A059] bg-[#070B13] text-white">
          {/* Background Graphic Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none opacity-100"
            style={{ backgroundImage: `url(${etesHeroBg})` }}
          />
          {/* Vignette & scrims lightened by ~15% to brighten the background image */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#070B13]/85 via-[#070B13]/70 to-[#070B13]/20 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#070B13]/45 via-transparent to-[#070B13]/75 pointer-events-none" />
          
          <div className="max-w-[1600px] mx-auto relative z-10 text-left">
            <div className="flex flex-col lg:flex-row lg:items-end justify-start gap-8 lg:gap-14">
              {/* Left Side: Brand Logo & Stacked Text (Shifted slightly to the left) */}
              <div className="w-full max-w-md sm:max-w-lg flex flex-col items-center text-center shrink-0">
                {/* Website Logo Emblem */}
                <div className="mb-4 sm:mb-5 transition-transform duration-300 hover:scale-105 select-none">
                  <img
                    src={etesLogoImg}
                    alt="ETES Institutional Emblem"
                    className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 object-contain drop-shadow-[0_6px_20px_rgba(197,160,89,0.35)]"
                  />
                </div>

                {/* ETES Wordmark in Classical Serif Font with Metallic Gold Sheen */}
                <h1 className="font-logo-serif font-bold text-4xl sm:text-5xl md:text-6xl tracking-[0.18em] etes-logo-gold select-none leading-none mb-3 sm:mb-4 drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
                  ETES
                </h1>

                {/* EMPLOYMENT TRUST & / EMPOWERMENT SOLUTIONS - Stacked exactly as in attached image */}
                <div className="font-logo-serif font-bold text-xs sm:text-sm md:text-base tracking-[0.18em] sm:tracking-[0.22em] text-[#DFB76C] uppercase leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] mb-4 sm:mb-5">
                  <div>EMPLOYMENT TRUST &amp;</div>
                  <div>EMPOWERMENT SOLUTIONS</div>
                </div>

                {/* THE WORKPLACE TRUST & / INTELLIGENCE™ COMPANY - Stacked exactly as in attached image (Metallic silver) */}
                <div className="font-logo-serif font-medium text-[11px] sm:text-xs md:text-sm tracking-[0.16em] sm:tracking-[0.2em] etes-logo-silver text-slate-200 uppercase leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                  <div>THE WORKPLACE TRUST &amp;</div>
                  <div>INTELLIGENCE™ COMPANY</div>
                </div>
              </div>

              {/* Right Hand Side of the logo and text: Mission Statement & Action Buttons */}
              <div className="flex flex-col items-start justify-end pb-2 lg:pb-6 max-w-xl">
                {/* Institutional Mission Statement Paragraph */}
                <p className="text-center w-full text-sm sm:text-base lg:text-lg font-light leading-relaxed text-stone-200/95 -ml-[13px] mb-[22px] pt-0 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                  Creating workplaces where Employees thrive. Organisations prosper. Economies strengthen. Communities flourish.
                </p>

                {/* The two buttons side by side */}
                <div className="flex flex-col sm:flex-row items-center justify-start gap-3.5 sm:gap-4 w-full sm:w-auto">
                  <button
                    onClick={() => setActiveTab('workplace-trust')}
                    className="w-full sm:w-auto px-5 py-3 sm:px-6 sm:py-3.5 rounded-md bg-[#C5A059] hover:bg-[#B89047] text-[#0B111E] font-semibold text-xs sm:text-sm tracking-wide transition-all shadow-md hover:shadow-[#C5A059]/25 inline-flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
                  >
                    <span>Explore Workplace Trust™</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('directory')}
                    className="w-full sm:w-auto px-5 py-3 sm:px-6 sm:py-3.5 rounded-md font-medium text-xs sm:text-sm transition-all inline-flex items-center justify-center gap-2 whitespace-nowrap shadow-sm cursor-pointer bg-[#162032]/90 hover:bg-[#1E293B] text-white border border-[#C5A059]/50 hover:border-[#C5A059]"
                  >
                    <Search className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>Verify Certified Organisations</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5 Core Pillars Bar - Positioned exactly below the hero section gold line */}
        <section className={`border-b relative z-20 py-8 px-4 sm:px-6 lg:px-8 transition-colors ${
          isDark ? 'bg-[#070B13] border-stone-800/80' : 'bg-[#F2ECE3] border-[#E2DDD5]'
        }`}>
          <div className="max-w-7xl mx-auto">
            <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-4 lg:gap-0 ${
              isDark ? 'lg:divide-x lg:divide-stone-800' : 'lg:divide-x lg:divide-[#E2DDD5]'
            }`}>
              {/* 1. People at the Centre */}
              <div className="flex flex-col items-center text-center px-4 py-2">
                <div className={`h-10 flex items-center justify-center mb-3 ${isDark ? 'text-[#C5A059]' : 'text-[#8C6B28]'}`}>
                  <Users className="w-7 h-7 stroke-[1.5]" />
                </div>
                <h4 className={`font-medium sm:font-semibold text-sm lg:text-[14.5px] tracking-tight ${
                  isDark ? 'text-white' : 'text-stone-900'
                }`}>
                  People at the Centre
                </h4>
                <p className={`mt-1.5 text-xs lg:text-[13px] font-normal leading-relaxed max-w-[190px] ${
                  isDark ? 'text-stone-400' : 'text-stone-600'
                }`}>
                  Human dignity drives everything we do.
                </p>
              </div>

              {/* 2. Trust in the Relationship */}
              <div className="flex flex-col items-center text-center px-4 py-2">
                <div className={`h-10 flex items-center justify-center mb-3 relative ${isDark ? 'text-[#C5A059]' : 'text-[#8C6B28]'}`}>
                  <Shield className="w-7 h-7 stroke-[1.5]" />
                  <Wheat className="w-3.5 h-3.5 stroke-[1.5] absolute" />
                </div>
                <h4 className={`font-medium sm:font-semibold text-sm lg:text-[14.5px] tracking-tight ${
                  isDark ? 'text-white' : 'text-stone-900'
                }`}>
                  Trust in the Relationship
                </h4>
                <p className={`mt-1.5 text-xs lg:text-[13px] font-normal leading-relaxed max-w-[190px] ${
                  isDark ? 'text-stone-400' : 'text-stone-600'
                }`}>
                  We build trust between people and business.
                </p>
              </div>

              {/* 3. Continuity is Infinite */}
              <div className="flex flex-col items-center text-center px-4 py-2">
                <div className={`h-10 flex items-center justify-center mb-3 ${isDark ? 'text-[#C5A059]' : 'text-[#8C6B28]'}`}>
                  <InfinityIcon className="w-8 h-8 stroke-[1.5]" />
                </div>
                <h4 className={`font-medium sm:font-semibold text-sm lg:text-[14.5px] tracking-tight ${
                  isDark ? 'text-white' : 'text-stone-900'
                }`}>
                  Continuity is Infinite
                </h4>
                <p className={`mt-1.5 text-xs lg:text-[13px] font-normal leading-relaxed max-w-[190px] ${
                  isDark ? 'text-stone-400' : 'text-stone-600'
                }`}>
                  Sustainable value for generations.
                </p>
              </div>

              {/* 4. Intelligence in Action */}
              <div className="flex flex-col items-center text-center px-4 py-2">
                <div className={`h-10 flex items-center justify-center mb-3 ${isDark ? 'text-[#C5A059]' : 'text-[#8C6B28]'}`}>
                  {/* Standalone 3 ascending vertical signal/bar graph bars with rounded caps matching reference */}
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                    aria-hidden="true"
                  >
                    {/* Bar 1: shortest left bar */}
                    <rect x="4.5" y="13" width="3.2" height="9" rx="1.6" />
                    {/* Bar 2: medium middle bar */}
                    <rect x="10.4" y="7.5" width="3.2" height="14.5" rx="1.6" />
                    {/* Bar 3: tall right bar */}
                    <rect x="16.3" y="2" width="3.2" height="20" rx="1.6" />
                  </svg>
                </div>
                <h4 className={`font-medium sm:font-semibold text-sm lg:text-[14.5px] tracking-tight ${
                  isDark ? 'text-white' : 'text-stone-900'
                }`}>
                  Intelligence in Action
                </h4>
                <p className={`mt-1.5 text-xs lg:text-[13px] font-normal leading-relaxed max-w-[190px] ${
                  isDark ? 'text-stone-400' : 'text-stone-600'
                }`}>
                  Data, insight and ethics driving better decisions.
                </p>
              </div>

              {/* 5. Growth for All */}
              <div className="flex flex-col items-center text-center px-4 py-2">
                <div className={`h-10 flex items-center justify-center mb-3 ${isDark ? 'text-[#C5A059]' : 'text-[#8C6B28]'}`}>
                  {/* Exact symmetrical wireframe latitude/longitude globe icon matching reference */}
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-7 h-7"
                    aria-hidden="true"
                  >
                    {/* Outer circle */}
                    <circle cx="12" cy="12" r="10" />
                    {/* Horizontal equator */}
                    <line x1="2" y1="12" x2="22" y2="12" />
                    {/* Vertical prime meridian */}
                    <line x1="12" y1="2" x2="12" y2="22" />
                    {/* Upper latitude parallel line/curve */}
                    <path d="M4.93 6.93a12.5 12.5 0 0 1 14.14 0" />
                    {/* Lower latitude parallel line/curve */}
                    <path d="M4.93 17.07a12.5 12.5 0 0 0 14.14 0" />
                    {/* Central longitude ellipse */}
                    <ellipse cx="12" cy="12" rx="4.8" ry="10" />
                  </svg>
                </div>
                <h4 className={`font-medium sm:font-semibold text-sm lg:text-[14.5px] tracking-tight ${
                  isDark ? 'text-white' : 'text-stone-900'
                }`}>
                  Growth for All
                </h4>
                <p className={`mt-1.5 text-xs lg:text-[13px] font-normal leading-relaxed max-w-[190px] ${
                  isDark ? 'text-stone-400' : 'text-stone-600'
                }`}>
                  Stronger organisations, stronger communities.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Search An Organisation Section - Directly below Hero and Pillars */}
        <SearchOrganisationSection 
          onSelectOrg={(org) => {
            window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
            setSelectedOrgModal(org);
          }}
          onViewAllInDirectory={() => setActiveTab('directory')}
        />

        {/* 4 Quadrants: Understand, Strengthen, Learn, Explore (Moved lower) */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className={`text-xs font-mono-code uppercase tracking-wider font-bold ${
              isDark ? 'text-[#C5A059]' : 'text-[#8C6B28]'
            }`}>
              Navigating ETES Architecture
            </span>
            <h3 className={`font-institutional text-2xl sm:text-3xl font-bold mt-1.5 ${
              isDark ? 'text-white' : 'text-stone-900'
            }`}>
              Understand, Strengthen, Learn & Explore
            </h3>
            <p className={`text-sm mt-2 font-light leading-relaxed ${
              isDark ? 'text-stone-300' : 'text-stone-600'
            }`}>
              Access the four pillars of the Employment Trust & Empowerment Solutions framework.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Box 1: Understand */}
            <div 
              onClick={() => setActiveTab('workplace-trust')}
              className={`p-8 rounded-lg border shadow-md transition-all cursor-pointer group ${
                isDark ? 'border-stone-800 bg-[#0B111E] hover:border-[#C5A059]/60' : 'border-[#E2DDD5] bg-white hover:border-[#8C6B28]/60 shadow-xs'
              }`}
            >
              <div className={`w-10 h-10 rounded border flex items-center justify-center mb-4 transition-colors ${
                isDark 
                  ? 'border-[#C5A059]/40 text-[#C5A059] bg-[#070B13] group-hover:bg-[#C5A059] group-hover:text-[#070B13]' 
                  : 'border-[#C5A059]/50 text-[#8C6B28] bg-[#FAF7F2] group-hover:bg-[#8C6B28] group-hover:text-white'
              }`}>
                <ShieldCheck className="w-5 h-5 stroke-[1.75]" />
              </div>
              <h3 className={`font-institutional text-xl font-bold mb-2 flex items-center justify-between ${
                isDark ? 'text-white' : 'text-stone-900'
              }`}>
                <span>Understand</span>
                <ChevronRight className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${
                  isDark ? 'text-stone-400 group-hover:text-[#C5A059]' : 'text-stone-500 group-hover:text-[#8C6B28]'
                }`} />
              </h3>
              <p className={`text-sm leading-relaxed mb-4 ${isDark ? 'text-stone-300' : 'text-stone-600'}`}>
                What ETES is and why workplace trust is the single greatest structural determinant of retention, execution, and psychological safety.
              </p>
              <div className={`text-xs font-semibold uppercase tracking-wider flex items-center gap-1 ${
                isDark ? 'text-[#C5A059]' : 'text-[#8C6B28]'
              }`}>
                <span>10 Trust Dimensions</span>
                <span>•</span>
                <span>Founding Methodology</span>
              </div>
            </div>

            {/* Box 2: Strengthen */}
            <div 
              onClick={() => setActiveTab('workplace-trust')}
              className={`p-8 rounded-lg border shadow-md transition-all cursor-pointer group ${
                isDark ? 'border-stone-800 bg-[#0B111E] hover:border-[#C5A059]/60' : 'border-[#E2DDD5] bg-white hover:border-[#8C6B28]/60 shadow-xs'
              }`}
            >
              <div className={`w-10 h-10 rounded border flex items-center justify-center mb-4 transition-colors ${
                isDark 
                  ? 'border-[#C5A059]/40 text-[#C5A059] bg-[#070B13] group-hover:bg-[#C5A059] group-hover:text-[#070B13]' 
                  : 'border-[#C5A059]/50 text-[#8C6B28] bg-[#FAF7F2] group-hover:bg-[#8C6B28] group-hover:text-white'
              }`}>
                <TrendingUp className="w-5 h-5 stroke-[1.75]" />
              </div>
              <h3 className={`font-institutional text-xl font-bold mb-2 flex items-center justify-between ${
                isDark ? 'text-white' : 'text-stone-900'
              }`}>
                <span>Strengthen</span>
                <ChevronRight className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${
                  isDark ? 'text-stone-400 group-hover:text-[#C5A059]' : 'text-stone-500 group-hover:text-[#8C6B28]'
                }`} />
              </h3>
              <p className={`text-sm leading-relaxed mb-4 ${isDark ? 'text-stone-300' : 'text-stone-600'}`}>
                Deploy the 60-item Workforce Assessment, map your Workplace DNA Profile™, detect Trust Signals™, and qualify for ETES Certification.
              </p>
              <div className={`text-xs font-semibold uppercase tracking-wider flex items-center gap-1 ${
                isDark ? 'text-[#C5A059]' : 'text-[#8C6B28]'
              }`}>
                <span>Workplace DNA™</span>
                <span>•</span>
                <span>Trust Trajectory</span>
              </div>
            </div>

            {/* Box 3: Learn */}
            <div 
              onClick={() => setActiveTab('research')}
              className={`p-8 rounded-lg border shadow-md transition-all cursor-pointer group ${
                isDark ? 'border-stone-800 bg-[#0B111E] hover:border-[#C5A059]/60' : 'border-[#E2DDD5] bg-white hover:border-[#8C6B28]/60 shadow-xs'
              }`}
            >
              <div className={`w-10 h-10 rounded border flex items-center justify-center mb-4 transition-colors ${
                isDark 
                  ? 'border-[#C5A059]/40 text-[#C5A059] bg-[#070B13] group-hover:bg-[#C5A059] group-hover:text-[#070B13]' 
                  : 'border-[#C5A059]/50 text-[#8C6B28] bg-[#FAF7F2] group-hover:bg-[#8C6B28] group-hover:text-white'
              }`}>
                <BookOpen className="w-5 h-5 stroke-[1.75]" />
              </div>
              <h3 className={`font-institutional text-xl font-bold mb-2 flex items-center justify-between ${
                isDark ? 'text-white' : 'text-stone-900'
              }`}>
                <span>Learn</span>
                <ChevronRight className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${
                  isDark ? 'text-stone-400 group-hover:text-[#C5A059]' : 'text-stone-500 group-hover:text-[#8C6B28]'
                }`} />
              </h3>
              <p className={`text-sm leading-relaxed mb-4 ${isDark ? 'text-stone-300' : 'text-stone-600'}`}>
                Access independent institutional research, the State of Workplace Trust™ annual review, and peer cohort benchmarks.
              </p>
              <div className={`text-xs font-semibold uppercase tracking-wider flex items-center gap-1 ${
                isDark ? 'text-[#C5A059]' : 'text-[#8C6B28]'
              }`}>
                <span>State of Workplace Trust™</span>
                <span>•</span>
                <span>Evidence Tiers</span>
              </div>
            </div>

            {/* Box 4: Explore */}
            <div 
              onClick={() => setActiveTab('directory')}
              className={`p-8 rounded-lg border shadow-md transition-all cursor-pointer group ${
                isDark ? 'border-stone-800 bg-[#0B111E] hover:border-[#C5A059]/60' : 'border-[#E2DDD5] bg-white hover:border-[#8C6B28]/60 shadow-xs'
              }`}
            >
              <div className={`w-10 h-10 rounded border flex items-center justify-center mb-4 transition-colors ${
                isDark 
                  ? 'border-[#C5A059]/40 text-[#C5A059] bg-[#070B13] group-hover:bg-[#C5A059] group-hover:text-[#070B13]' 
                  : 'border-[#C5A059]/50 text-[#8C6B28] bg-[#FAF7F2] group-hover:bg-[#8C6B28] group-hover:text-white'
              }`}>
                <Building2 className="w-5 h-5 stroke-[1.75]" />
              </div>
              <h3 className={`font-institutional text-xl font-bold mb-2 flex items-center justify-between ${
                isDark ? 'text-white' : 'text-stone-900'
              }`}>
                <span>Explore</span>
                <ChevronRight className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${
                  isDark ? 'text-stone-400 group-hover:text-[#C5A059]' : 'text-stone-500 group-hover:text-[#8C6B28]'
                }`} />
              </h3>
              <p className={`text-sm leading-relaxed mb-4 ${isDark ? 'text-stone-300' : 'text-stone-600'}`}>
                Search verified employer records, verify active certificate status, and review governed public trust profiles.
              </p>
              <div className={`text-xs font-semibold uppercase tracking-wider flex items-center gap-1 ${
                isDark ? 'text-[#C5A059]' : 'text-[#8C6B28]'
              }`}>
                <span>Trust Directory</span>
                <span>•</span>
                <span>Public Verification</span>
              </div>
            </div>

          </div>
        </section>

        {/* The 10 Founding Trust Dimensions preview */}
        <section className={`py-16 border-y transition-colors ${
          isDark ? 'border-stone-800 bg-[#070B13]' : 'border-[#E2DDD5] bg-[#F2ECE3]'
        }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className={`text-xs font-mono-code uppercase tracking-wider font-bold ${
                isDark ? 'text-[#C5A059]' : 'text-[#8C6B28]'
              }`}>
                Founding Instrument Architecture
              </span>
              <h2 className={`font-institutional text-2xl sm:text-3xl font-bold mt-2 ${
                isDark ? 'text-white' : 'text-stone-900'
              }`}>
                The 10 Founding Trust Dimensions
              </h2>
              <p className={`text-sm mt-3 leading-relaxed ${
                isDark ? 'text-stone-400' : 'text-stone-600'
              }`}>
                60 candidate items rigorously grounded in organizational justice, psychological safety, and leadership integrity.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {TRUST_DIMENSIONS_CONFIG.map((dim) => (
                <div 
                  key={dim.id} 
                  className={`p-4 rounded border transition-all ${
                    isDark ? 'border-stone-800 bg-[#0B111E] hover:border-[#C5A059]' : 'border-[#E2DDD5] bg-white hover:border-[#8C6B28] shadow-xs'
                  }`}
                >
                  <div className={`text-[11px] font-mono-code font-bold ${
                    isDark ? 'text-[#C5A059]' : 'text-[#8C6B28]'
                  }`}>
                    DIMENSION {dim.prefix}
                  </div>
                  <div className={`font-semibold text-xs mt-1 line-clamp-2 ${
                    isDark ? 'text-white' : 'text-stone-900'
                  }`}>
                    {dim.name}
                  </div>
                  <div className={`text-[11px] mt-2 leading-tight ${
                    isDark ? 'text-stone-400' : 'text-stone-600'
                  }`}>
                    {dim.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  }

  // 2. WORKPLACE TRUST VIEW
  if (activeTab === 'workplace-trust') {
    return (
      <div 
        className={`min-h-screen py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-200 ${
          isDark ? 'bg-[#070B13] text-stone-200' : 'bg-[#FAF7F2] text-stone-900'
        }`}
        id="public-workplace-trust-screen"
      >
        <div className="max-w-5xl mx-auto">
          
          <div className={`border-b pb-8 mb-10 ${isDark ? 'border-stone-800' : 'border-[#E2DDD5]'}`}>
            <span className={`text-xs font-mono-code uppercase tracking-wider font-bold ${
              isDark ? 'text-[#C5A059]' : 'text-[#8C6B28]'
            }`}>
              Core Methodology & Architecture
            </span>
            <h1 className={`font-institutional text-3xl sm:text-4xl font-bold mt-2 ${
              isDark ? 'text-white' : 'text-stone-900'
            }`}>
              The Workplace Trust Ecosystem™
            </h1>
            <p className={`text-base mt-3 leading-relaxed max-w-3xl ${
              isDark ? 'text-stone-300' : 'text-stone-600'
            }`}>
              Workplace trust is not a vague sentiment or marketing slogan. It is a measurable, systemic operating condition that directly dictates employee retention, candid problem reporting, psychological safety, and organizational agility.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className={`p-6 rounded-lg border shadow-sm ${
              isDark ? 'border-stone-800 bg-[#0B111E]' : 'border-[#E2DDD5] bg-white'
            }`}>
              <div className={`w-10 h-10 rounded border flex items-center justify-center font-bold mb-4 font-institutional ${
                isDark 
                  ? 'bg-[#070B13] text-[#C5A059] border-[#C5A059]/40' 
                  : 'bg-[#FAF7F2] text-[#8C6B28] border-[#8C6B28]/30'
              }`}>
                01
              </div>
              <h3 className={`font-institutional text-lg font-bold mb-2 ${
                isDark ? 'text-white' : 'text-stone-900'
              }`}>
                Workplace Trust Assessment™
              </h3>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-stone-400' : 'text-stone-600'}`}>
                60-item candidate core instrument evaluating all 10 Trust Dimensions. Administered in a calm, non-surveillance environment with rigorous confidentiality protections.
              </p>
            </div>

            <div className={`p-6 rounded-lg border shadow-sm ${
              isDark ? 'border-stone-800 bg-[#0B111E]' : 'border-[#E2DDD5] bg-white'
            }`}>
              <div className={`w-10 h-10 rounded border flex items-center justify-center font-bold mb-4 font-institutional ${
                isDark 
                  ? 'bg-[#070B13] text-[#C5A059] border-[#C5A059]/40' 
                  : 'bg-[#FAF7F2] text-[#8C6B28] border-[#8C6B28]/30'
              }`}>
                02
              </div>
              <h3 className={`font-institutional text-lg font-bold mb-2 ${
                isDark ? 'text-white' : 'text-stone-900'
              }`}>
                Workplace DNA Profile™
              </h3>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-stone-400' : 'text-stone-600'}`}>
                A multi-dimensional diagnostic fingerprint showing strengths, systemic friction, and delta over cycles. Compares against national and industry benchmarks.
              </p>
            </div>

            <div className={`p-6 rounded-lg border shadow-sm ${
              isDark ? 'border-stone-800 bg-[#0B111E]' : 'border-[#E2DDD5] bg-white'
            }`}>
              <div className={`w-10 h-10 rounded border flex items-center justify-center font-bold mb-4 font-institutional ${
                isDark 
                  ? 'bg-[#070B13] text-[#C5A059] border-[#C5A059]/40' 
                  : 'bg-[#FAF7F2] text-[#8C6B28] border-[#8C6B28]/30'
              }`}>
                03
              </div>
              <h3 className={`font-institutional text-lg font-bold mb-2 ${
                isDark ? 'text-white' : 'text-stone-900'
              }`}>
                Trust Signals™ & Gaps
              </h3>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-stone-400' : 'text-stone-600'}`}>
                Clear directional indicators of travel (Improving, Declining, Divergent, Stable) paired with factual context, revealing perception gaps between leadership and frontline teams.
              </p>
            </div>
          </div>

          {/* Deep dive into the 10 Dimensions */}
          <div className={`rounded-lg border p-8 mb-12 shadow-sm ${
            isDark ? 'border-stone-800 bg-[#0B111E]' : 'border-[#E2DDD5] bg-white'
          }`}>
            <h3 className={`font-institutional text-xl font-bold mb-6 border-b pb-4 ${
              isDark ? 'border-stone-800 text-white' : 'border-[#E2DDD5] text-stone-900'
            }`}>
              Detailed Breakdown: The 10 Founding Trust Dimensions
            </h3>
            <div className="space-y-4">
              {TRUST_DIMENSIONS_CONFIG.map((dim) => (
                <div 
                  key={dim.id} 
                  className={`p-4 rounded border transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                    isDark 
                      ? 'border-stone-800/80 hover:border-[#C5A059]/40 bg-[#070B13]' 
                      : 'border-[#E2DDD5] hover:border-[#8C6B28]/50 bg-[#FAF7F2]'
                  }`}
                >
                  <div className="md:w-1/3">
                    <span className={`text-[10px] font-mono-code font-bold ${
                      isDark ? 'text-[#C5A059]' : 'text-[#8C6B28]'
                    }`}>
                      DIMENSION {dim.prefix}
                    </span>
                    <h4 className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-stone-900'}`}>
                      {dim.name}
                    </h4>
                  </div>
                  <div className={`md:w-2/3 text-xs leading-relaxed ${
                    isDark ? 'text-stone-300' : 'text-stone-600'
                  }`}>
                    {dim.description}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Institutional Certification Callout */}
          <div className={`rounded-lg p-8 border flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm ${
            isDark 
              ? 'bg-[#0B111E] text-white border-[#C5A059]/40' 
              : 'bg-white text-stone-900 border-[#8C6B28]/30'
          }`}>
            <div>
              <div className={`text-xs font-mono-code font-semibold uppercase ${
                isDark ? 'text-[#DFB76C]' : 'text-[#8C6B28]'
              }`}>
                Institutional Quality Standard
              </div>
              <h3 className={`font-institutional text-2xl font-bold mt-1 ${
                isDark ? 'text-white' : 'text-stone-900'
              }`}>
                ETES Certified™ Workplace Trust Standard
              </h3>
              <p className={`text-xs mt-2 max-w-xl leading-relaxed ${
                isDark ? 'text-stone-300' : 'text-stone-600'
              }`}>
                Certification is an empirical recognition of trust health and continuous improvement. Payment never guarantees an outcome. Valid for defined three-year governed cycles.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('directory')}
              className="px-5 py-3 rounded bg-[#C5A059] text-[#070B13] font-semibold text-xs whitespace-nowrap hover:bg-[#B89047] transition-all cursor-pointer shadow-sm"
            >
              Verify Certified Registry
            </button>
          </div>

        </div>
      </div>
    );
  }

  // 3. RESEARCH & INSIGHTS VIEW
  if (activeTab === 'research') {
    return (
      <div 
        className={`min-h-screen py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-200 ${
          isDark ? 'bg-[#070B13] text-stone-200' : 'bg-[#FAF7F2] text-stone-900'
        }`}
        id="public-research-screen"
      >
        <div className="max-w-5xl mx-auto">
          <div className={`border-b pb-8 mb-10 ${isDark ? 'border-stone-800' : 'border-[#E2DDD5]'}`}>
            <span className={`text-xs font-mono-code uppercase tracking-wider font-bold ${
              isDark ? 'text-[#C5A059]' : 'text-[#8C6B28]'
            }`}>
              Institutional Publications & Empirical Data
            </span>
            <h1 className={`font-institutional text-3xl sm:text-4xl font-bold mt-2 ${
              isDark ? 'text-white' : 'text-stone-900'
            }`}>
              Research, Standards & Insights
            </h1>
            <p className={`text-base mt-3 leading-relaxed max-w-3xl ${
              isDark ? 'text-stone-300' : 'text-stone-600'
            }`}>
              Independent evidence documenting systemic trust trends, psychological safety dynamics, and organizational justice across industries.
            </p>
          </div>

          {/* Featured Report: State of Workplace Trust™ */}
          <div className={`rounded-lg border p-8 shadow-sm mb-10 ${
            isDark ? 'border-stone-800 bg-[#0B111E]' : 'border-[#E2DDD5] bg-white'
          }`}>
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className={`px-2.5 py-1 rounded text-[10px] font-mono-code font-bold uppercase border ${
                isDark 
                  ? 'bg-[#070B13] text-[#DFB76C] border-[#C5A059]/40' 
                  : 'bg-[#FAF7F2] text-[#8C6B28] border-[#8C6B28]/30'
              }`}>
                FLAGSHIP REPORT • 2026 EDITION
              </span>
              <span className={`text-xs ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>Published September 2026 • 64 Pages</span>
            </div>

            <h2 className={`font-institutional text-2xl font-bold mb-3 ${
              isDark ? 'text-white' : 'text-stone-900'
            }`}>
              State of Workplace Trust™ in South Africa (2026)
            </h2>
            
            <p className={`text-sm leading-relaxed mb-6 ${
              isDark ? 'text-stone-300' : 'text-stone-600'
            }`}>
              A comprehensive empirical analysis synthesizing over 48,000 verified employee responses across logistics, mining, healthcare, financial services, and retail sectors. Analyzes the quantifiable impact of perceived retaliation on problem escalation and the measurable ROI of executive transparency.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 text-center">
              <div className={`p-4 rounded border ${
                isDark ? 'border-stone-800 bg-[#070B13]' : 'border-[#E2DDD5] bg-[#FAF7F2]'
              }`}>
                <div className={`text-2xl font-bold font-institutional ${
                  isDark ? 'text-white' : 'text-stone-900'
                }`}>3.4x</div>
                <div className={`text-xs mt-1 ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>Higher voluntary turnover in low Psychological Safety cohorts</div>
              </div>
              <div className={`p-4 rounded border ${
                isDark ? 'border-stone-800 bg-[#070B13]' : 'border-[#E2DDD5] bg-[#FAF7F2]'
              }`}>
                <div className={`text-2xl font-bold font-institutional ${
                  isDark ? 'text-[#C5A059]' : 'text-[#8C6B28]'
                }`}>68.2%</div>
                <div className={`text-xs mt-1 ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>National average baseline across 10 Trust Dimensions</div>
              </div>
              <div className={`p-4 rounded border ${
                isDark ? 'border-stone-800 bg-[#070B13]' : 'border-[#E2DDD5] bg-[#FAF7F2]'
              }`}>
                <div className={`text-2xl font-bold font-institutional ${
                  isDark ? 'text-white' : 'text-stone-900'
                }`}>31%</div>
                <div className={`text-xs mt-1 ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>Average perception gap between executive perception & staff reality</div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button 
                onClick={() => alert('Downloading official research abstract summary (ETES-RES-2026-01)...')}
                className={`px-5 py-2.5 rounded border text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                  isDark 
                    ? 'bg-[#070B13] text-white hover:bg-[#162032] border-[#C5A059]/40' 
                    : 'bg-[#FAF7F2] text-stone-900 hover:bg-[#EFE9DF] border-[#8C6B28]/40'
                }`}
              >
                <FileText className={`w-4 h-4 ${isDark ? 'text-[#C5A059]' : 'text-[#8C6B28]'}`} />
                <span>Download Executive Summary (PDF)</span>
              </button>
            </div>
          </div>

          {/* Research Library Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className={`p-6 rounded-lg border shadow-xs ${
              isDark ? 'border-stone-800 bg-[#0B111E]' : 'border-[#E2DDD5] bg-white'
            }`}>
              <div className={`text-[11px] font-mono-code font-bold uppercase mb-2 ${
                isDark ? 'text-[#C5A059]' : 'text-[#8C6B28]'
              }`}>
                METHODOLOGY BRIEF • VOL 03
              </div>
              <h3 className={`font-institutional text-lg font-bold mb-2 ${
                isDark ? 'text-white' : 'text-stone-900'
              }`}>
                The Mathematics of Perception Gaps
              </h3>
              <p className={`text-xs leading-relaxed mb-4 ${
                isDark ? 'text-stone-300' : 'text-stone-600'
              }`}>
                Why averaging executive and employee scores obscures systemic hazard, and how side-by-side evidence analysis protects organizational resilience.
              </p>
              <span className={`text-xs font-semibold hover:underline cursor-pointer ${
                isDark ? 'text-[#DFB76C]' : 'text-[#8C6B28]'
              }`}>
                Read Abstract →
              </span>
            </div>

            <div className={`p-6 rounded-lg border shadow-xs ${
              isDark ? 'border-stone-800 bg-[#0B111E]' : 'border-[#E2DDD5] bg-white'
            }`}>
              <div className={`text-[11px] font-mono-code font-bold uppercase mb-2 ${
                isDark ? 'text-[#C5A059]' : 'text-[#8C6B28]'
              }`}>
                SAFEGUARDING WHITE PAPER • VOL 08
              </div>
              <h3 className={`font-institutional text-lg font-bold mb-2 ${
                isDark ? 'text-white' : 'text-stone-900'
              }`}>
                Confidentiality Boundaries in Sensitive Evidence
              </h3>
              <p className={`text-xs leading-relaxed mb-4 ${
                isDark ? 'text-stone-300' : 'text-stone-600'
              }`}>
                Technical isolation of whistleblower-adjacent Trigger Sensors and small-n suppression rules under South African POPIA standards.
              </p>
              <span className={`text-xs font-semibold hover:underline cursor-pointer ${
                isDark ? 'text-[#DFB76C]' : 'text-[#8C6B28]'
              }`}>
                Read Abstract →
              </span>
            </div>
          </div>

        </div>
      </div>
    );
  }

  // 4. CONSTITUTION READER VIEW
  if (activeTab === 'constitution') {
    return (
      <div 
        className={`min-h-screen py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-200 ${
          isDark ? 'bg-[#070B13] text-stone-200' : 'bg-[#FAF7F2] text-stone-900'
        }`}
        id="public-constitution-screen"
      >
        <div className="max-w-5xl mx-auto">
          
          <div className={`border-b pb-8 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 ${
            isDark ? 'border-stone-800' : 'border-[#E2DDD5]'
          }`}>
            <div>
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded border text-xs font-mono-code mb-2 ${
                isDark 
                  ? 'bg-[#070B13] text-[#DFB76C] border-[#C5A059]/40' 
                  : 'bg-[#FAF7F2] text-[#8C6B28] border-[#8C6B28]/30'
              }`}>
                <Scale className={`w-3.5 h-3.5 ${isDark ? 'text-[#C5A059]' : 'text-[#8C6B28]'}`} />
                <span>CONTROLLED INSTITUTIONAL READER • VERSION 1.0</span>
              </div>
              <h1 className={`font-institutional text-3xl font-bold ${
                isDark ? 'text-white' : 'text-stone-900'
              }`}>
                The Founding Constitution of ETES
              </h1>
              <p className={`text-xs mt-1 ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                Effective Date: 1 September 2026 • Amendment Status: Locked by Governing Council
              </p>
            </div>

            <div className={`p-3 rounded border text-right text-xs ${
              isDark ? 'border-stone-800 bg-[#0B111E]' : 'border-[#E2DDD5] bg-white shadow-xs'
            }`}>
              <div className={`font-mono-code ${isDark ? 'text-stone-500' : 'text-stone-400'}`}>Registry Ref:</div>
              <div className={`font-mono-code font-bold ${isDark ? 'text-white' : 'text-stone-900'}`}>ETES-CONST-2026-V1</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Table of Articles */}
            <div className="space-y-1">
              <div className={`text-xs uppercase font-mono-code tracking-wider font-bold mb-3 px-3 ${
                isDark ? 'text-stone-400' : 'text-stone-500'
              }`}>
                Constitutional Articles
              </div>
              {[
                { num: 1, title: 'Article I: Purpose & Identity' },
                { num: 2, title: 'Article II: Separation of Powers' },
                { num: 3, title: 'Article III: Whistleblower Protection' },
                { num: 4, title: 'Article IV: Scientific Independence' },
                { num: 5, title: 'Article V: Commercial Non-Compromise' },
                { num: 6, title: 'Article VI: Amendment Protocols' }
              ].map((art) => (
                <button
                  key={art.num}
                  onClick={() => setSelectedConstitutionArticle(art.num)}
                  className={`w-full text-left px-3 py-2 rounded text-xs transition-colors flex items-center justify-between cursor-pointer ${
                    selectedConstitutionArticle === art.num
                      ? isDark 
                        ? 'bg-[#0E1726] text-[#DFB76C] font-semibold border border-[#C5A059]/40'
                        : 'bg-[#F2ECE3] text-[#8C6B28] font-semibold border border-[#8C6B28]/40'
                      : isDark
                        ? 'text-stone-300 hover:bg-[#0E1726]/60'
                        : 'text-stone-600 hover:bg-[#EFE9DF]'
                  }`}
                >
                  <span>{art.title}</span>
                  {selectedConstitutionArticle === art.num && (
                    <ChevronRight className={`w-3.5 h-3.5 ${isDark ? 'text-[#C5A059]' : 'text-[#8C6B28]'}`} />
                  )}
                </button>
              ))}

              <div className={`mt-6 p-4 rounded border text-xs ${
                isDark ? 'border-stone-800 bg-[#0B111E] text-stone-400' : 'border-[#E2DDD5] bg-white text-stone-600 shadow-xs'
              }`}>
                <div className={`font-bold mb-1 ${isDark ? 'text-white' : 'text-stone-900'}`}>Amendment History:</div>
                <div className={`font-mono-code text-[11px] ${isDark ? 'text-stone-500' : 'text-stone-400'}`}>
                  • 2026-09-01: Version 1.0 formally ratified.<br />
                  • 2026-08-15: Legal Council review completed.<br />
                  • 2026-07-01: Drafting committee sign-off.
                </div>
              </div>
            </div>

            {/* Article Content Viewer */}
            <div className={`md:col-span-3 p-8 rounded-lg border shadow-sm leading-relaxed text-sm ${
              isDark ? 'border-stone-800 bg-[#0B111E] text-stone-300' : 'border-[#E2DDD5] bg-white text-stone-700'
            }`}>
              {selectedConstitutionArticle === 1 && (
                <div className="space-y-4">
                  <h2 className={`font-institutional text-xl font-bold border-b pb-2 ${
                    isDark ? 'border-stone-800 text-white' : 'border-[#E2DDD5] text-stone-900'
                  }`}>
                    Article I — Purpose & Sovereign Institutional Identity
                  </h2>
                  <p>
                    <strong>Section 1.01: Institutional Mission.</strong> Employment Trust and Empowerment Solutions (ETES) is established as an irrevocable, independent institution dedicated to measuring workplace trust, uncovering actionable intelligence, and advancing systemic organisational health.
                  </p>
                  <p>
                    <strong>Section 1.02: Intelligence vs Judgment.</strong> The institution operates under the foundational covenant: <em>"ETES provides intelligence. People make decisions."</em> The platform, algorithms, instruments, and staff of ETES shall never present themselves as issuing criminal verdicts, legal adjudications, or arbitrary judgements regarding persons or corporations.
                  </p>
                  <p>
                    <strong>Section 1.03: Primacy of Human Dignity.</strong> Every interaction conducted under the auspices of ETES shall hold the fundamental human dignity, psychological safety, and voice of participating workers as the supreme consideration.
                  </p>
                </div>
              )}

              {selectedConstitutionArticle === 2 && (
                <div className="space-y-4">
                  <h2 className={`font-institutional text-xl font-bold border-b pb-2 ${
                    isDark ? 'border-stone-800 text-white' : 'border-[#E2DDD5] text-stone-900'
                  }`}>
                    Article II — Separation of Permissions & Shared Identity
                  </h2>
                  <p>
                    <strong>Section 2.01: Single Ecosystem Rule.</strong> ETES shall be architected as one unified identity and permission system (Person → Identity → Relationship → Role → Scope), not disconnected silos.
                  </p>
                  <p>
                    <strong>Section 2.02: Non-Leakage Covenant.</strong> One person may legitimately hold multiple relationships within ETES (for example, as an employee within a client firm and an independent member of the community network). Permissions granted in one relationship shall strictly never leak into or expand permissions in another.
                  </p>
                </div>
              )}

              {selectedConstitutionArticle === 3 && (
                <div className="space-y-4">
                  <h2 className={`font-institutional text-xl font-bold border-b pb-2 ${
                    isDark ? 'border-stone-800 text-white' : 'border-[#E2DDD5] text-stone-900'
                  }`}>
                    Article III — Whistleblower Protection & Sensitive Evidence
                  </h2>
                  <p>
                    <strong>Section 3.01: Absolute Confidentiality.</strong> Individual employee responses to confidential instruments, specifically including Trigger Sensors and sensitive experience modules, shall never under any circumstance be made accessible to employers or third parties.
                  </p>
                  <p>
                    <strong>Section 3.02: Small-n Suppression Mandate.</strong> Any aggregated intelligence view derived from a respondent cohort of fewer than five (5) individuals shall be strictly suppressed by system architecture to eliminate the possibility of deductive re-identification.
                  </p>
                </div>
              )}

              {selectedConstitutionArticle === 4 && (
                <div className="space-y-4">
                  <h2 className={`font-institutional text-xl font-bold border-b pb-2 ${
                    isDark ? 'border-stone-800 text-white' : 'border-[#E2DDD5] text-stone-900'
                  }`}>
                    Article IV — Scientific & Methodological Independence
                  </h2>
                  <p>
                    <strong>Section 4.01: Question Bank Integrity.</strong> The 10 Trust Dimensions and candidate item formulations represent controlled institutional intellectual property. Modification of wording or scoring mechanics requires formal psychometric validation and Governing Council approval.
                  </p>
                </div>
              )}

              {selectedConstitutionArticle === 5 && (
                <div className="space-y-4">
                  <h2 className={`font-institutional text-xl font-bold border-b pb-2 ${
                    isDark ? 'border-stone-800 text-white' : 'border-[#E2DDD5] text-stone-900'
                  }`}>
                    Article V — Commercial Non-Compromise
                  </h2>
                  <p>
                    <strong>Section 5.01: Payment Does Not Guarantee Outcome.</strong> No client fee, sponsorship, partnership grant, or commercial agreement shall ever guarantee certification or influence empirical findings.
                  </p>
                </div>
              )}

              {selectedConstitutionArticle === 6 && (
                <div className="space-y-4">
                  <h2 className={`font-institutional text-xl font-bold border-b pb-2 ${
                    isDark ? 'border-stone-800 text-white' : 'border-[#E2DDD5] text-stone-900'
                  }`}>
                    Article VI — Amendment Protocols
                  </h2>
                  <p>
                    <strong>Section 6.01: Constitutional Amendments.</strong> Any modification to these Articles requires unanimous concurrence of the ETES Governing Board, consultation with the Safeguarding Committee, and a mandatory 60-day public notice period.
                  </p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    );
  }

  // 5. ABOUT ETES & FOUNDER'S MESSAGE
  if (activeTab === 'about' || activeTab === 'founder') {
    return (
      <div 
        className={`min-h-screen py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-200 ${
          isDark ? 'bg-[#070B13] text-stone-200' : 'bg-[#FAF7F2] text-stone-900'
        }`}
        id="public-about-screen"
      >
        <div className="max-w-4xl mx-auto space-y-12">
          
          <div className={`border-b pb-8 ${isDark ? 'border-stone-800' : 'border-[#E2DDD5]'}`}>
            <span className={`text-xs font-mono-code uppercase tracking-wider font-bold ${
              isDark ? 'text-[#C5A059]' : 'text-[#8C6B28]'
            }`}>
              Institutional Heritage & Vision
            </span>
            <h1 className={`font-institutional text-3xl sm:text-4xl font-bold mt-2 ${
              isDark ? 'text-white' : 'text-stone-900'
            }`}>
              About ETES & Founder's Message
            </h1>
            <p className={`text-base mt-2 ${isDark ? 'text-stone-300' : 'text-stone-600'}`}>
              Uniting people and business through trust and intelligence.
            </p>
          </div>

          {/* Founder's Message */}
          <div className={`rounded-lg border p-8 shadow-sm ${
            isDark ? 'border-stone-800 bg-[#0B111E]' : 'border-[#E2DDD5] bg-white'
          }`}>
            <div className={`flex items-center gap-4 mb-6 border-b pb-4 ${
              isDark ? 'border-stone-800' : 'border-[#E2DDD5]'
            }`}>
              <div className={`w-14 h-14 rounded-full border-2 flex items-center justify-center font-institutional font-bold text-xl ${
                isDark 
                  ? 'bg-[#070B13] border-[#C5A059] text-[#DFB76C]' 
                  : 'bg-[#FAF7F2] border-[#8C6B28] text-[#8C6B28]'
              }`}>
                ET
              </div>
              <div>
                <h3 className={`font-institutional text-lg font-bold ${
                  isDark ? 'text-white' : 'text-stone-900'
                }`}>
                  Founder's Message to Stakeholders
                </h3>
                <div className={`text-xs font-mono-code ${isDark ? 'text-stone-500' : 'text-stone-400'}`}>
                  Office of the Founder • Employment Trust & Empowerment Solutions
                </div>
              </div>
            </div>

            <div className={`prose text-sm leading-relaxed space-y-4 font-light ${
              isDark ? 'text-stone-300' : 'text-stone-700'
            }`}>
              <p className={`font-editorial text-lg italic leading-snug ${
                isDark ? 'text-white' : 'text-stone-900'
              }`}>
                "Workplaces do not break overnight. They erode quietly through unaddressed fears, unspoken grievances, and institutional deaf spots. By the time a crisis emerges in the boardroom or in the headlines, the trust that could have prevented it was lost months before."
              </p>
              <p>
                ETES was created to solve this fundamental asymmetry. We did not build another superficial employee survey tool or corporate PR badge. We constructed an institutional authority — with constitutional safeguards, scientific rigor, and strict privacy boundaries — capable of measuring the true condition of trust between workforce and leadership.
              </p>
              <p>
                When leaders see reality with clarity, they make better choices. When workers know their voice is held in authentic confidence, they speak truth. In that equilibrium, people are empowered and enterprises endure.
              </p>
            </div>
          </div>

          {/* Institutional Values */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={`p-6 rounded border ${
              isDark ? 'border-stone-800 bg-[#0B111E]' : 'border-[#E2DDD5] bg-white shadow-xs'
            }`}>
              <h4 className={`font-institutional text-base font-bold mb-2 ${
                isDark ? 'text-white' : 'text-stone-900'
              }`}>
                Deep Institution
              </h4>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-stone-400' : 'text-stone-600'}`}>
                Grounded in constitutional charters, legal rigor, POPIA-compliant architecture, and independent scientific stewardship.
              </p>
            </div>

            <div className={`p-6 rounded border ${
              isDark ? 'border-stone-800 bg-[#0B111E]' : 'border-[#E2DDD5] bg-white shadow-xs'
            }`}>
              <h4 className={`font-institutional text-base font-bold mb-2 ${
                isDark ? 'text-white' : 'text-stone-900'
              }`}>
                Simple Experience
              </h4>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-stone-400' : 'text-stone-600'}`}>
                Zero intimidation, no cognitive clutter, minimal friction, and empathetic interfaces for employees and executives alike.
              </p>
            </div>

            <div className={`p-6 rounded border ${
              isDark ? 'border-stone-800 bg-[#0B111E]' : 'border-[#E2DDD5] bg-white shadow-xs'
            }`}>
              <h4 className={`font-institutional text-base font-bold mb-2 ${
                isDark ? 'text-white' : 'text-stone-900'
              }`}>
                Longitudinal Change
              </h4>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-stone-400' : 'text-stone-600'}`}>
                Tracking Trust Trajectories over multi-year cycles. Celebrating verified institutional repair rather than static snapshot scores.
              </p>
            </div>
          </div>

        </div>
      </div>
    );
  }

  // 6. CONTACT VIEW
  return (
    <PublicContact 
      onSelectRole={onSelectRole}
      onNavigateToRole={onNavigateToRole}
      setActiveTab={setActiveTab}
    />
  );
};
