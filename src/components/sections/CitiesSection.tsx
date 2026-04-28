import { SectionWrapper, Container, SectionHeader } from '@/components/ui/SectionWrapper';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import type { Locale } from '@/types';

interface CitiesSectionProps {
  locale: Locale;
}

const CITIES = [
  { name_fr: 'Casablanca', name_ar: 'الدار البيضاء', x: '38%', y: '42%', size: 'lg' },
  { name_fr: 'Rabat', name_ar: 'الرباط', x: '34%', y: '34%', size: 'md' },
  { name_fr: 'Marrakech', name_ar: 'مراكش', x: '40%', y: '58%', size: 'md' },
  { name_fr: 'Fès', name_ar: 'فاس', x: '52%', y: '30%', size: 'md' },
  { name_fr: 'Tanger', name_ar: 'طنجة', x: '38%', y: '14%', size: 'sm' },
  { name_fr: 'Agadir', name_ar: 'أكادير', x: '28%', y: '72%', size: 'sm' },
  { name_fr: 'Meknès', name_ar: 'مكناس', x: '46%', y: '32%', size: 'sm' },
  { name_fr: 'Oujda', name_ar: 'وجدة', x: '72%', y: '26%', size: 'sm' },
];

const sizeMap = { lg: 'w-4 h-4', md: 'w-3 h-3', sm: 'w-2 h-2' };

export function CitiesSection({ locale }: CitiesSectionProps) {
  const isAr = locale === 'ar';

  return (
    <SectionWrapper id="coverage" cloud>
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left: Text */}
          <ScrollReveal>
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-5 h-0.5 bg-brand-teal rounded" />
                <span className="font-mono text-xs uppercase tracking-widest text-brand-teal font-medium">
                  {isAr ? 'التغطية' : 'Couverture'}
                </span>
              </div>

              <h2 className="font-display font-black uppercase leading-none text-5xl lg:text-6xl text-brand-charcoal mb-6">
                {isAr ? 'في كل' : 'Partout'}<br />
                <span className="text-brand-teal">{isAr ? 'المغرب' : 'au Maroc'}</span>
              </h2>

              <p className="font-body text-lg text-brand-stone leading-relaxed mb-8">
                {isAr
                  ? 'فريقنا يتنقل إليك خلال 24-48 ساعة. تركيب كامل، تدريب في الموقع، دعم مستمر.'
                  : 'Notre équipe se déplace chez vous dans les 24-48h. Installation complète, formation sur place, support continu.'}
              </p>

              {/* City grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {CITIES.map((city) => (
                  <div
                    key={city.name_fr}
                    className="flex items-center gap-2 bg-white rounded-xl border border-brand-cloud px-3 py-2 hover:border-brand-teal/40 hover:shadow-brand transition-all duration-200 group"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-teal flex-shrink-0 group-hover:scale-150 transition-transform duration-200" />
                    <span className="font-body text-xs font-medium text-brand-slate">
                      {isAr ? city.name_ar : city.name_fr}
                    </span>
                  </div>
                ))}
              </div>

              <p className="font-mono text-xs text-brand-stone mt-4 flex items-center gap-2">
                <span className="text-brand-teal">+</span>
                {isAr ? 'وجميع مدن المغرب' : 'Et toutes les villes du Maroc'}
              </p>
            </div>
          </ScrollReveal>

          {/* Right: Stylized Morocco map */}
          <ScrollReveal delay={200}>
            <div className="relative">
              {/* Map container */}
              <div className="relative w-full aspect-square max-w-md mx-auto">
                {/* Background */}
                <div className="absolute inset-0 rounded-3xl bg-brand-charcoal overflow-hidden">
                  {/* Grid dots */}
                  <div
                    className="absolute inset-0 opacity-[0.06]"
                    style={{
                      backgroundImage: 'radial-gradient(circle, #00C9B1 1px, transparent 1px)',
                      backgroundSize: '24px 24px',
                    }}
                  />

                  {/* Morocco outline — simplified SVG path */}
                  <svg
                    viewBox="0 0 400 400"
                    className="absolute inset-0 w-full h-full"
                    fill="none"
                  >
                    {/* Simplified Morocco shape */}
                    <path
                      d="M120 60 L180 40 L240 50 L290 70 L320 100 L340 140 L330 200 L310 260 L280 310 L240 350 L200 360 L160 340 L130 290 L100 240 L80 180 L90 120 Z"
                      fill="rgba(0,201,177,0.06)"
                      stroke="rgba(0,201,177,0.3)"
                      strokeWidth="1.5"
                    />
                    {/* Sahara gradient area */}
                    <path
                      d="M130 290 L160 340 L200 360 L240 350 L280 310 L310 260 L300 250 L260 260 L220 280 L180 285 Z"
                      fill="rgba(0,201,177,0.03)"
                    />
                  </svg>

                  {/* City dots */}
                  {CITIES.map((city) => (
                    <div
                      key={city.name_fr}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
                      style={{ left: city.x, top: city.y }}
                    >
                      {/* Pulse ring */}
                      <div className="absolute inset-0 -m-2">
                        <div className="w-full h-full rounded-full bg-brand-teal/20 animate-ping" style={{ animationDuration: `${2 + Math.random() * 2}s` }} />
                      </div>

                      {/* Dot */}
                      <div className={`${sizeMap[city.size as keyof typeof sizeMap]} rounded-full bg-brand-teal relative z-10`} />

                      {/* Label */}
                      <div className="absolute left-1/2 -translate-x-1/2 -bottom-6 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <span className="font-mono text-[9px] text-brand-teal bg-brand-charcoal px-1.5 py-0.5 rounded">
                          {isAr ? city.name_ar : city.name_fr}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Corner badge */}
                <div className="absolute -bottom-4 -right-4 bg-brand-teal rounded-2xl px-4 py-3 shadow-brand-lg">
                  <div className="font-display font-black text-brand-charcoal text-2xl leading-none">24h</div>
                  <div className="font-mono text-[10px] text-brand-charcoal/70 uppercase tracking-wider">
                    {isAr ? 'تركيب' : 'Installation'}
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

        </div>
      </Container>
    </SectionWrapper>
  );
}
