import type { Metadata } from 'next';
import { buildMetadata, generateBreadcrumbSchema, generateFAQSchema, SITE_URL } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';
import { BreadcrumbNav } from '@/components/ui/BreadcrumbNav';
import { Container, SectionWrapper } from '@/components/ui/SectionWrapper';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { DemoForm } from '@/components/DemoForm';
import type { Locale } from '@/types';

interface DemoPageProps {
  params: { locale: Locale };
}

export async function generateMetadata({ params: { locale } }: DemoPageProps): Promise<Metadata> {
  const isAr = locale === 'ar';
  return buildMetadata({
    title: isAr
      ? 'طلب عرض تجريبي مجاني | بصير سيستم — برنامج POS المغرب'
      : 'Demander une Démo Gratuite | Bassir System — Logiciel POS Maroc',
    description: isAr
      ? 'احصل على عرض تجريبي مجاني لبرنامج بصير سيستم. سنتصل بك خلال ساعتين. تركيب في 24 ساعة في جميع أنحاء المغرب.'
      : 'Demandez votre démo gratuite de Bassir System. Nous vous rappelons en 2h. Installation en 24h partout au Maroc.',
    path: '/demo',
    locale,
  });
}

const TRUST_ITEMS_FR = [
  { icon: '⚡', title: 'Réponse en 2h', desc: 'Notre équipe vous rappelle dans les 2 heures ouvrables.' },
  { icon: '🛠️', title: 'Installation en 24h', desc: 'Technicien sur place dans les 24-48h après confirmation.' },
  { icon: '🎓', title: 'Formation incluse', desc: 'Formation pratique sur vos propres produits lors de l\'installation.' },
  { icon: '♾️', title: 'Sans engagement', desc: 'Démo 100% gratuite. Aucun contrat forcé.' },
];

const TRUST_ITEMS_AR = [
  { icon: '⚡', title: 'رد في ساعتين', desc: 'فريقنا يتصل بك خلال ساعتين من أوقات العمل.' },
  { icon: '🛠️', title: 'تركيب في 24 ساعة', desc: 'فني في الموقع خلال 24-48 ساعة بعد التأكيد.' },
  { icon: '🎓', title: 'تدريب مضمن', desc: 'تدريب عملي على منتجاتك الخاصة خلال التركيب.' },
  { icon: '♾️', title: 'بدون التزام', desc: 'عرض تجريبي مجاني 100٪. لا عقد إلزامي.' },
];

const FAQ_FR = [
  { question: 'La démo est-elle vraiment gratuite ?', answer: 'Oui, totalement gratuite et sans engagement. Nous venons chez vous, installons le matériel, configurons le logiciel et vous formons.' },
  { question: 'Combien de temps dure l\'installation ?', answer: 'En général une journée complète. Le technicien se déplace chez vous et reste jusqu\'à ce que tout fonctionne parfaitement.' },
  { question: 'Faut-il un contrat ou un abonnement ?', answer: 'Non. Bassir System fonctionne avec une licence perpétuelle. Vous payez une seule fois, sans abonnement mensuel.' },
  { question: 'Intervenez-vous dans toutes les villes du Maroc ?', answer: 'Oui. Casablanca, Rabat, Marrakech, Fès, Tanger, Agadir et toutes les autres villes. Appelez-nous : 06 61 41 55 78.' },
];

const FAQ_AR = [
  { question: 'هل العرض التجريبي مجاني حقاً؟', answer: 'نعم، مجاني تماماً وبدون التزام. نأتي إليك، نركب المعدات، نضبط البرنامج وندربك.' },
  { question: 'كم يستغرق التركيب؟', answer: 'عموماً يوم كامل. الفني يأتي إليك ويبقى حتى يعمل كل شيء بشكل مثالي.' },
  { question: 'هل هناك عقد أو اشتراك؟', answer: 'لا. يعمل بصير سيستم بترخيص مدى الحياة. تدفع مرة واحدة، بدون اشتراك شهري.' },
  { question: 'هل تعملون في جميع مدن المغرب؟', answer: 'نعم. الدار البيضاء، الرباط، مراكش، فاس، طنجة، أكادير وجميع المدن الأخرى. اتصل بنا: 06 61 41 55 78.' },
];

