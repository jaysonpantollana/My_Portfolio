import { motion } from "motion/react";
import { academicsData, instrumentationData } from "../data";
import { Box, Sigma, Code, Network } from "lucide-react";

const IconMap: Record<string, any> = {
  Box,
  Sigma,
  Code,
  Network
};

export default function Academics() {
  return (
    <section className="relative min-h-screen bg-background overflow-hidden pb-32">
      {/* Background Engineering Elements */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
        style={{ 
          backgroundImage: 'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)', 
          backgroundSize: '120px 120px' 
        }}>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 flex flex-col gap-16">
        {/* Header Section */}
        <div className="flex flex-col gap-4">
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-tertiary font-headline font-bold text-xs tracking-[0.3em] uppercase"
          >
            MY_HUMBLE_LIFE_JOURNEY 101
          </motion.span>
          
          <div className="flex flex-col">
            <h1 className="text-4xl sm:text-5xl md:text-[5.5rem] font-headline font-black text-on-surface leading-[0.9] md:leading-[0.8] tracking-tighter uppercase whitespace-nowrap">
              ACADEMIC &<br/>
              SPORTS
            </h1>
            <div className="bg-[#333] mt-2 px-3 sm:px-6 py-2 sm:py-4 self-start border border-white/5">
              <span className="text-4xl sm:text-5xl md:text-[5.5rem] font-headline font-black text-[#b71c1c] uppercase tracking-tight leading-none whitespace-nowrap">
                TRAJECTORY
              </span>
            </div>
          </div>

          <p className="text-on-surface-variant font-body text-lg md:text-xl leading-relaxed mt-8 border-l border-tertiary/20 pl-8">
            Driven by the discipline of an athlete and the precision of an engineer, I strive to honor the life I’ve been given by turning hard work into a meaningful legacy of innovation and faith.
          </p>
        </div>

        {/* Timeline Sections */}
        <div className="flex flex-col gap-32">
          {academicsData.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="flex flex-col gap-6"
            >
              <div className="flex flex-col gap-2">
                <h2 className="text-4xl md:text-5xl font-headline font-bold text-on-surface uppercase tracking-tight">
                  {item.title}
                </h2>
                <div className="bg-[#111] border border-white/10 px-4 py-1.5 self-start">
                  <span className="text-[10px] font-headline font-bold text-tertiary tracking-[0.2em] uppercase">
                    • {item.subtitle}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-6">
                <p className="text-on-surface-variant font-body leading-relaxed text-base italic opacity-80">
                  {item.description}
                </p>

                {item.points && (
                  <ul className="flex flex-col gap-3 ml-1">
                    {item.points.map((point, pIndex) => (
                      <li key={pIndex} className="flex gap-4 items-start">
                        <span className="w-2 h-2 bg-tertiary mt-2 flex-shrink-0"></span>
                        <span className="text-sm font-headline font-bold text-on-surface-variant tracking-tight uppercase">
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="flex flex-wrap gap-3 mt-4">
                  {item.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="px-3 py-1.5 bg-surface-container-high border border-outline-variant/10 text-[9px] font-headline font-bold text-on-surface-variant/70 tracking-widest uppercase hover:border-tertiary transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Technical Instrumentation Section */}
        <div className="flex flex-col gap-12 pt-12 border-t border-outline-variant/10 relative">
          {/* Section Indicator Icon */}
          <div className="absolute -top-6 left-[-2px] w-8 h-8 bg-[#b71c1c] flex items-center justify-center -rotate-45">
             <div className="w-4 h-4 bg-white/20 rotate-45"></div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-1.5 h-10 bg-[#b71c1c]"></div>
            <h2 className="text-4xl md:text-5xl font-headline font-black text-on-surface uppercase tracking-tighter leading-none">
              TECHNICAL<br/>
              INSTRUMENTATION
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {instrumentationData.map((item, index) => {
              const Icon = IconMap[item.icon as string] || Box;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative bg-[#111] border border-outline-variant/15 p-8 overflow-hidden hover:border-tertiary/30 transition-all duration-500"
                >
                  {/* Background SVG Decoration */}
                  <div className="absolute right-[0px] top-[0px] opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500 pointer-events-none p-4">
                    <Icon className="w-24 h-24 text-on-surface" />
                  </div>

                  <div className="flex flex-col gap-4 relative z-10">
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-headline font-bold text-tertiary/60 tracking-[0.3em] uppercase">
                        {item.id}
                      </span>
                      <h3 className="text-2xl font-headline font-black text-on-surface uppercase tracking-tight group-hover:text-tertiary transition-colors">
                        {item.title}
                      </h3>
                    </div>

                    <div className="flex items-center gap-3 mt-4">
                      <div className="px-3 py-1 bg-surface-container-high border border-outline-variant/10">
                        <span className="text-[9px] font-headline font-bold text-on-surface-variant tracking-widest uppercase">
                          {item.subtitle}
                        </span>
                      </div>
                      {/* Sub-icon placeholder */}
                      <div className="w-4 h-4 text-tertiary opacity-80">
                        <Icon className="w-full h-full" />
                      </div>
                    </div>
                  </div>

                  {/* Left Accent Bar */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#b71c1c] opacity-60 group-hover:opacity-100 transition-opacity"></div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Final Precision Footer Accent */}
        <div className="flex flex-col items-center gap-4 pt-12">
            <div className="flex items-center gap-8 w-full max-w-md">
                <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-[#b71c1c]"></div>
                <span className="text-[10px] font-headline font-bold text-on-surface-variant/40 tracking-[0.5em] uppercase whitespace-nowrap">
                    PRECISION ENGINEERED
                </span>
                <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-[#b71c1c]"></div>
            </div>
        </div>
      </div>
    </section>
  );
}
