'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { AdaptiveCanvas as Canvas } from '@/components/common/AdaptiveCanvas';
import { Float, MeshTransmissionMaterial, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { Link } from '@/i18n/routing';

/* ─── 3D Refractive Knot (contained in right panel) ─── */
function RefractiveKnot() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.12;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.18;

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

/* ─── Props ─── */
interface ProductHero3DProps {
  title: string;
  subtitle: string;
}

export default function ProductHero3D({ title, subtitle }: ProductHero3DProps) {
  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        background: '#010308',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* ── Ambient background glows ── */}
      <div
        style={{
          position: 'absolute',
          top: '30%',
          left: '20%',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
          filter: 'blur(80px)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          right: '15%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
          filter: 'blur(80px)',
        }}
      />

      {/* ── Dot grid background ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* ── Main split layout container ── */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '120px clamp(24px, 5vw, 80px) 80px',
          gap: 'clamp(32px, 5vw, 80px)',
          minHeight: '100vh',
        }}
      >
        {/* ─── LEFT: Text content ─── */}
        <div
          style={{
            flex: '1 1 55%',
            display: 'flex',
            flexDirection: 'column',
            gap: '0',
            minWidth: 0,
          }}
        >
          {/* Breadcrumb / Back link */}
          <Link
            href="/#products"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              color: 'var(--text-tertiary)',
              fontSize: '13px',
              fontWeight: 500,
              textDecoration: 'none',
              marginBottom: '32px',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              fontFamily: 'var(--font-geist-mono), monospace',
              transition: 'color 0.2s ease',
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M10 12L6 8l4-4" />
            </svg>
            Back to Products
          </Link>

          {/* Product badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '8px 18px',
              borderRadius: '9999px',
              background: 'rgba(16, 185, 129, 0.08)',
              border: '1px solid rgba(16, 185, 129, 0.2)',
              marginBottom: '28px',
              alignSelf: 'flex-start',
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: '50%',
                background: '#10b981',
                boxShadow: '0 0 8px rgba(16, 185, 129, 0.7)',
                animation: 'hero3d-pulse 2s ease-in-out infinite',
              }}
            />
            <span
              style={{
                fontSize: '12px',
                fontWeight: 600,
                color: '#10b981',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              Product Overview
            </span>
          </div>

          {/* Title */}
          <h1
            style={{
              fontSize: 'clamp(40px, 6vw, 80px)',
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-syne), sans-serif',
              marginBottom: '24px',
            }}
          >
            {title}
          </h1>

          {/* Accent line */}
          <div
            style={{
              width: '80px',
              height: '4px',
              borderRadius: '2px',
              background: 'linear-gradient(90deg, #10b981, #06b6d4)',
              marginBottom: '24px',
              boxShadow: '0 0 16px rgba(16, 185, 129, 0.4)',
            }}
          />

          {/* Subtitle */}
          <p
            style={{
              fontSize: 'clamp(16px, 1.3vw, 20px)',
              lineHeight: 1.7,
              color: 'var(--text-secondary)',
              maxWidth: '540px',
              marginBottom: '40px',
            }}
          >
            {subtitle}
          </p>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <Link
              href="/demo"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '16px 40px',
                borderRadius: '9999px',
                background: '#ffffff',
                color: '#000000',
                fontSize: '15px',
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                cursor: 'pointer',
              }}
            >
              Request Access
              <svg
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </Link>

            <Link
              href="/#products"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '16px 40px',
                borderRadius: '9999px',
                background: 'transparent',
                color: 'var(--text-primary)',
                fontSize: '15px',
                fontWeight: 500,
                textDecoration: 'none',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                transition: 'border-color 0.25s ease, background 0.25s ease',
                cursor: 'pointer',
              }}
            >
              View All Products
            </Link>
          </div>
        </div>

        {/* ─── RIGHT: 3D Canvas (self-contained, no text overlap) ─── */}
        <div
          style={{
            flex: '1 1 45%',
            position: 'relative',
            height: 'clamp(400px, 50vh, 600px)',
            minWidth: '300px',
            borderRadius: '32px',
            overflow: 'hidden',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            background: 'rgba(255, 255, 255, 0.015)',
          }}
        >
          {/* Inner glow */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.06) 0%, transparent 60%)',
              pointerEvents: 'none',
              zIndex: 0,
            }}
          />

          <Canvas
            camera={{ position: [0, 0, 7], fov: 40 }}
            style={{ position: 'relative', zIndex: 1 }}
          >
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
              borderTop: '2px solid rgba(16, 185, 129, 0.3)',
              borderLeft: '2px solid rgba(16, 185, 129, 0.3)',
              borderRadius: '4px 0 0 0',
              pointerEvents: 'none',
              zIndex: 2,
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              width: '24px',
              height: '24px',
              borderTop: '2px solid rgba(16, 185, 129, 0.3)',
              borderRight: '2px solid rgba(16, 185, 129, 0.3)',
              borderRadius: '0 4px 0 0',
              pointerEvents: 'none',
              zIndex: 2,
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '16px',
              left: '16px',
              width: '24px',
              height: '24px',
              borderBottom: '2px solid rgba(16, 185, 129, 0.3)',
              borderLeft: '2px solid rgba(16, 185, 129, 0.3)',
              borderRadius: '0 0 0 4px',
              pointerEvents: 'none',
              zIndex: 2,
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '16px',
              right: '16px',
              width: '24px',
              height: '24px',
              borderBottom: '2px solid rgba(16, 185, 129, 0.3)',
              borderRight: '2px solid rgba(16, 185, 129, 0.3)',
              borderRadius: '0 0 4px 0',
              pointerEvents: 'none',
              zIndex: 2,
            }}
          />
        </div>
      </div>

      {/* ── Noise grain overlay ── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.1'/%3E%3C/svg%3E")`,
          zIndex: 20,
          pointerEvents: 'none',
          opacity: 0.4,
          mixBlendMode: 'screen' as const,
        }}
      />

      {/* ── Bottom fade ── */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '120px',
          background: 'linear-gradient(to bottom, transparent, var(--bg-base))',
          pointerEvents: 'none',
          zIndex: 25,
        }}
      />

      {/* Keyframes */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes hero3d-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }
        @media (max-width: 768px) {
          /* Stack vertically on mobile */
        }
      `,
        }}
      />
    </section>
  );
}
