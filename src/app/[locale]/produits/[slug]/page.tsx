import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { setRequestLocale } from 'next-intl/server';
import { getProductBySlug, getProducts, getFAQs } from '@/lib/db';
import {
  generateProductSchema,
  generateFAQSchema,
  generateBreadcrumbSchema,
  buildMetadata,
  getWhatsAppLink,
  SITE_URL,
} from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';
import { BreadcrumbNav } from '@/components/ui/BreadcrumbNav';
import { StaticFAQAccordion } from '@/components/ui/FAQAccordion';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Container, SectionWrapper } from '@/components/ui/SectionWrapper';
import { cn } from '@/lib/utils';
import type { Locale } from '@/types';

interface ProductPageProps {
  params: { locale: Locale; slug: string };
}

// Static product enrichment data
const PRODUCT_META: Record<string, {
  emoji: string;
  gradient: string;
  accentColor: string;
  features_fr: string[];
  features_ar: string[];
  specs_fr: Record<string, string>;
  specs_ar: Record<string, string>;
  useCases_fr: string[];
  useCases_ar: string[];
  faqs_fr: { question: string; answer: string }[];
  faqs_ar: { question: string; answer: string }[];
}> = {
  'logiciel-pos': {
    emoji: '⚙️',
    gradient: 'from-brand-teal via-brand-teal-dark to-[#006d5b]',
    accentColor: 'brand-charcoal',
    features_fr: [
      'Interface 100% en arabe — conçue au Maroc',
      'Login sécurisé par code PIN individuel',
      'Gestion des ventes en temps réel',
      'Stocks et alertes de rupture automatiques',
      'Rapports journaliers, hebdomadaires, mensuels',
      'Multi-caissiers avec permissions',
      'Impression de tickets personnalisés',
      'Compatible tous terminaux Windows',
    ],
    features_ar: [
      'واجهة عربية 100٪ — مصممة في المغرب',
      'تسجيل دخول آمن برمز PIN فردي',
      'إدارة المبيعات في الوقت الفعلي',
      'مخزون وتنبيهات نفاد تلقائية',
      'تقارير يومية وأسبوعية وشهرية',
      'متعدد أمناء الصندوق مع صلاحيات',
      'طباعة فواتير مخصصة',
      'متوافق مع جميع أجهزة Windows',
    ],
    specs_fr: {
      'Système': 'Windows 7, 8, 10, 11',
      'Langue': 'Arabe (interface native)',
      'Licence': 'Perpétuelle — à vie',
      'Abonnement': 'Aucun',
      'Multi-poste': 'Oui',
      'Mises à jour': 'Incluses',
      'Support': 'Téléphone + WhatsApp',
    },
    specs_ar: {
      'النظام': 'Windows 7, 8, 10, 11',
      'اللغة': 'عربية (واجهة أصلية)',
      'الترخيص': 'مدى الحياة',
      'الاشتراك': 'لا يوجد',
      'متعدد النقاط': 'نعم',
      'التحديثات': 'مضمنة',
      'الدعم': 'هاتف + واتساب',
    },
    useCases_fr: ['Épiceries & supérettes', 'Boucheries', 'Pharmacies', 'Hammams & piscines', 'Salles de sport'],
    useCases_ar: ['البقالات والسوبر ماركت', 'الملاحم', 'الصيدليات', 'الحمامات والمسابح', 'صالات الرياضة'],
    faqs_fr: [
      { question: 'Le logiciel fonctionne-t-il sans internet ?', answer: 'Oui. Bassir System fonctionne en mode hors-ligne. Internet n\'est nécessaire que pour les mises à jour.' },
      { question: 'Peut-on avoir plusieurs caisses ?', answer: 'Oui. Le logiciel supporte plusieurs postes de caisse sur le même réseau local.' },
      { question: 'Les mises à jour sont-elles payantes ?', answer: 'Non. Toutes les mises à jour futures sont incluses dans votre licence perpétuelle.' },
    ],
    faqs_ar: [
      { question: 'هل يعمل البرنامج بدون إنترنت؟', answer: 'نعم. يعمل بصير سيستم في وضع عدم الاتصال. الإنترنت ضروري فقط للتحديثات.' },
      { question: 'هل يمكن الحصول على عدة صناديق؟', answer: 'نعم. يدعم البرنامج عدة نقاط بيع على نفس الشبكة المحلية.' },
      { question: 'هل التحديثات مدفوعة؟', answer: 'لا. جميع التحديثات المستقبلية مضمنة في ترخيصك مدى الحياة.' },
    ],
  },
  'terminal-double-ecran': {
    emoji: '🖥️',
    gradient: 'from-brand-charcoal via-brand-slate to-[#1a1a2e]',
    accentColor: 'brand-teal',
    features_fr: [
      'Écran opérateur tactile haute réactivité',
      'Écran face client — ticket en temps réel',
      'Compatible HP, Synpos, Wincor Nixdorf',
      'Intégration native avec Bassir System',
      'Tiroir-caisse verrouillable intégré',
      'Port pour imprimante thermique',
      'Résistant à l\'usage intensif quotidien',
      'Installation et formation incluses',
    ],
    features_ar: [
      'شاشة أمين الصندوق التفاعلية عالية الاستجابة',
      'شاشة العميل — الفاتورة في الوقت الفعلي',
      'متوافق مع HP وSynpos وWincor Nixdorf',
      'تكامل أصلي مع بصير سيستم',
      'درج النقود القابل للقفل مدمج',
      'منفذ للطابعة الحرارية',
      'مقاوم للاستخدام المكثف اليومي',
      'التركيب والتدريب مضمنان',
    ],
    specs_fr: {
      'Écrans': '2 (opérateur + client)',
      'Type': 'Tactile capacitif',
      'Marques': 'HP / Synpos / Wincor',
      'OS': 'Windows',
      'Connectivité': 'USB, LAN, WiFi',
      'Garantie': 'Incluse',
    },
    specs_ar: {
      'الشاشات': '2 (أمين الصندوق + العميل)',
      'النوع': 'لمس سعوي',
      'الماركات': 'HP / Synpos / Wincor',
      'النظام': 'Windows',
      'الاتصال': 'USB, LAN, WiFi',
      'الضمان': 'مضمن',
    },
    useCases_fr: ['Épiceries', 'Supérettes', 'Boucheries', 'Pharmacies', 'Tout commerce de détail'],
    useCases_ar: ['البقالات', 'السوبر ماركت', 'الملاحم', 'الصيدليات', 'جميع تجارة التجزئة'],
    faqs_fr: [
      { question: 'Quelles marques de terminaux fournissez-vous ?', answer: 'Nous fournissons des terminaux HP, Synpos et Wincor Nixdorf — tous testés et compatibles avec Bassir System.' },
      { question: 'L\'installation est-elle incluse ?', answer: 'Oui. Notre technicien se déplace chez vous, installe le terminal, configure le logiciel et vous forme sur place.' },
    ],
    faqs_ar: [
      { question: 'ما ماركات الأجهزة التي تقدمونها؟', answer: 'نقدم أجهزة HP وSynpos وWincor Nixdorf — جميعها مختبرة ومتوافقة مع بصير سيستم.' },
      { question: 'هل التركيب مضمن؟', answer: 'نعم. يأتي فنيوننا إليك، يركبون الجهاز، يضبطون البرنامج ويدربونك في الموقع.' },
    ],
  },
  'imprimante-thermique': {
    emoji: '🖨️',
    gradient: 'from-[#1a1a2e] to-[#0f2027]',
    accentColor: 'brand-teal',
    features_fr: [
      'Impression silencieuse — confort pour vos clients',
      'Vitesse élevée — zéro attente à la caisse',
      'Papier 80mm — standard universel',
      'Compatible avec tous les logiciels POS',
      'Intégration directe avec Bassir System',
      'Fiable pour usage intensif quotidien',
      'QR code sur ticket (numéro WhatsApp)',
      'Logo de votre commerce sur chaque ticket',
    ],
    features_ar: [
      'طباعة صامتة — راحة لعملائك',
      'سرعة عالية — لا انتظار عند الصندوق',
      'ورق 80 مم — معيار عالمي',
      'متوافق مع جميع برامج نقطة البيع',
      'تكامل مباشر مع بصير سيستم',
      'موثوق للاستخدام المكثف اليومي',
      'رمز QR على الفاتورة (رقم واتساب)',
      'شعار متجرك على كل فاتورة',
    ],
    specs_fr: { 'Papier': '80mm', 'Type': 'Thermique direct', 'Connectivité': 'USB + LAN', 'Logo': 'Oui (personnalisable)', 'QR Code': 'Oui' },
    specs_ar: { 'الورق': '80 مم', 'النوع': 'حراري مباشر', 'الاتصال': 'USB + LAN', 'الشعار': 'نعم (قابل للتخصيص)', 'رمز QR': 'نعم' },
    useCases_fr: ['Tout commerce de détail', 'Restaurants & cafés', 'Pharmacies'],
    useCases_ar: ['جميع تجارة التجزئة', 'المطاعم والمقاهي', 'الصيدليات'],
    faqs_fr: [
      { question: 'Peut-on personnaliser le ticket ?', answer: 'Oui. Logo, nom du commerce, adresse, numéro WhatsApp et QR code — tout est personnalisable depuis Bassir System.' },
    ],
    faqs_ar: [
      { question: 'هل يمكن تخصيص الفاتورة؟', answer: 'نعم. الشعار، اسم المتجر، العنوان، رقم واتساب ورمز QR — كل شيء قابل للتخصيص من بصير سيستم.' },
    ],
  },
  'balance-codes-barres': {
    emoji: '⚖️',
    gradient: 'from-[#0f2027] via-[#203a43] to-[#2c5364]',
    accentColor: 'brand-teal',
    features_fr: [
      'Rongta RLS1000 — référence du marché',
      'Connexion directe avec Bassir System',
      'Poids affiché automatiquement en caisse',
      'Prix calculé instantanément',
      'Zéro saisie manuelle — zéro erreur',
      'Version tabletop et suspendue',
      'Capacité max 15kg, précision 5g',
      'Étiquette codes-barres intégrée',
    ],
    features_ar: [
      'Rongta RLS1000 — مرجع السوق',
      'اتصال مباشر مع بصير سيستم',
      'الوزن يظهر تلقائياً في الصندوق',
      'حساب السعر فوري',
      'لا إدخال يدوي — لا أخطاء',
      'نسخة طاولة ومعلقة',
      'سعة 15 كغ، دقة 5 غ',
      'طباعة ملصقات باركود مدمجة',
    ],
    specs_fr: { 'Modèle': 'Rongta RLS1000', 'Capacité': '15 kg max', 'Précision': '5g', 'Connexion': 'USB / RS232', 'Étiquettes': 'Oui' },
    specs_ar: { 'الموديل': 'Rongta RLS1000', 'السعة': '15 كغ', 'الدقة': '5 غ', 'الاتصال': 'USB / RS232', 'الملصقات': 'نعم' },
    useCases_fr: ['Boucheries', 'Épiceries (fromage, olives)', 'Marchés', 'Supérettes'],
    useCases_ar: ['الملاحم', 'البقالات (جبن، زيتون)', 'الأسواق', 'السوبر ماركت'],
    faqs_fr: [
      { question: 'Comment la balance se connecte-t-elle au logiciel ?', answer: 'Par câble USB ou RS232. La configuration se fait en 5 minutes depuis Bassir System. Aucun driver externe requis.' },
    ],
    faqs_ar: [
      { question: 'كيف يتصل الميزان بالبرنامج؟', answer: 'عبر كابل USB أو RS232. الإعداد يستغرق 5 دقائق من بصير سيستم. لا يلزم تثبيت برامج تشغيل خارجية.' },
    ],
  },
  'bracelet-rfid': {
    emoji: '📡',
    gradient: 'from-[#0a0a0a] via-[#1a0533] to-[#2d1b69]',
    accentColor: 'brand-teal',
    features_fr: [
      'NFC silicone — résistant à l\'eau',
      'Couleurs multiples (personnalisables)',
      'Lecteur RFID USB inclus',
      'Intégration complète avec Bassir System',
      'Contrôle d\'accès en temps réel',
      'Paiement cashless intégré',
      'Historique de consommation par bracelet',
      'Rapports d\'entrées journaliers',
    ],
    features_ar: [
      'سيليكون NFC — مقاوم للماء',
      'ألوان متعددة (قابلة للتخصيص)',
      'قارئ RFID USB مضمن',
      'تكامل كامل مع بصير سيستم',
      'التحكم في الوصول في الوقت الفعلي',
      'دفع بدون نقود مدمج',
      'سجل الاستهلاك لكل أسورة',
      'تقارير دخول يومية',
    ],
    specs_fr: { 'Technologie': 'NFC / RFID 13.56MHz', 'Matériau': 'Silicone waterproof', 'Lecteur': 'USB (inclus)', 'Couleurs': 'Multiple', 'Compatible': 'Bassir System' },
    specs_ar: { 'التقنية': 'NFC / RFID 13.56 ميغاهرتز', 'المادة': 'سيليكون مقاوم للماء', 'القارئ': 'USB (مضمن)', 'الألوان': 'متعدد', 'المتوافق': 'بصير سيستم' },
    useCases_fr: ['Hammams', 'Piscines', 'Salles de sport', 'Centres de bien-être'],
    useCases_ar: ['الحمامات', 'المسابح', 'صالات الرياضة', 'مراكز العافية'],
    faqs_fr: [
      { question: 'Comment fonctionne le paiement avec les bracelets ?', answer: 'Le client arrive, on scanne son bracelet. Le montant est débité de son solde prépayé ou enregistré pour paiement à la sortie.' },
      { question: 'Les bracelets sont-ils réutilisables ?', answer: 'Oui. Les bracelets NFC sont réutilisables indéfiniment. Il suffit de réinitialiser le profil client dans Bassir System.' },
    ],
    faqs_ar: [
      { question: 'كيف يعمل الدفع بالأساور؟', answer: 'يأتي العميل، نمسح أسورته. يُخصم المبلغ من رصيده المدفوع مسبقاً أو يُسجل للدفع عند الخروج.' },
      { question: 'هل الأساور قابلة لإعادة الاستخدام؟', answer: 'نعم. أساور NFC قابلة لإعادة الاستخدام إلى أجل غير مسمى. فقط أعد تهيئة ملف تعريف العميل في بصير سيستم.' },
    ],
  },
};

