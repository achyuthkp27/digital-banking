'use client';

import React from 'react';
import { Globe, Router, Network, Database, Cloud, Shield, ChevronDown } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function ArchitectureSection() {
  const t = useTranslations('Architecture');

  const architectureLayers = [
    {
      name: t('presentationLayer'),
      subtitle: t('layer1'),
      icon: <Globe size={22} />,
      pills: [
        { label: t('webApp'), active: true },
        { label: t('mobileApp'), active: false },
        { label: t('tabletApp'), active: false },
        { label: t('kiosk'), active: false },
      ],
    },
    {
      name: t('apiGateway'),
      subtitle: t('layer2'),
      icon: <Router size={22} />,
      pills: [
        { label: t('loadBalancer'), active: false },
        { label: t('apiGateway'), active: true },
        { label: t('authentication'), active: false },
        { label: t('rateLimiting'), active: false },
      ],
    },
    {
      name: t('businessLogic'),
      subtitle: t('layer3'),
      icon: <Network size={22} />,
      pills: [
        { label: t('bankingServices'), active: true },
        { label: t('paymentProcessing'), active: false },
        { label: t('analytics'), active: false },
        { label: t('notifications'), active: false },
      ],
    },
    {
      name: t('dataLayer'),
      subtitle: t('layer4'),
      icon: <Database size={22} />,
      pills: [
        { label: t('postgresql'), active: true },
        { label: t('redisCache'), active: false },
        { label: t('documentStore'), active: false },
        { label: t('dataWarehouse'), active: false },
      ],
    },
  ];

  const callouts = [
    {
      title: t('cloudNative'),
      description: t('cloudNativeDesc'),
      icon: <Cloud size={24} />
    },
    {
      title: t('secureByDesign'),
      description: t('secureByDesignDesc'),
      icon: <Shield size={24} />
    },
    {
      title: t('microservices'),
      description: t('microservicesDesc'),
      icon: <Network size={24} />
    }
  ];

  return (
    <section id="architecture" className="py-[120px] relative bg-[var(--bg-base)]">
      
      {/* Background grid dot pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(var(--color-invert-rgb),0.05)_1px,transparent_1px)] [background-size:24px_24px] opacity-50 pointer-events-none" />
      
      {/* Soft center glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[500px] bg-[var(--accent-dim)] rounded-full blur-[120px] opacity-20 pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        
        {/* Section Header */}
        <div className="text-center mb-[80px]">
          <span className="inline-flex items-center gap-2 text-[11px] text-accent uppercase tracking-[0.15em] mb-4 font-semibold bg-[var(--accent-dim)] px-3 py-1.5 rounded-full border border-[var(--accent-glow)]">
            <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            {t('badge')}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] font-syne mb-4">
            {t('title')}
          </h2>
          <p className="text-[var(--text-secondary)] text-base max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* Architecture Diagram container */}
        <div className="max-w-[900px] mx-auto mb-[80px] flex flex-col items-center">
          {architectureLayers.map((layer, idx) => (
            <React.Fragment key={idx}>
              
              {/* Layer Card */}
              <div
                className="w-full group flex flex-col md:flex-row items-start md:items-center justify-between p-4 md:p-5 md:pr-8 rounded-[24px] md:rounded-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] shadow-sm hover:border-[var(--border-strong)] hover:shadow-lg transition-all duration-400 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-1"
              >
                {/* Left Side: Icon & Title */}
                <div className="flex items-center gap-5 w-full md:w-auto">
                  <div className="w-14 h-14 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-subtle)] flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-[var(--accent-dim)] group-hover:border-[var(--accent-glow)] transition-all duration-400">
                    {React.cloneElement(layer.icon as React.ReactElement<{ className?: string }>, {
                      className: "text-[var(--text-secondary)] group-hover:text-accent transition-colors duration-400"
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

                {/* Right Side: Pills */}
                <div className="flex flex-wrap items-center gap-2.5 mt-5 md:mt-0 md:ml-auto w-full md:w-auto justify-start md:justify-end">
                  {layer.pills.map((pill, pIdx) => (
                    <div
                      key={pIdx}
                      className={`flex items-center px-4 py-1.5 rounded-full text-[13px] font-medium transition-all duration-300 ${
                        pill.active
                          ? 'bg-[var(--accent-dim)] text-accent border border-[var(--accent-glow)] shadow-[0_0_15px_rgba(var(--accent-rgb),0.1)]'
                          : 'bg-transparent text-[var(--text-secondary)] border border-[var(--border-subtle)] hover:border-[var(--border-strong)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]'
                      }`}
                    >
                      {pill.active && <div className="w-1.5 h-1.5 rounded-full bg-accent mr-2" />}
                      {pill.label}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Down Arrow between layers */}
              {idx !== architectureLayers.length - 1 && (
                <div className="flex justify-center py-4">
                  <ChevronDown className="text-[var(--border-strong)]" size={20} />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Callouts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[900px] mx-auto">
          {callouts.map((callout, idx) => (
            <div 
              key={idx} 
              className="group relative p-6 md:p-8 rounded-[24px] bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[var(--border-strong)] hover:shadow-xl transition-all duration-400 hover:-translate-y-1 flex flex-col"
            >
              <div className="w-12 h-12 rounded-[14px] bg-[var(--bg-elevated)] border border-[var(--border-subtle)] flex items-center justify-center mb-6 group-hover:bg-[var(--accent-dim)] group-hover:border-[var(--accent-glow)] group-hover:scale-110 transition-all duration-400 shrink-0">
                {React.cloneElement(callout.icon as React.ReactElement<{ className?: string }>, {
                  className: "text-[var(--text-secondary)] group-hover:text-accent transition-colors duration-400"
                })}
              </div>
              <h4 className="text-[17px] font-semibold text-[var(--text-primary)] mb-2">
                {callout.title}
              </h4>
              <p className="text-[14px] text-[var(--text-secondary)] leading-relaxed">
                {callout.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
