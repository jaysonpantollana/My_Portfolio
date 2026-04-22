import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { BIBLE_VERSES } from "../data";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Home() {
  const [currentVerse, setCurrentVerse] = useState(0);
  const galleryRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (galleryRef.current) {
      const scrollAmount = galleryRef.current.offsetWidth;
      galleryRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const galleryImages = [
    "/start-up_1.jpg",
    "/start-up_2.jpg",
    "/start-up_3.jpg",
    "/start-up_4.jpg",
    "/start-up_5.jpg",
    "/start-up_6.jpg",
    "/fd8e1b4b-6c00-4934-8e9a-def8cc5e4188.jpg",
    "/daily-drop_image1.jpg"
  ];

  useEffect(() => {
    const verseTimer = setInterval(() => {
      setCurrentVerse((prev) => (prev + 1) % BIBLE_VERSES.length);
    }, 5000);
    return () => clearInterval(verseTimer);
  }, []);

  const ProfileImage = ({ sizeClasses }: { sizeClasses: string }) => (
    <div className={`relative shrink-0 ${sizeClasses}`}>
      {/* Profile Frame Deco */}
      <div className="absolute -inset-2 md:-inset-4 border border-tertiary/20 rounded-full animate-pulse"></div>
      <div className="absolute -inset-1 md:-inset-2 border border-primary/20 rounded-full"></div>
      
      <div className="w-full h-full rounded-full border border-tertiary overflow-hidden shadow-[0_0_20px_rgba(251,188,0,0.15)] md:shadow-[0_0_30px_rgba(251,188,0,0.2)] bg-surface-container-high relative z-10">
        <img 
          src="/2x2.png" 
          alt="Jayson E. Pantollana Profile" 
          className="w-full h-full object-cover transition-all duration-500"
          referrerPolicy="no-referrer"
        />
        {/* Scanline Overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-10 md:opacity-20 bg-gradient-to-b from-transparent via-white/5 to-transparent bg-[length:100%_4px]"></div>
      </div>

      {/* Status Indicator */}
      <div className="absolute bottom-1 right-1 md:bottom-4 md:right-4 z-20 flex items-center gap-1 md:gap-2 bg-black/80 px-1 md:px-2 py-0.5 md:py-1 border border-tertiary/30 rounded-full">
        <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-500 rounded-full animate-ping"></div>
        <span className="text-[6px] md:text-[8px] font-headline font-bold text-tertiary uppercase tracking-tighter">ONLINE_LINK</span>
      </div>
    </div>
  );

  return (
    <section id="home" className="relative z-10 max-w-7xl mx-auto px-6 pt-20 md:pt-24 pb-32">
      <div className="flex flex-col gap-12 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row gap-8 lg:gap-8 items-start"
        >
          <div className="flex-1 flex flex-col gap-6 w-full min-w-0">
            <div className="flex items-center gap-3 min-h-[1.5rem]">
              <span className="w-2 h-2 bg-tertiary shadow-[0_0_12px_rgba(251,188,0,0.6)] shrink-0"></span>
              <div className="overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.span 
                    key={currentVerse}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5 }}
                    className="block font-headline text-[10px] md:text-xs tracking-[0.1em] text-on-surface-variant uppercase"
                  >
                    {(() => {
                      const [ref, ...text] = BIBLE_VERSES[currentVerse].split(" – ");
                      return (
                        <>
                          <span className="font-bold text-tertiary">{ref}</span>
                          <span className="font-normal opacity-80"> – {text.join(" – ")}</span>
                        </>
                      );
                    })()}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>

            <div className="flex flex-row items-center md:items-start gap-4 md:block">
              {/* Profile Image - Visible only on Mobile inside the row */}
              <div className="md:hidden">
                <ProfileImage sizeClasses="w-24 h-24 sm:w-32 sm:h-32" />
              </div>
              
              <h1 className="flex-1 text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-headline font-bold text-on-surface leading-[1] md:leading-[0.9] tracking-tighter">
                JAYSON E.<br className="hidden sm:block" />
                <span className="sm:hidden"> </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-tertiary">
                  PANTOLLANA
                </span>
              </h1>
            </div>

            <div className="mt-12 mb-8 relative w-full max-w-2xl flex flex-col gap-6">
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
                    className="group relative py-3 px-2 md:py-4 md:px-6 bg-surface-container-high border border-outline-variant/30 hover:border-tertiary transition-all duration-300 text-center flex items-center justify-center min-h-[64px]"
                  >
                    <div className="absolute top-0 left-0 w-1 h-1 bg-tertiary"></div>
                    <span className="font-headline font-bold text-[9px] min-[360px]:text-[10px] min-[400px]:text-xs md:text-sm tracking-[0.1em] md:tracking-[0.2em] text-on-surface group-hover:text-tertiary whitespace-nowrap">
                      {item.label}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-10 mt-8">
              <div className="flex flex-col gap-2">
                <p className="text-lg md:text-2xl font-headline font-bold text-primary italic uppercase tracking-tight">
                  ABOUT ME
                </p>
                <div className="text-on-surface-variant text-base md:text-lg leading-relaxed font-body flex flex-col gap-4">
                  <p>
                    I am a Mechanical Engineering student at MSU-IIT blending technical rigor with a disciplined work ethic shaped by years of competitive tennis. As a founder of a local startup, I lead the development of platforms such as DailyDrop a food delivery app and Khubo a rental property listing app. Now, it is in progress, and concurrently serving as the SPODA Head for JPSME.
                  </p>
                  <p>
                    My journey is deeply rooted in a commitment to continuous self-improvement and an unwavering foundation of faith, both of which serve as the internal compass for everything I build. I believe that true innovation is not just about technical mastery, but about ensuring that my work in engineering research and software development translates into a meaningful, lasting contribution to my community.
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <p className="text-lg md:text-2xl font-headline font-bold text-primary italic uppercase tracking-tight">
                  ACKNOWLEDGEMENT
                </p>
                <div className="text-on-surface-variant text-base md:text-lg leading-relaxed font-body flex flex-col gap-4">
                  <p>
                    Above all, I offer my most profound gratitude to the Almighty God, the author of my life and the source of every blessing I have received. As I reflect on my journey through research, academics, sports, and the building of my startups, I am humbled by the realization that while these achievements are the result of hard work and dedication, it is His hand that has guided every step.
                  </p>
                  <p>
                    I thank Him for the blessing of life itself, for the air I breathe, and for the opportunity to live out the purpose He has set before me. Beyond the technical wins and academic honors, I am most grateful for how He has guided me and improved me as a man. He has taken my ambitions and refined them, teaching me to walk in His ways and molding my character through both success and struggle.
                  </p>
                  <p>
                    In the long nights spent coding or studying engineering, He was my clarity. In the heat of competition on the court, He was my discipline. In the uncertainty of starting a business, He was my steady foundation. I am thankful for the grace to live the life He gave me and for the constant guidance that pushes me to grow into a better version of myself every day. Every milestone reached is not a testament to my own power but to His unending favor. I dedicate all my work and my very life back to Him, acknowledging that I am who I am today only by His divine grace. To God be all the glory.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Image - Visible only on Desktop on the right */}
          <div className="hidden md:block shrink-0">
            <ProfileImage sizeClasses="w-48 h-48 lg:w-56 lg:h-56" />
          </div>
        </motion.div>

        {/* Gallery Section */}
        <div className="mt-32 flex flex-col gap-8 max-w-6xl mx-auto w-full">
          <div className="relative group">
            {/* Gallery Label */}
            <div className="absolute -top-4 left-0 z-20 bg-background px-4 py-1 border border-outline-variant/30">
              <span className="text-[10px] font-headline font-bold text-tertiary tracking-[0.2em] uppercase">GALLERY</span>
            </div>

            {/* Carousel Container */}
            <div className="relative border border-outline-variant/15 p-4 bg-surface-container-low overflow-hidden">
              <div 
                ref={galleryRef}
                className="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {galleryImages.map((src, index) => (
                  <div key={index} className="flex-none w-full sm:w-1/2 md:w-[calc(33.333%-11px)] aspect-square md:aspect-video snap-start">
                    <img 
                      src={src} 
                      alt={`Gallery view ${index + 1}`}
                      className="w-full h-full object-cover transition-all duration-300 border border-outline-variant/10 hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ))}
              </div>

              {/* Navigation Buttons */}
              <button 
                onClick={() => scroll('left')}
                className="absolute left-6 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/80 border border-tertiary/30 flex items-center justify-center text-tertiary hover:bg-tertiary hover:text-black transition-all z-20"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button 
                onClick={() => scroll('right')}
                className="absolute right-6 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/80 border border-tertiary/30 flex items-center justify-center text-tertiary hover:bg-tertiary hover:text-black transition-all z-20"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
