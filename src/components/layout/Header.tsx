'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import type { Locale } from '@/types';

interface HeaderProps {
  locale: Locale;
}

export function Header({ locale }: HeaderProps) {
  const t = useTranslations('nav');
  const tc = useTranslations('common');
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isRTL = locale === 'ar';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Build the alternate locale URL
  const otherLocale: Locale = locale === 'fr' ? 'ar' : 'fr';
  const altPath = pathname.replace(`/${locale}`, `/${otherLocale}`);

  const navLinks = [
    { label: t('software'), href: `/${locale}/logiciel` },
    { label: t('products'), href: `/${locale}/produits` },
    { label: t('rfid'), href: `/${locale}/rfid` },
    { label: t('pricing'), href: `/${locale}/tarifs` },
    { label: t('blog'), href: `/${locale}/blog` },
    { label: t('contact'), href: `/${locale}/contact` },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <>
      <header className={cn(
        'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-[0_1px_0_rgba(0,0,0,0.06)] py-3'
          : 'bg-transparent py-5'
      )}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">

            {/* Logo */}
            <Link
              href={`/${locale}`}
              className="flex items-center gap-3 flex-shrink-0 group"
              aria-label="Bassir System — Accueil"
            >
              <div className="w-10 h-10 rounded-xl bg-brand-teal flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-200">
                <span className="font-display font-black text-brand-charcoal text-xl leading-none">B</span>
              </div>
              <div className="hidden sm:block">
                <div className="font-display font-black uppercase text-brand-charcoal text-xl leading-none tracking-tight">
                  BASSIR <span className="text-brand-teal">SYSTEM</span>
                </div>
                <div className="font-mono text-[10px] text-brand-stone uppercase tracking-widest leading-none mt-0.5">
                  {tc('tagline')}
                </div>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1" dir={isRTL ? 'rtl' : 'ltr'}>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'px-4 py-2 rounded-lg font-body text-sm font-medium transition-all duration-200',
                    isActive(link.href)
                      ? 'text-brand-teal bg-brand-teal-light'
                      : 'text-brand-slate hover:text-brand-teal hover:bg-brand-teal-light/50'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-2 flex-shrink-0">
              {/* Locale switcher */}
              <Link
                href={altPath}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-brand-cloud text-brand-stone hover:border-brand-teal hover:text-brand-teal transition-all duration-200 font-mono text-xs uppercase tracking-wider"
                aria-label={`Switch to ${otherLocale === 'ar' ? 'Arabic' : 'French'}`}
              >
                <span className="text-base">{otherLocale === 'ar' ? '🇲🇦' : '🇫🇷'}</span>
                <span>{otherLocale === 'ar' ? 'عربية' : 'FR'}</span>
              </Link>

              {/* Demo CTA */}
              <Link
                href={`/${locale}/demo`}
                className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-brand-teal text-brand-charcoal font-body font-semibold text-sm rounded-xl hover:bg-brand-teal-dark transition-all duration-200 shadow-brand hover:shadow-brand-lg active:scale-[0.98]"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {t('demo')}
              </Link>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 rounded-xl hover:bg-brand-cloud transition-colors duration-200"
                aria-label="Menu"
              >
                <span className={cn('w-5 h-0.5 bg-brand-charcoal rounded transition-all duration-300', menuOpen && 'rotate-45 translate-y-2')} />
                <span className={cn('w-5 h-0.5 bg-brand-charcoal rounded transition-all duration-300', menuOpen && 'opacity-0')} />
                <span className={cn('w-5 h-0.5 bg-brand-charcoal rounded transition-all duration-300', menuOpen && '-rotate-45 -translate-y-2')} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <div className={cn(
        'fixed inset-0 z-30 lg:hidden transition-all duration-300',
        menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      )}>
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-brand-charcoal/50 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
        />

        {/* Drawer */}
        <div className={cn(
          'absolute top-0 right-0 h-full w-80 max-w-[90vw] bg-white shadow-2xl transition-transform duration-300',
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        )}>
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-brand-cloud">
            <div className="font-display font-black uppercase text-brand-charcoal text-lg">
              BASSIR <span className="text-brand-teal">SYSTEM</span>
            </div>
            <button
              onClick={() => setMenuOpen(false)}
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-brand-cloud transition-colors"
            >
              <svg className="w-5 h-5 text-brand-stone" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Nav links */}
          <nav className="p-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-xl font-body font-medium transition-all duration-200',
                  isActive(link.href)
                    ? 'text-brand-teal bg-brand-teal-light'
                    : 'text-brand-slate hover:text-brand-teal hover:bg-brand-teal-light/50'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Bottom actions */}
          <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-brand-cloud space-y-3">
            <Link
              href={`/${locale}/demo`}
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full px-5 py-3 bg-brand-teal text-brand-charcoal font-body font-semibold rounded-xl hover:bg-brand-teal-dark transition-colors"
            >
              Demander une démo
            </Link>
            <a
              href="https://wa.me/212661415578"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full px-5 py-3 bg-[#25D366] text-white font-body font-semibold rounded-xl"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z" />
              </svg>
              WhatsApp
            </a>
            <Link
              href={altPath}
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full px-5 py-2 border border-brand-cloud text-brand-stone rounded-xl font-mono text-xs uppercase tracking-wider hover:border-brand-teal hover:text-brand-teal transition-colors"
            >
              {otherLocale === 'ar' ? '🇲🇦 العربية' : '🇫🇷 Français'}
            </Link>
          </div>
        </div>
      </div>

      {/* Spacer for fixed header */}
      <div className="h-20" />
    </>
  );
}
