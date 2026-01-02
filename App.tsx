
import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import RightPanel from './components/RightPanel';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import Community from './pages/Community';
import Profile from './pages/Profile';
import Auth from './pages/Auth';
import { storageService } from './services/storageService';
import { User } from './types';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const session = storageService.getSession();
    setUser(session);
    setLoading(false);
  }, []);

  if (loading) return null;

  if (!user) {
    return <Auth />;
  }

  return (
    <div className="flex h-screen bg-[#020617] text-slate-200 overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden" onClick={() => setIsMobileMenuOpen(false)}></div>
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 w-64 z-50 transform lg:translate-x-0 lg:static transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <Sidebar onClose={() => setIsMobileMenuOpen(false)} />
      </aside>

      {/* Main Content Container */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="lg:hidden p-4 flex justify-between items-center glass border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <span className="font-bold text-sm">N</span>
            </div>
            <span className="font-bold">NovaBiz</span>
          </div>
          <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 bg-white/5 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </header>

        <div className="flex-1 flex overflow-hidden">
          {/* Page Router Area */}
          <div className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-10 no-scrollbar">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/community" element={<Community />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>

          {/* Right Info Panel - Hidden on Mobile */}
          <aside className="hidden xl:block w-80 border-l border-white/10">
            <RightPanel />
          </aside>
        </div>
      </main>
    </div>
  );
};

export default App;
