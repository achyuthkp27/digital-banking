import React, { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import {
  BufferGeometry,
  Float32BufferAttribute,
  Vector3,
  Mesh,
  MeshBasicMaterial,
  QuadraticBezierCurve3,
  AdditiveBlending,
  BackSide,
} from 'three';
import { globeCities, globeConnections } from '@/data/globeData';
import { latLngToVec3, getGlobeDotsGeometry } from '@/utils/globeUtils';

// -------------------------------------------------------------------
// Shared Materials to prevent memory leaks (Flyweight Pattern)
// -------------------------------------------------------------------
const materials = {
  dots: new MeshBasicMaterial({
    color: '#10b981',
    transparent: true,
    opacity: 0.5,
    depthWrite: false,
  }),
  grid: new MeshBasicMaterial({
    color: '#10b981',
    transparent: true,
    opacity: 0.06,
    wireframe: true,
  }),
  city: new MeshBasicMaterial({ color: '#10b981', transparent: true, opacity: 0.9 }),
  arcEmerald: new MeshBasicMaterial({ color: '#10b981', transparent: true, opacity: 0.25 }),
  arcCyan: new MeshBasicMaterial({ color: '#06b6d4', transparent: true, opacity: 0.25 }),
  packetEmerald: new MeshBasicMaterial({
    color: '#34d399',
    transparent: true,
    opacity: 0,
    blending: AdditiveBlending,
    depthWrite: false,
  }),
  packetCyan: new MeshBasicMaterial({
    color: '#22d3ee',
    transparent: true,
    opacity: 0,
    blending: AdditiveBlending,
    depthWrite: false,
  }),
  atmosphere: new MeshBasicMaterial({
    color: '#10b981',
    transparent: true,
    opacity: 0.04,
    side: BackSide,
    depthWrite: false,
  }),
};

export function GlobeDots({ radius }: { radius: number }) {
  const [geometry, setGeometry] = useState<BufferGeometry | null>(null);

  useEffect(() => {
    getGlobeDotsGeometry(radius + 0.01)
      .then(setGeometry)
      .catch(console.error);
  }, [radius]);

  if (!geometry) return null;

  return (
    <points geometry={geometry}>
      <pointsMaterial
        color="#10b981"
        size={0.03}
        transparent
        opacity={0.5}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

export function GlobeGrid({ radius }: { radius: number }) {
  const lines = useMemo(() => {
    const result: Vector3[][] = [];
    const r = radius + 0.02;
    for (let lat = -60; lat <= 60; lat += 30) {
      const points: Vector3[] = [];
      for (let lng = 0; lng <= 360; lng += 5) points.push(latLngToVec3(lat, lng, r));
      result.push(points);
    }
    for (let lng = 0; lng < 360; lng += 30) {
      const points: Vector3[] = [];
      for (let lat = -90; lat <= 90; lat += 5) points.push(latLngToVec3(lat, lng, r));
      result.push(points);
    }
    return result;
  }, [radius]);

  return (
    <group>
      {lines.map((points, i) => {
        const geo = new BufferGeometry().setFromPoints(points);
        return (
          // @ts-ignore
          <line key={`grid-${i}`} geometry={geo}>
            <lineBasicMaterial color="#10b981" transparent opacity={0.06} linewidth={1} />
          </line>
        );
      })}
    </group>
  );
}

export function CityNodes({ radius }: { radius: number }) {
  const meshRefs = useRef<(Mesh | null)[]>([]);

  useFrame((state) => {
    meshRefs.current.forEach((mesh, i) => {
      if (mesh) {
        const s = 1 + Math.sin(state.clock.elapsedTime * 2 + i) * 0.3;
        mesh.scale.setScalar(s);
      }
    });
  });

  const r = radius + 0.03;
  return (
    <group>
      {globeCities.map((city, i) => (
        <mesh
          key={`city-${i}`}
          ref={(el) => {
            meshRefs.current[i] = el;
          }}
          position={latLngToVec3(city[0], city[1], r)}
          material={materials.city}
        >
          <sphereGeometry args={[0.04, 8, 8]} />
        </mesh>
      ))}
    </group>
  );
}

export function ConnectionArcs({ radius }: { radius: number }) {
  const arcs = useMemo(() => {
    const r = radius + 0.03;
    return globeConnections.map(([fromIdx, toIdx]) => {
      const from = latLngToVec3(globeCities[fromIdx][0], globeCities[fromIdx][1], r);
      const to = latLngToVec3(globeCities[toIdx][0], globeCities[toIdx][1], r);
      const mid = new Vector3().addVectors(from, to).multiplyScalar(0.5);
      const dist = from.distanceTo(to);
      mid.normalize().multiplyScalar(r + dist * 0.25);
      const curve = new QuadraticBezierCurve3(from, mid, to);
      return curve.getPoints(40);
    });
  }, [radius]);

  return (
    <group>
      {arcs.map((points, i) => {
        const geo = new BufferGeometry().setFromPoints(points);
        return (
          // @ts-ignore
          <line key={`arc-${i}`} geometry={geo}>
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

export function DataPackets({ radius }: { radius: number }) {
  const packetData = useMemo(() => {
    const r = radius + 0.03;
    return globeConnections.map(([fromIdx, toIdx]) => {
      const from = latLngToVec3(globeCities[fromIdx][0], globeCities[fromIdx][1], r);
      const to = latLngToVec3(globeCities[toIdx][0], globeCities[toIdx][1], r);
      const mid = new Vector3().addVectors(from, to).multiplyScalar(0.5);
      const dist = from.distanceTo(to);
      mid.normalize().multiplyScalar(r + dist * 0.25);
      return {
        curve: new QuadraticBezierCurve3(from, mid, to),
        speed: 0.15 + Math.random() * 0.2,
        offset: Math.random(),
      };
    });
  }, [radius]);

  const meshRefs = useRef<(Mesh | null)[]>([]);

  useFrame((state) => {
    packetData.forEach((p, i) => {
      const mesh = meshRefs.current[i];
      if (mesh) {
        const t = (state.clock.elapsedTime * p.speed + p.offset) % 1;
        mesh.position.copy(p.curve.getPointAt(t));
        const opacity = Math.sin(t * Math.PI);
        (mesh.material as MeshBasicMaterial).opacity = opacity * 0.9;
      }
    });
  });

  return (
    <group>
      {packetData.map((_, i) => (
        <mesh
          key={`packet-${i}`}
          ref={(el) => {
            meshRefs.current[i] = el;
          }}
          material={i % 2 === 0 ? materials.packetEmerald : materials.packetCyan}
        >
          <sphereGeometry args={[0.03, 6, 6]} />
        </mesh>
      ))}
    </group>
  );
}

export function OrbitRing({
  radius,
  count,
  speed,
  color,
  size,
}: {
  radius: number;
  count: number;
  speed: number;
  color: string;
  size: number;
}) {
  const meshRefs = useRef<(Mesh | null)[]>([]);
  const offsets = useMemo(
    () => Array.from({ length: count }, (_, i) => (i / count) * Math.PI * 2),
    [count]
  );

  // Shared material per ring to avoid creating duplicates
  const ringMat = useMemo(
    () =>
      new MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.6,
        blending: AdditiveBlending,
        depthWrite: false,
      }),
    [color]
  );

  useFrame((state) => {
    offsets.forEach((offset, i) => {
      const mesh = meshRefs.current[i];
      if (mesh) {
        const angle = state.clock.elapsedTime * speed + offset;
        mesh.position.set(
          Math.cos(angle) * radius,
          Math.sin(angle * 2) * 0.3,
          Math.sin(angle) * radius
        );
      }
    });
  });

  return (
    <group>
      {offsets.map((_, i) => (
        <mesh
          key={`orbit-${i}`}
          ref={(el) => {
            meshRefs.current[i] = el;
          }}
          material={ringMat}
        >
          <sphereGeometry args={[size, 6, 6]} />
        </mesh>
      ))}
    </group>
  );
}

export function AtmosphereGlow({ radius }: { radius: number }) {
  return (
    <mesh material={materials.atmosphere}>
      <sphereGeometry args={[radius + 0.15, 32, 32]} />
    </mesh>
  );
}
