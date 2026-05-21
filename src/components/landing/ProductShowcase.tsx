'use client';

import React, { useRef, useState } from 'react';
import { Link } from '@/i18n/routing';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import ViewStreamIcon from '@mui/icons-material/ViewStream';
import ProductIllustration from '@/components/landing/ProductIllustration';

const products = [
  {
    label: 'Remote Verification',
    title: 'Video KYC & Video Banking',
    slug: 'video-kyc',
    description:
      'Advanced video-based KYC verification and remote banking services with AI-powered identity verification, live video calls with bank officials, document scanning, and secure digital onboarding for seamless customer experience.',
    features: [
      'Automated identity and document verification',
      'Connect with bank officials via secure video call',
      'Complete account opening remotely',
      'Upload and verify documents in real-time',
    ],
  },
  {
    label: 'Self-Service',
    title: 'Kiosk Banking',
    slug: 'kiosk-banking',
    description:
      'Interactive self-service kiosk solution for branches with touchscreen interface, card reader integration, cash acceptance, passbook printing, and assisted customer service functionality.',
    features: [
      'User-friendly touchscreen navigation',
      'Accept cash deposits and card transactions',
      'Print account statements and passbooks',
      'Connect with bank staff via video call',
    ],
  },
  {
    label: 'Field Services',
    title: 'Agent Banking',
    slug: 'agent-banking',
    description:
      'Mobile application for banking agents and field staff enabling remote account opening, cash transactions, loan collections, customer service, and business correspondent operations with offline capabilities.',
    features: [
      'Open accounts and activate services on-site',
      'Accept deposits and process withdrawals',
      'Track and collect loan EMI payments',
      'Continue operations without internet connectivity',
    ],
  },
  {
    label: 'Payment Solutions',
    title: 'Merchant Banking',
    slug: 'merchant-banking',
    description:
      'Complete merchant payment solution with POS integration, QR code payments, settlement management, transaction analytics, and support for multiple payment methods including UPI, cards, and wallets.',
    features: [
      'Seamless integration with point-of-sale systems',
      'Dynamic and static QR code payment acceptance',
      'Real-time settlement tracking and reconciliation',
      'Accept UPI, cards, wallets, and net banking',
    ],
  },
  {
    label: 'Enterprise Solution',
    title: 'Corporate Banking',
    slug: 'corporate-banking',
    description:
      'Enterprise-grade corporate banking platform with multi-level approval workflows, bulk payment processing, treasury management, trade finance, and comprehensive reporting for large organizations.',
    features: [
      'Multi-level authorization for transactions',
      'Process salary and vendor payments in bulk',
      'Cash flow forecasting and liquidity management',
      'Letter of credit and guarantee management',
    ],
  },
  {
    label: 'iOS & Android',
    title: 'Mobile Banking',
    slug: 'mobile-banking',
    description:
      'Full-featured mobile banking application with intuitive UI, biometric authentication, instant transfers, bill payments, and real-time notifications. Optimized for performance and security.',
    features: [
      'Face ID, Touch ID, and fingerprint authentication',
      'Send money instantly with UPI, IMPS, and NEFT',
      'Real-time alerts for all transactions and activities',
      'Pay utilities, credit cards, and subscriptions',
    ],
  },
  {
    label: 'Web Platform',
    title: 'Retail Internet Banking',
    slug: 'retail-banking',
    description:
      'Modern, responsive web banking portal with customizable dashboard, multi-lingual support for 15+ languages, advanced transaction search, and comprehensive account management.',
    features: [
      'Responsive web-based banking from any device',
      'Customizable dashboard and widgets',
      'Support for 15+ languages with RTL',
      'Advanced transaction search and filtering',
    ],
  },
  {
    label: 'Admin Console',
    title: 'Retail Banking Admin',
    slug: 'retail-admin',
    description:
      'Comprehensive admin dashboard for retail banking operations with real-time KPI monitoring, user management, approval workflows, and fraud detection capabilities.',
    features: [
      'Real-time transaction monitoring and analysis',
      'Centralized user, role, and permission management',
      'Maker-checker approval workflows',
      'Fraud detection and security alerts',
    ],
  },
  {
    label: 'Security',
    title: 'Two-Factor Authentication',
    slug: 'two-factor-auth',
    description:
      'Advanced multi-factor authentication protecting against account takeovers with biometric login, liveness detection, PIN authentication, and real-time push notifications.',
    features: [
      'FaceID and fingerprint biometric login',
      'Advanced liveness detection anti-spoofing',
      'Approve or reject transactions via push',
      'Secure 4-6 digit PIN with auto-lock',
    ],
  },
];

