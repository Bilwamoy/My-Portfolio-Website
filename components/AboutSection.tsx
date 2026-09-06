'use client';

import React from 'react';
import Section from './Section';
import { PERSONAL_INFO, EDUCATION } from '@/lib/constants';

const AboutSection: React.FC = () => {
  return (
    <Section id="about" title="About">
      <p className="mb-6 text-lg leading-relaxed text-slate-600 dark:text-slate-300">
        {PERSONAL_INFO.objective}
      </p>
      <div className="mt-12">
        <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-6 font-syne">Education</h3>
        <div className="space-y-4">
          {EDUCATION.map((edu, index) => (
            <div key={index} className="p-5 rounded-2xl bg-white/40 dark:bg-slate-900/40 border border-slate-200/80 dark:border-slate-800/80 backdrop-blur-xl shadow-md">
              <p className="text-lg font-bold text-sky-600 dark:text-sky-400 font-syne">{edu.degree}</p>
              <p className="text-base font-medium text-slate-700 dark:text-slate-300 mt-1">{edu.institution}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default AboutSection;
