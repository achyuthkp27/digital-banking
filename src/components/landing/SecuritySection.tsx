'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const certs = [
  { label: 'ISO 27001', value: 'Certified' },
  { label: 'PCI DSS', value: 'Level 1' },
  { label: 'AES-256', value: 'Encryption' },
  { label: 'Zero', value: 'Data Breaches' },
];

const features = [
  {
    title: 'Secure Development',
    desc: 'SAST/DAST scanning throughout SDLC'
  },
  {
    title: 'Identity & Access',
    desc: 'OAuth 2.0, SSO, MFA, biometric auth'
  },
  {
    title: 'Data Security',
    desc: 'Tokenization, GDPR compliance'
  },
  {
    title: 'App Protection',
    desc: 'End-to-end encryption, WAF, DDoS'
  }
];

export default function SecuritySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      ref={sectionRef}
      id="security"
      style={{
        position: 'relative',
        width: '100%',
        background: 'var(--bg-base)',
        padding: 'clamp(100px, 15vw, 160px) 0',
        overflow: 'hidden',
        borderTop: '1px solid rgba(var(--color-invert-rgb), 0.03)',
      }}
    >
      {/* Background pattern */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(rgba(var(--color-invert-rgb), 0.03) 1px, transparent 1px)',
        backgroundSize: '32px 32px', pointerEvents: 'none',
      }} />

      {/* CSS Animations */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes spinVault { 100% { transform: rotate(360deg); } }
        @keyframes spinVaultReverse { 100% { transform: rotate(-360deg); } }
        .sec-feature-row:hover .sec-feature-line { transform: scaleX(1) !important; }
      `}} />

      <div style={{
        position: 'relative', zIndex: 10, maxWidth: '1400px', margin: '0 auto',
        padding: '0 clamp(24px, 5vw, 80px)',
        display: 'flex', flexWrap: 'wrap-reverse', gap: 'clamp(40px, 6vw, 80px)',
        alignItems: 'center'
      }}>

        {/* LEFT COLUMN: Content (Header + Side-by-Side Content) */}
        <div style={{ flex: '1 1 700px', display: 'flex', flexDirection: 'column' }}>
          
          {/* Header */}
          <div style={{ marginBottom: '64px' }}>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{
                fontFamily: 'var(--font-geist-mono), monospace',
                fontSize: '12px', color: 'var(--accent)', letterSpacing: '0.14em', textTransform: 'uppercase',
                marginBottom: '20px'
              }}
            >
              {'// ZERO TRUST CORE'}
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              style={{
                fontFamily: 'var(--font-syne), sans-serif',
                fontSize: 'clamp(40px, 5vw, 64px)',
                fontWeight: 800, color: 'var(--text-primary)',
                lineHeight: 1.05, letterSpacing: '-0.03em',
              }}
            >
              Security is not an <br/> afterthought.
            </motion.h2>
          </div>

          {/* Subgrid: Certs & Features Side-by-Side */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '48px' }}>
            
            {/* Certifications column */}
            <div style={{
              flex: '1 1 240px', display: 'flex', flexDirection: 'column', gap: '16px'
            }}>
              {certs.map((cert, i) => (
                <motion.div
                  key={cert.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  style={{
                    background: 'rgba(var(--color-invert-rgb), 0.01)',
                    border: '1px solid rgba(var(--color-invert-rgb), 0.04)',
                    borderRadius: '16px', padding: '20px 24px',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    transition: 'background 0.3s ease',
                    cursor: 'default'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(16, 185, 129, 0.04)';
                    e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(var(--color-invert-rgb), 0.01)';
                    e.currentTarget.style.borderColor = 'rgba(var(--color-invert-rgb), 0.04)';
                  }}
                >
                  <div style={{
                    fontFamily: 'var(--font-syne), sans-serif', fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)'
                  }}>
                    {cert.label}
                  </div>
                  <div style={{
                    fontFamily: 'var(--font-geist-mono), monospace', fontSize: '12px', color: 'var(--accent)', letterSpacing: '0.05em'
                  }}>
                    {cert.value}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Features List column */}
            <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', borderTop: '1px solid rgba(var(--color-invert-rgb), 0.06)' }}>
              {features.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="sec-feature-row"
                  style={{
                    display: 'flex', flexDirection: 'column', gap: '8px',
                    padding: '24px 0', borderBottom: '1px solid rgba(var(--color-invert-rgb), 0.06)',
                    position: 'relative', cursor: 'default'
                  }}
                >
                  <div className="sec-feature-line" style={{
                    position: 'absolute', bottom: '-1px', left: 0, width: '100%', height: '1px',
                    background: 'var(--accent)', transform: 'scaleX(0)', transformOrigin: 'left',
                    transition: 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)', zIndex: 2
                  }} />
                  
                  <h3 style={{
                    fontFamily: 'var(--font-syne), sans-serif', fontSize: '20px', fontWeight: 700,
                    color: 'var(--text-primary)', letterSpacing: '-0.01em', margin: 0
                  }}>
                    {feature.title}
                  </h3>
                  
                  <p style={{
                    fontFamily: 'var(--font-geist-mono), monospace', fontSize: '14px',
                    color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0
                  }}>
                    {feature.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Visual Vault */}
        <div style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center' }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 1, ease: 'easeOut' }}
            style={{
              position: 'relative', width: '100%', maxWidth: '380px', aspectRatio: '1/1',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            {/* Outer Ring */}
            <div style={{
              position: 'absolute', inset: 0, borderRadius: '50%',
              border: '1px dashed rgba(16,185,129,0.3)',
              animation: 'spinVault 24s linear infinite'
            }} />
            {/* Middle Ring */}
            <div style={{
              position: 'absolute', inset: '12%', borderRadius: '50%',
              border: '1px solid rgba(16,185,129,0.1)', borderTopColor: 'rgba(16,185,129,0.6)', borderBottomColor: 'rgba(16,185,129,0.6)',
              animation: 'spinVaultReverse 16s linear infinite'
            }} />
            {/* Inner Ring */}
            <div style={{
              position: 'absolute', inset: '24%', borderRadius: '50%',
              border: '2px dotted rgba(16,185,129,0.2)',
              animation: 'spinVault 10s linear infinite'
            }} />
            
            {/* Core Shield */}
            <div style={{ position: 'relative', zIndex: 10, color: 'var(--accent)' }}>
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="M12 11v4" />
                <circle cx="12" cy="11" r="1" fill="currentColor" />
              </svg>
            </div>

            {/* Core Glow */}
            <div style={{
              position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
              width: '40%', height: '40%', background: 'var(--accent)',
              filter: 'blur(50px)', opacity: 0.2, borderRadius: '50%', pointerEvents: 'none'
            }} />
          </motion.div>
        </div>

      </div>
    </section>
  );
}
