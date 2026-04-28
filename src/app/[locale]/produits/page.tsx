import type { Metadata } from 'next';
import Link from 'next/link';
import { getProducts } from '@/lib/db';
import { buildMetadata, generateLocalBusinessSchema, SITE_URL } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';
import { BreadcrumbNav } from '@/components/ui/BreadcrumbNav';
import { SectionWrapper, Container, SectionHeader } from '@/components/ui/SectionWrapper';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { cn } from '@/lib/utils';
import type { Locale, Product } from '@/types';

interface ProduitsPageProps {
  params: { locale: Locale };
}

export async function generateMetadata({ params: { locale } }: ProduitsPageProps): Promise<Metadata> {
  const isAr = locale === 'ar';
  return buildMetadata({
    title: isAr
      ? 'المنتجات | أجهزة POS ومعدات الكاشير في المغرب'
      : 'Produits | Terminaux POS, Balances, RFID — Bassir System Maroc',
    description: isAr
      ? 'اكتشف مجموعة منتجات بصير سيستم: شاشة مزدوجة، طابعة حرارية، ميزان باركود، أسورة RFID. تركيب في جميع أنحاء المغرب.'
      : 'Découvrez les produits Bassir System : terminal double écran, imprimante thermique, balance codes-barres, bracelets RFID. Installation partout au Maroc.',
    path: '/produits',
    locale,
  });
}

const CATEGORY_LABELS: Record<string, Record<Locale, string>> = {
  all: { fr: 'Tous les produits', ar: 'جميع المنتجات' },
  logiciel: { fr: 'Logiciel', ar: 'برنامج' },
  materiel: { fr: 'Matériel', ar: 'معدات' },
  rfid: { fr: 'RFID', ar: 'RFID' },
  accessoire: { fr: 'Accessoires', ar: 'ملحقات' },
};

const CATEGORY_COLORS: Record<string, string> = {
  logiciel: 'bg-brand-teal/10 text-brand-teal border-brand-teal/20',
  materiel: 'bg-blue-50 text-blue-600 border-blue-200',
  rfid: 'bg-purple-50 text-purple-600 border-purple-200',
  accessoire: 'bg-amber-50 text-amber-600 border-amber-200',
};

// Static product data as fallback + enrichment
const PRODUCT_DETAILS: Record<string, {
  emoji: string;
  gradient: string;
  highlight: string;
}> = {
  'logiciel-pos': { emoji: '⚙️', gradient: 'from-brand-teal to-brand-teal-dark', highlight: 'EXCLUSIF' },
  'terminal-double-ecran': { emoji: '🖥️', gradient: 'from-brand-charcoal to-brand-slate', highlight: 'POPULAIRE' },
  'imprimante-thermique': { emoji: '🖨️', gradient: 'from-[#1a1a2e] to-[#16213e]', highlight: '' },
  'balance-codes-barres': { emoji: '⚖️', gradient: 'from-[#0f2027] to-[#203a43]', highlight: '' },
  'bracelet-rfid': { emoji: '📡', gradient: 'from-[#1a0533] to-[#2d1b69]', highlight: 'RFID' },
};

