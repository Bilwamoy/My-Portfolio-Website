'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
  minLoadingTime?: number;
}

interface Particle3D {
  x: number;
  y: number;
  z: number;
  ox: number;
  oy: number;
  oz: number;
  radius: number;
  color: string;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  onLoadingComplete,
  minLoadingTime = 2200,
}) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Smooth counter progress
  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const calculatedProgress = Math.min(100, Math.floor((elapsed / minLoadingTime) * 100));

      // Add slight ease-out to progress percentage display
      const easedProgress = Math.round(100 * Math.sin((calculatedProgress / 100) * (Math.PI / 2)));
      setProgress(Math.max(calculatedProgress, easedProgress));

      if (elapsed >= minLoadingTime) {
        clearInterval(interval);
        setProgress(100);
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => {
            onLoadingComplete();
          }, 800);
        }, 300);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [minLoadingTime, onLoadingComplete]);

  // 3D Particle Constellation Ring Canvas Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Create 3D particles on a ring / sphere surface
    const particleCount = 140;
    const particles: Particle3D[] = [];
    const radius = Math.min(width, height) * 0.22;

    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      const isGold = Math.random() > 0.75;
      particles.push({
        x, y, z,
        ox: x, oy: y, oz: z,
        radius: Math.random() * 1.8 + 1,
        color: isGold ? '#fbbf24' : '#38bdf8',
      });
    }

    let angleX = 0;
    let angleY = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Rotate light/dark ambient gradient fill
      const grad = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, radius * 2);
      grad.addColorStop(0, 'rgba(56, 189, 248, 0.08)');
      grad.addColorStop(0.5, 'rgba(251, 191, 36, 0.03)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      angleX += 0.008;
      angleY += 0.012;

      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);

      // Project 3D to 2D
      const projected = particles.map((p) => {
        // Rotate Y
        let x1 = p.ox * cosY - p.oz * sinY;
        let z1 = p.ox * sinY + p.oz * cosY;

        // Rotate X
        let y1 = p.oy * cosX - z1 * sinX;
        let z2 = p.oy * sinX + z1 * cosX;

        // Perspective scale
        const fov = 400;
        const scale = fov / (fov + z2 + 300);
        const px = width / 2 + x1 * scale;
        const py = height / 2 + y1 * scale;

        return { px, py, scale, z: z2, color: p.color, radius: p.radius * scale };
      });

      // Sort by Z for realistic depth render
      projected.sort((a, b) => b.z - a.z);

      // Draw connecting lines (constellation)
      ctx.lineWidth = 0.5;
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const dx = projected[i].px - projected[j].px;
          const dy = projected[i].py - projected[j].py;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 65) {
            const alpha = (1 - dist / 65) * 0.25 * Math.min(projected[i].scale, projected[j].scale);
            ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(projected[i].px, projected[i].py);
            ctx.lineTo(projected[j].px, projected[j].py);
            ctx.stroke();
          }
        }
      }

      // Draw particle nodes
      projected.forEach((p) => {
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0.2, Math.min(1, p.scale));
        ctx.beginPath();
        ctx.arc(p.px, p.py, p.radius, 0, Math.PI * 2);
        ctx.fill();

        // Glow ring around prominent nodes
        if (p.radius > 1.5) {
          ctx.strokeStyle = p.color;
          ctx.lineWidth = 0.4;
          ctx.beginPath();
          ctx.arc(p.px, p.py, p.radius * 2.2, 0, Math.PI * 2);
          ctx.stroke();
        }
      });

      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          key="loader-container"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-between bg-slate-950 text-slate-100 overflow-hidden select-none"
        >
          {/* Background 3D Canvas */}
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

          {/* Top Bar Metadata */}
          <div className="w-full max-w-7xl px-8 pt-8 flex items-center justify-between z-10 text-xs font-mono tracking-widest text-slate-400 uppercase">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              SYSTEM ACTIVE
            </span>
            <span>BILWAMOY CHAKRABORTY</span>
            <span>PORTFOLIO &apos;26</span>
          </div>

          {/* Center Interactive Core */}
          <div className="relative z-10 flex flex-col items-center justify-center my-auto">
            {/* Progress Percentage Display */}
            <div className="relative mb-6">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-syne text-7xl sm:text-9xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-amber-300 to-cyan-300 drop-shadow-2xl"
              >
                {progress}%
              </motion.span>
            </div>

            {/* Glowing Loading Bar */}
            <div className="w-48 sm:w-64 h-[2px] bg-slate-800 rounded-full overflow-hidden relative">
              <motion.div
                className="h-full bg-gradient-to-r from-sky-400 via-amber-400 to-cyan-400 shadow-[0_0_12px_#38bdf8]"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut', duration: 0.2 }}
              />
            </div>

            {/* Subtitle */}
            <p className="mt-4 text-xs font-mono uppercase tracking-[0.3em] text-slate-400">
              INITIALIZING CREATIVE EXPERIENCE...
            </p>
          </div>

          {/* Bottom Bar Footer */}
          <div className="w-full max-w-7xl px-8 pb-8 flex items-center justify-between z-10 text-[11px] font-mono text-slate-500">
            <span>LOCATION: BARASAT, INDIA</span>
            <span>DESIGN + CODE</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
