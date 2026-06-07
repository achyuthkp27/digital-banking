import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

// Mirror the conditional basePath from next.config.ts. `public/` files are
// copied verbatim (no basePath rewriting), so the manifest must be a generated
// metadata route for Next to serve it — and its internal URLs prefixed by hand.
const basePath = process.env.NODE_ENV === 'production' ? '/digital-banking' : '';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Digital Banking Platform',
    short_name: 'Digital Bank',
    description:
      'A modern, high-performance web application showcasing the next generation of digital finance.',
    start_url: `${basePath}/`,
    scope: `${basePath}/`,
    display: 'standalone',
    background_color: '#020617',
    theme_color: '#020617',
    icons: [
      {
        src: `${basePath}/icon-192x192.png`,
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: `${basePath}/icon-512x512.png`,
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: `${basePath}/icon-512x512.png`,
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
