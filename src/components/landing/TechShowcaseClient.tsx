'use client';

import dynamic from 'next/dynamic';
import { useInView } from 'react-intersection-observer';

const TechShowcase3D = dynamic(() => import('@/components/landing/TechShowcase3D'), {
  ssr: false,
});

export default function TechShowcaseClient() {
  const { ref, inView } = useInView({ triggerOnce: true, rootMargin: '400px 0px' });

  return (
    <div ref={ref} style={{ minHeight: '600px', width: '100%' }}>
      {inView && <TechShowcase3D />}
    </div>
  );
}
