import type { Metadata, Viewport } from 'next';
import '../globals.css';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import localFont from 'next/font/local';
import CustomCursor from '@/components/common/CustomCursor';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { ThemeProvider } from '@/components/common/ThemeProvider';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { MotionProvider } from '@/components/common/MotionProvider';

const SITE_URL = 'https://achyuthkp27.github.io/digital-banking';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

// Self-hosted to avoid any build/runtime download from Google Fonts.
// Variable font (weight 400–800), latin subset covers en/es/fr.
const syne = localFont({
  src: '../fonts/Syne-latin.woff2',
  weight: '400 800',
  style: 'normal',
  variable: '--font-syne',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#020617' },
    { media: '(prefers-color-scheme: light)', color: '#f8fafc' },
  ],
  minimumScale: 1,
  initialScale: 1,
  width: 'device-width',
  viewportFit: 'cover',
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('title'),
    description: t('description'),
    applicationName: t('title'),
    appleWebApp: {
      capable: true,
      statusBarStyle: 'default',
      title: t('title'),
    },
    formatDetection: {
      telephone: false,
    },
    keywords: [
      'digital banking',
      'fintech',
      'banking platform',
      'mobile banking',
      'corporate banking',
      'payment solutions',
    ],
    metadataBase: new URL('https://achyuthkp27.github.io'),
    alternates: {
      canonical: `/digital-banking/${locale}`,
      languages: {
        ...Object.fromEntries(routing.locales.map((l) => [l, `/digital-banking/${l}`])),
        'x-default': `/digital-banking/${routing.defaultLocale}`,
      },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `${SITE_URL}/${locale}`,
      siteName: t('title'),
      type: 'website',
      images: [
        {
          url: `${SITE_URL}/og-image.png`,
          width: 1200,
          height: 630,
          alt: t('title'),
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: [`${SITE_URL}/og-image.png`],
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

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: 'Digital Banking',
        url: SITE_URL,
        logo: `${SITE_URL}/icon-512x512.png`,
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        name: 'Digital Banking',
        url: SITE_URL,
        inLanguage: locale,
        publisher: { '@id': `${SITE_URL}/#organization` },
      },
    ],
  };

  return (
    <html
      lang={locale}
      className={`${GeistSans.variable} ${GeistMono.variable} ${syne.variable}`}
      suppressHydrationWarning
    >
      <body className={GeistSans.className} suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <NextIntlClientProvider messages={messages}>
            <MotionProvider>
              <CustomCursor />
              <ErrorBoundary>{children}</ErrorBoundary>
            </MotionProvider>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
