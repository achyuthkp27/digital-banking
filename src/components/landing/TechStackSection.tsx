'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { BlurText } from '@/components/common/ScrollReveal';

const EASE = [0.16, 1, 0.3, 1] as const;

export default function TechStackSection() {
  const t = useTranslations('TechStack');
  const reduce = useReducedMotion();

  const techCategories = [
    {
      nameKey: 'frontend' as const,
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Redux', 'Next.js'],
    },
    {
      nameKey: 'backend' as const,
      technologies: ['Node.js', 'Express', 'Spring Boot', 'GraphQL', 'REST APIs'],
    },
    {
      nameKey: 'database' as const,
      technologies: ['PostgreSQL', 'MongoDB', 'Redis', 'Elasticsearch', 'Cassandra'],
    },
    {
      nameKey: 'devops' as const,
      technologies: ['Kubernetes', 'Docker', 'Jenkins', 'Terraform', 'ArgoCD'],
    },
    { nameKey: 'security' as const, technologies: ['OAuth 2.0', 'JWT', 'Vault', 'WAF', 'SIEM'] },
    {
      nameKey: 'messaging' as const,
      technologies: ['Apache Kafka', 'RabbitMQ', 'Redis Pub/Sub', 'WebSockets', 'gRPC'],
    },
  ];

  const rowReveal = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 24, filter: 'blur(8px)' },
          whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
          viewport: { once: true, margin: '-50px' },
          transition: { duration: 0.6, delay, ease: EASE },
        };

  const lineReveal = reduce
    ? {}
    : {
        initial: { scaleX: 0 },
        whileInView: { scaleX: 1 },
        viewport: { once: true, margin: '-40px' },
        transition: { duration: 0.9, ease: EASE },
      };

  const pillsContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: reduce ? 0 : 0.045, delayChildren: 0.1 } },
  };
  const pillItem = reduce
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 8, scale: 0.95, filter: 'blur(5px)' },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          transition: { duration: 0.45, ease: EASE },
        },
      };

  return (
    <section id="technology" className="section container">
      <div style={{ textAlign: 'center', marginBottom: '80px' }}>
        <BlurText
          as="h2"
          text={t('title')}
          style={{
            fontSize: 'clamp(32px, 8vw, 48px)',
            fontWeight: 700,
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-syne), sans-serif',
            lineHeight: 1.2,
          }}
        />
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '900px',
          margin: '0 auto',
        }}
      >
        <motion.div
          {...lineReveal}
          style={{
            width: '100%',
            height: '1px',
            background: 'var(--border-subtle)',
            transformOrigin: 'left',
          }}
        />

        {techCategories.map((category, idx) => (
          <div key={idx}>
            <motion.div
              {...rowReveal(idx * 0.06)}
              className="tech-row"
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '32px 0',
                gap: '48px',
              }}
            >
              <div
                style={{
                  flex: '0 0 150px',
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '12px',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-geist-mono), monospace',
                    color: 'var(--accent)',
                    fontSize: '12px',
                    fontWeight: 700,
                    letterSpacing: '0.05em',
                  }}
                >
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <span
                  style={{
                    color: 'var(--text-tertiary)',
                    fontSize: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    fontWeight: 600,
                  }}
                >
                  {t(category.nameKey)}
                </span>
              </div>

              <motion.div
                variants={pillsContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', flex: 1 }}
              >
                {category.technologies.map((tech, tIdx) => (
                  <motion.span
                    key={tIdx}
                    variants={pillItem}
                    whileHover={reduce ? undefined : { y: -3 }}
                    className="tech-pill"
                  >
                    {tech}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              {...lineReveal}
              style={{
                width: '100%',
                height: '1px',
                background: 'var(--border-subtle)',
                transformOrigin: 'left',
              }}
            />
          </div>
        ))}
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .tech-pill {
          background: var(--bg-elevated);
          border: 1px solid var(--border-subtle);
          color: var(--text-secondary);
          font-size: 13px;
          font-weight: 500;
          border-radius: 999px;
          padding: 8px 20px;
          cursor: default;
          transition: border-color 0.25s ease, color 0.25s ease, box-shadow 0.25s ease;
        }
        .tech-pill:hover {
          border-color: var(--accent-glow);
          color: var(--text-primary);
          box-shadow: 0 10px 24px -8px rgba(var(--accent-rgb), 0.3);
        }
        @media (max-width: 768px) {
          .tech-row {
            flex-direction: column;
            align-items: flex-start !important;
            gap: 24px !important;
          }
        }
      `,
        }}
      />
    </section>
  );
}
