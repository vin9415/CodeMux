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
import {
  PrivacyPolicyView,
  TermsView,
  RefundPolicyView,
  CodeOfConductView,
} from './views/PolicyViews';

const AppContent: React.FC = () => {
  const { currentPage } = useApp();

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
        return <StudentPortalView />;
      case 'mentor-portal':
        return <MentorPortalView />;
      case 'admin-portal':
        return <AdminPortalView />;
      case 'privacy':
        return <PrivacyPolicyView />;
      case 'terms':
        return <TermsView />;
      case 'refund':
        return <RefundPolicyView />;
      case 'conduct':
        return <CodeOfConductView />;
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

      {/* Global Interactive Modal */}
      <EarlyAccessModal />
      <ToastContainer />
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
