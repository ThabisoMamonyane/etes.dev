import React, { useState } from 'react';
import { Person } from '../../types';
import { EtesLogo } from '../common/EtesLogo';
import contractorHeroImg from '../../images/contractor-room.jpg';
import { useTheme } from '../../context/ThemeContext';
import { ThemeToggle } from '../common/ThemeToggle';
import {
  User,
  UserCheck,
  BarChart2,
  LogOut,
  Briefcase,
  ShieldCheck,
  Star,
  Award,
  TrendingUp,
  CheckCircle2,
  Clock,
  DollarSign,
  Download,
  ExternalLink,
  Search,
  Plus,
  FileText,
  ChevronRight,
  AlertCircle,
  Copy,
  Check,
  Menu,
  X,
  ArrowRight,
  Sparkles,
  Building2,
  Calendar,
  Lock,
  Send,
  RefreshCw,
  Layers,
  FileCheck,
  Shield,
  HelpCircle,
  MessageSquare,
  ThumbsUp,
  SlidersHorizontal
} from 'lucide-react';

interface ContractorRoomProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currentPersona: Person;
  onLogOut?: () => void;
}

interface Engagement {
  id: string;
  client: string;
  contractRef: string;
  title: string;
  scope: string;
  startDate: string;
  endDate: string;
  totalValue: number;
  escrowProtected: number;
  releasedToDate: number;
  currentMilestone: string;
  milestoneDue: string;
  milestoneProgress: number;
  status: 'active' | 'in_review' | 'completed';
  hoursLogged: number;
  maxHours: number;
  deliverables: { name: string; status: 'completed' | 'in_progress' | 'pending' }[];
}

interface Invoice {
  id: string;
  invoiceNumber: string;
  contractRef: string;
  client: string;
  milestoneName: string;
  amount: number;
  issuedDate: string;
  dueDate: string;
  status: 'paid' | 'in_escrow' | 'client_review' | 'processing';
  escrowGuaranteed: boolean;
}

interface Review {
  id: string;
  clientName: string;
  clientRole: string;
  company: string;
  engagementRef: string;
  date: string;
  rating: number;
  comment: string;
  verifiedTransaction: boolean;
  dimensions: {
    technicalMastery: number;
    communication: number;
    deadlineFidelity: number;
    trustConfidentiality: number;
  };
}

