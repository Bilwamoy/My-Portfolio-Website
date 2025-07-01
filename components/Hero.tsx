'use client';
import { motion } from 'framer-motion';

const Hero = () => {
  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative w-full h-screen flex flex-col items-center justify-center text-center px-4">
        <div className="absolute inset-0 z-0 h-full w-full bg-transparent bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] bg-[radial-gradient(circle_farthest-side,rgba(120,81,229,0.3),rgba(255,255,255,0))] rounded-full" />
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        className="text-5xl md:text-7xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 leading-tight"
      >
        Developer that puts your Ideas everywhere
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: 'easeInOut' }}
        className="mt-6 max-w-2xl text-lg text-neutral-300"
      >
        Creativity isn't just about building - it's about innovating. My code puts your vision front and center, ensuring you're not just functional, but exceptional.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease: 'easeInOut' }}
        className="mt-8"
      >
        <button
          onClick={scrollToProjects}
          className="px-8 py-3 font-semibold text-white transition-all duration-300 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-full hover:scale-105 hover:shadow-lg hover:shadow-violet-500/50"
        >
          View My Work
        </button>
      </motion.div>
    </section>
  );
};

export default Hero;
