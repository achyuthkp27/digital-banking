'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { label: 'Products', href: '/#products' },
  { label: 'Architecture', href: '/#architecture' },
  { label: 'Security', href: '/#security' },
  { label: 'Technology', href: '/#technology' },
];

export default function Navbar() {
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
        background: 'rgba(3, 7, 18, 0.8)',
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
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          alignItems: 'center',
        }}
      >
        {/* Left: Logo */}
        <div style={{ justifySelf: 'start' }}>
        <Link 
          href="/" 
          onMouseEnter={() => setIsLogoHovered(true)}
          onMouseLeave={() => setIsLogoHovered(false)}
          style={{ display: 'flex', alignItems: 'center', gap: '4px', textDecoration: 'none' }}
        >
          <motion.div style={{ display: 'flex', alignItems: 'center', fontSize: '24px', fontWeight: 800, letterSpacing: '-0.03em' }}>
            {/* D -> Digital */}
            <span style={{ color: 'var(--text-primary)' }}>D</span>
            <AnimatePresence>
              {isLogoHovered && (
                <motion.span
                  initial={{ width: 0, opacity: 0, y: 15 }}
                  animate={{ width: 'auto', opacity: 1, y: 0 }}
                  exit={{ width: 0, opacity: 0, y: 15 }}
                  transition={{ type: 'spring', bounce: 0.5, duration: 0.6 }}
                  style={{ color: 'var(--text-primary)', display: 'inline-block', whiteSpace: 'nowrap', overflow: 'hidden' }}
                >
                  igital
                </motion.span>
              )}
            </AnimatePresence>
            
            {/* B -> Banking */}
            <span style={{ color: 'var(--accent)', marginLeft: isLogoHovered ? '6px' : '0px', transition: 'margin 0.3s ease' }}>B</span>
            <AnimatePresence>
              {isLogoHovered && (
                <motion.span
                  initial={{ width: 0, opacity: 0, y: 15 }}
                  animate={{ width: 'auto', opacity: 1, y: 0 }}
                  exit={{ width: 0, opacity: 0, y: 15 }}
                  transition={{ type: 'spring', bounce: 0.5, duration: 0.6, delay: 0.05 }}
                  style={{ color: 'var(--accent)', display: 'inline-block', whiteSpace: 'nowrap', overflow: 'hidden' }}
                >
                  anking
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>
          
          <span
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: 'var(--accent)',
              display: 'inline-block',
              marginBottom: '4px',
              marginLeft: '2px',
            }}
          />
        </Link>
        </div>

        {/* Center: Nav Links */}
        <div style={{ display: 'flex', gap: '32px', justifySelf: 'center' }}>
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              style={{
                color: 'var(--text-secondary)',
                fontSize: '14px',
                fontWeight: 500,
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Right: CTA */}
        <div style={{ justifySelf: 'end' }}>
          <button
            className="pill-button pill-button-secondary"
            style={{ fontSize: '14px', padding: '10px 24px' }}
          >
            Request Demo
          </button>
        </div>
      </div>
    </nav>
  );
}
