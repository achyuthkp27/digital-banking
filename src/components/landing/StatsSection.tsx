'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 99.99, suffix: '%', label: 'System Uptime', format: (v: number) => v.toFixed(2) },
  { value: 100, prefix: '<', suffix: 'ms', label: 'API Response', format: (v: number) => Math.round(v).toString() },
  { value: 1, suffix: 'M+', label: 'Requests/Min', format: (v: number) => Math.round(v).toString() },
  { value: 256, suffix: '-bit', label: 'AES Encryption', format: (v: number) => Math.round(v).toString() },
];

export default function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    numberRefs.current.forEach((el, index) => {
      if (!el) return;
      const stat = stats[index];
      const startValue = stat.value > 10 ? 0 : (stat.value > 1 ? 0 : 99.0);
      
      gsap.fromTo(
        el,
        { innerHTML: startValue },
        {
          innerHTML: stat.value,
          duration: 2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
          onUpdate: function () {
            const val = Number(this.targets()[0].innerHTML);
            this.targets()[0].innerHTML = `${stat.prefix || ''}${stat.format(val)}${stat.suffix || ''}`;
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        background: 'var(--bg-surface)',
        borderTop: '1px solid var(--border-subtle)',
        borderBottom: '1px solid var(--border-subtle)',
        padding: '100px 0',
      }}
    >
      <div className="container">
        <div
          className="stats-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '32px',
            textAlign: 'center',
          }}
        >
          {stats.map((stat, idx) => (
            <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span
                ref={el => { numberRefs.current[idx] = el; }}
                style={{
                  fontSize: '48px',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-syne), sans-serif',
                  marginBottom: '8px',
                  lineHeight: 1,
                  display: 'inline-block',
                  whiteSpace: 'nowrap'
                }}
              >
                0
              </span>
              <span
                style={{
                  fontSize: '13px',
                  color: 'var(--text-secondary)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  fontWeight: 600,
                }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 992px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 64px 32px !important;
          }
        }
        @media (max-width: 600px) {
          .stats-grid {
            grid-template-columns: 1fr !important;
            gap: 64px !important;
          }
        }
      `}} />
    </section>
  );
}
