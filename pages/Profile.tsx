import React, { useState, useRef } from 'react';
import { UserProfile } from '../types';
import { User, Mail, School, BookOpen, Save, Edit2, Shield, Camera, Upload } from 'lucide-react';

interface ProfileProps {
  user: UserProfile;
  onUpdateProfile: (updatedProfile: UserProfile) => void;
}

const Profile: React.FC<ProfileProps> = ({ user, onUpdateProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(user);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(user);
    setIsEditing(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, profilePicture: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        {/* Banner */}
        <div className="h-32 bg-gradient-to-r from-indigo-500 to-purple-600 relative">
          <div className="absolute -bottom-10 left-8 md:left-12 group">
            <div className="w-24 h-24 rounded-2xl bg-white p-1.5 shadow-xl relative">
              <div className="w-full h-full rounded-xl bg-slate-900 flex items-center justify-center text-white text-3xl font-bold overflow-hidden relative">
                {formData.profilePicture ? (
                  <img 
                    src={formData.profilePicture} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  formData.name.slice(0, 2).toUpperCase()
                )}
                
                {/* Upload Overlay */}
                {isEditing && (
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer hover:bg-black/50 transition-colors"
                  >
                    <Camera size={24} className="text-white" />
                  </div>
                )}
              </div>
              
              {/* Hidden Input */}
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleImageUpload} 
                className="hidden" 
                accept="image/*"
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="pt-14 px-8 md:px-12 pb-12">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">{formData.name}</h1>
              <p className="text-slate-500 font-medium">{formData.classLevel} • {formData.college}</p>
            </div>
            <button
              onClick={() => isEditing ? document.getElementById('profile-form')?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true })) : setIsEditing(true)}
              className={`px-6 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2 ${
                isEditing 
                  ? 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-lg shadow-emerald-200'
                  : 'bg-slate-100 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600'
              }`}
            >
              {isEditing ? (
                <><Save size={18} /> Save Changes</>
              ) : (
                <><Edit2 size={18} /> Edit Profile</>
              )}
            </button>
          </div>

          {isEditing ? (
            <form id="profile-form" onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in-up">
              <div className="md:col-span-2 mb-2">
                 <button 
                   type="button"
                   onClick={() => fileInputRef.current?.click()}
                   className="text-indigo-600 text-sm font-bold flex items-center gap-2 hover:underline"
                 >
                   <Upload size={16} /> Change Profile Picture
                 </button>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                  <User size={14} /> Full Name
                </label>
                <input
                  type="text"
                  required
                  className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 outline-none text-sm font-medium transition-all text-slate-900"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                  <Mail size={14} /> Email Address
                </label>
                <input
                  type="email"
                  required
                  className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 outline-none text-sm font-medium transition-all text-slate-900"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                  <BookOpen size={14} /> Class / Level
                </label>
                <select
                  className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 outline-none text-sm font-medium transition-all text-slate-900"
                  value={formData.classLevel}
                  onChange={(e) => setFormData({...formData, classLevel: e.target.value})}
                >
                  <option>Class 11</option>
                  <option>Class 12</option>
                  <option>HSC Examinee</option>
                  <option>Admission</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                  <School size={14} /> College / Institution
                </label>
                <input
                  type="text"
                  required
                  className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 outline-none text-sm font-medium transition-all text-slate-900"
                  value={formData.college}
                  onChange={(e) => setFormData({...formData, college: e.target.value})}
                />
              </div>

              <div className="md:col-span-2 flex justify-end gap-3 mt-4">
                 <button 
                   type="button" 
                   onClick={handleCancel}
                   className="px-6 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-100 transition-colors"
                 >
                   Cancel
                 </button>
                 <button 
                   type="submit"
                   className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
                 >
                   Save Changes
                 </button>
              </div>
            </form>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
              <div className="space-y-1">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                  <User size={14} /> Full Name
                </p>
                <p className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2">{user.name}</p>
              </div>

              <div className="space-y-1">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                  <Mail size={14} /> Email Address
                </p>
                <p className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2">{user.email}</p>
              </div>

              <div className="space-y-1">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                   <BookOpen size={14} /> Class / Level
                </p>
                <p className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2">{user.classLevel}</p>
              </div>

              <div className="space-y-1">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                   <School size={14} /> College / Institution
                </p>
                <p className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-2">{user.college}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-8 md:p-12 text-white shadow-xl shadow-indigo-200">
         <div className="flex items-start gap-6">
            <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-sm">
               <Shield size={32} className="text-indigo-100" />
            </div>
            <div>
               <h3 className="text-2xl font-bold mb-2">Aiming Higher?</h3>
               <p className="text-indigo-100 leading-relaxed mb-6 max-w-xl">
                 Your profile is set for success. Complete more mock tests and daily routines to unlock advanced personalized insights for your admission journey.
               </p>
               <button className="px-6 py-3 bg-white text-indigo-600 rounded-xl font-bold hover:bg-indigo-50 transition-colors">
                 View Analytics
               </button>
            </div>
         </div>
      </div>
    </div>
  );
};

export default Profile;