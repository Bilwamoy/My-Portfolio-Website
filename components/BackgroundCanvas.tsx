'use client';

import React, { useRef, Suspense, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { TorusKnot } from '@react-three/drei';
import { MathUtils, Group } from 'three';

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
      return this.props.fallback || <div className="w-full h-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />;
    }

    return this.props.children;
  }
}

const Scene: React.FC = () => {
  const meshRef = useRef<Group>(null);
  const cursorRef = useRef({ x: -100, y: -100 });

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Large expansive TorusKnot geometry parameters: [radius, tube, tubularSegments, radialSegments, p, q]
  const torusKnotArgs = useMemo(() => [2.6, 0.55, 128, 24, 2, 3] as [number, number, number, number, number, number], []);

  useFrame((state, delta) => {
    if (!meshRef.current || state.viewport.width === 0 || state.viewport.height === 0) {
      return;
    }

    // Smooth ambient rotation
    meshRef.current.rotation.x += delta * 0.18;
    meshRef.current.rotation.y += delta * 0.25;
    
    // Interactive mouse parallax response
    const viewportWidth = Math.max(state.viewport.width, 1);
    const viewportHeight = Math.max(state.viewport.height, 1);
    
    const targetX = Math.max(-1, Math.min(1, (cursorRef.current.x / viewportWidth - 0.5) * 2));
    const targetY = Math.max(-1, Math.min(1, -(cursorRef.current.y / viewportHeight - 0.5) * 2));
    
    meshRef.current.position.x = MathUtils.lerp(meshRef.current.position.x, targetX * 0.8, 0.04);
    meshRef.current.position.y = MathUtils.lerp(meshRef.current.position.y, targetY * 0.8, 0.04);
  });

  return (
    <group ref={meshRef} scale={[1.25, 1.25, 1.25]}>
      <TorusKnot args={torusKnotArgs}>
        <meshStandardMaterial 
          color="#38bdf8"
          emissive="#0284c7"
          emissiveIntensity={0.15}
          metalness={0.7} 
          roughness={0.3}
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

const BackgroundCanvas: React.FC = () => {
  return (
    <div className="fixed inset-0 w-full h-full -z-10 opacity-60 dark:opacity-35 transition-opacity duration-700 pointer-events-none overflow-hidden">
      <ThreeErrorBoundary fallback={<CanvasFallback />}>
        <Suspense fallback={<CanvasFallback />}>
          <Canvas 
            camera={{ position: [0, 0, 4.2], fov: 60 }}
            dpr={[1, 1.5]}
            performance={{ min: 0.5 }}
            gl={{
              antialias: false,
              alpha: true,
              powerPreference: "default"
            }}
          >
            <ambientLight intensity={0.4} />
            <pointLight position={[10, 10, 10]} intensity={1.2} />
            <pointLight position={[-10, -10, -10]} intensity={0.6} color="#fbbf24" />
            <Scene />
          </Canvas>
        </Suspense>
      </ThreeErrorBoundary>
    </div>
  );
};

export default BackgroundCanvas;