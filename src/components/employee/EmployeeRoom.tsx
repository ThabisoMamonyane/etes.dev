import React, { useState } from 'react';
import { Person, Organisation } from '../../types';
import { 
  CORE_QUESTION_ITEMS, 
  TRIGGER_SENSOR_ITEMS, 
  QUALITATIVE_PROMPTS, 
  TRUST_DIMENSIONS_CONFIG, 
  QUESTION_BANK_VERSION,
  DIAGNOSTIC_FOLLOW_UP_ITEMS
} from '../../data/questionBank';
import { VANGUARD_TRUST_JOURNEY, VANGUARD_DNA_DIMENSIONS } from '../../data/mockDatabase';
import employeeHeroImg from '../../images/employee-room.jpg';
import { EtesLogo } from '../common/EtesLogo';
import { useTheme } from '../../context/ThemeContext';
import { ThemeToggle } from '../common/ThemeToggle';
import { 
  Home,
  Building,
  CheckCircle2,
  FileText,
  Lock,
  TrendingUp,
  HelpCircle,
  User,
  LogOut,
  ArrowRight, 
  ArrowLeft, 
  Heart, 
  AlertCircle, 
  Clock, 
  ChevronRight,
  Info,
  Save,
  Send,
  EyeOff,
  UserCheck,
  BarChart3,
  ShieldCheck,
  Sparkles,
  Award,
  X,
  Menu,
  Users,
  MessageSquare,
  Scale,
  Star,
  Compass,
  HeartHandshake,
  DollarSign,
  Megaphone,
  Radio,
  FileCheck2,
  ShieldAlert,
  Flame,
  MoreHorizontal
} from 'lucide-react';

interface EmployeeRoomProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currentPersona: Person;
  organisation: Organisation;
  onLogOut?: () => void;
}

