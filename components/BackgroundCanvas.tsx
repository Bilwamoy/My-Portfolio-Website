'use client';

import React, { useRef, Suspense, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { TorusKnot } from '@react-three/drei';
import { MathUtils, Group } from 'three';

interface SceneProps {
  cursorPosition: { x: number; y: number };
}

// Error Boundary Component for 3D Scene
class ThreeErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; fallback?: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.warn('3D Scene Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <div className="w-full h-full bg-gradient-to-br from-slate-900 to-slate-800" />;
    }

    return this.props.children;
  }
}

const Scene: React.FC<SceneProps> = ({ cursorPosition }) => {
  const meshRef = useRef<Group>(null);

  // Properly type the args as a tuple for TorusKnot
  const torusKnotArgs = useMemo(() => [1, 0.2, 64, 16, 1, 3] as [number, number, number, number, number, number], []);

  useFrame((state, delta) => {
    if (!meshRef.current || state.viewport.width === 0 || state.viewport.height === 0) {
      return;
    }

    // Reduced rotation speed for better performance
    meshRef.current.rotation.x += delta * 0.05;
    meshRef.current.rotation.y += delta * 0.08;
    
    // Safe viewport calculations with bounds checking
    const viewportWidth = Math.max(state.viewport.width, 1);
    const viewportHeight = Math.max(state.viewport.height, 1);
    
    const targetX = Math.max(-1, Math.min(1, (cursorPosition.x / viewportWidth - 0.5) * 2));
    const targetY = Math.max(-1, Math.min(1, -(cursorPosition.y / viewportHeight - 0.5) * 2));
    
    // Smoother interpolation with bounds
    meshRef.current.position.x = MathUtils.lerp(meshRef.current.position.x, targetX * 0.3, 0.03);
    meshRef.current.position.y = MathUtils.lerp(meshRef.current.position.y, targetY * 0.3, 0.03);
  });

  return (
    <group ref={meshRef}>
      <TorusKnot args={torusKnotArgs}>
        <meshStandardMaterial 
          color="#38bdf8"
          emissive="#22c55e"
          emissiveIntensity={0.05}
          metalness={0.6} 
          roughness={0.4}
          wireframe
        />
      </TorusKnot>
    </group>
  );
};

// Fallback component for loading state
const CanvasFallback: React.FC = () => (
  <div className="w-full h-full bg-gradient-to-br from-slate-900/20 to-slate-800/20 animate-pulse" />
);

const BackgroundCanvas: React.FC<SceneProps> = ({ cursorPosition }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 opacity-40 lg:opacity-20">
      <ThreeErrorBoundary fallback={<CanvasFallback />}>
        <Suspense fallback={<CanvasFallback />}>
          <Canvas 
            camera={{ position: [0, 0, 5], fov: 50 }}
            dpr={[1, 1.5]} // Limit device pixel ratio for performance
            performance={{ min: 0.5 }} // Allow frame rate to drop for performance
            gl={{
              antialias: false, // Disable antialiasing for better performance
              alpha: true,
              powerPreference: "default" // Use default power preference
            }}
          >
            <ambientLight intensity={0.2} />
            <pointLight position={[10, 10, 10]} intensity={0.8} />
            <Scene cursorPosition={cursorPosition} />
          </Canvas>
        </Suspense>
      </ThreeErrorBoundary>
    </div>
  );
};

export default BackgroundCanvas;