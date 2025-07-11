'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface ParticleSystemProps {
  count?: number;
  mouse?: { x: number; y: number };
}

const ParticleSystem: React.FC<ParticleSystemProps> = ({ count = 5000, mouse }) => {
  const ref = useRef<THREE.Points>(null);
  
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      // Random positions in a sphere
      const radius = Math.random() * 20 + 5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
      
      // Random colors (blue to cyan gradient)
      const colorIntensity = Math.random();
      colors[i * 3] = 0.1 + colorIntensity * 0.3; // R
      colors[i * 3 + 1] = 0.5 + colorIntensity * 0.5; // G
      colors[i * 3 + 2] = 0.8 + colorIntensity * 0.2; // B
    }
    
    return [positions, colors];
  }, [count]);

  useFrame((state) => {
    if (ref.current) {
      const time = state.clock.getElapsedTime();
      
      // Rotate the entire particle system
      ref.current.rotation.x = time * 0.1;
      ref.current.rotation.y = time * 0.05;
      
      // Mouse interaction
      if (mouse) {
        ref.current.rotation.x += mouse.y * 0.0005;
        ref.current.rotation.y += mouse.x * 0.0005;
      }
      
      // Update individual particle positions for floating effect
      const positions = ref.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += Math.sin(time + positions[i]) * 0.001;
      }
      ref.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <Points ref={ref} positions={positions} colors={colors}>
      <PointMaterial
        transparent
        vertexColors
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
};

interface FloatingParticlesProps {
  className?: string;
  mouse?: { x: number; y: number };
}

const FloatingParticles: React.FC<FloatingParticlesProps> = ({ className = '', mouse }) => {
  return (
    <div className={`fixed inset-0 -z-10 ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 10], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        <ParticleSystem mouse={mouse} />
      </Canvas>
    </div>
  );
};

export default FloatingParticles;