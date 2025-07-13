'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Section from './Section';
import { PROJECTS } from '@/lib/constants';
import { ArrowUpRightIcon } from '@/components/icons/UtilityIcons';
import type { Project } from '@/lib/types';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Globe, Github } from 'lucide-react';

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => (
  <motion.div
    className="group relative grid gap-4 pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4"
    whileHover={{
      y: -4,
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    }}
    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
  >
    {/* Theme-aware card background */}
    <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-2xl transition motion-reduce:transition-none lg:-inset-x-6 lg:block 
                    lg:group-hover:bg-slate-800/50 dark:lg:group-hover:bg-slate-800/50
                    lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] 
                    lg:group-hover:drop-shadow-lg
                    /* Light mode glassmorphism */
                    lg:group-hover:backdrop-blur-[10px]
                    lg:group-hover:border lg:group-hover:border-white/30
                    lg:group-hover:shadow-[0_8px_32px_0_rgba(31,38,135,0.1)]
                    /* Light mode background */
                    lg:group-hover:bg-white/20 dark:lg:group-hover:bg-slate-800/50"></div>
    <div className="z-10 sm:col-span-3">
      <Image
        src={project.image}
        alt={project.title}
        width={400}
        height={225}
        className="rounded-lg border-2 border-slate-200/10 dark:border-slate-200/10 border-white/30 object-cover shadow-lg"
      />
    </div>
    <div className="z-10 sm:col-span-5 p-4">
      <h3 className="font-medium leading-snug text-slate-800 dark:text-slate-200">
        <div className="inline-flex items-baseline font-medium leading-tight text-slate-800 dark:text-slate-200 hover:text-sky-600 dark:hover:text-sky-300 focus-visible:text-sky-600 dark:focus-visible:text-sky-300 text-base transition-colors">
          <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block"></span>
          <span>{project.title}</span>
        </div>
      </h3>
      <p className="mt-2 text-sm leading-normal text-slate-600 dark:text-slate-300">{project.description}</p>
      <div className="mt-4 flex gap-4">
        {project.liveDemoUrl && (
          <Button asChild>
            <a href={project.liveDemoUrl} target="_blank" rel="noreferrer noopener">
              <Globe className="mr-2 h-4 w-4" />
              Live Demo
            </a>
          </Button>
        )}
        {project.githubUrl && (
          <Button variant="outline" asChild>
            <a href={project.githubUrl} target="_blank" rel="noreferrer noopener">
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </a>
          </Button>
        )}
      </div>
      <ul className="mt-4 flex flex-wrap" aria-label="Technologies used">
        {project.tags.map((tag, index) => (
          <li key={index} className="mr-1.5 mt-2">
            <div className="flex items-center rounded-full bg-sky-400/10 px-3 py-1 text-xs font-medium leading-5 text-sky-300 ">{tag}</div>
          </li>
        ))}
      </ul>
    </div>
  </motion.div>
);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};


const ProjectsSection: React.FC = () => {
  return (
    <Section id="projects" title="Projects">
       <motion.ul
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
       >
        {PROJECTS.map((project, index) => (
          <motion.li key={index} className="mb-12" variants={itemVariants}>
            <ProjectCard project={project} />
          </motion.li>
        ))}
      </motion.ul>
    </Section>
  );
};

export default ProjectsSection;