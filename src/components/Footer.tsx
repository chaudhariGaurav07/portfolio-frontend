import { motion } from "framer-motion";
import { Heart, Code2, Github, Linkedin, Mail, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const socialLinks = [
  { icon: Github, href: "https://github.com/chaudhariGaurav07", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/gaurav-chaudhari-b20176227/", label: "LinkedIn" },
  { icon: Mail, href: "mailto:gauravchaudhari7717@example.com", label: "Email" },
];

const quickLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-card/50 border-t border-border/50 backdrop-blur-sm">
      <div className="container-custom px-4 py-8 sm:py-12">
        <div className="grid md:grid-cols-3 gap-6 sm:gap-8 mb-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-3 sm:space-y-4"
          >
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Code2 className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-base sm:text-lg font-bold gradient-text">
                Gaurav Chaudhari
              </span>
            </div>
            <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
              Full Stack Developer with a passion for delivering high-impact
              digital experiences through clean, efficient code and thoughtful
              design.
            </p>
            <div className="flex space-x-3 sm:space-x-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-9 h-9 sm:w-10 sm:h-10 bg-muted/50 hover:bg-primary border border-border/50 hover:border-primary rounded-lg flex items-center justify-center text-muted-foreground hover:text-primary-foreground transition-all duration-300"
                  aria-label={label}
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
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
            className="space-y-3 sm:space-y-4"
          >
            <h3 className="text-base sm:text-lg font-semibold text-foreground">
              Quick Links
            </h3>
            <nav className="flex flex-col space-y-1.5 sm:space-y-2">
              {quickLinks.map((link) => (
                <motion.button
                  key={link.label}
                  onClick={() => scrollToSection(link.href)}
                  whileHover={{ x: 5 }}
                  className="text-muted-foreground hover:text-primary transition-colors duration-200 text-xs sm:text-sm text-left"
                >
                  {link.label}
                </motion.button>
              ))}
            </nav>
          </motion.div>

          {/* Tech Stack */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-3 sm:space-y-4"
          >
            <h3 className="text-base sm:text-lg font-semibold text-foreground">
              Built With
            </h3>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {[
                "React",
                "TypeScript",
                "Tailwind CSS",
                "Framer Motion",
                "Vite",
              ].map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-0.5 sm:px-3 sm:py-1 bg-primary/10 text-primary rounded-full text-[11px] sm:text-xs font-medium border border-primary/20"
                >
                  {tech}
                </span>
              ))}
            </div>
            <p className="text-muted-foreground text-xs sm:text-sm">
              This portfolio is open source and available on GitHub.
            </p>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="pt-6 sm:pt-8 border-t border-border/50 flex justify-center"
        >
          <div className="flex items-center space-x-2 sm:space-x-4">
            <p className="text-xs sm:text-sm text-muted-foreground">
              © {new Date().getFullYear()} All rights reserved.
            </p>
            <Button
              variant="ghost"
              size="icon"
              onClick={scrollToTop}
              className="w-9 h-9 sm:w-10 sm:h-10 bg-muted/50 hover:bg-primary border border-border/50 hover:border-primary text-muted-foreground hover:text-primary-foreground transition-all duration-300"
            >
              <ArrowUp className="w-4 h-4" />
            </Button>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
