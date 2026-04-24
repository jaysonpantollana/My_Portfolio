import * as THREE from 'three';
import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  Float, 
  RoundedBox, 
  Environment, 
  PerspectiveCamera, 
  ContactShadows,
  Html
} from '@react-three/drei';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Terminal, 
  Box, 
  Zap, 
  Layout, 
  Globe, 
  Database, 
  Layers, 
  Figma as FigmaIcon,
  Cloud,
  Code2,
  Server,
  Cpu,
  Chrome,
  Github as GithubIcon,
  Info,
  Maximize2,
  Bot,
  Brain,
  MessageSquareCode,
  Search,
  Flame,
  Stars,
  Wind,
  Activity,
  Triangle
} from 'lucide-react';

// Keyboard Data
interface TechKey {
  id: string;
  label: string;
  icon?: any;
  color: string;
  category: string;
  description: string;
}

interface TechKeyLayout extends TechKey {
  row: number;
  col: number;
}

const MECHANICAL_LAYOUT: TechKeyLayout[] = [
  // Row 0
  { id: 'claude', label: 'Claude', icon: Bot, color: '#E4A089', row: 0, col: 0, category: 'AI', description: 'Next-generation AI assistant by Anthropic.' },
  { id: 'gemini', label: 'Gemini', icon: Brain, color: '#15173F', row: 0, col: 1, category: 'AI', description: 'Google\'s most capable AI models.' },
  { id: 'stitch', label: 'Stitch', icon: Layers, color: '#FFB3F1', row: 0, col: 2, category: 'AI', description: 'Intelligent code integration and workflow automation.' },
  { id: 'antigravity', label: 'Antigravity', icon: Globe, color: '#F8F8F8', row: 0, col: 3, category: 'AI', description: 'High-performance AI agent framework.' },
  { id: 'vs', label: 'VS Code', icon: Code2, color: '#6AC4F5', row: 0, col: 4, category: 'IDE', description: 'The most popular code editor for developers.' },
  { id: 'vercel', label: 'Vercel', icon: Triangle, color: '#2B2B2B', row: 0, col: 5, category: 'Cloud', description: 'The platform for frontend developers.' },
  { id: 'cloudflare', label: 'Cloudflare', icon: Cloud, color: '#FCCF8F', row: 0, col: 6, category: 'Network', description: 'Making the internet faster and more secure.' },
  { id: 'figma', label: 'Figma', icon: FigmaIcon, color: '#191A1F', row: 0, col: 7, category: 'Design', description: 'Collaborative interface design tool.' },
  
  // Row 1
  { id: 'studio', label: 'Studio AI', icon: Cpu, color: '#2B2B2B', row: 1, col: 0, category: 'AI', description: 'AI-powered development in Google Studio.' },
  { id: 'github_key', label: 'GitHub', icon: GithubIcon, color: '#191A1F', row: 1, col: 1, category: 'Platform', description: 'World\'s leading AI-powered developer platform.' },
  { id: 'youtube', label: 'YouTube', icon: Zap, color: '#FF5252', row: 1, col: 2, category: 'Platform', description: 'The world\'s largest video sharing platform.' },
  { id: 'grok', label: 'Grok', icon: MessageSquareCode, color: '#191A1F', row: 1, col: 3, category: 'AI', description: 'xAI\'s humorous and rebellious AI.' },
  { id: 'deepseek', label: 'DeepSeek', icon: Search, color: '#7F90E0', row: 1, col: 4, category: 'AI', description: 'Powerful large language models for various tasks.' },
  { id: 'supabase', label: 'Supabase', icon: Database, color: '#7CDEB3', row: 1, col: 5, category: 'Database', description: 'The open source Firebase alternative.' },
  { id: 'next', label: 'Next.js', icon: Zap, color: '#191A1F', row: 1, col: 6, category: 'Framework', description: 'React framework for web.' },
  { id: 'node', label: 'Node.js', icon: Cpu, color: '#191A1F', row: 1, col: 7, category: 'Runtime', description: 'JavaScript runtime built on V8.' },

  // Row 2
  { id: 'express', label: 'Express', icon: Server, color: '#191A1F', row: 2, col: 0, category: 'Server', description: 'Web framework for Node.' },
  { id: 'mongo', label: 'MongoDB', icon: Database, color: '#191A1F', row: 2, col: 1, category: 'Storage', description: 'Database for modern apps.' },
  { id: 'post', label: 'Postgres', icon: Database, color: '#191A1F', row: 2, col: 2, category: 'Storage', description: 'Relational database.' },
  { id: 'docker', label: 'Docker', icon: Layers, color: '#191A1F', row: 2, col: 3, category: 'DevOps', description: 'OS-level virtualization.' },
  { id: 'aws', label: 'AWS', icon: Cloud, color: '#191A1F', row: 2, col: 4, category: 'Cloud', description: 'Amazon Web Services.' },
  { id: 'gcp', label: 'GCP', icon: Globe, color: '#191A1F', row: 2, col: 5, category: 'Cloud', description: 'Google Cloud Platform.' },
  { id: 'git', label: 'Git', icon: Terminal, color: '#191A1F', row: 2, col: 6, category: 'Tool', description: 'Version control system.' },
  { id: 'rust', label: 'Rust', icon: Flame, color: '#E44323', row: 2, col: 7, category: 'System', description: 'Memory-safe systems programming.' },

  // Row 3 (Function keys)
  { id: 'ctrl', label: 'Ctrl', icon: Code2, color: '#191A1F', row: 3, col: 0, category: 'System', description: 'Control modifier.' },
  { id: 'alt', label: 'Alt', icon: Code2, color: '#191A1F', row: 3, col: 1, category: 'System', description: 'Alternate modifier.' },
  { id: 'win', label: 'Win', icon: Layout, color: '#191A1F', row: 3, col: 2, category: 'System', description: 'OS Key.' },
  { id: 'cmd', label: 'Cmd', icon: Terminal, color: '#191A1F', row: 3, col: 3, category: 'System', description: 'Command modifier.' },
  { id: 'google_sys', label: 'Google', icon: Chrome, color: '#191A1F', row: 3, col: 4, category: 'Core', description: 'Google Platform Integration.' },
  { id: 'enter', label: 'Enter', icon: Stars, color: '#191A1F', row: 3, col: 5, category: 'Action', description: 'Execution Key.' },
  { id: 'shift', label: 'Shift', icon: Wind, color: '#191A1F', row: 3, col: 6, category: 'System', description: 'Shift modifier.' },
  { id: 'fn', label: 'Fn', icon: Activity, color: '#191A1F', row: 3, col: 7, category: 'System', description: 'Function modifier.' },
];

