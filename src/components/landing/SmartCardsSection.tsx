'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const SmartCards3D = dynamic(() => import('./SmartCards3D'), {
  ssr: false,
  loading: () => (
    <div
      style={{
        width: '100%',
        height: '100%',
        minHeight: '500px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div className="loading-spinner"></div>
    </div>
  ),
});
import { CheckCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';

const SmartCardsSection = React.memo(function SmartCardsSection() {
  const t = useTranslations('SmartCards');

  const cardFeatures = [
    { title: t('virtualPhysical'), description: t('virtualPhysicalDesc') },
    { title: t('expenseControls'), description: t('expenseControlsDesc') },
    { title: t('appleGooglePay'), description: t('appleGooglePayDesc') },
  ];
  return (
    <section
      style={{
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        padding: '120px 0',
        background:
          'linear-gradient(135deg, rgba(var(--color-invert-rgb), 0.03) 0%, rgba(var(--color-invert-rgb), 0.01) 100%)',
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)',
      }}
    >
      {/* Global noise applied via body tag in globals.css */}

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '64px',
            alignItems: 'center',
          }}
        >
          {/* Text Content Left */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span
              style={{
                display: 'block',
                fontSize: '11px',
                color: 'var(--text-tertiary)',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                marginBottom: '16px',
                fontWeight: 600,
              }}
            >
              {t('badge')}
            </span>
            <h2
              style={{
                fontSize: '48px',
                fontWeight: 700,
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-syne), sans-serif',
                marginBottom: '24px',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
              }}
            >
              {t('titleLine1')} <br />
              <span style={{ color: 'var(--accent)' }}>{t('titleHighlight')}</span>
            </h2>
            <p
              style={{
                fontSize: '18px',
                color: 'var(--text-secondary)',
                lineHeight: 1.6,
                marginBottom: '40px',
              }}
            >
              {t('description')}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {cardFeatures.map((feature, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <CheckCircle
                    className="text-accent flex-shrink-0" size={24}
                  />
                  <div>
                    <h3
                      style={{
                        color: 'var(--text-primary)',
                        fontSize: '16px',
                        fontWeight: 600,
                        marginBottom: '8px',
                      }}
                    >
                      {feature.title}
                    </h3>
                    <p
                      style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.6 }}
                    >
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Empty spacer for grid */}
          <div className="spacer-right" />
        </div>
      </div>

      {/* 3D Content Right (Absolute to bleed off edge) */}
      <div
        className="canvas-wrapper"
        aria-hidden="true"
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
          bottom: 0,
          width: '50vw',
          zIndex: 5,
        }}
      >
        <SmartCards3D />
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @media (max-width: 992px) {
          .spacer-right {
            display: none;
          }
          .canvas-wrapper {
            position: relative !important;
            width: 100% !important;
            height: 500px !important;
            margin-top: 48px;
          }
          .container > div {
            grid-template-columns: 1fr !important;
          }
        }
      `,
        }}
      />
    </section>
  );
});

export default SmartCardsSection;
