import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { SectionWrapper, Container, SectionHeader } from '@/components/ui/SectionWrapper';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { cn } from '@/lib/utils';
import type { Locale } from '@/types';

interface ProductsPreviewSectionProps {
  locale: Locale;
}

export function ProductsPreviewSection({ locale }: ProductsPreviewSectionProps) {
  const isAr = locale === 'ar';

  const products = [
    {
      slug: 'terminal-double-ecran',
      emoji: '🖥️',
      category: isAr ? 'معدات' : 'Matériel',
      title: isAr ? 'شاشة مزدوجة' : 'Terminal Double Écran',
      description: isAr
        ? 'يرى عميلك فاتورته. يتحكم أمينك في كل شيء.'
        : 'Votre client voit son ticket. Votre caissier gère tout.',
      color: 'from-brand-charcoal to-brand-slate',
      accent: 'text-brand-teal',
      tag: isAr ? 'الأكثر طلباً' : 'Le plus demandé',
    },
    {
      slug: 'logiciel-pos',
      emoji: '⚙️',
      category: isAr ? 'برنامج' : 'Logiciel',
      title: isAr ? 'برنامج POS عربي' : 'Logiciel POS Arabe',
      description: isAr
        ? 'واجهة عربية 100٪. ترخيص مدى الحياة. بدون اشتراك.'
        : 'Interface 100% arabe. Licence à vie. Sans abonnement.',
      color: 'from-brand-teal to-brand-teal-dark',
      accent: 'text-brand-charcoal',
      tag: isAr ? 'مميز' : 'Exclusif',
    },
    {
      slug: 'balance-codes-barres',
      emoji: '⚖️',
      category: isAr ? 'معدات' : 'Matériel',
      title: isAr ? 'ميزان باركود' : 'Balance Codes-Barres',
      description: isAr
        ? 'زِن، امسح، احصّل. لا إدخال يدوي، لا أخطاء.'
        : 'Pesez, scannez, encaissez. Zéro erreur.',
      color: 'from-[#1a1a2e] to-[#16213e]',
      accent: 'text-brand-teal',
      tag: null,
    },
    {
      slug: 'bracelet-rfid',
      emoji: '📡',
      category: isAr ? 'RFID' : 'RFID',
      title: isAr ? 'أسورة RFID' : 'Bracelets RFID',
      description: isAr
        ? 'للحمام، المسبح، صالة الرياضة. دخول وتسديد بدون نقود.'
        : 'Hammam, piscine, sport. Accès + paiement cashless.',
      color: 'from-[#0a0a0a] to-brand-slate',
      accent: 'text-brand-teal',
      tag: isAr ? 'خاص' : 'Spécial',
    },
  ];

  return (
    <SectionWrapper id="products">
      <Container>
        <ScrollReveal>
          <div className="flex items-end justify-between mb-12 gap-4">
            <SectionHeader
              badge={isAr ? 'المنتجات' : 'Nos produits'}
              title={isAr ? 'حلول كاملة' : 'Solutions complètes'}
              titleAccent={isAr ? 'للتجارة' : 'pour votre commerce'}
              className="mb-0"
            />
            <Link
              href={`/${locale}/produits`}
              className="hidden sm:inline-flex items-center gap-2 font-body text-sm font-medium text-brand-teal hover:gap-3 transition-all duration-200 flex-shrink-0"
            >
              {isAr ? 'عرض الكل' : 'Voir tout'}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map((product, i) => (
            <ScrollReveal key={product.slug} delay={i * 100}>
              <Link href={`/${locale}/produits/${product.slug}`} className="group block h-full">
                <div className={cn(
                  'relative rounded-brand-lg overflow-hidden h-64 bg-gradient-to-br',
                  product.color,
                  'transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(0,0,0,0.2)]'
                )}>
                  {/* Tag */}
                  {product.tag && (
                    <div className="absolute top-4 right-4 z-10">
                      <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-1 rounded-full bg-brand-teal text-brand-charcoal font-medium">
                        {product.tag}
                      </span>
                    </div>
                  )}

                  {/* Large emoji background */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-10 text-[8rem]">
                    {product.emoji}
                  </div>

                  {/* Content */}
                  <div className="absolute inset-0 p-5 flex flex-col justify-end">
                    <span className={cn('font-mono text-xs uppercase tracking-wider mb-1 opacity-60', product.accent)}>
                      {product.category}
                    </span>
                    <h3 className={cn('font-display font-black uppercase text-xl leading-tight mb-1', product.accent)}>
                      {product.title}
                    </h3>
                    <p className="font-body text-xs text-white/60 leading-relaxed mb-3">
                      {product.description}
                    </p>
                    <div className={cn('flex items-center gap-1 text-xs font-medium', product.accent)}>
                      <span>{isAr ? 'اعرف المزيد' : 'En savoir plus'}</span>
                      <svg className={cn('w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1', isAr && 'rotate-180')} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </SectionWrapper>
  );
}
