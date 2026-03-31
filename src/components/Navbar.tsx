import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Terminal } from 'lucide-react';

const navItems = [
  { label: 'ABOUT', href: '#about' },
  { label: 'EXPERIENCE', href: '#experience' },
  { label: 'PROJECTS', href: '#projects' },
  { label: 'BLOG', href: '#blog' },
  { label: 'CONTACT', href: '#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
        setTimeout(() => element.scrollIntoView({ behavior: 'smooth' }), 300);
      } else {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'glass backdrop-blur-xl border-b border-cyan-500/10'
          : 'bg-transparent'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-14 px-4">
          {/* Logo */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 group"
          >
            <div className="w-8 h-8 rounded flex items-center justify-center"
              style={{ background: 'rgba(0,245,255,0.1)', border: '1px solid rgba(0,245,255,0.3)' }}>
              <Terminal className="w-4 h-4" style={{ color: '#00F5FF' }} />
            </div>
            <span className="font-mono text-sm font-semibold hidden sm:block"
              style={{ color: '#00F5FF' }}>
              gaurav@portfolio
              <span style={{ color: '#00FF41' }}>:~$</span>
            </span>
          </motion.button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <motion.button
                key={item.label}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection(item.href)}
                className="font-mono text-xs font-semibold tracking-widest relative group transition-all duration-200"
                style={{ color: 'rgba(232, 237, 243, 0.7)', letterSpacing: '0.12em' }}
              >
                <span className="group-hover:transition-colors"
                  style={{ color: 'inherit' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#00F5FF')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(232,237,243,0.7)')}
                >
                  {item.label}
                </span>
                <span
                  className="absolute -bottom-1 left-0 w-0 h-px transition-all duration-300 group-hover:w-full"
                  style={{ background: '#00F5FF', boxShadow: '0 0 8px rgba(0,245,255,0.6)' }}
                />
              </motion.button>
            ))}
          </div>

          {/* Hire Me Badge + Mobile Menu */}
          <div className="flex items-center gap-3">
            <motion.a
              href="https://drive.google.com/file/d/1VwNaH1t4zrD8TYgpoN7JIpu_ed5Bb0Pu/view"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded font-mono text-xs font-bold tracking-wider"
              style={{
                color: '#0D1117',
                background: 'linear-gradient(135deg, #00F5FF, #00FF41)',
                letterSpacing: '0.08em'
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
              HIRE ME
            </motion.a>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden w-9 h-9 rounded flex items-center justify-center transition-all duration-200"
              style={{
                color: '#00F5FF',
                border: '1px solid rgba(0,245,255,0.3)',
                background: 'rgba(0,245,255,0.05)'
              }}
            >
              <motion.div
                animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </motion.div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden glass backdrop-blur-xl"
              style={{ borderTop: '1px solid rgba(0,245,255,0.1)' }}
            >
              <div className="px-4 py-5 space-y-3">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.07 }}
                    onClick={() => scrollToSection(item.href)}
                    className="block w-full text-left font-mono text-sm font-semibold tracking-widest py-2 transition-colors duration-200"
                    style={{ color: 'rgba(0,245,255,0.7)', letterSpacing: '0.12em' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#00F5FF')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(0,245,255,0.7)')}
                  >
                    <span style={{ color: '#00FF41' }}>{'> '}</span>{item.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}