'use client';

import React from 'react';
import { Box, BoxProps } from '@mui/material';

interface GlassCardProps extends BoxProps {
  hover?: boolean;
  glow?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
}

export default function GlassCard({ children, hover = false, glow, sx, ...props }: GlassCardProps) {
  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)',
        backdropFilter: 'blur(24px) saturate(120%)',
        border: '1px solid rgba(255, 255, 255, 0.06)',
        boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.12), 0 8px 32px rgba(0, 0, 0, 0.4)',
        borderRadius: '20px',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.3s cubic-bezier(0.23, 1, 0.32, 1)',
        ...(hover && {
          '&:hover': {
            transform: 'translateY(-4px)',
            borderColor: 'rgba(255, 255, 255, 0.15)',
            boxShadow: 'inset 0 1px 1px rgba(255, 255, 255, 0.25), 0 16px 40px -10px rgba(0,0,0,0.6)',
          }
        }),
        ...sx
      }}
      {...props}
    >
      {/* Subtle Noise Texture Overlay */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' opacity=\'0.08\'/%3E%3C/svg%3E")',
          zIndex: 0,
          pointerEvents: 'none',
          mixBlendMode: 'overlay'
        }}
      />
      <Box sx={{ position: 'relative', zIndex: 1, height: '100%' }}>
        {children}
      </Box>
    </Box>
  );
}
