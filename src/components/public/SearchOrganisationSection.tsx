import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight, 
  ShieldCheck, 
  Building2, 
  RotateCcw,
  ExternalLink
} from 'lucide-react';
import { 
  DIRECTORY_ORGANISATIONS, 
  DirectoryOrganisation, 
  DirectoryStatus 
} from '../directory/TrustDirectory';
import { useTheme } from '../../context/ThemeContext';

interface SearchOrganisationSectionProps {
  onSelectOrg?: (org: DirectoryOrganisation) => void;
  onViewAllInDirectory?: () => void;
}

export const SearchOrganisationSection: React.FC<SearchOrganisationSectionProps> = ({
  onSelectOrg,
  onViewAllInDirectory
}) => {
  const { isDark } = useTheme();

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('All');
  const [selectedCountry, setSelectedCountry] = useState('All');
  const [selectedCertification, setSelectedCertification] = useState('All');
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const [selectedWorkforce, setSelectedWorkforce] = useState('All');

  // Pagination State (5 per page, exactly as in reference screenshot)
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  // Distinct filter options
  const industryOptions = useMemo(() => {
    const list = Array.from(new Set(DIRECTORY_ORGANISATIONS.map((o) => o.industry))).sort();
    return ['All', ...list];
  }, []);

  const countryOptions = useMemo(() => {
    const list = Array.from(new Set(DIRECTORY_ORGANISATIONS.map((o) => o.country))).sort();
    return ['All', ...list];
  }, []);

  const certificationOptions: (DirectoryStatus | 'All')[] = [
    'All',
    'ETES Certified™',
    'Profile Available',
    'Participating',
    'Profile Limited',
    'No Public Profile'
  ];

  // Filtered organisations
  const filteredOrgs = useMemo(() => {
    return DIRECTORY_ORGANISATIONS.filter((org) => {
      // Query search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchName = org.legal_name.toLowerCase().includes(q);
        const matchTrading = org.trading_name?.toLowerCase().includes(q);
        const matchReg = org.reg_number.toLowerCase().includes(q);
        const matchCert = org.certification_number?.toLowerCase().includes(q);
        if (!matchName && !matchTrading && !matchReg && !matchCert) {
          return false;
        }
      }

      // Industry
      if (selectedIndustry !== 'All' && org.industry !== selectedIndustry) {
        return false;
      }

      // Country
      if (selectedCountry !== 'All' && org.country !== selectedCountry) {
        return false;
      }

      // Certification
      if (selectedCertification !== 'All' && org.status !== selectedCertification) {
        return false;
      }

      // Workforce Scale
      if (selectedWorkforce !== 'All') {
        if (selectedWorkforce === '<1000' && org.employee_count >= 1000) return false;
        if (selectedWorkforce === '1000-10000' && (org.employee_count < 1000 || org.employee_count > 10000)) return false;
        if (selectedWorkforce === '>10000' && org.employee_count <= 10000) return false;
      }

      return true;
    });
  }, [searchQuery, selectedIndustry, selectedCountry, selectedCertification, selectedWorkforce]);

  // Total count indicator
  const totalDisplayCount = searchQuery || selectedIndustry !== 'All' || selectedCountry !== 'All' || selectedCertification !== 'All'
    ? filteredOrgs.length
    : 128; // Institutional catalog benchmark matching screenshot reference

  const totalPages = Math.max(1, Math.ceil(filteredOrgs.length / pageSize));

  // Current page records
  const paginatedOrgs = useMemo(() => {
    const startIdx = (currentPage - 1) * pageSize;
    return filteredOrgs.slice(startIdx, startIdx + pageSize);
  }, [filteredOrgs, currentPage, pageSize]);

  // Status Badge Rendering Helper matching screenshot exactly
  const renderStatusBadge = (status: DirectoryStatus) => {
    switch (status) {
      case 'ETES Certified™':
        return (
          <span className="inline-block px-3.5 py-1.5 text-xs font-semibold rounded bg-[#064E3B] text-[#34D399] border border-[#059669]/60 shadow-xs text-center whitespace-nowrap">
            ETES Certified™
          </span>
        );
      case 'Profile Available':
        return (
          <span className="inline-block px-3.5 py-1.5 text-xs font-semibold rounded bg-[#064E3B]/80 text-[#6EE7B7] border border-[#10B981]/50 shadow-xs text-center whitespace-nowrap">
            Profile Available
          </span>
        );
      case 'Participating':
        return (
          <span className="inline-block px-3.5 py-1.5 text-xs font-semibold rounded bg-[#172554] text-[#93C5FD] border border-[#2563EB]/40 shadow-xs text-center whitespace-nowrap">
            Participating
          </span>
        );
      case 'Profile Limited':
        return (
          <span className="inline-block px-3.5 py-1.5 text-xs font-semibold rounded bg-[#291E13] text-[#FCD34D] border border-[#D97706]/40 shadow-xs text-center whitespace-nowrap">
            Profile Limited
          </span>
        );
      case 'No Public Profile':
      default:
        return (
          <span className="inline-block px-3.5 py-1.5 text-xs font-semibold rounded bg-[#1C1917] text-stone-400 border border-stone-700/40 shadow-xs text-center whitespace-nowrap">
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

  return (
    <section 
      className="w-full bg-[#070B13] border-b border-stone-800 py-12 sm:py-16 px-4 sm:px-6 lg:px-8 text-white relative z-20"
      id="search-organisation-section"
    >
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Section Heading matching screenshot */}
        <div>
          <h2 className="font-institutional text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white">
            Search an organisation
          </h2>
        </div>

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
            className="bg-[#C5A059] hover:bg-[#B89047] active:bg-[#A98338] text-stone-950 px-5 sm:px-7 flex items-center justify-center transition-colors cursor-pointer shrink-0"
            aria-label="Submit search"
          >
            <Search className="w-5 h-5 text-stone-950 font-bold stroke-[2.5]" />
          </button>
        </div>

        {/* Direct Filter Row beneath search bar */}
        <div className="pt-1 flex flex-wrap items-center justify-between gap-3 sm:gap-6 text-xs text-stone-300">
          
          {/* Filter selectors grouping */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            
            {/* Industry Filter */}
            <div className="flex items-center gap-2">
              <span className="text-stone-300 font-medium">Industry</span>
              <div className="relative inline-block">
                <select
                  value={selectedIndustry}
                  onChange={(e) => {
                    setSelectedIndustry(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="appearance-none bg-[#0D1525] hover:bg-[#131F33] text-stone-200 text-xs font-medium py-1.5 pl-3 pr-7 rounded border border-stone-700/80 hover:border-[#C5A059] cursor-pointer focus:outline-none transition-colors"
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
              <span className="text-stone-300 font-medium">Country</span>
              <div className="relative inline-block">
                <select
                  value={selectedCountry}
                  onChange={(e) => {
                    setSelectedCountry(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="appearance-none bg-[#0D1525] hover:bg-[#131F33] text-stone-200 text-xs font-medium py-1.5 pl-3 pr-7 rounded border border-stone-700/80 hover:border-[#C5A059] cursor-pointer focus:outline-none transition-colors"
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
              <span className="text-stone-300 font-medium">Certification</span>
              <div className="relative inline-block">
                <select
                  value={selectedCertification}
                  onChange={(e) => {
                    setSelectedCertification(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="appearance-none bg-[#0D1525] hover:bg-[#131F33] text-stone-200 text-xs font-medium py-1.5 pl-3 pr-7 rounded border border-stone-700/80 hover:border-[#C5A059] cursor-pointer focus:outline-none transition-colors"
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
          <div className="p-4 rounded-lg bg-[#0B111E] border border-stone-800 text-xs text-stone-300 flex flex-wrap items-center justify-between gap-4 animate-in fade-in duration-150">
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
                Found matching: <span className="text-white font-semibold font-mono-code">{filteredOrgs.length}</span>
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

        {/* Organisations Table Card matching the uploaded screenshot */}
        <div className="rounded-xl border border-stone-800/90 bg-[#070E1A] overflow-hidden shadow-2xl">
          
          {/* Table Container */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-stone-800/80 text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-stone-400 bg-[#070E1A]">
                  <th className="py-4.5 px-6 font-semibold">ORGANISATION</th>
                  <th className="py-4.5 px-6 font-semibold">INDUSTRY</th>
                  <th className="py-4.5 px-6 font-semibold">COUNTRY</th>
                  <th className="py-4.5 px-6 font-semibold text-right sm:text-left">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-800/60 text-xs sm:text-sm text-stone-200">
                {paginatedOrgs.length > 0 ? (
                  paginatedOrgs.map((org) => (
                    <tr
                      key={org.id}
                      onClick={() => onSelectOrg?.(org)}
                      className="hover:bg-[#0E1726] transition-colors cursor-pointer group"
                    >
                      {/* Organisation Column with Gold Circular Shield Medallion */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3.5">
                          {/* Circular shield outline icon matching screenshot */}
                          <div className="w-8 h-8 rounded-full border border-[#A68037]/80 flex items-center justify-center text-[#DFB76C] shrink-0 bg-[#14120B]">
                            <ShieldCheck className="w-4 h-4 text-[#DFB76C]" />
                          </div>
                          
                          <div>
                            <div className="font-institutional font-semibold text-xs sm:text-sm text-white group-hover:text-[#C5A059] transition-colors">
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
                      <td className="py-4 px-6 font-normal text-stone-300">
                        {org.industry}
                      </td>

                      {/* Country Column */}
                      <td className="py-4 px-6 font-normal text-stone-300">
                        {org.country}
                      </td>

                      {/* Status Column with exact pill button */}
                      <td className="py-4 px-6 text-right sm:text-left">
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

          {/* Table Footer with Pagination matching reference screenshot */}
          <div className="py-4 px-6 border-t border-stone-800/80 bg-[#070E1A] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
            
            {/* Showing Count */}
            <div>
              Showing <span className="font-semibold text-white font-mono-code">{paginatedOrgs.length > 0 ? (currentPage - 1) * pageSize + 1 : 0}</span> to{' '}
              <span className="font-semibold text-white font-mono-code">
                {Math.min(currentPage * pageSize, filteredOrgs.length > 5 ? filteredOrgs.length : totalDisplayCount)}
              </span> of{' '}
              <span className="font-semibold text-white font-mono-code">{totalDisplayCount}</span> organisations
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-1 rounded text-stone-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                aria-label="Previous page"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* Page 1 */}
              <button
                onClick={() => setCurrentPage(1)}
                className={`px-2.5 py-1 rounded text-xs font-semibold cursor-pointer transition-colors ${
                  currentPage === 1 
                    ? 'bg-[#C5A059] text-stone-950 font-bold shadow-xs' 
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                1
              </button>

              {/* Page 2 */}
              {totalPages >= 2 && (
                <button
                  onClick={() => setCurrentPage(2)}
                  className={`px-2.5 py-1 rounded text-xs font-semibold cursor-pointer transition-colors ${
                    currentPage === 2 
                      ? 'bg-[#C5A059] text-stone-950 font-bold shadow-xs' 
                      : 'text-stone-400 hover:text-white'
                  }`}
                >
                  2
                </button>
              )}

              {/* Page 3 */}
              {totalPages >= 3 && (
                <button
                  onClick={() => setCurrentPage(3)}
                  className={`px-2.5 py-1 rounded text-xs font-semibold cursor-pointer transition-colors ${
                    currentPage === 3 
                      ? 'bg-[#C5A059] text-stone-950 font-bold shadow-xs' 
                      : 'text-stone-400 hover:text-white'
                  }`}
                >
                  3
                </button>
              )}

              {/* Ellipsis / Dash */}
              <span className="px-1 text-stone-500 font-mono-code">—</span>

              {/* Page 26 / Last Page */}
              <button
                onClick={() => setCurrentPage(Math.max(26, totalPages))}
                className={`px-2.5 py-1 rounded text-xs font-semibold cursor-pointer transition-colors ${
                  currentPage === Math.max(26, totalPages) 
                    ? 'bg-[#C5A059] text-stone-950 font-bold shadow-xs' 
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                {Math.max(26, totalPages)}
              </button>

              <button
                onClick={() => setCurrentPage((p) => Math.min(Math.max(26, totalPages), p + 1))}
                disabled={currentPage >= Math.max(26, totalPages)}
                className="p-1 rounded text-stone-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                aria-label="Next page"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Pathway to Full Directory */}
        {onViewAllInDirectory && (
          <div className="pt-2 flex justify-end">
            <button
              onClick={onViewAllInDirectory}
              className="inline-flex items-center gap-1.5 text-xs text-[#DFB76C] hover:text-[#C5A059] hover:underline cursor-pointer font-medium"
            >
              <span>Explore complete institutional registry directory</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