export const ContractorRoom: React.FC<ContractorRoomProps> = ({
  activeTab,
  setActiveTab,
  currentPersona,
  onLogOut
}) => {
  const { isDark } = useTheme();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Deliverable Submission Modal State
  const [selectedEngagementForDeliverable, setSelectedEngagementForDeliverable] = useState<Engagement | null>(null);
  const [deliverableTitle, setDeliverableTitle] = useState('');
  const [deliverableNotes, setDeliverableNotes] = useState('');
  const [deliverableLink, setDeliverableLink] = useState('');
  const [hoursToLog, setHoursToLog] = useState<number>(0);

  // Review Request Modal State
  const [reviewRequestOpen, setReviewRequestOpen] = useState(false);
  const [reviewClientEmail, setReviewClientEmail] = useState('');
  const [reviewProjectRef, setReviewProjectRef] = useState('CON-2026-VFH-084');
  const [generatedReviewLink, setGeneratedReviewLink] = useState<string | null>(null);

  // Profile Edit Modal State
  const [profileEditOpen, setProfileEditOpen] = useState(false);
  const [hourlyRate, setHourlyRate] = useState(1450);
  const [dayRate, setDayRate] = useState(11600);
  const [availabilityStatus, setAvailabilityStatus] = useState('Available for Q4 Engagements (15 hrs/wk)');
  const [professionalTitle, setProfessionalTitle] = useState('Senior Enterprise Solutions Architect & Independent Specialist');

  // Consortium Express Interest State
  const [expressedConsortiumIds, setExpressedConsortiumIds] = useState<string[]>([]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // 5 REQUIRED TABS FROM USER SPECIFICATION:
  // 1. My professional Profile
  // 2. Active Engagements
  // 3. Payment & Reliability Trust
  // 4. Relationship & Reviews
  // 5. Participation & Growth
  // Sidebar Items matching reference image layout
  const SIDEBAR_TABS = [
    {
      id: 'contractor-overview',
      label: 'Overview',
      icon: BarChart2
    },
    {
      id: 'contractor-engagements',
      label: 'Active Engagements',
      icon: Briefcase
    },
    {
      id: 'contractor-trust',
      label: 'Payment & Reliability Trust',
      icon: ShieldCheck
    },
    {
      id: 'contractor-reviews',
      label: 'Relationship & Reviews',
      icon: Star
    },
    {
      id: 'contractor-growth',
      label: 'Participation & Growth',
      icon: TrendingUp
    }
  ];

  // Map active tab or fallback to overview
  const validTabs = ['contractor-profile', ...SIDEBAR_TABS.map(t => t.id)];
  const effectiveActiveTab = validTabs.includes(activeTab) ? activeTab : 'contractor-overview';
  const currentTabLabel = activeTab === 'contractor-profile'
    ? 'My Professional Profile'
    : (SIDEBAR_TABS.find(t => t.id === effectiveActiveTab)?.label || 'Overview');

  // Active Engagements Mock Data
  const [engagements, setEngagements] = useState<Engagement[]>([
    {
      id: 'eng-1',
      client: 'Vanguard Financial Holdings (Pty) Ltd',
      contractRef: 'CON-2026-VFH-084',
      title: 'Enterprise Trust Architecture & Escrow Governance Framework',
      scope: 'Lead architecture oversight, multi-tenant isolation audit, and escrow smart contract verification for the Q3 Institutional Launch.',
      startDate: '2026-07-01',
      endDate: '2026-10-31',
      totalValue: 280000,
      escrowProtected: 140000,
      releasedToDate: 140000,
      currentMilestone: 'Milestone 3: Security Sandbox & POPIA Penetration Audit',
      milestoneDue: '2026-09-28',
      milestoneProgress: 75,
      status: 'active',
      hoursLogged: 38.5,
      maxHours: 50,
      deliverables: [
        { name: 'Architecture High-Level Blueprint (v2.1)', status: 'completed' },
        { name: 'FICA & Cryptographic Key Isolation Specification', status: 'completed' },
        { name: 'Threat Model & Zero-Trust Verification Report', status: 'in_progress' },
        { name: 'Final Handover Runbook & SOW Sign-off', status: 'pending' }
      ]
    },
    {
      id: 'eng-2',
      client: 'Impala Energy Systems (JSE: IES)',
      contractRef: 'CON-2026-IES-019',
      title: 'Independent ESG Data Pipeline & Carbon Trust Certification',
      scope: 'Independent advisory on IoT telemetry data integrity, emissions calculation audit trails, and King IV reporting compliance.',
      startDate: '2026-08-15',
      endDate: '2026-11-30',
      totalValue: 150000,
      escrowProtected: 50000,
      releasedToDate: 50000,
      currentMilestone: 'Milestone 2: Industrial Telemetry Edge Node Cryptographic Signature',
      milestoneDue: '2026-10-10',
      milestoneProgress: 40,
      status: 'active',
      hoursLogged: 22.0,
      maxHours: 40,
      deliverables: [
        { name: 'Scope & Boundary Confirmation Dossier', status: 'completed' },
        { name: 'Edge Telemetry Encryption Specification', status: 'in_progress' },
        { name: 'Independent Carbon Verification Protocol', status: 'pending' }
      ]
    },
    {
      id: 'eng-3',
      client: 'Discovery Health Empowerment Consortium',
      contractRef: 'CON-2026-DHC-042',
      title: 'POPIA Third-Party Operator Risk Assessment & System Modernization',
      scope: 'Rigorous external assessment of operator contracts, data classification schemas, and incident response readiness.',
      startDate: '2026-09-01',
      endDate: '2026-12-31',
      totalValue: 90000,
      escrowProtected: 90000,
      releasedToDate: 0,
      currentMilestone: 'Milestone 1: Data Subject Access Request (DSAR) Workflow Audit',
      milestoneDue: '2026-09-22',
      milestoneProgress: 90,
      status: 'active',
      hoursLogged: 16.5,
      maxHours: 25,
      deliverables: [
        { name: 'Operator Processing Inventory & Legal Basis Matrix', status: 'completed' },
        { name: 'DSAR Automated Fulfillment Flow Analysis', status: 'in_progress' },
        { name: 'Remediation Roadmap & Executive Presentation', status: 'pending' }
      ]
    }
  ]);

  // Invoices & Escrow Ledger Mock Data
  const [invoices] = useState<Invoice[]>([
    {
      id: 'inv-001',
      invoiceNumber: 'INV-2026-0041',
      contractRef: 'CON-2026-VFH-084',
      client: 'Vanguard Financial Holdings',
      milestoneName: 'Milestone 1: Architecture Inception & Scope Sign-off',
      amount: 70000,
      issuedDate: '2026-07-20',
      dueDate: '2026-07-25',
      status: 'paid',
      escrowGuaranteed: true
    },
    {
      id: 'inv-002',
      invoiceNumber: 'INV-2026-0048',
      contractRef: 'CON-2026-VFH-084',
      client: 'Vanguard Financial Holdings',
      milestoneName: 'Milestone 2: Key Isolation Specification Delivery',
      amount: 70000,
      issuedDate: '2026-08-18',
      dueDate: '2026-08-22',
      status: 'paid',
      escrowGuaranteed: true
    },
    {
      id: 'inv-003',
      invoiceNumber: 'INV-2026-0052',
      contractRef: 'CON-2026-IES-019',
      client: 'Impala Energy Systems',
      milestoneName: 'Milestone 1: Scope & Boundary Confirmation Dossier',
      amount: 50000,
      issuedDate: '2026-08-30',
      dueDate: '2026-09-05',
      status: 'paid',
      escrowGuaranteed: true
    },
    {
      id: 'inv-004',
      invoiceNumber: 'INV-2026-0059',
      contractRef: 'CON-2026-VFH-084',
      client: 'Vanguard Financial Holdings',
      milestoneName: 'Milestone 3: Security Sandbox & POPIA Penetration Audit',
      amount: 70000,
      issuedDate: '2026-09-10',
      dueDate: '2026-09-28',
      status: 'in_escrow',
      escrowGuaranteed: true
    },
    {
      id: 'inv-005',
      invoiceNumber: 'INV-2026-0063',
      contractRef: 'CON-2026-DHC-042',
      client: 'Discovery Health Empowerment',
      milestoneName: 'Milestone 1: DSAR Workflow Audit',
      amount: 45000,
      issuedDate: '2026-09-12',
      dueDate: '2026-09-25',
      status: 'client_review',
      escrowGuaranteed: true
    }
  ]);

  // Verified Reviews Mock Data
  const [reviews] = useState<Review[]>([
    {
      id: 'rev-01',
      clientName: 'Dr. Thabo Mthembu',
      clientRole: 'Group Chief Executive Officer',
      company: 'Vanguard Financial Holdings',
      engagementRef: 'CON-2026-VFH-084',
      date: '2026-08-25',
      rating: 5.0,
      comment: 'Kagiso operates with rare institutional depth and rigor. His technical architecture models directly withstood independent scrutiny from our prudential risk committee. Escrow releases were approved ahead of schedule.',
      verifiedTransaction: true,
      dimensions: {
        technicalMastery: 5.0,
        communication: 4.9,
        deadlineFidelity: 5.0,
        trustConfidentiality: 5.0
      }
    },
    {
      id: 'rev-02',
      clientName: 'Sarah van der Merwe',
      clientRole: 'Head of Enterprise Procurement & ESG',
      company: 'Impala Energy Systems',
      engagementRef: 'CON-2026-IES-019',
      date: '2026-09-02',
      rating: 4.9,
      comment: 'Superb reliability, proactive communication, and zero ambiguity on deliverable milestones. Having Kagiso on the advisory roster brings immense confidence to our executive committee.',
      verifiedTransaction: true,
      dimensions: {
        technicalMastery: 4.9,
        communication: 4.9,
        deadlineFidelity: 5.0,
        trustConfidentiality: 5.0
      }
    },
    {
      id: 'rev-03',
      clientName: 'Naledi Sithole',
      clientRole: 'Principal Compliance Officer',
      company: 'Discovery Health Empowerment',
      engagementRef: 'CON-2026-DHC-042',
      date: '2026-09-11',
      rating: 4.9,
      comment: 'An authority on South African data privacy (POPIA) and institutional information governance. Pragmatic, fast, and exceptionally pleasant to collaborate with.',
      verifiedTransaction: true,
      dimensions: {
        technicalMastery: 5.0,
        communication: 4.8,
        deadlineFidelity: 5.0,
        trustConfidentiality: 4.9
      }
    }
  ]);

  // Handle Deliverable Submission
  const handleSubmitDeliverable = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEngagementForDeliverable || !deliverableTitle) {
      alert('Please select an engagement and enter a deliverable title.');
      return;
    }

    setEngagements(prev => prev.map(eng => {
      if (eng.id === selectedEngagementForDeliverable.id) {
        return {
          ...eng,
          hoursLogged: eng.hoursLogged + (hoursToLog || 0),
          deliverables: [
            ...eng.deliverables,
            { name: `${deliverableTitle} (Submitted for Approval)`, status: 'in_progress' }
          ]
        };
      }
      return eng;
    }));

    showToast(`Deliverable "${deliverableTitle}" submitted successfully to ${selectedEngagementForDeliverable.client} with cryptographic timestamp.`);
    setSelectedEngagementForDeliverable(null);
    setDeliverableTitle('');
    setDeliverableNotes('');
    setDeliverableLink('');
    setHoursToLog(0);
  };

  // Handle Review Request Generation
  const handleGenerateReviewLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewClientEmail) {
      alert('Please enter a valid client corporate email.');
      return;
    }
    const token = Math.random().toString(36).substring(2, 12).toUpperCase();
    const link = `https://etes.network/trust-review/verify?ref=${reviewProjectRef}&auth=${token}`;
    setGeneratedReviewLink(link);
    showToast(`Verified review invitation generated and dispatched to ${reviewClientEmail}`);
  };

  const handleCopyReviewLink = () => {
    if (generatedReviewLink) {
      navigator.clipboard.writeText(generatedReviewLink);
      showToast('Verified review link copied to clipboard!');
    }
  };

  const handleToggleConsortiumInterest = (consortiumId: string, consortiumTitle: string) => {
    if (expressedConsortiumIds.includes(consortiumId)) {
      setExpressedConsortiumIds(prev => prev.filter(id => id !== consortiumId));
      showToast(`Withdrew expression of interest from ${consortiumTitle}`);
    } else {
      setExpressedConsortiumIds(prev => [...prev, consortiumId]);
      showToast(`Expression of interest confirmed for ${consortiumTitle}! Proposal dossier dispatched.`);
    }
  };

  return (
    <div
      className={`h-full flex-1 flex flex-col lg:flex-row overflow-hidden rounded-xl border shadow-sm transition-colors duration-200 ${
        isDark ? 'border-stone-800 bg-[#070B13]' : 'border-[#E2DDD5] bg-[#FAF7F2]'
      }`}
      id="contractor-room-root"
    >
      {/* GLOBAL TOAST NOTIFICATION */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-3 duration-300 max-w-md">
          <div className={`flex items-center gap-3 px-4 py-3 rounded-lg border shadow-xl ${
            isDark ? 'bg-[#0E1726] border-[#C5A059]/60 text-white' : 'bg-white border-[#C5A059] text-stone-900'
          }`}>
            <CheckCircle2 className="w-5 h-5 text-[#C5A059] shrink-0" />
            <span className="text-xs sm:text-sm font-medium">{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Mobile & Tablet Top Header Bar */}
      <div
        className={`lg:hidden flex items-center justify-between px-3.5 py-2.5 border-b shrink-0 transition-colors ${
          isDark ? 'border-stone-800 bg-[#070B13]' : 'border-[#E2DDD5] bg-white'
        }`}
      >
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setActiveTab('contractor-overview')}
        >
          <EtesLogo
            size="xs"
            variant={isDark ? 'light' : 'dark'}
            showSubtitle={false}
            roomLabel="CONTRACTOR / FREELANCER ROOM"
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
                  setActiveTab('contractor-overview');
                  setMobileNavOpen(false);
                }}
              >
                <div className="flex-1 min-w-0 pr-2">
                  <EtesLogo
                    size="sm"
                    variant={isDark ? 'light' : 'dark'}
                    showSubtitle={false}
                    roomLabel="CONTRACTOR / FREELANCER ROOM"
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
              <nav className="space-y-1 flex-1 overflow-y-auto pr-1" id="contractor-drawer-nav">
                {SIDEBAR_TABS.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = effectiveActiveTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      id={`contractor-drawer-nav-${tab.id}`}
                      onClick={() => {
                        setActiveTab(tab.id);
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
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#C5A059]' : 'text-stone-400'}`} />
                      <span>{tab.label}</span>
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
                  setActiveTab('contractor-profile');
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
        id="contractor-desktop-sidebar"
      >
        <div className="flex-1 flex flex-col min-h-0">
          {/* Logo Header matching image: Gold emblem, ETES wordmark and gold uppercase room label */}
          <div 
            className={`px-2 py-3 mb-4 border-b cursor-pointer ${
              isDark ? 'border-[#1E293B]' : 'border-[#E2DDD5]'
            }`}
            onClick={() => setActiveTab('contractor-overview')}
          >
            <EtesLogo 
              size="sm" 
              variant={isDark ? 'light' : 'dark'} 
              showSubtitle={false} 
              roomLabel="CONTRACTOR / FREELANCER ROOM" 
            />
          </div>

          {/* Navigation Items (Identical text-xs, font-medium, rounded-lg, gold active and stone-400 inactive) */}
          <nav className="space-y-1 flex-1 overflow-y-auto pr-1" id="contractor-sidebar-nav" aria-label="Contractor Navigation">
            {SIDEBAR_TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = effectiveActiveTab === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`contractor-nav-${tab.id}`}
                  onClick={() => setActiveTab(tab.id)}
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
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section matching image: Dark Mode Card with Switch, My Profile, Log Out */}
        <div className={`pt-4 mt-5 border-t space-y-1.5 ${isDark ? 'border-[#1E293B]' : 'border-[#E2DDD5]'}`}>
          <ThemeToggle variant="sidebar" />

          <button
            onClick={() => setActiveTab('contractor-profile')}
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
      <main className="flex-1 min-w-0 h-full overflow-y-auto p-4 sm:p-6 lg:p-8" id="contractor-main-viewport">
        {/* ========================================================================= */}
        {/* TAB 0: CONTRACTOR OVERVIEW DASHBOARD */}
        {/* ========================================================================= */}
        {effectiveActiveTab === 'contractor-overview' && (
          <div className="max-w-6xl mx-auto space-y-8 pb-16">
            {/* Top Hero Banner Image */}
            <div className="relative w-full rounded-2xl overflow-hidden border border-[#C5A059]/30 shadow-lg group bg-[#111827]">
              <img
                src={contractorHeroImg}
                alt="ETES Contractor and Freelancer Room Banner"
                className="w-full h-48 sm:h-64 md:h-72 lg:h-80 object-cover object-center transition-transform duration-500 group-hover:scale-[1.01]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 pt-1">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-mono-code font-bold uppercase tracking-wider text-[#C5A059]">
                    Workplace Trust Ecosystem™
                  </span>
                  <span className={`text-[9.5px] px-2 py-0.5 rounded font-mono-code font-semibold uppercase ${
                    isDark ? 'bg-[#C5A059]/15 text-[#DFB76C] border border-[#C5A059]/30' : 'bg-[#8C6B28]/10 text-[#8C6B28] border border-[#8C6B28]/30'
                  }`}>
                    Verified Supplier • VID-ZA-880524-KAG
                  </span>
                </div>
                <h1 className={`font-institutional text-2xl sm:text-3xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-[#0B111E]'}`}>
                  Independent Contractor Dashboard
                </h1>
                <p className={`text-xs sm:text-sm mt-1 ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                  Active corporate contracts, milestone delivery verification, and custodial escrow protection.
                </p>
              </div>

              <div className="flex items-center gap-2.5 flex-wrap">
                <button
                  onClick={() => setActiveTab('contractor-engagements')}
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#C5A059] hover:bg-[#B89047] text-[#0B111E] flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
                >
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>View Engagements</span>
                </button>
                <button
                  onClick={() => setActiveTab('contractor-profile')}
                  className={`px-3.5 py-2 rounded-xl text-xs font-medium border flex items-center gap-1.5 transition-colors cursor-pointer ${
                    isDark ? 'border-stone-700 bg-stone-800 text-stone-200 hover:bg-stone-700' : 'border-stone-300 bg-white text-stone-800 hover:bg-stone-50'
                  }`}
                >
                  <User className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>My Profile</span>
                </button>
              </div>
            </div>

            {/* 4 Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className={`p-4 rounded-xl border transition-all ${
                isDark ? 'bg-[#0E1726]/60 border-stone-800' : 'bg-white border-stone-200 shadow-xs'
              }`}>
                <div className="flex items-center justify-between text-xs text-stone-400 mb-2">
                  <span>Active Engagements</span>
                  <Briefcase className="w-4 h-4 text-[#C5A059]" />
                </div>
                <div className={`text-2xl font-bold font-institutional ${isDark ? 'text-white' : 'text-[#0B111E]'}`}>
                  3 Corporate
                </div>
                <div className="text-[11px] text-emerald-500 font-mono-code font-medium mt-1 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>R 520,000 Pipeline Value</span>
                </div>
              </div>

              <div className={`p-4 rounded-xl border transition-all ${
                isDark ? 'bg-[#0E1726]/60 border-stone-800' : 'bg-white border-stone-200 shadow-xs'
              }`}>
                <div className="flex items-center justify-between text-xs text-stone-400 mb-2">
                  <span>Custodial Escrow</span>
                  <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
                </div>
                <div className={`text-2xl font-bold font-institutional ${isDark ? 'text-white' : 'text-[#0B111E]'}`}>
                  R 280,000
                </div>
                <div className="text-[11px] text-[#C5A059] font-mono-code font-medium mt-1 flex items-center gap-1">
                  <Lock className="w-3 h-3" />
                  <span>Standard Bank Protected</span>
                </div>
              </div>

              <div className={`p-4 rounded-xl border transition-all ${
                isDark ? 'bg-[#0E1726]/60 border-stone-800' : 'bg-white border-stone-200 shadow-xs'
              }`}>
                <div className="flex items-center justify-between text-xs text-stone-400 mb-2">
                  <span>Reliability Index</span>
                  <Award className="w-4 h-4 text-[#C5A059]" />
                </div>
                <div className={`text-2xl font-bold font-institutional ${isDark ? 'text-white' : 'text-[#0B111E]'}`}>
                  98.4 / 100
                </div>
                <div className="text-[11px] text-stone-400 font-mono-code mt-1 flex items-center gap-1">
                  <span>Tier 1 Exceptional Supplier</span>
                </div>
              </div>

              <div className={`p-4 rounded-xl border transition-all ${
                isDark ? 'bg-[#0E1726]/60 border-stone-800' : 'bg-white border-stone-200 shadow-xs'
              }`}>
                <div className="flex items-center justify-between text-xs text-stone-400 mb-2">
                  <span>Next Milestone Due</span>
                  <Clock className="w-4 h-4 text-[#C5A059]" />
                </div>
                <div className={`text-2xl font-bold font-institutional ${isDark ? 'text-white' : 'text-[#0B111E]'}`}>
                  22 Sep 2026
                </div>
                <div className="text-[11px] text-amber-500 font-mono-code font-medium mt-1 truncate">
                  Discovery Health (R 60,000)
                </div>
              </div>
            </div>

            {/* Active Engagements & Progress Section */}
            <div className={`rounded-xl border p-5 sm:p-6 ${
              isDark ? 'bg-[#0E1726]/40 border-stone-800' : 'bg-white border-stone-200 shadow-xs'
            }`}>
              <div className="flex items-center justify-between pb-4 border-b border-stone-800/40 mb-4">
                <div>
                  <h2 className={`font-institutional text-lg font-bold ${isDark ? 'text-white' : 'text-[#0B111E]'}`}>
                    Active Enterprise Engagements
                  </h2>
                  <p className={`text-xs mt-0.5 ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                    Real-time milestone completion and protected escrow funds per contract.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('contractor-engagements')}
                  className="text-xs text-[#C5A059] hover:underline font-medium flex items-center gap-1 cursor-pointer"
                >
                  <span>View All Details</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-4">
                {engagements.map((eng) => (
                  <div
                    key={eng.id}
                    className={`p-4 rounded-xl border transition-all ${
                      isDark ? 'bg-[#0A101C]/60 border-stone-800 hover:border-[#C5A059]/40' : 'bg-stone-50/70 border-stone-200 hover:border-[#C5A059]/60'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono-code text-[#C5A059] font-semibold">{eng.contractRef}</span>
                          <span className="text-stone-400">•</span>
                          <span className={`text-xs font-medium ${isDark ? 'text-stone-300' : 'text-stone-600'}`}>{eng.client}</span>
                        </div>
                        <h3 className={`font-bold text-sm sm:text-base mt-0.5 ${isDark ? 'text-white' : 'text-stone-900'}`}>
                          {eng.title}
                        </h3>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className={`text-xs px-2.5 py-1 rounded-full font-mono-code font-medium ${
                          isDark ? 'bg-[#C5A059]/15 text-[#DFB76C] border border-[#C5A059]/30' : 'bg-[#8C6B28]/10 text-[#8C6B28] border border-[#8C6B28]/30'
                        }`}>
                          Escrow: R {eng.escrowProtected.toLocaleString()}
                        </span>
                        <button
                          onClick={() => setSelectedEngagementForDeliverable(eng)}
                          className="px-3 py-1 rounded-lg text-xs font-medium bg-[#C5A059] hover:bg-[#B89047] text-[#0B111E] transition-colors cursor-pointer"
                        >
                          Submit Deliverable
                        </button>
                      </div>
                    </div>

                    <div className="mt-3 space-y-1.5">
                      <div className="flex items-center justify-between text-xs text-stone-400">
                        <span>Current Milestone: <strong className={isDark ? 'text-stone-200' : 'text-stone-800'}>{eng.currentMilestone}</strong></span>
                        <span className="font-mono-code">{eng.milestoneProgress}% completed</span>
                      </div>
                      <div className="w-full bg-stone-700/30 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-[#C5A059] to-[#DFB76C] h-2 rounded-full transition-all duration-500"
                          style={{ width: `${eng.milestoneProgress}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-stone-400 pt-0.5">
                        <span>Due Date: {eng.milestoneDue}</span>
                        <span>Total SOW: R {eng.totalValue.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Two Column Grid: Escrow Trust & Client Ratings */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Column 1: Payment Trust Account Status */}
              <div className={`p-5 sm:p-6 rounded-xl border ${
                isDark ? 'bg-[#0E1726]/40 border-stone-800' : 'bg-white border-stone-200 shadow-xs'
              }`}>
                <div className="flex items-center justify-between pb-3 border-b border-stone-800/40 mb-4">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-[#C5A059]" />
                    <h2 className={`font-institutional text-base font-bold ${isDark ? 'text-white' : 'text-[#0B111E]'}`}>
                      Payment & Escrow Protection
                    </h2>
                  </div>
                  <button
                    onClick={() => setActiveTab('contractor-trust')}
                    className="text-xs text-[#C5A059] hover:underline font-medium cursor-pointer"
                  >
                    View Ledger
                  </button>
                </div>

                <div className="space-y-3 text-xs">
                  <div className={`p-3 rounded-lg border ${
                    isDark ? 'bg-[#0A101C]/60 border-stone-800' : 'bg-stone-50 border-stone-200'
                  }`}>
                    <div className="flex items-center justify-between font-medium">
                      <span className="text-stone-400">Escrow Custodian:</span>
                      <span className={isDark ? 'text-stone-200' : 'text-stone-800'}>Standard Bank Institutional Trust</span>
                    </div>
                    <div className="flex items-center justify-between font-medium mt-1.5">
                      <span className="text-stone-400">Total Funds in Safe Custody:</span>
                      <span className="font-mono-code font-bold text-[#C5A059]">R 280,000.00</span>
                    </div>
                    <div className="flex items-center justify-between font-medium mt-1.5">
                      <span className="text-stone-400">Dispute Rate:</span>
                      <span className="text-emerald-500 font-mono-code font-semibold">0.00% (Zero Disputes)</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-stone-400">SARS Tax Compliance PIN:</span>
                    <span className="text-emerald-500 font-mono-code font-medium">Active • 9948210385</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-stone-400">B-BBEE Contributor Status:</span>
                    <span className={isDark ? 'text-stone-200' : 'text-stone-800'}>Level 1 EME (135% Recognition)</span>
                  </div>
                </div>
              </div>

              {/* Column 2: Recent Verified Reviews */}
              <div className={`p-5 sm:p-6 rounded-xl border ${
                isDark ? 'bg-[#0E1726]/40 border-stone-800' : 'bg-white border-stone-200 shadow-xs'
              }`}>
                <div className="flex items-center justify-between pb-3 border-b border-stone-800/40 mb-4">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-[#C5A059]" />
                    <h2 className={`font-institutional text-base font-bold ${isDark ? 'text-white' : 'text-[#0B111E]'}`}>
                      Verified Enterprise Reviews
                    </h2>
                  </div>
                  <button
                    onClick={() => setActiveTab('contractor-reviews')}
                    className="text-xs text-[#C5A059] hover:underline font-medium cursor-pointer"
                  >
                    All 14 Reviews
                  </button>
                </div>

                <div className="space-y-3">
                  {reviews.slice(0, 2).map((rev) => (
                    <div
                      key={rev.id}
                      className={`p-3 rounded-lg border text-xs ${
                        isDark ? 'bg-[#0A101C]/60 border-stone-800' : 'bg-stone-50 border-stone-200'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className={`font-bold ${isDark ? 'text-white' : 'text-stone-900'}`}>{rev.clientName}</span>
                        <div className="flex items-center text-[#C5A059]">
                          {Array.from({ length: Math.floor(rev.rating) }).map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-current" />
                          ))}
                        </div>
                      </div>
                      <p className={`text-[11px] line-clamp-2 italic ${isDark ? 'text-stone-300' : 'text-stone-600'}`}>
                        "{rev.comment}"
                      </p>
                      <div className="text-[10px] text-stone-400 mt-1.5 flex items-center justify-between">
                        <span>{rev.company}</span>
                        <span>{rev.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 1: MY PROFESSIONAL PROFILE */}
        {/* ========================================================================= */}
        {effectiveActiveTab === 'contractor-profile' && (
          <div className="max-w-6xl mx-auto space-y-8 pb-16">
            {/* Header with Title & Quick Actions */}
            <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b ${
              isDark ? 'border-stone-800/60' : 'border-stone-200'
            }`}>
              <div>
                <h2 className={`font-institutional text-2xl sm:text-3xl font-bold tracking-tight ${
                  isDark ? 'text-white' : 'text-[#0B111E]'
                }`}>
                    My Professional Profile
                  </h2>
                  <p className={`text-xs sm:text-sm mt-1 ${isDark ? 'text-stone-400' : 'text-stone-600'}`}>
                    Verified contractor credentials, regulatory compliance records, and public trust verification.
                  </p>
                </div>

                <div className="flex items-center gap-2.5 flex-wrap">
                  <button
                    onClick={() => {
                      showToast('Verified Capability Statement (PDF) generated and watermarked.');
                    }}
                    className={`px-3 py-2 rounded-lg text-xs font-medium border flex items-center gap-1.5 transition-colors cursor-pointer ${
                      isDark ? 'border-stone-700 bg-stone-800 text-stone-200 hover:bg-stone-700' : 'border-stone-300 bg-white text-stone-800 hover:bg-stone-50'
                    }`}
                  >
                    <Download className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>Export Dossier (PDF)</span>
                  </button>

                  <button
                    onClick={() => setProfileEditOpen(true)}
                    className="px-3.5 py-2 rounded-lg text-xs font-semibold bg-[#C5A059] hover:bg-[#B89047] text-[#0B111E] flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5" />
                    <span>Edit Profile & Rates</span>
                  </button>
                </div>
              </div>

              {/* Verified Identity Card */}
              <div className={`p-6 rounded-xl border relative overflow-hidden ${
                isDark ? 'bg-[#0E1524] border-stone-800' : 'bg-white border-stone-200 shadow-sm'
              }`}>
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#C5A059] via-[#A88238] to-[#6E5016] flex items-center justify-center text-white font-institutional font-bold text-2xl shadow-md shrink-0">
                      KS
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className={`font-institutional text-xl font-bold ${isDark ? 'text-white' : 'text-stone-900'}`}>
                          Kagiso Sithole
                        </h3>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-mono-code">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>VID VERIFIED</span>
                        </span>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-[#C5A059]/15 text-[#DFB76C] border border-[#C5A059]/30 font-mono-code">
                          <ShieldCheck className="w-3 h-3" />
                          <span>TIER 1 SPECIALIST</span>
                        </span>
                      </div>

                      <p className={`text-sm font-medium ${isDark ? 'text-stone-300' : 'text-stone-700'}`}>
                        {professionalTitle}
                      </p>

                      <p className="text-xs text-stone-400">
                        Trading as <strong className="text-stone-300">Sithole Advisory & Technical Architecture</strong> • CIPC Reg: 2021/894021/07
                      </p>

                      <div className="flex items-center gap-3 pt-2 text-xs text-stone-400 font-mono-code flex-wrap">
                        <span>VID: VID-ZA-880524-KAG</span>
                        <span>•</span>
                        <span>SARS PIN: TC-99201-2026-VAL</span>
                        <span>•</span>
                        <span className="text-emerald-400">FICA Verified</span>
                      </div>
                    </div>
                  </div>

                  {/* Availability & Rate Card */}
                  <div className={`p-4 rounded-lg border shrink-0 text-right md:min-w-[240px] ${
                    isDark ? 'bg-[#090E17] border-stone-800/80' : 'bg-stone-50 border-stone-200'
                  }`}>
                    <div className="text-[10px] font-mono-code uppercase text-[#C5A059] font-bold">Standard Institutional Rates</div>
                    <div className="text-lg font-bold text-stone-200 mt-0.5">
                      R{hourlyRate.toLocaleString()} <span className="text-xs text-stone-400 font-normal">/ hr</span>
                    </div>
                    <div className="text-xs text-stone-400">
                      R{dayRate.toLocaleString()} / day (excl. VAT)
                    </div>
                    <div className="mt-2 pt-2 border-t border-stone-800 text-[11px] text-emerald-400 flex items-center justify-end gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>{availabilityStatus}</span>
                    </div>
                  </div>
                </div>

                {/* 4 Compliance Pillars */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 mt-6 border-t border-stone-800/60 text-xs">
                  <div className={`p-3 rounded-lg border ${isDark ? 'bg-stone-900/40 border-stone-800' : 'bg-stone-50 border-stone-200'}`}>
                    <div className="text-stone-400 text-[10px] uppercase font-mono-code">B-BBEE Status</div>
                    <div className="font-bold text-[#C5A059] mt-0.5">Level 1 Contributor</div>
                    <div className="text-[10px] text-stone-400">135% Procurement Recog.</div>
                  </div>

                  <div className={`p-3 rounded-lg border ${isDark ? 'bg-stone-900/40 border-stone-800' : 'bg-stone-50 border-stone-200'}`}>
                    <div className="text-stone-400 text-[10px] uppercase font-mono-code">Tax Compliance</div>
                    <div className="font-bold text-emerald-400 mt-0.5">Good Standing (PIN Active)</div>
                    <div className="text-[10px] text-stone-400">SARS Verified to Nov 2026</div>
                  </div>

                  <div className={`p-3 rounded-lg border ${isDark ? 'bg-stone-900/40 border-stone-800' : 'bg-stone-50 border-stone-200'}`}>
                    <div className="text-stone-400 text-[10px] uppercase font-mono-code">POPIA Operator</div>
                    <div className="font-bold text-sky-400 mt-0.5">Certified Responsible Party</div>
                    <div className="text-[10px] text-stone-400">Section 19 Security Assured</div>
                  </div>

                  <div className={`p-3 rounded-lg border ${isDark ? 'bg-stone-900/40 border-stone-800' : 'bg-stone-50 border-stone-200'}`}>
                    <div className="text-stone-400 text-[10px] uppercase font-mono-code">Professional Indemnity</div>
                    <div className="font-bold text-purple-400 mt-0.5">R10,000,000 Cover</div>
                    <div className="text-[10px] text-stone-400">Santam Special Risk Policy</div>
                  </div>
                </div>
              </div>

              {/* Skills & Capability Matrix */}
              <div className={`p-6 rounded-xl border space-y-4 ${
                isDark ? 'bg-[#0E1524] border-stone-800' : 'bg-white border-stone-200 shadow-sm'
              }`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className={`font-institutional text-base font-bold ${isDark ? 'text-white' : 'text-stone-900'}`}>
                      Verified Skills & Architecture Domains
                    </h3>
                    <p className="text-xs text-stone-400">
                      Evaluated through real milestone deliveries and client confirmations.
                    </p>
                  </div>
                  <span className="text-xs font-mono-code text-[#C5A059]">100% Verified Track Record</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  {[
                    { name: 'Distributed Enterprise Systems Architecture', years: 12, projects: 48, verifiedBy: 'Vanguard, Discovery Health', score: 99 },
                    { name: 'Zero-Trust Security & FICA Isolation', years: 9, projects: 34, verifiedBy: 'Standard Bank, Impala Energy', score: 98 },
                    { name: 'POPIA Information Officer Governance Protocols', years: 7, projects: 29, verifiedBy: 'ETES Regulatory Authority', score: 97 },
                    { name: 'Financial Modeling, Smart Escrow & Audit Logs', years: 6, projects: 22, verifiedBy: 'Aegis Capital, Investec', score: 96 }
                  ].map((skill, i) => (
                    <div
                      key={i}
                      className={`p-4 rounded-lg border space-y-2 ${
                        isDark ? 'bg-[#090E17] border-stone-800/80' : 'bg-stone-50 border-stone-200'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-semibold text-xs text-stone-200">{skill.name}</span>
                        <span className="text-xs font-mono-code text-[#C5A059] font-bold">{skill.score}%</span>
                      </div>
                      <div className="w-full bg-stone-700/40 rounded-full h-1.5">
                        <div className="bg-[#C5A059] h-1.5 rounded-full" style={{ width: `${skill.score}%` }} />
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-stone-400 pt-1">
                        <span>{skill.years} yrs experience • {skill.projects} deliveries</span>
                        <span className="text-stone-400">Vetted by: {skill.verifiedBy}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Downloadable Standard Contracts & Verification Assets */}
              <div className={`p-6 rounded-xl border space-y-4 ${
                isDark ? 'bg-[#0E1524] border-stone-800' : 'bg-white border-stone-200 shadow-sm'
              }`}>
                <h3 className={`font-institutional text-base font-bold ${isDark ? 'text-white' : 'text-stone-900'}`}>
                  Contractual Governance & Standard Addenda
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  {[
                    { title: 'Standard ETES Independent SOW v2026', size: '240 KB', desc: 'Pre-vetted milestone schedule and escrow release structure.' },
                    { title: 'Mutual Non-Disclosure Agreement (NDA)', size: '180 KB', desc: 'Institutional reciprocal confidentiality under King IV principles.' },
                    { title: 'SARS Tax Clearance Certificate (PDF)', size: '420 KB', desc: 'Authentic cryptographically signed SARS PIN confirmation.' }
                  ].map((doc, idx) => (
                    <div
                      key={idx}
                      className={`p-4 rounded-lg border flex flex-col justify-between gap-3 ${
                        isDark ? 'bg-[#090E17] border-stone-800/80' : 'bg-stone-50 border-stone-200'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 font-semibold text-stone-200">
                          <FileText className="w-4 h-4 text-[#C5A059]" />
                          <span>{doc.title}</span>
                        </div>
                        <p className="text-[11px] text-stone-400">{doc.desc}</p>
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t border-stone-800">
                        <span className="text-[10px] font-mono-code text-stone-400">{doc.size}</span>
                        <button
                          onClick={() => showToast(`Downloaded: ${doc.title}`)}
                          className="text-xs font-semibold text-[#C5A059] hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Download</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 2: ACTIVE ENGAGEMENTS */}
          {/* ========================================================================= */}
          {effectiveActiveTab === 'contractor-engagements' && (
            <div className="max-w-6xl mx-auto space-y-8 pb-16">
              <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b ${
                isDark ? 'border-stone-800/60' : 'border-stone-200'
              }`}>
                <div>
                  <h2 className={`font-institutional text-2xl sm:text-3xl font-bold tracking-tight ${
                    isDark ? 'text-white' : 'text-[#0B111E]'
                  }`}>
                    Active Engagements
                  </h2>
                  <p className={`text-xs sm:text-sm mt-1 ${isDark ? 'text-stone-400' : 'text-stone-600'}`}>
                    Active corporate contracts, milestone roadmaps, deliverable tracking, and time logging.
                  </p>
                </div>

                <div className="flex items-center gap-2.5">
                  <button
                    onClick={() => {
                      setSelectedEngagementForDeliverable(engagements[0]);
                    }}
                    className="px-3.5 py-2 rounded-lg text-xs font-semibold bg-[#C5A059] hover:bg-[#B89047] text-[#0B111E] flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Submit Deliverable</span>
                  </button>
                </div>
              </div>

              {/* Engagement Summary Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className={`p-4 sm:p-5 rounded-xl border transition-all ${isDark ? 'bg-[#0E1524] border-stone-800' : 'bg-white border-stone-200 shadow-xs'}`}>
                  <div className="text-[10px] font-mono-code uppercase text-[#C5A059] font-bold">Active Contracts</div>
                  <div className={`text-2xl font-bold mt-1 ${isDark ? 'text-white' : 'text-[#0B111E]'}`}>3 Corporate</div>
                  <div className="text-xs text-stone-400 mt-0.5">100% SLA On Schedule</div>
                </div>

                <div className={`p-4 sm:p-5 rounded-xl border transition-all ${isDark ? 'bg-[#0E1524] border-stone-800' : 'bg-white border-stone-200 shadow-xs'}`}>
                  <div className="text-[10px] font-mono-code uppercase text-[#C5A059] font-bold">Total Committed Value</div>
                  <div className="text-2xl font-bold text-[#DFB76C] mt-1">R520,000</div>
                  <div className="text-xs text-stone-400 mt-0.5">R280,000 Protected in Escrow</div>
                </div>

                <div className={`p-4 sm:p-5 rounded-xl border transition-all ${isDark ? 'bg-[#0E1524] border-stone-800' : 'bg-white border-stone-200 shadow-xs'}`}>
                  <div className="text-[10px] font-mono-code uppercase text-[#C5A059] font-bold">Hours This Month</div>
                  <div className={`text-2xl font-bold mt-1 ${isDark ? 'text-white' : 'text-[#0B111E]'}`}>77.0 hrs</div>
                  <div className="text-xs text-stone-400 mt-0.5">Across 3 client accounts</div>
                </div>

                <div className={`p-4 sm:p-5 rounded-xl border transition-all ${isDark ? 'bg-[#0E1524] border-stone-800' : 'bg-white border-stone-200 shadow-xs'}`}>
                  <div className="text-[10px] font-mono-code uppercase text-[#C5A059] font-bold">Next Milestone Due</div>
                  <div className="text-2xl font-bold text-emerald-400 mt-1">Sep 22</div>
                  <div className="text-xs text-stone-400 mt-0.5">DSAR Audit (90% complete)</div>
                </div>
              </div>

              {/* Engagement Cards List */}
              <div className="space-y-6">
                {engagements.map(eng => (
                  <div
                    key={eng.id}
                    className={`p-6 rounded-xl border space-y-5 transition-all ${
                      isDark ? 'bg-[#0E1524] border-stone-800 hover:border-stone-700' : 'bg-white border-stone-200 shadow-sm'
                    }`}
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-stone-800/60">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono-code text-[#C5A059] font-bold">{eng.contractRef}</span>
                          <span className="text-xs text-stone-400">•</span>
                          <span className="text-xs font-medium text-stone-300">{eng.client}</span>
                        </div>
                        <h3 className={`font-institutional text-lg font-bold mt-1 ${isDark ? 'text-white' : 'text-stone-900'}`}>
                          {eng.title}
                        </h3>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                          Active & Guaranteed
                        </span>
                        <button
                          onClick={() => setSelectedEngagementForDeliverable(eng)}
                          className="px-3 py-1.5 rounded-md text-xs font-semibold bg-[#C5A059] hover:bg-[#B89047] text-[#0B111E] transition-colors cursor-pointer"
                        >
                          Submit Work
                        </button>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                      {eng.scope}
                    </p>

                    {/* Milestone Progress Bar */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-medium text-stone-200">
                          Current Stage: <strong className="text-[#C5A059]">{eng.currentMilestone}</strong>
                        </span>
                        <span className="font-mono-code text-stone-400">
                          Due: {eng.milestoneDue} ({eng.milestoneProgress}%)
                        </span>
                      </div>
                      <div className="w-full bg-stone-700/40 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-[#C5A059] to-emerald-400 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${eng.milestoneProgress}%` }}
                        />
                      </div>
                    </div>

                    {/* Deliverables Checklist */}
                    <div className="space-y-2 pt-2">
                      <div className="text-xs font-mono-code uppercase text-[#C5A059] font-bold">Deliverable Milestones</div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        {eng.deliverables.map((del, dIdx) => (
                          <div
                            key={dIdx}
                            className={`p-2.5 rounded-lg border flex items-center justify-between gap-2 ${
                              del.status === 'completed'
                                ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-300'
                                : del.status === 'in_progress'
                                  ? 'bg-[#C5A059]/5 border-[#C5A059]/20 text-[#DFB76C]'
                                  : isDark ? 'bg-stone-900/30 border-stone-800 text-stone-400' : 'bg-stone-50 border-stone-200 text-stone-500'
                            }`}
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              {del.status === 'completed' ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                              ) : del.status === 'in_progress' ? (
                                <Clock className="w-4 h-4 text-[#C5A059] shrink-0" />
                              ) : (
                                <AlertCircle className="w-4 h-4 text-stone-400 shrink-0" />
                              )}
                              <span className="truncate">{del.name}</span>
                            </div>
                            <span className="text-[10px] uppercase font-mono-code shrink-0">
                              {del.status.replace('_', ' ')}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Financial Escrow Breakdown */}
                    <div className={`flex flex-wrap items-center justify-between gap-4 pt-3.5 border-t text-xs font-mono-code ${
                      isDark ? 'border-stone-800 text-stone-400' : 'border-stone-200 text-stone-600'
                    }`}>
                      <div className="flex items-center gap-4">
                        <span>Total: <strong className={isDark ? 'text-white' : 'text-stone-900'}>R{eng.totalValue.toLocaleString()}</strong></span>
                        <span>Escrow: <strong className="text-[#C5A059]">R{eng.escrowProtected.toLocaleString()}</strong></span>
                        <span>Paid: <strong className="text-emerald-500 font-bold">R{eng.releasedToDate.toLocaleString()}</strong></span>
                      </div>
                      <div>
                        Logged: <strong className={isDark ? 'text-white' : 'text-stone-900'}>{eng.hoursLogged} hrs</strong> / {eng.maxHours} hrs budgeted
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 3: PAYMENT & RELIABILITY TRUST */}
          {/* ========================================================================= */}
          {effectiveActiveTab === 'contractor-trust' && (
            <div className="max-w-6xl mx-auto space-y-8 pb-16">
              <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b ${
                isDark ? 'border-stone-800/60' : 'border-stone-200'
              }`}>
                <div>
                  <h2 className={`font-institutional text-2xl sm:text-3xl font-bold tracking-tight ${
                    isDark ? 'text-white' : 'text-[#0B111E]'
                  }`}>
                    Payment & Reliability Trust
                  </h2>
                  <p className={`text-xs sm:text-sm mt-1 ${isDark ? 'text-stone-400' : 'text-stone-600'}`}>
                    Institutional Escrow Protection, Standard Bank Trust Account settlement, and verified reliability rating.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#C5A059]/15 text-[#DFB76C] border border-[#C5A059]/30 font-mono-code">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>ETES GUARANTEED ESCROW</span>
                  </span>
                </div>
              </div>

              {/* Master Reliability Scorecard */}
              <div className={`p-6 rounded-xl border relative overflow-hidden ${
                isDark ? 'bg-[#0E1524] border-stone-800' : 'bg-white border-stone-200 shadow-sm'
              }`}>
                <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                  <div className="space-y-2 text-center lg:text-left">
                    <span className="text-[10px] font-mono-code uppercase tracking-wider text-[#C5A059] font-bold">
                      Institutional Reliability Index
                    </span>
                    <div className="flex items-baseline justify-center lg:justify-start gap-2">
                      <span className={`text-4xl sm:text-5xl font-institutional font-bold ${isDark ? 'text-white' : 'text-[#0B111E]'}`}>98.4</span>
                      <span className="text-xl text-stone-400">/ 100</span>
                      <span className="ml-2 text-xs font-semibold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        EXCEPTIONAL (TIER 1)
                      </span>
                    </div>
                    <p className={`text-xs max-w-xl ${isDark ? 'text-stone-400' : 'text-stone-600'}`}>
                      Derived algorithmically from 38 consecutive verified milestones, 100% on-time delivery rate, zero disputes, and automated escrow clearances across Vanguard, Impala, and Discovery Health.
                    </p>
                  </div>

                  {/* 3 Core Trust Ratios */}
                  <div className="grid grid-cols-3 gap-3 w-full lg:w-auto text-center shrink-0">
                    <div className={`p-3 rounded-lg border ${isDark ? 'bg-stone-900/60 border-stone-800' : 'bg-stone-50 border-stone-200'}`}>
                      <div className="text-lg font-bold text-emerald-400 font-mono-code">99.2%</div>
                      <div className="text-[10px] text-stone-400 uppercase">On-Time Release</div>
                    </div>
                    <div className={`p-3 rounded-lg border ${isDark ? 'bg-stone-900/60 border-stone-800' : 'bg-stone-50 border-stone-200'}`}>
                      <div className="text-lg font-bold text-[#C5A059] font-mono-code">0.0%</div>
                      <div className="text-[10px] text-stone-400 uppercase">Dispute Rate</div>
                    </div>
                    <div className={`p-3 rounded-lg border ${isDark ? 'bg-stone-900/60 border-stone-800' : 'bg-stone-50 border-stone-200'}`}>
                      <div className={`text-lg font-bold font-mono-code ${isDark ? 'text-white' : 'text-[#0B111E]'}`}>4.2 Days</div>
                      <div className="text-[10px] text-stone-400 uppercase">Avg Clearance</div>
                    </div>
                  </div>
                </div>

                {/* Escrow Financial Summary */}
                <div className={`grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 mt-6 border-t text-xs ${
                  isDark ? 'border-stone-800/60' : 'border-stone-200'
                }`}>
                  <div className={`p-4 rounded-lg border ${isDark ? 'bg-[#090E17] border-stone-800' : 'bg-stone-50 border-stone-200'}`}>
                    <div className="text-stone-400 text-[10px] uppercase font-mono-code">Currently in Escrow Protection</div>
                    <div className="text-xl font-bold text-[#DFB76C] mt-1 font-mono-code">R280,000</div>
                    <div className="text-[10px] text-stone-400 mt-0.5">Guaranteed by Standard Bank Custodial Trust</div>
                  </div>

                  <div className={`p-4 rounded-lg border ${isDark ? 'bg-[#090E17] border-stone-800' : 'bg-stone-50 border-stone-200'}`}>
                    <div className="text-stone-400 text-[10px] uppercase font-mono-code">Settled Past 12 Months</div>
                    <div className="text-xl font-bold text-emerald-400 mt-1 font-mono-code">R1,240,000</div>
                    <div className="text-[10px] text-stone-400 mt-0.5">14 completed institutional milestones</div>
                  </div>

                  <div className={`p-4 rounded-lg border ${isDark ? 'bg-[#090E17] border-stone-800' : 'bg-stone-50 border-stone-200'}`}>
                    <div className="text-stone-400 text-[10px] uppercase font-mono-code">Pending Client Sign-off</div>
                    <div className={`text-xl font-bold mt-1 font-mono-code ${isDark ? 'text-white' : 'text-[#0B111E]'}`}>R45,000</div>
                    <div className="text-[10px] text-stone-400 mt-0.5">Discovery Health DSAR milestone</div>
                  </div>
                </div>
              </div>

              {/* Invoice & Escrow Ledger Table */}
              <div className={`p-6 rounded-xl border space-y-4 ${
                isDark ? 'bg-[#0E1524] border-stone-800' : 'bg-white border-stone-200 shadow-sm'
              }`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className={`font-institutional text-base font-bold ${isDark ? 'text-white' : 'text-stone-900'}`}>
                      Invoices & Escrow Milestone Ledger
                    </h3>
                    <p className="text-xs text-stone-400">
                      Tax invoices generated and settled under SARS E-Invoicing requirements.
                    </p>
                  </div>
                  <button
                    onClick={() => showToast('Full SARS Tax Ledger Exported as CSV.')}
                    className="text-xs font-semibold text-[#C5A059] hover:underline flex items-center gap-1 cursor-pointer self-start sm:self-auto"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export Tax Ledger (CSV)</span>
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-stone-800 text-stone-400 font-mono-code uppercase text-[10px]">
                        <th className="py-2.5 px-3">Invoice #</th>
                        <th className="py-2.5 px-3">Client & Engagement</th>
                        <th className="py-2.5 px-3">Milestone Description</th>
                        <th className="py-2.5 px-3">Amount</th>
                        <th className="py-2.5 px-3">Status</th>
                        <th className="py-2.5 px-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-800/50">
                      {invoices.map(inv => (
                        <tr key={inv.id} className="hover:bg-stone-800/20 transition-colors">
                          <td className="py-3 px-3 font-mono-code font-semibold text-stone-200">
                            {inv.invoiceNumber}
                          </td>
                          <td className="py-3 px-3">
                            <div className="font-medium text-stone-300">{inv.client}</div>
                            <div className="text-[10px] text-stone-400 font-mono-code">{inv.contractRef}</div>
                          </td>
                          <td className="py-3 px-3 text-stone-300 max-w-xs truncate">
                            {inv.milestoneName}
                          </td>
                          <td className="py-3 px-3 font-mono-code font-bold text-stone-200">
                            R{inv.amount.toLocaleString()}
                          </td>
                          <td className="py-3 px-3">
                            {inv.status === 'paid' && (
                              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                                Settled & Paid
                              </span>
                            )}
                            {inv.status === 'in_escrow' && (
                              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#C5A059]/15 text-[#DFB76C] border border-[#C5A059]/30">
                                Protected in Escrow
                              </span>
                            )}
                            {inv.status === 'client_review' && (
                              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-sky-500/15 text-sky-400 border border-sky-500/30">
                                Milestone In Review
                              </span>
                            )}
                          </td>
                          <td className="py-3 px-3 text-right">
                            <button
                              onClick={() => showToast(`Downloaded Tax Receipt for ${inv.invoiceNumber}`)}
                              className="text-stone-400 hover:text-[#C5A059] transition-colors p-1 cursor-pointer"
                              title="Download Tax Receipt"
                            >
                              <Download className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Bank Verification & Escrow Guarantee Box */}
              <div className={`p-5 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                isDark ? 'bg-[#090E17] border-stone-800' : 'bg-stone-50 border-stone-200'
              }`}>
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <div className="text-xs font-semibold text-stone-200">
                      Standard Bank Corporate Custodial Trust Account (Account ending in ...8042)
                    </div>
                    <div className="text-[11px] text-stone-400">
                      All contractor payments are legally isolated under Section 37 of the Financial Advisory and Intermediary Services (FAIS) framework.
                    </div>
                  </div>
                </div>
                <span className="text-[10px] font-mono-code text-emerald-400 uppercase font-semibold px-2 py-1 rounded bg-emerald-500/10 border border-emerald-500/30 shrink-0">
                  FICA Compliant
                </span>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 4: RELATIONSHIP & REVIEWS */}
          {/* ========================================================================= */}
          {effectiveActiveTab === 'contractor-reviews' && (
            <div className="max-w-6xl mx-auto space-y-8 pb-16">
              <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b ${
                isDark ? 'border-stone-800/60' : 'border-stone-200'
              }`}>
                <div>
                  <h2 className={`font-institutional text-2xl sm:text-3xl font-bold tracking-tight ${
                    isDark ? 'text-white' : 'text-[#0B111E]'
                  }`}>
                    Relationship & Reviews
                  </h2>
                  <p className={`text-xs sm:text-sm mt-1 ${isDark ? 'text-stone-400' : 'text-stone-600'}`}>
                    Verified enterprise testimonials, performance ratings, and client evaluation dimensions.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setReviewRequestOpen(true)}
                    className="px-3.5 py-2 rounded-lg text-xs font-semibold bg-[#C5A059] hover:bg-[#B89047] text-[#0B111E] flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Request Verified Review</span>
                  </button>
                </div>
              </div>

              {/* Overall Ratings Aggregate */}
              <div className={`p-6 rounded-xl border relative overflow-hidden ${
                isDark ? 'bg-[#0E1524] border-stone-800' : 'bg-white border-stone-200 shadow-sm'
              }`}>
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="space-y-2 text-center md:text-left">
                    <span className="text-[10px] font-mono-code uppercase tracking-wider text-[#C5A059] font-bold">
                      Enterprise Trust Rating
                    </span>
                    <div className="flex items-center justify-center md:justify-start gap-3">
                      <span className={`text-4xl sm:text-5xl font-institutional font-bold ${isDark ? 'text-white' : 'text-[#0B111E]'}`}>4.94</span>
                      <div className="text-left">
                        <div className="flex items-center text-[#C5A059]">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-current" />
                          ))}
                        </div>
                        <div className="text-xs text-stone-400 mt-0.5">Based on 18 corporate projects</div>
                      </div>
                    </div>
                  </div>

                  {/* 4 Performance Dimensions */}
                  <div className="grid grid-cols-2 gap-3 w-full md:w-auto text-xs shrink-0">
                    <div className={`p-3 rounded-lg border ${isDark ? 'bg-stone-900/60 border-stone-800' : 'bg-stone-50 border-stone-200'}`}>
                      <div className="text-stone-400 text-[10px]">Technical Mastery</div>
                      <div className={`font-bold font-mono-code text-sm ${isDark ? 'text-stone-200' : 'text-stone-900'}`}>4.95 / 5.0</div>
                    </div>
                    <div className={`p-3 rounded-lg border ${isDark ? 'bg-stone-900/60 border-stone-800' : 'bg-stone-50 border-stone-200'}`}>
                      <div className="text-stone-400 text-[10px]">Communication</div>
                      <div className={`font-bold font-mono-code text-sm ${isDark ? 'text-stone-200' : 'text-stone-900'}`}>4.90 / 5.0</div>
                    </div>
                    <div className={`p-3 rounded-lg border ${isDark ? 'bg-stone-900/60 border-stone-800' : 'bg-stone-50 border-stone-200'}`}>
                      <div className="text-stone-400 text-[10px]">Milestone Fidelity</div>
                      <div className={`font-bold font-mono-code text-sm ${isDark ? 'text-stone-200' : 'text-stone-900'}`}>5.00 / 5.0</div>
                    </div>
                    <div className={`p-3 rounded-lg border ${isDark ? 'bg-stone-900/60 border-stone-800' : 'bg-stone-50 border-stone-200'}`}>
                      <div className="text-stone-400 text-[10px]">Trust & Ethics (King IV)</div>
                      <div className={`font-bold font-mono-code text-sm ${isDark ? 'text-stone-200' : 'text-stone-900'}`}>4.98 / 5.0</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Verified Testimonials List */}
              <div className="space-y-4">
                <h3 className={`font-institutional text-base font-bold ${isDark ? 'text-white' : 'text-stone-900'}`}>
                  Verified Client Testimonials
                </h3>

                {reviews.map(rev => (
                  <div
                    key={rev.id}
                    className={`p-6 rounded-xl border space-y-4 ${
                      isDark ? 'bg-[#0E1524] border-stone-800' : 'bg-white border-stone-200 shadow-sm'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#C5A059]/20 text-[#DFB76C] font-bold flex items-center justify-center text-sm border border-[#C5A059]/40">
                          {rev.clientName.charAt(0)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className={`font-bold text-sm ${isDark ? 'text-stone-200' : 'text-stone-900'}`}>{rev.clientName}</h4>
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-mono-code flex items-center gap-1">
                              <Check className="w-2.5 h-2.5" />
                              <span>VERIFIED CLIENT</span>
                            </span>
                          </div>
                          <div className="text-xs text-stone-400">
                            {rev.clientRole} • <strong className={isDark ? 'text-stone-300' : 'text-stone-700'}>{rev.company}</strong>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-xs font-mono-code text-stone-400">
                        <div className="flex items-center text-[#C5A059]">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-current" />
                          ))}
                        </div>
                        <span>{rev.date}</span>
                      </div>
                    </div>

                    <p className={`text-xs sm:text-sm italic leading-relaxed pl-3 border-l-2 border-[#C5A059] ${
                      isDark ? 'text-stone-300' : 'text-stone-700'
                    }`}>
                      "{rev.comment}"
                    </p>

                    <div className="flex items-center justify-between pt-2 border-t border-stone-800 text-[11px] text-stone-400 font-mono-code">
                      <span>Ref: {rev.engagementRef}</span>
                      <span className="text-emerald-400">Milestone Settled & Cryptographically Verified</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 5: PARTICIPATION & GROWTH */}
          {/* ========================================================================= */}
          {effectiveActiveTab === 'contractor-growth' && (
            <div className="max-w-6xl mx-auto space-y-8 pb-16">
              <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b ${
                isDark ? 'border-stone-800/60' : 'border-stone-200'
              }`}>
                <div>
                  <h2 className={`font-institutional text-2xl sm:text-3xl font-bold tracking-tight ${
                    isDark ? 'text-white' : 'text-[#0B111E]'
                  }`}>
                    Participation & Growth
                  </h2>
                  <p className={`text-xs sm:text-sm mt-1 ${isDark ? 'text-stone-400' : 'text-stone-600'}`}>
                    Consortium co-bidding on high-value tenders, professional accreditations, and community contributions.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#C5A059]/15 text-[#DFB76C] border border-[#C5A059]/30 font-mono-code">
                    <Award className="w-3.5 h-3.5" />
                    <span>LEVEL 4 MASTER CONTRIBUTOR</span>
                  </span>
                </div>
              </div>

              {/* Consortium Co-Bidding Opportunities */}
              <div className={`p-6 rounded-xl border space-y-4 ${
                isDark ? 'bg-[#0E1524] border-stone-800' : 'bg-white border-stone-200 shadow-sm'
              }`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className={`font-institutional text-base font-bold ${isDark ? 'text-white' : 'text-stone-900'}`}>
                      Consortium Co-Bidding Opportunities
                    </h3>
                    <p className="text-xs text-stone-400">
                      Team up with other ETES verified specialists to pitch for multi-million Rand enterprise and municipal RFPs.
                    </p>
                  </div>
                  <span className="text-xs font-mono-code text-[#C5A059]">Escrow Backed</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  {[
                    {
                      id: 'con-rfp-1',
                      title: 'Gauteng Provincial Health Digitization RFP',
                      budget: 'R6,500,000',
                      roleNeeded: 'Lead Enterprise Systems Architect',
                      deadline: '2026-10-15',
                      consortiumLead: 'Khanyisa Tech Consortium',
                      description: 'Comprehensive modern health registry digitization across 24 regional clinic hubs. Requires King IV data governance and POPIA architecture.'
                    },
                    {
                      id: 'con-rfp-2',
                      title: 'SADC Regional Clean Energy Trust Audit',
                      budget: 'R12,000,000',
                      roleNeeded: 'Senior IoT Telemetry & Crypto Auditor',
                      deadline: '2026-11-01',
                      consortiumLead: 'Aegis Africa Energy Partners',
                      description: 'Regional solar and wind micro-grid telemetry certification and carbon credit tokenization across South Africa and Namibia.'
                    }
                  ].map(rfp => {
                    const isExpressed = expressedConsortiumIds.includes(rfp.id);
                    return (
                      <div
                        key={rfp.id}
                        className={`p-5 rounded-lg border flex flex-col justify-between gap-4 ${
                          isDark ? 'bg-[#090E17] border-stone-800/80' : 'bg-stone-50 border-stone-200'
                        }`}
                      >
                        <div className="space-y-2">
                          <div className="flex items-start justify-between gap-2">
                            <span className={`text-xs font-bold ${isDark ? 'text-stone-200' : 'text-stone-900'}`}>{rfp.title}</span>
                            <span className="font-mono-code font-bold text-[#C5A059] text-xs shrink-0">{rfp.budget}</span>
                          </div>
                          <p className={`text-xs ${isDark ? 'text-stone-400' : 'text-stone-600'}`}>{rfp.description}</p>
                          <div className={`text-[11px] font-medium ${isDark ? 'text-stone-300' : 'text-stone-700'}`}>
                            Seeking: <span className="text-[#DFB76C] font-semibold">{rfp.roleNeeded}</span>
                          </div>
                          <div className="text-[10px] text-stone-400 font-mono-code">
                            Lead: {rfp.consortiumLead} • Deadline: {rfp.deadline}
                          </div>
                        </div>

                        <button
                          onClick={() => handleToggleConsortiumInterest(rfp.id, rfp.title)}
                          className={`w-full py-2 rounded-md text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                            isExpressed
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/30'
                              : 'bg-[#C5A059] hover:bg-[#B89047] text-[#0B111E]'
                          }`}
                        >
                          {isExpressed ? (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Interest Expressed (Dossier Sent)</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-3.5 h-3.5" />
                              <span>Express Interest / Join Consortium</span>
                            </>
                          )}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Accreditations & Continuous Development */}
              <div className={`p-6 rounded-xl border space-y-4 ${
                isDark ? 'bg-[#0E1524] border-stone-800' : 'bg-white border-stone-200 shadow-sm'
              }`}>
                <h3 className={`font-institutional text-base font-bold ${isDark ? 'text-white' : 'text-stone-900'}`}>
                  Accredited Professional Certifications (CPD)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  {[
                    { title: 'King IV Governance for Independent Advisors', status: 'Certified', date: 'Jul 2026', badge: '100% Score' },
                    { title: 'POPIA Information Security Operator Master', status: 'Certified', date: 'Jun 2026', badge: 'Accredited' },
                    { title: 'Zero-Trust Architecture on Cloud Enclaves', status: 'In Progress (85%)', date: 'Due Oct 2026', badge: 'Active Study' }
                  ].map((cert, idx) => (
                    <div
                      key={idx}
                      className={`p-4 rounded-lg border space-y-2 ${
                        isDark ? 'bg-[#090E17] border-stone-800/80' : 'bg-stone-50 border-stone-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <Award className="w-4 h-4 text-[#C5A059]" />
                        <span className="text-[10px] font-mono-code px-1.5 py-0.5 rounded bg-[#C5A059]/20 text-[#DFB76C]">
                          {cert.badge}
                        </span>
                      </div>
                      <div className={`font-semibold ${isDark ? 'text-stone-200' : 'text-stone-900'}`}>{cert.title}</div>
                      <div className="text-[11px] text-stone-400">{cert.status} • {cert.date}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>

      {/* ========================================================================= */}
      {/* MODAL 1: SUBMIT DELIVERABLE */}
      {/* ========================================================================= */}
      {selectedEngagementForDeliverable && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs"
          onClick={() => setSelectedEngagementForDeliverable(null)}
        >
          <div
            className={`w-full max-w-lg rounded-xl border p-6 space-y-5 shadow-2xl transition-all ${
              isDark ? 'bg-[#0E1524] border-stone-800 text-stone-100' : 'bg-white border-stone-300 text-stone-900'
            }`}
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <div>
                <span className="text-[10px] font-mono-code uppercase text-[#C5A059] font-bold">
                  {selectedEngagementForDeliverable.contractRef}
                </span>
                <h3 className="font-institutional text-lg font-bold">Submit Milestone Deliverable</h3>
              </div>
              <button onClick={() => setSelectedEngagementForDeliverable(null)} className="p-1 text-stone-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitDeliverable} className="space-y-4 text-xs">
              <div>
                <label className="block text-stone-400 mb-1 font-medium">Client Account</label>
                <input
                  type="text"
                  disabled
                  value={selectedEngagementForDeliverable.client}
                  className="w-full px-3 py-2 rounded border border-stone-800 bg-stone-900 text-stone-300 font-mono-code"
                />
              </div>

              <div>
                <label className="block text-stone-300 mb-1 font-medium">Deliverable Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Architecture Security Review & Threat Model v2"
                  value={deliverableTitle}
                  onChange={e => setDeliverableTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded border border-stone-700 bg-stone-900/60 text-stone-100 focus:border-[#C5A059] outline-hidden"
                />
              </div>

              <div>
                <label className="block text-stone-300 mb-1 font-medium">Secure Artifact URL / Repository Link</label>
                <input
                  type="url"
                  placeholder="https://vault.etes.network/artifacts/..."
                  value={deliverableLink}
                  onChange={e => setDeliverableLink(e.target.value)}
                  className="w-full px-3 py-2 rounded border border-stone-700 bg-stone-900/60 text-stone-100 focus:border-[#C5A059] outline-hidden font-mono-code"
                />
              </div>

              <div>
                <label className="block text-stone-300 mb-1 font-medium">Executive Summary & Notes</label>
                <textarea
                  rows={3}
                  placeholder="Summarise key achievements, milestone readiness, and any client actions needed..."
                  value={deliverableNotes}
                  onChange={e => setDeliverableNotes(e.target.value)}
                  className="w-full px-3 py-2 rounded border border-stone-700 bg-stone-900/60 text-stone-100 focus:border-[#C5A059] outline-hidden"
                />
              </div>

              <div>
                <label className="block text-stone-300 mb-1 font-medium">Log Hours for this Milestone</label>
                <input
                  type="number"
                  min="0"
                  step="0.5"
                  value={hoursToLog}
                  onChange={e => setHoursToLog(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 rounded border border-stone-700 bg-stone-900/60 text-stone-100 focus:border-[#C5A059] outline-hidden font-mono-code"
                />
              </div>

              <div className="p-3 rounded bg-stone-900/80 border border-stone-800 text-[11px] text-stone-400 space-y-1">
                <div className="text-emerald-400 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Escrow Trigger Protection</span>
                </div>
                <p>
                  Upon submission, an automated cryptographic notice is dispatched to the client's procurement contact. Under ETES rules, sign-off or feedback is mandated within 5 business days.
                </p>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedEngagementForDeliverable(null)}
                  className="px-3 py-2 rounded text-stone-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded font-semibold bg-[#C5A059] hover:bg-[#B89047] text-[#0B111E] shadow-sm flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Confirm Submission</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: REQUEST VERIFIED REVIEW */}
      {/* ========================================================================= */}
      {reviewRequestOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs"
          onClick={() => {
            setReviewRequestOpen(false);
            setGeneratedReviewLink(null);
          }}
        >
          <div
            className={`w-full max-w-md rounded-xl border p-6 space-y-4 shadow-2xl ${
              isDark ? 'bg-[#0E1524] border-stone-800 text-stone-100' : 'bg-white border-stone-300 text-stone-900'
            }`}
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <h3 className="font-institutional text-base font-bold">Request Institutional Review</h3>
              <button
                onClick={() => {
                  setReviewRequestOpen(false);
                  setGeneratedReviewLink(null);
                }}
                className="p-1 text-stone-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {!generatedReviewLink ? (
              <form onSubmit={handleGenerateReviewLink} className="space-y-4 text-xs">
                <div>
                  <label className="block text-stone-300 mb-1 font-medium">Client Contact Corporate Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. director@vanguard-holdings.co.za"
                    value={reviewClientEmail}
                    onChange={e => setReviewClientEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded border border-stone-700 bg-stone-900/60 text-stone-100 focus:border-[#C5A059] outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-stone-300 mb-1 font-medium">Engagement Reference</label>
                  <select
                    value={reviewProjectRef}
                    onChange={e => setReviewProjectRef(e.target.value)}
                    className="w-full px-3 py-2 rounded border border-stone-700 bg-stone-900/60 text-stone-100 focus:border-[#C5A059] outline-hidden font-mono-code"
                  >
                    <option value="CON-2026-VFH-084">CON-2026-VFH-084 (Vanguard Financial Holdings)</option>
                    <option value="CON-2026-IES-019">CON-2026-IES-019 (Impala Energy Systems)</option>
                    <option value="CON-2026-DHC-042">CON-2026-DHC-042 (Discovery Health)</option>
                  </select>
                </div>

                <p className="text-[11px] text-stone-400 leading-relaxed">
                  Reviews requested via ETES require verified digital signatures from corporate client executives and directly feed your Workplace Trust Reliability Index.
                </p>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setReviewRequestOpen(false)}
                    className="px-3 py-2 rounded text-stone-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded font-semibold bg-[#C5A059] hover:bg-[#B89047] text-[#0B111E]"
                  >
                    Generate & Send
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-4 text-xs">
                <div className="p-3 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 space-y-1">
                  <div className="font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Review Invitation Generated!</span>
                  </div>
                  <p className="text-[11px] text-stone-400">
                    A secure tokenized link has been created for {reviewClientEmail}. You can also share the link directly:
                  </p>
                </div>

                <div className="p-2.5 rounded bg-stone-900 border border-stone-800 font-mono-code text-[11px] text-stone-300 break-all select-all">
                  {generatedReviewLink}
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleCopyReviewLink}
                    className="px-4 py-2 rounded font-semibold bg-[#C5A059] hover:bg-[#B89047] text-[#0B111E] flex items-center gap-1.5"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Link</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 3: EDIT PROFILE & RATES */}
      {/* ========================================================================= */}
      {profileEditOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs"
          onClick={() => setProfileEditOpen(false)}
        >
          <div
            className={`w-full max-w-md rounded-xl border p-6 space-y-4 shadow-2xl ${
              isDark ? 'bg-[#0E1524] border-stone-800 text-stone-100' : 'bg-white border-stone-300 text-stone-900'
            }`}
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <h3 className="font-institutional text-base font-bold">Edit Profile & Rate Parameters</h3>
              <button onClick={() => setProfileEditOpen(false)} className="p-1 text-stone-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={e => {
                e.preventDefault();
                setProfileEditOpen(false);
                showToast('Contractor profile and rate parameters updated successfully.');
              }}
              className="space-y-4 text-xs"
            >
              <div>
                <label className="block text-stone-300 mb-1 font-medium">Professional Title</label>
                <input
                  type="text"
                  value={professionalTitle}
                  onChange={e => setProfessionalTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded border border-stone-700 bg-stone-900/60 text-stone-100 focus:border-[#C5A059] outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-300 mb-1 font-medium">Hourly Rate (ZAR)</label>
                  <input
                    type="number"
                    value={hourlyRate}
                    onChange={e => setHourlyRate(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 rounded border border-stone-700 bg-stone-900/60 text-stone-100 focus:border-[#C5A059] outline-hidden font-mono-code"
                  />
                </div>
                <div>
                  <label className="block text-stone-300 mb-1 font-medium">Day Rate (ZAR)</label>
                  <input
                    type="number"
                    value={dayRate}
                    onChange={e => setDayRate(parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 rounded border border-stone-700 bg-stone-900/60 text-stone-100 focus:border-[#C5A059] outline-hidden font-mono-code"
                  />
                </div>
              </div>

              <div>
                <label className="block text-stone-300 mb-1 font-medium">Current Availability Status</label>
                <input
                  type="text"
                  value={availabilityStatus}
                  onChange={e => setAvailabilityStatus(e.target.value)}
                  className="w-full px-3 py-2 rounded border border-stone-700 bg-stone-900/60 text-stone-100 focus:border-[#C5A059] outline-hidden"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setProfileEditOpen(false)}
                  className="px-3 py-2 rounded text-stone-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded font-semibold bg-[#C5A059] hover:bg-[#B89047] text-[#0B111E]"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
