'use client';

import React, { useEffect, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

interface Props {
  value: number;
  duration?: number;
  decimals?: number;
}

export default function AnimatedCounter({ value, duration = 2, decimals = 0 }: Props) {
  const [inView, setInView] = useState(false);
  const ref = React.useRef<HTMLSpanElement>(null);
  
  // Spring to animate the value smoothly
  const springValue = useSpring(0, {
    bounce: 0,
    duration: duration * 1000
  });

  // Observe when the counter comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.disconnect();
      }
    }, { threshold: 0.1 });
    
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // Trigger animation
  useEffect(() => {
    if (inView) {
      springValue.set(value);
    }
  }, [inView, value, springValue]);

  // Format the number to a string
  const displayValue = useTransform(springValue, (current) => 
    current.toFixed(decimals)
  );

  return <motion.span ref={ref}>{displayValue}</motion.span>;
}
