import type { Metadata } from 'next';
import Link from 'next/link';
import {
  buildMetadata,
  generateBreadcrumbSchema,
  generateLocalBusinessSchema,
  generateFAQSchema,
  getWhatsAppLink,
  SITE_URL,
} from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';
import { BreadcrumbNav } from '@/components/ui/BreadcrumbNav';
import { Container, SectionWrapper } from '@/components/ui/SectionWrapper';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { StaticFAQAccordion } from '@/components/ui/FAQAccordion';
import type { Locale } from '@/types';

interface ContactPageProps {
  params: { locale: Locale };
}

export async function generateMetadata({ params: { locale } }: ContactPageProps): Promise<Metadata> {
  const isAr = locale === 'ar';
  return buildMetadata({
    title: isAr
      ? 'اتصل بنا | بصير سيستم — الدار البيضاء، المغرب'
      : 'Contact | Bassir System — Casablanca, Maroc',
    description: isAr
      ? 'تواصل مع بصير سيستم. هاتف: 06 61 41 55 78. واتساب متاح. تركيب في جميع أنحاء المغرب: الدار البيضاء، الرباط، مراكش، فاس، طنجة.'
      : 'Contactez Bassir System. Téléphone : 06 61 41 55 78. WhatsApp disponible. Installation partout au Maroc : Casablanca, Rabat, Marrakech, Fès, Tanger.',
    path: '/contact',
    locale,
  });
}

const CONTACT_FAQS_FR = [
  { question: 'Quels sont vos horaires d\'ouverture ?', answer: 'Lundi au samedi, de 09h00 à 18h00. Pour les urgences techniques, notre équipe est joignable sur WhatsApp.' },
  { question: 'Répondez-vous le week-end ?', answer: 'Nous répondons sur WhatsApp le samedi. Le dimanche est fermé sauf urgences.' },
  { question: 'Combien de temps pour un rappel après contact ?', answer: 'Nous rappelons dans les 2 heures ouvrables. WhatsApp est souvent plus rapide.' },
];

const CONTACT_FAQS_AR = [
  { question: 'ما هي أوقات العمل؟', answer: 'من الاثنين إلى السبت، من 09:00 إلى 18:00. للطوارئ التقنية، فريقنا متاح على واتساب.' },
  { question: 'هل تردون في عطلة نهاية الأسبوع؟', answer: 'نرد على واتساب يوم السبت. الأحد مغلق إلا للطوارئ.' },
  { question: 'كم يستغرق الرد بعد التواصل؟', answer: 'نتصل بك خلال ساعتين من أوقات العمل. واتساب عادة أسرع.' },
];