function Keycap({ tech, position, onClick, isOverlayOpen }: { tech: TechKeyLayout; position: [number, number, number]; onClick: () => void; isOverlayOpen: boolean }) {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const keyGroupRef = useRef<THREE.Group>(null);
  
  const Icon = tech.icon;
  const iconColor = tech.color === '#F8F8F8' || tech.color === '#61DAFB' || tech.color === '#7CDEB3' || tech.color === '#FCCF8F'
    ? '#000000' 
    : '#FFFFFF';

  useFrame(() => {
    if (keyGroupRef.current) {
      let targetY = 0.2;
      if (pressed) targetY = 0.05;
      else if (hovered) targetY = 0.32;
      keyGroupRef.current.position.y = THREE.MathUtils.lerp(keyGroupRef.current.position.y, targetY, pressed ? 0.3 : 0.15);
    }
  });

  const handleKeyClick = () => {
    setPressed(true);
    setTimeout(() => {
      setPressed(false);
    }, 100);
    setTimeout(() => {
      onClick();
    }, 200);
  };

  return (
    <group position={position}>
      <group ref={keyGroupRef}>
        <RoundedBox
          args={[0.8, 0.35, 0.8]} 
          radius={0.08}
          smoothness={4}
          onClick={(e) => {
            e.stopPropagation();
            handleKeyClick();
          }}
          onPointerOver={(e) => {
             e.stopPropagation();
             setHovered(true);
             document.body.style.cursor = 'pointer';
          }}
          onPointerOut={(e) => {
             e.stopPropagation();
             setHovered(false);
             setPressed(false);
             document.body.style.cursor = 'auto';
          }}
        >
          <meshPhysicalMaterial
            color={tech.color}
            roughness={0.4}
            metalness={0.1}
            emissive={tech.color}
            emissiveIntensity={hovered ? 0.3 : 0}
          />
        </RoundedBox>
        
        <Html
          position={[0, 0.178, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          transform
          pointerEvents="none"
          eps={0.0001}
        >
          <div 
            className="flex items-center justify-center select-none" 
            style={{ 
                width: '40px', 
                height: '40px', 
                transform: 'translate(-50%, -50%)',
                perspective: '1000px'
            }}
          >
            <div className="scale-[0.5] flex items-center justify-center">
              <Icon size={32} color={iconColor} strokeWidth={2.5} />
            </div>
          </div>
        </Html>
      </group>
    </group>
  );
}

function KeyboardModel({ onKeyClick, isOverlayOpen }: { onKeyClick: (tech: TechKey) => void; isOverlayOpen: boolean }) {
  const x_step = 0.86; 
  const z_step = 0.86;

  return (
    <group rotation={[1.1, 0, 0]}>
      {/* Chassis */}
      <RoundedBox args={[7.5, 0.6, 4.2]} radius={0.15} smoothness={4} position={[0, -0.2, 0]}>
        <meshPhysicalMaterial color="#0f0f15" roughness={0.9} metalness={0.3} />
      </RoundedBox>

      {/* Grid */}
      {MECHANICAL_LAYOUT.map((tech) => {
        const x = (tech.col - 3.5) * x_step;
        const z = (tech.row - 1.5) * z_step;
        
        return (
          <Keycap 
            key={tech.id} 
            tech={tech} 
            position={[x, 0.1, z]} 
            onClick={() => onKeyClick(tech)}
            isOverlayOpen={isOverlayOpen}
          />
        );
      })}
    </group>
  );
}


export default function InteractiveKeyboard() {
  const [selectedTech, setSelectedTech] = useState<TechKey | null>(null);

  const defaultTech = {
    label: "INTERACTIVE STACK",
    category: "ENGINEERING EXPERIMENT",
    description: "Built using React Three Fiber. Select any mechanical key to inspect the underlying research and development logic."
  };

  const activeTech = selectedTech || defaultTech;

  return (
    <section className="relative w-full max-w-7xl mx-auto px-6 py-12 flex flex-col gap-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-[2px] bg-tertiary"></div>
            <span className="text-[10px] font-headline font-bold text-tertiary tracking-[0.4em] uppercase">R3F_CORE V1.0</span>
          </div>
          <h2 className="text-4xl md:text-7xl font-headline font-black text-on-surface uppercase tracking-tighter leading-[0.9]">
            MECHANICAL <span className="text-tertiary italic">INTERFACE</span>
          </h2>
        </div>
        <div className="flex flex-col items-end gap-2 text-right">
             <div className="flex items-center gap-2 text-[10px] font-headline font-bold text-on-surface/40 uppercase tracking-widest">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                SYSTEM_ONLINE
             </div>
             <p className="text-on-surface-variant text-xs font-body max-w-xs uppercase tracking-tighter">
                Manual reconstruction of mechanical kinetics through real-time webgl rendering.
             </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-8">
        {/* Info Area */}
        <div className="lg:col-span-4 flex flex-col gap-8 order-2 lg:order-1">
          <div className="relative border border-outline-variant/15 p-10 bg-surface-container-low min-h-[400px] flex flex-col justify-between overflow-hidden shadow-2xl">
            {/* Corner Decorative */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-tertiary/5 to-transparent"></div>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTech.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col gap-8 relative z-10"
              >
                <div className="flex flex-col gap-2">
                    <span className="text-[10px] font-headline font-bold text-tertiary/60 tracking-[0.3em] uppercase">
                        {activeTech.category}
                    </span>
                    <h3 className="text-5xl font-headline font-black text-on-surface uppercase tracking-tight leading-none">
                        {activeTech.label}
                    </h3>
                </div>
                
                <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="w-4 h-1 bg-tertiary/30"></div>
                    ))}
                    <div className="w-12 h-1 bg-tertiary"></div>
                </div>

                <p className="text-on-surface-variant text-xl leading-relaxed font-body italic font-medium">
                  "{activeTech.description}"
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="flex flex-col gap-8 mt-12 relative z-10">
               <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 border border-outline-variant/10 bg-black/20 flex flex-col gap-1">
                     <span className="text-[8px] font-headline font-bold text-on-surface/40 uppercase tracking-widest">Latency</span>
                     <span className="text-xs font-mono text-tertiary uppercase">3.2ms (Avg)</span>
                  </div>
                  <div className="p-4 border border-outline-variant/10 bg-black/20 flex flex-col gap-1">
                     <span className="text-[8px] font-headline font-bold text-on-surface/40 uppercase tracking-widest">Draws</span>
                     <span className="text-xs font-mono text-tertiary uppercase">114 Call_Req</span>
                  </div>
               </div>
               
               <div className="flex items-center gap-4">
                  <a 
                    href="https://github.com/jaysonpantollana/Keyboard_animation" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-between px-6 py-4 bg-white text-black hover:bg-tertiary transition-all font-headline font-bold text-[10px] tracking-[0.2em] uppercase"
                  >
                   SOURCE_CODE
                   <GithubIcon className="w-4 h-4" />
                  </a>
                  <button 
                    onClick={() => setSelectedTech(null)}
                    disabled={!selectedTech}
                    className="p-4 border border-outline-variant/30 text-on-surface/40 hover:text-on-surface hover:border-on-surface transition-all disabled:opacity-0"
                  >
                    <Maximize2 className="w-4 h-4 rotate-45" />
                  </button>
               </div>
            </div>
          </div>
        </div>

        {/* 3D Model Area */}
        <div className="lg:col-span-8 relative min-h-[400px] border border-outline-variant/15 bg-black/40 order-1 lg:order-2 overflow-hidden shadow-inner group">
          <div className="absolute top-0 inset-x-0 h-1 z-20 overflow-hidden">
             <div className="w-full h-full bg-tertiary/10 animate-pulse"></div>
          </div>

          <div className="absolute inset-0 cursor-grab active:cursor-grabbing">
            <Canvas 
               shadows 
               dpr={[1, 2]}
               gl={{ antialias: true }}
            >
              <PerspectiveCamera makeDefault position={[0, 0, 12]} fov={30} />
              <ambientLight intensity={0.5} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
              <directionalLight position={[0, 10, 5]} intensity={1.5} />
              <pointLight position={[-10, -10, -10]} intensity={0.5} />
              
              <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5} position={[0, 0.5, 0]}>
                <KeyboardModel onKeyClick={setSelectedTech} isOverlayOpen={!!selectedTech} />
              </Float>

              <ContactShadows position={[0, -1.2, 0]} opacity={0.4} scale={15} blur={2} far={4} color="#000" />
              <Environment preset="city" />
            </Canvas>
          </div>

          {/* HUD Accents */}
          <div className="absolute top-6 right-6 flex items-center gap-6 z-10 pointer-events-none">
             <div className="flex flex-col items-end gap-1">
                <span className="text-[8px] font-headline font-bold text-white/30 uppercase tracking-[0.4em]">Axis_Z</span>
                <div className="w-16 h-[2px] bg-white/10 relative overflow-hidden">
                   <div className="absolute inset-0 bg-tertiary w-1/2 translate-x-full animate-[shimmer_2s_infinite]"></div>
                </div>
             </div>
             <div className="p-2 border border-white/5 bg-black/20 text-[10px] font-mono text-white/20">
                0xFF_001
             </div>
          </div>

          {/* Bottom Indicators */}
          <div className="absolute bottom-6 left-6 flex items-center gap-4 z-10">
             <div className="flex items-center gap-2 group-hover:opacity-100 transition-opacity">
                <Info size={12} className="text-tertiary" />
                <span className="text-[10px] font-headline font-bold text-white/40 uppercase tracking-widest underline decoration-tertiary/40">Select Key for Manifest Data</span>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
