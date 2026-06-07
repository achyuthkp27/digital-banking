'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Link } from '@/i18n/routing';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeToggle } from '@/components/common/ThemeToggle';
import { LanguageSwitcher } from '@/components/common/LanguageSwitcher';
import { Menu, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { createFocusTrap } from 'focus-trap';

export default function Navbar() {
  const t = useTranslations('Navigation');
  const tBrand = useTranslations('Brand');
  const [scrolled, setScrolled] = useState(false);
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
    // Prevent body scroll when menu is open
    document.body.style.overflow = !isMenuOpen ? 'hidden' : '';
  };

  const handleKeyDown = React.useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape' && isMenuOpen) {
      handleMenuToggle();
    }
    // Close menu when clicking outside
    if (!isMenuOpen && e.key === 'Tab' && e.shiftKey) {
      // Handle shift+tab for accessibility
    }
  }, [isMenuOpen]);

  useEffect(() => {
    if (isMenuOpen) {
      document.addEventListener('keydown', handleKeyDown);
      // Initialize focus trap when menu opens
      const focusTrap = createFocusTrap(menuRef.current!, {
        escapeDeactivates: true,
        returnFocusOnDeactivate: true,
      });
      focusTrap.activate();
      
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        // Deactivate focus trap when menu closes
        focusTrap.deactivate();
      };
    }
  }, [isMenuOpen, handleKeyDown]);

  return (
    <>
      {/* Skip to content link */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

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
          <>
            <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-start' }}>
              <Link
                href="/"
                aria-label="Digital Banking Home"
                onMouseEnter={() => setIsLogoHovered(true)}
                onMouseLeave={() => setIsLogoHovered(false)}
                onClick={(e) => {
                  const path = window.location.pathname;
                  if (
                    path === '/' ||
                    path === '/en' ||
                    path === '/es' ||
                    path === '/fr' ||
                    path === '/en/' ||
                    path === '/es/' ||
                    path === '/fr/'
                  ) {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  textDecoration: 'none',
                }}
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
                  {}
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

                  {}
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

            {/* Desktop Navigation */}
            <div className="hidden md:flex" style={{ gap: '32px', justifyContent: 'center' }}>
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

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={handleMenuToggle}
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                aria-controls="mobile-menu"
                aria-expanded={isMenuOpen}
                className="p-2 rounded-full hover:bg-[var(--bg-elevated)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
              >
                {isMenuOpen ? <X size={24} strokeWidth={1.5} /> : <Menu size={24} strokeWidth={1.5} />}
              </button>
            </div>


          </>

          {/* Right side Actions */}
          <div
            className="hidden md:flex"
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-999 flex items-center justify-center bg-[var(--bg-base-rgb)]/90 backdrop-blur-sm"
          onClick={handleMenuToggle}
        >
          <div
            ref={menuRef}
            className="relative z-10 w-full max-w-md p-6 bg-[var(--bg-surface)]/95 backdrop-blur-xl border border-[var(--border-default)] rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Create focus trap ref */}
            <div ref={menuRef}>
              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <h2 className="text-xl font-bold text-[var(--text-primary)]">{tBrand('appName')}</h2>
                  <button
                    onClick={handleMenuToggle}
                    aria-label="Close menu"
                    className="p-2 rounded-full hover:bg-[var(--bg-elevated)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                  >
                    <X size={20} strokeWidth={1.5} />
                  </button>
                </div>

                <nav className="space-y-4">
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
                          const yOffset = element.getBoundingClientRect().top + window.scrollY - 72;
                          window.scrollTo({ top: yOffset, behavior: 'smooth' });
                          handleMenuToggle(); // Close menu after navigation
                        }
                      }}
                      style={{
                        display: 'block',
                        padding: '12px 16px',
                        borderRadius: '12px',
                        color: 'var(--text-primary)',
                        fontSize: '16px',
                        fontWeight: 500,
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--bg-elevated)';
                        e.currentTarget.style.color = 'var(--text-primary)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = 'var(--text-primary)';
                      }}
                    >
                      {t(item.key)}
                    </Link>
                  ))}
                </nav>

                <div className="mt-6 pt-4 flex items-center justify-between border-t border-[var(--border-subtle)]">
                  <LanguageSwitcher />
                  <ThemeToggle />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
