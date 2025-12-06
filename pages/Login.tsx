import React, { useState } from 'react';
import { Target, ArrowRight, BookOpen, ShieldCheck } from 'lucide-react';
import { UserProfile } from '../types';

interface LoginProps {
  onLogin: (user: UserProfile) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [formData, setFormData] = useState<UserProfile>({
    name: '',
    email: '',
    classLevel: 'HSC Examinee',
    college: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.college) {
      onLogin(formData);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col md:flex-row">
      {/* Left Side - Brand / Info */}
      <div className="hidden md:flex w-1/2 bg-indigo-600 relative overflow-hidden items-center justify-center p-12">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-10"></div>
        <div className="relative z-10 text-white max-w-lg">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-2xl shadow-indigo-900/20 rotate-3">
            <Target className="text-indigo-600 w-10 h-10" />
          </div>
          <h1 className="text-5xl font-extrabold tracking-tight mb-6">Target Your <br/>Dream University</h1>
          <p className="text-indigo-100 text-lg leading-relaxed mb-8">
            Join thousands of students using Aimers to crush their HSC exams and secure a spot in BUET or Medical.
          </p>
          <div className="flex gap-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/10 rounded-lg"><BookOpen size={20}/></div>
              <span className="font-medium">Smart Routine</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/10 rounded-lg"><ShieldCheck size={20}/></div>
              <span className="font-medium">Mock Tests</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12 relative">
        <div className="w-full max-w-md bg-white p-8 md:p-10 rounded-3xl shadow-xl shadow-slate-200/50 border border-white">
          <div className="text-center md:text-left mb-8">
             <div className="md:hidden w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-200">
               <Target className="text-white w-7 h-7" />
             </div>
            <h2 className="text-2xl font-bold text-slate-900">Welcome to Aimers</h2>
            <p className="text-slate-500 mt-2">Set up your profile to start your journey.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Full Name</label>
              <input
                type="text"
                required
                className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 outline-none transition-all font-medium text-slate-900 placeholder:text-slate-400"
                placeholder="e.g. Rahim Ahmed"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>

            <div>
               <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Email</label>
              <input
                type="email"
                required
                className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 outline-none transition-all font-medium text-slate-900 placeholder:text-slate-400"
                placeholder="student@example.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                 <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Class Level</label>
                <select
                  className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 outline-none transition-all font-medium text-slate-900"
                  value={formData.classLevel}
                  onChange={(e) => setFormData({...formData, classLevel: e.target.value})}
                >
                  <option>Class 11</option>
                  <option>Class 12</option>
                  <option>HSC Examinee</option>
                  <option>Admission</option>
                </select>
              </div>
              <div>
                 <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">College</label>
                <input
                  type="text"
                  required
                  className="w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 outline-none transition-all font-medium text-slate-900 placeholder:text-slate-400"
                  placeholder="e.g. NDC"
                  value={formData.college}
                  onChange={(e) => setFormData({...formData, college: e.target.value})}
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-lg transition-all transform hover:scale-[1.01] flex items-center justify-center gap-2 mt-6 shadow-xl shadow-indigo-200"
            >
              Start Aiming <ArrowRight size={20} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;