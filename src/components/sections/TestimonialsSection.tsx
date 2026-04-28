import { SectionWrapper, Container, SectionHeader } from '@/components/ui/SectionWrapper';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { cn } from '@/lib/utils';
import type { Locale } from '@/types';

interface TestimonialsSectionProps {
  locale: Locale;
}

const TESTIMONIALS_FR = [
  {
    quote: 'Tout a été installé en une journée. Le logiciel est clair, en arabe, et facile à utiliser. Quand on appelle, quelqu\'un répond.',
    whatsapp: 'السلام عليكم، الصراحة الخدمة زوينة بزاف، تثبيت سريع و الناس ديال الدعم متعاونين. الله يجازيكم بخير 👍',
    name: 'Hassan B.',
    business: 'Épicerie El Amal',
    city: 'Casablanca',
    rating: 5,
    time: '11:47',
  },
  {
    quote: 'La balance est connectée directement au logiciel. Plus d\'erreurs, plus de pertes. Je recommande à tous les bouchers.',
    whatsapp: 'واش كاين شي حاجة أحسن من بصير سيستم؟ راه عندي الميزان متربط مع الكاشير، مكانش غلط ولا خسارة 🔥',
    name: 'Khalid M.',
    business: 'Boucherie Al Baraka',
    city: 'Marrakech',
    rating: 5,
    time: '14:23',
  },
  {
    quote: 'Pour notre hammam, le système RFID a tout changé. Les clients passent avec leur bracelet, plus besoin de caisse manuelle.',
    whatsapp: 'الله يعطيكم الصحة، نظام الإسورة بصح ساهل علينا. الزبون كيدخل بالبراسلي وكيتحاسب أوتوماتيك 😍',
    name: 'Fatima Z.',
    business: 'Hammam Royal',
    city: 'Rabat',
    rating: 5,
    time: '09:15',
  },
];

const TESTIMONIALS_AR = [
  {
    quote: 'تم التركيب في يوم واحد. البرنامج واضح، بالعربية، وسهل الاستخدام. عند الاتصال، يجيب شخص فعلاً.',
    whatsapp: 'السلام عليكم، الصراحة الخدمة زوينة بزاف، تثبيت سريع و الناس ديال الدعم متعاونين. الله يجازيكم بخير 👍',
    name: 'حسن ب.',
    business: 'بقالة الأمل',
    city: 'الدار البيضاء',
    rating: 5,
    time: '11:47',
  },
  {
    quote: 'الميزان متصل مباشرة بالبرنامج. لا أخطاء، لا خسائر. أنصح به لجميع الجزارين.',
    whatsapp: 'واش كاين شي حاجة أحسن من بصير سيستم؟ راه عندي الميزان متربط مع الكاشير، مكانش غلط ولا خسارة 🔥',
    name: 'خالد م.',
    business: 'ملحمة البركة',
    city: 'مراكش',
    rating: 5,
    time: '14:23',
  },
  {
    quote: 'بالنسبة للحمام لدينا، غيّر نظام RFID كل شيء. العملاء يدخلون بالأسورة دون الحاجة لصندوق يدوي.',
    whatsapp: 'الله يعطيكم الصحة، نظام الإسورة بصح ساهل علينا. الزبون كيدخل بالبراسلي وكيتحاسب أوتوماتيك 😍',
    name: 'فاطمة ز.',
    business: 'حمام رويال',
    city: 'الرباط',
    rating: 5,
    time: '09:15',
  },
];

export function TestimonialsSection({ locale }: TestimonialsSectionProps) {
  const isAr = locale === 'ar';
  const testimonials = isAr ? TESTIMONIALS_AR : TESTIMONIALS_FR;

  return (
    <SectionWrapper id="testimonials" dark>
      <Container>
        <ScrollReveal>
          <SectionHeader
            badge={isAr ? 'آراء العملاء' : 'Avis clients'}
            title={isAr ? 'يثقون بنا' : 'Ils nous font'}
            titleAccent={isAr ? '' : 'confiance'}
            subtitle={isAr ? 'تجار مغاربة، تجارب حقيقية.' : 'Des commerçants marocains, de vraies expériences.'}
            centered
            dark
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <ScrollReveal key={i} delay={i * 150}>
              <div className="flex flex-col gap-4 h-full">

                {/* French quote card */}
                <div className="bg-brand-slate/60 rounded-brand-lg p-6 flex-1 relative overflow-hidden">
                  <div className="absolute top-4 right-5 font-display text-7xl text-brand-teal/10 leading-none font-black select-none">"</div>

                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <svg key={j} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  <p className="font-body text-sm text-white/80 leading-relaxed mb-5 relative z-10">
                    "{t.quote}"
                  </p>

                  <div className="flex items-center gap-3 border-t border-white/10 pt-4">
                    <div className="w-9 h-9 rounded-full bg-brand-teal flex items-center justify-center flex-shrink-0">
                      <span className="font-display font-black text-brand-charcoal text-sm">
                        {t.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="font-body font-semibold text-white text-sm">{t.name}</div>
                      <div className="font-mono text-xs text-brand-stone">
                        {t.business} · {t.city}
                      </div>
                    </div>
                  </div>
                </div>

                {/* WhatsApp message bubble */}
                <div className="bg-[#1a1a1a] rounded-brand-lg p-4">
                  {/* WhatsApp header */}
                  <div className="flex items-center gap-2 mb-3 pb-3 border-b border-white/5">
                    <div className="w-7 h-7 rounded-full bg-[#25D366] flex items-center justify-center flex-shrink-0">
                      <svg viewBox="0 0 24 24" fill="white" className="w-4 h-4">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z" />
                        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.523 5.847L.057 23.5l5.752-1.507A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.808 9.808 0 01-5.032-1.384l-.36-.214-3.733.979.997-3.645-.235-.374A9.808 9.808 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182c5.43 0 9.818 4.388 9.818 9.818 0 5.43-4.388 9.818-9.818 9.818z" />
                      </svg>
                    </div>
                    <span className="font-mono text-xs text-white/40 uppercase tracking-wider">WhatsApp</span>
                  </div>

                  {/* Message bubble */}
                  <div className="bg-[#2a2a2a] rounded-xl rounded-tl-sm px-4 py-3">
                    <p className="font-body text-xs text-white/70 leading-relaxed text-right" dir="rtl">
                      {t.whatsapp}
                    </p>
                    <div className="flex items-center justify-end gap-1 mt-2">
                      <span className="font-mono text-[10px] text-white/30">{t.time}</span>
                      <svg className="w-3.5 h-3.5 text-brand-teal" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M12.736 3.97a.733.733 0 011.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 01-1.065.02L3.217 8.384a.757.757 0 010-1.06.733.733 0 011.047 0l3.052 3.093 5.4-6.425a.247.247 0 01.02-.022z"/>
                        <path d="M10.146 8.02a.5.5 0 01.707 0l1.5 1.5a.5.5 0 01-.707.707L10.5 9.574l-3.293 3.293a.5.5 0 01-.707 0l-1.5-1.5a.5.5 0 01.707-.707l1.146 1.147L10.146 8.02z"/>
                      </svg>
                    </div>
                  </div>
                </div>

              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </SectionWrapper>
  );
}
