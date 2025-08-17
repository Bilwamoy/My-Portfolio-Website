'use client';

import React, { useState, useEffect, Suspense, lazy, useCallback } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
const AboutSection = lazy(() => import('@/components/AboutSection'));
const ProjectsSection = lazy(() => import('@/components/ProjectsSection'));
const SkillsSection = lazy(() => import('@/components/SkillsSection'));
const ResumeSection = lazy(() => import('@/components/ResumeSection'));
const ContactSection = lazy(() => import('@/components/ContactSection'));
const Footer = lazy(() => import('@/components/Footer'));
import BackgroundCanvas from '@/components/BackgroundCanvas';
import HeroSection from '@/components/HeroSection';
import { PerformanceMonitor, throttle } from '@/lib/performance';

const BlogSection = lazy(() => import('@/components/BlogSection'));
const TestimonialsSection = lazy(() => import('@/components/TestimonialsSection'));
const Enhancements = lazy(() => import('../components/Enhancements'));

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
  const [cursorPosition, setCursorPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('about');
  const [pageLoaded, setPageLoaded] = useState(false);
  const [contentKey, setContentKey] = useState(0); // Key to force re-render and animation
  const [isAnimating, setIsAnimating] = useState(false); // State to control animation

  const [isClicked, setIsClicked] = useState(false);

  const handleSectionChange = useCallback((sectionId: string) => {
    setIsAnimating(true);
    setTimeout(() => {
      setActiveSection(sectionId);
      setContentKey(prevKey => prevKey + 1); // Change key to trigger re-render and animation
      setIsAnimating(false);
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }, 1000); // 1 second delay for fade out
  }, []);

  useEffect(() => {
    setPageLoaded(true); // Set pageLoaded to true when component mounts

    // Ensure custom cursor class is removed to show normal cursor
    document.body.classList.remove('custom-cursor');
    
    const updateCursorPosition = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
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
      document.removeEventListener('mouseout', handleMouseOut);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.body.classList.remove('custom-cursor');
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
              <BackgroundCanvas cursorPosition={cursorPosition} />
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
              }}
              animate={{
                left: cursorPosition.x,
                top: cursorPosition.y,
                scale: isClicked ? 2 : (isHovering ? 1.5 : 1),
                opacity: isHovering ? 0.5 : 1,
              }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
            <motion.div
              className="fixed z-[60] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-400 pointer-events-none hidden md:block"
              animate={{ left: cursorPosition.x, top: cursorPosition.y }}
              transition={{ type: 'spring', stiffness: 800, damping: 40 }}
            />
          </>
        
        <div className="relative z-10 mx-auto min-h-screen max-w-screen-xl px-6 py-12 md:px-12 md:py-20 lg:px-24 lg:py-0">
          <div className="flex flex-col">
            <header className="py-12 md:py-16 lg:py-20">
              <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-24 flex flex-col lg:flex-row lg:items-center lg:justify-between h-full">
                <div className="flex-1">
                  <ErrorBoundary>
                    <HeroSection />
                  </ErrorBoundary>
                </div>
                <div className="flex-shrink-0">
                  <ErrorBoundary>
                    <Navbar activeSection={activeSection} onSectionChange={handleSectionChange} />
                  </ErrorBoundary>
                </div>
              </div>
            </header>
            <main id="content" className="flex-1 overflow-y-auto px-6 py-12 md:px-12 md:py-20 lg:px-24 lg:py-0">
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
                    <section data-animate='fade-up'>
                      <AboutSection />
                    </section>
                    <section data-animate='fade-up'>
                      <ProjectsSection />
                    </section>
                    <section data-animate='fade-up'>
                      <SkillsSection />
                    </section>
                    <section data-animate='fade-up'>
                      <ResumeSection />
                    </section>
                    <section data-animate='fade-up'>
                      <BlogSection />
                    </section>
                    <section data-animate='fade-up'>
                      <TestimonialsSection />
                    </section>
                    <section data-animate='fade-up'>
                      <ContactSection />
                    </section>
                    <Footer />
                  </>
                </Suspense>
              </motion.div>
            </main>
          </div>
        </div>
      </motion.div>
    </ErrorBoundary>
  );
}
