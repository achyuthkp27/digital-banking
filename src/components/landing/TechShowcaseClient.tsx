'use client';

import dynamic from 'next/dynamic';

const TechShowcase3D = dynamic(() => import('@/components/landing/TechShowcase3D'), {
  ssr: false,
});

export default function TechShowcaseClient() {
  return <TechShowcase3D />;
}
