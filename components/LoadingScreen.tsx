import React, { useEffect, useState, useRef } from 'react';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
  minLoadingTime?: number; // Minimum time to show loading (in ms)
  loadingTasks?: (() => Promise<void>)[]; // Array of async tasks to complete
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ 
  onLoadingComplete, 
  minLoadingTime = 2000,
  loadingTasks = []
}) => {
  const [mounted, setMounted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    scale: number;
    rotation: number;
  }>>([]);
  const animationRef = useRef<number>();
  const startTime = useRef<number>(Date.now());

  useEffect(() => {
    setMounted(true);
    
    // Initialize particles with stable values
    const initialParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      scale: Math.random() * 0.5 + 0.5,
      rotation: Math.random() * 360,
    }));
    
    setParticles(initialParticles);

    // Handle loading completion
    const handleLoading = async () => {
      const startTime = Date.now();
      
      // Execute loading tasks
      if (loadingTasks.length > 0) {
        for (let i = 0; i < loadingTasks.length; i++) {
          try {
            await loadingTasks[i]();
            setProgress(((i + 1) / loadingTasks.length) * 100);
          } catch (error) {
            console.error('Loading task failed:', error);
          }
        }
      } else {
        // Simulate loading progress
        const progressInterval = setInterval(() => {
          setProgress(prev => {
            if (prev >= 100) {
              clearInterval(progressInterval);
              return 100;
            }
            return prev + Math.random() * 10;
          });
        }, 100);
      }

      // Ensure minimum loading time
      const elapsed = Date.now() - startTime;
      const remainingTime = Math.max(0, minLoadingTime - elapsed);
      
      setTimeout(() => {
        onLoadingComplete();
      }, remainingTime);
    };

    handleLoading();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [onLoadingComplete, minLoadingTime, loadingTasks]);

  // Optimize animation loop
  useEffect(() => {
    if (!mounted) return;

    let lastTime = 0;
    const targetFPS = 60;
    const frameInterval = 1000 / targetFPS;

    const animate = (currentTime: number) => {
      if (currentTime - lastTime >= frameInterval) {
        setParticles(prev => prev.map(particle => ({
          ...particle,
          x: (particle.x + 0.1) % 100,
          y: (particle.y + 0.05) % 100,
          rotation: (particle.rotation + 0.5) % 360,
        })));
        lastTime = currentTime;
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [mounted]);

  if (!mounted) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center overflow-hidden">
      {/* Optimized particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-2 h-2 bg-white rounded-full opacity-30"
          style={{
            transform: `translateX(${particle.x}vw) translateY(${particle.y}vh) scale(${particle.scale}) rotate(${particle.rotation}deg)`,
            willChange: 'transform',
            backfaceVisibility: 'hidden',
          }}
          suppressHydrationWarning={true}
        />
      ))}
      
      {/* Loading content */}
      <div className="text-white text-center z-10">
        <div className="text-2xl font-bold mb-4">
          Loading...
        </div>
        
        {/* Progress bar */}
        <div className="w-64 h-2 bg-gray-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-white transition-all duration-300 ease-out"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
        
        <div className="mt-2 text-sm opacity-75">
          {Math.round(progress)}%
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;