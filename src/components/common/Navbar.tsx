import React, { useState } from 'react';
import { EtesLogo } from './EtesLogo';
import { ThemeToggle } from './ThemeToggle';
import { LoginModal } from './LoginModal';
import { useTheme } from '../../context/ThemeContext';
import { RelationshipType, Person } from '../../types';
import { 
  Menu, 
  X,
  LogIn
} from 'lucide-react';

interface NavbarProps {
  currentRole: RelationshipType;
  currentPersona?: Person;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onSelectRole: (role: RelationshipType, scopeType?: 'enterprise_wide' | 'business_unit') => void;
  currentScopeType?: 'enterprise_wide' | 'business_unit';
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRole,
  currentPersona,
  activeTab,
  setActiveTab,
  onSelectRole,
  currentScopeType
}) => {
  const { isDark } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  // Tab configurations per room
  const publicNav = [
    { id: 'workplace-trust', label: 'Workplace Trust™' },
    { id: 'research', label: 'Research & Insights' },
    { id: 'directory', label: 'Trust Directory' },
    { id: 'constitution', label: 'Constitution' },
    { id: 'about', label: 'About ETES' },
    { id: 'contact', label: 'Contact' }
  ];

  const employeeNav = [
    { id: 'emp-home', label: 'Overview' },
    { id: 'emp-participation', label: 'My Participation' },
    { id: 'emp-assessment', label: 'Assessment' },
    { id: 'emp-privacy', label: 'My Privacy' },
    { id: 'emp-journey', label: 'Trust Journey' },
    { id: 'emp-help', label: 'Help & Safeguarding' }
  ];

  const executiveNav = [
    { id: 'exec-overview', label: 'Overview' },
    { id: 'exec-signals', label: 'Trust Signals™' },
    { id: 'exec-dna', label: 'Workplace DNA™' },
    { id: 'exec-attention', label: 'Areas Requiring Attention' },
    { id: 'exec-reports', label: 'Reports' },
    { id: 'exec-actions', label: 'Actions & Repair' },
    { id: 'exec-settings', label: 'Permissions & Scope' }
  ];

  const investorNav = [
    { id: 'inv-landing', label: 'Opportunity & Model' },
    { id: 'inv-dashboard', label: 'Investor Dashboard' },
    { id: 'inv-dataroom', label: 'Secure Data Room' },
    { id: 'inv-updates', label: 'Governance & Updates' }
  ];

  const adminNav = [
    { id: 'admin-cms', label: 'Content & CMS' },
    { id: 'admin-question-bank', label: 'Question Bank Store' },
    { id: 'admin-roles', label: 'Users, Roles & Scope' },
    { id: 'admin-approvals', label: 'Publication Gate' },
    { id: 'admin-certification', label: 'Certification Registry' },
    { id: 'admin-audit', label: 'Audit Logs' }
  ];

  const communityNav = [
    { id: 'comm-dashboard', label: 'Dashboard' },
    { id: 'comm-profile', label: 'My Profile' },
    { id: 'comm-opportunities', label: 'Opportunities' },
    { id: 'comm-resources', label: 'Resources' },
    { id: 'comm-learning', label: 'Learning' },
    { id: 'comm-community', label: 'Community' },
    { id: 'comm-events', label: 'Events' }
  ];

  const contractorNav = [
    { id: 'contractor-profile', label: 'My professional Profile' },
    { id: 'contractor-engagements', label: 'Active Engagements' },
    { id: 'contractor-trust', label: 'Payment & Reliability Trust' },
    { id: 'contractor-reviews', label: 'Relationship & Reviews' },
    { id: 'contractor-growth', label: 'Participation & Growth' }
  ];

  const getNavItems = () => {
    switch (currentRole) {
      case 'employee':
        return employeeNav;
      case 'executive':
        return executiveNav;
      case 'investor':
        return investorNav;
      case 'community':
        return communityNav;
      case 'contractor':
        return contractorNav;
      case 'admin':
        return adminNav;
      default:
        return publicNav;
    }
  };

  const navItems = getNavItems();

  return (
    <header className={`border-b shadow-lg relative z-40 transition-colors duration-200 ${
      isDark ? 'bg-[#070B13] text-white border-stone-800/80' : 'bg-[#FAF7F2] text-stone-900 border-[#E2DDD5]'
    }`}>
      <div className="w-full max-w-[1440px] mx-auto px-2 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between min-h-[5.75rem] sm:min-h-[6.25rem] py-2.5 sm:py-3 gap-4">
          
          {/* Brand Logo - moved further to the left */}
          <div 
            className="shrink-0 cursor-pointer -ml-0.5 sm:-ml-1.5 lg:-ml-2.5 transition-transform duration-150 hover:opacity-95"
            onClick={() => {
              if (currentRole === 'public') setActiveTab('home');
              else if (currentRole === 'employee') setActiveTab('emp-home');
              else if (currentRole === 'executive') setActiveTab('exec-overview');
              else if (currentRole === 'investor') setActiveTab('inv-dashboard');
              else if (currentRole === 'admin') setActiveTab('admin-cms');
            }}
          >
            <EtesLogo size="md" variant={isDark ? 'light' : 'dark'} showSubtitle={false} />
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden xl:flex items-center gap-1 2xl:gap-1.5" id="desktop-institutional-nav">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-item-${item.id}`}
                  onClick={() => setActiveTab(item.id)}
                  className={`whitespace-nowrap shrink-0 px-2.5 2xl:px-3 py-1.5 2xl:py-2 text-[11px] 2xl:text-xs font-medium tracking-wider uppercase transition-all duration-150 rounded ${
                    isActive
                      ? isDark
                        ? 'text-[#DFB76C] bg-[#0E1726] border border-[#C5A059]/40 shadow-sm font-semibold'
                        : 'text-[#8C6B28] bg-white border border-[#C5A059]/50 shadow-xs font-bold'
                      : isDark
                        ? 'text-stone-300 hover:text-white hover:bg-[#0E1726]/60'
                        : 'text-stone-600 hover:text-stone-900 hover:bg-[#EFE9DF]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}

            {/* LOGIN Button directly after CONTACT link */}
            {currentRole === 'public' && (
              <button
                id="nav-login-btn"
                onClick={() => setLoginModalOpen(true)}
                className="whitespace-nowrap shrink-0 ml-1.5 2xl:ml-2 px-3.5 2xl:px-4 py-1.5 2xl:py-2 text-[11px] 2xl:text-xs font-bold tracking-wider uppercase transition-all duration-150 rounded-md bg-[#C5A059] text-black hover:bg-[#DFB76C] shadow-sm hover:shadow flex items-center gap-1.5 cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>LOGIN</span>
              </button>
            )}
          </nav>

          {/* Right Area: Theme Toggle & mobile menu toggle */}
          <div className="shrink-0 flex items-center gap-3">
            <ThemeToggle variant="compact" />

            {/* Mobile Hamburger */}
            <button
              id="mobile-nav-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`xl:hidden p-2 rounded-md border transition-colors ${
                isDark 
                  ? 'bg-[#0E1726] text-stone-300 hover:text-white hover:bg-[#162032] border-stone-800' 
                  : 'bg-white text-stone-700 hover:text-stone-900 hover:bg-[#EFE9DF] border-[#E2DDD5]'
              }`}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className={`xl:hidden border-t py-3 space-y-1 transition-colors ${
            isDark ? 'border-stone-800 bg-[#070B13]' : 'border-[#E2DDD5] bg-[#FAF7F2]'
          }`} id="mobile-menu-drawer">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs font-medium tracking-wider uppercase rounded ${
                    isActive
                      ? isDark
                        ? 'text-[#DFB76C] bg-[#0E1726] font-semibold'
                        : 'text-[#8C6B28] bg-white font-bold border border-[#C5A059]/40'
                      : isDark
                        ? 'text-stone-300 hover:text-white hover:bg-[#0E1726]/60'
                        : 'text-stone-600 hover:text-stone-900 hover:bg-[#EFE9DF]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}

            {/* Mobile LOGIN Button */}
            {currentRole === 'public' && (
              <div className="pt-2 mt-1 border-t border-stone-800/40">
                <button
                  id="mobile-nav-login-btn"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setLoginModalOpen(true);
                  }}
                  className="w-full text-left px-3 py-2.5 text-xs font-bold tracking-wider uppercase rounded bg-[#C5A059] text-black hover:bg-[#DFB76C] flex items-center justify-between shadow-sm cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <LogIn className="w-4 h-4" />
                    <span>LOGIN</span>
                  </span>
                  <span className="text-[10px] uppercase font-mono-code font-semibold opacity-90">Secure Access →</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Institutional Portal Authentication Modal */}
      <LoginModal 
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onLogin={onSelectRole}
      />
    </header>
  );
};
