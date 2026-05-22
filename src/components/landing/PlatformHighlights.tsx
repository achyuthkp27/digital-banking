'use client';

import React, { useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { LayoutDashboard, Network, Globe, Code, Settings, Database, ArrowRight, Sparkles } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface FeatureItem {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const BentoCard = React.memo(function BentoCard({ feature }: { feature: FeatureItem }) {
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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative flex flex-col p-8 bg-[var(--bg-surface)] backdrop-blur-xl rounded-[24px] overflow-hidden border border-[var(--border-subtle)] hover:border-[var(--border-strong)] transition-colors shadow-sm hover:shadow-lg group h-full"
    >
      {/* Interactive Spotlight */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          background: useTransform(
            [mouseX, mouseY],
            ([x, y]) => `radial-gradient(400px circle at ${x}px ${y}px, ${feature.color}15, transparent 50%)`
          ),
        }}
      />
      
      <div className="relative z-10 flex flex-col h-full">
        <div className="mb-6">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center border border-[var(--border-default)] bg-[var(--bg-elevated)] shadow-inner transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-3"
            style={{ color: feature.color }}
          >
            {feature.icon}
          </div>
        </div>

        <div className="flex-1 flex flex-col">
          <h3 className="font-syne text-xl font-bold mb-3 text-[var(--text-primary)] tracking-tight transition-colors duration-300">
            {feature.title}
          </h3>

          <p className="text-[var(--text-secondary)] text-[15px] leading-relaxed font-light transition-colors duration-300">
            {feature.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
});

const PlatformHighlights = React.memo(function PlatformHighlights() {
  const t = useTranslations('PlatformHighlights');
  
  const features: FeatureItem[] = [
    { 
      title: t('dashboard'), 
      description: t('dashboardDesc'), 
      icon: <LayoutDashboard size={24} strokeWidth={1.5} />, 
      color: '#4ade80' // Emerald/Green
    },
    { 
      title: t('architecture'), 
      description: t('architectureDesc'), 
      icon: <Network size={24} strokeWidth={1.5} />, 
      color: '#818cf8' // Indigo
    },
    { 
      title: t('capabilities'), 
      description: t('capabilitiesDesc'), 
      icon: <Globe size={24} strokeWidth={1.5} />, 
      color: '#2dd4bf' // Teal
    },
    { 
      title: t('devAndImpl'), 
      description: t('devAndImplDesc'), 
      icon: <Code size={24} strokeWidth={1.5} />, 
      color: '#f472b6' // Pink
    },
    { 
      title: t('operationsMaint'), 
      description: t('operationsMaintDesc'), 
      icon: <Settings size={24} strokeWidth={1.5} />, 
      color: '#a78bfa' // Purple
    },
    { 
      title: t('techStack'), 
      description: t('techStackDesc'), 
      icon: <Database size={24} strokeWidth={1.5} />, 
      color: '#fbbf24' // Amber
    },
  ];

  return (
    <section id="platform" className="relative py-[120px] px-6 flex flex-col items-center overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[600px] bg-[var(--accent)]/5 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />

      <div className="relative z-10 text-center mb-16 max-w-[800px] mx-auto flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/20 mb-6 backdrop-blur-sm"
        >
          <Sparkles size={14} className="text-[var(--accent)]" />
          <span className="text-xs text-[var(--accent)] font-bold uppercase tracking-[0.2em]">
            {t('badge')}
          </span>
        </motion.div>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-[clamp(36px,5vw,56px)] font-extrabold text-[var(--text-primary)] font-syne mb-6 leading-tight tracking-tight"
        >
          {t('title')}
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-[var(--text-secondary)] text-lg md:text-xl leading-relaxed font-light max-w-[600px]"
        >
          {t('subtitle')}
        </motion.p>
      </div>

      {/* Grid: Exactly 3 columns on desktop, 2 on tablet, 1 on mobile */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-[1200px]">
        {features.map((feature, idx) => (
          <BentoCard key={idx} feature={feature} />
        ))}
      </div>

      {/* Call to Action */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="relative z-10 w-full flex justify-center"
        style={{ marginTop: '64px' }}
      >
        <a 
          href="#architecture"
          style={{ padding: '16px 32px', backgroundColor: 'var(--text-primary)', color: 'var(--bg-base)' }}
          className="group relative inline-flex items-center justify-center gap-3 font-semibold rounded-full overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(var(--color-invert-rgb),0.2)] active:scale-[0.98] border border-[var(--border-subtle)] no-underline"
        >
          <span className="relative z-10 font-syne text-[15px] uppercase tracking-wide whitespace-nowrap">{t('exploreCta')}</span>
          <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
          <div className="absolute inset-0 bg-gradient-to-r from-[rgba(var(--color-base-rgb),0.1)] to-[rgba(var(--color-base-rgb),0)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </a>
      </motion.div>
    </section>
  );
});

export default PlatformHighlights;
