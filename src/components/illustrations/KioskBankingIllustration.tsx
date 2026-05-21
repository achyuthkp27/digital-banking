'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const KF_ID = 'kiosk-illus-kf';

function injectKF() {
  if (typeof document === 'undefined') return;
  if (document.getElementById(KF_ID)) return;
  const s = document.createElement('style');
  s.id = KF_ID;
  s.textContent = `
    @keyframes kiosk-receipt { 0%{width:0} 100%{width:100%} }
    @keyframes kiosk-ripple { 0%{transform:scale(0);opacity:.6} 100%{transform:scale(2.5);opacity:0} }
    @keyframes kiosk-led { 0%,80%{opacity:.3} 90%{opacity:1} 100%{opacity:.3} }
    @keyframes kiosk-flow { 0%{transform:translateY(0);opacity:0} 30%{opacity:1} 100%{transform:translateY(-80px);opacity:0} }
  `;
  document.head.appendChild(s);
}

export default function KioskBankingIllustration() {
  useEffect(() => { injectKF(); }, []);

  return (
    <div style={{ width: '100%', height: '100%', minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ position: 'relative' }}
      >
        {/* Kiosk body */}
        <div style={{
          width: '160px', height: '240px',
          borderRadius: '16px 16px 8px 8px',
          border: '2px solid rgba(var(--accent-rgb),0.3)',
          background: 'rgba(var(--accent-rgb),0.03)',
          position: 'relative', overflow: 'hidden',
          display: 'flex', flexDirection: 'column',
        }}>
          {/* LED indicators */}
          <div style={{ display: 'flex', gap: '6px', padding: '10px 14px', justifyContent: 'flex-end' }}>
            {[0, 1, 2].map(i => (
              <div key={i} style={{
                width: '5px', height: '5px', borderRadius: '50%',
                background: i === 2 ? 'var(--accent)' : 'rgba(var(--accent-rgb),0.3)',
                boxShadow: i === 2 ? '0 0 6px rgba(var(--accent-rgb),0.6)' : 'none',
                animation: `kiosk-led 1.5s ease-in-out ${i * 0.5}s infinite`,
              }} />
            ))}
          </div>

          {/* Screen area */}
          <div style={{
            margin: '0 14px', flex: 1, borderRadius: '8px',
            border: '1px solid rgba(var(--accent-rgb),0.15)',
            background: 'rgba(var(--color-base-rgb), 0.3)', padding: '14px',
            position: 'relative', overflow: 'hidden',
          }}>
            {/* Receipt lines animating */}
            {[0, 1, 2, 3, 4].map(i => (
              <motion.div
                key={i}
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: `${60 + (i * 17) % 40}%`, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 + i * 0.2 }}
                style={{
                  height: '3px', borderRadius: '2px', marginBottom: '8px',
                  background: `rgba(var(--accent-rgb),${0.3 - i * 0.04})`,
                }}
              />
            ))}

            {/* Touch ripple */}
            <div style={{
              position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)',
              width: '20px', height: '20px', borderRadius: '50%',
              border: '1px solid rgba(var(--accent-rgb),0.4)',
              animation: 'kiosk-ripple 2s ease-out infinite',
            }} />
          </div>

          {/* Card slot */}
          <div style={{
            margin: '14px', height: '8px', borderRadius: '4px',
            border: '1px solid rgba(var(--accent-rgb),0.2)',
            background: 'rgba(var(--accent-rgb),0.05)',
            position: 'relative', overflow: 'hidden',
          }}>
            <motion.div
              initial={{ x: -40 }}
              animate={{ x: [null, 0, -40] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
              style={{
                width: '20px', height: '100%', borderRadius: '2px',
                background: 'rgba(var(--accent-rgb),0.4)',
              }}
            />
          </div>
        </div>

        {/* Base stand */}
        <div style={{
          width: '80px', height: '12px', margin: '0 auto',
          borderRadius: '0 0 8px 8px',
          background: 'rgba(var(--accent-rgb),0.15)',
          border: '1px solid rgba(var(--accent-rgb),0.2)',
          borderTop: 'none',
        }} />

        {/* Flow dots going into kiosk */}
        {[0, 1, 2].map(i => (
          <div key={i} style={{
            position: 'absolute', bottom: '30px', left: `${30 + i * 20}%`,
            width: '4px', height: '4px', borderRadius: '50%', background: 'var(--accent)',
            animation: `kiosk-flow 2s ease-in-out ${i * 0.4}s infinite`,
          }} />
        ))}
      </motion.div>
    </div>
  );
}
