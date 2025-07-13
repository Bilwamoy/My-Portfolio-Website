'use client';

import React, { useState, useEffect } from 'react';
import { motion, type Variants } from 'framer-motion';
import { useTheme } from 'next-themes';
import { PERSONAL_INFO } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

// Typing Animation Component
interface TypingAnimationProps {
  texts: string[];
  className?: string;
}

const TypingAnimation: React.FC<TypingAnimationProps> = ({ texts, className = '' }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const typeSpeed = isDeleting ? 50 : 100;
    const pauseTime = isDeleting ? 500 : 2000;

    const timer = setTimeout(() => {
      if (!isDeleting && charIndex < texts[currentTextIndex].length) {
        // Typing
        setCurrentText(texts[currentTextIndex].slice(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      } else if (isDeleting && charIndex > 0) {
        // Deleting
        setCurrentText(texts[currentTextIndex].slice(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      } else if (!isDeleting && charIndex === texts[currentTextIndex].length) {
        // Finished typing, start deleting after pause
        setTimeout(() => setIsDeleting(true), pauseTime);
      } else if (isDeleting && charIndex === 0) {
        // Finished deleting, move to next text
        setIsDeleting(false);
        setCurrentTextIndex((prev) => (prev + 1) % texts.length);
      }
    }, typeSpeed);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, currentTextIndex, texts]);

  return (
    <span className={className}>
      <span className="text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 bg-clip-text font-bold drop-shadow-lg" style={{ fontFamily: 'Algerian, serif', textShadow: '0 0 10px rgba(59, 130, 246, 0.5)' }}>
        {currentText}
      </span>
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
        className="inline-block w-0.5 h-6 bg-gradient-to-b from-cyan-400 to-blue-600 ml-1"
        style={{ boxShadow: '0 0 8px rgba(59, 130, 246, 0.8)' }}
      />
    </span>
  );
};

// Enhanced Profile Image Component
const ProfileImage = ({ className = '', size = 'w-[150px] h-[150px]' }) => {
  const { theme } = useTheme();
  
  // Define colors based on theme to match the background
  const bgColor = theme === 'dark' ? 'bg-slate-900' : 'bg-white';
  const imageBgColor = theme === 'dark' ? '#1e293b' : '#ffffff';
  const glowColor = theme === 'dark' ? 'rgba(56, 189, 248, 0.3)' : 'rgba(34, 197, 94, 0.3)';
  const circleColor = theme === 'dark' ? '#38bdf8' : '#22c55e';
  
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Main container with glass effect */}
      <div className={`relative ${bgColor} rounded-full p-1 profile-container`}>
        {/* Spinning circle */}
        <div 
          className="absolute inset-0 rounded-full spinning-circle"
          style={{
            background: `conic-gradient(from 0deg, transparent, ${circleColor}, transparent, ${circleColor}, transparent)`,
            animation: 'spin 3s linear infinite'
          }}
        />
        
        {/* Inner glow circle */}
        <div 
          className="absolute inset-2 rounded-full opacity-60"
          style={{
            background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
            animation: 'pulse 2s ease-in-out infinite'
          }}
        />
        
        {/* Image container with glass effect */}
        <div className={`relative ${bgColor} rounded-full p-2 glass-effect`}>
          <img 
            src="/me.png" 
            alt="Profile" 
            className={`${size} rounded-full object-cover relative z-10`}
            style={{
              border: 'none',
              outline: 'none',
              backgroundColor: imageBgColor,
              mixBlendMode: theme === 'dark' ? 'normal' : 'multiply'
            }}
          />
          
          {/* Afterglow overlay */}
          <div 
            className="absolute inset-0 rounded-full afterglow"
            style={{
              background: `radial-gradient(circle at 30% 30%, ${glowColor} 0%, transparent 50%)`,
              mixBlendMode: 'overlay'
            }}
          />
        </div>
      </div>
      
      {/* CSS Keyframes and Styles */}
      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 0.6;
            transform: scale(1);
          }
          50% {
            opacity: 0.9;
            transform: scale(1.05);
          }
        }
        
        @keyframes afterglow {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.7;
          }
        }
        
        .profile-container {
          box-shadow: 0 0 30px ${glowColor};
          backdrop-filter: blur(10px);
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .glass-effect {
          backdrop-filter: blur(20px);
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.3);
          box-shadow: 
            inset 0 1px 0 rgba(255, 255, 255, 0.2),
            0 10px 30px rgba(0, 0, 0, 0.1);
        }
        
        .spinning-circle {
          padding: 2px;
          filter: blur(1px);
        }
        
        .afterglow {
          animation: afterglow 3s ease-in-out infinite;
          pointer-events: none;
        }
        
        /* Hover effects */
        .profile-container:hover {
          transform: scale(1.02);
          transition: transform 0.3s ease;
        }
        
        .profile-container:hover .spinning-circle {
          animation-duration: 1s;
        }
        
        .profile-container:hover .afterglow {
          animation-duration: 1.5s;
        }
      `}</style>
    </div>
  );
};

const HeroSection: React.FC = () => {
  const typingTexts = [
    "Creative Full-Stack Developer",
    "Interactive UI Designer", 
    "Adaptive Learner"
  ];

  const headerVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        type: 'spring',
        stiffness: 100,
        damping: 20,
      },
    }),
  };

  return (
    <div className="font-sora">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-8"
      >
        <ProfileImage 
          size="w-[150px] h-[150px]"
          className="shrink-0"
        />
        <div>
          <motion.h1
            custom={0}
            initial="hidden"
            animate="visible"
            variants={headerVariants}
            className="text-4xl font-bold tracking-tight text-slate-800 dark:text-slate-200 sm:text-5xl font-orbitron"
          >
            <a href="/">{PERSONAL_INFO.name}</a>
          </motion.h1>
          <motion.h2
            custom={1}
            initial="hidden"
            animate="visible"
            variants={headerVariants}
            className="mt-3 text-lg font-medium tracking-tight text-slate-700 dark:text-slate-200 sm:text-xl"
          >
            <TypingAnimation texts={typingTexts} />
          </motion.h2>
        </div>
      </motion.div>

      <motion.p
        custom={2}
        initial="hidden"
        animate="visible"
        variants={headerVariants}
        className="mt-6 max-w-xl leading-relaxed text-slate-600 dark:text-slate-300"
      >
        I&apos;m a passionate and results-driven Frontend Developer with a knack
        for creating dynamic and user-friendly web applications. I specialize in
        React and Next.js, and I&apos;m always eager to learn new technologies
        and take on challenging projects.
      </motion.p>

      <motion.div
        custom={3}
        initial="hidden"
        animate="visible"
        variants={headerVariants}
        className="mt-8 flex flex-wrap gap-4"
      >
        <Button asChild>
          <a href="#projects">
            View My Work <ChevronRight className="ml-2 h-5 w-5" />
          </a>
        </Button>
        <Button variant="outline" asChild>
          <a href="#contact">Contact Me</a>
        </Button>
        <Button variant="outline" asChild>
          <a href="#resume">View Resume</a>
        </Button>
      </motion.div>

      <motion.ul
        custom={4}
        initial="hidden"
        animate="visible"
        variants={headerVariants}
        className="ml-1 mt-10 flex items-center"
        aria-label="Social media"
      >
        {PERSONAL_INFO.socials.map((social) => (
          <li key={social.name} className="mr-5 shrink-0">
            <motion.a
              whileHover={{ y: -3, scale: 1.1 }}
              href={social.url}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={social.name}
              className="block text-slate-400 hover:text-sky-300 transition-colors"
            >
              <span className="sr-only">{social.name}</span>
              <social.icon className="h-6 w-6" />
            </motion.a>
          </li>
        ))}
      </motion.ul>
    </div>
  );
};

export default HeroSection;