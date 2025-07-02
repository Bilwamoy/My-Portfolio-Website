'use client';

import React from 'react';
import { motion, type Variants } from 'framer-motion';
import { PERSONAL_INFO } from '@/lib/constants';

const HeroSection: React.FC = () => {
    const headerVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i: number) => ({
          opacity: 1,
          y: 0,
          transition: {
            delay: i * 0.1,
            type: 'spring',
            stiffness: 100,
            damping: 20
          }
        })
      };

  return (
    <div className='font-sora'>
      <motion.h1
        custom={0}
        initial="hidden"
        animate="visible"
        variants={headerVariants}
        className="text-4xl font-bold tracking-tight text-slate-200 sm:text-5xl font-orbitron"
      >
        <a href="/">{PERSONAL_INFO.name}</a>
      </motion.h1>
      <motion.h2
        custom={1}
        initial="hidden"
        animate="visible"
        variants={headerVariants}
        className="mt-3 text-lg font-medium tracking-tight text-slate-200 sm:text-xl"
      >
        {PERSONAL_INFO.title}
      </motion.h2>
      <motion.p
        custom={2}
        initial="hidden"
        animate="visible"
        variants={headerVariants}
        className="mt-4 max-w-xs leading-normal"
      >
        I build pixel-perfect, engaging, and accessible digital experiences.
      </motion.p>
      
      <motion.ul
        custom={3}
        initial="hidden"
        animate="visible"
        variants={headerVariants}
        className="ml-1 mt-8 flex items-center"
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
