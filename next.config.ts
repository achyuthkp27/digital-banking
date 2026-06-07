import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  output: 'export',

  // next-intl's ICU formatter chain is ESM-only. Listing the chain lets
  // next/jest transpile it for Jest (next/jest derives its transform allowlist
  // from transpilePackages) and keeps Next's own transform consistent.
  transpilePackages: [
    'next-intl',
    'use-intl',
    'intl-messageformat',
    'icu-minify',
    '@formatjs/fast-memoize',
    '@formatjs/icu-messageformat-parser',
    '@formatjs/icu-skeleton-parser',
    '@formatjs/intl-localematcher',
  ],

  basePath: isProd ? '/digital-banking' : '',
  assetPrefix: isProd ? '/digital-banking/' : '',
  images: {
    unoptimized: true,
  },
  // Source maps expose original TS/JSX on the public site; keep them off for the
  // deployed export. Set ANALYZE/DEBUG tooling locally if you need them.
  productionBrowserSourceMaps: false,
};

export default withNextIntl(nextConfig);
