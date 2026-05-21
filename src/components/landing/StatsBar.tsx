'use client';

import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import AnimatedCounter from '../common/AnimatedCounter';
import GlassCard from '../common/GlassCard';
import ScrollReveal, { StaggerContainer, StaggerItem } from '../common/ScrollReveal';

const stats = [
  { value: 99.9, suffix: '%', label: 'Uptime SLA', decimals: 1 },
  { value: 10, suffix: 'M+', label: 'Transactions/Day', decimals: 0 },
  { value: 2, prefix: '<', suffix: 's', label: 'Response Time', decimals: 0 },
];

const StatsBar: React.FC = () => {
  return (
    <Box sx={{ py: { xs: 6, md: 8 }, position: 'relative' }}>
      <Container maxWidth="lg">
        <StaggerContainer>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
              gap: 3,
            }}
          >
            {stats.map((stat, idx) => (
              <StaggerItem key={stat.label}>
                <GlassCard
                  hover
                  sx={{
                    p: { xs: 3, md: 4 },
                    textAlign: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <Box sx={{ position: 'relative', zIndex: 1 }}>
                    <Typography
                      sx={{
                        fontSize: { xs: '2.5rem', md: '3rem' },
                        fontWeight: 800,
                        letterSpacing: '-0.03em',
                        color: '#F9FAFB',
                        lineHeight: 1,
                        mb: 1,
                      }}
                    >
                      {stat.prefix || ''}
                      <AnimatedCounter
                        value={stat.value}
                        duration={2.5}
                        decimals={stat.decimals}
                      />
                      {stat.suffix}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: '0.85rem',
                        fontWeight: 500,
                        color: 'text.secondary',
                        letterSpacing: '0.5px',
                      }}
                    >
                      {stat.label}
                    </Typography>
                  </Box>

                  {/* Decorative gradient */}
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: '-40%',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '200px',
                      height: '100px',
                      borderRadius: '50%',
                      background: idx === 0
                        ? 'radial-gradient(circle, rgba(var(--accent-rgb),0.1) 0%, transparent 70%)'
                        : idx === 1
                        ? 'radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)'
                        : 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)',
                      pointerEvents: 'none',
                    }}
                  />
                </GlassCard>
              </StaggerItem>
            ))}
          </Box>
        </StaggerContainer>
      </Container>
    </Box>
  );
};

export default StatsBar;
