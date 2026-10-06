import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface ThemeToggleProps {
  variant?: 'compact' | 'sidebar' | 'pill';
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ 
  variant = 'compact',
  className = '' 
}) => {
  const { theme, isDark, toggleTheme } = useTheme();

  if (variant === 'sidebar') {
    return (
      <button
        type="button"
        id="dashboard-theme-toggle-sidebar"
        onClick={toggleTheme}
        aria-label={`Switch to ${isDark ? 'Light' : 'Dark'} mode`}
        title={`Switch to ${isDark ? 'Light' : 'Dark'} mode`}
        className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
          isDark
            ? 'text-slate-200 hover:text-white bg-[#0B1323] border border-slate-800/90 shadow-xs'
            : 'text-stone-800 hover:text-stone-900 bg-white border border-stone-200/90 shadow-xs'
        } ${className}`}
      >
        <div className="flex items-center gap-3">
          {isDark ? (
            <Moon className="w-5 h-5 text-[#DFB76C]" />
          ) : (
            <Sun className="w-5 h-5 text-[#C5A059]" />
          )}
          <span className="text-sm font-medium">{isDark ? 'Dark Mode' : 'Light Mode'}</span>
        </div>

        {/* Institutional Toggle Switch */}
        <div className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-0.5 shrink-0 ${
          isDark ? 'bg-[#C5A059]' : 'bg-[#D1C7BD]'
        }`}>
          <div className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${
            isDark ? 'translate-x-5' : 'translate-x-0'
          }`} />
        </div>
      </button>
    );
  }

  if (variant === 'pill') {
    return (
      <button
        type="button"
        id="dashboard-theme-toggle-pill"
        onClick={toggleTheme}
        aria-label={`Switch to ${isDark ? 'Light' : 'Dark'} mode`}
        title={`Switch to ${isDark ? 'Light' : 'Dark'} mode`}
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
          isDark 
            ? 'bg-[#131B2A] text-stone-200 border-[#1E293B] hover:border-[#C5A059]/40 hover:text-white' 
            : 'bg-white text-stone-700 border-[#E2DDD5] hover:border-[#C5A059]/50 hover:text-stone-900 shadow-sm'
        } ${className}`}
      >
        {isDark ? (
          <>
            <Moon className="w-3.5 h-3.5 text-[#DFB76C]" />
            <span>Dark</span>
          </>
        ) : (
          <>
            <Sun className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Light</span>
          </>
        )}
      </button>
    );
  }

  // Default: Compact icon button
  return (
    <button
      type="button"
      id="dashboard-theme-toggle-compact"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'Light' : 'Dark'} mode`}
      title={`Switch to ${isDark ? 'Light' : 'Dark'} mode`}
      className={`p-2 rounded-lg border transition-all ${
        isDark
          ? 'bg-[#131B2A] text-stone-300 border-[#1E293B] hover:border-[#C5A059]/40 hover:text-white hover:bg-[#1A2333]'
          : 'bg-white text-stone-700 border-[#E2DDD5] hover:border-[#C5A059]/50 hover:text-stone-900 hover:bg-[#FAF7F2] shadow-sm'
      } ${className}`}
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-[#DFB76C] hover:rotate-45 transition-transform" />
      ) : (
        <Moon className="w-4 h-4 text-[#C5A059] hover:-rotate-12 transition-transform" />
      )}
    </button>
  );
};
