import { Cpu, MapPin, Mail, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <>
      {/* Communication Linkage Info (Footer Panel) */}
      <section className="bg-surface-container-highest/30 border-t border-outline-variant/15 py-24 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
          <div className="flex flex-col gap-8 bg-black/40 backdrop-blur-md p-8 border border-outline-variant/10 col-span-1 md:col-span-3 lg:col-span-1">
            <div className="flex gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
              <span className="ml-2 text-[10px] text-on-surface-variant font-mono">COMMUNICATION_LINKAGE.EXE</span>
            </div>
            
            <div className="flex flex-col gap-6">
              <div className="flex gap-4 items-start">
                <MapPin className="w-5 h-5 text-tertiary shrink-0" />
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono text-tertiary tracking-widest uppercase mb-1">STATION_COORDINATE</span>
                  <span className="text-sm font-headline text-on-surface-variant">
                    MSU-IIT, Tibanga, Iligan City,<br/>9200, Mindanao, Philippines
                  </span>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <Mail className="w-5 h-5 text-tertiary shrink-0" />
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono text-tertiary tracking-widest uppercase mb-1">PRIMARY_UPLINK</span>
                  <a href="mailto:jaysonpantollanaj3@gmail.com" className="text-sm font-headline text-on-surface-variant hover:text-tertiary transition-colors uppercase">
                    jaysonpantollanaj3@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <span className="text-[10px] font-mono text-tertiary tracking-widest uppercase">NETWORK_NODES</span>
                <div className="flex flex-wrap gap-2">
                  {[
                    { icon: Facebook, label: "FACEBOOK", url: "https://www.facebook.com/jaysonpantoallana" }
                  ].map((node) => (
                    <a 
                      key={node.label}
                      href={node.url} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3 py-1.5 bg-surface-container-high border border-outline-variant/20 rounded-md text-[10px] font-headline font-bold hover:border-tertiary transition-colors"
                    >
                      <node.icon className="w-3 h-3" />
                      {node.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-black border-t border-outline-variant/10 w-full py-12 px-8">
        <div className="flex flex-col items-center gap-8 max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <Cpu className="w-8 h-8 text-primary-container" />
            <span className="text-primary-container font-bold font-headline tracking-[0.2em]">
              J.E. PANTOLLANA
            </span>
          </div>
          <div className="text-on-surface-variant/50 font-body text-[10px] tracking-widest uppercase text-center max-w-md">
            © 2024 J.E. PANTOLLANA | MSU-IIT MECHANICAL ENGINEERING<br/>
            DEPARTMENT OF MECHANICAL ENGINEERING AND TECHNOLOGY
          </div>
        </div>
      </footer>
    </>
  );
}
