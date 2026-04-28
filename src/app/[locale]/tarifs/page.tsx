import type { Metadata } from 'next';
import Link from 'next/link';
import {
  buildMetadata,
  generateBreadcrumbSchema,
  generateLocalBusinessSchema,
  getWhatsAppLink,
  SITE_URL,
} from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';
import { BreadcrumbNav } from '@/components/ui/BreadcrumbNav';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Container, SectionWrapper, SectionHeader } from '@/components/ui/SectionWrapper';
import { cn } from '@/lib/utils';
import type { Locale } from '@/types';

interface TarifsPageProps {
  params: { locale: Locale };
}

export async function generateMetadata({ params: { locale } }: TarifsPageProps): Promise<Metadata> {
  const isAr = locale === 'ar';
  return buildMetadata({
    title: isAr
      ? 'أسعار برنامج POS المغرب | بصير سيستم — ترخيص مدى الحياة بدون اشتراك'
      : 'Tarifs Logiciel POS Maroc | Bassir System — Licence à Vie Sans Abonnement',
    description: isAr
      ? 'اكتشف عروض بصير سيستم. ترخيص مدى الحياة، بدون اشتراك شهري. برنامج + معدات + تركيب + دعم. اتصل بنا للحصول على عرض أسعار.'
      : 'Découvrez les offres Bassir System. Licence à vie, sans abonnement mensuel. Logiciel + matériel + installation + support. Contactez-nous pour un devis.',
    path: '/tarifs',
    locale,
  });
}

const PACKS = {
  fr: [
    {
      name: 'Logiciel Seul',
      badge: '',
      highlight: false,
      description: 'Pour ceux qui ont déjà leur matériel compatible.',
      includes: [
        'Licence Bassir System à vie',
        'Interface 100% arabe',
        'Mises à jour incluses',
        'Installation à distance',
        'Support WhatsApp',
      ],
      excludes: ['Matériel', 'Installation sur site'],
      cta: 'Demander le tarif',
    },
    {
      name: 'Pack Essentiel',
      badge: 'LE PLUS POPULAIRE',
      highlight: true,
      description: 'La solution complète pour démarrer rapidement.',
      includes: [
        'Licence Bassir System à vie',
        'Terminal double écran',
        'Imprimante thermique',
        'Tiroir-caisse',
        'Installation sur site',
        'Formation incluse',
        'Support 3 mois prioritaire',
      ],
      excludes: [],
      cta: 'Demander le tarif',
    },
    {
      name: 'Pack Complet',
      badge: 'TOUT INCLUS',
      highlight: false,
      description: 'Pour les commerces qui veulent tout : matériel, logiciel, balance et scanner.',
      includes: [
        'Licence Bassir System à vie',
        'Terminal double écran',
        'Imprimante thermique',
        'Tiroir-caisse',
        'Balance codes-barres Rongta',
        'Scanner codes-barres',
        'Installation + formation',
        'Support 6 mois prioritaire',
      ],
      excludes: [],
      cta: 'Demander le tarif',
    },
    {
      name: 'Pack RFID',
      badge: 'HAMMAM · PISCINE · SPORT',
      highlight: false,
      description: 'Pour les hammams, piscines et salles de sport.',
      includes: [
        'Licence Bassir System à vie',
        'Module RFID intégré',
        'Terminal + imprimante',
        'Bracelets RFID (lot)',
        'Lecteur RFID USB',
        'Installation + formation RFID',
        'Support dédié',
      ],
      excludes: [],
      cta: 'Demander le tarif',
    },
  ],
  ar: [
    {
      name: 'البرنامج فقط',
      badge: '',
      highlight: false,
      description: 'لمن لديه بالفعل معدات متوافقة.',
      includes: [
        'ترخيص بصير سيستم مدى الحياة',
        'واجهة عربية 100٪',
        'تحديثات مضمنة',
        'تركيب عن بعد',
        'دعم واتساب',
      ],
      excludes: ['المعدات', 'التركيب في الموقع'],
      cta: 'طلب السعر',
    },
    {
      name: 'الباقة الأساسية',
      badge: 'الأكثر طلباً',
      highlight: true,
      description: 'الحل الكامل للبدء بسرعة.',
      includes: [
        'ترخيص بصير سيستم مدى الحياة',
        'شاشة مزدوجة',
        'طابعة حرارية',
        'درج النقود',
        'تركيب في الموقع',
        'تدريب مضمن',
        'دعم أولوية 3 أشهر',
      ],
      excludes: [],
      cta: 'طلب السعر',
    },
    {
      name: 'الباقة الكاملة',
      badge: 'كل شيء مضمن',
      highlight: false,
      description: 'للمتاجر التي تريد كل شيء: معدات وبرنامج وميزان وماسح.',
      includes: [
        'ترخيص بصير سيستم مدى الحياة',
        'شاشة مزدوجة',
        'طابعة حرارية',
        'درج النقود',
        'ميزان باركود Rongta',
        'ماسح باركود',
        'تركيب + تدريب',
        'دعم أولوية 6 أشهر',
      ],
      excludes: [],
      cta: 'طلب السعر',
    },
    {
      name: 'باقة RFID',
      badge: 'حمام · مسبح · رياضة',
      highlight: false,
      description: 'للحمامات والمسابح وصالات الرياضة.',
      includes: [
        'ترخيص بصير سيستم مدى الحياة',
        'وحدة RFID متكاملة',
        'طرفية + طابعة',
        'أساور RFID (مجموعة)',
        'قارئ RFID USB',
        'تركيب + تدريب RFID',
        'دعم مخصص',
      ],
      excludes: [],
      cta: 'طلب السعر',
    },
  ],
};

