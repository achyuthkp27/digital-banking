'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const KF_ID = 'retail-illus-kf';
function injectKF() {
  if (typeof document === 'undefined') return;
  if (document.getElementById(KF_ID)) return;
  const s = document.createElement('style');
  s.id = KF_ID;
  s.textContent = `
    @keyframes retail-cursor { 0%,100%{opacity:1} 50%{opacity:0} }
    @keyframes retail-bell { 0%,85%,100%{transform:rotate(0)} 90%{transform:rotate(12deg)} 95%{transform:rotate(-12deg)} }
  `;
  document.head.appendChild(s);
}

export default function RetailBankingIllustration() {
  useEffect(() => { injectKF(); }, []);

  return (
    <div style={{ width: '100%', height: '100%', minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
      {/* Browser window */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        style={{
          width: '260px', borderRadius: '12px',
          border: '1.5px solid rgba(16,185,129,0.25)',
          background: 'rgba(16,185,129,0.02)',
          overflow: 'hidden',
        }}
      >
        {/* Title bar */}
        <div style={{
          padding: '10px 14px', display: 'flex', alignItems: 'center', gap: '6px',
          borderBottom: '1px solid rgba(16,185,129,0.1)',
        }}>
          {['#ff5f57', '#febc2e', '#28c840'].map((c, i) => (
            <div key={i} style={{ width: '7px', height: '7px', borderRadius: '50%', background: c, opacity: 0.5 }} />
          ))}
          {/* Address bar */}
          <div style={{
            flex: 1, marginLeft: '8px', height: '18px', borderRadius: '4px',
            background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.1)',
            display: 'flex', alignItems: 'center', padding: '0 8px',
          }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981', marginRight: '6px', opacity: 0.5 }} />
            <div style={{ width: '60%', height: '3px', borderRadius: '2px', background: 'rgba(16,185,129,0.15)' }} />
          </div>
        </div>

        {/* Content area */}
        <div style={{ padding: '14px' }}>
          {/* Account cards */}
          {['Savings Account', 'Current Account'].map((acc, i) => (
            <motion.div
              key={acc}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 + i * 0.3 }}
              style={{
                padding: '10px 12px', marginBottom: '8px', borderRadius: '8px',
                border: '1px solid rgba(16,185,129,0.12)',
                background: 'rgba(16,185,129,0.03)',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              }}
            >
              <div>
                <div style={{ fontSize: '7px', color: 'rgba(16,185,129,0.4)', fontFamily: 'var(--font-geist-mono), monospace', marginBottom: '3px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  {acc}
                </div>
                <div style={{ width: '50px', height: '3px', borderRadius: '2px', background: 'rgba(16,185,129,0.2)' }} />
              </div>
              <span style={{ fontSize: '10px', fontWeight: 600, color: 'rgba(16,185,129,0.5)', fontFamily: 'var(--font-geist-mono), monospace' }}>
                {i === 0 ? '₹4,82,350' : '₹12,45,800'}
              </span>
            </motion.div>
          ))}

          {/* Graph line drawing itself */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            style={{ marginTop: '8px', marginBottom: '8px' }}
          >
            <svg width="230" height="50" viewBox="0 0 230 50">
              <motion.path
                d="M0 40 Q30 35 50 28 T100 20 T150 15 T200 8 L230 5"
                fill="none" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: 1.5, ease: 'easeInOut' }}
              />
              <motion.path
                d="M0 40 Q30 35 50 28 T100 20 T150 15 T200 8 L230 5 L230 50 L0 50 Z"
                fill="url(#retailGrad)" opacity="0.15"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.15 }}
                transition={{ duration: 2, delay: 1.5 }}
              />
              <defs>
                <linearGradient id="retailGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>

          {/* Quick action buttons */}
          <div style={{ display: 'flex', gap: '6px' }}>
            {['Transfer', 'Pay Bill', 'Deposit'].map((a, i) => (
              <motion.div
                key={a}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2 + i * 0.15 }}
                style={{
                  flex: 1, padding: '6px', borderRadius: '4px', textAlign: 'center',
                  border: '1px solid rgba(16,185,129,0.1)', background: 'rgba(16,185,129,0.04)',
                  fontSize: '6px', color: 'rgba(16,185,129,0.5)',
                  fontFamily: 'var(--font-geist-mono), monospace',
                  textTransform: 'uppercase', letterSpacing: '0.05em',
                }}
              >
                {a}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Notification bell */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        style={{
          position: 'absolute', top: '18%', right: '25%',
          animation: 'retail-bell 3s ease-in-out infinite',
        }}
      >
        <svg width="20" height="20" viewBox="0 0 16 16" fill="none" stroke="rgba(16,185,129,0.5)" strokeWidth="1.5" strokeLinecap="round">
          <path d="M8 1a4 4 0 014 4v3l2 2H2l2-2V5a4 4 0 014-4zM6 14h4" />
        </svg>
        <div style={{
          position: 'absolute', top: '-3px', right: '-3px',
          width: '10px', height: '10px', borderRadius: '50%',
          background: '#10b981', fontSize: '6px', color: '#000',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: 700,
        }}>3</div>
      </motion.div>

      {/* Globe icon */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 1.5 }}
        style={{ position: 'absolute', bottom: '20%', right: '22%' }}
      >
        <svg width="24" height="24" viewBox="0 0 16 16" fill="none" stroke="rgba(16,185,129,0.4)" strokeWidth="1">
          <circle cx="8" cy="8" r="7" />
          <path d="M1 8h14M8 1c2 2 3 4.5 3 7s-1 5-3 7c-2-2-3-4.5-3-7s1-5 3-7" />
        </svg>
      </motion.div>
    </div>
  );
}
