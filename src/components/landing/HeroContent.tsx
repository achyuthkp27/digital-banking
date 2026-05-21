'use client';

import React from 'react';
import { motion, MotionValue } from 'framer-motion';

interface HeroContentProps {
  containerVariants: any;
  itemVariants: any;
  textX: MotionValue<number>;
  textY: MotionValue<number>;
}

export default function HeroContent({
  containerVariants,
  itemVariants,
  textX,
  textY,
}: HeroContentProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        textAlign: 'left',
        maxWidth: '720px',
        position: 'relative',
        zIndex: 20,
        x: textX,
        y: textY,
      }}
    >
      {/* Status Badge */}
      <motion.div
        variants={itemVariants}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '10px',
          padding: '8px 20px',
          borderRadius: '999px',
          background:
            'linear-gradient(135deg, rgba(16,185,129,0.08) 0%, rgba(16,185,129,0.02) 100%)',
          border: '1px solid rgba(16,185,129,0.15)',
          marginBottom: '40px',
          backdropFilter: 'blur(12px)',
        }}
      >
        <span
          style={{
            width: '7px',
            height: '7px',
            borderRadius: '50%',
            backgroundColor: '#10b981',
            boxShadow: '0 0 12px rgba(16,185,129,0.6)',
            animation: 'pulse 2s ease-in-out infinite',
          }}
        />
        <span
          style={{
            fontFamily: 'var(--font-geist-mono), monospace',
            fontSize: '11px',
            color: 'rgba(16,185,129,0.9)',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            fontWeight: 500,
          }}
        >
          Enterprise Platform
        </span>
      </motion.div>

      {/* Heading — clean, refined, no italic */}
      <motion.h1
        variants={itemVariants}
        style={{
          fontFamily: 'var(--font-syne), sans-serif',
          fontSize: 'clamp(44px, 6vw, 80px)',
          fontWeight: 700,
          color: '#ffffff',
          lineHeight: 1.08,
          letterSpacing: '-0.035em',
          marginBottom: '28px',
        }}
      >
        The future of
        <br />
        <span
          style={{
            background: 'linear-gradient(135deg, #10b981 0%, #34d399 40%, #6ee7b7 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          digital banking
        </span>
        <br />
        starts here.
      </motion.h1>

      {/* Subtext — smaller, more elegant */}
      <motion.p
        variants={itemVariants}
        style={{
          fontSize: 'clamp(15px, 1.5vw, 18px)',
          color: 'rgba(255,255,255,0.45)',
          lineHeight: 1.7,
          maxWidth: '480px',
          marginBottom: '48px',
          fontWeight: 400,
        }}
      >
        Enterprise-grade infrastructure for next-generation banking. Secure, scalable, and built for
        the institutions that shape the financial world.
      </motion.p>

      {/* CTAs — refined with subtle hover states */}
      <motion.div
        variants={itemVariants}
        style={{ display: 'flex', gap: '14px', alignItems: 'center' }}
      >
        <a
          href="#products"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            padding: '14px 28px',
            background: '#10b981',
            color: '#030712',
            fontFamily: 'var(--font-geist-sans), sans-serif',
            fontSize: '14px',
            fontWeight: 600,
            borderRadius: '12px',
            textDecoration: 'none',
            transition: 'all 0.3s cubic-bezier(0.23, 1, 0.32, 1)',
            boxShadow: '0 0 0 1px rgba(16,185,129,0.3), 0 4px 16px rgba(16,185,129,0.2)',
            letterSpacing: '-0.01em',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow =
              '0 0 0 1px rgba(16,185,129,0.5), 0 8px 32px rgba(16,185,129,0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow =
              '0 0 0 1px rgba(16,185,129,0.3), 0 4px 16px rgba(16,185,129,0.2)';
          }}
        >
          Explore Platforms
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </a>

        <a
          href="/contact"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '14px 28px',
            background: 'rgba(255,255,255,0.04)',
            color: 'rgba(255,255,255,0.7)',
            border: '1px solid rgba(255,255,255,0.08)',
            fontFamily: 'var(--font-geist-sans), sans-serif',
            fontSize: '14px',
            fontWeight: 500,
            borderRadius: '12px',
            textDecoration: 'none',
            transition: 'all 0.3s cubic-bezier(0.23, 1, 0.32, 1)',
            letterSpacing: '-0.01em',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
            e.currentTarget.style.color = 'rgba(255,255,255,0.9)';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
            e.currentTarget.style.color = 'rgba(255,255,255,0.7)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          Request Demo
        </a>
      </motion.div>

      {/* Trust indicators */}
      <motion.div
        variants={itemVariants}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '24px',
          marginTop: '56px',
          paddingTop: '32px',
          borderTop: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        {[
          { value: '99.99%', label: 'Uptime SLA' },
          { value: '50M+', label: 'Transactions' },
          { value: 'SOC 2', label: 'Certified' },
        ].map((stat, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
            <span
              style={{
                fontSize: '14px',
                fontWeight: 700,
                color: 'rgba(255,255,255,0.85)',
                fontFamily: 'var(--font-geist-mono), monospace',
                letterSpacing: '-0.02em',
              }}
            >
              {stat.value}
            </span>
            <span
              style={{
                fontSize: '11px',
                color: 'rgba(255,255,255,0.3)',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
              }}
            >
              {stat.label}
            </span>
            {i < 2 && (
              <span
                style={{
                  width: '1px',
                  height: '14px',
                  background: 'rgba(255,255,255,0.08)',
                  marginLeft: '18px',
                  display: 'inline-block',
                }}
              />
            )}
          </div>
        ))}
      </motion.div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.85); }
        }
      `,
        }}
      />
    </motion.div>
  );
}
