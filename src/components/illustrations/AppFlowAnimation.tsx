'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

export default function AppFlowAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  
  // Animation states: 0: hidden, 1: browser open, 2: login, 3: loading, 4: dashboard loading, 5: dashboard fully animated
  const [step, setStep] = useState(0);
  
  // Carousel state
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  const cards = [
    { type: 'BLACK', number: '**** **** **** 8842', balance: '$124,500.00', bg: 'linear-gradient(135deg, #111, #333)', border: 'rgba(var(--color-invert-rgb), 0.2)', color: '#fff' },
    { type: 'PLATINUM', number: '**** **** **** 4921', balance: '$45,200.50', bg: 'linear-gradient(135deg, #94a3b8, #e2e8f0)', border: 'rgba(var(--color-invert-rgb), 0.6)', color: '#000' },
    { type: 'REWARDS', number: '**** **** **** 9011', balance: '$8,430.00', bg: 'linear-gradient(135deg, #b45309, #f59e0b)', border: 'rgba(var(--color-invert-rgb), 0.3)', color: '#fff' }
  ];

  useEffect(() => {
    if (!isInView) return;
    
    // Sequence orchestration
    const t1 = setTimeout(() => setStep(1), 500); // Open browser
    const t2 = setTimeout(() => setStep(2), 1500); // Show login form
    const t3 = setTimeout(() => setStep(3), 3000); // Click login (loading state)
    const t4 = setTimeout(() => setStep(4), 4500); // Switch to dashboard
    const t5 = setTimeout(() => setStep(5), 5500); // Animate dashboard elements

    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); clearTimeout(t5);
    };
  }, [isInView]);

  // Card carousel interval
  useEffect(() => {
    if (step < 5) return;
    const interval = setInterval(() => {
      setActiveCardIndex((prev) => (prev + 1) % cards.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [step, cards.length]);

  return (
    <section
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        padding: '120px 24px',
        background: 'var(--bg-base)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '1000px',
        overflow: 'hidden',
      }}
    >
      <div style={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        width: '1200px', height: '1200px',
        background: 'radial-gradient(circle, rgba(16, 185, 129, 0.08) 0%, rgba(3, 7, 18, 0) 60%)',
        pointerEvents: 'none', zIndex: 0
      }} />

      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={step >= 1 ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.95 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          width: '100%', maxWidth: '1200px', height: '750px',
          background: 'rgba(var(--color-base-rgb), 0.8)', backdropFilter: 'blur(20px)',
          border: '1px solid rgba(var(--color-invert-rgb), 0.1)',
          borderRadius: '16px', overflow: 'hidden',
          boxShadow: '0 50px 120px -20px rgba(var(--color-base-rgb), 0.9), 0 0 0 1px rgba(var(--color-invert-rgb), 0.05) inset',
          position: 'relative', zIndex: 10,
          display: 'flex', flexDirection: 'column'
        }}
      >
        {/* Browser Header */}
        <div style={{
          height: '48px', borderBottom: '1px solid rgba(var(--color-invert-rgb), 0.05)',
          display: 'flex', alignItems: 'center', padding: '0 20px', gap: '8px',
          background: 'rgba(var(--color-invert-rgb), 0.02)'
        }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f56' }} />
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ffbd2e' }} />
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#27c93f' }} />
          </div>
          <div style={{
            margin: '0 auto', background: 'rgba(var(--color-invert-rgb), 0.05)', borderRadius: '6px',
            padding: '6px 120px', display: 'flex', alignItems: 'center', gap: '8px'
          }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(var(--color-invert-rgb), 0.4)" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            <span style={{ fontFamily: 'var(--font-geist-mono), monospace', fontSize: '12px', color: 'rgba(var(--color-invert-rgb), 0.4)' }}>
              {step < 4 ? 'auth.digitalbank.com' : 'app.digitalbank.com/dashboard'}
            </span>
          </div>
        </div>

        {/* Browser Content */}
        <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
          
          <AnimatePresence mode="wait">
            {step >= 2 && step < 4 && (
              <motion.div
                key="login"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                style={{
                  position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}
              >
                <div style={{ width: '400px', padding: '48px', background: 'rgba(var(--color-invert-rgb), 0.03)', borderRadius: '24px', border: '1px solid rgba(var(--color-invert-rgb), 0.05)', display: 'flex', flexDirection: 'column', gap: '24px', boxShadow: '0 20px 40px rgba(var(--color-base-rgb), 0.5)' }}>
                  <div style={{ textAlign: 'center', marginBottom: '8px' }}>
                    <div style={{ width: '56px', height: '56px', background: 'linear-gradient(135deg, #10b981, #047857)', borderRadius: '16px', margin: '0 auto 24px', boxShadow: '0 10px 30px rgba(16,185,129,0.3)' }} />
                    <h2 style={{ fontFamily: 'var(--font-syne), sans-serif', fontSize: '28px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Welcome back</h2>
                    <p style={{ color: 'rgba(var(--color-invert-rgb), 0.5)', fontSize: '15px', marginTop: '8px' }}>Enter your credentials to securely access your enterprise dashboard.</p>
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ height: '56px', background: 'rgba(var(--color-base-rgb), 0.3)', borderRadius: '12px', border: '1px solid rgba(var(--color-invert-rgb), 0.1)', display: 'flex', alignItems: 'center', padding: '0 20px' }}>
                      <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 0.8, delay: 0.5 }} style={{ height: '16px', background: 'rgba(var(--color-invert-rgb), 0.8)', borderRadius: '4px', maxWidth: '60%' }} />
                    </div>
                    <div style={{ height: '56px', background: 'rgba(var(--color-base-rgb), 0.3)', borderRadius: '12px', border: '1px solid rgba(var(--color-invert-rgb), 0.1)', display: 'flex', alignItems: 'center', padding: '0 20px' }}>
                       <motion.div initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 0.8, delay: 1.3 }} style={{ height: '16px', background: 'rgba(var(--color-invert-rgb), 0.8)', borderRadius: '4px', maxWidth: '40%' }} />
                    </div>
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      height: '56px', background: 'var(--text-primary)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#000', fontFamily: 'var(--font-syne), sans-serif', fontSize: '16px', fontWeight: 600, cursor: 'pointer', overflow: 'hidden', position: 'relative', marginTop: '8px'
                    }}
                  >
                    {step === 3 ? (
                      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }} style={{ width: '24px', height: '24px', border: '3px solid rgba(var(--color-base-rgb), 0.1)', borderTopColor: '#000', borderRadius: '50%' }} />
                    ) : (
                      'Sign In to Dashboard'
                    )}
                    {step === 3 && (
                      <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 20, opacity: 0 }} transition={{ duration: 1.5, ease: 'easeOut' }} style={{ position: 'absolute', width: '20px', height: '20px', background: 'rgba(16,185,129,0.5)', borderRadius: '50%' }} />
                    )}
                  </motion.div>
                </div>
              </motion.div>
            )}

            {step >= 4 && (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                style={{ width: '100%', height: '100%', display: 'flex' }}
              >
                {/* Sidebar */}
                <div style={{ width: '260px', borderRight: '1px solid rgba(var(--color-invert-rgb), 0.05)', padding: '32px 24px', display: 'flex', flexDirection: 'column', gap: '8px', background: 'rgba(var(--color-base-rgb), 0.2)' }}>
                  <div style={{ height: '32px', width: '140px', background: 'linear-gradient(90deg, rgba(var(--color-invert-rgb), 0.2), rgba(var(--color-invert-rgb), 0.05))', borderRadius: '6px', marginBottom: '40px' }} />
                  {['Overview', 'Transactions', 'Cards & Limits', 'Analytics', 'Settings'].map((label, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * i, duration: 0.5 }}
                      style={{ height: '48px', background: i === 0 ? 'rgba(16,185,129,0.1)' : 'transparent', borderRadius: '8px', display: 'flex', alignItems: 'center', padding: '0 16px', border: i === 0 ? '1px solid rgba(16,185,129,0.2)' : '1px solid transparent' }}
                    >
                      <span style={{ color: i === 0 ? '#10b981' : 'rgba(var(--color-invert-rgb), 0.5)', fontFamily: 'var(--font-syne)', fontWeight: i === 0 ? 600 : 400, fontSize: '15px' }}>{label}</span>
                    </motion.div>
                  ))}
                  <div style={{ marginTop: 'auto', padding: '20px', background: 'rgba(var(--color-invert-rgb), 0.03)', borderRadius: '12px', border: '1px solid rgba(var(--color-invert-rgb), 0.05)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)' }} />
                      <div>
                        <div style={{ color: 'var(--text-primary)', fontSize: '14px', fontWeight: 600 }}>Alexander J.</div>
                        <div style={{ color: 'rgba(var(--color-invert-rgb), 0.5)', fontSize: '12px' }}>Enterprise Admin</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Main Dashboard Area */}
                <div style={{ flex: 1, padding: '32px 40px', display: 'flex', flexDirection: 'column', gap: '32px', overflowY: 'auto' }}>
                  
                  {/* Top Header & Stats */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '8px' }}>
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                      <h1 style={{ fontFamily: 'var(--font-syne)', fontSize: '32px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Financial Overview</h1>
                      <p style={{ color: 'rgba(var(--color-invert-rgb), 0.5)', margin: '8px 0 0 0', fontSize: '15px' }}>Track your enterprise cash flow and active cards.</p>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }} style={{ display: 'flex', gap: '16px' }}>
                      <div style={{ padding: '10px 20px', background: 'rgba(var(--color-invert-rgb), 0.05)', borderRadius: '8px', color: 'var(--text-primary)', fontSize: '14px', border: '1px solid rgba(var(--color-invert-rgb), 0.1)' }}>Download Report</div>
                      <div style={{ padding: '10px 20px', background: 'var(--text-primary)', color: '#000', borderRadius: '8px', fontSize: '14px', fontWeight: 600 }}>+ Add Funds</div>
                    </motion.div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '20px' }}>
                    {[
                      { label: 'Total Balance', value: '$2,459,203.45', change: '+14.5%', trend: 'up' },
                      { label: 'Monthly Spend', value: '$142,390.00', change: '-2.4%', trend: 'down' },
                      { label: 'Active Cards', value: '42', change: '+3 this week', trend: 'neutral' },
                      { label: 'Pending Yield', value: '$12,450.00', change: '+1.2%', trend: 'up' }
                    ].map((stat, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + (0.1 * i), duration: 0.5 }}
                        style={{ background: 'linear-gradient(180deg, rgba(var(--color-invert-rgb), 0.03) 0%, rgba(var(--color-invert-rgb), 0.01) 100%)', border: '1px solid rgba(var(--color-invert-rgb), 0.05)', borderRadius: '16px', padding: '24px', boxShadow: '0 10px 30px rgba(var(--color-base-rgb), 0.2)' }}
                      >
                        <div style={{ color: 'rgba(var(--color-invert-rgb), 0.5)', fontSize: '13px', marginBottom: '12px', fontWeight: 500 }}>{stat.label}</div>
                        <div style={{ fontFamily: 'var(--font-syne), sans-serif', fontSize: '26px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>
                          {step >= 5 ? (
                            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>{stat.value}</motion.span>
                          ) : (
                            <div style={{ height: '32px', width: '120px', background: 'rgba(var(--color-invert-rgb), 0.1)', borderRadius: '4px' }} />
                          )}
                        </div>
                        {step >= 5 && (
                          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} style={{ color: stat.trend === 'up' ? '#10b981' : stat.trend === 'down' ? '#ef4444' : 'rgba(var(--color-invert-rgb), 0.5)', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 500 }}>
                            <span style={{ display: 'inline-block', padding: '2px 6px', background: stat.trend === 'up' ? 'rgba(16,185,129,0.1)' : stat.trend === 'down' ? 'rgba(239,68,68,0.1)' : 'rgba(var(--color-invert-rgb), 0.05)', borderRadius: '4px' }}>
                              {stat.change}
                            </span>
                          </motion.div>
                        )}
                      </motion.div>
                    ))}
                  </div>

                  <div style={{ display: 'flex', gap: '24px', flex: 1, minHeight: '340px' }}>
                    {/* Left: Chart area */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6, duration: 0.6 }}
                      style={{ flex: '1.5', background: 'rgba(var(--color-invert-rgb), 0.02)', border: '1px solid rgba(var(--color-invert-rgb), 0.05)', borderRadius: '20px', padding: '28px', display: 'flex', flexDirection: 'column' }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                        <div style={{ color: 'var(--text-primary)', fontSize: '18px', fontWeight: 600, fontFamily: 'var(--font-syne)' }}>Cash Flow Analytics</div>
                        <div style={{ display: 'flex', gap: '8px', background: 'rgba(var(--color-base-rgb), 0.3)', padding: '4px', borderRadius: '8px' }}>
                          {['1W', '1M', '3M', '1Y', 'ALL'].map((time, idx) => (
                            <div key={time} style={{ padding: '4px 12px', fontSize: '12px', color: idx === 1 ? '#000' : 'rgba(var(--color-invert-rgb), 0.6)', background: idx === 1 ? 'var(--text-primary)' : 'transparent', borderRadius: '4px', fontWeight: idx === 1 ? 600 : 400, cursor: 'pointer' }}>{time}</div>
                          ))}
                        </div>
                      </div>
                      
                      <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'flex-end', gap: '20px', paddingBottom: '24px' }}>
                        {/* Horizontal Grid lines */}
                        <div style={{ position: 'absolute', inset: '0 0 24px 0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', pointerEvents: 'none' }}>
                          {[100, 75, 50, 25, 0].map(val => (
                            <div key={val} style={{ borderBottom: '1px dashed rgba(var(--color-invert-rgb), 0.05)', display: 'flex', alignItems: 'flex-end', paddingBottom: '4px' }}>
                              <span style={{ color: 'rgba(var(--color-invert-rgb), 0.3)', fontSize: '10px' }}>{val}k</span>
                            </div>
                          ))}
                        </div>

                        {step >= 5 && [40, 65, 30, 85, 50, 95, 75, 45, 60, 80].map((h, i) => (
                          <motion.div
                            key={i}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: `${h}%`, opacity: 1 }}
                            transition={{ delay: 0.8 + (i * 0.08), type: 'spring', stiffness: 50 }}
                            style={{ flex: 1, background: 'linear-gradient(to top, rgba(16,185,129,0.8), rgba(16,185,129,0.1))', borderRadius: '6px 6px 0 0', position: 'relative', zIndex: 1 }}
                          >
                            <motion.div 
                              initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.5 + (i * 0.1) }}
                              style={{ position: 'absolute', top: '-8px', left: '50%', transform: 'translate(-50%, -100%)', opacity: i === 5 ? 1 : 0 }}
                            >
                              <div style={{ background: 'var(--text-primary)', color: '#000', padding: '4px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 700 }}>
                                ${h}k
                              </div>
                            </motion.div>
                          </motion.div>
                        ))}
                        {/* Smooth trend line overlay */}
                        {step >= 5 && (
                          <svg style={{ position: 'absolute', inset: '0 0 24px 0', width: '100%', height: '100%', overflow: 'visible', pointerEvents: 'none', zIndex: 2 }}>
                            <motion.path
                              initial={{ pathLength: 0, opacity: 0 }}
                              animate={{ pathLength: 1, opacity: 1 }}
                              transition={{ delay: 1.2, duration: 2, ease: 'easeInOut' }}
                              d="M 0,180 C 50,150 80,220 130,100 C 180,20 220,150 270,50 C 320,-20 370,120 420,80 C 470,40 520,100 560,60"
                              fill="none"
                              stroke="rgba(var(--color-invert-rgb), 0.9)"
                              strokeWidth="4"
                              style={{ filter: 'drop-shadow(0 8px 12px rgba(var(--color-invert-rgb), 0.4))' }}
                              vectorEffect="non-scaling-stroke"
                            />
                          </svg>
                        )}
                      </div>
                    </motion.div>

                    {/* Right: Card Carousel & Next things */}
                    <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                      
                      {/* Premium Card Carousel */}
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7, duration: 0.6 }}
                        style={{ background: 'rgba(var(--color-invert-rgb), 0.02)', border: '1px solid rgba(var(--color-invert-rgb), 0.05)', borderRadius: '20px', padding: '24px', height: '240px', position: 'relative', overflow: 'hidden' }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', zIndex: 10, position: 'relative' }}>
                          <div style={{ color: 'var(--text-primary)', fontSize: '16px', fontWeight: 600, fontFamily: 'var(--font-syne)' }}>Your Cards</div>
                          <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(var(--color-invert-rgb), 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-primary)', cursor: 'pointer' }}>+</div>
                        </div>

                        <div style={{ position: 'relative', height: '160px', perspective: '1000px' }}>
                          <AnimatePresence>
                            {step >= 5 && cards.map((card, i) => {
                              // Calculate relative index for carousel effect
                              const offset = (i - activeCardIndex + cards.length) % cards.length;
                              const isFront = offset === 0;
                              const isMiddle = offset === 1;
                              const isBack = offset === 2;

                              if (!isFront && !isMiddle && !isBack) return null; // Show max 3 cards

                              const scale = isFront ? 1 : isMiddle ? 0.9 : 0.8;
                              const y = isFront ? 0 : isMiddle ? -20 : -40;
                              const opacity = isFront ? 1 : isMiddle ? 0.7 : 0.3;
                              const zIndex = isFront ? 3 : isMiddle ? 2 : 1;
                              const rotateX = isFront ? 0 : isMiddle ? 5 : 10;

                              return (
                                <motion.div
                                  key={i}
                                  initial={false}
                                  animate={{ scale, y, opacity, zIndex, rotateX }}
                                  transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                                  style={{
                                    position: 'absolute', top: 0, left: 0, right: 0, height: '100%',
                                    background: card.bg,
                                    border: `1px solid ${card.border}`, borderRadius: '16px',
                                    padding: '20px',
                                    boxShadow: isFront ? '0 20px 40px rgba(var(--color-base-rgb), 0.5)' : 'none',
                                    color: card.color || 'var(--text-primary)',
                                    display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                                    transformOrigin: 'top center'
                                  }}
                                >
                                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: '14px', letterSpacing: '1px' }}>{card.type}</div>
                                    <svg width="24" height="16" viewBox="0 0 32 24" fill="none"><rect width="32" height="24" rx="4" fill={card.color ? "rgba(var(--color-base-rgb), 0.6)" : "rgba(var(--color-invert-rgb), 0.8)"}/><path d="M4 12H28" stroke={card.color ? "var(--text-primary)" : "#000"} strokeWidth="2"/></svg>
                                  </div>
                                  <div>
                                    <div style={{ fontSize: '12px', opacity: 0.7, marginBottom: '4px' }}>Available Balance</div>
                                    <div style={{ fontFamily: 'var(--font-syne)', fontSize: '20px', fontWeight: 700 }}>{card.balance}</div>
                                  </div>
                                  <div style={{ fontFamily: 'var(--font-geist-mono), monospace', fontSize: '14px', letterSpacing: '2px', opacity: 0.9 }}>
                                    {card.number}
                                  </div>
                                </motion.div>
                              );
                            })}
                          </AnimatePresence>
                        </div>
                      </motion.div>

                      {/* Next Things / Activity Breakdown */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9, duration: 0.5 }}
                        style={{ flex: 1, background: 'rgba(var(--color-invert-rgb), 0.02)', border: '1px solid rgba(var(--color-invert-rgb), 0.05)', borderRadius: '20px', padding: '24px', display: 'flex', flexDirection: 'column' }}
                      >
                        <div style={{ color: 'var(--text-primary)', fontSize: '16px', fontWeight: 600, fontFamily: 'var(--font-syne)', marginBottom: '16px' }}>Recent Activity</div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', flex: 1, overflowY: 'auto', paddingRight: '8px' }}>
                          {step >= 5 && [
                            { name: 'AWS Cloud Services', cat: 'Software', amount: '-$840.00', time: '2m ago', color: '#f59e0b' },
                            { name: 'Stripe Payout', cat: 'Revenue', amount: '+$12,450.00', time: 'Just now', color: '#10b981' },
                            { name: 'WeWork Office', cat: 'Real Estate', amount: '-$3,200.00', time: '2h ago', color: '#8b5cf6' },
                          ].map((tx, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 1.2 + (i * 0.15), type: 'spring' }}
                              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: 'rgba(var(--color-invert-rgb), 0.02)', borderRadius: '12px', border: '1px solid rgba(var(--color-invert-rgb), 0.03)' }}
                            >
                              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{ width: 36, height: 36, borderRadius: '10px', background: `${tx.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: tx.color }}>
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                                </div>
                                <div>
                                  <div style={{ color: 'var(--text-primary)', fontSize: '14px', fontWeight: 500 }}>{tx.name}</div>
                                  <div style={{ color: 'rgba(var(--color-invert-rgb), 0.5)', fontSize: '12px' }}>{tx.cat} • {tx.time}</div>
                                </div>
                              </div>
                              <div style={{ fontFamily: 'var(--font-geist-mono), monospace', fontSize: '14px', fontWeight: 600, color: tx.amount.startsWith('+') ? '#10b981' : 'var(--text-primary)' }}>
                                {tx.amount}
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>

                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}
