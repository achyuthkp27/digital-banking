'use client';

import React from 'react';
import { Button as MuiButton, ButtonProps as MuiButtonProps } from '@mui/material';

export interface ButtonProps extends Omit<MuiButtonProps, 'variant'> {
  variant?: 'contained' | 'outlined' | 'text' | 'glass';
  pill?: boolean;
}

export function Button({ variant = 'contained', pill = false, sx, children, ...props }: ButtonProps) {
  // If 'glass' variant is passed, we apply specific styles
  const isGlass = variant === 'glass';
  
  return (
    <MuiButton
      variant={isGlass ? 'outlined' : variant}
      sx={{
        borderRadius: pill ? '9999px' : '12px',
        textTransform: 'none',
        fontWeight: 600,
        px: 4,
        py: 1.5,
        ...(isGlass && {
          background: 'rgba(var(--color-invert-rgb), 0.08)',
          border: '1px solid rgba(var(--color-invert-rgb), 0.1)',
          backdropFilter: 'blur(20px)',
          color: 'var(--text-primary)',
          boxShadow: '0 10px 30px rgba(var(--color-base-rgb), 0.3)',
          '&:hover': {
            background: 'rgba(var(--color-invert-rgb), 0.12)',
          }
        }),
        ...(variant === 'contained' && {
          background: 'var(--accent)',
          color: '#000',
          boxShadow: '0 4px 14px 0 rgba(var(--accent-rgb), 0.39)',
          '&:hover': {
            background: 'var(--accent)',
            filter: 'brightness(1.1)',
            transform: 'translateY(-1px) scale(1.02)',
            boxShadow: '0 6px 20px rgba(var(--accent-rgb), 0.5)',
          }
        }),
        ...sx,
      }}
      {...props}
    >
      {children}
    </MuiButton>
  );
}
