'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence, useInView } from 'framer-motion';

export default function CinematicAppFlow() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // 3D tilt effect based on scroll (bent to straight)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'center center']
  });

  const rawRotateX = useTransform(scrollYProgress, [0, 1], [30, 0]);
  const rawScale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const rawOpacity = useTransform(scrollYProgress, [0, 1], [0.2, 1]);
  
  const rotateX = useSpring(rawRotateX, { stiffness: 100, damping: 30 });
  const scale = useSpring(rawScale, { stiffness: 100, damping: 30 });
  const opacity = useSpring(rawOpacity, { stiffness: 100, damping: 30 });

  // Sequence state: 1: login, 2: splash, 3: dashboard, 4: cards, 5: wealth, 6: dashboard_return
  const [step, setStep] = useState(0);

  // Mobile responsiveness scale factor
  const [scaleFactor, setScaleFactor] = useState(1);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        // Leave a small margin (48px total)
        setScaleFactor((window.innerWidth - 48) / 1024);
      } else {
        setScaleFactor(1);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Play sequence when component becomes mostly visible
  useEffect(() => {
    const unsubs = scrollYProgress.on('change', (val) => {
      if (val > 0.8 && step === 0) {
        setStep(1);
      }
    });
    return () => unsubs();
  }, [scrollYProgress, step]);

  const isInView = useInView(containerRef, { margin: "-20%" });

  useEffect(() => {
    if (step === 0 || !isInView) return;
    
    let timer: NodeJS.Timeout;
    if (step === 1) timer = setTimeout(() => setStep(2), 3000);
    if (step === 2) timer = setTimeout(() => setStep(3), 3500); // Increased time for text reveal
    if (step === 3) timer = setTimeout(() => setStep(4), 4000);
    if (step === 4) timer = setTimeout(() => setStep(5), 4000);
    if (step === 5) timer = setTimeout(() => setStep(6), 4000);
    if (step === 6) timer = setTimeout(() => setStep(3), 3000); // loop back to dashboard

    return () => clearTimeout(timer);
  }, [step, isInView]);

  return (
    <section
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        padding: '160px 24px',
        background: 'var(--bg-base)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '120vh',
        overflow: 'hidden',
      }}
    >
      {/* Background ambient glow */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        width: '100vw', height: '100vh',
        background: 'radial-gradient(circle at center, rgba(16, 185, 129, 0.05) 0%, rgba(3, 7, 18, 0) 70%)',
        pointerEvents: 'none', zIndex: 0
      }} />

      <div style={{
        perspective: '1500px',
        width: '100%',
        maxWidth: '1024px',
        zIndex: 10,
        transform: `scale(${scaleFactor})`,
        transformOrigin: 'center center'
      }}>
        <motion.div
          style={{
            rotateX,
            scale,
            opacity,
            transformStyle: 'preserve-3d',
            background: 'rgba(var(--color-base-rgb), 0.8)', backdropFilter: 'blur(20px)',
            border: '1px solid rgba(var(--color-invert-rgb), 0.1)',
            borderRadius: '24px',
            boxShadow: '0 50px 120px -20px rgba(var(--color-base-rgb), 0.9), 0 0 0 1px rgba(var(--color-invert-rgb), 0.05) inset',
            aspectRatio: '16/9',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {/* Mac Browser Header */}
          <div style={{
            height: '48px', borderBottom: '1px solid rgba(var(--color-invert-rgb), 0.05)',
            display: 'flex', alignItems: 'center', padding: '0 24px', gap: '8px',
            background: 'rgba(var(--color-invert-rgb), 0.02)'
          }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f56' }} />
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ffbd2e' }} />
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#27c93f' }} />
            </div>
            <div style={{
              margin: '0 auto', background: 'rgba(var(--color-invert-rgb), 0.05)', borderRadius: '6px',
              padding: '6px 160px', display: 'flex', alignItems: 'center', gap: '8px'
            }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(var(--color-invert-rgb), 0.4)" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              <span style={{ fontFamily: 'var(--font-geist-mono), monospace', fontSize: '12px', color: 'rgba(var(--color-invert-rgb), 0.4)', transition: 'all 0.5s' }}>
                {step <= 2 ? 'auth.digitalbank.com' : step === 5 ? 'app.digitalbank.com/wealth' : 'app.digitalbank.com/dashboard'}
              </span>
            </div>
          </div>

          <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
            <AnimatePresence mode="wait">
              {/* STEP 1: LOGIN */}
              {step === 1 && (
                <motion.div
                  key="login"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, filter: 'blur(20px)' }}
                  transition={{ duration: 0.8, ease: 'easeInOut' }}
                  style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <div style={{ width: '400px', padding: '48px', background: 'rgba(var(--color-invert-rgb), 0.02)', borderRadius: '24px', border: '1px solid rgba(var(--color-invert-rgb), 0.05)' }}>
                    <div style={{ 
                      width: '64px', height: '64px', 
                      background: 'rgba(var(--color-invert-rgb), 0.03)', 
                      border: '1px solid rgba(var(--color-invert-rgb), 0.1)',
                      boxShadow: 'inset 0 1px 1px rgba(var(--color-invert-rgb), 0.1), 0 8px 16px rgba(var(--color-base-rgb), 0.5)',
                      borderRadius: '16px', 
                      margin: '0 auto 24px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: 'var(--font-syne)', fontSize: '28px', fontWeight: 800
                    }}>
                      <span style={{ color: 'var(--text-primary)' }}>D</span>
                      <span style={{ color: '#10b981' }}>B</span>
                    </div>
                    <h2 style={{ textAlign: 'center', fontFamily: 'var(--font-syne)', fontSize: '28px', color: 'var(--text-primary)', marginBottom: '32px' }}>Secure Login</h2>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      <div style={{ height: '56px', background: 'rgba(var(--color-base-rgb), 0.4)', borderRadius: '12px', border: '1px solid rgba(var(--color-invert-rgb), 0.1)', padding: '0 20px', display: 'flex', alignItems: 'center' }}>
                        <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 1 }} style={{ height: '12px', background: 'rgba(var(--color-invert-rgb), 0.6)', borderRadius: '4px', maxWidth: '60%' }} />
                      </div>
                      <div style={{ height: '56px', background: 'rgba(var(--color-base-rgb), 0.4)', borderRadius: '12px', border: '1px solid rgba(var(--color-invert-rgb), 0.1)', padding: '0 20px', display: 'flex', alignItems: 'center' }}>
                        <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 0.5, delay: 1 }} style={{ height: '12px', background: 'rgba(var(--color-invert-rgb), 0.6)', borderRadius: '4px', maxWidth: '40%' }} />
                      </div>
                      <motion.div
                        initial={{ background: 'var(--text-primary)', color: 'var(--bg-base)' }}
                        animate={{ background: 'rgba(16,185,129,0.2)', color: '#10b981' }}
                        transition={{ delay: 2, duration: 0.5 }}
                        style={{ height: '56px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-syne)', fontSize: '16px', fontWeight: 600, marginTop: '8px' }}
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
                  transition={{ duration: 0.8 }}
                  style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-base)' }}
                >
                  <motion.div 
                    style={{ display: 'flex', fontSize: '64px', fontWeight: 800, fontFamily: 'var(--font-syne)' }}
                    initial={{ y: 20 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                  >
                    <div style={{ display: 'flex', color: 'var(--text-primary)' }}>
                      <span>D</span>
                      <motion.span 
                        initial={{ width: 0, opacity: 0 }} 
                        animate={{ width: 'auto', opacity: 1 }} 
                        transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}
                      >
                        igital&nbsp;
                      </motion.span>
                    </div>
                    <div style={{ display: 'flex', color: '#10b981' }}>
                      <span>B</span>
                      <motion.span 
                        initial={{ width: 0, opacity: 0 }} 
                        animate={{ width: 'auto', opacity: 1 }} 
                        transition={{ duration: 0.8, delay: 1, ease: [0.16, 1, 0.3, 1] }}
                        style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}
                      >
                        anking
                      </motion.span>
                    </div>
                  </motion.div>
                </motion.div>
              )}

              {/* STEP 3, 4, 6: DASHBOARD & CARDS */}
              {(step === 3 || step === 4 || step === 6) && (
                <motion.div
                  key="dashboard"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, scale: step === 4 ? 1.05 : 1, x: step === 4 ? -100 : 0, y: step === 4 ? -50 : 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  style={{ width: '100%', height: '100%', display: 'flex' }}
                >
                  {/* Sidebar */}
                  <div style={{ width: '280px', borderRight: '1px solid rgba(var(--color-invert-rgb), 0.05)', padding: '32px', background: 'rgba(var(--color-base-rgb), 0.2)', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ height: '32px', width: '140px', background: 'rgba(var(--color-invert-rgb), 0.1)', borderRadius: '6px', marginBottom: '48px' }} />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {['Overview', 'Transactions', 'Cards', 'Analytics', 'Settings'].map((lbl, i) => (
                        <div key={i} style={{ height: '48px', borderRadius: '8px', padding: '0 16px', display: 'flex', alignItems: 'center', background: i === 0 ? 'rgba(16,185,129,0.1)' : 'transparent', border: i === 0 ? '1px solid rgba(16,185,129,0.2)' : 'none' }}>
                          <span style={{ color: i === 0 ? '#10b981' : 'rgba(var(--color-invert-rgb), 0.5)', fontFamily: 'var(--font-syne)', fontSize: '15px', fontWeight: i === 0 ? 600 : 400 }}>{lbl}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Main View */}
                  <div style={{ flex: 1, padding: '40px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
                    
                    {/* Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                      <div>
                        <h1 style={{ fontFamily: 'var(--font-syne)', fontSize: '36px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Financial Overview</h1>
                        <p style={{ color: 'rgba(var(--color-invert-rgb), 0.5)', margin: '8px 0 0 0' }}>Real-time enterprise metrics.</p>
                      </div>
                    </div>

                    {/* Stats Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
                      {[
                        { l: 'Total Balance', v: '$2,459,203', t: '+14.5%' },
                        { l: 'Monthly Spend', v: '$142,390', t: '-2.4%' },
                        { l: 'Pending Yield', v: '$12,450', t: '+1.2%' }
                      ].map((s, i) => (
                        <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + (i * 0.1) }} style={{ background: 'rgba(var(--color-invert-rgb), 0.02)', border: '1px solid rgba(var(--color-invert-rgb), 0.05)', borderRadius: '16px', padding: '24px' }}>
                          <div style={{ color: 'rgba(var(--color-invert-rgb), 0.5)', fontSize: '13px', marginBottom: '12px' }}>{s.l}</div>
                          <div style={{ fontFamily: 'var(--font-syne)', fontSize: '32px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>{s.v}</div>
                          <div style={{ color: s.t.startsWith('+') ? '#10b981' : '#ef4444', fontSize: '13px' }}>{s.t} this month</div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Lower section */}
                    <div style={{ display: 'flex', gap: '24px', flex: 1 }}>
                      {/* Chart */}
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} style={{ flex: 1.5, background: 'rgba(var(--color-invert-rgb), 0.02)', border: '1px solid rgba(var(--color-invert-rgb), 0.05)', borderRadius: '20px', padding: '24px', display: 'flex', flexDirection: 'column' }}>
                         <div style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-syne)', fontSize: '18px', fontWeight: 600, marginBottom: '24px' }}>Cash Flow</div>
                         <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', gap: '16px' }}>
                           {[40, 60, 30, 80, 50, 90, 70, 100].map((h, i) => (
                             <motion.div key={i} initial={{ height: 0 }} animate={{ height: `${h}%` }} transition={{ delay: 0.5 + (i * 0.05), type: 'spring' }} style={{ flex: 1, background: 'linear-gradient(to top, #10b981, rgba(16,185,129,0.2))', borderRadius: '4px 4px 0 0' }} />
                           ))}
                         </div>
                      </motion.div>

                      {/* Animated Cards Focus Area */}
                      <motion.div
                        style={{ flex: 1, position: 'relative', background: 'rgba(var(--color-invert-rgb), 0.02)', border: '1px solid rgba(var(--color-invert-rgb), 0.05)', borderRadius: '20px', padding: '24px', overflow: 'visible' }}
                      >
                        <div style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-syne)', fontSize: '18px', fontWeight: 600, marginBottom: '24px' }}>Active Cards</div>
                        
                        <div style={{ position: 'relative', height: '200px', perspective: '1000px' }}>
                          {[
                            { bg: 'linear-gradient(135deg, #111, #333)', color: '#fff', border: 'rgba(var(--color-invert-rgb), 0.2)' },
                            { bg: 'linear-gradient(135deg, #94a3b8, #e2e8f0)', color: '#000', border: 'rgba(var(--color-invert-rgb), 0.8)' }
                          ].map((c, i) => {
                            // If step === 4, we animate the cards into a dramatic focus
                            const isFocus = step === 4;
                            const y = isFocus ? (i === 0 ? -40 : 40) : (i === 0 ? 0 : -20);
                            const scale = isFocus ? (i === 0 ? 1.2 : 1) : (i === 0 ? 1 : 0.9);
                            const zIndex = i === 0 ? 2 : 1;
                            const rotateX = isFocus ? (i === 0 ? 10 : -10) : (i === 0 ? 0 : 5);
                            const rotateY = isFocus ? (i === 0 ? -15 : 15) : 0;

                            return (
                              <motion.div
                                key={i}
                                animate={{ y, scale, zIndex, rotateX, rotateY }}
                                transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                                style={{
                                  position: 'absolute', top: 0, left: 0, right: 0, height: '180px',
                                  background: c.bg, border: `1px solid ${c.border}`, borderRadius: '16px',
                                  padding: '20px', color: c.color, display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                                  boxShadow: '0 20px 40px rgba(var(--color-base-rgb), 0.5)', transformOrigin: 'center center'
                                }}
                              >
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                  <div style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '14px' }}>CORPORATE</div>
                                  <svg width="24" height="16" viewBox="0 0 32 24" fill="none"><rect width="32" height="24" rx="4" fill={i===0?"rgba(var(--color-invert-rgb), 0.8)":"rgba(var(--color-base-rgb), 0.6)"}/></svg>
                                </div>
                                <div style={{ fontFamily: 'var(--font-geist-mono), monospace', fontSize: '16px', letterSpacing: '2px' }}>
                                  **** **** **** {i===0?'8842':'4921'}
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

              {/* STEP 5: WEALTH MANAGEMENT */}
              {step === 5 && (
                <motion.div
                  key="wealth"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 1, ease: 'easeInOut' }}
                  style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', padding: '48px', background: 'radial-gradient(circle at top right, rgba(139,92,246,0.1), transparent 50%)' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '48px' }}>
                     <div>
                        <h1 style={{ fontFamily: 'var(--font-syne)', fontSize: '36px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Wealth Management</h1>
                        <p style={{ color: 'rgba(var(--color-invert-rgb), 0.5)', margin: '8px 0 0 0' }}>Portfolio and asset allocation.</p>
                      </div>
                      <div style={{ background: 'rgba(var(--color-invert-rgb), 0.05)', padding: '12px 24px', borderRadius: '12px', border: '1px solid rgba(var(--color-invert-rgb), 0.1)' }}>
                        <div style={{ color: 'rgba(var(--color-invert-rgb), 0.5)', fontSize: '12px', marginBottom: '4px' }}>Total Net Worth</div>
                        <div style={{ fontFamily: 'var(--font-syne)', fontSize: '28px', fontWeight: 700, color: 'var(--text-primary)' }}>$12,405,920.00</div>
                      </div>
                  </div>

                  <div style={{ display: 'flex', gap: '32px', flex: 1 }}>
                    {/* Ring Chart Mock */}
                    <div style={{ flex: 1, background: 'rgba(var(--color-invert-rgb), 0.02)', borderRadius: '24px', border: '1px solid rgba(var(--color-invert-rgb), 0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                       <svg width="240" height="240" viewBox="0 0 240 240">
                         <motion.circle cx="120" cy="120" r="100" fill="none" stroke="#3b82f6" strokeWidth="20" strokeDasharray="628" initial={{ strokeDashoffset: 628 }} animate={{ strokeDashoffset: 100 }} transition={{ duration: 1.5, ease: 'easeOut' }} />
                         <motion.circle cx="120" cy="120" r="80" fill="none" stroke="#8b5cf6" strokeWidth="20" strokeDasharray="502" initial={{ strokeDashoffset: 502 }} animate={{ strokeDashoffset: 150 }} transition={{ duration: 1.5, delay: 0.2, ease: 'easeOut' }} />
                         <motion.circle cx="120" cy="120" r="60" fill="none" stroke="#10b981" strokeWidth="20" strokeDasharray="377" initial={{ strokeDashoffset: 377 }} animate={{ strokeDashoffset: 200 }} transition={{ duration: 1.5, delay: 0.4, ease: 'easeOut' }} />
                       </svg>
                       <div style={{ position: 'absolute', textAlign: 'center' }}>
                         <div style={{ color: 'rgba(var(--color-invert-rgb), 0.5)', fontSize: '14px' }}>Assets</div>
                         <div style={{ fontFamily: 'var(--font-syne)', fontSize: '24px', color: 'var(--text-primary)', fontWeight: 700 }}>+24%</div>
                       </div>
                    </div>
                    
                    {/* Portfolio List */}
                    <div style={{ flex: 1.5, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      {[
                        { name: 'Equities', val: '$8,204,100', color: '#3b82f6' },
                        { name: 'Fixed Income', val: '$3,100,500', color: '#8b5cf6' },
                        { name: 'Alternatives', val: '$1,101,320', color: '#10b981' }
                      ].map((item, i) => (
                        <motion.div key={i} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + (i * 0.2) }} style={{ padding: '24px', background: 'rgba(var(--color-invert-rgb), 0.02)', borderRadius: '16px', border: '1px solid rgba(var(--color-invert-rgb), 0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <div style={{ width: '16px', height: '16px', borderRadius: '4px', background: item.color }} />
                            <div style={{ color: 'var(--text-primary)', fontSize: '18px', fontFamily: 'var(--font-syne)' }}>{item.name}</div>
                          </div>
                          <div style={{ fontFamily: 'var(--font-geist-mono), monospace', fontSize: '18px', color: 'var(--text-primary)' }}>{item.val}</div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
