'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const KF_ID = 'agent-illus-kf';
function injectKF() {
  if (typeof document === 'undefined') return;
  if (document.getElementById(KF_ID)) return;
  const s = document.createElement('style');
  s.id = KF_ID;
  s.textContent = `
    @keyframes agent-wave { 0%,100%{transform:scale(1);opacity:.4} 50%{transform:scale(1.6);opacity:0} }
    @keyframes agent-pin { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
    @keyframes agent-sync { from{transform:rotate(0)} to{transform:rotate(360deg)} }
  `;
  document.head.appendChild(s);
}

export default function AgentBankingIllustration() {
  useEffect(() => { injectKF(); }, []);

  const formFields = ['Account Name', 'Aadhaar No.', 'Mobile', 'Amount', 'Signature'];

  return (
    <div style={{ width: '100%', height: '100%', minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
      {/* Tablet */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          width: '200px', height: '280px', borderRadius: '20px',
          border: '2px solid rgba(16,185,129,0.3)',
          background: 'rgba(16,185,129,0.02)',
          position: 'relative', padding: '20px 16px',
          display: 'flex', flexDirection: 'column',
        }}
      >
        {/* Status bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ display: 'flex', gap: '3px' }}>
            {[8, 10, 12, 14].map((h, i) => (
              <div key={i} style={{ width: '3px', height: `${h}px`, borderRadius: '1px', background: `rgba(16,185,129,${0.3 + i * 0.15})` }} />
            ))}
          </div>
          {/* Sync icon */}
          <div style={{ animation: 'agent-sync 3s linear infinite' }}>
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="rgba(16,185,129,0.5)" strokeWidth="1.5">
              <path d="M1 8a7 7 0 0112.9-3.7M15 8a7 7 0 01-12.9 3.7" strokeLinecap="round" />
              <path d="M14 1v3h-3M2 15v-3h3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {/* Form fields appearing */}
        {formFields.map((field, i) => (
          <motion.div
            key={field}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.6 + i * 0.25 }}
            style={{
              marginBottom: '10px', padding: '8px 10px', borderRadius: '6px',
              border: '1px solid rgba(16,185,129,0.12)',
              background: 'rgba(16,185,129,0.03)',
            }}
          >
            <div style={{
              fontSize: '7px', color: 'rgba(16,185,129,0.4)',
              fontFamily: 'var(--font-geist-mono), monospace',
              letterSpacing: '0.06em', textTransform: 'uppercase',
              marginBottom: '3px',
            }}>
              {field}
            </div>
            <div style={{
              width: `${50 + (i * 13) % 40}%`, height: '3px',
              borderRadius: '2px', background: 'rgba(16,185,129,0.2)',
            }} />
          </motion.div>
        ))}

        {/* Submit button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
          style={{
            marginTop: 'auto', padding: '8px',
            borderRadius: '6px', background: 'rgba(16,185,129,0.15)',
            border: '1px solid rgba(16,185,129,0.3)',
            textAlign: 'center',
          }}
        >
          <span style={{ fontSize: '8px', fontWeight: 600, color: '#10b981', fontFamily: 'var(--font-geist-mono), monospace', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Submit
          </span>
        </motion.div>
      </motion.div>

      {/* GPS pin floating above */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        style={{
          position: 'absolute', top: '12%', left: '55%',
          animation: 'agent-pin 2s ease-in-out infinite',
        }}
      >
        <svg width="28" height="36" viewBox="0 0 24 32" fill="none">
          <path d="M12 0C5.4 0 0 5.4 0 12c0 9 12 20 12 20s12-11 12-20C24 5.4 18.6 0 12 0z" fill="rgba(16,185,129,0.2)" stroke="#10b981" strokeWidth="1.5" />
          <circle cx="12" cy="12" r="4" fill="#10b981" opacity="0.6" />
        </svg>
        {/* Pulse rings around pin */}
        <div style={{
          position: 'absolute', top: '4px', left: '50%', transform: 'translateX(-50%)',
          width: '20px', height: '20px', borderRadius: '50%',
          border: '1px solid rgba(16,185,129,0.3)',
          animation: 'agent-wave 2s ease-out infinite',
        }} />
      </motion.div>

      {/* Signal waves */}
      {[0, 1].map(i => (
        <div key={i} style={{
          position: 'absolute', right: '22%', top: `${35 + i * 5}%`,
          width: '16px', height: '16px', borderRadius: '50%',
          border: '1px solid rgba(16,185,129,0.2)',
          animation: `agent-wave 2s ease-out ${0.5 + i * 0.4}s infinite`,
        }} />
      ))}
    </div>
  );
}
