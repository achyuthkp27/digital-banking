'use client';

import React from 'react';
import AnimatedCounter from '../common/AnimatedCounter';
import GlassCard from '../common/GlassCard';
import { StaggerContainer, StaggerItem } from '../common/ScrollReveal';

const stats = [
  { value: 99.9, suffix: '%', label: 'Uptime SLA', decimals: 1 },
  { value: 10, suffix: 'M+', label: 'Transactions/Day', decimals: 0 },
  { value: 2, prefix: '<', suffix: 's', label: 'Response Time', decimals: 0 },
];

const StatsBar: React.FC = () => {
  return (
    <div className="py-12 md:py-16 relative">
      <div className="container max-w-6xl mx-auto px-4">
        <StaggerContainer>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {stats.map((stat, idx) => (
              <StaggerItem key={stat.label}>
                <GlassCard hover className="p-6 md:p-8 text-center relative overflow-hidden">
                  <div className="relative z-10">
                    <h3 className="text-[2.5rem] md:text-[3rem] font-extrabold tracking-[-0.03em] text-[#F9FAFB] leading-none mb-2">
                      {stat.prefix || ''}
                      <AnimatedCounter
                        value={stat.value}
                        duration={2.5}
                        decimals={stat.decimals}
                      />
                      {stat.suffix}
                    </h3>
                    <p className="text-[0.85rem] font-medium text-[var(--text-secondary)] tracking-[0.5px]">
                      {stat.label}
                    </p>
                  </div>

                  {/* Decorative gradient */}
                  <div
                    className="absolute bottom-[-40%] left-1/2 -translate-x-1/2 w-[200px] h-[100px] rounded-full pointer-events-none"
                    style={{
                      background: idx === 0
                        ? 'radial-gradient(circle, rgba(var(--accent-rgb),0.1) 0%, transparent 70%)'
                        : idx === 1
                        ? 'radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)'
                        : 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)',
                    }}
                  />
                </GlassCard>
              </StaggerItem>
            ))}
          </div>
        </StaggerContainer>
      </div>
    </div>
  );
};

export default StatsBar;
