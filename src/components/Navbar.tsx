import React, { useState } from 'react';
import { useApp, PageRoute } from '../context/AppContext';
import { Menu, X, ArrowRight, User, LogOut, Shield, Briefcase, GraduationCap } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { currentPage, navigateTo, openEarlyAccessModal, currentUser, logoutUser } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { label: string; page: PageRoute }[] = [
    { label: 'Focus Areas', page: 'domains' },
    { label: 'Career Support', page: 'placements' },
    { label: 'About Us', page: 'about' },
    { label: 'Contact', page: 'contact' },
    { label: 'Verify Certificate', page: 'verify-certificate' },
  ];

  const handleNavClick = (page: PageRoute) => {
    navigateTo(page);
    setMobileMenuOpen(false);
  };

  const getPortalRoute = (): PageRoute => {
    if (!currentUser) return 'login';
    if (currentUser.role === 'admin') return 'admin-portal';
    if (currentUser.role === 'mentor') return 'mentor-portal';
    return 'student-portal';
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-6">
        {/* Zone 1: Wordmark with Official Logo */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 text-left group shrink-0 focus:outline-none cursor-pointer"
        >
          <img
            src="/assets/aistudio/codemuxlogo_913c6b11.png"
            alt="Code Mux Logo"
            className="w-10 h-10 object-contain rounded-xl transition-transform group-hover:scale-105 shadow-xs"
            referrerPolicy="no-referrer"
          />
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-stone-900 whitespace-nowrap font-display">
              Code <span className="text-[#FF6B16]">Mux</span>
            </span>
          </div>
        </button>

        {/* Zone 2: Nav Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-600">
          {navLinks.map((link) => {
            const isActive = currentPage === link.page;
            return (
              <button
                key={link.page}
                onClick={() => handleNavClick(link.page)}
                className={`transition-colors whitespace-nowrap py-1 relative hover:text-stone-900 cursor-pointer ${
                  isActive ? 'text-stone-950 font-semibold' : ''
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF6B16] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Login & Action Controls */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          {currentUser ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleNavClick(getPortalRoute())}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#FAF8F5] border border-stone-300 hover:border-[#FF6B16] text-xs font-semibold text-stone-900 transition-colors cursor-pointer"
              >
                {currentUser.role === 'admin' && <Shield className="w-3.5 h-3.5 text-[#FF6B16]" />}
                {currentUser.role === 'mentor' && <Briefcase className="w-3.5 h-3.5 text-amber-600" />}
                {currentUser.role === 'student' && <GraduationCap className="w-3.5 h-3.5 text-emerald-600" />}
                <span>
                  {currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1)}: {currentUser.name.split(' ')[0]}
                </span>
              </button>

              <button
                onClick={logoutUser}
                title="Sign Out"
                className="p-2 text-stone-400 hover:text-rose-600 rounded-lg transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleNavClick('login')}
                className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  currentPage === 'login'
                    ? 'text-[#FF6B16] font-bold'
                    : 'text-stone-700 hover:text-stone-950'
                }`}
              >
                Log In
              </button>

              <button
                onClick={() => openEarlyAccessModal()}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#FF6B16] hover:bg-orange-600 rounded-lg shadow-sm transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5"
              >
                Get Early Access <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-stone-600 hover:text-stone-900 rounded-lg focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-stone-200 px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.page}
                onClick={() => handleNavClick(link.page)}
                className={`text-left px-3 py-2 text-sm rounded-lg transition-colors ${
                  currentPage === link.page
                    ? 'bg-orange-50 text-[#FF6B16] font-semibold'
                    : 'text-stone-600 hover:bg-stone-50'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-stone-200 space-y-2">
            {currentUser ? (
              <div className="space-y-2">
                <button
                  onClick={() => handleNavClick(getPortalRoute())}
                  className="w-full py-2.5 text-center text-xs font-semibold text-stone-900 bg-[#FAF8F5] border border-stone-300 rounded-lg"
                >
                  Open {currentUser.role.toUpperCase()} Portal ({currentUser.name})
                </button>
                <button
                  onClick={() => {
                    logoutUser();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2 text-center text-xs text-rose-600 font-semibold"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleNavClick('login')}
                  className="py-2.5 text-center text-xs font-semibold text-stone-800 bg-[#FAF8F5] border border-stone-300 rounded-lg"
                >
                  Log In
                </button>
                <button
                  onClick={() => {
                    openEarlyAccessModal();
                    setMobileMenuOpen(false);
                  }}
                  className="py-2.5 text-center text-xs font-semibold text-white bg-[#FF6B16] rounded-lg shadow-sm"
                >
                  Early Access
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
