import React, { useState, useRef, useEffect } from 'react';
import { getMimicResponse } from '../services/gemini';
import { Message } from '../types';

const MimicTerminal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'assistant', 
      content: 'Welcome to Afton Industries. I am the Mimic1 assistant. How can I help you today?', 
      timestamp: new Date() 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isCreator, setIsCreator] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading, isOpen]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    // Determine current creator state based on input or existing state
    let activeCreatorMode = isCreator;
    if (input.toLowerCase().trim() === "i always come back") {
      setIsCreator(true);
      activeCreatorMode = true;
    }

    const userMsg: Message = { role: 'user', content: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    // Pass the active mode explicitly to the service
    const responseText = await getMimicResponse([...messages, userMsg], activeCreatorMode);
    
    setMessages(prev => [...prev, { role: 'assistant', content: responseText, timestamp: new Date() }]);
    setIsLoading(false);
  };

  const headerColor = isCreator ? 'bg-emerald-900/20' : 'bg-[#8a2be2]/5';
  const accentColor = isCreator ? 'text-emerald-500' : 'text-[#8a2be2]';
  const borderColor = isCreator ? 'border-emerald-500/30' : 'border-[#8a2be2]/30';

  return (
    <>
      {/* SIMPLE IRIS HUB LAUNCHER */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-[60] group focus:outline-none"
        aria-label="Toggle Mimic1 Assistant"
      >
        <div className="relative w-14 h-14 flex items-center justify-center">
          <div className={`absolute inset-0 border-2 rounded-full ${isCreator ? 'border-emerald-500/40' : 'border-[#8a2be2]/40'} ${isLoading ? 'animate-spin' : 'animate-pulse'}`}></div>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
            isOpen 
              ? isCreator ? 'bg-emerald-600 scale-100' : 'bg-[#8a2be2] scale-100' 
              : `bg-black border ${isCreator ? 'border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.4)]' : 'border-[#8a2be2] plasma-glow'}`
          }`}>
             {isOpen ? (
               <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
             ) : (
               <svg className={`w-5 h-5 ${isCreator ? 'text-emerald-500' : 'text-[#8a2be2]'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
             )}
          </div>
        </div>
      </button>

      {/* CLEAN HOLOGRAPHIC CHAT WINDOW */}
      <div 
        className={`fixed bottom-24 right-6 z-[60] w-[90vw] md:w-[350px] smoked-glass border ${borderColor} flex flex-col shadow-2xl transition-all duration-300 origin-bottom-right ${
          isOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
        }`}
        style={{ height: '450px', borderRadius: '12px' }}
      >
        {/* Header */}
        <div className={`px-4 py-3 border-b ${isCreator ? 'border-emerald-500/20' : 'border-[#8a2be2]/20'} flex justify-between items-center ${headerColor} rounded-t-[11px] transition-colors duration-500`}>
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full animate-pulse ${isCreator ? 'bg-emerald-500' : 'bg-[#8a2be2]'}`}></div>
            <span className="text-[12px] font-bold text-white uppercase tracking-wider">
              {isCreator ? 'Recognized: W. Afton' : 'Mimic1 Assistant'}
            </span>
          </div>
          {isCreator && (
             <span className="text-[9px] mono text-emerald-500/80 animate-pulse uppercase">Admin_Acc_01</span>
          )}
        </div>

        {/* Message Area */}
        <div 
          ref={scrollRef} 
          className={`flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin ${isCreator ? 'scrollbar-thumb-emerald-500/20' : 'scrollbar-thumb-[#8a2be2]/20'}`}
        >
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] px-4 py-2 text-[13px] leading-relaxed ${
                msg.role === 'user' 
                  ? `${isCreator ? 'bg-emerald-700' : 'bg-[#8a2be2]'} text-white rounded-l-lg rounded-tr-lg` 
                  : 'bg-white/5 border border-white/10 text-slate-200 rounded-r-lg rounded-tl-lg'
              }`}>
                {msg.content}
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-r-lg rounded-tl-lg">
                <div className="flex space-x-1">
                  <div className={`w-1.5 h-1.5 rounded-full animate-bounce ${isCreator ? 'bg-emerald-500/60' : 'bg-[#8a2be2]/60'}`}></div>
                  <div className={`w-1.5 h-1.5 rounded-full animate-bounce [animation-delay:-0.15s] ${isCreator ? 'bg-emerald-500/60' : 'bg-[#8a2be2]/60'}`}></div>
                  <div className={`w-1.5 h-1.5 rounded-full animate-bounce [animation-delay:-0.3s] ${isCreator ? 'bg-emerald-500/60' : 'bg-[#8a2be2]/60'}`}></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Standard Input Area */}
        <form onSubmit={handleSend} className={`p-3 bg-black/40 border-t ${isCreator ? 'border-emerald-500/10' : 'border-[#8a2be2]/10'} rounded-b-[11px]`}>
          <div className={`flex items-center bg-white/5 border border-white/10 rounded-full px-4 py-1.5 focus-within:border-${isCreator ? 'emerald-500' : '[#8a2be2]'}/50 transition-colors`}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={isCreator ? "Awaiting command..." : "Type a message..."}
              className="flex-1 bg-transparent border-none py-1 text-[13px] text-white placeholder-slate-600 outline-none focus:ring-0"
              autoComplete="off"
            />
            <button 
              type="submit" 
              disabled={!input.trim() || isLoading}
              className={`${accentColor} disabled:opacity-30 p-1`}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" /></svg>
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default MimicTerminal;