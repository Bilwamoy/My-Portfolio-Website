'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { TorusKnot } from '@react-three/drei';
import { MathUtils, Group } from 'three';

interface SceneProps {
  cursorPosition: { x: number; y: number };
}

const Scene: React.FC<SceneProps> = ({ cursorPosition }) => {
  const meshRef = useRef<Group>(null);

  useFrame((state, delta) => {
    if (!meshRef.current || state.viewport.width === 0 || state.viewport.height === 0) {
      return;
    }

    meshRef.current.rotation.x += delta * 0.1;
    meshRef.current.rotation.y += delta * 0.15;
    
    const targetX = (cursorPosition.x / state.viewport.width - 0.5) * 2;
    const targetY = -(cursorPosition.y / state.viewport.height - 0.5) * 2;
    
    meshRef.current.position.x = MathUtils.lerp(meshRef.current.position.x, targetX * 0.5, 0.05);
    meshRef.current.position.y = MathUtils.lerp(meshRef.current.position.y, targetY * 0.5, 0.05);
  });

  return (
    <group ref={meshRef}>
      <TorusKnot args={[1, 0.2, 200, 32, 1, 3]}>
        <meshStandardMaterial 
          color="#38bdf8" 
          emissive="#22c55e"
          emissiveIntensity={0.1}
          metalness={0.8} 
          roughness={0.2}
          wireframe
        />
      </TorusKnot>
    </group>
  );
};


const BackgroundCanvas: React.FC<SceneProps> = ({ cursorPosition }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 opacity-40 lg:opacity-20">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Scene cursorPosition={cursorPosition} />
      </Canvas>
    </div>
  );
};

export default BackgroundCanvas;
