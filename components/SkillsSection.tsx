'use client';

import React from 'react';
import { motion, type Variants } from 'framer-motion';
import Section from './Section';
import { SKILLS, SOFT_SKILLS } from '@/lib/constants';
import AnimatedSkillBar from '@/components/animations/AnimatedSkillBar';
import ScrollAnimation from '@/components/animations/ScrollAnimations';
import { 
  Code, 
  Palette, 
  Database, 
  Smartphone, 
  Globe, 
  Zap,
  Heart,
  Users,
  Target,
  MessageCircle
} from 'lucide-react';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 200, damping: 20 }
  }
};

// Skill proficiency data with percentages
const skillProficiency = [
  { skill: 'React/Next.js', percentage: 95, color: '#61DAFB', icon: <Code /> },
  { skill: 'TypeScript', percentage: 90, color: '#3178C6', icon: <Code /> },
  { skill: 'JavaScript', percentage: 95, color: '#F7DF1E', icon: <Code /> },
  { skill: 'CSS/Tailwind', percentage: 88, color: '#06B6D4', icon: <Palette /> },
  { skill: 'Node.js', percentage: 80, color: '#339933', icon: <Database /> },
  { skill: 'MongoDB', percentage: 75, color: '#47A248', icon: <Database /> },
  { skill: 'React Native', percentage: 70, color: '#61DAFB', icon: <Smartphone /> },
  { skill: 'GraphQL', percentage: 65, color: '#E10098', icon: <Globe /> },
];

const softSkillsData = [
  { skill: 'Problem Solving', percentage: 95, color: '#8B5CF6', icon: <Target /> },
  { skill: 'Team Collaboration', percentage: 90, color: '#10B981', icon: <Users /> },
  { skill: 'Communication', percentage: 88, color: '#F59E0B', icon: <MessageCircle /> },
  { skill: 'Adaptability', percentage: 92, color: '#EF4444', icon: <Zap /> },
];

const SkillsSection: React.FC = () => {
  return (
    <Section id="skills" title="Skills & Expertise">
      <div className="space-y-16">
        {/* Technical Skills with Progress Bars */}
        <ScrollAnimation animation="fadeIn" className="space-y-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-8 text-center">
              Technical Proficiency
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {skillProficiency.map((skill, index) => (
                <motion.div key={skill.skill} variants={itemVariants}>
                  <AnimatedSkillBar
                    skill={skill.skill}
                    percentage={skill.percentage}
                    color={skill.color}
                    icon={skill.icon}
                    delay={index * 0.1}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </ScrollAnimation>

        {/* Soft Skills */}
        <ScrollAnimation animation="slideUp" delay={0.2} className="space-y-8">
          <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-8 text-center">
            Soft Skills
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {softSkillsData.map((skill, index) => (
              <AnimatedSkillBar
                key={skill.skill}
                skill={skill.skill}
                percentage={skill.percentage}
                color={skill.color}
                icon={skill.icon}
                delay={index * 0.15}
              />
            ))}
          </div>
        </ScrollAnimation>

        {/* Technology Categories */}
        <ScrollAnimation animation="slideLeft" delay={0.4}>
          <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-8 text-center">
            Technology Stack
          </h3>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {SKILLS.map((category, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white/10 dark:bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-200/20 dark:border-slate-700/50 hover:border-sky-400/50 transition-all duration-300 group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-sky-500/20 rounded-lg group-hover:bg-sky-500/30 transition-colors">
                    {index === 0 && <Code className="h-5 w-5 text-sky-500" />}
                    {index === 1 && <Palette className="h-5 w-5 text-sky-500" />}
                    {index === 2 && <Database className="h-5 w-5 text-sky-500" />}
                    {index === 3 && <Globe className="h-5 w-5 text-sky-500" />}
                  </div>
                  <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
                    {category.title}
                  </h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                      whileHover={{ scale: 1.05 }}
                      className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-sm font-medium px-3 py-1.5 rounded-full border border-slate-300/50 dark:border-slate-600/50 hover:border-sky-400/50 dark:hover:border-sky-400/50 transition-all duration-200 cursor-default"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </ScrollAnimation>

        {/* Certifications or Additional Info */}
        <ScrollAnimation animation="scale" delay={0.6}>
          <div className="text-center bg-gradient-to-r from-sky-500/10 to-purple-500/10 rounded-2xl p-8 border border-sky-200/20 dark:border-sky-800/20">
            <Heart className="h-8 w-8 text-sky-500 mx-auto mb-4" />
            <h4 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-2">
              Passionate About Learning
            </h4>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              I'm constantly exploring new technologies and methodologies to stay at the forefront of web development. 
              My goal is to create exceptional user experiences through clean, efficient, and innovative code.
            </p>
          </div>
        </ScrollAnimation>
      </div>
    </Section>
  );
};

export default SkillsSection;
