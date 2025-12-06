
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Paperclip, X, FileText, Image as ImageIcon, Sparkles } from 'lucide-react';
import { getChatClient } from '../services/geminiService';
import { ChatMessage } from '../types';

const SYSTEM_INSTRUCTION = `
You are an expert AI tutor for a Class 12 Science student in Bangladesh. 
You specialize in Physics, Chemistry, Math, and Biology for HSC, Medical, and BUET admission tests.
Provide step-by-step explanations.
If the user asks a question, assume the context of Bangladeshi curriculum (NCTB).
Be encouraging but precise.
Use LaTeX formatting for math if possible, but keep it readable in plain text (e.g., x^2).
If the user uploads an image or PDF (e.g., question paper, book page, handwritten notes), analyze the text and visual content thoroughly to provide a solution or summary.
`;

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { 
      id: '1', 
      role: 'model', 
      text: 'Hi! I am your AI Tutor. You can ask me questions or upload a PDF/Image of your problem for step-by-step help.', 
      timestamp: Date.now() 
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [attachment, setAttachment] = useState<{file: File, preview: string} | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatClientRef = useRef<any>(null);

  useEffect(() => {
    if (!chatClientRef.current) {
      chatClientRef.current = getChatClient(SYSTEM_INSTRUCTION);
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onloadend = () => {
        setAttachment({
          file: file,
          preview: reader.result as string
        });
      };
      
      if (file.type.startsWith('image/') || file.type === 'application/pdf') {
        reader.readAsDataURL(file);
      } else {
        alert("Please upload an image or PDF file.");
      }
    }
  };

  const handleSend = async () => {
    if ((!input.trim() && !attachment) || isTyping) return;

    const currentAttachment = attachment;
    setAttachment(null);
    if (fileInputRef.current) fileInputRef.current.value = '';

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: Date.now(),
      attachment: currentAttachment ? {
        name: currentAttachment.file.name,
        type: currentAttachment.file.type,
        data: currentAttachment.preview
      } : undefined
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      if (!chatClientRef.current) {
        setTimeout(() => {
          setMessages(prev => [...prev, {
            id: (Date.now() + 1).toString(),
            role: 'model',
            text: "I cannot connect to the brain right now (Missing API Key).",
            timestamp: Date.now()
          }]);
          setIsTyping(false);
        }, 1000);
        return;
      }

      let messagePayload: any = { role: 'user', parts: [] };
      if (currentAttachment) {
         const base64Data = currentAttachment.preview.split(',')[1];
         messagePayload.parts.push({
           inlineData: {
             data: base64Data,
             mimeType: currentAttachment.file.type
           }
         });
      }
      if (input.trim()) messagePayload.parts.push({ text: input });
      
      const parts = messagePayload.parts;
      const result = await chatClientRef.current.sendMessageStream({ message: parts });
      
      let fullResponse = "";
      const responseMsgId = (Date.now() + 1).toString();
      
      setMessages(prev => [...prev, {
        id: responseMsgId,
        role: 'model',
        text: "",
        timestamp: Date.now()
      }]);

      for await (const chunk of result) {
        const text = chunk.text;
        fullResponse += text;
        setMessages(prev => prev.map(msg => 
          msg.id === responseMsgId ? { ...msg, text: fullResponse } : msg
        ));
      }
      
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: "Sorry, I encountered an error while analyzing your request.",
        timestamp: Date.now()
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden relative">
      <div className="bg-white/80 backdrop-blur-md p-4 flex items-center gap-4 border-b border-slate-100 z-10 absolute top-0 w-full">
        <div className="bg-indigo-600 p-2.5 rounded-xl shadow-md shadow-indigo-100">
          <Sparkles size={20} className="text-white" />
        </div>
        <div>
          <h3 className="font-bold text-slate-900">Aimers AI Tutor</h3>
          <div className="flex items-center gap-1.5">
             <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
             <p className="text-slate-500 text-xs font-medium">Online</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 pt-20 space-y-6 bg-[#fafafa]">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
            <div className={`
              max-w-[85%] md:max-w-[70%] rounded-2xl p-5 whitespace-pre-wrap text-sm leading-relaxed shadow-sm
              ${msg.role === 'user' 
                ? 'bg-indigo-600 text-white rounded-br-none' 
                : 'bg-white text-slate-700 border border-slate-100 rounded-bl-none'
              }
            `}>
              {msg.attachment && (
                <div className="mb-4 p-2 bg-black/10 rounded-xl flex items-center gap-3 overflow-hidden backdrop-blur-sm">
                  {msg.attachment.type.startsWith('image/') ? (
                    <img src={msg.attachment.data} alt="Attachment" className="w-12 h-12 object-cover rounded-lg" />
                  ) : (
                    <div className="w-12 h-12 bg-white/20 flex items-center justify-center rounded-lg border border-white/20">
                      <FileText size={20} className="text-white opacity-90"/>
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="text-xs font-bold truncate opacity-90">{msg.attachment.name}</p>
                    <p className="text-[10px] opacity-75 uppercase tracking-wider">{msg.attachment.type.split('/')[1] || 'FILE'}</p>
                  </div>
                </div>
              )}
              {msg.text}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
             <div className="bg-white px-5 py-4 rounded-2xl rounded-bl-none shadow-sm border border-slate-100 flex gap-2 items-center">
               <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
               <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-75"></div>
               <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-150"></div>
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-white border-t border-slate-100">
        {attachment && (
          <div className="mb-4 flex items-center gap-3 p-3 bg-indigo-50 border border-indigo-100 rounded-2xl max-w-max animate-fade-in-up">
            {attachment.file.type.startsWith('image/') ? (
              <img src={attachment.preview} alt="Preview" className="w-10 h-10 object-cover rounded-lg" />
            ) : (
              <div className="w-10 h-10 bg-indigo-100 flex items-center justify-center rounded-lg text-indigo-600 border border-indigo-200">
                <FileText size={20} />
              </div>
            )}
            <div className="max-w-[200px]">
              <p className="text-sm font-bold text-slate-900 truncate">{attachment.file.name}</p>
              <p className="text-xs text-slate-500">{(attachment.file.size / 1024).toFixed(0)} KB</p>
            </div>
            <button 
              onClick={() => {
                setAttachment(null);
                if (fileInputRef.current) fileInputRef.current.value = '';
              }}
              className="p-1.5 hover:bg-rose-100 text-slate-400 hover:text-rose-600 rounded-full transition-colors ml-2"
            >
              <X size={16} />
            </button>
          </div>
        )}
        
        <div className="relative flex items-end gap-3">
          <input 
            type="file" 
            ref={fileInputRef}
            className="hidden"
            accept="image/*,application/pdf"
            onChange={handleFileSelect}
          />
          <button 
            onClick={() => fileInputRef.current?.click()}
            className={`p-3.5 transition-all rounded-xl border ${
              attachment ? 'bg-indigo-100 text-indigo-600 border-indigo-200' : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-indigo-600 hover:border-indigo-300'
            }`}
            title="Attach Image or PDF"
          >
            <Paperclip size={20} />
          </button>
          
          <div className="flex-1 relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
              }}
              placeholder="Ask a question or upload a PDF/Image..."
              className="w-full max-h-32 min-h-[50px] bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white resize-none text-sm font-medium text-slate-900 placeholder:text-slate-400 shadow-inner"
            />
          </div>

          <button 
            onClick={handleSend}
            disabled={(!input.trim() && !attachment) || isTyping}
            className="p-3.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 disabled:opacity-50 disabled:shadow-none transform active:scale-95"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