export default function ContactPage({ params: { locale } }: ContactPageProps) {
  const isAr = locale === 'ar';
  const faqs = isAr ? CONTACT_FAQS_AR : CONTACT_FAQS_FR;

  const localBusiness = generateLocalBusinessSchema(locale);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Bassir System', url: `${SITE_URL}/${locale}` },
    { name: isAr ? 'اتصل بنا' : 'Contact', url: `${SITE_URL}/${locale}/contact` },
  ]);
  const faqSchema = generateFAQSchema(
    faqs.map((f, i) => ({ id: String(i), page_slug: 'contact', locale, question: f.question, answer: f.answer, sort_order: i, is_priority: true }))
  );

  return (
    <>
      <JsonLd data={localBusiness} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={faqSchema} />

      <div dir={isAr ? 'rtl' : 'ltr'}>
        {/* Hero */}
        <div className="bg-brand-charcoal pt-12 pb-16 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle, #00C9B1 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-brand-teal" />
          <Container className="relative z-10">
            <BreadcrumbNav
              items={[
                { label: 'Bassir System', href: `/${locale}` },
                { label: isAr ? 'اتصل بنا' : 'Contact' },
              ]}
              className="mb-6 [&_span]:text-white/40 [&_a]:text-white/40"
            />
            <h1 className="font-display font-black uppercase leading-none text-5xl sm:text-6xl text-white mb-4">
              {isAr ? 'تواصل' : 'Contactez'}<br />
              <span className="text-brand-teal">{isAr ? 'معنا' : 'nous'}</span>
            </h1>
            <p className="font-body text-lg text-white/60 max-w-xl">
              {isAr
                ? 'فريقنا يجيب. بالعربية، بالفرنسية، بالدارجة. لا روبوت.'
                : 'Notre équipe répond. En français, en arabe, en darija. Pas de bot.'}
            </p>
          </Container>
        </div>

        {/* Main content */}
        <SectionWrapper>
          <Container>
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">

              {/* Left — Contact methods */}
              <ScrollReveal>
                <div className="space-y-4">
                  <h2 className="font-display font-black uppercase text-3xl text-brand-charcoal mb-6">
                    {isAr ? 'كيف تتواصل معنا' : 'Comment nous contacter'}
                  </h2>

                  {/* WhatsApp — PRIMARY */}
                  <a
                    href={getWhatsAppLink(isAr ? 'السلام عليكم، أريد معلومات عن بصير سيستم' : 'Bonjour, je souhaite des informations sur Bassir System')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-5 bg-[#25D366]/10 border-2 border-[#25D366]/30 rounded-2xl hover:border-[#25D366] hover:bg-[#25D366]/15 transition-all duration-200 group"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-[#25D366] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
                      <svg viewBox="0 0 24 24" fill="white" className="w-7 h-7">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z" />
                        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.523 5.847L.057 23.5l5.752-1.507A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.808 9.808 0 01-5.032-1.384l-.36-.214-3.733.979.997-3.645-.235-.374A9.808 9.808 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182c5.43 0 9.818 4.388 9.818 9.818 0 5.43-4.388 9.818-9.818 9.818z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-display font-black uppercase text-xl text-brand-charcoal">WhatsApp</div>
                      <div className="font-mono text-brand-stone text-sm">06 61 41 55 78</div>
                      <div className="font-body text-xs text-[#25D366] font-medium mt-0.5">
                        {isAr ? '← الأسرع · رد فوري' : '← Le plus rapide · Réponse immédiate'}
                      </div>
                    </div>
                    <svg className={`w-5 h-5 text-[#25D366] flex-shrink-0 ${isAr ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>

                  {/* Phone 1 */}
                  <a href="tel:+212661415578"
                    className="flex items-center gap-4 p-5 bg-white border border-brand-cloud rounded-2xl hover:border-brand-teal/40 hover:shadow-brand transition-all duration-200 group">
                    <div className="w-14 h-14 rounded-2xl bg-brand-teal-light text-brand-teal flex items-center justify-center flex-shrink-0 group-hover:bg-brand-teal group-hover:text-brand-charcoal transition-all duration-200">
                      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-display font-black uppercase text-xl text-brand-charcoal">
                        {isAr ? 'خط أساسي' : 'Ligne principale'}
                      </div>
                      <div className="font-mono text-brand-stone text-sm">06 61 41 55 78</div>
                    </div>
                  </a>

                  {/* Phone 2 */}
                  <a href="tel:+212615087213"
                    className="flex items-center gap-4 p-5 bg-white border border-brand-cloud rounded-2xl hover:border-brand-teal/40 hover:shadow-brand transition-all duration-200 group">
                    <div className="w-14 h-14 rounded-2xl bg-brand-teal-light text-brand-teal flex items-center justify-center flex-shrink-0 group-hover:bg-brand-teal group-hover:text-brand-charcoal transition-all duration-200">
                      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-display font-black uppercase text-xl text-brand-charcoal">
                        {isAr ? 'خط ثانٍ' : 'Ligne 2'}
                      </div>
                      <div className="font-mono text-brand-stone text-sm">06 15 08 72 13</div>
                    </div>
                  </a>

                  {/* Address — schema-ready */}
                  <div className="flex items-start gap-4 p-5 bg-white border border-brand-cloud rounded-2xl"
                    itemScope itemType="https://schema.org/LocalBusiness">
                    <meta itemProp="name" content="Bassir System" />
                    <meta itemProp="telephone" content="+212661415578" />
                    <div className="w-14 h-14 rounded-2xl bg-brand-teal-light text-brand-teal flex items-center justify-center flex-shrink-0">
                      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                      <div className="font-display font-black uppercase text-xl text-brand-charcoal mb-1">
                        {isAr ? 'الموقع' : 'Localisation'}
                      </div>
                      <div className="font-body text-brand-stone text-sm">
                        <span itemProp="addressLocality">{isAr ? 'الدار البيضاء' : 'Casablanca'}</span>,{' '}
                        <span itemProp="addressCountry">{isAr ? 'المغرب' : 'Maroc'}</span>
                      </div>
                      <div className="font-mono text-xs text-brand-teal mt-1">
                        {isAr ? 'تركيب في جميع أنحاء المغرب' : 'Installation partout au Maroc'}
                      </div>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex items-center gap-4 p-5 bg-brand-teal-light border border-brand-teal/20 rounded-2xl">
                    <div className="w-14 h-14 rounded-2xl bg-brand-teal flex items-center justify-center flex-shrink-0">
                      <svg className="w-7 h-7 text-brand-charcoal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-display font-black uppercase text-xl text-brand-charcoal">
                        {isAr ? 'ساعات العمل' : 'Horaires'}
                      </div>
                      <div className="font-body text-brand-slate text-sm font-medium">
                        {isAr ? 'الاثنين – السبت : 09:00 – 18:00' : 'Lun – Sam : 09:00 – 18:00'}
                      </div>
                      <div className="font-mono text-xs text-brand-teal mt-0.5">
                        {isAr ? 'الأحد: مغلق' : 'Dimanche : fermé'}
                      </div>
                    </div>
                  </div>

                </div>
              </ScrollReveal>

              {/* Right — Map + CTA + FAQ */}
              <div className="space-y-6">
                <ScrollReveal delay={100}>
                  {/* Google Maps embed */}
                  <div className="rounded-2xl overflow-hidden border border-brand-cloud shadow-card">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d106375.61299088167!2d-7.6611!3d33.5731!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7cd4778aa113b%3A0xb06c1d84f310fd3!2sCasablanca!5e0!3m2!1sfr!2sma!4v1234567890"
                      width="100%"
                      height="280"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Bassir System — Casablanca, Maroc"
                    />
                    <div className="p-4 bg-brand-charcoal flex items-center justify-between">
                      <div>
                        <div className="font-display font-bold uppercase text-white text-sm">Bassir System</div>
                        <div className="font-mono text-xs text-brand-stone">
                          {isAr ? 'الدار البيضاء، المغرب' : 'Casablanca, Maroc'}
                        </div>
                      </div>
                      <a
                        href="https://maps.google.com/?q=Casablanca,Maroc"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-xs text-brand-teal hover:underline"
                      >
                        {isAr ? 'فتح الخريطة' : 'Ouvrir Maps'}
                      </a>
                    </div>
                  </div>
                </ScrollReveal>

                {/* Demo CTA */}
                <ScrollReveal delay={150}>
                  <div className="bg-brand-charcoal rounded-2xl p-6">
                    <h3 className="font-display font-black uppercase text-white text-2xl mb-2">
                      {isAr ? 'طلب عرض تجريبي' : 'Demander une démo'}
                    </h3>
                    <p className="font-body text-brand-stone text-sm mb-5">
                      {isAr ? 'أرسل طلبك عبر النموذج. رد في ساعتين.' : 'Formulaire en ligne. Rappel en 2h.'}
                    </p>
                    <Link href={`/${locale}/demo`}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-brand-teal text-brand-charcoal font-body font-semibold rounded-xl hover:bg-brand-teal-dark transition-colors w-full justify-center">
                      {isAr ? 'طلب عرض تجريبي مجاني' : 'Demander une démo gratuite'}
                    </Link>
                  </div>
                </ScrollReveal>

                {/* FAQ */}
                <ScrollReveal delay={200}>
                  <div>
                    <h3 className="font-display font-bold uppercase text-brand-charcoal text-xl mb-4">
                      {isAr ? 'أسئلة شائعة' : 'Questions fréquentes'}
                    </h3>
                    <StaticFAQAccordion faqs={faqs} />
                  </div>
                </ScrollReveal>
              </div>

            </div>
          </Container>
        </SectionWrapper>
      </div>
    </>
  );
}
