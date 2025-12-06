import React, { useState } from 'react';
import { FileText, Youtube, Wand2, Plus, Download, ChevronRight } from 'lucide-react';
import { generateNoteFromText } from '../services/geminiService';

const Notes: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [generatedNote, setGeneratedNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState('Physics');

  const handleGenerate = async () => {
    if (!inputText) return;
    setLoading(true);
    const result = await generateNoteFromText(inputText, selectedSubject);
    setGeneratedNote(result);
    setLoading(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[calc(100vh-8rem)]">
      {/* Left Panel: Controls */}
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 lg:col-span-1 overflow-y-auto">
        <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
          <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
             <Wand2 size={24} />
          </div>
          Magic Notes
        </h2>

        <div className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Subject</label>
            <select 
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-indigo-500"
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
            >
              <option>Physics</option>
              <option>Chemistry</option>
              <option>Higher Math</option>
              <option>Biology</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Input Content</label>
            <div className="flex gap-2 mb-3">
              <button className="flex-1 py-2.5 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-lg border border-indigo-100">Text / Paste</button>
              <button className="flex-1 py-2.5 bg-white text-slate-500 text-xs font-bold rounded-lg border border-slate-200 hover:bg-slate-50">Upload PDF</button>
            </div>
            <textarea 
              className="w-full h-48 p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500 resize-none placeholder:text-slate-400"
              placeholder="Paste lecture content here to summarize..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            ></textarea>
          </div>

          <button 
            onClick={handleGenerate}
            disabled={loading || !inputText}
            className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:shadow-none"
          >
            {loading ? 'Analyzing...' : 'Generate Notes'}
          </button>
        </div>

        <div className="mt-10 pt-8 border-t border-slate-100">
           <h3 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wider">Recent</h3>
           <ul className="space-y-3">
             {['Organic Chem: Alkanes', 'Integration Shortcuts'].map((note, i) => (
               <li key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors group">
                 <div className={`p-2 rounded-lg ${i === 0 ? 'bg-rose-100 text-rose-600' : 'bg-purple-100 text-purple-600'}`}>
                   {i === 0 ? <FileText size={16} /> : <Youtube size={16} />}
                 </div>
                 <div className="flex-1 min-w-0">
                   <p className="text-sm font-bold text-slate-900 truncate">{note}</p>
                   <p className="text-xs text-slate-500">2 days ago</p>
                 </div>
                 <ChevronRight size={16} className="text-slate-300 group-hover:text-indigo-500 transition-colors" />
               </li>
             ))}
           </ul>
        </div>
      </div>

      {/* Right Panel: Output */}
      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-100 lg:col-span-2 overflow-y-auto">
        {generatedNote ? (
          <div className="animate-fade-in-up">
            <div className="flex justify-between items-center mb-8 border-b border-slate-100 pb-6">
              <div>
                <span className="text-xs font-bold text-indigo-500 uppercase tracking-wider bg-indigo-50 px-2 py-1 rounded mb-2 inline-block">Generated Summary</span>
                <h2 className="text-3xl font-bold text-slate-900">{selectedSubject} Notes</h2>
              </div>
              <div className="flex gap-3">
                 <button className="p-3 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all">
                   <Download size={20} />
                 </button>
                 <button className="px-5 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold shadow-lg shadow-slate-200 hover:bg-slate-800">
                   Save Note
                 </button>
              </div>
            </div>
            <div className="prose prose-indigo max-w-none text-slate-600">
              <div className="whitespace-pre-wrap leading-loose font-medium">{generatedNote}</div>
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-slate-300">
            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6">
              <FileText size={40} className="text-slate-200" />
            </div>
            <p className="text-xl font-bold text-slate-400">Ready to summarize</p>
            <p className="text-sm max-w-xs text-center mt-2 text-slate-400">Paste your content on the left to generate clean, effective study notes with MCQs.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notes;