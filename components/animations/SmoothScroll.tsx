'use client';

import React, { useEffect, useRef } from 'react';
import Lenis from 'lenis';

interface SmoothScrollProps {
  children: React.ReactNode;
}

const SmoothScroll: React.FC<SmoothScrollProps> = ({ children }) => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis with minimal, safe configuration
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    lenisRef.current = lenis;

    // Animation frame loop
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Cleanup
    return () => {
      lenis.destroy();
    };
  }, []);

  // Scroll to section function
  const scrollToSection = (target: string) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, {
        duration: 2,
        easing: (t) => 1 - Math.pow(1 - t, 3),
      });
    }
  };

  // Expose scroll function to global scope for navigation
  useEffect(() => {
    (window as any).smoothScrollTo = scrollToSection;
  }, []);

  return <>{children}</>;
};

export default SmoothScroll;