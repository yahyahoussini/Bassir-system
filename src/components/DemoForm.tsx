'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { BreadcrumbNav } from '@/components/ui/BreadcrumbNav';
import { Container } from '@/components/ui/SectionWrapper';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import type { Locale } from '@/types';

interface DemoFormProps {
  locale: Locale;
}

const CITIES_FR = ['Casablanca','Rabat','Marrakech','Fès','Tanger','Agadir','Meknès','Oujda','Tétouan','Kenitra','Settat','Autre'];
const CITIES_AR = ['الدار البيضاء','الرباط','مراكش','فاس','طنجة','أكادير','مكناس','وجدة','تطوان','القنيطرة','سطات','أخرى'];

const BUSINESS_TYPES_FR = [
  { value: 'epicerie', label: '🛒 Épicerie / Supérette' },
  { value: 'boucherie', label: '🥩 Boucherie' },
  { value: 'hammam', label: '♨️ Hammam' },
  { value: 'piscine', label: '🏊 Piscine' },
  { value: 'sport', label: '🏋️ Salle de sport' },
  { value: 'pharmacie', label: '💊 Pharmacie' },
  { value: 'restaurant', label: '🍽️ Restaurant / Café' },
  { value: 'autre', label: '📦 Autre' },
];

const BUSINESS_TYPES_AR = [
  { value: 'epicerie', label: '🛒 بقالة / سوبر ماركت' },
  { value: 'boucherie', label: '🥩 ملحمة' },
  { value: 'hammam', label: '♨️ حمام' },
  { value: 'piscine', label: '🏊 مسبح' },
  { value: 'sport', label: '🏋️ صالة رياضية' },
  { value: 'pharmacie', label: '💊 صيدلية' },
  { value: 'restaurant', label: '🍽️ مطعم / مقهى' },
  { value: 'autre', label: '📦 أخرى' },
];

