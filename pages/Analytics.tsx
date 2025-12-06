
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, Tooltip } from 'recharts';

interface AnalyticsProps {
  sessionSeconds: number;
}

const Analytics: React.FC<AnalyticsProps> = ({ sessionSeconds }) => {
  const subjectData = [
    { name: 'Physics', value: 30, color: '#6366f1' },
    { name: 'Chemistry', value: 25, color: '#ec4899' },
    { name: 'Math', value: 35, color: '#3b82f6' },
    { name: 'Biology', value: 10, color: '#10b981' },
  ];

  const radarData = [
    { subject: 'Phys', A: 80, fullMark: 100 },
    { subject: 'Math', A: 90, fullMark: 100 },
    { subject: 'Chem', A: 65, fullMark: 100 },
    { subject: 'Bio', A: 50, fullMark: 100 },
    { subject: 'Eng', A: 70, fullMark: 100 },
    { subject: 'ICT', A: 85, fullMark: 100 },
  ];

  const CustomRadarTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-xl shadow-lg border border-slate-100">
          <p className="font-bold text-slate-900 mb-1">{payload[0].payload.subject}</p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
            <p className="text-sm font-medium text-slate-600">
              Score: <span className="text-indigo-600 font-bold">{payload[0].value}/100</span>
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  // Only count current session seconds. No mock history.
  const totalHours = sessionSeconds / 3600;

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-slate-900">Performance Analytics</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center">
          <h3 className="text-lg font-bold text-slate-900 mb-2 w-full text-left">Skill Radar</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar
                  name="Proficiency"
                  dataKey="A"
                  stroke="#6366f1"
                  strokeWidth={3}
                  fill="#6366f1"
                  fillOpacity={0.2}
                />
                <Tooltip content={<CustomRadarTooltip />} cursor={{ stroke: '#6366f1', strokeWidth: 1 }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-center text-sm font-medium text-slate-400 mt-4 bg-slate-50 px-4 py-2 rounded-full">
            Focus needed on <span className="text-rose-500 font-bold">Biology</span> & <span className="text-rose-500 font-bold">Chemistry</span>
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center">
          <h3 className="text-lg font-bold text-slate-900 mb-2 w-full text-left">Time Distribution</h3>
          <div className="h-80 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={subjectData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={110}
                  paddingAngle={5}
                  dataKey="value"
                  cornerRadius={8}
                >
                  {subjectData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}} />
                <Legend verticalAlign="bottom" height={36} iconType="circle"/>
              </PieChart>
            </ResponsiveContainer>
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none mb-4">
                 <span className="text-3xl font-extrabold text-slate-900 block">{totalHours.toFixed(2)}h</span>
                 <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Total</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
