import Link from 'next/link';
import type { Locale } from '@/types';

export default function NotFound({
  params,
}: {
  params?: { locale: Locale };
}) {
  const locale = params?.locale ?? 'fr';
  const isAr = locale === 'ar';

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-white"
      dir={isAr ? 'rtl' : 'ltr'}
    >
      <div className="text-center max-w-lg px-6">
        {/* Big 404 */}
        <div className="font-display font-black text-[10rem] leading-none text-brand-cloud mb-4 select-none">
          404
        </div>

        {/* Teal accent */}
        <div className="w-16 h-1 bg-brand-teal rounded mx-auto mb-6" />

        <h1 className="font-display font-black uppercase text-3xl text-brand-charcoal mb-3">
          {isAr ? 'الصفحة غير موجودة' : 'Page introuvable'}
        </h1>
        <p className="font-body text-brand-stone mb-8">
          {isAr
            ? 'الصفحة التي تبحث عنها غير موجودة أو تم نقلها.'
            : 'La page que vous cherchez n\'existe pas ou a été déplacée.'}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href={`/${locale}`}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-teal text-brand-charcoal font-body font-semibold rounded-xl hover:bg-brand-teal-dark transition-colors"
          >
            {isAr ? 'العودة للرئيسية' : 'Retour à l\'accueil'}
          </Link>
          <Link
            href={`/${locale}/contact`}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-brand-cloud text-brand-slate font-body font-semibold rounded-xl hover:border-brand-teal hover:text-brand-teal transition-colors"
          >
            {isAr ? 'اتصل بنا' : 'Nous contacter'}
          </Link>
        </div>

        {/* Quick links */}
        <div className="mt-10 pt-8 border-t border-brand-cloud">
          <p className="font-mono text-xs uppercase tracking-wider text-brand-stone mb-4">
            {isAr ? 'صفحات مفيدة' : 'Pages utiles'}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { href: `/${locale}/logiciel`, label: isAr ? 'البرنامج' : 'Logiciel' },
              { href: `/${locale}/produits`, label: isAr ? 'المنتجات' : 'Produits' },
              { href: `/${locale}/rfid`, label: isAr ? 'RFID' : 'RFID' },
              { href: `/${locale}/demo`, label: isAr ? 'عرض تجريبي' : 'Démo' },
            ].map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="font-body text-sm text-brand-teal hover:underline"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
