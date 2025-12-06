

import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import Dashboard from './pages/Dashboard';
import Routine from './pages/Routine';
import Notes from './pages/Notes';
import Chatbot from './pages/Chatbot';
import Analytics from './pages/Analytics';
import Login from './pages/Login';
import Profile from './pages/Profile';
import { ViewState, UserProfile } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.DASHBOARD);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [sessionSeconds, setSessionSeconds] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);

  const handleLogin = (profile: UserProfile) => {
    setUser(profile);
    setStartTime(Date.now());
    setSessionSeconds(0); 
  };

  const handleLogout = () => {
    setUser(null);
    setStartTime(null);
    setSessionSeconds(0);
  };

  const handleUpdateProfile = (updatedProfile: UserProfile) => {
    setUser(updatedProfile);
  };

  // Live Tracker Logic: Accurately tracks time based on start timestamp
  useEffect(() => {
    let interval: any;

    if (user && startTime) {
      // Immediate update to show correct time on mount/login
      setSessionSeconds(Math.floor((Date.now() - startTime) / 1000));

      interval = setInterval(() => {
        setSessionSeconds(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [user, startTime]);

  const renderContent = () => {
    switch (currentView) {
      case ViewState.DASHBOARD: 
        return <Dashboard sessionSeconds={sessionSeconds} />;
      case ViewState.ROUTINE: 
        return <Routine />;
      case ViewState.NOTES: 
        return <Notes />;
      case ViewState.CHATBOT: 
        return <Chatbot />;
      case ViewState.ANALYTICS: 
        return <Analytics sessionSeconds={sessionSeconds} />;
      case ViewState.PROFILE:
        return user ? <Profile user={user} onUpdateProfile={handleUpdateProfile} /> : null;
      case ViewState.COURSES: 
        return (
          <div className="flex flex-col items-center justify-center h-[60vh] text-slate-400">
             <div className="text-center p-8 bg-white rounded-3xl shadow-sm border border-slate-100">
               <h3 className="text-xl font-bold mb-2 text-slate-800">My Courses</h3>
               <p>Course integration is currently under development.</p>
             </div>
          </div>
        );
      default: return <Dashboard sessionSeconds={sessionSeconds} />;
    }
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="flex h-screen bg-[#f8fafc] font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      <Sidebar 
        currentView={currentView} 
        onChangeView={setCurrentView}
        user={user}
        onLogout={handleLogout}
      />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <Header />
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-10 pb-24 md:pb-10 scroll-smooth no-scrollbar">
          <div className="max-w-7xl mx-auto animate-fade-in-up">
            {renderContent()}
          </div>
        </main>
        
        <BottomNav currentView={currentView} onChangeView={setCurrentView} />
      </div>
    </div>
  );
};

export default App;