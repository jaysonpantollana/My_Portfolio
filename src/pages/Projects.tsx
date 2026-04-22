import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { TrendingUp } from "lucide-react";
import { projectsData } from "../data";

function ProjectCarousel({ images }: { images: string[] }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (images.length === 0) return;
    const timer = setInterval(() => {
      if (carouselRef.current) {
        const nextSlide = (currentSlide + 1) % images.length;
        carouselRef.current.scrollTo({
          left: nextSlide * carouselRef.current.offsetWidth,
          behavior: "smooth"
        });
        setCurrentSlide(nextSlide);
      }
    }, 3000);
    return () => clearInterval(timer);
  }, [currentSlide, images.length]);

  return (
    <div className="absolute inset-0 z-0">
      <div 
        ref={carouselRef}
        className="w-full h-full flex overflow-x-hidden snap-x snap-mandatory"
      >
        {images.map((img, i) => (
          <div key={i} className="min-w-full h-full p-5 snap-start flex items-center justify-center">
            <img 
              src={img} 
              className="w-full h-full object-contain opacity-80 group-hover:opacity-100 transition-all duration-700" 
              referrerPolicy="no-referrer"
            />
          </div>
        ))}
      </div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {images.map((_, i) => (
          <div 
            key={i}
            className={`w-1 h-1 transition-all duration-300 ${i === currentSlide ? "bg-tertiary w-3" : "bg-white/20"}`}
          />
        ))}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-transparent to-transparent opacity-60"></div>
    </div>
  );
}

export default function Projects() {
  return (
    <section className="relative min-h-screen bg-background overflow-hidden pb-32">
      {/* Engineering Grid Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)', backgroundSize: '100px 100px' }}></div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 pt-32 flex flex-col gap-12">
        {/* Header Section */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-[2px] bg-tertiary"></div>
            <span className="text-[10px] font-headline font-bold text-tertiary tracking-[0.4em] uppercase">Engineering Portfolio</span>
          </div>
          
          <div className="flex flex-col gap-2">
            <h1 className="text-5xl md:text-8xl font-headline font-black text-on-surface leading-none tracking-tighter uppercase whitespace-nowrap">
              ACTIVE
            </h1>
            <div className="bg-[#f28b82] px-4 md:px-6 py-1 md:py-2 self-start transform -rotate-1">
              <span className="text-4xl md:text-7xl font-headline font-black text-black uppercase tracking-tight whitespace-nowrap">
                PROTOTYPES
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-4 mt-8 max-w-2xl border-l border-tertiary/30 pl-6 py-2">
            <span className="text-[10px] font-headline font-bold text-tertiary tracking-[0.2em] uppercase">Development Log: 001-X</span>
            <p className="text-on-surface-variant font-body leading-relaxed text-sm md:text-base italic">
              "Over 2,000 hours of iteration, technical failure, and structural refinement. These prototypes are not just machines—they are the result of tireless nights in the lab, hundreds of failed simulations, and the unyielding pursuit of engineering perfection. Every weld and line of code represents a step forward in bridging the gap between theory and real-world impact."
            </p>
          </div>
        </div>

        {/* Big Ghost Text Background */}
        <div className="absolute top-[20%] left-[-10%] whitespace-nowrap overflow-hidden pointer-events-none opacity-[0.02]">
          <span className="text-[200px] font-headline font-black text-on-surface uppercase tracking-tighter">
            PROTOTYPES ACTIVE AQUA GUARDIAN DR. ONE
          </span>
        </div>

        {/* Projects List */}
        <div className="flex flex-col gap-12">
          {projectsData.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="bg-surface-container-low border border-outline-variant/10 overflow-hidden flex flex-col group cursor-pointer hover:border-tertiary/30 transition-all duration-500"
            >
              {/* Image Visual */}
              <div className="relative aspect-[21/10] overflow-hidden bg-black/40">
                {project.images && project.images.length > 0 ? (
                  <ProjectCarousel images={project.images} />
                ) : (
                  <>
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700" 
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-transparent to-transparent opacity-60"></div>
                  </>
                )}
                
                {/* Visual Asset Decorations */}
              </div>

              {/* Content */}
              <div className="p-10 flex flex-col gap-8 relative overflow-hidden">
                <div className="flex justify-between items-start relative z-10">
                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] font-headline font-bold text-tertiary tracking-[0.2em] uppercase">
                      {project.unit}
                    </span>
                    <h3 className="text-4xl md:text-5xl font-headline font-black text-on-surface uppercase tracking-tight group-hover:text-tertiary transition-colors duration-300">
                      {project.title}
                    </h3>
                  </div>
                  <div className="p-4 bg-tertiary/5 border border-tertiary/10 group-hover:bg-tertiary/10 transition-all">
                    <TrendingUp className="w-6 h-6 text-tertiary" />
                  </div>
                </div>

                <p className="text-on-surface-variant font-body leading-relaxed max-w-2xl text-lg relative z-10">
                  {project.description}
                </p>

                {/* Industrial Accents */}
                <div className="absolute right-[-20px] bottom-[-20px] opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500 pointer-events-none">
                   <TrendingUp className="w-48 h-48 text-on-surface" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
