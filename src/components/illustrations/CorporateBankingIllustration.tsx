'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const KF_ID = 'corp-illus-kf';
function injectKF() {
  if (typeof document === 'undefined') return;
  if (document.getElementById(KF_ID)) return;
  const s = document.createElement('style');
  s.id = KF_ID;
  s.textContent = `
    @keyframes corp-data { 0%{offset-distance:0%} 100%{offset-distance:100%} }
    @keyframes corp-fade { 0%,100%{opacity:0;transform:translateY(4px)} 40%,60%{opacity:.7;transform:translateY(0)} }
  `;
  document.head.appendChild(s);
}

export default function CorporateBankingIllustration() {
  useEffect(() => { injectKF(); }, []);

  const buildings = [
    { w: 36, h: 100, x: 0 },
    { w: 28, h: 70, x: 46 },
    { w: 42, h: 120, x: 82 },
    { w: 30, h: 80, x: 134 },
  ];

  const floatingVals = ['$4.2M', '€1.8M', '₹12Cr', '$890K'];

  return (
    <div style={{ width: '100%', height: '100%', minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
      {/* Buildings */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        style={{ position: 'relative', width: '200px', height: '140px' }}
      >
        {buildings.map((b, i) => (
          <motion.div
            key={i}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: b.h, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.3 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'absolute', bottom: 0, left: b.x,
              width: b.w, borderRadius: '4px 4px 0 0',
              border: '1.5px solid rgba(16,185,129,0.25)',
              background: 'rgba(16,185,129,0.04)',
              overflow: 'hidden',
            }}
          >
            {/* Windows */}
            {Array.from({ length: Math.floor(b.h / 14) }).map((_, wi) => (
              <div key={wi} style={{
                display: 'flex', gap: '3px', padding: '3px 5px', justifyContent: 'center',
              }}>
                {Array.from({ length: Math.floor(b.w / 10) }).map((_, wj) => (
                  <div key={wj} style={{
                    width: '4px', height: '5px', borderRadius: '1px',
                    background: `rgba(16,185,129,${Math.random() > 0.4 ? 0.3 : 0.08})`,
                  }} />
                ))}
              </div>
            ))}
          </motion.div>
        ))}

        {/* Connection lines between buildings */}
        <svg style={{ position: 'absolute', inset: 0, overflow: 'visible' }} viewBox="0 0 200 140">
          {[[18, 50, 60, 35], [96, 30, 150, 40]].map(([x1, y1, x2, y2], i) => (
            <g key={i}>
              <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(16,185,129,0.15)" strokeWidth="1" strokeDasharray="4 4" />
              {/* Traveling dots */}
              <circle r="3" fill="#10b981" opacity="0.6">
                <animateMotion dur={`${2 + i}s`} repeatCount="indefinite" path={`M${x1},${y1} L${x2},${y2}`} />
              </circle>
            </g>
          ))}
        </svg>
      </motion.div>

      {/* Dashboard panel (right side) */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        style={{
          marginLeft: '32px', width: '120px', padding: '14px',
          borderRadius: '12px', border: '1px solid rgba(16,185,129,0.2)',
          background: 'rgba(16,185,129,0.03)',
        }}
      >
        {/* Mini bar chart */}
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', height: '40px', marginBottom: '12px' }}>
          {[55, 75, 40, 65, 80, 50].map((h, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${h}%` }}
              transition={{ duration: 0.5, delay: 1.2 + i * 0.1 }}
              style={{
                flex: 1, borderRadius: '2px 2px 0 0',
                background: `rgba(16,185,129,${0.15 + i * 0.05})`,
              }}
            />
          ))}
        </div>

        {/* Mini pie/donut */}
        <svg width="40" height="40" viewBox="0 0 40 40" style={{ margin: '0 auto 10px', display: 'block' }}>
          <circle cx="20" cy="20" r="15" fill="none" stroke="rgba(16,185,129,0.1)" strokeWidth="4" />
          <motion.circle
            cx="20" cy="20" r="15" fill="none" stroke="#10b981" strokeWidth="4"
            strokeDasharray="94.25"
            initial={{ strokeDashoffset: 94.25 }}
            animate={{ strokeDashoffset: 30 }}
            transition={{ duration: 1.5, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
            strokeLinecap="round"
            transform="rotate(-90 20 20)"
          />
        </svg>

        {/* Metric lines */}
        {[70, 50, 85].map((w, i) => (
          <div key={i} style={{ display: 'flex', gap: '6px', alignItems: 'center', marginBottom: '6px' }}>
            <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: `rgba(16,185,129,${0.3 + i * 0.15})` }} />
            <div style={{ width: `${w}%`, height: '2px', borderRadius: '1px', background: 'rgba(16,185,129,0.15)' }} />
          </div>
        ))}
      </motion.div>

      {/* Floating currency values */}
      {floatingVals.map((v, i) => (
        <motion.span
          key={v}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.5, 0] }}
          transition={{ duration: 4, delay: 2 + i * 1.5, repeat: Infinity }}
          style={{
            position: 'absolute',
            top: `${15 + i * 18}%`,
            left: `${10 + (i % 2) * 70}%`,
            fontSize: '11px', fontWeight: 600,
            color: 'rgba(16,185,129,0.4)',
            fontFamily: 'var(--font-geist-mono), monospace',
          }}
        >
          {v}
        </motion.span>
      ))}
    </div>
  );
}
