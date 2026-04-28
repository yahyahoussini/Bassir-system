import { SectionWrapper, Container, SectionHeader } from '@/components/ui/SectionWrapper';
import { StaticFAQAccordion } from '@/components/ui/FAQAccordion';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { JsonLd } from '@/components/seo/JsonLd';
import { generateFAQSchema } from '@/lib/seo';
import type { FAQ, Locale } from '@/types';

interface FAQSectionProps {
  locale: Locale;
  faqs: FAQ[];
}

export function FAQSection({ locale, faqs }: FAQSectionProps) {
  const isAr = locale === 'ar';

  // Fallback static FAQs if DB is empty
  const staticFAQs_fr = [
    { question: 'Est-ce que Bassir System est disponible partout au Maroc ?', answer: 'Oui. Nous installons et assurons le support partout au Maroc — Casablanca, Rabat, Marrakech, Fès, Tanger, Agadir et toutes les autres villes. Un seul appel suffit : 06 61 41 55 78.' },
    { question: 'Y a-t-il un abonnement mensuel ?', answer: 'Non. Bassir System fonctionne avec une licence perpétuelle. Vous payez une seule fois et utilisez le logiciel à vie, sans aucun frais récurrent.' },
    { question: 'Le logiciel est-il en arabe ?', answer: "Oui. L'interface est 100% en arabe, avec login sécurisé par code PIN. Ce n'est pas un logiciel traduit — c'est un logiciel conçu pour le commerce marocain." },
    { question: 'Quels types de commerces utilisent Bassir System ?', answer: 'Épiceries, supérettes, boucheries, hammams, piscines, salles de sport, pharmacies, et tout type de commerce de détail au Maroc.' },
    { question: 'Fonctionnez-vous pour les hammams et piscines ?', answer: "Oui. Nous proposons une solution RFID complète — bracelets, contrôle d'accès, paiement cashless — intégrée au logiciel Bassir System." },
    { question: "Combien de temps prend l'installation ?", answer: "L'installation complète prend généralement une journée. Notre technicien se déplace chez vous, installe le matériel, configure le logiciel et vous forme sur place." },
    { question: "Que se passe-t-il si j'ai un problème technique ?", answer: "Notre équipe de support est disponible par téléphone et WhatsApp. Réponse rapide, support humain — pas de bot." },
    { question: 'Quel matériel fournissez-vous ?', answer: 'Terminal double écran, imprimante thermique, tiroir-caisse, balance codes-barres Rongta, scanner de codes-barres, bracelets RFID et lecteur RFID USB. Installation et formation incluses.' },
  ];

  const staticFAQs_ar = [
    { question: 'هل بصير سيستم متوفر في جميع أنحاء المغرب؟', answer: 'نعم. نقوم بالتركيب والدعم في جميع أنحاء المغرب — الدار البيضاء، الرباط، مراكش، فاس، طنجة، أكادير وجميع المدن.' },
    { question: 'هل هناك اشتراك شهري؟', answer: 'لا. بصير سيستم يعمل بترخيص مدى الحياة. تدفع مرة واحدة وتستخدم البرنامج للأبد بدون أي رسوم شهرية.' },
    { question: 'هل البرنامج باللغة العربية؟', answer: 'نعم. الواجهة كاملة باللغة العربية مع تسجيل دخول بالرمز السري. ليس برنامجاً مترجماً — بل برنامج مصمم للتجارة المغربية.' },
    { question: 'ما أنواع المتاجر التي تستخدم بصير سيستم؟', answer: 'البقالات، السوبر ماركت، الملاحم، الحمامات، المسابح، صالات الرياضة، الصيدليات، وجميع أنواع تجارة التجزئة في المغرب.' },
    { question: 'هل تعملون للحمامات والمسابح؟', answer: 'نعم. نقدم حلاً RFID كاملاً — أساور، التحكم في الوصول، الدفع بدون نقود — متكاملاً مع برنامج بصير سيستم.' },
    { question: 'كم يستغرق التركيب؟', answer: 'يستغرق التركيب الكامل عموماً يوماً واحداً. يأتي فنيوننا إليك، يركبون المعدات، يضبطون البرنامج ويدربونك في الموقع.' },
  ];

  const displayFaqs = faqs.length > 0 ? null : (isAr ? staticFAQs_ar : staticFAQs_fr);

  // Build schema from either DB or static
  const schemaFaqs = faqs.length > 0
    ? faqs
    : (isAr ? staticFAQs_ar : staticFAQs_fr).map((f, i) => ({
        id: String(i),
        page_slug: 'home',
        locale,
        question: f.question,
        answer: f.answer,
        sort_order: i,
        is_priority: i < 3,
      }));

  return (
    <SectionWrapper id="faq">
      <JsonLd data={generateFAQSchema(schemaFaqs)} />

      <Container>
        <div className="grid lg:grid-cols-[1fr_1.6fr] gap-12 lg:gap-20 items-start">

          {/* Left: Header + CTA */}
          <ScrollReveal>
            <div className="lg:sticky lg:top-28">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-5 h-0.5 bg-brand-teal rounded" />
                <span className="font-mono text-xs uppercase tracking-widest text-brand-teal font-medium">FAQ</span>
              </div>

              <h2 className="font-display font-black uppercase leading-none text-5xl text-brand-charcoal mb-4">
                {isAr ? 'أسئلة' : 'Questions'}<br />
                <span className="text-brand-teal">{isAr ? 'شائعة' : 'fréquentes'}</span>
              </h2>

              <p className="font-body text-brand-stone leading-relaxed mb-8">
                {isAr
                  ? 'كل ما تحتاج معرفته عن بصير سيستم.'
                  : 'Tout ce que vous devez savoir sur Bassir System.'}
              </p>

              {/* Contact CTA */}
              <div className="bg-brand-teal-light rounded-brand-lg p-5 border border-brand-teal/20">
                <p className="font-body text-sm text-brand-slate font-medium mb-3">
                  {isAr ? 'سؤال آخر؟' : 'Une autre question ?'}
                </p>
                <a
                  href="https://wa.me/212661415578"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-body text-sm font-semibold text-brand-teal hover:gap-3 transition-all duration-200"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[#25D366]">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z" />
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.523 5.847L.057 23.5l5.752-1.507A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.808 9.808 0 01-5.032-1.384l-.36-.214-3.733.979.997-3.645-.235-.374A9.808 9.808 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182c5.43 0 9.818 4.388 9.818 9.818 0 5.43-4.388 9.818-9.818 9.818z" />
                  </svg>
                  {isAr ? 'اسألنا على واتساب' : 'Posez-nous sur WhatsApp'}
                </a>
              </div>
            </div>
          </ScrollReveal>

          {/* Right: Accordion */}
          <ScrollReveal delay={150}>
            {displayFaqs ? (
              <StaticFAQAccordion faqs={displayFaqs} />
            ) : (
              <StaticFAQAccordion faqs={isAr ? staticFAQs_ar : staticFAQs_fr} />
            )}
          </ScrollReveal>

        </div>
      </Container>
    </SectionWrapper>
  );
}
