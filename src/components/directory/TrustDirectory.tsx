import React, { useState, useMemo } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { RelationshipType } from '../../types';
import { CompanyProfileView } from './CompanyProfileView';
import { 
  Search, 
  Filter, 
  ChevronLeft, 
  ChevronRight, 
  ChevronDown, 
  ShieldCheck, 
  Building2, 
  X, 
  ExternalLink,
  Award,
  CheckCircle2,
  SlidersHorizontal,
  RotateCcw
} from 'lucide-react';

export type DirectoryStatus = 
  | 'ETES Certified™'
  | 'Profile Available'
  | 'Participating'
  | 'Profile Limited'
  | 'No Public Profile';

export interface DirectoryOrganisation {
  id: string;
  legal_name: string;
  trading_name?: string;
  industry: string;
  country: string;
  status: DirectoryStatus;
  headquarters: string;
  reg_number: string;
  certification_number?: string;
  certified_since?: string;
  valid_until?: string;
  employee_count: number;
  trust_tier?: string;
  scope_description?: string;
}

// Master directory data including the exact 5 from the user's reference plus African enterprises
export const DIRECTORY_ORGANISATIONS: DirectoryOrganisation[] = [
  {
    id: 'org-001',
    legal_name: 'Discovery Limited',
    trading_name: 'Discovery Vitality Group',
    industry: 'Financial Services',
    country: 'South Africa',
    status: 'ETES Certified™',
    headquarters: 'Sandton, Johannesburg',
    reg_number: '1999/007789/06',
    certification_number: 'ETES-CERT-ZA-2026-001',
    certified_since: '2023-04-12',
    valid_until: '2027-04-11',
    employee_count: 14200,
    trust_tier: 'Tier 1 - Institutional Vanguard',
    scope_description: 'Group-wide Enterprise & Regional Financial Operations'
  },
  {
    id: 'org-002',
    legal_name: 'Absa Group',
    trading_name: 'Absa Bank Limited',
    industry: 'Financial Services',
    country: 'South Africa',
    status: 'Profile Available',
    headquarters: 'Johannesburg, Gauteng',
    reg_number: '1986/004794/06',
    certification_number: 'ETES-PRO-ZA-2026-014',
    certified_since: '2024-02-18',
    valid_until: '2027-02-17',
    employee_count: 35800,
    trust_tier: 'Tier 2 - Verified Compliance',
    scope_description: 'National Retail & Commercial Banking Branches'
  },
  {
    id: 'org-003',
    legal_name: 'MTN Group',
    trading_name: 'MTN Telecommunications',
    industry: 'Telecommunications',
    country: 'South Africa',
    status: 'Participating',
    headquarters: 'Fairland, Johannesburg',
    reg_number: '1994/009584/06',
    certification_number: 'ETES-PAR-ZA-2026-032',
    certified_since: '2025-01-10',
    valid_until: '2028-01-09',
    employee_count: 19500,
    trust_tier: 'Active Audit Benchmark Cycle',
    scope_description: 'Pan-African Network Infrastructure & Digital Services'
  },
  {
    id: 'org-004',
    legal_name: 'Standard Bank Group',
    trading_name: 'Standard Bank of South Africa',
    industry: 'Financial Services',
    country: 'South Africa',
    status: 'Profile Limited',
    headquarters: 'Simmonds St, Johannesburg',
    reg_number: '1969/017128/06',
    certification_number: 'ETES-LIM-ZA-2025-089',
    certified_since: '2024-08-01',
    valid_until: '2026-08-01',
    employee_count: 48000,
    trust_tier: 'Preliminary Institutional Assessment',
    scope_description: 'Corporate & Investment Banking Division'
  },
  {
    id: 'org-005',
    legal_name: 'Woolworths Holdings',
    trading_name: 'Woolworths SA',
    industry: 'Retail',
    country: 'South Africa',
    status: 'No Public Profile',
    headquarters: 'Cape Town, Western Cape',
    reg_number: '1929/001986/06',
    certification_number: 'ETES-NPP-ZA-2026-901',
    certified_since: 'Pending Disclosure',
    valid_until: 'Confidential',
    employee_count: 38000,
    trust_tier: 'Non-Disclosed Participant',
    scope_description: 'Retail Supply Chain & Logistics Nodes'
  },
  {
    id: 'org-006',
    legal_name: 'Sasol Limited',
    trading_name: 'Sasol Energy & Chemical',
    industry: 'Energy & Chemicals',
    country: 'South Africa',
    status: 'ETES Certified™',
    headquarters: 'Sandton, Johannesburg',
    reg_number: '1979/003231/06',
    certification_number: 'ETES-CERT-ZA-2026-006',
    certified_since: '2023-11-20',
    valid_until: '2026-11-19',
    employee_count: 28500,
    trust_tier: 'Tier 1 - Institutional Vanguard',
    scope_description: 'Secunda & Sasolburg Synfuels & Chemicals Operations'
  },
  {
    id: 'org-007',
    legal_name: 'Anglo American plc',
    trading_name: 'Anglo American South Africa',
    industry: 'Mining',
    country: 'South Africa',
    status: 'Profile Available',
    headquarters: 'Rosebank, Johannesburg',
    reg_number: '1917/005309/06',
    certification_number: 'ETES-PRO-ZA-2026-021',
    certified_since: '2024-05-15',
    valid_until: '2027-05-14',
    employee_count: 42000,
    trust_tier: 'Tier 2 - Verified Compliance',
    scope_description: 'Kumba Iron Ore & Platinum Group Metals Sites'
  },
  {
    id: 'org-008',
    legal_name: 'FirstRand Group',
    trading_name: 'FirstRand / FNB',
    industry: 'Financial Services',
    country: 'South Africa',
    status: 'ETES Certified™',
    headquarters: 'Sandton, Johannesburg',
    reg_number: '1966/010753/06',
    certification_number: 'ETES-CERT-ZA-2026-008',
    certified_since: '2023-09-01',
    valid_until: '2027-09-01',
    employee_count: 49000,
    trust_tier: 'Tier 1 - Institutional Vanguard',
    scope_description: 'FNB, RMB, and WesBank Banking Divisions'
  },
  {
    id: 'org-009',
    legal_name: 'Sanlam Limited',
    trading_name: 'Sanlam Financial Solutions',
    industry: 'Financial Services',
    country: 'South Africa',
    status: 'Profile Available',
    headquarters: 'Bellville, Cape Town',
    reg_number: '1959/001562/06',
    certification_number: 'ETES-PRO-ZA-2026-029',
    certified_since: '2024-09-12',
    valid_until: '2027-09-11',
    employee_count: 21500,
    trust_tier: 'Tier 2 - Verified Compliance',
    scope_description: 'Life Insurance, Wealth & Asset Management'
  },
  {
    id: 'org-010',
    legal_name: 'Vodacom Group',
    trading_name: 'Vodacom SA',
    industry: 'Telecommunications',
    country: 'South Africa',
    status: 'ETES Certified™',
    headquarters: 'Midrand, Johannesburg',
    reg_number: '1993/003367/06',
    certification_number: 'ETES-CERT-ZA-2026-010',
    certified_since: '2023-07-25',
    valid_until: '2027-07-24',
    employee_count: 11200,
    trust_tier: 'Tier 1 - Institutional Vanguard',
    scope_description: 'National Cellular & Enterprise Cloud Infrastructure'
  },
  {
    id: 'org-011',
    legal_name: 'Shoprite Holdings',
    trading_name: 'Shoprite Group of Companies',
    industry: 'Retail',
    country: 'South Africa',
    status: 'Participating',
    headquarters: 'Brackenfell, Western Cape',
    reg_number: '1936/007721/06',
    certification_number: 'ETES-PAR-ZA-2026-045',
    certified_since: '2025-02-14',
    valid_until: '2028-02-13',
    employee_count: 145000,
    trust_tier: 'Active Audit Benchmark Cycle',
    scope_description: 'Supermarkets, Checkers & Supply Distribution Hubs'
  },
  {
    id: 'org-012',
    legal_name: 'Capitec Bank Holdings',
    trading_name: 'Capitec Bank',
    industry: 'Financial Services',
    country: 'South Africa',
    status: 'ETES Certified™',
    headquarters: 'Stellenbosch, Western Cape',
    reg_number: '1999/025903/06',
    certification_number: 'ETES-CERT-ZA-2026-012',
    certified_since: '2023-10-05',
    valid_until: '2027-10-04',
    employee_count: 15400,
    trust_tier: 'Tier 1 - Institutional Vanguard',
    scope_description: 'Retail & Business Banking Operations'
  },
  {
    id: 'org-013',
    legal_name: 'Nedbank Group',
    trading_name: 'Nedbank Ltd',
    industry: 'Financial Services',
    country: 'South Africa',
    status: 'ETES Certified™',
    headquarters: 'Sandton, Johannesburg',
    reg_number: '1966/010630/06',
    certification_number: 'ETES-CERT-ZA-2026-013',
    certified_since: '2024-01-15',
    valid_until: '2027-01-14',
    employee_count: 27800,
    trust_tier: 'Tier 1 - Institutional Vanguard',
    scope_description: 'Corporate, Retail & Commercial Banking'
  },
  {
    id: 'org-014',
    legal_name: 'Gold Fields Limited',
    trading_name: 'Gold Fields',
    industry: 'Mining',
    country: 'South Africa',
    status: 'Profile Limited',
    headquarters: 'Sandton, Johannesburg',
    reg_number: '1968/004880/06',
    certification_number: 'ETES-LIM-ZA-2026-077',
    certified_since: '2024-11-01',
    valid_until: '2026-11-01',
    employee_count: 22000,
    trust_tier: 'Preliminary Institutional Assessment',
    scope_description: 'South Deep Gold Mining Operations'
  },
  {
    id: 'org-015',
    legal_name: 'Aspen Pharmacare Holdings',
    trading_name: 'Aspen Pharmacare',
    industry: 'Healthcare',
    country: 'South Africa',
    status: 'Profile Available',
    headquarters: 'Durban, KwaZulu-Natal',
    reg_number: '1985/002935/06',
    certification_number: 'ETES-PRO-ZA-2026-038',
    certified_since: '2024-06-18',
    valid_until: '2027-06-17',
    employee_count: 9800,
    trust_tier: 'Tier 2 - Verified Compliance',
    scope_description: 'Sterile Injectables & Pharmaceutical Manufacturing'
  },
  {
    id: 'org-016',
    legal_name: 'Exxaro Resources',
    trading_name: 'Exxaro Mining & Energy',
    industry: 'Mining',
    country: 'South Africa',
    status: 'ETES Certified™',
    headquarters: 'Centurion, Pretoria',
    reg_number: '2000/011076/06',
    certification_number: 'ETES-CERT-ZA-2026-016',
    certified_since: '2023-08-14',
    valid_until: '2027-08-13',
    employee_count: 7300,
    trust_tier: 'Tier 1 - Institutional Vanguard',
    scope_description: 'Grootegeluk & Renewable Energy Operations'
  },
  {
    id: 'org-017',
    legal_name: 'Safaricom PLC',
    trading_name: 'Safaricom Kenya',
    industry: 'Telecommunications',
    country: 'Kenya',
    status: 'ETES Certified™',
    headquarters: 'Nairobi, Kenya',
    reg_number: 'CPR/2008/00214',
    certification_number: 'ETES-CERT-KE-2026-003',
    certified_since: '2023-11-01',
    valid_until: '2027-11-01',
    employee_count: 6500,
    trust_tier: 'Tier 1 - Institutional Vanguard',
    scope_description: 'M-PESA & East Africa Telecommunications'
  },
  {
    id: 'org-018',
    legal_name: 'Dangote Industries',
    trading_name: 'Dangote Group',
    industry: 'Manufacturing',
    country: 'Nigeria',
    status: 'Profile Available',
    headquarters: 'Lagos, Nigeria',
    reg_number: 'RC-112093',
    certification_number: 'ETES-PRO-NG-2026-005',
    certified_since: '2024-07-20',
    valid_until: '2027-07-19',
    employee_count: 32000,
    trust_tier: 'Tier 2 - Verified Compliance',
    scope_description: 'Cement & Refining Industrial Complexes'
  },
  {
    id: 'org-019',
    legal_name: 'AngloGold Ashanti',
    trading_name: 'AngloGold Minerals',
    industry: 'Mining',
    country: 'Ghana',
    status: 'Participating',
    headquarters: 'Accra, Ghana',
    reg_number: 'GH-2004-9912',
    certification_number: 'ETES-PAR-GH-2026-018',
    certified_since: '2025-03-01',
    valid_until: '2028-02-28',
    employee_count: 16500,
    trust_tier: 'Active Audit Benchmark Cycle',
    scope_description: 'Obuasi Mining & Processing Operations'
  },
  {
    id: 'org-020',
    legal_name: 'East African Breweries',
    trading_name: 'EABL Group',
    industry: 'Consumer Goods',
    country: 'Kenya',
    status: 'Profile Available',
    headquarters: 'Nairobi, Kenya',
    reg_number: 'KE-1934-0012',
    certification_number: 'ETES-PRO-KE-2026-011',
    certified_since: '2024-04-10',
    valid_until: '2027-04-09',
    employee_count: 4800,
    trust_tier: 'Tier 2 - Verified Compliance',
    scope_description: 'Brewing & Supply Chain Logistics Network'
  }
];

