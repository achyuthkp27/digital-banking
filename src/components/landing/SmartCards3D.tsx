'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { AdaptiveCanvas as Canvas } from '@/components/common/AdaptiveCanvas';
import { Float, RoundedBox, Environment } from '@react-three/drei';
import { Group, DoubleSide } from 'three';
import { useInView } from 'react-intersection-observer';

function CreditCard({ position, rotation, color, floatSpeed = 1 }: any) {
  return (
    <Float speed={floatSpeed} rotationIntensity={0.4} floatIntensity={0.6}>
      <group position={position} rotation={rotation}>
        {/* Main Card Body (Glass) */}
        <RoundedBox args={[3.37, 2.125, 0.05]} radius={0.15} smoothness={4}>
          <meshPhysicalMaterial
            color={color}
            metalness={0.2}
            roughness={0.1}
            transmission={0.95}
            thickness={0.5}
            clearcoat={1}
            clearcoatRoughness={0.1}
            ior={1.5}
            transparent
            opacity={1}
          />
        </RoundedBox>

        {/* Smart Chip (Gold/Metallic) */}
        <RoundedBox
          args={[0.4, 0.3, 0.06]}
          radius={0.05}
          smoothness={2}
          position={[-1.1, 0.35, 0.01]}
        >
          <meshStandardMaterial color="#fbbf24" metalness={0.9} roughness={0.2} />
        </RoundedBox>

        {/* Holographic/NFC Icon detail */}
        <mesh position={[-1.3, -0.5, 0.026]}>
          <ringGeometry args={[0.08, 0.12, 32]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.3} side={DoubleSide} />
        </mesh>
        <mesh position={[-1.0, -0.5, 0.026]}>
          <ringGeometry args={[0.08, 0.12, 32]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.3} side={DoubleSide} />
        </mesh>

        {/* Abstract Magnetic Strip on back (visible through glass) */}
        <mesh position={[0, 0.5, -0.026]}>
          <planeGeometry args={[3.37, 0.4]} />
          <meshBasicMaterial color="#000000" transparent opacity={0.4} side={DoubleSide} />
        </mesh>
      </group>
    </Float>
  );
}

function CardsAssembly() {
  const groupRef = useRef<Group>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1;

      const targetX = (state.pointer.x * Math.PI) / 8;
      const targetY = (state.pointer.y * Math.PI) / 8;

      groupRef.current.rotation.x += (-targetY - groupRef.current.rotation.x) * 0.05;
      groupRef.current.rotation.z += (-targetX * 0.3 - groupRef.current.rotation.z) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      <CreditCard
        position={[0, 0, 0.8]}
        rotation={[-0.1, 0.1, -0.1]}
        color="#10b981"
        floatSpeed={2.2}
      />
      <CreditCard
        position={[-0.8, 0.4, -0.2]}
        rotation={[-0.2, 0.3, -0.2]}
        color="#0ea5e9"
        floatSpeed={1.8}
      />
      <CreditCard
        position={[0.8, -0.4, -1.2]}
        rotation={[0.1, -0.2, 0.05]}
        color="#f8fafc"
        floatSpeed={2.5}
      />
    </group>
  );
}

export default function SmartCards3D() {
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0 });

  return (
    <div ref={ref} style={{ width: '100%', height: '100%', minHeight: '500px', position: 'relative' }}>
      {inView && (
        <Canvas camera={{ position: [0, 0, 8], fov: 40 }}>
          <React.Suspense fallback={null}>
            <Environment preset="city" />
            <ambientLight intensity={0.4} />
            <directionalLight position={[5, 10, 5]} intensity={2} color="#10b981" />
            <directionalLight position={[-5, -10, -5]} intensity={1} color="#0ea5e9" />
            <CardsAssembly />
          </React.Suspense>
        </Canvas>
      )}
    </div>
  );
}
