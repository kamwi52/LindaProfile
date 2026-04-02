import React, { useState, useEffect } from 'react';
import { Monitor, Presentation } from 'lucide-react';
import AppSiteView from './App-SiteView.jsx';
import AppPresentation from './App-Presentation.jsx';

function App() {
  const [isPresentationMode, setIsPresentationMode] = useState(() => {
    // Check localStorage for saved preference, default to false (site view)
    const saved = localStorage.getItem('linda-portal-mode');
    return saved ? JSON.parse(saved) : false;
  });

  const toggleMode = () => {
    const newMode = !isPresentationMode;
    setIsPresentationMode(newMode);
    localStorage.setItem('linda-portal-mode', JSON.stringify(newMode));
  };

  // Mode toggle button component
  const ModeToggle = () => (
    <button
      onClick={toggleMode}
      className="fixed top-4 right-4 z-50 bg-white/90 backdrop-blur-sm border-2 border-gray-300 rounded-lg p-3 shadow-lg hover:shadow-xl transition-all duration-200 group"
      title={isPresentationMode ? 'Switch to Site View' : 'Switch to Presentation Mode'}
    >
      {isPresentationMode ? (
        <Monitor className="w-6 h-6 text-blue-600 group-hover:scale-110 transition-transform" />
      ) : (
        <Presentation className="w-6 h-6 text-blue-600 group-hover:scale-110 transition-transform" />
      )}
      <div className="absolute -bottom-12 right-0 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        {isPresentationMode ? 'Site View' : 'Presentation Mode'}
      </div>
    </button>
  );

  return (
    <div className="relative">
      <ModeToggle />
      {isPresentationMode ? <AppPresentation /> : <AppSiteView />}
    </div>
  );
}

export default App;