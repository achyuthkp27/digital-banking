'use client';

import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface TypeText {
    tertiary: string;
  }
  interface TypeBackground {
    elevated: string;
  }
}

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#10B981',
      light: '#34D399',
      dark: '#059669',
      contrastText: '#000000',
    },
    secondary: {
      main: '#8B5CF6',
      light: '#A78BFA',
      dark: '#7C3AED',
    },
    background: {
      default: '#030712',
      paper: '#0a0a0a',
      elevated: '#111827',
    },
    text: {
      primary: '#ffffff',
      secondary: '#a1a1aa',
      tertiary: '#71717a',
      disabled: '#52525b',
    },
    divider: 'rgba(255, 255, 255, 0.1)',
  },
  typography: {
    fontFamily: 'var(--font-geist-sans), Geist, sans-serif',
    h1: { fontFamily: 'var(--font-syne), Syne, sans-serif' },
    h2: { fontFamily: 'var(--font-syne), Syne, sans-serif' },
    h3: { fontFamily: 'var(--font-syne), Syne, sans-serif' },
    h4: { fontFamily: 'var(--font-syne), Syne, sans-serif' },
    h5: { fontFamily: 'var(--font-syne), Syne, sans-serif' },
    h6: { fontFamily: 'var(--font-syne), Syne, sans-serif' },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          padding: '12px 28px',
        },
      },
      defaultProps: {
        disableElevation: true,
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '20px',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  },
});

export default theme;
