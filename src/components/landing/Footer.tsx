'use client';

import React from 'react';
import { Link } from '@/i18n/routing';

export default function Footer() {
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
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '64px',
          }}
        >
          {/* Logo and Copyright */}
          <div style={{ flex: '1', maxWidth: '300px' }}>
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
                marginBottom: '24px',
              }}
            >
              Enterprise-grade digital banking solutions with cutting-edge security and seamless
              integration.
            </p>
          </div>

          {/* Links */}
          <div style={{ display: 'flex', gap: '80px' }}>
            <div>
              <h5
                style={{
                  color: 'var(--text-primary)',
                  fontSize: '14px',
                  fontWeight: 600,
                  marginBottom: '20px',
                }}
              >
                Platform
              </h5>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <Link
                  href="#products"
                  style={{
                    color: 'var(--text-secondary)',
                    fontSize: '14px',
                    transition: 'color 0.2s',
                  }}
                >
                  Products
                </Link>
                <Link
                  href="#architecture"
                  style={{
                    color: 'var(--text-secondary)',
                    fontSize: '14px',
                    transition: 'color 0.2s',
                  }}
                >
                  Architecture
                </Link>
                <Link
                  href="#security"
                  style={{
                    color: 'var(--text-secondary)',
                    fontSize: '14px',
                    transition: 'color 0.2s',
                  }}
                >
                  Security
                </Link>
                <Link
                  href="#technology"
                  style={{
                    color: 'var(--text-secondary)',
                    fontSize: '14px',
                    transition: 'color 0.2s',
                  }}
                >
                  Technology
                </Link>
              </div>
            </div>
            <div>
              <h5
                style={{
                  color: 'var(--text-primary)',
                  fontSize: '14px',
                  fontWeight: 600,
                  marginBottom: '20px',
                }}
              >
                Company
              </h5>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <Link
                  href="#"
                  style={{
                    color: 'var(--text-secondary)',
                    fontSize: '14px',
                    transition: 'color 0.2s',
                  }}
                >
                  About Us
                </Link>
                <Link
                  href="#"
                  style={{
                    color: 'var(--text-secondary)',
                    fontSize: '14px',
                    transition: 'color 0.2s',
                  }}
                >
                  Careers
                </Link>
                <Link
                  href="#"
                  style={{
                    color: 'var(--text-secondary)',
                    fontSize: '14px',
                    transition: 'color 0.2s',
                  }}
                >
                  Contact
                </Link>
              </div>
            </div>
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

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ color: 'var(--text-tertiary)', fontSize: '13px' }}>
            © {new Date().getFullYear()} Digital Banking Platform. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '24px' }}>
            <Link href="#" style={{ color: 'var(--text-tertiary)', fontSize: '13px' }}>
              Privacy Policy
            </Link>
            <Link href="#" style={{ color: 'var(--text-tertiary)', fontSize: '13px' }}>
              Terms of Service
            </Link>
          </div>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .footer-content a:hover {
          color: var(--text-primary) !important;
        }
        @media (max-width: 768px) {
          .footer-content {
            flex-direction: column;
            gap: 48px;
          }
        }
      `,
        }}
      />
    </footer>
  );
}
