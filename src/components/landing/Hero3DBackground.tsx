'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { AdaptiveCanvas as Canvas } from '@/components/common/AdaptiveCanvas';

import * as THREE from 'three';
import { useInView } from 'react-intersection-observer';

function latLngToVec3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -(radius * Math.sin(phi) * Math.cos(theta)),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

const cities: [number, number][] = [
  [40.71, -74.01],
  [51.51, -0.13],
  [35.68, 139.69],
  [22.32, 114.17],
  [1.35, 103.82],
  [48.86, 2.35],
  [19.08, 72.88],
  [37.57, 126.98],
  [-33.87, 151.21],
  [55.76, 37.62],
  [25.2, 55.27],
  [-23.55, -46.63],
  [47.37, 8.54],
  [35.69, 51.39],
  [31.23, 121.47],
];

const connections: [number, number][] = [
  [0, 1],
  [0, 5],
  [1, 2],
  [1, 9],
  [2, 3],
  [3, 4],
  [4, 6],
  [5, 12],
  [6, 14],
  [7, 2],
  [8, 3],
  [10, 6],
  [11, 0],
  [13, 10],
  [14, 7],
];

function GlobeDots({ radius }: { radius: number }) {
  const [dotsGeometry, setDotsGeometry] = React.useState<THREE.BufferGeometry | null>(null);

  React.useEffect(() => {
    const img = new Image();
    const isProd = process.env.NODE_ENV === 'production';
    img.src = isProd ? '/digital-banking/earth-map.jpg' : '/earth-map.jpg';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const w = 512;
      const h = 256;
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.drawImage(img, 0, 0, w, h);
      const imgData = ctx.getImageData(0, 0, w, h).data;

      const positions: number[] = [];
      const numPoints = 40000;
      const phi = Math.PI * (3 - Math.sqrt(5));

      for (let i = 0; i < numPoints; i++) {
        const y = 1 - (i / (numPoints - 1)) * 2;
        const r = Math.sqrt(1 - y * y);
        const theta = phi * i;

        const x = Math.cos(theta) * r;
        const z = Math.sin(theta) * r;

        const latitude = Math.asin(y);
        const longitude = Math.atan2(z, x);

        const px = Math.floor(((longitude + Math.PI) / (2 * Math.PI)) * w);
        const py = Math.floor(((-latitude + Math.PI / 2) / Math.PI) * h);

        const safePx = Math.max(0, Math.min(w - 1, px));
        const safePy = Math.max(0, Math.min(h - 1, py));

        const idx = (safePy * w + safePx) * 4;

        if (imgData[idx] < 50) {
          positions.push(x * radius, y * radius, z * radius);
        }
      }

      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
      setDotsGeometry(geo);
    };
  }, [radius]);

  if (!dotsGeometry) return null;

  return (
    <points geometry={dotsGeometry}>
      <pointsMaterial
        color="#10b981"
        size={0.03}
        transparent
        opacity={0.8}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function GlobeGrid({ radius }: { radius: number }) {
  const lines = useMemo(() => {
    const result: THREE.Vector3[][] = [];

    for (let lat = -60; lat <= 60; lat += 30) {
      const points: THREE.Vector3[] = [];
      for (let lng = 0; lng <= 360; lng += 5) {
        points.push(latLngToVec3(lat, lng, radius));
      }
      result.push(points);
    }

    for (let lng = 0; lng < 360; lng += 30) {
      const points: THREE.Vector3[] = [];
      for (let lat = -90; lat <= 90; lat += 5) {
        points.push(latLngToVec3(lat, lng, radius));
      }
      result.push(points);
    }
    return result;
  }, [radius]);

  return (
    <group>
      {lines.map((points, i) => {
        const geo = new THREE.BufferGeometry().setFromPoints(points);
        return (
          // @ts-ignore
          <line key={i} geometry={geo}>
            <lineBasicMaterial color="#10b981" transparent opacity={0.1} linewidth={1} />
          </line>
        );
      })}
    </group>
  );
}

function CityNodes({ radius }: { radius: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const tempMatrix = useMemo(() => new THREE.Matrix4(), []);
  const tempVector = useMemo(() => new THREE.Vector3(), []);
  const tempScale = useMemo(() => new THREE.Vector3(), []);

  const positions = useMemo(() => {
    return cities.map((city) => latLngToVec3(city[0], city[1], radius));
  }, [radius]);

  useFrame((state) => {
    if (!meshRef.current) return;
    positions.forEach((pos, i) => {
      const s = 1 + Math.sin(state.clock.elapsedTime * 2 + i) * 0.3;
      tempVector.copy(pos);
      tempScale.setScalar(s);
      tempMatrix.compose(tempVector, new THREE.Quaternion(), tempScale);
      meshRef.current!.setMatrixAt(i, tempMatrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, cities.length]}>
      <sphereGeometry args={[0.04, 8, 8]} />
      <meshBasicMaterial color="#10b981" transparent opacity={0.9} />
    </instancedMesh>
  );
}

function ConnectionArcs({ radius }: { radius: number }) {
  const arcs = useMemo(() => {
    return connections.map(([fromIdx, toIdx]) => {
      const from = latLngToVec3(cities[fromIdx][0], cities[fromIdx][1], radius);
      const to = latLngToVec3(cities[toIdx][0], cities[toIdx][1], radius);

      const mid = new THREE.Vector3().addVectors(from, to).multiplyScalar(0.5);
      const dist = from.distanceTo(to);
      mid.normalize().multiplyScalar(radius + dist * 0.25);

      const curve = new THREE.QuadraticBezierCurve3(from, mid, to);
      return curve.getPoints(40);
    });
  }, [radius]);

  return (
    <group>
      {arcs.map((points, i) => {
        const geo = new THREE.BufferGeometry().setFromPoints(points);
        return (
          // @ts-ignore
          <line key={i} geometry={geo}>
            <lineBasicMaterial
              color={i % 2 === 0 ? '#10b981' : '#06b6d4'}
              transparent
              opacity={0.25}
              linewidth={1}
            />
          </line>
        );
      })}
    </group>
  );
}

function DataPackets({ radius, isLight }: { radius: number; isLight?: boolean }) {
  const packetData = useMemo(() => {
    return connections.map(([fromIdx, toIdx]) => {
      const from = latLngToVec3(cities[fromIdx][0], cities[fromIdx][1], radius);
      const to = latLngToVec3(cities[toIdx][0], cities[toIdx][1], radius);
      const mid = new THREE.Vector3().addVectors(from, to).multiplyScalar(0.5);
      const dist = from.distanceTo(to);
      mid.normalize().multiplyScalar(radius + dist * 0.25);
      return {
        curve: new THREE.QuadraticBezierCurve3(from, mid, to),
        speed: 0.15 + Math.random() * 0.2,
        offset: Math.random(),
      };
    });
  }, [radius]);

  const meshRefs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame((state) => {
    packetData.forEach((p, i) => {
      const mesh = meshRefs.current[i];
      if (mesh) {
        const t = (state.clock.elapsedTime * p.speed + p.offset) % 1;
        const pos = p.curve.getPointAt(t);
        mesh.position.copy(pos);

        const opacity = Math.sin(t * Math.PI);
        (mesh.material as THREE.MeshBasicMaterial).opacity = opacity * 0.9;
      }
    });
  });

  return (
    <group>
      {packetData.map((p, i) => (
        <mesh
          key={i}
          ref={(el) => {
            meshRefs.current[i] = el;
          }}
        >
          <sphereGeometry args={[0.03, 6, 6]} />
          <meshBasicMaterial
            color={i % 2 === 0 ? '#34d399' : '#22d3ee'}
            transparent
            opacity={0}
            blending={isLight ? THREE.NormalBlending : THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

function OrbitRing({
  radius,
  count,
  speed,
  color,
  size,
  isLight,
}: {
  radius: number;
  count: number;
  speed: number;
  color: string;
  size: number;
  isLight?: boolean;
}) {
  const meshRefs = useRef<(THREE.Mesh | null)[]>([]);
  const offsets = useMemo(
    () => Array.from({ length: count }, (_, i) => (i / count) * Math.PI * 2),
    [count]
  );

  useFrame((state) => {
    offsets.forEach((offset, i) => {
      const mesh = meshRefs.current[i];
      if (mesh) {
        const angle = state.clock.elapsedTime * speed + offset;
        mesh.position.x = Math.cos(angle) * radius;
        mesh.position.z = Math.sin(angle) * radius;
        mesh.position.y = Math.sin(angle * 2) * 0.3;
      }
    });
  });

  return (
    <group>
      {offsets.map((_, i) => (
        <mesh
          key={i}
          ref={(el) => {
            meshRefs.current[i] = el;
          }}
        >
          <sphereGeometry args={[size, 6, 6]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={isLight ? 0.9 : 0.6}
            blending={isLight ? THREE.NormalBlending : THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

function AtmosphereGlow({ radius, isLight }: { radius: number; isLight?: boolean }) {
  return (
    <mesh>
      <sphereGeometry args={[radius + 0.15, 32, 32]} />
      <meshBasicMaterial
        color="#10b981"
        transparent
        opacity={isLight ? 0.08 : 0.04}
        side={THREE.BackSide}
        depthWrite={false}
      />
    </mesh>
  );
}

function GlobeScene({ isLight }: { isLight: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const targetRotation = useRef({ x: 0, y: 0 });
  const RADIUS = 3;

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      targetRotation.current.y = nx * 0.6;
      targetRotation.current.x = -ny * 0.3;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      const t = state.clock.elapsedTime;

      const autoY = t * 0.1 + 15.0 * (1 - Math.exp(-1.5 * t));
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        autoY + targetRotation.current.y,
        0.05
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        0.15 + targetRotation.current.x,
        0.02
      );

      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      {}
      <mesh>
        <sphereGeometry args={[RADIUS, 64, 64]} />
        <meshPhysicalMaterial
          color={isLight ? '#1e3a8a' : '#0a1628'}
          metalness={isLight ? 0.05 : 0.1}
          roughness={isLight ? 0.4 : 0.8}
          clearcoat={0}
          transparent
          opacity={0.85}
          transmission={0.1}
        />
      </mesh>

      {}
      <GlobeDots radius={RADIUS + 0.01} />
      <GlobeGrid radius={RADIUS + 0.02} />
      <CityNodes radius={RADIUS + 0.03} />
      <ConnectionArcs radius={RADIUS + 0.03} />
      <DataPackets radius={RADIUS + 0.03} isLight={isLight} />
      <AtmosphereGlow radius={RADIUS} isLight={isLight} />

      {}
      <OrbitRing
        radius={RADIUS + 0.8}
        count={12}
        speed={0.3}
        color="#10b981"
        size={0.025}
        isLight={isLight}
      />
      <OrbitRing
        radius={RADIUS + 1.2}
        count={8}
        speed={-0.2}
        color="#06b6d4"
        size={0.02}
        isLight={isLight}
      />
    </group>
  );
}

import { useTheme } from 'next-themes';

export default function Hero3DBackground() {
  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme === 'light';
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0 });
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div ref={ref} className="absolute inset-0 z-10 pointer-events-none opacity-100">
      {inView && !isMobile && (
        <Canvas gl={{ antialias: true, alpha: true }} camera={{ position: [0, 0, 12], fov: 40 }}>
          {}
          <ambientLight intensity={isLight ? 0.6 : 0.3} />
          <directionalLight position={[5, 5, 5]} intensity={isLight ? 1.0 : 0.8} color="#ffffff" />
          <directionalLight position={[-5, 3, -5]} intensity={0.4} color="#06b6d4" />
          <pointLight
            position={[0, 0, 5]}
            intensity={isLight ? 1.0 : 0.6}
            color="#10b981"
            distance={12}
            decay={2}
          />

          <React.Suspense fallback={null}>
            <GlobeScene isLight={isLight} />
          </React.Suspense>
        </Canvas>
      )}

      {isMobile && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-[280px] h-[280px] flex items-center justify-center mt-[-10vh]">
            {}
            <div className="absolute w-[180px] h-[180px] rounded-full bg-[var(--accent)] blur-[60px] opacity-20 animate-pulse" />

            {}
            <div className="absolute inset-0 rounded-full border border-[rgba(var(--accent-rgb),0.1)] border-t-[rgba(var(--accent-rgb),0.5)] animate-[spin_10s_linear_infinite]" />
            <div className="absolute inset-[15%] rounded-full border border-[rgba(var(--accent-rgb),0.1)] border-b-[rgba(var(--accent-rgb),0.5)] animate-[spin_15s_linear_infinite_reverse]" />
            <div className="absolute inset-[30%] rounded-full border border-dashed border-[rgba(var(--accent-rgb),0.3)] animate-[spin_20s_linear_infinite]" />

            {}
            <div className="absolute w-12 h-12 rounded-full bg-[rgba(var(--accent-rgb),0.1)] border border-[var(--accent)] flex items-center justify-center shadow-[0_0_20px_rgba(var(--accent-rgb),0.4)]">
              <div className="w-2 h-2 rounded-full bg-[var(--accent)] animate-ping" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
