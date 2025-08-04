import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Github, Linkedin, Mail, User } from 'lucide-react';

const Hero: React.FC = () => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const texts = [
    'Full Stack Developer',
    'Open Source Contributor',
    'Tech Explorer',
    'Problem Solver'
  ];

  useEffect(() => {
    const timeout = setTimeout(() => {
      const current = texts[currentIndex];
      
      if (isDeleting) {
        setCurrentText(current.substring(0, currentText.length - 1));
        
        if (currentText === '') {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % texts.length);
        }
      } else {
        setCurrentText(current.substring(0, currentText.length + 1));
        
        if (currentText === current) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [currentText, currentIndex, isDeleting, texts]);

  const scrollToNext = () => {
    const element = document.querySelector('#tech-stack');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
  id="hero"
  className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 relative overflow-hidden"
>
  {/* Animated Background */}
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute -top-40 -right-40 w-72 h-72 sm:w-80 sm:h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
    <div className="absolute -bottom-40 -left-40 w-72 h-72 sm:w-80 sm:h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
    <div className="absolute top-40 left-40 w-72 h-72 sm:w-80 sm:h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
  </div>

  <div className="max-w-4xl mx-auto text-center relative z-10 space-y-8">
    {/* Profile Icon */}
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
      className="relative mx-auto w-24 h-24 sm:w-32 sm:h-32"
    >
      <div className="w-full h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-2xl">
        <User size={36} className="text-white sm:size-12" />
      </div>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 border-4 border-dashed border-blue-400 rounded-full"
      />
    </motion.div>

    {/* Name */}
    <motion.h1
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white"
    >
      Gaurav{' '}
      <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Chaudhari
      </span>
    </motion.h1>

    {/* Typing Text */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6 }}
      className="h-12 sm:h-16 flex items-center justify-center"
    >
      <h2 className="text-lg sm:text-2xl md:text-3xl text-gray-600 dark:text-gray-300">
        {currentText}
        <span className="animate-pulse">|</span>
      </h2>
    </motion.div>

    {/* Bio */}
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
      className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl sm:max-w-3xl mx-auto leading-relaxed"
    >
      Passionate developer crafting digital experiences with modern technologies. 
      I love building scalable applications and contributing to open-source projects 
      that make a difference in the developer community.
    </motion.p>

    {/* Social Icons */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
      className="flex justify-center space-x-4 sm:space-x-6"
    >
      {[
        { icon: Github, href: 'https://github.com/gaurav', label: 'GitHub' },
        { icon: Linkedin, href: 'https://linkedin.com/in/gaurav', label: 'LinkedIn' },
        { icon: Mail, href: 'mailto:gaurav@example.com', label: 'Email' }
      ].map(({ icon: Icon, href, label }) => (
        <motion.a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
        >
          <Icon size={22} />
        </motion.a>
      ))}
    </motion.div>

    {/* CTA Buttons */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2 }}
      className="flex flex-col sm:flex-row gap-4 justify-center items-center"
    >
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
        className="w-full sm:w-auto px-6 py-2 sm:px-8 sm:py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
      >
        View My Work
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
        className="w-full sm:w-auto px-6 py-2 sm:px-8 sm:py-3 border-2 border-blue-600 text-blue-600 dark:text-blue-400 rounded-full font-semibold hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white transition-all duration-300"
      >
        Get In Touch
      </motion.button>
    </motion.div>

    {/* Scroll Down Arrow */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5 }}
      className="absolute  left-1/2 transform -translate-x-1/2"
    >
      <motion.button
        onClick={scrollToNext}
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors duration-300 "
      >
        <ChevronDown size={28} />
      </motion.button>
    </motion.div>
  </div>
</section>

  );
};

export default Hero;