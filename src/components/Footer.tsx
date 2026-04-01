import { motion } from "framer-motion";
import { Github, Linkedin, Twitter } from "lucide-react";

const socialLinks = [
  { icon: Github, href: "https://github.com/chaudhariGaurav07", label: "GITHUB" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/gaurav-chaudhari-b20176227/", label: "LINKEDIN" },
  { icon: Twitter, href: "https://twitter.com/", label: "TWITTER" },
];

export default function Footer() {
  return (
    <footer
      className="grid-bg"
      style={{
        background: 'rgba(9,12,16,0.98)',
        borderTop: '1px solid rgba(0,245,255,0.06)',
      }}
    >
      <div className="container-custom px-4 py-12 flex flex-col items-center gap-6 text-center">

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.15, margin: "-60px" }}
          transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-10"
        >
          {socialLinks.map(({ icon: Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2 }}
              className="flex items-center gap-2 font-mono text-xs tracking-widest transition-colors duration-200"
              style={{ color: 'rgba(232,237,243,0.3)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'rgba(232,237,243,0.75)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(232,237,243,0.3)')}
            >
              <Icon className="w-3.5 h-3.5" />
              {label}
            </motion.a>
          ))}
        </motion.div>

        {/* Copyright */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.15, margin: "-60px" }}
          transition={{ duration: 1.0, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-mono text-xs"
          style={{ color: 'rgba(232,237,243,0.2)' }}
        >
          © {new Date().getFullYear()} TERMINAL_EDITORIAL_SYSTEM_V.1.0
        </motion.p>

        {/* System Status Line */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.15, margin: "-60px" }}
          transition={{ duration: 1.0, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="font-mono text-xs"
          style={{ color: 'rgba(232,237,243,0.18)' }}
        >
          UPTIME: 99.99% | LATENCY: 14MS | LOCATION: 127.0.0.1
        </motion.p>

      </div>
    </footer>
  );
}
