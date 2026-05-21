'use client';

import React from 'react';
import LanguageIcon from '@mui/icons-material/Language';
import RouterIcon from '@mui/icons-material/Router';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import StorageIcon from '@mui/icons-material/Storage';
import CloudOutlinedIcon from '@mui/icons-material/CloudOutlined';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const architectureLayers = [
  {
    name: 'Presentation Layer',
    subtitle: 'Layer 1',
    icon: <LanguageIcon sx={{ color: 'var(--accent)', fontSize: '28px' }} />,
    pills: [
      { label: 'Web App', active: true },
      { label: 'Mobile App', active: false },
      { label: 'Tablet App', active: false },
      { label: 'Kiosk', active: false },
    ],
  },
  {
    name: 'API Gateway',
    subtitle: 'Layer 2',
    icon: <RouterIcon sx={{ color: 'var(--accent)', fontSize: '28px' }} />,
    pills: [
      { label: 'Load Balancer', active: false },
      { label: 'API Gateway', active: true },
      { label: 'Authentication', active: false },
      { label: 'Rate Limiting', active: false },
    ],
  },
  {
    name: 'Business Logic',
    subtitle: 'Layer 3',
    icon: <AccountTreeIcon sx={{ color: 'var(--accent)', fontSize: '28px' }} />,
    pills: [
      { label: 'Banking Services', active: true },
      { label: 'Payment Processing', active: false },
      { label: 'Analytics', active: false },
      { label: 'Notifications', active: false },
    ],
  },
  {
    name: 'Data Layer',
    subtitle: 'Layer 4',
    icon: <StorageIcon sx={{ color: 'var(--accent)', fontSize: '28px' }} />,
    pills: [
      { label: 'PostgreSQL', active: true },
      { label: 'Redis Cache', active: false },
      { label: 'Document Store', active: false },
      { label: 'Data Warehouse', active: false },
    ],
  },
];

const callouts = [
  {
    title: 'Cloud Native',
    description: 'Built for Kubernetes, auto-scaling, and multi-region deployment',
    icon: <CloudOutlinedIcon sx={{ color: 'var(--accent)', fontSize: '24px' }} />
  },
  {
    title: 'Secure by Design',
    description: 'Zero-trust architecture with end-to-end encryption',
    icon: <ShieldOutlinedIcon sx={{ color: 'var(--accent)', fontSize: '24px' }} />
  },
  {
    title: 'Microservices',
    description: 'Independent, scalable services with API-first approach',
    icon: <AccountTreeIcon sx={{ color: 'var(--accent)', fontSize: '24px' }} />
  }
];

