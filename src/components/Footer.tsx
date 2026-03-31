import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowUp, Terminal } from "lucide-react";

const socialLinks = [
  { icon: Github, href: "https://github.com/chaudhariGaurav07", label: "GITHUB" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/gaurav-chaudhari-b20176227/", label: "LINKEDIN" },
  { icon: Mail, href: "mailto:gauravchaudhari7717@example.com", label: "EMAIL" },
];

const quickLinks = [
  { label: "ABOUT", href: "#about" },
  { label: "EXPERIENCE", href: "#experience" },
  { label: "PROJECTS", href: "#projects" },
  { label: "BLOG", href: "#blog" },
  { label: "CONTACT", href: "#contact" },
];

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const scrollToSection = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer style={{ background: 'rgba(9,12,16,0.95)', borderTop: '1px solid rgba(0,245,255,0.08)' }}>
      <div className="container-custom px-4 py-10">
        <div className="grid md:grid-cols-3 gap-8 mb-8">

          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded flex items-center justify-center"
                style={{ background: 'rgba(0,245,255,0.1)', border: '1px solid rgba(0,245,255,0.25)' }}>
                <Terminal className="w-4 h-4" style={{ color: '#00F5FF' }} />
              </div>
              <span className="font-mono text-sm font-semibold" style={{ color: '#00F5FF' }}>
                user@portfolio<span style={{ color: '#00FF41' }}>:~$</span>
              </span>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: 'rgba(232,237,243,0.4)', fontFamily: 'Inter, sans-serif' }}>
              Full Stack Developer with a passion for delivering high-impact digital experiences through clean, efficient code and thoughtful design.
            </p>
            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-9 h-9 rounded flex items-center justify-center transition-all duration-200"
                  style={{ color: 'rgba(0,245,255,0.5)', border: '1px solid rgba(0,245,255,0.15)', background: 'rgba(0,245,255,0.03)' }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.color = '#00F5FF';
                    el.style.borderColor = 'rgba(0,245,255,0.4)';
                    el.style.boxShadow = '0 0 12px rgba(0,245,255,0.25)';
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.color = 'rgba(0,245,255,0.5)';
                    el.style.borderColor = 'rgba(0,245,255,0.15)';
                    el.style.boxShadow = 'none';
                  }}
                  aria-label={label}
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-4"
          >
            <h3 className="font-mono text-xs tracking-widest" style={{ color: 'rgba(0,245,255,0.5)' }}>
              QUICK_LINKS
            </h3>
            <nav className="flex flex-col gap-2">
              {quickLinks.map((link) => (
                <motion.button
                  key={link.label}
                  onClick={() => scrollToSection(link.href)}
                  whileHover={{ x: 6 }}
                  className="font-mono text-xs text-left transition-colors duration-200"
                  style={{ color: 'rgba(232,237,243,0.4)' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#00F5FF')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(232,237,243,0.4)')}
                >
                  <span style={{ color: '#00FF41', marginRight: '6px' }}>{'>'}</span>{link.label}
                </motion.button>
              ))}
            </nav>
          </motion.div>

          {/* Built With */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="font-mono text-xs tracking-widest" style={{ color: 'rgba(0,245,255,0.5)' }}>
              BUILT_WITH
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Vite"].map((tech) => (
                <span key={tech} className="tag-cyan" style={{ fontSize: '0.65rem' }}>{tech}</span>
              ))}
            </div>
            <p className="font-mono text-xs" style={{ color: 'rgba(232,237,243,0.3)' }}>
              // This portfolio is open source on GitHub.
            </p>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex items-center justify-between pt-6"
          style={{ borderTop: '1px solid rgba(0,245,255,0.06)' }}
        >
          <p className="font-mono text-xs" style={{ color: 'rgba(232,237,243,0.25)' }}>
            <span style={{ color: 'rgba(0,245,255,0.3)' }}>// </span>
            © {new Date().getFullYear()} Terminal_Portfolio_v1.0 — Gaurav Chaudhari
          </p>
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            className="w-9 h-9 rounded flex items-center justify-center transition-all duration-200"
            style={{ color: 'rgba(0,245,255,0.5)', border: '1px solid rgba(0,245,255,0.15)', background: 'rgba(0,245,255,0.03)' }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.color = '#00F5FF';
              el.style.borderColor = 'rgba(0,245,255,0.4)';
              el.style.boxShadow = '0 0 12px rgba(0,245,255,0.25)';
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement;
              el.style.color = 'rgba(0,245,255,0.5)';
              el.style.borderColor = 'rgba(0,245,255,0.15)';
              el.style.boxShadow = 'none';
            }}
          >
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </div>
    </footer>
  );
}
