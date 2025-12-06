
import React from 'react';
import { Clock, TrendingUp, AlertCircle, PlayCircle, Target, Zap } from 'lucide-react';
import { Subject } from '../types';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface DashboardProps {
  sessionSeconds: number;
}

const subjects: Subject[] = [
  { id: '1', name: 'Physics', progress: 65, color: '#6366f1' },
  { id: '2', name: 'Chemistry', progress: 48, color: '#ec4899' },
  { id: '3', name: 'H.Math', progress: 72, color: '#3b82f6' },
  { id: '4', name: 'Biology', progress: 30, color: '#10b981' },
];

const mockWeeklyActivity = [
  { day: 'Sat', hours: 4 },
  { day: 'Sun', hours: 6 },
  { day: 'Mon', hours: 5 },
  { day: 'Tue', hours: 8 },
  { day: 'Wed', hours: 3 },
  { day: 'Thu', hours: 7 },
  { day: 'Fri', hours: 9 },
];

const Dashboard: React.FC<DashboardProps> = ({ sessionSeconds }) => {
  const hscDate = new Date('2026-06-15');
  const today = new Date();
  const diffDays = Math.ceil(Math.abs(hscDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  // Format seconds into HH:MM:SS
  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-8">
      {/* Header Stats */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 mb-6">Overview</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">Days to HSC</p>
                <h3 className="text-3xl font-extrabold text-slate-900 mt-2">{diffDays}</h3>
              </div>
              <div className="p-3 bg-indigo-50 rounded-2xl text-indigo-600 group-hover:scale-110 transition-transform">
                <Target size={24} />
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs font-medium">
              <span className="text-emerald-500 flex items-center gap-1 bg-emerald-50 px-2 py-1 rounded-full">
                <TrendingUp size={12} /> On Track
              </span>
            </div>
          </div>

          <div className="bg-slate-900 p-6 rounded-3xl shadow-lg shadow-slate-200 hover:shadow-xl transition-all group relative overflow-hidden">
             {/* Pulse animation for active tracking */}
            <div className="absolute top-4 right-4 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
            </div>

            <div className="flex items-start justify-between relative z-10">
              <div>
                <p className="text-sm font-bold text-slate-400">Current Session</p>
                {/* Main Live Timer Display */}
                <h3 className="text-3xl font-mono font-extrabold text-white mt-2 tracking-wider">
                  {formatTime(sessionSeconds)}
                </h3>
              </div>
              <div className="p-3 bg-white/10 rounded-2xl text-indigo-400 group-hover:scale-110 transition-transform backdrop-blur-sm">
                <Clock size={24} />
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs font-medium justify-between relative z-10">
              <span className="text-indigo-200 flex items-center gap-1 bg-white/10 px-2 py-1 rounded-full">
                Actively Tracking
              </span>
            </div>
            
            {/* Abstract Background Decoration */}
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-indigo-600/20 rounded-full blur-2xl"></div>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">Weak Point</p>
                <h3 className="text-xl font-bold text-slate-900 mt-2">Organic Chem</h3>
              </div>
              <div className="p-3 bg-rose-50 rounded-2xl text-rose-600 group-hover:scale-110 transition-transform">
                <Zap size={24} />
              </div>
            </div>
            <div className="mt-4 flex items-center text-xs font-medium">
               <span className="text-rose-600 flex items-center gap-1 bg-rose-50 px-2 py-1 rounded-full">
                High Priority
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart Section */}
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold text-slate-900">Study Momentum</h3>
            <select className="text-sm bg-slate-50 border-none rounded-lg text-slate-600 font-medium px-3 py-1 focus:ring-2 focus:ring-indigo-100 outline-none">
              <option>This Week</option>
              <option>Last Week</option>
            </select>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockWeeklyActivity}>
                <defs>
                  <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <Tooltip 
                  cursor={{stroke: '#6366f1', strokeWidth: 1, strokeDasharray: '4 4'}}
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', padding: '12px'}}
                  itemStyle={{color: '#6366f1', fontWeight: 600}}
                />
                <Area type="monotone" dataKey="hours" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#colorHours)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Subjects Progress */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-6">Syllabus Coverage</h3>
            <div className="space-y-6">
              {subjects.map((subject) => (
                <div key={subject.id}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-semibold text-slate-700">{subject.name}</span>
                    <span className="text-slate-500 font-mono">{subject.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                    <div 
                      className="h-3 rounded-full transition-all duration-1000 ease-out" 
                      style={{ width: `${subject.progress}%`, backgroundColor: subject.color }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button className="w-full mt-8 py-3 text-sm text-indigo-700 font-bold bg-indigo-50 hover:bg-indigo-100 rounded-xl transition-colors">
            Detailed Analysis
          </button>
        </div>
      </div>

      {/* Continue Learning & Notice Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative overflow-hidden bg-indigo-600 p-8 rounded-3xl shadow-lg shadow-indigo-200 text-white group cursor-pointer">
           <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/3 group-hover:scale-110 transition-transform duration-700"></div>
          <div className="flex items-start gap-5 relative z-10">
            <div className="p-4 bg-white/20 backdrop-blur-md rounded-2xl">
              <PlayCircle size={32} className="text-white" />
            </div>
            <div>
              <p className="text-indigo-200 text-sm font-semibold uppercase tracking-wide">Resume Learning</p>
              <h3 className="text-xl font-bold mt-2">Physics: Thermodynamics</h3>
              <p className="text-indigo-100 text-sm mt-2 opacity-90">
                Chapter 2 • Heat Engines & Efficiency
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <AlertCircle size={20} className="text-amber-500" />
            Notice Board
          </h3>
          <ul className="space-y-4">
            <li className="flex gap-4 items-start p-4 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-colors cursor-pointer">
              <div className="min-w-2 h-2 mt-2 rounded-full bg-rose-500"></div>
              <div>
                <p className="text-sm font-bold text-slate-900">Medical Admission Circular</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">Forms available from Oct 1st. Check requirements and prepare documents.</p>
              </div>
            </li>
            <li className="flex gap-4 items-start p-4 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-colors cursor-pointer">
              <div className="min-w-2 h-2 mt-2 rounded-full bg-indigo-500"></div>
              <div>
                <p className="text-sm font-bold text-slate-900">Chemistry Model Test</p>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">Next Monday • Organic Chemistry (Full)</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
