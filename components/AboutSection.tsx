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
        <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-6">Education</h3>
        {EDUCATION.map((edu, index) => (
          <div key={index} className="mb-6">
            <p className="text-xl font-semibold text-sky-600 dark:text-sky-400">{edu.degree}</p>
            <p className="text-lg text-slate-700 dark:text-slate-300">{edu.institution}</p>
            <p className="text-base text-slate-600 dark:text-slate-400">{edu.period}</p>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default AboutSection;
