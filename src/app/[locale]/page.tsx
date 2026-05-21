import React from 'react';
import { setRequestLocale } from 'next-intl/server';
import Navbar from '@/components/landing/Navbar';
import HeroSection from '@/components/landing/HeroSection';
import CinematicAppFlow from '@/components/illustrations/CinematicAppFlow';
import MarqueeSection from '@/components/landing/MarqueeSection';
import PlatformHighlights from '@/components/landing/PlatformHighlights';
import SmartCardsSection from '@/components/landing/SmartCardsSection';
import ProductShowcase from '@/components/landing/ProductShowcase';
import ParticleMeshSection from '@/components/landing/ParticleMeshSection';
import SecuritySection from '@/components/landing/SecuritySection';
import ArchitectureSection from '@/components/landing/ArchitectureSection';
import TechStackSection from '@/components/landing/TechStackSection';
import StatsSection from '@/components/landing/StatsSection';
import WhyChooseSection from '@/components/landing/WhyChooseSection';
import Footer from '@/components/landing/Footer';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  setRequestLocale(await (await params).locale);
  return (
    <main
      style={{
        minHeight: '100vh',
        background: 'var(--bg-base)',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Navbar />

      {/* ═══ HERO SECTION ═══ */}
      <HeroSection />

      {/* ═══ CINEMATIC APP FLOW ═══ */}
      <CinematicAppFlow />

      {/* ═══ REST OF LANDING PAGE ═══ */}
      <MarqueeSection />
      <PlatformHighlights />
      <SmartCardsSection />
      <ProductShowcase />

      {/* ═══ PARTICLE MESH — GLOBAL INFRASTRUCTURE ═══ */}
      <ParticleMeshSection />
      <WhyChooseSection />
      <SecuritySection />
      <ArchitectureSection />
      <TechStackSection />
      <StatsSection />
      <Footer />
    </main>
  );
}
