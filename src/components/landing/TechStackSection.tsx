'use client';

import React from 'react';
import { useTranslations } from 'next-intl';

export default function TechStackSection() {
  const t = useTranslations('TechStack');

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
  return (
    <section id="technology" className="section container">
      <div style={{ textAlign: 'center', marginBottom: '80px' }}>
        <h2
          style={{
            fontSize: 'clamp(32px, 8vw, 48px)',
            fontWeight: 700,
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-syne), sans-serif',
            lineHeight: 1.2,
          }}
        >
          {t('title')}
        </h2>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '900px',
          margin: '0 auto',
        }}
      >
        <div style={{ width: '100%', height: '1px', background: 'var(--border-subtle)' }} />

        {techCategories.map((category, idx) => (
          <div key={idx}>
            <div
              className="tech-row"
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '32px 0',
                gap: '48px',
              }}
            >
              <div style={{ flex: '0 0 120px' }}>
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

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', flex: 1 }}>
                {category.technologies.map((tech, tIdx) => (
                  <span
                    key={tIdx}
                    className="tech-pill"
                    style={{
                      background: 'var(--bg-elevated)',
                      border: '1px solid var(--border-subtle)',
                      color: 'var(--text-primary)',
                      fontSize: '13px',
                      fontWeight: 500,
                      borderRadius: '999px',
                      padding: '8px 20px',
                      transition: 'all 0.2s ease',
                      cursor: 'default',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border-strong)';
                      e.currentTarget.style.color = 'var(--text-primary)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border-subtle)';
                      e.currentTarget.style.color = 'var(--text-secondary)';
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ width: '100%', height: '1px', background: 'var(--border-subtle)' }} />
          </div>
        ))}
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
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