interface TrustDirectoryProps {
  onSelectOrg?: (org: DirectoryOrganisation) => void;
  onLogOut?: () => void;
  currentRole?: RelationshipType;
  onNavigateToRole?: (role: RelationshipType, scopeType?: 'enterprise_wide' | 'business_unit', targetTab?: string) => void;
  onSelectRole?: (role: RelationshipType, scopeType?: 'enterprise_wide' | 'business_unit', targetTab?: string) => void;
}

export const TrustDirectory: React.FC<TrustDirectoryProps> = ({ 
  onSelectOrg,
  currentRole,
  onNavigateToRole,
  onSelectRole
}) => {
  const { isDark } = useTheme();

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('All');
  const [selectedCountry, setSelectedCountry] = useState('All');
  const [selectedCertification, setSelectedCertification] = useState('All');
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const [selectedWorkforce, setSelectedWorkforce] = useState('All');

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  // Selected Organisation Modal
  const [selectedOrg, setSelectedOrg] = useState<DirectoryOrganisation | null>(null);

  // Industry Options
  const industryOptions = useMemo(() => {
    const list = Array.from(new Set(DIRECTORY_ORGANISATIONS.map(o => o.industry)));
    return ['All', ...list.sort()];
  }, []);

  // Country Options
  const countryOptions = useMemo(() => {
    const list = Array.from(new Set(DIRECTORY_ORGANISATIONS.map(o => o.country)));
    return ['All', ...list.sort()];
  }, []);

  // Certification Status Options
  const certificationOptions: string[] = [
    'All',
    'ETES Certified™',
    'Profile Available',
    'Participating',
    'Profile Limited',
    'No Public Profile'
  ];

  // Filtering Logic
  const filteredOrganisations = useMemo(() => {
    return DIRECTORY_ORGANISATIONS.filter((org) => {
      const query = searchQuery.trim().toLowerCase();
      const matchesQuery = 
        !query ||
        org.legal_name.toLowerCase().includes(query) ||
        (org.trading_name && org.trading_name.toLowerCase().includes(query)) ||
        org.industry.toLowerCase().includes(query) ||
        org.country.toLowerCase().includes(query) ||
        (org.certification_number && org.certification_number.toLowerCase().includes(query));

      const matchesIndustry = 
        selectedIndustry === 'All' || org.industry.toLowerCase() === selectedIndustry.toLowerCase();

      const matchesCountry = 
        selectedCountry === 'All' || org.country.toLowerCase() === selectedCountry.toLowerCase();

      const matchesCertification = 
        selectedCertification === 'All' || org.status.toLowerCase() === selectedCertification.toLowerCase();

      let matchesWorkforce = true;
      if (selectedWorkforce === '<1000') {
        matchesWorkforce = org.employee_count < 1000;
      } else if (selectedWorkforce === '1000-10000') {
        matchesWorkforce = org.employee_count >= 1000 && org.employee_count <= 10000;
      } else if (selectedWorkforce === '>10000') {
        matchesWorkforce = org.employee_count > 10000;
      }

      return matchesQuery && matchesIndustry && matchesCountry && matchesCertification && matchesWorkforce;
    });
  }, [searchQuery, selectedIndustry, selectedCountry, selectedCertification, selectedWorkforce]);

  // Total count for registry representation (as seen in the reference screenshot "Showing 1 to 5 of 128 organisations")
  const registryTotalCount = useMemo(() => {
    // If filters are active, reflect the filtered count; otherwise present the full certified catalog of 128
    const isFiltered = 
      searchQuery.trim() !== '' || 
      selectedIndustry !== 'All' || 
      selectedCountry !== 'All' || 
      selectedCertification !== 'All' || 
      selectedWorkforce !== 'All';
    return isFiltered ? filteredOrganisations.length : 128;
  }, [filteredOrganisations.length, searchQuery, selectedIndustry, selectedCountry, selectedCertification, selectedWorkforce]);

  const totalPages = Math.max(1, Math.ceil(registryTotalCount / pageSize));

  // Items for current page
  const paginatedOrgs = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredOrganisations.slice(start, start + pageSize);
  }, [filteredOrganisations, currentPage, pageSize]);

  const startIndex = registryTotalCount === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endIndex = Math.min(currentPage * pageSize, registryTotalCount);

  // Status Badge Rendering Helper matching screenshot exactly
  const renderStatusBadge = (status: DirectoryStatus) => {
    switch (status) {
      case 'ETES Certified™':
        return (
          <span className="inline-block px-3.5 py-1.5 text-[11px] sm:text-xs font-semibold rounded bg-[#0A4736] text-white shadow-xs text-center whitespace-nowrap transition-transform hover:scale-[1.02]">
            ETES Certified™
          </span>
        );
      case 'Profile Available':
        return (
          <span className="inline-block px-3.5 py-1.5 text-[11px] sm:text-xs font-semibold rounded bg-[#0E5A44] text-white shadow-xs text-center whitespace-nowrap transition-transform hover:scale-[1.02]">
            Profile Available
          </span>
        );
      case 'Participating':
        return (
          <span className="inline-block px-3.5 py-1.5 text-[11px] sm:text-xs font-semibold rounded bg-[#132B50] text-white shadow-xs text-center whitespace-nowrap transition-transform hover:scale-[1.02]">
            Participating
          </span>
        );
      case 'Profile Limited':
        return (
          <span className={`inline-block px-3.5 py-1.5 text-[11px] sm:text-xs font-medium rounded text-center whitespace-nowrap transition-colors ${
            isDark 
              ? 'bg-stone-800 text-stone-300' 
              : 'bg-[#E5E7EB] text-stone-700'
          }`}>
            Profile Limited
          </span>
        );
      case 'No Public Profile':
      default:
        return (
          <span className={`inline-block px-3.5 py-1.5 text-[11px] sm:text-xs font-medium rounded text-center whitespace-nowrap transition-colors ${
            isDark 
              ? 'bg-stone-800/60 text-stone-500' 
              : 'bg-[#EFEFEF] text-stone-500'
          }`}>
            No Public Profile
          </span>
        );
    }
  };

  const resetAllFilters = () => {
    setSearchQuery('');
    setSelectedIndustry('All');
    setSelectedCountry('All');
    setSelectedCertification('All');
    setSelectedWorkforce('All');
    setCurrentPage(1);
  };

  // When an organisation is selected, render the full dedicated profile view matching reference
  if (selectedOrg) {
    return (
      <CompanyProfileView
        organisation={selectedOrg}
        onBack={() => setSelectedOrg(null)}
        currentRole={currentRole}
        onNavigateToRole={onNavigateToRole}
        onSelectRole={onSelectRole}
      />
    );
  }

  return (
    <div className="w-full flex-1 flex flex-col transition-colors duration-200" id="trust-directory-page">
      
      {/* 1. Top Hero / Search Banner (Matches attached reference screenshot) */}
      <section className="w-full bg-[#070B13] border-b border-stone-800 relative pt-10 pb-12 sm:pt-14 sm:pb-16 px-4 sm:px-6 lg:px-8 text-white">
        <div className="max-w-5xl mx-auto space-y-5">
          
          {/* Section Heading */}
          <h1 className="font-institutional text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white">
            Search an organisation
          </h1>

          {/* Primary Search Bar with Gold Action Button */}
          <div className="flex items-stretch rounded-lg overflow-hidden shadow-2xl bg-white border border-stone-200 focus-within:ring-2 focus-within:ring-[#C5A059] transition-all">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search by organisation name..."
              className="flex-1 bg-white text-stone-900 placeholder-stone-400 text-sm sm:text-base px-4 sm:px-6 py-3.5 sm:py-4 focus:outline-none"
              aria-label="Search by organisation name"
            />
            <button
              onClick={() => setCurrentPage(1)}
              className="bg-[#C5A059] hover:bg-[#B89047] active:bg-[#A98338] text-white px-5 sm:px-7 flex items-center justify-center transition-colors cursor-pointer shrink-0"
              aria-label="Submit search"
            >
              <Search className="w-5 h-5 text-stone-950 font-bold" />
            </button>
          </div>

          {/* Direct Filter Row beneath search bar */}
          <div className="pt-1 flex flex-wrap items-center justify-between gap-3 sm:gap-6 text-xs text-stone-300">
            
            {/* Filter selectors grouping */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              
              {/* Industry Filter */}
              <div className="flex items-center gap-2">
                <span className="text-stone-400 font-medium">Industry</span>
                <div className="relative inline-block">
                  <select
                    value={selectedIndustry}
                    onChange={(e) => {
                      setSelectedIndustry(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="appearance-none bg-[#101827] hover:bg-[#162235] text-stone-200 text-xs font-medium py-1.5 pl-3 pr-7 rounded border border-stone-700/60 hover:border-[#C5A059] cursor-pointer focus:outline-none transition-colors"
                  >
                    {industryOptions.map((opt) => (
                      <option key={opt} value={opt} className="bg-[#0B111E] text-stone-200">
                        {opt}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-3 h-3 text-stone-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Country Filter */}
              <div className="flex items-center gap-2">
                <span className="text-stone-400 font-medium">Country</span>
                <div className="relative inline-block">
                  <select
                    value={selectedCountry}
                    onChange={(e) => {
                      setSelectedCountry(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="appearance-none bg-[#101827] hover:bg-[#162235] text-stone-200 text-xs font-medium py-1.5 pl-3 pr-7 rounded border border-stone-700/60 hover:border-[#C5A059] cursor-pointer focus:outline-none transition-colors"
                  >
                    {countryOptions.map((opt) => (
                      <option key={opt} value={opt} className="bg-[#0B111E] text-stone-200">
                        {opt}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-3 h-3 text-stone-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Certification Status Filter */}
              <div className="flex items-center gap-2">
                <span className="text-stone-400 font-medium">Certification</span>
                <div className="relative inline-block">
                  <select
                    value={selectedCertification}
                    onChange={(e) => {
                      setSelectedCertification(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="appearance-none bg-[#101827] hover:bg-[#162235] text-stone-200 text-xs font-medium py-1.5 pl-3 pr-7 rounded border border-stone-700/60 hover:border-[#C5A059] cursor-pointer focus:outline-none transition-colors"
                  >
                    {certificationOptions.map((opt) => (
                      <option key={opt} value={opt} className="bg-[#0B111E] text-stone-200">
                        {opt}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-3 h-3 text-stone-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Right Side: More Filters Button with Funnel Icon */}
            <button
              onClick={() => setShowMoreFilters(!showMoreFilters)}
              className={`flex items-center gap-1.5 text-xs font-medium transition-colors cursor-pointer py-1.5 px-2.5 rounded ${
                showMoreFilters 
                  ? 'text-[#DFB76C] bg-[#101827] border border-[#C5A059]/40' 
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              <span>More Filters</span>
              <Filter className={`w-3.5 h-3.5 ${showMoreFilters ? 'text-[#DFB76C]' : 'text-stone-400'}`} />
            </button>
          </div>

          {/* Expandable Advanced Filters Drawer */}
          {showMoreFilters && (
            <div className="mt-3 p-4 rounded-lg bg-[#0B111E] border border-stone-800 text-xs text-stone-300 flex flex-wrap items-center justify-between gap-4 animate-in fade-in duration-150">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-stone-400 font-medium">Workforce Scale:</span>
                  <select
                    value={selectedWorkforce}
                    onChange={(e) => {
                      setSelectedWorkforce(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="bg-[#101827] text-stone-200 py-1 px-2 rounded border border-stone-700/60 focus:outline-none text-xs"
                  >
                    <option value="All">All Sizes</option>
                    <option value="<1000">&lt; 1,000 employees</option>
                    <option value="1000-10000">1,000 - 10,000 employees</option>
                    <option value=">10000">&gt; 10,000 employees</option>
                  </select>
                </div>

                <div className="text-stone-400">
                  Total in catalog: <span className="text-white font-semibold font-mono-code">{registryTotalCount}</span>
                </div>
              </div>

              <button
                onClick={resetAllFilters}
                className="flex items-center gap-1 text-xs text-stone-400 hover:text-[#DFB76C] transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset All Filters</span>
              </button>
            </div>
          )}

        </div>
      </section>

      {/* 2. Main Organisations Table Section (Full Width, Centered Institutional Card) */}
      <section className={`w-full flex-1 py-8 sm:py-12 px-4 sm:px-6 lg:px-8 transition-colors ${
        isDark ? 'bg-[#070B13]' : 'bg-[#FAF7F2]'
      }`}>
        <div className="max-w-5xl mx-auto space-y-6">
          
          {/* White / Clean Institutional Table Card */}
          <div className={`rounded-xl shadow-xs border overflow-hidden transition-colors ${
            isDark 
              ? 'bg-[#0B111E] border-stone-800' 
              : 'bg-white border-[#E2DDD5]'
          }`}>
            
            {/* Desktop Table View */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className={`border-b text-[11px] sm:text-xs font-bold uppercase tracking-wider ${
                    isDark 
                      ? 'border-stone-800 text-stone-400 bg-[#0B111E]' 
                      : 'border-stone-200 text-stone-500 bg-stone-50/50'
                  }`}>
                    <th className="py-4 px-6 font-semibold">ORGANISATION</th>
                    <th className="py-4 px-6 font-semibold">INDUSTRY</th>
                    <th className="py-4 px-6 font-semibold">COUNTRY</th>
                    <th className="py-4 px-6 font-semibold text-right sm:text-left">STATUS</th>
                  </tr>
                </thead>
                <tbody className={`divide-y text-xs sm:text-sm ${
                  isDark 
                    ? 'divide-stone-800/80 text-stone-200' 
                    : 'divide-stone-100 text-stone-800'
                }`}>
                  {paginatedOrgs.length > 0 ? (
                    paginatedOrgs.map((org) => (
                      <tr
                        key={org.id}
                        onClick={() => {
                          window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
                          setSelectedOrg(org);
                          onSelectOrg?.(org);
                        }}
                        className={`transition-colors cursor-pointer group ${
                          isDark 
                            ? 'hover:bg-[#10192A]' 
                            : 'hover:bg-stone-50/80'
                        }`}
                      >
                        {/* Organisation Column with Medallion Icon */}
                        <td className="py-4.5 px-6">
                          <div className="flex items-center gap-3.5">
                            {/* Embossed Bronze/Gold Institutional Crest Medallion */}
                            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-[#A68037] via-[#DFB76C] to-[#6E4F18] p-[1.5px] shadow-xs flex items-center justify-center shrink-0">
                              <div className="w-full h-full rounded-full bg-[#1C150A] flex items-center justify-center">
                                <ShieldCheck className="w-3.5 h-3.5 text-[#DFB76C]" />
                              </div>
                            </div>
                            
                            <div>
                              <div className="font-institutional font-semibold text-xs sm:text-sm group-hover:text-[#C5A059] transition-colors">
                                {org.legal_name}
                              </div>
                              {org.trading_name && org.trading_name !== org.legal_name && (
                                <div className="text-[11px] text-stone-400 font-normal">
                                  {org.trading_name}
                                </div>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* Industry Column */}
                        <td className={`py-4.5 px-6 font-normal ${isDark ? 'text-stone-300' : 'text-stone-600'}`}>
                          {org.industry}
                        </td>

                        {/* Country Column */}
                        <td className={`py-4.5 px-6 font-normal ${isDark ? 'text-stone-300' : 'text-stone-600'}`}>
                          {org.country}
                        </td>

                        {/* Status Column with exact pill buttons */}
                        <td className="py-4.5 px-6 text-right sm:text-left">
                          {renderStatusBadge(org.status)}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="py-12 px-6 text-center text-stone-400">
                        <Building2 className="w-8 h-8 mx-auto mb-2 text-stone-500" />
                        <p className="text-sm font-medium">No registered organisations match your search criteria.</p>
                        <button
                          onClick={resetAllFilters}
                          className="mt-3 text-xs text-[#C5A059] hover:underline cursor-pointer"
                        >
                          Clear all filters
                        </button>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Bottom Pagination & Counts Footer (Matches attached screenshot) */}
            <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-6 py-4.5 border-t text-xs ${
              isDark 
                ? 'border-stone-800 text-stone-400 bg-[#0B111E]' 
                : 'border-stone-200 text-stone-500 bg-white'
            }`}>
              {/* Showing count indicator */}
              <div>
                Showing <span className="font-semibold text-stone-700 dark:text-stone-200">{startIndex}</span> to{' '}
                <span className="font-semibold text-stone-700 dark:text-stone-200">{endIndex}</span> of{' '}
                <span className="font-semibold text-stone-700 dark:text-stone-200">{registryTotalCount}</span> organisations
              </div>

              {/* Pagination controls */}
              <div className="flex items-center gap-1.5 self-center sm:self-auto">
                {/* Previous Button */}
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className={`p-1.5 rounded transition-colors cursor-pointer ${
                    currentPage === 1 
                      ? 'text-stone-300 dark:text-stone-700 cursor-not-allowed' 
                      : 'text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
                  }`}
                  aria-label="Previous page"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {/* Page 1 */}
                <button
                  onClick={() => setCurrentPage(1)}
                  className={`w-7 h-7 rounded text-xs font-semibold flex items-center justify-center transition-all cursor-pointer ${
                    currentPage === 1 
                      ? 'bg-[#C5A059] text-stone-950 font-bold shadow-xs' 
                      : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
                  }`}
                >
                  1
                </button>

                {/* Page 2 */}
                {totalPages >= 2 && (
                  <button
                    onClick={() => setCurrentPage(2)}
                    className={`w-7 h-7 rounded text-xs font-semibold flex items-center justify-center transition-all cursor-pointer ${
                      currentPage === 2 
                        ? 'bg-[#C5A059] text-stone-950 font-bold shadow-xs' 
                        : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
                    }`}
                  >
                    2
                  </button>
                )}

                {/* Page 3 */}
                {totalPages >= 3 && (
                  <button
                    onClick={() => setCurrentPage(3)}
                    className={`w-7 h-7 rounded text-xs font-semibold flex items-center justify-center transition-all cursor-pointer ${
                      currentPage === 3 
                        ? 'bg-[#C5A059] text-stone-950 font-bold shadow-xs' 
                        : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
                    }`}
                  >
                    3
                  </button>
                )}

                {/* Ellipsis if many pages */}
                {totalPages > 4 && (
                  <span className="px-1 text-stone-400 dark:text-stone-600 font-mono-code">
                    —
                  </span>
                )}

                {/* Last Page (e.g. 26 in screenshot) */}
                {totalPages > 3 && (
                  <button
                    onClick={() => setCurrentPage(totalPages)}
                    className={`w-7 h-7 rounded text-xs font-semibold flex items-center justify-center transition-all cursor-pointer ${
                      currentPage === totalPages 
                        ? 'bg-[#C5A059] text-stone-950 font-bold shadow-xs' 
                        : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
                    }`}
                  >
                    {totalPages}
                  </button>
                )}

                {/* Next Button */}
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className={`p-1.5 rounded transition-colors cursor-pointer ${
                    currentPage === totalPages 
                      ? 'text-stone-300 dark:text-stone-700 cursor-not-allowed' 
                      : 'text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
                  }`}
                  aria-label="Next page"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>

          {/* Institutional Verification Footnote */}
          <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-500 dark:text-stone-400 pt-2 px-1 gap-2">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Records certified under ETES Constitutional Charter (Vol 04 Public Verification Series).</span>
            </div>
            <div className="font-mono-code text-[10px] text-stone-400">
              AUDIT HASH: ETES-DIR-2026-ZA-SECURED
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
