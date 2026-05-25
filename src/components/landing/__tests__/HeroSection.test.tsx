import { render, screen } from '@testing-library/react';
import HeroSection from '../HeroSection';

describe('HeroSection', () => {
  beforeEach(() => {
    render(<HeroSection />);
  });

  it('renders the hero section', () => {
    expect(screen.getByText(/Enterprise Digital Banking Platform/i)).toBeInTheDocument();
  });

  it('renders the main headline', () => {
    expect(screen.getByText(/Transform Your/i)).toBeInTheDocument();
    expect(screen.getByText(/Banking Experience/i)).toBeInTheDocument();
  });

  it('renders the CTA buttons', () => {
    expect(screen.getByRole('button', { name: /Explore Platform/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Watch Demo/i })).toBeInTheDocument();
  });

  it('renders the stats section', () => {
    expect(screen.getByText(/99.9%/)).toBeInTheDocument();
    expect(screen.getByText(/10M+/)).toBeInTheDocument();
    expect(screen.getByText(/<2s/)).toBeInTheDocument();
  });
});
