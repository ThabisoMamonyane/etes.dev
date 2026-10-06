import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { RelationshipType } from '../../types';
import { LoginModal } from '../common/LoginModal';
import { 
  DirectoryOrganisation, 
  DirectoryStatus 
} from './TrustDirectory';
import { 
  ChevronLeft, 
  ShieldCheck, 
  Award, 
  ExternalLink, 
  X, 
  FileText, 
  Building2, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  Lock, 
  TrendingUp, 
  Info, 
  Calendar, 
  Users, 
  Clock, 
  BadgeCheck, 
  ArrowUpRight,
  Download,
  Sliders,
  RotateCcw,
  Sparkles
} from 'lucide-react';

export interface CompanyDetailedData {
  about_summary: string;
  about_full: string;
  last_updated: string;
  participating_since: string;
  valid_until: string;
  trust_index?: number;
  trust_index_change?: string;
  dimensions?: {
    leadership: number;
    communication: number;
    fairness: number;
    accountability: number;
    employee_voice: number;
  };
  journey: Array<{
    year: string;
    title: string;
    description: string;
    status: 'completed' | 'active' | 'scheduled';
  }>;
  research_sample: {
    verified_respondents: number;
    participation_rate: string;
    confidence_interval: string;
    benchmarking_cohort: string;
  };
  executive_response: {
    quote: string;
    executive_name: string;
    executive_title: string;
    priority_focus: string[];
  };
}

// Master detailed data keyed by organisation ID, with Discovery Limited matching the reference screenshot exactly
export const COMPANY_DETAILS_LOOKUP: Record<string, CompanyDetailedData> = {
  'org-001': {
    about_summary: 'Discovery Limited is a financial services and healthcare group committed to improving lives.',
    about_full: 'Discovery Limited is a South Africa-founded multinational financial services organisation that operates in healthcare, life insurance, short-term insurance, savings and investment, and banking. Its shared-value insurance model incentivises people to lead healthier lives, drive better, and manage their money prudently.',
    last_updated: 'May 2024',
    participating_since: 'Participating since 2022',
    valid_until: 'Valid until May 2025',
    trust_index: 74,
    trust_index_change: '+6% vs last year',
    dimensions: {
      leadership: 78,
      communication: 72,
      fairness: 76,
      accountability: 70,
      employee_voice: 79
    },
    journey: [
      { year: '2022', title: 'Initiation & Baseline Assessment', description: 'Enrolled under the ETES Charter, establishing an enterprise baseline across 14,000+ employees.', status: 'completed' },
      { year: '2023', title: 'First Constitutional Audit Cycle', description: 'Achieved verified compliance in Fairness and Employee Voice, expanding feedback loops across regional divisions.', status: 'completed' },
      { year: '2024', title: 'ETES Certified™ Renewal (+6% Trust Index)', description: 'Validated significant improvements in transparent leadership and accountability channels.', status: 'completed' },
      { year: '2025', title: 'Annual Re-Verification Cycle', description: 'Scheduled enterprise-wide statistical sampling and audit renewal under Charter Vol. 4.', status: 'active' }
    ],
    research_sample: {
      verified_respondents: 9840,
      participation_rate: '71.2%',
      confidence_interval: '95% CI (±0.8%)',
      benchmarking_cohort: 'Pan-African Financial Services & Healthcare (n=48 organisations)'
    },
    executive_response: {
      quote: "Trust is the fundamental currency of our shared-value model. The ETES framework provides an uncompromising mirror that holds our leadership accountable to our employees.",
      executive_name: 'Adrian Gore',
      executive_title: 'Group Chief Executive, Discovery Limited',
      priority_focus: [
        'Expanding bilateral communications in newly acquired division entities',
        'Enhancing anonymous redress resolution times down to 72 hours',
        'Institutionalising frontline staff recognition and psychological safety'
      ]
    }
  },
  'org-002': {
    about_summary: 'Absa Group is a diversified financial services provider offering personal and business banking.',
    about_full: 'Absa Group Limited is listed on the JSE and is one of Africa’s largest diversified financial services groups, offering an integrated set of products and services across personal and business banking, corporate and investment banking, wealth and investment management and insurance.',
    last_updated: 'March 2024',
    participating_since: 'Participating since 2023',
    valid_until: 'Valid until February 2027',
    trust_index: 71,
    trust_index_change: '+4% vs last year',
    dimensions: {
      leadership: 69,
      communication: 74,
      fairness: 70,
      accountability: 72,
      employee_voice: 70
    },
    journey: [
      { year: '2023', title: 'Charter Onboarding', description: 'Completed baseline multi-branch workforce assessment.', status: 'completed' },
      { year: '2024', title: 'Profile Available Classification', description: 'Disclosed verified signals across retail and commercial banking sectors.', status: 'completed' },
      { year: '2025', title: 'Certification Progression Cycle', description: 'Ongoing targeted leadership alignment programs.', status: 'active' }
    ],
    research_sample: {
      verified_respondents: 21400,
      participation_rate: '64.8%',
      confidence_interval: '95% CI (±1.1%)',
      benchmarking_cohort: 'Commercial Banking & Institutional Finance'
    },
    executive_response: {
      quote: "Our colleagues are the heart of Absa. Verified trust metrics guide our leadership team in fostering an equitable and transparent workplace.",
      executive_name: 'Arrie Rautenbach',
      executive_title: 'Chief Executive Officer, Absa Group',
      priority_focus: [
        'Improving cross-branch managerial consistency',
        'Strengthening career progression transparency'
      ]
    }
  },
  'org-003': {
    about_summary: 'MTN Group is a leading telecommunications operator providing voice, data, and fintech across Africa.',
    about_full: 'MTN Group is a telecommunications company offering cellular network access and business solutions across 19 markets in Africa and the Middle East, pioneering connectivity and financial inclusion through MoMo.',
    last_updated: 'January 2025',
    participating_since: 'Participating since 2024',
    valid_until: 'Valid until January 2028',
    trust_index: 68,
    trust_index_change: '+3% vs last year',
    dimensions: {
      leadership: 71,
      communication: 66,
      fairness: 68,
      accountability: 67,
      employee_voice: 68
    },
    journey: [
      { year: '2024', title: 'Network Operations Pilot', description: 'Piloted ETES trust measurement in South African and Nigerian hubs.', status: 'completed' },
      { year: '2025', title: 'Participating Benchmark Cycle', description: 'Gathering cross-market workforce sentiment for institutional certification.', status: 'active' }
    ],
    research_sample: {
      verified_respondents: 11200,
      participation_rate: '58.4%',
      confidence_interval: '95% CI (±1.4%)',
      benchmarking_cohort: 'Telecommunications & Digital Infrastructure'
    },
    executive_response: {
      quote: "Building trust in digital infrastructure begins internally. ETES provides an objective assessment of our workplace culture.",
      executive_name: 'Ralph Mupita',
      executive_title: 'President & CEO, MTN Group',
      priority_focus: [
        'Digital workforce consultation tools',
        'Technical staff retention and work-life balance initiatives'
      ]
    }
  },
  'org-004': {
    about_summary: 'Standard Bank Group is the largest African bank by assets with a presence in 20 sub-Saharan countries.',
    about_full: 'Standard Bank Group is a financial institution with an established history spanning over 160 years, operating across personal and private banking, business and commercial banking, and corporate and investment banking.',
    last_updated: 'August 2024',
    participating_since: 'Participating since 2024',
    valid_until: 'Valid until August 2026',
    trust_index: 65,
    trust_index_change: 'First assessment year',
    dimensions: {
      leadership: 66,
      communication: 63,
      fairness: 67,
      accountability: 64,
      employee_voice: 65
    },
    journey: [
      { year: '2024', title: 'Preliminary Assessment', description: 'Limited profile disclosure focusing on Investment Banking and Wealth divisions.', status: 'completed' },
      { year: '2025', title: 'Full Group Disclosure Scope', description: 'Expanding assessment to retail branches continent-wide.', status: 'active' }
    ],
    research_sample: {
      verified_respondents: 14500,
      participation_rate: '49.1%',
      confidence_interval: '95% CI (±1.8%)',
      benchmarking_cohort: 'Pan-African Universal Banking'
    },
    executive_response: {
      quote: "Transparency is critical as we modernize our institution. This preliminary profile marks our commitment to continuous open measurement.",
      executive_name: 'Sim Tshabalala',
      executive_title: 'Chief Executive, Standard Bank Group',
      priority_focus: [
        'Broadening survey coverage to branch personnel',
        'Formalising transparent executive review sessions'
      ]
    }
  },
  'org-005': {
    about_summary: 'Woolworths Holdings is an investment management company with retail operations in South Africa and Australasia.',
    about_full: 'Woolworths Holdings Limited is a retail chain focused on food, clothing, beauty, and homeware, recognized for quality and sustainable supply chains.',
    last_updated: 'November 2024',
    participating_since: 'Participating since 2024',
    valid_until: 'Confidential',
    trust_index: undefined,
    trust_index_change: undefined,
    dimensions: undefined,
    journey: [
      { year: '2024', title: 'Non-Disclosed Participant Enrollment', description: 'Enrolled under confidential internal benchmark protocol.', status: 'completed' },
      { year: '2025', title: 'Internal Review Cycle', description: 'Deliberating public signal publication.', status: 'active' }
    ],
    research_sample: {
      verified_respondents: 6200,
      participation_rate: 'Confidential',
      confidence_interval: 'Internal Only',
      benchmarking_cohort: 'Food & Apparel Retail'
    },
    executive_response: {
      quote: "Woolworths prioritizes continuous workforce listening. Full public metrics remain under standard governance review.",
      executive_name: 'Roy Bagattini',
      executive_title: 'Group Chief Executive Officer, Woolworths Holdings',
      priority_focus: [
        'Supply chain distribution center wellness',
        'Store-level employee engagement'
      ]
    }
  }
};

