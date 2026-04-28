import type { Metadata } from 'next';
import Link from 'next/link';
import { getFAQs } from '@/lib/db';
import {
  buildMetadata,
  generateFAQSchema,
  generateBreadcrumbSchema,
  generateLocalBusinessSchema,
  getWhatsAppLink,
  SITE_URL,
} from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';
import { BreadcrumbNav } from '@/components/ui/BreadcrumbNav';
import { StaticFAQAccordion } from '@/components/ui/FAQAccordion';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Container, SectionWrapper, SectionHeader } from '@/components/ui/SectionWrapper';
import { cn } from '@/lib/utils';
import type { Locale } from '@/types';

interface RFIDPageProps {
  params: { locale: Locale };
}

export async function generateMetadata({ params: { locale } }: RFIDPageProps): Promise<Metadata> {
  const isAr = locale === 'ar';
  return buildMetadata({
    title: isAr
      ? 'نظام RFID للحمام والمسبح المغرب | بصير سيستم — دخول وتسديد بدون نقود'
      : 'Solution RFID Hammam Piscine Maroc | Bassir System — Accès Contrôlé & Paiement Cashless',
    description: isAr
      ? 'نظام RFID من بصير سيستم للحمامات والمسابح وصالات الرياضة في المغرب. أساور NFC، تحكم في الدخول، دفع بدون نقود. تركيب في جميع أنحاء المغرب.'
      : 'Solution RFID Bassir System pour hammams, piscines et salles de sport au Maroc. Bracelets NFC, contrôle d\'accès, paiement cashless. Installation partout au Maroc.',
    path: '/rfid',
    locale,
  });
}

const USE_CASES = {
  fr: [
    {
      type: 'Hammam',
      emoji: '♨️',
      color: 'from-[#1a0a00] to-[#3d1a00]',
      accent: '#ff6b35',
      title: 'Hammam & Spa',
      description: 'Le client arrive, on lui attribue un bracelet. Il accède aux espaces, consomme des services. À la sortie, tout est calculé automatiquement.',
      points: [
        'Entrée sécurisée par scan bracelet',
        'Suivi du temps de séjour en temps réel',
        'Services additionnels (gommage, massage) débités sur bracelet',
        'Rapport d\'occupation journalier',
        'Historique par client',
      ],
    },
    {
      type: 'Piscine',
      emoji: '🏊',
      color: 'from-[#000d1a] to-[#001a33]',
      accent: '#0088cc',
      title: 'Piscine & Aquatique',
      description: 'Accès rapide, file d\'attente réduite. Paiement intégré pour les extras : vestiaires, restauration, cours de natation.',
      points: [
        'Accès contrôlé aux bassins par bracelet',
        'Séances courtes ou abonnements sur même bracelet',
        'Facturation automatique des extras',
        'Contrôle de la capacité maximale',
        'Rapports d\'affluence',
      ],
    },
    {
      type: 'Sport',
      emoji: '🏋️',
      color: 'from-[#0a000d] to-[#1a0033]',
      accent: '#9b59b6',
      title: 'Salle de Sport & Fitness',
      description: 'Gestion des abonnements intégrée. Le membre bipe à l\'entrée, son abonnement est vérifié automatiquement.',
      points: [
        'Vérification abonnement à l\'entrée',
        'Multi-accès (salle principale, piscine, sauna)',
        'Suivi des visites par membre',
        'Alertes abonnement expiré',
        'Statistiques d\'utilisation',
      ],
    },
  ],
  ar: [
    {
      type: 'Hammam',
      emoji: '♨️',
      color: 'from-[#1a0a00] to-[#3d1a00]',
      accent: '#ff6b35',
      title: 'الحمام والسبا',
      description: 'يأتي العميل، نعطيه أسورة. يدخل المرافق، يستهلك الخدمات. عند الخروج، يُحسب كل شيء تلقائياً.',
      points: [
        'دخول آمن بمسح الأسورة',
        'تتبع وقت الإقامة في الوقت الفعلي',
        'الخدمات الإضافية (تقشير، مساج) تُخصم من الأسورة',
        'تقرير الإشغال اليومي',
        'سجل لكل عميل',
      ],
    },
    {
      type: 'Pool',
      emoji: '🏊',
      color: 'from-[#000d1a] to-[#001a33]',
      accent: '#0088cc',
      title: 'المسبح والمائي',
      description: 'دخول سريع، طابور أقل. دفع متكامل للإضافات: غرف تبديل، مطعم، دروس سباحة.',
      points: [
        'تحكم في الوصول للأحواض بالأسورة',
        'جلسات قصيرة أو اشتراكات على نفس الأسورة',
        'فاتورة تلقائية للإضافات',
        'التحكم في الطاقة الاستيعابية القصوى',
        'تقارير الازدحام',
      ],
    },
    {
      type: 'Sport',
      emoji: '🏋️',
      color: 'from-[#0a000d] to-[#1a0033]',
      accent: '#9b59b6',
      title: 'صالة الرياضة واللياقة',
      description: 'إدارة الاشتراكات متكاملة. يُدخل العضو الأسورة عند الدخول، يُتحقق من اشتراكه تلقائياً.',
      points: [
        'التحقق من الاشتراك عند الدخول',
        'دخول متعدد (القاعة الرئيسية، المسبح، الساونا)',
        'تتبع زيارات كل عضو',
        'تنبيهات انتهاء الاشتراك',
        'إحصائيات الاستخدام',
      ],
    },
  ],
};

