'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { ThemeToggle } from '@/components/theme/theme-toggle';

const navItems = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'resume', label: 'Resume' },
  { id: 'contact', label: 'Contact' },
];

const Navbar: React.FC<{ activeSection: string; onSectionChange: (sectionId: string) => void }> = ({ activeSection, onSectionChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavigationClick = (id: string) => {
    onSectionChange(id);
    setIsOpen(false);
  };

  return (
    <>
      <nav className="flex flex-col items-end w-full">
        <div className="mb-4">
          <ThemeToggle />
        </div>

        <div className="flex items-center justify-end">
          <div className="hidden md:block">
            <ul className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavigationClick(item.id);
                    }}
                    className={`group flex items-center py-2 transition-all ${activeSection === item.id
                        ? 'text-sky-400'
                        : 'text-slate-600 dark:text-slate-400 hover:text-sky-500 dark:hover:text-sky-300'
                      }`}
                  >
                    <motion.span
                      className="mr-2 h-px bg-slate-600 transition-all group-hover:bg-sky-400"
                      initial={{ width: '1rem' }}
                      animate={{ width: activeSection === item.id ? '2rem' : '1rem', backgroundColor: activeSection === item.id ? '#38bdf8' : '#475569' }}
                      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    ></motion.span>
                    <span className="text-xs font-bold uppercase tracking-widest">
                      {item.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-700 dark:text-slate-200"
              aria-label={isOpen ? 'Close navigation' : 'Open navigation'}
              aria-expanded={isOpen}
              aria-controls="mobile-nav"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isOpen && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm"
          >
            <ul className="flex flex-col items-center space-y-4 py-4">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavigationClick(item.id);
                    }}
                    className="text-slate-700 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-300"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
