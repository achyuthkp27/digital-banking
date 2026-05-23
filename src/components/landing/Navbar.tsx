'use client';

import React, { useState, useEffect } from 'react';
import { Link } from '@/i18n/routing';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeToggle } from '@/components/common/ThemeToggle';
import { LanguageSwitcher } from '@/components/common/LanguageSwitcher';
import { useTranslations } from 'next-intl';

export default function Navbar() {
  const t = useTranslations('Navigation');
  const tBrand = useTranslations('Brand');
  const [scrolled, setScrolled] = useState(false);
  const [isLogoHovered, setIsLogoHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: 'rgba(var(--bg-base-rgb), 0.8)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: `1px solid ${scrolled ? 'var(--border-default)' : 'var(--border-subtle)'}`,
        transition: 'border-color 0.3s ease',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px',
          height: '72px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {/* Left: Logo */}
        <div style={{ justifySelf: 'start' }}>
          <Link
            href="/"
            aria-label="Digital Banking Home"
            onMouseEnter={() => setIsLogoHovered(true)}
            onMouseLeave={() => setIsLogoHovered(false)}
            onClick={(e) => {
              const path = window.location.pathname;
              if (path === '/' || path === '/en' || path === '/es' || path === '/fr' || path === '/en/' || path === '/es/' || path === '/fr/') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            style={{ display: 'flex', alignItems: 'center', gap: '4px', textDecoration: 'none' }}
          >
            <motion.div
              style={{
                display: 'flex',
                alignItems: 'center',
                fontSize: '24px',
                fontWeight: 800,
                letterSpacing: '-0.03em',
              }}
            >
              {/* Word 1 */}
              <span style={{ color: 'var(--text-primary)' }}>{tBrand('word1First')}</span>
              <AnimatePresence>
                {isLogoHovered && (
                  <motion.span
                    initial={{ width: 0, opacity: 0, y: 15 }}
                    animate={{ width: 'auto', opacity: 1, y: 0 }}
                    exit={{ width: 0, opacity: 0, y: 15 }}
                    transition={{ type: 'spring', bounce: 0.5, duration: 0.6 }}
                    style={{
                      color: 'var(--text-primary)',
                      display: 'inline-block',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                    }}
                  >
                    {tBrand('word1Rest')}
                  </motion.span>
                )}
              </AnimatePresence>

              {/* Word 2 */}
              <span
                style={{
                  color: 'var(--accent)',
                  marginLeft: isLogoHovered ? '6px' : '0px',
                  transition: 'margin 0.3s ease',
                }}
              >
                {tBrand('word2First')}
              </span>
              <AnimatePresence>
                {isLogoHovered && (
                  <motion.span
                    initial={{ width: 0, opacity: 0, y: 15 }}
                    animate={{ width: 'auto', opacity: 1, y: 0 }}
                    exit={{ width: 0, opacity: 0, y: 15 }}
                    transition={{ type: 'spring', bounce: 0.5, duration: 0.6, delay: 0.05 }}
                    style={{
                      color: 'var(--accent)',
                      display: 'inline-block',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                    }}
                  >
                    {tBrand('word2Rest')}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          </Link>
        </div>

        {/* Center: Nav Links */}
        <div className="hidden md:flex" style={{ gap: '32px', justifySelf: 'center' }}>
          {[
            { key: 'products', href: '/#products' },
            { key: 'security', href: '/#security' },
            { key: 'architecture', href: '/#architecture' },
            { key: 'technology', href: '/#technology' },
          ].map((item) => (
            <Link
              key={item.key}
              href={item.href}
              onClick={(e) => {
                const targetId = item.href.replace('/#', '');
                const element = document.getElementById(targetId);
                if (element) {
                  e.preventDefault();
                  const yOffset = element.getBoundingClientRect().top + window.scrollY - 72; // 72px is navbar height
                  window.scrollTo({ top: yOffset, behavior: 'smooth' });
                }
              }}
              style={{
                color: 'var(--text-secondary)',
                fontSize: '14px',
                fontWeight: 500,
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
            >
              {t(item.key)}
            </Link>
          ))}
        </div>

        {/* Right: CTA and Theme Toggle */}
        <div style={{ justifySelf: 'end', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <LanguageSwitcher />
          <ThemeToggle />

        </div>
      </div>
    </nav>
  );
}
