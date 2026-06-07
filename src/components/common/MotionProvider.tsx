'use client';

import React from 'react';
import { MotionConfig } from 'framer-motion';

/**
 * Makes every Framer Motion animation honour the user's OS
 * "reduce motion" setting. Pairs with the global
 * `@media (prefers-reduced-motion: reduce)` block in globals.css that
 * neutralises CSS-driven animations (marquee, keyframes, transitions).
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
