'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTheme } from 'next-themes';
import { Play, Pause } from 'lucide-react';

export const VideoHeroSection: React.FC = () => {
  const { resolvedTheme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const videoScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.96, 1.04, 0.98]);
  const videoOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.7]);

  const isDark = resolvedTheme === 'dark';
  // Dark mode uses /Dark.mp4; Light mode uses /Light.mp4
  const videoSrc = isDark ? '/Dark.mp4' : '/Light.mp4';

  // Scrub video currentTime smoothly according to scroll progress when paused or scrolling
  useEffect(() => {
    const unsub = scrollYProgress.on('change', (latest) => {
      const video = videoRef.current;
      if (video && video.duration && !isPlaying) {
        const targetTime = latest * video.duration;
        if (Math.abs(video.currentTime - targetTime) > 0.05) {
          video.currentTime = targetTime;
        }
      }
    });

    return () => unsub();
  }, [scrollYProgress, isPlaying]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      video.play().then(() => setIsPlaying(true)).catch(console.error);
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[520px] sm:h-[650px] rounded-3xl overflow-hidden my-10 border border-white/40 dark:border-slate-800/40 bg-white/10 dark:bg-slate-950/20 backdrop-blur-md shadow-2xl transition-colors duration-500 flex items-center justify-center group"
    >
      {/* Pure Scroll-Linked Video Animation Background */}
      <motion.div
        style={{ scale: videoScale, opacity: videoOpacity }}
        className="relative w-full h-full cursor-pointer"
        onClick={togglePlay}
      >
        <video
          ref={videoRef}
          key={videoSrc}
          src={videoSrc}
          loop
          muted
          playsInline
          className="w-full h-full object-cover rounded-3xl"
        />

        {/* Subtle Edge Vignette tailored to active theme */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-slate-200/40 dark:to-slate-950/60 pointer-events-none rounded-3xl" />

        {/* Interactive Play/Pause Button Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/20 dark:bg-slate-950/40 opacity-90 group-hover:opacity-100 transition-opacity duration-300">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              togglePlay();
            }}
            className="w-20 h-20 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-300/80 dark:border-slate-700/80 flex items-center justify-center shadow-2xl text-sky-600 dark:text-sky-400 hover:text-sky-500 hover:bg-white dark:hover:bg-slate-800 transition-all duration-300"
            aria-label={isPlaying ? 'Pause video' : 'Play video'}
          >
            {isPlaying ? (
              <Pause className="w-8 h-8 fill-current" />
            ) : (
              <Play className="w-8 h-8 fill-current ml-1" />
            )}
          </motion.button>

          <span className="mt-4 px-4 py-1.5 rounded-full text-xs font-mono tracking-widest uppercase bg-white/80 dark:bg-slate-900/80 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 shadow-md pointer-events-none">
            {isPlaying ? 'Click to Pause' : 'Click to Play Animation'}
          </span>
        </div>
      </motion.div>
    </section>
  );
};

export default VideoHeroSection;

