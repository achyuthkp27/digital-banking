'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { CheckCircle, ArrowUpRight } from 'lucide-react';
import ScrollReveal from '@/components/common/ScrollReveal';
import { scrollToSection } from '@/utils/scrollToSection';
import { EXTERNAL_APP_URL } from '@/config/links';

export default function CtaSection() {
  const t = useTranslations('CTA');
  // Guard against a missing/stale namespace (e.g. dev HMR lag) so the section
  // degrades gracefully instead of crashing the whole page on `.map`.
  const rawChips = t.has('chips') ? t.raw('chips') : [];
  const chips: string[] = Array.isArray(rawChips) ? rawChips : [];

  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        background: 'var(--bg-base)',
        borderTop: '1px solid var(--border-subtle)',
        padding: '140px 24px',
        overflow: 'hidden',
      }}
    >
      <div aria-hidden="true" className="cta-orb cta-orb-a" />
      <div aria-hidden="true" className="cta-orb cta-orb-b" />
      <div aria-hidden="true" className="grid-pattern" />

      <ScrollReveal
        style={{ position: 'relative', zIndex: 1, maxWidth: '900px', margin: '0 auto' }}
      >
        <div className="cta-card">
          <div className="cta-card-inner">
            <span className="cta-badge">
              <span className="cta-badge-dot" />
              {t('badge')}
            </span>

            <h2 className="cta-title">{t('title')}</h2>

            <p className="cta-subtitle">{t('subtitle')}</p>

            <div className="cta-actions">
              <a
                href={EXTERNAL_APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="pill-button pill-button-primary"
              >
                {t('primaryCta')}
                <ArrowUpRight size={18} style={{ marginLeft: '8px' }} />
              </a>
              <a
                href="#products"
                onClick={(e) => scrollToSection(e, 'products')}
                className="pill-button pill-button-secondary"
              >
                {t('secondaryCta')}
              </a>
            </div>

            <div className="cta-chips">
              {chips.map((chip, i) => (
                <span key={i} className="cta-chip">
                  <CheckCircle size={16} className="text-accent" />
                  {chip}
                </span>
              ))}
            </div>
          </div>
        </div>
      </ScrollReveal>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .cta-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(90px);
          pointer-events: none;
          z-index: 0;
        }
        .cta-orb-a {
          top: -12%;
          left: 6%;
          width: 440px;
          height: 440px;
          background: radial-gradient(circle, var(--accent-glow) 0%, transparent 70%);
          animation: cta-float 15s ease-in-out infinite;
        }
        .cta-orb-b {
          bottom: -18%;
          right: 4%;
          width: 520px;
          height: 520px;
          background: radial-gradient(circle, rgba(59, 130, 246, 0.18) 0%, transparent 70%);
          animation: cta-float 19s ease-in-out infinite reverse;
        }
        .cta-card {
          position: relative;
          border-radius: 28px;
          padding: 1.5px;
          overflow: hidden;
          isolation: isolate;
        }
        .cta-card::before {
          content: '';
          position: absolute;
          inset: -100%;
          z-index: -1;
          background: conic-gradient(
            from 0deg,
            transparent 0deg,
            rgba(var(--accent-rgb), 0.55) 60deg,
            transparent 150deg,
            transparent 230deg,
            rgba(var(--accent-rgb), 0.35) 300deg,
            transparent 360deg
          );
          animation: cta-spin 9s linear infinite;
        }
        .cta-card-inner {
          position: relative;
          border-radius: 26.5px;
          background: linear-gradient(
            180deg,
            rgba(var(--color-invert-rgb), 0.045) 0%,
            rgba(var(--color-invert-rgb), 0.015) 100%
          );
          backdrop-filter: blur(28px) saturate(130%);
          -webkit-backdrop-filter: blur(28px) saturate(130%);
          border: 1px solid var(--glass-border);
          padding: clamp(40px, 6vw, 76px);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        .cta-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          border-radius: 9999px;
          background: var(--accent-dim);
          border: 1px solid rgba(var(--accent-rgb), 0.25);
          color: var(--accent);
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 28px;
        }
        .cta-badge-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--accent);
          box-shadow: 0 0 12px var(--accent);
        }
        .cta-title {
          font-family: var(--font-syne), sans-serif;
          font-weight: 800;
          font-size: clamp(34px, 5vw, 58px);
          line-height: 1.05;
          letter-spacing: -0.02em;
          color: var(--text-primary);
          margin: 0 0 20px;
          max-width: 18ch;
        }
        .cta-subtitle {
          font-size: clamp(16px, 1.4vw, 19px);
          line-height: 1.7;
          color: var(--text-secondary);
          max-width: 620px;
          margin: 0 0 40px;
        }
        .cta-actions {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
          justify-content: center;
          margin-bottom: 44px;
        }
        .cta-chips {
          display: flex;
          gap: 28px;
          flex-wrap: wrap;
          justify-content: center;
        }
        .cta-chip {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          font-weight: 500;
          color: var(--text-secondary);
        }
        @keyframes cta-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-28px); }
        }
        @keyframes cta-spin {
          to { transform: rotate(360deg); }
        }
      `,
        }}
      />
    </section>
  );
}
