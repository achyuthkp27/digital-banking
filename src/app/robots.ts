import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  const isProd = process.env.NODE_ENV === 'production';
  const baseUrl = isProd ? 'https://achyuthkp27.github.io/digital-banking' : 'http://localhost:3000';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