const IllustrationPanel = React.memo(({ slug }: { slug: string }) => (
  <div
    style={{
      flex: 1,
      height: '60vh',
      minHeight: '400px',
      maxHeight: '600px',
      background: 'rgba(var(--color-invert-rgb), 0.015)',
      borderRadius: '24px',
      border: '1px solid rgba(var(--color-invert-rgb), 0.06)',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 24px 64px -16px rgba(var(--color-base-rgb), 0.4)',
    }}
  >
    <div style={{ position: 'absolute', inset: 0, zIndex: 10 }}>
      <ProductIllustration slug={slug} />
    </div>
    
    {/* Inner glow */}
    <div
      style={{
        position: 'absolute',
        bottom: '-100px',
        right: '-100px',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)',
        pointerEvents: 'none',
        opacity: 0.4,
      }}
    />
    {/* Corner accents */}
    <div
      style={{
        position: 'absolute',
        top: '12px',
        left: '12px',
        width: '20px',
        height: '20px',
        borderTop: '2px solid rgba(var(--accent-rgb),0.25)',
        borderLeft: '2px solid rgba(var(--accent-rgb),0.25)',
        borderRadius: '4px 0 0 0',
        pointerEvents: 'none',
      }}
    />
    <div
      style={{
        position: 'absolute',
        top: '12px',
        right: '12px',
        width: '20px',
        height: '20px',
        borderTop: '2px solid rgba(var(--accent-rgb),0.25)',
        borderRight: '2px solid rgba(var(--accent-rgb),0.25)',
        borderRadius: '0 4px 0 0',
        pointerEvents: 'none',
      }}
    />
    <div
      style={{
        position: 'absolute',
        bottom: '12px',
        left: '12px',
        width: '20px',
        height: '20px',
        borderBottom: '2px solid rgba(var(--accent-rgb),0.25)',
        borderLeft: '2px solid rgba(var(--accent-rgb),0.25)',
        borderRadius: '0 0 0 4px',
        pointerEvents: 'none',
      }}
    />
    <div
      style={{
        position: 'absolute',
        bottom: '12px',
        right: '12px',
        width: '20px',
        height: '20px',
        borderBottom: '2px solid rgba(var(--accent-rgb),0.25)',
        borderRight: '2px solid rgba(var(--accent-rgb),0.25)',
        borderRadius: '0 0 4px 0',
        pointerEvents: 'none',
      }}
    />
  </div>
));

const ProductContent = React.memo(({ product, index }: { product: any; index: number }) => (
  <div
    style={{
      flex: 1,
      paddingRight: '2vw',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    }}
  >
    <div
      style={{
        display: 'inline-flex',
        padding: '6px 12px',
        background: 'rgba(var(--accent-rgb),0.1)',
        borderRadius: '8px',
        color: 'var(--accent)',
        fontSize: '12px',
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        marginBottom: '24px',
        alignSelf: 'flex-start',
      }}
    >
      {index + 1} / {products.length}
    </div>

    <span
      style={{
        display: 'block',
        fontSize: '14px',
        color: 'rgba(var(--color-invert-rgb), 0.5)',
        fontWeight: 600,
        marginBottom: '8px',
      }}
    >
      {product.label}
    </span>

    <h3
      style={{
        fontSize: 'clamp(32px, 4vw, 48px)',
        fontWeight: 800,
        color: 'var(--text-primary)',
        marginBottom: '24px',
        fontFamily: 'var(--font-syne), sans-serif',
        lineHeight: 1.1,
      }}
    >
      {product.title}
    </h3>

    <p
      style={{
        fontSize: '18px',
        color: 'var(--text-secondary)',
        lineHeight: 1.6,
        marginBottom: '40px',
        maxWidth: '500px',
      }}
    >
      {product.description}
    </p>

    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '48px' }}>
      {product.features.map((feature: string, i: number) => (
        <div
          key={`feature-${i}`}
          style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}
        >
          <CheckCircleIcon sx={{ color: 'var(--accent)', fontSize: '20px', mt: '2px' }} />
          <span style={{ color: 'var(--text-primary)', fontSize: '15px' }}>{feature}</span>
        </div>
      ))}
    </div>

    <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
      <Link
        href={`/products/${product.slug}`}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '14px 32px',
          borderRadius: '9999px',
          background: 'var(--accent)',
          color: '#000',
          fontSize: '15px',
          fontWeight: 700,
          textDecoration: 'none',
          transition: 'transform 0.25s ease',
          cursor: 'pointer',
        }}
      >
        Learn More
      </Link>

      <a
        href="https://dev.fisdbs.com/OLBRETAIL/"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          color: 'var(--text-primary)',
          fontSize: '15px',
          fontWeight: 600,
          textDecoration: 'none',
        }}
      >
        Live Demo <span>&rarr;</span>
      </a>
    </div>
  </div>
));