const FAQS_FR = [
  { question: 'Comment fonctionne le système RFID de Bassir System ?', answer: "À l'arrivée, le client reçoit un bracelet NFC associé à son profil. À chaque service ou accès, on scanne le bracelet. À la sortie, le total est calculé et encaissé automatiquement depuis Bassir System." },
  { question: 'Les bracelets sont-ils réutilisables ?', answer: "Oui. Les bracelets NFC silicone sont réutilisables indéfiniment. Il suffit de réinitialiser le profil dans Bassir System entre chaque client." },
  { question: 'Peut-on définir un solde prépayé sur le bracelet ?', answer: "Oui. Le client peut charger un solde sur son bracelet à l'accueil. Chaque service est débité en temps réel. Le solde restant est remboursé ou conservé à la prochaine visite." },
  { question: 'Le système fonctionne-t-il pour les abonnements mensuels ?', answer: "Oui. Les abonnements mensuels ou saisonniers sont gérés directement dans Bassir System. Le bracelet vérifie automatiquement la validité de l'abonnement à chaque accès." },
  { question: 'Quel lecteur RFID est fourni ?', answer: "Un lecteur RFID USB est fourni avec les bracelets. Il se connecte directement au terminal Bassir System. Aucune configuration complexe requise." },
];

const FAQS_AR = [
  { question: 'كيف يعمل نظام RFID من بصير سيستم؟', answer: 'عند الوصول، يتلقى العميل أسورة NFC مرتبطة بملفه الشخصي. عند كل خدمة أو دخول، نمسح الأسورة. عند الخروج، يُحسب الإجمالي ويُحصَّل تلقائياً من بصير سيستم.' },
  { question: 'هل الأساور قابلة لإعادة الاستخدام؟', answer: 'نعم. أساور سيليكون NFC قابلة لإعادة الاستخدام إلى أجل غير مسمى. فقط أعد تعيين الملف الشخصي في بصير سيستم بين كل عميل.' },
  { question: 'هل يمكن تحديد رصيد مدفوع مسبقاً على الأسورة؟', answer: 'نعم. يمكن للعميل شحن رصيد على أسورته عند الاستقبال. يُخصم كل خدمة في الوقت الفعلي. يُسترد الرصيد المتبقي أو يُحتفظ به للزيارة القادمة.' },
  { question: 'هل يعمل النظام للاشتراكات الشهرية؟', answer: 'نعم. تدار الاشتراكات الشهرية أو الموسمية مباشرة في بصير سيستم. تتحقق الأسورة تلقائياً من صلاحية الاشتراك عند كل دخول.' },
  { question: 'ما قارئ RFID المرفق؟', answer: 'يُرفق قارئ RFID USB مع الأساور. يتصل مباشرة بطرفية بصير سيستم. لا إعداد معقد مطلوب.' },
];

