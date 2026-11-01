import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/ToastContainer';
import { EarlyAccessModal } from './components/EarlyAccessModal';

import { HomeView } from './views/HomeView';
import { FocusAreasView } from './views/FocusAreasView';
import { PlacementsView } from './views/PlacementsView';
import { AboutView } from './views/AboutView';
import { ContactView } from './views/ContactView';
import { LoginView } from './views/LoginView';
import { StudentPortalView } from './views/portals/StudentPortalView';
import { MentorPortalView } from './views/portals/MentorPortalView';
import { AdminPortalView } from './views/portals/AdminPortalView';
import { PrivacyProtectionShield } from './components/PrivacyProtectionShield';
import { GeminiChatbot } from './components/GeminiChatbot';
import { ShieldAlert } from 'lucide-react';
import {
  PrivacyPolicyView,
  TermsView,
  RefundPolicyView,
  CodeOfConductView,
} from './views/PolicyViews';
import { CertificateVerificationView } from './views/CertificateVerificationView';

const AccessRestrictedView: React.FC<{ requiredRole: string }> = ({ requiredRole }) => {
  const { navigateTo } = useApp();
  return (
    <div className="w-full py-20 px-4 flex items-center justify-center min-h-[60vh]">
      <div className="max-w-md w-full bg-white p-8 rounded-3xl border border-stone-200 text-center space-y-4 shadow-xs">
        <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
          <ShieldAlert className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-bold text-stone-900 font-display">Access Restricted &amp; Protected</h2>
        <p className="text-xs text-stone-500">
          This workspace contains protected Code Mux engineering resources. Only authorized {requiredRole}s may access this view.
        </p>
        <button
          onClick={() => navigateTo('login')}
          className="w-full py-2.5 px-4 bg-[#FF6B16] text-white text-xs font-bold rounded-xl hover:bg-orange-600 transition-colors cursor-pointer shadow-xs"
        >
          Authenticate as {requiredRole}
        </button>
      </div>
    </div>
  );
};

const AppContent: React.FC = () => {
  const { currentPage, currentUser } = useApp();

  const renderCurrentView = () => {
    switch (currentPage) {
      case 'home':
        return <HomeView />;
      case 'domains':
        return <FocusAreasView />;
      case 'placements':
        return <PlacementsView />;
      case 'about':
        return <AboutView />;
      case 'contact':
        return <ContactView />;
      case 'login':
        return <LoginView />;
      case 'student-portal':
        if (!currentUser) {
          return <AccessRestrictedView requiredRole="Student" />;
        }
        return <StudentPortalView />;
      case 'mentor-portal':
        if (!currentUser || (currentUser.role !== 'mentor' && currentUser.role !== 'admin')) {
          return <AccessRestrictedView requiredRole="Mentor / Faculty" />;
        }
        return <MentorPortalView />;
      case 'admin-portal':
        if (!currentUser || currentUser.role !== 'admin') {
          return <AccessRestrictedView requiredRole="System Administrator" />;
        }
        return <AdminPortalView />;
      case 'privacy':
        return <PrivacyPolicyView />;
      case 'terms':
        return <TermsView />;
      case 'refund':
        return <RefundPolicyView />;
      case 'conduct':
        return <CodeOfConductView />;
      case 'verify-certificate':
        return <CertificateVerificationView />;
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-900 flex flex-col font-sans selection:bg-orange-500/20 selection:text-orange-950">
      <Navbar />
      <main className="flex-1 flex flex-col">
        {renderCurrentView()}
      </main>
      <Footer />

      {/* Global Interactive Modal & Security Guard */}
      <EarlyAccessModal />
      <ToastContainer />
      <PrivacyProtectionShield />
      <GeminiChatbot />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
