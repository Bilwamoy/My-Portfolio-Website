import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import AboutSection from './components/AboutSection';
import ProjectsSection from './components/ProjectsSection';
import SkillsSection from './components/SkillsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import BackgroundCanvas from './components/BackgroundCanvas';
import HeroSection from './components/HeroSection';

const App: React.FC = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('about');

  useEffect(() => {
    const updateCursorPosition = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('a, button')) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('a, button')) {
        setIsHovering(false);
      }
    };
    
    window.addEventListener('mousemove', updateCursorPosition);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('mousemove', updateCursorPosition);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-30% 0px -70% 0px' }
    );

    sections.forEach((section) => observer.observe(section));
    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  return (
    <>
      <BackgroundCanvas cursorPosition={cursorPosition} />

      <motion.div
        className="fixed z-[60] h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-sky-400 pointer-events-none transition-transform duration-150 ease-in-out"
        animate={{
          left: cursorPosition.x,
          top: cursorPosition.y,
          scale: isHovering ? 1.5 : 1,
          opacity: isHovering ? 0.5 : 1,
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      />
      <motion.div
        className="fixed z-[60] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-400 pointer-events-none"
        animate={{ left: cursorPosition.x, top: cursorPosition.y }}
        transition={{ type: 'spring', stiffness: 800, damping: 40 }}
      />
      
      <div className="relative z-10 mx-auto min-h-screen max-w-screen-xl px-6 py-12 font-sans md:px-12 md:py-20 lg:px-24 lg:py-0">
        <div className="lg:flex lg:justify-between lg:gap-4">
          <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:py-24">
            <HeroSection />
            <Navbar activeSection={activeSection} />
          </header>
          <main id="content" className="pt-24 lg:w-1/2 lg:py-24">
            <AboutSection />
            <ProjectsSection />
            <SkillsSection />
            <ContactSection />
            <Footer />
          </main>
        </div>
      </div>
    </>
  );
};

export default App;