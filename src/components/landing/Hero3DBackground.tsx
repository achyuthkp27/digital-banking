'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrthographicCamera, Float, Text, Billboard, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

// Premium dark glass material for servers (Brightened slightly)
const serverMaterial = new THREE.MeshPhysicalMaterial({
  color: '#1e293b', // Lighter slate so it's visible
  metalness: 0.7,
  roughness: 0.2,
  transparent: true,
  opacity: 0.9,
  transmission: 0.4,
  ior: 1.5,
  thickness: 2,
});

// Glowing materials
const accentMaterial = new THREE.MeshBasicMaterial({ color: '#10b981', transparent: true, opacity: 0.7 });
const cyanMaterial = new THREE.MeshBasicMaterial({ color: '#06b6d4', transparent: true, opacity: 0.7 });

function CentralDatabase() {
  return (
    <group position={[0, 1.5, 0]}>
      <mesh material={serverMaterial} position={[0, -1, 0]}>
        <cylinderGeometry args={[2.5, 2.5, 1, 32]} />
      </mesh>
      <mesh material={accentMaterial} position={[0, -0.45, 0]}>
        <cylinderGeometry args={[2.55, 2.55, 0.1, 32]} />
      </mesh>
      <mesh material={serverMaterial} position={[0, 0, 0]}>
        <cylinderGeometry args={[2.5, 2.5, 0.8, 32]} />
      </mesh>
      <mesh material={cyanMaterial} position={[0, 0.45, 0]}>
        <cylinderGeometry args={[2.55, 2.55, 0.1, 32]} />
      </mesh>
      <mesh material={serverMaterial} position={[0, 1, 0]}>
        <cylinderGeometry args={[2.5, 2.5, 1, 32]} />
      </mesh>
    </group>
  );
}

function ServerRack({ position, color }: { position: [number, number, number], color: 'emerald' | 'cyan' }) {
  const glowMat = color === 'emerald' ? accentMaterial : cyanMaterial;
  const hoverGroup = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (hoverGroup.current) {
      hoverGroup.current.position.y = Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.15;
    }
  });

  return (
    <group position={position}>
      <mesh material={serverMaterial} position={[0, 0.2, 0]}>
        <boxGeometry args={[3, 0.4, 3]} />
      </mesh>
      <mesh material={serverMaterial} position={[0, 3, 0]}>
        <boxGeometry args={[2.2, 5, 2.2]} />
      </mesh>
      <group ref={hoverGroup} position={[0, 6, 0]}>
        <mesh material={glowMat} position={[0, 0.2, 0]}>
          <boxGeometry args={[1.8, 0.1, 1.8]} />
        </mesh>
        <mesh material={serverMaterial} position={[0, 0.6, 0]}>
          <boxGeometry args={[2.2, 0.5, 2.2]} />
        </mesh>
      </group>
    </group>
  );
}

function CircuitLines() {
  const paths = [
    [new THREE.Vector3(7, 0, 7), new THREE.Vector3(7, 0, 3), new THREE.Vector3(3, 0, 3)],
    [new THREE.Vector3(-7, 0, 7), new THREE.Vector3(-7, 0, 3), new THREE.Vector3(-3, 0, 3)],
    [new THREE.Vector3(7, 0, -7), new THREE.Vector3(7, 0, -3), new THREE.Vector3(3, 0, -3)],
    [new THREE.Vector3(-7, 0, -7), new THREE.Vector3(-7, 0, -3), new THREE.Vector3(-3, 0, -3)],
  ];

  return (
    <group>
      {paths.map((points, i) => {
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        return (
          // @ts-ignore
          <line key={i} geometry={geometry}>
            <lineBasicMaterial color={i % 2 === 0 ? "#10b981" : "#06b6d4"} transparent opacity={0.3} linewidth={2} />
          </line>
        );
      })}
    </group>
  );
}

