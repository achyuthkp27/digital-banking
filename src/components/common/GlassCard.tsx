'use client';

import React from 'react';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
}

export default function GlassCard({ children, hover = false, className = '', ...props }: GlassCardProps) {
  let baseClass = `relative overflow-hidden rounded-[20px] bg-gradient-to-br from-[var(--glass-bg-start)] to-[var(--glass-bg-end)] backdrop-blur-[24px] saturate-[120%] border border-[var(--glass-border)] shadow-[inset_0_1px_1px_var(--glass-shadow-inner),0_8px_32px_var(--glass-shadow-drop)] transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] `;
  
  if (hover) {
    baseClass += 'hover:-translate-y-1 hover:border-[var(--glass-border-hover)] hover:shadow-[inset_0_1px_1px_var(--glass-shadow-inner-hover),0_16px_40px_-10px_var(--glass-shadow-drop-hover)] ';
  }

  return (
    <div className={`${baseClass} ${className}`} {...props}>
      {/* Subtle Noise Texture Overlay */}
      <div
        className="absolute inset-0 pointer-events-none mix-blend-overlay z-0 opacity-[0.08]"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
        }}
      />
      <div className="relative z-10 h-full w-full">
        {children}
      </div>
    </div>
  );
}
