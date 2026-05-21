'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, RoundedBox, Text, Trail, MeshWobbleMaterial, Edges } from '@react-three/drei';
import * as THREE from 'three';

function DataNode({ position, color, label }: { position: [number, number, number], color: string, label: string }) {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.getElapsedTime() * 0.5;
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.5;
    }
  });

  return (
    <group position={position}>
      <Trail width={0.5} length={4} color={color} attenuation={(t) => t * t}>
        <mesh ref={ref}>
          <octahedronGeometry args={[0.3, 0]} />
          <meshBasicMaterial color={color} wireframe />
        </mesh>
      </Trail>
      <Text
        position={[0, -0.6, 0]}
        fontSize={0.2}
        color={color}
        anchorX="center"
        anchorY="middle"
        font="/fonts/Inter-Bold.ttf"
      >
        {label}
      </Text>
    </group>
  );
}

function MockupInterface() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Subtle hovering/tilting
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1 - 0.2;
      groupRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.3) * 0.05;
    }
  });

  return (
    <group ref={groupRef} position={[2, 0, 0]}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        
        {/* Main Dashboard Panel */}
        <RoundedBox args={[6, 4, 0.2]} radius={0.2} smoothness={4} position={[0, 0, 0]}>
          <meshPhysicalMaterial 
            color="#0a0a0a" 
            transparent 
            opacity={0.7} 
            roughness={0.2} 
            transmission={0.9} 
            thickness={0.5} 
          />
          <Edges color="#10b981" transparent opacity={0.2} />
        </RoundedBox>

        {/* Fake UI Elements */}
        {/* Header */}
        <mesh position={[-2.2, 1.5, 0.11]}>
          <planeGeometry args={[1, 0.2]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.2} />
        </mesh>
        
        {/* Graph Area */}
        <RoundedBox args={[5.2, 2, 0.1]} radius={0.1} position={[0, 0.2, 0.15]}>
          <meshBasicMaterial color="#ffffff" transparent opacity={0.02} />
        </RoundedBox>

        {/* Glowing graph line representation */}
        <mesh position={[0, 0.2, 0.2]}>
          <tubeGeometry args={[
            new THREE.CatmullRomCurve3([
              new THREE.Vector3(-2.4, -0.5, 0),
              new THREE.Vector3(-1.2, 0.2, 0),
              new THREE.Vector3(0, -0.2, 0),
              new THREE.Vector3(1.2, 0.6, 0),
              new THREE.Vector3(2.4, 0.8, 0),
            ]),
            64,
            0.02,
            8,
            false
          ]} />
          <meshBasicMaterial color="#10b981" />
        </mesh>

        {/* Data Nodes floating around */}
        <DataNode position={[-3, 1, 1]} color="#10b981" label="API_GW_01" />
        <DataNode position={[3, 2, 0.5]} color="#3b82f6" label="AUTH_SVC" />
        <DataNode position={[2, -2, 1.5]} color="#8b5cf6" label="DB_PRIMARY" />

      </Float>
    </group>
  );
}

export default function BankingDashboard3D() {
  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      <MockupInterface />
    </Canvas>
  );
}
