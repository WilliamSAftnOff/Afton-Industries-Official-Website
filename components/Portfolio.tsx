import React, { useState, useEffect, useRef } from 'react';
import { PROJECTS } from '../constants';
import { ProjectCategory } from '../types';

interface PortfolioProps {
  activeFilter: string;
}

const RetroVideoPlayer: React.FC<{ 
  src: string; 
  onLoaded: () => void; 
  className?: string; 
}> = ({ src, onLoaded, className }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateProgress = () => {
      if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100);
      }
    };

    video.addEventListener('timeupdate', updateProgress);
    // Sync React state with actual video state (e.g. autoplay)
    video.addEventListener('play', () => setIsPlaying(true));
    video.addEventListener('pause', () => setIsPlaying(false));

    return () => {
      video.removeEventListener('timeupdate', updateProgress);
      video.removeEventListener('play', () => setIsPlaying(true));
      video.removeEventListener('pause', () => setIsPlaying(false));
    };
  }, []);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering parent click events
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (videoRef.current && videoRef.current.duration) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const clickedValue = x / rect.width;
      videoRef.current.currentTime = clickedValue * videoRef.current.duration;
    }
  };

  return (
    <div className="relative w-full h-full group/video">
      <video
        ref={videoRef}
        src={src}
        className={className}
        muted={isMuted}
        loop
        autoPlay
        playsInline
        onLoadedData={onLoaded}
      />
      
      {/* Custom Retro Controls Overlay */}
      <div className="absolute inset-x-0 bottom-0 p-4 z-30 opacity-0 group-hover/video:opacity-100 transition-opacity duration-300">
        <div className="bg-[#050507]/90 backdrop-blur-md border border-slate-800 p-2 flex items-center gap-3 shadow-2xl relative">
          {/* Decorative Corner Accents */}
          <div className="absolute -top-[1px] -left-[1px] w-2 h-2 border-t border-l border-[#8a2be2]"></div>
          <div className="absolute -bottom-[1px] -right-[1px] w-2 h-2 border-b border-r border-[#8a2be2]"></div>

          {/* Play/Pause Button */}
          <button 
            onClick={togglePlay}
            className="w-8 h-8 flex items-center justify-center border border-slate-700 bg-slate-900/50 text-[#8a2be2] hover:bg-[#8a2be2] hover:text-white transition-all duration-200"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/></svg>
            ) : (
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            )}
          </button>

          {/* Progress Bar */}
          <div 
            className="flex-1 h-6 flex items-center cursor-pointer group/seek relative"
            onClick={handleSeek}
          >
             {/* Track */}
            <div className="w-full h-[2px] bg-slate-800 relative">
               {/* Progress Fill */}
               <div 
                 className="absolute top-0 left-0 h-full bg-[#8a2be2] transition-all duration-100 ease-linear shadow-[0_0_8px_#8a2be2]"
                 style={{ width: `${progress}%` }}
               ></div>
               {/* Hover Thumb/Indicator */}
               <div 
                 className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-white rotate-45 opacity-0 group-hover/seek:opacity-100 transition-opacity"
                 style={{ left: `${progress}%`, transform: `translate(-50%, -50%) rotate(45deg)` }}
               ></div>
            </div>
          </div>

          {/* Mute Toggle */}
          <button 
            onClick={toggleMute}
            className="text-slate-500 hover:text-[#8a2be2] transition-colors p-1"
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" /></svg>
            ) : (
               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

const Portfolio: React.FC<PortfolioProps> = ({ activeFilter }) => {
  const [visibleProjects, setVisibleProjects] = useState<Set<string>>(new Set());
  const [loadedMedia, setLoadedMedia] = useState<Record<string, boolean>>({});
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Filter projects based on the active selection
  const filteredProjects = PROJECTS.filter(project => {
    switch (activeFilter) {
      case 'W.I.P.':
        // Assuming all projects in the log are currently active/in-progress.
        // If we had 'Completed' projects, we would exclude them here.
        return true; 
      case 'HARDWARE':
        return project.category === ProjectCategory.MECHATRONICS || project.category === ProjectCategory.ELECTRONICS;
      case 'DESIGN':
        return project.category === ProjectCategory.SOFTWARE || project.currentPhase === 'Design';
      case 'ALL':
      default:
        return true;
    }
  });

  useEffect(() => {
    // Reset visible projects when filter changes to re-trigger animations
    setVisibleProjects(new Set());

    // Disconnect previous observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('data-id');
          if (id) {
            setVisibleProjects((prev) => {
              const newSet = new Set(prev);
              newSet.add(id);
              return newSet;
            });
            observerRef.current?.unobserve(entry.target);
          }
        }
      });
    }, { 
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    });

    // We need a slight delay to allow React to render the new DOM elements from filteredProjects
    setTimeout(() => {
      const elements = document.querySelectorAll('.project-card');
      elements.forEach((el) => observerRef.current?.observe(el));
    }, 100);

    return () => observerRef.current?.disconnect();
  }, [activeFilter, filteredProjects.length]); // Re-run effect when filter or count changes

  return (
    <section id="portfolio" className="py-32 bg-[#050507] relative border-t border-purple-900/10 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-gradient-to-b from-purple-900/20 via-transparent to-transparent opacity-30"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-32">
          <div className="text-[10px] mono text-[#8a2be2] uppercase tracking-[0.6em] mb-6 flex justify-center items-center space-x-4">
            <span className="w-12 h-px bg-[#8a2be2]/30"></span>
            <span>Showcase Gallery</span>
            <span className="w-12 h-px bg-[#8a2be2]/30"></span>
          </div>
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase text-white mb-6">
            Our <span className="text-[#8a2be2] italic">Projects</span>
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto font-light leading-relaxed">
            A centralized showcase of mechatronic implementations and distributed intelligence systems.
            <br/>
            <span className="text-[#8a2be2] text-xs mono mt-2 block">ACTIVE VIEW: {activeFilter}</span>
          </p>
        </div>

        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 min-h-[500px]">
            {filteredProjects.map((project, index) => (
              <div 
                key={project.id} 
                data-id={project.id}
                className={`project-card group transition-all duration-1000 transform will-change-transform ${
                  visibleProjects.has(project.id) 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-24'
                }`}
                style={{ transitionDelay: `${(index % 2) * 200}ms` }}
              >
                {/* Media Container: Supports Image & Video */}
                <div className="relative aspect-[16/10] bg-black overflow-hidden border border-slate-900 corner-bracket group-hover:border-[#8a2be2] group-hover:ring-1 group-hover:ring-[#8a2be2] group-hover:shadow-[0_0_30px_rgba(138,43,226,0.6)] group-hover:scale-[1.02] transition-all duration-500 shadow-2xl">
                  
                  {/* Enhanced Placeholder / Loading Overlay */}
                  <div 
                    className={`absolute inset-0 z-10 bg-[#050507] flex flex-col items-center justify-center transition-all duration-1000 ease-in-out ${
                      loadedMedia[project.id] ? 'opacity-0 pointer-events-none' : 'opacity-100'
                    }`}
                  >
                     {/* Background Pulse */}
                     <div className="absolute inset-0 bg-purple-900/5 animate-pulse"></div>
                     
                     {/* Loader UI */}
                     <div className="relative flex flex-col items-center gap-3">
                         {/* Spinning Arc */}
                         <div className="w-10 h-10 border-2 border-slate-800 border-t-[#8a2be2] rounded-full animate-spin"></div>
                         
                         {/* Pulsing Text */}
                         <div className="flex flex-col items-center">
                            <span className="text-[10px] mono text-[#8a2be2] uppercase tracking-[0.3em] font-bold animate-pulse">Initializing</span>
                            <span className="text-[8px] mono text-slate-600 uppercase tracking-widest mt-1">Asset_ID: {project.id.substring(0,6)}</span>
                         </div>
                     </div>
                  </div>

                  {project.videoUrl ? (
                    <RetroVideoPlayer
                      src={project.videoUrl}
                      className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 ${
                        loadedMedia[project.id] ? 'opacity-60 group-hover:opacity-100' : 'opacity-0'
                      }`}
                      onLoaded={() => setLoadedMedia(p => ({...p, [project.id]: true}))}
                    />
                  ) : (
                    <img 
                      src={project.imageUrl} 
                      onLoad={() => setLoadedMedia(p => ({...p, [project.id]: true}))}
                      className={`w-full h-full object-cover grayscale transition-all duration-[1.5s] brightness-[0.4] group-hover:brightness-100 group-hover:grayscale-0 group-hover:scale-110 ${
                        loadedMedia[project.id] ? 'opacity-100' : 'opacity-0'
                      }`}
                      alt={project.title}
                    />
                  )}

                  {/* Overlays */}
                  <div className="absolute top-4 left-4 z-20 pointer-events-none">
                    <div className="px-3 py-1 bg-black/80 backdrop-blur-md border border-white/10 text-[9px] mono text-[#8a2be2] uppercase tracking-widest font-bold">
                      {project.category}
                    </div>
                  </div>

                  <div className="absolute bottom-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="px-3 py-1 bg-[#8a2be2] text-white text-[9px] mono font-bold uppercase tracking-widest">
                      Project Details
                    </div>
                  </div>

                  {/* Scanline & Vignette */}
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                  <div className="absolute inset-0 pointer-events-none border border-inset border-white/5 group-hover:border-[#8a2be2]/20"></div>
                </div>

                {/* Description & Details */}
                <div className="mt-8">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-3xl font-bold uppercase tracking-tighter text-white group-hover:text-[#8a2be2] transition-colors duration-500">
                      {project.title}
                    </h3>
                    <div className="text-[10px] mono text-slate-600 font-bold uppercase">
                      Status: {project.currentPhase}
                    </div>
                  </div>
                  
                  <p className="text-slate-400 font-light leading-relaxed mb-6 group-hover:text-slate-200 transition-colors duration-500">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.specs.map((spec, i) => (
                      <span key={i} className="text-[9px] mono text-slate-500 border border-slate-900 px-2 py-1 uppercase">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center border border-dashed border-slate-800 bg-slate-900/10">
            <div className="text-[#8a2be2] text-xl font-mono mb-4">NO_DATA_FOUND</div>
            <p className="text-slate-500">No projects match the current filter criteria.</p>
          </div>
        )}

        {/* Call to Action for upcoming media */}
        <div className="mt-32 text-center py-20 border-t border-slate-900">
          <div className="inline-block p-1 bg-gradient-to-r from-transparent via-[#8a2be2]/20 to-transparent mb-8">
            <div className="px-8 py-3 bg-[#050507] text-[10px] mono text-[#8a2be2] uppercase tracking-[0.4em]">
              Awaiting Project Media Updates
            </div>
          </div>
          <p className="text-slate-600 text-xs italic">
            Visual documentation and project recordings will be uploaded to the gallery soon.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;