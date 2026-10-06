import React, { useState } from 'react';
import { RelationshipType } from '../../types';
import { useTheme } from '../../context/ThemeContext';
import { 
  X, 
  Lock, 
  ShieldCheck, 
  Briefcase, 
  UserCheck, 
  TrendingUp, 
  ShieldAlert, 
  ArrowRight,
  Key,
  Sparkles
} from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (role: RelationshipType, scopeType?: 'enterprise_wide' | 'business_unit', targetTab?: string) => void;
  defaultRole?: RelationshipType;
  redirectTab?: string;
  contextTitle?: string;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onLogin,
  defaultRole = 'executive',
  redirectTab,
  contextTitle
}) => {
  const { isDark } = useTheme();
  const [selectedRole, setSelectedRole] = useState<RelationshipType>(defaultRole);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  React.useEffect(() => {
    if (defaultRole) {
      setSelectedRole(defaultRole);
    }
  }, [defaultRole, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(selectedRole, undefined, redirectTab);
    onClose();
  };

  const portalOptions: {
    role: RelationshipType;
    title: string;
    description: string;
    icon: React.ReactNode;
    badge: string;
  }[] = [
    {
      role: 'executive',
      title: "CEO & Director's Intelligence Room",
      description: 'Institutional intelligence, Trust Signals™, Workplace DNA™, and strategic actions.',
      icon: <Briefcase className="w-5 h-5 text-[#C5A059]" />,
      badge: 'C-Suite & Directors'
    },
    {
      role: 'employee',
      title: 'Employee Portal',
      description: 'Confidential assessment participation, privacy protections, and trust score journey.',
      icon: <UserCheck className="w-5 h-5 text-[#C5A059]" />,
      badge: 'Protected & Anonymous'
    },
    {
      role: 'investor',
      title: 'Investor Data Room',
      description: 'Governance models, financial projections, operational health, and diligence dossiers.',
      icon: <TrendingUp className="w-5 h-5 text-[#C5A059]" />,
      badge: 'Accredited Capital'
    },
    {
      role: 'community',
      title: 'ETES Thrive Community Room',
      description: 'Entrepreneurs, SMEs, Freelancers, and Community professionals building and growing together.',
      icon: <Sparkles className="w-5 h-5 text-[#C5A059]" />,
      badge: 'Thrive Network™'
    },
    {
      role: 'contractor',
      title: 'Independent Contractor / Freelancer Room',
      description: 'Professional profile, active enterprise engagements, escrow payment trust, verified reviews, and growth.',
      icon: <UserCheck className="w-5 h-5 text-[#C5A059]" />,
      badge: 'Verified Supplier'
    },
    {
      role: 'admin',
      title: 'Admin Control Room',
      description: 'Question Bank registry, publication gatekeeper, user roles, and audit trail.',
      icon: <ShieldAlert className="w-5 h-5 text-[#C5A059]" />,
      badge: 'Governed Access'
    }
  ];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
      id="etes-login-modal-backdrop"
    >
      <div 
        className={`w-full max-w-xl rounded-xl border shadow-2xl overflow-hidden transition-all duration-200 ${
          isDark 
            ? 'bg-[#0B111E] border-stone-800 text-stone-100' 
            : 'bg-white border-stone-300 text-stone-900'
        }`}
        onClick={(e) => e.stopPropagation()}
        id="etes-login-modal"
      >
        {/* Header with Institutional Branding */}
        <div className={`flex items-center justify-between px-6 py-4 border-b ${
          isDark ? 'border-stone-800/80 bg-[#070B13]' : 'border-[#E2DDD5] bg-[#FAF7F2]'
        }`}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#C5A059] to-[#8C6B28] flex items-center justify-center text-white shadow-sm">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-institutional font-bold text-base tracking-wide flex items-center gap-2">
                <span>ETES PORTAL AUTHENTICATION</span>
              </h3>
              <p className="text-[11px] font-mono-code text-stone-400">
                Encrypted Institutional Access • 256-bit TLS
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className={`p-1.5 rounded-lg transition-colors ${
              isDark ? 'hover:bg-stone-800 text-stone-400 hover:text-white' : 'hover:bg-stone-200 text-stone-500 hover:text-stone-900'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {contextTitle && (
            <div className="p-3.5 rounded-lg bg-[#C5A059]/10 border border-[#C5A059]/30 flex items-center gap-2.5 text-xs text-[#DFB76C]">
              <ShieldCheck className="w-4 h-4 shrink-0 text-[#C5A059]" />
              <span className="font-medium">{contextTitle}</span>
            </div>
          )}

          {/* Portal Selector Grid */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#C5A059] mb-2.5">
              Select Institutional Room
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {portalOptions.map((opt) => {
                const isSelected = selectedRole === opt.role;
                return (
                  <button
                    key={opt.role}
                    type="button"
                    onClick={() => setSelectedRole(opt.role)}
                    className={`p-3 text-left rounded-lg border transition-all duration-150 relative ${
                      isSelected
                        ? isDark 
                          ? 'border-[#C5A059] bg-[#C5A059]/10 shadow-xs' 
                          : 'border-[#C5A059] bg-[#F7F3EB] shadow-xs'
                        : isDark
                          ? 'border-stone-800 bg-[#070B13]/60 hover:border-stone-700 hover:bg-[#070B13]'
                          : 'border-stone-200 bg-stone-50 hover:border-stone-300 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        {opt.icon}
                        <span className="font-bold text-xs uppercase tracking-wide">
                          {opt.title}
                        </span>
                      </div>
                      <span className={`text-[9px] px-1.5 py-0.5 rounded font-mono-code uppercase font-semibold ${
                        isSelected 
                          ? 'bg-[#C5A059] text-black' 
                          : isDark ? 'bg-stone-800 text-stone-400' : 'bg-stone-200 text-stone-600'
                      }`}>
                        {opt.badge}
                      </span>
                    </div>
                    <p className={`text-[11px] leading-relaxed ${
                      isDark ? 'text-stone-400' : 'text-stone-600'
                    }`}>
                      {opt.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Credentials Form */}
          <form onSubmit={handleSubmit} className="space-y-4 pt-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium mb-1.5 text-stone-300">
                  Institutional Email / ID
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="user@vanguard.co.za"
                    className={`w-full px-3 py-2 text-xs rounded-lg border transition-colors outline-none focus:border-[#C5A059] ${
                      isDark 
                        ? 'bg-[#070B13] border-stone-800 text-white placeholder-stone-600' 
                        : 'bg-stone-50 border-stone-300 text-stone-900 placeholder-stone-400'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium mb-1.5 text-stone-300">
                  Access Key / Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className={`w-full px-3 py-2 text-xs rounded-lg border transition-colors outline-none focus:border-[#C5A059] ${
                      isDark 
                        ? 'bg-[#070B13] border-stone-800 text-white placeholder-stone-600' 
                        : 'bg-stone-50 border-stone-300 text-stone-900 placeholder-stone-400'
                    }`}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-stone-400 select-none">
                <input 
                  type="checkbox" 
                  checked={rememberMe} 
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-stone-700 accent-[#C5A059]" 
                />
                <span>Remember session credentials</span>
              </label>

              <button
                type="button"
                onClick={() => {
                  onLogin(selectedRole);
                  onClose();
                }}
                className="text-[#C5A059] hover:underline text-[11px] font-medium"
              >
                Use Single-Click Demo Access →
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className={`flex-1 py-2.5 text-xs font-semibold rounded-lg border transition-colors uppercase tracking-wider ${
                  isDark 
                    ? 'border-stone-800 text-stone-300 hover:bg-stone-800/80' 
                    : 'border-stone-300 text-stone-700 hover:bg-stone-100'
                }`}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="flex-2 py-2.5 px-4 text-xs font-bold rounded-lg bg-gradient-to-r from-[#C5A059] to-[#9E7422] text-black hover:brightness-110 shadow-md uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                id="login-modal-submit-btn"
              >
                <span>Enter {portalOptions.find(p => p.role === selectedRole)?.title}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>

        {/* Security Footer Notice */}
        <div className={`px-6 py-3 border-t text-[11px] flex items-center gap-2 font-mono-code ${
          isDark ? 'border-stone-800/80 bg-[#070B13]/80 text-stone-400' : 'border-[#E2DDD5] bg-[#FAF7F2] text-stone-500'
        }`}>
          <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
          <span>Single-Tenant sovereign database separation & ISO-27001 compliant architecture.</span>
        </div>
      </div>
    </div>
  );
};
