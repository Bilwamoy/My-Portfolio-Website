'use client';

import React from 'react';
import Image from 'next/image';
import { motion, type Variants } from 'framer-motion';
import { PERSONAL_INFO } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

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
        <Image
          src="/me.png"
          alt="Your Name"
          width={150}
          height={150}
          className="rounded-full border-4 border-sky-400 object-cover shadow-lg"
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
            {PERSONAL_INFO.title}
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
