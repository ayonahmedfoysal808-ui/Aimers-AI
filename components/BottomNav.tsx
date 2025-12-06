
import React from 'react';
import { LayoutDashboard, CalendarClock, MessageSquareText, BookOpen } from 'lucide-react';
import { ViewState } from '../types';

interface BottomNavProps {
  currentView: ViewState;
  onChangeView: (view: ViewState) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ currentView, onChangeView }) => {
  const navItems = [
    { id: ViewState.DASHBOARD, icon: LayoutDashboard, label: 'Home' },
    { id: ViewState.ROUTINE, icon: CalendarClock, label: 'Routine' },
    { id: ViewState.CHATBOT, icon: MessageSquareText, label: 'Tutor' },
    { id: ViewState.NOTES, icon: BookOpen, label: 'Notes' },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass border-t border-indigo-50 pb-safe">
      <div className="flex justify-around items-center h-16 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onChangeView(item.id)}
              className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-all duration-200 ${
                isActive ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <div className={`p-1.5 rounded-full transition-all ${isActive ? 'bg-indigo-100 transform -translate-y-1' : ''}`}>
                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span className={`text-[10px] font-medium ${isActive ? 'opacity-100' : 'opacity-0'} transition-opacity absolute bottom-1`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;
