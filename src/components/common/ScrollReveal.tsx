'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';

type RevealTag = 'div' | 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4';

const REVEAL_EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Smokey blur reveal: content emerges from a soft blur (and slight rise) as it
 * scrolls into view. Honours `prefers-reduced-motion` (renders instantly, no
 * blur/transform). Markup-safe — wraps arbitrary children and can render any
 * heading/paragraph tag via `as`, so existing styles are preserved.
 */
interface BlurRevealProps extends Omit<HTMLMotionProps<'div'>, 'ref'> {
  children: React.ReactNode;
  as?: RevealTag;
  delay?: number;
  duration?: number;
  blur?: number;
  y?: number;
  once?: boolean;
}

export function BlurReveal({
  children,
  as = 'div',
  delay = 0,
  duration = 0.9,
  blur = 12,
  y = 18,
  once = true,
  ...props
}: BlurRevealProps) {
  const reduce = useReducedMotion();
  const Comp = motion[as] as typeof motion.div;

  const variants = reduce
    ? {
        hidden: { opacity: 1, filter: 'blur(0px)', y: 0 },
        visible: { opacity: 1, filter: 'blur(0px)', y: 0 },
      }
    : {
        hidden: { opacity: 0, filter: `blur(${blur}px)`, y },
        visible: { opacity: 1, filter: 'blur(0px)', y: 0 },
      };

  return (
    <Comp
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-80px' }}
      transition={{ duration, delay, ease: REVEAL_EASE }}
      {...props}
    >
      {children}
    </Comp>
  );
}

/**
 * Word-by-word smokey blur reveal for a plain-string heading: each word
 * sharpens out of a blur in sequence, like text emerging from smoke. Use only
 * with plain strings (no inner markup); for headings with spans/line-breaks use
 * <BlurReveal as="h2"> instead. Preserves the heading tag's own styling.
 */
interface BlurTextProps {
  text: string;
  as?: RevealTag;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  stagger?: number;
  blur?: number;
  once?: boolean;
}

export function BlurText({
  text,
  as: Tag = 'h2',
  className,
  style,
  delay = 0,
  stagger = 0.09,
  blur = 14,
  once = true,
}: BlurTextProps) {
  const reduce = useReducedMotion();
  const words = text.split(' ');

  const container = {
    hidden: {},
    visible: {
      transition: { staggerChildren: reduce ? 0 : stagger, delayChildren: delay },
    },
  };
  const child = reduce
    ? { hidden: { opacity: 1, filter: 'blur(0px)', y: 0 }, visible: { opacity: 1, filter: 'blur(0px)', y: 0 } }
    : {
        hidden: { opacity: 0, filter: `blur(${blur}px)`, y: 8 },
        visible: {
          opacity: 1,
          filter: 'blur(0px)',
          y: 0,
          transition: { duration: 0.7, ease: REVEAL_EASE },
        },
      };

  return (
    <Tag className={className} style={style}>
      <motion.span
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once, margin: '-80px' }}
        style={{ display: 'inline' }}
      >
        {words.map((word, i) => (
          <motion.span
            key={i}
            variants={child}
            style={{ display: 'inline-block', willChange: 'filter, transform, opacity' }}
          >
            {word}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        ))}
      </motion.span>
    </Tag>
  );
}

interface ScrollRevealProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  distance?: number;
  duration?: number;
  once?: boolean;
}

export default function ScrollReveal({
  children,
  delay = 0,
  direction = 'up',
  distance = 30,
  duration = 0.6,
  once = true,
  ...props
}: ScrollRevealProps) {
  const directionOffset = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        ...directionOffset[direction],
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      viewport={{ once, margin: '-60px' }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

interface TextRevealProps {
  text: string;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  staggerDelay?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function TextReveal({
  text,
  tag: Tag = 'p',
  staggerDelay = 0.04,
  className,
  style,
}: TextRevealProps) {
  const words = text.split(' ');
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };
  const child = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      className={className}
      style={style}
    >
      <Tag style={{ display: 'flex', flexWrap: 'wrap' }}>
        {words.map((word, idx) => (
          <motion.span
            key={idx}
            variants={child}
            style={{ marginRight: '0.3em', whiteSpace: 'nowrap' }}
          >
            {word}
          </motion.span>
        ))}
      </Tag>
    </motion.div>
  );
}

interface StaggerContainerProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  staggerDelay?: number;
  once?: boolean;
}

export function StaggerContainer({
  children,
  staggerDelay = 0.08,
  once = true,
  ...props
}: StaggerContainerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-60px' }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  ...props
}: HTMLMotionProps<'div'> & { children: React.ReactNode }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1] as const,
          },
        },
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
