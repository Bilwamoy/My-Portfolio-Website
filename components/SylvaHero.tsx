'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import * as THREE from 'three';
import anime from 'animejs';

interface SylvaHeroProps {
  variant?: string;
  headingText?: string;
  subheadingText?: string;
}

const PROJECT_MODES = [
  {
    id: 'voicer',
    label: 'VOICER AUDIO ML',
    title: 'Zero-Shot Voice Conversion System',
    desc: 'Pipeline: Demucs → HuBERT → Resemblyzer embeddings → FreeVC → HiFi-GAN waveform generation (MOS 3.92)',
    color: '#0ea5e9',
  },
  {
    id: 'collabmind',
    label: 'COLLABMIND RAG',
    title: 'AI Collaborative Workspace',
    desc: 'RAG-integrated document grounding, interactive Knowledge Graph visualizations, and Claymorphism UI',
    color: '#f59e0b',
  },
  {
    id: 'nexora',
    label: 'NEXORA & BREW BLISS',
    title: 'Scalable E-Commerce Platforms',
    desc: 'Next.js 16, React 19, MongoDB, and Firebase animated web applications with real-time cart flow',
    color: '#10b981',
  },
];

export const SylvaHero: React.FC<SylvaHeroProps> = () => {
  const { theme } = useTheme();
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeMode, setActiveMode] = useState(0);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const isDark = theme === 'dark' || document.documentElement.classList.contains('dark');

    // Three.js Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, 0, 7);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Dynamic 3D Geometry: Torus Knot + Particle Field
    const knotGeo = new THREE.TorusKnotGeometry(1.6, 0.45, 100, 16);
    const knotMat = new THREE.MeshStandardMaterial({
      color: isDark ? 0x38bdf8 : 0x0284c7,
      wireframe: true,
      metalness: 0.8,
      roughness: 0.2,
      emissive: isDark ? 0x0284c7 : 0x38bdf8,
      emissiveIntensity: 0.2,
    });
    const knotMesh = new THREE.Mesh(knotGeo, knotMat);
    scene.add(knotMesh);

    // Floating 3D Node Particles
    const particleCount = 150;
    const particleGeo = new THREE.BufferGeometry();
    const posArray = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 14;
      posArray[i + 1] = (Math.random() - 0.5) * 8;
      posArray[i + 2] = (Math.random() - 0.5) * 8;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.07,
      color: isDark ? 0xfbbf24 : 0x0ea5e9,
      transparent: true,
      opacity: 0.75,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, isDark ? 0.4 : 0.8);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(isDark ? 0x38bdf8 : 0x0ea5e9, 2, 20);
    pointLight.position.set(3, 4, 5);
    scene.add(pointLight);

    // Anime.js Interactive Floating Animation
    const animObj = { rotSpeed: 0.01, scale: 1 };
    anime({
      targets: animObj,
      scale: [0.95, 1.05],
      duration: 3000,
      direction: 'alternate',
      loop: true,
      easing: 'easeInOutSine',
      update: () => {
        if (knotMesh) {
          knotMesh.scale.setScalar(animObj.scale);
        }
      },
    });

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Render loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      knotMesh.rotation.x += delta * 0.4;
      knotMesh.rotation.y += delta * 0.5;
      particles.rotation.y += delta * 0.1;

      camera.position.x += (mouseX * 0.6 - camera.position.x) * 0.05;
      camera.position.y += (mouseY * 0.6 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      knotGeo.dispose();
      knotMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, [theme]);

  const currentMode = PROJECT_MODES[activeMode];

  return (
    <section className="relative w-full h-[520px] sm:h-[600px] rounded-3xl overflow-hidden my-12 border border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-950/70 backdrop-blur-2xl text-slate-900 dark:text-slate-100 shadow-2xl transition-colors duration-500">
      {/* 3D Canvas Layer */}
      <div ref={mountRef} className="absolute inset-0 w-full h-full pointer-events-auto" />

      {/* Glass Overlay Top Header Bar */}
      <div className="absolute top-6 left-6 right-6 flex flex-wrap items-center justify-between gap-4 z-20">
        <div className="flex items-center gap-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl px-4 py-2 rounded-full border border-slate-200 dark:border-slate-800 text-xs font-mono text-sky-600 dark:text-sky-400 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
          <span>3D ARCHITECTURE & SPEECH AI</span>
        </div>

        {/* Liquid-Metal Control Pills */}
        <div className="flex items-center gap-1.5 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-1.5 rounded-full border border-slate-200 dark:border-slate-800 text-xs font-mono shadow-sm">
          {PROJECT_MODES.map((mode, idx) => (
            <button
              key={mode.id}
              onClick={() => setActiveMode(idx)}
              className={`px-3 py-1 rounded-full uppercase tracking-wider transition-all duration-300 ${
                activeMode === idx
                  ? 'bg-sky-500 text-white font-bold shadow-md shadow-sky-500/25'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
              }`}
            >
              {mode.label}
            </button>
          ))}
        </div>
      </div>

      {/* Foreground Project Content Overlay */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 pointer-events-none">
        <motion.span
          key={currentMode.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs font-mono uppercase tracking-[0.25em] text-sky-600 dark:text-sky-400 mb-3 bg-sky-50 dark:bg-slate-900/80 px-4 py-1.5 rounded-full border border-sky-400/30"
        >
          {currentMode.label}
        </motion.span>

        <motion.h2
          key={currentMode.title}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-syne text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight max-w-3xl text-slate-900 dark:text-white drop-shadow-sm"
        >
          {currentMode.title}
        </motion.h2>

        <motion.p
          key={currentMode.desc}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-4 max-w-xl text-sm sm:text-base font-sans text-slate-600 dark:text-slate-300 leading-relaxed drop-shadow"
        >
          {currentMode.desc}
        </motion.p>
      </div>

      {/* Footer Meta Details */}
      <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between z-20 text-[11px] font-mono text-slate-500 dark:text-slate-400 pointer-events-none">
        <span>INTERACTIVE 3D WEBGL ENGINE</span>
        <span>BILWAMOY PORTFOLIO</span>
      </div>
    </section>
  );
};

export default SylvaHero;
