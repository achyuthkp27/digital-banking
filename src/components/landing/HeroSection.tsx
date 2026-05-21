'use client';

import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Link from 'next/link';
import Hero3DBackground from './Hero3DBackground';

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
        delayChildren: 0.2
      }
    }
  };

  const itemVariants: any = {
    hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: { duration: 1, ease: 'easeOut' } 
    }
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
        paddingBottom: '80px'
      }}
    >
      {/* Background Effects */}
      <motion.div style={{
        position: 'absolute', top: '50%', left: '50%',
        x: bgX, y: bgY,
        width: '800px', height: '800px',
        background: 'radial-gradient(circle, rgba(16, 185, 129, 0.05) 0%, rgba(3, 7, 18, 0) 70%)',
        pointerEvents: 'none', zIndex: 0,
        transform: 'translate(-50%, -50%)'
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px)',
        backgroundSize: '24px 24px', pointerEvents: 'none', zIndex: 0
      }} />
      
      <div style={{ position: 'relative', zIndex: 10, display: 'flex', alignItems: 'center', maxWidth: '1400px', width: '100%', padding: '0 48px', margin: '0 auto' }}>
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ 
            display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left', 
            maxWidth: '700px', position: 'relative', zIndex: 20,
            x: textX, y: textY
          }}
        >
          {/* Pill Badge */}
          <motion.div 
            variants={itemVariants}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '6px 16px', borderRadius: '999px',
              backgroundColor: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.05)',
              marginBottom: '32px'
            }}
          >
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10b981', boxShadow: '0 0 8px #10b981' }} />
            <span style={{ fontFamily: 'var(--font-geist-mono), monospace', fontSize: '12px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Enterprise Digital Banking Platform
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1 
            variants={itemVariants}
            style={{
              fontFamily: 'var(--font-syne), sans-serif', fontSize: 'clamp(48px, 8vw, 96px)',
              fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.05,
              letterSpacing: '-0.03em', marginBottom: '24px',
            }}
          >
            Transform Your <br/>
            <span style={{ 
              background: 'linear-gradient(135deg, #ffffff 0%, #a1a1aa 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
            }}>
              Banking Experience.
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p 
            variants={itemVariants}
            style={{
              fontSize: 'clamp(16px, 2vw, 20px)', color: 'var(--text-secondary)',
              lineHeight: 1.6, maxWidth: '600px', marginBottom: '40px'
            }}
          >
            Enterprise-grade digital banking solutions with cutting-edge security, seamless integration, and unparalleled user experience across all platforms.
          </motion.p>

          {/* CTAs */}
          <motion.div 
            variants={itemVariants}
            style={{ display: 'flex', gap: '16px', alignItems: 'center' }}
          >
            <Link href="#products" style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '16px 32px', backgroundColor: 'var(--text-primary)', color: 'var(--bg-base)',
              fontFamily: 'var(--font-syne), sans-serif', fontSize: '15px', fontWeight: 600,
              borderRadius: '999px', textDecoration: 'none', transition: 'transform 0.2s'
            }}>
              Explore Platforms
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
            <Link href="/contact" style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '16px 32px', backgroundColor: 'rgba(255,255,255,0.03)', color: 'var(--text-primary)',
              border: '1px solid rgba(255,255,255,0.1)', fontFamily: 'var(--font-syne), sans-serif',
              fontSize: '15px', fontWeight: 600, borderRadius: '999px', textDecoration: 'none', transition: 'background 0.2s'
            }}>
              Contact Sales
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* 3D Scene - Absolute Positioned to span full width and behind text */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none', opacity: 1 }}>
        <div style={{ position: 'absolute', right: '-10%', top: '50%', transform: 'translateY(-50%)', width: '80%', height: '800px', pointerEvents: 'auto' }}>
          <Hero3DBackground />
        </div>
      </div>
    </section>
  );
}
