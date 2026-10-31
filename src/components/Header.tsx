import React, { useState } from 'react';
import { Sprout, Smartphone, Monitor, Shield, LogOut, Menu, X, ChevronRight } from 'lucide-react';
import { UserRole } from '../types';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  userRole: UserRole;
  isMobileFrame: boolean;
  setIsMobileFrame: (val: boolean) => void;
  onOpenAuth: () => void;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  userRole,
  isMobileFrame,
  setIsMobileFrame,
  onOpenAuth,
  onLogout,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (tab: string) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 w-full">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2 sm:gap-4">
        
        {/* Left: Brand Wordmark */}
        <button
          onClick={() => handleNavClick('landing')}
          className="flex items-center gap-2 text-base sm:text-lg font-bold tracking-tight text-slate-900 shrink-0 hover:opacity-90 transition-opacity"
        >
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-600 text-white shadow-xs">
            <Sprout className="w-5 h-5" />
          </span>
          <span className="font-extrabold text-slate-900 tracking-tight">AgriPulse</span>
        </button>

        {/* Center: Desktop Navigation Tabs - Crisp & Auto-Fitting */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-xs xl:text-sm font-medium text-slate-600">
          <button
            onClick={() => handleNavClick('landing')}
            className={`px-2.5 py-1.5 rounded-lg transition-colors hover:text-emerald-700 hover:bg-slate-50 ${
              activeTab === 'landing' ? 'text-emerald-700 font-bold bg-emerald-50/80' : ''
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => handleNavClick('photosynthesis')}
            className={`px-2.5 py-1.5 rounded-lg transition-colors hover:text-emerald-700 hover:bg-slate-50 ${
              activeTab === 'photosynthesis' ? 'text-emerald-700 font-bold bg-emerald-50/80' : ''
            }`}
          >
            Photosynthesis
          </button>
          <button
            onClick={() => handleNavClick('sdgs')}
            className={`px-2.5 py-1.5 rounded-lg transition-colors hover:text-emerald-700 hover:bg-slate-50 ${
              activeTab === 'sdgs' ? 'text-emerald-700 font-bold bg-emerald-50/80' : ''
            }`}
          >
            SDGs & Impact
          </button>

          {/* Authenticated-only navigation links */}
          {userRole === 'grower' && (
            <button
              onClick={() => handleNavClick('grower')}
              className={`px-2.5 py-1.5 rounded-lg transition-colors text-emerald-700 hover:bg-emerald-50 font-semibold ${
                activeTab === 'grower' ? 'bg-emerald-100/70 font-bold' : ''
              }`}
            >
              Grower IoT
            </button>
          )}

          {userRole === 'admin' && (
            <>
              <button
                onClick={() => handleNavClick('grower')}
                className={`px-2.5 py-1.5 rounded-lg transition-colors text-slate-600 hover:text-emerald-700 hover:bg-slate-50 ${
                  activeTab === 'grower' ? 'text-emerald-700 font-bold bg-emerald-50/80' : ''
                }`}
              >
                Grower Node
              </button>
              <button
                onClick={() => handleNavClick('admin')}
                className={`px-2.5 py-1.5 rounded-lg transition-colors text-emerald-700 hover:bg-emerald-50 font-bold ${
                  activeTab === 'admin' ? 'bg-emerald-100/70' : ''
                }`}
              >
                Admin Fleet
              </button>
            </>
          )}
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* Mobile device frame preview toggle */}
          <button
            onClick={() => setIsMobileFrame(!isMobileFrame)}
            title={isMobileFrame ? 'Switch to Desktop Layout' : 'Preview in Mobile Smartphone Frame'}
            className="inline-flex items-center gap-1.5 px-2 sm:px-2.5 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors shrink-0"
          >
            {isMobileFrame ? (
              <>
                <Monitor className="w-3.5 h-3.5 text-slate-600" />
                <span className="hidden sm:inline">Desktop</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3.5 h-3.5 text-slate-600" />
                <span className="hidden sm:inline">Mobile App</span>
              </>
            )}
          </button>

          {userRole !== 'guest' ? (
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="text-[11px] font-mono font-bold text-slate-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md shrink-0">
                {userRole === 'admin' ? 'ADMIN' : 'GROWER'}
              </span>
              <button
                onClick={onLogout}
                title="Log Out"
                className="px-2 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-1 shrink-0"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Log Out</span>
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="px-3 sm:px-4 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-xs transition-colors shrink-0 flex items-center gap-1.5"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </button>
          )}

          {/* Mobile / Tablet Menu Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors ml-1"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile / Compact Tablet Dropdown Drawer (Zero Horizontal Scroll!) */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-3 shadow-lg space-y-1.5 text-sm animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 px-2.5 pb-1">
            Navigation Menu
          </div>
          <button
            onClick={() => handleNavClick('landing')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors ${
              activeTab === 'landing' ? 'bg-emerald-50 text-emerald-800 font-bold' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <span>Overview</span>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>
          <button
            onClick={() => handleNavClick('photosynthesis')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors ${
              activeTab === 'photosynthesis' ? 'bg-emerald-50 text-emerald-800 font-bold' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <span>Photosynthesis & Science</span>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>
          <button
            onClick={() => handleNavClick('sdgs')}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors ${
              activeTab === 'sdgs' ? 'bg-emerald-50 text-emerald-800 font-bold' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <span>Sustainability & UN SDGs</span>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>

          {/* Authenticated Tabs in Mobile Drawer */}
          {userRole === 'grower' && (
            <button
              onClick={() => handleNavClick('grower')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors ${
                activeTab === 'grower' ? 'bg-emerald-100 text-emerald-900 font-bold' : 'text-emerald-700 font-semibold hover:bg-emerald-50'
              }`}
            >
              <span>Grower IoT Controls</span>
              <ChevronRight className="w-4 h-4 text-emerald-600" />
            </button>
          )}

          {userRole === 'admin' && (
            <>
              <button
                onClick={() => handleNavClick('grower')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors ${
                  activeTab === 'grower' ? 'bg-emerald-50 text-emerald-800 font-bold' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>Grower Hardware Node</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
              <button
                onClick={() => handleNavClick('admin')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors ${
                  activeTab === 'admin' ? 'bg-emerald-100 text-emerald-900 font-bold' : 'text-emerald-700 font-bold hover:bg-emerald-50'
                }`}
              >
                <span>Admin Fleet & Operations</span>
                <ChevronRight className="w-4 h-4 text-emerald-600" />
              </button>
            </>
          )}
        </div>
      )}
    </header>
  );
};
