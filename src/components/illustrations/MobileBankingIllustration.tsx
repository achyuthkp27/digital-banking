'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const KF_ID = 'mobile-illus-kf';
function injectKF() {
  if (typeof document === 'undefined') return;
  if (document.getElementById(KF_ID)) return;
  const s = document.createElement('style');
  s.id = KF_ID;
  s.textContent = `
    @keyframes mob-fp { 0%,100%{opacity:.3;transform:scale(1)} 50%{opacity:.8;transform:scale(1.08)} }
    @keyframes mob-notif { 0%{transform:translateY(-20px);opacity:0} 15%{transform:translateY(0);opacity:1} 85%{transform:translateY(0);opacity:1} 100%{transform:translateY(-20px);opacity:0} }
  `;
  document.head.appendChild(s);
}

export default function MobileBankingIllustration() {
  useEffect(() => { injectKF(); }, []);

  const txns = [
    { label: 'Amazon Pay', amount: '-₹2,450', color: 'rgba(239,68,68,0.5)' },
    { label: 'Salary Credit', amount: '+₹85,000', color: 'rgba(var(--accent-rgb),0.6)' },
    { label: 'Electricity', amount: '-₹1,280', color: 'rgba(239,68,68,0.5)' },
    { label: 'UPI Transfer', amount: '+₹5,000', color: 'rgba(var(--accent-rgb),0.6)' },
  ];

  return (
    <div style={{ width: '100%', height: '100%', minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        style={{
          width: '150px', height: '300px', borderRadius: '24px',
          border: '2px solid rgba(var(--accent-rgb),0.25)',
          background: 'rgba(var(--accent-rgb),0.02)',
          position: 'relative', overflow: 'hidden',
          display: 'flex', flexDirection: 'column',
        }}
      >
        {/* Notch */}
        <div style={{
          width: '60px', height: '16px', borderRadius: '0 0 12px 12px',
          background: 'rgba(var(--accent-rgb),0.08)',
          border: '1px solid rgba(var(--accent-rgb),0.12)',
          borderTop: 'none', margin: '0 auto',
        }} />

        {/* Status bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 14px', fontSize: '6px', color: 'rgba(var(--accent-rgb),0.4)', fontFamily: 'var(--font-geist-mono), monospace' }}>
          <span>9:41</span>
          <div style={{ display: 'flex', gap: '3px' }}>
            {[6, 8, 10, 12].map((h, i) => (
              <div key={i} style={{ width: '2px', height: `${h}px`, borderRadius: '1px', background: `rgba(var(--accent-rgb),${0.2 + i * 0.1})` }} />
            ))}
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: '8px 12px', flex: 1, display: 'flex', flexDirection: 'column' }}>
          {/* Balance card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            style={{
              padding: '10px', borderRadius: '10px', marginBottom: '10px',
              background: 'linear-gradient(135deg, rgba(var(--accent-rgb),0.12), rgba(6,182,212,0.08))',
              border: '1px solid rgba(var(--accent-rgb),0.15)',
            }}
          >
            <div style={{ fontSize: '5px', color: 'rgba(var(--accent-rgb),0.5)', fontFamily: 'var(--font-geist-mono), monospace', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Total Balance</div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: 'rgba(var(--accent-rgb),0.7)', fontFamily: 'var(--font-geist-mono), monospace' }}>₹4,82,350</div>
          </motion.div>

          {/* Fingerprint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}
          >
            <div style={{ animation: 'mob-fp 2s ease-in-out infinite' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(var(--accent-rgb),0.5)" strokeWidth="1">
                <path d="M12 2a10 10 0 0110 10M12 6a6 6 0 016 6M12 10a2 2 0 012 2v4M8 12a4 4 0 014-4M4 12a8 8 0 018-8" strokeLinecap="round" />
              </svg>
            </div>
          </motion.div>

          {/* Transaction list */}
          {txns.map((tx, i) => (
            <motion.div
              key={tx.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + i * 0.25 }}
              style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '6px 0',
                borderBottom: i < txns.length - 1 ? '1px solid rgba(var(--accent-rgb),0.06)' : 'none',
              }}
            >
              <span style={{ fontSize: '6px', color: 'rgba(var(--accent-rgb),0.4)', fontFamily: 'var(--font-geist-mono), monospace' }}>{tx.label}</span>
              <span style={{ fontSize: '7px', fontWeight: 600, color: tx.color, fontFamily: 'var(--font-geist-mono), monospace' }}>{tx.amount}</span>
            </motion.div>
          ))}
        </div>

        {/* Bottom nav */}
        <div style={{
          display: 'flex', justifyContent: 'space-around', padding: '8px 0',
          borderTop: '1px solid rgba(var(--accent-rgb),0.1)',
        }}>
          {[0, 1, 2, 3].map(i => (
            <div key={i} style={{
              width: i === 0 ? '16px' : '12px', height: '3px',
              borderRadius: '2px',
              background: i === 0 ? 'var(--accent)' : 'rgba(var(--accent-rgb),0.15)',
              boxShadow: i === 0 ? '0 0 6px rgba(var(--accent-rgb),0.4)' : 'none',
            }} />
          ))}
        </div>
      </motion.div>

      {/* Notification slide-in */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        style={{
          position: 'absolute', top: '15%', right: '20%',
          padding: '8px 12px', borderRadius: '8px',
          background: 'rgba(var(--accent-rgb),0.1)',
          border: '1px solid rgba(var(--accent-rgb),0.2)',
          animation: 'mob-notif 4s ease-in-out 2s infinite',
        }}
      >
        <div style={{ fontSize: '6px', color: 'var(--accent)', fontFamily: 'var(--font-geist-mono), monospace', fontWeight: 600 }}>
          🔔 ₹5,000 received
        </div>
      </motion.div>
    </div>
  );
}
