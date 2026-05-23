import { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const isProd = process.env.NODE_ENV === 'production';
  const baseUrl = isProd ? 'https://achyuthkp27.github.io/digital-banking' : 'http://localhost:3000';

  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Add the root path for all locales
  for (const locale of routing.locales) {
    sitemapEntries.push({
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    });
  }

  // Add dynamic product pages
  const products = [
    'mobile-banking',
    'retail-banking',
    'retail-admin',
    'corporate-banking',
    'corporate-admin',
    'video-kyc',
    'agent-banking',
    'kiosk-banking',
    'two-factor-auth'
  ];

  for (const locale of routing.locales) {
    for (const product of products) {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}/products/${product}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      });
    }
  }

  return sitemapEntries;
}
