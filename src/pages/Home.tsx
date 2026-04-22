import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { droneImages } from "../data";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      if (carouselRef.current) {
        const nextSlide = (currentSlide + 1) % droneImages.length;
        carouselRef.current.scrollTo({
          left: nextSlide * carouselRef.current.offsetWidth,
          behavior: "smooth"
        });
        setCurrentSlide(nextSlide);
      }
    }, 4000);
    return () => clearInterval(timer);
  }, [currentSlide]);

  const handleScroll = () => {
    if (carouselRef.current) {
      const index = Math.round(carouselRef.current.scrollLeft / carouselRef.current.offsetWidth);
      if (index !== currentSlide) {
        setCurrentSlide(index);
      }
    }
  };

  const scrollToSlide = (index: number) => {
    if (carouselRef.current) {
      carouselRef.current.scrollTo({
        left: index * carouselRef.current.offsetWidth,
        behavior: "smooth"
      });
      setCurrentSlide(index);
    }
  };

  return (
    <section id="home" className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-32">
      <div className="flex flex-col gap-12 max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row gap-12 items-start"
        >
          <div className="flex-1 flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 bg-tertiary shadow-[0_0_12px_rgba(251,188,0,0.6)]"></span>
              <span className="font-headline text-xs tracking-[0.3em] font-bold text-on-surface-variant uppercase">
                MECHANICAL ENGINEERING student at msu-iit
              </span>
            </div>

            <h1 className="text-6xl md:text-8xl font-headline font-bold text-on-surface leading-[0.9] tracking-tighter">
              JAYSON E.<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-tertiary">
                PANTOLLANA
              </span>
            </h1>

            <div className="flex flex-col gap-2">
              <p className="text-xl md:text-2xl font-headline font-bold text-primary italic uppercase tracking-tight">
                Project Leader of DR.one
              </p>
              <div className="text-on-surface-variant text-lg leading-relaxed font-body">
                <p>
                  Dr. ONE is an innovative semi-autonomous drone designed to address the growing global crisis of air and water pollution caused by industrialization and urbanization, which combines predictive AI analytics, pollutant sensing, and tether system to provide real-time monitoring of environmental quality in inaccessible areas.
                </p>
              </div>
            </div>
          </div>

          <div className="relative shrink-0 mx-auto md:mx-0">
            {/* Profile Frame Deco */}
            <div className="absolute -inset-4 border border-tertiary/20 rounded-full animate-pulse"></div>
            <div className="absolute -inset-2 border border-primary/20 rounded-full"></div>
            
            <div className="w-48 h-48 md:w-56 md:h-56 rounded-full border-2 border-tertiary overflow-hidden shadow-[0_0_30px_rgba(251,188,0,0.2)] bg-surface-container-high relative z-10">
              <img 
                src="/2x2.png" 
                alt="Jayson E. Pantollana Profile" 
                className="w-full h-full object-cover transition-all duration-500"
                referrerPolicy="no-referrer"
              />
              {/* Scanline Overlay */}
              <div className="absolute inset-0 pointer-events-none opacity-20 bg-gradient-to-b from-transparent via-white/5 to-transparent bg-[length:100%_4px]"></div>
            </div>

            {/* Status Indicator */}
            <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2 bg-black/80 px-2 py-1 border border-tertiary/30 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
              <span className="text-[8px] font-headline font-bold text-tertiary uppercase tracking-tighter">ONLINE_LINK</span>
            </div>
          </div>
        </motion.div>

        <div className="relative w-full max-w-2xl mx-auto flex flex-col gap-6">
          <div className="relative aspect-square border border-outline-variant/15 bg-surface-container-low flex flex-col rounded-[20px] overflow-hidden">
            <div className="flex-1 relative overflow-hidden group">
              <div 
                ref={carouselRef}
                onScroll={handleScroll}
                className="absolute inset-0 flex overflow-x-auto snap-x snap-mandatory no-scrollbar"
              >
                {droneImages.map((src, i) => (
                  <div key={i} className="min-w-full h-full snap-start flex items-center justify-center px-4 pt-[70px] pb-[70px]">
                    <img 
                      src={src} 
                      alt={`Dr. One Prototype View ${i + 1}`}
                      className="w-full h-full object-contain rounded-[20px]"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ))}
              </div>

              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                {droneImages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => scrollToSlide(i)}
                    className={`w-1.5 h-1.5 transition-all duration-300 ${
                      i === currentSlide 
                        ? "bg-tertiary shadow-[0_0_8px_rgba(251,188,0,0.6)]" 
                        : "bg-outline-variant/30"
                    }`}
                  />
                ))}
              </div>

              <div className="absolute inset-0 border-[20px] border-surface-container-low pointer-events-none z-10 rounded-[20px]"></div>
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40 z-10" viewBox="0 0 100 100">
                <line stroke="#fbbc00" strokeDasharray="2,2" strokeWidth="0.2" x1="10" x2="90" y1="50" y2="50"></line>
                <line stroke="#fbbc00" strokeDasharray="2,2" strokeWidth="0.2" x1="50" x2="50" y1="10" y2="90"></line>
                <circle cx="50" cy="50" fill="none" r="35" stroke="#fbbc00" strokeWidth="0.1"></circle>
              </svg>

              <span className="absolute top-2 left-2 text-[8px] text-on-surface-variant opacity-40 font-headline z-20">+ 00.000</span>
              <span className="absolute top-2 right-2 text-[8px] text-on-surface-variant opacity-40 font-headline z-20">00.001 +</span>
              <span className="absolute bottom-2 left-2 text-[8px] text-on-surface-variant opacity-40 font-headline z-20">+ 01.000</span>
              <span className="absolute bottom-2 right-2 text-[8px] text-on-surface-variant opacity-40 font-headline z-20">01.001 +</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 border-t border-b border-outline-variant/15 py-4 px-2">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-headline font-bold text-tertiary opacity-80 tracking-widest uppercase">LAT_REF</span>
              <span className="text-sm font-headline text-on-surface-variant tabular-nums">08.2397° N</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-headline font-bold text-tertiary opacity-80 tracking-widest uppercase">LONG_REF</span>
              <span className="text-sm font-headline text-on-surface-variant tabular-nums">124.2449° E</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-headline font-bold text-tertiary opacity-80 tracking-widest uppercase">SYS_DESC</span>
              <span className="text-sm font-headline text-on-surface-variant uppercase truncate">DRONE_V01</span>
            </div>
          </div>

          <div className="h-8"></div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "ACADEMICS & SPORTS", path: "/academics" },
              { label: "PROJECTS", path: "/projects" },
              { label: "WALL OF TRIUMPH", path: "/triumph" },
              { label: "START-UP", path: "/startup" }
            ].map((item) => (
              <Link 
                key={item.label}
                to={item.path}
                className="group relative py-4 px-6 bg-surface-container-high border border-outline-variant/30 hover:border-tertiary transition-all duration-300 text-center"
              >
                <div className="absolute top-0 left-0 w-1 h-1 bg-tertiary"></div>
                <span className="font-headline font-bold text-sm tracking-[0.2em] text-on-surface group-hover:text-tertiary">
                  {item.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
