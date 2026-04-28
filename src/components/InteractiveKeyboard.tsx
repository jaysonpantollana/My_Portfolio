import * as THREE from 'three';
import { useRef, useState, useMemo, useEffect } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  Float, 
  RoundedBox, 
  Environment, 
  PerspectiveCamera, 
  ContactShadows,
  Decal,
  useTexture
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
  image?: string;
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
  { id: 'claude', label: 'Claude', image: '/claude_logo.png', color: '#E4A089', row: 0, col: 0, category: 'AI', description: 'Next-generation AI assistant by Anthropic.' },
  { id: 'gemini', label: 'Gemini', image: '/gemini_logo.png', color: '#15173F', row: 0, col: 1, category: 'AI', description: 'Google\'s most capable AI models.' },
  { id: 'stitch', label: 'Stitch', image: '/stich_logo.png', color: '#FFB3F1', row: 0, col: 2, category: 'AI', description: 'Intelligent code integration and workflow automation.' },
  { id: 'antigravity', label: 'Antigravity', icon: Globe, color: '#F8F8F8', row: 0, col: 3, category: 'AI', description: 'High-performance AI agent framework.' },
  { id: 'vs', label: 'Visual Studio', image: '/visual_studio_logo.png', color: '#6AC4F5', row: 0, col: 4, category: 'IDE', description: 'The most popular code editor for developers.' },
  { id: 'vercel', label: 'Vercel', image: '/vercel_logo.png', color: '#2B2B2B', row: 0, col: 5, category: 'Cloud', description: 'The platform for frontend developers.' },
  { id: 'cloudflare', label: 'Cloudflare', image: '/cloudflare_logo.png', color: '#FCCF8F', row: 0, col: 6, category: 'Network', description: 'Making the internet faster and more secure.' },
  { id: 'figma', label: 'Figma', image: '/figma_logo.png', color: '#191A1F', row: 0, col: 7, category: 'Design', description: 'Collaborative interface design tool.' },
  
  // Row 1
  { id: 'studio', label: 'Studio AI', image: '/google_studio_ai_logo.png', color: '#2B2B2B', row: 1, col: 0, category: 'AI', description: 'AI-powered development in Google Studio.' },
  { id: 'github_key', label: 'GitHub', image: '/github_logo.png', color: '#191A1F', row: 1, col: 1, category: 'Platform', description: 'World\'s leading AI-powered developer platform.' },
  { id: 'youtube', label: 'YouTube', image: '/youtube_logo.png', color: '#FF5252', row: 1, col: 2, category: 'Platform', description: 'The world\'s largest video sharing platform.' },
  { id: 'grok', label: 'Grok', image: '/grok_logo.png', color: '#191A1F', row: 1, col: 3, category: 'AI', description: 'xAI\'s humorous and rebellious AI.' },
  { id: 'deepseek', label: 'DeepSeek', image: '/deepseek_logo.png', color: '#7F90E0', row: 1, col: 4, category: 'AI', description: 'Powerful large language models for various tasks.' },
  { id: 'supabase', label: 'Supabase', image: '/supabase_logo.png', color: '#7CDEB3', row: 1, col: 5, category: 'Database', description: 'The open source Firebase alternative.' },
  { id: 'next', label: 'Next.js', icon: Zap, color: '#191A1F', row: 1, col: 6, category: 'Framework', description: 'React framework for web.' },
  { id: 'node', label: 'Node.js', icon: Cpu, color: '#191A1F', row: 1, col: 7, category: 'Runtime', description: 'JavaScript runtime built on V8.' },

  // Row 2
  { id: 'express', label: 'Express', color: '#191A1F', row: 2, col: 0, category: 'Server', description: 'Web framework for Node.' },
  { id: 'mongo', label: 'MongoDB', color: '#191A1F', row: 2, col: 1, category: 'Storage', description: 'Database for modern apps.' },
  { id: 'post', label: 'Postgres', color: '#191A1F', row: 2, col: 2, category: 'Storage', description: 'Relational database.' },
  { id: 'docker', label: 'Docker', color: '#191A1F', row: 2, col: 3, category: 'DevOps', description: 'OS-level virtualization.' },
  { id: 'aws', label: 'AWS', color: '#191A1F', row: 2, col: 4, category: 'Cloud', description: 'Amazon Web Services.' },
  { id: 'gcp', label: 'GCP', color: '#191A1F', row: 2, col: 5, category: 'Cloud', description: 'Google Cloud Platform.' },
  { id: 'git', label: 'Git', color: '#191A1F', row: 2, col: 6, category: 'Tool', description: 'Version control system.' },
  { id: 'rust', label: 'Rust', color: '#191A1F', row: 2, col: 7, category: 'System', description: 'Memory-safe systems programming.' },

  // Row 3 (Function keys)
  { id: 'ctrl', label: 'Ctrl', color: '#191A1F', row: 3, col: 0, category: 'System', description: 'Control modifier.' },
  { id: 'alt', label: 'Alt', color: '#191A1F', row: 3, col: 1, category: 'System', description: 'Alternate modifier.' },
  { id: 'win', label: 'Win', color: '#191A1F', row: 3, col: 2, category: 'System', description: 'OS Key.' },
  { id: 'cmd', label: 'Cmd', color: '#191A1F', row: 3, col: 3, category: 'System', description: 'Command modifier.' },
  { id: 'google_sys', label: 'Google', color: '#191A1F', row: 3, col: 4, category: 'Core', description: 'Google Platform Integration.' },
  { id: 'enter', label: 'Enter', color: '#191A1F', row: 3, col: 5, category: 'Action', description: 'Execution Key.' },
  { id: 'shift', label: 'Shift', color: '#191A1F', row: 3, col: 6, category: 'System', description: 'Shift modifier.' },
  { id: 'fn', label: 'Fn', color: '#191A1F', row: 3, col: 7, category: 'System', description: 'Function modifier.' },
];

