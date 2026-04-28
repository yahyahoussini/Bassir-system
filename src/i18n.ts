import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

export const locales = ['fr', 'ar'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'fr';

export const localeConfig = {
  fr: { label: 'Français', dir: 'ltr', hreflang: 'fr-MA' },
  ar: { label: 'العربية', dir: 'rtl', hreflang: 'ar-MA' },
};

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale;
  if (!locale || !locales.includes(locale as Locale)) notFound();
  return {
    locale,
    messages: (await import(`../messages/${locale}/index.json`)).default,
  };
});
