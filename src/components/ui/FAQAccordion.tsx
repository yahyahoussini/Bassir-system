'use client';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import type { FAQ } from '@/types';

interface FAQAccordionProps {
  faqs: FAQ[];
  className?: string;
}

export function FAQAccordion({ faqs, className }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className={cn('space-y-3', className)}>
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={faq.id}
            className={cn(
              'border rounded-brand-lg overflow-hidden transition-all duration-300',
              isOpen
                ? 'border-brand-teal/40 shadow-brand'
                : 'border-brand-cloud hover:border-brand-teal/20'
            )}
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left bg-white hover:bg-brand-teal-light/30 transition-colors duration-200"
              aria-expanded={isOpen}
            >
              <span className={cn(
                'font-body font-semibold text-base transition-colors duration-200',
                isOpen ? 'text-brand-teal' : 'text-brand-charcoal'
              )}>
                {faq.question}
              </span>
              <div className={cn(
                'w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center transition-all duration-300',
                isOpen ? 'bg-brand-teal text-brand-charcoal rotate-45' : 'bg-brand-cloud text-brand-stone'
              )}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                </svg>
              </div>
            </button>

            <div className={cn(
              'overflow-hidden transition-all duration-300 ease-in-out',
              isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            )}>
              <div className="px-6 pb-5 pt-1">
                <div className="w-8 h-0.5 bg-brand-teal rounded mb-3" />
                <p className="font-body text-brand-stone text-sm leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Static FAQ for when we don't have DB data
interface StaticFAQ {
  question: string;
  answer: string;
}

export function StaticFAQAccordion({ faqs, className }: { faqs: StaticFAQ[]; className?: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className={cn('space-y-3', className)}>
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className={cn(
              'border rounded-brand-lg overflow-hidden transition-all duration-300',
              isOpen ? 'border-brand-teal/40 shadow-brand' : 'border-brand-cloud hover:border-brand-teal/20'
            )}
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left bg-white hover:bg-brand-teal-light/30 transition-colors duration-200"
            >
              <span className={cn('font-body font-semibold text-base', isOpen ? 'text-brand-teal' : 'text-brand-charcoal')}>
                {faq.question}
              </span>
              <div className={cn(
                'w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center transition-all duration-300',
                isOpen ? 'bg-brand-teal text-brand-charcoal rotate-45' : 'bg-brand-cloud text-brand-stone'
              )}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
                </svg>
              </div>
            </button>
            <div className={cn('overflow-hidden transition-all duration-300', isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0')}>
              <div className="px-6 pb-5 pt-1">
                <div className="w-8 h-0.5 bg-brand-teal rounded mb-3" />
                <p className="font-body text-brand-stone text-sm leading-relaxed">{faq.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