const INCLUDED_ALWAYS = {
  fr: [
    { icon: '♾️', text: 'Licence à vie — pas d\'abonnement mensuel' },
    { icon: '🔄', text: 'Toutes les mises à jour futures incluses' },
    { icon: '🛠️', text: 'Support humain par téléphone et WhatsApp' },
    { icon: '🇲🇦', text: 'Logiciel 100% marocain — fait ici pour vous' },
    { icon: '📱', text: 'Compatible Windows 7, 8, 10, 11' },
    { icon: '🔤', text: 'Interface 100% arabe native' },
  ],
  ar: [
    { icon: '♾️', text: 'ترخيص مدى الحياة — لا اشتراك شهري' },
    { icon: '🔄', text: 'جميع التحديثات المستقبلية مضمنة' },
    { icon: '🛠️', text: 'دعم بشري بالهاتف والواتساب' },
    { icon: '🇲🇦', text: 'برنامج مغربي 100٪ — مصنوع هنا لكم' },
    { icon: '📱', text: 'متوافق مع Windows 7, 8, 10, 11' },
    { icon: '🔤', text: 'واجهة عربية أصلية 100٪' },
  ],
};

export default async function TarifsPage({ params: { locale } }: TarifsPageProps) {
  const isAr = locale === 'ar';
  const packs = isAr ? PACKS.ar : PACKS.fr;
  const alwaysIncluded = isAr ? INCLUDED_ALWAYS.ar : INCLUDED_ALWAYS.fr;

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Bassir System', url: `${SITE_URL}/${locale}` },
    { name: isAr ? 'الأسعار' : 'Tarifs', url: `${SITE_URL}/${locale}/tarifs` },
  ]);

  const waMessage = isAr
    ? 'السلام عليكم، أريد معرفة أسعار بصير سيستم'
    : 'Bonjour, je souhaite connaître les tarifs de Bassir System';

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={generateLocalBusinessSchema(locale)} />

      {/* Hero */}
      <div className="relative bg-white pt-12 pb-16 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-teal/5 rounded-full -translate-y-1/3 translate-x-1/3 pointer-events-none" />
        <Container className="relative z-10">
          <BreadcrumbNav
            items={[
              { label: 'Bassir System', href: `/${locale}` },
              { label: isAr ? 'الأسعار' : 'Tarifs' },
            ]}
            className="mb-8"
          />
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-brand-teal-light rounded-full border border-brand-teal/20">
              <span className="font-mono text-xs uppercase tracking-widest text-brand-teal font-medium">
                {isAr ? 'بدون اشتراك · ترخيص مدى الحياة' : 'Sans abonnement · Licence à vie'}
              </span>
            </div>
            <h1 className="font-display font-black uppercase leading-none text-5xl sm:text-6xl lg:text-7xl text-brand-charcoal mb-6">
              {isAr ? 'ادفع مرة.' : 'Payez une fois.'}<br />
              <span className="text-brand-teal">{isAr ? 'استخدم للأبد.' : 'Utilisez toujours.'}</span>
            </h1>
            <p className="font-body text-xl text-brand-stone leading-relaxed max-w-2xl">
              {isAr
                ? 'لا اشتراكات. لا مفاجآت. برنامج + معدات + تركيب + دعم. تواصل معنا للحصول على عرض أسعار مخصص.'
                : 'Pas d\'abonnements. Pas de surprises. Logiciel + matériel + installation + support. Contactez-nous pour un devis personnalisé.'}
            </p>
          </div>
        </Container>
      </div>

      {/* Pricing cards */}
      <SectionWrapper cloud>
        <Container>
          <ScrollReveal>
            <SectionHeader
              badge={isAr ? 'العروض' : 'Nos offres'}
              title={isAr ? 'اختر باقتك' : 'Choisissez votre pack'}
              centered
            />
          </ScrollReveal>

          {/* Price note */}
          <ScrollReveal>
            <div className="flex items-center gap-3 bg-brand-teal-light border border-brand-teal/20 rounded-brand-lg px-6 py-4 mb-10 max-w-2xl mx-auto">
              <div className="w-8 h-8 rounded-full bg-brand-teal flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-brand-charcoal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="font-body text-sm text-brand-slate">
                {isAr
                  ? 'الأسعار تُقدَّم على الطلب وفقاً لاحتياجاتك وموقعك. تواصل بنا للحصول على عرض مخصص.'
                  : 'Les tarifs sont fournis sur devis selon vos besoins et votre localisation. Contactez-nous pour une offre personnalisée.'}
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {packs.map((pack, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className={cn(
                  'relative rounded-brand-lg border flex flex-col h-full transition-all duration-300 hover:-translate-y-1',
                  pack.highlight
                    ? 'bg-brand-charcoal border-brand-teal/40 shadow-brand-lg'
                    : 'bg-white border-brand-cloud shadow-card hover:border-brand-teal/30 hover:shadow-brand'
                )}>
                  {/* Highlight top bar */}
                  {pack.highlight && <div className="h-1 bg-brand-teal rounded-t-brand-lg" />}

                  <div className="p-5 flex flex-col flex-1">
                    {/* Badge */}
                    {pack.badge && (
                      <span className={cn(
                        'font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full font-semibold mb-3 self-start',
                        pack.highlight ? 'bg-brand-teal text-brand-charcoal' : 'bg-brand-teal-light text-brand-teal'
                      )}>
                        {pack.badge}
                      </span>
                    )}

                    {/* Name */}
                    <h3 className={cn(
                      'font-display font-black uppercase text-xl mb-2',
                      pack.highlight ? 'text-white' : 'text-brand-charcoal'
                    )}>
                      {pack.name}
                    </h3>

                    {/* Description */}
                    <p className={cn('font-body text-xs leading-relaxed mb-4', pack.highlight ? 'text-brand-stone' : 'text-brand-stone')}>
                      {pack.description}
                    </p>

                    {/* Price placeholder */}
                    <div className={cn(
                      'rounded-xl p-3 mb-4 text-center',
                      pack.highlight ? 'bg-brand-teal/10 border border-brand-teal/20' : 'bg-brand-cloud/50 border border-brand-cloud'
                    )}>
                      <div className={cn('font-display font-black text-2xl', pack.highlight ? 'text-brand-teal' : 'text-brand-charcoal')}>
                        {isAr ? 'على الطلب' : 'Sur devis'}
                      </div>
                      <div className={cn('font-mono text-[10px] uppercase tracking-wider', pack.highlight ? 'text-brand-stone' : 'text-brand-stone')}>
                        {isAr ? 'تواصل معنا' : 'Contactez-nous'}
                      </div>
                    </div>

                    {/* Includes */}
                    <ul className="space-y-2 flex-1 mb-4">
                      {pack.includes.map((item, j) => (
                        <li key={j} className="flex items-start gap-2">
                          <div className="w-4 h-4 rounded-full bg-brand-teal flex items-center justify-center flex-shrink-0 mt-0.5">
                            <svg className="w-2.5 h-2.5 text-brand-charcoal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span className={cn('font-body text-xs', pack.highlight ? 'text-white/80' : 'text-brand-slate')}>
                            {item}
                          </span>
                        </li>
                      ))}
                      {pack.excludes.map((item, j) => (
                        <li key={`ex-${j}`} className="flex items-start gap-2 opacity-40">
                          <div className="w-4 h-4 rounded-full bg-brand-cloud flex items-center justify-center flex-shrink-0 mt-0.5">
                            <svg className="w-2.5 h-2.5 text-brand-stone" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </div>
                          <span className="font-body text-xs text-brand-stone">{item}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <a
                      href={getWhatsAppLink(`${waMessage} — ${pack.name}`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        'flex items-center justify-center gap-2 w-full py-3 rounded-xl font-body font-semibold text-sm transition-all duration-200',
                        pack.highlight
                          ? 'bg-brand-teal text-brand-charcoal hover:bg-brand-teal-dark shadow-brand'
                          : 'border-2 border-brand-cloud text-brand-slate hover:border-brand-teal hover:text-brand-teal'
                      )}
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z" />
                        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.523 5.847L.057 23.5l5.752-1.507A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.808 9.808 0 01-5.032-1.384l-.36-.214-3.733.979.997-3.645-.235-.374A9.808 9.808 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182c5.43 0 9.818 4.388 9.818 9.818 0 5.43-4.388 9.818-9.818 9.818z" />
                      </svg>
                      {pack.cta}
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </SectionWrapper>

      {/* Always included */}
      <SectionWrapper>
        <Container>
          <ScrollReveal>
            <SectionHeader
              badge={isAr ? 'دائماً مضمن' : 'Toujours inclus'}
              title={isAr ? 'مهما اخترت،' : 'Quelle que soit'}
              titleAccent={isAr ? 'هذا مضمون' : 'votre offre'}
              centered
            />
          </ScrollReveal>
          <ScrollReveal stagger>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {alwaysIncluded.map((item, i) => (
                <div key={i} className="flex items-center gap-4 bg-white rounded-brand-lg border border-brand-cloud shadow-card p-4">
                  <span className="text-2xl flex-shrink-0">{item.icon}</span>
                  <span className="font-body text-sm text-brand-slate font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </Container>
      </SectionWrapper>

      {/* Final CTA */}
      <SectionWrapper dark className="relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-brand-teal" />
        <Container narrow className="text-center relative z-10">
          <ScrollReveal>
            <h2 className="font-display font-black uppercase text-5xl text-white mb-4">
              {isAr ? 'احصل على عرضك' : 'Obtenez votre devis'}
            </h2>
            <p className="font-body text-brand-stone text-lg mb-10">
              {isAr ? 'رد في أقل من ساعتين. لا التزام.' : 'Réponse en moins de 2h. Sans engagement.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/${locale}/demo`}
                className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-brand-teal text-brand-charcoal font-body font-bold text-xl rounded-2xl hover:bg-brand-teal-dark transition-all shadow-brand-lg">
                {isAr ? 'طلب عرض أسعار' : 'Demander un devis'}
              </Link>
              <a href={getWhatsAppLink(waMessage)} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-5 bg-[#25D366] text-white font-body font-semibold text-lg rounded-2xl hover:bg-[#1ebe5a] transition-all">
                WhatsApp
              </a>
            </div>
          </ScrollReveal>
        </Container>
      </SectionWrapper>
    </>
  );
}
