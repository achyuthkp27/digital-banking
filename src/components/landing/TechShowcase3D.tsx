'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { AdaptiveCanvas as Canvas } from '@/components/common/AdaptiveCanvas';
import { Float, MeshTransmissionMaterial, Environment } from '@react-three/drei';
import { Mesh } from 'three';
import { motion } from 'framer-motion';

/* ─── 3D Refractive Knot ─── */
function RefractiveKnot() {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.1;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
      const targetX = state.pointer.x * 0.3;
      const targetY = state.pointer.y * 0.3;
      meshRef.current.position.x += (targetX - meshRef.current.position.x) * 0.04;
      meshRef.current.position.y += (targetY - meshRef.current.position.y) * 0.04;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.8}>
      <mesh ref={meshRef}>
        <torusKnotGeometry args={[1.8, 0.6, 256, 64]} />
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
          color="#ffffff"
          resolution={1024}
        />
      </mesh>
    </Float>
  );
}

/* ─── Capabilities data ─── */
const capabilities = [
  { label: 'End-to-End Encryption', desc: 'AES-256 encryption at rest, TLS 1.3 in transit' },
  {
    label: 'Microservices Architecture',
    desc: 'Independently deployable, horizontally scalable services',
  },
  {
    label: 'Event-Driven Processing',
    desc: 'Real-time event streaming with Apache Kafka backbone',
  },
  { label: 'Multi-Region Deploy', desc: 'Active-active deployment across 40+ global data centers' },
];

export default function TechShowcase3D() {
  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        background: '#010308',
        overflow: 'hidden',
        padding: 'clamp(80px, 10vw, 140px) 0',
      }}
    >
      {/* Background grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 clamp(24px, 5vw, 80px)',
          display: 'flex',
          alignItems: 'center',
          gap: 'clamp(40px, 6vw, 100px)',
          flexWrap: 'wrap',
        }}
      >
        {/* LEFT: 3D Canvas */}
        <div
          style={{
            flex: '1 1 45%',
            minWidth: '300px',
            height: 'clamp(350px, 45vh, 500px)',
            borderRadius: '32px',
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.06)',
            background: 'rgba(255,255,255,0.015)',
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'radial-gradient(circle at 50% 50%, rgba(16,185,129,0.06) 0%, transparent 60%)',
              pointerEvents: 'none',
            }}
          />
          <Canvas camera={{ position: [0, 0, 7], fov: 40 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <RefractiveKnot />
            <Environment preset="city" />
          </Canvas>

          {/* Corner accents */}
          <div
            style={{
              position: 'absolute',
              top: '16px',
              left: '16px',
              width: '24px',
              height: '24px',
              borderTop: '2px solid rgba(16,185,129,0.3)',
              borderLeft: '2px solid rgba(16,185,129,0.3)',
              borderRadius: '4px 0 0 0',
              pointerEvents: 'none',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              width: '24px',
              height: '24px',
              borderTop: '2px solid rgba(16,185,129,0.3)',
              borderRight: '2px solid rgba(16,185,129,0.3)',
              borderRadius: '0 4px 0 0',
              pointerEvents: 'none',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '16px',
              left: '16px',
              width: '24px',
              height: '24px',
              borderBottom: '2px solid rgba(16,185,129,0.3)',
              borderLeft: '2px solid rgba(16,185,129,0.3)',
              borderRadius: '0 0 0 4px',
              pointerEvents: 'none',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '16px',
              right: '16px',
              width: '24px',
              height: '24px',
              borderBottom: '2px solid rgba(16,185,129,0.3)',
              borderRight: '2px solid rgba(16,185,129,0.3)',
              borderRadius: '0 0 4px 0',
              pointerEvents: 'none',
            }}
          />
        </div>

        {/* RIGHT: Content */}
        <div style={{ flex: '1 1 45%', minWidth: '300px' }}>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              fontFamily: 'var(--font-geist-mono), monospace',
              fontSize: '12px',
              color: 'var(--accent)',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              marginBottom: '16px',
            }}
          >
            {'// PLATFORM ARCHITECTURE'}
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            style={{
              fontFamily: 'var(--font-syne), sans-serif',
              fontSize: 'clamp(28px, 4vw, 48px)',
              fontWeight: 800,
              color: 'var(--text-primary)',
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              marginBottom: '20px',
            }}
          >
            Engineered for{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #10b981, #34d399)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Complexity
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{
              fontSize: 'clamp(14px, 1.2vw, 17px)',
              lineHeight: 1.7,
              color: 'var(--text-secondary)',
              marginBottom: '36px',
              maxWidth: '500px',
            }}
          >
            Our platform core is a refractive, self-healing mesh — just like this glass structure,
            it bends around obstacles, distributes load organically, and never breaks.
          </motion.p>

          {/* Capability cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {capabilities.map((cap, i) => (
              <motion.div
                key={cap.label}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                style={{
                  display: 'flex',
                  gap: '14px',
                  alignItems: 'flex-start',
                  padding: '16px',
                  borderRadius: '12px',
                  border: '1px solid rgba(255,255,255,0.04)',
                  background: 'rgba(255,255,255,0.02)',
                  transition: 'background 0.3s ease, border-color 0.3s ease',
                  cursor: 'default',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(16,185,129,0.04)';
                  e.currentTarget.style.borderColor = 'rgba(16,185,129,0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.04)';
                }}
              >
                <div
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: '#10b981',
                    flexShrink: 0,
                    marginTop: '6px',
                    boxShadow: '0 0 8px rgba(16,185,129,0.4)',
                  }}
                />
                <div>
                  <div
                    style={{
                      fontSize: '14px',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      marginBottom: '4px',
                    }}
                  >
                    {cap.label}
                  </div>
                  <div
                    style={{
                      fontSize: '12px',
                      color: 'var(--text-tertiary)',
                      lineHeight: 1.5,
                      fontFamily: 'var(--font-geist-mono), monospace',
                    }}
                  >
                    {cap.desc}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Noise overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.1'/%3E%3C/svg%3E")`,
          zIndex: 20,
          pointerEvents: 'none',
          opacity: 0.35,
          mixBlendMode: 'screen' as const,
        }}
      />
    </section>
  );
}