// Handles image-based keys
function ImageLogo({ src }: { src: string }) {
  const texture = useTexture(src);

  return (
    <mesh position={[0, 0.176, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[0.35, 0.35]} />
      <meshBasicMaterial
        map={texture}
        transparent
        polygonOffset
        polygonOffsetFactor={-1}
        alphaTest={0.01}
      />
    </mesh>
  );
}

// Handles icon-based keys (Lucide icons → canvas texture)
function IconLogo({ icon: Icon, color }: { icon: any; color: string }) {
  const texture = useMemo(() => {
    const size = 256;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d')!;

    // Draw the icon as SVG string onto canvas
    const iconColor =
      color === '#F8F8F8' || color === '#61DAFB' || color === '#7CDEB3' || color === '#FCCF8F'
        ? '#000000'
        : '#FFFFFF';

    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24"
        fill="none" stroke="${iconColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        ${renderToStaticMarkup(<Icon size={24} />).replace(/<svg[^>]*>|<\/svg>/g, '')}
      </svg>
    `;

    const img = new Image();
    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const tex = new THREE.Texture(canvas);
    
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;

    img.onload = () => {
      ctx.drawImage(img, 0, 0, size, size);
      tex.needsUpdate = true;
      URL.revokeObjectURL(url);
    };
    img.src = url;

    return tex;
  }, [Icon, color]);

  useEffect(() => {
    return () => {
      texture.dispose();
    };
  }, [texture]);

  return (
    <mesh position={[0, 0.176, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[0.35, 0.35]} />
      <meshBasicMaterial 
        map={texture} 
        transparent 
        polygonOffset 
        polygonOffsetFactor={-1} 
        alphaTest={0.01}
      />
    </mesh>
  );
}

function Keycap({ tech, position, onClick }: { tech: TechKeyLayout; position: [number, number, number]; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const keyGroupRef = useRef<THREE.Group>(null);
  
  const Icon = tech.icon;

  useFrame(() => {
    if (keyGroupRef.current) {
      // Restore hover lift effect
      let targetY = 0.15;
      if (pressed) targetY = 0.05;
      else if (hovered) targetY = 0.25;
      
      // Add a precision threshold to stop lerping when close enough
      // This prevents the constant micro-movements that cause the logos to "shift"
      const currentY = keyGroupRef.current.position.y;
      if (Math.abs(currentY - targetY) > 0.001) {
        keyGroupRef.current.position.y = THREE.MathUtils.lerp(currentY, targetY, 0.2);
      } else {
        keyGroupRef.current.position.y = targetY;
      }
    }
  });

  return (
    <group position={position}>
      <group ref={keyGroupRef} position={[0, 0.15, 0]}>
        <RoundedBox
          args={[0.8, 0.35, 0.8]} 
          radius={0.08}
          smoothness={4}
          onClick={(e) => {
            e.stopPropagation();
            setPressed(true);
            setTimeout(() => setPressed(false), 100);
            setTimeout(onClick, 200);
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
            roughness={0.5}
            metalness={0.1}
            emissive={tech.color}
            emissiveIntensity={hovered ? 0.15 : 0}
          />
          
          {/* ✅ Logo stamped directly on the mesh — no more floating */}
          {tech.image ? (
            <ImageLogo src={tech.image} />
          ) : Icon ? (
            <IconLogo icon={Icon} color={tech.color} />
          ) : null}
        </RoundedBox>
      </group>
    </group>
  );
}

function KeyboardModel({ onKeyClick }: { onKeyClick: (tech: TechKey) => void }) {
  const groupRef = useRef<THREE.Group>(null);
  const x_step = 0.86; 
  const z_step = 0.86;

  useFrame((state) => {
    if (groupRef.current) {
      // Very subtle horizontal oscillation
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.08;
    }
  });

  return (
    <group ref={groupRef}>
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
          />
        );
      })}
    </group>
  );
}


// Responsive Camera Handler
function ResponsiveCamera() {
  const { camera, size } = useThree();
  
  useEffect(() => {
    const aspect = size.width / size.height;
    
    // Dynamically calculate distance to fit the keyboard (width ~7.5) with padding
    // We want to ensure at least ~8.5 units of world width are visible
    const requiredZ = 8.5 / (0.536 * aspect);
    
    // Clamp the distance so it's never too close on desktop or too far on ultra-thin screens
    const finalZ = Math.max(12, Math.min(requiredZ, 32));
    
    camera.position.set(0, 0, finalZ);
    camera.updateProjectionMatrix();
  }, [camera, size.width, size.height]);

  return null;
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
    <section className="relative w-full max-w-7xl mx-auto pt-2 pb-0 md:py-12 flex flex-col px-0 md:px-6">
      <div className="grid grid-cols-1 gap-8 items-stretch pt-2 md:pt-8">
        {/* 3D Model Area */}
        <div className="relative h-[380px] md:h-[650px] border-y md:border border-outline-variant/15 bg-black/40 overflow-hidden shadow-inner group md:rounded-xl">
          <div className="absolute top-0 inset-x-0 h-1 z-20 overflow-hidden">
             <div className="w-full h-full bg-tertiary/10 animate-pulse"></div>
          </div>

          <div className="absolute inset-0 cursor-grab active:cursor-grabbing">
            <Canvas 
               shadows 
               dpr={[1, 2]}
               gl={{ antialias: true }}
            >
              <ResponsiveCamera />
              <PerspectiveCamera makeDefault position={[0, 0, 12]} fov={30} />
              <ambientLight intensity={0.2} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={0.4} castShadow />
              <directionalLight position={[0, 10, 5]} intensity={0.5} />
              <pointLight position={[-10, -10, -10]} intensity={0.2} />
              
              <group position={[0, 0, 0]} rotation={[1.1, 0, 0]}>
                <KeyboardModel onKeyClick={setSelectedTech} />
              </group>

              <ContactShadows position={[0, -1.2, 0]} opacity={0.4} scale={15} blur={2} far={4} color="#000" />
              <Environment preset="city" />
            </Canvas>
          </div>

          {/* HUD Accents */}
          <div className="absolute top-6 right-8 flex items-center gap-6 z-10 pointer-events-none md:mt-0">
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
          <div className="absolute bottom-6 left-8 flex items-center gap-4 z-10">
             <div className="flex items-center gap-2">
                <Info size={12} className="text-tertiary" />
                <span className="text-[10px] font-headline font-bold text-white/40 uppercase tracking-widest outline-none">Select Key to Inspect node</span>
             </div>
          </div>
        </div>
      </div>

      {/* Pop-up Overlay */}
      <AnimatePresence>
        {selectedTech && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/60"
            onClick={() => setSelectedTech(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 40 }}
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              className="relative w-full max-w-lg bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.8)] overflow-hidden rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Scanline Effect Overlay */}
              <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]"></div>
              
              <div className="p-6 md:p-10 flex flex-col gap-8">
                {/* Header Section */}
                <div className="flex items-start justify-between gap-6">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-tertiary"></div>
                        <span className="text-[10px] font-headline font-black text-tertiary tracking-[0.4em] uppercase">
                          {selectedTech.category} // DAT_FILE_KEY
                        </span>
                    </div>
                    <h3 className="text-3xl md:text-5xl font-headline font-black text-on-surface uppercase tracking-tight leading-none">
                      {selectedTech.label}
                    </h3>
                  </div>
                  
                  <div className="relative">
                    <div className="relative w-16 h-16 md:w-24 md:h-24 bg-black/40 border border-white/5 flex items-center justify-center p-4 shadow-inner">
                      {selectedTech.image ? (
                        <img src={selectedTech.image} alt={selectedTech.label} className="w-full h-full object-contain" />
                      ) : selectedTech.icon ? (
                        <selectedTech.icon size={40} color={selectedTech.color} strokeWidth={1.5} />
                      ) : null}
                    </div>
                  </div>
                </div>

                {/* Main Content */}
                <div className="flex flex-col gap-8">
                  <div className="relative">
                    <p className="text-on-surface-variant text-lg md:text-xl leading-relaxed font-body italic font-medium border-l-2 border-tertiary/20 pl-6">
                      "{selectedTech.description}"
                    </p>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="flex items-center gap-4 pt-2">
                  <button
                    onClick={() => setSelectedTech(null)}
                    className="flex-1 py-4 bg-white text-black hover:bg-tertiary transition-all font-headline font-black text-[10px] tracking-[0.3em] uppercase flex items-center justify-center gap-2 group"
                  >
                    <span>Terminate View</span>
                    <div className="w-1.5 h-1.5 bg-black rounded-full transition-all group-hover:scale-150"></div>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
