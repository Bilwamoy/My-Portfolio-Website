'use client';

import React from 'react';
import Section from './Section';
import { PERSONAL_INFO, EDUCATION } from '@/lib/constants';

const AboutSection: React.FC = () => {
  return (
    <Section id="about" title="About">
      <p className="mb-4">
        {PERSONAL_INFO.objective}
      </p>
      <div className="mt-8">
        <h3 className="text-lg font-bold text-slate-200 mb-4">Education</h3>
        {EDUCATION.map((edu, index) => (
          <div key={index} className="mb-4">
            <p className="font-semibold text-sky-400">{edu.degree}</p>
            <p className="text-slate-300">{edu.institution}</p>
            <p className="text-sm">{edu.period}</p>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default AboutSection;
