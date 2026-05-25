import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import withSerwistInit from '@serwist/next';

const withNextIntl = createNextIntlPlugin();

const isProd = process.env.NODE_ENV === 'production';

const withSerwist = withSerwistInit({
  swSrc: 'src/app/sw.ts',
  swDest: 'public/sw.js',
  disable: process.env.NODE_ENV === 'development',
});

const nextConfig: NextConfig = {
  output: 'export',
  
  basePath: isProd ? '/digital-banking' : '',
  assetPrefix: isProd ? '/digital-banking/' : '',
  images: {
    unoptimized: true, 
  },
  productionBrowserSourceMaps: true,
};

export default withSerwist(withNextIntl(nextConfig));
