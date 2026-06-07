'use client';

import React from 'react';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { scrollToSection } from '@/utils/scrollToSection';

const navItems = [
  { key: 'products', id: 'products' },
  { key: 'architecture', id: 'architecture' },
  { key: 'security', id: 'security' },
  { key: 'technology', id: 'technology' },
] as const;

export default function Footer() {
  const t = useTranslations('Footer');
  const tNav = useTranslations('Navigation');

  return (
    <footer
      style={{
        background: 'var(--bg-base)',
        borderTop: '1px solid var(--border-subtle)',
        padding: '64px 0 32px 0',
      }}
    >
      <div className="container">
        <div
          className="footer-content"
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: '64px',
            gap: '40px',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: '400px',
              textAlign: 'center',
            }}
          >
            <Link
              href="/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                marginBottom: '16px',
                textDecoration: 'none',
              }}
            >
              <span
                style={{
                  fontSize: '24px',
                  fontWeight: 700,
                  letterSpacing: '-0.03em',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <span style={{ color: 'var(--text-primary)' }}>D</span>
                <span style={{ color: 'var(--accent)' }}>B</span>
              </span>
            </Link>
            <p
              style={{
                color: 'var(--text-secondary)',
                fontSize: '14px',
                lineHeight: 1.6,
              }}
            >
              {t('tagline')}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={`/#${item.id}`}
                className="footer-nav-btn"
                onClick={(e) => scrollToSection(e, item.id)}
              >
                {tNav(item.key)}
              </Link>
            ))}
          </div>
        </div>

        <div
          style={{
            width: '100%',
            height: '1px',
            background: 'var(--border-subtle)',
            marginBottom: '32px',
          }}
        />

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <p style={{ color: 'var(--text-tertiary)', fontSize: '13px', textAlign: 'center' }}>
            {t('copyright', { year: new Date().getFullYear() })}
          </p>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .footer-nav-btn {
          color: var(--text-secondary);
          font-size: 14px;
          text-decoration: none;
          padding: 8px 24px;
          border-radius: 100px;
          background: var(--border-subtle);
          border: 1px solid var(--border-default);
          transition: all 0.2s ease;
        }
        .footer-nav-btn:hover {
          color: var(--text-primary) !important;
          background: var(--border-default);
          border-color: var(--border-strong);
          transform: translateY(-1px);
        }
        .footer-content a:not(.footer-nav-btn):hover {
          color: var(--text-primary) !important;
        }
      `,
        }}
      />
    </footer>
  );
}
