import React, { useState } from 'react';
import { 
  RelationshipType, 
  Person, 
  Organisation 
} from './types';
import { 
  SIMULATED_PERSONAS, 
  SAMPLE_ORGANISATIONS 
} from './data/mockDatabase';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { RelationshipBar } from './components/common/RelationshipBar';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { PublicHeadquarters } from './components/public/PublicHeadquarters';
import { EmployeeRoom } from './components/employee/EmployeeRoom';
import { ExecutiveRoom } from './components/executive/ExecutiveRoom';
import { InvestorRoom } from './components/investor/InvestorRoom';
import { TrustDirectory } from './components/directory/TrustDirectory';
import { AdminControlRoom } from './components/admin/AdminControlRoom';
import { ThriveCommunityRoom } from './components/community/ThriveCommunityRoom';
import { ContractorRoom } from './components/contractor/ContractorRoom';

function AppContent() {
  const { isDark } = useTheme();

  // Current active testing role (Relationship Type)
  const [currentRole, setCurrentRole] = useState<RelationshipType>('public');
  
  // Specific persona key for more granular control (e.g. CEO vs Director within executive)
  const [personaKey, setPersonaKey] = useState<string>('public_guest');
  
  // Active sub-tab inside the active room
  const [activeTab, setActiveTab] = useState<string>('home');

  // Executive scope state ('enterprise_wide' for CEO vs 'business_unit' for Director)
  const [executiveScope, setExecutiveScope] = useState<'enterprise_wide' | 'business_unit'>('enterprise_wide');

  // Current primary organisation
  const primaryOrganisation: Organisation = SAMPLE_ORGANISATIONS[0]; // Vanguard Logistics SA

  // Handle role change from RelationshipBar, Navbar, or In-App Triggers
  const handleRoleChange = (
    newRole: RelationshipType, 
    scopeType?: 'enterprise_wide' | 'business_unit',
    targetTab?: string
  ) => {
    setCurrentRole(newRole);
    if (newRole === 'public') {
      setPersonaKey('public_guest');
      setActiveTab(targetTab || 'home');
    } else if (newRole === 'employee') {
      setPersonaKey('employee_lerato');
      setActiveTab(targetTab || 'emp-home');
    } else if (newRole === 'executive') {
      const targetScope = scopeType || 'enterprise_wide';
      setExecutiveScope(targetScope);
      setPersonaKey(targetScope === 'enterprise_wide' ? 'executive_thabo' : 'executive_johan');
      setActiveTab(targetTab || 'exec-overview');
    } else if (newRole === 'investor') {
      setPersonaKey('investor_marcus');
      setActiveTab(targetTab || 'inv-landing');
    } else if (newRole === 'community') {
      setPersonaKey('community_thabo');
      setActiveTab(targetTab || 'comm-dashboard');
    } else if (newRole === 'contractor') {
      setPersonaKey('contractor_kagiso');
      setActiveTab(targetTab || 'contractor-overview');
    } else if (newRole === 'admin') {
      setPersonaKey('admin_naledi');
      setActiveTab(targetTab || 'admin-cms');
    }
  };

  // Allow switching specifically between CEO and Director under Executive
  const handleExecutiveScopeSwitch = (scope: 'enterprise_wide' | 'business_unit') => {
    setExecutiveScope(scope);
    if (scope === 'enterprise_wide') {
      setPersonaKey('executive_thabo');
    } else {
      setPersonaKey('executive_johan');
    }
  };

  const activePersona: Person = 
    SIMULATED_PERSONAS[personaKey] || 
    SIMULATED_PERSONAS.public_guest || 
    SIMULATED_PERSONAS.public || 
    SIMULATED_PERSONAS.employee;

  const isDashboard = currentRole !== 'public';

  return (
    <div 
      className={`flex flex-col transition-colors duration-200 ${
        isDashboard ? 'h-screen overflow-hidden' : 'min-h-screen'
      } ${
        isDark ? 'bg-[#070B13] text-stone-200' : 'bg-[#FAF7F2] text-stone-900'
      } selection:bg-[#C5A059]/30 selection:text-white`} 
      id="etes-application-root"
    >
      
      {/* 1. Top Role-Based Testing Switcher (Relationship Bar) */}
      <RelationshipBar 
        currentRole={currentRole}
        currentScopeType={executiveScope}
        onSelectRole={handleRoleChange}
      />

      {/* 2. Institutional Navigation Bar (Shown on public screens) */}
      {currentRole === 'public' && (
        <Navbar
          currentRole={currentRole}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onSelectRole={handleRoleChange}
          currentScopeType={executiveScope}
          currentPersona={activePersona}
        />
      )}

      {/* 3. Main Content Router based on currentRole & activeTab */}
      <main className={`flex-1 ${isDashboard ? 'min-h-0 overflow-hidden flex flex-col w-full max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-2 sm:py-4' : 'w-full'}`}>
        {/* PUBLIC ROOM (Home, Constitution, Research, or Directory) */}
        {currentRole === 'public' && (
          activeTab === 'directory' ? (
            <TrustDirectory 
              onSelectOrg={() => {}} 
              onLogOut={() => setActiveTab('home')} 
              currentRole={currentRole}
              onNavigateToRole={handleRoleChange}
              onSelectRole={handleRoleChange}
            />
          ) : (
            <PublicHeadquarters
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              onSelectRole={handleRoleChange}
              onNavigateToRole={handleRoleChange}
              currentRole={currentRole}
            />
          )
        )}

        {/* EMPLOYEE ROOM (Confidential assessment engine & employee experience) */}
        {currentRole === 'employee' && (
          <EmployeeRoom
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            currentPersona={activePersona}
            organisation={primaryOrganisation}
            onLogOut={() => handleRoleChange('public')}
          />
        )}

        {/* EXECUTIVE ROOM (Overview, Trust Signals, Workplace DNA, Attention Areas, Actions, Reports) */}
        {currentRole === 'executive' && (
          <ExecutiveRoom
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            currentPersona={activePersona}
            organisation={primaryOrganisation}
            currentScopeType={executiveScope}
            onSwitchScope={handleExecutiveScopeSwitch}
            onLogOut={() => handleRoleChange('public')}
          />
        )}

        {/* INVESTOR ROOM & SECURE DATA ROOM */}
        {currentRole === 'investor' && (
          <InvestorRoom
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            currentPersona={activePersona}
            onLogOut={() => handleRoleChange('public')}
          />
        )}

        {/* ETES THRIVE COMMUNITY ROOM */}
        {currentRole === 'community' && (
          <ThriveCommunityRoom
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            currentPersona={activePersona}
            onLogOut={() => handleRoleChange('public')}
          />
        )}

        {/* INDEPENDENT CONTRACTOR / FREELANCER ROOM */}
        {currentRole === 'contractor' && (
          <ContractorRoom
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            currentPersona={activePersona}
            onLogOut={() => handleRoleChange('public')}
          />
        )}

        {/* ADMIN CONTROL ROOM (Question Bank store, role-scope, publication gate, audit logs) */}
        {currentRole === 'admin' && (
          <AdminControlRoom
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            currentPersona={activePersona}
            onLogOut={() => handleRoleChange('public')}
          />
        )}
      </main>

      {/* 4. Institutional Footer (Shown on public screens) */}
      {currentRole === 'public' && (
        <Footer 
          onSelectTab={setActiveTab}
          onSelectRole={handleRoleChange}
        />
      )}

    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
