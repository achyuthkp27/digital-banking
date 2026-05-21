'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const KF_ID = 'tfa-illus-kf';
function injectKF() {
  if (typeof document === 'undefined') return;
  if (document.getElementById(KF_ID)) return;
  const s = document.createElement('style');
  s.id = KF_ID;
  s.textContent = `
    @keyframes tfa-ring1 { from{transform:rotate(0)} to{transform:rotate(360deg)} }
    @keyframes tfa-ring2 { from{transform:rotate(0)} to{transform:rotate(-360deg)} }
    @keyframes tfa-char { 0%{opacity:0;transform:translateY(4px)} 10%{opacity:.3;transform:translateY(0)} 90%{opacity:.3;transform:translateY(0)} 100%{opacity:0;transform:translateY(-4px)} }
  `;
  document.head.appendChild(s);
}

export default function TwoFactorAuthIllustration() {
  useEffect(() => { injectKF(); }, []);

  const [digits, setDigits] = useState<number[]>([]);

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    for (let i = 0; i < 6; i++) {
      timers.push(setTimeout(() => {
        setDigits(prev => [...prev, Math.floor(Math.random() * 10)]);
      }, 1500 + i * 300));
    }
    return () => timers.forEach(clearTimeout);
  }, []);

  // Matrix stream characters
  const matrixChars = '0123456789ABCDEF';

  return (
    <div style={{ width: '100%', height: '100%', minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
      {/* Matrix data streams (background) */}
      {Array.from({ length: 8 }).map((_, col) => (
        <div key={col} style={{
          position: 'absolute', top: 0, left: `${8 + col * 12}%`,
          display: 'flex', flexDirection: 'column', gap: '8px',
          opacity: 0.15,
        }}>
          {Array.from({ length: 12 }).map((_, row) => (
            <span key={row} style={{
              fontSize: '9px', color: '#10b981',
              fontFamily: 'var(--font-geist-mono), monospace',
              animation: `tfa-char ${1.5 + Math.random()}s ease-in-out ${Math.random() * 3}s infinite`,
            }}>
              {matrixChars[Math.floor(Math.random() * matrixChars.length)]}
            </span>
          ))}
        </div>
      ))}

      {/* Central shield */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        {/* Outer rotating ring 1 */}
        <div style={{
          position: 'absolute', width: '180px', height: '180px',
          animation: 'tfa-ring1 12s linear infinite',
        }}>
          <svg viewBox="0 0 180 180" style={{ width: '100%', height: '100%' }}>
            <circle cx="90" cy="90" r="85" fill="none" stroke="rgba(16,185,129,0.12)" strokeWidth="1" strokeDasharray="8 12" />
            {/* Lock notches */}
            {[0, 90, 180, 270].map(angle => (
              <circle key={angle} cx={90 + 85 * Math.cos(angle * Math.PI / 180)} cy={90 + 85 * Math.sin(angle * Math.PI / 180)} r="3" fill="rgba(16,185,129,0.3)" />
            ))}
          </svg>
        </div>

        {/* Inner rotating ring 2 */}
        <div style={{
          position: 'absolute', width: '140px', height: '140px',
          animation: 'tfa-ring2 8s linear infinite',
        }}>
          <svg viewBox="0 0 140 140" style={{ width: '100%', height: '100%' }}>
            <circle cx="70" cy="70" r="65" fill="none" stroke="rgba(16,185,129,0.18)" strokeWidth="1.5" strokeDasharray="4 8" />
            {[0, 60, 120, 180, 240, 300].map(angle => (
              <circle key={angle} cx={70 + 65 * Math.cos(angle * Math.PI / 180)} cy={70 + 65 * Math.sin(angle * Math.PI / 180)} r="2" fill="rgba(16,185,129,0.4)" />
            ))}
          </svg>
        </div>

        {/* Shield icon */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <svg width="60" height="70" viewBox="0 0 24 28" fill="none">
            <motion.path
              d="M12 1L2 5v8c0 7 10 13 10 13s10-6 10-13V5L12 1z"
              stroke="#10b981" strokeWidth="1.5"
              fill="rgba(16,185,129,0.08)"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: 0.5 }}
            />
            {/* Checkmark inside shield */}
            {digits.length === 6 && (
              <motion.path
                d="M8 14l3 3 5-7"
                stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5 }}
              />
            )}
          </svg>
        </motion.div>
      </motion.div>

      {/* OTP digit boxes */}
      <div style={{
        position: 'absolute', bottom: '22%', left: '50%', transform: 'translateX(-50%)',
        display: 'flex', gap: '8px',
      }}>
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 + i * 0.1 }}
            style={{
              width: '28px', height: '36px', borderRadius: '6px',
              border: `1.5px solid rgba(16,185,129,${digits[i] !== undefined ? 0.5 : 0.15})`,
              background: digits[i] !== undefined ? 'rgba(16,185,129,0.06)' : 'transparent',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.3s ease',
            }}
          >
            {digits[i] !== undefined && (
              <motion.span
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  fontSize: '16px', fontWeight: 700,
                  color: '#10b981',
                  fontFamily: 'var(--font-geist-mono), monospace',
                }}
              >
                {digits[i]}
              </motion.span>
            )}
          </motion.div>
        ))}
      </div>

      {/* Label */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        style={{
          position: 'absolute', bottom: '14%', left: '50%', transform: 'translateX(-50%)',
          fontSize: '9px', color: 'rgba(16,185,129,0.4)',
          fontFamily: 'var(--font-geist-mono), monospace',
          letterSpacing: '0.1em', textTransform: 'uppercase',
        }}
      >
        Enter verification code
      </motion.div>
    </div>
  );
}