interface CompanyProfileViewProps {
  organisation: DirectoryOrganisation;
  onBack: () => void;
  currentRole?: RelationshipType;
  onNavigateToRole?: (role: RelationshipType, scopeType?: 'enterprise_wide' | 'business_unit', targetTab?: string) => void;
  onSelectRole?: (role: RelationshipType, scopeType?: 'enterprise_wide' | 'business_unit', targetTab?: string) => void;
}

type TabType = 'journey' | 'research' | 'response' | 'how_we_know' | 'what_you_wont_see';

export const CompanyProfileView: React.FC<CompanyProfileViewProps> = ({
  organisation,
  onBack,
  currentRole = 'public',
  onNavigateToRole,
  onSelectRole
}) => {
  const { isDark } = useTheme();

  // Scroll to top when opening company profile
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [organisation.id]);

  const [activeTab, setActiveTab] = useState<TabType>('journey');
  const [isReadMoreOpen, setIsReadMoreOpen] = useState(false);
  const [isCertificateModalOpen, setIsCertificateModalOpen] = useState(false);
  const [isScoringModalOpen, setIsScoringModalOpen] = useState(false);
  const [scoreSubmitted, setScoreSubmitted] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Handle Take Assessment button click:
  // If user is authenticated (role !== 'public'), navigate directly to My Assessments page on employee dashboard
  // If not yet authenticated, present logon screen modal
  const handleTakeAssessmentClick = () => {
    const isAuth = currentRole && currentRole !== 'public';
    if (isAuth) {
      const navFn = onNavigateToRole || onSelectRole;
      if (navFn) {
        navFn('employee', undefined, 'emp-assessment');
      }
    } else {
      setIsLoginModalOpen(true);
    }
  };

  // Retrieve detail data or generate accurate fallbacks based on organisation
  const details: CompanyDetailedData = COMPANY_DETAILS_LOOKUP[organisation.id] || {
    about_summary: `${organisation.legal_name} operates within the ${organisation.industry} sector in ${organisation.country}.`,
    about_full: `${organisation.legal_name} is a premier enterprise in ${organisation.country}, operating across key national and international operations with an assessed workforce of ${organisation.employee_count.toLocaleString()} employees under the ETES Trust Charter.`,
    last_updated: 'May 2024',
    participating_since: organisation.certified_since ? `Participating since ${organisation.certified_since.slice(0, 4)}` : 'Participating since 2023',
    valid_until: organisation.valid_until ? `Valid until ${organisation.valid_until}` : 'Valid until May 2025',
    trust_index: organisation.status === 'ETES Certified™' ? 76 : organisation.status === 'Profile Available' ? 70 : 64,
    trust_index_change: '+5% vs last year',
    dimensions: {
      leadership: 75,
      communication: 71,
      fairness: 74,
      accountability: 72,
      employee_voice: 77
    },
    journey: [
      { year: '2023', title: 'Charter Registration', description: 'Registered under the ETES Institutional Standard.', status: 'completed' },
      { year: '2024', title: 'Workforce Audit Conducted', description: 'Comprehensive statistically rigorous employee assessment completed.', status: 'completed' },
      { year: '2025', title: 'Continuous Review', description: 'Ongoing verified feedback and benchmarking.', status: 'active' }
    ],
    research_sample: {
      verified_respondents: Math.round(organisation.employee_count * 0.65),
      participation_rate: '68.5%',
      confidence_interval: '95% CI (±1.0%)',
      benchmarking_cohort: `${organisation.industry} (${organisation.country})`
    },
    executive_response: {
      quote: `${organisation.legal_name} recognizes that sustained performance depends on institutional trust, transparency, and accountability across all business units.`,
      executive_name: 'Executive Committee',
      executive_title: 'Office of the Chief Executive',
      priority_focus: [
        'Quarterly transparent executive listening forums',
        'Transparent metric-based promotion matrices',
        'Third-party confidential whistle-blower channels'
      ]
    }
  };

  // State for interactive scoring evaluation
  const [evalScores, setEvalScores] = useState<Record<string, number>>({
    leadership: details.dimensions?.leadership || 78,
    communication: details.dimensions?.communication || 72,
    fairness: details.dimensions?.fairness || 76,
    accountability: details.dimensions?.accountability || 78,
    employee_voice: details.dimensions?.employee_voice || 79
  });

  const evaluatedScoreAverage = Math.round(
    (evalScores.leadership + evalScores.communication + evalScores.fairness + evalScores.accountability + evalScores.employee_voice) / 5
  );

  // Circular gauge calculations (matching 74% circular ring in the screenshot)
  const trustScore = details.trust_index ?? 74;
  const radius = 48;
  const circumference = 2 * Math.PI * radius;
  // Let the gauge occupy a prominent arc or full donut
  const strokeDashoffset = circumference - (trustScore / 100) * circumference;

  return (
    <div className={`w-full min-h-screen transition-colors ${
      isDark ? 'bg-[#070B13] text-stone-100' : 'bg-[#FAF7F2] text-stone-900'
    }`} id="company-profile-page">
      
      {/* Top Institutional Header Bar with Breadcrumb / Return */}
      <div className={`w-full border-b px-4 sm:px-6 lg:px-8 py-3.5 transition-colors ${
        isDark ? 'bg-[#0B111E] border-stone-800' : 'bg-white border-[#E2DDD5]'
      }`}>
        <div className="max-w-5xl mx-auto flex items-center">
          <button
            onClick={onBack}
            className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
              isDark 
                ? 'text-stone-300 hover:text-white hover:bg-stone-800' 
                : 'text-stone-700 hover:text-stone-950 hover:bg-stone-100'
            }`}
            aria-label="Return to Trust Directory"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to Trust Directory</span>
          </button>
        </div>
      </div>

      {/* Main Profile Canvas (Faithfully matches the uploaded screenshot 1001042540.jpg) */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8">
        
        {/* Top Split Header Section: Left (Company + Badge) & Right (About, Relationship, Certification) */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Left Block: Medallion + Legal Name + Status Badge + Last Updated */}
          <div className="md:col-span-7 flex items-start gap-4 sm:gap-5">
            
            {/* Medallion with layered bronze/gold institutional emblem matching screenshot */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-[#8C6D38] via-[#B89047] to-[#5C421B] p-[3px] shadow-md shrink-0 flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-[#1C150A] flex flex-col items-center justify-center relative overflow-hidden">
                {/* Stylised ETES double-chevron sprout motif */}
                <div className="flex flex-col items-center justify-center space-y-0.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#DFB76C] mb-0.5 shadow-xs" />
                  <div className="w-7 h-2 border-b-2 border-l-2 border-r-2 border-[#DFB76C] rounded-b-sm rotate-0 -mt-0.5" />
                  <div className="w-9 h-2.5 border-b-2 border-l-2 border-r-2 border-[#DFB76C] rounded-b-sm rotate-0 -mt-0.5" />
                </div>
              </div>
            </div>

            {/* Title & Status */}
            <div className="space-y-2">
              <h1 className={`font-institutional text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight leading-tight ${
                isDark ? 'text-white' : 'text-stone-950'
              }`}>
                {organisation.legal_name}
              </h1>

              {/* Status Badge & TRUST SCORE button */}
              <div className="flex flex-wrap items-center gap-2.5 pt-0.5">
                <span className="inline-block px-3.5 py-1 text-xs font-semibold rounded bg-[#0A4736] text-white shadow-xs tracking-wide">
                  {organisation.status}
                </span>

                <button
                  onClick={handleTakeAssessmentClick}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1 text-xs font-bold uppercase tracking-wider rounded bg-[#C5A059] text-black hover:bg-[#DFB76C] shadow-xs hover:shadow transition-all cursor-pointer"
                  id="btn-header-take-assessment"
                  title="Take workforce trust assessment for this organisation"
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>TAKE ASSESSMENT</span>
                </button>
              </div>

              {/* Last Updated Timestamp */}
              <p className={`text-xs font-medium pt-0.5 ${
                isDark ? 'text-stone-400' : 'text-stone-500'
              }`}>
                Last updated: {details.last_updated}
              </p>
            </div>

          </div>

          {/* Right Block: About, ETES Relationship, Certification (Matches right column in screenshot) */}
          <div className="md:col-span-5 space-y-4 text-xs sm:text-sm">
            
            {/* About Subsection */}
            <div className="space-y-1">
              <h2 className={`font-bold text-xs sm:text-sm tracking-tight ${
                isDark ? 'text-white' : 'text-stone-950'
              }`}>
                About
              </h2>
              <p className={`leading-relaxed text-xs ${
                isDark ? 'text-stone-300' : 'text-stone-700'
              }`}>
                {details.about_summary}
              </p>
              <button
                onClick={() => setIsReadMoreOpen(true)}
                className={`font-semibold underline underline-offset-4 text-xs cursor-pointer inline-block transition-colors ${
                  isDark 
                    ? 'text-[#DFB76C] hover:text-[#E8CA8C] decoration-[#DFB76C]/40' 
                    : 'text-[#8C6B28] hover:text-[#6E531D] decoration-[#8C6B28]/50'
                }`}
              >
                Read more
              </button>
            </div>

            {/* ETES Relationship Subsection */}
            <div className="space-y-1 pt-1">
              <h2 className={`font-bold text-xs sm:text-sm tracking-tight ${
                isDark ? 'text-white' : 'text-stone-950'
              }`}>
                ETES Relationship
              </h2>
              <p className={`text-xs ${
                isDark ? 'text-stone-300' : 'text-stone-700'
              }`}>
                {details.participating_since}
              </p>
            </div>

            {/* Certification Subsection */}
            <div className="space-y-1 pt-1">
              <h2 className={`font-bold text-xs sm:text-sm tracking-tight ${
                isDark ? 'text-white' : 'text-stone-950'
              }`}>
                Certification
              </h2>
              <p className={`text-xs ${
                isDark ? 'text-stone-300' : 'text-stone-700'
              }`}>
                {details.valid_until}
              </p>
              <button
                onClick={() => setIsCertificateModalOpen(true)}
                className={`font-semibold underline underline-offset-4 text-xs cursor-pointer inline-block transition-colors ${
                  isDark 
                    ? 'text-[#DFB76C] hover:text-[#E8CA8C] decoration-[#DFB76C]/40' 
                    : 'text-[#8C6B28] hover:text-[#6E531D] decoration-[#8C6B28]/50'
                }`}
              >
                View Certificate
              </button>
            </div>

          </div>

        </section>

        {/* Center-Left Hero Card: Trust Signals™ (Matches exact layout with circular gauge & horizontal dimension bars) */}
        <section className={`rounded-xl border p-6 sm:p-7 transition-colors ${
          isDark 
            ? 'bg-[#0B111E] border-stone-800 shadow-md' 
            : 'bg-white border-[#E2DDD5] shadow-xs'
        }`}>
          
          {/* Card Title & TRUST SCORE button */}
          <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
            <h2 className={`font-institutional text-base sm:text-lg font-bold ${
              isDark ? 'text-white' : 'text-stone-950'
            }`}>
              Trust Signals™
            </h2>
            <button
              onClick={handleTakeAssessmentClick}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded bg-[#C5A059] text-black hover:bg-[#DFB76C] shadow-xs hover:shadow transition-all cursor-pointer"
              id="btn-signals-take-assessment"
              title="Take workforce trust assessment for this organisation"
            >
              <Award className="w-3.5 h-3.5" />
              <span>TAKE ASSESSMENT</span>
            </button>
          </div>

          {details.dimensions ? (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              
              {/* Left Side: Circular Trust Index Gauge */}
              <div className="md:col-span-5 flex flex-col items-center justify-center text-center py-2">
                
                {/* Circular Gauge Ring */}
                <div className="relative w-36 h-36 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 120 120">
                    {/* Background Track Circle */}
                    <circle
                      cx="60"
                      cy="60"
                      r={radius}
                      stroke={isDark ? '#1E293B' : '#EAE6DF'}
                      strokeWidth="11"
                      fill="transparent"
                    />
                    {/* Active Green Value Arc */}
                    <circle
                      cx="60"
                      cy="60"
                      r={radius}
                      stroke="#0A4736"
                      strokeWidth="11"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      strokeLinecap="round"
                      fill="transparent"
                      className="transition-all duration-1000 ease-out"
                    />
                  </svg>

                  {/* Centered Percentage Value */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className={`font-institutional text-3xl sm:text-4xl font-bold tracking-tight ${
                      isDark ? 'text-white' : 'text-stone-950'
                    }`}>
                      {trustScore}%
                    </span>
                  </div>
                </div>

                {/* Gauge Labels Beneath */}
                <div className="mt-3 space-y-0.5">
                  <div className={`text-xs sm:text-sm font-semibold ${
                    isDark ? 'text-stone-200' : 'text-stone-800'
                  }`}>
                    Overall Trust Index
                  </div>
                  {details.trust_index_change && (
                    <div className={`text-[11px] font-bold ${
                      isDark ? 'text-emerald-400' : 'text-[#0A4736]'
                    }`}>
                      {details.trust_index_change}
                    </div>
                  )}
                </div>

              </div>

              {/* Right Side: 5 Core Dimension Progress Bars */}
              <div className="md:col-span-7 space-y-4">
                
                {/* 1. Leadership */}
                <div className="flex items-center gap-4 text-xs sm:text-sm">
                  <span className={`w-32 font-medium shrink-0 ${
                    isDark ? 'text-stone-300' : 'text-stone-800'
                  }`}>
                    Leadership
                  </span>
                  <div className={`flex-1 h-2.5 rounded-full overflow-hidden ${
                    isDark ? 'bg-stone-800' : 'bg-[#EAE6DF]'
                  }`}>
                    <div 
                      className="bg-[#0A4736] h-full rounded-full transition-all duration-700 ease-out" 
                      style={{ width: `${details.dimensions.leadership}%` }} 
                    />
                  </div>
                  <span className={`w-10 text-right font-semibold font-mono-code text-xs ${
                    isDark ? 'text-stone-200' : 'text-stone-900'
                  }`}>
                    {details.dimensions.leadership}%
                  </span>
                </div>

                {/* 2. Communication */}
                <div className="flex items-center gap-4 text-xs sm:text-sm">
                  <span className={`w-32 font-medium shrink-0 ${
                    isDark ? 'text-stone-300' : 'text-stone-800'
                  }`}>
                    Communication
                  </span>
                  <div className={`flex-1 h-2.5 rounded-full overflow-hidden ${
                    isDark ? 'bg-stone-800' : 'bg-[#EAE6DF]'
                  }`}>
                    <div 
                      className="bg-[#0A4736] h-full rounded-full transition-all duration-700 ease-out" 
                      style={{ width: `${details.dimensions.communication}%` }} 
                    />
                  </div>
                  <span className={`w-10 text-right font-semibold font-mono-code text-xs ${
                    isDark ? 'text-stone-200' : 'text-stone-900'
                  }`}>
                    {details.dimensions.communication}%
                  </span>
                </div>

                {/* 3. Fairness */}
                <div className="flex items-center gap-4 text-xs sm:text-sm">
                  <span className={`w-32 font-medium shrink-0 ${
                    isDark ? 'text-stone-300' : 'text-stone-800'
                  }`}>
                    Fairness
                  </span>
                  <div className={`flex-1 h-2.5 rounded-full overflow-hidden ${
                    isDark ? 'bg-stone-800' : 'bg-[#EAE6DF]'
                  }`}>
                    <div 
                      className="bg-[#0A4736] h-full rounded-full transition-all duration-700 ease-out" 
                      style={{ width: `${details.dimensions.fairness}%` }} 
                    />
                  </div>
                  <span className={`w-10 text-right font-semibold font-mono-code text-xs ${
                    isDark ? 'text-stone-200' : 'text-stone-900'
                  }`}>
                    {details.dimensions.fairness}%
                  </span>
                </div>

                {/* 4. Accountability */}
                <div className="flex items-center gap-4 text-xs sm:text-sm">
                  <span className={`w-32 font-medium shrink-0 ${
                    isDark ? 'text-stone-300' : 'text-stone-800'
                  }`}>
                    Accountability
                  </span>
                  <div className={`flex-1 h-2.5 rounded-full overflow-hidden ${
                    isDark ? 'bg-stone-800' : 'bg-[#EAE6DF]'
                  }`}>
                    <div 
                      className="bg-[#0A4736] h-full rounded-full transition-all duration-700 ease-out" 
                      style={{ width: `${details.dimensions.accountability}%` }} 
                    />
                  </div>
                  <span className={`w-10 text-right font-semibold font-mono-code text-xs ${
                    isDark ? 'text-stone-200' : 'text-stone-900'
                  }`}>
                    {details.dimensions.accountability}%
                  </span>
                </div>

                {/* 5. Employee Voice */}
                <div className="flex items-center gap-4 text-xs sm:text-sm">
                  <span className={`w-32 font-medium shrink-0 ${
                    isDark ? 'text-stone-300' : 'text-stone-800'
                  }`}>
                    Employee Voice
                  </span>
                  <div className={`flex-1 h-2.5 rounded-full overflow-hidden ${
                    isDark ? 'bg-stone-800' : 'bg-[#EAE6DF]'
                  }`}>
                    <div 
                      className="bg-[#0A4736] h-full rounded-full transition-all duration-700 ease-out" 
                      style={{ width: `${details.dimensions.employee_voice}%` }} 
                    />
                  </div>
                  <span className={`w-10 text-right font-semibold font-mono-code text-xs ${
                    isDark ? 'text-stone-200' : 'text-stone-900'
                  }`}>
                    {details.dimensions.employee_voice}%
                  </span>
                </div>

              </div>

            </div>
          ) : (
            <div className="py-8 text-center space-y-2">
              <Lock className={`w-8 h-8 mx-auto ${isDark ? 'text-stone-400' : 'text-stone-500'}`} />
              <p className={`text-sm font-semibold ${isDark ? 'text-stone-200' : 'text-stone-800'}`}>
                Signals Restricted or Confidential
              </p>
              <p className={`text-xs max-w-md mx-auto ${isDark ? 'text-stone-400' : 'text-stone-600'}`}>
                This participant is currently in a preliminary audit cycle or non-disclosed assessment. Quantitative metrics are held in escrow.
              </p>
            </div>
          )}

        </section>

        {/* Bottom Navigation Tabs (Matches exact tab bar from attached screenshot) */}
        <section className="space-y-4">
          
          {/* Tab Button Row */}
          <div className={`flex flex-wrap items-center gap-2 border-b pb-3 transition-colors ${
            isDark ? 'border-stone-800' : 'border-[#E2DDD5]'
          }`}>
            
            {/* 1. Trust Journey Tab */}
            <button
              onClick={() => setActiveTab('journey')}
              className={`group flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-150 cursor-pointer ${
                activeTab === 'journey'
                  ? isDark
                    ? 'bg-stone-800 text-white border border-[#C5A059] shadow-md'
                    : 'bg-white text-stone-950 border border-[#C5A059] ring-1 ring-[#C5A059]/40 shadow-xs'
                  : isDark
                    ? 'bg-stone-900/50 text-stone-400 hover:text-white hover:bg-stone-800 border border-stone-800/80 hover:border-stone-700'
                    : 'bg-stone-100/90 text-stone-600 hover:text-stone-950 hover:bg-stone-200/90 border border-stone-200/80 hover:border-stone-300 shadow-2xs'
              }`}
            >
              <ShieldCheck className={`w-4 h-4 transition-colors ${
                activeTab === 'journey'
                  ? isDark ? 'text-[#DFB76C]' : 'text-[#8C6B28]'
                  : isDark ? 'text-stone-400 group-hover:text-white' : 'text-stone-500 group-hover:text-stone-950'
              }`} />
              <span>Trust Journey</span>
            </button>

            {/* 2. Research Tab */}
            <button
              onClick={() => setActiveTab('research')}
              className={`group flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-150 cursor-pointer ${
                activeTab === 'research'
                  ? isDark
                    ? 'bg-stone-800 text-white border border-[#C5A059] shadow-md'
                    : 'bg-white text-stone-950 border border-[#C5A059] ring-1 ring-[#C5A059]/40 shadow-xs'
                  : isDark
                    ? 'bg-stone-900/50 text-stone-400 hover:text-white hover:bg-stone-800 border border-stone-800/80 hover:border-stone-700'
                    : 'bg-stone-100/90 text-stone-600 hover:text-stone-950 hover:bg-stone-200/90 border border-stone-200/80 hover:border-stone-300 shadow-2xs'
              }`}
            >
              <FileText className={`w-4 h-4 transition-colors ${
                activeTab === 'research'
                  ? isDark ? 'text-[#DFB76C]' : 'text-[#8C6B28]'
                  : isDark ? 'text-stone-400 group-hover:text-white' : 'text-stone-500 group-hover:text-stone-950'
              }`} />
              <span>Research</span>
            </button>

            {/* 3. Organisation Response Tab */}
            <button
              onClick={() => setActiveTab('response')}
              className={`group flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-150 cursor-pointer ${
                activeTab === 'response'
                  ? isDark
                    ? 'bg-stone-800 text-white border border-[#C5A059] shadow-md'
                    : 'bg-white text-stone-950 border border-[#C5A059] ring-1 ring-[#C5A059]/40 shadow-xs'
                  : isDark
                    ? 'bg-stone-900/50 text-stone-400 hover:text-white hover:bg-stone-800 border border-stone-800/80 hover:border-stone-700'
                    : 'bg-stone-100/90 text-stone-600 hover:text-stone-950 hover:bg-stone-200/90 border border-stone-200/80 hover:border-stone-300 shadow-2xs'
              }`}
            >
              <Building2 className={`w-4 h-4 transition-colors ${
                activeTab === 'response'
                  ? isDark ? 'text-[#DFB76C]' : 'text-[#8C6B28]'
                  : isDark ? 'text-stone-400 group-hover:text-white' : 'text-stone-500 group-hover:text-stone-950'
              }`} />
              <span>Organisation Response</span>
            </button>

            {/* 4. How We Know Tab */}
            <button
              onClick={() => setActiveTab('how_we_know')}
              className={`group flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-150 cursor-pointer ${
                activeTab === 'how_we_know'
                  ? isDark
                    ? 'bg-stone-800 text-white border border-[#C5A059] shadow-md'
                    : 'bg-white text-stone-950 border border-[#C5A059] ring-1 ring-[#C5A059]/40 shadow-xs'
                  : isDark
                    ? 'bg-stone-900/50 text-stone-400 hover:text-white hover:bg-stone-800 border border-stone-800/80 hover:border-stone-700'
                    : 'bg-stone-100/90 text-stone-600 hover:text-stone-950 hover:bg-stone-200/90 border border-stone-200/80 hover:border-stone-300 shadow-2xs'
              }`}
            >
              <Eye className={`w-4 h-4 transition-colors ${
                activeTab === 'how_we_know'
                  ? isDark ? 'text-[#DFB76C]' : 'text-[#8C6B28]'
                  : isDark ? 'text-stone-400 group-hover:text-white' : 'text-stone-500 group-hover:text-stone-950'
              }`} />
              <span>How We Know</span>
            </button>

            {/* 5. What You Won't See Tab */}
            <button
              onClick={() => setActiveTab('what_you_wont_see')}
              className={`group flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-150 cursor-pointer ${
                activeTab === 'what_you_wont_see'
                  ? isDark
                    ? 'bg-stone-800 text-white border border-[#C5A059] shadow-md'
                    : 'bg-white text-stone-950 border border-[#C5A059] ring-1 ring-[#C5A059]/40 shadow-xs'
                  : isDark
                    ? 'bg-stone-900/50 text-stone-400 hover:text-white hover:bg-stone-800 border border-stone-800/80 hover:border-stone-700'
                    : 'bg-stone-100/90 text-stone-600 hover:text-stone-950 hover:bg-stone-200/90 border border-stone-200/80 hover:border-stone-300 shadow-2xs'
              }`}
            >
              <EyeOff className={`w-4 h-4 transition-colors ${
                activeTab === 'what_you_wont_see'
                  ? isDark ? 'text-[#DFB76C]' : 'text-[#8C6B28]'
                  : isDark ? 'text-stone-400 group-hover:text-white' : 'text-stone-500 group-hover:text-stone-950'
              }`} />
              <span>What You Won't See</span>
            </button>

          </div>

          {/* Tab Content Panel */}
          <div className={`rounded-xl border p-6 transition-colors ${
            isDark ? 'bg-[#0B111E] border-stone-800 shadow-md' : 'bg-white border-[#E2DDD5] shadow-xs'
          }`}>
            
            {/* 1. TRUST JOURNEY TAB */}
            {activeTab === 'journey' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="space-y-1">
                  <h3 className={`font-institutional text-sm sm:text-base font-bold ${
                    isDark ? 'text-white' : 'text-stone-950'
                  }`}>
                    Trust Evolution & Audit Milestones
                  </h3>
                  <p className={`text-xs ${isDark ? 'text-stone-400' : 'text-stone-600'}`}>
                    Chronological verification history under the ETES Charter and independent workforce reviews.
                  </p>
                </div>

                <div className={`relative pl-6 sm:pl-8 space-y-6 before:content-[''] before:absolute before:left-2 sm:before:left-3 before:top-2 before:bottom-2 before:w-0.5 ${
                  isDark ? 'before:bg-stone-800' : 'before:bg-stone-200'
                }`}>
                  {details.journey.map((item, idx) => (
                    <div key={idx} className="relative group">
                      <div className={`absolute -left-6 sm:-left-8 top-1 w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        isDark ? 'bg-[#0B111E]' : 'bg-white'
                      } ${
                        item.status === 'completed'
                          ? 'border-[#0A4736] text-[#0A4736]'
                          : 'border-[#C5A059] text-[#C5A059]'
                      }`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${
                          item.status === 'completed' ? 'bg-[#0A4736]' : 'bg-[#C5A059]'
                        }`} />
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className={`font-mono-code font-bold text-xs ${
                            isDark ? 'text-emerald-400' : 'text-[#0A4736]'
                          }`}>
                            {item.year}
                          </span>
                          <span className={`font-semibold text-xs ${
                            isDark ? 'text-stone-100' : 'text-stone-900'
                          }`}>
                            {item.title}
                          </span>
                        </div>
                        <p className={`text-xs leading-relaxed ${
                          isDark ? 'text-stone-300' : 'text-stone-650'
                        }`}>
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 2. RESEARCH TAB */}
            {activeTab === 'research' && (
              <div className="space-y-5 animate-in fade-in duration-200 text-xs">
                <div className="space-y-1">
                  <h3 className={`font-institutional text-sm sm:text-base font-bold ${
                    isDark ? 'text-white' : 'text-stone-950'
                  }`}>
                    Independent Methodology & Research Rigour
                  </h3>
                  <p className={`text-xs ${isDark ? 'text-stone-400' : 'text-stone-600'}`}>
                    Mathematical validation standards administered by the ETES Academic Board.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-2">
                  <div className={`p-4 rounded-lg border transition-colors ${
                    isDark ? 'bg-stone-900/50 border-stone-800' : 'bg-[#FAF9F6] border-[#E8E4DC] hover:border-stone-300'
                  }`}>
                    <div className={`text-[11px] font-medium ${isDark ? 'text-stone-400' : 'text-stone-600'}`}>
                      Verified Respondents
                    </div>
                    <div className={`font-institutional text-lg font-bold mt-1 ${
                      isDark ? 'text-white' : 'text-stone-950'
                    }`}>
                      {details.research_sample.verified_respondents.toLocaleString()}
                    </div>
                    <div className={`text-[10px] mt-0.5 ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                      Anonymized tokenized returns
                    </div>
                  </div>

                  <div className={`p-4 rounded-lg border transition-colors ${
                    isDark ? 'bg-stone-900/50 border-stone-800' : 'bg-[#FAF9F6] border-[#E8E4DC] hover:border-stone-300'
                  }`}>
                    <div className={`text-[11px] font-medium ${isDark ? 'text-stone-400' : 'text-stone-600'}`}>
                      Participation Rate
                    </div>
                    <div className={`font-institutional text-lg font-bold mt-1 ${
                      isDark ? 'text-white' : 'text-stone-950'
                    }`}>
                      {details.research_sample.participation_rate}
                    </div>
                    <div className={`text-[10px] mt-0.5 ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                      Statistically representative
                    </div>
                  </div>

                  <div className={`p-4 rounded-lg border transition-colors ${
                    isDark ? 'bg-stone-900/50 border-stone-800' : 'bg-[#FAF9F6] border-[#E8E4DC] hover:border-stone-300'
                  }`}>
                    <div className={`text-[11px] font-medium ${isDark ? 'text-stone-400' : 'text-stone-600'}`}>
                      Confidence Interval
                    </div>
                    <div className={`font-institutional text-lg font-bold mt-1 ${
                      isDark ? 'text-white' : 'text-stone-950'
                    }`}>
                      {details.research_sample.confidence_interval}
                    </div>
                    <div className={`text-[10px] mt-0.5 ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                      Standard scientific margin
                    </div>
                  </div>

                  <div className={`p-4 rounded-lg border transition-colors ${
                    isDark ? 'bg-stone-900/50 border-stone-800' : 'bg-[#FAF9F6] border-[#E8E4DC] hover:border-stone-300'
                  }`}>
                    <div className={`text-[11px] font-medium ${isDark ? 'text-stone-400' : 'text-stone-600'}`}>
                      Benchmarking Cohort
                    </div>
                    <div className={`font-semibold text-xs mt-1 truncate ${
                      isDark ? 'text-white' : 'text-stone-950'
                    }`} title={details.research_sample.benchmarking_cohort}>
                      {details.research_sample.benchmarking_cohort}
                    </div>
                    <div className={`text-[10px] mt-0.5 ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                      Peer comparison baseline
                    </div>
                  </div>
                </div>

                <div className={`p-4 rounded-lg border text-xs leading-relaxed space-y-1 ${
                  isDark ? 'bg-stone-900/30 border-stone-800 text-stone-300' : 'bg-[#FAF9F6] border-[#E8E4DC] text-stone-750'
                }`}>
                  <span className={`font-semibold ${isDark ? 'text-white' : 'text-stone-950'}`}>
                    Peer Group Normalization:{' '}
                  </span>
                  Data points undergo stratified weighting across seniority levels, branch locations, and workforce demographics to eliminate executive skew and ensure genuine frontline fidelity.
                </div>
              </div>
            )}

            {/* 3. ORGANISATION RESPONSE TAB */}
            {activeTab === 'response' && (
              <div className="space-y-5 animate-in fade-in duration-200 text-xs">
                <div className="space-y-1">
                  <h3 className={`font-institutional text-sm sm:text-base font-bold ${
                    isDark ? 'text-white' : 'text-stone-950'
                  }`}>
                    Executive Governance & Commitment Statement
                  </h3>
                  <p className={`text-xs ${isDark ? 'text-stone-400' : 'text-stone-600'}`}>
                    Formal accountability declaration signed by group executives upon receiving the Trust Signals™ brief.
                  </p>
                </div>

                <blockquote className={`p-4 rounded-lg border-l-4 border-[#0A4736] border pl-4 italic text-xs sm:text-sm leading-relaxed ${
                  isDark 
                    ? 'bg-stone-900/40 border-stone-800 text-stone-200' 
                    : 'bg-[#FAF9F6] border-[#E8E4DC] text-stone-850'
                }`}>
                  "{details.executive_response.quote}"
                </blockquote>

                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                    isDark ? 'bg-stone-800 text-stone-200' : 'bg-stone-200 text-stone-900'
                  }`}>
                    {details.executive_response.executive_name.charAt(0)}
                  </div>
                  <div>
                    <div className={`font-semibold text-xs ${
                      isDark ? 'text-white' : 'text-stone-950'
                    }`}>
                      {details.executive_response.executive_name}
                    </div>
                    <div className={`text-[11px] ${
                      isDark ? 'text-stone-400' : 'text-stone-600'
                    }`}>
                      {details.executive_response.executive_title}
                    </div>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <h4 className={`font-semibold text-xs ${
                    isDark ? 'text-white' : 'text-stone-950'
                  }`}>
                    Active Priority Focus Areas for Current Year:
                  </h4>
                  <ul className={`space-y-1.5 list-disc pl-4 ${
                    isDark ? 'text-stone-300' : 'text-stone-700'
                  }`}>
                    {details.executive_response.priority_focus.map((p, i) => (
                      <li key={i}>{p}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* 4. HOW WE KNOW TAB */}
            {activeTab === 'how_we_know' && (
              <div className="space-y-4 animate-in fade-in duration-200 text-xs">
                <div className="space-y-1">
                  <h3 className={`font-institutional text-sm sm:text-base font-bold ${
                    isDark ? 'text-white' : 'text-stone-950'
                  }`}>
                    Verification Architecture: How We Know
                  </h3>
                  <p className={`text-xs ${isDark ? 'text-stone-400' : 'text-stone-600'}`}>
                    Why ETES ratings cannot be gamed, purchased, or filtered by employer management.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                  <div className={`p-3.5 rounded-lg border space-y-1.5 transition-colors ${
                    isDark ? 'bg-stone-900/40 border-stone-800' : 'bg-[#FAF9F6] border-[#E8E4DC] hover:border-stone-300'
                  }`}>
                    <div className={`flex items-center gap-2 font-semibold ${
                      isDark ? 'text-white' : 'text-stone-950'
                    }`}>
                      <Lock className="w-4 h-4 text-[#0A4736]" />
                      <span>Zero Retaliation Guarantee</span>
                    </div>
                    <p className={`text-[11px] leading-relaxed ${
                      isDark ? 'text-stone-400' : 'text-stone-600'
                    }`}>
                      Responses are collected via independent zero-knowledge infrastructure completely severed from corporate intranet networks.
                    </p>
                  </div>

                  <div className={`p-3.5 rounded-lg border space-y-1.5 transition-colors ${
                    isDark ? 'bg-stone-900/40 border-stone-800' : 'bg-[#FAF9F6] border-[#E8E4DC] hover:border-stone-300'
                  }`}>
                    <div className={`flex items-center gap-2 font-semibold ${
                      isDark ? 'text-white' : 'text-stone-950'
                    }`}>
                      <BadgeCheck className="w-4 h-4 text-[#0A4736]" />
                      <span>Verified Employment Tokens</span>
                    </div>
                    <p className={`text-[11px] leading-relaxed ${
                      isDark ? 'text-stone-400' : 'text-stone-600'
                    }`}>
                      Only verified current active personnel participate via non-traceable single-use cryptographic tokens.
                    </p>
                  </div>

                  <div className={`p-3.5 rounded-lg border space-y-1.5 transition-colors ${
                    isDark ? 'bg-stone-900/40 border-stone-800' : 'bg-[#FAF9F6] border-[#E8E4DC] hover:border-stone-300'
                  }`}>
                    <div className={`flex items-center gap-2 font-semibold ${
                      isDark ? 'text-white' : 'text-stone-950'
                    }`}>
                      <TrendingUp className="w-4 h-4 text-[#0A4736]" />
                      <span>Multi-Year Longitudinal Drift</span>
                    </div>
                    <p className={`text-[11px] leading-relaxed ${
                      isDark ? 'text-stone-400' : 'text-stone-600'
                    }`}>
                      Metrics require continuous rolling sampling, preventing temporary pulse campaign distortions or PR manipulation.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* 5. WHAT YOU WON'T SEE TAB */}
            {activeTab === 'what_you_wont_see' && (
              <div className="space-y-4 animate-in fade-in duration-200 text-xs">
                <div className="space-y-1">
                  <h3 className={`font-institutional text-sm sm:text-base font-bold ${
                    isDark ? 'text-white' : 'text-stone-950'
                  }`}>
                    Institutional Boundary: What You Won't See
                  </h3>
                  <p className={`text-xs ${isDark ? 'text-stone-400' : 'text-stone-600'}`}>
                    Constitutional prohibitions enforced by the ETES Standards Committee.
                  </p>
                </div>

                <div className="space-y-2.5 pt-1">
                  <div className={`p-3 rounded-lg border flex items-start gap-3 transition-colors ${
                    isDark ? 'bg-stone-900/30 border-stone-800' : 'bg-[#FAF9F6] border-[#E8E4DC] hover:border-stone-300'
                  }`}>
                    <EyeOff className="w-4 h-4 text-rose-600 mt-0.5 shrink-0" />
                    <div>
                      <span className={`font-semibold ${isDark ? 'text-white' : 'text-stone-950'}`}>
                        No Sponsored Score Boosts:{' '}
                      </span>
                      <span className={isDark ? 'text-stone-300' : 'text-stone-700'}>
                        Organisations cannot pay for certification or higher tier placements. All ratings are mathematical functions of workforce sentiment.
                      </span>
                    </div>
                  </div>

                  <div className={`p-3 rounded-lg border flex items-start gap-3 transition-colors ${
                    isDark ? 'bg-stone-900/30 border-stone-800' : 'bg-[#FAF9F6] border-[#E8E4DC] hover:border-stone-300'
                  }`}>
                    <EyeOff className="w-4 h-4 text-rose-600 mt-0.5 shrink-0" />
                    <div>
                      <span className={`font-semibold ${isDark ? 'text-white' : 'text-stone-950'}`}>
                        No Cherry-Picked Cohorts:{' '}
                      </span>
                      <span className={isDark ? 'text-stone-300' : 'text-stone-700'}>
                        Employers cannot select which departments or branches are surveyed. Randomised cluster sampling is legally mandated.
                      </span>
                    </div>
                  </div>

                  <div className={`p-3 rounded-lg border flex items-start gap-3 transition-colors ${
                    isDark ? 'bg-stone-900/30 border-stone-800' : 'bg-[#FAF9F6] border-[#E8E4DC] hover:border-stone-300'
                  }`}>
                    <EyeOff className="w-4 h-4 text-rose-600 mt-0.5 shrink-0" />
                    <div>
                      <span className={`font-semibold ${isDark ? 'text-white' : 'text-stone-950'}`}>
                        No PII or De-anonymized Raw Quotes:{' '}
                      </span>
                      <span className={isDark ? 'text-stone-300' : 'text-stone-700'}>
                        Protecting frontline workers is supreme. Individual identifiers are cryptographically destroyed upon ingestion.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>

        </section>

      </main>

      {/* MODAL 1: "Read more" Full Corporate & Impact Description */}
      {isReadMoreOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setIsReadMoreOpen(false)}
        >
          <div 
            className={`rounded-xl max-w-lg w-full p-6 space-y-4 shadow-2xl border transition-colors ${
              isDark ? 'bg-[#0B111E] border-stone-800 text-stone-200' : 'bg-white border-stone-200 text-stone-800'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`flex items-center justify-between border-b pb-3 ${
              isDark ? 'border-stone-800' : 'border-stone-200'
            }`}>
              <h3 className={`font-institutional text-base font-bold ${
                isDark ? 'text-white' : 'text-stone-950'
              }`}>
                About {organisation.legal_name}
              </h3>
              <button 
                onClick={() => setIsReadMoreOpen(false)}
                className={`p-1.5 rounded transition-colors cursor-pointer ${
                  isDark ? 'text-stone-400 hover:text-white hover:bg-stone-800' : 'text-stone-500 hover:text-stone-950 hover:bg-stone-100'
                }`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className={`space-y-3 text-xs leading-relaxed ${
              isDark ? 'text-stone-300' : 'text-stone-700'
            }`}>
              <p>{details.about_full}</p>
              <div className={`pt-2 border-t text-[11px] space-y-1 ${
                isDark ? 'border-stone-800 text-stone-400' : 'border-stone-200 text-stone-600'
              }`}>
                <div>Industry: <strong className={isDark ? 'text-stone-200' : 'text-stone-900'}>{organisation.industry}</strong></div>
                <div>Headquarters: <strong className={isDark ? 'text-stone-200' : 'text-stone-900'}>{organisation.headquarters}</strong></div>
                <div>Official Registration: <strong className={isDark ? 'text-stone-200' : 'text-stone-900'}>{organisation.reg_number}</strong></div>
              </div>
            </div>

            <div className="pt-3 flex justify-end">
              <button
                onClick={() => setIsReadMoreOpen(false)}
                className={`px-4 py-2 text-xs font-semibold rounded-lg cursor-pointer transition-colors ${
                  isDark 
                    ? 'bg-stone-800 hover:bg-stone-700 text-white' 
                    : 'bg-stone-900 hover:bg-black text-white'
                }`}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: "View Certificate" Official Verification Certificate */}
      {isCertificateModalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setIsCertificateModalOpen(false)}
        >
          <div 
            className="rounded-2xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl bg-white border-2 border-[#C5A059] text-stone-900 relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Certificate Decorative Border */}
            <div className="absolute inset-1.5 border border-[#C5A059]/40 rounded-xl pointer-events-none" />

            <div className="flex items-start justify-between relative z-10 border-b border-stone-200 pb-4">
              <div className="space-y-1">
                <span className="text-[10px] font-mono-code uppercase font-bold tracking-widest text-[#8C6D38]">
                  ETES INSTITUTIONAL STANDARDS COMMISSION
                </span>
                <h3 className="font-institutional text-xl font-bold text-stone-950">
                  Official Trust Certificate
                </h3>
              </div>
              <button 
                onClick={() => setIsCertificateModalOpen(false)}
                className="p-1 rounded text-stone-400 hover:text-stone-900 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-center py-2 relative z-10">
              <div className="w-14 h-14 mx-auto rounded-full bg-gradient-to-br from-[#8C6D38] via-[#B89047] to-[#5C421B] p-[2px] shadow-sm flex items-center justify-center">
                <div className="w-full h-full rounded-full bg-[#1C150A] flex items-center justify-center">
                  <Award className="w-7 h-7 text-[#DFB76C]" />
                </div>
              </div>

              <div>
                <p className="text-xs text-stone-500 uppercase tracking-wider">This certifies that</p>
                <h4 className="font-institutional text-2xl font-bold text-stone-950 mt-1">
                  {organisation.legal_name}
                </h4>
                <p className="text-xs text-stone-600 mt-1">
                  Has fulfilled all required workplace integrity audits under the ETES Charter.
                </p>
              </div>

              <div className="inline-block px-4 py-1.5 rounded-full bg-[#0A4736] text-white text-xs font-semibold shadow-xs">
                {organisation.status}
              </div>

              <div className="grid grid-cols-2 gap-3 pt-3 text-xs text-left bg-stone-50 p-4 rounded-lg border border-stone-200">
                <div>
                  <span className="text-stone-400 block text-[10px]">Certificate Registry Ref</span>
                  <span className="font-mono-code font-bold text-[#8C6D38]">
                    {organisation.certification_number || 'ETES-CERT-ZA-2026-001'}
                  </span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px]">Audit Status Window</span>
                  <span className="font-semibold text-stone-800">
                    {details.valid_until}
                  </span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px]">Verified Workforce</span>
                  <span className="font-mono-code text-stone-800">
                    {organisation.employee_count.toLocaleString()} personnel
                  </span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px]">Trust Index</span>
                  <span className="font-bold text-[#0A4736]">
                    {trustScore}% Certified Score
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-stone-200 relative z-10">
              <span className="text-[10px] font-mono-code text-stone-400">
                HASH: SHA256-ETES-{organisation.id}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsCertificateModalOpen(false)}
                  className="px-3.5 py-1.5 text-xs text-stone-600 hover:text-stone-900 cursor-pointer"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    alert(`Certificate ${organisation.certification_number || 'ETES-CERT-001'} downloaded as verified PDF.`);
                  }}
                  className="px-4 py-1.5 rounded-lg bg-[#0A4736] hover:bg-[#0E5A44] text-white text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Verified PDF</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* 3. Dedicated Trust Scoring & Evaluation Modal */}
      {isScoringModalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setIsScoringModalOpen(false)}
        >
          <div 
            className={`w-full max-w-2xl rounded-xl border p-6 sm:p-7 shadow-2xl relative transition-all my-8 ${
              isDark 
                ? 'bg-[#0E1523] border-stone-700 text-stone-100' 
                : 'bg-white border-[#E2DDD5] text-stone-900'
            }`}
            onClick={(e) => e.stopPropagation()}
            id="trust-scoring-modal"
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b pb-4 border-stone-200 dark:border-stone-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#8C6D38] via-[#DFB76C] to-[#5C421B] p-[2px] shadow-sm flex items-center justify-center shrink-0">
                  <div className="w-full h-full rounded-full bg-[#1C150A] flex items-center justify-center">
                    <Award className="w-5 h-5 text-[#DFB76C]" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#C5A059]/20 text-[#DFB76C] border border-[#C5A059]/30">
                      Scoring Protocol
                    </span>
                    <span className="text-xs text-stone-400 font-mono-code hidden sm:inline">
                      {organisation.industry}
                    </span>
                  </div>
                  <h3 className="font-institutional text-xl font-bold tracking-tight mt-0.5">
                    Trust Score Evaluation: {organisation.legal_name}
                  </h3>
                </div>
              </div>

              <button
                onClick={() => setIsScoringModalOpen(false)}
                className="p-1.5 rounded-lg text-stone-400 hover:text-stone-100 hover:bg-stone-800 transition-colors cursor-pointer"
                aria-label="Close Scoring Modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {scoreSubmitted ? (
              /* Success Submission State */
              <div className="py-8 space-y-6 text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-emerald-950/40 border border-emerald-500/40 flex items-center justify-center">
                  <CheckCircle2 className="w-9 h-9 text-emerald-400" />
                </div>
                <div className="space-y-2">
                  <h4 className="font-institutional text-2xl font-bold">
                    Trust Score Recorded
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-400 max-w-md mx-auto">
                    Your confidential score of <strong className="text-white font-bold">{evaluatedScoreAverage}%</strong> for {organisation.legal_name} has been cryptographically recorded into the ETES Trust Index.
                  </p>
                </div>

                <div className={`max-w-md mx-auto p-4 rounded-lg border text-left text-xs space-y-2 font-mono-code ${
                  isDark ? 'bg-[#070B13] border-stone-800' : 'bg-stone-50 border-stone-200'
                }`}>
                  <div className="flex justify-between">
                    <span className="text-stone-400">ORGANISATION:</span>
                    <span className="text-white font-bold">{organisation.legal_name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-400">EVALUATED SCORE:</span>
                    <span className="text-emerald-400 font-bold">{evaluatedScoreAverage}% Composite</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-400">AUDIT VERIFICATION:</span>
                    <span className="text-[#DFB76C]">ETES-SCORE-{Math.abs(organisation.id.split('').reduce((a,b)=>(((a<<5)-a)+b.charCodeAt(0))|0,0)).toString(16).toUpperCase()}-ZA</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-400">ENCRYPTION:</span>
                    <span className="text-stone-300">Zero-Knowledge Anonymised</span>
                  </div>
                </div>

                <div className="flex justify-center gap-3 pt-2">
                  <button
                    onClick={() => {
                      setScoreSubmitted(false);
                    }}
                    className={`px-4 py-2 text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${
                      isDark ? 'border-stone-700 hover:bg-stone-800 text-stone-300' : 'border-stone-300 hover:bg-stone-100 text-stone-700'
                    }`}
                  >
                    Adjust Scores
                  </button>
                  <button
                    onClick={() => setIsScoringModalOpen(false)}
                    className="px-5 py-2 text-xs font-bold uppercase tracking-wider rounded-lg bg-[#C5A059] text-black hover:bg-[#DFB76C] transition-colors cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              /* Active Scoring Interface */
              <div className="py-4 space-y-5">
                
                {/* Score Summary Banner */}
                <div className={`p-4 rounded-xl border flex items-center justify-between gap-4 flex-wrap ${
                  isDark ? 'bg-[#070B13] border-stone-800' : 'bg-stone-50 border-stone-200'
                }`}>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400 block">
                      Certified Audit Score
                    </span>
                    <div className="text-2xl font-bold font-institutional text-[#0A4736] dark:text-emerald-400">
                      {trustScore}%
                    </div>
                  </div>

                  <div className="h-10 w-px bg-stone-300 dark:bg-stone-800 hidden sm:block" />

                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-stone-400 block">
                      Your Evaluated Score
                    </span>
                    <div className="text-2xl font-bold font-institutional text-[#C5A059]">
                      {evaluatedScoreAverage}%
                    </div>
                  </div>

                  <div className="flex items-center gap-2 ml-auto">
                    <button
                      onClick={() => {
                        setEvalScores({
                          leadership: details.dimensions?.leadership || 78,
                          communication: details.dimensions?.communication || 72,
                          fairness: details.dimensions?.fairness || 76,
                          accountability: details.dimensions?.accountability || 78,
                          employee_voice: details.dimensions?.employee_voice || 79
                        });
                      }}
                      className="inline-flex items-center gap-1 text-[11px] px-2.5 py-1 rounded border border-stone-300 dark:border-stone-700 text-stone-400 hover:text-white transition-colors cursor-pointer"
                      title="Reset to audited baseline"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Reset</span>
                    </button>
                  </div>
                </div>

                {/* 5 Core Dimension Sliders */}
                <div className="space-y-4 text-xs">
                  <div className="flex items-center justify-between text-stone-400 text-[11px]">
                    <span>Score each dimension from 20% (Low) to 100% (Exceptional):</span>
                    <span className="font-semibold text-[#DFB76C]">5 Key Indicators</span>
                  </div>

                  {/* 1. Leadership */}
                  <div className={`p-3 rounded-lg border ${isDark ? 'bg-stone-900/50 border-stone-800' : 'bg-white border-stone-200'}`}>
                    <div className="flex justify-between items-center mb-1.5">
                      <div>
                        <span className="font-bold block text-sm">Leadership</span>
                        <span className="text-[11px] text-stone-400">Executive integrity, vision clarity, and commitment to workforce.</span>
                      </div>
                      <span className="font-mono-code font-bold text-sm text-[#0A4736] dark:text-emerald-400">
                        {evalScores.leadership}%
                      </span>
                    </div>
                    <input 
                      type="range"
                      min="20"
                      max="100"
                      step="1"
                      value={evalScores.leadership}
                      onChange={(e) => setEvalScores(prev => ({ ...prev, leadership: Number(e.target.value) }))}
                      className="w-full accent-[#0A4736] cursor-pointer"
                    />
                  </div>

                  {/* 2. Communication */}
                  <div className={`p-3 rounded-lg border ${isDark ? 'bg-stone-900/50 border-stone-800' : 'bg-white border-stone-200'}`}>
                    <div className="flex justify-between items-center mb-1.5">
                      <div>
                        <span className="font-bold block text-sm">Communication</span>
                        <span className="text-[11px] text-stone-400">Transparent reporting, timely announcements, open dialogue.</span>
                      </div>
                      <span className="font-mono-code font-bold text-sm text-[#0A4736] dark:text-emerald-400">
                        {evalScores.communication}%
                      </span>
                    </div>
                    <input 
                      type="range"
                      min="20"
                      max="100"
                      step="1"
                      value={evalScores.communication}
                      onChange={(e) => setEvalScores(prev => ({ ...prev, communication: Number(e.target.value) }))}
                      className="w-full accent-[#0A4736] cursor-pointer"
                    />
                  </div>

                  {/* 3. Fairness */}
                  <div className={`p-3 rounded-lg border ${isDark ? 'bg-stone-900/50 border-stone-800' : 'bg-white border-stone-200'}`}>
                    <div className="flex justify-between items-center mb-1.5">
                      <div>
                        <span className="font-bold block text-sm">Fairness</span>
                        <span className="text-[11px] text-stone-400">Equitable remuneration, merit advancement, non-discrimination.</span>
                      </div>
                      <span className="font-mono-code font-bold text-sm text-[#0A4736] dark:text-emerald-400">
                        {evalScores.fairness}%
                      </span>
                    </div>
                    <input 
                      type="range"
                      min="20"
                      max="100"
                      step="1"
                      value={evalScores.fairness}
                      onChange={(e) => setEvalScores(prev => ({ ...prev, fairness: Number(e.target.value) }))}
                      className="w-full accent-[#0A4736] cursor-pointer"
                    />
                  </div>

                  {/* 4. Accountability */}
                  <div className={`p-3 rounded-lg border ${isDark ? 'bg-stone-900/50 border-stone-800' : 'bg-white border-stone-200'}`}>
                    <div className="flex justify-between items-center mb-1.5">
                      <div>
                        <span className="font-bold block text-sm">Accountability</span>
                        <span className="text-[11px] text-stone-400">Upholding charter commitments, compliance, ethical governance.</span>
                      </div>
                      <span className="font-mono-code font-bold text-sm text-[#0A4736] dark:text-emerald-400">
                        {evalScores.accountability}%
                      </span>
                    </div>
                    <input 
                      type="range"
                      min="20"
                      max="100"
                      step="1"
                      value={evalScores.accountability}
                      onChange={(e) => setEvalScores(prev => ({ ...prev, accountability: Number(e.target.value) }))}
                      className="w-full accent-[#0A4736] cursor-pointer"
                    />
                  </div>

                  {/* 5. Employee Voice */}
                  <div className={`p-3 rounded-lg border ${isDark ? 'bg-stone-900/50 border-stone-800' : 'bg-white border-stone-200'}`}>
                    <div className="flex justify-between items-center mb-1.5">
                      <div>
                        <span className="font-bold block text-sm">Employee Voice</span>
                        <span className="text-[11px] text-stone-400">Psychological safety, anonymous escalation, listening responsiveness.</span>
                      </div>
                      <span className="font-mono-code font-bold text-sm text-[#0A4736] dark:text-emerald-400">
                        {evalScores.employee_voice}%
                      </span>
                    </div>
                    <input 
                      type="range"
                      min="20"
                      max="100"
                      step="1"
                      value={evalScores.employee_voice}
                      onChange={(e) => setEvalScores(prev => ({ ...prev, employee_voice: Number(e.target.value) }))}
                      className="w-full accent-[#0A4736] cursor-pointer"
                    />
                  </div>
                </div>

                {/* Confidentiality Notice */}
                <div className="flex items-center gap-2 p-3 rounded-lg bg-[#C5A059]/10 border border-[#C5A059]/20 text-[11px] text-stone-300">
                  <Lock className="w-4 h-4 text-[#DFB76C] shrink-0" />
                  <span>
                    Scores submitted under the ETES Charter are protected by zero-knowledge encryption and aggregated confidentially.
                  </span>
                </div>

                {/* Modal Footer Actions */}
                <div className="pt-2 flex items-center justify-between border-t border-stone-200 dark:border-stone-800">
                  <button
                    onClick={() => setIsScoringModalOpen(false)}
                    className="px-4 py-2 text-xs font-semibold text-stone-400 hover:text-white transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={() => {
                      setScoreSubmitted(true);
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-[#C5A059] hover:bg-[#DFB76C] text-black text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-sm"
                  >
                    <Award className="w-4 h-4" />
                    <span>Submit Verified Score</span>
                  </button>
                </div>

              </div>
            )}

          </div>
        </div>
      )}

      {/* 4. Login Modal presented when unauthenticated user clicks TAKE ASSESSMENT */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        defaultRole="employee"
        redirectTab="emp-assessment"
        contextTitle={`Workforce authentication required to take confidential assessment for ${organisation.legal_name}`}
        onLogin={(role, scope, targetTab) => {
          const navFn = onNavigateToRole || onSelectRole;
          if (navFn) {
            navFn(role || 'employee', scope, targetTab || 'emp-assessment');
          }
          setIsLoginModalOpen(false);
        }}
      />

    </div>
  );
};
