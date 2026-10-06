import React, { useState } from 'react';
import { Person } from '../../types';
import { EtesLogo } from '../common/EtesLogo';
import thriveHeroImg from '../../images/thrive-community-room.jpg';
import { useTheme } from '../../context/ThemeContext';
import { ThemeToggle } from '../common/ThemeToggle';
import {
  LayoutDashboard,
  BarChart2,
  User,
  Briefcase,
  FolderOpen,
  GraduationCap,
  Users,
  Calendar,
  LogOut,
  Sparkles,
  Search,
  Filter,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  ExternalLink,
  Download,
  Eye,
  ShieldCheck,
  Building2,
  Clock,
  MapPin,
  Tag,
  Share2,
  Send,
  MessageSquare,
  Award,
  TrendingUp,
  FileText,
  Lock,
  Menu,
  X,
  Plus,
  Compass,
  DollarSign,
  HeartHandshake,
  Check,
  AlertCircle
} from 'lucide-react';

interface ThriveCommunityRoomProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currentPersona: Person;
  onLogOut?: () => void;
}

interface OpportunityItem {
  id: string;
  title: string;
  organisation: string;
  orgVerification: 'ETES Certified' | 'Enterprise Partner' | 'Public Trust Verified';
  type: 'Enterprise Tender' | 'Freelance Contract' | 'Strategic Partnership' | 'SME Grant';
  audience: 'Entrepreneurs' | 'SMEs' | 'Freelancers' | 'All';
  budget: string;
  deadline: string;
  location: string;
  description: string;
  requirements: string[];
}

interface ResourceItem {
  id: string;
  title: string;
  category: 'Legal' | 'Finance' | 'Growth' | 'Governance' | 'Compliance';
  format: string;
  size: string;
  description: string;
  downloads: number;
}

interface MasterclassItem {
  id: string;
  title: string;
  instructor: string;
  role: string;
  duration: string;
  modules: number;
  level: 'Foundational' | 'Intermediate' | 'Advanced';
  tags: string[];
  description: string;
  completed?: boolean;
}

interface CommunityMember {
  id: string;
  name: string;
  role: string;
  company: string;
  track: 'Entrepreneurs' | 'SMEs' | 'Freelancers';
  badge: string;
  trustScore: number;
  location: string;
  skills: string[];
}

interface CommunityEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  type: 'Virtual Masterclass' | 'Networking Mixer' | 'Procurement Matchmaking' | 'Founder Roundtable';
  format: 'Online • Zoom' | 'Sandton, Johannesburg' | 'Cape Town Tech Hub' | 'Hybrid';
  attendeesCount: number;
  description: string;
  speaker: string;
}

