import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { setRequestLocale } from 'next-intl/server';
import { getPostBySlug, getPosts, getFAQs } from '@/lib/db';
import {
  buildMetadata,
  generateBreadcrumbSchema,
  generateFAQSchema,
  SITE_URL,
} from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';
import { BreadcrumbNav } from '@/components/ui/BreadcrumbNav';
import { StaticFAQAccordion } from '@/components/ui/FAQAccordion';
import { Container, SectionWrapper } from '@/components/ui/SectionWrapper';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { cn } from '@/lib/utils';
import type { Locale } from '@/types';

// Static article content for the 4 starter articles
const STATIC_ARTICLES: Record<string, {
  title_fr: string; title_ar: string;
  excerpt_fr: string; excerpt_ar: string;
  content_fr: string; content_ar: string;
  category: string; reading_time: number;
  published_at: string; focus_keyword: string;
  faqs_fr: { question: string; answer: string }[];
  faqs_ar: { question: string; answer: string }[];
}> = {
  'meilleur-logiciel-pos-maroc': {
    title_fr: 'Meilleur logiciel POS Maroc 2025 : guide complet pour choisir votre caisse',
    title_ar: 'أفضل برنامج كاشير بالمغرب 2025 : دليل كامل لاختيار نقطة بيعك',
    excerpt_fr: 'Comment choisir le bon logiciel de caisse pour votre commerce au Maroc ? Interface arabe, licence à vie, compatibilité matériel... On vous guide.',
    excerpt_ar: 'كيف تختار برنامج الكاشير المناسب لمتجرك في المغرب؟ واجهة عربية، ترخيص مدى الحياة، توافق المعدات... نرشدك.',
    category: 'Logiciel POS', reading_time: 7,
    published_at: '2025-01-15', focus_keyword: 'logiciel POS Maroc',
    content_fr: `
## Pourquoi le choix d'un logiciel POS est crucial pour votre commerce au Maroc

Le logiciel de caisse est le cœur de votre commerce. Il gère vos ventes, votre stock, vos rapports et l'expérience de votre client en caisse. Un mauvais choix coûte du temps, de l'argent et crée des frictions quotidiennes pour vos caissiers.

Au Maroc, le marché des logiciels POS présente une particularité importante : la grande majorité des commerçants et de leurs équipes travaillent en arabe. Un logiciel qui n'est pas nativement en arabe crée des erreurs, ralentit les opérations et complique la formation des nouveaux employés.

## Les critères essentiels pour choisir votre logiciel POS au Maroc

### 1. Interface en arabe natif

Ce n'est pas la même chose qu'un logiciel "traduit en arabe". Un logiciel conçu nativement en arabe pense comme un commerçant marocain. Les termes sont corrects, l'affichage est optimisé pour la droite vers la gauche (RTL), et vos équipes n'ont pas besoin de formation technique avancée.

**Bassir System** est conçu au Maroc pour le Maroc. L'interface arabe n'est pas un ajout — c'est le fondement du produit.

### 2. Modèle de licence : à vie vs abonnement mensuel

C'est LE critère le plus important économiquement. Deux modèles s'affrontent :

**Abonnement mensuel** : vous payez 150 à 600 DH par mois. Sur 3 ans, cela représente entre 5 400 DH et 21 600 DH — et vous ne possédez rien.

**Licence à vie** : vous payez une seule fois. Le logiciel vous appartient. Les mises à jour sont incluses. Aucun frais récurrent.

Pour un commerce marocain qui cherche à maîtriser ses coûts, la licence à vie est économiquement supérieure dès la deuxième année.

### 3. Compatibilité avec le matériel local

Votre logiciel POS doit fonctionner avec les terminaux et périphériques disponibles au Maroc : terminaux HP, Synpos ou Wincor Nixdorf, imprimantes thermiques 80mm, balances Rongta, scanners codes-barres.

Vérifiez toujours la liste de compatibilité avant d'acheter.

### 4. Support en darija

Quand vous avez un problème à 11h du matin avec une file d'attente de clients, vous avez besoin d'un support qui répond en quelques minutes et qui parle votre langue. Pas un ticket en anglais avec une réponse en 48h.

### 5. Gestion des stocks et rapports

Un bon logiciel POS doit vous donner en temps réel :
- Les ventes du jour, de la semaine, du mois
- Les produits les plus vendus
- Les alertes de rupture de stock
- Le chiffre d'affaires par caissier

## Bassir System : le logiciel POS marocain

Bassir System répond à tous ces critères. Interface 100% arabe, licence perpétuelle, compatible avec tous les périphériques courants au Maroc, support humain en darija, installation sur site dans les 24h.

Pour plus d'informations ou une démo gratuite, contactez-nous au **06 61 41 55 78**.
    `,
    content_ar: `
## لماذا اختيار برنامج POS أمر بالغ الأهمية لمتجرك في المغرب

برنامج الكاشير هو قلب متجرك. يدير مبيعاتك، مخزونك، تقاريرك وتجربة عميلك عند الصندوق. الاختيار الخاطئ يكلفك وقتاً ومالاً ويخلق احتكاكاً يومياً لأمناء صندوقك.

في المغرب، يتميز سوق برامج POS بخاصية مهمة: الغالبية العظمى من التجار وفرقهم تعمل بالعربية.

## معايير اختيار برنامج POS في المغرب

### 1. واجهة عربية أصلية

ليس مجرد برنامج "مترجم للعربية". برنامج مصمم أصلاً بالعربية يفكر كتاجر مغربي.

**بصير سيستم** مصمم في المغرب للمغرب. الواجهة العربية ليست إضافة — بل هي أساس المنتج.

### 2. نموذج الترخيص: مدى الحياة مقابل الاشتراك الشهري

**الاشتراك الشهري**: تدفع 150 إلى 600 درهم شهرياً. على 3 سنوات، يمثل ذلك ما بين 5,400 و21,600 درهم — ولا تملك شيئاً.

**ترخيص مدى الحياة**: تدفع مرة واحدة. البرنامج ملكك. التحديثات مضمنة. لا رسوم متكررة.

### 3. التوافق مع المعدات المحلية

يجب أن يعمل برنامج POS مع الأجهزة والملحقات المتوفرة في المغرب: أجهزة HP وSynpos وWincor Nixdorf، طابعات حرارية 80 مم، موازين Rongta، ماسحات باركود.

### 4. الدعم بالدارجة

عندما تواجه مشكلة وأمامك صف من العملاء، تحتاج دعماً يرد في دقائق ويتكلم لغتك.

## بصير سيستم: برنامج POS المغربي

بصير سيستم يستوفي جميع هذه المعايير. واجهة عربية 100٪، ترخيص مدى الحياة، توافق مع جميع الملحقات الشائعة في المغرب، دعم بشري بالدارجة، تركيب في الموقع خلال 24 ساعة.

للمزيد من المعلومات أو عرض تجريبي مجاني، اتصل بنا على **06 61 41 55 78**.
    `,
    faqs_fr: [
      { question: 'Quel est le meilleur logiciel POS pour une épicerie au Maroc ?', answer: 'Bassir System est particulièrement adapté pour les épiceries au Maroc : interface arabe, gestion des produits en vrac avec balance connectée, et rapports journaliers.' },
      { question: 'Un logiciel POS peut-il fonctionner sans internet au Maroc ?', answer: 'Oui. Bassir System fonctionne en mode hors-ligne. Internet n\'est utilisé que pour les mises à jour.' },
    ],
    faqs_ar: [
      { question: 'ما هو أفضل برنامج POS للبقالة في المغرب؟', answer: 'بصير سيستم مناسب بشكل خاص للبقالات في المغرب: واجهة عربية، إدارة المنتجات السائبة بميزان متصل، وتقارير يومية.' },
      { question: 'هل يمكن لبرنامج POS العمل بدون إنترنت في المغرب؟', answer: 'نعم. يعمل بصير سيستم في وضع عدم الاتصال. الإنترنت يُستخدم فقط للتحديثات.' },
    ],
  },
  'caisse-enregistreuse-arabe-maroc': {
    title_fr: 'Caisse enregistreuse en arabe au Maroc : pourquoi c\'est essentiel',
    title_ar: 'كاشير بالعربية في المغرب: لماذا هو ضروري',
    excerpt_fr: 'Pourquoi une caisse enregistreuse avec interface en arabe fait la différence pour votre équipe et vos opérations quotidiennes.',
    excerpt_ar: 'لماذا يصنع كاشير بواجهة عربية الفرق لفريقك وعملياتك اليومية.',
    category: 'Commerce', reading_time: 5,
    published_at: '2025-01-22', focus_keyword: 'caisse enregistreuse arabe Maroc',
    content_fr: `
## Le problème des logiciels POS importés au Maroc

La majorité des logiciels de caisse disponibles au Maroc sont importés d'Europe ou des États-Unis. Ils ont été traduits en arabe après coup — ce qui crée plusieurs problèmes concrets dans votre commerce quotidien.

**Les problèmes d'une traduction tardive :**
- Termes incorrects ou peu naturels en arabe commercial marocain
- Disposition de l'interface pensée pour le LTR (gauche à droite), mal adaptée au RTL
- Formation difficile pour les employés qui ne maîtrisent pas le français ou l'anglais
- Erreurs de saisie plus fréquentes à cause d'une interface inconfortable

## Ce que change une interface arabe native

Quand le logiciel est conçu nativement en arabe dès le départ, tout change :

**Pour vos caissiers :** Ils travaillent dans leur langue naturelle. La formation prend quelques heures au lieu de plusieurs jours. Les erreurs de saisie sont rares.

**Pour votre manager :** Les rapports sont en arabe. Les alertes de stock sont en arabe. Il comprend les données sans effort de traduction.

**Pour vos clients :** Le ticket de caisse peut inclure le nom de votre commerce en arabe. Certains clients apprécient cette touche locale.

## Bassir System : conçu ici, pour vous

Bassir System ne traduit pas. Il pense en arabe. L'interface a été construite avec des commerçants marocains, testée dans des commerces marocains.

Login par code PIN — votre caissier n'a pas besoin de taper son nom en alphabet latin.

Contactez-nous pour une démonstration gratuite : **06 61 41 55 78**.
    `,
    content_ar: `
## مشكلة برامج POS المستوردة في المغرب

معظم برامج الكاشير المتاحة في المغرب مستوردة من أوروبا أو الولايات المتحدة. تمت ترجمتها للعربية لاحقاً — مما يخلق مشاكل عملية عديدة في عملك اليومي.

**مشاكل الترجمة المتأخرة:**
- مصطلحات غير صحيحة أو غير طبيعية بالعربية التجارية المغربية
- تصميم واجهة مفكر فيه للكتابة من اليسار لليمين، سيئ التكيف مع RTL
- تدريب صعب للموظفين الذين لا يتقنون الفرنسية أو الإنجليزية

## ما الذي يغيره برنامج بواجهة عربية أصلية

عندما يُصمم البرنامج أصلاً بالعربية منذ البداية، يتغير كل شيء:

**لأمناء الصندوق:** يعملون بلغتهم الطبيعية. التدريب يستغرق ساعات بدلاً من أيام.

**لمديرك:** التقارير بالعربية. تنبيهات المخزون بالعربية. يفهم البيانات بدون جهد ترجمة.

## بصير سيستم: مصمم هنا، لكم

بصير سيستم لا يترجم. يفكر بالعربية. تم بناء الواجهة مع التجار المغاربة، واختبارها في المتاجر المغربية.

اتصل بنا لعرض تجريبي مجاني: **06 61 41 55 78**.
    `,
    faqs_fr: [
      { question: 'Peut-on former un caissier sans formation informatique sur Bassir System ?', answer: 'Oui. Le login par code PIN et l\'interface en arabe rendent la formation très rapide. La plupart des caissiers sont opérationnels en 2-3 heures.' },
    ],
    faqs_ar: [
      { question: 'هل يمكن تدريب أمين صندوق بدون تدريب معلوماتي على بصير سيستم؟', answer: 'نعم. تسجيل الدخول برمز PIN والواجهة العربية يجعلان التدريب سريعاً جداً. معظم أمناء الصندوق يصبحون قادرين على العمل في 2-3 ساعات.' },
    ],
  },
  'logiciel-hammam-rfid-maroc': {
    title_fr: 'Logiciel hammam et piscine avec RFID au Maroc : tout ce qu\'il faut savoir',
    title_ar: 'برنامج حمام ومسبح مع RFID في المغرب: كل ما تحتاج معرفته',
    excerpt_fr: 'Les bracelets RFID révolutionnent la gestion des hammams et piscines au Maroc. Accès contrôlé, paiement cashless, rapports en temps réel.',
    excerpt_ar: 'أساور RFID تثور إدارة الحمامات والمسابح في المغرب. دخول مُتحكَّم فيه، دفع بدون نقود، تقارير فورية.',
    category: 'RFID', reading_time: 6,
    published_at: '2025-02-01', focus_keyword: 'logiciel hammam Maroc RFID',
    content_fr: `
## La gestion traditionnelle des hammams : le problème

Pendant des décennies, les hammams et piscines au Maroc ont fonctionné avec un système manuel : un ticket en papier, un caissier qui note à la main, et souvent des pertes importantes dues aux erreurs ou à la fraude.

Les problèmes concrets :
- Impossible de savoir combien de personnes sont dans le hammam en temps réel
- Pas d'historique fiable des entrées
- Les services supplémentaires (gommage, massage) sont souvent mal facturés
- La monnaie crée des files d'attente et des frictions

## Comment fonctionne le système RFID Bassir System

### L'arrivée du client

Le client arrive à l'accueil. L'agent crée une fiche client dans Bassir System et lui attribue un bracelet NFC. Le bracelet est associé à son profil : type de séjour, services souhaités, solde prépayé si applicable.

### À l'intérieur

Chaque porte d'accès ou zone est équipée d'un lecteur RFID. Le client scanne son bracelet pour entrer. Bassir System enregistre l'heure d'entrée. Si le bracelet n'est pas valide (solde insuffisant, abonnement expiré), l'accès est refusé automatiquement.

### À la sortie

Le client présente son bracelet à l'accueil. Bassir System calcule le total : temps de séjour + services consommés. Le paiement est effectué une seule fois, sans confusion.

## Avantages concrets pour votre hammam

**Réduction des pertes :** Plus de tickets perdus. Chaque service est enregistré électroniquement.

**Statistiques en temps réel :** Nombre de clients présents, services les plus consommés, heures de pointe.

**Abonnements intégrés :** Les clients réguliers peuvent charger un abonnement mensuel sur leur bracelet.

**Bracelets réutilisables :** Les bracelets NFC silicone résistent à l'eau et sont réutilisables indéfiniment.

Contactez Bassir System pour une démo de la solution RFID : **06 61 41 55 78**
    `,
    content_ar: `
## مشكلة الإدارة التقليدية للحمامات

لعقود، عملت الحمامات والمسابح في المغرب بنظام يدوي: تذكرة ورقية، أمين صندوق يدون يدوياً، وغالباً خسائر كبيرة بسبب الأخطاء.

## كيف يعمل نظام RFID من بصير سيستم

### وصول العميل
يصل العميل للاستقبال. يُنشئ الموظف ملف عميل في بصير سيستم ويعطيه أسورة NFC. الأسورة مرتبطة بملفه الشخصي.

### في الداخل
كل باب دخول مجهز بقارئ RFID. العميل يمسح أسورته للدخول. يسجل بصير سيستم وقت الدخول.

### عند الخروج
يقدم العميل أسورته للاستقبال. يحسب بصير سيستم الإجمالي: وقت الإقامة + الخدمات المستهلكة.

## مزايا ملموسة لحمامك

**تقليل الخسائر:** لا تذاكر مفقودة. كل خدمة مسجلة إلكترونياً.

**إحصائيات فورية:** عدد العملاء الحاضرين، الخدمات الأكثر استهلاكاً، ساعات الذروة.

تواصل مع بصير سيستم لعرض تجريبي لحل RFID: **06 61 41 55 78**
    `,
    faqs_fr: [
      { question: 'Les bracelets RFID résistent-ils à l\'eau du hammam ?', answer: 'Oui. Les bracelets NFC silicone fournis avec Bassir System sont waterproof et conçus pour une utilisation en environnement humide.' },
      { question: 'Peut-on gérer les abonnements mensuels avec le système RFID ?', answer: 'Oui. Les abonnements mensuels ou trimestriels sont gérés directement dans Bassir System. Le bracelet vérifie automatiquement la validité à chaque accès.' },
    ],
    faqs_ar: [
      { question: 'هل أساور RFID مقاومة لماء الحمام؟', answer: 'نعم. أساور سيليكون NFC المرفقة مع بصير سيستم مقاومة للماء ومصممة للاستخدام في البيئات الرطبة.' },
      { question: 'هل يمكن إدارة الاشتراكات الشهرية مع نظام RFID؟', answer: 'نعم. الاشتراكات الشهرية أو الفصلية تُدار مباشرة في بصير سيستم. الأسورة تتحقق تلقائياً من الصلاحية عند كل دخول.' },
    ],
  },
  'licence-vie-vs-abonnement-pos': {
    title_fr: 'Licence à vie vs abonnement mensuel POS : quel modèle choisir ?',
    title_ar: 'ترخيص مدى الحياة مقابل الاشتراك الشهري POS: أي نموذج تختار؟',
    excerpt_fr: 'Analyse complète des deux modèles de tarification pour les logiciels POS au Maroc. Calcul du retour sur investissement sur 3 et 5 ans.',
    excerpt_ar: 'تحليل كامل لنموذجي التسعير لبرامج POS في المغرب. حساب العائد على الاستثمار على 3 و5 سنوات.',
    category: 'Business', reading_time: 8,
    published_at: '2025-02-10', focus_keyword: 'licence vie logiciel POS Maroc',
    content_fr: `
## Deux modèles, deux philosophies

Quand vous cherchez un logiciel de caisse au Maroc, vous rencontrez deux modèles de tarification fondamentalement différents.

**Le modèle abonnement** : vous louez le logiciel chaque mois. Tant que vous payez, vous l'utilisez. Si vous arrêtez de payer, vous perdez l'accès à vos données.

**Le modèle licence à vie** : vous achetez le logiciel une seule fois. Il vous appartient pour toujours. Les mises à jour sont incluses. Aucun frais récurrent.

## Calcul du coût réel sur 3 ans

Prenons un exemple concret avec des tarifs du marché marocain :

**Option A — Abonnement mensuel :**
- Coût mensuel : 300 DH/mois
- Sur 1 an : 3 600 DH
- Sur 3 ans : 10 800 DH
- Sur 5 ans : 18 000 DH
- Vous ne possédez rien.

**Option B — Licence à vie (Bassir System) :**
- Paiement unique : X DH (sur devis)
- Mises à jour : incluses
- Sur 3 ans : même coût qu'au jour 1
- Sur 5 ans : même coût qu'au jour 1
- Vous possédez le logiciel.

**Point d'équilibre :** En général, une licence à vie est amortie en 12 à 18 mois. Au-delà, chaque mois représente une économie pure.

## Les risques de l'abonnement que personne ne mentionne

**Augmentation des tarifs :** Le fournisseur peut augmenter son tarif mensuel. Vous êtes captif — changer de logiciel signifie migrer toutes vos données.

**Fermeture du fournisseur :** Si la société ferme, vous perdez votre logiciel du jour au lendemain. Avec une licence à vie, vous gardez le logiciel même si le fournisseur disparaît.

**Dépendance internet :** Beaucoup de logiciels en abonnement nécessitent une connexion permanente. Une coupure internet = caisse bloquée.

## Pourquoi Bassir System a choisi la licence à vie

Bassir System est un produit marocain, conçu pour les commerçants marocains. Nous savons que les commerces marocains cherchent à maîtriser leurs coûts sur le long terme.

Un abonnement mensuel est un engagement financier perpétuel. Une licence à vie est un investissement ponctuel avec un retour mesurable.

**Notre conviction :** votre logiciel doit vous appartenir. Vous avez investi dans votre commerce, dans votre matériel, dans votre stock. Votre logiciel ne devrait pas être différent.

Pour un devis sur la licence Bassir System : **06 61 41 55 78**
    `,
    content_ar: `
## نموذجان، فلسفتان

عند البحث عن برنامج كاشير في المغرب، تواجه نموذجين مختلفين جوهرياً.

**نموذج الاشتراك**: تستأجر البرنامج كل شهر. طالما تدفع، تستخدمه. إذا توقفت عن الدفع، تفقد الوصول لبياناتك.

**نموذج الترخيص مدى الحياة**: تشتري البرنامج مرة واحدة. يصبح ملكك للأبد. التحديثات مضمنة. لا رسوم متكررة.

## حساب التكلفة الفعلية على 3 سنوات

**الخيار أ — الاشتراك الشهري:**
- التكلفة الشهرية: 300 درهم/شهر
- على 1 سنة: 3,600 درهم
- على 3 سنوات: 10,800 درهم
- على 5 سنوات: 18,000 درهم
- لا تملك شيئاً.

**الخيار ب — ترخيص مدى الحياة (بصير سيستم):**
- دفعة واحدة: X درهم (حسب الطلب)
- التحديثات: مضمنة
- على 3 سنوات: نفس التكلفة كيوم الأول
- تملك البرنامج.

## لماذا اختار بصير سيستم الترخيص مدى الحياة

بصير سيستم منتج مغربي، مصمم للتجار المغاربة. نعلم أن المتاجر المغربية تسعى للتحكم في تكاليفها على المدى البعيد.

**قناعتنا**: برنامجك يجب أن يكون ملكك.

للحصول على عرض أسعار ترخيص بصير سيستم: **06 61 41 55 78**
    `,
    faqs_fr: [
      { question: 'Les mises à jour sont-elles vraiment incluses dans la licence à vie ?', answer: 'Oui. Toutes les futures versions de Bassir System sont incluses dans votre licence initiale. Aucun frais supplémentaire pour les mises à jour.' },
      { question: 'Que se passe-t-il si Bassir System ferme un jour ?', answer: 'La licence étant perpétuelle et installée sur vos machines, vous continuez à utiliser le logiciel indéfiniment, même sans connexion internet.' },
    ],
    faqs_ar: [
      { question: 'هل التحديثات مضمنة فعلاً في الترخيص مدى الحياة؟', answer: 'نعم. جميع الإصدارات المستقبلية من بصير سيستم مضمنة في ترخيصك الأولي. لا رسوم إضافية للتحديثات.' },
      { question: 'ماذا يحدث إذا أغلق بصير سيستم يوماً ما؟', answer: 'بما أن الترخيص دائم ومثبت على أجهزتك، تستمر في استخدام البرنامج إلى أجل غير مسمى، حتى بدون إنترنت.' },
    ],
  },
};

