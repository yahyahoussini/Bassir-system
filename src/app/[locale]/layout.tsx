import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Big_Shoulders_Display, Outfit, Noto_Sans_Arabic } from 'next/font/google';
import { localeConfig, type Locale } from '@/i18n';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppFloating } from '@/components/ui/WhatsAppFloating';
import '@/styles/globals.css';

const bigShoulders = Big_Shoulders_Display({
  subsets: ['latin'],
  weight: ['700', '900'],
  variable: '--font-display',
  display: 'swap',
  preload: true,
});

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
  preload: true,
});

const notoArabic = Noto_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-arabic',
  display: 'swap',
  preload: false, // Only load when needed
});

export function generateMetadata({
  params: { locale },
}: {
  params: { locale: Locale };
}): Metadata {
  const isAr = locale === 'ar';

  return {
    metadataBase: new URL('https://bassir-system.ma'),
    title: {
      default: isAr
        ? 'بصير سيستم | برنامج كاشير المغرب — واجهة عربية 100٪'
        : 'Bassir System | Logiciel POS Maroc — Interface 100% Arabe',
      template: isAr ? '%s | بصير سيستم' : '%s | Bassir System',
    },
    description: isAr
      ? 'برنامج كاشير مغربي بواجهة عربية كاملة. ترخيص مدى الحياة، بدون اشتراك. تركيب في الدار البيضاء، الرباط، مراكش وجميع أنحاء المغرب.'
      : 'Logiciel POS marocain — Interface 100% arabe — Licence à vie sans abonnement. Installation partout au Maroc.',
    keywords: isAr
      ? ['برنامج كاشير المغرب', 'نقطة بيع المغرب', 'برنامج محل المغرب', 'كاشير عربي', 'بصير سيستم']
      : ['logiciel POS Maroc', 'caisse enregistreuse Maroc', 'logiciel caisse arabe', 'Bassir System'],
    authors: [{ name: 'Bassir System', url: 'https://bassir-system.ma' }],
    creator: 'Bassir System',
    publisher: 'Bassir System',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    // hreflang for every page
    alternates: {
      canonical: `https://bassir-system.ma/${locale}`,
      languages: {
        'fr-MA': 'https://bassir-system.ma/fr',
        'ar-MA': 'https://bassir-system.ma/ar',
        'x-default': 'https://bassir-system.ma/fr',
      },
    },
    openGraph: {
      type: 'website',
      locale: isAr ? 'ar_MA' : 'fr_MA',
      alternateLocale: isAr ? 'fr_MA' : 'ar_MA',
      url: `https://bassir-system.ma/${locale}`,
      siteName: 'Bassir System',
      title: isAr
        ? 'بصير سيستم | برنامج كاشير المغرب'
        : 'Bassir System | Logiciel POS Maroc',
      description: isAr
        ? 'برنامج نقطة البيع المغربي — واجهة عربية 100٪ — ترخيص مدى الحياة'
        : 'Logiciel POS marocain — Interface 100% arabe — Licence à vie',
      images: [
        {
          url: '/og/bassir-og-default.jpg',
          width: 1200,
          height: 630,
          alt: isAr ? 'بصير سيستم — برنامج كاشير المغرب' : 'Bassir System — Logiciel POS Maroc',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: isAr ? 'بصير سيستم | برنامج كاشير المغرب' : 'Bassir System | Logiciel POS Maroc',
      description: isAr ? 'واجهة عربية 100٪ — ترخيص مدى الحياة' : 'Interface 100% arabe — Licence à vie',
      images: ['/og/bassir-og-default.jpg'],
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GSC_VERIFICATION ?? 'REPLACE_WITH_GSC_CODE',
    },
    // Geo meta for Morocco
    other: {
      'geo.region': 'MA',
      'geo.placename': 'Casablanca, Morocco',
      'geo.position': '33.5731;-7.5898',
      'ICBM': '33.5731, -7.5898',
    },
  };
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: Locale };
}) {
  const messages = await getMessages();
  const dir = localeConfig[locale as Locale]?.dir ?? 'ltr';
  const isAr = locale === 'ar';

  return (
    <html
      lang={locale}
      dir={dir}
      suppressHydrationWarning
      className={isAr ? 'font-arabic' : ''}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Favicon */}
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        {/* Theme color */}
        <meta name="theme-color" content="#00C9B1" />
        {/* Canonical hreflang — also set via generateMetadata alternates */}
        <link rel="alternate" hrefLang="fr-MA" href={`https://bassir-system.ma/fr`} />
        <link rel="alternate" hrefLang="ar-MA" href={`https://bassir-system.ma/ar`} />
        <link rel="alternate" hrefLang="x-default" href="https://bassir-system.ma/fr" />
      </head>
      <body
        className={`
          ${bigShoulders.variable}
          ${outfit.variable}
          ${notoArabic.variable}
          ${isAr ? 'font-arabic' : 'font-body'}
          bg-white text-brand-charcoal antialiased
        `}
      >
        <NextIntlClientProvider messages={messages}>
          <Header locale={locale as Locale} />
          <main id="main-content">{children}</main>
          <Footer locale={locale as Locale} />
          <WhatsAppFloating />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
