'use client';

import React from 'react';
import Link from 'next/link';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ProductIllustration from '@/components/landing/ProductIllustration';

const products = [
  {
    label: 'Remote Verification',
    title: 'Video KYC & Video Banking',
    slug: 'video-kyc',
    description: 'Advanced video-based KYC verification and remote banking services with AI-powered identity verification, live video calls with bank officials, document scanning, and secure digital onboarding for seamless customer experience.',
    features: [
      'Automated identity and document verification',
      'Connect with bank officials via secure video call',
      'Complete account opening remotely',
      'Upload and verify documents in real-time'
    ],
  },
  {
    label: 'Self-Service',
    title: 'Kiosk Banking',
    slug: 'kiosk-banking',
    description: 'Interactive self-service kiosk solution for branches with touchscreen interface, card reader integration, cash acceptance, passbook printing, and assisted customer service functionality.',
    features: [
      'User-friendly touchscreen navigation',
      'Accept cash deposits and card transactions',
      'Print account statements and passbooks',
      'Connect with bank staff via video call'
    ],
  },
  {
    label: 'Field Services',
    title: 'Agent Banking',
    slug: 'agent-banking',
    description: 'Mobile application for banking agents and field staff enabling remote account opening, cash transactions, loan collections, customer service, and business correspondent operations with offline capabilities.',
    features: [
      'Open accounts and activate services on-site',
      'Accept deposits and process withdrawals',
      'Track and collect loan EMI payments',
      'Continue operations without internet connectivity'
    ],
  },
  {
    label: 'Payment Solutions',
    title: 'Merchant Banking',
    slug: 'merchant-banking',
    description: 'Complete merchant payment solution with POS integration, QR code payments, settlement management, transaction analytics, and support for multiple payment methods including UPI, cards, and wallets.',
    features: [
      'Seamless integration with point-of-sale systems',
      'Dynamic and static QR code payment acceptance',
      'Real-time settlement tracking and reconciliation',
      'Accept UPI, cards, wallets, and net banking'
    ],
  },
  {
    label: 'Enterprise Solution',
    title: 'Corporate Banking',
    slug: 'corporate-banking',
    description: 'Enterprise-grade corporate banking platform with multi-level approval workflows, bulk payment processing, treasury management, trade finance, and comprehensive reporting for large organizations.',
    features: [
      'Multi-level authorization for transactions',
      'Process salary and vendor payments in bulk',
      'Cash flow forecasting and liquidity management',
      'Letter of credit and guarantee management'
    ],
  },
  {
    label: 'iOS & Android',
    title: 'Mobile Banking',
    slug: 'mobile-banking',
    description: 'Full-featured mobile banking application with intuitive UI, biometric authentication, instant transfers, bill payments, and real-time notifications. Optimized for performance and security.',
    features: [
      'Face ID, Touch ID, and fingerprint authentication',
      'Send money instantly with UPI, IMPS, and NEFT',
      'Real-time alerts for all transactions and activities',
      'Pay utilities, credit cards, and subscriptions'
    ],
  },
  {
    label: 'Web Platform',
    title: 'Retail Internet Banking',
    slug: 'retail-banking',
    description: 'Modern, responsive web banking portal with customizable dashboard, multi-lingual support for 15+ languages, advanced transaction search, and comprehensive account management.',
    features: [
      'Responsive web-based banking from any device',
      'Customizable dashboard and widgets',
      'Support for 15+ languages with RTL',
      'Advanced transaction search and filtering'
    ],
  },
  {
    label: 'Admin Console',
    title: 'Retail Banking Admin',
    slug: 'retail-admin',
    description: 'Comprehensive admin dashboard for retail banking operations with real-time KPI monitoring, user management, approval workflows, and fraud detection capabilities.',
    features: [
      'Real-time transaction monitoring and analysis',
      'Centralized user, role, and permission management',
      'Maker-checker approval workflows',
      'Fraud detection and security alerts'
    ],
  },
  {
    label: 'Security',
    title: 'Two-Factor Authentication',
    slug: 'two-factor-auth',
    description: 'Advanced multi-factor authentication protecting against account takeovers with biometric login, liveness detection, PIN authentication, and real-time push notifications.',
    features: [
      'FaceID and fingerprint biometric login',
      'Advanced liveness detection anti-spoofing',
      'Approve or reject transactions via push',
      'Secure 4-6 digit PIN with auto-lock'
    ],
  },
];

