'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface TypewriterEffectProps {
  texts: string[];
  className?: string;
  speed?: number;
  deleteSpeed?: number;
  pauseDuration?: number;
}

const TypewriterEffect: React.FC<TypewriterEffectProps> = ({
  texts,
  className = '',
  speed = 100,
  deleteSpeed = 50,
  pauseDuration = 2000,
}) => {
  const textRef = useRef<HTMLSpanElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!textRef.current || !cursorRef.current) return;

    const textElement = textRef.current;
    const cursorElement = cursorRef.current;
    let currentTextIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;

    // Animate cursor blinking
    gsap.to(cursorElement, {
      opacity: 0,
      duration: 0.5,
      repeat: -1,
      yoyo: true,
      ease: 'power2.inOut',
    });

    const typeText = () => {
      const currentText = texts[currentTextIndex];
      
      if (!isDeleting) {
        // Typing
        textElement.textContent = currentText.substring(0, currentCharIndex + 1);
        currentCharIndex++;
        
        if (currentCharIndex === currentText.length) {
          // Finished typing, pause then start deleting
          setTimeout(() => {
            isDeleting = true;
            typeText();
          }, pauseDuration);
          return;
        }
        
        setTimeout(typeText, speed);
      } else {
        // Deleting
        textElement.textContent = currentText.substring(0, currentCharIndex - 1);
        currentCharIndex--;
        
        if (currentCharIndex === 0) {
          // Finished deleting, move to next text
          isDeleting = false;
          currentTextIndex = (currentTextIndex + 1) % texts.length;
          setTimeout(typeText, speed);
          return;
        }
        
        setTimeout(typeText, deleteSpeed);
      }
    };

    // Start the animation
    typeText();

    return () => {
      // Cleanup
      gsap.killTweensOf(cursorElement);
    };
  }, [texts, speed, deleteSpeed, pauseDuration]);

  return (
    <span className={className}>
      <span ref={textRef}></span>
      <span ref={cursorRef} className="text-sky-400">|</span>
    </span>
  );
};

export default TypewriterEffect;