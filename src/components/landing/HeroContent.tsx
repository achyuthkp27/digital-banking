'use client';

import React from 'react';
import { motion, MotionValue } from 'framer-motion';
import styles from './HeroContent.module.css';
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
      className={styles.heroContainer}
      style={{
        x: textX,
        y: textY,
      }}
    >
      {/* Status Badge */}
      <motion.div variants={itemVariants} className={styles.statusBadge}>
        <span className={styles.statusBadgeDot} />
        <span className={styles.statusBadgeText}>
          Enterprise Platform
        </span>
      </motion.div>

      {/* Heading */}
      <motion.h1 variants={itemVariants} className={styles.heading}>
        The future of
        <br />
        <span className={styles.headingHighlight}>
          digital banking
        </span>
        <br />
        starts here.
      </motion.h1>

      {/* Subtext */}
      <motion.p variants={itemVariants} className={styles.subtext}>
        Enterprise-grade infrastructure for next-generation banking. Secure, scalable, and built for
        the institutions that shape the financial world.
      </motion.p>

      {/* CTAs */}
      <motion.div variants={itemVariants} className={styles.ctaContainer}>
        <a href="#products" className={styles.ctaPrimary}>
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

        <Link href="/contact" className={styles.ctaSecondary}>
          Request Demo
        </Link>
      </motion.div>

      {/* Trust indicators */}
      <motion.div variants={itemVariants} className={styles.trustContainer}>
        {[
          { value: '99.99%', label: 'Uptime SLA' },
          { value: '50M+', label: 'Transactions' },
          { value: 'SOC 2', label: 'Certified' },
        ].map((stat, i) => (
          <div key={i} className={styles.trustItem}>
            <span className={styles.trustValue}>{stat.value}</span>
            <span className={styles.trustLabel}>{stat.label}</span>
            {i < 2 && <span className={styles.trustDivider} />}
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}
