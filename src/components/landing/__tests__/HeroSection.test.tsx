import React from 'react';
import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import messages from '../../../../messages/en.json';
import HeroSection from '../HeroSection';

function renderWithIntl(ui: React.ReactElement) {
  return render(
    <NextIntlClientProvider locale="en" messages={messages}>
      {ui}
    </NextIntlClientProvider>
  );
}

describe('HeroSection', () => {
  beforeEach(() => {
    renderWithIntl(<HeroSection />);
  });

  it('renders the status badge', () => {
    expect(screen.getByText(/Enterprise Platform/i)).toBeInTheDocument();
  });

  it('renders the main headline', () => {
    expect(screen.getByText(/The future of/i)).toBeInTheDocument();
    expect(screen.getByText(/digital banking/i)).toBeInTheDocument();
    expect(screen.getByText(/starts here/i)).toBeInTheDocument();
  });

  it('renders the explore platforms CTA', () => {
    expect(screen.getByRole('link', { name: /Explore Platforms/i })).toBeInTheDocument();
  });

  it('renders the trust stats', () => {
    expect(screen.getByText(/99\.99%/)).toBeInTheDocument();
    expect(screen.getByText(/50M\+/)).toBeInTheDocument();
    expect(screen.getByText(/SOC 2/)).toBeInTheDocument();
  });
});
