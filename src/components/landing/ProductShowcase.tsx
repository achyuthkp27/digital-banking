'use client';

import React, { useRef, useState } from 'react';
import { Link } from '@/i18n/routing';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { CheckCircle, Columns, Rows } from 'lucide-react';
import ProductIllustration from '@/components/landing/ProductIllustration';
import { useTranslations } from 'next-intl';

const productKeys = [
  { key: 'mobileBanking', slug: 'mobile-banking' },
  { key: 'retailBanking', slug: 'retail-banking' },
  { key: 'retailAdmin', slug: 'retail-admin' },
  { key: 'corporateBanking', slug: 'corporate-banking' },
  { key: 'corporateAdmin', slug: 'corporate-admin' },
  { key: 'videoKyc', slug: 'video-kyc' },
  { key: 'agentBanking', slug: 'agent-banking' },
  { key: 'kioskBanking', slug: 'kiosk-banking' },
  { key: 'twoFactorAuth', slug: 'two-factor-auth' },
] as const;

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

const ProductContent = React.memo(({ product, index, totalLength, t }: { product: any; index: number, totalLength: number, t: any }) => (
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
      {index + 1} / {totalLength}
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
          <CheckCircle className="text-accent mt-0.5" size={20} />
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
        {t('learnMore')}
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
        {t('liveDemo')} <span>&rarr;</span>
      </a>
    </div>
  </div>
));

export default function ProductShowcase() {
  const t = useTranslations('ProductShowcase');
  const targetRef = useRef<HTMLDivElement>(null);
  const [isHorizontal, setIsHorizontal] = useState(false);

  const products = productKeys.map((pk) => ({
    label: t(`products.${pk.key}.label`),
    title: t(`products.${pk.key}.title`),
    slug: pk.slug,
    description: t(`products.${pk.key}.description`),
    features: [
      t(`products.${pk.key}.features.0`),
      t(`products.${pk.key}.features.1`),
      t(`products.${pk.key}.features.2`),
      t(`products.${pk.key}.features.3`),
    ],
  }));

  React.useEffect(() => {
    const checkMobile = () => {
      if (window.innerWidth < 992) {
        setIsHorizontal(false);
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
      {/* Unified Sticky Header */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          width: '100%',
          paddingTop: '40px',
          paddingBottom: '24px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          background: 'linear-gradient(to bottom, var(--bg-base) 60%, transparent)',
          pointerEvents: 'none',
        }}
      >
        <div style={{ position: 'absolute', right: '4vw', top: '40px', pointerEvents: 'auto' }}>
          <button
            onClick={() => {
              setIsHorizontal(!isHorizontal);
              if (targetRef.current) {
                const yOffset = targetRef.current.getBoundingClientRect().top + window.scrollY;
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
              boxShadow: '0 10px 30px rgba(var(--color-base-rgb), 0.3)',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(var(--color-invert-rgb), 0.12)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(var(--color-invert-rgb), 0.08)')}
          >
            {isHorizontal ? <Rows size={18} /> : <Columns size={18} />}
            <span>{isHorizontal ? t('switchToVertical') : t('switchToHorizontal')}</span>
          </button>
        </div>

        <div style={{ textAlign: 'center', pointerEvents: 'auto' }}>
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
              fontSize: 'clamp(32px, 5vw, 48px)',
              fontWeight: 700,
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-syne), sans-serif',
              margin: 0,
            }}
          >
            {t('title')}
          </h2>
        </div>
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
                        marginTop: '120px', // Push cards down so they clear the unified header
                      }}
                    >
                      <ProductContent product={product} index={index} totalLength={products.length} t={t} />
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
            <div style={{ display: 'flex', flexDirection: 'column', gap: '160px', marginTop: '60px' }}>
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
                    <ProductContent product={product} index={index} totalLength={products.length} t={t} />
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
