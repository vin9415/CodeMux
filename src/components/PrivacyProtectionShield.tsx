import React, { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { ShieldAlert } from 'lucide-react';

export const PrivacyProtectionShield: React.FC = () => {
  const { currentUser, addToast } = useApp();

  useEffect(() => {
    // Check if current user is admin/developer with authorized bypass
    const isAuthorizedDeveloper = currentUser?.role === 'admin';

    const handleContextMenu = (e: MouseEvent) => {
      // If authorized admin, permit context menu if needed, otherwise block inspection
      if (!isAuthorizedDeveloper) {
        e.preventDefault();
        addToast(
          'info',
          'Source Protection Active',
          'Right-click inspection and source viewing are disabled for Code Mux proprietary content.'
        );
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isAuthorizedDeveloper) return;

      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const cmdOrCtrl = isMac ? e.metaKey : e.ctrlKey;

      // F12 key (DevTools)
      if (e.key === 'F12') {
        e.preventDefault();
        addToast(
          'info',
          'Developer Console Restricted',
          'Browser developer tools are restricted to authorized platform engineers.'
        );
        return false;
      }

      // Ctrl + Shift + I / Cmd + Option + I (Inspect)
      if (cmdOrCtrl && e.shiftKey && (e.key === 'I' || e.key === 'i')) {
        e.preventDefault();
        addToast(
          'info',
          'Inspector Restricted',
          'Source inspection is locked to prevent unauthorized code extraction.'
        );
        return false;
      }

      // Ctrl + Shift + J / Cmd + Option + J (Console)
      if (cmdOrCtrl && e.shiftKey && (e.key === 'J' || e.key === 'j')) {
        e.preventDefault();
        return false;
      }

      // Ctrl + Shift + C / Cmd + Option + C (Element Inspector)
      if (cmdOrCtrl && e.shiftKey && (e.key === 'C' || e.key === 'c')) {
        e.preventDefault();
        return false;
      }

      // Ctrl + U / Cmd + Option + U (View Page Source)
      if (cmdOrCtrl && (e.key === 'U' || e.key === 'u')) {
        e.preventDefault();
        addToast(
          'info',
          'View-Source Blocked',
          'Source code is compiled and protected by Code Mux security protocols.'
        );
        return false;
      }

      // Ctrl + S (Save Page / Offline Scraping)
      if (cmdOrCtrl && (e.key === 'S' || e.key === 's')) {
        e.preventDefault();
        return false;
      }
    };

    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentUser, addToast]);

  return null;
};
