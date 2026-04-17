import { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { ChevronDown, Github, Linkedin, Mail } from 'lucide-react';

const keyboardRows = [
  [ { label: 'ESC', w: 'w-12' }, { label: '1', w: 'w-12' }, { label: '2', w: 'w-12' }, { label: '3', w: 'w-12' }, { label: '4', w: 'w-12' }, { label: '5', w: 'w-12' }, { label: '6', w: 'w-12' }, { label: '7', w: 'w-12' }, { label: '8', w: 'w-12' }, { label: '9', w: 'w-12' }, { label: '0', w: 'w-12' }, { label: '-', w: 'w-12' }, { label: '=', w: 'w-12' }, { label: 'DEL', w: 'w-16' } ],
  [ { label: 'TAB', w: 'w-16' }, { label: 'Q', w: 'w-12' }, { label: 'W', w: 'w-12' }, { label: 'E', w: 'w-12' }, { label: 'R', w: 'w-12' }, { label: 'T', w: 'w-12' }, { label: 'Y', w: 'w-12' }, { label: 'U', w: 'w-12' }, { label: 'I', w: 'w-12' }, { label: 'O', w: 'w-12' }, { label: 'P', w: 'w-12' }, { label: '[', w: 'w-12' }, { label: ']', w: 'w-12' }, { label: '\\', w: 'w-12' } ],
  [ { label: 'CAPS', w: 'w-20' }, { label: 'A', w: 'w-12' }, { label: 'S', w: 'w-12' }, { label: 'D', w: 'w-12' }, { label: 'F', w: 'w-12' }, { label: 'G', w: 'w-12' }, { label: 'H', w: 'w-12' }, { label: 'J', w: 'w-12' }, { label: 'K', w: 'w-12' }, { label: 'L', w: 'w-12' }, { label: ';', w: 'w-12' }, { label: "'", w: 'w-12' }, { label: 'ENTER', w: 'w-20' } ],
  [ { label: 'SHIFT', w: 'w-[104px]' }, { label: 'Z', w: 'w-12' }, { label: 'X', w: 'w-12' }, { label: 'C', w: 'w-12' }, { label: 'V', w: 'w-12' }, { label: 'B', w: 'w-12' }, { label: 'N', w: 'w-12' }, { label: 'M', w: 'w-12' }, { label: ',', w: 'w-12' }, { label: '.', w: 'w-12' }, { label: '/', w: 'w-12' }, { label: 'SHIFT', w: 'w-[104px]' } ],
  [ { label: 'CTRL', w: 'w-16' }, { label: 'WIN', w: 'w-16' }, { label: 'ALT', w: 'w-16' }, { label: 'SPACE', w: 'flex-1 min-w-[200px]' }, { label: 'ALT', w: 'w-16' }, { label: 'FN', w: 'w-16' }, { label: 'CTRL', w: 'w-16' } ]
];

const terminalBootLines = [
  { id: 1, text: "Initializing System...", delay: 0 },
  { id: 2, text: "Loading Core Modules... OK", delay: 800 },
  { id: 3, text: "Connecting to Secure Server... OK", delay: 1500 },
  { id: 4, text: "Bypassing Mainframe... OK", delay: 2200 },
  { id: 5, text: "Authenticating...", delay: 2800 },
  { id: 6, text: "Access Granted.", type: "success", delay: 3500 },
  { id: 7, text: "Welcome User.", type: "highlight", delay: 4000 }
];

export default function Hero() {
  const [unlocked, setUnlocked] = useState(false);
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [terminalLines, setTerminalLines] = useState<any[]>([]);
  const [bootComplete, setBootComplete] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  // Parallax Setup
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 100 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const keyRotateX = useTransform(smoothY, [-1, 1], [45, 65]);
  const keyRotateY = useTransform(smoothX, [-1, 1], [-15, 15]);
  const bgX = useTransform(smoothX, [-1, 1], ["-2%", "2%"]);
  const bgY = useTransform(smoothY, [-1, 1], ["-2%", "2%"]);
  const glowX = useTransform(smoothX, [-1, 1], ["30%", "70%"]);
  const glowY = useTransform(smoothY, [-1, 1], ["30%", "70%"]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!unlocked) {
        handleUnlock(e.key.toUpperCase());
      } else {
        const char = e.key.toUpperCase();
        setActiveKey(char === ' ' ? 'SPACE' : char);
        setTimeout(() => setActiveKey(null), 150);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [unlocked]);

  const handleUnlock = (keyLabel: string) => {
    setActiveKey(keyLabel);
    setUnlocked(true);
    setTimeout(() => setActiveKey(null), 150);
    
    // Start terminal boot sequence
    terminalBootLines.forEach(line => {
      setTimeout(() => {
        setTerminalLines(prev => [...prev, line]);
        if (line.id === terminalBootLines[line.id - 1]?.id && line.id === 7) {
          setTimeout(() => setBootComplete(true), 500);
        }
      }, line.delay);
    });
  };

  const scrollToSection = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCommand = (id: string, cmdText: string) => {
    setTerminalLines(prev => [...prev, { id: Date.now(), text: `Executing > ${cmdText}...`, type: 'highlight' }]);
    setTimeout(() => {
      setIsClosing(true);
      setTimeout(() => {
        scrollToSection(id);
        setTimeout(() => {
          setUnlocked(false);
          setIsClosing(false);
          setTerminalLines([]);
          setBootComplete(false);
        }, 1000);
      }, 400); 
    }, 500);
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#0a0a0c] perspective-1000">
      
      {/* Immersive Parallax Background */}
      <motion.div 
        className="absolute inset-[-5%] w-[110%] h-[110%] opacity-40 z-0 pointer-events-none"
        style={{
          backgroundSize: '50px 50px',
          backgroundImage: 'linear-gradient(rgba(0, 245, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 245, 255, 0.05) 1px, transparent 1px)',
          x: bgX, y: bgY
        }}
      />
      
      <motion.div 
        className="absolute w-[800px] h-[800px] rounded-full opacity-20 blur-[100px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #00F5FF 0%, transparent 60%)',
          left: glowX, top: glowY,
          transform: 'translate(-50%, -50%)'
        }}
      />
      <motion.div 
        className="absolute w-[600px] h-[600px] rounded-full opacity-10 blur-[80px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #00FF41 0%, transparent 60%)',
          right: glowX, bottom: glowY,
          transform: 'translate(50%, 50%)'
        }}
      />

      <div className="container-custom relative z-10 w-full h-full flex flex-col items-center justify-center">
        
        <AnimatePresence mode="wait">
          {!unlocked ? (
            <motion.div
              key="prompt"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50, filter: 'blur(10px)' }}
              transition={{ duration: 0.8 }}
              className="absolute top-[20%] text-center z-20 pointer-events-none"
            >
              <h1 className="text-2xl md:text-4xl font-orbitron font-bold text-[#E8EDF3] tracking-widest mb-4 drop-shadow-[0_0_15px_rgba(0,245,255,0.5)]">
                SYSTEM STANDBY
              </h1>
              <p className="font-mono text-[#00F5FF]/70 text-sm md:text-base animate-pulse">
                &gt; click or press any key to unlock
              </p>
            </motion.div>
          ) : null}
        </AnimatePresence>

        {/* Floating 3D Keyboard */}
        <motion.div 
          className="preserve-3d relative z-10 w-full max-w-4xl px-4 mt-8 md:mt-24 pointer-events-auto"
          animate={unlocked ? { 
            scale: 0.85, 
            y: 180, 
            opacity: 0.6,
            rotateX: [60], 
            rotateZ: 0 
          } : {}}
          transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
          style={{
            rotateX: unlocked ? undefined : keyRotateX,
            rotateY: unlocked ? undefined : keyRotateY,
            rotateZ: unlocked ? undefined : keyRotateY,
          }}
        >
          <div className="p-4 md:p-6 rounded-xl bg-[#0d1117]/80 backdrop-blur-md border border-[#00F5FF]/20 shadow-[0_20px_50px_rgba(0,0,0,0.5),_inset_0_1px_0_rgba(255,255,255,0.1)]">
            <div className="flex flex-col gap-2 md:gap-3">
              {keyboardRows.map((row, rIdx) => (
                <div key={rIdx} className="flex justify-center gap-2 md:gap-3 w-full">
                  {row.map((key) => {
                    const isActive = activeKey === key.label;
                    return (
                      <div
                        key={key.label}
                        onClick={() => handleUnlock(key.label)}
                        className={`key-3d h-10 md:h-12 text-[10px] md:text-xs ${key.w} ${isActive ? 'active' : ''}`}
                      >
                        {key.label}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Holographic Terminal Window */}
        <AnimatePresence>
          {unlocked && !isClosing && (
            <motion.div
              key="terminal"
              initial={{ opacity: 0, scale: 0.8, y: 50, rotateX: -20 }}
              animate={{ opacity: 1, scale: 1, y: -40, rotateX: 0 }}
              exit={{ 
                scaleY: 0.02,
                scaleX: 1.1,
                opacity: 0,
                filter: "brightness(3)",
                transition: { duration: 0.3, ease: "easeIn" }
              }}
              transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
              className="absolute z-30 w-full max-w-3xl px-4 pointer-events-auto"
            >
              <div className="rounded-xl overflow-hidden glass shadow-[0_0_40px_rgba(0,245,255,0.15)] border border-[#00F5FF]/40 preserve-3d">
                {/* Titlebar */}
                <div className="bg-[#00F5FF]/10 border-b border-[#00F5FF]/20 px-4 py-3 flex items-center gap-3">
                  <div className="flex gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#FF5F57] shadow-[0_0_8px_#FF5F57]"></span>
                    <span className="w-3 h-3 rounded-full bg-[#FFBD2E] shadow-[0_0_8px_#FFBD2E]"></span>
                    <span className="w-3 h-3 rounded-full bg-[#28CA41] shadow-[0_0_8px_#28CA41]"></span>
                  </div>
                  <span className="font-mono text-xs text-[#00F5FF]/60 ml-2">root@mainframe:~</span>
                  <div className="ml-auto flex items-center gap-4">
                    <a href="https://github.com/chaudhariGaurav07" target="_blank" rel="noreferrer" className="text-[#00F5FF]/60 hover:text-[#00F5FF] transition-colors"><Github size={16}/></a>
                    <a href="https://www.linkedin.com/in/gaurav-chaudhari-b20176227/" target="_blank" rel="noreferrer" className="text-[#00F5FF]/60 hover:text-[#00F5FF] transition-colors"><Linkedin size={16}/></a>
                    <a href="mailto:gauravchaudhari7717@example.com" className="text-[#00F5FF]/60 hover:text-[#00F5FF] transition-colors"><Mail size={16}/></a>
                  </div>
                </div>

                {/* Terminal Body */}
                <div className="p-6 md:p-8 font-mono text-sm md:text-base min-h-[300px] flex flex-col justify-between" style={{ background: 'linear-gradient(180deg, rgba(13,17,23,0.9) 0%, rgba(13,17,23,0.95) 100%)' }}>
                  
                  <div className="space-y-2">
                    {terminalLines.map((line) => (
                      <motion.div
                        key={line.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-start"
                      >
                        <span className="text-[#00FF41] mr-2">&gt;</span>
                        <span className={
                          line.type === 'success' ? 'text-[#00FF41] font-bold drop-shadow-[0_0_8px_rgba(0,255,65,0.5)]' :
                          line.type === 'highlight' ? 'text-[#00F5FF] font-bold drop-shadow-[0_0_8px_rgba(0,245,255,0.5)] text-lg mt-2' :
                          'text-[#00F5FF]/80'
                        }>
                          {line.text}
                        </span>
                      </motion.div>
                    ))}
                    
                    {!bootComplete && unlocked && (
                      <div className="flex items-center">
                         <span className="text-[#00FF41] mr-2">&gt;</span>
                         <span className="w-2.5 h-5 bg-[#00FF41] animate-pulse"></span>
                      </div>
                    )}
                  </div>

                  <AnimatePresence>
                    {bootComplete && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mt-10"
                      >
                        <p className="text-[#00F5FF]/50 text-xs mb-3">// SELECT COMMAND TO EXECUTE</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                          <button onClick={() => handleCommand('#about', 'open_about')} className="btn-terminal flex items-center justify-between group">
                            <span><span className="text-[#00FF41] mr-2 group-hover:animate-pulse">&gt;</span> open_about</span>
                            <span className="opacity-0 group-hover:opacity-100 transition-opacity text-xs">EXE</span>
                          </button>
                          <button onClick={() => handleCommand('#projects', 'view_projects')} className="btn-terminal flex items-center justify-between group relative overflow-hidden">
                            <div className="absolute inset-0 bg-[#00F5FF]/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                            <span className="relative"><span className="text-[#00FF41] mr-2 group-hover:animate-pulse">&gt;</span> view_projects</span>
                            <span className="relative opacity-0 group-hover:opacity-100 transition-opacity text-xs text-[#00FF41]">RUN</span>
                          </button>
                          <button onClick={() => handleCommand('#blog', 'load_blog')} className="btn-terminal flex items-center justify-between group">
                            <span><span className="text-[#00FF41] mr-2 group-hover:animate-pulse">&gt;</span> load_blog</span>
                            <span className="opacity-0 group-hover:opacity-100 transition-opacity text-xs">EXE</span>
                          </button>
                          <button onClick={() => handleCommand('#contact', 'init_contact')} className="btn-terminal flex items-center justify-between group">
                            <span><span className="text-[#00FF41] mr-2 group-hover:animate-pulse">&gt;</span> init_contact</span>
                            <span className="opacity-0 group-hover:opacity-100 transition-opacity text-xs text-[#00FF41]">PING</span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
