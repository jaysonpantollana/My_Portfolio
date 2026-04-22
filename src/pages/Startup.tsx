import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { startupsData } from "../data";

function StartupCarousel({ images }: { images: string[] }) {
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
              className="w-full h-full object-contain opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-70 transition-all duration-700" 
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
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
    </div>
  );
}

export default function Startup() {
  return (
    <section id="startup" className="relative z-10 max-w-7xl mx-auto px-6 py-32">
      <div className="flex flex-col gap-16">
        <div className="flex flex-col gap-8 max-w-2xl">
          <div className="bg-red-900 px-4 py-1 self-start">
            <span className="text-[10px] font-headline font-bold text-white tracking-[0.2em] uppercase">Influencing the Future</span>
          </div>
          <h2 className="text-5xl md:text-8xl font-headline font-bold text-on-surface leading-[0.85] tracking-tighter uppercase whitespace-nowrap">
            START-UP <br/>
            <span className="text-tertiary">PROJECTS</span>
          </h2>
          <p className="text-on-surface-variant text-xl font-body leading-relaxed max-w-xl">
            Engineering-first approach to market disruption. Deploying high-efficiency logic and structural integrity to traditional service sectors.
          </p>

          <div className="flex gap-16 mt-4">
            <div className="flex flex-col gap-1">
              <span className="text-3xl font-headline font-bold text-tertiary">02</span>
              <span className="text-[10px] font-headline font-bold text-on-surface-variant/60 tracking-widest uppercase">PROJECTS</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-3xl font-headline font-bold text-tertiary">5</span>
              <span className="text-[10px] font-headline font-bold text-on-surface-variant/60 tracking-widest uppercase">MEMBERS</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-24 max-w-4xl mx-auto w-full">
          {startupsData.map((startup, index) => (
            <motion.div 
              key={startup.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="relative group grid grid-cols-1 md:grid-cols-12 gap-12"
            >
              <div className="md:col-span-12 flex flex-col gap-8">
                <div className="flex justify-between items-end border-b border-outline-variant/10 pb-6">
                  <div className="flex flex-col gap-2">
                    <h3 className="text-4xl md:text-5xl font-headline font-bold text-on-surface uppercase tracking-tight">{startup.title}</h3>
                    <span className="text-sm font-headline font-bold text-tertiary uppercase tracking-widest">{startup.category}</span>
                  </div>
                  <div className="relative">
                    <span className="text-7xl font-headline font-black text-on-surface/5 select-none">{startup.id}</span>
                    <startup.icon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-tertiary opacity-80" />
                  </div>
                </div>

                <div className="relative aspect-video md:aspect-[21/9] bg-surface-container-low border border-outline-variant/20 overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                  
                  {startup.images && startup.images.length > 0 && (
                    <StartupCarousel images={startup.images} />
                  )}
                </div>

                <p className="text-lg text-on-surface-variant font-body leading-relaxed max-w-3xl">
                  {startup.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto w-full border-t border-outline-variant/15 pt-24 pb-12 flex flex-col gap-16">
          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-8 flex-1 max-w-xl">
              <span className="text-[10px] font-headline font-bold text-tertiary tracking-[0.4em] uppercase">PROJECTS OVERVIEW</span>
              <div className="flex flex-col gap-6">
                {[
                  { label: "STATUS", value: "ACTIVE" },
                  { label: "DEVELOPERS", value: "4_PERSONNEL" },
                  { label: "FOUNDER", value: "J.E. PANTOLLANA", highlight: true }
                ].map((metric) => (
                  <div key={metric.label} className="flex justify-between items-center">
                    <span className="text-xs font-headline font-bold text-on-surface-variant/40 tracking-[0.1em]">{metric.label}</span>
                    <span className={`text-sm font-headline font-black tracking-widest ${metric.highlight ? 'text-tertiary' : 'text-on-surface'}`}>{metric.value}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="hidden md:flex h-32 items-center">
              <span className="text-[8px] font-mono text-on-surface-variant/20 tracking-[0.5em] uppercase [writing-mode:vertical-lr] rotate-180">
                INDUSTRIAL_UI_SYSTEM_v.0.2
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <span className="text-[10px] font-headline font-bold text-tertiary tracking-[0.4em] uppercase">V_INDEX_NOTES</span>
            <div className="flex flex-col gap-2 font-mono text-[10px] text-on-surface-variant/60 leading-relaxed">
              <p>// START_UPS ARE EVALUATED BASED ON STRUCTURAL SOUNDNESS AND LOGICAL SCALABILITY.</p>
              <p>// ALL ENTITIES LISTED ARE FULLY DEPLOYED IN PRODUCTION ENVIRONMENTS.</p>
              <p>// DATA OVERLAYS ARE REAL-TIME REPRESENTATIONS OF CORE KPI STREAMS.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
