'use client';

import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'contained' | 'outlined' | 'text' | 'glass';
  pill?: boolean;
}

export function Button({ variant = 'contained', pill = false, className = '', children, ...props }: ButtonProps) {
  const isGlass = variant === 'glass';
  
  let baseClass = `inline-flex items-center justify-center font-semibold transition-all duration-300 focus:outline-none ${pill ? 'rounded-full px-8 py-3' : 'rounded-xl px-6 py-2.5'} `;
  
  if (isGlass) {
    baseClass += 'bg-[var(--glass-bg-start)] border border-[var(--glass-border)] backdrop-blur-xl text-[var(--text-primary)] shadow-[0_10px_30px_var(--glass-shadow-drop)] hover:bg-[var(--glass-bg-end)] hover:border-[var(--glass-border-hover)] ';
  } else if (variant === 'contained') {
    baseClass += 'bg-accent text-black shadow-[0_4px_14px_0_rgba(16,185,129,0.39)] hover:brightness-110 hover:-translate-y-px hover:scale-[1.02] hover:shadow-[0_6px_20px_rgba(16,185,129,0.5)] ';
  } else if (variant === 'outlined') {
    baseClass += 'bg-transparent border border-[var(--border-strong)] text-[var(--text-primary)] hover:bg-[var(--bg-elevated)] ';
  } else {
    baseClass += 'bg-transparent text-[var(--text-primary)] hover:bg-[var(--bg-elevated)] ';
  }
  
  return (
    <button
      className={`${baseClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
