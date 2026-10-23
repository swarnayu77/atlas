import React, { useState } from 'react';
import { 
  Compass, 
  Network, 
  Lightbulb, 
  Layers, 
  BookOpen, 
  FolderArchive, 
  MessageSquareCode,
  Activity,
  Sun,
  Moon,
  Menu,
  X,
  Search,
  CheckCircle2
} from 'lucide-react';

export type ActiveTab = 
  | 'discover' 
  | 'graph' 
  | 'hypotheses' 
  | 'gaps' 
  | 'literature' 
  | 'copilot'
  | 'workspace';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenDiagnostics: () => void;
  savedDiscoveriesCount: number;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  sourcesConnected?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenDiagnostics,
  savedDiscoveriesCount,
  theme,
  onToggleTheme,
  sourcesConnected = true,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'discover', label: 'Discover', icon: Compass },
    { id: 'graph', label: 'Knowledge Graph', icon: Network },
    { id: 'hypotheses', label: 'Hypotheses', icon: Lightbulb },
    { id: 'gaps', label: 'Research Gaps', icon: Layers },
    { id: 'literature', label: 'Literature & Patents', icon: BookOpen },
    { id: 'copilot', label: 'Research Copilot', icon: MessageSquareCode },
    { id: 'workspace', label: 'Research Workspace', icon: FolderArchive, count: savedDiscoveriesCount },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#E5E7EB] dark:border-[#1E293B] bg-white/95 dark:bg-[#111827]/95 backdrop-blur-md transition-colors">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Brand Lockup */}
        <div className="flex items-center gap-3 shrink-0">
          <button 
            onClick={() => setActiveTab('discover')} 
            className="flex items-center gap-2.5 text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-lg p-0.5"
          >
            <div className="h-8 w-8 rounded-lg bg-indigo-600 dark:bg-indigo-500 flex items-center justify-center text-white font-bold text-sm shadow-xs transition-transform group-hover:scale-105">
              <span className="tracking-tighter font-mono">A</span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-[#172033] dark:text-[#F1F5F9] font-heading leading-none">
                ATLAS
              </span>
              <span className="text-[11px] text-[#667085] dark:text-[#94A3B8] font-normal leading-tight mt-0.5">
                Scientific Intelligence
              </span>
            </div>
          </button>
        </div>

        {/* Center: Desktop Single-line Navigation */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as ActiveTab)}
                className={`relative px-3 py-1.5 rounded-lg text-[13px] font-medium transition-colors whitespace-nowrap flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                  isActive
                    ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/70 dark:bg-indigo-950/40'
                    : 'text-[#667085] dark:text-[#94A3B8] hover:text-[#172033] dark:hover:text-[#F1F5F9] hover:bg-slate-50 dark:hover:bg-slate-800/50'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-[#667085] dark:text-[#94A3B8]'}`} />
                <span>{item.label}</span>
                {typeof item.count === 'number' && item.count > 0 && (
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-slate-100 dark:bg-slate-800 text-[#667085] dark:text-[#94A3B8]">
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right: Actions, Compact Source Status, Theme Toggle */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Compact Source Status Button */}
          <button
            onClick={onOpenDiagnostics}
            className="hidden sm:inline-flex items-center gap-1.5 text-xs text-[#667085] dark:text-[#94A3B8] hover:text-[#172033] dark:hover:text-[#F1F5F9] px-2.5 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors border border-transparent hover:border-[#E5E7EB] dark:hover:border-[#1E293B]"
            title="OpenAlex, Europe PMC, arXiv integrations live. Click to view status."
          >
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
            <span className="font-sans font-medium text-[12px]">Research sources connected</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={onToggleTheme}
            className="p-2 text-[#667085] dark:text-[#94A3B8] hover:text-[#172033] dark:hover:text-[#F1F5F9] hover:bg-slate-100 dark:hover:bg-slate-800/60 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#667085] dark:text-[#94A3B8] hover:text-[#172033] dark:hover:text-[#F1F5F9] hover:bg-slate-100 dark:hover:bg-slate-800/60 rounded-lg transition-colors"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Collapsible Navigation Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E5E7EB] dark:border-[#1E293B] bg-white dark:bg-[#111827] px-4 py-3 space-y-1 shadow-lg">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id as ActiveTab);
                  setMobileMenuOpen(false);
                }}
                className={`w-full px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-between ${
                  isActive
                    ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/70 dark:bg-indigo-950/40'
                    : 'text-[#667085] dark:text-[#94A3B8] hover:text-[#172033] dark:hover:text-[#F1F5F9]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {typeof item.count === 'number' && item.count > 0 && (
                  <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-[#667085] dark:text-[#94A3B8]">
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
          <div className="pt-2 border-t border-[#E5E7EB] dark:border-[#1E293B] flex items-center justify-between text-xs text-[#667085] dark:text-[#94A3B8] px-2 py-1">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Sources connected
            </span>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDiagnostics();
              }}
              className="text-indigo-600 dark:text-indigo-400 font-medium"
            >
              Diagnostics
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
