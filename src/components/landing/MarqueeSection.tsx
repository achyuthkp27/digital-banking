import React from 'react';

const trustItems = [
  'ISO 27001 Certified',
  'PCI DSS Level 1',
  'AES-256 Encryption',
  'Zero Data Breaches',
  'SOC 2 Type II',
  'GDPR Compliant',
  'RBI Regulated',
  '99.9% SLA',
];

export default function MarqueeSection() {
  const displayItems = [...trustItems, ...trustItems, ...trustItems, ...trustItems];

  return (
    <div
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
