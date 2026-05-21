import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  output: 'export',
  // Set basePath and assetPrefix to the repo name on GitHub Pages in production
  basePath: isProd ? '/digital-banking' : '',
  assetPrefix: isProd ? '/digital-banking/' : '',
  images: {
    unoptimized: true, // Required for static export
  },
};

export default withNextIntl(nextConfig);
