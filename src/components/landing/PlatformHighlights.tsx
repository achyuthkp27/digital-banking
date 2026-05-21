'use client';

import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import DashboardIcon from '@mui/icons-material/DashboardOutlined';
import AccountTreeIcon from '@mui/icons-material/AccountTreeOutlined';
import LanguageIcon from '@mui/icons-material/LanguageOutlined';
import CodeIcon from '@mui/icons-material/CodeOutlined';
import SettingsIcon from '@mui/icons-material/SettingsOutlined';
import StorageIcon from '@mui/icons-material/StorageOutlined';

const features = [
  {
    title: 'Digital Platform Dashboard',
    description: 'Comprehensive unified dashboard with real-time analytics, transaction monitoring, and customizable widgets for complete oversight.',
    icon: <DashboardIcon sx={{ fontSize: '24px' }} />,
    color: '#10b981' // Emerald
  },
  {
    title: 'Architecture',
    description: 'Microservices-based scalable architecture with cloud-native design, API-first approach, and seamless third-party integrations.',
    icon: <AccountTreeIcon sx={{ fontSize: '24px' }} />,
    color: '#6366f1' // Indigo
  },
  {
    title: 'Capabilities',
    description: 'Multi-channel banking, instant payments, wealth management, loan origination, and AI-powered financial insights.',
    icon: <LanguageIcon sx={{ fontSize: '24px' }} />,
    color: '#06b6d4' // Cyan
  },
  {
    title: 'Development & Implementation',
    description: 'Agile development methodology, CI/CD pipelines, automated testing, and comprehensive API documentation for rapid deployment.',
    icon: <CodeIcon sx={{ fontSize: '24px' }} />,
    color: '#f43f5e' // Rose
  },
  {
    title: 'Operations / Maintenance',
    description: '24/7 monitoring, automated scaling, proactive maintenance, incident management, and comprehensive logging systems.',
    icon: <SettingsIcon sx={{ fontSize: '24px' }} />,
    color: '#8b5cf6' // Violet
  },
  {
    title: 'Technology Stack',
    description: 'Modern tech stack including React, Node.js, Kubernetes, PostgreSQL, Redis, Kafka, and enterprise-grade security frameworks.',
    icon: <StorageIcon sx={{ fontSize: '24px' }} />,
    color: '#f59e0b' // Amber
  }
];

function BentoCard({ feature }: { feature: typeof features[0] }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!cardRef.current) return;
    const { left, top } = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      whileHover="hover"
      initial="rest"
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        padding: '32px',
        background: 'var(--bg-surface)',
        borderRadius: '24px',
        border: '1px solid var(--border-subtle)',
        overflow: 'hidden',
        cursor: 'default',
        boxShadow: 'var(--shadow-sm, 0 4px 6px rgba(0,0,0,0.05))'
      }}
      variants={{
        rest: { scale: 1, borderColor: 'var(--border-subtle)' },
        hover: { scale: 1.02, borderColor: 'var(--border-strong)' }
      }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
    >
      {/* Interactive Spotlight using Motion */}
      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: useTransform(
            [mouseX, mouseY],
            ([x, y]) => `radial-gradient(400px circle at ${x}px ${y}px, ${feature.color}15, transparent 40%)`
          ),
          pointerEvents: 'none',
          zIndex: 0,
        }}
        variants={{
          rest: { opacity: 0 },
          hover: { opacity: 1 }
        }}
        transition={{ duration: 0.3 }}
      />
      
      <div style={{ position: 'relative', zIndex: 10 }}>
        <motion.div
          variants={{
            rest: { background: 'var(--bg-elevated)', color: 'var(--text-secondary)', borderColor: 'var(--border-subtle)', boxShadow: 'none' },
            hover: { background: `${feature.color}20`, color: 'var(--text-primary)', borderColor: feature.color, boxShadow: `0 0 20px ${feature.color}40` }
          }}
          transition={{ duration: 0.3 }}
          style={{
            width: '56px', height: '56px', borderRadius: '16px', border: '1px solid',
            display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px'
          }}
        >
          {feature.icon}
        </motion.div>

        <motion.h3
          variants={{ rest: { color: 'var(--text-primary)' }, hover: { color: 'var(--text-primary)' } }}
          style={{ fontFamily: 'var(--font-syne)', fontSize: '20px', fontWeight: 600, marginBottom: '12px', margin: 0 }}
        >
          {feature.title}
        </motion.h3>

        <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: 1.6, margin: 0 }}>
          {feature.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function PlatformHighlights() {
  return (
    <section id="platform" style={{ padding: '120px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ textAlign: 'center', marginBottom: '80px', maxWidth: '800px' }}>
        <span style={{ display: 'block', fontSize: '12px', color: '#10b981', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '16px', fontWeight: 700 }}>
          Enterprise Platform
        </span>
        <h2 style={{ fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-syne), sans-serif', marginBottom: '24px', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
          Built for massive scale.
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '18px', lineHeight: 1.6 }}>
          Comprehensive architecture designed to power the future of digital banking globally.
        </p>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
        gap: '24px', 
        width: '100%', 
        maxWidth: '1280px' 
      }}>
        {features.map((feature, idx) => (
          <BentoCard key={idx} feature={feature} />
        ))}
      </div>
    </section>
  );
}
