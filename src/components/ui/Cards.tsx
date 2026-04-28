import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { type ReactNode } from 'react';

// ============================================
// BASE CARD
// ============================================
interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export function Card({ children, className, hover, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'bg-white rounded-brand-lg border border-brand-cloud/60 shadow-card p-6',
        hover && 'card-hover cursor-pointer',
        className
      )}
    >
      {children}
    </div>
  );
}

// ============================================
// FEATURE CARD
// ============================================
interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  className?: string;
  highlighted?: boolean;
}

export function FeatureCard({ icon, title, description, className, highlighted }: FeatureCardProps) {
  return (
    <div
      className={cn(
        'relative p-6 rounded-brand-lg border transition-all duration-300 group',
        highlighted
          ? 'bg-brand-charcoal border-brand-teal/30 text-white'
          : 'bg-white border-brand-cloud hover:border-brand-teal/40 hover:shadow-brand',
        className
      )}
    >
      {/* Teal accent corner */}
      <div className={cn(
        'absolute top-0 left-0 w-1 h-12 rounded-tl-brand-lg rounded-bl-sm',
        highlighted ? 'bg-brand-teal' : 'bg-brand-teal/0 group-hover:bg-brand-teal transition-all duration-300'
      )} />

      <div className={cn(
        'w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors duration-300',
        highlighted
          ? 'bg-brand-teal/20 text-brand-teal'
          : 'bg-brand-teal-light text-brand-teal group-hover:bg-brand-teal group-hover:text-brand-charcoal'
      )}>
        {icon}
      </div>

      <h3 className={cn(
        'font-display text-xl font-bold uppercase mb-2',
        highlighted ? 'text-white' : 'text-brand-charcoal'
      )}>
        {title}
      </h3>

      <p className={cn(
        'font-body text-sm leading-relaxed',
        highlighted ? 'text-brand-stone' : 'text-brand-stone'
      )}>
        {description}
      </p>
    </div>
  );
}

// ============================================
// PRODUCT CARD
// ============================================
interface ProductCardProps {
  title: string;
  description: string;
  image?: string;
  category: string;
  slug: string;
  locale: string;
  className?: string;
}

