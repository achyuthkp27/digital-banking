'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Camera, ShieldCheck, FileText } from 'lucide-react';

const KF_ID = 'video-kyc-illus-kf';

function injectKF() {
  if (typeof document === 'undefined') return;
  if (document.getElementById(KF_ID)) return;
  const s = document.createElement('style');
  s.id = KF_ID;
  s.textContent = `
    @keyframes vkyc-scan { 0%,100%{top:10%} 50%{top:85%} }
    @keyframes vkyc-pulse { 0%,100%{transform:scale(1);opacity:.6} 50%{transform:scale(1.15);opacity:1} }
    @keyframes vkyc-pulse-dot { 0%,100%{opacity:0.4; transform:scale(0.8)} 50%{opacity:1; transform:scale(1.2)} }
    @keyframes vkyc-dash-flow { 0%{stroke-dashoffset: 24} 100%{stroke-dashoffset: 0} }
  `;
  document.head.appendChild(s);
}

export default function VideoKycIllustration() {
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
          width: '200px',
          height: '200px',
          background: 'radial-gradient(circle, rgba(var(--accent-rgb),0.1) 0%, transparent 70%)',
          filter: 'blur(20px)',
        }}
      />

      {}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'relative',
          width: '200px',
          height: '280px',
          background: 'rgba(var(--color-invert-rgb),0.02)',
          border: '1px solid rgba(var(--color-invert-rgb),0.1)',
          borderRadius: '24px',
          overflow: 'hidden',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
        }}
      >
        {}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '12px 16px',
            borderBottom: '1px solid rgba(var(--color-invert-rgb),0.05)',
          }}
        >
          <div style={{ display: 'flex', gap: '6px' }}>
            <div
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: 'rgba(239,68,68,0.8)',
              }}
            />
            <div
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: 'rgba(234,179,8,0.8)',
              }}
            />
            <div
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: 'rgba(34,197,94,0.8)',
              }}
            />
          </div>
          <Camera size={14} style={{ color: 'rgba(var(--color-invert-rgb),0.4)' }} />
        </div>

        {}
        <div
          style={{
            position: 'relative',
            height: 'calc(100% - 40px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(var(--color-invert-rgb), 0.01)',
          }}
        >
          {}
          <svg
            viewBox="0 0 24 24"
            style={{ width: '120px', height: '120px', color: 'rgba(var(--color-invert-rgb),0.08)' }}
            fill="currentColor"
          >
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>

          {}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '110px',
              height: '110px',
            }}
          >
            {}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '12px',
                height: '12px',
                borderTop: '2px solid var(--accent)',
                borderLeft: '2px solid var(--accent)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '12px',
                height: '12px',
                borderTop: '2px solid var(--accent)',
                borderRight: '2px solid var(--accent)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '12px',
                height: '12px',
                borderBottom: '2px solid var(--accent)',
                borderLeft: '2px solid var(--accent)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                width: '12px',
                height: '12px',
                borderBottom: '2px solid var(--accent)',
                borderRight: '2px solid var(--accent)',
              }}
            />

            {}
            <div
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                height: '2px',
                background: 'linear-gradient(90deg, transparent, var(--accent), transparent)',
                boxShadow: '0 0 10px var(--accent)',
                animation: 'vkyc-scan 2.5s ease-in-out infinite',
              }}
            />

            {}
            <div
              style={{
                position: 'absolute',
                top: '35%',
                left: '35%',
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                background: 'var(--accent)',
                animation: 'vkyc-pulse-dot 1.5s infinite 0.2s',
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: '35%',
                right: '35%',
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                background: 'var(--accent)',
                animation: 'vkyc-pulse-dot 1.5s infinite 0.4s',
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: '55%',
                left: '50%',
                transform: 'translate(-50%,-50%)',
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                background: 'var(--accent)',
                animation: 'vkyc-pulse-dot 1.5s infinite 0.6s',
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: '25%',
                left: '40%',
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                background: 'var(--accent)',
                animation: 'vkyc-pulse-dot 1.5s infinite 0.8s',
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: '25%',
                right: '40%',
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                background: 'var(--accent)',
                animation: 'vkyc-pulse-dot 1.5s infinite 1.0s',
              }}
            />

            {}
            <svg
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
              }}
            >
              <path
                d="M 38.5 38.5 L 55 60.5 L 44 82.5"
                stroke="rgba(var(--accent-rgb),0.3)"
                strokeWidth="1"
                fill="none"
              />
              <path
                d="M 71.5 38.5 L 55 60.5 L 66 82.5"
                stroke="rgba(var(--accent-rgb),0.3)"
                strokeWidth="1"
                fill="none"
              />
            </svg>
          </div>

          {}
          <div
            style={{
              position: 'absolute',
              bottom: '12px',
              right: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(0,0,0,0.6)',
              padding: '4px 8px',
              borderRadius: '12px',
            }}
          >
            <div
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: '#ef4444',
                animation: 'vkyc-pulse-dot 2s infinite',
              }}
            />
            <span
              style={{ fontSize: '10px', color: '#fff', fontWeight: 600, letterSpacing: '0.05em' }}
            >
              LIVE
            </span>
          </div>
        </div>
      </motion.div>

      {}
      <motion.div
        initial={{ opacity: 0, x: 20, y: 40 }}
        animate={{ opacity: 1, x: 0, y: 20 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'absolute',
          right: 'calc(50% - 190px)',
          top: '55%',
          width: '150px',
          height: '96px',
          background: 'rgba(var(--bg-surface), 0.8)',
          border: '1px solid rgba(var(--color-invert-rgb),0.1)',
          borderRadius: '12px',
          backdropFilter: 'blur(8px)',
          padding: '14px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
          zIndex: 10,
        }}
      >
        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
          <div
            style={{
              width: '30px',
              height: '36px',
              background: 'rgba(var(--color-invert-rgb),0.1)',
              borderRadius: '4px',
            }}
          />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div
              style={{
                width: '80%',
                height: '4px',
                background: 'rgba(var(--color-invert-rgb),0.2)',
                borderRadius: '2px',
              }}
            />
            <div
              style={{
                width: '60%',
                height: '4px',
                background: 'rgba(var(--color-invert-rgb),0.1)',
                borderRadius: '2px',
              }}
            />
            <div
              style={{
                width: '40%',
                height: '4px',
                background: 'rgba(var(--color-invert-rgb),0.1)',
                borderRadius: '2px',
              }}
            />
          </div>
        </div>
        <div
          style={{
            width: '100%',
            height: '1px',
            background: 'rgba(var(--color-invert-rgb),0.05)',
            margin: '4px 0',
          }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <FileText size={12} style={{ color: 'rgba(var(--color-invert-rgb),0.3)' }} />
          <div
            style={{
              width: '40px',
              height: '4px',
              background: 'rgba(var(--color-invert-rgb),0.1)',
              borderRadius: '2px',
            }}
          />
        </div>

        {}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1.2, type: 'spring' }}
          style={{
            position: 'absolute',
            top: '-10px',
            right: '-10px',
            width: '28px',
            height: '28px',
            background: 'var(--accent)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(var(--accent-rgb),0.4)',
          }}
        >
          <ShieldCheck size={16} color="#000" />
        </motion.div>
      </motion.div>

      {}
      <motion.svg
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        style={{
          position: 'absolute',
          width: '60px',
          height: '10px',
          left: 'calc(50% + 100px)',
          top: '65%',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      >
        <line
          x1="0"
          y1="5"
          x2="60"
          y2="5"
          stroke="var(--accent)"
          strokeWidth="2"
          strokeDasharray="4 4"
          style={{ animation: 'vkyc-dash-flow 1s linear infinite' }}
        />
      </motion.svg>
    </div>
  );
}
