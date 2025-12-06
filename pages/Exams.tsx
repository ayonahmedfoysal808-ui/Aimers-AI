
import React, { useState } from 'react';
import { PenTool, Timer, Check, X, ArrowRight, Book, UploadCloud, FileText, ChevronRight, Clock } from 'lucide-react';
import { Exam, Question } from '../types';

const MOCK_EXAMS: Exam[] = [
  { id: '1', title: 'Physics 1st: Dynamics', type: 'HSC', subject: 'Physics', questions: 10, durationMinutes: 15, difficulty: 'Medium' },
  { id: '2', title: 'Biology: Cell Division', type: 'Medical', subject: 'Biology', questions: 20, durationMinutes: 20, difficulty: 'Hard' },
  { id: '3', title: 'Calculus Written', type: 'BUET', subject: 'H.Math', questions: 4, durationMinutes: 45, difficulty: 'Hard', requiresFileUpload: true },
  { id: '4', title: 'Organic Chem: Reactions', type: 'Subject Wise', subject: 'Chemistry', questions: 6, durationMinutes: 50, difficulty: 'Hard', requiresFileUpload: true },
];

const MOCK_QUESTIONS: Question[] = [
  { id: 1, text: "A car travels at 20 m/s and accelerates at 2 m/s² for 10 seconds. What is the final velocity?", options: ["20 m/s", "30 m/s", "40 m/s", "50 m/s"], correctAnswer: 2, explanation: "Using v = u + at: v = 20 + (2*10) = 40 m/s." },
  { id: 2, text: "Which enzyme is responsible for DNA unwinding?", options: ["Ligase", "Helicase", "Polymerase", "Primase"], correctAnswer: 1, explanation: "Helicase unwinds the DNA double helix." },
  { id: 3, text: "What is the unit of Magnetic Flux?", options: ["Tesla", "Weber", "Gauss", "Henry"], correctAnswer: 1, explanation: "Weber (Wb) is the SI unit of magnetic flux. Tesla is flux density." },
];

