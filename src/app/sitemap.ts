import { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { productSlugs } from '@/data/productContent';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const isProd = process.env.NODE_ENV === 'production';
  const baseUrl = isProd
    ? 'https://achyuthkp27.github.io/digital-banking'
    : 'http://localhost:3000';

  const sitemapEntries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    sitemapEntries.push({
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    });
  }

  for (const locale of routing.locales) {
    for (const product of productSlugs) {
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
