'use client';

import React from 'react';
import { Canvas, CanvasProps } from '@react-three/fiber';
import { useDeviceCapabilities } from '@/hooks/useDeviceCapabilities';
import { ErrorBoundary } from './ErrorBoundary';
import { motion } from 'framer-motion';

interface AdaptiveCanvasProps extends Omit<CanvasProps, 'children'> {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}



export function AdaptiveCanvas({ children, fallback, ...props }: AdaptiveCanvasProps) {
  const { isLowEndDevice } = useDeviceCapabilities();
  const [dpr, setDpr] = React.useState(1.5);

  const defaultFallback = (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'radial-gradient(circle at center, rgba(16, 185, 129, 0.1) 0%, transparent 70%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <motion.div
        animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          width: '60%',
          height: '60%',
          borderRadius: '50%',
          background: 'radial-gradient(circle at center, rgba(16, 185, 129, 0.2) 0%, transparent 60%)',
          filter: 'blur(40px)',
        }}
      />
    </div>
  );

  const fallbackUI = fallback || defaultFallback;

  if (isLowEndDevice) {
    return <>{fallbackUI}</>;
  }

  return (
    <ErrorBoundary fallback={fallbackUI}>
      <Canvas dpr={dpr} {...props}>
        {children}
      </Canvas>
    </ErrorBoundary>
  );
}
