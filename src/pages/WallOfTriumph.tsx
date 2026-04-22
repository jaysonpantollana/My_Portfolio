import { motion } from "motion/react";
import { Award, Trophy } from "lucide-react";
import { awardsData } from "../data";

export default function WallOfTriumph() {
  return (
    <section id="triumph" className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32">
      <div className="flex flex-col gap-16">
        <div className="flex flex-col gap-4">
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-headline font-bold text-on-surface leading-tight tracking-tighter uppercase whitespace-nowrap">
            WALL OF <br/>
            <span className="text-tertiary italic">TRIUMPH</span>
          </h2>
          <p className="text-on-surface-variant text-lg font-body leading-relaxed border-l-2 border-tertiary pl-6 py-2">
            This Wall of Triumph serves as a technical record of academic and professional excellence within the engineering, entrepreneurship, and research disciplines throughout my academic journey, honouring a journey where human dedication and divine blessings and help from God converge to transform the gift of life into a legacy of purposeful innovation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {awardsData.map((award, index) => (
            <motion.div
              key={award.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className={`group relative p-8 border ${
                award.type === "feature" 
                  ? "bg-[#8b0000] border-[#8b0000]" 
                  : "bg-surface-container-low border-outline-variant/15 hover:border-tertiary/50"
              } transition-all duration-500 overflow-hidden`}
            >
              {award.type === "feature" ? (
                <div className="flex flex-col items-center gap-6 h-full py-2">
                  <div className="border border-white/20 p-8 flex items-center justify-center aspect-square h-32 w-32 shrink-0">
                    {award.icon && <award.icon className="w-12 h-12 text-white" />}
                  </div>

                  <div className="flex flex-col gap-3 text-center items-center">
                    <div className="bg-black/20 px-4 py-1.5 inline-block">
                      <span className="text-xs font-headline font-bold text-white uppercase tracking-wider">
                        {award.category}
                      </span>
                    </div>
                    
                    <div className="flex flex-col gap-1">
                      <h3 className="text-4xl font-headline font-black text-white uppercase leading-none tracking-tight">
                        {award.title}
                      </h3>
                      <div className="flex flex-col mt-1">
                        <span className="text-base font-headline font-bold text-white/90 uppercase tracking-wide">
                          {award.subtext}
                        </span>
                        <span className="text-sm font-headline text-white/80 tracking-wide">
                          {award.description}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="absolute bottom-[-20%] right-[-10%] opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-500 pointer-events-none">
                    <Award className="w-64 h-64 text-on-surface rotate-[-15deg]" />
                  </div>

                  <div className="flex flex-col gap-4 relative z-10 h-full">
                    <div className="flex justify-between items-start">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <Trophy className="w-4 h-4 text-tertiary" />
                          <span className="text-[10px] font-headline font-bold tracking-widest uppercase text-tertiary/70">
                            {award.category}
                          </span>
                        </div>
                        <h3 className="text-xl font-headline font-bold text-on-surface group-hover:text-tertiary transition-colors duration-300 uppercase leading-snug">
                          {award.title}
                        </h3>
                      </div>
                      <span className="text-4xl font-headline font-black text-on-surface/5 tabular-nums select-none">
                        {award.id === "SPECIAL" ? "!!" : award.id}
                      </span>
                    </div>

                    <p className="text-sm text-on-surface-variant font-body leading-relaxed flex-grow">
                      {award.description}
                    </p>

                    <div className="pt-4 border-t border-outline-variant/10 flex flex-col gap-1">
                      <span className="text-[9px] font-headline font-bold text-on-surface-variant/40 tracking-widest uppercase">Institution</span>
                      <span className="text-xs font-headline font-bold text-on-surface-variant leading-tight">
                        {award.institution}
                      </span>
                    </div>
                  </div>
                  
                  <div className="absolute top-0 right-0 w-12 h-12 border-t border-r transition-opacity duration-300 opacity-0 group-hover:opacity-100 border-tertiary"></div>
                </>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
