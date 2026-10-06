import React, { useState, useRef, useEffect } from 'react';
import { RelationshipType } from '../../types';
import { useTheme } from '../../context/ThemeContext';
import { 
  Users, 
  Building2, 
  Briefcase, 
  ShieldCheck,
  Lock, 
  Search, 
  ChevronDown,
  Check,
  Sparkles,
  UserCheck
} from 'lucide-react';

interface RelationshipBarProps {
  currentRole: RelationshipType;
  currentScopeType?: 'enterprise_wide' | 'business_unit';
  onSelectRole: (role: RelationshipType, scopeType?: 'enterprise_wide' | 'business_unit') => void;
  onOpenBlueprint?: () => void;
}

interface RoleOption {
  id: string;
  role: RelationshipType;
  scopeType?: 'enterprise_wide' | 'business_unit';
  label: string;
  badge: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

const ROLE_OPTIONS: RoleOption[] = [
  {
    id: 'public',
    role: 'public',
    label: 'Public HQ',
    badge: 'Phase 1',
    icon: Users,
    description: 'Public observer & research portal'
  },
  {
    id: 'employee',
    role: 'employee',
    label: 'Employee Room',
    badge: 'Private',
    icon: Lock,
    description: 'Autonomous, protected worker portal'
  },
  {
    id: 'executive',
    role: 'executive',
    scopeType: 'enterprise_wide',
    label: "CEO & Director's Intelligence Room",
    badge: 'Intelligence',
    icon: Building2,
    description: 'Enterprise & business unit aggregate trust intelligence'
  },
  {
    id: 'investor',
    role: 'investor',
    label: 'Investor & Data Room',
    badge: 'Due Diligence',
    icon: Briefcase,
    description: 'Governance & capital allocators overview'
  },
  {
    id: 'community',
    role: 'community',
    label: 'ETES Thrive Community Room',
    badge: 'Thrive Network™',
    icon: Sparkles,
    description: 'Where entrepreneurs, SMEs and professionals grow together'
  },
  {
    id: 'contractor',
    role: 'contractor',
    label: 'Contractor / Freelancer Room',
    badge: 'Verified Supplier',
    icon: UserCheck,
    description: 'Active engagements, escrow payment trust, profile & reviews'
  },
  {
    id: 'directory',
    role: 'public',
    label: 'Trust Directory',
    badge: 'Registry',
    icon: Search,
    description: 'National employer trust registry'
  },
  {
    id: 'admin',
    role: 'admin',
    label: 'Admin Control Room',
    badge: 'System Overseer',
    icon: ShieldCheck,
    description: 'Constitutional safeguards & audit trails'
  }
];

export const RelationshipBar: React.FC<RelationshipBarProps> = ({
  currentRole,
  currentScopeType = 'enterprise_wide',
  onSelectRole
}) => {
  const { isDark } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Find currently active option
  const currentOption = ROLE_OPTIONS.find((opt) => {
    if (opt.id === 'directory') return false; // directory is an alias for public search
    return opt.role === currentRole;
  }) || ROLE_OPTIONS[0];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const ActiveIcon = currentOption.icon;

  return (
    <div 
      id="etes-relationship-switcher-bar"
      className={`border-b text-xs px-3 py-1.5 shrink-0 sticky top-0 z-50 shadow-md backdrop-blur-sm transition-colors duration-200 ${
        isDark ? 'bg-[#070B13] border-stone-800 text-stone-200' : 'bg-[#F2ECE3] border-[#E0D9CE] text-stone-800'
      }`}
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
        
        {/* Dropdown Selector */}
        <div className="relative inline-flex items-center gap-2.5" ref={dropdownRef}>
          <span className={`font-medium text-[11px] tracking-wide uppercase hidden sm:inline-block ${
            isDark ? 'text-stone-400' : 'text-stone-600'
          }`}>
            Simulated Role:
          </span>

          <button
            id="role-switcher-dropdown-btn"
            onClick={() => setIsOpen(!isOpen)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md border transition-all shadow-sm cursor-pointer ${
              isDark 
                ? 'bg-[#0E1726] border-[#C5A059]/40 hover:border-[#C5A059] text-white' 
                : 'bg-white border-[#C5A059]/50 hover:border-[#C5A059] text-stone-900 shadow-xs'
            }`}
            aria-haspopup="listbox"
            aria-expanded={isOpen}
          >
            <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
              isDark ? 'bg-[#070B13] border-[#C5A059]/40 text-[#DFB76C]' : 'bg-[#FAF7F2] border-[#C5A059]/50 text-[#8C6B28]'
            }`}>
              <ActiveIcon className="w-3 h-3" />
            </div>

            <span className={`font-semibold whitespace-nowrap text-xs ${isDark ? 'text-stone-100' : 'text-stone-900'}`}>
              {currentOption.label}
            </span>

            <span className={`px-1.5 py-0.2 rounded text-[10px] font-mono-code ${
              isDark ? 'bg-[#C5A059]/20 text-[#DFB76C] border border-[#C5A059]/30' : 'bg-[#C5A059]/15 text-[#8C6B28] border border-[#C5A059]/40'
            }`}>
              {currentOption.badge}
            </span>

            <ChevronDown className={`w-3.5 h-3.5 ml-1 transition-transform duration-200 ${
              isDark ? 'text-stone-400' : 'text-stone-500'
            } ${isOpen ? 'rotate-180 text-[#DFB76C]' : ''}`} />
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <div 
              id="role-switcher-menu"
              className={`absolute left-0 top-full mt-1.5 w-72 rounded-lg border shadow-2xl py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100 ${
                isDark ? 'bg-[#0E1726] border-[#C5A059]/40 text-stone-200' : 'bg-white border-[#C5A059]/40 text-stone-800'
              }`}
              role="listbox"
            >
              <div className={`px-3 py-1.5 border-b text-[10px] font-semibold uppercase tracking-wider ${
                isDark ? 'border-stone-800 text-stone-400' : 'border-[#E2DDD5] text-stone-500'
              }`}>
                Select Governed Environment
              </div>

              <div className="max-h-80 overflow-y-auto py-1 space-y-0.5">
                {ROLE_OPTIONS.map((option) => {
                  const Icon = option.icon;
                  const isSelected = option.role === currentRole;

                  return (
                    <button
                      key={option.id}
                      id={`role-option-${option.id}`}
                      onClick={() => {
                        onSelectRole(option.role, option.scopeType);
                        setIsOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 text-left transition-colors cursor-pointer ${
                        isSelected 
                          ? isDark
                            ? 'bg-[#C5A059]/15 text-white border-l-2 border-[#C5A059]' 
                            : 'bg-[#C5A059]/15 text-stone-900 border-l-2 border-[#8C6B28]'
                          : isDark
                            ? 'hover:bg-[#162032] text-stone-300 hover:text-white'
                            : 'hover:bg-[#FAF7F2] text-stone-700 hover:text-stone-900'
                      }`}
                      role="option"
                      aria-selected={isSelected}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className={`w-6 h-6 rounded flex items-center justify-center shrink-0 ${
                          isSelected 
                            ? isDark ? 'bg-[#C5A059] text-[#0B111E]' : 'bg-[#8C6B28] text-white' 
                            : isDark ? 'bg-[#162032] text-stone-400 border border-stone-700' : 'bg-[#FAF7F2] text-stone-600 border border-stone-300'
                        }`}>
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className={`font-medium text-xs ${
                              isSelected ? (isDark ? 'text-[#DFB76C]' : 'text-[#8C6B28]') : (isDark ? 'text-stone-200' : 'text-stone-900')
                            }`}>
                              {option.label}
                            </span>
                            <span className={`text-[9px] px-1 py-0.2 rounded font-mono-code ${
                              isDark ? 'bg-stone-800 text-stone-400' : 'bg-stone-200 text-stone-700'
                            }`}>
                              {option.badge}
                            </span>
                          </div>
                          <p className={`text-[10px] mt-0.5 leading-tight ${
                            isDark ? 'text-stone-400' : 'text-stone-500'
                          }`}>
                            {option.description}
                          </p>
                        </div>
                      </div>

                      {isSelected && (
                        <Check className={`w-4 h-4 shrink-0 ml-2 ${isDark ? 'text-[#DFB76C]' : 'text-[#8C6B28]'}`} />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
