'use client';

import React from 'react';
import { motion, MotionValue } from 'framer-motion';
import { Link } from '@/i18n/routing';

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
        maxWidth: '700px',
        position: 'relative',
        zIndex: 20,
        x: textX,
        y: textY,
      }}
    >
      {/* Pill Badge */}
      <motion.div
        variants={itemVariants}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 16px',
          borderRadius: '999px',
          backgroundColor: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          marginBottom: '32px',
        }}
      >
        <span
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: '#10b981',
            boxShadow: '0 0 8px #10b981',
          }}
        />
        <span
          style={{
            fontFamily: 'var(--font-geist-mono), monospace',
            fontSize: '12px',
            color: 'var(--text-secondary)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}
        >
          Enterprise Digital Banking Platform
        </span>
      </motion.div>

      {/* Heading */}
      <motion.h1
        variants={itemVariants}
        style={{
          fontFamily: 'var(--font-syne), sans-serif',
          fontSize: 'clamp(48px, 8vw, 96px)',
          fontWeight: 800,
          color: 'var(--text-primary)',
          lineHeight: 1.05,
          letterSpacing: '-0.03em',
          marginBottom: '24px',
        }}
      >
        Transform Your <br />
        <span
          style={{
            background:
              'linear-gradient(135deg, var(--text-primary) 0%, var(--text-secondary) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Banking Experience.
        </span>
      </motion.h1>

      {/* Subtext */}
      <motion.p
        variants={itemVariants}
        style={{
          fontSize: 'clamp(16px, 2vw, 20px)',
          color: 'var(--text-secondary)',
          lineHeight: 1.6,
          maxWidth: '600px',
          marginBottom: '40px',
        }}
      >
        Enterprise-grade digital banking solutions with cutting-edge security, seamless integration,
        and unparalleled user experience across all platforms.
      </motion.p>

      {/* CTAs */}
      <motion.div
        variants={itemVariants}
        style={{ display: 'flex', gap: '16px', alignItems: 'center' }}
      >
        <Link
          href="#products"
          aria-label="Explore Platforms"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '16px 32px',
            backgroundColor: 'var(--text-primary)',
            color: 'var(--bg-base)',
            fontFamily: 'var(--font-syne), sans-serif',
            fontSize: '15px',
            fontWeight: 600,
            borderRadius: '999px',
            textDecoration: 'none',
            transition: 'transform 0.2s',
          }}
        >
          Explore Platforms
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
        <Link
          href="/contact"
          aria-label="Contact Sales"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '16px 32px',
            backgroundColor: 'var(--bg-elevated)',
            color: 'var(--text-primary)',
            border: '1px solid var(--border-default)',
            fontFamily: 'var(--font-syne), sans-serif',
            fontSize: '15px',
            fontWeight: 600,
            borderRadius: '999px',
            textDecoration: 'none',
            transition: 'background 0.2s',
          }}
        >
          Contact Sales
        </Link>
      </motion.div>
    </motion.div>
  );
}
