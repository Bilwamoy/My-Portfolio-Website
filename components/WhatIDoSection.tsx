'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Cpu, Sparkles, Database } from 'lucide-react';

export const WhatIDoSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 border-t border-b border-slate-200/50 dark:border-slate-800/60 my-12">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header Tag */}
        <div className="flex items-center gap-2 mb-8 font-mono text-xs text-slate-500 dark:text-slate-400 tracking-widest uppercase">
          <span className="text-sky-400">°</span>
          <span>WHAT I DO</span>
        </div>

        {/* 2-Column Grid matching Screenshot 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Editorial Philosophy Statement */}
          <div className="lg:col-span-7 space-y-6">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-2xl sm:text-3xl md:text-4xl font-normal leading-relaxed text-slate-900 dark:text-slate-100 font-sans tracking-tight"
            >
              I believe great software is not just written or compiled, it is carefully crafted.
              My work lives at the intersection of{' '}
              <span className="italic font-serif font-bold text-sky-600 dark:text-sky-400 underline decoration-sky-400/40 underline-offset-4">
                full-stack architecture
              </span>
              ,{' '}
              <span className="italic font-serif font-bold text-amber-600 dark:text-amber-400 underline decoration-amber-400/40 underline-offset-4">
                artificial intelligence
              </span>
              , and{' '}
              <span className="italic font-serif font-bold text-cyan-600 dark:text-cyan-400 underline decoration-cyan-400/40 underline-offset-4">
                interactive design
              </span>
              , where code forms structure, intelligence enables capabilities, and design quietly brings
              seamless human experiences.
            </motion.h2>

            <div className="flex items-center gap-4 pt-4 text-xs font-mono text-slate-500">
              <span className="w-8 h-px bg-slate-300 dark:bg-slate-700" />
              <span>CRAFTED WITH PRECISION & PASSION</span>
            </div>
          </div>

          {/* Right Column: 2x2 Grid of Domains & Bullet Points */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-8 border-l border-slate-200/60 dark:border-slate-800/80 pl-0 sm:pl-8">
            {/* Domain 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-3"
            >
              <div className="flex items-center gap-2 text-sky-500 dark:text-sky-400">
                <Layers className="w-5 h-5" />
                <h3 className="font-serif italic font-bold text-lg text-slate-900 dark:text-slate-100">
                  Full-Stack
                </h3>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400 font-mono">
                <li>• React 19 & Next.js 16</li>
                <li>• Node.js & Express APIs</li>
                <li>• MongoDB & Mongoose</li>
                <li>• Scalable E-commerce</li>
              </ul>
            </motion.div>

            {/* Domain 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-3"
            >
              <div className="flex items-center gap-2 text-amber-500 dark:text-amber-400">
                <Cpu className="w-5 h-5" />
                <h3 className="font-serif italic font-bold text-lg text-slate-900 dark:text-slate-100">
                  AI & Audio ML
                </h3>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400 font-mono">
                <li>• Zero-Shot Voice (Voicer)</li>
                <li>• Demucs, HuBERT & HiFi-GAN</li>
                <li>• RAG Document Grounding</li>
                <li>• Knowledge Graph Visuals</li>
              </ul>
            </motion.div>

            {/* Domain 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="space-y-3"
            >
              <div className="flex items-center gap-2 text-cyan-500 dark:text-cyan-400">
                <Sparkles className="w-5 h-5" />
                <h3 className="font-serif italic font-bold text-lg text-slate-900 dark:text-slate-100">
                  Creative Motion
                </h3>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400 font-mono">
                <li>• Framer Motion & GSAP</li>
                <li>• Three.js 3D WebGL Canvas</li>
                <li>• Claymorphism Systems</li>
                <li>• Physics Micro-UI</li>
              </ul>
            </motion.div>

            {/* Domain 4 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="space-y-3"
            >
              <div className="flex items-center gap-2 text-emerald-500 dark:text-emerald-400">
                <Database className="w-5 h-5" />
                <h3 className="font-serif italic font-bold text-lg text-slate-900 dark:text-slate-100">
                  Core Engineering
                </h3>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400 font-mono">
                <li>• Data Structures & Algorithms</li>
                <li>• DBMS & Relational SQL</li>
                <li>• Object-Oriented Design</li>
                <li>• High-Performance Code</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatIDoSection;
