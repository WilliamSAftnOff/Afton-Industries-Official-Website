import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Portfolio from './components/Portfolio';
import About from './components/About';
import Footer from './components/Footer';
import MimicTerminal from './components/MimicChat';
import TechStack from './components/TechStack';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [bootStatus, setBootStatus] = useState('INITIALIZING');
  const [activeFilter, setActiveFilter] = useState('ALL');

  useEffect(() => {
    const sequence = [
      { msg: 'LOADING_ASSETS', delay: 400 },
      { msg: 'CONFIGURING_SYSTEM', delay: 800 },
      { msg: 'SYNCING_RESOURCES', delay: 1200 },
      { msg: 'VERIFYING_PORTAL', delay: 1600 },
      { msg: 'READY', delay: 1900 },
    ];

    sequence.forEach((step) => {
      setTimeout(() => setBootStatus(step.msg), step.delay);
    });

    const timer = setTimeout(() => {
      setLoading(false);
    }, 2400);
    return () => clearTimeout(timer);
  }, []);

  const handleNavigate = (section: string) => {
    const element = document.getElementById(section);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
  };

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    
    // Auto-scroll to portfolio if user triggers a filter but is not currently viewing the portfolio
    const portfolioSection = document.getElementById('portfolio');
    if (portfolioSection) {
      const rect = portfolioSection.getBoundingClientRect();
      const inView = rect.top >= 0 && rect.bottom <= window.innerHeight;
      const nearView = rect.top < window.innerHeight && rect.bottom > 0;
      
      // If we aren't already looking at it, scroll to it
      if (!inView && !nearView) {
        handleNavigate('portfolio');
      } else if (rect.top > 300) {
          // If it's partially in view but down below (e.g. at Hero), scroll down
          handleNavigate('portfolio');
      }
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-[#050507] flex flex-col items-center justify-center z-[200] overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10"></div>
        
        {/* Animated Brand Mark during Load */}
        <div className="relative mb-12 w-24 h-24 animate-pulse">
           <svg viewBox="0 0 100 100" className="w-full h-full filter drop-shadow-[0_0_15px_rgba(138,43,226,0.6)]">
              <path d="M15 85 L45 20 L55 20 L85 85 H70 L60 65 H35 L25 85 Z" fill="#8a2be2" />
              <path d="M65 85 V35 H80 V85 Z" fill="#5b1da3" />
              <path d="M40 55 H55 L48 40 Z" fill="#050507" />
            </svg>
        </div>

        <div className="relative w-[320px] md:w-[480px]">
          <div className="flex justify-between items-end mb-4 px-2">
            <div className="flex flex-col">
              <span className="text-[9px] text-[#8a2be2] mono uppercase tracking-[0.3em] font-bold">Build_v0.9.1</span>
              <span className="text-[14px] text-white font-black mono uppercase tracking-widest chromatic">
                AFTON_INDUSTRIES
              </span>
            </div>
            <div className="text-right">
              <span className="text-[9px] text-slate-500 mono block uppercase">Status</span>
              <span className="text-[10px] text-white mono font-bold uppercase">{bootStatus}</span>
            </div>
          </div>
          <div className="relative p-1 border border-slate-800 bg-black/40 backdrop-blur-md overflow-hidden">
            <div className="h-4 w-full bg-slate-900/50 relative overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#8a2be2] to-[#bf00ff] animate-hydraulic relative">
              </div>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4">
             <div className="border border-slate-800 p-3 flex flex-col items-start bg-black/20">
               <span className="text-[8px] mono text-slate-500 uppercase mb-1">Session</span>
               <div className="flex space-x-1">
                 <div className="w-1.5 h-1.5 bg-[#8a2be2]"></div>
                 <div className="w-1.5 h-1.5 bg-[#8a2be2]"></div>
                 <div className="w-1.5 h-1.5 bg-[#8a2be2]"></div>
                 <div className="w-1.5 h-1.5 bg-slate-800"></div>
               </div>
             </div>
             <div className="border border-slate-800 p-3 flex flex-col items-end bg-black/20 text-right">
               <span className="text-[8px] mono text-slate-500 uppercase mb-1">Network</span>
               <span className="text-[9px] mono text-white uppercase tracking-tighter">CONNECTED</span>
             </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050507] selection:bg-purple-900/30 selection:text-purple-400">
      <Navbar onNavigate={handleNavigate} activeFilter={activeFilter} onFilterChange={handleFilterChange} />
      <main>
        <div id="home">
          <Hero />
        </div>
        <div id="portfolio">
          <Portfolio activeFilter={activeFilter} />
        </div>
        <div id="about">
          <About />
        </div>
        <TechStack />
      </main>
      <Footer />
      <MimicTerminal />
    </div>
  );
};

export default App;