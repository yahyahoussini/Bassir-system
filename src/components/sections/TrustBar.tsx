import { useTranslations } from 'next-intl';
import type { Locale } from '@/types';

interface TrustBarProps {
  locale: Locale;
}

const TRUST_ITEMS_FR = [
  { icon: '🇲🇦', text: 'Fait au Maroc' },
  { icon: '🔤', text: 'Interface 100% Arabe' },
  { icon: '♾️', text: 'Licence à vie' },
  { icon: '📦', text: 'Installation partout au Maroc' },
  { icon: '🧑‍💼', text: 'Support humain' },
  { icon: '⚡', text: 'Installation en 24h' },
  { icon: '🔒', text: 'Aucun abonnement mensuel' },
  { icon: '🛠️', text: 'Matériel + Logiciel + Support' },
];

const TRUST_ITEMS_AR = [
  { icon: '🇲🇦', text: 'صُنع في المغرب' },
  { icon: '🔤', text: 'واجهة عربية 100٪' },
  { icon: '♾️', text: 'ترخيص مدى الحياة' },
  { icon: '📦', text: 'تركيب في كل المغرب' },
  { icon: '🧑‍💼', text: 'دعم بشري' },
  { icon: '⚡', text: 'تركيب خلال 24 ساعة' },
  { icon: '🔒', text: 'بدون اشتراك شهري' },
  { icon: '🛠️', text: 'مواد + برنامج + دعم' },
];

export function TrustBar({ locale }: TrustBarProps) {
  const items = locale === 'ar' ? TRUST_ITEMS_AR : TRUST_ITEMS_FR;
  // Duplicate for seamless loop
  const doubled = [...items, ...items];

  return (
    <div className="bg-brand-charcoal py-4 overflow-hidden border-y border-brand-slate/50">
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <div key={i} className="flex items-center gap-3 px-8 flex-shrink-0">
            <span className="text-base">{item.icon}</span>
            <span className="font-mono text-xs uppercase tracking-[0.15em] text-brand-stone whitespace-nowrap">
              {item.text}
            </span>
            <span className="w-1 h-1 rounded-full bg-brand-teal/40 flex-shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
}
