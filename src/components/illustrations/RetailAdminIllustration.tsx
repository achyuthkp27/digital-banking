'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const KF_ID = 'retadmin-illus-kf';
function injectKF() {
  if (typeof document === 'undefined') return;
  if (document.getElementById(KF_ID)) return;
  const s = document.createElement('style');
  s.id = KF_ID;
  s.textContent = `
    @keyframes radmin-scan { 0%{top:-2px;opacity:0} 20%{opacity:.5} 80%{opacity:.5} 100%{top:calc(100% - 2px);opacity:0} }
  `;
  document.head.appendChild(s);
}

export default function RetailAdminIllustration() {
  useEffect(() => { injectKF(); }, []);

  return (
    <div style={{ width: '100%', height: '100%', minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px',
          width: '240px', position: 'relative',
        }}
      >
        {/* Scan line across entire dashboard */}
        <div style={{
          position: 'absolute', left: 0, right: 0, height: '1px',
          background: 'linear-gradient(90deg, transparent, var(--accent), transparent)',
          boxShadow: '0 0 8px rgba(var(--accent-rgb),0.4)',
          animation: 'radmin-scan 4s ease-in-out infinite',
          zIndex: 5, pointerEvents: 'none',
        }} />

        {/* Panel 1: Line chart */}
        <div style={{
          padding: '14px', borderRadius: '10px',
          border: '1px solid rgba(var(--accent-rgb),0.15)',
          background: 'rgba(var(--accent-rgb),0.03)',
        }}>
          <div style={{ fontSize: '6px', color: 'rgba(var(--accent-rgb),0.4)', fontFamily: 'var(--font-geist-mono), monospace', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Revenue</div>
          <svg width="100%" height="45" viewBox="0 0 100 45">
            <motion.path
              d="M0 40 L15 32 L30 35 L45 22 L60 25 L75 12 L90 8 L100 5"
              fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: 0.5, ease: 'easeInOut' }}
            />
          </svg>
        </div>

        {/* Panel 2: Progress bars */}
        <div style={{
          padding: '14px', borderRadius: '10px',
          border: '1px solid rgba(var(--accent-rgb),0.15)',
          background: 'rgba(var(--accent-rgb),0.03)',
        }}>
          <div style={{ fontSize: '6px', color: 'rgba(var(--accent-rgb),0.4)', fontFamily: 'var(--font-geist-mono), monospace', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Performance</div>
          {[85, 62, 94, 45].map((w, i) => (
            <div key={i} style={{ marginBottom: '6px' }}>
              <div style={{ height: '4px', borderRadius: '2px', background: 'rgba(var(--accent-rgb),0.08)', overflow: 'hidden' }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${w}%` }}
                  transition={{ duration: 0.8, delay: 0.8 + i * 0.2, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    height: '100%', borderRadius: '2px',
                    background: `rgba(var(--accent-rgb),${0.25 + i * 0.1})`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Panel 3: Donut gauge */}
        <div style={{
          padding: '14px', borderRadius: '10px',
          border: '1px solid rgba(var(--accent-rgb),0.15)',
          background: 'rgba(var(--accent-rgb),0.03)',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
        }}>
          <div style={{ fontSize: '6px', color: 'rgba(var(--accent-rgb),0.4)', fontFamily: 'var(--font-geist-mono), monospace', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.08em', alignSelf: 'flex-start' }}>Uptime</div>
          <svg width="60" height="60" viewBox="0 0 60 60">
            <circle cx="30" cy="30" r="24" fill="none" stroke="rgba(var(--accent-rgb),0.08)" strokeWidth="5" />
            <motion.circle
              cx="30" cy="30" r="24" fill="none" stroke="var(--accent)" strokeWidth="5"
              strokeDasharray="150.8"
              initial={{ strokeDashoffset: 150.8 }}
              animate={{ strokeDashoffset: 15 }}
              transition={{ duration: 1.8, delay: 1, ease: [0.16, 1, 0.3, 1] }}
              strokeLinecap="round" transform="rotate(-90 30 30)"
            />
            <text x="30" y="33" textAnchor="middle" fill="rgba(var(--accent-rgb),0.6)" fontSize="10" fontFamily="var(--font-geist-mono), monospace" fontWeight="600">99.9</text>
          </svg>
        </div>

        {/* Panel 4: Checklist */}
        <div style={{
          padding: '14px', borderRadius: '10px',
          border: '1px solid rgba(var(--accent-rgb),0.15)',
          background: 'rgba(var(--accent-rgb),0.03)',
        }}>
          <div style={{ fontSize: '6px', color: 'rgba(var(--accent-rgb),0.4)', fontFamily: 'var(--font-geist-mono), monospace', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Tasks</div>
          {['Compliance', 'Audit', 'Reports', 'KYC Review'].map((task, i) => (
            <motion.div
              key={task}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2 + i * 0.3 }}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '5px' }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.5 + i * 0.3, type: 'spring' }}
                style={{
                  width: '10px', height: '10px', borderRadius: '3px',
                  border: '1px solid rgba(var(--accent-rgb),0.3)',
                  background: i < 3 ? 'rgba(var(--accent-rgb),0.2)' : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                {i < 3 && (
                  <svg width="6" height="6" viewBox="0 0 8 8" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round">
                    <path d="M1.5 4l2 2L6.5 2" />
                  </svg>
                )}
              </motion.div>
              <span style={{ fontSize: '7px', color: 'rgba(var(--accent-rgb),0.4)', fontFamily: 'var(--font-geist-mono), monospace' }}>{task}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
