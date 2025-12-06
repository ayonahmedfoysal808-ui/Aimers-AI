import React, { useState } from 'react';
import { Sparkles, Clock, BookOpen, Coffee, Moon, Zap, Calendar } from 'lucide-react';
import { generateStudyRoutine } from '../services/geminiService';
import { RoutineItem } from '../types';

const Routine: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [routine, setRoutine] = useState<RoutineItem[]>([]);
  const [inputs, setInputs] = useState({
    profile: 'Average student, loves Bio, hates Math',
    weaknesses: 'Integration, Organic Chemistry, Newton Mechanics',
    hours: '6 hours'
  });

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const result = await generateStudyRoutine(inputs.profile, inputs.weaknesses.split(','), inputs.hours);
      setRoutine(result);
    } catch (error) {
      alert("Failed to generate routine.");
    } finally {
      setLoading(false);
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'study': return <BookOpen className="text-white" size={18} />;
      case 'break': return <Coffee className="text-white" size={18} />;
      case 'sleep': return <Moon className="text-white" size={18} />;
      default: return <Clock className="text-white" size={18} />;
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case 'study': return 'bg-indigo-500 shadow-indigo-200';
      case 'break': return 'bg-amber-400 shadow-amber-200';
      case 'sleep': return 'bg-slate-400 shadow-slate-200';
      default: return 'bg-slate-300';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3.5 bg-indigo-600 rounded-2xl shadow-lg shadow-indigo-200">
            <Sparkles className="text-white" size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">AI Routine Planner</h2>
            <p className="text-sm font-medium text-slate-500">Custom tailored schedules for maximum efficiency</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Your Profile</label>
            <input 
              type="text" 
              className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 outline-none text-sm font-medium transition-all"
              value={inputs.profile}
              onChange={(e) => setInputs({...inputs, profile: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Available Hours</label>
            <input 
              type="text" 
              className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 outline-none text-sm font-medium transition-all"
              value={inputs.hours}
              onChange={(e) => setInputs({...inputs, hours: e.target.value})}
            />
          </div>
          <div className="md:col-span-2 space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Weak Topics</label>
            <input 
              type="text" 
              className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 outline-none text-sm font-medium transition-all"
              value={inputs.weaknesses}
              onChange={(e) => setInputs({...inputs, weaknesses: e.target.value})}
            />
          </div>
        </div>

        <button 
          onClick={handleGenerate}
          disabled={loading}
          className="w-full py-4 bg-slate-900 hover:bg-indigo-600 text-white rounded-xl font-bold transition-all shadow-xl hover:shadow-indigo-200 flex items-center justify-center gap-2 disabled:opacity-70"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
              Generating...
            </>
          ) : (
            <>
              <Zap size={20} /> Generate Plan
            </>
          )}
        </button>
      </div>

      {routine.length > 0 && (
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 animate-fade-in-up">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-slate-900">Today's Schedule</h3>
            <div className="flex items-center gap-2 text-indigo-600 text-sm font-bold bg-indigo-50 px-3 py-1 rounded-full">
              <Calendar size={16} /> Recommended
            </div>
          </div>
          <div className="relative border-l-2 border-slate-100 ml-4 space-y-8 py-2">
            {routine.map((item, idx) => (
              <div key={idx} className="relative pl-8 group">
                <div className={`absolute -left-[21px] top-1 w-10 h-10 rounded-xl flex items-center justify-center shadow-lg border-4 border-white ${getColor(item.type)}`}>
                  {getIcon(item.type)}
                </div>
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 group-hover:bg-white group-hover:shadow-md transition-all">
                  <div className="flex justify-between items-start mb-2">
                     <h4 className="text-lg font-bold text-slate-900">{item.activity}</h4>
                     <span className="text-xs font-bold text-slate-400 bg-white px-2 py-1 rounded-md border border-slate-200">{item.timeSlot}</span>
                  </div>
                  {item.focusTopic && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-lg font-bold">
                       <Zap size={12} fill="currentColor" /> {item.focusTopic}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Routine;