import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { projectsAPI } from '@/lib/api';
import { Project } from '@/types';

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await projectsAPI.getAll();
        setProjects(data);
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const next = useCallback(() => {
    setActive(prev => (prev + 1) % projects.length);
  }, [projects.length]);

  const prev = useCallback(() => {
    setActive(prev => (prev - 1 + projects.length) % projects.length);
  }, [projects.length]);

  // Auto-advance
  useEffect(() => {
    if (paused || projects.length === 0) return;
    intervalRef.current = setInterval(next, 3200);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [next, paused, projects.length]);

  if (loading) {
    return (
      <section id="projects" className="section-padding grid-bg">
        <div className="container-custom">
          <div className="flex items-center justify-center py-20">
            <div className="font-mono text-sm" style={{ color: '#00F5FF' }}>
              <span style={{ color: '#00FF41' }}>{'>'}</span> loading projects<span className="terminal-cursor ml-1" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="section-padding grid-bg overflow-hidden">
      <div className="container-custom">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15, margin: "-60px" }}
          transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-14"
        >
          <div>
            <p className="font-mono text-xs tracking-widest mb-2" style={{ color: 'rgba(0,245,255,0.5)' }}>
              ls -la ./projects
            </p>
            <h2 className="font-orbitron font-bold text-3xl md:text-4xl tracking-wider" style={{ color: '#E8EDF3' }}>
              LS_<span style={{ color: '#00F5FF' }}>PROJECTS</span>
            </h2>
            <div className="h-px mt-3 w-28" style={{ background: 'linear-gradient(90deg, #00F5FF, transparent)' }} />
          </div>

          {/* Index counter */}
          <div className="font-mono text-sm flex items-center gap-3" style={{ color: 'rgba(0,245,255,0.5)' }}>
            <span style={{ color: '#00FF41' }}>[</span>
            <span style={{ color: '#E8EDF3' }}>{String(active + 1).padStart(2, '0')}</span>
            <span>/</span>
            <span>{String(projects.length).padStart(2, '0')}</span>
            <span style={{ color: '#00FF41' }}>]</span>
          </div>
        </motion.div>

        {/* ── Coverflow Stage ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.15, margin: "-60px" }}
          transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* 3D Viewport */}
          <div
            className="relative mx-auto overflow-visible"
            style={{ height: '440px', perspective: '1200px', perspectiveOrigin: '50% 40%' }}
          >
            {projects.map((project, i) => {
              const offset = i - active;
              // Only render visible range
              if (Math.abs(offset) > 2) return null;

              const absOff = Math.abs(offset);
              const sign = offset < 0 ? -1 : offset > 0 ? 1 : 0;

              // Position transforms
              const translateX = sign * (absOff === 1 ? 340 : 600);
              const translateZ = absOff === 0 ? 0 : absOff === 1 ? -150 : -280;
              const rotateY = sign * (absOff === 1 ? 42 : 62);
              const scale = absOff === 0 ? 1 : absOff === 1 ? 0.82 : 0.65;
              const opacity = absOff === 0 ? 1 : absOff === 1 ? 0.7 : 0.35;
              const zIndex = 10 - absOff;

              return (
                <motion.div
                  key={project._id}
                  animate={{
                    translateX,
                    translateZ,
                    rotateY,
                    scale,
                    opacity,
                  }}
                  transition={{ type: 'spring', stiffness: 260, damping: 28 }}
                  style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    marginLeft: '-170px',
                    marginTop: '-210px',
                    width: '340px',
                    height: '420px',
                    zIndex,
                    transformStyle: 'preserve-3d',
                    cursor: offset !== 0 ? 'pointer' : 'default',
                  }}
                  onClick={() => offset !== 0 && setActive(i)}
                  whileHover={offset !== 0 ? { opacity: opacity + 0.15 } : {}}
                >
                  <ProjectCard project={project} isActive={offset === 0} />
                </motion.div>
              );
            })}
          </div>

          {/* Prev / Next controls */}
          <div className="flex justify-center items-center gap-6 mt-8">
            <motion.button
              onClick={prev}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.92 }}
              className="w-11 h-11 rounded-full flex items-center justify-center font-mono transition-all duration-200"
              style={{ border: '1px solid rgba(0,245,255,0.3)', color: '#00F5FF', background: 'rgba(0,245,255,0.05)' }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = 'rgba(0,245,255,0.15)';
                el.style.boxShadow = '0 0 16px rgba(0,245,255,0.3)';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = 'rgba(0,245,255,0.05)';
                el.style.boxShadow = 'none';
              }}
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>

            {/* Dot indicators */}
            <div className="flex items-center gap-2">
              {projects.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className="transition-all duration-300 rounded-full"
                  style={{
                    width: i === active ? '24px' : '6px',
                    height: '6px',
                    background: i === active
                      ? 'linear-gradient(90deg, #00F5FF, #00FF41)'
                      : 'rgba(0,245,255,0.2)',
                    boxShadow: i === active ? '0 0 8px rgba(0,245,255,0.6)' : 'none',
                  }}
                />
              ))}
            </div>

            <motion.button
              onClick={next}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.92 }}
              className="w-11 h-11 rounded-full flex items-center justify-center font-mono transition-all duration-200"
              style={{ border: '1px solid rgba(0,245,255,0.3)', color: '#00F5FF', background: 'rgba(0,245,255,0.05)' }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = 'rgba(0,245,255,0.15)';
                el.style.boxShadow = '0 0 16px rgba(0,245,255,0.3)';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.background = 'rgba(0,245,255,0.05)';
                el.style.boxShadow = 'none';
              }}
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15, margin: "-60px" }}
          transition={{ duration: 1.0, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mt-12"
        >
          <motion.a
            href="https://github.com/chaudhariGaurav07"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="btn-terminal inline-flex items-center gap-2"
          >
            <Github className="w-4 h-4" />
            VIEW_ALL_ON_GITHUB
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

/* ── Individual Project Card ── */
function ProjectCard({ project, isActive }: { project: Project; isActive: boolean }) {
  return (
    <div
      className="w-full h-full rounded-xl overflow-hidden flex flex-col relative"
      style={{
        background: 'rgba(10,14,22,0.97)',
        border: isActive
          ? '1px solid rgba(0,245,255,0.45)'
          : '1px solid rgba(0,245,255,0.1)',
        boxShadow: isActive
          ? '0 0 40px rgba(0,245,255,0.18), 0 30px 80px rgba(0,0,0,0.7)'
          : '0 10px 40px rgba(0,0,0,0.5)',
        transition: 'border-color 0.4s, box-shadow 0.4s',
      }}
    >
      {/* Top neon line on active */}
      {isActive && (
        <div
          className="absolute top-0 left-0 right-0 h-0.5 z-10"
          style={{ background: 'linear-gradient(90deg, transparent, #00F5FF 40%, #00FF41 60%, transparent)' }}
        />
      )}

      {/* Image */}
      <div className="relative overflow-hidden flex-shrink-0" style={{ height: '200px' }}>
        <img
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-full object-cover"
          style={{ transition: 'transform 0.6s ease', transform: isActive ? 'scale(1.04)' : 'scale(1)' }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(10,14,22,1) 0%, rgba(10,14,22,0.4) 55%, transparent 100%)' }}
        />

        {/* Featured badge */}
        {project.featured && (
          <div
            className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 rounded"
            style={{ background: 'rgba(0,255,65,0.12)', border: '1px solid rgba(0,255,65,0.4)', backdropFilter: 'blur(4px)' }}
          >
            <Star className="w-2.5 h-2.5" style={{ color: '#00FF41' }} />
            <span className="font-mono" style={{ fontSize: '0.6rem', color: '#00FF41' }}>FEATURED</span>
          </div>
        )}

        {/* Number badge */}
        <div className="absolute bottom-3 left-3">
          <span
            className="font-mono text-xs px-2 py-0.5 rounded"
            style={{
              background: 'rgba(10,14,22,0.85)',
              border: '1px solid rgba(0,245,255,0.25)',
              color: isActive ? '#00F5FF' : 'rgba(0,245,255,0.5)',
            }}
          >
            //{project.title.slice(0, 3).toUpperCase()}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col p-5 gap-3">
        <h3
          className="font-orbitron font-bold text-sm leading-tight"
          style={{ color: isActive ? '#00F5FF' : '#E8EDF3', letterSpacing: '0.04em', transition: 'color 0.3s' }}
        >
          {project.title}
        </h3>

        <p
          className="text-xs leading-relaxed flex-1 line-clamp-3"
          style={{ color: 'rgba(232,237,243,0.55)', fontFamily: 'Inter, sans-serif' }}
        >
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.techStack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="font-mono rounded px-2 py-0.5"
              style={{
                fontSize: '0.62rem',
                background: isActive ? 'rgba(0,245,255,0.08)' : 'rgba(0,245,255,0.04)',
                color: isActive ? '#00F5FF' : 'rgba(0,245,255,0.55)',
                border: `1px solid ${isActive ? 'rgba(0,245,255,0.25)' : 'rgba(0,245,255,0.1)'}`,
              }}
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 4 && (
            <span className="font-mono text-xs" style={{ color: 'rgba(232,237,243,0.3)' }}>
              +{project.techStack.length - 4}
            </span>
          )}
        </div>

        {/* Action buttons — only show when active */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.25 }}
              className="flex gap-2 pt-2"
              style={{ borderTop: '1px solid rgba(0,245,255,0.1)' }}
            >
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded font-mono text-xs transition-all duration-200"
                style={{ color: '#00F5FF', border: '1px solid rgba(0,245,255,0.25)', background: 'rgba(0,245,255,0.05)' }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = 'rgba(0,245,255,0.12)';
                  el.style.boxShadow = '0 0 12px rgba(0,245,255,0.25)';
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = 'rgba(0,245,255,0.05)';
                  el.style.boxShadow = 'none';
                }}
              >
                <Github className="w-3.5 h-3.5" /> CODE
              </a>
              <a
                href={project.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded font-mono text-xs transition-all duration-200"
                style={{ color: '#0D1117', background: 'linear-gradient(135deg, #00F5FF, #00FF41)' }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 0 20px rgba(0,245,255,0.5)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                }}
              >
                <ExternalLink className="w-3.5 h-3.5" /> LIVE
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}