export default function ArchitectureSection() {
  return (
    <section id="architecture" className="section container" style={{ background: 'var(--bg-base)', position: 'relative' }}>
      
      {/* Background grid dot pattern for architecture area */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(rgba(var(--color-invert-rgb), 0.05) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          opacity: 0.5,
          pointerEvents: 'none',
        }}
      />

      <div style={{ position: 'relative', zIndex: 10 }}>
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <span
            style={{
              display: 'inline-block',
              fontSize: '11px',
              color: 'var(--accent)',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              marginBottom: '16px',
              fontWeight: 600,
              background: 'var(--accent-dim)',
              padding: '6px 12px',
              borderRadius: '999px',
              border: '1px solid var(--accent-glow)'
            }}
          >
            System Architecture
          </span>
          <h2
            style={{
              fontSize: '48px',
              fontWeight: 700,
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-syne), sans-serif',
              marginBottom: '16px'
            }}
          >
            Scalable Architecture
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
            Microservices-based, cloud-native architecture designed for high availability and performance
          </p>
        </div>

        {/* Diagram container */}
        <div
          style={{
            maxWidth: '900px',
            margin: '0 auto 64px auto',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            alignItems: 'center',
          }}
        >
          {architectureLayers.map((layer, idx) => (
            <React.Fragment key={idx}>
              <div
                className="arch-layer bento-glass"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '24px 32px',
                  width: '100%',
                  position: 'relative',
                }}
              >
                {/* Left Side: Icon & Title */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flex: '0 0 250px', marginRight: '24px' }}>
                  <div
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '12px',
                      background: 'var(--accent-dim)',
                      border: '1px solid var(--accent-glow)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {layer.icon}
                  </div>
                  <div>
                    <span style={{ display: 'block', color: 'var(--text-primary)', fontWeight: 600, fontSize: '16px', marginBottom: '2px' }}>
                      {layer.name}
                    </span>
                    <span style={{ display: 'block', color: 'var(--text-tertiary)', fontSize: '12px' }}>
                      {layer.subtitle}
                    </span>
                  </div>
                </div>

                {/* Right Side: Pills */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', flex: 1, justifyContent: 'flex-end' }}>
                  {layer.pills.map((pill, pIdx) => (
                    <div
                      key={pIdx}
                      style={{
                        fontSize: '12px',
                        fontWeight: 500,
                        color: 'var(--text-secondary)',
                        background: 'transparent',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: '6px',
                        padding: '8px 16px',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'var(--border-strong)';
                        e.currentTarget.style.color = 'var(--text-primary)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'var(--border-subtle)';
                        e.currentTarget.style.color = 'var(--text-secondary)';
                      }}
                    >
                      {pill.label}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Down Arrow between layers */}
              {idx !== architectureLayers.length - 1 && (
                <div style={{ display: 'flex', justifyContent: 'center', padding: '12px 0' }}>
                  <KeyboardArrowDownIcon sx={{ color: 'var(--border-strong)', fontSize: '24px' }} />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Callouts */}
        <div
          className="arch-callouts"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '24px',
            maxWidth: '900px',
            margin: '0 auto',
          }}
        >
          {callouts.map((callout, idx) => (
            <div 
              key={idx} 
              className="arch-callout bento-glass"
              style={{ 
                padding: '24px', 
              }}
            >
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: 'var(--accent-dim)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px',
                }}
              >
                {callout.icon}
              </div>
              <h4 style={{ color: 'var(--text-primary)', fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>
                {callout.title}
              </h4>
              <p style={{ color: 'var(--text-secondary)', fontSize: '13px', lineHeight: 1.6 }}>
                {callout.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .bento-glass {
          background: linear-gradient(135deg, rgba(var(--color-invert-rgb), 0.05) 0%, rgba(var(--color-invert-rgb), 0.01) 100%);
          backdrop-filter: blur(24px) saturate(120%);
          -webkit-backdrop-filter: blur(24px) saturate(120%);
          border: 1px solid rgba(var(--color-invert-rgb), 0.06);
          box-shadow: inset 0 1px 1px rgba(var(--color-invert-rgb), 0.12), 0 8px 32px rgba(var(--color-base-rgb), 0.4);
          border-radius: 20px;
          transition: all 400ms cubic-bezier(0.23, 1, 0.32, 1);
          overflow: hidden;
        }
        .bento-glass::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.4'/%3E%3C/svg%3E");
          z-index: 0;
          pointer-events: none;
          mix-blend-mode: screen;
          opacity: 0.15;
        }
        .arch-layer:hover, .arch-callout:hover {
          border-color: rgba(var(--color-invert-rgb), 0.15);
          transform: translateY(-4px);
          box-shadow: inset 0 1px 1px rgba(var(--color-invert-rgb), 0.25), inset 0 0 40px rgba(var(--color-invert-rgb), 0.02), 0 16px 40px -10px rgba(var(--color-base-rgb), 0.6);
        }
        @media (max-width: 768px) {
          .arch-callouts {
            grid-template-columns: 1fr !important;
          }
          .arch-layer {
            flex-direction: column;
            align-items: flex-start !important;
            padding: 20px !important;
          }
          .arch-layer > div:first-child {
            margin-bottom: 24px;
            margin-right: 0 !important;
            flex: auto !important;
          }
          .arch-layer > div:last-child {
            justify-content: flex-start !important;
          }
        }
      `}} />
    </section>
  );
}