interface ArticlePageProps {
  params: { locale: Locale; slug: string };
}

export async function generateStaticParams() {
  return ['fr', 'ar'].flatMap(locale =>
    Object.keys(STATIC_ARTICLES).map(slug => ({ locale, slug }))
  );
}

export async function generateMetadata({ params: { locale, slug } }: ArticlePageProps): Promise<Metadata> {
  const article = STATIC_ARTICLES[slug];
  const isAr = locale === 'ar';
  if (!article) return { title: 'Article non trouvé' };
  return buildMetadata({
    title: isAr ? article.title_ar : article.title_fr,
    description: isAr ? article.excerpt_ar : article.excerpt_fr,
    path: `/blog/${slug}`,
    locale,
  });
}

export default async function ArticlePage({ params: { locale, slug } }: ArticlePageProps) {
  setRequestLocale(locale);
  const isAr = locale === 'ar';

  // Try DB first, fall back to static
  const dbPost = await getPostBySlug(slug).catch(() => null);
  const staticArticle = STATIC_ARTICLES[slug];

  if (!dbPost && !staticArticle) notFound();

  const title = dbPost
    ? (isAr && dbPost.title_ar ? dbPost.title_ar : dbPost.title_fr)
    : (isAr ? staticArticle!.title_ar : staticArticle!.title_fr);

  const content = dbPost
    ? (isAr && dbPost.content_ar ? dbPost.content_ar : dbPost.content_fr)
    : (isAr ? staticArticle!.content_ar : staticArticle!.content_fr);

  const excerpt = dbPost
    ? (isAr && dbPost.excerpt_ar ? dbPost.excerpt_ar : dbPost.excerpt_fr)
    : (isAr ? staticArticle!.excerpt_ar : staticArticle!.excerpt_fr);

  const category = dbPost?.category ?? staticArticle?.category;
  const readingTime = dbPost?.reading_time ?? staticArticle?.reading_time;
  const publishedAt = dbPost?.published_at ?? staticArticle?.published_at;
  const staticFaqs = staticArticle ? (isAr ? staticArticle.faqs_ar : staticArticle.faqs_fr) : [];

  const dbFaqs = await getFAQs(`blog-${slug}`, locale).catch(() => []);
  const displayFaqs = dbFaqs.length > 0
    ? dbFaqs
    : staticFaqs.map((f, i) => ({ id: String(i), page_slug: `blog-${slug}`, locale, question: f.question, answer: f.answer, sort_order: i, is_priority: true }));

  const date = publishedAt ? new Date(publishedAt).toLocaleDateString(isAr ? 'ar-MA' : 'fr-MA', { year: 'numeric', month: 'long', day: 'numeric' }) : '';

  // Schemas
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description: excerpt,
    url: `${SITE_URL}/${locale}/blog/${slug}`,
    datePublished: publishedAt,
    dateModified: publishedAt,
    author: { '@type': 'Organization', name: 'Bassir System', url: SITE_URL },
    publisher: {
      '@type': 'Organization',
      name: 'Bassir System',
      url: SITE_URL,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/images/bassir-logo-icon.png` },
    },
    inLanguage: locale,
    about: { '@type': 'SoftwareApplication', name: 'Bassir System POS' },
  };

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Bassir System', url: `${SITE_URL}/${locale}` },
    { name: isAr ? 'المدونة' : 'Blog', url: `${SITE_URL}/${locale}/blog` },
    { name: title ?? slug, url: `${SITE_URL}/${locale}/blog/${slug}` },
  ]);

  const faqSchema = displayFaqs.length > 0 ? generateFAQSchema(displayFaqs) : null;

  // Convert markdown-like content to HTML
  const renderContent = (text: string) => {
    if (!text) return '';
    return text
      .split('\n')
      .map(line => {
        if (line.startsWith('## ')) return `<h2 class="font-display font-black uppercase text-2xl text-brand-charcoal mt-10 mb-4">${line.slice(3)}</h2>`;
        if (line.startsWith('### ')) return `<h3 class="font-display font-bold uppercase text-xl text-brand-charcoal mt-8 mb-3">${line.slice(4)}</h3>`;
        if (line.startsWith('**') && line.endsWith('**')) return `<p class="font-body font-semibold text-brand-charcoal my-2">${line.slice(2, -2)}</p>`;
        if (line.startsWith('- ')) return `<li class="font-body text-brand-slate leading-relaxed ml-4 list-disc">${line.slice(2)}</li>`;
        if (line.trim() === '') return '<div class="my-3"></div>';
        const bold = line.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-brand-charcoal">$1</strong>');
        return `<p class="font-body text-brand-slate leading-relaxed my-3">${bold}</p>`;
      })
      .join('');
  };

  return (
    <>
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />
      {faqSchema && <JsonLd data={faqSchema} />}

      <div dir={isAr ? 'rtl' : 'ltr'}>
        {/* Hero */}
        <div className="bg-brand-charcoal pt-12 pb-16 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle, #00C9B1 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-brand-teal" />
          <Container className="relative z-10 max-w-4xl">
            <BreadcrumbNav
              items={[
                { label: 'Bassir System', href: `/${locale}` },
                { label: isAr ? 'المدونة' : 'Blog', href: `/${locale}/blog` },
                { label: category ?? '' },
              ]}
              className="mb-6 [&_span]:text-white/40 [&_a]:text-white/40"
            />
            {category && (
              <span className="font-mono text-xs uppercase tracking-wider text-brand-teal mb-4 block">{category}</span>
            )}
            <h1 className="font-display font-black uppercase leading-tight text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
              {title}
            </h1>
            <div className="flex flex-wrap items-center gap-4">
              {readingTime && <span className="font-mono text-xs text-brand-stone">{readingTime} min {isAr ? 'للقراءة' : 'de lecture'}</span>}
              {date && <span className="font-mono text-xs text-brand-stone">{date}</span>}
              <span className="font-mono text-xs text-brand-teal">Bassir System</span>
            </div>
          </Container>
        </div>

        {/* Article + Sidebar */}
        <SectionWrapper>
          <Container wide>
            <div className="grid lg:grid-cols-[1fr_320px] gap-12 items-start">

              {/* Article content */}
              <article className="max-w-none">
                <ScrollReveal>
                  {excerpt && (
                    <p className="font-body text-lg text-brand-stone leading-relaxed mb-8 pb-8 border-b border-brand-cloud italic">
                      {excerpt}
                    </p>
                  )}
                  <div
                    dangerouslySetInnerHTML={{ __html: renderContent(content ?? '') }}
                    className="prose-bassir"
                  />
                </ScrollReveal>

                {/* Article CTA */}
                <div className="mt-12 bg-brand-charcoal rounded-2xl p-6">
                  <h3 className="font-display font-black uppercase text-white text-2xl mb-2">
                    {isAr ? 'جاهز للتجربة؟' : 'Prêt à tester ?'}
                  </h3>
                  <p className="font-body text-brand-stone text-sm mb-4">
                    {isAr ? 'احصل على عرض تجريبي مجاني من بصير سيستم.' : 'Demandez une démo gratuite de Bassir System.'}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Link href={`/${locale}/demo`}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-brand-teal text-brand-charcoal font-body font-semibold rounded-xl hover:bg-brand-teal-dark transition-colors">
                      {isAr ? 'طلب عرض تجريبي مجاني' : 'Demander une démo gratuite'}
                    </Link>
                    <a href="tel:+212661415578"
                      className="inline-flex items-center gap-2 px-6 py-3 border border-brand-slate text-white font-body font-semibold rounded-xl hover:border-brand-teal hover:text-brand-teal transition-colors">
                      06 61 41 55 78
                    </a>
                  </div>
                </div>

                {/* FAQ */}
                {displayFaqs.length > 0 && (
                  <div className="mt-10">
                    <h2 className="font-display font-black uppercase text-2xl text-brand-charcoal mb-6">
                      {isAr ? 'أسئلة شائعة' : 'Questions fréquentes'}
                    </h2>
                    <StaticFAQAccordion faqs={staticFaqs} />
                  </div>
                )}
              </article>

              {/* Sidebar */}
              <aside className="lg:sticky lg:top-28 space-y-5">
                <ScrollReveal delay={150}>
                  {/* About Bassir */}
                  <div className="bg-brand-teal-light border border-brand-teal/20 rounded-2xl p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-brand-teal flex items-center justify-center flex-shrink-0">
                        <span className="font-display font-black text-brand-charcoal text-lg">B</span>
                      </div>
                      <div>
                        <div className="font-display font-bold uppercase text-brand-charcoal text-sm">Bassir System</div>
                        <div className="font-mono text-[10px] text-brand-stone uppercase tracking-wider">Logiciel POS Maroc</div>
                      </div>
                    </div>
                    <p className="font-body text-xs text-brand-slate leading-relaxed mb-4">
                      {isAr ? 'برنامج كاشير مغربي. واجهة عربية 100٪. ترخيص مدى الحياة.' : 'Logiciel POS marocain. Interface 100% arabe. Licence à vie.'}
                    </p>
                    <Link href={`/${locale}/demo`}
                      className="block w-full text-center py-2.5 bg-brand-teal text-brand-charcoal font-body font-semibold text-sm rounded-xl hover:bg-brand-teal-dark transition-colors">
                      {isAr ? 'طلب عرض تجريبي' : 'Demander une démo'}
                    </Link>
                  </div>

                  {/* Related articles */}
                  <div className="bg-white border border-brand-cloud rounded-2xl p-5">
                    <h3 className="font-display font-bold uppercase text-brand-charcoal text-base mb-4">
                      {isAr ? 'مقالات ذات صلة' : 'Articles liés'}
                    </h3>
                    <div className="space-y-3">
                      {Object.entries(STATIC_ARTICLES)
                        .filter(([s]) => s !== slug)
                        .slice(0, 3)
                        .map(([s, a]) => (
                          <Link key={s} href={`/${locale}/blog/${s}`}
                            className="block group">
                            <p className="font-body text-sm text-brand-slate group-hover:text-brand-teal transition-colors line-clamp-2 leading-snug">
                              {isAr ? a.title_ar : a.title_fr}
                            </p>
                            <span className="font-mono text-[10px] text-brand-stone mt-0.5 block">{a.reading_time} min</span>
                          </Link>
                        ))}
                    </div>
                  </div>

                  {/* Contact */}
                  <div className="bg-brand-charcoal rounded-2xl p-5">
                    <div className="font-display font-bold uppercase text-white text-base mb-3">
                      {isAr ? 'تواصل معنا' : 'Nous contacter'}
                    </div>
                    <a href="https://wa.me/212661415578" target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2 w-full py-2.5 bg-[#25D366] text-white font-body font-semibold text-sm rounded-xl justify-center hover:bg-[#1ebe5a] transition-colors mb-2">
                      WhatsApp
                    </a>
                    <a href="tel:+212661415578"
                      className="block w-full text-center py-2 font-mono text-sm text-brand-stone hover:text-brand-teal transition-colors">
                      06 61 41 55 78
                    </a>
                  </div>
                </ScrollReveal>
              </aside>
            </div>
          </Container>
        </SectionWrapper>
      </div>
    </>
  );
}
