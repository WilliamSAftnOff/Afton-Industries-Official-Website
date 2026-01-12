import React, { useState, useEffect, useRef } from 'react';

const Hero: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        // Normalized mouse position from -1 to 1 for more intuitive math
        setMousePos({ 
          x: ((e.clientX - rect.left) / rect.width - 0.5) * 2, 
          y: ((e.clientY - rect.top) / rect.height - 0.5) * 2 
        });
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Shared transition for background elements
  const smoothTransition = "transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)";

  return (
    <section ref={sectionRef} className="relative min-h-[95vh] flex items-center pt-24 overflow-hidden bg-[#050507]">
      {/* LAYER 1: Deep Space Grid (Slowest Movement) */}
      <div 
        className="absolute inset-0 bg-grid opacity-[0.08] pointer-events-none transition-all duration-700 ease-out"
        style={{ 
          transform: `perspective(1000px) rotateX(15deg) translate3d(${mousePos.x * -15}px, ${mousePos.y * -15}px, 0)`,
          backgroundPosition: `0px ${scrollY * 0.15}px`
        }}
      ></div>

      {/* LAYER 2: Background Glow (Atmospheric) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute -top-1/4 -right-1/4 w-[800px] h-[800px] bg-purple-900/10 blur-[120px] rounded-full animate-pulse-slow transition-transform duration-1000"
          style={{ transform: `translate3d(${mousePos.x * 20}px, ${mousePos.y * 20}px, 0)` }}
        ></div>
        <div 
          className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-indigo-900/5 blur-[100px] rounded-full transition-transform duration-1000"
          style={{ transform: `translate3d(${mousePos.x * -20}px, ${mousePos.y * -20}px, 0)` }}
        ></div>
      </div>

      {/* LAYER 3: Abstract Geometry (Mid Depth) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        {/* Rotating Outer Ring */}
        <div 
          className="absolute top-[-10%] right-[-5%] w-[700px] h-[700px] border border-dashed border-purple-500/20 rounded-full"
          style={{ 
            transform: `translate3d(${mousePos.x * -30}px, ${mousePos.y * 30 + scrollY * -0.05}px, 0) rotate(${scrollY * 0.05}deg)`,
            transition: smoothTransition
          }}
        ></div>
        
        {/* Floating Square Frame */}
        <div 
          className="absolute bottom-[15%] left-[5%] w-[300px] h-[300px] border border-slate-800 transition-transform"
          style={{ 
            transform: `translate3d(${mousePos.x * 40}px, ${mousePos.y * -40}px, 0) rotate(15deg)`,
            transition: smoothTransition
          }}
        ></div>
      </div>

      {/* LAYER 4: Digital Debris / Data Fragments (Fastest Movement) */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Crosshairs */}
        <div className="absolute top-[20%] left-[20%] text-purple-800/40 font-mono text-xl"
             style={{ transform: `translate3d(${mousePos.x * -60}px, ${mousePos.y * -30}px, 0)`, transition: smoothTransition }}>+</div>
        <div className="absolute bottom-[30%] right-[15%] text-purple-800/40 font-mono text-xl"
             style={{ transform: `translate3d(${mousePos.x * 50}px, ${mousePos.y * 40}px, 0)`, transition: smoothTransition }}>+</div>
        
        {/* Hex Data Fragments */}
        <div className="absolute top-[15%] right-[35%] text-[10px] mono text-slate-800 font-bold"
             style={{ transform: `translate3d(${mousePos.x * -80}px, ${mousePos.y * 20}px, 0)`, transition: smoothTransition }}>
          0x4F_A2
        </div>
        <div className="absolute bottom-[20%] left-[40%] text-[10px] mono text-slate-800 font-bold"
             style={{ transform: `translate3d(${mousePos.x * 70}px, ${mousePos.y * -50}px, 0)`, transition: smoothTransition }}>
          [SYS_RDY]
        </div>

        {/* Vertical Line Scanners */}
        <div className="absolute top-0 left-[10%] w-px h-full bg-gradient-to-b from-transparent via-slate-800/30 to-transparent"
             style={{ transform: `translateX(${mousePos.x * -20}px)`, transition: smoothTransition }}></div>
        <div className="absolute top-0 right-[10%] w-px h-full bg-gradient-to-b from-transparent via-slate-800/30 to-transparent"
             style={{ transform: `translateX(${mousePos.x * 20}px)`, transition: smoothTransition }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="transition-transform duration-500 ease-out" style={{ transform: `translateY(${scrollY * 0.05}px)` }}>
          <div className="inline-flex items-center space-x-2 border-l-2 border-[#8a2be2] pl-4 mb-10 overflow-hidden group">
            <span className="text-[10px] mono uppercase tracking-[0.4em] text-[#9d8fbf] animate-slide-in">
              Industrial Protocol Alpha
            </span>
          </div>
          
          <h1 className="text-7xl lg:text-[10rem] font-black tracking-tighter mb-8 leading-[0.8] uppercase text-white selection:bg-purple-600">
            AFTON<br />
            <span className="text-[#8a2be2] chromatic">SYSTEMS</span>
          </h1>
          
          <p className="text-xl text-slate-400 max-w-lg mb-12 leading-relaxed font-light">
            Architecting the convergence of <span className="text-white font-medium italic">high-precision mechatronics</span> and distributed command layers.
          </p>

          <div className="flex flex-col sm:flex-row gap-6">
            <button 
              className="group relative px-12 py-5 bg-[#8a2be2] text-white font-black uppercase tracking-[0.2em] text-xs transition-all overflow-hidden hover:shadow-[0_0_30px_rgba(138,43,226,0.4)]"
              onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#8a2be2] via-[#a855f7] to-[#8a2be2] bg-[length:200%_auto] opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-gradient-x"></div>
              <span className="relative z-10">View Builds</span>
            </button>
            <button 
              className="group relative px-12 py-5 border border-slate-800 text-slate-400 font-black uppercase tracking-[0.2em] text-xs transition-all bg-black/40 backdrop-blur-sm overflow-hidden"
              onClick={() => document.getElementById('stack')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-900/20 to-transparent bg-[length:200%_auto] opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-gradient-x"></div>
              <span className="relative z-10 group-hover:text-white transition-colors">Tech Stack</span>
            </button>
          </div>
        </div>

        {/* Prototype Display Module with Dynamic Tilting */}
        <div className="hidden lg:flex items-center justify-center relative scale-110">
          <div 
            className="w-[450px] aspect-square smoked-glass border border-slate-800 relative flex items-center justify-center group"
            style={{ 
              transform: `perspective(1200px) rotateX(${mousePos.y * -4}deg) rotateY(${mousePos.x * 4}deg)`,
              transition: 'transform 0.1s cubic-bezier(0.1, 0.5, 0.5, 1)' // Faster response for main element
            }}
          >
            {/* Geometric Focus Elements */}
            <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-slate-700 transition-all group-hover:border-purple-500"></div>
            <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-slate-700 transition-all group-hover:border-purple-500"></div>
            <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-slate-700 transition-all group-hover:border-purple-500"></div>
            <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-slate-700 transition-all group-hover:border-purple-500"></div>

            <div className="text-center p-12">
               <div className="text-[10px] mono text-[#8a2be2] mb-6 tracking-[0.4em] uppercase font-bold">Visual Log Alpha</div>
               <div className="relative overflow-hidden w-64 h-64 mx-auto mb-8 border border-white/5">
                 <img 
                   src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=400" 
                   className="w-full h-full object-cover grayscale brightness-50 transition-all duration-700 group-hover:grayscale-0 group-hover:brightness-90 group-hover:scale-110"
                   alt="Primary Mechatronics Prototype"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
               </div>
               <div className="grid grid-cols-2 gap-4 text-[9px] mono text-slate-600 font-bold uppercase">
                 <div className="border border-slate-800 p-2 group-hover:border-purple-900 transition-colors">LAT: 35.132° N</div>
                 <div className="border border-slate-800 p-2 group-hover:border-purple-900 transition-colors">LON: 113.297° W</div>
               </div>
            </div>

            {/* Float Floating Element */}
            <div 
               className="absolute -right-8 top-1/2 -translate-y-1/2 p-4 bg-purple-600/10 border border-purple-500/20 backdrop-blur-xl transition-all duration-500 group-hover:translate-x-4"
               style={{ transform: `translateZ(50px) translateY(${mousePos.y * -15}px)` }}
            >
               <span className="text-[8px] mono text-purple-400 uppercase tracking-widest leading-none">Status: Ready</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slide-in {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-in {
          animation: slide-in 1.2s cubic-bezier(0.23, 1, 0.32, 1);
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.2; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 6s ease-in-out infinite;
        }
        @keyframes gradient-x {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;