'use client';

import React, { ReactNode, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface SectionProps {
  id: string;
  title: string;
  children: ReactNode;
}

const Section: React.FC<SectionProps> = ({ id, title, children }) => {
  const ref = useRef<HTMLElement | null>(null);

  // Keep behavior identical while adding a data attribute for GSAP hooks
  useEffect(() => {
    if (ref.current) {
      ref.current.setAttribute('data-animate', 'fade-up');
    }
  }, []);

  return (
    <section ref={ref} id={id} className="py-24 border-t border-slate-300/30 dark:border-slate-800">
      <div className="mb-8">
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="text-sm font-bold uppercase tracking-widest text-slate-600 dark:text-slate-500">
          {title}
        </motion.h2>
      </div>
      {children}
    </section>
  );
};

export default Section;