function DataPackets() {
  const [packets] = React.useState<any[]>(() => 
    Array.from({ length: 12 }).map((_, i) => ({
      // eslint-disable-next-line react-hooks/purity
      progress: Math.random(),
      // eslint-disable-next-line react-hooks/purity
      speed: 0.008 + Math.random() * 0.015,
      pathIndex: i % 4,
      meshRef: React.createRef<THREE.Mesh>(),
    }))
  );

  useFrame(() => {
    if (packets.length === 0) return;
    const paths = [
      [new THREE.Vector3(7, 0, 7), new THREE.Vector3(7, 0, 3), new THREE.Vector3(3, 0, 3)],
      [new THREE.Vector3(-7, 0, 7), new THREE.Vector3(-7, 0, 3), new THREE.Vector3(-3, 0, 3)],
      [new THREE.Vector3(7, 0, -7), new THREE.Vector3(7, 0, -3), new THREE.Vector3(3, 0, -3)],
      [new THREE.Vector3(-7, 0, -7), new THREE.Vector3(-7, 0, -3), new THREE.Vector3(-3, 0, -3)],
    ];

    packets.forEach((p) => {
      p.progress += p.speed;
      if (p.progress > 1) p.progress = 0;

      if (p.meshRef.current) {
        const path = paths[p.pathIndex];
        let pos;
        if (p.progress < 0.5) {
          const t = p.progress * 2;
          pos = new THREE.Vector3().lerpVectors(path[0], path[1], t);
        } else {
          const t = (p.progress - 0.5) * 2;
          pos = new THREE.Vector3().lerpVectors(path[1], path[2], t);
        }
        p.meshRef.current.position.copy(pos);
        const opacity = Math.sin(p.progress * Math.PI);
        (p.meshRef.current.material as THREE.MeshBasicMaterial).opacity = opacity;
      }
    });
  });

  return (
    <group>
      {packets.map((p, i) => (
        <mesh key={i} ref={p.meshRef}>
          <boxGeometry args={[0.5, 0.5, 0.5]} />
          <meshBasicMaterial color={i % 2 === 0 ? "#10b981" : "#06b6d4"} transparent opacity={0} blending={THREE.AdditiveBlending} />
        </mesh>
      ))}
    </group>
  );
}

// --- NEW ENHANCEMENTS ---

function CreditCard({ position, rotation, color }: { position: [number, number, number], rotation: [number, number, number], color: string }) {
  return (
    <Float speed={2.5} rotationIntensity={1.5} floatIntensity={2.5} position={position}>
      <group rotation={rotation}>
        <RoundedBox args={[3.4, 2.1, 0.1]} radius={0.1} smoothness={4}>
          <meshPhysicalMaterial color={color} metalness={0.8} roughness={0.3} clearcoat={1} />
        </RoundedBox>
        {/* Chip */}
        <mesh position={[-1.1, 0.3, 0.06]}>
          <boxGeometry args={[0.5, 0.4, 0.05]} />
          <meshStandardMaterial color="#fbbf24" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Magnetic Strip */}
        <mesh position={[0, 0.6, -0.06]}>
          <boxGeometry args={[3.4, 0.4, 0.05]} />
          <meshStandardMaterial color="#000000" />
        </mesh>
      </group>
    </Float>
  );
}



function SceneControls() {
  const groupRef = useRef<THREE.Group>(null);
  const targetRotation = useRef({ x: 0, y: 0 });

  React.useEffect(() => {
    if (groupRef.current) groupRef.current.scale.set(0.01, 0.01, 0.01);

    const handleMouseMove = (e: MouseEvent) => {
      targetRotation.current.y = ((e.clientX / window.innerWidth) * 2 - 1) * Math.PI / 8;
      targetRotation.current.x = -((e.clientY / window.innerHeight) * 2 - 1) * Math.PI / 16;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.04);
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3 - 2;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotation.current.y, 0.05);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotation.current.x, 0.05);
    }
  });

  return (
    <group ref={groupRef}>
      <CentralDatabase />
      <ServerRack position={[7, 0, 7]} color="emerald" />
      <ServerRack position={[-7, 0, 7]} color="cyan" />
      <ServerRack position={[7, 0, -7]} color="cyan" />
      <ServerRack position={[-7, 0, -7]} color="emerald" />
      <CircuitLines />
      <DataPackets />
      
      {/* Rich Banking Elements */}
      <CreditCard position={[-6, 4, -4]} rotation={[0, Math.PI / 4, 0]} color="#0f172a" />
      <CreditCard position={[6, 3, 5]} rotation={[0, -Math.PI / 3, Math.PI / 6]} color="#10b981" />
    </group>
  );
}

export default function Hero3DBackground() {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 10, pointerEvents: 'none', opacity: 1 }}>
      <Canvas gl={{ antialias: true, alpha: true }}>
        <OrthographicCamera 
          makeDefault 
          position={[25, 25, 25]} 
          zoom={28} 
          near={-100} 
          far={100} 
          onUpdate={c => c.lookAt(0, 0, 0)}
        />
        
        {/* Much brighter lighting so objects are clearly visible */}
        <ambientLight intensity={1.5} />
        <directionalLight position={[10, 20, 10]} intensity={2.5} color="#ffffff" />
        <directionalLight position={[-10, 15, -10]} intensity={1.5} color="#06b6d4" />
        <spotLight position={[0, 20, 0]} angle={0.8} penumbra={1} intensity={2} color="#10b981" />
        
        <React.Suspense fallback={null}>
          <SceneControls />
        </React.Suspense>
      </Canvas>
    </div>
  );
}
