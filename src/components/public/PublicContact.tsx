import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { 
  Building2, 
  Mail, 
  MapPin, 
  Phone, 
  ShieldCheck, 
  Send, 
  CheckCircle2, 
  ChevronRight, 
  Clock, 
  FileText, 
  Lock,
  Globe,
  ArrowRight,
  AlertCircle
} from 'lucide-react';

interface PublicContactProps {
  onSelectRole?: (role: any, scope?: any) => void;
  onNavigateToRole?: (role: any, scope?: any) => void;
  setActiveTab?: (tab: string) => void;
}

export const PublicContact: React.FC<PublicContactProps> = ({
  onSelectRole,
  onNavigateToRole,
  setActiveTab
}) => {
  const { isDark } = useTheme();
  const handleRoleSelect = onSelectRole || onNavigateToRole || (() => {});

  // Form state
  const [formData, setFormData] = useState({
    enquiryType: 'general',
    fullName: '',
    email: '',
    organization: '',
    roleTitle: '',
    phone: '',
    subject: '',
    message: '',
    consent: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const enquiryOptions = [
    { value: 'workplace_trust', label: 'Workplace Trust™ Assessment & Licensing', office: 'Governance & Frameworks Office' },
    { value: 'investor_relations', label: 'Institutional Investor & Governed Data Room', office: 'Capital Allocation & Investor Secretariat' },
    { value: 'verification', label: 'Identity Verification & Registry Records', office: 'Office of the Registrar' },
    { value: 'constitutional', label: 'Constitutional Advisory & Dispute Guidance', office: 'General Counsel & Legal Registry' },
    { value: 'media', label: 'Press, Research & Publications', office: 'Communications Directorate' },
    { value: 'general', label: 'General Institutional Enquiry', office: 'General Secretariat' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!formData.fullName.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage('Please complete all required fields (Full Name, Official Email, and Message).');
      return;
    }

    if (!formData.consent) {
      setErrorMessage('Please confirm authorization and consent to ETES institutional data governance standards.');
      return;
    }

    setIsSubmitting(true);

    // Simulate governed institutional dispatch
    setTimeout(() => {
      const generatedId = `ETES-${Date.now().toString().slice(-6)}-${Math.floor(100 + Math.random() * 900)}`;
      setSubmittedRef(generatedId);
      setIsSubmitting(false);
    }, 750);
  };

  const handleReset = () => {
    setSubmittedRef(null);
    setFormData({
      enquiryType: 'general',
      fullName: '',
      email: '',
      organization: '',
      roleTitle: '',
      phone: '',
      subject: '',
      message: '',
      consent: false
    });
    setErrorMessage(null);
  };

  const currentEnquiryMeta = enquiryOptions.find(o => o.value === formData.enquiryType) || enquiryOptions[0];

  return (
    <div 
      className={`min-h-screen py-10 sm:py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-200 ${
        isDark ? 'bg-[#070B13] text-stone-200' : 'bg-[#FAF7F2] text-stone-900'
      }`} 
      id="public-contact-screen"
    >
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Header Section */}
        <div className={`border-b pb-8 ${isDark ? 'border-stone-800' : 'border-[#E2DDD5]'}`}>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono-code uppercase tracking-wider mb-3 ${
                isDark 
                  ? 'bg-[#C5A059]/15 text-[#DFB76C] border border-[#C5A059]/30' 
                  : 'bg-[#8C6B28]/10 text-[#8C6B28] border border-[#8C6B28]/30'
              }`}>
                <ShieldCheck className={`w-3.5 h-3.5 ${isDark ? 'text-[#C5A059]' : 'text-[#8C6B28]'}`} />
                <span>Institutional Pathways & Enquiries</span>
              </div>
              <h1 className={`font-institutional text-3xl sm:text-4xl font-bold tracking-tight ${
                isDark ? 'text-white' : 'text-stone-900'
              }`}>
                Connect with ETES
              </h1>
              <p className={`text-sm sm:text-base mt-2 max-w-2xl leading-relaxed ${
                isDark ? 'text-stone-400' : 'text-stone-600'
              }`}>
                Direct formal enquiries, partnership requests, and verification queries to the appropriate institutional office.
              </p>
            </div>

            {/* SLA Badge */}
            <div className={`p-3.5 rounded-lg border text-xs max-w-xs flex items-start gap-2.5 ${
              isDark ? 'border-stone-800 bg-[#0B111E] text-stone-300' : 'border-[#E2DDD5] bg-white text-stone-700 shadow-xs'
            }`}>
              <Clock className={`w-4 h-4 shrink-0 mt-0.5 ${isDark ? 'text-[#C5A059]' : 'text-[#8C6B28]'}`} />
              <div>
                <span className={`font-semibold block ${isDark ? 'text-[#DFB76C]' : 'text-[#8C6B28]'}`}>Official Response SLA</span>
                <span className={`text-[11px] leading-tight ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>Enquiries logged within standard hours (Mon–Fri, 08:00–17:00 SAST) are triaged within 24 hours.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content: Form (Left) & Institutional Offices / Direct Portals (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* LEFT 7 COLS: Neat Institutional Contact Form */}
          <div className="lg:col-span-7">
            <div className={`p-6 sm:p-8 rounded-xl border shadow-sm transition-all ${
              isDark ? 'border-stone-800 bg-[#0B111E]' : 'border-[#E2DDD5] bg-white'
            }`}>
              
              {submittedRef ? (
                /* Success State */
                <div className="py-8 text-center space-y-5 animate-in fade-in zoom-in-95 duration-200" id="contact-success-panel">
                  <div className={`w-14 h-14 mx-auto rounded-full flex items-center justify-center shadow-inner ${
                    isDark ? 'bg-emerald-950/60 border border-emerald-500/40 text-emerald-400' : 'bg-emerald-50 border border-emerald-300 text-emerald-600'
                  }`}>
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className={`font-institutional text-2xl font-bold ${isDark ? 'text-white' : 'text-stone-900'}`}>
                      Enquiry Dispatched Successfully
                    </h3>
                    <p className={`text-xs sm:text-sm max-w-md mx-auto ${isDark ? 'text-stone-300' : 'text-stone-600'}`}>
                      Your dossier has been securely routed to the <strong>{currentEnquiryMeta.office}</strong> under governed record protocols.
                    </p>
                  </div>

                  {/* Reference Ticket Box */}
                  <div className={`max-w-sm mx-auto p-4 rounded-lg border font-mono-code text-xs text-left ${
                    isDark ? 'bg-[#070B13] border-stone-800 text-stone-300' : 'bg-[#FAF7F2] border-[#E2DDD5] text-stone-700'
                  }`}>
                    <div className={`flex justify-between items-center text-[10px] uppercase tracking-wider mb-2 border-b pb-1 ${
                      isDark ? 'text-stone-400 border-stone-800' : 'text-stone-500 border-[#E2DDD5]'
                    }`}>
                      <span>Dossier Record</span>
                      <span className="text-emerald-500 font-bold">DISPATCHED</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className={isDark ? 'text-stone-400' : 'text-stone-500'}>Tracking Reference:</span>
                      <span className={`font-bold ${isDark ? 'text-[#DFB76C]' : 'text-[#8C6B28]'}`}>{submittedRef}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className={isDark ? 'text-stone-400' : 'text-stone-500'}>Institutional Office:</span>
                      <span className="truncate max-w-[170px] text-right font-medium">{currentEnquiryMeta.office}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className={isDark ? 'text-stone-400' : 'text-stone-500'}>Contact Email:</span>
                      <span className="font-medium truncate max-w-[170px]">{formData.email}</span>
                    </div>
                  </div>

                  <div className="pt-3">
                    <button
                      id="submit-another-enquiry-btn"
                      onClick={handleReset}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold bg-[#C5A059] text-[#070B13] hover:bg-[#B89047] transition-colors shadow-sm cursor-pointer"
                    >
                      <span>Submit Another Enquiry</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ) : (
                /* Interactive Form */
                <form onSubmit={handleSubmit} className="space-y-6" id="institutional-contact-form">
                  <div className={`border-b pb-4 ${isDark ? 'border-stone-800/60' : 'border-[#E2DDD5]'}`}>
                    <h2 className={`font-institutional text-xl font-bold ${isDark ? 'text-white' : 'text-stone-900'}`}>
                      Formal Enquiry Lodgment
                    </h2>
                    <p className={`text-xs mt-1 ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                      Fields marked with <span className={`font-bold ${isDark ? 'text-[#C5A059]' : 'text-[#8C6B28]'}`}>*</span> are required for institutional verification.
                    </p>
                  </div>

                  {errorMessage && (
                    <div className="p-3 rounded-lg bg-red-950/40 border border-red-500/40 text-red-300 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* 1. Enquiry Pathway */}
                  <div className="space-y-1.5">
                    <label className={`block text-xs font-semibold uppercase tracking-wider font-mono-code ${
                      isDark ? 'text-stone-300' : 'text-stone-700'
                    }`}>
                      Institutional Department / Pathway <span className={isDark ? 'text-[#C5A059]' : 'text-[#8C6B28]'}>*</span>
                    </label>
                    <div className="relative">
                      <select
                        id="contact-enquiry-type"
                        value={formData.enquiryType}
                        onChange={(e) => setFormData({ ...formData, enquiryType: e.target.value })}
                        className={`w-full px-3.5 py-2.5 rounded-lg text-xs border font-medium transition-all focus:outline-none focus:ring-1 ${
                          isDark 
                            ? 'bg-[#070B13] border-stone-800 text-stone-200 focus:border-[#C5A059] focus:ring-[#C5A059]' 
                            : 'bg-[#FAF7F2] border-[#E2DDD5] text-stone-900 focus:border-[#8C6B28] focus:ring-[#8C6B28]'
                        }`}
                      >
                        {enquiryOptions.map((opt) => (
                          <option key={opt.value} value={opt.value} className={isDark ? 'bg-[#070B13] text-stone-200' : 'bg-white text-stone-900'}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className={`text-[11px] flex items-center gap-1 font-mono-code mt-1 ${
                      isDark ? 'text-[#C5A059]' : 'text-[#8C6B28]'
                    }`}>
                      <span className={isDark ? 'text-stone-400' : 'text-stone-500'}>Routing to:</span>
                      <span className="font-semibold">{currentEnquiryMeta.office}</span>
                    </div>
                  </div>

                  {/* 2. Sender Identity: Name & Professional Title */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className={`block text-xs font-semibold ${isDark ? 'text-stone-300' : 'text-stone-700'}`}>
                        Full Legal Name <span className={isDark ? 'text-[#C5A059]' : 'text-[#8C6B28]'}>*</span>
                      </label>
                      <input
                        type="text"
                        id="contact-fullname"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. Dr. Arthur Mthembu"
                        className={`w-full px-3.5 py-2.5 rounded-lg text-xs border transition-all focus:outline-none focus:ring-1 ${
                          isDark 
                            ? 'bg-[#070B13] border-stone-800 text-stone-200 placeholder-stone-600 focus:border-[#C5A059] focus:ring-[#C5A059]' 
                            : 'bg-[#FAF7F2] border-[#E2DDD5] text-stone-900 placeholder-stone-400 focus:border-[#8C6B28] focus:ring-[#8C6B28]'
                        }`}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className={`block text-xs font-semibold ${isDark ? 'text-stone-300' : 'text-stone-700'}`}>
                        Executive / Role Title
                      </label>
                      <input
                        type="text"
                        id="contact-roletitle"
                        value={formData.roleTitle}
                        onChange={(e) => setFormData({ ...formData, roleTitle: e.target.value })}
                        placeholder="e.g. Chief Governance Officer"
                        className={`w-full px-3.5 py-2.5 rounded-lg text-xs border transition-all focus:outline-none focus:ring-1 ${
                          isDark 
                            ? 'bg-[#070B13] border-stone-800 text-stone-200 placeholder-stone-600 focus:border-[#C5A059] focus:ring-[#C5A059]' 
                            : 'bg-[#FAF7F2] border-[#E2DDD5] text-stone-900 placeholder-stone-400 focus:border-[#8C6B28] focus:ring-[#8C6B28]'
                        }`}
                      />
                    </div>
                  </div>

                  {/* 3. Organization & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className={`block text-xs font-semibold ${isDark ? 'text-stone-300' : 'text-stone-700'}`}>
                        Organization / Affiliation
                      </label>
                      <input
                        type="text"
                        id="contact-organization"
                        value={formData.organization}
                        onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                        placeholder="e.g. Rand Capital Advisory"
                        className={`w-full px-3.5 py-2.5 rounded-lg text-xs border transition-all focus:outline-none focus:ring-1 ${
                          isDark 
                            ? 'bg-[#070B13] border-stone-800 text-stone-200 placeholder-stone-600 focus:border-[#C5A059] focus:ring-[#C5A059]' 
                            : 'bg-[#FAF7F2] border-[#E2DDD5] text-stone-900 placeholder-stone-400 focus:border-[#8C6B28] focus:ring-[#8C6B28]'
                        }`}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className={`block text-xs font-semibold ${isDark ? 'text-stone-300' : 'text-stone-700'}`}>
                        Official Email Address <span className={isDark ? 'text-[#C5A059]' : 'text-[#8C6B28]'}>*</span>
                      </label>
                      <input
                        type="email"
                        id="contact-email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. arthur@randcapital.co.za"
                        className={`w-full px-3.5 py-2.5 rounded-lg text-xs border transition-all focus:outline-none focus:ring-1 ${
                          isDark 
                            ? 'bg-[#070B13] border-stone-800 text-stone-200 placeholder-stone-600 focus:border-[#C5A059] focus:ring-[#C5A059]' 
                            : 'bg-[#FAF7F2] border-[#E2DDD5] text-stone-900 placeholder-stone-400 focus:border-[#8C6B28] focus:ring-[#8C6B28]'
                        }`}
                      />
                    </div>
                  </div>

                  {/* 4. Subject */}
                  <div className="space-y-1.5">
                    <label className={`block text-xs font-semibold ${isDark ? 'text-stone-300' : 'text-stone-700'}`}>
                      Subject / Brief Reference
                    </label>
                    <input
                      type="text"
                      id="contact-subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. Request for Governed Workplace Trust Assessment Protocol"
                      className={`w-full px-3.5 py-2.5 rounded-lg text-xs border transition-all focus:outline-none focus:ring-1 ${
                        isDark 
                          ? 'bg-[#070B13] border-stone-800 text-stone-200 placeholder-stone-600 focus:border-[#C5A059] focus:ring-[#C5A059]' 
                          : 'bg-[#FAF7F2] border-[#E2DDD5] text-stone-900 placeholder-stone-400 focus:border-[#8C6B28] focus:ring-[#8C6B28]'
                      }`}
                    />
                  </div>

                  {/* 5. Message Body */}
                  <div className="space-y-1.5">
                    <label className={`block text-xs font-semibold ${isDark ? 'text-stone-300' : 'text-stone-700'}`}>
                      Enquiry Dossier / Particulars <span className={isDark ? 'text-[#C5A059]' : 'text-[#8C6B28]'}>*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please delineate the context of your institutional query, relevant timelines, or specific verified documentation requested..."
                      className={`w-full px-3.5 py-2.5 rounded-lg text-xs border transition-all focus:outline-none focus:ring-1 leading-relaxed resize-y ${
                        isDark 
                          ? 'bg-[#070B13] border-stone-800 text-stone-200 placeholder-stone-600 focus:border-[#C5A059] focus:ring-[#C5A059]' 
                          : 'bg-[#FAF7F2] border-[#E2DDD5] text-stone-900 placeholder-stone-400 focus:border-[#8C6B28] focus:ring-[#8C6B28]'
                      }`}
                    />
                  </div>

                  {/* 6. Institutional Consent Checkbox */}
                  <div className="pt-1">
                    <label className="flex items-start gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        id="contact-consent-checkbox"
                        checked={formData.consent}
                        onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                        className={`mt-0.5 rounded ${
                          isDark ? 'border-stone-600 text-[#C5A059] focus:ring-[#C5A059]' : 'border-stone-300 text-[#8C6B28] focus:ring-[#8C6B28]'
                        }`}
                      />
                      <span className={`text-[11px] leading-snug ${isDark ? 'text-stone-400' : 'text-stone-600'}`}>
                        I confirm that this enquiry is submitted on behalf of an authorized representative or individual inquirer under ETES data privacy and governed constitutional standards.
                      </span>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      id="contact-submit-btn"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-wider bg-[#C5A059] text-[#070B13] hover:bg-[#B89047] transition-all disabled:opacity-50 shadow-md cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-[#070B13] border-t-transparent rounded-full animate-spin" />
                          <span>Routing Dossier...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>Dispatch Formal Enquiry</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* RIGHT 5 COLS: Headquarters Registry & Direct Portals */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Card 1: Headquarters & Registry Record */}
            <div className={`p-6 rounded-xl border shadow-sm space-y-4 ${
              isDark ? 'border-stone-800 bg-[#0B111E]' : 'border-[#E2DDD5] bg-white'
            }`} id="institutional-registry-card">
              <div className={`flex items-center gap-2.5 border-b pb-3 ${
                isDark ? 'border-stone-800/60' : 'border-[#E2DDD5]'
              }`}>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  isDark 
                    ? 'bg-[#C5A059]/15 border border-[#C5A059]/30 text-[#DFB76C]' 
                    : 'bg-[#8C6B28]/10 border border-[#8C6B28]/30 text-[#8C6B28]'
                }`}>
                  <Building2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className={`font-institutional text-base font-bold ${isDark ? 'text-white' : 'text-stone-900'}`}>
                    Institutional Registry & Headquarters
                  </h3>
                  <p className={`text-[11px] font-mono-code ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                    Statutory & Executive Seat
                  </p>
                </div>
              </div>

              <div className={`space-y-3 text-xs leading-relaxed ${isDark ? 'text-stone-300' : 'text-stone-600'}`}>
                <div>
                  <span className={`block text-[11px] font-mono-code uppercase ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                    Corporate Entity
                  </span>
                  <span className={`font-semibold ${isDark ? 'text-white' : 'text-stone-900'}`}>
                    Employment Trust & Empowerment Solutions (Pty) Ltd
                  </span>
                </div>

                <div className={`grid grid-cols-2 gap-3 pt-1 border-t ${
                  isDark ? 'border-stone-800/60' : 'border-[#E2DDD5]'
                }`}>
                  <div>
                    <span className={`block text-[11px] font-mono-code uppercase ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                      Registration No.
                    </span>
                    <span className={`font-mono-code font-bold ${isDark ? 'text-[#DFB76C]' : 'text-[#8C6B28]'}`}>
                      2026/669815/07
                    </span>
                  </div>
                  <div>
                    <span className={`block text-[11px] font-mono-code uppercase ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                      Jurisdiction
                    </span>
                    <span className="font-medium">Republic of South Africa</span>
                  </div>
                </div>

                <div className={`pt-1 border-t ${isDark ? 'border-stone-800/60' : 'border-[#E2DDD5]'}`}>
                  <span className={`block text-[11px] font-mono-code uppercase flex items-center gap-1 ${
                    isDark ? 'text-stone-400' : 'text-stone-500'
                  }`}>
                    <MapPin className={`w-3 h-3 ${isDark ? 'text-[#C5A059]' : 'text-[#8C6B28]'}`} />
                    Headquarters
                  </span>
                  <span className="block mt-0.5">
                    Sandton City Gate, Tower 2, Level 14<br />
                    Johannesburg, Gauteng, South Africa
                  </span>
                </div>

                <div className={`pt-2 border-t space-y-2 ${isDark ? 'border-stone-800/60' : 'border-[#E2DDD5]'}`}>
                  <div className="flex items-center justify-between text-xs">
                    <span className={isDark ? 'text-stone-400' : 'text-stone-500'}>General Registrar:</span>
                    <a href="mailto:registrar@etes.org" className={`hover:underline font-mono-code ${
                      isDark ? 'text-[#DFB76C]' : 'text-[#8C6B28]'
                    }`}>
                      registrar@etes.org
                    </a>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className={isDark ? 'text-stone-400' : 'text-stone-500'}>Governed Verification:</span>
                    <a href="mailto:verify@etes.org" className={`hover:underline font-mono-code ${
                      isDark ? 'text-[#DFB76C]' : 'text-[#8C6B28]'
                    }`}>
                      verify@etes.org
                    </a>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className={isDark ? 'text-stone-400' : 'text-stone-500'}>Institutional Hotline:</span>
                    <span className={`font-mono-code ${isDark ? 'text-stone-300' : 'text-stone-700'}`}>
                      +27 (0) 11 884 9200
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Direct Governed Engagement Portals */}
            <div className={`p-6 rounded-xl border shadow-sm space-y-4 ${
              isDark ? 'border-stone-800 bg-[#0B111E]' : 'border-[#E2DDD5] bg-white'
            }`} id="direct-engagement-portals-card">
              <div className={`border-b pb-3 ${isDark ? 'border-stone-800/60' : 'border-[#E2DDD5]'}`}>
                <h3 className={`font-institutional text-base font-bold ${isDark ? 'text-white' : 'text-stone-900'}`}>
                  Direct Governed Portals
                </h3>
                <p className={`text-[11px] ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                  Fast-track access to authenticated workflow rooms
                </p>
              </div>

              <div className="space-y-2.5">
                <button 
                  onClick={() => handleRoleSelect('employee')}
                  id="direct-portal-employee-btn"
                  className={`w-full text-left p-3 rounded-lg border text-xs flex items-center justify-between transition-all group cursor-pointer ${
                    isDark 
                      ? 'bg-[#070B13] hover:bg-[#162032] border-stone-800 hover:border-[#C5A059]/50' 
                      : 'bg-[#FAF7F2] hover:bg-[#EFE9DF] border-[#E2DDD5] hover:border-[#8C6B28]/50'
                  }`}
                >
                  <div className="pr-2">
                    <div className={`font-semibold flex items-center gap-1.5 ${isDark ? 'text-white' : 'text-stone-900'}`}>
                      <span>Verified Employee Portal</span>
                      <span className={`text-[9px] px-1.5 py-0.2 rounded font-mono-code ${
                        isDark ? 'bg-stone-800 text-stone-300' : 'bg-stone-200 text-stone-700'
                      }`}>ROOM 2</span>
                    </div>
                    <div className={`text-[11px] mt-0.5 ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                      Confidential anonymous trust assessment flow & token verification
                    </div>
                  </div>
                  <ChevronRight className={`w-4 h-4 group-hover:translate-x-0.5 transition-all shrink-0 ${
                    isDark ? 'text-stone-400 group-hover:text-[#DFB76C]' : 'text-stone-400 group-hover:text-[#8C6B28]'
                  }`} />
                </button>

                <button 
                  onClick={() => handleRoleSelect('investor')}
                  id="direct-portal-investor-btn"
                  className={`w-full text-left p-3 rounded-lg border text-xs flex items-center justify-between transition-all group cursor-pointer ${
                    isDark 
                      ? 'bg-[#070B13] hover:bg-[#162032] border-stone-800 hover:border-[#C5A059]/50' 
                      : 'bg-[#FAF7F2] hover:bg-[#EFE9DF] border-[#E2DDD5] hover:border-[#8C6B28]/50'
                  }`}
                >
                  <div className="pr-2">
                    <div className={`font-semibold flex items-center gap-1.5 ${isDark ? 'text-white' : 'text-stone-900'}`}>
                      <span>Institutional Investor Relations</span>
                      <span className={`text-[9px] px-1.5 py-0.2 rounded font-mono-code ${
                        isDark ? 'bg-stone-800 text-stone-300' : 'bg-stone-200 text-stone-700'
                      }`}>ROOM 3</span>
                    </div>
                    <div className={`text-[11px] mt-0.5 ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                      Request access to audited cap table, financial notes & governed data room
                    </div>
                  </div>
                  <ChevronRight className={`w-4 h-4 group-hover:translate-x-0.5 transition-all shrink-0 ${
                    isDark ? 'text-stone-400 group-hover:text-[#DFB76C]' : 'text-stone-400 group-hover:text-[#8C6B28]'
                  }`} />
                </button>

                <button 
                  onClick={() => handleRoleSelect('executive', 'enterprise_wide')}
                  id="direct-portal-executive-btn"
                  className={`w-full text-left p-3 rounded-lg border text-xs flex items-center justify-between transition-all group cursor-pointer ${
                    isDark 
                      ? 'bg-[#070B13] hover:bg-[#162032] border-stone-800 hover:border-[#C5A059]/50' 
                      : 'bg-[#FAF7F2] hover:bg-[#EFE9DF] border-[#E2DDD5] hover:border-[#8C6B28]/50'
                  }`}
                >
                  <div className="pr-2">
                    <div className={`font-semibold flex items-center gap-1.5 ${isDark ? 'text-white' : 'text-stone-900'}`}>
                      <span>Executive Governance Suite</span>
                      <span className={`text-[9px] px-1.5 py-0.2 rounded font-mono-code ${
                        isDark ? 'bg-stone-800 text-stone-300' : 'bg-stone-200 text-stone-700'
                      }`}>ROOM 1</span>
                    </div>
                    <div className={`text-[11px] mt-0.5 ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                      Fiduciary governance dashboards, trust telemetry & committee reports
                    </div>
                  </div>
                  <ChevronRight className={`w-4 h-4 group-hover:translate-x-0.5 transition-all shrink-0 ${
                    isDark ? 'text-stone-400 group-hover:text-[#DFB76C]' : 'text-stone-400 group-hover:text-[#8C6B28]'
                  }`} />
                </button>
              </div>
            </div>

            {/* Security Assurance Badge */}
            <div className={`p-4 rounded-xl border flex items-center gap-3 text-xs ${
              isDark ? 'border-stone-800 bg-[#0B111E] text-stone-400' : 'border-[#E2DDD5] bg-white text-stone-600 shadow-xs'
            }`}>
              <Lock className={`w-4 h-4 shrink-0 ${isDark ? 'text-[#C5A059]' : 'text-[#8C6B28]'}`} />
              <div className="text-[11px] leading-snug">
                <span className={`font-semibold ${isDark ? 'text-stone-300' : 'text-stone-800'}`}>Governed Confidentiality:</span> Transmissions are encrypted end-to-end under POPIA & institutional trust charter protocols.
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