// Generate static params for all known product slugs
export async function generateStaticParams() {
  const locales: Locale[] = ['fr', 'ar'];
  const slugs = Object.keys(PRODUCT_META);
  return locales.flatMap(locale => slugs.map(slug => ({ locale, slug })));
}

export async function generateMetadata({ params: { locale, slug } }: ProductPageProps): Promise<Metadata> {
  const product = await getProductBySlug(slug);
  const isAr = locale === 'ar';

  if (!product) return { title: 'Produit non trouvé' };

  const title = isAr && product.meta_title_ar ? product.meta_title_ar : product.meta_title_fr;
  const description = isAr && product.meta_description_ar ? product.meta_description_ar : product.meta_description_fr;
  const productTitle = isAr && product.title_ar ? product.title_ar : product.title_fr;
  const productDesc = isAr && product.description_ar ? product.description_ar : product.description_fr;

  return buildMetadata({
    title: title ?? `${productTitle} | Bassir System Maroc`,
    description: description ?? productDesc ?? '',
    path: `/produits/${slug}`,
    locale,
    ogImage: product.hero_image ?? undefined,
  });
}

export default async function ProductPage({ params: { locale, slug } }: ProductPageProps) {
  setRequestLocale(locale);
  const [product, pageFaqs] = await Promise.all([
    getProductBySlug(slug),
    getFAQs(`produit-${slug}`, locale),
  ]);

  if (!product) notFound();

  const isAr = locale === 'ar';
  const meta = PRODUCT_META[slug];
  const title = isAr && product.title_ar ? product.title_ar : product.title_fr;
  const description = isAr && product.description_ar ? product.description_ar : product.description_fr;
  const content = isAr && product.content_ar ? product.content_ar : product.content_fr;
  const features = meta ? (isAr ? meta.features_ar : meta.features_fr) : [];
  const specs = meta ? (isAr ? meta.specs_ar : meta.specs_fr) : {};
  const useCases = meta ? (isAr ? meta.useCases_ar : meta.useCases_fr) : [];
  const staticFaqs = meta ? (isAr ? meta.faqs_ar : meta.faqs_fr) : [];
  const displayFaqs = pageFaqs.length > 0 ? pageFaqs : staticFaqs.map((f, i) => ({
    id: String(i), page_slug: `produit-${slug}`, locale, question: f.question, answer: f.answer, sort_order: i, is_priority: false,
  }));

  const gradient = meta?.gradient ?? 'from-brand-charcoal to-brand-slate';
  const emoji = meta?.emoji ?? '📦';

  // Schemas
  const productSchema = generateProductSchema(product, locale);
  const faqSchema = displayFaqs.length > 0 ? generateFAQSchema(displayFaqs) : null;
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Bassir System', url: `${SITE_URL}/${locale}` },
    { name: isAr ? 'المنتجات' : 'Produits', url: `${SITE_URL}/${locale}/produits` },
    { name: title ?? slug, url: `${SITE_URL}/${locale}/produits/${slug}` },
  ]);

  const whatsappMessage = isAr
    ? `السلام عليكم، أريد معلومات حول: ${title}`
    : `Bonjour, je souhaite des informations sur : ${title}`;

  return (
    <>
      <JsonLd data={productSchema} />
      <JsonLd data={breadcrumbSchema} />
      {faqSchema && <JsonLd data={faqSchema} />}

      {/* Hero — dark gradient with product visual */}
      <div className={cn('relative min-h-[60vh] flex items-end bg-gradient-to-br overflow-hidden pt-12', gradient)}>
        {/* Background texture */}
        <div className="absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

        {/* Large emoji */}
        <div className="absolute top-1/2 right-[10%] -translate-y-1/2 text-[16rem] opacity-[0.07] select-none hidden lg:block">
          {emoji}
        </div>

        <div className="absolute top-0 left-0 right-0 h-0.5 bg-brand-teal" />

        <Container className="relative z-10 pb-12 pt-4">
          <BreadcrumbNav
            items={[
              { label: 'Bassir System', href: `/${locale}` },
              { label: isAr ? 'المنتجات' : 'Produits', href: `/${locale}/produits` },
              { label: title ?? slug },
            ]}
            className="mb-8 [&_span]:text-white/40 [&_a]:text-white/40 [&_svg]:text-white/20"
          />

          <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-end">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-brand-teal font-medium mb-3 block">
                {isAr ? 'منتج' : 'Produit'} · Bassir System
              </span>
              <h1 className="font-display font-black uppercase leading-none text-5xl sm:text-6xl lg:text-7xl text-white mb-4">
                {title}
              </h1>
              <p className="font-body text-lg text-white/70 max-w-2xl leading-relaxed">
                {description}
              </p>
            </div>

            {/* CTA block */}
            <div className="flex flex-col gap-3 flex-shrink-0">
              <a
                href={getWhatsAppLink(whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-4 bg-brand-teal text-brand-charcoal font-body font-bold rounded-xl hover:bg-brand-teal-dark transition-all duration-200 shadow-brand-lg whitespace-nowrap"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.523 5.847L.057 23.5l5.752-1.507A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.808 9.808 0 01-5.032-1.384l-.36-.214-3.733.979.997-3.645-.235-.374A9.808 9.808 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182c5.43 0 9.818 4.388 9.818 9.818 0 5.43-4.388 9.818-9.818 9.818z" />
                </svg>
                {isAr ? 'طلب معلومات' : 'Demander un devis'}
              </a>
              <Link
                href={`/${locale}/demo`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-white/20 text-white font-body font-semibold rounded-xl hover:border-brand-teal hover:text-brand-teal transition-all duration-200 whitespace-nowrap text-sm"
              >
                {isAr ? 'طلب عرض تجريبي' : 'Demander une démo'}
              </Link>
            </div>
          </div>
        </Container>
      </div>

      {/* Features section */}
      {features.length > 0 && (
        <SectionWrapper>
          <Container>
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
              <ScrollReveal>
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-5 h-0.5 bg-brand-teal rounded" />
                    <span className="font-mono text-xs uppercase tracking-widest text-brand-teal">
                      {isAr ? 'المميزات' : 'Fonctionnalités'}
                    </span>
                  </div>
                  <h2 className="font-display font-black uppercase text-4xl text-brand-charcoal mb-6">
                    {isAr ? 'كل ما تحتاجه' : 'Tout ce dont'}<br />
                    <span className="text-brand-teal">{isAr ? 'في منتج واحد' : 'vous avez besoin'}</span>
                  </h2>
                  <ul className="space-y-3">
                    {features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-brand-teal flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg className="w-3 h-3 text-brand-charcoal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="font-body text-brand-slate leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>

              {/* Specs table */}
              {Object.keys(specs).length > 0 && (
                <ScrollReveal delay={150}>
                  <div className="bg-brand-charcoal rounded-brand-lg overflow-hidden">
                    <div className="px-6 py-4 border-b border-brand-slate/50">
                      <h3 className="font-display font-bold uppercase text-white text-xl">
                        {isAr ? 'المواصفات' : 'Spécifications'}
                      </h3>
                    </div>
                    <div className="p-6 space-y-0">
                      {Object.entries(specs).map(([key, value], i) => (
                        <div key={i} className={cn(
                          'flex items-center justify-between py-3.5',
                          i < Object.keys(specs).length - 1 && 'border-b border-brand-slate/40'
                        )}>
                          <span className="font-mono text-xs uppercase tracking-wider text-brand-stone">{key}</span>
                          <span className="font-body text-sm text-white font-medium text-right">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              )}
            </div>
          </Container>
        </SectionWrapper>
      )}

      {/* Use cases */}
      {useCases.length > 0 && (
        <SectionWrapper cloud>
          <Container>
            <ScrollReveal>
              <div className="text-center mb-10">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <div className="w-5 h-0.5 bg-brand-teal rounded" />
                  <span className="font-mono text-xs uppercase tracking-widest text-brand-teal">
                    {isAr ? 'استخدامات' : 'Cas d\'usage'}
                  </span>
                  <div className="w-5 h-0.5 bg-brand-teal rounded" />
                </div>
                <h2 className="font-display font-black uppercase text-3xl text-brand-charcoal">
                  {isAr ? 'مثالي لـ' : 'Idéal pour'}
                </h2>
              </div>
            </ScrollReveal>
            <ScrollReveal stagger>
              <div className="flex flex-wrap justify-center gap-3">
                {useCases.map((useCase, i) => (
                  <div key={i} className="flex items-center gap-2 bg-white border border-brand-cloud rounded-xl px-5 py-3 hover:border-brand-teal/40 hover:shadow-brand transition-all duration-200">
                    <div className="w-2 h-2 rounded-full bg-brand-teal flex-shrink-0" />
                    <span className="font-body text-sm font-medium text-brand-slate">{useCase}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </Container>
        </SectionWrapper>
      )}

      {/* FAQ section */}
      {displayFaqs.length > 0 && (
        <SectionWrapper>
          <Container>
            <div className="grid lg:grid-cols-[1fr_1.5fr] gap-12 items-start">
              <ScrollReveal>
                <div className="lg:sticky lg:top-28">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-5 h-0.5 bg-brand-teal rounded" />
                    <span className="font-mono text-xs uppercase tracking-widest text-brand-teal">FAQ</span>
                  </div>
                  <h2 className="font-display font-black uppercase text-3xl text-brand-charcoal mb-4">
                    {isAr ? 'أسئلة شائعة' : 'Questions fréquentes'}
                  </h2>
                  <a
                    href={getWhatsAppLink(whatsappMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-body text-sm text-brand-teal font-medium hover:gap-3 transition-all duration-200"
                  >
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
      )}

      {/* Bottom CTA */}
      <SectionWrapper dark className="relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-brand-teal" />
        <Container narrow className="text-center relative z-10">
          <ScrollReveal>
            <h2 className="font-display font-black uppercase text-4xl sm:text-5xl text-white mb-4">
              {isAr ? 'مهتم؟' : 'Intéressé ?'}
            </h2>
            <p className="font-body text-brand-stone mb-8 text-lg">
              {isAr
                ? 'تواصل معنا وفريقنا سيساعدك في اتخاذ القرار الصحيح.'
                : 'Contactez-nous. Notre équipe vous guide vers la solution adaptée.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/${locale}/demo`}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-teal text-brand-charcoal font-body font-semibold rounded-xl hover:bg-brand-teal-dark transition-colors">
                {isAr ? 'طلب عرض تجريبي مجاني' : 'Demander une démo gratuite'}
              </Link>
              <a href={getWhatsAppLink(whatsappMessage)} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#25D366] text-white font-body font-semibold rounded-xl hover:bg-[#1ebe5a] transition-colors">
                WhatsApp
              </a>
            </div>
            <div className="mt-8">
              <Link href={`/${locale}/produits`}
                className="font-body text-sm text-brand-stone hover:text-brand-teal transition-colors">
                ← {isAr ? 'العودة إلى المنتجات' : 'Retour aux produits'}
              </Link>
            </div>
          </ScrollReveal>
        </Container>
      </SectionWrapper>
    </>
  );
}
