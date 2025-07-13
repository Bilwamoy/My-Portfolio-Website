import React, { useEffect, useState, useCallback, useRef } from 'react';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
  minLoadingTime?: number;
  loadingTasks?: (() => Promise<void>)[];
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ 
  onLoadingComplete, 
  minLoadingTime = 5000,
  loadingTasks = []
}) => {
  const [mounted, setMounted] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [currentMessage, setCurrentMessage] = useState("Initializing portfolio...");
  
  // Use refs to prevent stale closures
  const progressRef = useRef(0);
  const messageIndexRef = useRef(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  
  // Memoize the callback to prevent unnecessary re-renders
  const handleLoadingComplete = useCallback(() => {
    onLoadingComplete();
  }, [onLoadingComplete]);

  useEffect(() => {
    if (!mounted) {
      setMounted(true);
      return;
    }

    const messages = [
      "Initializing portfolio...",
      "Loading assets...",
      "Preparing content...",
      "Almost ready!"
    ];

    const updateProgress = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      intervalRef.current = setInterval(() => {
        progressRef.current += 2;
        setLoadingProgress(progressRef.current);

        // Update message every 25% progress
        if (progressRef.current >= 25 && messageIndexRef.current === 0) {
          setCurrentMessage(messages[1]);
          messageIndexRef.current = 1;
        } else if (progressRef.current >= 50 && messageIndexRef.current === 1) {
          setCurrentMessage(messages[2]);
          messageIndexRef.current = 2;
        } else if (progressRef.current >= 75 && messageIndexRef.current === 2) {
          setCurrentMessage(messages[3]);
          messageIndexRef.current = 3;
        }

        if (progressRef.current >= 100) {
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          
          // Start fade out
          setTimeout(() => {
            setFadeOut(true);
            setTimeout(() => {
              handleLoadingComplete();
            }, 500);
          }, 500);
        }
      }, minLoadingTime / 50);
    };

    // Execute loading tasks if provided
    const handleLoading = async () => {
      if (loadingTasks.length > 0) {
        for (let i = 0; i < loadingTasks.length; i++) {
          try {
            await loadingTasks[i]();
          } catch (error) {
            console.error('Loading task failed:', error);
          }
        }
      }
      updateProgress();
    };

    handleLoading();

    // Cleanup function
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [mounted, minLoadingTime, loadingTasks, handleLoadingComplete]);

  // Reset refs when component unmounts
  useEffect(() => {
    return () => {
      progressRef.current = 0;
      messageIndexRef.current = 0;
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  if (!mounted) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-blue-400 font-mono text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className={`fixed inset-0 overflow-hidden transition-opacity duration-500 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
      <style jsx>{`
        @keyframes wave {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(20deg); }
          50% { transform: rotate(-10deg); }
          75% { transform: rotate(15deg); }
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }

        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.5); }
          50% { box-shadow: 0 0 30px rgba(59, 130, 246, 0.8); }
        }

        @keyframes smile {
          0%, 100% { transform: scaleX(1); }
          50% { transform: scaleX(1.2); }
        }

        @keyframes blink {
          0%, 90%, 100% { transform: scaleY(1); }
          95% { transform: scaleY(0.1); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(5deg); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }

        @keyframes progressFill {
          0% { width: 0%; }
          100% { width: 100%; }
        }

        .robot-container {
          animation: bounce 2s ease-in-out infinite;
        }

        .robot-head {
          animation: float 3s ease-in-out infinite;
        }

        .robot-body {
          animation: glow 2s ease-in-out infinite;
        }

        .wave-hand {
          animation: wave 1.5s ease-in-out infinite;
          transform-origin: bottom center;
        }

        .robot-eye {
          animation: blink 4s infinite;
        }

        .robot-smile {
          animation: smile 2s ease-in-out infinite;
        }

        .floating-particle {
          animation: float 4s ease-in-out infinite;
        }

        .pulse-text {
          animation: pulse 2s ease-in-out infinite;
        }

        .progress-bar {
          background: linear-gradient(90deg, #3b82f6, #8b5cf6, #06b6d4);
          background-size: 200% 100%;
          animation: progressFill 5s ease-in-out;
        }

        .glass-panel {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
      `}</style>

      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        {/* Animated Grid */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 40% 60%, rgba(6, 182, 212, 0.3) 0%, transparent 50%)
            `
          }}></div>
        </div>

        {/* Floating Particles */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-blue-400 rounded-full floating-particle"
            style={{
              top: `${20 + Math.random() * 60}%`,
              left: `${10 + Math.random() * 80}%`,
              animationDelay: `${i * 0.8}s`,
              boxShadow: '0 0 10px rgba(59, 130, 246, 0.6)'
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        {/* Robot Avatar */}
        <div className="robot-container mb-8">
          <div className="relative">
            {/* Robot Head */}
            <div className="robot-head relative">
              <div className="w-24 h-28 bg-gradient-to-b from-gray-200 to-gray-400 rounded-full mx-auto border-2 border-gray-300 robot-body relative">
                {/* Face Screen */}
                <div className="absolute inset-3 bg-gradient-to-b from-slate-800 to-slate-900 rounded-full border border-blue-400">
                  {/* Eyes */}
                  <div className="absolute top-6 left-1/2 transform -translate-x-1/2 flex space-x-4">
                    <div className="w-3 h-3 bg-blue-400 rounded-full robot-eye" style={{boxShadow: '0 0 10px #3b82f6'}}></div>
                    <div className="w-3 h-3 bg-blue-400 rounded-full robot-eye" style={{boxShadow: '0 0 10px #3b82f6'}}></div>
                  </div>
                  {/* Smile */}
                  <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
                    <div className="w-8 h-4 border-2 border-blue-400 rounded-b-full robot-smile" style={{boxShadow: '0 0 6px #3b82f6'}}></div>
                  </div>
                </div>
                
                {/* Antenna */}
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-1 h-4 bg-gray-400 rounded-full">
                  <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-red-400 rounded-full" style={{boxShadow: '0 0 8px #ef4444'}}></div>
                </div>
              </div>
            </div>

            {/* Robot Body */}
            <div className="w-20 h-24 bg-gradient-to-b from-gray-300 to-gray-500 rounded-lg mx-auto mt-2 border-2 border-gray-400 robot-body relative">
              {/* Chest Panel */}
              <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-12 h-16 bg-gradient-to-b from-slate-700 to-slate-800 rounded border border-blue-400">
                {/* Status Light */}
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-green-400 rounded-full" style={{boxShadow: '0 0 8px #22c55e'}}></div>
                {/* Control Buttons */}
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                  <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                  <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Left Arm (Waving) */}
            <div className="absolute top-16 -left-10 wave-hand">
              <div className="w-5 h-14 bg-gradient-to-b from-gray-300 to-gray-500 rounded-full border border-gray-400 relative">
                {/* Hand */}
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gray-400 rounded-full border border-gray-500"></div>
                {/* Shoulder Joint */}
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-gray-600 rounded-full border border-blue-400"></div>
              </div>
            </div>

            {/* Right Arm */}
            <div className="absolute top-16 -right-10">
              <div className="w-5 h-14 bg-gradient-to-b from-gray-300 to-gray-500 rounded-full border border-gray-400 relative">
                {/* Hand */}
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gray-400 rounded-full border border-gray-500"></div>
                {/* Shoulder Joint */}
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-gray-600 rounded-full border border-blue-400"></div>
              </div>
            </div>

            {/* Left Leg */}
            <div className="absolute top-40 -left-3">
              <div className="w-4 h-16 bg-gradient-to-b from-gray-300 to-gray-500 rounded-full border border-gray-400 relative">
                {/* Foot */}
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-6 h-3 bg-gray-500 rounded border border-gray-400"></div>
                {/* Hip Joint */}
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-gray-600 rounded-full border border-blue-400"></div>
              </div>
            </div>

            {/* Right Leg */}
            <div className="absolute top-40 -right-3">
              <div className="w-4 h-16 bg-gradient-to-b from-gray-300 to-gray-500 rounded-full border border-gray-400 relative">
                {/* Foot */}
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-6 h-3 bg-gray-500 rounded border border-gray-400"></div>
                {/* Hip Joint */}
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-gray-600 rounded-full border border-blue-400"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Loading Message */}
        <div className="glass-panel rounded-lg p-6 mb-8 max-w-md mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Hello! 👋</h2>
          <p className="text-blue-200 pulse-text text-lg mb-4">
            We are initializing the portfolio website
          </p>
          <p className="text-slate-300 text-sm">
            Please wait while we prepare everything for you...
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-full max-w-md mx-auto">
          <div className="bg-slate-800 rounded-full h-2 mb-4 overflow-hidden">
            <div 
              className="progress-bar h-full rounded-full transition-all duration-100"
              style={{ width: `${loadingProgress}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-sm text-slate-400">
            <span>{currentMessage}</span>
            <span>{loadingProgress}%</span>
          </div>
        </div>

        {/* Loading Dots */}
        <div className="flex space-x-2 mt-6">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 bg-blue-400 rounded-full pulse-text"
              style={{
                animationDelay: `${i * 0.2}s`,
                boxShadow: '0 0 6px rgba(59, 130, 246, 0.6)'
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;