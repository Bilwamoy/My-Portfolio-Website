'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTheme } from 'next-themes';
import Image from 'next/image';

export const ParallaxShowcase: React.FC = () => {
  const { resolvedTheme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const isDark = resolvedTheme === 'dark';
  // Use Gemini_Generated_Image_k0aw3lk0aw3lk0aw.png for Light Mode, and Gemini_Generated_Image_1cd82z1cd82z1cd8 (1).png for Dark Mode
  const portalImage = isDark
    ? '/Gemini_Generated_Image_1cd82z1cd82z1cd8 (1).png'
    : '/Gemini_Generated_Image_k0aw3lk0aw3lk0aw.png';

  // Circle mask radius expands from 14% to 140% of viewport width
  const circleRadius = useTransform(scrollYProgress, [0, 0.6, 1], [14, 85, 140]);
  const textScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.1, 1]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.6]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.25, 1.05]);

  return (
    <div ref={containerRef} className="relative h-[220vh] w-full my-12">
      {/* Transparent Glassmorphism Sticky Viewport Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-white/10 dark:bg-slate-950/20 backdrop-blur-md text-slate-900 dark:text-white shadow-2xl transition-colors duration-500 rounded-3xl border border-white/30 dark:border-slate-800/40">
        {/* Background Image Layer inside Expanding Portal Mask */}
        <motion.div
          style={{
            clipPath: useTransform(circleRadius, (r) => `circle(${r}% at 50% 50%)`),
          }}
          className="absolute inset-0 w-full h-full flex items-center justify-center bg-white/20 dark:bg-slate-950/40 backdrop-blur-lg overflow-hidden"
        >
          {/* Custom Theme-Aware Portal Image */}
          <motion.div style={{ scale: imageScale }} className="absolute inset-0 w-full h-full">
            <Image
              key={portalImage}
              src={portalImage}
              alt="Crafted for Digital Innovation"
              fill
              className="object-cover opacity-90"
              priority
            />
            <div className="absolute inset-0 bg-white/20 dark:bg-slate-950/40 backdrop-blur-[2px]" />
          </motion.div>

          {/* Overlaid Glassmorphism Typography */}
          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
            <motion.span
              style={{ opacity: textOpacity }}
              className="text-xs font-mono uppercase tracking-[0.4em] text-sky-800 dark:text-sky-300 mb-4 inline-block bg-white/60 dark:bg-slate-950/80 backdrop-blur-xl px-4 py-1.5 rounded-full border border-white/60 dark:border-sky-400/40 shadow-xl"
            >
              SCROLL TRIGGERED PORTAL REVEAL
            </motion.span>

            <motion.h2
              style={{ scale: textScale, opacity: textOpacity }}
              className="font-syne text-4xl sm:text-6xl md:text-7xl font-extrabold uppercase tracking-tight text-slate-900 dark:text-white leading-none drop-shadow-md dark:drop-shadow-2xl"
            >
              CRAFTED FOR
            </motion.h2>

            <motion.h3
              style={{ opacity: textOpacity }}
              className="font-serif italic text-3xl sm:text-5xl md:text-6xl font-normal text-amber-600 dark:text-amber-400 drop-shadow-md dark:drop-shadow-2xl mt-3"
            >
              Digital Innovation
            </motion.h3>

            <motion.p
              style={{ opacity: textOpacity }}
              className="font-mono text-xs sm:text-sm text-slate-900 dark:text-slate-100 uppercase tracking-widest mt-6 max-w-xl mx-auto leading-relaxed bg-white/60 dark:bg-slate-950/70 backdrop-blur-xl p-4 rounded-2xl border border-white/60 dark:border-white/20 shadow-xl"
            >
              FULL-STACK WEB ARCHITECTURE • CREATIVE MOTION DESIGN
            </motion.p>
          </div>
        </motion.div>

        {/* Outer Frame Cue (Shown before scroll expansion) */}
        <motion.div
          style={{ opacity: useTransform(scrollYProgress, [0, 0.25], [1, 0]) }}
          className="absolute bottom-12 flex flex-col items-center gap-2 font-mono text-xs text-sky-800 dark:text-sky-400 tracking-widest pointer-events-none"
        >
          <span className="bg-white/50 dark:bg-slate-950/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/40 dark:border-slate-800/60 shadow-sm">
            SCROLL TO UNLOCK PORTAL
          </span>
          <div className="w-1.5 h-6 rounded-full border border-sky-600 dark:border-sky-400 p-0.5">
            <div className="w-1 h-2 rounded-full bg-sky-600 dark:bg-sky-400 animate-bounce" />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ParallaxShowcase;
