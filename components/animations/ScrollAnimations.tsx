'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollAnimationProps {
  children: React.ReactNode;
  animation?: 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scale' | 'rotate';
  delay?: number;
  duration?: number;
  className?: string;
}

const ScrollAnimation: React.FC<ScrollAnimationProps> = ({
  children,
  animation = 'fadeIn',
  delay = 0,
  duration = 1,
  className = '',
}) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const element = elementRef.current;
    
    // Initial state based on animation type
    const initialState: gsap.TweenVars = {
      opacity: 0,
    };

    const animateToState: gsap.TweenVars = {
      opacity: 1,
      duration,
      delay,
      ease: 'power2.out',
    };

    switch (animation) {
      case 'slideUp':
        initialState.y = 50;
        animateToState.y = 0;
        break;
      case 'slideLeft':
        initialState.x = 50;
        animateToState.x = 0;
        break;
      case 'slideRight':
        initialState.x = -50;
        animateToState.x = 0;
        break;
      case 'scale':
        initialState.scale = 0.8;
        animateToState.scale = 1;
        break;
      case 'rotate':
        initialState.rotation = 10;
        animateToState.rotation = 0;
        break;
      default:
        // fadeIn - no additional properties needed
        break;
    }

    // Set initial state
    gsap.set(element, initialState);

    // Create scroll trigger animation
    ScrollTrigger.create({
      trigger: element,
      start: 'top 80%',
      end: 'bottom 20%',
      onEnter: () => {
        gsap.to(element, animateToState);
      },
      onLeave: () => {
        gsap.to(element, { ...initialState, duration: 0.5 });
      },
      onEnterBack: () => {
        gsap.to(element, animateToState);
      },
      onLeaveBack: () => {
        gsap.to(element, { ...initialState, duration: 0.5 });
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [animation, delay, duration]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
};

export default ScrollAnimation;