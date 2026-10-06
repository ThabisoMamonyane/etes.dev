import React, { useState } from 'react';
import { Person, Organisation, TrustDimensionSummary } from '../../types';
import { 
  VANGUARD_DNA_DIMENSIONS, 
  VANGUARD_BU_DNA_DIMENSIONS,
  VANGUARD_TRUST_SIGNALS,
  VANGUARD_TRUST_GAPS,
  VANGUARD_PERCEPTION_GAPS,
  VANGUARD_TRIGGER_SENSORS_AGGREGATED
} from '../../data/mockDatabase';
import { EtesLogo } from '../common/EtesLogo';
import ceoHeroImg from '../../images/ceo-director-room.jpg';
import { useTheme } from '../../context/ThemeContext';
import { ThemeToggle } from '../common/ThemeToggle';
import { 
  BarChart3,
  Radio,
  Layers,
  FileText,
  GitCompare,
  AlertTriangle,
  DownloadCloud,
  BookOpen,
  User,
  LogOut,
  Building2, 
  TrendingUp, 
  TrendingDown, 
  CheckCircle2, 
  Calendar, 
  FileDown, 
  Users, 
  ArrowUpRight, 
  ArrowDownRight, 
  ShieldAlert, 
  Sliders, 
  Lock,
  ChevronRight,
  Filter,
  Check,
  Plus,
  Flame,
  Eye,
  X,
  ChevronDown,
  Menu
} from 'lucide-react';

interface ExecutiveRoomProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currentPersona: Person;
  organisation: Organisation;
  currentScopeType: 'enterprise_wide' | 'business_unit';
  onSwitchScope: (scope: 'enterprise_wide' | 'business_unit') => void;
  onLogOut?: () => void;
}

