'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Section from './Section';
import { PROJECTS } from '@/lib/constants';
import type { Project } from '@/lib/types';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Globe, Github, Maximize2 } from 'lucide-react';
import ProjectDrawer from './ProjectDrawer';
import { trackEvent } from '@/lib/tracking';

const FILTER_TAGS = [
  'All',
  'React / Next.js',
  'AI & Audio ML',
  'Tailwind & Motion',
  'Full-Stack & DB',
];

const ProjectCard: React.FC<{ project: Project; onClick: () => void }> = ({ project, onClick }) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.95 }}
    transition={{ duration: 0.3 }}
    className="group relative grid gap-4 pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 cursor-pointer"
    onClick={onClick}
    whileHover={{ y: -4 }}
  >
    {/* Card Glassmorphic Background */}
    <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-2xl transition motion-reduce:transition-none lg:-inset-x-6 lg:block 
                    lg:group-hover:bg-slate-800/40 dark:lg:group-hover:bg-slate-800/40
                    lg:group-hover:backdrop-blur-md lg:group-hover:border lg:group-hover:border-slate-700/50"></div>

    <div className="z-10 sm:col-span-3 relative rounded-xl overflow-hidden border border-slate-200/20 dark:border-slate-800 shadow-md group-hover:shadow-xl transition-all">
      <Image
        src={project.image}
        alt={project.title}
        width={400}
        height={225}
        className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <span className="px-3.5 py-1.5 rounded-full bg-slate-900/90 text-sky-400 text-xs font-mono flex items-center gap-1.5 border border-sky-500/30 shadow-lg">
          <Maximize2 className="w-3.5 h-3.5" /> Expand Details
        </span>
      </div>
    </div>

    <div className="z-10 sm:col-span-5 p-2">
      <h3 className="font-syne font-bold text-xl leading-snug text-slate-900 dark:text-slate-100 group-hover:text-sky-500 dark:group-hover:text-sky-400 transition-colors">
        {project.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300 line-clamp-3">{project.description}</p>

      <div className="mt-4 flex gap-3" onClick={(e) => e.stopPropagation()}>
        {project.liveDemoUrl && project.liveDemoUrl !== '#' && (
          <Button size="sm" className="rounded-full shadow-md" asChild>
            <a href={project.liveDemoUrl} target="_blank" rel="noreferrer noopener">
              <Globe className="mr-2 h-3.5 w-3.5" />
              Live Demo
            </a>
          </Button>
        )}
        {project.githubUrl && project.githubUrl !== '#' && (
          <Button size="sm" variant="outline" className="rounded-full" asChild>
            <a href={project.githubUrl} target="_blank" rel="noreferrer noopener">
              <Github className="mr-2 h-3.5 w-3.5" />
              GitHub
            </a>
          </Button>
        )}
      </div>

      <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Technologies used">
        {project.tags.map((tag, index) => (
          <li key={index}>
            <div className="rounded-full bg-sky-400/10 dark:bg-sky-400/10 px-3 py-0.5 text-xs font-mono font-medium text-sky-600 dark:text-sky-300 border border-sky-400/20">
              {tag}
            </div>
          </li>
        ))}
      </ul>
    </div>
  </motion.div>
);

const ProjectsSection: React.FC = () => {
  const [filter, setFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = useMemo(() => {
    if (filter === 'All') return PROJECTS;
    if (filter === 'React / Next.js') return PROJECTS.filter(p => p.tags.some(t => /react|next/i.test(t)));
    if (filter === 'AI & Audio ML') return PROJECTS.filter(p => p.tags.some(t => /ai|ml|python|audio|hifi|rag|speech/i.test(t)));
    if (filter === 'Tailwind & Motion') return PROJECTS.filter(p => p.tags.some(t => /tailwind|framer|motion|css/i.test(t)));
    if (filter === 'Full-Stack & DB') return PROJECTS.filter(p => p.tags.some(t => /mongodb|firebase|express|node/i.test(t)));
    return PROJECTS.filter(p => p.tags.includes(filter));
  }, [filter]);

  return (
    <Section id="projects" title="Featured Work">
      {/* Category Filter Buttons */}
      <div className="flex flex-wrap gap-2.5 mb-10">
        {FILTER_TAGS.map((tag) => {
          const isActive = filter === tag;
          return (
            <Button
              key={tag}
              size="sm"
              variant={isActive ? 'default' : 'outline'}
              onClick={() => {
                setFilter(tag);
                trackEvent('Project Filter Click', { tag });
              }}
              className={`rounded-full font-mono text-xs transition-all duration-300 ${
                isActive
                  ? 'bg-sky-500 hover:bg-sky-400 text-white font-bold shadow-lg shadow-sky-500/25'
                  : 'hover:border-sky-400/50'
              }`}
            >
              {tag}
            </Button>
          );
        })}
      </div>

      {/* Projects List with Layout Animations */}
      <motion.ul className="space-y-10">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <motion.li key={project.title || index}>
              <ProjectCard project={project} onClick={() => setSelectedProject(project)} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      <ProjectDrawer
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </Section>
  );
};

export default ProjectsSection;