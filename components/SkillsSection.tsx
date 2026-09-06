'use client';

import React from 'react';
import { motion, type Variants } from 'framer-motion';
import Section from './Section';
import { SKILLS } from '@/lib/constants';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 15 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 260, damping: 20 },
  },
};

const SkillsSection: React.FC = () => {
  return (
    <Section id="skills" title="Technical Toolkit">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {SKILLS.map((category, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="p-6 rounded-2xl bg-white/40 dark:bg-slate-900/40 border border-slate-200/80 dark:border-slate-800 backdrop-blur-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            <h3 className="font-syne font-bold text-lg text-slate-900 dark:text-slate-100 mb-5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-sky-400 group-hover:scale-150 transition-transform" />
              {category.title}
            </h3>
            <ul className="flex flex-wrap gap-2.5">
              {category.skills.map((skill, i) => (
                <motion.li
                  key={i}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/80 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 text-xs font-semibold px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700/60 shadow-sm hover:border-sky-500/50 hover:text-sky-500 dark:hover:text-sky-300 transition-colors flex items-center space-x-2.5 cursor-default"
                >
                  {skill.icon && <skill.icon className="w-4 h-4 text-sky-500 dark:text-sky-400" />}
                  <span>{skill.name}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
};

export default SkillsSection;