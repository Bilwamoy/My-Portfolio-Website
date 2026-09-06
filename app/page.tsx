'use client';

import React, { useState, useEffect, Suspense, lazy, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import Navbar from '@/components/Navbar';
const AboutSection = lazy(() => import('@/components/AboutSection'));
const ProjectsSection = lazy(() => import('@/components/ProjectsSection'));
const SkillsSection = lazy(() => import('@/components/SkillsSection'));
const ResumeSection = lazy(() => import('@/components/ResumeSection'));
const ContactSection = lazy(() => import('@/components/ContactSection'));
const Footer = lazy(() => import('@/components/Footer'));
import dynamic from 'next/dynamic';
const BackgroundCanvas = dynamic(() => import('@/components/BackgroundCanvas'), { ssr: false });
import HeroSection from '@/components/HeroSection';
import { PerformanceMonitor, throttle } from '@/lib/performance';
import CommandPalette from '@/components/CommandPalette';

const BlogSection = lazy(() => import('@/components/BlogSection'));
const TestimonialsSection = lazy(() => import('@/components/TestimonialsSection'));
const Enhancements = lazy(() => import('../components/Enhancements'));
const WhatIDoSection = lazy(() => import('@/components/WhatIDoSection'));
const ParallaxShowcase = lazy(() => import('@/components/ParallaxShowcase'));
const VideoHeroSection = lazy(() => import('@/components/VideoHeroSection'));

// Error Boundary Component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode; fallback?: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Portfolio Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
            <p className="text-slate-400 mb-4">Please refresh the page to try again.</p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-4 py-2 bg-sky-500 text-white rounded hover:bg-sky-600 transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default function Home() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const [isHovering, setIsHovering] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('about');
  const [pageLoaded, setPageLoaded] = useState(false);
  const [contentKey, setContentKey] = useState(0); // Key to force re-render and animation
  const [isAnimating, setIsAnimating] = useState(false); // State to control animation

  const [isClicked, setIsClicked] = useState(false);

  const handleSectionChange = useCallback((sectionId: string) => {
    setActiveSection(sectionId);
    const targetId = sectionId === 'work' ? 'projects' : sectionId;
    const section = document.getElementById(targetId);
    if (section) {
      const topOffset = section.getBoundingClientRect().top + window.pageYOffset - 90;
      window.scrollTo({ top: topOffset, behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    setPageLoaded(true); // Set pageLoaded to true when component mounts

    // Ensure custom cursor class is removed to show normal cursor
    document.body.classList.remove('custom-cursor');
    
    const updateCursorPosition = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, input, textarea, [role="button"], .cursor-pointer')) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, input, textarea, [role="button"], .cursor-pointer')) {
        setIsHovering(false);
      }
    };

    const handleMouseDown = () => {
      setIsClicked(true);
    };

    const handleMouseUp = () => {
      setIsClicked(false);
    };
    
    window.addEventListener('mousemove', updateCursorPosition);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', updateCursorPosition);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.body.classList.remove('custom-cursor');
    };
  }, [cursorX, cursorY]);

  

  useEffect(() => {
    const handleScroll = () => {
      const navSections = Array.from(document.querySelectorAll<HTMLElement>('[data-nav]'));
      const scrollPos = window.scrollY + window.innerHeight * 0.35;

      let currentNav = 'about';
      for (let i = navSections.length - 1; i >= 0; i--) {
        const el = navSections[i];
        if (scrollPos >= el.offsetTop - 100) {
          currentNav = el.getAttribute('data-nav') || currentNav;
          break;
        }
      }
      setActiveSection(currentNav);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Initialize performance monitoring
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const monitor = PerformanceMonitor.getInstance();
      monitor.startMonitoring();
      
      // Log performance metrics every 30 seconds in development
      if (process.env.NODE_ENV === 'development') {
        const interval = setInterval(() => {
          const metrics = monitor.getMetrics();
          console.log('Performance Metrics:', metrics);
        }, 30000);
        
        return () => clearInterval(interval);
      }
    }
  }, []);

  return (
    <ErrorBoundary>
      

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: pageLoaded ? 1 : 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={pageLoaded ? 'page-content loaded' : 'page-content'}
      >
        {/* Background Canvas */}
        <div className="fixed top-0 left-0 w-full h-full -z-10 opacity-100">
          <ErrorBoundary fallback={<div className="fixed inset-0 bg-background" />}>
            <Suspense fallback={<div className="fixed inset-0 bg-background" />}>
              <BackgroundCanvas />
            </Suspense>
          </ErrorBoundary>
        </div>

        {/* Main background color */}
        <div className="fixed inset-0 -z-20" style={{ backgroundColor: 'var(--background)' }} />

        {/* Custom Cursor */}
        <>
            <motion.div
              className="fixed z-[60] h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-sky-400 pointer-events-none transition-transform duration-150 ease-in-out hidden md:block"
              style={{ 
                backdropFilter: 'blur(5px)',
                WebkitBackdropFilter: 'blur(5px)',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                left: cursorXSpring,
                top: cursorYSpring,
              }}
              animate={{
                scale: isClicked ? 2 : (isHovering ? 1.5 : 1),
                opacity: isHovering ? 0.5 : 1,
              }}
            />
            <motion.div
              className="fixed z-[60] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-400 pointer-events-none hidden md:block"
              style={{ 
                left: cursorXSpring, 
                top: cursorYSpring 
              }}
            />
          </>
        
        {/* Floating Top Navbar */}
        <ErrorBoundary>
          <Navbar activeSection={activeSection} onSectionChange={handleSectionChange} />
        </ErrorBoundary>

        <div className="relative z-10 mx-auto min-h-screen max-w-7xl px-4 sm:px-6 lg:px-8 py-6 md:py-10">
          <div className="flex flex-col w-full">
            <header className="pt-16 pb-6 md:pt-20 md:pb-10 w-full">
              <div className="w-full">
                <ErrorBoundary>
                  <HeroSection />
                </ErrorBoundary>
              </div>
            </header>
            <main id="content" className="flex-1 w-full">
              <motion.div
                key={contentKey}
                initial={{ opacity: 0 }}
                animate={{ opacity: isAnimating ? 0 : 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Suspense fallback={<div>Loading...</div>}>
                  <>
                    {/* Enhancements component mounts global smooth scroll and back-to-top */}
                    <Enhancements />
                    <section data-animate='fade-up' data-nav="about">
                      <AboutSection />
                    </section>
                    <section data-animate='fade-up' data-nav="about">
                      <WhatIDoSection />
                    </section>
                    <section data-animate='fade-up' data-nav="projects">
                      <VideoHeroSection />
                    </section>
                    <section data-animate='fade-up' data-nav="projects">
                      <ProjectsSection />
                    </section>
                    <section data-animate='fade-up' data-nav="projects">
                      <ParallaxShowcase />
                    </section>
                    <section data-animate='fade-up' data-nav="skills">
                      <SkillsSection />
                    </section>
                    <section data-animate='fade-up' data-nav="resume">
                      <ResumeSection />
                    </section>
                    <section data-animate='fade-up' data-nav="resume">
                      <BlogSection />
                    </section>
                    <section data-animate='fade-up' data-nav="resume">
                      <TestimonialsSection />
                    </section>
                    <section data-animate='fade-up' data-nav="contact">
                      <ContactSection />
                    </section>
                    <Footer />
                  </>
                </Suspense>
              </motion.div>
            </main>
          </div>
        </div>
        <CommandPalette />
      </motion.div>
    </ErrorBoundary>
  );
}