const IllustrationPanel = ({ slug, reverse }: { slug: string; reverse: boolean }) => (
  <div
    style={{
      flex: 1,
      height: '100%',
      minHeight: '400px',
      background: 'rgba(255,255,255,0.015)',
      borderRadius: '24px',
      border: '1px solid rgba(255,255,255,0.06)',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    {/* Inner glow */}
    <div
      style={{
        position: 'absolute',
        bottom: '-100px',
        [reverse ? 'left' : 'right']: '-100px',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)',
        pointerEvents: 'none',
        opacity: 0.4,
      }}
    />
    {/* Corner accents */}
    <div style={{ position: 'absolute', top: '12px', left: '12px', width: '20px', height: '20px', borderTop: '2px solid rgba(16,185,129,0.25)', borderLeft: '2px solid rgba(16,185,129,0.25)', borderRadius: '4px 0 0 0', pointerEvents: 'none' }} />
    <div style={{ position: 'absolute', top: '12px', right: '12px', width: '20px', height: '20px', borderTop: '2px solid rgba(16,185,129,0.25)', borderRight: '2px solid rgba(16,185,129,0.25)', borderRadius: '0 4px 0 0', pointerEvents: 'none' }} />
    <div style={{ position: 'absolute', bottom: '12px', left: '12px', width: '20px', height: '20px', borderBottom: '2px solid rgba(16,185,129,0.25)', borderLeft: '2px solid rgba(16,185,129,0.25)', borderRadius: '0 0 0 4px', pointerEvents: 'none' }} />
    <div style={{ position: 'absolute', bottom: '12px', right: '12px', width: '20px', height: '20px', borderBottom: '2px solid rgba(16,185,129,0.25)', borderRight: '2px solid rgba(16,185,129,0.25)', borderRadius: '0 0 4px 0', pointerEvents: 'none' }} />

    <ProductIllustration slug={slug} />
  </div>
);

export default function ProductShowcase() {
  return (
    <section id="products" className="section container">
      <div style={{ textAlign: 'center', marginBottom: '80px' }}>
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
          PRODUCTS
        </span>
        <h2
          style={{
            fontSize: '48px',
            fontWeight: 700,
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-syne), sans-serif',
          }}
        >
          Everything a bank needs
        </h2>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {products.map((product, index) => {
          const isReversed = index % 2 !== 0;

          return (
            <div key={index}>
              <div
                className="product-row"
                style={{
                  display: 'flex',
                  flexDirection: isReversed ? 'row-reverse' : 'row',
                  alignItems: 'center',
                  gap: '64px',
                  padding: '80px 0',
                }}
              >
                {/* Content Column */}
                <div style={{ flex: 1 }}>
                  <span
                    style={{
                      display: 'inline-block',
                      fontSize: '13px',
                      color: 'var(--accent)',
                      fontWeight: 600,
                      marginBottom: '16px',
                    }}
                  >
                    {product.label}
                  </span>
                  <h3
                    style={{
                      fontSize: '32px',
                      fontWeight: 700,
                      color: 'var(--text-primary)',
                      marginBottom: '24px',
                      fontFamily: 'var(--font-syne), sans-serif',
                    }}
                  >
                    {product.title}
                  </h3>
                  <p
                    style={{
                      fontSize: '16px',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.7,
                      marginBottom: '32px',
                    }}
                  >
                    {product.description}
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px' }}>
                    {product.features.map((feature, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                        <CheckCircleIcon sx={{ color: 'var(--accent)', fontSize: '20px', mt: '2px' }} />
                        <span style={{ color: 'var(--text-primary)', fontSize: '15px' }}>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                    <Link
                      href={`/products/${product.slug}`}
                      style={{
                        color: 'var(--accent)',
                        fontSize: '15px',
                        fontWeight: 600,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '8px 0',
                      }}
                    >
                      Learn More <span>&rarr;</span>
                    </Link>
                    
                    <Link
                      href="https://dev.fisdbs.com/OLBRETAIL/"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: '8px',
                        padding: '10px 24px', borderRadius: '9999px', background: '#ffffff',
                        color: '#000000', fontSize: '14px', fontWeight: 600, textDecoration: 'none',
                        transition: 'transform 0.25s ease', cursor: 'pointer',
                      }}
                    >
                      Visit
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 8h10M9 4l4 4-4 4" />
                      </svg>
                    </Link>
                  </div>
                </div>

                {/* Illustration Column */}
                <IllustrationPanel slug={product.slug} reverse={isReversed} />
              </div>

              {/* Divider between rows except last */}
              {index !== products.length - 1 && (
                <div style={{ width: '100%', height: '1px', background: 'var(--border-subtle)' }} />
              )}
            </div>
          );
        })}
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 992px) {
          .product-row {
            flex-direction: column !important;
            gap: 48px !important;
          }
          .product-row > div {
            width: 100%;
          }
        }
      `}} />
    </section>
  );
}
