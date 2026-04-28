import type { Metadata } from 'next';
import Link from 'next/link';
import { getFAQs } from '@/lib/db';
import {
  buildMetadata,
  generateSoftwareSchema,
  generateFAQSchema,
  generateBreadcrumbSchema,
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

interface LogicielPageProps {
  params: { locale: Locale };
}

export async function generateMetadata({ params: { locale } }: LogicielPageProps): Promise<Metadata> {
  const isAr = locale === 'ar';
  return buildMetadata({
    title: isAr
      ? 'برنامج كاشير المغرب | واجهة عربية 100٪ — ترخيص مدى الحياة | بصير سيستم'
      : 'Logiciel POS Maroc | Interface 100% Arabe — Licence à Vie | Bassir System',
    description: isAr
      ? 'برنامج بصير سيستم — أفضل برنامج كاشير مغربي بواجهة عربية كاملة. ترخيص مدى الحياة، بدون اشتراك شهري. مصمم للتجارة المغربية.'
      : 'Bassir System — Le meilleur logiciel POS marocain avec interface 100% arabe. Licence perpétuelle sans abonnement mensuel. Conçu pour le commerce marocain.',
    path: '/logiciel',
    locale,
  });
}

const FEATURES = {
  fr: [
    { icon: '🔤', title: 'Interface 100% Arabe', desc: 'Pas une traduction. Un logiciel conçu nativement en arabe pour le commerce marocain.' },
    { icon: '🔐', title: 'Login PIN sécurisé', desc: 'Chaque caissier a son propre code PIN. Traçabilité complète des opérations.' },
    { icon: '📊', title: 'Rapports en temps réel', desc: 'Ventes du jour, semaine, mois. Produits les plus vendus. CA instantané.' },
    { icon: '📦', title: 'Gestion des stocks', desc: 'Alertes de rupture automatiques. Historique des mouvements. Inventaire simplifié.' },
    { icon: '🖨️', title: 'Impression personnalisée', desc: 'Ticket avec votre logo, adresse, numéro WhatsApp et QR code.' },
    { icon: '👥', title: 'Multi-caissiers', desc: 'Plusieurs postes sur le même réseau. Chaque caissier avec ses permissions.' },
    { icon: '📡', title: 'Compatible RFID', desc: 'Intégration native avec les bracelets RFID pour hammam, piscine, salle de sport.' },
    { icon: '⚖️', title: 'Balance connectée', desc: 'La balance Rongta se connecte directement. Prix calculé automatiquement.' },
    { icon: '♾️', title: 'Licence à vie', desc: 'Payez une fois. Utilisez pour toujours. Aucun abonnement, aucun renouvellement.' },
    { icon: '🔄', title: 'Mises à jour incluses', desc: 'Toutes les futures versions incluses dans votre licence initiale.' },
    { icon: '📴', title: 'Fonctionne hors-ligne', desc: "Internet uniquement pour les mises à jour. Vos données ne quittent jamais votre commerce." },
    { icon: '🛠️', title: 'Support humain', desc: 'Une équipe locale. Pas un bot. Réponse rapide par téléphone et WhatsApp.' },
  ],
  ar: [
    { icon: '🔤', title: 'واجهة عربية 100٪', desc: 'ليست ترجمة. برنامج مصمم أصلاً بالعربية للتجارة المغربية.' },
    { icon: '🔐', title: 'تسجيل دخول PIN آمن', desc: 'لكل أمين صندوق رمز PIN خاص. تتبع كامل للعمليات.' },
    { icon: '📊', title: 'تقارير في الوقت الفعلي', desc: 'مبيعات اليوم والأسبوع والشهر. أكثر المنتجات مبيعاً. رقم الأعمال فوري.' },
    { icon: '📦', title: 'إدارة المخزون', desc: 'تنبيهات نفاد تلقائية. سجل التحركات. جرد مبسط.' },
    { icon: '🖨️', title: 'طباعة مخصصة', desc: 'فاتورة بشعارك، عنوانك، رقم واتساب ورمز QR.' },
    { icon: '👥', title: 'متعدد أمناء الصندوق', desc: 'عدة نقاط على نفس الشبكة. كل أمين بصلاحياته.' },
    { icon: '📡', title: 'متوافق مع RFID', desc: 'تكامل أصلي مع أساور RFID للحمام والمسبح وصالة الرياضة.' },
    { icon: '⚖️', title: 'ميزان متصل', desc: 'ميزان Rongta يتصل مباشرة. السعر يحسب تلقائياً.' },
    { icon: '♾️', title: 'ترخيص مدى الحياة', desc: 'ادفع مرة. استخدم للأبد. لا اشتراك، لا تجديد.' },
    { icon: '🔄', title: 'تحديثات مضمنة', desc: 'جميع الإصدارات المستقبلية مضمنة في ترخيصك الأولي.' },
    { icon: '📴', title: 'يعمل بدون إنترنت', desc: 'الإنترنت فقط للتحديثات. بياناتك لا تغادر متجرك أبداً.' },
    { icon: '🛠️', title: 'دعم بشري', desc: 'فريق محلي. ليس روبوتاً. رد سريع بالهاتف والواتساب.' },
  ],
};

const COMPARISON = {
  fr: {
    headers: ['Fonctionnalité', 'Bassir System', 'Concurrents'],
    rows: [
      ['Langue arabe native', '✓', '✗ ou partiel'],
      ['Licence à vie', '✓', '✗ abonnement'],
      ['Frais mensuels', 'Aucun', '150–600 DH/mois'],
      ['Installation sur site', '✓ inclus', 'En option'],
      ['Support en darija', '✓', '✗'],
      ['Compatible RFID', '✓ natif', '✗ ou addon'],
      ['Balance connectée', '✓ Rongta', 'Rarement'],
      ['Fait au Maroc', '✓', 'Importé'],
    ],
  },
  ar: {
    headers: ['الميزة', 'بصير سيستم', 'المنافسون'],
    rows: [
      ['لغة عربية أصلية', '✓', '✗ أو جزئي'],
      ['ترخيص مدى الحياة', '✓', '✗ اشتراك'],
      ['رسوم شهرية', 'لا شيء', '150–600 درهم/شهر'],
      ['تركيب في الموقع', '✓ مضمن', 'اختياري'],
      ['دعم بالدارجة', '✓', '✗'],
      ['متوافق مع RFID', '✓ أصلي', '✗ أو إضافة'],
      ['ميزان متصل', '✓ Rongta', 'نادراً'],
      ['صُنع في المغرب', '✓', 'مستورد'],
    ],
  },
};

const FAQS_FR = [
  { question: 'Bassir System fonctionne-t-il sans connexion internet ?', answer: "Oui. Le logiciel fonctionne en mode hors-ligne. Internet n'est nécessaire que pour les mises à jour et les synchronisations optionnelles." },
  { question: 'Combien coûte le logiciel Bassir System ?', answer: "Le tarif est communiqué sur devis selon votre configuration. Contactez-nous sur WhatsApp au 06 61 41 55 78. Aucun abonnement mensuel — vous payez une seule fois." },
  { question: 'Le logiciel supporte-t-il plusieurs caisses ?', answer: "Oui. Bassir System supporte plusieurs postes de caisse sur le même réseau local, avec gestion des permissions par caissier." },
  { question: 'Peut-on personnaliser les tickets de caisse ?', answer: "Oui. Logo, nom du commerce, adresse, numéro de téléphone, WhatsApp et QR code sont personnalisables depuis le panneau de configuration." },
  { question: "Qu'est-ce qui est inclus dans la licence à vie ?", answer: "Toutes les mises à jour futures, les nouvelles fonctionnalités, et le support technique sont inclus dans votre licence initiale. Aucun frais supplémentaire." },
  { question: 'Comment se fait la formation ?', answer: "Notre technicien vous forme sur place lors de l'installation. Formation pratique sur votre propre matériel avec vos propres données." },
];

const FAQS_AR = [
  { question: 'هل يعمل بصير سيستم بدون اتصال بالإنترنت؟', answer: 'نعم. يعمل البرنامج في وضع عدم الاتصال. الإنترنت ضروري فقط للتحديثات والمزامنة الاختيارية.' },
  { question: 'ما تكلفة برنامج بصير سيستم؟', answer: 'يتم تقديم السعر حسب الطلب وفقاً لإعداداتك. تواصل معنا على واتساب: 06 61 41 55 78. لا اشتراك شهري — تدفع مرة واحدة فقط.' },
  { question: 'هل يدعم البرنامج عدة صناديق؟', answer: 'نعم. يدعم بصير سيستم عدة نقاط بيع على نفس الشبكة المحلية مع إدارة الصلاحيات لكل أمين صندوق.' },
  { question: 'هل يمكن تخصيص فواتير الصندوق؟', answer: 'نعم. الشعار واسم المتجر والعنوان ورقم الهاتف والواتساب ورمز QR قابلة للتخصيص من لوحة الإعدادات.' },
  { question: 'ماذا يتضمن الترخيص مدى الحياة؟', answer: 'جميع التحديثات المستقبلية والميزات الجديدة والدعم التقني مضمنة في ترخيصك الأولي. لا رسوم إضافية.' },
  { question: 'كيف يتم التدريب؟', answer: 'يدربك فنيونا في الموقع خلال التركيب. تدريب عملي على معداتك الخاصة وبياناتك الخاصة.' },
];

export default async function LogicielPage({ params: { locale } }: LogicielPageProps) {
  const isAr = locale === 'ar';
  const pageFaqs = await getFAQs('logiciel', locale);
  const features = isAr ? FEATURES.ar : FEATURES.fr;
  const comparison = isAr ? COMPARISON.ar : COMPARISON.fr;
  const staticFaqs = isAr ? FAQS_AR : FAQS_FR;

  const displayFaqs = pageFaqs.length > 0
    ? pageFaqs
    : staticFaqs.map((f, i) => ({ id: String(i), page_slug: 'logiciel', locale, question: f.question, answer: f.answer, sort_order: i, is_priority: i < 3 }));

  const softwareSchema = generateSoftwareSchema(locale);
  const faqSchema = generateFAQSchema(displayFaqs);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Bassir System', url: `${SITE_URL}/${locale}` },
    { name: isAr ? 'البرنامج' : 'Logiciel', url: `${SITE_URL}/${locale}/logiciel` },
  ]);

  return (
    <>
      <JsonLd data={softwareSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />

      {/* Hero */}
      <div className="relative bg-white pt-12 pb-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-brand-teal/5 -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: 'radial-gradient(circle, #00C9B1 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

        <Container className="relative z-10">
          <BreadcrumbNav
            items={[
              { label: 'Bassir System', href: `/${locale}` },
              { label: isAr ? 'البرنامج' : 'Logiciel' },
            ]}
            className="mb-8"
          />

          <div className="grid lg:grid-cols-[1fr_auto] gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-brand-teal-light rounded-full border border-brand-teal/20">
                <span className="w-2 h-2 rounded-full bg-brand-teal animate-pulse" />
                <span className="font-mono text-xs uppercase tracking-widest text-brand-teal font-medium">
                  {isAr ? 'برنامج مغربي · ترخيص مدى الحياة' : 'Logiciel marocain · Licence à vie'}
                </span>
              </div>

              <h1 className="font-display font-black uppercase leading-none mb-6">
                <span className="block text-[clamp(3rem,7vw,6rem)] text-brand-charcoal">
                  {isAr ? 'برنامج' : 'Logiciel'}
                </span>
                <span className="block text-[clamp(3rem,7vw,6rem)] text-brand-teal">
                  {isAr ? 'POS عربي' : 'POS Arabe'}
                </span>
                <span className="block text-[clamp(3rem,7vw,6rem)] text-brand-charcoal">
                  {isAr ? 'للمغرب' : 'pour le Maroc'}
                </span>
              </h1>

              <p className="font-body text-xl text-brand-stone leading-relaxed max-w-2xl mb-10">
                {isAr
                  ? 'بصير سيستم — البرنامج الوحيد المصمم أصلاً بالعربية للتاجر المغربي. ترخيص مدى الحياة بدون اشتراك. مصنوع هنا، لكم.'
                  : "Bassir System — le seul logiciel POS conçu nativement en arabe pour le commerçant marocain. Licence perpétuelle sans abonnement. Fait ici, pour vous."}
              </p>

              <div className="flex flex-wrap gap-4">
                <Link href={`/${locale}/demo`}
                  className="inline-flex items-center gap-2.5 px-8 py-4 bg-brand-teal text-brand-charcoal font-body font-bold text-lg rounded-2xl hover:bg-brand-teal-dark transition-all shadow-brand-lg hover:shadow-[0_12px_40px_rgba(0,201,177,0.35)] active:scale-[0.98]">
                  {isAr ? 'طلب عرض تجريبي مجاني' : 'Demander une démo gratuite'}
                </Link>
                <a href={getWhatsAppLink(isAr ? 'السلام عليكم، أريد معلومات عن برنامج بصير' : 'Bonjour, je souhaite des infos sur Bassir System')}
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-4 border-2 border-brand-cloud text-brand-slate font-body font-semibold rounded-2xl hover:border-brand-teal hover:text-brand-teal transition-all">
                  WhatsApp
                </a>
              </div>
            </div>

            {/* Software mockup visual */}
            <div className="hidden lg:block">
              <div className="relative w-80">
                {/* Screen frame */}
                <div className="bg-brand-charcoal rounded-2xl p-3 shadow-[0_24px_80px_rgba(0,0,0,0.3)]">
                  <div className="bg-brand-slate rounded-xl overflow-hidden">
                    {/* Fake UI header */}
                    <div className="bg-brand-charcoal px-4 py-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-brand-teal flex items-center justify-center">
                          <span className="font-display font-black text-brand-charcoal text-xs">B</span>
                        </div>
                        <span className="font-mono text-[10px] text-white uppercase tracking-wider">BASSIR SYSTEM</span>
                      </div>
                      <span className="font-mono text-[10px] text-brand-stone">14:30</span>
                    </div>
                    {/* Fake UI content */}
                    <div className="p-4 space-y-3" dir="rtl">
                      <div className="bg-brand-teal/20 rounded-lg p-3">
                        <div className="font-mono text-[10px] text-brand-teal mb-1">المبيعات اليوم</div>
                        <div className="font-display font-black text-brand-teal text-2xl">2,450.00 DH</div>
                      </div>
                      {[
                        { label: 'عدد الفواتير', value: '56' },
                        { label: 'متوسط الفاتورة', value: '43.75 DH' },
                        { label: 'إجمالي الأرباح', value: '4,850.00 DH' },
                      ].map((row, i) => (
                        <div key={i} className="flex items-center justify-between py-2 border-b border-brand-charcoal/50">
                          <span className="font-body text-xs text-brand-stone">{row.label}</span>
                          <span className="font-mono text-xs text-white">{row.value}</span>
                        </div>
                      ))}
                      <div className="grid grid-cols-4 gap-2 pt-2">
                        {['المبيعات', 'المخزون', 'العملاء', 'التقارير'].map((item) => (
                          <div key={item} className="bg-brand-charcoal rounded-lg p-2 text-center">
                            <div className="w-6 h-6 rounded-lg bg-brand-teal/20 flex items-center justify-center mx-auto mb-1">
                              <div className="w-3 h-3 rounded bg-brand-teal/60" />
                            </div>
                            <span className="font-body text-[9px] text-brand-stone">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                {/* Teal glow */}
                <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-brand-teal/20 rounded-full blur-3xl pointer-events-none" />
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Features grid */}
      <SectionWrapper cloud>
        <Container>
          <ScrollReveal>
            <SectionHeader
              badge={isAr ? 'المميزات' : 'Fonctionnalités'}
              title={isAr ? '12 raisons de choisir' : '12 raisons de choisir'}
              titleAccent="Bassir System"
              centered
            />
          </ScrollReveal>
          <ScrollReveal stagger>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {features.map((feature, i) => (
                <div key={i} className={cn(
                  'p-5 rounded-brand-lg border transition-all duration-300 group hover:border-brand-teal/40 hover:shadow-brand',
                  i === 8 ? 'bg-brand-charcoal border-brand-teal/20 text-white' : 'bg-white border-brand-cloud'
                )}>
                  <div className="text-2xl mb-3">{feature.icon}</div>
                  <h3 className={cn('font-display font-bold uppercase text-base mb-1.5', i === 8 ? 'text-brand-teal' : 'text-brand-charcoal')}>
                    {feature.title}
                  </h3>
                  <p className={cn('font-body text-xs leading-relaxed', i === 8 ? 'text-brand-stone' : 'text-brand-stone')}>
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </Container>
      </SectionWrapper>

      {/* Comparison table */}
      <SectionWrapper>
        <Container>
          <ScrollReveal>
            <SectionHeader
              badge={isAr ? 'مقارنة' : 'Comparaison'}
              title={isAr ? 'لماذا بصير سيستم؟' : 'Pourquoi Bassir System ?'}
              centered
            />
          </ScrollReveal>
          <ScrollReveal>
            <div className="overflow-x-auto rounded-brand-lg border border-brand-cloud shadow-card">
              <table className="w-full">
                <thead>
                  <tr className="bg-brand-charcoal">
                    {comparison.headers.map((header, i) => (
                      <th key={i} className={cn(
                        'px-6 py-4 text-left font-display font-bold uppercase text-sm',
                        i === 1 ? 'text-brand-teal' : 'text-white'
                      )}>
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparison.rows.map((row, i) => (
                    <tr key={i} className={cn('border-b border-brand-cloud', i % 2 === 0 ? 'bg-white' : 'bg-brand-cloud/30')}>
                      <td className="px-6 py-4 font-body text-sm text-brand-slate">{row[0]}</td>
                      <td className="px-6 py-4 font-body text-sm font-semibold text-brand-teal">
                        <div className="flex items-center gap-2">
                          {row[1] === '✓' && <span className="w-5 h-5 rounded-full bg-brand-teal flex items-center justify-center flex-shrink-0">
                            <svg className="w-3 h-3 text-brand-charcoal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </span>}
                          {row[1]}
                        </div>
                      </td>
                      <td className="px-6 py-4 font-body text-sm text-brand-stone">{row[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollReveal>
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
                <Link href={`/${locale}/demo`}
                  className="inline-flex items-center gap-2 font-body text-sm font-semibold text-brand-teal mt-4 hover:gap-3 transition-all duration-200">
                  {isAr ? 'طلب عرض تجريبي' : 'Demander une démo'}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
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
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #00C9B1 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <Container narrow className="text-center relative z-10">
          <ScrollReveal>
            <h2 className="font-display font-black uppercase text-5xl sm:text-6xl text-white mb-6">
              {isAr ? 'جاهز للبدء؟' : 'Prêt à commencer ?'}
            </h2>
            <p className="font-body text-brand-stone text-lg mb-10">
              {isAr ? 'تركيب في 24 ساعة. تدريب في الموقع. دعم مستمر.' : 'Installation en 24h. Formation sur place. Support continu.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/${locale}/demo`}
                className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-brand-teal text-brand-charcoal font-body font-bold text-xl rounded-2xl hover:bg-brand-teal-dark transition-all shadow-brand-lg active:scale-[0.98]">
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