export const ThriveCommunityRoom: React.FC<ThriveCommunityRoomProps> = ({
  activeTab,
  setActiveTab,
  currentPersona,
  onLogOut
}) => {
  const { isDark } = useTheme();

  // Internal State
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState<'All' | 'Entrepreneurs' | 'SMEs' | 'Freelancers' | 'Community'>('All');
  const [opportunitySearch, setOpportunitySearch] = useState('');
  const [opportunityFilter, setOpportunityFilter] = useState<string>('All');
  const [selectedOpportunity, setSelectedOpportunity] = useState<OpportunityItem | null>(null);
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [applySubmitted, setApplySubmitted] = useState(false);
  const [selectedResource, setSelectedResource] = useState<ResourceItem | null>(null);
  const [rsvpedEvents, setRsvpedEvents] = useState<{ [id: string]: boolean }>({ 'ev-1': true });
  const [newDiscussionModalOpen, setNewDiscussionModalOpen] = useState(false);
  const [discussionTopic, setDiscussionTopic] = useState('');
  const [discussionCategory, setDiscussionCategory] = useState('Procurement');
  const [discussionsList, setDiscussionsList] = useState([
    {
      id: 'disc-1',
      author: 'Lerato Khumalo',
      company: 'Nexus Design Works',
      avatar: 'LK',
      title: 'Best practices for negotiating milestone payments with enterprise clients?',
      replies: 14,
      time: '2 hours ago',
      category: 'Finance & Contracts',
      likes: 23
    },
    {
      id: 'disc-2',
      author: 'Kagiso Mokoena',
      company: 'Apex Supply Chain Advisory',
      avatar: 'KM',
      title: 'Preparing your SME for ETES Certified Supplier Onboarding (Step-by-step checklist)',
      replies: 28,
      time: '5 hours ago',
      category: 'Procurement',
      likes: 47
    },
    {
      id: 'disc-3',
      author: 'Nadia Peters',
      company: 'Independent Brand Strategist',
      avatar: 'NP',
      title: 'Looking for a certified UI/UX developer to co-bid on a R450k logistics portal contract',
      replies: 9,
      time: '1 day ago',
      category: 'Partnerships',
      likes: 19
    }
  ]);

  // Sidebar Items matching reference image
  const sidebarItems = [
    { id: 'comm-dashboard', label: 'Overview', icon: BarChart2 },
    { id: 'comm-opportunities', label: 'Opportunities', icon: Briefcase },
    { id: 'comm-resources', label: 'Resources', icon: FolderOpen },
    { id: 'comm-learning', label: 'Learning', icon: GraduationCap },
    { id: 'comm-community', label: 'Community', icon: Users },
    { id: 'comm-events', label: 'Events', icon: Calendar }
  ];

  // Map active tab or fallback to dashboard
  const validTabs = ['comm-profile', ...sidebarItems.map(item => item.id)];
  const effectiveActiveTab = validTabs.includes(activeTab) ? activeTab : 'comm-dashboard';
  const currentTabLabel = activeTab === 'comm-profile' ? 'My Profile' : (sidebarItems.find(i => i.id === effectiveActiveTab)?.label || 'Overview');

  // Sample Datasets
  const opportunities: OpportunityItem[] = [
    {
      id: 'opp-1',
      title: 'Digital Warehouse Logistics Management System Upgrade',
      organisation: 'Vanguard Logistics Group (Pty) Ltd',
      orgVerification: 'ETES Certified',
      type: 'Enterprise Tender',
      audience: 'SMEs',
      budget: 'R 650,000 – R 900,000',
      deadline: '28 Sep 2026',
      location: 'Johannesburg (Hybrid)',
      description: 'Seeking an ETES-verified SME software consultancy to modernize our freight yard dispatch telematics interface and integrate real-time API sync.',
      requirements: ['Valid CIPC Registration & B-BBEE Affidavit', 'Proven React / Node / PostgreSQL enterprise experience', 'ETES Trust Verification Score ≥ 80']
    },
    {
      id: 'opp-2',
      title: 'Brand Identity & Visual Communications Lead Retainer',
      organisation: 'Aegis Capital Infrastructure Fund',
      orgVerification: 'Enterprise Partner',
      type: 'Freelance Contract',
      audience: 'Freelancers',
      budget: 'R 45,000 / month (6-Month Retainer)',
      deadline: '05 Oct 2026',
      location: 'Remote (South Africa)',
      description: 'Senior freelance brand and digital designer required to overhaul corporate marketing artifacts, ESG impact reports, and LP investor presentations.',
      requirements: ['Senior portfolio with corporate or fintech brand systems', 'Available for 25 hours / week', 'Verified Community Profile']
    },
    {
      id: 'opp-3',
      title: 'Co-Bid Consortium: Renewable Microgrid Installation RFP',
      organisation: 'SunPower Africa Consortium',
      orgVerification: 'Public Trust Verified',
      type: 'Strategic Partnership',
      audience: 'Entrepreneurs',
      budget: 'R 2.8M Consortium Allocation',
      deadline: '15 Oct 2026',
      location: 'KwaZulu-Natal / Eastern Cape',
      description: 'Partnering with certified local engineering and compliance SMEs to respond to a major municipal clean power infrastructure RFP.',
      requirements: ['Electrical or civil engineering credentials', 'Local presence in KZN or EC', 'Clean safety & compliance record']
    },
    {
      id: 'opp-4',
      title: 'Green Tech Innovation & Workplace Health Grant 2026',
      organisation: 'ETES Empowerment Solutions Trust',
      orgVerification: 'ETES Certified',
      type: 'SME Grant',
      audience: 'Entrepreneurs',
      budget: 'R 250,000 (Non-Dilutive Equity-Free)',
      deadline: '30 Oct 2026',
      location: 'National (South Africa)',
      description: 'Catalytic grant funding awarded to early-stage South African entrepreneurs building high-trust, employee-first workplace solutions and sustainable technologies.',
      requirements: ['100% South African majority-owned', 'Operational minimum 12 months', 'Demonstrable commitment to fair work principles']
    }
  ];

  const resources: ResourceItem[] = [
    {
      id: 'res-1',
      title: 'ETES Standard Master Services Agreement (MSA) — SME Edition',
      category: 'Legal',
      format: 'DOCX / PDF',
      size: '1.4 MB',
      description: 'Commercial contract template with fair payment terms, 14-day invoice dispute resolution clauses, and balanced IP ownership.',
      downloads: 412
    },
    {
      id: 'res-2',
      title: 'POPIA Compliance Toolkit & Operator Agreement for Service Providers',
      category: 'Compliance',
      format: 'ZIP / Templates',
      size: '3.8 MB',
      description: 'Complete data protection pack including Section 21 Operator contract, information officer checklist, and breach notification draft.',
      downloads: 685
    },
    {
      id: 'res-3',
      title: 'Institutional Pitch Deck & 3-Year Financial Model Template',
      category: 'Finance',
      format: 'PPTX / XLSX',
      size: '4.2 MB',
      description: 'Standardized investor pitch deck aligned with Aegis Capital and Southern African venture standards, with automated cash-flow formulas.',
      downloads: 890
    },
    {
      id: 'res-4',
      title: 'SME Workplace Trust & Psychological Safety Implementation Guide',
      category: 'Governance',
      format: 'PDF • 24 Pages',
      size: '2.1 MB',
      description: 'How early-stage founders can establish clear trust signals, transparent promotion rubrics, and fair grievance channels.',
      downloads: 520
    }
  ];

  const masterclasses: MasterclassItem[] = [
    {
      id: 'mc-1',
      title: 'Unlocking Corporate Supply Chains: The ETES Verified Supplier Blueprint',
      instructor: 'Dr. Arthur Mthembu',
      role: 'Group CEO, Vanguard Logistics & ETES Fellow',
      duration: '2h 45m',
      modules: 5,
      level: 'Advanced',
      tags: ['Procurement', 'Enterprise Sales', 'B2B'],
      description: 'Insider guidance on how corporate procurement committees evaluate SME vendors beyond tender price, focusing on governance, reliability, and trust validation.',
      completed: false
    },
    {
      id: 'mc-2',
      title: 'Contractual Defense & Retainer Structuring for Freelancers & Agencies',
      instructor: 'Adv. Candice Dlamini',
      role: 'Senior Commercial Arbitrator & Legal Counsel',
      duration: '1h 50m',
      modules: 4,
      level: 'Intermediate',
      tags: ['Legal', 'Cash Flow', 'Contracts'],
      description: 'Practical steps to eliminate late payments, protect intellectual property, and negotiate sustainable monthly retainers with corporate clients.',
      completed: true
    },
    {
      id: 'mc-3',
      title: 'Building a High-Trust Culture in a Small Growing Business',
      instructor: 'Tariq Al-Mansoor',
      role: 'Registrar & Chief Governance Officer',
      duration: '2h 10m',
      modules: 4,
      level: 'Foundational',
      tags: ['Culture', 'Leadership', 'Retention'],
      description: 'Practical tactics for founders managing 5 to 50 employees to maintain transparent communication, prevent burnout, and reduce employee turnover.',
      completed: false
    }
  ];

  const communityMembers: CommunityMember[] = [
    {
      id: 'mem-1',
      name: 'Lerato Khumalo',
      role: 'Founder & Managing Director',
      company: 'Nexus Design Works (Pty) Ltd',
      track: 'SMEs',
      badge: 'Verified SME • Grade A',
      trustScore: 96,
      location: 'Johannesburg, Gauteng',
      skills: ['UI/UX Design', 'Digital Systems', 'Agile Operations']
    },
    {
      id: 'mem-2',
      name: 'Simphiwe Cele',
      role: 'Lead Cloud Architect',
      company: 'Cele Cloud Engineering',
      track: 'Freelancers',
      badge: 'Certified Specialist',
      trustScore: 98,
      location: 'Durban, KZN (Remote)',
      skills: ['AWS / GCP', 'Kubernetes', 'DevOps & Security']
    },
    {
      id: 'mem-3',
      name: 'Amara Van Der Merwe',
      role: 'Co-Founder & CEO',
      company: 'Kusasa Agri-Tech Solutions',
      track: 'Entrepreneurs',
      badge: 'Incubated Venture',
      trustScore: 92,
      location: 'Stellenbosch, Western Cape',
      skills: ['IoT Hardware', 'Agronomy', 'Seed Fundraising']
    },
    {
      id: 'mem-4',
      name: 'Mandla Sithole',
      role: 'Principal Consultant',
      company: 'Sithole Supply Chain Advisory',
      track: 'SMEs',
      badge: 'Verified Supplier',
      trustScore: 95,
      location: 'Pretoria, Gauteng',
      skills: ['Logistics Audits', 'B-BBEE Transformation', 'Procurement']
    }
  ];

  const events: CommunityEvent[] = [
    {
      id: 'ev-1',
      title: 'ETES Monthly Pan-African Thrive Mixer & Networking Circle',
      date: 'Thursday, 24 September 2026',
      time: '18:00 – 20:30 SAST',
      type: 'Networking Mixer',
      format: 'Sandton, Johannesburg',
      attendeesCount: 142,
      description: 'Connect with fellow South African entrepreneurs, certified corporate procurement heads, and vetted freelancers over drinks and curated lightning introductions.',
      speaker: 'Host: Thabo Ndlovu & Guest Enterprise Executives'
    },
    {
      id: 'ev-2',
      title: 'Enterprise Buyer Pitch & Matchmaking Session: Logistics & Tech',
      date: 'Tuesday, 06 October 2026',
      time: '10:00 – 12:30 SAST',
      type: 'Procurement Matchmaking',
      format: 'Online • Zoom',
      attendeesCount: 88,
      description: 'Pre-qualified SMEs pitch directly to procurement panels from Vanguard Logistics, Aegis Capital, and Apex Healthcare seeking localized vendors.',
      speaker: 'Panel: 4 Chief Procurement Officers'
    },
    {
      id: 'ev-3',
      title: 'Founder Roundtable: Navigating Working Capital & Cash Flow Crunches',
      date: 'Wednesday, 14 October 2026',
      time: '15:00 – 16:30 SAST',
      type: 'Founder Roundtable',
      format: 'Online • Zoom',
      attendeesCount: 65,
      description: 'Candid peer conversation on managing inventory cycles, negotiating supplier credit lines, and invoice factoring without predatory interest rates.',
      speaker: 'Facilitator: Marcus Vance (Aegis Capital)'
    }
  ];

  const filteredOpportunities = opportunities.filter(opp => {
    const matchesSearch = 
      opp.title.toLowerCase().includes(opportunitySearch.toLowerCase()) ||
      opp.organisation.toLowerCase().includes(opportunitySearch.toLowerCase()) ||
      opp.description.toLowerCase().includes(opportunitySearch.toLowerCase());
    const matchesFilter = opportunityFilter === 'All' || opp.type === opportunityFilter;
    const matchesTrack = selectedTrack === 'All' || opp.audience === selectedTrack || opp.audience === 'All';
    return matchesSearch && matchesFilter && matchesTrack;
  });

  const handleApply = (opp: OpportunityItem) => {
    setSelectedOpportunity(opp);
    setApplySubmitted(false);
    setApplyModalOpen(true);
  };

  const handleToggleRSVP = (eventId: string) => {
    setRsvpedEvents(prev => ({
      ...prev,
      [eventId]: !prev[eventId]
    }));
  };

  const handlePostDiscussion = () => {
    if (!discussionTopic.trim()) return;
    const newEntry = {
      id: `disc-${Date.now()}`,
      author: currentPersona.full_name || 'Lerato Khumalo',
      company: 'Nexus Innovations',
      avatar: 'TK',
      title: discussionTopic,
      replies: 0,
      time: 'Just now',
      category: discussionCategory,
      likes: 1
    };
    setDiscussionsList([newEntry, ...discussionsList]);
    setDiscussionTopic('');
    setNewDiscussionModalOpen(false);
  };

  return (
    <div
      className={`h-full flex-1 flex flex-col lg:flex-row overflow-hidden rounded-xl border shadow-sm transition-colors duration-200 ${
        isDark ? 'border-stone-800 bg-[#070B13]' : 'border-[#E2DDD5] bg-[#FAF7F2]'
      }`}
      id="thrive-community-room-root"
    >
      {/* Mobile & Tablet Top Header Bar */}
      <div
        className={`lg:hidden flex items-center justify-between px-3.5 py-2.5 border-b shrink-0 transition-colors ${
          isDark ? 'border-stone-800 bg-[#070B13]' : 'border-[#E2DDD5] bg-white'
        }`}
      >
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setActiveTab('comm-dashboard')}
        >
          <EtesLogo
            size="xs"
            variant={isDark ? 'light' : 'dark'}
            showSubtitle={false}
            roomLabel="THRIVE COMMUNITY"
          />
          <span
            className={`text-[10px] px-2 py-0.5 rounded font-mono-code font-semibold uppercase ${
              isDark
                ? 'bg-[#C5A059]/15 text-[#DFB76C] border border-[#C5A059]/30'
                : 'bg-[#8C6B28]/10 text-[#8C6B28] border border-[#8C6B28]/30'
            }`}
          >
            {currentTabLabel}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            className={`p-2 rounded-lg border transition-colors cursor-pointer ${
              isDark
                ? 'border-stone-700 bg-stone-800/80 text-white hover:bg-stone-700'
                : 'border-[#E2DDD5] bg-stone-100 text-stone-800 hover:bg-stone-200'
            }`}
            aria-label="Toggle Navigation Menu"
          >
            {mobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation Backdrop */}
      {mobileNavOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-xs transition-opacity"
          onClick={() => setMobileNavOpen(false)}
        >
          <div
            className={`w-64 max-w-[85vw] h-full p-4 flex flex-col justify-between shadow-2xl transition-colors ${
              isDark ? 'bg-[#0B111E] text-stone-200 border-r border-[#1E293B]' : 'bg-[#FAF7F2] text-stone-800 border-r border-[#E2DDD5]'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex-1 flex flex-col min-h-0">
              {/* Drawer Brand Header */}
              <div 
                className={`flex items-start justify-between px-2 py-3 mb-4 border-b cursor-pointer ${
                  isDark ? 'border-[#1E293B]' : 'border-[#E2DDD5]'
                }`}
                onClick={() => {
                  setActiveTab('comm-dashboard');
                  setMobileNavOpen(false);
                }}
              >
                <div className="flex-1 min-w-0 pr-2">
                  <EtesLogo
                    size="sm"
                    variant={isDark ? 'light' : 'dark'}
                    showSubtitle={false}
                    roomLabel="THRIVE COMMUNITY ROOM"
                  />
                </div>
                <button
                  onClick={() => setMobileNavOpen(false)}
                  className="p-1.5 rounded-md hover:bg-stone-700/30 text-stone-400 hover:text-white cursor-pointer shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Navigation Items */}
              <nav className="space-y-1 flex-1 overflow-y-auto pr-1" id="thrive-drawer-nav">
                {sidebarItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = effectiveActiveTab === item.id;
                  return (
                    <button
                      key={item.id}
                      id={`comm-drawer-nav-${item.id}`}
                      onClick={() => {
                        setActiveTab(item.id);
                        setMobileNavOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all text-left cursor-pointer ${
                        isActive
                          ? isDark
                            ? 'bg-[#162032] text-[#DFB76C] font-semibold border border-[#C5A059]/40 shadow-sm'
                            : 'bg-white text-[#0B111E] font-bold border border-[#C5A059]/50 shadow-sm'
                          : isDark
                            ? 'text-stone-400 hover:text-white hover:bg-[#131B2A]'
                            : 'text-stone-600 hover:text-stone-900 hover:bg-[#F2ECE3]'
                      }`}
                    >
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#C5A059]' : 'text-stone-400'}`} />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Bottom Drawer Controls */}
            <div className={`pt-4 mt-5 border-t space-y-1.5 ${isDark ? 'border-[#1E293B]' : 'border-[#E2DDD5]'}`}>
              <ThemeToggle variant="sidebar" />

              <button
                onClick={() => {
                  setActiveTab('comm-profile');
                  setMobileNavOpen(false);
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
                  if (onLogOut) onLogOut();
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

      {/* Desktop Left Sidebar (Exact identical styling to CEO & Director's Intelligence reference sidebar) */}
      <aside
        className={`w-64 border-r shrink-0 hidden lg:flex flex-col justify-between p-4 transition-colors ${
          isDark ? 'bg-[#0B111E] border-[#1E293B]' : 'bg-[#FAF7F2] border-[#E2DDD5]'
        }`}
        id="thrive-desktop-sidebar"
      >
        <div className="flex-1 flex flex-col min-h-0">
          {/* Logo Header matching image: Gold emblem, ETES wordmark and gold uppercase room label */}
          <div 
            className={`px-2 py-3 mb-4 border-b cursor-pointer ${
              isDark ? 'border-[#1E293B]' : 'border-[#E2DDD5]'
            }`}
            onClick={() => setActiveTab('comm-dashboard')}
          >
            <EtesLogo 
              size="sm" 
              variant={isDark ? 'light' : 'dark'} 
              showSubtitle={false} 
              roomLabel="THRIVE COMMUNITY ROOM" 
            />
          </div>

          {/* Navigation Items (Identical text-xs, font-medium, rounded-lg, gold active and stone-400 inactive) */}
          <nav className="space-y-1 flex-1 overflow-y-auto pr-1" id="thrive-sidebar-nav" aria-label="Thrive Community Navigation">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = effectiveActiveTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`comm-nav-${item.id}`}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all text-left cursor-pointer group ${
                    isActive
                      ? isDark
                        ? 'bg-[#162032] text-[#DFB76C] font-semibold border border-[#C5A059]/40 shadow-sm'
                        : 'bg-white text-[#0B111E] font-bold border border-[#C5A059]/50 shadow-sm'
                      : isDark
                        ? 'text-stone-400 hover:text-white hover:bg-[#131B2A]'
                        : 'text-stone-600 hover:text-stone-900 hover:bg-[#F2ECE3]'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#C5A059]' : 'text-stone-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section matching image: Dark Mode Card with Switch, My Profile, Log Out */}
        <div className={`pt-4 mt-5 border-t space-y-1.5 ${isDark ? 'border-[#1E293B]' : 'border-[#E2DDD5]'}`}>
          <ThemeToggle variant="sidebar" />

          <button
            onClick={() => setActiveTab('comm-profile')}
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
            onClick={onLogOut}
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
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 overflow-y-auto" id="thrive-main-viewport">
        {/* TAB 1: DASHBOARD (Matching Mockup exactly) */}
        {effectiveActiveTab === 'comm-dashboard' && (
          <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto space-y-8">
            {/* Top Hero Banner Image */}
            <div className="relative w-full rounded-2xl overflow-hidden border border-[#C5A059]/30 shadow-lg group bg-[#111827]">
              <img
                src={thriveHeroImg}
                alt="ETES Thrive Community Room Banner"
                className="w-full h-48 sm:h-64 md:h-72 lg:h-80 object-cover object-center transition-transform duration-500 group-hover:scale-[1.01]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 pt-1">
              <div>
                <h1 className={`font-institutional text-2xl sm:text-3xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-[#0B111E]'}`}>
                  ETES Thrive Community Dashboard
                </h1>
                <p className={`text-xs sm:text-sm mt-1 ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                  Where entrepreneurs, SMEs, freelancers, and community professionals build and grow together.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border ${
                  isDark ? 'bg-[#C5A059]/15 text-[#DFB76C] border-[#C5A059]/30' : 'bg-[#8C6B28]/10 text-[#8C6B28] border-[#8C6B28]/30'
                }`}>
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verified Network™</span>
                </span>
              </div>
            </div>

            {/* 4 AUDIENCE FOCUS CARDS (Exact 4 pillars from attached screenshot with gold icons) */}
            <section className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* 1. Entrepreneurs */}
                <button
                  onClick={() => {
                    setSelectedTrack(selectedTrack === 'Entrepreneurs' ? 'All' : 'Entrepreneurs');
                    setActiveTab('comm-opportunities');
                  }}
                  className={`p-5 rounded-xl border text-center flex flex-col items-center justify-center transition-all cursor-pointer group ${
                    isDark
                      ? 'bg-[#0E1626] hover:bg-[#141F36] border-stone-800 hover:border-[#C5A059]'
                      : 'bg-white hover:bg-stone-50 border-[#E2DDD5] hover:border-[#C5A059] shadow-sm'
                  }`}
                >
                  <div className="w-12 h-12 rounded-full bg-[#C5A059]/10 border border-[#C5A059]/30 flex items-center justify-center text-[#C5A059] mb-3 group-hover:scale-110 transition-transform">
                    {/* Golden Entrepreneurs Icon */}
                    <Users className="w-6 h-6 text-[#C5A059]" />
                  </div>
                  <h3 className={`font-semibold text-sm sm:text-base ${isDark ? 'text-white' : 'text-stone-900'}`}>
                    Entrepreneurs
                  </h3>
                  <p className="text-xs text-stone-400 mt-1">
                    Grow your business
                  </p>
                </button>

                {/* 2. SMEs */}
                <button
                  onClick={() => {
                    setSelectedTrack(selectedTrack === 'SMEs' ? 'All' : 'SMEs');
                    setActiveTab('comm-opportunities');
                  }}
                  className={`p-5 rounded-xl border text-center flex flex-col items-center justify-center transition-all cursor-pointer group ${
                    isDark
                      ? 'bg-[#0E1626] hover:bg-[#141F36] border-stone-800 hover:border-[#C5A059]'
                      : 'bg-white hover:bg-stone-50 border-[#E2DDD5] hover:border-[#C5A059] shadow-sm'
                  }`}
                >
                  <div className="w-12 h-12 rounded-full bg-[#C5A059]/10 border border-[#C5A059]/30 flex items-center justify-center text-[#C5A059] mb-3 group-hover:scale-110 transition-transform">
                    {/* Golden SMEs Icon */}
                    <Building2 className="w-6 h-6 text-[#C5A059]" />
                  </div>
                  <h3 className={`font-semibold text-sm sm:text-base ${isDark ? 'text-white' : 'text-stone-900'}`}>
                    SMEs
                  </h3>
                  <p className="text-xs text-stone-400 mt-1">
                    Scale with support
                  </p>
                </button>

                {/* 3. Freelancers */}
                <button
                  onClick={() => {
                    setSelectedTrack(selectedTrack === 'Freelancers' ? 'All' : 'Freelancers');
                    setActiveTab('comm-opportunities');
                  }}
                  className={`p-5 rounded-xl border text-center flex flex-col items-center justify-center transition-all cursor-pointer group ${
                    isDark
                      ? 'bg-[#0E1626] hover:bg-[#141F36] border-stone-800 hover:border-[#C5A059]'
                      : 'bg-white hover:bg-stone-50 border-[#E2DDD5] hover:border-[#C5A059] shadow-sm'
                  }`}
                >
                  <div className="w-12 h-12 rounded-full bg-[#C5A059]/10 border border-[#C5A059]/30 flex items-center justify-center text-[#C5A059] mb-3 group-hover:scale-110 transition-transform">
                    {/* Golden Freelancers Icon */}
                    <Briefcase className="w-6 h-6 text-[#C5A059]" />
                  </div>
                  <h3 className={`font-semibold text-sm sm:text-base ${isDark ? 'text-white' : 'text-stone-900'}`}>
                    Freelancers
                  </h3>
                  <p className="text-xs text-stone-400 mt-1">
                    Find opportunities
                  </p>
                </button>

                {/* 4. Community */}
                <button
                  onClick={() => setActiveTab('comm-community')}
                  className={`p-5 rounded-xl border text-center flex flex-col items-center justify-center transition-all cursor-pointer group ${
                    isDark
                      ? 'bg-[#0E1626] hover:bg-[#141F36] border-stone-800 hover:border-[#C5A059]'
                      : 'bg-white hover:bg-stone-50 border-[#E2DDD5] hover:border-[#C5A059] shadow-sm'
                  }`}
                >
                  <div className="w-12 h-12 rounded-full bg-[#C5A059]/10 border border-[#C5A059]/30 flex items-center justify-center text-[#C5A059] mb-3 group-hover:scale-110 transition-transform">
                    {/* Golden Community Icon */}
                    <HeartHandshake className="w-6 h-6 text-[#C5A059]" />
                  </div>
                  <h3 className={`font-semibold text-sm sm:text-base ${isDark ? 'text-white' : 'text-stone-900'}`}>
                    Community
                  </h3>
                  <p className="text-xs text-stone-400 mt-1">
                    Connect &amp; grow
                  </p>
                </button>
              </div>
            </section>

            {/* BOTTOM CAPTION - Exact text from attached screenshot */}
            <section className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
              isDark ? 'bg-[#0B111E] border-stone-800' : 'bg-white border-[#E2DDD5]'
            }`}>
              <div>
                <span className="font-mono-code text-xs font-bold tracking-wider text-[#C5A059] uppercase block mb-0.5">
                  09. COMMUNITY EXPERIENCE
                </span>
                <p className={`text-sm font-medium ${isDark ? 'text-stone-200' : 'text-stone-800'}`}>
                  Where entrepreneurs, SMEs and professionals grow.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-[#C5A059]/15 text-[#DFB76C] border border-[#C5A059]/30">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>ETES Verified Community</span>
                </span>
              </div>
            </section>

            {/* LIVE ECOSYSTEM STATS */}
            <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className={`p-4 rounded-xl border ${isDark ? 'bg-[#0B111E] border-stone-800' : 'bg-white border-[#E2DDD5]'}`}>
                <p className="text-xs text-stone-400">Verified Members</p>
                <p className={`text-2xl font-bold mt-1 ${isDark ? 'text-white' : 'text-stone-900'}`}>1,840+</p>
                <p className="text-[11px] text-[#C5A059] mt-0.5">Pan-African footprint</p>
              </div>

              <div className={`p-4 rounded-xl border ${isDark ? 'bg-[#0B111E] border-stone-800' : 'bg-white border-[#E2DDD5]'}`}>
                <p className="text-xs text-stone-400">Active Opportunities</p>
                <p className={`text-2xl font-bold mt-1 ${isDark ? 'text-white' : 'text-stone-900'}`}>42</p>
                <p className="text-[11px] text-emerald-400 mt-0.5">8 Added this week</p>
              </div>

              <div className={`p-4 rounded-xl border ${isDark ? 'bg-[#0B111E] border-stone-800' : 'bg-white border-[#E2DDD5]'}`}>
                <p className="text-xs text-stone-400">Pipeline Transacted</p>
                <p className={`text-2xl font-bold mt-1 ${isDark ? 'text-white' : 'text-stone-900'}`}>R 18.5M</p>
                <p className="text-[11px] text-[#C5A059] mt-0.5">Zero intermediary fee</p>
              </div>

              <div className={`p-4 rounded-xl border ${isDark ? 'bg-[#0B111E] border-stone-800' : 'bg-white border-[#E2DDD5]'}`}>
                <p className="text-xs text-stone-400">Trust Standing Index</p>
                <p className={`text-2xl font-bold mt-1 ${isDark ? 'text-white' : 'text-stone-900'}`}>96.8%</p>
                <p className="text-[11px] text-emerald-400 mt-0.5">POPIA &amp; SLA compliant</p>
              </div>
            </section>

            {/* FEATURED OPPORTUNITIES PREVIEW */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className={`text-lg font-bold font-institutional ${isDark ? 'text-white' : 'text-stone-900'}`}>
                    Featured Enterprise Opportunities
                  </h2>
                  <p className="text-xs text-stone-400">
                    Vetted procurement requests from ETES Certified organisations.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('comm-opportunities')}
                  className="text-xs text-[#C5A059] hover:underline inline-flex items-center gap-1 font-medium cursor-pointer"
                >
                  <span>View All 42</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {opportunities.slice(0, 2).map((opp) => (
                  <div
                    key={opp.id}
                    className={`p-5 rounded-xl border flex flex-col justify-between transition-all ${
                      isDark ? 'bg-[#0B111E] border-stone-800 hover:border-stone-700' : 'bg-white border-[#E2DDD5] shadow-xs'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[11px] font-mono-code px-2 py-0.5 rounded bg-[#C5A059]/15 text-[#DFB76C] font-semibold">
                          {opp.type}
                        </span>
                        <span className="text-xs font-semibold text-emerald-400">
                          {opp.budget}
                        </span>
                      </div>

                      <h3 className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-stone-900'}`}>
                        {opp.title}
                      </h3>
                      <p className="text-xs text-stone-400 mt-1">
                        {opp.organisation} • {opp.location}
                      </p>

                      <p className="text-xs text-stone-300 mt-3 line-clamp-2">
                        {opp.description}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-stone-800/40 flex items-center justify-between">
                      <span className="text-[11px] text-stone-400 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>Deadline: {opp.deadline}</span>
                      </span>
                      <button
                        onClick={() => handleApply(opp)}
                        className="px-3 py-1.5 rounded-md bg-[#C5A059] hover:bg-[#B89047] text-[#0B111E] text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer"
                      >
                        <span>Apply</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* TAB 2: MY PROFILE */}
        {effectiveActiveTab === 'comm-profile' && (
          <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-800">
              <div>
                <h1 className={`text-2xl font-bold font-institutional ${isDark ? 'text-white' : 'text-stone-900'}`}>
                  Community Member Profile
                </h1>
                <p className="text-xs text-stone-400 mt-0.5">
                  Manage your verified profile, enterprise certifications, and services catalogue.
                </p>
              </div>

              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                <CheckCircle2 className="w-4 h-4" />
                <span>ETES Verified Supplier Standing (Grade A)</span>
              </span>
            </div>

            {/* Profile Card Header */}
            <div className={`p-6 rounded-2xl border ${isDark ? 'bg-[#0B111E] border-stone-800' : 'bg-white border-[#E2DDD5]'}`}>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#C5A059] to-[#8C6B28] flex items-center justify-center text-[#0B111E] text-xl font-bold shadow-md">
                  TN
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-stone-900'}`}>
                      {currentPersona.full_name || 'Thabo Ndlovu'}
                    </h2>
                    <span className="px-2 py-0.5 text-[11px] font-mono-code rounded bg-[#C5A059]/20 text-[#DFB76C] font-semibold">
                      SME Track
                    </span>
                  </div>
                  <p className="text-xs text-stone-400 mt-1">
                    Founder &amp; Principal Technologist • Nexus Innovations (Pty) Ltd
                  </p>
                  <p className="text-xs text-stone-400 flex items-center gap-1.5 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>Johannesburg, South Africa</span>
                    <span className="text-stone-500">•</span>
                    <span>VID-ZA-910815-KHO</span>
                  </p>
                </div>

                <div className="p-3 rounded-xl border border-[#C5A059]/30 bg-[#C5A059]/10 text-center">
                  <p className="text-[10px] text-stone-400 uppercase font-mono-code">Trust Index</p>
                  <p className="text-2xl font-bold text-[#DFB76C]">96/100</p>
                  <p className="text-[10px] text-emerald-400">Zero Dispute Record</p>
                </div>
              </div>

              {/* Bio */}
              <div className="mt-6 pt-5 border-t border-stone-800/60">
                <h3 className="text-xs font-semibold uppercase text-stone-400 mb-2">About Organisation &amp; Practice</h3>
                <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-stone-300' : 'text-stone-700'}`}>
                  Nexus Innovations is a South African digital engineering and cloud consultancy specializing in logistics dispatch systems, telemetry architectures, and compliance-ready data pipelines. Committed to fair wages, workplace psychological safety, and transparent B2B collaboration.
                </p>
              </div>

              {/* Verified Capabilities */}
              <div className="mt-5">
                <h3 className="text-xs font-semibold uppercase text-stone-400 mb-2">Verified Capabilities &amp; Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {['Enterprise Web Portals', 'React & Node Architectures', 'Logistics Telematics', 'POPIA Data Systems', 'API Integrations', 'Figma Design Systems'].map((skill, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-md text-xs font-medium bg-stone-800/80 text-stone-200 border border-stone-700">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Compliance & Verification Checklist */}
            <div className={`p-6 rounded-2xl border ${isDark ? 'bg-[#0B111E] border-stone-800' : 'bg-white border-[#E2DDD5]'}`}>
              <h3 className={`text-base font-bold mb-3 ${isDark ? 'text-white' : 'text-stone-900'}`}>
                Enterprise Supplier Readiness Checklist
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-stone-800/40 border border-stone-700/60">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <div>
                      <p className="text-xs font-medium text-white">CIPC Registration &amp; Tax Compliance PIN</p>
                      <p className="text-[11px] text-stone-400">Verified via SARS eFiling Gateway</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono-code text-emerald-400">VERIFIED</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-stone-800/40 border border-stone-700/60">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <div>
                      <p className="text-xs font-medium text-white">B-BBEE Level 1 Contributor Affidavit</p>
                      <p className="text-[11px] text-stone-400">135% Procurement Recognition</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono-code text-emerald-400">ACTIVE</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-stone-800/40 border border-stone-700/60">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <div>
                      <p className="text-xs font-medium text-white">ETES Workplace Trust Code Adherence</p>
                      <p className="text-[11px] text-stone-400">Signed fair compensation &amp; grievance charter</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono-code text-emerald-400">COMPLIANT</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: OPPORTUNITIES */}
        {effectiveActiveTab === 'comm-opportunities' && (
          <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-800">
              <div>
                <h1 className={`text-2xl font-bold font-institutional ${isDark ? 'text-white' : 'text-stone-900'}`}>
                  Thrive Opportunities Board
                </h1>
                <p className="text-xs text-stone-400 mt-0.5">
                  Exclusive corporate tenders, vetted freelance briefs, partnerships, and non-dilutive grants.
                </p>
              </div>

              {/* Track filter pills */}
              <div className="flex flex-wrap items-center gap-1.5">
                {['All', 'Entrepreneurs', 'SMEs', 'Freelancers'].map((track) => (
                  <button
                    key={track}
                    onClick={() => setSelectedTrack(track as any)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                      selectedTrack === track
                        ? 'bg-[#C5A059] text-[#0B111E] font-semibold'
                        : isDark ? 'bg-stone-800 text-stone-300 hover:bg-stone-700' : 'bg-stone-200 text-stone-700 hover:bg-stone-300'
                    }`}
                  >
                    {track}
                  </button>
                ))}
              </div>
            </div>

            {/* Search and Filters Bar */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search opportunities by role, technology, client, or keyword..."
                  value={opportunitySearch}
                  onChange={(e) => setOpportunitySearch(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2 rounded-lg text-xs border transition-colors outline-hidden ${
                    isDark
                      ? 'bg-[#0B111E] border-stone-800 text-white placeholder:text-stone-500 focus:border-[#C5A059]'
                      : 'bg-white border-[#E2DDD5] text-stone-900 placeholder:text-stone-400 focus:border-[#C5A059]'
                  }`}
                />
              </div>

              <select
                value={opportunityFilter}
                onChange={(e) => setOpportunityFilter(e.target.value)}
                className={`px-3 py-2 rounded-lg text-xs border outline-hidden cursor-pointer ${
                  isDark
                    ? 'bg-[#0B111E] border-stone-800 text-stone-200'
                    : 'bg-white border-[#E2DDD5] text-stone-800'
                }`}
              >
                <option value="All">All Types</option>
                <option value="Enterprise Tender">Enterprise Tenders</option>
                <option value="Freelance Contract">Freelance Contracts</option>
                <option value="Strategic Partnership">Partnerships</option>
                <option value="SME Grant">SME Grants</option>
              </select>
            </div>

            {/* Opportunity Cards List */}
            <div className="space-y-4">
              {filteredOpportunities.length === 0 ? (
                <div className={`p-8 text-center rounded-xl border ${isDark ? 'bg-[#0B111E] border-stone-800' : 'bg-white border-[#E2DDD5]'}`}>
                  <p className="text-sm text-stone-400">No opportunities match your current filters.</p>
                  <button
                    onClick={() => { setOpportunitySearch(''); setOpportunityFilter('All'); setSelectedTrack('All'); }}
                    className="mt-2 text-xs text-[#C5A059] hover:underline cursor-pointer"
                  >
                    Reset all filters
                  </button>
                </div>
              ) : (
                filteredOpportunities.map((opp) => (
                  <div
                    key={opp.id}
                    className={`p-5 sm:p-6 rounded-xl border transition-all ${
                      isDark ? 'bg-[#0B111E] border-stone-800 hover:border-stone-700' : 'bg-white border-[#E2DDD5] hover:border-stone-300'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span className="text-[11px] font-mono-code px-2 py-0.5 rounded bg-[#C5A059]/15 text-[#DFB76C] font-semibold">
                            {opp.type}
                          </span>
                          <span className="text-[11px] px-2 py-0.5 rounded bg-stone-800 text-stone-300">
                            Track: {opp.audience}
                          </span>
                          <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 flex items-center gap-1">
                            <ShieldCheck className="w-3 h-3" />
                            <span>{opp.orgVerification}</span>
                          </span>
                        </div>

                        <h3 className={`text-base font-bold ${isDark ? 'text-white' : 'text-stone-900'}`}>
                          {opp.title}
                        </h3>

                        <p className="text-xs text-stone-400 mt-1 flex items-center gap-2">
                          <span className="font-semibold text-stone-300">{opp.organisation}</span>
                          <span>•</span>
                          <span>{opp.location}</span>
                        </p>
                      </div>

                      <div className="text-left sm:text-right">
                        <p className="text-base font-bold text-emerald-400">{opp.budget}</p>
                        <p className="text-[11px] text-stone-400 flex items-center sm:justify-end gap-1 mt-0.5">
                          <Clock className="w-3 h-3" />
                          <span>Closing: {opp.deadline}</span>
                        </p>
                      </div>
                    </div>

                    <p className={`text-xs sm:text-sm mt-3 leading-relaxed ${isDark ? 'text-stone-300' : 'text-stone-600'}`}>
                      {opp.description}
                    </p>

                    {/* Requirements Tags */}
                    <div className="mt-4 pt-3 border-t border-stone-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-[11px] text-stone-400 mr-1">Prerequisites:</span>
                        {opp.requirements.map((req, idx) => (
                          <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-stone-800/80 text-stone-300 border border-stone-700/60">
                            {req}
                          </span>
                        ))}
                      </div>

                      <button
                        onClick={() => handleApply(opp)}
                        className="px-4 py-2 rounded-md bg-[#C5A059] hover:bg-[#B89047] text-[#0B111E] font-semibold text-xs inline-flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
                      >
                        <span>Apply / Submit Expression</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* TAB 4: RESOURCES */}
        {effectiveActiveTab === 'comm-resources' && (
          <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-800">
              <div>
                <h1 className={`text-2xl font-bold font-institutional ${isDark ? 'text-white' : 'text-stone-900'}`}>
                  Institutional Resource Vault
                </h1>
                <p className="text-xs text-stone-400 mt-0.5">
                  Standardized legal contracts, financial models, compliance playbooks, and governance templates.
                </p>
              </div>

              <span className="text-xs text-stone-400">
                All templates licensed under ETES Community Open-Access Charter.
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {resources.map((res) => (
                <div
                  key={res.id}
                  className={`p-5 rounded-xl border flex flex-col justify-between ${
                    isDark ? 'bg-[#0B111E] border-stone-800' : 'bg-white border-[#E2DDD5]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[11px] font-mono-code px-2 py-0.5 rounded bg-[#C5A059]/15 text-[#DFB76C] font-semibold">
                        {res.category}
                      </span>
                      <span className="text-[11px] text-stone-400">
                        {res.format} • {res.size}
                      </span>
                    </div>

                    <h3 className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-stone-900'}`}>
                      {res.title}
                    </h3>

                    <p className={`text-xs mt-2 leading-relaxed ${isDark ? 'text-stone-300' : 'text-stone-600'}`}>
                      {res.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-stone-800/60 flex items-center justify-between">
                    <span className="text-[11px] text-stone-400">
                      {res.downloads} community downloads
                    </span>

                    <button
                      onClick={() => alert(`Authorized community download initiated: "${res.title}". Watermark embedded.`)}
                      className="px-3 py-1.5 rounded-md bg-[#C5A059] hover:bg-[#B89047] text-[#0B111E] text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: LEARNING */}
        {effectiveActiveTab === 'comm-learning' && (
          <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-800">
              <div>
                <h1 className={`text-2xl font-bold font-institutional ${isDark ? 'text-white' : 'text-stone-900'}`}>
                  Thrive Masterclasses &amp; Toolkits
                </h1>
                <p className="text-xs text-stone-400 mt-0.5">
                  Practical executive masterclasses designed specifically for African founders, SMEs, and independent professionals.
                </p>
              </div>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#C5A059]/15 text-[#DFB76C] border border-[#C5A059]/30">
                <Award className="w-3.5 h-3.5" />
                <span>ETES Continuing Development</span>
              </span>
            </div>

            <div className="space-y-4">
              {masterclasses.map((mc) => (
                <div
                  key={mc.id}
                  className={`p-6 rounded-xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-5 ${
                    isDark ? 'bg-[#0B111E] border-stone-800' : 'bg-white border-[#E2DDD5]'
                  }`}
                >
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="text-[11px] font-mono-code px-2 py-0.5 rounded bg-[#C5A059]/15 text-[#DFB76C] font-semibold">
                        {mc.level}
                      </span>
                      <span className="text-xs text-stone-400">
                        {mc.modules} Modules • {mc.duration}
                      </span>
                      {mc.completed && (
                        <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Completed</span>
                        </span>
                      )}
                    </div>

                    <h3 className={`text-base font-bold ${isDark ? 'text-white' : 'text-stone-900'}`}>
                      {mc.title}
                    </h3>
                    <p className="text-xs text-[#C5A059] font-medium mt-0.5">
                      Instructor: {mc.instructor} ({mc.role})
                    </p>

                    <p className={`text-xs sm:text-sm mt-2 leading-relaxed ${isDark ? 'text-stone-300' : 'text-stone-600'}`}>
                      {mc.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {mc.tags.map((tag, idx) => (
                        <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-stone-800 text-stone-400">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => alert(`Launching masterclass player: "${mc.title}"`)}
                    className="px-4 py-2.5 rounded-md bg-[#C5A059] hover:bg-[#B89047] text-[#0B111E] text-xs font-semibold inline-flex items-center gap-2 cursor-pointer shrink-0"
                  >
                    <span>{mc.completed ? 'Review Content' : 'Start Masterclass'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: COMMUNITY */}
        {effectiveActiveTab === 'comm-community' && (
          <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-800">
              <div>
                <h1 className={`text-2xl font-bold font-institutional ${isDark ? 'text-white' : 'text-stone-900'}`}>
                  Community Circles &amp; Discussion
                </h1>
                <p className="text-xs text-stone-400 mt-0.5">
                  Peer-to-peer discussions, consortium matching, and procurement Q&amp;A.
                </p>
              </div>

              <button
                onClick={() => setNewDiscussionModalOpen(true)}
                className="px-4 py-2 rounded-md bg-[#C5A059] hover:bg-[#B89047] text-[#0B111E] text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Start Discussion</span>
              </button>
            </div>

            {/* Discussion Feed */}
            <div className="space-y-4">
              {discussionsList.map((disc) => (
                <div
                  key={disc.id}
                  className={`p-5 rounded-xl border transition-all ${
                    isDark ? 'bg-[#0B111E] border-stone-800 hover:border-stone-700' : 'bg-white border-[#E2DDD5]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#C5A059]/20 border border-[#C5A059]/40 flex items-center justify-center text-[#C5A059] text-xs font-bold shrink-0">
                        {disc.avatar}
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`text-xs font-bold ${isDark ? 'text-white' : 'text-stone-900'}`}>
                            {disc.author}
                          </span>
                          <span className="text-[11px] text-stone-400">
                            {disc.company}
                          </span>
                          <span className="text-stone-600">•</span>
                          <span className="text-[11px] text-stone-500 font-mono-code">{disc.time}</span>
                        </div>
                        <h3 className={`text-sm font-semibold mt-1.5 ${isDark ? 'text-stone-200' : 'text-stone-800'}`}>
                          {disc.title}
                        </h3>
                      </div>
                    </div>

                    <span className="text-[10px] px-2 py-0.5 rounded bg-stone-800 text-[#DFB76C] font-mono-code shrink-0">
                      {disc.category}
                    </span>
                  </div>

                  <div className="mt-4 pt-3 border-t border-stone-800/40 flex items-center justify-between text-xs text-stone-400">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1.5">
                        <MessageSquare className="w-3.5 h-3.5 text-[#C5A059]" />
                        <span>{disc.replies} Replies</span>
                      </span>
                      <span>•</span>
                      <span>{disc.likes} Likes</span>
                    </div>

                    <button
                      onClick={() => alert(`Opening discussion thread: "${disc.title}"`)}
                      className="text-xs text-[#C5A059] hover:underline inline-flex items-center gap-1 font-medium cursor-pointer"
                    >
                      <span>Join Discussion</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Member Directory Preview */}
            <div className="pt-6 border-t border-stone-800/80">
              <h2 className={`text-base font-bold mb-3 ${isDark ? 'text-white' : 'text-stone-900'}`}>
                Verified Community Members
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {communityMembers.map((mem) => (
                  <div
                    key={mem.id}
                    className={`p-4 rounded-xl border flex items-center justify-between ${
                      isDark ? 'bg-[#0B111E] border-stone-800' : 'bg-white border-[#E2DDD5]'
                    }`}
                  >
                    <div>
                      <p className={`text-xs font-bold ${isDark ? 'text-white' : 'text-stone-900'}`}>{mem.name}</p>
                      <p className="text-[11px] text-stone-400">{mem.role} • {mem.company}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] text-[#C5A059] font-mono-code">{mem.badge}</span>
                        <span className="text-[10px] text-emerald-400">Trust: {mem.trustScore}/100</span>
                      </div>
                    </div>
                    <button
                      onClick={() => alert(`Connection request sent to ${mem.name} (${mem.company})`)}
                      className="px-2.5 py-1 rounded bg-[#162032] hover:bg-[#1E293B] text-white border border-[#C5A059]/40 text-xs font-medium cursor-pointer"
                    >
                      Connect
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 7: EVENTS */}
        {effectiveActiveTab === 'comm-events' && (
          <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-800">
              <div>
                <h1 className={`text-2xl font-bold font-institutional ${isDark ? 'text-white' : 'text-stone-900'}`}>
                  Community Events &amp; Roundtables
                </h1>
                <p className="text-xs text-stone-400 mt-0.5">
                  Monthly mixers, enterprise pitch days, and closed-door founder office hours.
                </p>
              </div>

              <span className="text-xs text-stone-400">
                All events include verified attendance attestation for CPD.
              </span>
            </div>

            <div className="space-y-4">
              {events.map((event) => {
                const isRsvped = rsvpedEvents[event.id];
                return (
                  <div
                    key={event.id}
                    className={`p-6 rounded-xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-6 ${
                      isDark ? 'bg-[#0B111E] border-stone-800' : 'bg-white border-[#E2DDD5]'
                    }`}
                  >
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="text-[11px] font-mono-code px-2 py-0.5 rounded bg-[#C5A059]/15 text-[#DFB76C] font-semibold">
                          {event.type}
                        </span>
                        <span className="text-xs text-stone-400 flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
                          <span>{event.format}</span>
                        </span>
                      </div>

                      <h3 className={`text-base font-bold ${isDark ? 'text-white' : 'text-stone-900'}`}>
                        {event.title}
                      </h3>

                      <div className="flex items-center gap-2 text-xs font-semibold text-[#DFB76C] mt-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{event.date} • {event.time}</span>
                      </div>

                      <p className={`text-xs sm:text-sm mt-2 leading-relaxed ${isDark ? 'text-stone-300' : 'text-stone-600'}`}>
                        {event.description}
                      </p>

                      <p className="text-[11px] text-stone-400 mt-2">
                        {event.speaker} • {event.attendeesCount} Registered Members
                      </p>
                    </div>

                    <div className="flex flex-col gap-2 shrink-0 w-full sm:w-auto">
                      <button
                        onClick={() => handleToggleRSVP(event.id)}
                        className={`px-4 py-2.5 rounded-md text-xs font-semibold inline-flex items-center justify-center gap-2 cursor-pointer transition-all ${
                          isRsvped
                            ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                            : 'bg-[#C5A059] hover:bg-[#B89047] text-[#0B111E]'
                        }`}
                      >
                        {isRsvped ? (
                          <>
                            <Check className="w-4 h-4" />
                            <span>RSVP Confirmed</span>
                          </>
                        ) : (
                          <>
                            <Calendar className="w-4 h-4" />
                            <span>RSVP to Event</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => alert(`Calendar invite (.ics) downloaded for "${event.title}"`)}
                        className={`px-4 py-1.5 rounded-md text-xs font-medium border text-center transition-colors cursor-pointer ${
                          isDark ? 'border-stone-700 text-stone-300 hover:bg-stone-800' : 'border-[#E2DDD5] text-stone-700 hover:bg-stone-100'
                        }`}
                      >
                        Add to Calendar (.ics)
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>

      {/* MODAL: APPLY TO OPPORTUNITY */}
      {applyModalOpen && selectedOpportunity && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div
            className={`w-full max-w-lg rounded-2xl border shadow-2xl p-6 transition-colors ${
              isDark ? 'bg-[#0B111E] border-stone-700 text-white' : 'bg-white border-stone-300 text-stone-900'
            }`}
          >
            <div className="flex items-center justify-between pb-3 border-b border-stone-700/60 mb-4">
              <div>
                <span className="text-[10px] font-mono-code text-[#C5A059] uppercase font-bold">
                  Opportunity Expression of Interest
                </span>
                <h3 className="text-base font-bold mt-0.5 line-clamp-1">{selectedOpportunity.title}</h3>
              </div>
              <button
                onClick={() => setApplyModalOpen(false)}
                className="p-1.5 rounded-md hover:bg-stone-800 text-stone-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {applySubmitted ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-emerald-400">Application Transmitted</h4>
                <p className="text-xs text-stone-300 max-w-sm mx-auto">
                  Your verified ETES profile credentials, CIPC registration status, and proposal note have been transmitted securely to the procurement team at {selectedOpportunity.organisation}.
                </p>
                <button
                  onClick={() => setApplyModalOpen(false)}
                  className="mt-4 px-5 py-2 rounded-md bg-[#C5A059] hover:bg-[#B89047] text-[#0B111E] text-xs font-semibold cursor-pointer"
                >
                  Done
                </button>
              </div>
            ) : (
              <div className="space-y-4 text-xs">
                <div className="p-3 rounded-lg bg-stone-800/40 border border-stone-700/50 space-y-1">
                  <p className="text-stone-400">Organisation: <span className="text-white font-medium">{selectedOpportunity.organisation}</span></p>
                  <p className="text-stone-400">Budget: <span className="text-emerald-400 font-semibold">{selectedOpportunity.budget}</span></p>
                  <p className="text-stone-400">Applicant: <span className="text-white font-medium">{currentPersona.full_name || 'Thabo Ndlovu'} (Nexus Innovations)</span></p>
                </div>

                <div>
                  <label className="block font-medium text-stone-300 mb-1">
                    Capability Statement &amp; Introduction Note
                  </label>
                  <textarea
                    rows={4}
                    defaultValue="Nexus Innovations has reviewed your scope and confirms full availability. We bring direct experience in building compliant, high-availability web logistics interfaces with our certified Level 1 B-BBEE team."
                    className={`w-full p-3 rounded-lg border text-xs outline-hidden ${
                      isDark ? 'bg-stone-900 border-stone-700 text-white' : 'bg-stone-50 border-stone-300 text-stone-900'
                    }`}
                  />
                </div>

                <div className="p-3 rounded-lg border border-[#C5A059]/30 bg-[#C5A059]/10 flex items-center gap-2 text-stone-300 text-[11px]">
                  <ShieldCheck className="w-4 h-4 text-[#C5A059] shrink-0" />
                  <span>Your verified ETES Trust Badge (96/100) will be attached automatically.</span>
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    onClick={() => setApplyModalOpen(false)}
                    className="px-4 py-2 rounded-md text-stone-400 hover:text-white cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setApplySubmitted(true)}
                    className="px-5 py-2 rounded-md bg-[#C5A059] hover:bg-[#B89047] text-[#0B111E] font-semibold cursor-pointer"
                  >
                    Submit Expression
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODAL: NEW DISCUSSION */}
      {newDiscussionModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div
            className={`w-full max-w-lg rounded-2xl border shadow-2xl p-6 transition-colors ${
              isDark ? 'bg-[#0B111E] border-stone-700 text-white' : 'bg-white border-stone-300 text-stone-900'
            }`}
          >
            <div className="flex items-center justify-between pb-3 border-b border-stone-700/60 mb-4">
              <h3 className="text-base font-bold">Start Community Discussion</h3>
              <button
                onClick={() => setNewDiscussionModalOpen(false)}
                className="p-1.5 rounded-md hover:bg-stone-800 text-stone-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-medium text-stone-300 mb-1">Category</label>
                <select
                  value={discussionCategory}
                  onChange={(e) => setDiscussionCategory(e.target.value)}
                  className={`w-full p-2.5 rounded-lg border text-xs outline-hidden ${
                    isDark ? 'bg-stone-900 border-stone-700 text-white' : 'bg-stone-50 border-stone-300 text-stone-900'
                  }`}
                >
                  <option value="Procurement">Procurement &amp; Tenders</option>
                  <option value="Finance & Contracts">Finance &amp; Contracts</option>
                  <option value="Partnerships">Consortiums &amp; Partnerships</option>
                  <option value="Workplace Trust">Workplace Trust &amp; Culture</option>
                </select>
              </div>

              <div>
                <label className="block font-medium text-stone-300 mb-1">Discussion Topic or Question</label>
                <textarea
                  rows={4}
                  value={discussionTopic}
                  onChange={(e) => setDiscussionTopic(e.target.value)}
                  placeholder="Share a challenge, ask a question to the community, or propose a partnership..."
                  className={`w-full p-3 rounded-lg border text-xs outline-hidden ${
                    isDark ? 'bg-stone-900 border-stone-700 text-white' : 'bg-stone-50 border-stone-300 text-stone-900'
                  }`}
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => setNewDiscussionModalOpen(false)}
                  className="px-4 py-2 rounded-md text-stone-400 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePostDiscussion}
                  disabled={!discussionTopic.trim()}
                  className="px-5 py-2 rounded-md bg-[#C5A059] hover:bg-[#B89047] disabled:opacity-50 text-[#0B111E] font-semibold cursor-pointer"
                >
                  Post to Community
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