export default function DemoPage({ params: { locale } }: DemoPageProps) {
  const isAr = locale === 'ar';
  const trustItems = isAr ? TRUST_ITEMS_AR : TRUST_ITEMS_FR;
  const faqs = isAr ? FAQ_AR : FAQ_FR;

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Bassir System', url: `${SITE_URL}/${locale}` },
    { name: isAr ? 'طلب عرض تجريبي' : 'Demander une démo', url: `${SITE_URL}/${locale}/demo` },
  ]);

  const faqSchema = generateFAQSchema(
    faqs.map((f, i) => ({ id: String(i), page_slug: 'demo', locale, question: f.question, answer: f.answer, sort_order: i, is_priority: true }))
  );

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={faqSchema} />

      {/* Page layout — two columns */}
      <div className="min-h-screen bg-white" dir={isAr ? 'rtl' : 'ltr'}>

        {/* Top hero strip */}
        <div className="bg-brand-charcoal pt-10 pb-0 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle, #00C9B1 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-brand-teal" />
          <Container className="relative z-10">
            <BreadcrumbNav
              items={[
                { label: 'Bassir System', href: `/${locale}` },
                { label: isAr ? 'طلب عرض تجريبي' : 'Demander une démo' },
              ]}
              className="mb-6 [&_span]:text-white/40 [&_a]:text-white/40"
            />
            <div className="grid lg:grid-cols-2 gap-0 items-end">
              <div className="pb-10">
                <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full bg-brand-teal/10 border border-brand-teal/20">
                  <span className="w-2 h-2 rounded-full bg-brand-teal animate-pulse" />
                  <span className="font-mono text-xs text-brand-teal uppercase tracking-widest">
                    {isAr ? 'مجاني · بدون التزام' : 'Gratuit · Sans engagement'}
                  </span>
                </div>
                <h1 className="font-display font-black uppercase leading-none text-5xl sm:text-6xl text-white mb-4">
                  {isAr ? 'اطلب' : 'Demandez'}<br />
                  <span className="text-brand-teal">{isAr ? 'عرضك التجريبي' : 'votre démo'}</span>
                </h1>
                <p className="font-body text-lg text-white/60 max-w-md">
                  {isAr
                    ? 'أرسل طلبك. سنتصل بك خلال ساعتين. تركيب كامل في 24-48 ساعة.'
                    : 'Remplissez le formulaire. Nous vous rappelons en 2h. Installation complète en 24-48h.'}
                </p>
              </div>

              {/* Trust items — overlapping the form */}
              <div className="hidden lg:grid grid-cols-2 gap-3 pb-10 lg:pl-8">
                {trustItems.map((item, i) => (
                  <div key={i} className="bg-brand-slate/60 rounded-xl p-4">
                    <div className="text-2xl mb-2">{item.icon}</div>
                    <div className="font-display font-bold uppercase text-white text-sm mb-1">{item.title}</div>
                    <div className="font-body text-xs text-brand-stone leading-relaxed">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </div>

        {/* Main content */}
        <Container className="py-12">
          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-16 items-start">

            {/* Form */}
            <ScrollReveal>
              <div className="bg-white rounded-2xl border border-brand-cloud shadow-card p-6 sm:p-8">
                <h2 className="font-display font-black uppercase text-2xl text-brand-charcoal mb-6">
                  {isAr ? 'معلوماتك' : 'Vos informations'}
                </h2>
                <DemoForm locale={locale} />
              </div>
            </ScrollReveal>

            {/* Right side — info */}
            <div className="space-y-6">

              {/* Mobile trust items */}
              <div className="lg:hidden grid grid-cols-2 gap-3">
                {trustItems.map((item, i) => (
                  <div key={i} className="bg-brand-cloud/50 rounded-xl p-4 border border-brand-cloud">
                    <div className="text-xl mb-2">{item.icon}</div>
                    <div className="font-display font-bold uppercase text-brand-charcoal text-sm mb-1">{item.title}</div>
                    <div className="font-body text-xs text-brand-stone leading-relaxed">{item.desc}</div>
                  </div>
                ))}
              </div>

              {/* Direct contact */}
              <ScrollReveal delay={100}>
                <div className="bg-brand-charcoal rounded-2xl p-6">
                  <h3 className="font-display font-bold uppercase text-white text-lg mb-4">
                    {isAr ? 'تفضل التواصل المباشر؟' : 'Préférez le contact direct ?'}
                  </h3>
                  <div className="space-y-3">
                    <a href="https://wa.me/212661415578" target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 bg-[#25D366]/10 border border-[#25D366]/20 rounded-xl hover:bg-[#25D366]/20 transition-colors group">
                      <div className="w-10 h-10 rounded-xl bg-[#25D366] flex items-center justify-center flex-shrink-0">
                        <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z" />
                          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.523 5.847L.057 23.5l5.752-1.507A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.808 9.808 0 01-5.032-1.384l-.36-.214-3.733.979.997-3.645-.235-.374A9.808 9.808 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182c5.43 0 9.818 4.388 9.818 9.818 0 5.43-4.388 9.818-9.818 9.818z" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-body font-semibold text-white text-sm">WhatsApp</div>
                        <div className="font-mono text-xs text-brand-stone">06 61 41 55 78</div>
                      </div>
                    </a>
                    <a href="tel:+212661415578"
                      className="flex items-center gap-3 p-3 bg-brand-slate/60 border border-brand-slate rounded-xl hover:border-brand-teal/30 transition-colors">
                      <div className="w-10 h-10 rounded-xl bg-brand-teal/20 text-brand-teal flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-body font-semibold text-white text-sm">
                          {isAr ? 'اتصل بنا' : 'Appel direct'}
                        </div>
                        <div className="font-mono text-xs text-brand-stone">06 61 41 55 78</div>
                      </div>
                    </a>
                    <a href="tel:+212615087213"
                      className="flex items-center gap-3 p-3 bg-brand-slate/60 border border-brand-slate rounded-xl hover:border-brand-teal/30 transition-colors">
                      <div className="w-10 h-10 rounded-xl bg-brand-teal/20 text-brand-teal flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-body font-semibold text-white text-sm">
                          {isAr ? 'خط ثانٍ' : 'Ligne 2'}
                        </div>
                        <div className="font-mono text-xs text-brand-stone">06 15 08 72 13</div>
                      </div>
                    </a>
                  </div>
                </div>
              </ScrollReveal>

              {/* FAQ mini */}
              <ScrollReveal delay={200}>
                <div className="space-y-3">
                  {faqs.slice(0, 3).map((faq, i) => (
                    <div key={i} className="bg-brand-cloud/40 rounded-xl p-4 border border-brand-cloud">
                      <div className="font-body font-semibold text-brand-charcoal text-sm mb-1">{faq.question}</div>
                      <div className="font-body text-xs text-brand-stone leading-relaxed">{faq.answer}</div>
                    </div>
                  ))}
                </div>
              </ScrollReveal>

            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
