'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import type { Locale } from '@/types';

interface HeroSectionProps {
  locale: Locale;
}

export function HeroSection({ locale }: HeroSectionProps) {
  const t = useTranslations('hero');
  const tc = useTranslations('common');
  const [mounted, setMounted] = useState(false);
  const isRTL = locale === 'ar';

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      className="relative min-h-[92vh] flex items-center overflow-hidden bg-white"
      aria-label="Hero"
    >
      {/* Background geometric pattern — zellige inspired */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Large teal geometric shape top-right */}
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-[80px] bg-brand-teal/5 rotate-12" />
        <div className="absolute -top-16 -right-16 w-[400px] h-[400px] rounded-[60px] bg-brand-teal/8 rotate-6" />

        {/* Dot grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle, #0D0D0D 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />

        {/* Diagonal teal slash — the signature element */}
        <div
          className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-brand-teal/0 via-brand-teal to-brand-teal/0 opacity-20"
          style={{ right: '38%' }}
        />

        {/* Bottom left zellige accent */}
        <div className="absolute bottom-0 left-0 w-64 h-64 opacity-[0.04]">
          <svg viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
            {Array.from({ length: 8 }).map((_, row) =>
              Array.from({ length: 8 }).map((_, col) => (
                <rect
                  key={`${row}-${col}`}
                  x={col * 32 + 2}
                  y={row * 32 + 2}
                  width={28}
                  height={28}
                  rx={4}
                  fill="#00C9B1"
                  opacity={(row + col) % 2 === 0 ? 1 : 0.3}
                />
              ))
            )}
          </svg>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-16 items-center">

          {/* Left: Text content */}
          <div className={cn('max-w-3xl', isRTL && 'text-right')}>

            {/* Badge */}
            <div
              className={cn(
                'inline-flex items-center gap-3 mb-8 transition-all duration-700',
                mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              )}
              style={{ transitionDelay: '100ms' }}
            >
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-teal opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-teal" />
              </span>
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-brand-teal font-medium">
                {t('badge')}
              </span>
            </div>

            {/* Main headline — oversized, grid-breaking */}
            <h1 className="font-display font-black uppercase leading-none mb-6">
              {/* Line 1 */}
              <div
                className={cn(
                  'block text-[clamp(3.5rem,8vw,7rem)] text-brand-charcoal transition-all duration-700',
                  mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                )}
                style={{ transitionDelay: '200ms' }}
              >
                {t('headline_1')}
              </div>

              {/* Line 2 — teal accent */}
              <div
                className={cn(
                  'block text-[clamp(3.5rem,8vw,7rem)] text-brand-teal transition-all duration-700',
                  mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                )}
                style={{ transitionDelay: '300ms' }}
              >
                {t('headline_2')}
              </div>

              {/* Line 3 — with teal underline accent */}
              <div
                className={cn(
                  'block text-[clamp(3.5rem,8vw,7rem)] text-brand-charcoal relative inline-block transition-all duration-700',
                  mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                )}
                style={{ transitionDelay: '400ms' }}
              >
                {t('headline_3')}
                <div
                  className={cn(
                    'absolute -bottom-2 left-0 h-[5px] bg-brand-teal rounded-full transition-all duration-700',
                    mounted ? 'w-full' : 'w-0'
                  )}
                  style={{ transitionDelay: '800ms' }}
                />
              </div>
            </h1>

            {/* Subheadline */}
            <p
              className={cn(
                'font-body text-lg sm:text-xl text-brand-stone leading-relaxed mb-10 max-w-xl transition-all duration-700',
                mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              )}
              style={{ transitionDelay: '500ms' }}
            >
              {t('subheadline')}
            </p>

            {/* CTAs */}
            <div
              className={cn(
                'flex flex-wrap gap-4 items-center transition-all duration-700',
                isRTL ? 'justify-end' : 'justify-start',
                mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              )}
              style={{ transitionDelay: '600ms' }}
            >
              <Link
                href={`/${locale}/demo`}
                className="inline-flex items-center gap-2.5 px-8 py-4 bg-brand-teal text-brand-charcoal font-body font-semibold text-lg rounded-2xl hover:bg-brand-teal-dark transition-all duration-200 shadow-brand-lg hover:shadow-[0_12px_40px_rgba(0,201,177,0.35)] active:scale-[0.98] group"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {t('cta_primary')}
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>

              <a
                href="https://wa.me/212661415578"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-8 py-4 border-2 border-brand-cloud text-brand-slate font-body font-semibold text-lg rounded-2xl hover:border-brand-teal hover:text-brand-teal transition-all duration-200 group"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[#25D366]">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.523 5.847L.057 23.5l5.752-1.507A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.808 9.808 0 01-5.032-1.384l-.36-.214-3.733.979.997-3.645-.235-.374A9.808 9.808 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182c5.43 0 9.818 4.388 9.818 9.818 0 5.43-4.388 9.818-9.818 9.818z" />
                </svg>
                06 61 41 55 78
              </a>
            </div>

            {/* Social proof inline */}
            <div
              className={cn(
                'flex items-center gap-4 mt-8 transition-all duration-700',
                mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              )}
              style={{ transitionDelay: '700ms' }}
            >
              <div className="flex -space-x-2">
                {['É', 'H', 'M', 'F'].map((letter, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-xs font-display font-bold text-brand-charcoal"
                    style={{ background: i % 2 === 0 ? '#00C9B1' : '#30323A' }}
                  >
                    {letter}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map(i => (
                    <svg key={i} className="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="font-body text-xs text-brand-stone mt-0.5">
                  {locale === 'ar' ? 'موثوق به من قبل تجار مغاربة' : 'Fait confiance par des commerçants marocains'}
                </p>
              </div>
            </div>
          </div>

          {/* Right: Stats column — vertical, premium */}
          <div
            className={cn(
              'hidden lg:flex flex-col gap-4 transition-all duration-700',
              mounted ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            )}
            style={{ transitionDelay: '500ms' }}
          >
            {[
              { value: '100%', label: locale === 'ar' ? 'عربي' : 'Arabe' },
              { value: '∞', label: locale === 'ar' ? 'ترخيص مدى الحياة' : 'Licence à vie' },
              { value: '24h', label: locale === 'ar' ? 'تركيب' : 'Installation' },
              { value: '🇲🇦', label: locale === 'ar' ? 'صُنع في المغرب' : 'Fait au Maroc', emoji: true },
            ].map((stat, i) => (
              <div
                key={i}
                className="w-32 h-32 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: i % 2 === 0 ? '#0D0D0D' : 'white',
                  border: i % 2 === 0 ? 'none' : '1px solid #EBECF0',
                  boxShadow: i % 2 === 0 ? '0 8px 32px rgba(0,201,177,0.2)' : '0 2px 16px rgba(13,13,13,0.06)',
                }}
              >
                <span className={cn(
                  'font-display font-black text-3xl leading-none',
                  stat.emoji ? 'text-4xl' : (i % 2 === 0 ? 'text-brand-teal' : 'text-brand-charcoal')
                )}>
                  {stat.value}
                </span>
                <span className={cn(
                  'font-mono text-[10px] uppercase tracking-wider text-center leading-tight px-2',
                  i % 2 === 0 ? 'text-brand-stone' : 'text-brand-stone'
                )}>
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </section>
  );
}
