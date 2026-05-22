import type { Metadata } from 'next';
import '../globals.css';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { Syne } from 'next/font/google';
import CustomCursor from '@/components/common/CustomCursor';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { ThemeProvider } from '@/components/common/ThemeProvider';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-syne',
});

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });
  
  return {
    title: t('title'),
    description: t('description'),
    keywords: [
      'digital banking',
      'fintech',
      'banking platform',
      'mobile banking',
      'corporate banking',
      'payment solutions',
    ],
    metadataBase: new URL('https://db-demo.example.com'),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: '/en',
        es: '/es',
        'en-US': '/en',
      },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `https://db-demo.example.com/${locale}`,
      siteName: t('title'),
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    },
  };
}

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
      <body className={GeistSans.className} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider messages={messages}>
            <CustomCursor />
            <ErrorBoundary>{children}</ErrorBoundary>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
