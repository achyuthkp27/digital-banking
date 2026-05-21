'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, animate } from 'framer-motion';

/* ─── keyframes ─── */
const KEYFRAMES_ID = 'matrix-why-section-keyframes';

function injectKeyframes() {
  if (typeof document === 'undefined') return;
  if (document.getElementById(KEYFRAMES_ID)) return;

  const style = document.createElement('style');
  style.id = KEYFRAMES_ID;
  style.textContent = `
    @keyframes matrixGridPulse {
      0%, 100% { opacity: 0.15; }
      50%      { opacity: 0.4; }
    }
    @keyframes matrixEnergyH {
      0%   { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
    @keyframes matrixEnergyV {
      0%   { background-position: 0 -200%; }
      100% { background-position: 0 200%; }
    }
  `;
  document.head.appendChild(style);
}

const stats = [
  { id: '01', value: 200, prefix: '< ', suffix: 'ms', label: 'Global Settlement Time', format: (v: number) => Math.round(v).toString() },
  { id: '02', value: 99.999, suffix: '%', label: 'Platform Availability', format: (v: number) => v.toFixed(3) },
  { id: '03', value: 10, suffix: 'M+', label: 'Events Processed / Second', format: (v: number) => Math.round(v).toString() },
  { id: '04', value: 256, suffix: '-bit', label: 'End-to-End Encryption', format: (v: number) => Math.round(v).toString() },
  { id: '05', value: 400, suffix: '+', label: 'Open Financial APIs', format: (v: number) => Math.round(v).toString() },
  { id: '06', value: 98.7, suffix: '%', label: 'AI Fraud Detection Accuracy', format: (v: number) => v.toFixed(1) },
];

function AnimatedStatNumber({ stat }: { stat: typeof stats[0] }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });
  const startValue = stat.value > 50 ? 0 : (stat.value > 5 ? 0 : 99.0);
  const motionValue = useMotionValue(startValue);

  useEffect(() => {
    if (isInView) {
      const controls = animate(motionValue, stat.value, {
        duration: 2,
        ease: 'easeOut',
      });
      return controls.stop;
    }
  }, [isInView, motionValue, stat.value]);

  useEffect(() => {
    return motionValue.on('change', (latest) => {
      if (ref.current) {
        ref.current.textContent = `${stat.prefix || ''}${stat.format(latest)}${stat.suffix || ''}`;
      }
    });
  }, [motionValue, stat]);

  return (
    <div
      ref={ref}
      style={{
        fontFamily: 'var(--font-syne), sans-serif', fontSize: 'clamp(36px, 4vw, 52px)',
        fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em', lineHeight: 1
      }}
    >
      0
    </div>
  );
}

