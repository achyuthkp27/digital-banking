'use client';

import React from 'react';
import { Box, Typography, Chip } from '@mui/material';
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
  light = false,
  gradientText = false,
}) => {
  return (
    <Box
      sx={{
        textAlign: align,
        mb: { xs: 6, md: 8 },
        display: 'flex',
        flexDirection: 'column',
        alignItems: align === 'center' ? 'center' : 'flex-start',
      }}
    >
      {badge && (
        <ScrollReveal delay={0}>
          <Chip
            label={badge}
            sx={{
              mb: 2.5,
              px: 2,
              py: 0.5,
              fontSize: '0.7rem',
              fontWeight: 700,
              letterSpacing: '2px',
              textTransform: 'uppercase',
              background: 'rgba(var(--accent-rgb), 0.08)',
              border: '1px solid rgba(var(--accent-rgb), 0.3)',
              color: 'var(--accent)',
              borderRadius: '20px',
              '& .MuiChip-label': {
                px: 1,
              },
            }}
          />
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
          color: light ? '#F9FAFB' : '#F9FAFB',
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
          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              maxWidth: '600px',
              lineHeight: 1.8,
              fontSize: { xs: '0.95rem', md: '1.05rem' },
            }}
          >
            {subtitle}
          </Typography>
        </ScrollReveal>
      )}
    </Box>
  );
};

export default SectionHeading;
