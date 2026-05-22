'use client';

import React from 'react';
import dynamic from 'next/dynamic';

/* ─── Lazy-load all product illustrations ─── */
const illustrations: Record<string, React.ComponentType> = {
  'video-kyc': dynamic(() => import('@/components/illustrations/VideoKycIllustration'), { ssr: false }),
  'kiosk-banking': dynamic(() => import('@/components/illustrations/KioskBankingIllustration'), { ssr: false }),
  'agent-banking': dynamic(() => import('@/components/illustrations/AgentBankingIllustration'), { ssr: false }),
  'corporate-admin': dynamic(() => import('@/components/illustrations/CorporateAdminIllustration'), { ssr: false }),
  'corporate-banking': dynamic(() => import('@/components/illustrations/CorporateBankingIllustration'), { ssr: false }),
  'retail-banking': dynamic(() => import('@/components/illustrations/RetailBankingIllustration'), { ssr: false }),
  'retail-admin': dynamic(() => import('@/components/illustrations/RetailAdminIllustration'), { ssr: false }),
  'mobile-banking': dynamic(() => import('@/components/illustrations/MobileBankingIllustration'), { ssr: false }),
  'two-factor-auth': dynamic(() => import('@/components/illustrations/TwoFactorAuthIllustration'), { ssr: false }),
};

interface ProductIllustrationProps {
  slug: string;
}

const ProductIllustration = React.memo(function ProductIllustration({ slug }: ProductIllustrationProps) {
  const IllustrationComponent = illustrations[slug];

  if (!IllustrationComponent) {
    /* Fallback: subtle animated gradient placeholder */
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          minHeight: '400px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '32px',
          background: 'radial-gradient(circle at 50% 50%, rgba(var(--accent-rgb), 0.08) 0%, transparent 60%)',
        }}
      >
        <div
          style={{
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            border: '2px solid rgba(var(--accent-rgb), 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animation: 'fallback-pulse 2s ease-in-out infinite',
          }}
        >
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'var(--accent)',
              opacity: 0.3,
            }}
          />
        </div>
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes fallback-pulse {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(0.95); opacity: 0.7; }
          }
        `}} />
      </div>
    );
  }

  return (
    <div style={{ width: '100%', height: '100%', minHeight: '400px' }}>
      <IllustrationComponent />
    </div>
  );
});

export default ProductIllustration;