export function ProductCard({ title, description, image, category, slug, locale, className }: ProductCardProps) {
  const categoryColors: Record<string, string> = {
    logiciel: 'text-brand-teal bg-brand-teal-light',
    materiel: 'text-blue-600 bg-blue-50',
    rfid: 'text-purple-600 bg-purple-50',
    accessoire: 'text-amber-600 bg-amber-50',
  };

  return (
    <Link href={`/${locale}/produits/${slug}`} className={cn('group block', className)}>
      <div className="bg-white rounded-brand-lg border border-brand-cloud/60 shadow-card overflow-hidden card-hover">
        {/* Image area */}
        <div className="relative h-48 bg-brand-cloud/30 overflow-hidden">
          {image ? (
            <Image
              src={image}
              alt={title}
              fill
              className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-2xl bg-brand-teal/10 flex items-center justify-center">
                <svg className="w-10 h-10 text-brand-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
                </svg>
              </div>
            </div>
          )}
          {/* Teal hover overlay */}
          <div className="absolute inset-0 bg-brand-teal/0 group-hover:bg-brand-teal/5 transition-colors duration-300" />
        </div>

        {/* Content */}
        <div className="p-5">
          <span className={cn(
            'inline-block px-2.5 py-0.5 rounded-full text-xs font-mono font-medium uppercase tracking-wider mb-3',
            categoryColors[category] || 'text-brand-stone bg-brand-cloud'
          )}>
            {category}
          </span>

          <h3 className="font-display text-xl font-bold uppercase text-brand-charcoal mb-2 group-hover:text-brand-teal transition-colors duration-200">
            {title}
          </h3>

          <p className="font-body text-sm text-brand-stone leading-relaxed line-clamp-2 mb-4">
            {description}
          </p>

          <div className="flex items-center gap-2 text-brand-teal font-body text-sm font-medium">
            <span>En savoir plus</span>
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}

// ============================================
// STAT CARD
// ============================================
interface StatCardProps {
  value: string;
  label: string;
  icon?: ReactNode;
  className?: string;
}

export function StatCard({ value, label, icon, className }: StatCardProps) {
  return (
    <div className={cn(
      'bg-white rounded-brand-lg border border-brand-cloud/60 shadow-card p-6 text-center',
      className
    )}>
      {icon && (
        <div className="w-10 h-10 rounded-xl bg-brand-teal-light text-brand-teal flex items-center justify-center mx-auto mb-3">
          {icon}
        </div>
      )}
      <div className="font-display text-4xl font-black text-brand-teal uppercase mb-1">
        {value}
      </div>
      <div className="font-body text-sm text-brand-stone">
        {label}
      </div>
    </div>
  );
}

// ============================================
// TESTIMONIAL CARD
// ============================================
interface TestimonialCardProps {
  quote: string;
  name: string;
  business?: string;
  city?: string;
  rating?: number;
  screenshot?: string;
  className?: string;
}

export function TestimonialCard({ quote, name, business, city, rating = 5, className }: TestimonialCardProps) {
  return (
    <div className={cn(
      'bg-white rounded-brand-lg border border-brand-cloud/60 shadow-card p-6 relative overflow-hidden',
      className
    )}>
      {/* Decorative quote mark */}
      <div className="absolute top-4 right-6 font-display text-8xl text-brand-teal/10 leading-none font-black select-none">
        "
      </div>

      {/* Stars */}
      <div className="flex gap-1 mb-4">
        {Array.from({ length: rating }).map((_, i) => (
          <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>

      {/* Quote */}
      <p className="font-body text-sm text-brand-slate leading-relaxed mb-5 relative z-10">
        "{quote}"
      </p>

      {/* Author */}
      <div className="flex items-center gap-3 border-t border-brand-cloud pt-4">
        <div className="w-10 h-10 rounded-full bg-brand-teal flex items-center justify-center flex-shrink-0">
          <span className="font-display font-black text-brand-charcoal text-sm">
            {name.charAt(0)}
          </span>
        </div>
        <div>
          <div className="font-body font-semibold text-brand-charcoal text-sm">{name}</div>
          {(business || city) && (
            <div className="font-body text-xs text-brand-stone">
              {business}{business && city ? ' · ' : ''}{city}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================
// BLOG CARD
// ============================================
interface BlogCardProps {
  title: string;
  excerpt: string;
  coverImage?: string;
  category?: string;
  readingTime?: number;
  publishedAt?: string;
  slug: string;
  locale: string;
  className?: string;
}

export function BlogCard({ title, excerpt, coverImage, category, readingTime, publishedAt, slug, locale, className }: BlogCardProps) {
  return (
    <Link href={`/${locale}/blog/${slug}`} className={cn('group block', className)}>
      <div className="bg-white rounded-brand-lg border border-brand-cloud/60 shadow-card overflow-hidden card-hover h-full">
        {/* Cover image */}
        <div className="relative h-44 bg-brand-cloud/30 overflow-hidden">
          {coverImage ? (
            <Image
              src={coverImage}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="absolute inset-0 zellige-divider flex items-center justify-center">
              <div className="w-12 h-12 rounded-xl bg-brand-teal/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-brand-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex items-center gap-3 mb-3">
            {category && (
              <span className="font-mono text-xs text-brand-teal uppercase tracking-wider font-medium">
                {category}
              </span>
            )}
            {readingTime && (
              <span className="font-mono text-xs text-brand-stone">{readingTime} min</span>
            )}
          </div>

          <h3 className="font-display text-lg font-bold uppercase text-brand-charcoal mb-2 line-clamp-2 group-hover:text-brand-teal transition-colors duration-200">
            {title}
          </h3>

          <p className="font-body text-sm text-brand-stone leading-relaxed line-clamp-2">
            {excerpt}
          </p>
        </div>
      </div>
    </Link>
  );
}
