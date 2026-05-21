import type { Metadata } from 'next';
import '../globals.css';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { Syne } from 'next/font/google';
import CustomCursor from '@/components/common/CustomCursor';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { ThemeProvider } from '@/components/common/ThemeProvider';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-syne',
});

export const metadata: Metadata = {
  title: 'DB | Digital Banking Platform',
  description:
    'Enterprise-grade digital banking solutions with cutting-edge security, seamless integration, and unparalleled user experience across all platforms.',
  keywords: [
    'digital banking',
    'fintech',
    'banking platform',
    'mobile banking',
    'corporate banking',
    'payment solutions',
  ],
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  setRequestLocale(await (await params).locale);
  const { locale } = await params;
  const messages = await getMessages({ locale });

  return (
    <html
      lang={locale}
      className={`${GeistSans.variable} ${GeistMono.variable} ${syne.variable}`}
      suppressHydrationWarning
    >
      <body className={GeistSans.className}>
        <NextIntlClientProvider messages={messages}>
          <CustomCursor />
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <ErrorBoundary>{children}</ErrorBoundary>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
