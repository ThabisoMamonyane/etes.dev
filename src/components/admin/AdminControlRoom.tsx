import React, { useState } from 'react';
import { 
  CORE_QUESTION_ITEMS, 
  TRIGGER_SENSOR_ITEMS, 
  QUESTION_BANK_VERSION,
  TRUST_DIMENSIONS_CONFIG 
} from '../../data/questionBank';
import { 
  SAMPLE_ORGANISATIONS, 
  INITIAL_AUDIT_LOGS, 
  DISTINCT_PERSONAS 
} from '../../data/mockDatabase';
import { Person, Organisation, AuditLogEntry } from '../../types';
import { EtesLogo } from '../common/EtesLogo';
import { useTheme } from '../../context/ThemeContext';
import { ThemeToggle } from '../common/ThemeToggle';
import { 
  BarChart3,
  Building2,
  Users,
  FileText,
  ShieldCheck,
  DownloadCloud,
  Sliders,
  Clock,
  LogOut,
  Database, 
  Award, 
  CheckCircle2, 
  AlertTriangle, 
  Lock, 
  Plus, 
  Search,
  Eye,
  RefreshCw,
  FolderLock,
  Check,
  X,
  Menu
} from 'lucide-react';

interface AdminControlRoomProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currentPersona: Person;
  onLogOut?: () => void;
}

