'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
  Float,
  Text,
  MeshTransmissionMaterial,
  Environment,
  ContactShadows,
} from '@react-three/drei';
import { Mesh } from 'three';
import { Link } from '@/i18n/routing';
import { useInView } from 'react-intersection-observer';
import { useTranslations } from 'next-intl';

function RefractiveKnot() {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.1;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;

      const targetX = state.pointer.x * 0.5;
      const targetY = state.pointer.y * 0.5;

      meshRef.current.position.x += (targetX - meshRef.current.position.x) * 0.05;
      meshRef.current.position.y += (targetY - meshRef.current.position.y) * 0.05;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={[0, 0, 2]}>
        {}
        <torusKnotGeometry args={[1.5, 0.5, 256, 64]} />
        <MeshTransmissionMaterial
          backside
          backsideThickness={1}
          thickness={0.5}
          chromaticAberration={0.06}
          anisotropy={0.1}
          distortion={0.2}
          distortionScale={0.5}
          temporalDistortion={0.1}
          ior={1.5}
          color="var(--text-primary)"
          resolution={1024}
        />
      </mesh>
    </Float>
  );
}

function Typography() {
  const { viewport } = useThree();
  const isMobile = viewport.width < 5;
  const t = useTranslations('HeroPremium');

  return (
    <group position={[0, 0, -2]}>
      <Text
        fontSize={isMobile ? 1 : 2}
        letterSpacing={-0.05}
        color="var(--text-primary)"
        anchorX="center"
        anchorY="bottom"
        position={[0, 0, 0]}
      >
        {t('nextGen')}
      </Text>
      <Text
        fontSize={isMobile ? 1 : 2}
        letterSpacing={-0.05}
        color="#10b981"
        anchorX="center"
        anchorY="top"
        position={[0, 0, 0]}
      >
        {t('banking')}
      </Text>
    </group>
  );
}

export default function HeroPremium() {
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0 });
  const t = useTranslations('HeroPremium');

  return (
    <section
      ref={ref}
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        background: 'var(--bg-base)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
        {inView && (
          <Canvas camera={{ position: [0, 0, 10], fov: 35 }}>
            <React.Suspense fallback={null}>
              <ambientLight intensity={0.5} />
              <directionalLight position={[10, 10, 5]} intensity={1} />
              <Typography />
              <RefractiveKnot />
              <Environment preset="city" />
              <ContactShadows position={[0, -3, 0]} opacity={0.4} scale={20} blur={2} far={4.5} />
            </React.Suspense>
          </Canvas>
        )}
      </div>

      {}
      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          padding: '0 24px',
          pointerEvents: 'none',
        }}
      >
        <p
          style={{
            fontSize: '16px',
            color: 'var(--text-secondary)',
            textAlign: 'center',
            maxWidth: '500px',
            marginBottom: '32px',
            lineHeight: 1.6,
            backdropFilter: 'blur(4px)',
            background: 'var(--glass-bg-start)',
            padding: '16px 24px',
            borderRadius: '16px',
            border: '1px solid var(--glass-border)',
            boxShadow: 'var(--glass-shadow-drop)',
          }}
        >
          {t('description')}
        </p>

        <div style={{ display: 'flex', gap: '16px', pointerEvents: 'auto' }}>
          <Link
            href="/architecture"
            className="pill-button"
            style={{
              background: 'var(--glass-bg-start)',
              color: 'var(--text-primary)',
              border: '1px solid var(--glass-border)',
              padding: '16px 40px',
              fontSize: '15px',
              backdropFilter: 'blur(10px)',
              boxShadow: 'var(--glass-shadow-drop)',
            }}
          >
            {t('explorePlatform')}
          </Link>
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.1'/%3E%3C/svg%3E")`,
          zIndex: 20,
          pointerEvents: 'none',
          opacity: 0.5,
          mixBlendMode: 'screen',
        }}
      />
    </section>
  );
}
