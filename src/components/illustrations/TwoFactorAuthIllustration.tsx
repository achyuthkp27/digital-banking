'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Fingerprint, ScanFace, ShieldCheck, Check } from 'lucide-react';

const KF_ID = 'tfa-illus-kf-new';

function injectKF() {
  if (typeof document === 'undefined') return;
  if (document.getElementById(KF_ID)) return;
  const s = document.createElement('style');
  s.id = KF_ID;
  s.textContent = `
    @keyframes tfa-scan-line { 0%,100%{top: 10%} 50%{top: 90%} }
    @keyframes tfa-pulse-glow { 0%,100%{opacity: 0.5; transform: scale(0.95)} 50%{opacity: 1; transform: scale(1.05)} }
    @keyframes tfa-dash-flow { 0%{stroke-dashoffset: 24} 100%{stroke-dashoffset: 0} }
  `;
  document.head.appendChild(s);
}

export default function TwoFactorAuthIllustration() {
  useEffect(() => {
    injectKF();
  }, []);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        minHeight: '400px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      {}
      <div
        style={{
          position: 'absolute',
          width: '250px',
          height: '250px',
          background: 'radial-gradient(circle, rgba(var(--accent-rgb),0.1) 0%, transparent 70%)',
          filter: 'blur(30px)',
        }}
      />

      {}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'relative',
          width: '220px',
          height: '340px',
          background: 'rgba(var(--bg-surface),0.8)',
          border: '2px solid rgba(var(--color-invert-rgb),0.15)',
          borderRadius: '32px',
          overflow: 'hidden',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 24px 48px rgba(0,0,0,0.2)',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          zIndex: 10,
        }}
      >
        {}
        <div
          style={{
            width: '60px',
            height: '16px',
            background: 'rgba(var(--color-invert-rgb),0.9)',
            borderRadius: '10px',
            marginBottom: '24px',
          }}
        />

        {}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          style={{
            width: '80px',
            height: '80px',
            position: 'relative',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ScanFace size={60} style={{ color: 'rgba(var(--color-invert-rgb),0.8)' }} />
          {}
          <div
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              height: '2px',
              background: 'var(--accent)',
              boxShadow: '0 0 10px var(--accent)',
              animation: 'tfa-scan-line 2.5s ease-in-out infinite',
            }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5, type: 'spring' }}
            style={{
              position: 'absolute',
              bottom: '-4px',
              right: '-4px',
              width: '24px',
              height: '24px',
              background: 'var(--accent)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Check size={14} color="#000" strokeWidth={3} />
          </motion.div>
        </motion.div>

        {}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.5 }}
          style={{
            width: '100%',
            padding: '16px',
            background: 'rgba(var(--color-invert-rgb),0.03)',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 'auto',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div
              style={{
                width: '40px',
                height: '6px',
                background: 'rgba(var(--color-invert-rgb),0.2)',
                borderRadius: '3px',
              }}
            />
            <div
              style={{
                width: '60px',
                height: '6px',
                background: 'rgba(var(--color-invert-rgb),0.1)',
                borderRadius: '3px',
              }}
            />
          </div>
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              background: 'rgba(var(--accent-rgb),0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(var(--accent-rgb),0.3)',
            }}
          >
            <Fingerprint size={24} style={{ color: 'var(--accent)' }} />
          </div>
        </motion.div>

        {}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3, type: 'spring' }}
          style={{
            width: '100%',
            background: 'rgba(var(--color-invert-rgb),0.06)',
            border: '1px solid rgba(var(--color-invert-rgb),0.1)',
            borderRadius: '16px',
            padding: '12px',
            marginTop: '16px',
          }}
        >
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '12px' }}>
            <div
              style={{
                width: '24px',
                height: '24px',
                background: 'var(--accent)',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ShieldCheck size={14} color="#000" />
            </div>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  width: '100%',
                  height: '4px',
                  background: 'rgba(var(--color-invert-rgb),0.3)',
                  borderRadius: '2px',
                  marginBottom: '4px',
                }}
              />
              <div
                style={{
                  width: '70%',
                  height: '4px',
                  background: 'rgba(var(--color-invert-rgb),0.15)',
                  borderRadius: '2px',
                }}
              />
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <div
              style={{
                flex: 1,
                height: '24px',
                background: 'rgba(var(--color-invert-rgb),0.1)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  width: '20px',
                  height: '3px',
                  background: 'rgba(var(--color-invert-rgb),0.3)',
                  borderRadius: '1.5px',
                }}
              />
            </div>
            <div
              style={{
                flex: 1,
                height: '24px',
                background: 'rgba(var(--accent-rgb),0.2)',
                border: '1px solid var(--accent)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  width: '30px',
                  height: '4px',
                  background: 'var(--accent)',
                  borderRadius: '2px',
                }}
              />
            </div>
          </div>
        </motion.div>
      </motion.div>

      {}

      {}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        style={{
          position: 'absolute',
          left: 'calc(50% - 180px)',
          top: '25%',
          width: '70px',
          height: '70px',
          background: 'rgba(var(--bg-surface), 0.9)',
          border: '1px solid rgba(var(--accent-rgb),0.3)',
          borderRadius: '20px',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 10px 30px rgba(var(--accent-rgb),0.15)',
          animation: 'tfa-pulse-glow 3s infinite alternate',
          zIndex: 11,
        }}
      >
        <ShieldCheck size={36} color="var(--accent)" />
      </motion.div>

      {}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        style={{
          position: 'absolute',
          right: 'calc(50% - 200px)',
          top: '60%',
          width: '130px',
          height: '50px',
          background: 'rgba(var(--bg-surface), 0.9)',
          border: '1px solid rgba(var(--color-invert-rgb),0.15)',
          borderRadius: '12px',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
          zIndex: 11,
        }}
      >
        {[6, 2, 8, 4, 9, 1].map((digit, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2 + i * 0.1 }}
            style={{
              fontSize: '16px',
              fontWeight: 'bold',
              fontFamily: 'var(--font-geist-mono), monospace',
              color: 'rgba(var(--color-invert-rgb),0.8)',
            }}
          >
            {digit}
          </motion.div>
        ))}
      </motion.div>

      {}
      <motion.svg
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        style={{
          position: 'absolute',
          width: '200px',
          height: '200px',
          left: 'calc(50% - 150px)',
          top: '35%',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      >
        <path
          d="M 20 10 Q 150 10 150 80"
          stroke="rgba(var(--accent-rgb),0.4)"
          strokeWidth="2"
          fill="none"
          strokeDasharray="6 6"
          style={{ animation: 'tfa-dash-flow 1s linear infinite' }}
        />
      </motion.svg>

      <motion.svg
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        style={{
          position: 'absolute',
          width: '150px',
          height: '150px',
          right: 'calc(50% - 150px)',
          top: '45%',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      >
        <path
          d="M 0 30 Q 100 30 100 100"
          stroke="rgba(var(--accent-rgb),0.4)"
          strokeWidth="2"
          fill="none"
          strokeDasharray="6 6"
          style={{ animation: 'tfa-dash-flow 1s linear infinite reverse' }}
        />
      </motion.svg>
    </div>
  );
}
