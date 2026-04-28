import type { FAQ, Product, Review, Locale } from '@/types';

// ============================================
// SITE CONFIG
// ============================================
export const SITE_URL = 'https://bassir-system.ma';
export const SITE_NAME = 'Bassir System';
export const PHONE_1 = '+212 661 41 55 78';
export const PHONE_2 = '+212 615 08 72 13';
export const WHATSAPP = '212661415578';

// ============================================
// LOCAL BUSINESS SCHEMA
// ============================================
export function generateLocalBusinessSchema(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'SoftwareCompany'],
    '@id': `${SITE_URL}/#business`,
    name: 'Bassir System',
    alternateName: 'بصير سيستم',
    description: locale === 'ar'
      ? 'برنامج كاشير مغربي — واجهة عربية 100٪ — ترخيص مدى الحياة — تركيب في جميع أنحاء المغرب'
      : 'Logiciel POS marocain — Interface 100% arabe — Licence à vie — Installation partout au Maroc',
    url: `${SITE_URL}/${locale}`,
    telephone: [PHONE_1, PHONE_2],
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'MA',
      addressRegion: 'Grand Casablanca',
      addressLocality: 'Casablanca',
    },
    areaServed: [
      { '@type': 'City', name: 'Casablanca' },
      { '@type': 'City', name: 'Rabat' },
      { '@type': 'City', name: 'Marrakech' },
      { '@type': 'City', name: 'Fès' },
      { '@type': 'City', name: 'Tanger' },
      { '@type': 'City', name: 'Agadir' },
      { '@type': 'Country', name: 'Morocco' },
    ],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '09:00',
        closes: '18:00',
      },
    ],
    priceRange: 'DH DH',
    image: `${SITE_URL}/og/bassir-og-default.jpg`,
    logo: `${SITE_URL}/images/bassir-logo-icon.png`,
    sameAs: [
      `https://www.facebook.com/bassir.system`,
      `https://www.instagram.com/bassir.system`,
      `https://wa.me/${WHATSAPP}`,
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: PHONE_1,
      contactType: 'customer service',
      availableLanguage: ['French', 'Arabic', 'Moroccan Arabic'],
      areaServed: 'MA',
    },
  };
}

// ============================================
// SOFTWARE APPLICATION SCHEMA
// ============================================
export function generateSoftwareSchema(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': `${SITE_URL}/#software`,
    name: 'Bassir System POS',
    operatingSystem: 'Windows',
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: 'Point of Sale',
    description: locale === 'ar'
      ? 'برنامج نقطة بيع مغربي بواجهة عربية كاملة وترخيص مدى الحياة'
      : 'Logiciel POS marocain avec interface 100% arabe et licence perpétuelle',
    offers: {
      '@type': 'Offer',
      priceCurrency: 'MAD',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: 'Sur devis',
        priceCurrency: 'MAD',
      },
    },
    author: {
      '@type': 'Organization',
      name: 'Bassir System',
      url: SITE_URL,
    },
    inLanguage: ['ar', 'fr'],
    countryOfOrigin: {
      '@type': 'Country',
      name: 'Morocco',
    },
  };
}

// ============================================
// FAQ PAGE SCHEMA
// ============================================
export function generateFAQSchema(faqs: FAQ[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

// ============================================
// PRODUCT SCHEMA
// ============================================
export function generateProductSchema(product: Product, locale: Locale) {
  const title = locale === 'ar' ? product.title_ar : product.title_fr;
  const description = locale === 'ar' ? product.description_ar : product.description_fr;

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: title,
    description: description,
    brand: {
      '@type': 'Brand',
      name: 'Bassir System',
    },
    manufacturer: {
      '@type': 'Organization',
      name: 'Bassir System',
      url: SITE_URL,
    },
    image: product.hero_image
      ? `${SITE_URL}${product.hero_image}`
      : `${SITE_URL}/og/bassir-og-default.jpg`,
    url: `${SITE_URL}/${locale}/produits/${product.slug}`,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'MAD',
      availability: 'https://schema.org/InStock',
      areaServed: {
        '@type': 'Country',
        name: 'Morocco',
      },
    },
    countryOfAssembly: 'MA',
  };
}

// ============================================
// BREADCRUMB SCHEMA
// ============================================
export function generateBreadcrumbSchema(
  items: { name: string; url: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// ============================================
// AGGREGATE RATING SCHEMA
// ============================================
export function generateAggregateRatingSchema(reviews: Review[]) {
  if (reviews.length === 0) return null;
  const avg = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
  return {
    '@type': 'AggregateRating',
    ratingValue: avg.toFixed(1),
    reviewCount: reviews.length,
    bestRating: '5',
    worstRating: '1',
  };
}

// ============================================
// WHATSAPP LINK GENERATOR
// ============================================
export function getWhatsAppLink(message?: string) {
  const base = `https://wa.me/${WHATSAPP}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

// ============================================
// PAGE META GENERATOR
// ============================================
export function buildMetadata({
  title,
  description,
  path,
  locale,
  ogImage,
}: {
  title: string;
  description: string;
  path: string;
  locale: Locale;
  ogImage?: string;
}) {
  const url = `${SITE_URL}/${locale}${path}`;
  const image = ogImage || '/og/bassir-og-default.jpg';

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        'fr-MA': `${SITE_URL}/fr${path}`,
        'ar-MA': `${SITE_URL}/ar${path}`,
      },
    },
    openGraph: {
      title,
      description,
      url,
      images: [{ url: image, width: 1200, height: 630 }],
      locale: locale === 'ar' ? 'ar_MA' : 'fr_MA',
      type: 'website' as const,
    },
    twitter: {
      card: 'summary_large_image' as const,
      title,
      description,
      images: [image],
    },
  };
}
