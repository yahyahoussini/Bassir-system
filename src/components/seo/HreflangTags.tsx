import { SITE_URL } from '@/lib/seo';
import type { Locale } from '@/types';

interface HreflangTagsProps {
  locale: Locale;
  path: string; // e.g. '/logiciel' or '/produits/terminal-double-ecran'
}

/**
 * Injects hreflang link tags for FR + AR pages.
 * Place inside <head> via Next.js metadata alternates OR use this component.
 * Next.js 14 App Router handles hreflang via generateMetadata — 
 * this component is a fallback for edge cases.
 */
export function HreflangTags({ locale, path }: HreflangTagsProps) {
  const frUrl = `${SITE_URL}/fr${path}`;
  const arUrl = `${SITE_URL}/ar${path}`;

  return (
    <>
      <link rel="alternate" hrefLang="fr-MA" href={frUrl} />
      <link rel="alternate" hrefLang="ar-MA" href={arUrl} />
      <link rel="alternate" hrefLang="x-default" href={frUrl} />
    </>
  );
}
