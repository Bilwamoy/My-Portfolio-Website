'use client';

import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ExternalLink, Github } from 'lucide-react';
import Image from 'next/image';

interface InteractiveProjectCardProps {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  delay?: number;
}

const InteractiveProjectCard: React.FC<InteractiveProjectCardProps> = ({
  title,
  description,
  image,
  technologies,
  liveUrl,
  githubUrl,
  delay = 0,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current || !overlayRef.current || !imageRef.current || !contentRef.current) return;

    const card = cardRef.current;
    const overlay = overlayRef.current;
    const image = imageRef.current;
    const content = contentRef.current;

    // Initial setup
    gsap.set(overlay, { opacity: 0, scale: 0.8 });
    gsap.set(content, { y: 20, opacity: 0 });

    // Mouse enter animation
    const handleMouseEnter = () => {
      gsap.to(card, {
        scale: 1.05,
        duration: 0.3,
        ease: 'power2.out',
      });

      gsap.to(image, {
        scale: 1.1,
        duration: 0.5,
        ease: 'power2.out',
      });

      gsap.to(overlay, {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        ease: 'power2.out',
      });

      gsap.to(content, {
        y: 0,
        opacity: 1,
        duration: 0.4,
        delay: 0.1,
        ease: 'power2.out',
      });
    };

    // Mouse leave animation
    const handleMouseLeave = () => {
      gsap.to(card, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out',
      });

      gsap.to(image, {
        scale: 1,
        duration: 0.5,
        ease: 'power2.out',
      });

      gsap.to(overlay, {
        opacity: 0,
        scale: 0.8,
        duration: 0.3,
        ease: 'power2.out',
      });

      gsap.to(content, {
        y: 20,
        opacity: 0,
        duration: 0.2,
        ease: 'power2.out',
      });
    };

    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      className="relative group cursor-pointer bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
    >
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <div ref={imageRef} className="w-full h-full">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
          />
        </div>
        
        {/* Overlay */}
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-center justify-center"
        >
          <div ref={contentRef} className="text-center text-white p-4">
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p className="text-sm mb-4 opacity-90">{description}</p>
            
            {/* Action Buttons */}
            <div className="flex gap-3 justify-center">
              {liveUrl && (
                <motion.a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2 bg-sky-500 hover:bg-sky-600 rounded-lg text-sm font-medium transition-colors"
                >
                  <ExternalLink size={16} />
                  Live Demo
                </motion.a>
              )}
              
              {githubUrl && (
                <motion.a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm font-medium transition-colors"
                >
                  <Github size={16} />
                  Code
                </motion.a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">
          {title}
        </h3>
        <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 line-clamp-2">
          {description}
        </p>
        
        {/* Technologies */}
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech, index) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: delay + index * 0.1 }}
              className="px-3 py-1 bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 text-xs rounded-full font-medium"
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Animated border */}
      <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-sky-400/50 transition-colors duration-300" />
    </motion.div>
  );
};

export default InteractiveProjectCard;