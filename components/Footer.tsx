'use client';

import React from 'react';
import FeedbackSection from './FeedbackSection';
import { PERSONAL_INFO } from '@/lib/constants';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  return (
    <footer className="max-w-md pb-16 text-sm text-slate-600 dark:text-slate-500 sm:pb-0">
      <FeedbackSection />
      <ul className="ml-1 mt-10 flex items-center" aria-label="Social media">
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
      </ul>
      <p>
        Loosely designed in{' '}
        <a
          href="https://www.figma.com"
          className="font-medium text-slate-700 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 focus-visible:text-sky-600 dark:focus-visible:text-sky-400"
          target="_blank"
          rel="noreferrer noopener"
        >
          Figma
        </a>{' '}
        and coded in{' '}
        <a
          href="https://code.visualstudio.com/"
          className="font-medium text-slate-700 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 focus-visible:text-sky-600 dark:focus-visible:text-sky-400"
          target="_blank"
          rel="noreferrer noopener"
        >
          Visual Studio Code
        </a>{' '}
        by yours truly -- Joy . Built with{' '}
        <a
          href="https://nextjs.org/"
          className="font-medium text-slate-700 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 focus-visible:text-sky-600 dark:focus-visible:text-sky-400"
          target="_blank"
          rel="noreferrer noopener"
        >
          Next.js
        </a>{' '}
        and{' '}
        <a
          href="https://tailwindcss.com/"
          className="font-medium text-slate-700 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 focus-visible:text-sky-600 dark:focus-visible:text-sky-400"
          target="_blank"
          rel="noreferrer noopener"
        >
          Tailwind CSS
        </a>
        .
      </p>
    </footer>
  );
};

export default Footer;