export const EmployeeRoom: React.FC<EmployeeRoomProps> = ({
  activeTab,
  setActiveTab,
  currentPersona,
  organisation,
  onLogOut
}) => {
  const { isDark } = useTheme();

  // Assessment state machine
  // Stages: 1. intro | 2. core | 3. sensitive (trigger sensors) | 4. qualitative | 5. review | 6. submitted
  const [assessmentStage, setAssessmentStage] = useState<number>(2);
  const [privacyAcknowledged, setPrivacyAcknowledged] = useState<boolean>(true);
  
  // Core responses map: questionId -> value (1-4). Starts completely empty - no pre-selection!
  const [coreResponses, setCoreResponses] = useState<{ [id: string]: number }>({});

  // Current question index in core assessment (starts at 0: Question 1)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);

  // Trigger Sensor responses: sensorId -> 'No' | 'Prefer not to say' | 'Yes'
  const [triggerResponses, setTriggerResponses] = useState<{ [id: string]: string }>({});
  const [currentTriggerIndex, setCurrentTriggerIndex] = useState<number>(0);

  // Qualitative responses: promptId -> text
  const [qualitativeResponses, setQualitativeResponses] = useState<{ [id: string]: string }>({});

  // Assessment stage mode for Part 2:
  // 'overview' = both cards visible (Part 1 and Part 2 preview)
  // 'trigger-questions' = active in 12 founding Trigger Sensors
  // 'diagnostic-followup' = active in relevant conditional follow-ups (D-01 to D-25)
  // 'qualitative' = protected narrative voice ('Tell ETES more')
  const [triggerFlowActive, setTriggerFlowActive] = useState<boolean>(false);
  const [triggerStage, setTriggerStage] = useState<'sensors' | 'diagnostics' | 'qualitative'>('sensors');
  const [activeTriggerId, setActiveTriggerId] = useState<string>('TS-01');
  const [diagnosticResponses, setDiagnosticResponses] = useState<{ [id: string]: string }>({});
  const [tellEtesMoreTexts, setTellEtesMoreTexts] = useState<{ [id: string]: string }>({});
  const [currentDiagnosticIndex, setCurrentDiagnosticIndex] = useState<number>(0);
  const [currentQualitativeIndex, setCurrentQualitativeIndex] = useState<number>(0);

  // Dynamic list of triggered follow-ups based on responses to TS-01 through TS-12
  const getRelevantDiagnostics = () => {
    // Collect triggered sensor IDs where participant answered 'Yes' or 'Unsure' or clicked category
    const activatedSensors = Object.entries(triggerResponses)
      .filter(([_, val]) => val === 'Yes' || val === 'Unsure')
      .map(([id]) => id);

    // If activeTriggerId was clicked directly or sensors triggered, filter DIAGNOSTIC_FOLLOW_UP_ITEMS
    const triggered = DIAGNOSTIC_FOLLOW_UP_ITEMS.filter((item) =>
      item.trigger_sensor_ids.some((tsId) => activatedSensors.includes(tsId) || tsId === activeTriggerId)
    );

    return triggered.length > 0 ? triggered : DIAGNOSTIC_FOLLOW_UP_ITEMS.slice(0, 5); // Fallback to relevant category A
  };

  const relevantDiagnostics = getRelevantDiagnostics();
  const activeDiagnostic = relevantDiagnostics[currentDiagnosticIndex] || relevantDiagnostics[0];
  const activeQualitativePrompt = QUALITATIVE_PROMPTS[currentQualitativeIndex] || QUALITATIVE_PROMPTS[0];

  const [assessmentCompleted, setAssessmentCompleted] = useState<boolean>(false);
  const [saveSuccessNotice, setSaveSuccessNotice] = useState<string | null>(null);
  const [profileModalOpen, setProfileModalOpen] = useState<boolean>(false);
  const [mobileNavOpen, setMobileNavOpen] = useState<boolean>(false);

  const activeQuestion = CORE_QUESTION_ITEMS[currentQuestionIndex] || CORE_QUESTION_ITEMS[0];
  const activeTrigger = TRIGGER_SENSOR_ITEMS.find((s) => s.id === activeTriggerId) || TRIGGER_SENSOR_ITEMS[0];

  // Dynamic section calculation based on the 10 Trust Dimensions
  const currentDimensionIndex = TRUST_DIMENSIONS_CONFIG.findIndex(
    (dim) => dim.id === activeQuestion.dimension_id
  );
  const currentSectionNumber = currentDimensionIndex !== -1 ? currentDimensionIndex + 1 : 1;
  const totalSections = TRUST_DIMENSIONS_CONFIG.length;
  const progressPercent = Math.round(((currentQuestionIndex + 1) / CORE_QUESTION_ITEMS.length) * 100);

  const handleSelectLikert = (value: number) => {
    setCoreResponses((prev) => ({
      ...prev,
      [activeQuestion.id]: value
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < CORE_QUESTION_ITEMS.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setAssessmentCompleted(true);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSaveProgress = () => {
    setSaveSuccessNotice('Progress securely saved to your private ETES session.');
    setTimeout(() => setSaveSuccessNotice(null), 3000);
  };

  const handleSaveAndExit = () => {
    handleSaveProgress();
    setActiveTab('emp-home');
  };

  // Time-aware greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const displayName = currentPersona?.full_name ? currentPersona.full_name.split(' ')[0] : 'Thandi';

  // Sidebar item configuration matching Panel 2 of user image
  const sidebarItems = [
    { id: 'emp-home', label: 'Home', icon: Home },
    { id: 'emp-org', label: 'My Organisation', icon: Building },
    { id: 'emp-participation', label: 'My Participation', icon: CheckCircle2 },
    { id: 'emp-assessment', label: 'My Assessments', icon: FileText },
    { id: 'emp-privacy', label: 'My Privacy', icon: Lock },
    { id: 'emp-journey', label: 'My Trust Journey', icon: TrendingUp },
    { id: 'emp-help', label: 'Help & Support', icon: HelpCircle },
  ];

  // Normalized active tab to highlight correct sidebar tab
  const getActiveSidebarTab = () => {
    if (activeTab === 'emp-home') return 'emp-home';
    if (activeTab === 'emp-assessment') return 'emp-assessment';
    if (activeTab === 'emp-org') return 'emp-org';
    if (activeTab === 'emp-participation') return 'emp-participation';
    if (activeTab === 'emp-privacy') return 'emp-privacy';
    if (activeTab === 'emp-journey') return 'emp-journey';
    if (activeTab === 'emp-help') return 'emp-help';
    return 'emp-home';
  };

  const activeSidebarTab = getActiveSidebarTab();
  const currentTabLabel = sidebarItems.find(i => i.id === activeSidebarTab)?.label || 'Overview';

  return (
    <div 
      className={`h-full flex-1 flex flex-col lg:flex-row overflow-hidden rounded-xl border shadow-sm transition-colors duration-200 ${
        isDark ? 'border-stone-800 bg-[#070B13]' : 'border-[#E2DDD5] bg-[#FAF7F2]'
      }`} 
      id="employee-room-root"
    >
      {/* Mobile & Tablet Header Bar (Visible on mobile & tablet, hidden on desktop lg+) */}
      <div 
        className={`lg:hidden flex items-center justify-between px-3.5 py-2.5 border-b shrink-0 transition-colors ${
          isDark ? 'border-stone-800 bg-[#070B13]' : 'border-[#E2DDD5] bg-white'
        }`}
      >
        <div 
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setActiveTab('emp-home')}
        >
          <EtesLogo 
            size="xs" 
            variant={isDark ? "light" : "dark"} 
            showSubtitle={false} 
            roomLabel="EMPLOYEE" 
          />
          <span className={`text-[10px] px-2 py-0.5 rounded font-mono-code font-semibold uppercase ${
            isDark ? 'bg-[#C5A059]/15 text-[#DFB76C] border border-[#C5A059]/30' : 'bg-[#8C6B28]/10 text-[#8C6B28] border border-[#8C6B28]/30'
          }`}>
            {currentTabLabel}
          </span>
        </div>

        <button
          id="employee-mobile-menu-btn"
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
              isDark ? 'bg-[#0E1726] border-[#1E293B] text-stone-200' : 'bg-white border-[#E2DDD5] text-stone-800'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className={`flex items-start justify-between pb-3 mb-3 border-b ${
              isDark ? 'border-stone-700/40' : 'border-[#E2DDD5]'
            }`}>
              <div className="flex-1 min-w-0 pr-2">
                <EtesLogo size="sm" variant={isDark ? 'light' : 'dark'} showSubtitle={false} roomLabel="EMPLOYEE ROOM" />
              </div>
              <button 
                onClick={() => setMobileNavOpen(false)}
                className={`p-1.5 rounded-md cursor-pointer shrink-0 ${
                  isDark ? 'hover:bg-stone-700/30 text-stone-400 hover:text-white' : 'hover:bg-stone-100 text-stone-500 hover:text-stone-900'
                }`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Items */}
            <nav className="space-y-1 flex-1">
              {sidebarItems.map((item) => {
                const isActive = activeSidebarTab === item.id;
                return (
                  <button
                    key={item.id}
                    id={`emp-mob-nav-${item.id}`}
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
        id="employee-sidebar"
      >
        {/* Logo & Room Header */}
        <div 
          className={`px-2 py-3 mb-4 border-b cursor-pointer ${
            isDark ? 'border-[#1E293B]' : 'border-[#E2DDD5]'
          }`}
          onClick={() => setActiveTab('emp-home')}
        >
          <EtesLogo 
            size="sm" 
            variant={isDark ? 'light' : 'dark'} 
            showSubtitle={false} 
            roomLabel="EMPLOYEE ROOM" 
          />
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1" id="employee-sidebar-nav">
          {sidebarItems.map((item) => {
            const isActive = activeSidebarTab === item.id;
            return (
              <button
                key={item.id}
                id={`emp-nav-${item.id}`}
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
        
        {saveSuccessNotice && (
          <div className="mb-6 p-3 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2 animate-fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{saveSuccessNotice}</span>
          </div>
        )}

        {/* TAB 1: HOME (Matching Panel 2: EMPLOYEE PLATFORM) */}
        {activeSidebarTab === 'emp-home' && (
          <div className="max-w-5xl mx-auto space-y-8" id="emp-home-view">
            {/* Top Hero Banner Image */}
            <div className="relative w-full rounded-2xl overflow-hidden border border-[#C5A059]/30 shadow-lg group bg-[#111827]">
              <img
                src={employeeHeroImg}
                alt="ETES Employee Room Banner"
                className="w-full h-48 sm:h-64 md:h-72 lg:h-80 object-cover object-center transition-transform duration-500 group-hover:scale-[1.01]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Header Greeting with Theme Toggle (Moved lower and below the picture) */}
            <div className="flex items-center justify-between pt-2">
              <div>
                <h1 className={`font-institutional text-2xl sm:text-4xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-[#0B111E]'}`}>
                  {getGreeting()}, {displayName}
                </h1>
                <p className={`text-sm mt-1 ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                  Welcome to your safe space. Your voice matters.
                </p>
              </div>

              <ThemeToggle variant="pill" />
            </div>

            {/* 3 Core Status / Action Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Card 1: Your Trust Journey */}
              <div className={`p-6 rounded-2xl border transition-all flex flex-col justify-between shadow-sm ${
                isDark 
                  ? 'bg-[#131B2A] border-[#1E293B] hover:border-[#C5A059]/40' 
                  : 'bg-white border-stone-200/80 hover:border-[#C5A059]/50'
              }`}>
                <div>
                  <h3 className={`text-base font-semibold font-institutional ${isDark ? 'text-white' : 'text-[#0B111E]'}`}>
                    Your Trust Journey
                  </h3>
                  <div className="my-6 flex items-center justify-center">
                    {/* Circular SVG Gauge (62% progress) */}
                    <div className="relative w-24 h-24 flex items-center justify-center">
                      <svg className="w-24 h-24 transform -rotate-90">
                        <circle
                          cx="48"
                          cy="48"
                          r="40"
                          stroke={isDark ? '#1E293B' : '#E2DDD5'}
                          strokeWidth="7"
                          fill="transparent"
                        />
                        <circle
                          cx="48"
                          cy="48"
                          r="40"
                          stroke="#C5A059"
                          strokeWidth="7"
                          strokeDasharray={2 * Math.PI * 40}
                          strokeDashoffset={(2 * Math.PI * 40) * (1 - 0.62)}
                          strokeLinecap="round"
                          fill="transparent"
                        />
                      </svg>
                      <div className={`absolute inset-0 flex items-center justify-center font-bold text-xl font-institutional ${
                        isDark ? 'text-white' : 'text-[#0B111E]'
                      }`}>
                        62%
                      </div>
                    </div>
                  </div>
                  <p className={`text-xs text-center leading-relaxed ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                    Your participation contributes to real change.
                  </p>
                </div>

                <div className={`mt-6 pt-4 border-t flex justify-center ${isDark ? 'border-[#1E293B]' : 'border-stone-100'}`}>
                  <button
                    onClick={() => setActiveTab('emp-journey')}
                    className={`px-5 py-2 rounded-lg border text-xs font-medium transition-all ${
                      isDark 
                        ? 'bg-[#1A2333] hover:bg-[#222E42] border-[#C5A059]/30 text-stone-200' 
                        : 'bg-[#FAF7F2] hover:bg-[#F2ECE3] border-stone-200 text-stone-700'
                    }`}
                  >
                    View Progress
                  </button>
                </div>
              </div>

              {/* Card 2: My Organisation */}
              <div className={`p-6 rounded-2xl border transition-all flex flex-col justify-between shadow-sm ${
                isDark 
                  ? 'bg-[#131B2A] border-[#1E293B] hover:border-[#C5A059]/40' 
                  : 'bg-white border-stone-200/80 hover:border-[#C5A059]/50'
              }`}>
                <div>
                  <h3 className={`text-base font-semibold font-institutional ${isDark ? 'text-white' : 'text-[#0B111E]'}`}>
                    My Organisation
                  </h3>
                  <div className="my-6 flex flex-col items-center justify-center text-center">
                    <div className={`w-16 h-16 rounded-2xl border flex items-center justify-center mb-3 ${
                      isDark ? 'bg-[#1A2333] border-[#C5A059]/30 text-[#DFB76C]' : 'bg-[#FAF7F2] border-[#C5A059]/40 text-[#C5A059]'
                    }`}>
                      <Building className="w-8 h-8 text-[#C5A059]" />
                    </div>
                    <span className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-[#0B111E]'}`}>{organisation.legal_name}</span>
                    <span className="text-[11px] font-mono-code text-[#C5A059] mt-0.5">
                      {organisation.certification_status.toUpperCase()} CERTIFIED
                    </span>
                  </div>
                  <p className={`text-xs text-center leading-relaxed ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                    Check how trust is being experienced across your organisation.
                  </p>
                </div>

                <div className={`mt-6 pt-4 border-t flex justify-center ${isDark ? 'border-[#1E293B]' : 'border-stone-100'}`}>
                  <button
                    onClick={() => setActiveTab('emp-org')}
                    className={`px-5 py-2 rounded-lg border text-xs font-medium transition-all ${
                      isDark 
                        ? 'bg-[#1A2333] hover:bg-[#222E42] border-[#C5A059]/30 text-stone-200' 
                        : 'bg-[#FAF7F2] hover:bg-[#F2ECE3] border-stone-200 text-stone-700'
                    }`}
                  >
                    View Insights
                  </button>
                </div>
              </div>

              {/* Card 3: Your Voice Shapes Change */}
              <div className={`p-6 rounded-2xl border transition-all flex flex-col justify-between shadow-sm ${
                isDark 
                  ? 'bg-[#131B2A] border-[#1E293B] hover:border-[#C5A059]/40' 
                  : 'bg-white border-stone-200/80 hover:border-[#C5A059]/50'
              }`}>
                <div>
                  <h3 className={`text-base font-semibold font-institutional ${isDark ? 'text-white' : 'text-[#0B111E]'}`}>
                    Your Voice Shapes Change
                  </h3>
                  <div className="my-6 flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 rounded-2xl bg-[#C5A059]/15 border border-[#C5A059]/40 flex items-center justify-center text-[#DFB76C] mb-3">
                      <Sparkles className="w-8 h-8 text-[#C5A059]" />
                    </div>
                    <span className={`font-medium text-xs ${isDark ? 'text-stone-300' : 'text-stone-700'}`}>Annual Trust Census</span>
                    <span className="text-[11px] text-emerald-500 font-medium mt-0.5">Active Cycle • 60 Items</span>
                  </div>
                  <p className={`text-xs text-center leading-relaxed ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                    Take part in assessments and help build a better workplace for everyone.
                  </p>
                </div>

                <div className={`mt-6 pt-4 border-t flex justify-center ${isDark ? 'border-[#1E293B]' : 'border-stone-100'}`}>
                  <button
                    onClick={() => setActiveTab('emp-assessment')}
                    className="px-6 py-2.5 rounded-lg bg-[#C5A059] hover:bg-[#DFB76C] text-[#0B111E] text-xs font-bold transition-all shadow-md"
                  >
                    Start Now
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Actions Row */}
            <div className="pt-2">
              <h3 className={`text-sm font-semibold mb-3 font-institutional ${isDark ? 'text-stone-300' : 'text-stone-700'}`}>
                Quick Actions
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <button
                  onClick={() => setActiveTab('emp-assessment')}
                  className={`p-3.5 rounded-xl border flex items-center gap-3 text-xs transition-all ${
                    isDark 
                      ? 'bg-[#131B2A] border-[#1E293B] hover:border-[#C5A059]/50 hover:bg-[#1A2333] text-stone-200' 
                      : 'bg-white border-stone-200/80 hover:border-[#C5A059]/50 hover:bg-[#FAF7F2] text-stone-800'
                  }`}
                >
                  <FileText className="w-4 h-4 text-[#C5A059] shrink-0" />
                  <span className="font-medium">Take Assessment</span>
                </button>

                <button
                  onClick={() => setActiveTab('emp-org')}
                  className={`p-3.5 rounded-xl border flex items-center gap-3 text-xs transition-all ${
                    isDark 
                      ? 'bg-[#131B2A] border-[#1E293B] hover:border-[#C5A059]/50 hover:bg-[#1A2333] text-stone-200' 
                      : 'bg-white border-stone-200/80 hover:border-[#C5A059]/50 hover:bg-[#FAF7F2] text-stone-800'
                  }`}
                >
                  <BarChart3 className="w-4 h-4 text-[#C5A059] shrink-0" />
                  <span className="font-medium">View Results</span>
                </button>

                <button
                  onClick={() => setProfileModalOpen(true)}
                  className={`p-3.5 rounded-xl border flex items-center gap-3 text-xs transition-all ${
                    isDark 
                      ? 'bg-[#131B2A] border-[#1E293B] hover:border-[#C5A059]/50 hover:bg-[#1A2333] text-stone-200' 
                      : 'bg-white border-stone-200/80 hover:border-[#C5A059]/50 hover:bg-[#FAF7F2] text-stone-800'
                  }`}
                >
                  <UserCheck className="w-4 h-4 text-[#C5A059] shrink-0" />
                  <span className="font-medium">Update Profile</span>
                </button>

                <button
                  onClick={() => setActiveTab('emp-privacy')}
                  className={`p-3.5 rounded-xl border flex items-center gap-3 text-xs transition-all ${
                    isDark 
                      ? 'bg-[#131B2A] border-[#1E293B] hover:border-[#C5A059]/50 hover:bg-[#1A2333] text-stone-200' 
                      : 'bg-white border-stone-200/80 hover:border-[#C5A059]/50 hover:bg-[#FAF7F2] text-stone-800'
                  }`}
                >
                  <Lock className="w-4 h-4 text-[#C5A059] shrink-0" />
                  <span className="font-medium">Privacy Settings</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: EMPLOYEE ASSESSMENT EXPERIENCE (Matching Provided Mockup) */}
        {activeSidebarTab === 'emp-assessment' && (
          <div className="max-w-5xl mx-auto space-y-6" id="emp-assessment-view">
            {/* Top Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-1">
              <div>
                <h1 className={`font-institutional text-2xl sm:text-3xl lg:text-[32px] font-bold tracking-tight ${isDark ? 'text-white' : 'text-[#0B111E]'}`}>
                  My Assessments
                </h1>
                <p className={`text-xs sm:text-sm mt-1 ${isDark ? 'text-stone-300' : 'text-stone-600'}`}>
                  Complete your assessments to contribute to a more transparent and trusted workplace.
                </p>
              </div>
              <div className="flex items-center gap-2 self-start sm:self-center">
                <button
                  onClick={handleSaveAndExit}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all flex items-center gap-1.5 ${
                    isDark 
                      ? 'bg-[#1A2333] hover:bg-[#222E42] border-[#1E293B] text-stone-300' 
                      : 'bg-white hover:bg-stone-50 border-stone-200 text-stone-700'
                  }`}
                >
                  <Save className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Save & Exit</span>
                </button>
                <ThemeToggle variant="pill" />
              </div>
            </div>

            {assessmentCompleted ? (
              <div className={`border rounded-2xl p-8 sm:p-12 shadow-xl text-center space-y-6 animate-fade-in ${
                isDark ? 'bg-[#0E1726] border-[#1E293B]' : 'bg-white border-stone-200'
              }`}>
                <div className="w-16 h-16 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <div className="space-y-2 max-w-lg mx-auto">
                  <span className="text-xs font-mono-code uppercase tracking-wider text-[#C5A059] font-bold">
                    Assessment Completed
                  </span>
                  <h2 className={`font-institutional text-2xl sm:text-3xl font-bold ${isDark ? 'text-white' : 'text-[#0B111E]'}`}>
                    Thank You for Contributing Your Voice
                  </h2>
                  <p className={`text-sm leading-relaxed ${isDark ? 'text-stone-300' : 'text-stone-600'}`}>
                    Your responses across all 10 Trust Dimensions and Trigger Sensors have been cryptographically sealed and incorporated into the anonymized workplace intelligence index.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-xl mx-auto pt-2 text-left">
                  <div className={`p-4 rounded-xl border ${isDark ? 'bg-[#131B2A] border-[#1E293B]' : 'bg-stone-50 border-stone-200'}`}>
                    <span className="text-[11px] text-stone-400 block">Items Completed</span>
                    <span className={`text-lg font-bold font-mono-code ${isDark ? 'text-white' : 'text-stone-900'}`}>60 / 60</span>
                  </div>
                  <div className={`p-4 rounded-xl border ${isDark ? 'bg-[#131B2A] border-[#1E293B]' : 'bg-stone-50 border-stone-200'}`}>
                    <span className="text-[11px] text-stone-400 block">Trust Dimensions</span>
                    <span className="text-lg font-bold text-[#C5A059] font-mono-code">10 of 10</span>
                  </div>
                  <div className={`p-4 rounded-xl border ${isDark ? 'bg-[#131B2A] border-[#1E293B]' : 'bg-stone-50 border-stone-200'}`}>
                    <span className="text-[11px] text-stone-400 block">Privacy Standard</span>
                    <span className="text-lg font-bold text-emerald-500 font-mono-code">Sealed & Anonymous</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                  <button
                    onClick={() => setActiveTab('emp-home')}
                    className="px-6 py-2.5 rounded-lg bg-[#C5A059] hover:bg-[#DFB76C] text-[#0B111E] text-xs font-bold transition-all shadow-md cursor-pointer"
                  >
                    Return to Home Dashboard
                  </button>
                  <button
                    onClick={() => {
                      setAssessmentCompleted(false);
                      setCurrentQuestionIndex(0);
                    }}
                    className={`px-5 py-2.5 rounded-lg border text-xs font-medium transition-all cursor-pointer ${
                      isDark 
                        ? 'bg-[#131B2A] hover:bg-[#1A2333] border-[#1E293B] text-stone-300' 
                        : 'bg-stone-100 hover:bg-stone-200 border-stone-200 text-stone-700'
                    }`}
                  >
                    Review Responses
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* ========================================================================= */}
                {/* PART 1: WORKPLACE TRUST ASSESSMENT™ CARD CONTAINER */}
                {/* ========================================================================= */}
                <div className={`rounded-2xl border transition-all shadow-lg overflow-hidden ${
                  isDark ? 'bg-[#0B111E]/90 border-[#1E2A3F]' : 'bg-white border-stone-200'
                }`}>
                  <div className="p-5 sm:p-6 lg:p-7 space-y-6">
                    {/* Header Row: Document Icon, Title & Meta + Part Badge & ETES Wreath Seal */}
                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                      <div className="flex items-start gap-3.5">
                        {/* Golden Document Icon Tile */}
                        <div className="w-10 h-10 rounded-xl bg-[#C5A059]/15 border border-[#C5A059]/40 flex items-center justify-center text-[#DFB76C] shrink-0 mt-0.5">
                          <FileText className="w-5 h-5 text-[#C5A059]" />
                        </div>
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h2 className="font-institutional text-lg sm:text-xl font-bold tracking-tight">
                              <span className={isDark ? 'text-white' : 'text-[#0B111E]'}>WORKPLACE TRUST </span>
                              <span className="text-[#C5A059]">ASSESSMENT™</span>
                            </h2>
                          </div>
                          <p className="text-[11px] sm:text-xs font-medium text-stone-400 mt-1">
                            10 Trust Dimensions &nbsp;|&nbsp; 60 Questions &nbsp;|&nbsp; ~15 Minutes
                          </p>
                          <p className={`text-xs mt-1.5 leading-relaxed max-w-2xl ${isDark ? 'text-stone-300' : 'text-stone-600'}`}>
                            This assessment measures your experience across 10 key dimensions that influence workplace trust, fairness and organisational health.
                          </p>
                        </div>
                      </div>

                      {/* Right: Part 1 of 2 Pill + Gold Wreath Seal */}
                      <div className="flex items-center gap-4 self-end lg:self-center shrink-0">
                        <span className={`px-3 py-1 rounded-md text-xs font-semibold ${
                          isDark 
                            ? 'bg-[#182338] text-stone-300 border border-[#223352]' 
                            : 'bg-stone-100 text-stone-700 border border-stone-200'
                        }`}>
                          Part 1 of 2
                        </span>

                        {/* Gold Round Institutional Laurel Wreath Seal matching user image */}
                        <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-2 border-[#D4AF37] bg-gradient-to-b from-[#111A2E] via-[#0A101D] to-[#040810] flex flex-col items-center justify-center text-center p-2 shadow-2xl shadow-[#D4AF37]/25 relative shrink-0">
                          {/* Outer fine golden glow ring */}
                          <div className="absolute inset-0 rounded-full border border-[#F5D77F]/40 pointer-events-none" />
                          
                          {/* Authentic Laurel Wreath Vector Graphic - Widened arc to give ample breathing room */}
                          <svg className="absolute inset-0 w-full h-full p-1 pointer-events-none" viewBox="0 0 100 100" fill="none">
                            {/* Outer boundary concentric ring */}
                            <circle cx="50" cy="50" r="46.5" stroke="#D4AF37" strokeWidth="0.8" strokeOpacity="0.85" />
                            <circle cx="50" cy="50" r="45" stroke="#F5D77F" strokeWidth="0.5" strokeOpacity="0.4" strokeDasharray="1.5 1.5" />
                            
                            {/* Left Wreath Branch pushed outwards toward circumference */}
                            <path d="M 50 93 C 20 91, 7 69, 8 48 C 9 32, 20 18, 44 10" stroke="#D4AF37" strokeWidth="1.2" strokeLinecap="round" />
                            <path d="M 43 91 C 35 89, 30 84, 33 80 C 37 80, 41 84, 43 91 Z" fill="#F5D77F" />
                            <path d="M 30 84 C 22 81, 18 75, 22 71 C 25 71, 30 76, 30 84 Z" fill="#D4AF37" />
                            <path d="M 20 73 C 13 68, 11 61, 15 57 C 18 58, 21 64, 20 73 Z" fill="#F5D77F" />
                            <path d="M 13 60 C 8 54, 8 47, 13 44 C 16 45, 17 52, 13 60 Z" fill="#D4AF37" />
                            <path d="M 12 45 C 9 38, 12 31, 17 29 C 19 32, 18 38, 12 45 Z" fill="#F5D77F" />
                            <path d="M 18 31 C 16 24, 22 18, 28 18 C 29 21, 26 27, 18 31 Z" fill="#D4AF37" />
                            <path d="M 30 20 C 30 13, 37 9, 42 11 C 42 14, 38 18, 30 20 Z" fill="#F5D77F" />
                            
                            {/* Right Wreath Branch pushed outwards toward circumference */}
                            <path d="M 50 93 C 80 91, 93 69, 92 48 C 91 32, 80 18, 56 10" stroke="#D4AF37" strokeWidth="1.2" strokeLinecap="round" />
                            <path d="M 57 91 C 65 89, 70 84, 67 80 C 63 80, 59 84, 57 91 Z" fill="#F5D77F" />
                            <path d="M 70 84 C 78 81, 82 75, 78 71 C 75 71, 70 76, 70 84 Z" fill="#D4AF37" />
                            <path d="M 80 73 C 87 68, 89 61, 85 57 C 82 58, 79 64, 80 73 Z" fill="#F5D77F" />
                            <path d="M 87 60 C 92 54, 92 47, 87 44 C 84 45, 83 52, 87 60 Z" fill="#D4AF37" />
                            <path d="M 88 45 C 91 38, 88 31, 83 29 C 81 32, 82 38, 88 45 Z" fill="#F5D77F" />
                            <path d="M 82 31 C 84 24, 78 18, 72 18 C 71 21, 74 27, 82 31 Z" fill="#D4AF37" />
                            <path d="M 70 20 C 70 13, 63 9, 58 11 C 58 14, 62 18, 70 20 Z" fill="#F5D77F" />
                            
                            {/* Bottom Ribbon / Bow Knot */}
                            <circle cx="50" cy="93" r="2.5" fill="#F5D77F" />
                            <path d="M 46 94 C 43 97, 39 98, 35 99" stroke="#D4AF37" strokeWidth="1.2" strokeLinecap="round" />
                            <path d="M 54 94 C 57 97, 61 98, 65 99" stroke="#D4AF37" strokeWidth="1.2" strokeLinecap="round" />
                          </svg>

                          {/* Inner Text Container - Crisp and unobstructed */}
                          <div className="z-10 flex flex-col items-center justify-center max-w-[68px] sm:max-w-[78px] px-0.5">
                            <span className="text-[17px] sm:text-[20px] font-institutional font-black tracking-[0.16em] text-[#F5D77F] leading-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                              ETES
                            </span>
                            <span className="text-[6.5px] sm:text-[7.5px] font-mono-code font-bold uppercase tracking-tight text-[#D4AF37] mt-1.5 leading-[9.5px] text-center drop-shadow-sm whitespace-normal">
                              WORKPLACE TRUST<br />ASSESSMENT™
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* 10 Trust Dimensions Strip with Filled-Color Icons */}
                    <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2 pt-1">
                      {[
                        { 
                          num: 1, 
                          name: 'Leadership & Management', 
                          dimId: 1, 
                          startIndex: 0,
                          // 1. Leadership: clean filled group of people
                          icon: (
                            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                              <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                            </svg>
                          )
                        },
                        { 
                          num: 2, 
                          name: 'Communication & Transparency', 
                          dimId: 5, 
                          startIndex: 24,
                          // 2. Communication: clean filled chat bubble
                          icon: (
                            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                              <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z" />
                            </svg>
                          )
                        },
                        { 
                          num: 3, 
                          name: 'Fairness & Organisational Justice', 
                          dimId: 3, 
                          startIndex: 12,
                          // 3. Fairness: solid balance scale
                          icon: (
                            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                            </svg>
                          )
                        },
                        { 
                          num: 4, 
                          name: 'Recognition & Value', 
                          dimId: 7, 
                          startIndex: 36,
                          // 4. Recognition: solid filled gold star
                          icon: (
                            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                            </svg>
                          )
                        },
                        { 
                          num: 5, 
                          name: 'Growth & Development', 
                          dimId: 7, 
                          startIndex: 40,
                          // 5. Growth: solid ascending bar chart with upward trend
                          icon: (
                            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                              <path d="M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z" />
                            </svg>
                          )
                        },
                        { 
                          num: 6, 
                          name: 'Workplace Environment', 
                          dimId: 4, 
                          startIndex: 18,
                          // 6. Workplace: solid city corporate building
                          icon: (
                            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                              <path d="M15 11V5l-3-3-3 3v2H3v14h18V11h-6zm-8 8H5v-2h2v2zm0-4H5v-2h2v2zm0-4H5v-2h2v2zm6 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V9h2v2zm0-4h-2V5h2v2zm6 12h-2v-2h2v2zm0-4h-2v-2h2v2z" />
                            </svg>
                          )
                        },
                        { 
                          num: 7, 
                          name: 'Wellbeing & Support', 
                          dimId: 8, 
                          startIndex: 42,
                          // 7. Wellbeing: solid heart in cupped hands / empathy
                          icon: (
                            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                            </svg>
                          )
                        },
                        { 
                          num: 8, 
                          name: 'Diversity & Inclusion', 
                          dimId: 4, 
                          startIndex: 20,
                          // 8. Diversity: solid multi-ethnic community circle
                          icon: (
                            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                              <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                            </svg>
                          )
                        },
                        { 
                          num: 9, 
                          name: 'Role Clarity & Resources', 
                          dimId: 9, 
                          startIndex: 48,
                          // 9. Role Clarity: solid checklist clipboard
                          icon: (
                            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                              <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
                            </svg>
                          )
                        },
                        { 
                          num: 10, 
                          name: 'Organisational Confidence & Advocacy', 
                          dimId: 10, 
                          startIndex: 54,
                          // 10. Advocacy: solid protective shield with checkmark
                          icon: (
                            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
                            </svg>
                          )
                        },
                      ].map((item) => {
                        const isCurrentActiveDim = item.dimId === activeQuestion.dimension_id;
                        return (
                          <button
                            key={item.num}
                            onClick={() => setCurrentQuestionIndex(item.startIndex)}
                            className={`p-2.5 rounded-xl border flex flex-col items-center text-center justify-between min-h-[96px] transition-all cursor-pointer ${
                              isCurrentActiveDim
                                ? isDark
                                  ? 'bg-[#18243A] border-[#D4AF37] text-white shadow-md ring-1 ring-[#D4AF37]/60'
                                  : 'bg-white border-[#D4AF37] text-[#0B111E] shadow-md ring-1 ring-[#D4AF37]/50'
                                : isDark
                                  ? 'bg-[#0E1726] border-[#1C283F] text-stone-400 hover:border-stone-600 hover:bg-[#131B2A]'
                                  : 'bg-stone-50 border-stone-200 text-stone-600 hover:border-stone-300 hover:bg-white'
                            }`}
                          >
                            <div className={`mb-1 transition-transform ${isCurrentActiveDim ? 'text-[#F5D77F] scale-110 drop-shadow-[0_0_8px_rgba(245,215,127,0.5)]' : 'text-[#D4AF37]/80'}`}>
                              {item.icon}
                            </div>
                            <span className={`text-[11px] font-mono-code font-bold ${isCurrentActiveDim ? 'text-[#F5D77F]' : 'text-stone-400'}`}>
                              {item.num}
                            </span>
                            <span className="text-[9.5px] leading-tight font-medium line-clamp-2 mt-0.5">
                              {item.name}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Progress Bar & Indicators */}
                    <div className="space-y-1.5 pt-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className={`font-medium ${isDark ? 'text-stone-300' : 'text-stone-700'}`}>
                          Assessment Progress (Part 1 of 2)
                        </span>
                        <div className="flex items-center gap-3">
                          <span className={`text-[11px] font-medium ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                            Section {currentSectionNumber} of {totalSections}
                          </span>
                          <span className={`text-[11px] font-medium ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                            Question {currentQuestionIndex + 1} of {CORE_QUESTION_ITEMS.length}
                          </span>
                          <span className="text-xs font-mono-code font-bold text-[#C5A059]">
                            {progressPercent}%
                          </span>
                        </div>
                      </div>

                      {/* Golden Continuous Fill Bar */}
                      <div className={`w-full h-2 rounded-full overflow-hidden ${isDark ? 'bg-[#162032]' : 'bg-stone-200'}`}>
                        <div 
                          className="h-full bg-gradient-to-r from-[#DFB76C] via-[#C5A059] to-[#E5C178] transition-all duration-300 shadow-sm"
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>
                    </div>

                    {/* Active Question Box */}
                    <div className={`rounded-xl border p-6 sm:p-8 space-y-7 ${
                      isDark ? 'bg-[#0E1726] border-[#1C283F]' : 'bg-[#FAF8F5] border-stone-200'
                    }`}>
                      {/* Section & Question Header */}
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <span className={`font-medium ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                            Section {currentSectionNumber} of {totalSections}
                          </span>
                          <span className="text-[#C5A059] font-semibold">
                            {activeQuestion.dimension_name || 'Organisational Confidence & Advocacy'}
                          </span>
                        </div>
                        <span className={`font-mono-code ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                          Question {currentQuestionIndex + 1} of {CORE_QUESTION_ITEMS.length}
                        </span>
                      </div>

                      {/* Question Text */}
                      <h3 className={`font-institutional text-xl sm:text-2xl font-bold leading-relaxed max-w-3xl ${
                        isDark ? 'text-white' : 'text-[#0B111E]'
                      }`}>
                        {currentQuestionIndex + 1}. {activeQuestion.candidate_wording}
                      </h3>

                      {/* Likert Scale (1, 2, 3, 4 with Strongly Disagree / Strongly Agree labels) */}
                      <div className="max-w-xl mx-auto pt-2">
                        <div className="flex items-center justify-between gap-3 sm:gap-4">
                          <span className={`text-xs font-medium w-24 text-right shrink-0 ${
                            isDark ? 'text-stone-400' : 'text-stone-600'
                          }`}>
                            Strongly Disagree
                          </span>

                          <div className="flex items-center gap-2.5 sm:gap-3.5 justify-center flex-1">
                            {[1, 2, 3, 4].map((rating) => {
                              const isSelected = coreResponses[activeQuestion.id] === rating;
                              return (
                                <button
                                  key={rating}
                                  onClick={() => handleSelectLikert(rating)}
                                  className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl text-base font-bold transition-all cursor-pointer ${
                                    isSelected
                                      ? 'bg-gradient-to-b from-[#DFB76C] to-[#C5A059] text-[#0B111E] shadow-lg shadow-[#C5A059]/25 scale-105 ring-2 ring-[#DFB76C]'
                                      : isDark
                                        ? 'bg-[#182338] text-stone-300 border border-[#253654] hover:border-[#C5A059]/50 hover:bg-[#202E47]'
                                        : 'bg-white text-stone-700 border border-stone-300 hover:border-[#C5A059]/50 hover:bg-stone-50 shadow-xs'
                                  }`}
                                >
                                  {rating}
                                </button>
                              );
                            })}
                          </div>

                          <span className={`text-xs font-medium w-24 text-left shrink-0 ${
                            isDark ? 'text-stone-400' : 'text-stone-600'
                          }`}>
                            Strongly Agree
                          </span>
                        </div>
                      </div>

                      {/* Navigation Controls: Back & Continue to Protected Section */}
                      <div className="flex items-center justify-between pt-4">
                        <button
                          disabled={currentQuestionIndex === 0}
                          onClick={handlePrevQuestion}
                          className={`px-4 sm:px-5 py-2.5 rounded-lg text-xs font-medium transition-all flex items-center gap-2 ${
                            currentQuestionIndex === 0
                              ? 'text-stone-500 bg-transparent border border-transparent cursor-not-allowed'
                              : isDark 
                                ? 'bg-[#182338] text-stone-300 hover:bg-[#202E47] border border-[#253654] cursor-pointer' 
                                : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200 cursor-pointer shadow-xs'
                          }`}
                        >
                          <ArrowLeft className="w-3.5 h-3.5" />
                          <span>Back</span>
                        </button>

                        <button
                          disabled={!coreResponses[activeQuestion.id]}
                          onClick={() => {
                            if (!coreResponses[activeQuestion.id]) return;
                            if (currentQuestionIndex === CORE_QUESTION_ITEMS.length - 1) {
                              setTriggerFlowActive(true);
                              setTriggerStage('sensors');
                            } else {
                              handleNextQuestion();
                            }
                          }}
                          className={`px-5 sm:px-6 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
                            coreResponses[activeQuestion.id]
                              ? 'bg-gradient-to-r from-[#DFB76C] via-[#C5A059] to-[#DFB76C] hover:brightness-105 text-[#0B111E] shadow-md cursor-pointer'
                              : 'bg-stone-800 text-stone-500 border border-stone-700 cursor-not-allowed opacity-50'
                          }`}
                        >
                          <span>{currentQuestionIndex === CORE_QUESTION_ITEMS.length - 1 ? 'Continue to Protected Section' : 'Continue'}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ========================================================================= */}
                {/* PART 2: ETES TRIGGER SENSORS™ (Sensitive Workplace Experiences) */}
                {/* ========================================================================= */}
                <div className={`rounded-2xl border transition-all shadow-lg overflow-hidden relative ${
                  isDark 
                    ? 'bg-[#0B111E]/95 border-[#1E293B]' 
                    : 'bg-white border-stone-200'
                }`}>
                  {/* Soft institutional gold ambient wash */}
                  <div className="absolute right-0 top-0 w-80 h-80 bg-[#C5A059]/5 rounded-full blur-3xl pointer-events-none" />

                  <div className="p-5 sm:p-6 lg:p-7 space-y-6 relative z-10">
                    {/* Header Row: Lock Icon Tile, Title & Subtitles + Part 2 of 2 Badge & Institutional Shield */}
                    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
                      <div className="flex items-start gap-3.5">
                        {/* Gold Lock Icon Tile matching original brand */}
                        <div className="w-10 h-10 rounded-xl bg-[#C5A059]/15 border border-[#C5A059]/40 flex items-center justify-center text-[#DFB76C] shrink-0 mt-0.5 shadow-sm">
                          <Lock className="w-5 h-5 text-[#C5A059]" />
                        </div>
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h2 className="font-institutional text-lg sm:text-xl font-bold tracking-tight">
                              <span className={isDark ? 'text-white' : 'text-[#0B111E]'}>ETES </span>
                              <span className="text-[#DFB76C]">TRIGGER </span>
                              <span className={isDark ? 'text-white' : 'text-[#0B111E]'}>SENSORS™</span>
                            </h2>
                          </div>
                          <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#C5A059] mt-1">
                            SENSITIVE WORKPLACE EXPERIENCES &nbsp;|&nbsp; ~5–10 Minutes
                          </p>
                          <p className={`text-xs mt-1.5 leading-relaxed max-w-2xl ${isDark ? 'text-stone-300' : 'text-stone-600'}`}>
                            This section asks about workplace experiences that can seriously affect trust, dignity, fairness, opportunity or safety. Your responses are subject to heightened privacy and evidence controls.
                          </p>
                        </div>
                      </div>

                      {/* Right: Part 2 of 2 Pill + Shield Seal in original institutional gold */}
                      <div className="flex items-center gap-4 self-end lg:self-center shrink-0">
                        <span className={`px-3 py-1 rounded-md text-xs font-semibold ${
                          isDark 
                            ? 'bg-[#182338] text-stone-300 border border-[#223352]' 
                            : 'bg-stone-100 text-stone-700 border border-stone-200'
                        }`}>
                          Part 2 of 2
                        </span>

                        {/* Gold Institutional Shield Seal with ETES TRIGGER SENSORS™ */}
                        <div className="flex flex-col items-center justify-center text-center relative group shrink-0">
                          {/* Subtle warm gold ambient backdrop */}
                          <div className="absolute -inset-1 bg-[#C5A059]/10 rounded-xl blur-md pointer-events-none" />
                          
                          {/* Shield badge in app original dark navy and gold */}
                          <div className="w-16 h-18 sm:w-20 sm:h-22 flex items-center justify-center relative z-10">
                            <svg className="w-full h-full drop-shadow-[0_2px_8px_rgba(197,160,89,0.25)]" viewBox="0 0 100 120" fill="none">
                              {/* Outer Shield Outline */}
                              <path 
                                d="M50 4L12 20V58C12 88 50 114 50 114C50 114 88 88 88 58V20L50 4Z" 
                                fill="url(#goldShieldBg)" 
                                stroke="#D4AF37" 
                                strokeWidth="2.5" 
                              />
                              {/* Inner Shield Accent Contour */}
                              <path 
                                d="M50 12L19 25V58C19 82 50 105 50 105C50 105 81 82 81 58V25L50 12Z" 
                                stroke="#C5A059" 
                                strokeWidth="1" 
                                strokeOpacity="0.6" 
                              />
                              {/* Solid Centered Padlock matching reference */}
                              <rect x="36" y="55" width="28" height="22" rx="4" fill="#FDF8ED" />
                              <path d="M43 55V46C43 42.13 46.13 39 50 39C53.87 39 57 42.13 57 46V55" stroke="#FDF8ED" strokeWidth="4.5" strokeLinecap="round" />
                              <circle cx="50" cy="64" r="2.5" fill="#7A5814" />
                              <path d="M50 66.5V70.5" stroke="#7A5814" strokeWidth="2" strokeLinecap="round" />
                              
                              <defs>
                                <linearGradient id="goldShieldBg" x1="50" y1="4" x2="50" y2="114" gradientUnits="userSpaceOnUse">
                                  <stop stopColor="#1E283F" />
                                  <stop offset="0.6" stopColor="#0E1626" />
                                  <stop offset="1" stopColor="#070D18" />
                                </linearGradient>
                              </defs>
                            </svg>
                          </div>

                          <span className="text-[13px] sm:text-[14px] font-institutional font-bold tracking-widest text-[#F5D77F] mt-1 z-10 drop-shadow-sm">
                            ETES
                          </span>
                          <span className="text-[7.5px] sm:text-[8px] font-mono-code font-bold uppercase tracking-widest text-[#C5A059] z-10">
                            TRIGGER SENSORS™
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* 9 Trigger Sensor Category Tiles with App Original Gold Accent Icons */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-2 pt-1">
                      {[
                        { 
                          sensorId: 'TS-03',
                          name: 'Discrimination & Equal Treatment', 
                          // 1. Group of 3 people in row
                          icon: (
                            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                            </svg>
                          )
                        },
                        { 
                          sensorId: 'TS-04',
                          name: 'Gender & Opportunity', 
                          // 2. Gender equality symbol (female mirror / male arrow)
                          icon: (
                            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                              <circle cx="12" cy="9" r="4.5" stroke="currentColor" strokeWidth="2.5" fill="none" />
                              <path d="M10.5 13.5H13.5V17H16V19.5H13.5V22H10.5V19.5H8V17H10.5V13.5Z" />
                              <path d="M17 2H22V7M21 3L15.5 8.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                            </svg>
                          )
                        },
                        { 
                          sensorId: 'TS-04',
                          name: 'Sexual Orientation & Identity', 
                          // 3. Exact 3-band rainbow arch
                          icon: (
                            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                              <path d="M3 18a9 9 0 0 1 18 0" />
                              <path d="M6 18a6 6 0 0 1 12 0" />
                              <path d="M9 18a3 3 0 0 1 6 0" />
                            </svg>
                          )
                        },
                        { 
                          sensorId: 'TS-01',
                          name: 'Sexual Harassment & Personal Safety', 
                          // 4. Solid open raised protective stop palm
                          icon: (
                            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                              <path d="M23 5.5V20c0 2.2-1.8 4-4 4h-7.3c-1.08 0-2.1-.43-2.85-1.19L1 14.83s1.39-1.37 1.43-1.4c.54-.53 1.37-.6 1.99-.18L8 15.68V4.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5V11h1V1.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5V11h1V2.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5V11h1V5.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5z" />
                            </svg>
                          )
                        },
                        { 
                          sensorId: 'TS-07',
                          name: 'Pay & Reward Fairness', 
                          // 5. Stack of golden currency coins
                          icon: (
                            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                              <path d="M12 2C6.48 2 2 3.34 2 5v14c0 1.66 4.48 3 10 3s10-1.34 10-3V5c0-1.66-4.48-3-10-3zm0 2.5c4.14 0 7.5.86 7.5 1.5S16.14 7.5 12 7.5 4.5 6.64 4.5 6s3.36-1.5 7.5-1.5zm0 5c4.14 0 7.5.86 7.5 1.5s-3.36 1.5-7.5 1.5-7.5-.86-7.5-1.5 3.36-1.5 7.5-1.5zm0 5c4.14 0 7.5.86 7.5 1.5s-3.36 1.5-7.5 1.5-7.5-.86-7.5-1.5 3.36-1.5 7.5-1.5z" />
                            </svg>
                          )
                        },
                        { 
                          sensorId: 'TS-06',
                          name: 'Retaliation & Speaking Up', 
                          // 6. Solid loud bullhorn/megaphone with soundwaves
                          icon: (
                            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                              <path d="M18 11c0-.96-.4-1.84-1.05-2.47l-1.42 1.42c.3.3.47.7.47 1.05s-.17.75-.47 1.05l1.42 1.42c.65-.63 1.05-1.51 1.05-2.47zm3.5-5.5l-1.42 1.42C21.16 8.01 21.75 9.44 21.75 11s-.59 2.99-1.67 4.08l1.42 1.42C22.95 15.05 23.75 13.12 23.75 11s-.8-4.05-2.25-5.5zM4 9v6h4l5 5V4L8 9H4z" />
                            </svg>
                          )
                        },
                        { 
                          sensorId: 'TS-05',
                          name: 'Bullying & Abuse of Authority', 
                          // 7. Solid figure standing over seated/smaller figure
                          icon: (
                            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                              <path d="M12 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm-4 8c-2.21 0-4 1.79-4 4v6h8v-6c0-2.21-1.79-4-4-4zm8.5 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-1.5 5c-.9 0-2.5.4-2.5 1.2v1.8h5v-1.8c0-.8-1.6-1.2-2.5-1.2z" />
                            </svg>
                          )
                        },
                        { 
                          sensorId: 'TS-08',
                          name: 'Health, Safety & Wellbeing', 
                          // 8. Solid security shield with checkmark
                          icon: (
                            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
                            </svg>
                          )
                        },
                        { 
                          sensorId: 'TS-12',
                          name: 'Other Serious Concerns', 
                          // 9. Solid rounded speech bubble with 3 dots
                          icon: (
                            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                              <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4V4c0-1.1-.9-2-2-2zM7 11c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm5 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm5 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" />
                            </svg>
                          )
                        },
                      ].map((item, idx) => {
                        const isSelected = activeTriggerId === item.sensorId;
                        return (
                          <button
                            key={idx}
                            onClick={() => {
                              setActiveTriggerId(item.sensorId);
                              setTriggerFlowActive(true);
                              setTriggerStage('sensors');
                              setCurrentDiagnosticIndex(0);
                            }}
                            className={`p-2.5 rounded-xl border flex flex-col items-center text-center justify-between min-h-[96px] transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-[#18243A] border-[#D4AF37] text-white ring-2 ring-[#D4AF37]/50 shadow-lg shadow-black/40'
                                : isDark
                                  ? 'bg-[#0E1726] border-[#1C283F] text-stone-400 hover:border-stone-600 hover:bg-[#131B2A]'
                                  : 'bg-stone-50 border-stone-200 text-stone-600 hover:border-stone-300 hover:bg-white'
                            }`}
                          >
                            <div className={`mb-1 transition-transform ${isSelected ? 'text-[#F5D77F] scale-110 drop-shadow-[0_0_8px_rgba(245,215,127,0.5)]' : 'text-[#C5A059]/80'}`}>
                              {item.icon}
                            </div>
                            <span className={`text-[9.5px] leading-tight font-medium mt-auto line-clamp-3 ${isSelected ? 'text-[#F5D77F]' : ''}`}>
                              {item.name}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {/* ========================================================================= */}
                    {/* INTERACTIVE TRIGGER SENSORS & DIAGNOSTIC FOLLOW-UP FLOW (App Original Colors) */}
                    {/* ========================================================================= */}
                    {triggerFlowActive && (
                      <div className={`mt-6 rounded-2xl border p-6 sm:p-8 space-y-6 animate-fade-in ${
                        isDark ? 'bg-[#0E1726] border-[#1C283F]' : 'bg-[#FAF8F5] border-stone-200'
                      }`}>
                        {/* Sub-Stage Indicator Tabs (Trigger -> Diagnose -> Employee Voice) */}
                        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-stone-700/40">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono-code uppercase tracking-wider text-[#C5A059] font-bold">
                              Protected Evidence Workflow:
                            </span>
                            <div className="flex items-center gap-1.5 text-xs">
                              <span className={`px-2.5 py-1 rounded-md font-semibold ${
                                triggerStage === 'sensors' ? 'bg-[#C5A059] text-[#0B111E]' : isDark ? 'bg-[#182338] text-stone-300' : 'bg-stone-100 text-stone-700'
                              }`}>
                                1. High-Level Trigger
                              </span>
                              <ChevronRight className="w-3.5 h-3.5 text-[#C5A059]" />
                              <span className={`px-2.5 py-1 rounded-md font-semibold ${
                                triggerStage === 'diagnostics' ? 'bg-[#C5A059] text-[#0B111E]' : isDark ? 'bg-[#182338] text-stone-300' : 'bg-stone-100 text-stone-700'
                              }`}>
                                2. Diagnostic Follow-ups
                              </span>
                              <ChevronRight className="w-3.5 h-3.5 text-[#C5A059]" />
                              <span className={`px-2.5 py-1 rounded-md font-semibold ${
                                triggerStage === 'qualitative' ? 'bg-[#C5A059] text-[#0B111E]' : isDark ? 'bg-[#182338] text-stone-300' : 'bg-stone-100 text-stone-700'
                              }`}>
                                3. Tell ETES More
                              </span>
                            </div>
                          </div>

                          <button
                            onClick={() => setTriggerFlowActive(false)}
                            className="text-xs text-stone-400 hover:text-white px-2.5 py-1 rounded border border-stone-700/60 hover:bg-[#182338] cursor-pointer"
                          >
                            Minimize Section
                          </button>
                        </div>

                        {/* STAGE 1: 12 FOUNDING TRIGGER QUESTIONS */}
                        {triggerStage === 'sensors' && (
                          <div className="space-y-6 animate-fade-in">
                            <div className="flex items-center justify-between text-xs">
                              <span className="font-semibold text-[#DFB76C]">
                                {activeTrigger.family} Sensor ({activeTrigger.id})
                              </span>
                              <span className="text-stone-400 font-mono-code">
                                Trigger Sensor {TRIGGER_SENSOR_ITEMS.findIndex(s => s.id === activeTriggerId) + 1} of 12
                              </span>
                            </div>

                            <h3 className={`font-institutional text-xl sm:text-2xl font-bold leading-relaxed max-w-3xl ${
                              isDark ? 'text-white' : 'text-[#0B111E]'
                            }`}>
                              {activeTrigger.candidate_trigger_question}
                            </h3>

                            {/* Response options: Yes | No | Unsure | Prefer not to answer */}
                            <div className="space-y-3">
                              <span className="text-xs font-medium text-stone-400 block">Select your experience:</span>
                              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                {['No', 'Yes', 'Unsure', 'Prefer not to answer'].map((option) => {
                                  const isSelected = triggerResponses[activeTrigger.id] === option;
                                  return (
                                    <button
                                      key={option}
                                      onClick={() => setTriggerResponses(prev => ({ ...prev, [activeTrigger.id]: option }))}
                                      className={`py-3 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer border text-center ${
                                        isSelected
                                          ? 'bg-[#C5A059] text-[#0B111E] border-[#DFB76C] ring-2 ring-[#DFB76C]/50 shadow-md font-extrabold'
                                          : isDark
                                            ? 'bg-[#182338] border-[#223352] text-stone-300 hover:border-[#C5A059] hover:bg-[#202E47]'
                                            : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50 shadow-xs'
                                      }`}
                                    >
                                      {option}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>

                            {/* Optional: Tell ETES More Voice Prompt right below sensor */}
                            <div className="pt-2">
                              <label className="text-xs font-semibold text-[#DFB76C] flex items-center justify-between mb-1.5">
                                <span>Tell ETES more (optional):</span>
                                <span className="text-[11px] font-normal text-stone-400">Strictly confidential narrative</span>
                              </label>
                              <textarea
                                value={tellEtesMoreTexts[activeTrigger.id] || ''}
                                onChange={(e) => setTellEtesMoreTexts(prev => ({ ...prev, [activeTrigger.id]: e.target.value }))}
                                placeholder="If you would like to, tell ETES more about what you experienced or observed, why it affected your trust, and what you believe the organisation should understand. (Please avoid naming other people unless required)."
                                rows={3}
                                className={`w-full p-3 rounded-xl border text-xs focus:outline-none transition-all ${
                                  isDark 
                                    ? 'bg-[#121B2B] border-[#223352] text-stone-200 placeholder:text-stone-500 focus:border-[#C5A059]' 
                                    : 'bg-white border-stone-200 text-stone-800 placeholder:text-stone-400 focus:border-[#C5A059]'
                                }`}
                              />
                            </div>

                            {/* Navigation inside Sensors */}
                            <div className="flex items-center justify-between pt-4 border-t border-stone-700/40">
                              <button
                                onClick={() => {
                                  const currentIdx = TRIGGER_SENSOR_ITEMS.findIndex(s => s.id === activeTriggerId);
                                  if (currentIdx > 0) {
                                    setActiveTriggerId(TRIGGER_SENSOR_ITEMS[currentIdx - 1].id);
                                  }
                                }}
                                disabled={TRIGGER_SENSOR_ITEMS.findIndex(s => s.id === activeTriggerId) === 0}
                                className="px-4 py-2 rounded-lg text-xs font-medium border border-stone-700/60 text-stone-300 hover:bg-[#182338] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                              >
                                Previous Sensor
                              </button>

                              <button
                                disabled={!triggerResponses[activeTrigger.id]}
                                onClick={() => {
                                  if (!triggerResponses[activeTrigger.id]) return;
                                  // If participant indicated Yes or Unsure or clicked, route to relevant diagnostic follow-ups
                                  const currentVal = triggerResponses[activeTrigger.id];
                                  if (currentVal === 'Yes' || currentVal === 'Unsure') {
                                    setTriggerStage('diagnostics');
                                    setCurrentDiagnosticIndex(0);
                                  } else {
                                    const currentIdx = TRIGGER_SENSOR_ITEMS.findIndex(s => s.id === activeTriggerId);
                                    if (currentIdx < TRIGGER_SENSOR_ITEMS.length - 1) {
                                      setActiveTriggerId(TRIGGER_SENSOR_ITEMS[currentIdx + 1].id);
                                    } else {
                                      setTriggerStage('diagnostics');
                                      setCurrentDiagnosticIndex(0);
                                    }
                                  }
                                }}
                                className={`px-6 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                                  triggerResponses[activeTrigger.id]
                                    ? 'bg-gradient-to-r from-[#DFB76C] via-[#C5A059] to-[#DFB76C] hover:brightness-105 text-[#0B111E] shadow-md cursor-pointer'
                                    : 'bg-stone-800 text-stone-500 border border-stone-700 cursor-not-allowed opacity-50'
                                }`}
                              >
                                <span>Proceed to Diagnostic Follow-ups</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        )}

                        {/* STAGE 2: 25 CONDITIONAL DIAGNOSTIC FOLLOW-UPS (D-01 to D-25) */}
                        {triggerStage === 'diagnostics' && (
                          <div className="space-y-6 animate-fade-in">
                            <div className="flex items-center justify-between text-xs">
                              <div>
                                <span className="text-[#DFB76C] font-bold block">
                                  Category {activeDiagnostic.category}: {activeDiagnostic.category_name}
                                </span>
                                <span className="text-[11px] text-stone-400">
                                  Diagnostic Question {currentDiagnosticIndex + 1} of {relevantDiagnostics.length} ({activeDiagnostic.id})
                                </span>
                              </div>
                              <span className="px-2.5 py-1 rounded bg-[#182338] border border-[#223352] text-[#DFB76C] font-mono-code text-[11px]">
                                Conditional Diagnostic
                              </span>
                            </div>

                            <h3 className={`font-institutional text-xl sm:text-2xl font-bold leading-relaxed max-w-3xl ${
                              isDark ? 'text-white' : 'text-[#0B111E]'
                            }`}>
                              {activeDiagnostic.question_text}
                            </h3>

                            {/* Dynamic Options based on response type (experience, perception, frequency) */}
                            <div className="space-y-3">
                              <span className="text-xs font-medium text-stone-400 block">Select your response:</span>
                              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                {activeDiagnostic.options.map((option) => {
                                  const isSelected = diagnosticResponses[activeDiagnostic.id] === option;
                                  return (
                                    <button
                                      key={option}
                                      onClick={() => setDiagnosticResponses(prev => ({ ...prev, [activeDiagnostic.id]: option }))}
                                      className={`py-3 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer border text-center ${
                                        isSelected
                                          ? 'bg-[#C5A059] text-[#0B111E] border-[#DFB76C] ring-2 ring-[#DFB76C]/50 shadow-md font-extrabold'
                                          : isDark
                                            ? 'bg-[#182338] border-[#223352] text-stone-300 hover:border-[#C5A059] hover:bg-[#202E47]'
                                            : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50 shadow-xs'
                                      }`}
                                    >
                                      {option}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>

                            {/* Optional: Tell ETES More Voice prompt */}
                            <div className="pt-2">
                              <label className="text-xs font-semibold text-[#DFB76C] flex items-center justify-between mb-1.5">
                                <span>Tell ETES more (optional):</span>
                                <span className="text-[11px] font-normal text-stone-400">Context & impact notes</span>
                              </label>
                              <textarea
                                value={tellEtesMoreTexts[activeDiagnostic.id] || ''}
                                onChange={(e) => setTellEtesMoreTexts(prev => ({ ...prev, [activeDiagnostic.id]: e.target.value }))}
                                placeholder="Describe what occurred and how this affects your trust. (Protected under zero-knowledge and anonymization governance)."
                                rows={2}
                                className={`w-full p-3 rounded-xl border text-xs focus:outline-none transition-all ${
                                  isDark 
                                    ? 'bg-[#121B2B] border-[#223352] text-stone-200 placeholder:text-stone-500 focus:border-[#C5A059]' 
                                    : 'bg-white border-stone-200 text-stone-800 placeholder:text-stone-400 focus:border-[#C5A059]'
                                }`}
                              />
                            </div>

                            {/* Diagnostic Controls */}
                            <div className="flex items-center justify-between pt-4 border-t border-stone-700/40">
                              <button
                                onClick={() => {
                                  if (currentDiagnosticIndex > 0) {
                                    setCurrentDiagnosticIndex(currentDiagnosticIndex - 1);
                                  } else {
                                    setTriggerStage('sensors');
                                  }
                                }}
                                className="px-4 py-2 rounded-lg text-xs font-medium border border-stone-700/60 text-stone-300 hover:bg-[#182338] cursor-pointer"
                              >
                                {currentDiagnosticIndex === 0 ? '← Back to Sensors' : 'Previous Question'}
                              </button>

                              <button
                                disabled={!diagnosticResponses[activeDiagnostic.id]}
                                onClick={() => {
                                  if (!diagnosticResponses[activeDiagnostic.id]) return;
                                  if (currentDiagnosticIndex < relevantDiagnostics.length - 1) {
                                    setCurrentDiagnosticIndex(currentDiagnosticIndex + 1);
                                  } else {
                                    setTriggerStage('qualitative');
                                  }
                                }}
                                className={`px-6 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                                  diagnosticResponses[activeDiagnostic.id]
                                    ? 'bg-gradient-to-r from-[#DFB76C] via-[#C5A059] to-[#DFB76C] hover:brightness-105 text-[#0B111E] shadow-md cursor-pointer'
                                    : 'bg-stone-800 text-stone-500 border border-stone-700 cursor-not-allowed opacity-50'
                                }`}
                              >
                                <span>{currentDiagnosticIndex === relevantDiagnostics.length - 1 ? 'Protected Qualitative Voice →' : 'Next Diagnostic'}</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        )}

                        {/* STAGE 3: 5 PROTECTED QUALITATIVE PROMPTS (QR-01 to QR-05) */}
                        {triggerStage === 'qualitative' && (
                          <div className="space-y-6 animate-fade-in">
                            <div className="flex items-center justify-between text-xs">
                              <div>
                                <span className="text-[#DFB76C] font-bold block">
                                  Part D: Protected Raw Experience Voice ({activeQualitativePrompt.id})
                                </span>
                                <span className="text-[11px] text-stone-400">
                                  Prompt {currentQualitativeIndex + 1} of {QUALITATIVE_PROMPTS.length}
                                </span>
                              </div>
                              <span className="px-2.5 py-1 rounded bg-[#182338] border border-[#223352] text-[#DFB76C] font-mono-code text-[11px]">
                                Protected Voice
                              </span>
                            </div>

                            <h3 className={`font-institutional text-xl sm:text-2xl font-bold leading-relaxed max-w-3xl ${
                              isDark ? 'text-white' : 'text-[#0B111E]'
                            }`}>
                              {activeQualitativePrompt.prompt_text}
                            </h3>

                            <div>
                              <textarea
                                value={qualitativeResponses[activeQualitativePrompt.id] || ''}
                                onChange={(e) => setQualitativeResponses(prev => ({ ...prev, [activeQualitativePrompt.id]: e.target.value }))}
                                placeholder="Your perspective in your own words. (Optional, protected qualitative evidence subject to access control and de-identification)..."
                                rows={4}
                                className={`w-full p-4 rounded-xl border text-xs focus:outline-none transition-all leading-relaxed ${
                                  isDark 
                                    ? 'bg-[#121B2B] border-[#223352] text-stone-200 placeholder:text-stone-500 focus:border-[#C5A059]' 
                                    : 'bg-white border-stone-200 text-stone-800 placeholder:text-stone-400 focus:border-[#C5A059]'
                                }`}
                              />
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-stone-700/40">
                              <button
                                onClick={() => {
                                  if (currentQualitativeIndex > 0) {
                                    setCurrentQualitativeIndex(currentQualitativeIndex - 1);
                                  } else {
                                    setTriggerStage('diagnostics');
                                  }
                                }}
                                className="px-4 py-2 rounded-lg text-xs font-medium border border-stone-700/60 text-stone-300 hover:bg-[#182338] cursor-pointer"
                              >
                                Previous Prompt
                              </button>

                              <button
                                onClick={() => {
                                  if (currentQualitativeIndex < QUALITATIVE_PROMPTS.length - 1) {
                                    setCurrentQualitativeIndex(currentQualitativeIndex + 1);
                                  } else {
                                    setAssessmentCompleted(true);
                                  }
                                }}
                                className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-bold hover:brightness-110 shadow-lg cursor-pointer flex items-center gap-1.5"
                              >
                                <ShieldCheck className="w-4 h-4" />
                                <span>{currentQualitativeIndex === QUALITATIVE_PROMPTS.length - 1 ? 'Cryptographically Seal & Complete' : 'Next Qualitative Prompt'}</span>
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Privacy Safeguard Notice Footnote */}
                <div className={`p-4 rounded-xl border flex items-center gap-3 text-xs ${
                  isDark ? 'bg-[#0E1726] border-[#1E293B] text-stone-300' : 'bg-white border-stone-200 text-stone-700'
                }`}>
                  <Lock className="w-4 h-4 text-[#C5A059] shrink-0" />
                  <span>
                    <strong className={isDark ? 'text-white' : 'text-[#0B111E]'}>Protected Institutional Environment:</strong> Your responses in Part 1 and Part 2 are cryptographically sealed, protected under high-grade evidence controls, and never visible to managers or employers in identifiable form.
                  </span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: MY ORGANISATION (Aggregated Trust breakdown) */}
        {activeSidebarTab === 'emp-org' && (
          <div className="max-w-5xl mx-auto space-y-6" id="emp-org-view">
            <div className={`border-b pb-4 flex items-center justify-between ${isDark ? 'border-[#1E293B]' : 'border-stone-200'}`}>
              <div>
                <span className="text-xs font-mono-code uppercase tracking-wider text-[#C5A059] font-bold">
                  Organisation Trust Intelligence
                </span>
                <h1 className={`font-institutional text-2xl sm:text-3xl font-bold mt-1 ${isDark ? 'text-white' : 'text-[#0B111E]'}`}>
                  {organisation.legal_name}
                </h1>
                <p className={`text-xs mt-1 ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                  Aggregated, anonymized trust dimensions across your employer's departments and cycles.
                </p>
              </div>

              <ThemeToggle variant="pill" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {VANGUARD_DNA_DIMENSIONS.slice(0, 6).map((dim) => (
                <div 
                  key={dim.id} 
                  className={`p-5 rounded-xl border space-y-2 shadow-sm ${
                    isDark ? 'bg-[#131B2A] border-[#1E293B]' : 'bg-white border-stone-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono-code text-[#C5A059]">Dimension {dim.id}</span>
                    <span className={`text-xs font-bold ${isDark ? 'text-white' : 'text-[#0B111E]'}`}>{dim.score.toFixed(1)} / 100</span>
                  </div>
                  <h4 className={`text-sm font-semibold font-institutional ${isDark ? 'text-white' : 'text-[#0B111E]'}`}>{dim.name}</h4>
                  <div className={`w-full h-2 rounded-full overflow-hidden mt-2 ${isDark ? 'bg-[#1E293B]' : 'bg-stone-100'}`}>
                    <div 
                      className="h-full bg-[#C5A059] rounded-full"
                      style={{ width: `${dim.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: MY PARTICIPATION */}
        {activeSidebarTab === 'emp-participation' && (
          <div className="max-w-4xl mx-auto space-y-6" id="emp-participation-view">
            <div className={`border-b pb-4 flex items-center justify-between ${isDark ? 'border-[#1E293B]' : 'border-stone-200'}`}>
              <div>
                <span className="text-xs font-mono-code uppercase tracking-wider text-[#C5A059] font-bold">
                  Participation Records
                </span>
                <h1 className={`font-institutional text-2xl sm:text-3xl font-bold mt-1 ${isDark ? 'text-white' : 'text-[#0B111E]'}`}>
                  My Participation History
                </h1>
                <p className={`text-xs mt-1 ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                  Verification of your independent, zero-trace contribution to verified cycles.
                </p>
              </div>

              <ThemeToggle variant="pill" />
            </div>

            <div className={`border rounded-xl p-6 space-y-4 shadow-sm ${
              isDark ? 'bg-[#131B2A] border-[#1E293B]' : 'bg-white border-stone-200'
            }`}>
              <div className={`flex items-center justify-between p-4 rounded-lg border ${
                isDark ? 'bg-[#1A2333] border-[#1E293B]' : 'bg-[#FAF7F2] border-stone-200'
              }`}>
                <div>
                  <div className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-[#0B111E]'}`}>Annual Trust Census — 2026 Cycle</div>
                  <div className="text-xs text-stone-400 mt-0.5">Cycle ID: CYC-2026-VG • Status: In Progress</div>
                </div>
                <button
                  onClick={() => setActiveTab('emp-assessment')}
                  className="px-4 py-2 rounded-lg bg-[#C5A059] text-[#0B111E] text-xs font-bold hover:bg-[#DFB76C] transition-colors"
                >
                  Resume
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: MY PRIVACY */}
        {activeSidebarTab === 'emp-privacy' && (
          <div className="max-w-4xl mx-auto space-y-6" id="emp-privacy-view">
            <div className={`border-b pb-4 flex items-center justify-between ${isDark ? 'border-[#1E293B]' : 'border-stone-200'}`}>
              <div>
                <span className="text-xs font-mono-code uppercase tracking-wider text-[#C5A059] font-bold">
                  Data Rights & Zero-Knowledge Architecture
                </span>
                <h1 className={`font-institutional text-2xl sm:text-3xl font-bold mt-1 ${isDark ? 'text-white' : 'text-[#0B111E]'}`}>
                  My Privacy & Confidentiality Shield
                </h1>
                <p className={`text-xs mt-1 ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                  We believe trust cannot be demanded; it must be protected through unambiguous architecture.
                </p>
              </div>

              <ThemeToggle variant="pill" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className={`p-6 rounded-xl border space-y-3 shadow-sm ${
                isDark ? 'bg-[#131B2A] border-[#1E293B]' : 'bg-white border-stone-200'
              }`}>
                <div className="flex items-center gap-2 text-emerald-500 font-semibold text-sm">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>What is collected</span>
                </div>
                <ul className={`text-xs space-y-2 list-disc pl-4 leading-relaxed ${isDark ? 'text-stone-400' : 'text-stone-600'}`}>
                  <li>Your structured Likert responses across core assessment items.</li>
                  <li>Your responses to the protected Trigger Sensor items (if completed).</li>
                  <li>Anonymous qualitative testimony you choose to offer.</li>
                </ul>
              </div>

              <div className={`p-6 rounded-xl border space-y-3 shadow-sm ${
                isDark ? 'bg-[#131B2A] border-[#1E293B]' : 'bg-white border-stone-200'
              }`}>
                <div className="flex items-center gap-2 text-[#C5A059] font-semibold text-sm">
                  <Lock className="w-4 h-4 text-[#C5A059]" />
                  <span>What remains strictly confidential</span>
                </div>
                <ul className={`text-xs space-y-2 list-disc pl-4 leading-relaxed ${isDark ? 'text-stone-400' : 'text-stone-600'}`}>
                  <li>Your individual answers are NEVER linked to your employee profile in employer reports.</li>
                  <li>Your supervisor cannot see whether you participated or what you answered.</li>
                  <li>Small cohorts (under 5 respondents) are suppressed to prevent deductive guessing.</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: MY TRUST JOURNEY */}
        {activeSidebarTab === 'emp-journey' && (
          <div className="max-w-4xl mx-auto space-y-6" id="emp-journey-view">
            <div className={`border-b pb-4 flex items-center justify-between ${isDark ? 'border-[#1E293B]' : 'border-stone-200'}`}>
              <div>
                <span className="text-xs font-mono-code uppercase tracking-wider text-[#C5A059] font-bold">
                  Longitudinal Repair & Commitments
                </span>
                <h1 className={`font-institutional text-2xl sm:text-3xl font-bold mt-1 ${isDark ? 'text-white' : 'text-[#0B111E]'}`}>
                  My Trust Journey
                </h1>
                <p className={`text-xs mt-1 ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                  Evidence of action: <em>You Said → We Heard → We Acted → We Reassessed</em>.
                </p>
              </div>

              <ThemeToggle variant="pill" />
            </div>

            <div className="space-y-4">
              {VANGUARD_TRUST_JOURNEY.map((item, idx) => (
                <div 
                  key={idx} 
                  className={`p-6 rounded-xl border space-y-3 shadow-sm ${
                    isDark ? 'bg-[#131B2A] border-[#1E293B]' : 'bg-white border-stone-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono-code text-[#C5A059]">{item.stage} • {item.period}</span>
                    <span className={`text-xs px-2.5 py-1 rounded font-medium ${
                      isDark ? 'bg-[#1A2333] text-emerald-400' : 'bg-emerald-50 text-emerald-700'
                    }`}>
                      Action Verified
                    </span>
                  </div>
                  <h3 className={`text-base font-bold font-institutional ${isDark ? 'text-white' : 'text-[#0B111E]'}`}>{item.theme}</h3>
                  <p className={`text-xs leading-relaxed ${isDark ? 'text-stone-300' : 'text-stone-600'}`}>{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 7: HELP & SUPPORT */}
        {activeSidebarTab === 'emp-help' && (
          <div className="max-w-4xl mx-auto space-y-6" id="emp-help-view">
            <div className={`border-b pb-4 flex items-center justify-between ${isDark ? 'border-[#1E293B]' : 'border-stone-200'}`}>
              <div>
                <span className="text-xs font-mono-code uppercase tracking-wider text-[#C5A059] font-bold">
                  Safeguarding & Support
                </span>
                <h1 className={`font-institutional text-2xl sm:text-3xl font-bold mt-1 ${isDark ? 'text-white' : 'text-[#0B111E]'}`}>
                  Help & Safeguarding
                </h1>
                <p className={`text-xs mt-1 ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                  Independent whistleblowing protection and employee support routes.
                </p>
              </div>

              <ThemeToggle variant="pill" />
            </div>

            <div className={`p-6 rounded-xl border space-y-4 shadow-sm ${
              isDark ? 'bg-[#131B2A] border-[#1E293B]' : 'bg-white border-stone-200'
            }`}>
              <h3 className={`text-base font-semibold ${isDark ? 'text-white' : 'text-[#0B111E]'}`}>Confidential Safeguarding Ombudsperson</h3>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-stone-400' : 'text-stone-600'}`}>
                If you have concerns regarding retaliation, breach of anonymity, or severe ethical violations at {organisation.legal_name}, you can reach our independent safeguarding desk directly.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => alert('Safeguarding notice: Ticket opened with ETES Independent Human Rights & Safeguarding Desk.')}
                  className="px-5 py-2.5 rounded-lg bg-[#C5A059] text-[#0B111E] text-xs font-bold hover:bg-[#DFB76C] transition-all shadow-sm"
                >
                  Contact Independent Ombudsperson
                </button>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Profile Modal */}
      {profileModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`border rounded-2xl max-w-md w-full p-6 space-y-6 shadow-2xl ${
            isDark ? 'bg-[#131B2A] border-[#C5A059]/40 text-white' : 'bg-white border-stone-200 text-stone-800'
          }`}>
            <div className={`flex items-center justify-between border-b pb-4 ${isDark ? 'border-[#1E293B]' : 'border-stone-200'}`}>
              <h3 className={`font-institutional text-lg font-bold ${isDark ? 'text-white' : 'text-[#0B111E]'}`}>Employee Profile</h3>
              <button 
                onClick={() => setProfileModalOpen(false)}
                className="text-stone-400 hover:text-stone-200"
              >
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
                <span className="text-stone-400">Role / Title</span>
                <span className={`font-semibold ${isDark ? 'text-white' : 'text-[#0B111E]'}`}>{currentPersona.title}</span>
              </div>
              <div className={`flex justify-between py-2 border-b ${isDark ? 'border-[#1E293B]' : 'border-stone-100'}`}>
                <span className="text-stone-400">Organisation</span>
                <span className={isDark ? 'text-white' : 'text-stone-800'}>{organisation.legal_name}</span>
              </div>
              <div className={`flex justify-between py-2 border-b ${isDark ? 'border-[#1E293B]' : 'border-stone-100'}`}>
                <span className="text-stone-400">Verification Token</span>
                <span className="font-mono-code text-emerald-400">0x8F42...SEALED</span>
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
