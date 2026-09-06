'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Mail, Linkedin } from 'lucide-react';
import { ThemeToggle } from '@/components/theme/theme-toggle';

const navItems = [
  { id: 'about', label: 'ABOUT' },
  { id: 'projects', label: 'WORK' },
  { id: 'skills', label: 'SKILLS' },
  { id: 'resume', label: 'RESUME' },
  { id: 'contact', label: 'CONTACT' },
];

interface NavbarProps {
  activeSection: string;
  onSectionChange: (sectionId: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeSection, onSectionChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavigationClick = (id: string) => {
    onSectionChange(id);
    setIsOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-4 right-4 sm:top-6 sm:right-8 z-[100] flex items-center"
    >
      {/* Floating Glass Container - Theme Aware for Light & Dark */}
      <div className="flex items-center gap-3 sm:gap-6 bg-white/85 dark:bg-slate-950/85 text-slate-800 dark:text-slate-100 backdrop-blur-2xl px-5 py-2.5 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-xl dark:shadow-2xl shadow-slate-900/10">
        {/* Desktop Horizontal Nav Links with Bullet Indicators & Active Underline */}
        <ul className="hidden md:flex items-center space-x-6 sm:space-x-8">
          {navItems.map((item) => {
            const isActive = activeSection === item.id || (activeSection === 'work' && item.id === 'projects');
            return (
              <li key={item.id} className="relative group">
                <a
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigationClick(item.id);
                  }}
                  className="flex flex-col items-start pt-1 pb-1 transition-colors group"
                >
                  {/* Top Bullet Indicator: ° vs • */}
                  <span className="text-[10px] leading-none mb-1 font-mono transition-transform duration-300">
                    {isActive ? (
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-sky-500 dark:bg-sky-400 shadow-[0_0_8px_#38bdf8]" />
                    ) : (
                      <span className="text-slate-400 dark:text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300">°</span>
                    )}
                  </span>

                  {/* Label Text */}
                  <span
                    className={`font-mono text-xs font-bold tracking-widest transition-colors ${
                      isActive
                        ? 'text-sky-600 dark:text-white'
                        : 'text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-200'
                    }`}
                  >
                    {item.label}
                  </span>

                  {/* Underline Indicator */}
                  <div className="w-full h-[1.5px] mt-1.5 bg-slate-200 dark:bg-slate-800 relative overflow-hidden">
                    {isActive && (
                      <motion.div
                        layoutId="activeUnderline"
                        className="absolute inset-0 bg-gradient-to-r from-sky-500 to-cyan-400 dark:from-sky-400 dark:to-cyan-300"
                        transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                      />
                    )}
                  </div>
                </a>
              </li>
            );
          })}
        </ul>

        {/* Separator */}
        <div className="hidden md:block w-px h-6 bg-slate-200 dark:bg-slate-800" />

        {/* Quick Social & Action Icons */}
        <div className="hidden md:flex items-center space-x-2 text-slate-500 dark:text-slate-400">
          <a
            href="mailto:chakrabortybilwamoy@gmail.com"
            title="Email Me"
            className="p-1.5 rounded-lg hover:text-sky-500 dark:hover:text-sky-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
          >
            <Mail className="w-4 h-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/bilwamoy/"
            target="_blank"
            rel="noreferrer"
            title="LinkedIn Profile"
            className="p-1.5 rounded-lg hover:text-sky-500 dark:hover:text-sky-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
          >
            <Linkedin className="w-4 h-4" />
          </a>
        </div>

        {/* Separator */}
        <div className="hidden md:block w-px h-6 bg-slate-200 dark:bg-slate-800" />

        {/* Theme Toggle Button */}
        <ThemeToggle />

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-16 right-0 w-52 py-3 rounded-2xl bg-white/95 dark:bg-slate-950/95 backdrop-blur-2xl border border-slate-200 dark:border-slate-800 shadow-2xl md:hidden overflow-hidden"
          >
            <ul className="flex flex-col">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavigationClick(item.id);
                      }}
                      className={`px-5 py-3 font-mono text-xs tracking-widest flex items-center justify-between transition-colors ${
                        isActive
                          ? 'text-sky-500 font-bold bg-sky-50 dark:bg-slate-900'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900/60'
                      }`}
                    >
                      <span>{item.label}</span>
                      <span>{isActive ? '•' : '°'}</span>
                    </a>
                  </li>
                );
              })}
            </ul>

            <div className="mt-2 pt-2 border-t border-slate-200 dark:border-slate-900 px-5 flex items-center justify-around text-slate-500 dark:text-slate-400">
              <a href="mailto:chakrabortybilwamoy@gmail.com" className="hover:text-sky-500 dark:hover:text-sky-400">
                <Mail className="w-4 h-4" />
              </a>
              <a href="https://www.linkedin.com/in/bilwamoy/" target="_blank" rel="noreferrer" className="hover:text-sky-500 dark:hover:text-sky-400">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
