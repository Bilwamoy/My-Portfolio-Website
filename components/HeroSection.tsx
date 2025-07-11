'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, type Variants } from 'framer-motion';
import { gsap } from 'gsap';
import { PERSONAL_INFO } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { ChevronRight, Download, Mail } from 'lucide-react';
import TypewriterEffect from '@/components/animations/TypewriterEffect';

const HeroSection: React.FC = () => {
  const imageRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // GSAP animations for enhanced effects
    if (imageRef.current && nameRef.current && titleRef.current) {
      const tl = gsap.timeline();
      
      // Image entrance with bounce
      tl.fromTo(imageRef.current, 
        { 
          scale: 0, 
          rotation: -180,
          opacity: 0 
        },
        { 
          scale: 1, 
          rotation: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'back.out(1.7)',
        }
      );

      // Name text with stagger effect
      tl.fromTo(nameRef.current.children,
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out'
        },
        '-=0.5'
      );

      // Floating animation for image
      gsap.to(imageRef.current, {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut',
        delay: 1.5
      });
    }
  }, []);

  const headerVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        type: 'spring',
        stiffness: 100,
        damping: 20,
      },
    }),
  };

  const buttonVariants = {
    hover: { 
      scale: 1.05,
      boxShadow: '0 10px 25px rgba(14, 165, 233, 0.3)',
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.95 }
  };

  return (
    <div className="font-sora relative">
      {/* Animated background elements */}
      <div className="absolute -top-20 -left-20 w-40 h-40 bg-sky-400/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-purple-400/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="flex flex-col lg:flex-row items-center gap-8 relative z-10"
      >
        {/* Enhanced Profile Image */}
        <div ref={imageRef} className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-sky-400 to-purple-500 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative">
            <Image
              src="/me.png"
              alt="Your Name"
              width={180}
              height={180}
              className="rounded-full border-4 border-white dark:border-slate-800 object-cover shadow-2xl relative z-10 group-hover:scale-105 transition-transform duration-300"
            />
            {/* Animated ring */}
            <div className="absolute inset-0 rounded-full border-2 border-sky-400 animate-spin" style={{ animationDuration: '8s' }} />
          </div>
        </div>

        <div className="text-center lg:text-left">
          <motion.h1
            ref={nameRef}
            custom={0}
            initial="hidden"
            animate="visible"
            variants={headerVariants}
            className="text-4xl font-bold tracking-tight text-slate-800 dark:text-slate-200 sm:text-6xl font-orbitron mb-2"
          >
            <span className="inline-block">Hi,</span>{' '}
            <span className="inline-block">I'm</span>{' '}
            <span className="inline-block bg-gradient-to-r from-sky-400 to-purple-500 bg-clip-text text-transparent">
              {PERSONAL_INFO.name}
            </span>
          </motion.h1>
          
          <motion.div
            custom={1}
            initial="hidden"
            animate="visible"
            variants={headerVariants}
            className="mt-4 text-xl font-medium tracking-tight text-slate-700 dark:text-slate-200 sm:text-2xl"
          >
            <TypewriterEffect
              texts={[
                'Frontend Developer',
                'React Specialist',
                'UI/UX Enthusiast',
                'Problem Solver'
              ]}
              className="text-sky-500 dark:text-sky-400"
            />
          </motion.div>
        </div>
      </motion.div>

      <motion.p
        custom={2}
        initial="hidden"
        animate="visible"
        variants={headerVariants}
        className="mt-8 max-w-2xl leading-relaxed text-slate-600 dark:text-slate-300 text-lg"
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
        className="mt-10 flex flex-wrap gap-4"
      >
        <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
          <Button asChild size="lg" className="bg-gradient-to-r from-sky-500 to-purple-500 hover:from-sky-600 hover:to-purple-600">
            <a href="#projects" className="flex items-center gap-2">
              View My Work <ChevronRight className="h-5 w-5" />
            </a>
          </Button>
        </motion.div>
        
        <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
          <Button variant="outline" asChild size="lg">
            <a href="#contact" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Contact Me
            </a>
          </Button>
        </motion.div>
        
        <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
          <Button variant="outline" asChild size="lg">
            <a href="#resume" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Download Resume
            </a>
          </Button>
        </motion.div>
      </motion.div>

      <motion.ul
        custom={4}
        initial="hidden"
        animate="visible"
        variants={headerVariants}
        className="ml-1 mt-12 flex items-center justify-center lg:justify-start gap-6"
        aria-label="Social media"
      >
        {PERSONAL_INFO.socials.map((social, index) => (
          <li key={social.name} className="shrink-0">
            <motion.a
              whileHover={{ 
                y: -5, 
                scale: 1.2,
                rotate: 5,
                boxShadow: '0 10px 20px rgba(14, 165, 233, 0.3)'
              }}
              whileTap={{ scale: 0.9 }}
              href={social.url}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={social.name}
              className="flex items-center justify-center w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-sky-500 dark:hover:text-sky-400 transition-colors shadow-lg hover:shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + index * 0.1 }}
            >
              <span className="sr-only">{social.name}</span>
              <social.icon className="h-6 w-6" />
            </motion.a>
          </li>
        ))}
      </motion.ul>

      {/* Decorative elements */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -z-10">
        <div className="w-96 h-96 bg-gradient-to-r from-sky-400/5 to-purple-500/5 rounded-full blur-3xl" />
      </div>
    </div>
  );
};

export default HeroSection;
