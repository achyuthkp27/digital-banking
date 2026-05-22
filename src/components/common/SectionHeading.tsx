'use client';

import React from 'react';
import ScrollReveal, { TextReveal } from './ScrollReveal';

interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  light?: boolean;
  gradientText?: boolean;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({
  badge,
  title,
  subtitle,
  align = 'center',
  gradientText = false,
}) => {
  return (
    <div className={`flex flex-col mb-16 md:mb-24 ${align === 'center' ? 'items-center text-center' : 'items-start text-left'}`}>
      {badge && (
        <ScrollReveal delay={0}>
          <div className="mb-6 px-4 py-1.5 text-[0.7rem] font-bold tracking-[2px] uppercase bg-[rgba(var(--accent-rgb),0.08)] border border-[rgba(var(--accent-rgb),0.3)] text-accent rounded-full">
            {badge}
          </div>
        </ScrollReveal>
      )}

      <TextReveal
        text={title}
        tag="h2"
        staggerDelay={0.05}
        style={{
          fontSize: 'clamp(2rem, 5vw, 2.75rem)',
          fontWeight: 700,
          lineHeight: 1.2,
          letterSpacing: '-0.02em',
          color: '#F9FAFB',
          marginBottom: subtitle ? '16px' : '0',
          ...(gradientText && {
            background: 'linear-gradient(135deg, var(--accent) 0%, #8B5CF6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }),
        }}
      />

      {subtitle && (
        <ScrollReveal delay={0.3}>
          <p className="text-[var(--text-secondary)] max-w-[600px] leading-relaxed text-[0.95rem] md:text-[1.05rem]">
            {subtitle}
          </p>
        </ScrollReveal>
      )}
    </div>
  );
};

export default SectionHeading;
