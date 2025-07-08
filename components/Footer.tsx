'use client';

import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="max-w-md pb-16 text-sm text-slate-500 sm:pb-0">
      <p>
        Loosely designed in{' '}
        <a
          href="https://www.figma.com"
          className="font-medium text-slate-400 hover:text-sky-400 focus-visible:text-sky-400"
          target="_blank"
          rel="noreferrer noopener"
        >
          Figma
        </a>{' '}
        and coded in{' '}
        <a
          href="https://code.visualstudio.com/"
          className="font-medium text-slate-400 hover:text-sky-400 focus-visible:text-sky-400"
          target="_blank"
          rel="noreferrer noopener"
        >
          Visual Studio Code
        </a>{' '}
        by yours truly -- Joy . Built with{' '}
        <a
          href="https://nextjs.org/"
          className="font-medium text-slate-400 hover:text-sky-400 focus-visible:text-sky-400"
          target="_blank"
          rel="noreferrer noopener"
        >
          Next.js
        </a>{' '}
        and{' '}
        <a
          href="https://tailwindcss.com/"
          className="font-medium text-slate-400 hover:text-sky-400 focus-visible:text-sky-400"
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
