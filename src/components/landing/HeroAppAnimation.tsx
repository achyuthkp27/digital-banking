'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function HeroAppAnimation() {
  const [step, setStep] = useState(1);

  // Auto-play sequence
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (step === 1) timer = setTimeout(() => setStep(2), 3000); // Login
    if (step === 2) timer = setTimeout(() => setStep(3), 3500); // Splash
    if (step === 3) timer = setTimeout(() => setStep(4), 4000); // Dashboard
    if (step === 4) timer = setTimeout(() => setStep(5), 4000); // Cards focus
    if (step === 5) timer = setTimeout(() => setStep(1), 4000); // Loop back to login

    return () => clearTimeout(timer);
  }, [step]);

  return (
    <div style={{
      width: '100%',
      height: '100%',
      perspective: '1500px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px'
    }}>
      <motion.div
        initial={{ rotateY: -15, rotateX: 10, scale: 0.9, opacity: 0 }}
        animate={{ rotateY: -15, rotateX: 10, scale: 0.9, opacity: 1 }}
        transition={{ duration: 1 }}
        style={{
          width: '100%',
          maxWidth: '800px',
          aspectRatio: '16/10',
          background: 'rgba(var(--color-base-rgb), 0.8)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(var(--color-invert-rgb), 0.1)',
          borderRadius: '16px',
          boxShadow: '-30px 30px 100px rgba(var(--color-base-rgb), 0.8), inset 0 1px 1px rgba(var(--color-invert-rgb), 0.2)',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Browser Header */}
        <div style={{
          height: '40px', borderBottom: '1px solid rgba(var(--color-invert-rgb), 0.05)',
          display: 'flex', alignItems: 'center', padding: '0 16px', gap: '8px',
          background: 'rgba(var(--color-invert-rgb), 0.02)'
        }}>
          <div style={{ display: 'flex', gap: '6px' }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f56' }} />
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ffbd2e' }} />
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#27c93f' }} />
          </div>
          <div style={{
            margin: '0 auto', background: 'rgba(var(--color-invert-rgb), 0.05)', borderRadius: '6px',
            padding: '4px 100px', display: 'flex', alignItems: 'center', gap: '8px'
          }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="rgba(var(--color-invert-rgb), 0.4)" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            <span style={{ fontFamily: 'var(--font-geist-mono), monospace', fontSize: '11px', color: 'rgba(var(--color-invert-rgb), 0.4)', transition: 'all 0.5s' }}>
              {step <= 2 ? 'auth.digitalbank.com' : 'app.digitalbank.com'}
            </span>
          </div>
        </div>

        {/* Content Area */}
        <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
          <AnimatePresence mode="wait">
            
            {/* STEP 1: LOGIN */}
            {step === 1 && (
              <motion.div
                key="login"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, filter: 'blur(10px)' }}
                transition={{ duration: 0.6 }}
                style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <div style={{ width: '320px', padding: '32px', background: 'rgba(var(--color-invert-rgb), 0.02)', borderRadius: '20px', border: '1px solid rgba(var(--color-invert-rgb), 0.05)' }}>
                  <div style={{ 
                    width: '48px', height: '48px', 
                    background: 'rgba(var(--color-invert-rgb), 0.03)', 
                    border: '1px solid rgba(var(--color-invert-rgb), 0.1)',
                    boxShadow: 'inset 0 1px 1px rgba(var(--color-invert-rgb), 0.1)',
                    borderRadius: '12px', 
                    margin: '0 auto 24px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: 'var(--font-syne)', fontSize: '20px', fontWeight: 800
                  }}>
                    <span style={{ color: 'var(--text-primary)' }}>D</span>
                    <span style={{ color: 'var(--accent)' }}>B</span>
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ height: '40px', background: 'rgba(var(--color-base-rgb), 0.4)', borderRadius: '8px', border: '1px solid rgba(var(--color-invert-rgb), 0.1)', padding: '0 16px', display: 'flex', alignItems: 'center' }}>
                      <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 1 }} style={{ height: '8px', background: 'rgba(var(--color-invert-rgb), 0.6)', borderRadius: '4px', maxWidth: '60%' }} />
                    </div>
                    <div style={{ height: '40px', background: 'rgba(var(--color-base-rgb), 0.4)', borderRadius: '8px', border: '1px solid rgba(var(--color-invert-rgb), 0.1)', padding: '0 16px', display: 'flex', alignItems: 'center' }}>
                      <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 0.5, delay: 1 }} style={{ height: '8px', background: 'rgba(var(--color-invert-rgb), 0.6)', borderRadius: '4px', maxWidth: '40%' }} />
                    </div>
                    <motion.div
                      initial={{ background: 'var(--text-primary)', color: '#000' }}
                      animate={{ background: 'rgba(var(--accent-rgb),0.2)', color: 'var(--accent)' }}
                      transition={{ delay: 2, duration: 0.5 }}
                      style={{ height: '40px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-syne)', fontSize: '13px', fontWeight: 600, marginTop: '8px' }}
                    >
                      Authenticating...
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 2: SPLASH */}
            {step === 2 && (
              <motion.div
                key="splash"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.6 }}
                style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-base)' }}
              >
                <motion.div 
                  style={{ display: 'flex', fontSize: '48px', fontWeight: 800, fontFamily: 'var(--font-syne)' }}
                  initial={{ y: 20 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <div style={{ display: 'flex', color: 'var(--text-primary)' }}>
                    <span>D</span>
                    <motion.span 
                      initial={{ width: 0, opacity: 0 }} 
                      animate={{ width: 'auto', opacity: 1 }} 
                      transition={{ duration: 0.6, delay: 0.4 }}
                      style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}
                    >
                      igital&nbsp;
                    </motion.span>
                  </div>
                  <div style={{ display: 'flex', color: 'var(--accent)' }}>
                    <span>B</span>
                    <motion.span 
                      initial={{ width: 0, opacity: 0 }} 
                      animate={{ width: 'auto', opacity: 1 }} 
                      transition={{ duration: 0.6, delay: 0.8 }}
                      style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}
                    >
                      anking
                    </motion.span>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* STEP 3, 4: DASHBOARD & CARDS */}
            {(step === 3 || step === 4) && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, scale: step === 4 ? 1.05 : 1, x: step === 4 ? -50 : 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                style={{ width: '100%', height: '100%', display: 'flex' }}
              >
                {/* Sidebar */}
                <div style={{ width: '200px', borderRight: '1px solid rgba(var(--color-invert-rgb), 0.05)', padding: '24px', background: 'rgba(var(--color-base-rgb), 0.2)', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ height: '24px', width: '100px', background: 'rgba(var(--color-invert-rgb), 0.1)', borderRadius: '4px', marginBottom: '32px' }} />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {['Overview', 'Transactions', 'Cards', 'Analytics'].map((lbl, i) => (
                      <div key={i} style={{ height: '36px', borderRadius: '6px', padding: '0 12px', display: 'flex', alignItems: 'center', background: i === 0 ? 'rgba(var(--accent-rgb),0.1)' : 'transparent', border: i === 0 ? '1px solid rgba(var(--accent-rgb),0.2)' : 'none' }}>
                        <span style={{ color: i === 0 ? 'var(--accent)' : 'rgba(var(--color-invert-rgb), 0.5)', fontFamily: 'var(--font-syne)', fontSize: '13px', fontWeight: i === 0 ? 600 : 400 }}>{lbl}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Main View */}
                <div style={{ flex: 1, padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <div>
                      <h1 style={{ fontFamily: 'var(--font-syne)', fontSize: '24px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Overview</h1>
                      <p style={{ color: 'rgba(var(--color-invert-rgb), 0.5)', margin: '4px 0 0 0', fontSize: '13px' }}>Real-time metrics.</p>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                    {[
                      { l: 'Balance', v: '$2.4M', t: '+14.5%' },
                      { l: 'Spend', v: '$142k', t: '-2.4%' },
                      { l: 'Yield', v: '$12k', t: '+1.2%' }
                    ].map((s, i) => (
                      <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + (i * 0.1) }} style={{ background: 'rgba(var(--color-invert-rgb), 0.02)', border: '1px solid rgba(var(--color-invert-rgb), 0.05)', borderRadius: '12px', padding: '16px' }}>
                        <div style={{ color: 'rgba(var(--color-invert-rgb), 0.5)', fontSize: '11px', marginBottom: '8px' }}>{s.l}</div>
                        <div style={{ fontFamily: 'var(--font-syne)', fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>{s.v}</div>
                        <div style={{ color: s.t.startsWith('+') ? 'var(--accent)' : '#ef4444', fontSize: '11px' }}>{s.t}</div>
                      </motion.div>
                    ))}
                  </div>

                  <div style={{ display: 'flex', gap: '16px', flex: 1 }}>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} style={{ flex: 1.5, background: 'rgba(var(--color-invert-rgb), 0.02)', border: '1px solid rgba(var(--color-invert-rgb), 0.05)', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column' }}>
                       <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', gap: '8px' }}>
                         {[40, 60, 30, 80, 50, 90, 70, 100].map((h, i) => (
                           <motion.div key={i} initial={{ height: 0 }} animate={{ height: `${h}%` }} transition={{ delay: 0.5 + (i * 0.05), type: 'spring' }} style={{ flex: 1, background: 'linear-gradient(to top, var(--accent), rgba(var(--accent-rgb),0.2))', borderRadius: '4px 4px 0 0' }} />
                         ))}
                       </div>
                    </motion.div>

                    <motion.div style={{ flex: 1, position: 'relative', background: 'rgba(var(--color-invert-rgb), 0.02)', border: '1px solid rgba(var(--color-invert-rgb), 0.05)', borderRadius: '12px', padding: '16px', overflow: 'visible' }}>
                      <div style={{ position: 'relative', height: '120px', perspective: '1000px', marginTop: '10px' }}>
                        {[
                          { bg: 'linear-gradient(135deg, #111, #333)', color: 'var(--text-primary)', border: 'rgba(var(--color-invert-rgb), 0.2)' },
                          { bg: 'linear-gradient(135deg, #94a3b8, #e2e8f0)', color: '#000', border: 'rgba(var(--color-invert-rgb), 0.8)' }
                        ].map((c, i) => {
                          const isFocus = step === 4;
                          const y = isFocus ? (i === 0 ? -20 : 20) : (i === 0 ? 0 : -10);
                          const scale = isFocus ? (i === 0 ? 1.1 : 0.95) : (i === 0 ? 1 : 0.9);
                          const zIndex = i === 0 ? 2 : 1;
                          const rotateX = isFocus ? (i === 0 ? 10 : -10) : (i === 0 ? 0 : 5);
                          const rotateY = isFocus ? (i === 0 ? -15 : 15) : 0;

                          return (
                            <motion.div key={i} animate={{ y, scale, zIndex, rotateX, rotateY }} transition={{ type: 'spring', stiffness: 100, damping: 20 }} style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '100px', background: c.bg, border: `1px solid ${c.border}`, borderRadius: '12px', padding: '12px', color: c.color, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 10px 20px rgba(var(--color-base-rgb), 0.5)', transformOrigin: 'center center' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '10px' }}>CORP</div>
                                <svg width="16" height="12" viewBox="0 0 32 24" fill="none"><rect width="32" height="24" rx="4" fill={i===0?"rgba(var(--color-invert-rgb), 0.8)":"rgba(var(--color-base-rgb), 0.6)"}/></svg>
                              </div>
                            </motion.div>
                          )
                        })}
                      </div>
                    </motion.div>
                  </div>

                </div>
              </motion.div>
            )}
            
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
