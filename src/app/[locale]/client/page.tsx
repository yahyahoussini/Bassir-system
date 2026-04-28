import Link from 'next/link';
import type { Locale } from '@/types';
export default function ClientPage({ params: { locale } }: { params: { locale: Locale } }) {
  const isAr = locale === 'ar';
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center px-6">
        <div className="w-16 h-16 rounded-2xl bg-brand-teal flex items-center justify-center mx-auto mb-6">
          <span className="font-display font-black text-brand-charcoal text-2xl">B</span>
        </div>
        <h1 className="font-display font-black uppercase text-3xl text-brand-charcoal mb-3">
          {isAr ? 'فضاء العميل' : 'Espace client'}
        </h1>
        <p className="font-body text-brand-stone mb-6">
          {isAr ? 'قيد الإنشاء — الخطوة 10' : 'En cours de construction — Étape 10'}
        </p>
        <Link href={`/${locale}`} className="font-body text-sm text-brand-teal hover:underline">
          ← {isAr ? 'الرئيسية' : 'Accueil'}
        </Link>
      </div>
    </div>
  );
}