export default function ProductShowcase() {
  const targetRef = useRef<HTMLDivElement>(null);
  const [isHorizontal, setIsHorizontal] = useState(true);

  React.useEffect(() => {
    const checkMobile = () => {
      if (window.innerWidth < 992) {
        setIsHorizontal(false);
      } else {
        setIsHorizontal(true);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end'],
  });

  // Map vertical scroll progress (0 to 1) to horizontal translation
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ['0%', `-${100 * ((products.length - 1) / products.length)}%`]
  );

  // Fade out the main title in horizontal mode
  const titleOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.1], [0, -50]);

  // ProductContent is now imported/defined above and memoized

  return (
    <section
      ref={targetRef}
      id="products"
      style={{
        height: isHorizontal ? `${products.length * 100}vh` : 'auto',
        position: 'relative',
        background: 'var(--bg-base)',
        zIndex: 20,
      }}
    >
      {/* Dynamic Layout Toggle Button */}
      <div
        style={{
          position: isHorizontal ? 'sticky' : 'absolute',
          top: isHorizontal ? '32px' : '32px',
          right: '4vw',
          zIndex: 100,
          display: 'flex',
          justifyContent: 'flex-end',
          pointerEvents: 'none',
        }}
      >
        <button
          onClick={() => {
            setIsHorizontal(!isHorizontal);
            // Smoothly scroll back to the top of the section when toggling to avoid jumping issues
            if (targetRef.current) {
              const yOffset = targetRef.current.getBoundingClientRect().top + window.scrollY - 100;
              window.scrollTo({ top: yOffset, behavior: 'smooth' });
            }
          }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px 24px',
            background: 'rgba(var(--color-invert-rgb), 0.08)',
            border: '1px solid rgba(var(--color-invert-rgb), 0.1)',
            borderRadius: '999px',
            color: 'var(--text-primary)',
            cursor: 'pointer',
            fontFamily: 'var(--font-syne)',
            fontWeight: 600,
            backdropFilter: 'blur(20px)',
            transition: 'all 0.3s ease',
            pointerEvents: 'auto',
            boxShadow: '0 10px 30px rgba(var(--color-base-rgb), 0.3)',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(var(--color-invert-rgb), 0.12)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(var(--color-invert-rgb), 0.08)')}
        >
          {isHorizontal ? <ViewStreamIcon fontSize="small" /> : <ViewColumnIcon fontSize="small" />}
          <span>{isHorizontal ? 'Switch to Vertical' : 'Switch to Horizontal'}</span>
        </button>
      </div>

      <AnimatePresence mode="wait">
        {isHorizontal ? (
          <motion.div
            key="horizontal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{ height: '100%' }}
          >
            {/* Sticky container that locks to the viewport */}
            <div
              style={{
                position: 'sticky',
                top: 0,
                height: '100vh',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {/* Fixed Title that sits above the panels */}
              <motion.div
                style={{
                  position: 'absolute',
                  top: '10vh',
                  left: 0,
                  right: 0,
                  textAlign: 'center',
                  zIndex: 50,
                  opacity: titleOpacity,
                  y: titleY,
                  pointerEvents: 'none',
                }}
              >
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
                    fontSize: 'clamp(32px, 5vw, 48px)',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-syne), sans-serif',
                  }}
                >
                  Everything a bank needs
                </h2>
              </motion.div>

              {/* The horizontal sliding track */}
              <motion.div
                style={{
                  x,
                  display: 'flex',
                  height: '100%',
                  width: `${products.length * 100}vw`,
                }}
              >
                {products.map((product, index) => (
                  <div
                    key={index}
                    className="product-panel"
                    style={{
                      width: '100vw',
                      height: '100vh',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      padding: '0 5vw',
                      boxSizing: 'border-box',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: '6vw',
                        width: '100%',
                        maxWidth: '1400px',
                        marginTop: '8vh', // Offset for the fixed title
                      }}
                    >
                      <ProductContent product={product} index={index} />
                      <IllustrationPanel slug={product.slug} />
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="vertical"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="container"
            style={{
              padding: '120px 0',
              maxWidth: '1400px',
              margin: '0 auto',
              paddingLeft: '5vw',
              paddingRight: '5vw',
            }}
          >
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
                  fontSize: 'clamp(32px, 5vw, 48px)',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-syne), sans-serif',
                }}
              >
                Everything a bank needs
              </h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '160px' }}>
              {products.map((product, index) => {
                const isReversed = index % 2 !== 0;
                return (
                  <div
                    key={index}
                    className="product-vertical-row"
                    style={{
                      display: 'flex',
                      flexDirection: isReversed ? 'row-reverse' : 'row',
                      alignItems: 'center',
                      gap: '6vw',
                    }}
                  >
                    <ProductContent product={product} index={index} />
                    <IllustrationPanel slug={product.slug} />
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @media (max-width: 992px) {
          .product-panel > div, .product-vertical-row {
            flex-direction: column !important;
            gap: 40px !important;
            margin-top: 15vh !important;
          }
          .product-panel > div > div, .product-vertical-row > div {
            width: 100%;
            padding-right: 0 !important;
          }
        }
      `,
        }}
      />
    </section>
  );
}
