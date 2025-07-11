'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Section from './Section';
import { PROJECTS } from '@/lib/constants';
import InteractiveProjectCard from '@/components/animations/InteractiveProjectCard';
import ScrollAnimation from '@/components/animations/ScrollAnimations';
import type { Project } from '@/lib/types';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15
    }
  }
};

const ProjectsSection: React.FC = () => {
  return (
    <Section id="projects" title="Featured Projects">
      <ScrollAnimation animation="fadeIn" className="space-y-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {PROJECTS.map((project, index) => (
            <motion.div key={index} variants={itemVariants}>
              <InteractiveProjectCard
                title={project.title}
                description={project.description}
                image={project.image}
                technologies={project.tags}
                liveUrl={project.liveDemoUrl}
                githubUrl={project.githubUrl}
                delay={index * 0.1}
              />
            </motion.div>
          ))}
        </motion.div>
      </ScrollAnimation>

      {/* Call to Action */}
      <ScrollAnimation animation="slideUp" delay={0.5} className="mt-16 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-sky-500/10 to-purple-500/10 rounded-2xl p-8 border border-sky-200/20 dark:border-sky-800/20"
        >
          <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4">
            Want to see more?
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-6 max-w-2xl mx-auto">
            These are just a few highlights from my portfolio. I'm always working on new projects 
            and exploring cutting-edge technologies. Let's connect and discuss how we can work together!
          </p>
          <motion.div
            className="flex flex-wrap gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-sky-500 to-purple-500 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Get In Touch
            </motion.a>
            <motion.a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg font-medium hover:border-sky-400 dark:hover:border-sky-400 transition-all duration-300"
            >
              View All Projects
            </motion.a>
          </motion.div>
        </motion.div>
      </ScrollAnimation>
    </Section>
  );
};

export default ProjectsSection;
