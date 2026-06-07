import React from 'react';
import { getTranslations } from 'next-intl/server';

export default async function MarqueeSection() {
  const t = await getTranslations('Marquee');
  const trustItems = t.raw('items') as string[];
  const displayItems = [...trustItems, ...trustItems, ...trustItems, ...trustItems];

  return (
    <div
      aria-hidden="true"
      style={{
        width: '100%',
        background: 'var(--bg-surface)',
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)',
        padding: '20px 0',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <div
        className="marquee-container"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
        }}
      >
        <div className="marquee-content" style={{ display: 'flex', gap: '32px' }}>
          {displayItems.map((item, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '32px',
                whiteSpace: 'nowrap',
              }}
            >
              <span
                style={{
                  color: 'var(--text-tertiary)',
                  fontSize: '13px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  fontWeight: 500,
                }}
              >
                {item}
              </span>
              {index !== displayItems.length - 1 && (
                <span style={{ color: 'var(--text-tertiary)' }}>·</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
