'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface NavbarProps {
  activeSection: string;
}

const NavLink: React.FC<{ href: string; title: string; isActive: boolean }> = ({ href, title, isActive }) => (
  <a href={href} className="group flex items-center py-3">
    <motion.span
      className="nav-indicator mr-4 h-px bg-slate-600 transition-all group-hover:bg-sky-400"
      initial={{ width: '2rem' }}
      animate={{ width: isActive ? '4rem' : '2rem', backgroundColor: isActive ? '#38bdf8' : '#475569' }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    ></motion.span>
    <span
      className={`nav-text text-xs font-bold uppercase tracking-widest ${isActive ? 'text-sky-300' : 'text-slate-500'} transition-colors group-hover:text-sky-300`}
    >
      {title}
    </span>
  </a>
);

const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const navLinks = [
    { id: 'about', title: 'About' },
    { id: 'projects', title: 'Projects' },
    { id: 'skills', title: 'Skills' },
    { id: 'contact', title: 'Contact' }
  ];

  return (
    <nav className="nav hidden lg:block" aria-label="In-page jump links">
      <motion.ul
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mt-16 w-max"
      >
        {navLinks.map((link) => (
          <li key={link.id}>
            <NavLink href={`#${link.id}`} title={link.title} isActive={activeSection === link.id} />
          </li>
        ))}
      </motion.ul>
    </nav>
  );
};

export default Navbar;
