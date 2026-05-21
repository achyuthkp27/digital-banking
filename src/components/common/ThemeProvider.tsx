'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider, useTheme } from 'next-themes';
import { ThemeProvider as MuiThemeProviderComponent } from '@mui/material/styles';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { lightTheme, darkTheme } from '@/lib/theme';
import CssBaseline from '@mui/material/CssBaseline';

function MuiThemeWrapper({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme();
  
  // Use a state to avoid hydration mismatch
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);

  const theme = resolvedTheme === 'light' ? lightTheme : darkTheme;

  // Render children without MUI theme during SSR to avoid mismatch, 
  // or just render with default (dark) theme if not mounted, since next-themes 
  // handles the class toggle. Actually, MUI handles SSR hydration if we pass the theme.
  // But wait, the standard way is to just pass the theme. 
  
  return (
    <MuiThemeProviderComponent theme={theme}>
      <CssBaseline />
      {mounted ? children : <div style={{ visibility: 'hidden' }}>{children}</div>}
    </MuiThemeProviderComponent>
  );
}

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <AppRouterCacheProvider>
      <NextThemesProvider {...props}>
        <MuiThemeWrapper>
          {children}
        </MuiThemeWrapper>
      </NextThemesProvider>
    </AppRouterCacheProvider>
  );
}
