import React, { useState, useEffect, useRef } from 'react';
import { FUTURE_INNOVATIONS } from '../constants';

const FutureInnovations: React.FC = () => {
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});
  const [scrollPos, setScrollPos] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        setScrollPos(rect.top);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        setMousePos({ x, y });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleImageLoad = (id: string) => {
    setLoadedImages(prev => ({ ...prev, [id]: true }));
  };

  return (
    <section 
      id="future" 
      ref={sectionRef}
      className="py-32 bg-black relative overflow-hidden border-t border-purple-900/30" 
      aria-labelledby="future-heading"
    >
      {/* --- DYNAMIC PARALLAX BACKGROUND LAYERS --- */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{ 
          transform: `translate3d(${mousePos.x * -30}px, ${scrollPos * 0.05 + mousePos.y * -30}px, 0)`,
          transition: 'transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
          willChange: 'transform'
        }}
      >
        <div className="absolute top-[-20%] left-[-20%] w-[140%] h-[140%] bg-[radial-gradient(circle_at_center,rgba(88,28,135,0.2)_0%,transparent_60%)] blur-[150px]"></div>
      </div>

      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.05]"
        style={{ 
          transform: `translate3d(${mousePos.x * 15}px, ${scrollPos * 0.12 + mousePos.y * 15}px, 0) perspective(1000px) rotateX(15deg)`,
          transition: 'transform 0.3s ease-out',
          willChange: 'transform'
        }}
      >
        <div className="w-full h-full bg-grid"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-20">
          <div className="text-[10px] uppercase tracking-[0.4em] font-bold text-purple-500 mb-4 mono flex items-center space-x-2">
            <span className="w-8 h-[1px] bg-purple-500"></span>
            <span>Experimental Division</span>
          </div>
          <h2 id="future-heading" className="text-4xl lg:text-6xl font-bold tracking-tighter uppercase mb-6 leading-tight">
            Future <br /><span className="text-purple-600">Innovations</span>
          </h2>
          <p className="text-slate-400 max-w-2xl leading-relaxed text-lg font-light">
            Pushing the boundaries of mechatronic architecture. These concepts represent our upcoming hardware roadmap and system design studies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {FUTURE_INNOVATIONS.map((item) => (
            <article 
              key={item.id} 
              className="group relative border border-slate-800 p-8 transition-all duration-700 bg-black/60 backdrop-blur-md hover:border-purple-500/50 hover:shadow-[0_0_40px_rgba(139,92,246,0.15)] flex flex-col"
              aria-labelledby={`future-title-${item.id}`}
            >
              {/* Image Container */}
              <div className="mb-8 aspect-square relative overflow-hidden bg-[#050507] border border-slate-800 group-hover:border-purple-500/30 transition-colors duration-500">
                
                {!loadedImages[item.id] && (
                  <div 
                    className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-slate-900/20 overflow-hidden" 
                    aria-hidden="true"
                  >
                    <div className="absolute inset-0 bg-purple-600/5 animate-subtle-pulse"></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/10 to-transparent animate-scan-y opacity-50"></div>
                    <div className="relative w-12 h-12 border border-purple-500/10 rounded-full flex items-center justify-center animate-pulse-slow">
                      <div className="w-1 h-1 bg-purple-500/30 rounded-full"></div>
                    </div>
                  </div>
                )}
                
                <img 
                  src={item.blueprintUrl} 
                  alt={`Blueprint for ${item.title}`} 
                  onLoad={() => handleImageLoad(item.id)}
                  className={`w-full h-full object-cover mix-blend-screen grayscale transition-all duration-[1500ms] ease-out group-hover:scale-110 ${
                    loadedImages[item.id] ? 'opacity-40 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'
                  }`}
                />
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between mb-4">
                  <h3 id={`future-title-${item.id}`} className="text-xl font-bold mono text-white group-hover:text-purple-400 transition-colors uppercase">
                    {item.title}
                  </h3>
                  <span className="text-[8px] mono text-purple-600 bg-purple-900/10 px-2 py-0.5 border border-purple-900/30 uppercase">
                    IN-DEVELOPMENT
                  </span>
                </div>
                
                <p className="text-sm text-slate-500 leading-relaxed group-hover:text-slate-300 transition-colors mb-6">
                  {item.description}
                </p>
              </div>

              <div className="pt-6 border-t border-slate-900 mt-auto">
                <button className="text-[9px] mono text-slate-600 group-hover:text-purple-500 transition-colors uppercase tracking-widest">
                  View Technical Abstract
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-24 p-10 border border-purple-500/20 bg-gradient-to-r from-purple-950/10 to-transparent flex flex-col md:flex-row items-center justify-between gap-10 group/footer overflow-hidden relative">
          <div className="absolute top-0 right-0 p-2 opacity-10 font-mono text-[80px] select-none pointer-events-none leading-none -translate-y-4">
            R&D
          </div>
          <div className="flex items-center space-x-8 relative z-10">
            <div className="w-16 h-16 border border-purple-500/30 flex items-center justify-center transition-all group-hover/footer:border-purple-500 duration-700" aria-hidden="true">
              <div className="w-8 h-8 border border-purple-500 animate-[spin_4s_linear_infinite]"></div>
            </div>
            <div>
              <div className="text-lg font-bold uppercase tracking-widest text-white mb-2">Industrial Collaboration</div>
              <p className="text-sm text-slate-500 max-w-md">We are currently open to discussing hardware development and implementation with academic and industrial partners.</p>
            </div>
          </div>
          <button 
            className="relative z-10 whitespace-nowrap bg-purple-600 hover:bg-white hover:text-purple-950 px-10 py-4 text-xs font-bold uppercase tracking-[0.3em] transition-all transform hover:-translate-y-1 hover:scale-105 hover:shadow-[0_0_30px_rgba(139,92,246,0.6)] active:scale-95"
          >
            Initiate Contact
          </button>
        </div>
      </div>
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes scan-y {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        .animate-scan-y {
          animation: scan-y 3.5s linear infinite;
        }
        @keyframes subtle-pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.7; }
        }
        .animate-subtle-pulse {
          animation: subtle-pulse 4s ease-in-out infinite;
        }
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); opacity: 0.2; }
          50% { transform: scale(1.1); opacity: 0.4; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default FutureInnovations;