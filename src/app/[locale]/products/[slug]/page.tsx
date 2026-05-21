import { notFound } from 'next/navigation';
import { productContent } from '@/data/productContent';
import { setRequestLocale } from 'next-intl/server';

export function generateStaticParams() {
  return Object.keys(productContent).map((slug) => ({
    slug,
  }));
}

import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import CustomCursor from '@/components/common/CustomCursor';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ProductHero from '@/components/landing/ProductHero';
import TechShowcaseClient from '@/components/landing/TechShowcaseClient';

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const product = productContent[slug];

  if (!product) {
    notFound();
  }

  return (
    <>
      <CustomCursor />
      <Navbar />
      <main style={{ background: 'var(--bg-base)', minHeight: '100vh', paddingBottom: '0' }}>
        {/* Hero with product-specific illustration */}
        <ProductHero title={product.title} subtitle={product.subtitle} slug={slug} />

        {/* Content Section */}
        <section className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '64px' }}>
            {/* Overview & Stats */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              <div className="bento-glass" style={{ padding: '40px', borderRadius: '24px' }}>
                <h3
                  style={{
                    fontSize: '24px',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    marginBottom: '16px',
                    fontFamily: 'var(--font-syne), sans-serif',
                  }}
                >
                  Platform Overview
                </h3>
                <p style={{ fontSize: '16px', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                  {product.description}
                </p>
              </div>

              {product.stats && (
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '24px',
                  }}
                >
                  {product.stats.map((stat, idx) => (
                    <div
                      key={idx}
                      className="bento-glass"
                      style={{ padding: '32px', borderRadius: '24px', textAlign: 'center' }}
                    >
                      <span
                        style={{
                          display: 'block',
                          fontSize: '48px',
                          fontWeight: 800,
                          color: 'var(--text-primary)',
                          fontFamily: 'var(--font-syne), sans-serif',
                          marginBottom: '8px',
                        }}
                      >
                        {stat.value}
                      </span>
                      <span
                        style={{
                          fontSize: '13px',
                          color: 'var(--text-tertiary)',
                          textTransform: 'uppercase',
                          letterSpacing: '0.1em',
                          fontWeight: 600,
                        }}
                      >
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Features & Technical Sections */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                gap: '24px',
              }}
            >
              {/* Core Features */}
              <div className="bento-glass" style={{ padding: '40px', borderRadius: '24px' }}>
                <h3
                  style={{
                    fontSize: '24px',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    marginBottom: '32px',
                    fontFamily: 'var(--font-syne), sans-serif',
                  }}
                >
                  Core Features
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  {product.features.map((feature, idx) => (
                    <div
                      key={idx}
                      style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}
                    >
                      <CheckCircleIcon
                        sx={{ color: 'var(--accent)', fontSize: '24px', flexShrink: 0 }}
                      />
                      <div>
                        <h4
                          style={{
                            color: 'var(--text-primary)',
                            fontSize: '16px',
                            fontWeight: 600,
                            marginBottom: '8px',
                          }}
                        >
                          {feature.title}
                        </h4>
                        {feature.description && (
                          <p
                            style={{
                              color: 'var(--text-secondary)',
                              fontSize: '14px',
                              lineHeight: 1.6,
                            }}
                          >
                            {feature.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dynamic Sections */}
              {product.sections.map((section, idx) => (
                <div
                  key={idx}
                  className="bento-glass"
                  style={{ padding: '40px', borderRadius: '24px' }}
                >
                  <h3
                    style={{
                      fontSize: '24px',
                      fontWeight: 700,
                      color: 'var(--text-primary)',
                      marginBottom: '32px',
                      fontFamily: 'var(--font-syne), sans-serif',
                    }}
                  >
                    {section.title}
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {section.content.map((item, i) => {
                      const parts = item.split(':');
                      if (parts.length > 1) {
                        return (
                          <div
                            key={i}
                            style={{
                              borderBottom: '1px solid var(--border-subtle)',
                              paddingBottom: '16px',
                            }}
                          >
                            <span
                              style={{
                                color: 'var(--text-primary)',
                                fontWeight: 600,
                                display: 'block',
                                marginBottom: '4px',
                              }}
                            >
                              {parts[0]}
                            </span>
                            <span style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
                              {parts.slice(1).join(':')}
                            </span>
                          </div>
                        );
                      }
                      return (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div
                            style={{
                              width: '6px',
                              height: '6px',
                              borderRadius: '50%',
                              background: 'var(--accent)',
                            }}
                          />
                          <span style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>
                            {item}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3D Tech Showcase Section */}
        <div style={{ marginTop: '80px' }}>
          <TechShowcaseClient />
        </div>
      </main>
      <Footer />

      {/* Global CSS for bento-glass */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .bento-glass {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%);
          backdrop-filter: blur(24px) saturate(120%);
          -webkit-backdrop-filter: blur(24px) saturate(120%);
          border: 1px solid rgba(255, 255, 255, 0.05);
          box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.1), 0 8px 32px rgba(0, 0, 0, 0.2);
          position: relative;
          overflow: hidden;
        }
        .bento-glass::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.4'/%3E%3C/svg%3E");
          z-index: 0;
          pointer-events: none;
          mix-blend-mode: screen;
          opacity: 0.15;
        }
      `,
        }}
      />
    </>
  );
}
