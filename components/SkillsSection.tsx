'use client';

import React from 'react';
import { motion, type Variants } from 'framer-motion';
import Section from './Section';
import { SKILLS, SOFT_SKILLS } from '@/lib/constants';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 200, damping: 20 }
  }
};

const SkillsSection: React.FC = () => {
  return (
    <Section id="skills" title="Skills">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {SKILLS.map((category, index) => (
          <div key={index}>
            <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-4">{category.title}</h3>
            <ul className="flex flex-wrap gap-2">
              {category.skills.map((skill, i) => (
                <li key={i} className="bg-white/30 dark:bg-slate-800 text-slate-700 dark:text-sky-300 text-sm font-medium px-3 py-1 rounded-full border border-slate-300/50 dark:border-transparent backdrop-blur-sm flex items-center space-x-2">
                  {skill.icon && <skill.icon className="w-4 h-4" />}
                  <span>{skill.name}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default SkillsSection;