const Exams: React.FC = () => {
  const [activeExam, setActiveExam] = useState<Exam | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: number]: number}>({});
  const [showResult, setShowResult] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [activeFilter, setActiveFilter] = useState('All');

  const startExam = (exam: Exam) => {
    // Force reset all states before setting the active exam
    setSelectedAnswers({});
    setCurrentQuestionIndex(0);
    setUploadedFile(null);
    setShowResult(false);
    setActiveExam(exam);
  };

  const handleAnswer = (optionIndex: number) => {
    setSelectedAnswers(prev => ({ ...prev, [currentQuestionIndex]: optionIndex }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setUploadedFile(e.target.files[0]);
  };

  const submitExam = () => setShowResult(true);

  const filteredExams = activeFilter === 'All' 
    ? MOCK_EXAMS 
    : MOCK_EXAMS.filter(exam => exam.type === activeFilter);

  if (activeExam) {
    if (showResult) {
      let score = 0;
      if (!activeExam.requiresFileUpload) {
         score = Object.keys(selectedAnswers).reduce((acc, key) => {
          const qIdx = parseInt(key);
          // Safety check for index bounds
          const q = MOCK_QUESTIONS[qIdx % MOCK_QUESTIONS.length];
          return acc + (selectedAnswers[qIdx] === q.correctAnswer ? 1 : 0);
        }, 0);
      }

      return (
        <div className="max-w-2xl mx-auto bg-white p-12 rounded-3xl shadow-sm border border-slate-100 text-center animate-fade-in-up">
          <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm">
            <Check className="text-emerald-500 w-12 h-12" strokeWidth={3} />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Exam Submitted</h2>
          <p className="text-slate-500">Great job completing the {activeExam.title} exam.</p>
          
          {activeExam.requiresFileUpload ? (
            <div className="mt-8 p-6 bg-slate-50 rounded-2xl border border-slate-100">
               <p className="text-slate-600 font-medium">Your script has been sent for grading.</p>
               {uploadedFile && (
                 <div className="mt-4 inline-flex items-center gap-3 px-4 py-2 bg-white rounded-xl shadow-sm border border-slate-200 text-sm text-slate-700 font-medium">
                    <FileText size={16} className="text-indigo-600"/> {uploadedFile.name}
                 </div>
               )}
               <div className="mt-6 flex items-center justify-center gap-2 text-indigo-700 bg-indigo-50 p-4 rounded-xl border border-indigo-100">
                  <Clock size={18} className="animate-pulse" />
                  <p className="text-sm font-bold">AI grading will take approximately 2 hours.</p>
               </div>
            </div>
          ) : (
            <div className="mt-8">
              <div className="text-7xl font-black text-indigo-600 mb-2 tracking-tighter">
                {score}<span className="text-3xl text-slate-300 font-bold">/{activeExam.questions}</span>
              </div>
              <p className="text-sm font-bold uppercase tracking-wider text-slate-400">Total Score</p>
            </div>
          )}

          <div className="flex justify-center gap-4 mt-10">
            <button onClick={() => setActiveExam(null)} className="px-8 py-3 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200 transition-colors">
              Back to Exams
            </button>
            {!activeExam.requiresFileUpload && (
              <button className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200">
                View Solutions
              </button>
            )}
          </div>
        </div>
      );
    }

    // Exam Interface
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-lg shadow-slate-200/50 border border-slate-100 overflow-hidden flex flex-col min-h-[600px]">
          {/* Header */}
          <div className="bg-slate-900 p-6 text-white flex justify-between items-center">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 rounded-md bg-white/10 text-xs font-bold uppercase tracking-wider border border-white/10">{activeExam.subject}</span>
              </div>
              <h3 className="font-bold text-xl">{activeExam.title}</h3>
            </div>
            <div className="flex items-center gap-3 bg-slate-800 px-4 py-2 rounded-xl border border-slate-700/50">
              <Timer size={18} className="text-amber-400" />
              <span className="font-mono font-bold text-lg">{activeExam.durationMinutes}:00</span>
            </div>
          </div>
          
          <div className="p-8 md:p-12 flex-1 bg-[#fcfcfc]">
            {activeExam.requiresFileUpload ? (
              <div className="h-full flex flex-col items-center justify-center text-center">
                 <div className="max-w-md w-full">
                    <h4 className="text-xl font-bold text-slate-900 mb-6">Subject Wise Written Exam</h4>
                    <ul className="text-left space-y-4 mb-8 text-slate-600">
                       <li className="flex gap-3"><span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xs">1</span> Download the question paper or view below.</li>
                       <li className="flex gap-3"><span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xs">2</span> Handwrite your answers clearly on paper.</li>
                       <li className="flex gap-3"><span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xs">3</span> Upload PDF or Image source of your script.</li>
                    </ul>

                    <label className={`
                      group relative flex flex-col items-center justify-center w-full h-64 rounded-3xl border-2 border-dashed transition-all cursor-pointer
                      ${uploadedFile ? 'border-emerald-400 bg-emerald-50/30' : 'border-slate-300 hover:border-indigo-400 hover:bg-slate-50'}
                    `}>
                      <input type="file" className="hidden" accept=".pdf,.jpg,.png" onChange={handleFileUpload} />
                      
                      {uploadedFile ? (
                        <>
                          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-4 shadow-sm">
                            <FileText size={32} />
                          </div>
                          <p className="font-bold text-slate-900">{uploadedFile.name}</p>
                          <p className="text-xs text-slate-500 mt-1">Ready to submit</p>
                        </>
                      ) : (
                        <>
                          <div className="w-16 h-16 bg-white border border-slate-200 text-indigo-600 rounded-2xl flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform">
                            <UploadCloud size={32} />
                          </div>
                          <p className="font-bold text-slate-900">Upload PDF or Source</p>
                          <p className="text-xs text-slate-400 mt-1">Accepts PDF, JPG, PNG</p>
                        </>
                      )}
                    </label>
                 </div>
              </div>
            ) : (
              // MCQ View
              (() => {
                 const q = MOCK_QUESTIONS[currentQuestionIndex % MOCK_QUESTIONS.length];
                 const isSelected = selectedAnswers.hasOwnProperty(currentQuestionIndex);
                 const selectedIdx = selectedAnswers[currentQuestionIndex];

                 return (
                   <div className="max-w-2xl mx-auto">
                     <div className="mb-8 flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-widest">
                        <span>Question {currentQuestionIndex + 1} of {activeExam.questions}</span>
                        <span>Multiple Choice</span>
                     </div>
                     <h4 className="text-2xl font-bold text-slate-900 mb-8 leading-snug">
                       {q.text}
                     </h4>
                     <div className="space-y-4">
                       {q.options.map((opt, idx) => (
                         <button
                           key={idx}
                           onClick={() => handleAnswer(idx)}
                           className={`w-full text-left p-5 rounded-2xl border-2 transition-all flex items-center gap-4 group ${
                             isSelected && selectedIdx === idx 
                               ? 'border-indigo-600 bg-indigo-50/50 ring-1 ring-indigo-600' 
                               : 'border-slate-100 hover:border-indigo-200 hover:bg-white bg-white'
                           }`}
                         >
                           <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-bold transition-colors ${
                             isSelected && selectedIdx === idx ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-slate-200 text-slate-400 group-hover:border-indigo-400'
                           }`}>
                             {String.fromCharCode(65 + idx)}
                           </div>
                           <span className={`font-medium ${isSelected && selectedIdx === idx ? 'text-indigo-900' : 'text-slate-700'}`}>{opt}</span>
                         </button>
                       ))}
                     </div>
                   </div>
                 );
              })()
            )}
          </div>

          <div className="p-6 bg-white border-t border-slate-100 flex justify-between items-center">
             <button 
               onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
               disabled={currentQuestionIndex === 0 || activeExam.requiresFileUpload}
               className={`px-6 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-50 transition-colors ${activeExam.requiresFileUpload ? 'invisible' : ''}`}
             >
               Previous
             </button>

             {(!activeExam.requiresFileUpload && currentQuestionIndex < activeExam.questions - 1) ? (
               <button 
                 onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
                 className="px-8 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all flex items-center gap-2"
               >
                 Next <ChevronRight size={18} />
               </button>
             ) : (
                <button 
                 onClick={submitExam}
                 disabled={activeExam.requiresFileUpload && !uploadedFile}
                 className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 disabled:opacity-50 disabled:shadow-none"
               >
                 {activeExam.requiresFileUpload ? 'Submit Script' : 'Submit Test'}
               </button>
             )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
           <h2 className="text-2xl font-bold text-slate-900">Exam Center</h2>
           <p className="text-slate-500 text-sm mt-1">Select a mock test to evaluate your preparation.</p>
        </div>
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
           {['All', 'HSC', 'Medical', 'BUET', 'Subject Wise'].map(filter => (
             <button 
               key={filter} 
               onClick={() => setActiveFilter(filter)}
               className={`px-5 py-2 border rounded-full text-sm font-bold transition-all whitespace-nowrap ${
                 activeFilter === filter 
                   ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-200' 
                   : 'bg-white border-slate-200 text-slate-600 hover:border-indigo-500 hover:text-indigo-600'
               }`}
             >
               {filter}
             </button>
           ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExams.map((exam) => (
          <div key={exam.id} className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group flex flex-col relative overflow-hidden">
            {/* Type Badge */}
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
               <PenTool size={80} className="text-slate-900" />
            </div>

            <div className="flex justify-between items-start mb-4 z-10">
              <span className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wide ${
                exam.type === 'Medical' ? 'bg-rose-50 text-rose-600' :
                exam.type === 'BUET' ? 'bg-amber-50 text-amber-700' : 
                exam.type === 'Subject Wise' ? 'bg-emerald-50 text-emerald-600' : 'bg-indigo-50 text-indigo-600'
              }`}>
                {exam.type}
              </span>
              {exam.requiresFileUpload && (
                <span className="flex items-center gap-1 text-[10px] font-bold bg-slate-100 px-2 py-1 rounded text-slate-600">
                  <UploadCloud size={10} /> UPLOAD REQ
                </span>
              )}
            </div>
            
            <h3 className="text-xl font-bold text-slate-900 mb-2 z-10 line-clamp-1">{exam.title}</h3>
            <p className="text-sm font-medium text-slate-400 mb-6">{exam.subject}</p>
            
            <div className="flex items-center gap-5 text-sm text-slate-500 mb-8 mt-auto">
              <span className="flex items-center gap-1.5 font-medium"><Book size={16} className="text-indigo-500"/> {exam.questions} Qs</span>
              <span className="flex items-center gap-1.5 font-medium"><Timer size={16} className="text-indigo-500"/> {exam.durationMinutes}m</span>
            </div>

            <button 
              onClick={() => startExam(exam)}
              className="w-full py-3.5 bg-slate-900 text-white rounded-xl font-bold hover:bg-indigo-600 transition-colors flex items-center justify-center gap-2 group-hover:shadow-lg group-hover:shadow-indigo-200 z-10"
            >
              Start Now <ArrowRight size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Exams;
    