import React from 'react';

const Footer: React.FC = () => {
  const socialLinks = [
    { 
      name: 'Facebook', 
      url: 'https://www.facebook.com/share/1FXmU2KeKD/', 
      icon: (
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
        </svg>
      )
    },
    { 
      name: 'Instagram', 
      url: 'https://www.instagram.com/mr.afton.purpleg_?igsh=ZGg5bXV4ZnExeGRu', 
      icon: (
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" d="M8 2h8c3.309 0 6 2.691 6 6v8c0 3.309-2.691 6-6 6H8c-3.309 0-6-2.691-6-6V8c0-3.309 2.691-6 6-6zm0 1.5c-2.481 0-4.5 2.019-4.5 4.5v8c0 2.481 2.019 4.5 4.5 4.5h8c2.481 0 4.5-2.019 4.5-4.5V8c0-2.481-2.019-4.5-4.5-4.5H8zM12 7a5 5 0 110 10 5 5 0 010-10zm0 1.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7zm5.25-3.5a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5z" clipRule="evenodd" />
        </svg>
      )
    },
    { 
      name: 'Discord', 
      url: '#', 
      icon: (
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028 14.09 14.09 0 001.226-1.994.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.418 2.157-2.418 1.21 0 2.176 1.096 2.157 2.419 0 1.334-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.418 2.157-2.418 1.21 0 2.176 1.096 2.157 2.419 0 1.334-.946 2.418-2.157 2.418z" />
        </svg>
      )
    },
    { 
      name: 'LinkedIn', 
      url: '#', 
      icon: (
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
        </svg>
      )
    }
  ];

  return (
    <footer id="footer" className="bg-[#050507] py-24 border-t border-[#8a2be2]/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-20 mb-20">
          <div className="col-span-1">
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-10 h-10 flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-full h-full filter drop-shadow-[0_0_5px_rgba(138,43,226,0.3)]">
                  <path d="M15 85 L45 20 L55 20 L85 85 H70 L60 65 H35 L25 85 Z" fill="#8a2be2" />
                  <path d="M65 85 V35 H80 V85 Z" fill="#5b1da3" />
                  <path d="M40 55 H55 L48 40 Z" fill="#050507" />
                </svg>
              </div>
              <span className="text-xl font-black tracking-tighter mono uppercase text-white">
                AFTON <span className="text-[#8a2be2]">INDUSTRIES</span>
              </span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed font-light">
              Architecting industrial automation through iterative mechatronic prototyping. All assets and engineering documentation are property of Afton Industries.
            </p>
          </div>

          <div>
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-black text-white mb-8 mono">Contact Channels</h4>
            <div className="flex space-x-6">
              {socialLinks.map((platform) => (
                <a 
                  key={platform.name}
                  href={platform.url}
                  target={platform.url.startsWith('http') ? "_blank" : "_self"}
                  rel={platform.url.startsWith('http') ? "noopener noreferrer" : ""}
                  className="w-12 h-12 border border-slate-900 flex items-center justify-center text-slate-500 hover:text-[#8a2be2] hover:border-[#8a2be2] hover:shadow-[0_0_20px_rgba(138,43,226,0.2)] hover:scale-110 transition-all duration-300 group bg-[#050507]"
                  title={platform.name}
                  aria-label={platform.name}
                >
                  {platform.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="smoked-glass p-8 border border-slate-900 relative">
            <div className="text-[9px] mono text-[#8a2be2] mb-4 tracking-widest uppercase">General Notice</div>
            <div className="flex items-center space-x-3 text-white mb-4">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-bold uppercase tracking-widest">SYSTEMS_ACTIVE</span>
            </div>
            <p className="text-[10px] text-slate-600 mono leading-relaxed uppercase">
              Official website of Afton Industries. 
              Protected content. Unauthorized use is prohibited.
            </p>
          </div>
        </div>

        <div className="pt-12 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-[10px] text-slate-700 mono uppercase tracking-[0.3em]">
            ©2026 AFTON INDUSTRIES. BUILD_v0.9.1
          </div>
          <div className="flex space-x-8 text-[10px] text-slate-700 mono uppercase tracking-widest">
            <a href="#" className="hover:text-[#8a2be2] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#8a2be2] transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;