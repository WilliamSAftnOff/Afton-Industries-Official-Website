import React, { useState } from 'react';
import { TECH_STACK } from '../constants';
import { TechItem } from '../types';
import { generateTechOverview } from '../services/gemini';

const TechStack: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<TechItem | null>(null);
  const [aiAnalysis, setAiAnalysis] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleItemClick = async (item: TechItem) => {
    setSelectedItem(item);
    setLoading(true);
    setAiAnalysis('');
    setImageError(false);
    
    // Fetch AI overview
    const analysis = await generateTechOverview(item.name);
    setAiAnalysis(analysis || 'Analysis unavailable.');
    setLoading(false);
  };

  const closeOverlay = () => {
    setSelectedItem(null);
    setAiAnalysis('');
  };

  return (
    <section id="stack" className="py-24 bg-[#050507] relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 border-l-4 border-purple-600 pl-6">
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase text-white">
            Our Hardware <span className="text-purple-600">Supply Stocks</span>
          </h2>
          <p className="text-slate-500 mt-2 font-light">Current inventory for active mechatronic development.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          {TECH_STACK.map((item) => (
            <div 
              key={item.id}
              onClick={() => handleItemClick(item)}
              className={`group relative bg-[#0c0c0e] border border-slate-900 p-8 transition-all duration-300 hover:border-purple-500/40 hover:bg-[#121215] cursor-pointer flex flex-col justify-between ${
                item.size === 'large' ? 'md:col-span-3' : 'md:col-span-2'
              }`}
            >
              <div>
                <div className="text-[10px] mono text-purple-500 uppercase tracking-widest mb-3 font-bold">
                  {item.category}
                </div>
                <h3 className="text-2xl font-bold uppercase tracking-tight text-white mb-4 group-hover:text-purple-400 transition-colors">
                  {item.name}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed font-light">
                  {item.details}
                </p>
              </div>
              
              <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-slate-800 transition-colors group-hover:border-purple-500/20"></div>
              <div className="mt-6 flex items-center text-[9px] mono text-slate-600 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                 <span className="w-2 h-2 bg-purple-500 mr-2 rounded-full animate-pulse"></span>
                 View Datasheet
              </div>
            </div>
          ))}
          
          {/* Simple Contact Link Card */}
          <div className="md:col-span-6 lg:col-span-1 border border-dashed border-slate-800 p-8 flex flex-col justify-center items-center text-center group hover:border-purple-500/50 transition-colors cursor-pointer bg-[#050507]">
            <span className="text-[10px] mono text-slate-600 uppercase tracking-widest mb-2 group-hover:text-purple-500">Inventory Update</span>
            <h4 className="text-sm font-bold text-slate-400 uppercase tracking-tighter group-hover:text-white leading-relaxed">More Hardware & Electronic Stocks Coming Soon</h4>
          </div>
        </div>
      </div>

      {/* ITEM DETAIL OVERLAY */}
      {selectedItem && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={closeOverlay}></div>
          <div className="relative w-full max-w-4xl bg-[#050507] border border-slate-800 shadow-[0_0_50px_rgba(0,0,0,0.8)] corner-bracket overflow-hidden flex flex-col md:flex-row max-h-[90vh] md:max-h-[600px] animate-slide-in-up">
            
            {/* Close Button */}
            <button 
              onClick={closeOverlay}
              className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center bg-black border border-slate-700 text-white hover:bg-purple-600 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>

            {/* Left: Visual */}
            <div className="w-full md:w-1/2 h-64 md:h-auto relative bg-black border-r border-slate-800 overflow-hidden">
               {imageError ? (
                 <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900/50">
                    <div className="w-16 h-16 border border-purple-900/50 rounded-full flex items-center justify-center mb-4">
                      <div className="w-8 h-8 bg-purple-900/50 rounded-full animate-pulse"></div>
                    </div>
                    <span className="text-[9px] mono text-slate-500 uppercase">Image Signal Lost</span>
                 </div>
               ) : (
                 <img 
                   src={selectedItem.imageUrl} 
                   alt={selectedItem.name} 
                   className="w-full h-full object-cover opacity-80"
                   onError={() => setImageError(true)}
                 />
               )}
               <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-transparent to-transparent"></div>
               <div className="absolute bottom-6 left-6">
                 <div className="text-[10px] mono text-purple-500 uppercase tracking-widest mb-1">{selectedItem.category}</div>
                 <h2 className="text-3xl font-black text-white uppercase tracking-tighter">{selectedItem.name}</h2>
               </div>
            </div>

            {/* Right: Data */}
            <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto">
              <div className="mb-8">
                <h4 className="text-[10px] mono text-slate-500 uppercase tracking-[0.2em] mb-4 border-b border-slate-800 pb-2">Technical Overview</h4>
                <p className="text-slate-300 leading-relaxed font-light text-sm">
                  {selectedItem.details}
                </p>
              </div>

              <div className="bg-[#0c0c0e] border border-slate-800 p-6 relative">
                 <h4 className="text-[10px] mono text-purple-500 uppercase tracking-[0.2em] mb-4 flex items-center">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-2 animate-pulse"></span>
                    Mimic1 Analysis
                 </h4>
                 
                 {loading ? (
                   <div className="flex space-x-1 py-4">
                     <span className="w-1 h-4 bg-purple-600/50 animate-pulse"></span>
                     <span className="w-1 h-6 bg-purple-600/50 animate-pulse [animation-delay:0.1s]"></span>
                     <span className="w-1 h-3 bg-purple-600/50 animate-pulse [animation-delay:0.2s]"></span>
                     <span className="w-1 h-5 bg-purple-600/50 animate-pulse [animation-delay:0.3s]"></span>
                   </div>
                 ) : (
                   <p className="text-xs mono text-slate-400 leading-relaxed border-l-2 border-purple-900/50 pl-4">
                     {aiAnalysis}
                   </p>
                 )}
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4">
                 <button className="py-3 border border-slate-700 text-[10px] mono uppercase text-slate-400 hover:bg-white hover:text-black transition-colors">
                   Download Spec Sheet
                 </button>
                 <button className="py-3 bg-purple-900/20 border border-purple-900/50 text-[10px] mono uppercase text-purple-400 hover:bg-purple-600 hover:text-white transition-colors">
                   Check Availability
                 </button>
              </div>
            </div>

          </div>
        </div>
      )}

      <style>{`
        @keyframes slide-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-in-up {
          animation: slide-in-up 0.3s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default TechStack;