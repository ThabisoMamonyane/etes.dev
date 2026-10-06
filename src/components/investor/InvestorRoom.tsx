import React, { useState } from 'react';
import { Person, DataRoomDocument } from '../../types';
import { DATA_ROOM_DOCUMENTS } from '../../data/mockDatabase';
import { EtesLogo } from '../common/EtesLogo';
import investorHeroImg from '../../images/investor-room.jpg';
import { useTheme } from '../../context/ThemeContext';
import { ThemeToggle } from '../common/ThemeToggle';
import { 
  BarChart3,
  Briefcase,
  TrendingUp,
  Globe,
  Award,
  DollarSign,
  Lock,
  Leaf,
  Scale,
  Mail,
  User,
  LogOut,
  ShieldCheck, 
  FileText, 
  Download, 
  Eye, 
  AlertCircle, 
  CheckCircle2, 
  ExternalLink, 
  X, 
  Clock, 
  Layers,
  ArrowRight,
  FileCheck,
  ChevronRight,
  Check,
  Menu
} from 'lucide-react';

interface InvestorRoomProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currentPersona: Person;
  onLogOut?: () => void;
}

export const InvestorRoom: React.FC<InvestorRoomProps> = ({
  activeTab,
  setActiveTab,
  currentPersona,
  onLogOut
}) => {
  const { isDark } = useTheme();
  // State for document modal and access logs
  const [viewingDoc, setViewingDoc] = useState<DataRoomDocument | null>(null);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [accessLogs, setAccessLogs] = useState<string[]>([
    '2026-09-03 10:12:04 SAST — Watermarked inspection: Financial Model V5 by m.vance@aegiscap.co.uk',
    '2026-09-03 09:40:11 SAST — Authorized download: ETES Institutional Business Plan v2.0'
  ]);

  const handleOpenDoc = (doc: DataRoomDocument) => {
    const newLog = `${new Date().toISOString().replace('T', ' ').substring(0, 19)} SAST — Watermarked inspection: ${doc.title} (${doc.version}) by ${currentPersona.email}`;
    setAccessLogs([newLog, ...accessLogs]);
    setViewingDoc(doc);
  };

  const handleDownloadDoc = (doc: DataRoomDocument) => {
    if (!doc.download_allowed) {
      alert(`Permission Tier Restriction: ${doc.title} is strictly marked VIEW ONLY under Data Room governance.`);
      return;
    }
    const newLog = `${new Date().toISOString().replace('T', ' ').substring(0, 19)} SAST — Authorized download: ${doc.title} (${doc.version}) by ${currentPersona.email}`;
    setAccessLogs([newLog, ...accessLogs]);
    alert(`Authorized download triggered: ${doc.title} (${doc.file_size}). Watermark embedded.`);
  };

  // Sidebar items matching Panel 6 of the mockup image
  const sidebarItems = [
    { id: 'inv-overview', label: 'Overview', icon: BarChart3 },
    { id: 'inv-case', label: 'Investment Case', icon: Briefcase },
    { id: 'inv-impact', label: 'Impact Model', icon: TrendingUp },
    { id: 'inv-market', label: 'Market Opportunity', icon: Globe },
    { id: 'inv-traction', label: 'Traction', icon: Award },
    { id: 'inv-financials', label: 'Financials', icon: DollarSign },
    { id: 'inv-dataroom', label: 'Data Room', icon: Lock },
    { id: 'inv-esg', label: 'ESG & Impact', icon: Leaf },
    { id: 'inv-governance', label: 'Governance', icon: Scale },
    { id: 'inv-contact', label: 'Contact', icon: Mail },
  ];

  // Map older activeTab aliases to current
  const effectiveActiveTab = activeTab === 'inv-landing' ? 'inv-overview' : activeTab;
  const currentTabLabel = sidebarItems.find(i => i.id === effectiveActiveTab)?.label || 'Overview';

  return (
    <div 
      className={`h-full flex-1 flex flex-col lg:flex-row overflow-hidden rounded-xl border shadow-sm transition-colors duration-200 ${
        isDark ? 'border-stone-800 bg-[#070B13]' : 'border-[#E2DDD5] bg-[#FAF7F2]'
      }`} 
      id="investor-room-root"
    >
      {/* Mobile & Tablet Header Bar (Visible on mobile & tablet, hidden on desktop lg+) */}
      <div 
        className={`lg:hidden flex items-center justify-between px-3.5 py-2.5 border-b shrink-0 transition-colors ${
          isDark ? 'border-stone-800 bg-[#070B13]' : 'border-[#E2DDD5] bg-white'
        }`}
      >
        <div 
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setActiveTab('inv-overview')}
        >
          <EtesLogo 
            size="xs" 
            variant={isDark ? "light" : "dark"} 
            showSubtitle={false} 
            roomLabel="INVESTOR ROOM" 
          />
          <span className={`text-[10px] px-2 py-0.5 rounded font-mono-code font-semibold uppercase ${
            isDark ? 'bg-[#C5A059]/15 text-[#DFB76C] border border-[#C5A059]/30' : 'bg-[#8C6B28]/10 text-[#8C6B28] border border-[#8C6B28]/30'
          }`}>
            {currentTabLabel}
          </span>
        </div>

        <button
          id="investor-mobile-menu-btn"
          onClick={() => setMobileNavOpen(!mobileNavOpen)}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
            isDark 
              ? 'bg-[#162032] border-stone-700 text-stone-200 hover:text-white' 
              : 'bg-white border-stone-300 text-stone-700 hover:text-stone-900'
          }`}
          aria-label="Toggle Navigation"
        >
          {mobileNavOpen ? (
            <X className={`w-4 h-4 ${isDark ? 'text-[#DFB76C]' : 'text-[#8C6B28]'}`} />
          ) : (
            <Menu className={`w-4 h-4 ${isDark ? 'text-[#DFB76C]' : 'text-[#8C6B28]'}`} />
          )}
          <span className="text-[11px] font-semibold">{mobileNavOpen ? 'Close' : 'Menu'}</span>
        </button>
      </div>

      {/* Mobile/Tablet Drawer Overlay */}
      {mobileNavOpen && (
        <div 
          className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-start animate-fade-in"
          onClick={() => setMobileNavOpen(false)}
        >
          <div 
            className={`w-72 max-w-[85vw] h-full flex flex-col p-4 shadow-2xl overflow-y-auto border-r transition-colors ${
              isDark ? 'bg-[#0E1726] border-[#1E293B] text-stone-200' : 'bg-[#FAF7F2] border-[#E2DDD5] text-stone-800'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="flex items-start justify-between pb-3 mb-3 border-b border-stone-700/40">
              <div className="flex-1 min-w-0 pr-2">
                <EtesLogo size="sm" variant={isDark ? 'light' : 'dark'} showSubtitle={false} roomLabel="INVESTOR ROOM" />
              </div>
              <button 
                onClick={() => setMobileNavOpen(false)}
                className="p-1.5 rounded-md hover:bg-stone-700/30 text-stone-400 hover:text-white cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Items */}
            <nav className="space-y-1 flex-1">
              {sidebarItems.map((item) => {
                const isActive = effectiveActiveTab === item.id;
                return (
                  <button
                    key={item.id}
                    id={`inv-mob-nav-${item.id}`}
                    onClick={() => {
                      setActiveTab(item.id);
                      setMobileNavOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                      isActive
                        ? isDark
                          ? 'bg-[#162032] text-[#DFB76C] font-semibold border border-[#C5A059]/40 shadow-sm'
                          : 'bg-white text-[#0B111E] font-bold border border-[#C5A059]/50 shadow-sm'
                        : isDark
                          ? 'text-stone-400 hover:text-white hover:bg-[#131B2A]'
                          : 'text-stone-600 hover:text-stone-900 hover:bg-[#F2ECE3]'
                    }`}
                  >
                    <item.icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#C5A059]' : 'text-stone-400'}`} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Drawer Bottom Controls */}
            <div className={`pt-4 mt-4 border-t space-y-2 ${isDark ? 'border-[#1E293B]' : 'border-[#E2DDD5]'}`}>
              <ThemeToggle variant="sidebar" />

              <button
                onClick={() => {
                  setMobileNavOpen(false);
                  setProfileModalOpen(true);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs transition-colors cursor-pointer ${
                  isDark 
                    ? 'text-stone-400 hover:text-white hover:bg-[#1A2333]' 
                    : 'text-stone-600 hover:text-stone-900 hover:bg-[#F2ECE3]'
                }`}
              >
                <User className="w-4 h-4 text-stone-400" />
                <span>My Profile</span>
              </button>

              <button
                onClick={() => {
                  setMobileNavOpen(false);
                  onLogOut?.();
                }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs transition-colors cursor-pointer ${
                  isDark 
                    ? 'text-stone-400 hover:text-rose-400 hover:bg-[#1A2333]' 
                    : 'text-stone-600 hover:text-rose-600 hover:bg-[#F2ECE3]'
                }`}
              >
                <LogOut className="w-4 h-4 text-stone-400" />
                <span>Log Out</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 1. Desktop Left Sidebar (Hidden on mobile/tablet, static on desktop lg+) */}
      <aside 
        className={`hidden lg:flex lg:w-64 shrink-0 flex-col p-4 border-r transition-colors duration-200 lg:h-full overflow-hidden ${
          isDark 
            ? 'bg-[#0E1726] border-[#1E293B]' 
            : 'bg-[#FAF7F2] border-[#E2DDD5]'
        }`} 
        id="investor-sidebar"
      >
        {/* Logo & Header */}
        <div 
          className={`px-2 py-3 mb-4 border-b cursor-pointer ${
            isDark ? 'border-[#1E293B]' : 'border-[#E2DDD5]'
          }`}
          onClick={() => setActiveTab('inv-overview')}
        >
          <EtesLogo 
            size="sm" 
            variant={isDark ? 'light' : 'dark'} 
            showSubtitle={false} 
            roomLabel="INVESTOR ROOM" 
          />
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1" id="investor-sidebar-nav">
          {sidebarItems.map((item) => {
            const isActive = effectiveActiveTab === item.id;
            return (
              <button
                key={item.id}
                id={`inv-nav-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? isDark
                      ? 'bg-[#162032] text-[#DFB76C] font-bold border border-[#C5A059]/40 shadow-sm'
                      : 'bg-white text-[#0B111E] font-bold border border-[#C5A059]/50 shadow-sm'
                    : isDark
                      ? 'text-stone-400 hover:text-white hover:bg-[#131B2A]'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-[#F2ECE3]'
                }`}
              >
                <item.icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#C5A059]' : 'text-stone-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Bottom Profile, Theme Toggle & Logout Controls (Brought up) */}
        <div className={`pt-4 mt-5 border-t space-y-1.5 ${isDark ? 'border-[#1E293B]' : 'border-[#E2DDD5]'}`}>
          <ThemeToggle variant="sidebar" />

          <button
            onClick={() => setProfileModalOpen(true)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs transition-colors ${
              isDark 
                ? 'text-stone-400 hover:text-white hover:bg-[#1A2333]' 
                : 'text-stone-600 hover:text-stone-900 hover:bg-[#F2ECE3]'
            }`}
          >
            <User className="w-4 h-4 text-stone-400" />
            <span>My Profile</span>
          </button>

          <button
            onClick={onLogOut}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs transition-colors ${
              isDark 
                ? 'text-stone-400 hover:text-rose-400 hover:bg-[#1A2333]' 
                : 'text-stone-600 hover:text-rose-600 hover:bg-[#F2ECE3]'
            }`}
          >
            <LogOut className="w-4 h-4 text-stone-400" />
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      {/* 2. Main Content Canvas (Scrollable) */}
      <main className={`flex-1 min-h-0 h-full overflow-y-auto p-4 sm:p-6 md:p-8 lg:p-10 ${isDark ? 'bg-[#0B111E]' : 'bg-[#FAF9F6]'}`}>
        
        {/* TAB 1: INVESTMENT OVERVIEW (Matching Panel 6) */}
        {effectiveActiveTab === 'inv-overview' && (
          <div className="max-w-5xl mx-auto space-y-8" id="inv-overview-view">
            {/* Top Hero Banner Image */}
            <div className="relative w-full rounded-2xl overflow-hidden border border-[#C5A059]/30 shadow-lg group bg-[#111827]">
              <img
                src={investorHeroImg}
                alt="ETES Investor Room Banner"
                className="w-full h-48 sm:h-64 md:h-72 lg:h-80 object-cover object-center transition-transform duration-500 group-hover:scale-[1.01]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Header with quick Theme Toggle pill */}
            <div className="flex items-center justify-between pt-2">
              <div>
                <h1 className={`font-institutional text-2xl sm:text-3xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-[#0B111E]'}`}>
                  Investment Overview
                </h1>
                <p className={`text-xs mt-1 ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                  Institutional investment thesis, recurring SaaS intelligence economics, and high-impact human capital governance.
                </p>
              </div>

              <ThemeToggle variant="pill" />
            </div>

            {/* 4 Metric Cards (Matching Panel 6) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* Card 1: Market Opportunity */}
              <div className={`p-5 rounded-2xl border shadow-sm space-y-2 ${
                isDark ? 'bg-[#131B2A] border-[#1E293B]' : 'bg-white border-stone-200/80'
              }`}>
                <div className={`text-xs font-medium ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>Market Opportunity</div>
                <div className={`text-3xl font-bold font-institutional ${isDark ? 'text-white' : 'text-[#0B111E]'}`}>
                  $24B+
                </div>
                <div className={`text-xs ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                  Global TAM
                </div>
              </div>

              {/* Card 2: Growth Potential */}
              <div className={`p-5 rounded-2xl border shadow-sm space-y-2 ${
                isDark ? 'bg-[#131B2A] border-[#1E293B]' : 'bg-white border-stone-200/80'
              }`}>
                <div className={`text-xs font-medium ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>Growth Potential</div>
                <div className="text-3xl font-bold text-emerald-500 font-institutional">
                  High
                </div>
                <div className={`text-xs ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                  Attractive Market
                </div>
              </div>

              {/* Card 3: Business Model */}
              <div className={`p-5 rounded-2xl border shadow-sm space-y-2 ${
                isDark ? 'bg-[#131B2A] border-[#1E293B]' : 'bg-white border-stone-200/80'
              }`}>
                <div className={`text-xs font-medium ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>Business Model</div>
                <div className={`text-3xl font-bold font-institutional ${isDark ? 'text-white' : 'text-[#0B111E]'}`}>
                  Recurring
                </div>
                <div className={`text-xs ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                  Sustainable
                </div>
              </div>

              {/* Card 4: Impact Potential */}
              <div className={`p-5 rounded-2xl border shadow-sm space-y-2 ${
                isDark ? 'bg-[#131B2A] border-[#1E293B]' : 'bg-white border-stone-200/80'
              }`}>
                <div className={`text-xs font-medium ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>Impact Potential</div>
                <div className="text-3xl font-bold text-[#C5A059] font-institutional">
                  Very High
                </div>
                <div className={`text-xs ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                  People • Business • Economy
                </div>
              </div>

            </div>

            {/* 2 Main Section Cards: Why Invest & Key Documents */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Left Card: Why Invest in ETES */}
              <div className={`p-7 rounded-2xl border shadow-sm space-y-5 flex flex-col justify-between ${
                isDark ? 'bg-[#131B2A] border-[#1E293B]' : 'bg-white border-stone-200/80'
              }`}>
                <div>
                  <h3 className={`font-institutional text-lg font-bold ${isDark ? 'text-white' : 'text-[#0B111E]'}`}>
                    Why Invest in ETES
                  </h3>
                  
                  <ul className={`mt-4 space-y-3.5 text-xs ${isDark ? 'text-stone-300' : 'text-stone-700'}`}>
                    {[
                      'Large and growing market need',
                      'Unique Trust & Intelligence methodology',
                      'Strong commercial and impact model',
                      'Scalable technology platform',
                      'Experienced leadership and governance'
                    ].map((point, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center text-[#C5A059] shrink-0 ${
                          isDark ? 'bg-[#0E1726] border-[#C5A059]/40' : 'bg-[#FAF7F2] border-[#C5A059]/40'
                        }`}>
                          <Check className="w-3 h-3" />
                        </div>
                        <span className={`font-medium ${isDark ? 'text-stone-200' : 'text-stone-800'}`}>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={`pt-4 border-t ${isDark ? 'border-[#1E293B]' : 'border-stone-100'}`}>
                  <span className="text-[11px] font-mono-code text-stone-400">
                    Constitutional Investor Charter: Volume 01-10
                  </span>
                </div>
              </div>

              {/* Right Card: Key Documents */}
              <div className={`p-7 rounded-2xl border shadow-sm space-y-5 flex flex-col justify-between ${
                isDark ? 'bg-[#131B2A] border-[#1E293B]' : 'bg-white border-stone-200/80'
              }`}>
                <div>
                  <h3 className={`font-institutional text-lg font-bold ${isDark ? 'text-white' : 'text-[#0B111E]'}`}>
                    Key Documents
                  </h3>

                  <div className="mt-4 space-y-2.5">
                    {[
                      { title: 'Investment Deck', format: 'PDF • 24 Pages' },
                      { title: 'Financial Model', format: 'Excel & Audit Model V5' },
                      { title: 'Business Plan', format: 'Institutional Strategy 2026-2030' },
                      { title: 'Impact Framework', format: 'Constitutional ESG Model' },
                    ].map((doc, idx) => (
                      <div 
                        key={idx}
                        className={`flex items-center justify-between p-3 rounded-xl border transition-all text-xs ${
                          isDark 
                            ? 'bg-[#0E1726] border-[#1E293B] hover:border-[#C5A059]/50' 
                            : 'bg-[#FAF9F6] border-stone-200/60 hover:border-[#C5A059]/50'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <FileText className="w-4 h-4 text-[#C5A059]" />
                          <span className={`font-semibold ${isDark ? 'text-stone-200' : 'text-stone-800'}`}>{doc.title}</span>
                        </div>
                        <span className="text-[10px] font-mono-code text-stone-400">{doc.format}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={`pt-4 border-t flex justify-end ${isDark ? 'border-[#1E293B]' : 'border-stone-100'}`}>
                  <button
                    onClick={() => setActiveTab('inv-dataroom')}
                    className="w-full py-2.5 rounded-lg bg-[#C5A059] hover:bg-[#DFB76C] text-[#0B111E] text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>Enter Data Room</span>
                  </button>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* TAB 2: DATA ROOM */}
        {effectiveActiveTab === 'inv-dataroom' && (
          <div className="max-w-5xl mx-auto space-y-6" id="inv-dataroom-view">
            <div className={`border-b pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
              isDark ? 'border-[#1E293B]' : 'border-stone-200'
            }`}>
              <div>
                <span className="text-xs font-mono-code uppercase tracking-wider text-[#C5A059] font-bold">
                  Confidential Data Room (Strict)
                </span>
                <h1 className={`font-institutional text-2xl sm:text-3xl font-bold mt-1 ${isDark ? 'text-white' : 'text-[#0B111E]'}`}>
                  Institutional Data Room
                </h1>
                <p className={`text-xs mt-1 ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                  Dynamic digital watermarking active for: <strong className={isDark ? 'text-stone-200' : 'text-stone-700'}>{currentPersona.email}</strong>
                </p>
              </div>

              <div className="flex items-center gap-2">
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium ${
                  isDark ? 'bg-emerald-950/60 border-emerald-800 text-emerald-300' : 'bg-emerald-50 border-emerald-200 text-emerald-800'
                }`}>
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>MFA Token Verified</span>
                </div>

                <ThemeToggle variant="pill" />
              </div>
            </div>

            {/* Document List */}
            <div className={`rounded-2xl border shadow-sm overflow-hidden divide-y ${
              isDark 
                ? 'bg-[#131B2A] border-[#1E293B] divide-[#1E293B]' 
                : 'bg-white border-stone-200 divide-stone-100'
            }`}>
              {DATA_ROOM_DOCUMENTS.map((doc) => (
                <div 
                  key={doc.id} 
                  className={`p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors ${
                    isDark ? 'hover:bg-[#162032]' : 'hover:bg-[#FAF9F6]'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-[#C5A059]" />
                      <h4 className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-[#0B111E]'}`}>{doc.title}</h4>
                      <span className="text-[10px] font-mono-code text-stone-400">({doc.version})</span>
                    </div>
                    <p className={`text-xs ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>{doc.description}</p>
                    <div className="flex items-center gap-3 text-[11px] text-stone-400 font-mono-code pt-1">
                      <span>{doc.file_size}</span>
                      <span>•</span>
                      <span>Tier: {doc.permission_tier}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleOpenDoc(doc)}
                      className={`px-3.5 py-1.5 rounded-lg border text-xs font-medium flex items-center gap-1.5 transition-colors ${
                        isDark 
                          ? 'border-[#1E293B] bg-[#0E1726] hover:bg-[#162032] text-stone-200' 
                          : 'border-stone-300 hover:bg-white text-stone-700'
                      }`}
                    >
                      <Eye className="w-3.5 h-3.5 text-stone-400" />
                      <span>Inspect</span>
                    </button>
                    <button
                      onClick={() => handleDownloadDoc(doc)}
                      disabled={!doc.download_allowed}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors ${
                        doc.download_allowed
                          ? 'bg-[#C5A059] text-[#0B111E] hover:bg-[#DFB76C] font-semibold'
                          : isDark ? 'bg-stone-800 text-stone-500 cursor-not-allowed' : 'bg-stone-100 text-stone-400 cursor-not-allowed'
                      }`}
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Audit Logs */}
            <div className={`p-4 rounded-xl border text-xs font-mono-code space-y-1.5 ${
              isDark ? 'bg-[#0E1726] border-[#1E293B] text-stone-400' : 'bg-stone-100 border-stone-200 text-stone-600'
            }`}>
              <div className={`font-bold uppercase text-[10px] tracking-wider mb-1 ${isDark ? 'text-white' : 'text-[#0B111E]'}`}>
                Real-Time Compliance Audit Stream:
              </div>
              {accessLogs.slice(0, 3).map((log, i) => (
                <div key={i} className="truncate">• {log}</div>
              ))}
            </div>
          </div>
        )}

        {/* OTHER TABS: Fallbacks with clean presentation */}
        {effectiveActiveTab !== 'inv-overview' && effectiveActiveTab !== 'inv-dataroom' && (
          <div className="max-w-5xl mx-auto space-y-6">
            <div className={`border-b pb-4 flex items-center justify-between ${isDark ? 'border-[#1E293B]' : 'border-stone-200'}`}>
              <div>
                <span className="text-xs font-mono-code uppercase tracking-wider text-[#C5A059] font-bold">
                  Investor Intelligence
                </span>
                <h1 className={`font-institutional text-2xl sm:text-3xl font-bold mt-1 capitalize ${isDark ? 'text-white' : 'text-[#0B111E]'}`}>
                  {sidebarItems.find(i => i.id === effectiveActiveTab)?.label || 'Investment Section'}
                </h1>
              </div>

              <ThemeToggle variant="pill" />
            </div>

            <div className={`p-8 rounded-2xl border shadow-sm space-y-4 text-xs leading-relaxed ${
              isDark ? 'bg-[#131B2A] border-[#1E293B] text-stone-300' : 'bg-white border-stone-200 text-stone-700'
            }`}>
              <p>
                ETES is an institutional software, diagnostics, and organizational intelligence company. The platform provides employers with an independent, legally compliant environment for measuring workplace trust, detecting early organizational risks, and certifying institutional trust capital.
              </p>
              <div className="pt-4 flex gap-3">
                <button
                  onClick={() => setActiveTab('inv-dataroom')}
                  className="px-5 py-2.5 rounded-lg bg-[#C5A059] text-[#0B111E] font-bold text-xs hover:bg-[#DFB76C] transition-all"
                >
                  Enter Verified Data Room
                </button>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Document View Modal */}
      {viewingDoc && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`rounded-2xl max-w-2xl w-full p-6 space-y-4 shadow-2xl border ${
            isDark ? 'bg-[#131B2A] border-[#1E293B] text-stone-200' : 'bg-white border-stone-200 text-stone-800'
          }`}>
            <div className={`flex items-center justify-between border-b pb-3 ${isDark ? 'border-[#1E293B]' : 'border-stone-200'}`}>
              <div>
                <h3 className={`font-institutional text-lg font-bold ${isDark ? 'text-white' : 'text-[#0B111E]'}`}>
                  {viewingDoc.title}
                </h3>
                <span className="text-xs font-mono-code text-[#C5A059]">{viewingDoc.version} • {viewingDoc.file_size}</span>
              </div>
              <button onClick={() => setViewingDoc(null)} className="text-stone-400 hover:text-stone-200">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className={`p-6 rounded-xl border relative overflow-hidden text-xs space-y-3 leading-relaxed ${
              isDark ? 'bg-[#0E1726] border-[#1E293B] text-stone-300' : 'bg-[#FAF7F2] border-stone-200 text-stone-700'
            }`}>
              {/* Simulated Watermark */}
              <div className={`absolute inset-0 flex items-center justify-center pointer-events-none opacity-10 rotate-[-25deg] select-none text-2xl font-bold font-mono-code ${
                isDark ? 'text-white' : 'text-stone-900'
              }`}>
                {currentPersona.email} • {new Date().toISOString().substring(0, 10)} • CONFIDENTIAL
              </div>

              <p className={`font-semibold ${isDark ? 'text-white' : 'text-[#0B111E]'}`}>{viewingDoc.description}</p>
              <p>
                This document is licensed for preview only by authorized investors under strict non-disclosure terms. Any reproduction or distribution without prior written consent from ETES Board of Directors is strictly prohibited.
              </p>
            </div>

            <div className="flex justify-between items-center pt-2">
              <span className="text-[11px] font-mono-code text-stone-400">
                Watermarked session logged to audit chain
              </span>
              <button
                onClick={() => setViewingDoc(null)}
                className={`px-5 py-2 rounded-lg text-xs font-semibold ${
                  isDark ? 'bg-stone-800 hover:bg-stone-700 text-white' : 'bg-[#0B111E] hover:bg-[#162032] text-white'
                }`}
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Profile Modal */}
      {profileModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`border rounded-2xl max-w-md w-full p-6 space-y-6 shadow-2xl ${
            isDark ? 'bg-[#131B2A] border-[#1E293B] text-stone-200' : 'bg-white border-stone-200 text-stone-800'
          }`}>
            <div className={`flex items-center justify-between border-b pb-3 ${isDark ? 'border-[#1E293B]' : 'border-stone-200'}`}>
              <h3 className={`font-institutional text-lg font-bold ${isDark ? 'text-white' : 'text-[#0B111E]'}`}>Investor Profile</h3>
              <button onClick={() => setProfileModalOpen(false)} className="text-stone-400 hover:text-stone-200">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className={`flex justify-between py-2 border-b ${isDark ? 'border-[#1E293B]' : 'border-stone-100'}`}>
                <span className="text-stone-400">Name</span>
                <span className={`font-semibold ${isDark ? 'text-white' : 'text-[#0B111E]'}`}>{currentPersona.full_name}</span>
              </div>
              <div className={`flex justify-between py-2 border-b ${isDark ? 'border-[#1E293B]' : 'border-stone-100'}`}>
                <span className="text-stone-400">Email</span>
                <span className="font-mono-code text-stone-300">{currentPersona.email}</span>
              </div>
              <div className={`flex justify-between py-2 border-b ${isDark ? 'border-[#1E293B]' : 'border-stone-100'}`}>
                <span className="text-stone-400">Firm</span>
                <span className={`font-semibold ${isDark ? 'text-white' : 'text-[#0B111E]'}`}>Aegis Capital Partners</span>
              </div>
              <div className={`flex justify-between py-2 border-b ${isDark ? 'border-[#1E293B]' : 'border-stone-100'}`}>
                <span className="text-stone-400">Accreditation</span>
                <span className="font-mono-code text-emerald-400 font-bold">Institutional Qualified</span>
              </div>
            </div>

            <button
              onClick={() => setProfileModalOpen(false)}
              className="w-full py-2.5 rounded-lg bg-[#C5A059] text-[#0B111E] font-bold text-xs hover:bg-[#DFB76C] transition-all"
            >
              Done
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
