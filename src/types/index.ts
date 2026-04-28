export type Locale = 'fr' | 'ar';

export interface Product {
  id: string;
  slug: string;
  published: boolean;
  category: 'logiciel' | 'materiel' | 'rfid' | 'accessoire';
  title_fr: string;
  description_fr: string;
  content_fr?: string;
  meta_title_fr?: string;
  meta_description_fr?: string;
  title_ar?: string;
  description_ar?: string;
  content_ar?: string;
  meta_title_ar?: string;
  meta_description_ar?: string;
  hero_image?: string;
  gallery?: string[];
  brand: string;
  sku?: string;
  features?: string[];
  specs?: Record<string, string>;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Post {
  id: string;
  slug: string;
  published: boolean;
  published_at?: string;
  category?: string;
  reading_time: number;
  title_fr: string;
  excerpt_fr?: string;
  content_fr?: string;
  meta_title_fr?: string;
  meta_description_fr?: string;
  title_ar?: string;
  excerpt_ar?: string;
  content_ar?: string;
  meta_title_ar?: string;
  meta_description_ar?: string;
  cover_image?: string;
  og_image?: string;
  focus_keyword?: string;
  created_at: string;
  updated_at: string;
}

export interface Lead {
  id: string;
  created_at: string;
  first_name: string;
  phone: string;
  city: string;
  business_type: string;
  message?: string;
  source_page?: string;
  status: 'nouveau' | 'contacte' | 'converti' | 'archive';
  notes?: string;
  contacted_at?: string;
  converted_at?: string;
}

export interface FAQ {
  id: string;
  page_slug: string;
  locale: Locale;
  question: string;
  answer: string;
  sort_order: number;
  is_priority: boolean;
}

export interface Review {
  id: string;
  client_name: string;
  business_name?: string;
  city?: string;
  business_type?: string;
  rating: number;
  review_fr: string;
  review_ar?: string;
  whatsapp_screenshot?: string;
  published: boolean;
  sort_order: number;
}

export interface SeoMeta {
  page_slug: string;
  locale: Locale;
  meta_title?: string;
  meta_description?: string;
  og_title?: string;
  og_description?: string;
  og_image?: string;
  canonical_url?: string;
  robots?: string;
  schema_type?: string;
}

export interface KeywordRanking {
  id: string;
  created_at: string;
  keyword: string;
  locale: Locale;
  position?: number;
  url?: string;
  impressions?: number;
  clicks?: number;
  ctr?: number;
  recorded_at: string;
}

// Schema.org types for JSON-LD
export interface SchemaLocalBusiness {
  '@context': 'https://schema.org';
  '@type': 'LocalBusiness';
  name: string;
  description: string;
  url: string;
  telephone: string;
  address: {
    '@type': 'PostalAddress';
    addressCountry: string;
    addressRegion: string;
    addressLocality: string;
  };
  areaServed: string[];
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification';
    dayOfWeek: string[];
    opens: string;
    closes: string;
  }[];
  priceRange: string;
  image: string;
  sameAs: string[];
}

export interface SchemaFAQPage {
  '@context': 'https://schema.org';
  '@type': 'FAQPage';
  mainEntity: {
    '@type': 'Question';
    name: string;
    acceptedAnswer: {
      '@type': 'Answer';
      text: string;
    };
  }[];
}
