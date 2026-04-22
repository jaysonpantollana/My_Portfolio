import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Cpu, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "HOME", path: "/" },
    { name: "ACADEMICS & SPORTS", path: "/academics" },
    { name: "PROJECTS", path: "/projects" },
    { name: "WALL OF TRIUMPH", path: "/triumph" },
    { name: "START-UP", path: "/startup" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 w-full z-50 bg-background/90 backdrop-blur-xl border-b border-outline-variant/15">
      <nav className="flex justify-between items-center h-16 px-6 w-full max-w-screen-2xl mx-auto">
        <Link to="/" className="flex items-center gap-3">
          <Cpu className="w-6 h-6 text-primary" />
          <span className="text-xl font-black text-primary tracking-[0.2em] font-headline uppercase">
            J.E. PANTOLLANA
          </span>
        </Link>
        
        <div className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`${
                isActive(link.path) ? "text-tertiary" : "text-on-surface-variant"
              } font-headline font-bold uppercase tracking-tighter hover:text-tertiary transition-colors duration-300`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <button 
          className="md:hidden text-on-surface-variant"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-background border-b border-outline-variant/15 px-6 py-8 flex flex-col gap-6"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`${
                  isActive(link.path) ? "text-tertiary" : "text-on-surface-variant"
                } font-headline font-bold uppercase tracking-tighter`}
              >
                {link.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
