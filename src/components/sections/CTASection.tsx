import Link from 'next/link';
import { SectionWrapper, Container } from '@/components/ui/SectionWrapper';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import type { Locale } from '@/types';

interface CTASectionProps {
  locale: Locale;
}

export function CTASection({ locale }: CTASectionProps) {
  const isAr = locale === 'ar';

  return (
    <SectionWrapper dark className="relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-teal/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-brand-teal/8 blur-2xl" />
        {/* Zellige pattern top */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-brand-teal" />
      </div>

      <Container narrow className="relative z-10 text-center">
        <ScrollReveal>
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="text-2xl">🇲🇦</span>
            <span className="font-mono text-xs uppercase tracking-widest text-brand-teal font-medium">
              {isAr ? 'صُنع في المغرب' : 'Fait au Maroc'}
            </span>
          </div>

          <h2 className="font-display font-black uppercase leading-none text-5xl sm:text-6xl lg:text-7xl text-white mb-6">
            {isAr ? 'هل أنت مستعد' : 'Prêt à'}
            <br />
            <span className="text-brand-teal">
              {isAr ? 'لرقمنة متجرك؟' : 'digitaliser ?'}
            </span>
          </h2>

          <p className="font-body text-xl text-brand-stone leading-relaxed mb-10 max-w-lg mx-auto">
            {isAr
              ? 'مكالمة واحدة. نحن نتكفل بالباقي. تركيب كامل، تدريب، دعم مستمر.'
              : 'Un appel. On s\'occupe du reste. Installation complète, formation, support continu.'}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href={`/${locale}/demo`}
              className="inline-flex items-center gap-3 px-10 py-5 bg-brand-teal text-brand-charcoal font-body font-bold text-xl rounded-2xl hover:bg-brand-teal-dark transition-all duration-200 shadow-brand-lg hover:shadow-[0_16px_48px_rgba(0,201,177,0.4)] active:scale-[0.98] group w-full sm:w-auto justify-center"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {isAr ? 'طلب عرض تجريبي مجاني' : 'Demander une démo gratuite'}
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>

            <a
              href="tel:+212661415578"
              className="inline-flex items-center gap-3 px-8 py-5 border-2 border-brand-slate text-white font-body font-semibold text-lg rounded-2xl hover:border-brand-teal hover:text-brand-teal transition-all duration-200 w-full sm:w-auto justify-center"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              06 61 41 55 78
            </a>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-12 pt-10 border-t border-brand-slate/50">
            {[
              { icon: '✓', text: isAr ? 'ترخيص مدى الحياة' : 'Licence à vie' },
              { icon: '✓', text: isAr ? 'بدون اشتراك' : 'Sans abonnement' },
              { icon: '✓', text: isAr ? 'تركيب في 24 ساعة' : 'Installation en 24h' },
              { icon: '✓', text: isAr ? 'دعم بشري' : 'Support humain' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-brand-teal font-bold text-sm">{item.icon}</span>
                <span className="font-body text-sm text-brand-stone">{item.text}</span>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </Container>
    </SectionWrapper>
  );
}