export const ExecutiveRoom: React.FC<ExecutiveRoomProps> = ({
  activeTab,
  setActiveTab,
  currentPersona,
  organisation,
  currentScopeType,
  onSwitchScope,
  onLogOut
}) => {
  const { isDark } = useTheme();

  // Select data based on active scope (CEO Enterprise-wide vs Director BU Scoped)
  const dnaDimensions: TrustDimensionSummary[] = 
    currentScopeType === 'enterprise_wide' 
      ? VANGUARD_DNA_DIMENSIONS 
      : VANGUARD_BU_DNA_DIMENSIONS;

  const [actionsList, setActionsList] = useState([
    {
      id: 'act-01',
      dimension: 'Psychological Safety & Voice',
      title: 'Independent Operations Speak-Up Ombudsperson',
      owner: 'Head of People & Operational Safety',
      status: 'In Progress',
      targetDate: '2026-11-30',
      evidenceGoal: 'Reduce voice hesitation gap from 32% to < 10% in next cycle.'
    },
    {
      id: 'act-02',
      dimension: 'Fairness & Organisational Justice',
      title: 'Transparent Technical Promotion Criteria Matrix',
      owner: 'Fleet Engineering Director',
      status: 'Planned',
      targetDate: '2026-12-15',
      evidenceGoal: 'Clarify shift-based progression pathways for all depot staff.'
    },
    {
      id: 'act-03',
      dimension: 'Manager & Team Trust',
      title: 'Supervisor Consistency Coaching — Phase 2',
      owner: 'Regional Operations General Manager',
      status: 'Completed',
      targetDate: '2026-08-15',
      evidenceGoal: 'Sustained manager trust scores above 80 across all inland freight depots.'
    }
  ]);

  const [newActionModalOpen, setNewActionModalOpen] = useState(false);
  const [newActionTitle, setNewActionTitle] = useState('');
  const [newActionOwner, setNewActionOwner] = useState('');
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [selectedCycle, setSelectedCycle] = useState('May 2026');

  const handleAddAction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newActionTitle.trim()) return;

    setActionsList([
      ...actionsList,
      {
        id: `act-${Date.now()}`,
        dimension: 'Institutional Trust',
        title: newActionTitle,
        owner: newActionOwner || 'Executive Committee',
        status: 'Planned',
        targetDate: '2027-01-31',
        evidenceGoal: 'Agreed organizational response mapped to upcoming cycle reassessment.'
      }
    ]);
    setNewActionTitle('');
    setNewActionOwner('');
    setNewActionModalOpen(false);
  };

  // Sidebar items configuration matching Panel 4 & 5 of the mockup
  const sidebarItems = [
    { id: 'exec-overview', label: 'Overview', icon: BarChart3 },
    { id: 'exec-signals', label: 'Trust Signals', icon: Radio },
    { id: 'exec-dna', label: 'Workplace DNA', icon: Layers },
    { id: 'exec-assessments', label: 'Assessments', icon: FileText },
    { id: 'exec-gaps', label: 'Trust Gaps', icon: GitCompare },
    { id: 'exec-attention', label: 'Attention Areas', icon: AlertTriangle },
    { id: 'exec-reports', label: 'Reports', icon: DownloadCloud },
    { id: 'exec-research', label: 'Research', icon: BookOpen },
  ];

  // Radar chart calculation for 5 core dimensions
  // Radius = 80, Center = (120, 120)
  const radarMetrics = [
    { label: 'Communication', score: 72, angle: -90 },
    { label: 'Leadership', score: 68, angle: -18 },
    { label: 'Belonging', score: 80, angle: 54 },
    { label: 'Recognition', score: 55, angle: 126 },
    { label: 'Wellbeing', score: 65, angle: 198 }
  ];

  const centerX = 120;
  const centerY = 120;
  const maxR = 80;

  const getCoordinates = (angleDeg: number, ratio: number) => {
    const rad = (angleDeg * Math.PI) / 180;
    return {
      x: centerX + maxR * ratio * Math.cos(rad),
      y: centerY + maxR * ratio * Math.sin(rad)
    };
  };

  const polygonPoints = radarMetrics
    .map((m) => {
      const { x, y } = getCoordinates(m.angle, m.score / 100);
      return `${x},${y}`;
    })
    .join(' ');

  const currentTabLabel = sidebarItems.find(i => i.id === activeTab)?.label || 'Overview';

  return (
    <div 
      className={`h-full flex-1 flex flex-col lg:flex-row overflow-hidden rounded-xl border shadow-sm transition-colors duration-200 ${
        isDark ? 'border-stone-800 bg-[#070B13]' : 'border-[#E2DDD5] bg-[#FAF7F2]'
      }`} 
      id="executive-room-root"
    >
      {/* Mobile & Tablet Header Bar (Visible on mobile & tablet, hidden on desktop lg+) */}
      <div 
        className={`lg:hidden flex items-center justify-between px-3.5 py-2.5 border-b shrink-0 transition-colors ${
          isDark ? 'border-stone-800 bg-[#070B13]' : 'border-[#E2DDD5] bg-white'
        }`}
      >
        <div 
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setActiveTab('exec-overview')}
        >
          <EtesLogo 
            size="xs" 
            variant={isDark ? "light" : "dark"} 
            showSubtitle={false} 
            roomLabel="CEO & DIRECTOR'S INTELLIGENCE" 
          />
          <span className={`text-[10px] px-2 py-0.5 rounded font-mono-code font-semibold uppercase ${
            isDark ? 'bg-[#C5A059]/15 text-[#DFB76C] border border-[#C5A059]/30' : 'bg-[#8C6B28]/10 text-[#8C6B28] border border-[#8C6B28]/30'
          }`}>
            {currentTabLabel}
          </span>
        </div>

        <button
          id="executive-mobile-menu-btn"
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
                <EtesLogo size="sm" variant={isDark ? 'light' : 'dark'} showSubtitle={false} roomLabel="CEO & DIRECTOR'S INTELLIGENCE ROOM" />
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
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    id={`exec-mob-nav-${item.id}`}
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
                    ? 'text-stone-400 hover:text-white hover:bg-[#162032]' 
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
                    ? 'text-stone-400 hover:text-rose-400 hover:bg-[#162032]' 
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
        id="executive-sidebar"
      >
        {/* Logo & Header */}
        <div 
          className={`px-2 py-3 mb-4 border-b cursor-pointer ${
            isDark ? 'border-[#1E293B]' : 'border-[#E2DDD5]'
          }`}
          onClick={() => setActiveTab('exec-overview')}
        >
          <EtesLogo 
            size="sm" 
            variant={isDark ? 'light' : 'dark'} 
            showSubtitle={false} 
            roomLabel="CEO & DIRECTOR'S INTELLIGENCE ROOM" 
          />
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1" id="executive-sidebar-nav">
          {sidebarItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`exec-nav-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
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

        {/* Bottom Profile, Theme Toggle & Logout Controls (Brought up) */}
        <div className={`pt-4 mt-5 border-t space-y-1.5 ${isDark ? 'border-[#1E293B]' : 'border-[#E2DDD5]'}`}>
          <ThemeToggle variant="sidebar" />

          <button
            onClick={() => setProfileModalOpen(true)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs transition-colors ${
              isDark 
                ? 'text-stone-400 hover:text-white hover:bg-[#162032]' 
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
                ? 'text-stone-400 hover:text-rose-400 hover:bg-[#162032]' 
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
        
        {/* TAB 1: EXECUTIVE OVERVIEW (Panel 4) */}
        {activeTab === 'exec-overview' && (
          <div className="max-w-6xl mx-auto space-y-8" id="exec-overview-view">
            {/* Top Hero Banner Image */}
            <div className="relative w-full rounded-2xl overflow-hidden border border-[#C5A059]/30 shadow-lg group bg-[#111827]">
              <img
                src={ceoHeroImg}
                alt="ETES CEO and Director's Intelligence Room Banner"
                className="w-full h-48 sm:h-64 md:h-72 lg:h-80 object-cover object-center transition-transform duration-500 group-hover:scale-[1.01]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Header with Scope & Cycle Dropdowns and Theme Toggle */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
              <div>
                <h1 className={`font-institutional text-2xl sm:text-3xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-[#0B111E]'}`}>
                  CEO &amp; Director's Intelligence Overview
                </h1>
                <p className={`text-xs mt-1 ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                  Enterprise &amp; business unit institutional trust index, longitudinal trajectories, and workplace radar.
                </p>
              </div>

              {/* Filter Controls (All Business Units & May 2026 Dropdowns) */}
              <div className="flex items-center gap-3">
                {/* Scope selector */}
                <div className="relative inline-block">
                  <select
                    value={currentScopeType}
                    onChange={(e) => onSwitchScope(e.target.value as 'enterprise_wide' | 'business_unit')}
                    className={`appearance-none border text-xs font-medium py-2 pl-3.5 pr-8 rounded-lg cursor-pointer focus:outline-none focus:border-[#C5A059] ${
                      isDark 
                        ? 'bg-[#131B2A] border-[#1E293B] text-white' 
                        : 'bg-white border-stone-200 text-stone-800'
                    }`}
                  >
                    <option value="enterprise_wide">All Business Units (Enterprise)</option>
                    <option value="business_unit">Intermodal Logistics BU</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-stone-400 absolute right-2.5 top-3 pointer-events-none" />
                </div>

                {/* Cycle selector */}
                <div className="relative inline-block">
                  <select
                    value={selectedCycle}
                    onChange={(e) => setSelectedCycle(e.target.value)}
                    className={`appearance-none border text-xs font-medium py-2 pl-3.5 pr-8 rounded-lg cursor-pointer focus:outline-none focus:border-[#C5A059] ${
                      isDark 
                        ? 'bg-[#131B2A] border-[#1E293B] text-white' 
                        : 'bg-white border-stone-200 text-stone-800'
                    }`}
                  >
                    <option value="May 2026">May 2026</option>
                    <option value="Oct 2025">Oct 2025</option>
                    <option value="Apr 2025">Apr 2025</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-stone-400 absolute right-2.5 top-3 pointer-events-none" />
                </div>

                <ThemeToggle variant="pill" />
              </div>
            </div>

            {/* 4 Metric Cards (Matching Panel 4) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* Card 1: Overall Trust Index */}
              <div className={`p-5 rounded-2xl border space-y-3 shadow-sm ${
                isDark ? 'bg-[#131B2A] border-[#1E293B]' : 'bg-white border-stone-200/80'
              }`}>
                <div className={`text-xs font-medium ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>Overall Trust Index</div>
                <div className="flex items-baseline justify-between">
                  <span className={`text-3xl font-bold font-institutional ${isDark ? 'text-white' : 'text-[#0B111E]'}`}>
                    {currentScopeType === 'enterprise_wide' ? '68' : '64'}
                  </span>
                  <span className={`text-[11px] px-2 py-0.5 rounded font-semibold border ${
                    isDark 
                      ? 'bg-amber-950/70 border-amber-500/40 text-amber-300' 
                      : 'bg-amber-50 border-amber-200 text-amber-800'
                  }`}>
                    Moderate
                  </span>
                </div>
                <div className={`text-[11px] ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                  Target: 75 by Q4 2026
                </div>
              </div>

              {/* Card 2: Participation Rate */}
              <div className={`p-5 rounded-2xl border space-y-3 shadow-sm ${
                isDark ? 'bg-[#131B2A] border-[#1E293B]' : 'bg-white border-stone-200/80'
              }`}>
                <div className={`text-xs font-medium ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>Participation Rate</div>
                <div className="flex items-baseline justify-between">
                  <span className={`text-3xl font-bold font-institutional ${isDark ? 'text-white' : 'text-[#0B111E]'}`}>
                    {currentScopeType === 'enterprise_wide' ? '74%' : '82%'}
                  </span>
                  <span className={`text-[11px] px-2 py-0.5 rounded font-semibold border ${
                    isDark 
                      ? 'bg-emerald-950/70 border-emerald-500/40 text-emerald-300' 
                      : 'bg-emerald-50 border-emerald-200 text-emerald-800'
                  }`}>
                    Good
                  </span>
                </div>
                <div className={`text-[11px] ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                  {currentScopeType === 'enterprise_wide' ? '967 respondents' : '312 respondents'}
                </div>
              </div>

              {/* Card 3: Trust Trend */}
              <div className={`p-5 rounded-2xl border space-y-3 shadow-sm ${
                isDark ? 'bg-[#131B2A] border-[#1E293B]' : 'bg-white border-stone-200/80'
              }`}>
                <div className={`text-xs font-medium ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>Trust Trend</div>
                <div className="flex items-baseline justify-between">
                  <span className="text-3xl font-bold text-emerald-500 font-institutional">
                    +6
                  </span>
                  <span className="text-[11px] text-emerald-500 font-mono-code font-medium">
                    in Apr 2026
                  </span>
                </div>
                <div className={`text-[11px] ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                  Longitudinal gain over previous cycle
                </div>
              </div>

              {/* Card 4: Trust Anomaly */}
              <div className={`p-5 rounded-2xl border space-y-3 shadow-sm ${
                isDark ? 'bg-[#131B2A] border-[#1E293B]' : 'bg-white border-stone-200/80'
              }`}>
                <div className={`text-xs font-medium ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>Trust Anomaly</div>
                <div className="flex items-baseline justify-between">
                  <span className="text-3xl font-bold text-rose-500 font-institutional">
                    5
                  </span>
                  <span className={`text-[11px] px-2 py-0.5 rounded font-semibold border ${
                    isDark 
                      ? 'bg-rose-950/70 border-rose-500/40 text-rose-300' 
                      : 'bg-rose-50 border-rose-200 text-rose-800'
                  }`}>
                    Require Attention
                  </span>
                </div>
                <div className={`text-[11px] ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                  Statistically suppressed outliers
                </div>
              </div>
            </div>

            {/* 2 Main Chart Cards (Side-by-side: Trust Over Time & Workplace DNA Radar) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Left Chart: Trust Over Time */}
              <div className={`p-6 rounded-2xl border shadow-sm space-y-4 ${
                isDark ? 'bg-[#131B2A] border-[#1E293B]' : 'bg-white border-stone-200/80'
              }`}>
                <div className="flex items-center justify-between">
                  <h3 className={`font-institutional text-base font-bold ${isDark ? 'text-white' : 'text-[#0B111E]'}`}>
                    Trust Over Time
                  </h3>
                  <span className="text-[11px] font-mono-code text-[#C5A059]">Dec 25 – May 26</span>
                </div>

                {/* SVG Line Chart */}
                <div className="w-full h-64 pt-4">
                  <svg viewBox="0 0 500 220" className="w-full h-full overflow-visible">
                    <defs>
                      <linearGradient id="goldLineGrad" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#997A3D" />
                        <stop offset="50%" stopColor="#C5A059" />
                        <stop offset="100%" stopColor="#DFB76C" />
                      </linearGradient>
                      <linearGradient id="goldAreaGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#C5A059" stopOpacity={isDark ? "0.2" : "0.15"} />
                        <stop offset="100%" stopColor="#C5A059" stopOpacity="0" />
                      </linearGradient>
                    </defs>

                    {/* Y-axis grid lines & numbers */}
                    {[0, 25, 50, 75, 100].map((val) => {
                      const y = 180 - (val / 100) * 160;
                      return (
                        <g key={val}>
                          <line 
                            x1="40" 
                            y1={y} 
                            x2="480" 
                            y2={y} 
                            stroke={isDark ? '#1E293B' : '#E2DDD5'} 
                            strokeDasharray="3 3" 
                          />
                          <text 
                            x="30" 
                            y={y + 4} 
                            fill={isDark ? '#64748B' : '#94A3B8'} 
                            fontSize="10" 
                            textAnchor="end" 
                            fontFamily="monospace"
                          >
                            {val}
                          </text>
                        </g>
                      );
                    })}

                    {/* Area fill */}
                    <path
                      d="M 60,180 L 60,96 L 140,88 L 220,105 L 300,90 L 380,78 L 460,71 L 460,180 Z"
                      fill="url(#goldAreaGrad)"
                    />

                    {/* Line path */}
                    <path
                      d="M 60,96 L 140,88 L 220,105 L 300,90 L 380,78 L 460,71"
                      fill="none"
                      stroke="url(#goldLineGrad)"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />

                    {/* Data Points */}
                    {[
                      { month: 'Dec 25', x: 60, y: 96, val: '62' },
                      { month: 'Jan 26', x: 140, y: 88, val: '65' },
                      { month: 'Feb 26', x: 220, y: 105, val: '59' },
                      { month: 'Mar 26', x: 300, y: 90, val: '64' },
                      { month: 'Apr 26', x: 380, y: 78, val: '67' },
                      { month: 'May 26', x: 460, y: 71, val: '68' },
                    ].map((pt, idx) => (
                      <g key={idx} className="cursor-pointer">
                        <circle cx={pt.x} cy={pt.y} r="5" fill="#C5A059" stroke={isDark ? "#131B2A" : "#FFFFFF"} strokeWidth="2" />
                        <text x={pt.x} y="198" fill={isDark ? "#94A3B8" : "#64748B"} fontSize="10" textAnchor="middle">
                          {pt.month}
                        </text>
                        <text x={pt.x} y={pt.y - 10} fill="#C5A059" fontSize="10" fontWeight="bold" textAnchor="middle">
                          {pt.val}
                        </text>
                      </g>
                    ))}
                  </svg>
                </div>
              </div>

              {/* Right Chart: Workplace DNA Radar (Matching Panel 4) */}
              <div className={`p-6 rounded-2xl border shadow-sm space-y-4 flex flex-col justify-between ${
                isDark ? 'bg-[#131B2A] border-[#1E293B]' : 'bg-white border-stone-200/80'
              }`}>
                <div className="flex items-center justify-between">
                  <h3 className={`font-institutional text-base font-bold ${isDark ? 'text-white' : 'text-[#0B111E]'}`}>
                    Workplace DNA Radar
                  </h3>
                  <span className="text-[11px] font-mono-code text-[#C5A059]">5 Key Facets</span>
                </div>

                {/* SVG Radar Chart */}
                <div className="w-full h-64 flex items-center justify-center">
                  <svg viewBox="0 0 240 240" className="w-full h-full max-w-[240px] overflow-visible">
                    {/* Concentric rings */}
                    {[0.25, 0.5, 0.75, 1.0].map((level) => (
                      <circle
                        key={level}
                        cx={centerX}
                        cy={centerY}
                        r={maxR * level}
                        fill="none"
                        stroke={isDark ? '#1E293B' : '#E2DDD5'}
                        strokeDasharray={level === 1 ? 'none' : '2 2'}
                      />
                    ))}

                    {/* Radial spokes */}
                    {radarMetrics.map((m, i) => {
                      const coord = getCoordinates(m.angle, 1);
                      return (
                        <line
                          key={i}
                          x1={centerX}
                          y1={centerY}
                          x2={coord.x}
                          y2={coord.y}
                          stroke={isDark ? '#1E293B' : '#E2DDD5'}
                        />
                      );
                    })}

                    {/* Shaded polygon */}
                    <polygon
                      points={polygonPoints}
                      fill="#C5A059"
                      fillOpacity={isDark ? "0.3" : "0.2"}
                      stroke="#C5A059"
                      strokeWidth="2"
                    />

                    {/* Data points & labels */}
                    {radarMetrics.map((m, i) => {
                      const pt = getCoordinates(m.angle, m.score / 100);
                      const labelPt = getCoordinates(m.angle, 1.25);
                      return (
                        <g key={i}>
                          <circle cx={pt.x} cy={pt.y} r="4" fill="#DFB76C" />
                          <text
                            x={labelPt.x}
                            y={labelPt.y + 4}
                            fill={isDark ? '#CBD5E1' : '#475569'}
                            fontSize="9"
                            fontWeight="600"
                            textAnchor="middle"
                          >
                            {m.label} ({m.score})
                          </text>
                        </g>
                      );
                    })}
                  </svg>
                </div>

                <div className="text-center pt-2">
                  <span className={`text-[11px] ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                    Strongest: <strong className="text-emerald-500">Belonging (80)</strong> • Focus: <strong className="text-amber-500">Recognition (55)</strong>
                  </span>
                </div>
              </div>

            </div>

            {/* Panel 5 Elements Preview inside Overview: Trust Gaps & Attention Areas */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
              
              {/* Left Card: Top Trust Gaps (Matching Panel 5) */}
              <div className={`p-6 rounded-2xl border shadow-sm space-y-4 ${
                isDark ? 'bg-[#131B2A] border-[#1E293B]' : 'bg-white border-stone-200/80'
              }`}>
                <div className="flex items-center justify-between">
                  <h3 className={`font-institutional text-base font-bold ${isDark ? 'text-white' : 'text-[#0B111E]'}`}>
                    Top Trust Gaps
                  </h3>
                  <span className={`text-[11px] ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>Largest Delta</span>
                </div>

                <div className="space-y-3">
                  {[
                    { rank: 1, name: 'Management Communication', diff: '-18' },
                    { rank: 2, name: 'Recognition & Appreciation', diff: '-16' },
                    { rank: 3, name: 'Fair Treatment', diff: '-15' },
                    { rank: 4, name: 'Career Growth Opportunities', diff: '-12' },
                    { rank: 5, name: 'Workload Balance', diff: '-10' },
                  ].map((gap) => (
                    <div 
                      key={gap.rank}
                      className={`flex items-center justify-between p-3 rounded-xl border transition-all text-xs ${
                        isDark 
                          ? 'bg-[#162032] border-[#1E293B] hover:border-[#C5A059]/30' 
                          : 'bg-[#FAF9F6] border-stone-200/60 hover:border-[#C5A059]/30'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-5 h-5 rounded-full flex items-center justify-center font-mono-code font-bold text-[10px] ${
                          isDark ? 'bg-[#1E293B] text-stone-400' : 'bg-stone-200 text-stone-700'
                        }`}>
                          {gap.rank}
                        </span>
                        <span className={`font-medium ${isDark ? 'text-stone-200' : 'text-stone-800'}`}>{gap.name}</span>
                      </div>
                      <span className={`px-2 py-0.5 rounded font-mono-code font-bold border ${
                        isDark 
                          ? 'bg-rose-950/70 border-rose-500/40 text-rose-300' 
                          : 'bg-rose-50 border-rose-200 text-rose-700'
                      }`}>
                        {gap.diff}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex justify-center">
                  <button
                    onClick={() => setActiveTab('exec-gaps')}
                    className={`w-full py-2 rounded-lg border text-xs font-medium transition-all text-center ${
                      isDark 
                        ? 'bg-[#1A2333] hover:bg-[#222E42] border-[#1E293B] text-stone-300' 
                        : 'bg-[#FAF7F2] hover:bg-[#F2ECE3] border-stone-200 text-stone-700'
                    }`}
                  >
                    View All Gaps
                  </button>
                </div>
              </div>

              {/* Right Card: Attention Areas (Matching Panel 5) */}
              <div className={`p-6 rounded-2xl border shadow-sm space-y-4 ${
                isDark ? 'bg-[#131B2A] border-[#1E293B]' : 'bg-white border-stone-200/80'
              }`}>
                <div className="flex items-center justify-between">
                  <h3 className={`font-institutional text-base font-bold ${isDark ? 'text-white' : 'text-[#0B111E]'}`}>
                    Attention Areas
                  </h3>
                  <span className={`text-[11px] ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>Governance Triaged</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* High Impact / High Urgency */}
                  <div className={`p-4 rounded-xl border space-y-2 ${
                    isDark ? 'bg-[#162032] border-rose-500/30' : 'bg-rose-50/70 border-rose-200'
                  }`}>
                    <div className="flex items-center justify-between">
                      <Flame className="w-4 h-4 text-rose-500" />
                      <span className="text-xs font-mono-code font-bold text-rose-600">3 Areas</span>
                    </div>
                    <div className={`text-xs font-semibold ${isDark ? 'text-white' : 'text-rose-950'}`}>High Impact / High Urgency</div>
                    <div className={`text-[10px] ${isDark ? 'text-stone-400' : 'text-rose-800'}`}>Immediate board review recommended</div>
                  </div>

                  {/* High Impact / Medium Urgency */}
                  <div className={`p-4 rounded-xl border space-y-2 ${
                    isDark ? 'bg-[#162032] border-amber-500/30' : 'bg-amber-50/70 border-amber-200'
                  }`}>
                    <div className="flex items-center justify-between">
                      <Flame className="w-4 h-4 text-amber-500" />
                      <span className="text-xs font-mono-code font-bold text-amber-600">2 Areas</span>
                    </div>
                    <div className={`text-xs font-semibold ${isDark ? 'text-white' : 'text-amber-950'}`}>High Impact / Med Urgency</div>
                    <div className={`text-[10px] ${isDark ? 'text-stone-400' : 'text-amber-800'}`}>Schedule in 60-day repair sprint</div>
                  </div>

                  {/* Medium Impact / High Urgency */}
                  <div className={`p-4 rounded-xl border space-y-2 ${
                    isDark ? 'bg-[#162032] border-orange-500/30' : 'bg-orange-50/70 border-orange-200'
                  }`}>
                    <div className="flex items-center justify-between">
                      <AlertTriangle className="w-4 h-4 text-orange-500" />
                      <span className="text-xs font-mono-code font-bold text-orange-600">2 Areas</span>
                    </div>
                    <div className={`text-xs font-semibold ${isDark ? 'text-white' : 'text-orange-950'}`}>Med Impact / High Urgency</div>
                    <div className={`text-[10px] ${isDark ? 'text-stone-400' : 'text-orange-800'}`}>Depot management coaching required</div>
                  </div>

                  {/* Monitor */}
                  <div className={`p-4 rounded-xl border space-y-2 ${
                    isDark ? 'bg-[#162032] border-blue-500/30' : 'bg-blue-50/70 border-blue-200'
                  }`}>
                    <div className="flex items-center justify-between">
                      <Eye className="w-4 h-4 text-blue-500" />
                      <span className="text-xs font-mono-code font-bold text-blue-600">4 Areas</span>
                    </div>
                    <div className={`text-xs font-semibold ${isDark ? 'text-white' : 'text-blue-950'}`}>Monitor</div>
                    <div className={`text-[10px] ${isDark ? 'text-stone-400' : 'text-blue-800'}`}>Stable longitudinal baseline</div>
                  </div>
                </div>

                <div className="pt-2 flex justify-center">
                  <button
                    onClick={() => setActiveTab('exec-attention')}
                    className="w-full py-2 rounded-lg bg-[#C5A059] hover:bg-[#DFB76C] text-[#0B111E] text-xs font-bold transition-all text-center shadow-md"
                  >
                    View Action Plan
                  </button>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* TAB 2: TRUST SIGNALS */}
        {activeTab === 'exec-signals' && (
          <div className="max-w-5xl mx-auto space-y-6" id="exec-signals-view">
            <div className={`border-b pb-4 flex items-center justify-between ${isDark ? 'border-[#1E293B]' : 'border-stone-200'}`}>
              <div>
                <span className="text-xs font-mono-code uppercase tracking-wider text-[#C5A059] font-bold">
                  Institutional Early Warning
                </span>
                <h1 className={`font-institutional text-2xl sm:text-3xl font-bold mt-1 ${isDark ? 'text-white' : 'text-[#0B111E]'}`}>
                  Trust Signals & Trigger Sensors
                </h1>
                <p className={`text-xs mt-1 ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                  Zero-trace aggregated sensor triggers filtered through mathematical suppression rules.
                </p>
              </div>

              <ThemeToggle variant="pill" />
            </div>

            <div className="space-y-4">
              {VANGUARD_TRUST_SIGNALS.map((sig, idx) => (
                <div 
                  key={idx} 
                  className={`p-5 rounded-xl border flex items-center justify-between shadow-sm ${
                    isDark ? 'bg-[#131B2A] border-[#1E293B]' : 'bg-white border-stone-200'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-bold ${isDark ? 'text-white' : 'text-[#0B111E]'}`}>{sig.name}</span>
                      <span className="text-[10px] font-mono-code text-[#C5A059]">({sig.dimension})</span>
                    </div>
                    <p className={`text-xs ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>{sig.evidence_note}</p>
                  </div>
                  <span className={`text-xs px-2.5 py-1 rounded font-semibold font-mono-code border ${
                    sig.direction === 'declining' || sig.direction === 'divergent' 
                      ? isDark ? 'bg-rose-950/80 text-rose-300 border-rose-500/40' : 'bg-rose-50 text-rose-700 border-rose-200'
                      : isDark ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40' : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  }`}>
                    {sig.direction.toUpperCase()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: WORKPLACE DNA */}
        {activeTab === 'exec-dna' && (
          <div className="max-w-5xl mx-auto space-y-6" id="exec-dna-view">
            <div className={`border-b pb-4 flex items-center justify-between ${isDark ? 'border-[#1E293B]' : 'border-stone-200'}`}>
              <div>
                <span className="text-xs font-mono-code uppercase tracking-wider text-[#C5A059] font-bold">
                  Dimension Intelligence
                </span>
                <h1 className={`font-institutional text-2xl sm:text-3xl font-bold mt-1 ${isDark ? 'text-white' : 'text-[#0B111E]'}`}>
                  Workplace DNA Matrix
                </h1>
                <p className={`text-xs mt-1 ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                  Detailed indices across all 12 core organizational trust dimensions.
                </p>
              </div>

              <ThemeToggle variant="pill" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {dnaDimensions.map((dim) => (
                <div 
                  key={dim.id} 
                  className={`p-5 rounded-xl border space-y-2 shadow-sm ${
                    isDark ? 'bg-[#131B2A] border-[#1E293B]' : 'bg-white border-stone-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono-code text-[#C5A059]">Dimension {dim.id}</span>
                    <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-[#0B111E]'}`}>{dim.score.toFixed(1)} / 100</span>
                  </div>
                  <h4 className={`text-sm font-semibold font-institutional ${isDark ? 'text-white' : 'text-[#0B111E]'}`}>{dim.name}</h4>
                  <div className={`w-full h-2 rounded-full overflow-hidden ${isDark ? 'bg-[#1E293B]' : 'bg-stone-100'}`}>
                    <div className="h-full bg-[#C5A059] rounded-full" style={{ width: `${dim.score}%` }} />
                  </div>
                  <p className={`text-[11px] pt-1 ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>{dim.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: ASSESSMENTS */}
        {activeTab === 'exec-assessments' && (
          <div className="max-w-5xl mx-auto space-y-6" id="exec-assessments-view">
            <div className={`border-b pb-4 flex items-center justify-between ${isDark ? 'border-[#1E293B]' : 'border-stone-200'}`}>
              <div>
                <span className="text-xs font-mono-code uppercase tracking-wider text-[#C5A059] font-bold">
                  Cycle Administration
                </span>
                <h1 className={`font-institutional text-2xl sm:text-3xl font-bold mt-1 ${isDark ? 'text-white' : 'text-[#0B111E]'}`}>
                  Assessment Cycles & Demographics
                </h1>
                <p className={`text-xs mt-1 ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                  Audit validation, participation quotas, and sample reliability thresholds.
                </p>
              </div>

              <ThemeToggle variant="pill" />
            </div>

            <div className={`border rounded-xl p-6 space-y-4 shadow-sm ${
              isDark ? 'bg-[#131B2A] border-[#1E293B]' : 'bg-white border-stone-200'
            }`}>
              <div className={`flex justify-between items-center pb-4 border-b ${isDark ? 'border-[#1E293B]' : 'border-stone-100'}`}>
                <div>
                  <h3 className={`font-bold ${isDark ? 'text-white' : 'text-[#0B111E]'}`}>May 2026 Annual Trust Census</h3>
                  <span className={`text-xs ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>Total Eligible: 1,240 staff • Responses: 967 (74%)</span>
                </div>
                <span className={`px-3 py-1 rounded text-xs font-semibold border ${
                  isDark 
                    ? 'bg-emerald-950/70 border-emerald-500/40 text-emerald-300' 
                    : 'bg-emerald-50 border-emerald-200 text-emerald-700'
                }`}>
                  Sample Validated
                </span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: TRUST GAPS */}
        {activeTab === 'exec-gaps' && (
          <div className="max-w-5xl mx-auto space-y-6" id="exec-gaps-view">
            <div className={`border-b pb-4 flex items-center justify-between ${isDark ? 'border-[#1E293B]' : 'border-stone-200'}`}>
              <div>
                <span className="text-xs font-mono-code uppercase tracking-wider text-[#C5A059] font-bold">
                  Perception & Alignment Delta
                </span>
                <h1 className={`font-institutional text-2xl sm:text-3xl font-bold mt-1 ${isDark ? 'text-white' : 'text-[#0B111E]'}`}>
                  Trust Gaps & Divergence
                </h1>
                <p className={`text-xs mt-1 ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                  Measuring misalignment between executive expectation and frontline workforce reality.
                </p>
              </div>

              <ThemeToggle variant="pill" />
            </div>

            <div className="space-y-3">
              {VANGUARD_PERCEPTION_GAPS.map((gap, idx) => (
                <div 
                  key={idx} 
                  className={`p-5 rounded-xl border space-y-2 shadow-sm ${
                    isDark ? 'bg-[#131B2A] border-[#1E293B]' : 'bg-white border-stone-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-[#0B111E]'}`}>{gap.title}</span>
                    <span className={`px-2.5 py-0.5 rounded font-mono-code text-xs font-bold border ${
                      isDark 
                        ? 'bg-rose-950/70 border-rose-500/40 text-rose-300' 
                        : 'bg-rose-50 border-rose-200 text-rose-700'
                    }`}>
                      Gap: {Math.abs(gap.leadership_perspective - gap.employee_perspective)} pts
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
                    <div className={`p-2.5 rounded ${isDark ? 'bg-[#162032] text-stone-300' : 'bg-stone-50 text-stone-700'}`}>
                      <strong className={`block ${isDark ? 'text-white' : 'text-[#0B111E]'}`}>Leadership View ({gap.leadership_perspective})</strong>
                      {gap.analysis_note}
                    </div>
                    <div className={`p-2.5 rounded ${isDark ? 'bg-[#162032] text-stone-300' : 'bg-stone-50 text-stone-700'}`}>
                      <strong className="text-rose-500 block">Workforce View ({gap.employee_perspective})</strong>
                      Grassroots sentiment from anonymous participation.
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: ATTENTION AREAS */}
        {activeTab === 'exec-attention' && (
          <div className="max-w-5xl mx-auto space-y-6" id="exec-attention-view">
            <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4 ${
              isDark ? 'border-[#1E293B]' : 'border-stone-200'
            }`}>
              <div>
                <span className="text-xs font-mono-code uppercase tracking-wider text-[#C5A059] font-bold">
                  Governance & Remediation
                </span>
                <h1 className={`font-institutional text-2xl sm:text-3xl font-bold mt-1 ${isDark ? 'text-white' : 'text-[#0B111E]'}`}>
                  Attention Areas & Actions
                </h1>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setNewActionModalOpen(true)}
                  className="px-4 py-2 rounded-lg bg-[#C5A059] text-[#0B111E] font-bold text-xs flex items-center gap-1.5 shadow-md hover:bg-[#DFB76C]"
                >
                  <Plus className="w-4 h-4" />
                  <span>Log Governance Action</span>
                </button>

                <ThemeToggle variant="pill" />
              </div>
            </div>

            <div className="space-y-4">
              {actionsList.map((act) => (
                <div 
                  key={act.id} 
                  className={`p-5 rounded-xl border space-y-2 shadow-sm ${
                    isDark ? 'bg-[#131B2A] border-[#1E293B]' : 'bg-white border-stone-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono-code text-[#C5A059]">{act.dimension}</span>
                    <span className={`text-xs px-2.5 py-0.5 rounded ${
                      isDark ? 'bg-[#1E293B] text-stone-200' : 'bg-stone-100 text-stone-700'
                    }`}>
                      Target: {act.targetDate}
                    </span>
                  </div>
                  <h4 className={`text-base font-bold font-institutional ${isDark ? 'text-white' : 'text-[#0B111E]'}`}>{act.title}</h4>
                  <div className={`text-xs ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                    Owner: <strong className={isDark ? 'text-white' : 'text-[#0B111E]'}>{act.owner}</strong>
                  </div>
                  <div className={`text-xs p-3 rounded border ${
                    isDark ? 'bg-[#162032] text-stone-300 border-[#1E293B]' : 'bg-[#FAF9F6] text-stone-700 border-stone-200'
                  }`}>
                    <strong>Target Evidence:</strong> {act.evidenceGoal}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 7: REPORTS */}
        {activeTab === 'exec-reports' && (
          <div className="max-w-5xl mx-auto space-y-6" id="exec-reports-view">
            <div className={`border-b pb-4 flex items-center justify-between ${isDark ? 'border-[#1E293B]' : 'border-stone-200'}`}>
              <div>
                <span className="text-xs font-mono-code uppercase tracking-wider text-[#C5A059] font-bold">
                  Official Certification Packs
                </span>
                <h1 className={`font-institutional text-2xl sm:text-3xl font-bold mt-1 ${isDark ? 'text-white' : 'text-[#0B111E]'}`}>
                  Executive & Board Reports
                </h1>
                <p className={`text-xs mt-1 ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                  Standardized governance dossiers for board audit committees, investors, and regulators.
                </p>
              </div>

              <ThemeToggle variant="pill" />
            </div>

            <div className="space-y-3">
              {[
                { title: 'Executive Comprehensive Dossier — May 2026', format: 'PDF • 38 Pages', type: 'Confidential Board Pack' },
                { title: 'Trust Trajectory & Retention Risk Summary', format: 'PDF • 14 Pages', type: 'Committee Briefing' },
                { title: 'POPIA / Zero-Trace Methodology Attestation', format: 'PDF • 6 Pages', type: 'Compliance Attestation' }
              ].map((doc, idx) => (
                <div 
                  key={idx} 
                  className={`p-5 rounded-xl border flex items-center justify-between shadow-sm ${
                    isDark ? 'bg-[#131B2A] border-[#1E293B]' : 'bg-white border-stone-200'
                  }`}
                >
                  <div>
                    <h4 className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-[#0B111E]'}`}>{doc.title}</h4>
                    <span className={`text-xs ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>{doc.format} • {doc.type}</span>
                  </div>
                  <button 
                    onClick={() => alert(`Downloading ${doc.title}`)}
                    className={`px-4 py-2 rounded-lg border text-xs font-medium flex items-center gap-1.5 transition-colors ${
                      isDark 
                        ? 'bg-[#1A2333] hover:bg-[#222E42] border-[#1E293B] text-stone-200' 
                        : 'bg-[#FAF7F2] hover:bg-[#F2ECE3] border-stone-300 text-stone-700'
                    }`}
                  >
                    <DownloadCloud className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>Download</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 8: RESEARCH */}
        {activeTab === 'exec-research' && (
          <div className="max-w-5xl mx-auto space-y-6" id="exec-research-view">
            <div className={`border-b pb-4 flex items-center justify-between ${isDark ? 'border-[#1E293B]' : 'border-stone-200'}`}>
              <div>
                <span className="text-xs font-mono-code uppercase tracking-wider text-[#C5A059] font-bold">
                  Methodology & Foundation
                </span>
                <h1 className={`font-institutional text-2xl sm:text-3xl font-bold mt-1 ${isDark ? 'text-white' : 'text-[#0B111E]'}`}>
                  Institutional Research & Science
                </h1>
                <p className={`text-xs mt-1 ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                  The scientific and legal foundation governing the ETES Trust Index™.
                </p>
              </div>

              <ThemeToggle variant="pill" />
            </div>

            <div className={`p-6 rounded-xl border space-y-4 text-xs leading-relaxed shadow-sm ${
              isDark ? 'bg-[#131B2A] border-[#1E293B] text-stone-300' : 'bg-white border-stone-200 text-stone-700'
            }`}>
              <p>
                The ETES Trust Architecture is anchored in longitudinal organizational psychology, institutional economics, and constitutional safeguarding principles. Unlike subjective engagement pulse tools, ETES treats workplace trust as an institutional capital asset with verifiable risk-weighted returns.
              </p>
            </div>
          </div>
        )}

      </main>

      {/* Action Planning Modal */}
      {newActionModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`border rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl ${
            isDark ? 'bg-[#131B2A] border-[#C5A059]/40 text-white' : 'bg-white border-stone-200 text-stone-800'
          }`}>
            <div className={`flex items-center justify-between border-b pb-3 ${isDark ? 'border-[#1E293B]' : 'border-stone-200'}`}>
              <h3 className={`font-institutional text-lg font-bold ${isDark ? 'text-white' : 'text-[#0B111E]'}`}>Log Governance Action Plan</h3>
              <button onClick={() => setNewActionModalOpen(false)} className="text-stone-400 hover:text-stone-200">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddAction} className="space-y-4 text-xs">
              <div>
                <label className={`block mb-1 ${isDark ? 'text-stone-400' : 'text-stone-600'}`}>Action Title / Initiative</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Transparent Promotion Framework Rollout"
                  value={newActionTitle}
                  onChange={(e) => setNewActionTitle(e.target.value)}
                  className={`w-full p-2.5 rounded-lg border focus:outline-none focus:border-[#C5A059] ${
                    isDark 
                      ? 'bg-[#162032] border-[#1E293B] text-white' 
                      : 'bg-stone-50 border-stone-200 text-stone-800'
                  }`}
                />
              </div>

              <div>
                <label className={`block mb-1 ${isDark ? 'text-stone-400' : 'text-stone-600'}`}>Accountable Executive Owner</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Chief People Officer"
                  value={newActionOwner}
                  onChange={(e) => setNewActionOwner(e.target.value)}
                  className={`w-full p-2.5 rounded-lg border focus:outline-none focus:border-[#C5A059] ${
                    isDark 
                      ? 'bg-[#162032] border-[#1E293B] text-white' 
                      : 'bg-stone-50 border-stone-200 text-stone-800'
                  }`}
                />
              </div>

              <div className={`flex justify-end gap-3 pt-3 border-t ${isDark ? 'border-[#1E293B]' : 'border-stone-200'}`}>
                <button
                  type="button"
                  onClick={() => setNewActionModalOpen(false)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    isDark ? 'bg-[#1A2333] text-stone-300 hover:bg-[#222E42]' : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-[#C5A059] text-[#0B111E] font-bold hover:bg-[#DFB76C] transition-colors"
                >
                  Save Action
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Profile Modal */}
      {profileModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`border rounded-2xl max-w-md w-full p-6 space-y-6 shadow-2xl ${
            isDark ? 'bg-[#131B2A] border-[#C5A059]/40 text-white' : 'bg-white border-stone-200 text-stone-800'
          }`}>
            <div className={`flex items-center justify-between border-b pb-4 ${isDark ? 'border-[#1E293B]' : 'border-stone-200'}`}>
              <h3 className={`font-institutional text-lg font-bold ${isDark ? 'text-white' : 'text-[#0B111E]'}`}>Executive Profile</h3>
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
                <span className="text-stone-400">Role</span>
                <span className={`font-semibold ${isDark ? 'text-white' : 'text-[#0B111E]'}`}>{currentPersona.title}</span>
              </div>
              <div className={`flex justify-between py-2 border-b ${isDark ? 'border-[#1E293B]' : 'border-stone-100'}`}>
                <span className="text-stone-400">Organisation</span>
                <span className={isDark ? 'text-white' : 'text-stone-800'}>{organisation.legal_name}</span>
              </div>
              <div className={`flex justify-between py-2 border-b ${isDark ? 'border-[#1E293B]' : 'border-stone-100'}`}>
                <span className="text-stone-400">Governed Scope</span>
                <span className="font-mono-code text-[#C5A059] font-bold">
                  {currentScopeType === 'enterprise_wide' ? 'Enterprise-Wide (CEO)' : 'Intermodal BU (Director)'}
                </span>
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
