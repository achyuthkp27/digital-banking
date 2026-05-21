'use client';

import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Hero3DBackground from './Hero3DBackground';
import HeroContent from './HeroContent';

export default function HeroSection() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    mouseX.set(clientX / window.innerWidth - 0.5);
    mouseY.set(clientY / window.innerHeight - 0.5);
  };

  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const textX = useTransform(smoothX, [-0.5, 0.5], [-15, 15]);
  const textY = useTransform(smoothY, [-0.5, 0.5], [-15, 15]);

  const bgX = useTransform(smoothX, [-0.5, 0.5], [-30, 30]);
  const bgY = useTransform(smoothY, [-0.5, 0.5], [-30, 30]);

  const containerVariants: any = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.9, ease: [0.23, 1, 0.32, 1] },
    },
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#030712',
        overflow: 'hidden',
        paddingTop: '80px',
        paddingBottom: '80px',
      }}
    >
      {/* Premium ambient glow — green, top-right */}
      <motion.div
        style={{
          position: 'absolute',
          top: '-20%',
          right: '-10%',
          x: bgX,
          y: bgY,
          width: '900px',
          height: '900px',
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.06) 0%, transparent 60%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Secondary ambient glow — blue, bottom-left for depth */}
      <motion.div
        style={{
          position: 'absolute',
          bottom: '-30%',
          left: '-15%',
          width: '700px',
          height: '700px',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.03) 0%, transparent 60%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Ultra-fine grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.015) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Horizontal line accents */}
      <div
        style={{
          position: 'absolute',
          top: '30%',
          left: 0,
          right: 0,
          height: '1px',
          background:
            'linear-gradient(90deg, transparent, rgba(255,255,255,0.03) 20%, rgba(255,255,255,0.03) 80%, transparent)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '70%',
          left: 0,
          right: 0,
          height: '1px',
          background:
            'linear-gradient(90deg, transparent, rgba(255,255,255,0.03) 20%, rgba(255,255,255,0.03) 80%, transparent)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          maxWidth: '1400px',
          width: '100%',
          padding: '0 48px',
          margin: '0 auto',
        }}
      >
        <HeroContent
          containerVariants={containerVariants}
          itemVariants={itemVariants}
          textX={textX}
          textY={textY}
        />
      </div>

      {/* 3D Globe Scene */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none' }}>
        <div
          style={{
            position: 'absolute',
            right: '-5%',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '70%',
            height: '90vh',
            pointerEvents: 'auto',
          }}
        >
          <Hero3DBackground />
        </div>
      </div>
    </section>
  );
}
