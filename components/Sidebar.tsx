import React from 'react';
import { LayoutDashboard, CalendarClock, BookOpen, MessageSquareText, BarChart2, GraduationCap, Target, LogOut, User } from 'lucide-react';
import { ViewState, UserProfile } from '../types';

interface SidebarProps {
  currentView: ViewState;
  onChangeView: (view: ViewState) => void;
  user: UserProfile;
  onLogout?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onChangeView, user, onLogout }) => {
  const menuItems = [
    { id: ViewState.DASHBOARD, label: 'Dashboard', icon: LayoutDashboard },
    { id: ViewState.ROUTINE, label: 'Routine Planner', icon: CalendarClock },
    { id: ViewState.NOTES, label: 'Smart Notes', icon: BookOpen },
    { id: ViewState.CHATBOT, label: 'AI Teacher', icon: MessageSquareText },
    { id: ViewState.ANALYTICS, label: 'Analytics', icon: BarChart2 },
    { id: ViewState.COURSES, label: 'My Courses', icon: GraduationCap },
    { id: ViewState.PROFILE, label: 'My Profile', icon: User },
  ];

  return (
    <div className="hidden md:flex flex-col w-72 bg-white border-r border-slate-100 h-screen sticky top-0 z-30 shadow-[4px_0_24px_-12px_rgba(0,0,0,0.1)]">
      <div className="p-8">
        <div className="flex items-center gap-3 text-indigo-600">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200 rotate-3">
            <Target className="text-white w-6 h-6" />
          </div>
          <span className="text-2xl font-extrabold tracking-tight text-slate-900">Aimers</span>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-2 overflow-y-auto no-scrollbar">
        <p className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 mt-2">Menu</p>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onChangeView(item.id)}
              className={`
                w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 group
                ${isActive 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-indigo-600'
                }
              `}
            >
              <Icon size={20} className={`${isActive ? 'animate-pulse' : 'group-hover:scale-110 transition-transform'}`} />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="p-4 m-4 bg-slate-50 rounded-2xl border border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-md overflow-hidden shrink-0">
            {user.profilePicture ? (
              <img src={user.profilePicture} alt="User" className="w-full h-full object-cover" />
            ) : (
              user.name.slice(0, 2).toUpperCase()
            )}
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-bold text-slate-900 truncate">{user.name}</p>
            <p className="text-xs text-slate-500 truncate">{user.classLevel}</p>
          </div>
          <button onClick={onLogout} className="text-slate-400 hover:text-rose-500 transition-colors">
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;