export default async function RFIDPage({ params: { locale } }: RFIDPageProps) {
  const isAr = locale === 'ar';
  const pageFaqs = await getFAQs('rfid', locale);
  const useCases = isAr ? USE_CASES.ar : USE_CASES.fr;
  const staticFaqs = isAr ? FAQS_AR : FAQS_FR;

  const displayFaqs = pageFaqs.length > 0
    ? pageFaqs
    : staticFaqs.map((f, i) => ({ id: String(i), page_slug: 'rfid', locale, question: f.question, answer: f.answer, sort_order: i, is_priority: i < 3 }));

  const faqSchema = generateFAQSchema(displayFaqs);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Bassir System', url: `${SITE_URL}/${locale}` },
    { name: isAr ? 'الحمام والمسبح' : 'Hammam & Piscine', url: `${SITE_URL}/${locale}/rfid` },
  ]);

  return (
    <>
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={generateLocalBusinessSchema(locale)} />

      {/* Hero — dark purple/teal */}
      <div className="relative bg-brand-charcoal pt-12 pb-20 overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 70% 50%, rgba(0,201,177,0.08) 0%, transparent 60%)' }} />
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle, #00C9B1 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-brand-teal" />

        <Container className="relative z-10">
          <BreadcrumbNav
            items={[
              { label: 'Bassir System', href: `/${locale}` },
              { label: isAr ? 'الحمام والمسبح' : 'Hammam & Piscine' },
            ]}
            className="mb-8 [&_span]:text-white/40 [&_a]:text-white/40"
          />

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-brand-teal/20 bg-brand-teal/10">
                <span className="font-mono text-xs uppercase tracking-widest text-brand-teal">RFID · NFC</span>
              </div>
              <h1 className="font-display font-black uppercase leading-none mb-6">
                <span className="block text-[clamp(2.5rem,6vw,5.5rem)] text-white">{isAr ? 'دخول' : 'Accès'}</span>
                <span className="block text-[clamp(2.5rem,6vw,5.5rem)] text-brand-teal">{isAr ? 'مُتحكَّم فيه' : 'contrôlé.'}</span>
                <span className="block text-[clamp(2.5rem,6vw,5.5rem)] text-white">{isAr ? 'دفع متكامل.' : 'Paiement'}</span>
                <span className="block text-[clamp(2.5rem,6vw,5.5rem)] text-brand-teal">{isAr ? '' : 'intégré.'}</span>
              </h1>
              <p className="font-body text-lg text-white/70 max-w-xl leading-relaxed mb-8">
                {isAr
                  ? 'نظام RFID من بصير سيستم للحمامات والمسابح وصالات الرياضة. أسورة NFC مقاومة للماء. دخول آمن، دفع بدون نقود، تقارير لحظية.'
                  : 'Solution RFID Bassir System pour hammams, piscines et salles de sport. Bracelets NFC waterproof. Accès sécurisé, paiement cashless, rapports en temps réel.'}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href={`/${locale}/demo`}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-brand-teal text-brand-charcoal font-body font-bold text-lg rounded-2xl hover:bg-brand-teal-dark transition-all shadow-brand-lg active:scale-[0.98]">
                  {isAr ? 'طلب عرض تجريبي' : 'Demander une démo'}
                </Link>
                <a href={getWhatsAppLink(isAr ? 'السلام عليكم، أريد معلومات عن نظام RFID' : 'Bonjour, je souhaite des infos sur la solution RFID')}
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-4 border-2 border-brand-slate text-white rounded-2xl hover:border-brand-teal hover:text-brand-teal transition-all font-body font-semibold">
                  WhatsApp
                </a>
              </div>
            </div>

            {/* RFID visual */}
            <div className="hidden lg:flex justify-center">
              <div className="relative">
                {/* Wristbands */}
                <div className="flex gap-4 mb-6">
                  {['#00C9B1', '#0088cc', '#e74c3c', '#2ecc71', '#9b59b6'].map((color, i) => (
                    <div key={i} className="relative" style={{ transform: `rotate(${(i - 2) * 8}deg)` }}>
                      <div className="w-16 h-28 rounded-full border-[6px] flex items-center justify-center"
                        style={{ borderColor: color, background: `${color}20` }}>
                        <div className="w-6 h-6 rounded-full border-2 flex items-center justify-center"
                          style={{ borderColor: color }}>
                          <span className="font-display font-black text-xs" style={{ color }}>B</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* RFID reader */}
                <div className="bg-brand-slate rounded-2xl p-4 mx-auto w-48 shadow-2xl">
                  <div className="bg-brand-charcoal rounded-xl p-3 mb-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-3 h-3 rounded-full bg-brand-teal animate-pulse" />
                      <span className="font-mono text-[10px] text-brand-teal">BASSIR RFID</span>
                    </div>
                    <div className="font-display font-black text-brand-teal text-xl">دخول مسموح</div>
                    <div className="font-mono text-[10px] text-brand-stone mt-1">#10258 · 120.00 DH</div>
                  </div>
                  {/* Signal waves */}
                  <div className="flex justify-center gap-1">
                    {[1,2,3].map(i => (
                      <div key={i} className="h-4 w-4 rounded-full border-2 border-brand-teal/40 animate-ping"
                        style={{ animationDelay: `${i * 0.3}s`, animationDuration: '1.5s' }} />
                    ))}
                  </div>
                </div>

                {/* Teal glow */}
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-64 h-32 bg-brand-teal/20 rounded-full blur-3xl pointer-events-none" />
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* How it works — 3 steps */}
      <SectionWrapper>
        <Container>
          <ScrollReveal>
            <SectionHeader
              badge={isAr ? 'كيف يعمل' : 'Comment ça marche'}
              title={isAr ? 'بسيط' : 'Simple'}
              titleAccent={isAr ? 'كالنسيم' : 'comme bonjour'}
              centered
            />
          </ScrollReveal>
          <ScrollReveal stagger>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
              {/* Connecting line */}
              <div className="hidden md:block absolute top-10 left-1/4 right-1/4 h-0.5 bg-brand-teal/20 z-0" />

              {[
                {
                  step: '01',
                  icon: '🪙',
                  title: isAr ? 'الاستقبال' : 'Accueil',
                  desc: isAr ? 'العميل يدفع ويتلقى أسورة NFC مرتبطة بملفه الشخصي.' : 'Le client paie et reçoit un bracelet NFC associé à son profil.',
                },
                {
                  step: '02',
                  icon: '📡',
                  title: isAr ? 'الاستخدام' : 'Utilisation',
                  desc: isAr ? 'مسح الأسورة عند كل دخول أو خدمة. كل شيء مسجل تلقائياً.' : 'Scan du bracelet à chaque accès ou service. Tout est enregistré automatiquement.',
                },
                {
                  step: '03',
                  icon: '💳',
                  title: isAr ? 'الخروج' : 'Sortie',
                  desc: isAr ? 'يتحقق بصير سيستم من الرصيد ويطبع الفاتورة النهائية. الأسورة تُعاد لإعادة الاستخدام.' : 'Bassir System vérifie le solde et imprime la facture finale. Le bracelet est récupéré.',
                },
              ].map((item, i) => (
                <div key={i} className="relative z-10 text-center bg-white rounded-brand-lg border border-brand-cloud shadow-card p-6">
                  <div className="w-16 h-16 rounded-2xl bg-brand-charcoal flex items-center justify-center mx-auto mb-4 relative">
                    <span className="text-3xl">{item.icon}</span>
                    <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-brand-teal flex items-center justify-center font-mono text-[10px] text-brand-charcoal font-bold">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="font-display font-black uppercase text-xl text-brand-charcoal mb-2">{item.title}</h3>
                  <p className="font-body text-sm text-brand-stone leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </Container>
      </SectionWrapper>

      {/* Use cases — Hammam, Piscine, Sport */}
      <SectionWrapper dark>
        <Container>
          <ScrollReveal>
            <SectionHeader
              badge={isAr ? 'استخدامات' : 'Cas d\'usage'}
              title={isAr ? 'حلول لكل' : 'Solutions pour'}
              titleAccent={isAr ? 'نشاط' : 'chaque activité'}
              centered dark
            />
          </ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {useCases.map((useCase, i) => (
              <ScrollReveal key={i} delay={i * 150}>
                <div className={cn('rounded-brand-lg overflow-hidden bg-gradient-to-br h-full', useCase.color)}>
                  <div className="p-6">
                    <div className="text-4xl mb-4">{useCase.emoji}</div>
                    <div className="font-mono text-xs uppercase tracking-widest mb-2" style={{ color: useCase.accent }}>
                      {useCase.type}
                    </div>
                    <h3 className="font-display font-black uppercase text-2xl text-white mb-3">{useCase.title}</h3>
                    <p className="font-body text-sm text-white/60 leading-relaxed mb-5">{useCase.description}</p>
                    <ul className="space-y-2">
                      {useCase.points.map((point, j) => (
                        <li key={j} className="flex items-start gap-2">
                          <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                            style={{ background: useCase.accent }}>
                            <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span className="font-body text-xs text-white/70">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="h-1" style={{ background: useCase.accent }} />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </SectionWrapper>

      {/* FAQ */}
      <SectionWrapper cloud>
        <Container>
          <div className="grid lg:grid-cols-[1fr_1.5fr] gap-12 items-start">
            <ScrollReveal>
              <div className="lg:sticky lg:top-28">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-5 h-0.5 bg-brand-teal rounded" />
                  <span className="font-mono text-xs uppercase tracking-widest text-brand-teal">FAQ</span>
                </div>
                <h2 className="font-display font-black uppercase text-4xl text-brand-charcoal mb-4">
                  {isAr ? 'أسئلة' : 'Questions'}<br />
                  <span className="text-brand-teal">{isAr ? 'شائعة' : 'fréquentes'}</span>
                </h2>
                <a href={getWhatsAppLink(isAr ? 'السلام عليكم، سؤال عن نظام RFID' : 'Bonjour, question sur la solution RFID')}
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-body text-sm text-brand-teal font-medium hover:gap-3 transition-all duration-200">
                  {isAr ? 'سؤال آخر؟ واتساب' : 'Autre question ? WhatsApp'}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={150}>
              <StaticFAQAccordion faqs={staticFaqs} />
            </ScrollReveal>
          </div>
        </Container>
      </SectionWrapper>

      {/* CTA */}
      <SectionWrapper dark className="relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-brand-teal" />
        <Container narrow className="text-center relative z-10">
          <ScrollReveal>
            <h2 className="font-display font-black uppercase text-5xl text-white mb-6">
              {isAr ? 'هل أنت مهتم؟' : 'Intéressé ?'}
            </h2>
            <p className="font-body text-brand-stone text-lg mb-10">
              {isAr ? 'نتصل بك في أقل من ساعتين لمناقشة احتياجاتك.' : 'Nous vous rappelons en moins de 2h pour discuter de vos besoins.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/${locale}/demo`}
                className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-brand-teal text-brand-charcoal font-body font-bold text-xl rounded-2xl hover:bg-brand-teal-dark transition-all shadow-brand-lg">
                {isAr ? 'طلب عرض تجريبي مجاني' : 'Demander une démo gratuite'}
              </Link>
              <a href="tel:+212661415578"
                className="inline-flex items-center justify-center gap-2 px-8 py-5 border-2 border-brand-slate text-white font-body font-semibold text-lg rounded-2xl hover:border-brand-teal hover:text-brand-teal transition-all">
                06 61 41 55 78
              </a>
            </div>
          </ScrollReveal>
        </Container>
      </SectionWrapper>
    </>
  );
}
