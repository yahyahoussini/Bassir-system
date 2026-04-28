import type { Metadata } from 'next';
import { getFAQs, getReviews } from '@/lib/db';
import {
  generateLocalBusinessSchema,
  generateSoftwareSchema,
  generateFAQSchema,
  generateAggregateRatingSchema,
  generateBreadcrumbSchema,
  buildMetadata,
  SITE_URL,
} from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';
import { HeroSection } from '@/components/sections/HeroSection';
import { TrustBar } from '@/components/sections/TrustBar';
import { FeaturesSection } from '@/components/sections/FeaturesSection';
import { ProductsPreviewSection } from '@/components/sections/ProductsPreviewSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { CitiesSection } from '@/components/sections/CitiesSection';
import { FAQSection } from '@/components/sections/FAQSection';
import { CTASection } from '@/components/sections/CTASection';
import type { Locale } from '@/types';

interface HomePageProps {
  params: { locale: Locale };
}

// ============================================
// SEO METADATA
// ============================================
export async function generateMetadata({ params: { locale } }: HomePageProps): Promise<Metadata> {
  const isAr = locale === 'ar';
  return buildMetadata({
    title: isAr
      ? 'بصير سيستم | برنامج كاشير المغرب — واجهة عربية 100٪ — ترخيص مدى الحياة'
      : 'Bassir System | Logiciel POS Maroc — Interface 100% Arabe — Licence à Vie',
    description: isAr
      ? 'بصير سيستم — برنامج نقطة البيع المغربي بواجهة عربية كاملة. ترخيص مدى الحياة بدون اشتراك. تركيب في الدار البيضاء، الرباط، مراكش وجميع أنحاء المغرب.'
      : 'Bassir System — Logiciel POS marocain avec interface 100% arabe. Licence à vie sans abonnement. Installation partout au Maroc : Casablanca, Rabat, Marrakech, Fès, Tanger.',
    path: '',
    locale,
  });
}

// ============================================
// PAGE COMPONENT
// ============================================
export default async function HomePage({ params: { locale } }: HomePageProps) {
  // Fetch real data from Supabase (parallel)
  const [faqs, reviews] = await Promise.all([
    getFAQs('home', locale),
    getReviews(10),
  ]);

  // Build all schemas
  const localBusinessSchema = generateLocalBusinessSchema(locale);
  const softwareSchema = generateSoftwareSchema(locale);

  const faqSchemaData = faqs.length > 0
    ? generateFAQSchema(faqs)
    : null;

  const ratingSchema = generateAggregateRatingSchema(reviews);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Bassir System', url: `${SITE_URL}/${locale}` },
  ]);

  // Enhanced LocalBusiness with rating if available
  const enhancedLocalBusiness = ratingSchema
    ? { ...localBusinessSchema, aggregateRating: ratingSchema }
    : localBusinessSchema;

  return (
    <>
      {/* ===== JSON-LD SCHEMA STACK ===== */}
      <JsonLd data={enhancedLocalBusiness} />
      <JsonLd data={softwareSchema} />
      <JsonLd data={breadcrumbSchema} />
      {faqSchemaData && <JsonLd data={faqSchemaData} />}

      {/* ===== PAGE SECTIONS ===== */}
      <HeroSection locale={locale} />
      <TrustBar locale={locale} />
      <FeaturesSection locale={locale} />
      <ProductsPreviewSection locale={locale} />
      <TestimonialsSection locale={locale} />
      <CitiesSection locale={locale} />
      <FAQSection locale={locale} faqs={faqs} />
      <CTASection locale={locale} />
    </>
  );
}
