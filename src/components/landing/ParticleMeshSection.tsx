'use client';

import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';

// -------------------------------------------------------------------
// Particle Mesh Section — flowing wave with mouse interaction
// -------------------------------------------------------------------

interface Particle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
}

export default function ParticleMeshSection() {
  const t = useTranslations('ParticleMeshSection');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number>(0);
  const isInView = useInView(sectionRef, { margin: '-10%' });
  const [dimensions, setDimensions] = useState({ w: 0, h: 0 });

  const statsList = useMemo(() => [
    { value: '< 50ms', label: t('avgLatency') },
    { value: '15+', label: t('countries') },
    { value: '5 Nines', label: t('availability') },
  ], [t]);

  const initParticles = useCallback((width: number, height: number) => {
    const particles: Particle[] = [];
    const cols = Math.floor(width / 18);
    const rows = Math.floor(height / 18);

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const x = (i / cols) * width + (Math.random() - 0.5) * 8;
        const y = (j / rows) * height + (Math.random() - 0.5) * 8;

        // Create a wave shape — particles in the center-right are denser
        const nx = x / width;
        const ny = y / height;
        const waveInfluence = Math.sin(nx * Math.PI * 2) * 0.5 + 0.5;
        const centerDist = Math.abs(ny - 0.5) * 2;

        if (Math.random() > 0.3 + centerDist * 0.3 - waveInfluence * 0.2) {
          const isGreen = Math.random() > 0.4;
          particles.push({
            x,
            y,
            baseX: x,
            baseY: y,
            vx: 0,
            vy: 0,
            size: 1 + Math.random() * 1.5,
            color: isGreen
              ? `rgba(16, 185, 129, ${0.3 + Math.random() * 0.5})`
              : `rgba(6, 182, 212, ${0.2 + Math.random() * 0.4})`,
            alpha: 0.3 + Math.random() * 0.5,
          });
        }
      }
    }
    particlesRef.current = particles;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    const handleResize = () => {
      const rect = section.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      const ctx = canvas.getContext('2d');
      if (ctx) ctx.scale(dpr, dpr);
      setDimensions({ w: rect.width, h: rect.height });
      initParticles(rect.width, rect.height);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [initParticles]);

  // Mouse tracking relative to section
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    section.addEventListener('mousemove', handleMouseMove);
    section.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      section.removeEventListener('mousemove', handleMouseMove);
      section.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Animation loop
  useEffect(() => {
    if (!isInView) {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.008;

      const particles = particlesRef.current;
      const mouse = mouseRef.current;
      const mouseRadius = 150;

      // Update particles
      for (const p of particles) {
        // Wave motion
        const waveX = Math.sin(time + p.baseY * 0.008) * 15;
        const waveY = Math.cos(time * 0.7 + p.baseX * 0.005) * 10;

        // Mouse repulsion
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let forceX = 0;
        let forceY = 0;
        if (dist < mouseRadius && dist > 0) {
          const force = (1 - dist / mouseRadius) * 60;
          forceX = -(dx / dist) * force;
          forceY = -(dy / dist) * force;
        }

        // Target position with wave
        const targetX = p.baseX + waveX + forceX;
        const targetY = p.baseY + waveY + forceY;

        // Smooth spring
        p.vx += (targetX - p.x) * 0.04;
        p.vy += (targetY - p.y) * 0.04;
        p.vx *= 0.85;
        p.vy *= 0.85;
        p.x += p.vx;
        p.y += p.vy;
      }

      // Draw connections
      const connectionDist = 35;
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < connectionDist) {
            const opacity = (1 - dist / connectionDist) * 0.15;
            ctx.strokeStyle = `rgba(16, 185, 129, ${opacity})`;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw particles
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isInView, dimensions]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.8, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] },
    },
  };

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        background: 'var(--bg-base)',
        overflow: 'hidden',
      }}
    >
      {/* Canvas for particle mesh — full bleed */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Gradient mask — left side fades for text readability */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(90deg, var(--bg-base) 0%, var(--bg-base) 30%, rgba(var(--bg-base-rgb), 0.6) 55%, transparent 75%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-10%' }}
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '1400px',
          width: '100%',
          margin: '0 auto',
          padding: '120px 48px',
        }}
      >
        <div style={{ maxWidth: '560px' }}>
          {/* Badge */}
          <motion.div
            variants={itemVariants}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '8px 20px',
              borderRadius: '999px',
              background:
                'linear-gradient(135deg, rgba(var(--accent-rgb),0.08) 0%, rgba(6,182,212,0.05) 100%)',
              border: '1px solid rgba(var(--accent-rgb),0.15)',
              marginBottom: '32px',
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: 'var(--accent)',
                boxShadow: '0 0 10px rgba(var(--accent-rgb),0.6)',
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-geist-mono), monospace',
                fontSize: '11px',
                color: 'rgba(var(--accent-rgb),0.9)',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                fontWeight: 500,
              }}
            >
              {t('globalInfrastructure')}
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            variants={itemVariants}
            style={{
              fontFamily: 'var(--font-syne), sans-serif',
              fontSize: 'clamp(36px, 5vw, 64px)',
              fontWeight: 700,
              color: 'var(--text-primary)',
              lineHeight: 1.1,
              letterSpacing: '-0.035em',
              marginBottom: '24px',
            }}
          >
            {t('poweringThe')}
            <br />
            <span
              style={{
                background: 'linear-gradient(135deg, var(--accent) 0%, #06b6d4 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {t('nextGeneration')}
            </span>
            <br />
            {t('ofFinance')}
          </motion.h2>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            style={{
              fontSize: 'clamp(15px, 1.5vw, 18px)',
              color: 'rgba(var(--color-invert-rgb), 0.45)',
              lineHeight: 1.7,
              maxWidth: '460px',
              marginBottom: '40px',
            }}
          >
            {t('description')}
          </motion.p>

          {/* Stats row */}
          <motion.div
            variants={itemVariants}
            style={{
              display: 'flex',
              gap: '40px',
              marginBottom: '40px',
            }}
          >
            {statsList.map((stat, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <span
                  style={{
                    fontSize: '24px',
                    fontWeight: 700,
                    color: 'var(--accent)',
                    fontFamily: 'var(--font-geist-mono), monospace',
                    letterSpacing: '-0.02em',
                  }}
                >
                  {stat.value}
                </span>
                <span
                  style={{
                    fontSize: '12px',
                    color: 'rgba(var(--color-invert-rgb), 0.35)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                  }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div variants={itemVariants}>
            <a
              href="#architecture"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '14px 28px',
                background: 'rgba(var(--color-invert-rgb), 0.06)',
                border: '1px solid rgba(var(--color-invert-rgb), 0.1)',
                color: 'rgba(var(--color-invert-rgb), 0.8)',
                fontFamily: 'var(--font-geist-sans), sans-serif',
                fontSize: '14px',
                fontWeight: 600,
                borderRadius: '12px',
                textDecoration: 'none',
                transition: 'all 0.3s cubic-bezier(0.23, 1, 0.32, 1)',
                letterSpacing: '-0.01em',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(var(--color-invert-rgb), 0.1)';
                e.currentTarget.style.borderColor = 'rgba(var(--color-invert-rgb), 0.2)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(var(--color-invert-rgb), 0.06)';
                e.currentTarget.style.borderColor = 'rgba(var(--color-invert-rgb), 0.1)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {t('viewArchitecture')}
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
