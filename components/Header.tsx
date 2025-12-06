import React from 'react';
import { Bell, Search, Target } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="h-20 flex items-center justify-between px-6 md:px-10 sticky top-0 z-20 glass border-b border-indigo-50/50">
      <div className="flex items-center gap-4 md:hidden">
         <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-200">
            <Target className="text-white w-5 h-5" />
          </div>
          <span className="text-lg font-extrabold tracking-tight text-slate-900">Aimers</span>
      </div>

      <div className="hidden md:block relative w-96">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input 
          type="text" 
          placeholder="Search subjects, exams, or notes..." 
          className="w-full pl-11 pr-4 py-2.5 bg-white/50 border border-slate-200 rounded-full text-sm focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400"
        />
      </div>
      
      <div className="flex items-center gap-4">
        <button className="relative p-2.5 bg-white border border-slate-100 text-slate-600 hover:text-indigo-600 hover:shadow-md rounded-full transition-all">
          <Bell size={20} />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white"></span>
        </button>
      </div>
    </header>
  );
};

export default Header;