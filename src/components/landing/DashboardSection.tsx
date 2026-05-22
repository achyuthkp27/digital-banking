'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useTranslations } from 'next-intl';

export default function DashboardSection() {
  const t = useTranslations('Dashboard');
  const containerRef = useRef<HTMLDivElement>(null);
  
  // 3D tilt effect based on scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  // Scale and rotate the dashboard as user scrolls down
  const rawRotateX = useTransform(scrollYProgress, [0, 0.5, 1], [15, 0, -5]);
  const rawScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1.05, 1]);
  const rawOpacity = useTransform(scrollYProgress, [0, 0.3], [0.3, 1]);
  
  // Smooth the scroll values using springs for physical feel
  const rotateX = useSpring(rawRotateX, { stiffness: 100, damping: 30 });
  const scale = useSpring(rawScale, { stiffness: 100, damping: 30 });
  const opacity = useSpring(rawOpacity, { stiffness: 100, damping: 30 });

  return (
    <section
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        padding: '120px 24px',
        background: 'var(--bg-base)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      <div style={{
        perspective: '1200px',
        width: '100%',
        maxWidth: '1200px',
        zIndex: 20,
      }}>
        <motion.div
          style={{
            rotateX,
            scale,
            opacity,
            transformStyle: 'preserve-3d',
            background: 'rgba(var(--color-base-rgb), 0.8)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(var(--color-invert-rgb), 0.1)',
            borderRadius: '16px',
            boxShadow: '0 40px 100px rgba(var(--color-base-rgb), 0.8), 0 0 0 1px rgba(var(--color-invert-rgb), 0.05) inset',
            aspectRatio: '16/9',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Dashboard Header */}
          <div style={{
            height: '48px', borderBottom: '1px solid rgba(var(--color-invert-rgb), 0.05)',
            display: 'flex', alignItems: 'center', padding: '0 20px', gap: '8px'
          }}>
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: 'rgba(var(--color-invert-rgb), 0.1)' }} />
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: 'rgba(var(--color-invert-rgb), 0.1)' }} />
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: 'rgba(var(--color-invert-rgb), 0.1)' }} />
            <div style={{ margin: '0 auto', fontFamily: 'var(--font-geist-mono), monospace', fontSize: '11px', color: '#666', letterSpacing: '0.1em' }}>
              DASHBOARD / LIVE_STREAM
            </div>
          </div>

          {/* Dashboard Content */}
          <div style={{ padding: '32px', display: 'flex', gap: '32px', height: 'calc(100% - 48px)' }}>
            {/* Sidebar */}
            <div style={{ flex: '0 0 200px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { label: t('overview'), active: true },
                { label: t('transactionsNav'), active: false },
                { label: t('apiLogs'), active: false },
                { label: t('settings'), active: false },
              ].map((item, i) => (
                <div key={i} style={{
                  padding: '12px 16px',
                  background: item.active ? 'rgba(var(--accent-rgb),0.1)' : 'transparent',
                  borderRadius: '6px',
                  border: item.active ? '1px solid rgba(var(--accent-rgb),0.2)' : '1px solid transparent',
                  color: item.active ? 'var(--accent)' : '#666',
                  fontFamily: 'var(--font-geist-mono), monospace',
                  fontSize: '13px',
                }}>
                  {item.label}
                </div>
              ))}
            </div>
            
            {/* Main Area: Content instead of graph */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '24px' }}>
              
              {/* Top Stats Row */}
              <div style={{ display: 'flex', gap: '24px' }}>
                {[
                  { label: t('totalVolume'), value: '$24.5M', color: 'var(--text-primary)' },
                  { label: t('activeSessions'), value: '1,248', color: 'var(--text-primary)' },
                  { label: t('systemHealth'), value: '99.9%', color: 'var(--accent)' }
                ].map((stat, i) => (
                  <div key={i} style={{
                    flex: 1, background: 'rgba(var(--color-invert-rgb), 0.02)', borderRadius: '8px',
                    padding: '20px', border: '1px solid rgba(var(--color-invert-rgb), 0.05)'
                  }}>
                    <div style={{ fontFamily: 'var(--font-geist-mono), monospace', fontSize: '12px', color: '#666', marginBottom: '8px', textTransform: 'uppercase' }}>{stat.label}</div>
                    <div style={{ fontFamily: 'var(--font-syne), sans-serif', fontSize: '24px', fontWeight: 700, color: stat.color }}>{stat.value}</div>
                  </div>
                ))}
              </div>

              {/* Transactions Table */}
              <div style={{ flex: 1, background: 'rgba(var(--color-invert-rgb), 0.02)', borderRadius: '8px', border: '1px solid rgba(var(--color-invert-rgb), 0.03)', padding: '24px' }}>
                <div style={{ fontFamily: 'var(--font-geist-mono), monospace', fontSize: '12px', color: '#888', marginBottom: '16px', textTransform: 'uppercase' }}>{t('recentTransactions')}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {[
                    { id: 'tx_8294a', amount: '+$12,450.00', status: t('settled'), time: '2m ago' },
                    { id: 'tx_1048b', amount: '-$840.00', status: t('processing'), time: '15m ago' },
                    { id: 'tx_5921c', amount: '+$3,200.50', status: t('settled'), time: '1h ago' },
                    { id: 'tx_3398d', amount: '-$15.00', status: t('settled'), time: '2h ago' },
                  ].map((tx, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: i === 3 ? 'none' : '1px solid rgba(var(--color-invert-rgb), 0.05)', paddingBottom: i === 3 ? 0 : '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(var(--color-invert-rgb), 0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <div style={{ width: 8, height: 8, borderRadius: '50%', background: tx.amount.startsWith('+') ? 'var(--accent)' : '#ef4444' }} />
                        </div>
                        <div>
                          <div style={{ fontFamily: 'var(--font-geist-mono), monospace', fontSize: '13px', color: 'var(--text-primary)' }}>{tx.id}</div>
                          <div style={{ fontFamily: 'var(--font-geist-mono), monospace', fontSize: '11px', color: '#666' }}>{tx.time}</div>
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontFamily: 'var(--font-syne), sans-serif', fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)' }}>{tx.amount}</div>
                        <div style={{ fontFamily: 'var(--font-geist-mono), monospace', fontSize: '11px', color: tx.status === 'Settled' ? 'var(--accent)' : '#f59e0b' }}>{tx.status}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Subtle reflection overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(135deg, rgba(var(--color-invert-rgb), 0.05) 0%, transparent 40%)',
            pointerEvents: 'none',
          }} />
        </motion.div>
      </div>
    </section>
  );
}
