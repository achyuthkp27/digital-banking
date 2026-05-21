'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const KF_ID = 'merchant-illus-kf';
function injectKF() {
  if (typeof document === 'undefined') return;
  if (document.getElementById(KF_ID)) return;
  const s = document.createElement('style');
  s.id = KF_ID;
  s.textContent = `
    @keyframes merch-wave { 0%{transform:scale(.8);opacity:.6} 100%{transform:scale(2.2);opacity:0} }
    @keyframes merch-orbit { from{transform:rotate(0deg) translateX(90px) rotate(0deg)} to{transform:rotate(360deg) translateX(90px) rotate(-360deg)} }
    @keyframes merch-bar { 0%{height:0} 100%{height:var(--bar-h)} }
    @keyframes merch-qr { 0%,100%{opacity:.3} 50%{opacity:.7} }
  `;
  document.head.appendChild(s);
}

export default function MerchantBankingIllustration() {
  useEffect(() => { injectKF(); }, []);

  const qrGrid = Array.from({ length: 49 }, (_, i) => i);
  const bars = [60, 80, 45, 70, 55];
  const currencies = ['$', '₹', '€', '£'];

  return (
    <div style={{ width: '100%', height: '100%', minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
      {/* QR Code */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        style={{
          display: 'grid', gridTemplateColumns: 'repeat(7, 12px)', gap: '3px',
          position: 'relative',
        }}
      >
        {qrGrid.map(i => {
          const filled = (i * 7) % 10 > 3;
          return (
            <div key={i} style={{
              width: '12px', height: '12px', borderRadius: '2px',
              background: filled ? 'rgba(var(--accent-rgb),0.4)' : 'rgba(var(--accent-rgb),0.08)',
              animation: filled ? `merch-qr ${2 + ((i * 3) % 2)}s ease-in-out ${(i * 5) % 3}s infinite` : 'none',
            }} />
          );
        })}
      </motion.div>

      {/* Contactless waves */}
      {[0, 1, 2].map(i => (
        <div key={i} style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80px', height: '80px', borderRadius: '50%',
          border: '1px solid rgba(var(--accent-rgb),0.25)',
          animation: `merch-wave 2.5s ease-out ${i * 0.6}s infinite`,
        }} />
      ))}

      {/* Orbiting currency symbols */}
      {currencies.map((c, i) => (
        <motion.div
          key={c}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 + i * 0.2 }}
          style={{
            position: 'absolute', top: '50%', left: '50%',
            marginTop: '-8px', marginLeft: '-8px',
            animation: `merch-orbit ${8 + i * 2}s linear ${i * 2}s infinite`,
            fontSize: '14px', fontWeight: 600, color: 'rgba(var(--accent-rgb),0.5)',
            fontFamily: 'var(--font-geist-mono), monospace',
          }}
        >
          {c}
        </motion.div>
      ))}

      {/* Settlement bar chart (bottom) */}
      <div style={{
        position: 'absolute', bottom: '15%', left: '50%', transform: 'translateX(-50%)',
        display: 'flex', alignItems: 'flex-end', gap: '6px', height: '80px',
      }}>
        {bars.map((h, i) => (
          <motion.div
            key={i}
            initial={{ height: 0 }}
            animate={{ height: `${h}%` }}
            transition={{ duration: 0.8, delay: 1 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
            style={{
              width: '10px', borderRadius: '3px 3px 0 0',
              background: `rgba(var(--accent-rgb),${0.2 + i * 0.08})`,
              border: '1px solid rgba(var(--accent-rgb),0.15)',
            }}
          />
        ))}
      </div>

      {/* Card swipe */}
      <motion.div
        initial={{ x: -80, opacity: 0 }}
        animate={{ x: [null, -20, -80], opacity: [0, 1, 0] }}
        transition={{ duration: 3, repeat: Infinity, repeatDelay: 3 }}
        style={{
          position: 'absolute', left: '10%', top: '40%',
          width: '40px', height: '26px', borderRadius: '4px',
          border: '1.5px solid rgba(var(--accent-rgb),0.35)',
          background: 'rgba(var(--accent-rgb),0.06)',
        }}
      >
        <div style={{ position: 'absolute', top: '8px', left: '6px', right: '6px', height: '3px', borderRadius: '1px', background: 'rgba(var(--accent-rgb),0.3)' }} />
      </motion.div>
    </div>
  );
}
