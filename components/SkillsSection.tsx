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
      {SKILLS.map((category, index) => (
        <div key={index} className="mb-8">
          <motion.h3
            className="text-lg font-bold text-slate-200 mb-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.8 }}
            variants={itemVariants}
          >
            {category.title}
          </motion.h3>
          <motion.div
            className="flex flex-wrap gap-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
          >
            {category.skills.map((skill, skillIndex) => (
              <motion.div
                key={skillIndex}
                className="bg-slate-800 text-sky-300 text-sm font-medium px-4 py-2 rounded-full shadow-md border border-slate-700 hover:bg-sky-400/10 hover:border-sky-400 transition-all cursor-default"
                variants={itemVariants}
                whileHover={{ y: -3, transition: { type: 'spring', stiffness: 300 } }}
              >
                {skill}
              </motion.div>
            ))}
          </motion.div>
        </div>
      ))}
      <div className="mt-12">
        <motion.h3 
            className="text-lg font-bold text-slate-200 mb-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.8 }}
            variants={itemVariants}
        >
            Soft Skills
        </motion.h3>
        <motion.ul
          className="list-disc list-inside space-y-2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          {SOFT_SKILLS.map((skill, index) => (
            <motion.li key={index} variants={itemVariants}>{skill}</motion.li>
          ))}
        </motion.ul>
      </div>
    </Section>
  );
};

export default SkillsSection;