export default function WhyChooseSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    injectKeyframes();
  }, []);

  const horizontalLines = Array.from({ length: 20 }, (_, i) => i);
  const verticalLines = Array.from({ length: 28 }, (_, i) => i);

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        width: '100%',
        background: 'var(--bg-base)',
        padding: 'clamp(100px, 15vw, 180px) 0',
        overflow: 'hidden',
      }}
    >
      {/* ══════ PERSPECTIVE GRID BACKGROUND ══════ */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 2, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          inset: 0,
          perspective: '600px',
          perspectiveOrigin: '50% 30%',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      >
        <motion.div
          initial={{ y: 80, rotateX: 75 }}
          whileInView={{ y: 0, rotateX: 65 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 2.2, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            bottom: '-20%',
            left: '-30%',
            right: '-30%',
            height: '75%',
            transformStyle: 'preserve-3d',
          }}
        >
          {horizontalLines.map((i) => {
            const pct = (i / (horizontalLines.length - 1)) * 100;
            return (
              <div
                key={`h-${i}`}
                style={{
                  position: 'absolute',
                  top: `${pct}%`,
                  left: 0,
                  right: 0,
                  height: '1px',
                  background: 'linear-gradient(90deg, transparent 0%, var(--accent) 30%, var(--accent) 70%, transparent 100%)',
                  opacity: 0.12,
                  animation: `matrixGridPulse ${3 + (i % 4) * 0.5}s ease-in-out ${(i % 6) * 0.4}s infinite`,
                }}
              />
            );
          })}
          {verticalLines.map((i) => {
            const pct = (i / (verticalLines.length - 1)) * 100;
            return (
              <div
                key={`v-${i}`}
                style={{
                  position: 'absolute',
                  left: `${pct}%`,
                  top: 0,
                  bottom: 0,
                  width: '1px',
                  background: 'linear-gradient(180deg, transparent 0%, var(--accent) 40%, var(--accent) 60%, transparent 100%)',
                  opacity: 0.09,
                  animation: `matrixGridPulse ${4 + (i % 3) * 0.6}s ease-in-out ${(i % 5) * 0.3}s infinite`,
                }}
              />
            );
          })}

          {/* Energy wave – horizontal */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'repeating-linear-gradient(90deg, transparent 0%, rgba(var(--accent-rgb),0.2) 2%, transparent 4%)',
              backgroundSize: '200% 100%',
              animation: 'matrixEnergyH 6s linear infinite',
              opacity: 0.3,
              mixBlendMode: 'screen',
            }}
          />
          {/* Energy wave – vertical */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'repeating-linear-gradient(180deg, transparent 0%, rgba(var(--accent-rgb),0.15) 2%, transparent 4%)',
              backgroundSize: '100% 200%',
              animation: 'matrixEnergyV 8s linear infinite',
              opacity: 0.25,
              mixBlendMode: 'screen',
            }}
          />
        </motion.div>
      </motion.div>

      <div style={{
        position: 'absolute', top: '0', left: '50%', transform: 'translateX(-50%)',
        width: '60vw', height: '60vw', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(var(--accent-rgb),0.03) 0%, transparent 60%)',
        pointerEvents: 'none', filter: 'blur(80px)'
      }} />

      <div style={{
        position: 'relative', zIndex: 10, maxWidth: '1400px', margin: '0 auto',
        padding: '0 clamp(24px, 5vw, 80px)',
      }}>
        {/* Header */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: 'clamp(60px, 8vw, 100px)', maxWidth: '800px' }}>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              fontFamily: 'var(--font-geist-mono), monospace',
              fontSize: '12px', color: 'var(--accent)', letterSpacing: '0.14em', textTransform: 'uppercase'
            }}
          >
            Capabilities
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{
              fontFamily: 'var(--font-syne), sans-serif',
              fontSize: 'clamp(40px, 6vw, 80px)',
              fontWeight: 800, color: 'var(--text-primary)',
              lineHeight: 1.05, letterSpacing: '-0.03em',
            }}
          >
            Engineered for <br/> Absolute Scale.
          </motion.h2>
        </div>

        {/* Minimal Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 'clamp(40px, 6vw, 80px)',
        }}>
          {stats.map((stat, i) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
              className="stat-card"
              style={{
                display: 'flex', flexDirection: 'column', gap: '16px',
                borderTop: '1px solid rgba(var(--color-invert-rgb), 0.06)',
                paddingTop: '24px', position: 'relative',
                cursor: 'default',
                background: 'rgba(var(--color-invert-rgb), 0.01)',
                backdropFilter: 'blur(4px)',
                padding: '24px',
                borderRadius: '12px',
                border: '1px solid rgba(var(--color-invert-rgb), 0.04)'
              }}
            >
              <div className="stat-line" style={{
                position: 'absolute', top: '-1px', left: 0, width: '100%', height: '1px',
                background: 'var(--accent)', transform: 'scaleX(0)', transformOrigin: 'left',
                transition: 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)'
              }} />

              <div style={{
                fontFamily: 'var(--font-geist-mono), monospace', fontSize: '13px',
                color: 'var(--text-tertiary)', letterSpacing: '0.05em'
              }}>
                {stat.id}
              </div>
              
              <AnimatedStatNumber stat={stat} />

              <div style={{
                fontSize: '15px', color: 'var(--text-secondary)', fontWeight: 500, letterSpacing: '-0.01em'
              }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .stat-card:hover .stat-line {
          transform: scaleX(1) !important;
        }
      `}} />
    </section>
  );
}
