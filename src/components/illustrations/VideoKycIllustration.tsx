'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const KF_ID = 'video-kyc-illus-kf';

function injectKF() {
  if (typeof document === 'undefined') return;
  if (document.getElementById(KF_ID)) return;
  const s = document.createElement('style');
  s.id = KF_ID;
  s.textContent = `
    @keyframes vkyc-scan { 0%,100%{top:10%} 50%{top:85%} }
    @keyframes vkyc-pulse { 0%,100%{transform:scale(1);opacity:.6} 50%{transform:scale(1.15);opacity:1} }
    @keyframes vkyc-check { 0%{stroke-dashoffset:24} 100%{stroke-dashoffset:0} }
    @keyframes vkyc-dot { 0%{opacity:0;transform:translateX(0)} 50%{opacity:1} 100%{opacity:0;transform:translateX(60px)} }
  `;
  document.head.appendChild(s);
}

export default function VideoKycIllustration() {
  useEffect(() => { injectKF(); }, []);

  return (
    <div style={{ width: '100%', height: '100%', minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
      {/* Face scan area */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{ position: 'relative', width: '140px', height: '180px' }}
      >
        {/* Face oval */}
        <div style={{
          width: '100%', height: '100%', borderRadius: '50%',
          border: '2px solid rgba(16, 185, 129, 0.4)',
          position: 'relative', overflow: 'hidden',
        }}>
          {/* Scan line */}
          <div style={{
            position: 'absolute', left: 0, right: 0, height: '2px',
            background: 'linear-gradient(90deg, transparent, #10b981, transparent)',
            boxShadow: '0 0 12px rgba(16,185,129,0.6)',
            animation: 'vkyc-scan 2.5s ease-in-out infinite',
          }} />
          {/* Face features (stylized) */}
          <svg viewBox="0 0 100 130" style={{ width: '100%', height: '100%', opacity: 0.25 }}>
            <circle cx="35" cy="45" r="5" fill="#10b981" />
            <circle cx="65" cy="45" r="5" fill="#10b981" />
            <path d="M35 80 Q50 95 65 80" stroke="#10b981" strokeWidth="2" fill="none" />
          </svg>
        </div>
        {/* Pulse ring */}
        <div style={{
          position: 'absolute', inset: '-16px', borderRadius: '50%',
          border: '1px solid rgba(16,185,129,0.3)',
          animation: 'vkyc-pulse 2s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute', inset: '-32px', borderRadius: '50%',
          border: '1px solid rgba(16,185,129,0.15)',
          animation: 'vkyc-pulse 2s ease-in-out 0.3s infinite',
        }} />
      </motion.div>

      {/* Data flow dots */}
      {[0, 1, 2].map(i => (
        <div key={i} style={{
          position: 'absolute', left: '52%', top: `${45 + i * 8}%`,
          width: '4px', height: '4px', borderRadius: '50%', background: '#10b981',
          animation: `vkyc-dot 1.5s ease-in-out ${i * 0.3}s infinite`,
        }} />
      ))}

      {/* ID Card */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'relative', width: '120px', height: '80px', marginLeft: '60px',
          borderRadius: '12px', border: '1.5px solid rgba(16,185,129,0.3)',
          background: 'rgba(16,185,129,0.04)', padding: '12px',
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <div style={{ width: '24px', height: '24px', borderRadius: '50%', border: '1px solid rgba(16,185,129,0.3)' }} />
          <div>
            <div style={{ width: '50px', height: '4px', borderRadius: '2px', background: 'rgba(16,185,129,0.2)', marginBottom: '4px' }} />
            <div style={{ width: '35px', height: '3px', borderRadius: '2px', background: 'rgba(16,185,129,0.12)' }} />
          </div>
        </div>
        <div>
          <div style={{ width: '80px', height: '3px', borderRadius: '2px', background: 'rgba(16,185,129,0.1)', marginBottom: '4px' }} />
          <div style={{ width: '60px', height: '3px', borderRadius: '2px', background: 'rgba(16,185,129,0.08)' }} />
        </div>
        {/* Checkmark */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          style={{
            position: 'absolute', top: '-10px', right: '-10px',
            width: '24px', height: '24px', borderRadius: '50%',
            background: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 12px rgba(16,185,129,0.5)',
          }}
        >
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 8l4 4 6-8" />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
}
