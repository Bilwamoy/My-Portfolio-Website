import React, { useEffect, useState, useRef, useCallback } from 'react';

// Interface for component props, keeping it for good practice.
interface LoadingScreenProps {
  onLoadingComplete: () => void;
  minLoadingTime?: number;
}

// --- Helper Component: Digital Rain Background ---
// This component creates a "Matrix-style" background using HTML Canvas for better performance.
const DigitalRain: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const setupCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    
    setupCanvas();

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array.from({ length: columns }).fill(1).map(() => Math.floor(Math.random() * canvas.height));

    const draw = () => {
      // Create a semi-transparent black rectangle to create the fading trail effect
      ctx.fillStyle = 'rgba(10, 10, 25, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Set color and font for the falling characters
      ctx.fillStyle = '#00f0c0'; // A vibrant cyan color
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Reset drop to the top randomly to make the rain effect uneven and continuous
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    let lastTimestamp = 0;
    const fps = 24; // Throttle to 24 FPS
    const frameInterval = 1000 / fps;

    const animate = (timestamp: number) => {
      animationFrameId = window.requestAnimationFrame(animate);
      const elapsed = timestamp - lastTimestamp;

      if (elapsed > frameInterval) {
        lastTimestamp = timestamp - (elapsed % frameInterval);
        draw();
      }
    };

    animationFrameId = window.requestAnimationFrame(animate);
    
    const debounce = (func: () => void, delay: number) => {
      let timeoutId: NodeJS.Timeout;
      return () => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(func, delay);
      };
    };

    const debouncedSetupCanvas = debounce(setupCanvas, 300);
    window.addEventListener('resize', debouncedSetupCanvas);

    // Cleanup function to cancel animation frame and remove event listener
    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', debouncedSetupCanvas);
    };
  }, [setupCanvas]);

  return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0" />;
};


// --- Helper Component: Humanoid Robot SVG ---
// A more detailed and sleek robot design using SVG. Animations are done with CSS.
const HumanoidRobot: React.FC = () => {
  return (
    <div className="relative w-48 h-64">
        {/* Using a standard style tag to avoid styled-jsx issues */}
        <style>{`
            @keyframes pulse-glow {
                0%, 100% { opacity: 0.7; }
                50% { opacity: 1; }
            }
            .eye-scan {
                animation: scan 4s linear infinite;
            }
            @keyframes scan {
                0%, 100% { transform: translateX(-6px); }
                50% { transform: translateX(6px); }
            }
            @keyframes float {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-10px); }
            }
            .robot-body {
                animation: float 6s ease-in-out infinite;
            }
        `}</style>
      <svg viewBox="0 0 150 200" className="w-full h-full robot-body">
        <defs>
          <filter id="robot-glow-filter">
            <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {/* Head */}
        <path d="M50 40 C 50 15, 100 15, 100 40 L 110 70 L 40 70 Z" fill="#B0B0C0" />
        <path d="M45 70 L 105 70 L 100 85 L 50 85 Z" fill="#808090" />
        
        {/* Faceplate / Visor */}
        <g filter="url(#robot-glow-filter)">
          <rect x="50" y="45" width="50" height="20" rx="5" fill="#101020" stroke="#00f0c0" strokeWidth="1" />
          <rect x="67" y="52" width="16" height="6" fill="#00f0c0" className="eye-scan" />
        </g>

        {/* Torso */}
        <path d="M40 90 L 110 90 L 95 150 L 55 150 Z" fill="#B0B0C0" />
        <path d="M60 95 L 90 95 L 85 140 L 65 140 Z" fill="#101020" stroke="#00f0c0" strokeWidth="1" />

        {/* Core Light */}
        <circle cx="75" cy="115" r="8" fill="#00f0c0" style={{ animation: 'pulse-glow 2s infinite' }} filter="url(#robot-glow-filter)" />

        {/* Shoulders */}
        <circle cx="40" cy="95" r="10" fill="#808090" />
        <circle cx="110" cy="95" r="10" fill="#808090" />

        {/* Arms */}
        <rect x="30" y="100" width="10" height="50" rx="5" fill="#B0B0C0" />
        <rect x="110" y="100" width="10" height="50" rx="5" fill="#B0B0C0" />
      </svg>
    </div>
  );
};


// --- Main Loading Screen Component ---
const LoadingScreen: React.FC<LoadingScreenProps> = ({
  onLoadingComplete,
  minLoadingTime = 4000, // A slightly shorter time feels snappier
}) => {
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("Booting up consciousness...");
  const [fadeOut, setFadeOut] = useState(false);
  const startTimeRef = useRef(Date.now());

  // Memoize the completion handler to prevent re-creation on re-renders.
  const handleComplete = useCallback(() => {
    setFadeOut(true);
    // Wait for the fade-out animation to finish before calling onLoadingComplete
    setTimeout(() => {
      // FIX: Add a check to ensure onLoadingComplete is a function before calling it.
      if (typeof onLoadingComplete === 'function') {
        onLoadingComplete();
      }
    }, 500);
  }, [onLoadingComplete]);

  useEffect(() => {
    const messages = [
      "Booting up consciousness...",
      "Compiling neural networks...",
      "Calibrating sensory input...",
      "Finalizing initialization sequence...",
    ];

    const progressInterval = setInterval(() => {
      const elapsedTime = Date.now() - startTimeRef.current;
      const currentProgress = Math.min(Math.floor((elapsedTime / minLoadingTime) * 100), 100);

      setProgress(currentProgress);

      if (currentProgress >= 75) {
        setMessage(messages[3]);
      } else if (currentProgress >= 50) {
        setMessage(messages[2]);
      } else if (currentProgress >= 25) {
        setMessage(messages[1]);
      }

      if (currentProgress >= 100) {
        clearInterval(progressInterval);
        handleComplete();
      }
    }, 100); // Update progress every 100ms

    return () => {
      clearInterval(progressInterval);
    };
  }, [minLoadingTime, handleComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0a0a19] transition-opacity duration-500 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <DigitalRain />
      
      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center p-4">
        
        <HumanoidRobot />

        <div className="w-full max-w-sm mt-8">
            {/* Loading Message */}
            <p className="text-cyan-300 font-mono text-lg mb-4 h-6">
                {message}
            </p>

            {/* Progress Bar */}
            <div className="w-full bg-gray-800/50 rounded-full h-2.5 backdrop-blur-sm border border-cyan-500/20">
                <div
                    className="bg-gradient-to-r from-cyan-400 to-emerald-400 h-full rounded-full transition-width duration-150 ease-linear"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
            
            {/* Progress Percentage */}
            <p className="text-emerald-400 font-mono text-sm mt-2">
                {progress}%
            </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
