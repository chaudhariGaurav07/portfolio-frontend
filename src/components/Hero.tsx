import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Github, Linkedin, Mail, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  SiReact,
  SiTypescript,
  SiNextdotjs,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiAmazon,
  SiVercel,
  SiGit,
  SiGithub,
} from 'react-icons/si';

const techIcons = [
  SiReact,
  SiTypescript,
  SiNextdotjs,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiAmazon,
  SiVercel,
  SiGit,
  SiGithub,
];

const roles = [
  'Full Stack Developer',
  'Open Source Contributor', 
  'Tech Explorer',
  'Problem Solver'
];

export default function Hero() {
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const role = roles[currentRole];
    let charIndex = 0;
    const typeInterval = setInterval(() => {
      if (isTyping) {
        if (charIndex < role.length) {
          setDisplayText(role.slice(0, charIndex + 1));
          charIndex++;
        } else {
          setIsTyping(false);
          setTimeout(() => {
            setIsTyping(true);
            charIndex = 0;
            setCurrentRole((prev) => (prev + 1) % roles.length);
          }, 2000);
        }
      }
    }, 100);
    return () => clearInterval(typeInterval);
  }, [currentRole, isTyping]);

  const scrollToAbout = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated Icon Background */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {techIcons.map((Icon, index) => {
          const duration = 8 + Math.random() * 4;
          const delay = Math.random() * 2;
          const size = 24 + Math.random() * 24;
          const xStart = Math.random() * 100;
          const xEnd = Math.random() * 100;

          return (
            <motion.div
              key={index}
              className="absolute text-primary/20"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${xStart}%`,
                fontSize: `${size}px`,
              }}
              animate={{
                y: [0, -200],
                x: [`${xStart}%`, `${xEnd}%`],
                opacity: [0.2, 1, 0.2],
                rotate: [0, 360],
              }}
              transition={{
                duration,
                delay,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut',
              }}
            >
              <Icon />
            </motion.div>
          );
        })}
      </div>

      {/* Main Content */}
      <div className="container-custom px-4 text-center relative z-10">
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="mb-8 flex justify-center"
          >
            <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center shadow-3d">
              <img src="logo.png" className="w-19 h-19 text-primary-foreground" />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            <span className="gradient-text">Gaurav</span>{' '}
            <span className="text-foreground">Chaudhari</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-xl md:text-2xl text-muted-foreground mb-8 h-8"
          >
            <span className="font-medium">
              {displayText}
              <span className="typing animate-pulse">|</span>
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-lg text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed italic"
          >
            Passionate about creating digital experiences that make a difference. I specialize in building scalable web applications with modern technologies and contributing to open-source projects that help developers worldwide.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <Button
              size="lg"
              className="btn-3d text-lg px-8 py-4"
              onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View My Work
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 py-4 border-primary/30 hover:border-primary bg-transparent"
              onClick={() => window.open('https://drive.google.com/file/d/1B9jn6_-sWrIQ4-_jnNzUA34QfyA-ewZA/view', '_blank')}
            >
              <Download className="w-5 h-5 mr-2" />
              Download CV
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="flex justify-center space-x-6 mb-16"
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
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className="w-12 h-12 bg-card/50 border border-border/50 rounded-lg flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-300 backdrop-blur-sm"
                aria-label={label}
              >
                <Icon className="w-6 h-6" />
              </motion.a>
            ))}
          </motion.div>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            onClick={scrollToAbout}
            className="group cursor-pointer"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex flex-col items-center text-muted-foreground group-hover:text-primary transition-colors duration-300"
            >
              <span className="text-sm font-medium mb-2">Scroll Down</span>
              <ChevronDown className="w-6 h-6" />
            </motion.div>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