function ProductCard({ product, locale }: { product: Product; locale: Locale }) {
  const isAr = locale === 'ar';
  const title = isAr && product.title_ar ? product.title_ar : product.title_fr;
  const description = isAr && product.description_ar ? product.description_ar : product.description_fr;
  const details = PRODUCT_DETAILS[product.slug] ?? { emoji: '📦', gradient: 'from-brand-charcoal to-brand-slate', highlight: '' };
  const categoryLabel = CATEGORY_LABELS[product.category]?.[locale] ?? product.category;

  return (
    <Link href={`/${locale}/produits/${product.slug}`} className="group block">
      <article className="bg-white rounded-brand-lg border border-brand-cloud/60 shadow-card overflow-hidden card-hover h-full flex flex-col">
        {/* Visual header — dark gradient with large emoji */}
        <div className={cn('relative h-52 bg-gradient-to-br overflow-hidden flex-shrink-0', details.gradient)}>
          {/* Grid dots */}
          <div className="absolute inset-0 opacity-10"
            style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

          {/* Large emoji background */}
          <div className="absolute inset-0 flex items-center justify-center text-[7rem] opacity-10 select-none">
            {details.emoji}
          </div>

          {/* Product image if available */}
          {product.hero_image && (
            <div className="absolute inset-0 flex items-center justify-center p-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={product.hero_image}
                alt={title}
                className="max-h-full max-w-full object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          )}

          {/* Highlight badge */}
          {details.highlight && (
            <div className="absolute top-4 left-4">
              <span className="font-mono text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full bg-brand-teal text-brand-charcoal font-semibold">
                {details.highlight}
              </span>
            </div>
          )}

          {/* Category badge */}
          <div className="absolute bottom-4 right-4">
            <span className={cn(
              'font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full border font-medium',
              CATEGORY_COLORS[product.category] ?? 'bg-white/20 text-white border-white/20'
            )}>
              {categoryLabel}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          <h2 className="font-display font-black uppercase text-xl text-brand-charcoal mb-2 group-hover:text-brand-teal transition-colors duration-200 leading-tight">
            {title}
          </h2>
          <p className="font-body text-sm text-brand-stone leading-relaxed line-clamp-2 flex-1">
            {description}
          </p>

          {/* CTA */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-brand-cloud">
            <span className="font-mono text-xs text-brand-stone uppercase tracking-wider">
              {isAr ? 'اعرف المزيد' : 'En savoir plus'}
            </span>
            <div className="w-8 h-8 rounded-full bg-brand-teal-light text-brand-teal flex items-center justify-center group-hover:bg-brand-teal group-hover:text-brand-charcoal transition-all duration-200">
              <svg className={cn('w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200', isAr && 'rotate-180')} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default async function ProduitsPage({ params: { locale } }: ProduitsPageProps) {
  const isAr = locale === 'ar';
  const products = await getProducts();

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Bassir System', item: `${SITE_URL}/${locale}` },
      { '@type': 'ListItem', position: 2, name: isAr ? 'المنتجات' : 'Produits', item: `${SITE_URL}/${locale}/produits` },
    ],
  };

  // Group by category
  const categories = ['logiciel', 'materiel', 'rfid', 'accessoire'];
  const grouped: Record<string, Product[]> = {};
  categories.forEach(cat => {
    grouped[cat] = products.filter(p => p.category === cat);
  });

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={generateLocalBusinessSchema(locale)} />

      {/* Page header */}
      <div className="bg-brand-charcoal pt-12 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'radial-gradient(circle, #00C9B1 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-brand-teal" />

        <Container className="relative z-10">
          <BreadcrumbNav
            items={[
              { label: 'Bassir System', href: `/${locale}` },
              { label: isAr ? 'المنتجات' : 'Produits' },
            ]}
            className="mb-6 [&_span]:text-brand-stone [&_a]:text-brand-stone"
          />
          <h1 className="font-display font-black uppercase leading-none text-5xl sm:text-6xl lg:text-7xl text-white mb-4">
            {isAr ? 'حلول' : 'Solutions'}<br />
            <span className="text-brand-teal">{isAr ? 'كاملة' : 'complètes'}</span>
          </h1>
          <p className="font-body text-lg text-brand-stone max-w-xl">
            {isAr
              ? 'برنامج + معدات + تركيب + دعم. كل شيء من مزود واحد.'
              : 'Logiciel + matériel + installation + support. Tout en un seul interlocuteur.'}
          </p>
        </Container>
      </div>

      {/* Products by category */}
      {categories.map(cat => {
        const catProducts = grouped[cat];
        if (!catProducts || catProducts.length === 0) return null;

        return (
          <SectionWrapper key={cat} className="py-14" cloud={cat === 'materiel' || cat === 'rfid'}>
            <Container>
              <ScrollReveal>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-8 h-0.5 bg-brand-teal rounded" />
                  <h2 className="font-display font-black uppercase text-3xl text-brand-charcoal">
                    {CATEGORY_LABELS[cat]?.[locale] ?? cat}
                  </h2>
                </div>
              </ScrollReveal>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {catProducts.map((product, i) => (
                  <ScrollReveal key={product.id} delay={i * 80}>
                    <ProductCard product={product} locale={locale} />
                  </ScrollReveal>
                ))}
              </div>
            </Container>
          </SectionWrapper>
        );
      })}

      {/* Bottom CTA */}
      <SectionWrapper dark>
        <Container narrow className="text-center">
          <h2 className="font-display font-black uppercase text-4xl sm:text-5xl text-white mb-4">
            {isAr ? 'هل تحتاج مساعدة في الاختيار؟' : 'Besoin d\'aide pour choisir ?'}
          </h2>
          <p className="font-body text-brand-stone mb-8">
            {isAr ? 'فريقنا يساعدك في اختيار الحل المناسب لنشاطك.' : 'Notre équipe vous aide à trouver la solution adaptée à votre activité.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`/${locale}/demo`}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-teal text-brand-charcoal font-body font-semibold rounded-xl hover:bg-brand-teal-dark transition-colors">
              {isAr ? 'طلب عرض تجريبي' : 'Demander une démo'}
            </Link>
            <a href="https://wa.me/212661415578" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-brand-slate text-white font-body font-semibold rounded-xl hover:border-brand-teal hover:text-brand-teal transition-colors">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[#25D366]">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.523 5.847L.057 23.5l5.752-1.507A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.808 9.808 0 01-5.032-1.384l-.36-.214-3.733.979.997-3.645-.235-.374A9.808 9.808 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182c5.43 0 9.818 4.388 9.818 9.818 0 5.43-4.388 9.818-9.818 9.818z" />
              </svg>
              WhatsApp
            </a>
          </div>
        </Container>
      </SectionWrapper>
    </>
  );
}