export const AdminControlRoom: React.FC<AdminControlRoomProps> = ({
  activeTab,
  setActiveTab,
  currentPersona,
  onLogOut
}) => {
  const { isDark } = useTheme();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(INITIAL_AUDIT_LOGS);
  const [selectedDimensionFilter, setSelectedDimensionFilter] = useState<number>(0);
  
  // Publication review states
  const [pendingApprovals, setPendingApprovals] = useState([
    {
      id: 'appr-01',
      org: 'Vanguard Logistics SA',
      type: 'Public Signal',
      item: 'Manager Trust Improving (+6.0)',
      submittedBy: 'Chief Analytics Officer',
      status: 'Approved',
      date: '2026-09-02'
    },
    {
      id: 'appr-02',
      org: 'Apex Minerals',
      type: 'Trust Journey Milestone',
      item: 'Shift Fatigue Buffer Implemented (We Acted)',
      submittedBy: 'Lead Safeguarding Auditor',
      status: 'Pending Review',
      date: '2026-09-03'
    },
    {
      id: 'appr-03',
      org: 'Meridian Healthcare',
      type: 'Certification Renewal',
      item: 'Three-Year Term Extension Request',
      submittedBy: 'Head of Quality & Certification',
      status: 'Pending Review',
      date: '2026-09-03'
    }
  ]);

  const handleApprove = (id: string) => {
    setPendingApprovals(
      pendingApprovals.map((item) =>
        item.id === id ? { ...item, status: 'Approved' } : item
      )
    );
  };

  // Sidebar items matching Panel 8 of the mockup image
  const sidebarItems = [
    { id: 'admin-dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'admin-orgs', label: 'Organisations', icon: Building2 },
    { id: 'admin-users', label: 'Users & Roles', icon: Users },
    { id: 'admin-assessments', label: 'Assessments', icon: FileText },
    { id: 'admin-security', label: 'Data & Security', icon: ShieldCheck },
    { id: 'admin-reports', label: 'Reports', icon: DownloadCloud },
    { id: 'admin-settings', label: 'System Settings', icon: Sliders },
    { id: 'admin-audit', label: 'Audit Log', icon: Clock },
  ];

  const effectiveActiveTab = activeTab === 'admin-cms' ? 'admin-dashboard' : activeTab;
  const currentTabLabel = sidebarItems.find(i => i.id === effectiveActiveTab)?.label || 'Dashboard';

  return (
    <div 
      className={`h-full flex-1 flex flex-col lg:flex-row overflow-hidden rounded-xl border shadow-sm transition-colors duration-200 ${
        isDark ? 'border-stone-800 bg-[#070B13]' : 'border-[#E2DDD5] bg-[#FAF7F2]'
      }`} 
      id="admin-control-room-root"
    >
      {/* Mobile & Tablet Header Bar (Visible on mobile & tablet, hidden on desktop lg+) */}
      <div 
        className={`lg:hidden flex items-center justify-between px-3.5 py-2.5 border-b shrink-0 transition-colors ${
          isDark ? 'border-stone-800 bg-[#070B13]' : 'border-[#E2DDD5] bg-white'
        }`}
      >
        <div 
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setActiveTab('admin-dashboard')}
        >
          <EtesLogo 
            size="xs" 
            variant={isDark ? "light" : "dark"} 
            showSubtitle={false} 
            roomLabel="ADMIN" 
          />
          <span className={`text-[10px] px-2 py-0.5 rounded font-mono-code font-semibold uppercase ${
            isDark ? 'bg-[#C5A059]/15 text-[#DFB76C] border border-[#C5A059]/30' : 'bg-[#8C6B28]/10 text-[#8C6B28] border border-[#8C6B28]/30'
          }`}>
            {currentTabLabel}
          </span>
        </div>

        <button
          id="admin-mobile-menu-btn"
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
                <EtesLogo size="sm" variant={isDark ? 'light' : 'dark'} showSubtitle={false} roomLabel="ADMIN ROOM" />
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
                    id={`admin-mob-nav-${item.id}`}
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
        id="admin-sidebar"
      >
        {/* Logo Header */}
        <div 
          className={`px-2 py-3 mb-4 border-b cursor-pointer ${
            isDark ? 'border-[#1E293B]' : 'border-[#E2DDD5]'
          }`}
          onClick={() => setActiveTab('admin-dashboard')}
        >
          <EtesLogo 
            size="sm" 
            variant={isDark ? 'light' : 'dark'} 
            showSubtitle={false} 
            roomLabel="ADMIN ROOM" 
          />
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1" id="admin-sidebar-nav">
          {sidebarItems.map((item) => {
            const isActive = effectiveActiveTab === item.id;
            return (
              <button
                key={item.id}
                id={`admin-nav-${item.id}`}
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

        {/* Bottom Controls: Theme Toggle & Logout (Brought up) */}
        <div className={`pt-4 mt-5 border-t space-y-1.5 ${isDark ? 'border-[#1E293B]' : 'border-[#E2DDD5]'}`}>
          <ThemeToggle variant="sidebar" />

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
      <main className={`flex-1 min-h-0 h-full overflow-y-auto p-3.5 sm:p-5 lg:p-8 ${isDark ? 'bg-[#0B111E]' : 'bg-[#FAF9F6]'}`}>
        
        {/* TAB 1: ADMIN DASHBOARD (Matching Panel 8) */}
        {effectiveActiveTab === 'admin-dashboard' && (
          <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8" id="admin-dashboard-view">
            
            {/* Header with quick Theme Toggle pill */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className={`font-institutional text-2xl sm:text-3xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-[#0B111E]'}`}>
                  Admin Dashboard
                </h1>
                <p className={`text-xs mt-1 ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                  Platform operations, tenant orchestration, security monitors, and institutional audit chains.
                </p>
              </div>

              <ThemeToggle variant="pill" />
            </div>

            {/* 4 Metric Cards (Matching Panel 8) */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              
              {/* Card 1: Organisations */}
              <div className={`p-4 sm:p-5 rounded-2xl border shadow-sm space-y-2 ${
                isDark ? 'bg-[#131B2A] border-[#1E293B]' : 'bg-white border-stone-200/80'
              }`}>
                <div className={`text-xs font-medium ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>Organisations</div>
                <div className={`text-2xl sm:text-3xl font-bold font-institutional ${isDark ? 'text-white' : 'text-[#0B111E]'}`}>
                  184
                </div>
                <div className={`text-xs ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                  Total
                </div>
              </div>

              {/* Card 2: Users */}
              <div className={`p-4 sm:p-5 rounded-2xl border shadow-sm space-y-2 ${
                isDark ? 'bg-[#131B2A] border-[#1E293B]' : 'bg-white border-stone-200/80'
              }`}>
                <div className={`text-xs font-medium ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>Users</div>
                <div className={`text-2xl sm:text-3xl font-bold font-institutional ${isDark ? 'text-white' : 'text-[#0B111E]'}`}>
                  2,842
                </div>
                <div className={`text-xs ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                  Total
                </div>
              </div>

              {/* Card 3: Assessments */}
              <div className={`p-4 sm:p-5 rounded-2xl border shadow-sm space-y-2 ${
                isDark ? 'bg-[#131B2A] border-[#1E293B]' : 'bg-white border-stone-200/80'
              }`}>
                <div className={`text-xs font-medium ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>Assessments</div>
                <div className={`text-2xl sm:text-3xl font-bold font-institutional ${isDark ? 'text-white' : 'text-[#0B111E]'}`}>
                  3,184
                </div>
                <div className={`text-xs ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                  Completed
                </div>
              </div>

              {/* Card 4: System Health */}
              <div className={`p-4 sm:p-5 rounded-2xl border shadow-sm space-y-2 ${
                isDark ? 'bg-[#131B2A] border-[#1E293B]' : 'bg-white border-stone-200/80'
              }`}>
                <div className={`text-xs font-medium ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>System Health</div>
                <div className="text-2xl sm:text-3xl font-bold text-emerald-500 font-institutional">
                  100%
                </div>
                <div className={`text-xs ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                  Optimal
                </div>
              </div>

            </div>

            {/* 2 Main Cards: System Activity (7 Days) & Security Status */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6 items-stretch">
              
              {/* Left Card: System Activity (7 Days) - SVG Bar Chart */}
              <div className={`p-5 sm:p-6 rounded-2xl border shadow-sm flex flex-col justify-between h-full ${
                isDark ? 'bg-[#131B2A] border-[#1E293B]' : 'bg-white border-stone-200/80'
              }`}>
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <h3 className={`font-institutional text-sm sm:text-base font-bold truncate ${isDark ? 'text-white' : 'text-[#0B111E]'}`}>
                      System Activity (7 days)
                    </h3>
                    <span className={`text-[11px] font-mono-code whitespace-nowrap px-2.5 py-0.5 rounded shrink-0 ${
                      isDark ? 'bg-[#162032] text-stone-300 border border-stone-800' : 'bg-stone-100 text-stone-600 border border-stone-200'
                    }`}>
                      5 May – 11 May
                    </span>
                  </div>

                  {/* SVG Bar Chart */}
                  <div className="w-full h-48 sm:h-52 pt-3">
                    <svg viewBox="0 0 350 170" className="w-full h-full overflow-visible">
                      {/* Grid lines & scale 500, 1000, 1500 */}
                      {[500, 1000, 1500].map((val) => {
                        const y = 135 - (val / 1500) * 105;
                        return (
                          <g key={val}>
                            <line 
                              x1="30" 
                              y1={y} 
                              x2="330" 
                              y2={y} 
                              stroke={isDark ? '#1E293B' : '#E2DDD5'} 
                              strokeDasharray="2 2" 
                            />
                            <text 
                              x="24" 
                              y={y + 3} 
                              fill={isDark ? '#64748B' : '#94A3B8'} 
                              fontSize="9" 
                              textAnchor="end" 
                              fontFamily="monospace"
                            >
                              {val}
                            </text>
                          </g>
                        );
                      })}

                      {/* Bars: 7 days */}
                      {[
                        { day: '5 May', val: 780, x: 45 },
                        { day: '6 May', val: 1120, x: 85 },
                        { day: '7 May', val: 940, x: 125 },
                        { day: '8 May', val: 1350, x: 165 },
                        { day: '9 May', val: 1480, x: 205 },
                        { day: '10 May', val: 620, x: 245 },
                        { day: '11 May', val: 890, x: 285 },
                      ].map((bar, idx) => {
                        const barHeight = (bar.val / 1500) * 105;
                        const y = 135 - barHeight;
                        return (
                          <g key={idx} className="group cursor-pointer">
                            <rect
                              x={bar.x}
                              y={y}
                              width="24"
                              height={barHeight}
                              rx="4"
                              fill="#C5A059"
                              className={isDark ? 'hover:fill-white transition-colors' : 'hover:fill-[#0B111E] transition-colors'}
                            />
                            <text 
                              x={bar.x + 12} 
                              y="152" 
                              fill={isDark ? '#94A3B8' : '#64748B'} 
                              fontSize="9" 
                              textAnchor="middle"
                            >
                              {bar.day}
                            </text>
                          </g>
                        );
                      })}
                    </svg>
                  </div>
                </div>

                {/* Footer matching Security Status for vertical symmetry */}
                <div className={`pt-4 mt-4 border-t flex justify-between items-center text-[11px] font-mono-code ${
                  isDark ? 'border-[#1E293B] text-stone-400' : 'border-stone-100 text-stone-500'
                }`}>
                  <span>7-Day Ops: 7,180 Total</span>
                  <span className="text-emerald-500 font-semibold">● 100% Verified</span>
                </div>
              </div>

              {/* Right Card: Security Status */}
              <div className={`p-5 sm:p-6 rounded-2xl border shadow-sm flex flex-col justify-between h-full ${
                isDark ? 'bg-[#131B2A] border-[#1E293B]' : 'bg-white border-stone-200/80'
              }`}>
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <h3 className={`font-institutional text-sm sm:text-base font-bold truncate ${isDark ? 'text-white' : 'text-[#0B111E]'}`}>
                      Security Status
                    </h3>
                    <span className={`text-[11px] font-mono-code whitespace-nowrap px-2.5 py-0.5 rounded shrink-0 ${
                      isDark ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/40' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    }`}>
                      SOC2 / POPIA
                    </span>
                  </div>

                  {/* Security Banner */}
                  <div className={`mt-3 p-3 sm:p-3.5 rounded-xl border flex items-center gap-3 ${
                    isDark 
                      ? 'bg-emerald-950/40 border-emerald-500/30' 
                      : 'bg-emerald-50 border-emerald-200'
                  }`}>
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                      isDark ? 'bg-emerald-900/60 text-emerald-400' : 'bg-emerald-100 text-emerald-700'
                    }`}>
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <h4 className={`font-bold text-xs sm:text-sm truncate ${isDark ? 'text-emerald-300' : 'text-emerald-950'}`}>
                        All systems secure
                      </h4>
                      <p className={`text-[10px] sm:text-[11px] truncate ${isDark ? 'text-emerald-400/80' : 'text-emerald-800'}`}>
                        Last scan: Today, 10:30 AM
                      </p>
                    </div>
                  </div>

                  {/* Check list */}
                  <ul className={`mt-3.5 space-y-2 text-[11px] sm:text-xs ${isDark ? 'text-stone-300' : 'text-stone-700'}`}>
                    {[
                      'Zero-Knowledge mathematical suppression (n ≥ 5)',
                      'Data Room dynamic watermarking: Active',
                      'Multi-Factor Authentication (MFA): 100% compliant',
                      'Encrypted instrument store: AES-256 active'
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span className="truncate">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={`pt-4 mt-4 border-t flex justify-between items-center text-[11px] font-mono-code ${
                  isDark ? 'border-[#1E293B] text-stone-400' : 'border-stone-100 text-stone-500'
                }`}>
                  <span>Anchor Hash:</span>
                  <span className="text-[#C5A059]">0x9D42...F3A1</span>
                </div>
              </div>

            </div>

            {/* Publication Review Queue Preview */}
            <div className={`rounded-2xl border shadow-sm p-6 space-y-4 ${
              isDark ? 'bg-[#131B2A] border-[#1E293B]' : 'bg-white border-stone-200/80'
            }`}>
              <div className="flex items-center justify-between">
                <h3 className={`font-institutional text-base font-bold ${isDark ? 'text-white' : 'text-[#0B111E]'}`}>
                  Pending Institutional Approvals
                </h3>
                <span className={`text-xs ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                  {pendingApprovals.filter(a => a.status === 'Pending Review').length} Awaiting Approval
                </span>
              </div>

              <div className={`divide-y ${isDark ? 'divide-[#1E293B]' : 'divide-stone-100'}`}>
                {pendingApprovals.map((item) => (
                  <div key={item.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div>
                      <div className="flex items-center gap-2">
                        <strong className={isDark ? 'text-white' : 'text-[#0B111E]'}>{item.org}</strong>
                        <span className="text-stone-400">•</span>
                        <span className={isDark ? 'text-stone-300' : 'text-stone-600'}>{item.item}</span>
                      </div>
                      <span className="text-[10px] text-stone-400">Submitted by: {item.submittedBy}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                        item.status === 'Approved' 
                          ? isDark ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/40' : 'bg-emerald-50 text-emerald-700'
                          : isDark ? 'bg-amber-950/60 text-amber-400 border border-amber-800/40' : 'bg-amber-50 text-amber-800'
                      }`}>
                        {item.status}
                      </span>
                      {item.status === 'Pending Review' && (
                        <button
                          onClick={() => handleApprove(item.id)}
                          className="px-3 py-1 rounded bg-[#C5A059] hover:bg-[#B89047] text-[#0B111E] text-xs font-semibold shadow-sm transition-colors"
                        >
                          Approve
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* TAB 8: AUDIT LOG */}
        {effectiveActiveTab === 'admin-audit' && (
          <div className="max-w-5xl mx-auto space-y-6" id="admin-audit-view">
            <div className={`border-b pb-4 flex items-center justify-between ${isDark ? 'border-[#1E293B]' : 'border-stone-200'}`}>
              <div>
                <span className="text-xs font-mono-code uppercase tracking-wider text-[#C5A059] font-bold">
                  Immutable Ledger
                </span>
                <h1 className={`font-institutional text-2xl sm:text-3xl font-bold mt-1 ${isDark ? 'text-white' : 'text-[#0B111E]'}`}>
                  Audit Chain & Verification Log
                </h1>
                <p className={`text-xs mt-1 ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                  Every data access, suppression evaluation, and certificate validation recorded irreversibly.
                </p>
              </div>

              <ThemeToggle variant="pill" />
            </div>

            <div className={`rounded-2xl border shadow-sm overflow-hidden divide-y text-xs ${
              isDark 
                ? 'bg-[#131B2A] border-[#1E293B] divide-[#1E293B]' 
                : 'bg-white border-stone-200 divide-stone-100'
            }`}>
              {auditLogs.map((log) => (
                <div key={log.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono-code">
                  <div>
                    <div className={`font-semibold ${isDark ? 'text-white' : 'text-stone-900'}`}>
                      {log.action}: {log.details}
                    </div>
                    <div className="text-[11px] text-stone-400 mt-0.5">
                      Actor: {log.actor_name} ({log.actor_email}) • {log.target_entity}
                    </div>
                  </div>
                  <div className="text-[11px] text-stone-400 shrink-0 sm:text-right">
                    <div>{log.timestamp}</div>
                    <span className="text-[#C5A059]">{log.classification}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* OTHER ADMIN TABS */}
        {effectiveActiveTab !== 'admin-dashboard' && effectiveActiveTab !== 'admin-audit' && (
          <div className="max-w-5xl mx-auto space-y-6">
            <div className={`border-b pb-4 flex items-center justify-between ${isDark ? 'border-[#1E293B]' : 'border-stone-200'}`}>
              <div>
                <span className="text-xs font-mono-code uppercase tracking-wider text-[#C5A059] font-bold">
                  System Administration
                </span>
                <h1 className={`font-institutional text-2xl sm:text-3xl font-bold mt-1 capitalize ${isDark ? 'text-white' : 'text-[#0B111E]'}`}>
                  {sidebarItems.find(i => i.id === effectiveActiveTab)?.label || 'Administration'}
                </h1>
              </div>

              <ThemeToggle variant="pill" />
            </div>

            <div className={`p-8 rounded-2xl border shadow-sm space-y-4 text-xs leading-relaxed ${
              isDark 
                ? 'bg-[#131B2A] border-[#1E293B] text-stone-300' 
                : 'bg-white border-stone-200 text-stone-700'
            }`}>
              <p>
                Platform governance is governed by the ETES Institutional Constitution. All system operations, tenant scoping, and cryptographic verification keys are managed with strict separation of duties.
              </p>
              <div className={`p-4 rounded-xl border space-y-2 ${
                isDark ? 'bg-[#0E1726] border-[#1E293B]' : 'bg-stone-50 border-stone-200'
              }`}>
                <strong className={`block ${isDark ? 'text-white' : 'text-[#0B111E]'}`}>Active Governance Configuration:</strong>
                <div>• Small-Cohort Suppression Threshold: n = 5</div>
                <div>• Session Watermarking: Dynamic Cryptographic Vector</div>
                <div>• Audit Hashing: SHA-256 Merkle Verification Root</div>
              </div>
            </div>
          </div>
        )}

      </main>

    </div>
  );
};
