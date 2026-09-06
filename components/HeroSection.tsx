'use client';

import React, { useState, useEffect } from 'react';
import { motion, type Variants } from 'framer-motion';
import { useTheme } from 'next-themes';
import { PERSONAL_INFO } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

import Image from 'next/image';

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
      <span className="text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 bg-clip-text font-bold drop-shadow-lg" style={{ fontFamily: 'var(--font-space-grotesk), sans-serif', textShadow: '0 0 10px rgba(59, 130, 246, 0.5)' }}>
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
  
  // Define colors for glassmorphism
  const glowColor = theme === 'dark' ? 'rgba(56, 189, 248, 0.4)' : 'rgba(14, 165, 233, 0.3)';
  const circleColor = theme === 'dark' ? '#38bdf8' : '#0ea5e9';
  
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Main container with glassmorphism glowing effect */}
      <div className={`relative rounded-full p-1 profile-container`}>
        {/* Spinning circle */}
        <div 
          className="absolute inset-0 rounded-full spinning-circle"
          style={{
            background: `conic-gradient(from 0deg, transparent, ${circleColor}, transparent, ${circleColor}, transparent)`,
            animation: 'spin 4s linear infinite'
          }}
        />
        
        {/* Inner glow circle */}
        <div 
          className="absolute inset-2 rounded-full opacity-60"
          style={{
            background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
            animation: 'pulse 3s ease-in-out infinite'
          }}
        />
        
        {/* Image container */}
        <div className={`relative rounded-full p-2 bg-white/10 dark:bg-black/20 backdrop-blur-md overflow-hidden border border-white/20 dark:border-white/10`}>
          <Image 
            src="/me.png" 
            alt="A portrait of Bilwamoy Chakraborty, the developer."
            width={150}
            height={150}
            className={`${size} rounded-full object-cover relative z-10 transition-transform duration-500 hover:scale-110`}
            style={{
              border: 'none',
              outline: 'none',
              mixBlendMode: theme === 'dark' ? 'screen' : 'multiply'
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
          backdrop-filter: blur(12px);
          background: rgba(255, 255, 255, 0.05);
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
          animation-duration: 1.5s;
        }
        
        .profile-container:hover .afterglow {
          animation-duration: 2s;
        }
      `}</style>
    </div>
  );
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const HeroSection: React.FC = () => {
  const typingTexts = [
    "Creative Full-Stack Developer",
    "Interactive UI Designer", 
    "Adaptive Learner"
  ];

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center text-center gap-6 sm:gap-8 md:flex-row md:items-center md:text-left">
      <ProfileImage 
        size="w-[140px] h-[140px] md:w-[180px] md:h-[180px]"
        className="shrink-0"
      />
      <div className="w-full max-w-2xl">
        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight text-slate-900 dark:text-slate-100 font-syne break-words"
        >
          <a href="/" className="hover:text-sky-400 transition-colors">{PERSONAL_INFO.name}</a>
        </motion.h1>
        <motion.h2
          variants={itemVariants}
          className="mt-2 text-lg sm:text-xl md:text-2xl font-medium tracking-tight text-slate-700 dark:text-slate-200"
        >
          <TypingAnimation texts={typingTexts} />
        </motion.h2>
        <motion.p
          variants={itemVariants}
          className="mt-4 max-w-xl md:max-w-none mx-auto md:mx-0 leading-relaxed text-slate-600 dark:text-slate-300 text-base"
        >
          I&apos;m a passionate and results-driven Frontend Developer with a knack
          for creating dynamic and user-friendly web applications. I specialize in
          React and Next.js, and I&apos;m always eager to learn new technologies
          and take on challenging projects.
        </motion.p>
      </div>
    </motion.div>
  );
};

export default HeroSection;