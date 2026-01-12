import React, { useState } from 'react';

interface NavbarProps {
  onNavigate: (section: string) => void;
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, activeFilter, onFilterChange }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: '[OUR PROJECTS]', id: 'portfolio' },
    { label: '[ABOUT US]', id: 'about' },
    { label: '[CONTACT]', id: 'footer' }
  ];

  const subFilters = ['ALL', 'W.I.P.', 'HARDWARE', 'DESIGN'];

  const onNavigateWithClose = (section: string) => {
    onNavigate(section);
    setIsMobileMenuOpen(false);
  };

  const handleFilterClick = (filter: string) => {
    onFilterChange(filter);
    // If on mobile, close menu if it was open (though filters are in the sub-bar usually)
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#050507]/90 backdrop-blur-xl border-b border-purple-900/30">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center space-x-4 cursor-pointer group" onClick={() => onNavigateWithClose('home')}>
          {/* Official AI Logo SVG */}
          <div className="w-12 h-12 flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
            <svg viewBox="0 0 100 100" className="w-full h-full filter drop-shadow-[0_0_8px_rgba(138,43,226,0.4)]">
              <path 
                d="M15 85 L45 20 L55 20 L85 85 H70 L60 65 H35 L25 85 Z" 
                fill="#8a2be2" 
                className="transition-colors group-hover:fill-[#a855f7]"
              />
              <path 
                d="M65 85 V35 H80 V85 Z" 
                fill="#5b1da3" 
                className="transition-colors group-hover:fill-[#8a2be2]"
              />
              <path 
                d="M40 55 H55 L48 40 Z" 
                fill="#050507"
              />
            </svg>
          </div>
          <span className="text-xl font-black tracking-tight mono uppercase text-white">
            AFTON <span className="text-[#8a2be2]">INDUSTRIES</span>
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-12 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500">
          {navLinks.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigateWithClose(item.id)}
              className="hover:text-[#8a2be2] transition-colors relative group"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#8a2be2] transition-all group-hover:w-full"></span>
            </button>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-[#8a2be2]"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>

      {/* Sub-Navigation Filter Bar */}
      <div className="border-t border-purple-950/20 bg-black/40">
        <div className="max-w-7xl mx-auto px-6 h-12 flex items-center space-x-3 overflow-x-auto no-scrollbar">
          <span className="text-[9px] mono text-slate-700 font-bold tracking-widest uppercase flex-shrink-0 mr-4">Filter:</span>
          {subFilters.map(filter => (
            <button 
              key={filter}
              onClick={() => handleFilterClick(filter)}
              className={`relative group text-[9px] mono tracking-widest uppercase transition-all duration-300 flex-shrink-0 px-4 py-1.5 border ${
                activeFilter === filter 
                  ? 'text-[#8a2be2] font-bold border-[#8a2be2]/50 bg-[#8a2be2]/10 shadow-[0_0_15px_rgba(138,43,226,0.15)]' 
                  : 'text-[#9d8fbf]/60 border-transparent hover:border-[#8a2be2]/30 hover:bg-[#8a2be2]/5 hover:text-[#d8b4fe]'
              }`}
            >
              {/* Active Indicator Dot */}
              {activeFilter === filter && (
                <span className="absolute left-1.5 top-1/2 -translate-y-1/2 w-1 h-1 bg-[#8a2be2] rounded-full animate-pulse shadow-[0_0_5px_#8a2be2]"></span>
              )}
              
              <span className={`relative z-10 ${activeFilter === filter ? 'pl-2' : ''} transition-all duration-300`}>
                {filter}
              </span>

              {/* Corner Accents on Hover */}
              <span className={`absolute top-0 left-0 w-1 h-1 border-t border-l border-[#8a2be2] transition-all duration-300 ${activeFilter === filter ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}></span>
              <span className={`absolute bottom-0 right-0 w-1 h-1 border-b border-r border-[#8a2be2] transition-all duration-300 ${activeFilter === filter ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}></span>
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 smoked-glass ${isMobileMenuOpen ? 'max-h-[300px] border-b border-purple-900/50' : 'max-h-0'}`}>
        <div className="flex flex-col p-6 space-y-4">
          {navLinks.map((item) => (
            <button key={item.id} onClick={() => onNavigateWithClose(item.id)} className="text-left text-xs font-bold uppercase tracking-widest text-slate-400">
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;