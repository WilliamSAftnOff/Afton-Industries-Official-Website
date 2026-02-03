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

    const trimmedInput = input.trim();
    // Detect the security phrase "I always come back"
    let activeCreatorMode = isCreator;
    if (trimmedInput.toLowerCase().includes("i always come back")) {
      setIsCreator(true);
      activeCreatorMode = true;
    }

    const userMsg: Message = { role: 'user', content: trimmedInput, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const responseText = await getMimicResponse([...messages, userMsg], activeCreatorMode);
    
    setMessages(prev => [...prev, { role: 'assistant', content: responseText, timestamp: new Date() }]);
    setIsLoading(false);
  };

  const headerColor = isCreator ? 'bg-emerald-950/40' : 'bg-[#8a2be2]/5';
  const accentColor = isCreator ? 'text-emerald-400' : 'text-[#8a2be2]';
  const borderColor = isCreator ? 'border-emerald-500/60' : 'border-[#8a2be2]/30';

  return (
    <>
      {/* TERMINAL LAUNCHER */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-[60] group focus:outline-none"
        aria-label="Toggle Mimic1 Assistant"
      >
        <div className="relative w-14 h-14 flex items-center justify-center">
          <div className={`absolute inset-0 border-2 rounded-full ${isCreator ? 'border-emerald-400/50 shadow-[0_0_15px_#10b981]' : 'border-[#8a2be2]/40'} ${isLoading ? 'animate-spin' : 'animate-pulse'}`}></div>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
            isOpen 
              ? isCreator ? 'bg-emerald-600 scale-100 shadow-[0_0_20px_rgba(16,185,129,0.4)]' : 'bg-[#8a2be2] scale-100 shadow-[0_0_20px_rgba(138,43,226,0.4)]' 
              : `bg-black border ${isCreator ? 'border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.2)]' : 'border-[#8a2be2] plasma-glow'}`
          }`}>
             {isOpen ? (
               <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
             ) : (
               <svg className={`w-5 h-5 ${isCreator ? 'text-emerald-500' : 'text-[#8a2be2]'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
             )}
          </div>
        </div>
      </button>

      {/* TERMINAL WINDOW */}
      <div 
        className={`fixed bottom-24 right-6 z-[60] w-[90vw] md:w-[400px] smoked-glass border-2 ${borderColor} flex flex-col shadow-2xl transition-all duration-300 origin-bottom-right ${
          isOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
        }`}
        style={{ height: '540px', borderRadius: '16px' }}
      >
        {/* Header */}
        <div className={`px-5 py-4 border-b ${isCreator ? 'border-emerald-500/50' : 'border-[#8a2be2]/20'} flex justify-between items-center ${headerColor} rounded-t-[14px] transition-all duration-500 ${isCreator ? 'animate-jitter' : ''}`}>
          <div className="flex items-center space-x-3">
            <div className={`w-2.5 h-2.5 rounded-full animate-pulse ${isCreator ? 'bg-emerald-400 shadow-[0_0_10px_#10b981]' : 'bg-[#8a2be2]'}`}></div>
            <span className={`text-[13px] font-black uppercase tracking-widest mono ${isCreator ? 'text-emerald-400' : 'text-white'}`}>
              {isCreator ? 'ADMIN: WILLIAM AFTON' : 'Mimic1_v1.0.4'}
            </span>
          </div>
          {isCreator && (
             <div className="flex items-center space-x-2">
                <span className="text-[9px] mono text-emerald-400 animate-pulse font-black border border-emerald-500/40 px-2 py-0.5">ROOT_UPLINK</span>
             </div>
          )}
        </div>

        {/* Message Area */}
        <div 
          ref={scrollRef} 
          className={`flex-1 overflow-y-auto p-5 space-y-5 scrollbar-thin ${isCreator ? 'scrollbar-thumb-emerald-500/40' : 'scrollbar-thumb-[#8a2be2]/20'}`}
        >
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] px-4 py-3 text-[13px] leading-relaxed whitespace-pre-wrap ${
                msg.role === 'user' 
                  ? `${isCreator ? 'bg-emerald-800/60 text-emerald-50 border-emerald-400/30' : 'bg-[#8a2be2] text-white border-white/10'} rounded-2xl rounded-tr-none border shadow-lg` 
                  : `bg-white/5 border ${isCreator ? 'border-emerald-500/20 text-emerald-50/90' : 'border-white/10 text-slate-200'} rounded-2xl rounded-tl-none`
              }`}>
                {msg.content}
                <div className={`text-[8px] mono mt-3 opacity-40 font-bold ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className={`bg-white/5 border ${isCreator ? 'border-emerald-500/20' : 'border-white/10'} px-4 py-3 rounded-2xl rounded-tl-none`}>
                <div className="flex space-x-1.5">
                  <div className={`w-1.5 h-1.5 rounded-full animate-bounce ${isCreator ? 'bg-emerald-400' : 'bg-[#8a2be2]'}`}></div>
                  <div className={`w-1.5 h-1.5 rounded-full animate-bounce [animation-delay:-0.15s] ${isCreator ? 'bg-emerald-400' : 'bg-[#8a2be2]'}`}></div>
                  <div className={`w-1.5 h-1.5 rounded-full animate-bounce [animation-delay:-0.3s] ${isCreator ? 'bg-emerald-400' : 'bg-[#8a2be2]'}`}></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <form onSubmit={handleSend} className={`p-5 bg-black/40 border-t ${isCreator ? 'border-emerald-500/30' : 'border-[#8a2be2]/10'} rounded-b-[14px]`}>
          <div className={`flex items-center bg-white/5 border ${isCreator ? 'border-emerald-500/40' : 'border-white/10'} rounded-xl px-4 py-3 focus-within:ring-2 focus-within:ring-${isCreator ? 'emerald-500' : '[#8a2be2]'}/30 transition-all shadow-inner`}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={isCreator ? "Awaiting your command, Sir..." : "Inquire with Mimic1..."}
              className="flex-1 bg-transparent border-none py-1 text-[13px] text-white placeholder-slate-600 outline-none focus:ring-0 mono"
              autoComplete="off"
            />
            <button 
              type="submit" 
              disabled={!input.trim() || isLoading}
              className={`${accentColor} disabled:opacity-30 p-1.5 hover:scale-110 active:scale-95 transition-all`}
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" /></svg>
            </button>
          </div>
          <div className={`mt-3 text-[8px] mono text-center tracking-widest uppercase font-bold ${isCreator ? 'text-emerald-500/50' : 'text-slate-700'}`}>
            {isCreator ? 'ENCRYPTION: 1024-BIT_AES_ROOT' : 'SECURE_UPLINK_PROTOCOL_ALPHA'}
          </div>
        </form>
      </div>
    </>
  );
};

export default MimicTerminal;