export function DemoForm({ locale }: DemoFormProps) {
  const isAr = locale === 'ar';
  const cities = isAr ? CITIES_AR : CITIES_FR;
  const businessTypes = isAr ? BUSINESS_TYPES_AR : BUSINESS_TYPES_FR;

  const [form, setForm] = useState({
    first_name: '',
    phone: '',
    city: '',
    business_type: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [whatsappUrl, setWhatsappUrl] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source_page: `/${locale}/demo` }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error();
      setWhatsappUrl(data.whatsappUrl || '');
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  const inputClass = cn(
    'w-full px-4 py-3.5 rounded-xl border font-body text-sm text-brand-charcoal bg-white',
    'focus:outline-none focus:border-brand-teal focus:ring-2 focus:ring-brand-teal/10',
    'transition-all duration-200 placeholder:text-brand-stone/50'
  );

  if (status === 'success') {
    return (
      <div className="text-center py-12 px-6">
        <div className="w-20 h-20 rounded-full bg-brand-teal flex items-center justify-center mx-auto mb-6 animate-[fadeUp_0.5s_ease_forwards]">
          <svg className="w-10 h-10 text-brand-charcoal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-display font-black uppercase text-3xl text-brand-charcoal mb-3">
          {isAr ? 'تم استلام طلبك!' : 'Demande reçue !'}
        </h3>
        <p className="font-body text-brand-stone mb-8 max-w-sm mx-auto">
          {isAr
            ? 'سنتصل بك خلال ساعتين. يمكنك أيضاً التواصل معنا مباشرة على واتساب.'
            : 'Nous vous rappelons dans les 2 heures. Vous pouvez aussi nous contacter directement sur WhatsApp.'}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="https://wa.me/212661415578"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#25D366] text-white font-body font-semibold rounded-xl hover:bg-[#1ebe5a] transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.523 5.847L.057 23.5l5.752-1.507A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.808 9.808 0 01-5.032-1.384l-.36-.214-3.733.979.997-3.645-.235-.374A9.808 9.808 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182c5.43 0 9.818 4.388 9.818 9.818 0 5.43-4.388 9.818-9.818 9.818z" />
            </svg>
            WhatsApp : 06 61 41 55 78
          </a>
          <button
            onClick={() => setStatus('idle')}
            className="inline-flex items-center justify-center px-6 py-4 border-2 border-brand-cloud text-brand-slate font-body font-semibold rounded-xl hover:border-brand-teal hover:text-brand-teal transition-colors text-sm"
          >
            {isAr ? 'إرسال طلب آخر' : 'Nouvelle demande'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" dir={isAr ? 'rtl' : 'ltr'}>
      {/* Name + Phone row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block font-body text-sm font-semibold text-brand-charcoal mb-1.5">
            {isAr ? 'الاسم' : 'Prénom'} <span className="text-brand-teal">*</span>
          </label>
          <input
            type="text"
            required
            placeholder={isAr ? 'محمد' : 'Hassan'}
            value={form.first_name}
            onChange={e => setForm({ ...form, first_name: e.target.value })}
            className={cn(inputClass, 'border-brand-cloud')}
          />
        </div>
        <div>
          <label className="block font-body text-sm font-semibold text-brand-charcoal mb-1.5">
            {isAr ? 'الهاتف' : 'Téléphone'} <span className="text-brand-teal">*</span>
          </label>
          <input
            type="tel"
            required
            placeholder="06 XX XX XX XX"
            value={form.phone}
            onChange={e => setForm({ ...form, phone: e.target.value })}
            className={cn(inputClass, 'border-brand-cloud')}
          />
        </div>
      </div>

      {/* City */}
      <div>
        <label className="block font-body text-sm font-semibold text-brand-charcoal mb-1.5">
          {isAr ? 'المدينة' : 'Ville'} <span className="text-brand-teal">*</span>
        </label>
        <select
          required
          value={form.city}
          onChange={e => setForm({ ...form, city: e.target.value })}
          className={cn(inputClass, 'border-brand-cloud', form.city ? 'text-brand-charcoal' : 'text-brand-stone/50')}
        >
          <option value="">{isAr ? 'اختر مدينتك' : 'Choisir votre ville'}</option>
          {cities.map(city => <option key={city} value={city}>{city}</option>)}
        </select>
      </div>

      {/* Business type */}
      <div>
        <label className="block font-body text-sm font-semibold text-brand-charcoal mb-3">
          {isAr ? 'نوع التجارة' : 'Type de commerce'} <span className="text-brand-teal">*</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {businessTypes.map(type => (
            <button
              key={type.value}
              type="button"
              onClick={() => setForm({ ...form, business_type: type.value })}
              className={cn(
                'px-3 py-2.5 rounded-xl border text-sm font-body font-medium transition-all duration-200 text-left',
                form.business_type === type.value
                  ? 'border-brand-teal bg-brand-teal-light text-brand-teal font-semibold'
                  : 'border-brand-cloud text-brand-slate hover:border-brand-teal/40'
              )}
            >
              {type.label}
            </button>
          ))}
        </div>
        {!form.business_type && (
          <input type="text" required value={form.business_type} readOnly className="sr-only" />
        )}
      </div>

      {/* Message */}
      <div>
        <label className="block font-body text-sm font-semibold text-brand-charcoal mb-1.5">
          {isAr ? 'رسالة (اختياري)' : 'Message (optionnel)'}
        </label>
        <textarea
          rows={3}
          placeholder={isAr ? 'أي معلومات إضافية...' : 'Des informations supplémentaires...'}
          value={form.message}
          onChange={e => setForm({ ...form, message: e.target.value })}
          className={cn(inputClass, 'border-brand-cloud resize-none')}
        />
      </div>

      {status === 'error' && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm font-body">
          {isAr ? 'حدث خطأ. يرجى المحاولة مرة أخرى أو الاتصال بنا مباشرة.' : 'Une erreur est survenue. Veuillez réessayer ou nous contacter directement.'}
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full py-4 bg-brand-teal text-brand-charcoal font-body font-bold text-lg rounded-xl hover:bg-brand-teal-dark transition-all duration-200 shadow-brand hover:shadow-brand-lg active:scale-[0.99] disabled:opacity-60 flex items-center justify-center gap-3"
      >
        {status === 'loading' ? (
          <>
            <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
            </svg>
            {isAr ? 'جارٍ الإرسال...' : 'Envoi en cours...'}
          </>
        ) : (
          <>
            {isAr ? 'إرسال طلبي' : 'Envoyer ma demande'}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </>
        )}
      </button>

      <p className="font-body text-xs text-brand-stone text-center">
        {isAr ? 'سنتصل بك خلال ساعتين. لا التزام.' : 'Nous vous rappelons en moins de 2h. Sans engagement.'}
      </p>
    </form>
  );
}
