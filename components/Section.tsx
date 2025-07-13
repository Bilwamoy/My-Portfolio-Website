'use client';

import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface SectionProps {
  id: string;
  title: string;
  children: ReactNode;
}

const Section: React.FC<SectionProps> = ({ id, title, children }) => {
  return (
    <section id={id} className="py-24 border-t border-slate-300/30 dark:border-slate-800">
      <div className="mb-8">
        <h2 className="text-sm font-bold uppercase tracking-widest text-slate-600 dark:text-slate-500">
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
};

export default Section;
