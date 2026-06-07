import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { productSlugs } from '@/data/productContent';
import { routing } from '@/i18n/routing';
import { setRequestLocale, getTranslations } from 'next-intl/server';

const SITE_URL = 'https://achyuthkp27.github.io/digital-banking';

export function generateStaticParams() {
  return productSlugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!productSlugs.includes(slug)) return {};

  const t = await getTranslations({ locale, namespace: `ProductPages.${slug}` });
  const title = t('title');
  const description = t('subtitle');
  const url = `${SITE_URL}/${locale}/products/${slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: `/digital-banking/${locale}/products/${slug}`,
      languages: {
        ...Object.fromEntries(
          routing.locales.map((l) => [l, `/digital-banking/${l}/products/${slug}`])
        ),
        'x-default': `/digital-banking/${routing.defaultLocale}/products/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      images: [{ url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${SITE_URL}/og-image.png`],
    },
  };
}

interface ProductFeatureContent {
  title: string;
  description?: string;
}
interface ProductStat {
  value: string;
  label: string;
  trend?: string;
}
interface ProductSection {
  title: string;
  content: string[];
}

import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import CustomCursor from '@/components/common/CustomCursor';
import { CheckCircle } from 'lucide-react';
import ProductHero from '@/components/landing/ProductHero';
import TechShowcaseClient from '@/components/landing/TechShowcaseClient';

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  if (!productSlugs.includes(slug)) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: `ProductPages.${slug}` });
  const ui = await getTranslations({ locale, namespace: 'ProductPagesUI' });

  const features = t.has('features') ? (t.raw('features') as ProductFeatureContent[]) : [];
  const stats = t.has('stats') ? (t.raw('stats') as ProductStat[]) : null;
  const sections = t.has('sections') ? (t.raw('sections') as ProductSection[]) : [];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: t('title'),
            description: t('description'),
            brand: { '@type': 'Brand', name: 'Digital Banking' },
            url: `${SITE_URL}/${locale}/products/${slug}`,
          }),
        }}
      />
      <CustomCursor />
      <Navbar />
      <main
        id="main-content"
        tabIndex={-1}
        style={{ background: 'var(--bg-base)', minHeight: '100vh', paddingBottom: '0' }}
      >
        {}
        <ProductHero title={t('title')} subtitle={t('subtitle')} slug={slug} />

        {}
        <section className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '64px' }}>
            {}
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
                  {ui('platformOverview')}
                </h3>
                <p style={{ fontSize: '16px', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                  {t('description')}
                </p>
              </div>

              {stats && (
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '24px',
                  }}
                >
                  {stats.map((stat, idx) => (
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

            {}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                gap: '24px',
              }}
            >
              {}
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
                  {ui('coreFeatures')}
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  {features.map((feature, idx) => (
                    <div
                      key={idx}
                      style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}
                    >
                      <CheckCircle className="text-accent flex-shrink-0" size={24} />
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

              {}
              {sections.map((section, idx) => (
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

        {}
        <div style={{ marginTop: '80px' }}>
          <TechShowcaseClient />
        </div>
      </main>
      <Footer />

      {}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .bento-glass {
          background: linear-gradient(135deg, rgba(var(--color-invert-rgb), 0.03) 0%, rgba(var(--color-invert-rgb), 0.01) 100%);
          backdrop-filter: blur(24px) saturate(120%);
          -webkit-backdrop-filter: blur(24px) saturate(120%);
          border: 1px solid rgba(var(--color-invert-rgb), 0.05);
          box-shadow: inset 0 1px 1px rgba(var(--color-invert-rgb), 0.1), 0 8px 32px rgba(var(--color-base-rgb), 0.2);
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
