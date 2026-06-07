'use client';

import React, { useState } from 'react';
import { Globe, Router, Network, Database, Cloud, Shield, ChevronDown } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { BlurReveal, BlurText } from '@/components/common/ScrollReveal';

const EASE = [0.16, 1, 0.3, 1] as const;

export default function ArchitectureSection() {
  const t = useTranslations('Architecture');
  const reduce = useReducedMotion();

  const [activePills, setActivePills] = useState<number[]>([0, 1, 0, 0]);

  const architectureLayers = [
    {
      name: t('presentationLayer'),
      subtitle: t('layer1'),
      icon: <Globe size={22} />,
      pills: [
        { label: t('webApp') },
        { label: t('mobileApp') },
        { label: t('tabletApp') },
        { label: t('kiosk') },
      ],
    },
    {
      name: t('apiGateway'),
      subtitle: t('layer2'),
      icon: <Router size={22} />,
      pills: [
        { label: t('loadBalancer') },
        { label: t('apiGateway') },
        { label: t('authentication') },
        { label: t('rateLimiting') },
      ],
    },
    {
      name: t('businessLogic'),
      subtitle: t('layer3'),
      icon: <Network size={22} />,
      pills: [
        { label: t('bankingServices') },
        { label: t('paymentProcessing') },
        { label: t('analytics') },
        { label: t('notifications') },
      ],
    },
    {
      name: t('dataLayer'),
      subtitle: t('layer4'),
      icon: <Database size={22} />,
      pills: [
        { label: t('postgresql') },
        { label: t('redisCache') },
        { label: t('documentStore') },
        { label: t('dataWarehouse') },
      ],
    },
  ];

  const callouts = [
    {
      title: t('cloudNative'),
      description: t('cloudNativeDesc'),
      icon: <Cloud size={24} />,
    },
    {
      title: t('secureByDesign'),
      description: t('secureByDesignDesc'),
      icon: <Shield size={24} />,
    },
    {
      title: t('microservices'),
      description: t('microservicesDesc'),
      icon: <Network size={24} />,
    },
  ];

  // Scroll-in reveal for a block (no-op under reduced motion).
  const reveal = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 26, filter: 'blur(8px)' },
          whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
          viewport: { once: true, margin: '-60px' },
          transition: { duration: 0.7, delay, ease: EASE },
        };

  return (
    <section id="architecture" className="py-[120px] relative bg-[var(--bg-base)] overflow-hidden">
      {}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(var(--color-invert-rgb),0.05)_1px,transparent_1px)] [background-size:24px_24px] opacity-50 pointer-events-none" />

      {}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[500px] bg-[var(--accent-dim)] rounded-full blur-[120px] opacity-20 pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        {}
        <div className="text-center mb-[80px]">
          <BlurReveal
            as="span"
            className="inline-flex items-center gap-2 text-[11px] text-accent uppercase tracking-[0.15em] mb-4 font-semibold bg-[var(--accent-dim)] px-3 py-1.5 rounded-full border border-[var(--accent-glow)]"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            {t('badge')}
          </BlurReveal>
          <BlurText
            as="h2"
            text={t('title')}
            delay={0.1}
            className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] font-syne mb-4"
          />
          <BlurReveal
            as="p"
            delay={0.2}
            className="text-[var(--text-secondary)] text-base max-w-2xl mx-auto"
          >
            {t('subtitle')}
          </BlurReveal>
        </div>

        {}
        <div className="max-w-[900px] mx-auto mb-[80px] flex flex-col items-center">
          {architectureLayers.map((layer, idx) => (
            <React.Fragment key={idx}>
              {}
              <motion.div
                {...reveal(idx * 0.12)}
                className="w-full group flex flex-col md:flex-row items-start md:items-center justify-between p-4 md:p-5 md:pr-8 rounded-[24px] md:rounded-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] shadow-sm hover:border-[var(--border-strong)] hover:shadow-lg transition-[border-color,box-shadow,transform] duration-400 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-1"
              >
                {}
                <div className="flex items-center gap-5 w-full md:w-auto">
                  <div className="w-14 h-14 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-subtle)] flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-[var(--accent-dim)] group-hover:border-[var(--accent-glow)] transition-all duration-400">
                    {React.cloneElement(layer.icon as React.ReactElement<{ className?: string }>, {
                      className:
                        'text-[var(--text-secondary)] group-hover:text-accent transition-colors duration-400',
                    })}
                  </div>
                  <div className="flex flex-col justify-center">
                    <span className="block text-[var(--text-primary)] font-semibold text-[17px] leading-snug mb-0.5">
                      {layer.name}
                    </span>
                    <span className="block text-[var(--text-tertiary)] text-[12px] font-medium uppercase tracking-wider">
                      {layer.subtitle}
                    </span>
                  </div>
                </div>

                {}
                <div className="flex flex-wrap items-center gap-2.5 mt-5 md:mt-0 md:ml-auto w-full md:w-auto justify-start md:justify-end">
                  {layer.pills.map((pill, pIdx) => {
                    const isActive = activePills[idx] === pIdx;
                    return (
                      <div
                        key={pIdx}
                        onMouseEnter={() => {
                          const newPills = [...activePills];
                          newPills[idx] = pIdx;
                          setActivePills(newPills);
                        }}
                        className="relative flex items-center px-4 py-1.5 rounded-full text-[13px] font-medium cursor-pointer border border-[var(--border-subtle)] transition-colors duration-300"
                      >
                        {isActive && (
                          <motion.div
                            layoutId={`arch-pill-${idx}`}
                            transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                            className="absolute inset-0 rounded-full bg-[var(--accent-dim)] border border-[var(--accent-glow)]"
                            style={{ boxShadow: '0 0 15px rgba(var(--accent-rgb),0.12)' }}
                          />
                        )}
                        <span
                          className="relative z-[1] flex items-center"
                          style={{ color: isActive ? 'var(--accent)' : 'var(--text-secondary)' }}
                        >
                          {isActive && (
                            <span className="w-1.5 h-1.5 rounded-full bg-accent mr-2" />
                          )}
                          {pill.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </motion.div>

              {}
              {idx !== architectureLayers.length - 1 && (
                <div
                  className="arch-connector"
                  aria-hidden="true"
                  style={{ animationDelay: `${idx * 0.5}s` }}
                >
                  <span className="arch-connector-line" />
                  <span className="arch-connector-pulse" />
                  <ChevronDown className="arch-connector-chevron text-[var(--border-strong)]" size={18} />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[900px] mx-auto">
          {callouts.map((callout, idx) => (
            <motion.div
              key={idx}
              {...reveal(idx * 0.12)}
              className="arch-callout group relative p-6 md:p-8 rounded-[24px] bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[var(--border-strong)] hover:shadow-xl transition-[border-color,box-shadow,transform] duration-400 hover:-translate-y-1.5 flex flex-col overflow-hidden"
            >
              <span className="arch-callout-glow" aria-hidden="true" />
              <div className="relative w-12 h-12 rounded-[14px] bg-[var(--bg-elevated)] border border-[var(--border-subtle)] flex items-center justify-center mb-6 group-hover:bg-[var(--accent-dim)] group-hover:border-[var(--accent-glow)] group-hover:scale-110 transition-all duration-400 shrink-0">
                {React.cloneElement(callout.icon as React.ReactElement<{ className?: string }>, {
                  className:
                    'text-[var(--text-secondary)] group-hover:text-accent transition-colors duration-400',
                })}
              </div>
              <h3 className="relative text-[17px] font-semibold text-[var(--text-primary)] mb-2">
                {callout.title}
              </h3>
              <p className="relative text-[14px] text-[var(--text-secondary)] leading-relaxed">
                {callout.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .arch-connector {
          position: relative;
          height: 48px;
          width: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 6px 0;
        }
        .arch-connector-line {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 2px;
          border-radius: 2px;
          background: linear-gradient(
            to bottom,
            transparent,
            var(--accent-glow) 50%,
            transparent
          );
          opacity: 0.6;
        }
        .arch-connector-pulse {
          position: absolute;
          top: 0;
          left: 50%;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--accent);
          box-shadow: 0 0 14px 2px var(--accent);
          transform: translateX(-50%);
          animation: arch-flow 2.6s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          animation-delay: inherit;
        }
        .arch-connector-chevron {
          position: relative;
          z-index: 1;
          background: var(--bg-base);
          border-radius: 999px;
        }
        @keyframes arch-flow {
          0% { top: 2px; opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { top: calc(100% - 9px); opacity: 0; }
        }
        .arch-callout-glow {
          position: absolute;
          top: -40%;
          left: 50%;
          width: 200px;
          height: 200px;
          transform: translateX(-50%);
          background: radial-gradient(circle, rgba(var(--accent-rgb), 0.12) 0%, transparent 70%);
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none;
        }
        .arch-callout:hover .arch-callout-glow {
          opacity: 1;
        }
      `,
        }}
      />
    </section>
  );
}
