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

  const textX = useTransform(smoothX, [-0.5, 0.5], [-20, 20]);
  const textY = useTransform(smoothY, [-0.5, 0.5], [-20, 20]);

  const bgX = useTransform(smoothX, [-0.5, 0.5], [-40, 40]);
  const bgY = useTransform(smoothY, [-0.5, 0.5], [-40, 40]);

  const containerVariants: any = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 1, ease: 'easeOut' },
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
      {/* Background Effects */}
      <motion.div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          x: bgX,
          y: bgY,
          width: '800px',
          height: '800px',
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.05) 0%, rgba(3, 7, 18, 0) 70%)',
          pointerEvents: 'none',
          zIndex: 0,
          transform: 'translate(-50%, -50%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
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

      {/* 3D Scene - Absolute Positioned to span full width and behind text */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none', opacity: 1 }}>
        <div
          style={{
            position: 'absolute',
            right: '-10%',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '80%',
            height: '800px',
            pointerEvents: 'auto',
          }}
        >
          <Hero3DBackground />
        </div>
      </div>
    </section>
  );
}
