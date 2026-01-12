import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-40 bg-[#050507] relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <div className="text-[10px] mono text-[#8a2be2] uppercase tracking-[0.5em] mb-4">Introduction</div>
          <h2 className="text-6xl font-black uppercase tracking-tighter text-white">About <span className="text-[#8a2be2]">Us</span></h2>
        </div>
        
        <div className="max-w-4xl mx-auto">
          {/* Narrative Block */}
          <div className="smoked-glass p-12 md:p-16 corner-bracket border border-slate-800/50">
            <h3 className="text-2xl font-bold text-white mb-8 uppercase tracking-tight flex items-center">
              <span className="w-8 h-px bg-[#8a2be2] mr-4"></span>
              Applied Excellence
            </h3>
            <div className="space-y-8 text-slate-400 text-lg md:text-xl leading-relaxed font-light">
              <p>
                Afton Industries is founded on the principle of <span className="text-white font-medium italic">Practical Mechatronics</span>. Our roadmap focuses on high-precision mechanical engineering and scalable automation solutions.
              </p>
              <p>
                We are dedicated to bridging the gap between distributed software command layers and low-level physical actuation, ensuring reliable, iterative performance for all mechatronic builds.
              </p>
              <p>
                Every project in our portfolio is a testament to the convergence of hardware durability and logical precision, developed through rigorous prototyping and field testing.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Background Graphic */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] pointer-events-none">
        <div className="w-[1000px] h-[1000px] border border-[#8a2be2] rounded-full"></div>
      </div>
    </section>
  );
};

export default About;