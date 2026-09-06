'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, Code2, Layers, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import type { Project } from '@/lib/types';

interface ProjectDrawerProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectDrawer: React.FC<ProjectDrawerProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-end p-0 sm:p-4 md:p-6 overflow-hidden">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
        />

        {/* Slide-over Drawer Panel */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          className="relative z-10 w-full max-w-3xl h-full sm:h-[92vh] sm:rounded-3xl bg-slate-900 border border-slate-800 text-slate-100 shadow-2xl flex flex-col overflow-hidden"
        >
          {/* Top Bar / Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800 bg-slate-900/90 backdrop-blur-sm sticky top-0 z-20">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-sky-400 animate-pulse" />
              <span className="text-xs font-mono tracking-widest text-slate-400 uppercase">
                PROJECT SPOTLIGHT
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
              aria-label="Close detail modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Content Body */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8">
            {/* Banner Image Preview */}
            <div className="relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden border border-slate-800 shadow-lg group">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-end justify-between gap-4">
                <h2 className="font-syne text-2xl sm:text-4xl font-extrabold text-white leading-tight">
                  {project.title}
                </h2>
              </div>
            </div>

            {/* Description & Overview */}
            <div className="space-y-4">
              <h3 className="text-xs font-mono uppercase tracking-widest text-sky-400 flex items-center gap-2">
                <Layers className="w-4 h-4" /> Overview & Objective
              </h3>
              <p className="text-slate-300 leading-relaxed text-base sm:text-lg">
                {project.description}
              </p>
            </div>

            {/* Tech Stack Badges */}
            <div className="space-y-4 pt-4 border-t border-slate-800">
              <h3 className="text-xs font-mono uppercase tracking-widest text-amber-400 flex items-center gap-2">
                <Code2 className="w-4 h-4" /> Technologies & Architecture
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2 rounded-xl text-xs font-medium bg-slate-800/80 border border-slate-700 text-sky-300 hover:border-sky-500/50 transition-colors shadow-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Key Features Highlights */}
            <div className="space-y-3 pt-4 border-t border-slate-800">
              <h3 className="text-xs font-mono uppercase tracking-widest text-emerald-400 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> Key Capabilities
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-300 font-mono">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Responsive Layout Architecture
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Dynamic Interactive Micro-UI
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Optimized Render Performance
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Clean Modular Code Architecture
                </li>
              </ul>
            </div>
          </div>

          {/* Footer Action Bar */}
          <div className="px-6 py-5 border-t border-slate-800 bg-slate-900/90 backdrop-blur-sm flex items-center justify-between gap-4">
            {project.liveDemoUrl && project.liveDemoUrl !== '#' ? (
              <a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-3 px-5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-sky-500/25"
              >
                <ExternalLink className="w-4 h-4" /> Visit Live Site
              </a>
            ) : null}

            {project.githubUrl && project.githubUrl !== '#' ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-3 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm flex items-center justify-center gap-2 border border-slate-700 transition-all"
              >
                <Github className="w-4 h-4" /> Source Code
              </a>
            ) : null}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProjectDrawer;
