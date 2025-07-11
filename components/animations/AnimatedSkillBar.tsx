'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface AnimatedSkillBarProps {
  skill: string;
  percentage: number;
  color?: string;
  icon?: React.ReactNode;
  delay?: number;
}

const AnimatedSkillBar: React.FC<AnimatedSkillBarProps> = ({
  skill,
  percentage,
  color = '#0ea5e9',
  icon,
  delay = 0,
}) => {
  const barRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const [currentPercentage, setCurrentPercentage] = useState(0);

  useEffect(() => {
    if (!barRef.current || !fillRef.current || !counterRef.current) return;

    const bar = barRef.current;
    const fill = fillRef.current;
    const counter = counterRef.current;

    // Initial state
    gsap.set(fill, { width: '0%' });
    gsap.set(counter, { textContent: '0' });

    // Create scroll trigger animation
    ScrollTrigger.create({
      trigger: bar,
      start: 'top 80%',
      onEnter: () => {
        // Animate the fill bar
        gsap.to(fill, {
          width: `${percentage}%`,
          duration: 1.5,
          delay,
          ease: 'power2.out',
        });

        // Animate the counter
        gsap.to({ value: 0 }, {
          value: percentage,
          duration: 1.5,
          delay,
          ease: 'power2.out',
          onUpdate: function() {
            const currentValue = Math.round(this.targets()[0].value);
            setCurrentPercentage(currentValue);
            counter.textContent = currentValue.toString();
          },
        });

        // Add a subtle pulse effect when animation completes
        gsap.to(fill, {
          scale: 1.02,
          duration: 0.2,
          delay: delay + 1.5,
          yoyo: true,
          repeat: 1,
          ease: 'power2.inOut',
        });
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [percentage, delay]);

  return (
    <div ref={barRef} className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {icon && <span className="text-lg">{icon}</span>}
          <span className="font-medium text-slate-700 dark:text-slate-300">
            {skill}
          </span>
        </div>
        <span 
          ref={counterRef}
          className="font-bold text-slate-600 dark:text-slate-400"
        >
          0
        </span>
        <span className="text-slate-500 dark:text-slate-500">%</span>
      </div>
      
      <div className="relative h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
        <div
          ref={fillRef}
          className="absolute top-0 left-0 h-full rounded-full transition-all duration-300"
          style={{
            background: `linear-gradient(90deg, ${color}, ${color}dd)`,
            boxShadow: `0 0 10px ${color}44`,
          }}
        />
        
        {/* Animated shine effect */}
        <div 
          className="absolute top-0 left-0 h-full w-full rounded-full"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
            animation: 'shine 2s infinite linear',
          }}
        />
      </div>
      
      <style jsx>{`
        @keyframes shine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default AnimatedSkillBar;