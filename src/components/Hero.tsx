import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Github, Linkedin, Mail } from 'lucide-react';

const roles = [
  'Full Stack Developer',
  'Open Source Contributor',
  'Tech Explorer',
  'Problem Solver',
];

// Terminal lines exactly as in the reference image
const terminalLines = [
  { id: 0, type: 'prompt', cmd: 'whoami' },
  { id: 1, type: 'output', text: 'Computer Engineer | Full-Stack Developer | System Architect' },
  { id: 2, type: 'prompt', cmd: 'ls sections/' },
  { id: 3, type: 'output-tags', tags: ['[ about.txt ]', '[ experience.md ]', '[ projects/ ]', '[ blog/ ]'] },
  { id: 4, type: 'prompt-cursor' },
];

export default function Hero() {
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [visibleLines, setVisibleLines] = useState(0);

  // Typewriter effect
  useEffect(() => {
    const role = roles[currentRole];
    let timeout: ReturnType<typeof setTimeout>;
    if (!isDeleting && displayText.length < role.length) {
      timeout = setTimeout(() => setDisplayText(role.slice(0, displayText.length + 1)), 75);
    } else if (!isDeleting && displayText.length === role.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2400);
    } else if (isDeleting && displayText.length > 0) {
      timeout = setTimeout(() => setDisplayText(role.slice(0, displayText.length - 1)), 40);
    } else if (isDeleting && displayText.length === 0) {
      setIsDeleting(false);
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentRole]);

  // Animate terminal lines appearing
  useEffect(() => {
    if (visibleLines < terminalLines.length) {
      const t = setTimeout(() => setVisibleLines((v) => v + 1), 500);
      return () => clearTimeout(t);
    }
  }, [visibleLines]);

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative px-4 grid-bg overflow-hidden"
    >
      {/* Glow orbs */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '20%', left: '10%', width: '500px', height: '500px',
          background: 'radial-gradient(circle, rgba(0,245,255,0.05) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: '15%', right: '8%', width: '400px', height: '400px',
          background: 'radial-gradient(circle, rgba(0,255,65,0.04) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      <div className="container-custom relative z-10 w-full pt-16">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* ── LEFT COLUMN ── */}
          <div>
            {/* Available badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center gap-2 mb-5"
            >
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#00FF41' }} />
              <span className="font-mono text-xs tracking-widest" style={{ color: '#00FF41', letterSpacing: '0.12em' }}>
                AVAILABLE FOR OPPORTUNITIES
              </span>
            </motion.div>

            {/* DEVELOPER CONSOLE heading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mb-4"
            >
              <h1
                className="font-orbitron font-black leading-none"
                style={{ fontSize: 'clamp(2.8rem, 7vw, 5.5rem)', lineHeight: 1.0 }}
              >
                <span className="block" style={{ color: '#E8EDF3' }}>DEVELOPER</span>
                <span
                  className="block"
                  style={{
                    background: 'linear-gradient(90deg, #00F5FF 0%, #00FF41 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    filter: 'drop-shadow(0 0 24px rgba(0,245,255,0.35))',
                  }}
                >
                  CONSOLE
                </span>
              </h1>
            </motion.div>

            {/* Name comment */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mb-3"
            >
              <p className="font-mono text-base" style={{ color: 'rgba(232,237,243,0.5)' }}>
                <span style={{ color: 'rgba(0,245,255,0.5)' }}>{'// '}</span>
                Gaurav Chaudhari
              </p>
            </motion.div>

            {/* Typewriter role */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.55 }}
              className="flex items-center gap-2 mb-6 h-7"
            >
              <span className="font-mono text-base font-bold" style={{ color: '#00FF41' }}>{'>'}</span>
              <span className="font-mono text-sm" style={{ color: 'rgba(232,237,243,0.85)' }}>
                {displayText}
              </span>
              <span className="terminal-cursor" />
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="text-sm leading-relaxed mb-7 max-w-md"
              style={{ color: 'rgba(232,237,243,0.5)', fontFamily: 'Inter, sans-serif' }}
            >
              Passionate about creating digital experiences that make a difference.
              I specialize in building scalable web applications with modern technologies
              and contributing to open-source projects worldwide.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.85 }}
              className="flex flex-wrap gap-3 mb-7"
            >
              <motion.button
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-3d flex items-center gap-2 text-xs"
                style={{ padding: '0.6rem 1.4rem', fontSize: '0.72rem', letterSpacing: '0.1em' }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-current" />
                VIEW PROJECTS
              </motion.button>
              <motion.a
                href="https://drive.google.com/file/d/1VwNaH1t4zrD8TYgpoN7JIpu_ed5Bb0Pu/view"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="btn-terminal flex items-center gap-2 text-xs"
                style={{ padding: '0.6rem 1.4rem', fontSize: '0.72rem', letterSpacing: '0.08em' }}
              >
                RESUME.PDF
              </motion.a>
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.0 }}
              className="flex items-center gap-2.5"
            >
              {[
                { icon: Github, href: 'https://github.com/chaudhariGaurav07', label: 'GitHub' },
                { icon: Linkedin, href: 'https://www.linkedin.com/in/gaurav-chaudhari-b20176227/', label: 'LinkedIn' },
                { icon: Mail, href: 'mailto:gauravchaudhari7717@example.com', label: 'Email' },
              ].map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={label}
                  className="w-9 h-9 rounded flex items-center justify-center transition-all duration-200"
                  style={{
                    color: 'rgba(0,245,255,0.55)',
                    border: '1px solid rgba(0,245,255,0.18)',
                    background: 'rgba(0,245,255,0.04)',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.color = '#00F5FF';
                    el.style.borderColor = 'rgba(0,245,255,0.5)';
                    el.style.boxShadow = '0 0 12px rgba(0,245,255,0.3)';
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.color = 'rgba(0,245,255,0.55)';
                    el.style.borderColor = 'rgba(0,245,255,0.18)';
                    el.style.boxShadow = 'none';
                  }}
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT COLUMN: Terminal Window ── */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:block"
          >
            <div className="terminal-window">
              {/* Title bar */}
              <div className="terminal-titlebar">
                <span className="terminal-dot" style={{ background: '#FF5F57' }} />
                <span className="terminal-dot" style={{ background: '#FFBD2E' }} />
                <span className="terminal-dot" style={{ background: '#28CA41' }} />
                <span className="font-mono text-xs ml-4" style={{ color: 'rgba(0,245,255,0.35)' }}>
                  gaurav@portfolio — bash — 80×24
                </span>
              </div>

              {/* Terminal body */}
              <div className="p-5 font-mono text-sm" style={{ minHeight: '240px', lineHeight: '1.8' }}>
                {terminalLines.slice(0, visibleLines).map((line) => (
                  <motion.div
                    key={line.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.25 }}
                  >
                    {line.type === 'prompt' && (
                      <div className="flex items-center gap-1 mb-1">
                        <span style={{ color: '#00FF41' }}>user@portfolio</span>
                        <span style={{ color: 'rgba(0,245,255,0.4)' }}>:~</span>
                        <span style={{ color: '#00FF41' }}>$</span>
                        <span className="ml-1" style={{ color: '#00F5FF' }}>{line.cmd}</span>
                      </div>
                    )}
                    {line.type === 'output' && (
                      <div className="mb-1 pl-2" style={{ color: 'rgba(0,245,255,0.65)' }}>
                        {line.text}
                      </div>
                    )}
                    {line.type === 'output-tags' && (
                      <div className="mb-1 pl-2 flex flex-wrap gap-2">
                        {line.tags?.map((tag, i) => (
                          <span
                            key={i}
                            className="px-1.5 py-0.5 rounded text-xs"
                            style={{
                              background: 'rgba(0,245,255,0.1)',
                              border: '1px solid rgba(0,245,255,0.3)',
                              color: '#00F5FF',
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    {line.type === 'prompt-cursor' && (
                      <div className="flex items-center gap-1">
                        <span style={{ color: '#00FF41' }}>user@portfolio</span>
                        <span style={{ color: 'rgba(0,245,255,0.4)' }}>:~</span>
                        <span style={{ color: '#00FF41' }}>$</span>
                        <span className="terminal-cursor ml-1" />
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Tech tags below terminal */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.5 }}
              className="mt-4 flex flex-wrap gap-2"
            >
              {['REACT', 'TYPESCRIPT', 'NODE.JS', 'MONGODB'].map((t) => (
                <span key={t} className="tag-cyan text-xs font-mono">{t}</span>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 cursor-pointer"
        >
          <span className="font-mono text-xs tracking-widest" style={{ color: 'rgba(0,245,255,0.3)', letterSpacing: '0.15em' }}>
            SCROLL_DOWN
          </span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.8, repeat: Infinity }}>
            <ChevronDown className="w-5 h-5" style={{ color: 'rgba(0,245,255,0.4)' }} />
          </motion.div>
        </motion.button>
      </div>
    </section>
  );
}
