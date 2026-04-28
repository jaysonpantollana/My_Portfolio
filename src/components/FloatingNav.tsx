import { Link, useLocation } from "react-router-dom";
import { Home, GraduationCap, Briefcase, Award, Rocket } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function FloatingNav() {
  const location = useLocation();

  const navLinks = [
    { name: "HOME", path: "/", icon: Home },
    { name: "ACADEMICS", path: "/academics", icon: GraduationCap },
    { name: "PROJECTS", path: "/projects", icon: Briefcase },
    { name: "TRIUMPH", path: "/triumph", icon: Award },
    { name: "START-UP", path: "/startup", icon: Rocket },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="fixed bottom-10 inset-x-0 z-[100] flex justify-center pointer-events-none px-6">
      <motion.nav 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative flex items-center px-2 py-1 bg-black/40 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.8)] pointer-events-auto rounded-xl"
      >
        {/* Decorative HUD Corners - Subtle glass style */}
        <div className="absolute -top-[1px] -left-[1px] w-3 h-3 border-t-2 border-l-2 border-tertiary/60 rounded-tl-sm"></div>
        <div className="absolute -bottom-[1px] -right-[1px] w-3 h-3 border-b-2 border-r-2 border-tertiary/60 rounded-br-sm"></div>

        {navLinks.map((link) => {
          const Icon = link.icon;
          const active = isActive(link.path);
          
          return (
            <Link
              key={link.name}
              to={link.path}
              className="relative flex flex-col items-center justify-center w-16 h-14 md:w-24 md:h-16 transition-all group/item"
            >
              <div className="relative z-10 flex flex-col items-center gap-1">
                <Icon 
                  size={ active ? 20 : 18 } 
                  className={`transition-all duration-300 ${
                    active ? "text-tertiary scale-110 drop-shadow-[0_0_8px_rgba(255,184,0,0.4)]" : "text-white/60 group-hover/item:text-white"
                  }`} 
                />
                <span className={`text-[8px] font-headline font-bold uppercase tracking-[0.15em] transition-all duration-300 ${
                  active ? "text-tertiary" : "text-white/40"
                }`}>
                  {link.name}
                </span>
              </div>

              {/* Active State Highlight */}
              <AnimatePresence>
                {active && (
                  <>
                    <motion.div
                      layoutId="nav-bg"
                      className="absolute inset-0 bg-white/5"
                      transition={{ type: "spring", bounce: 0.1, duration: 0.5 }}
                    />
                  </>
                )}
              </AnimatePresence>
            </Link>
          );
        })}
      </motion.nav>
    </div>
  );
}
