import { cn } from '@/lib/utils';
import { type ReactNode } from 'react';

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  id?: string;
  dark?: boolean;
  cloud?: boolean;
  noPadding?: boolean;
}

export function SectionWrapper({ children, className, id, dark, cloud, noPadding }: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn(
        !noPadding && 'py-20 lg:py-28',
        dark && 'bg-brand-charcoal text-white',
        cloud && 'bg-brand-cloud/40',
        !dark && !cloud && 'bg-white',
        className
      )}
    >
      {children}
    </section>
  );
}

interface ContainerProps {
  children: ReactNode;
  className?: string;
  narrow?: boolean;
  wide?: boolean;
}

export function Container({ children, className, narrow, wide }: ContainerProps) {
  return (
    <div className={cn(
      'mx-auto px-4 sm:px-6 lg:px-8',
      narrow ? 'max-w-3xl' : wide ? 'max-w-7xl' : 'max-w-6xl',
      className
    )}>
      {children}
    </div>
  );
}

interface SectionHeaderProps {
  badge?: string;
  title: string;
  titleAccent?: string;
  subtitle?: string;
  centered?: boolean;
  dark?: boolean;
  className?: string;
}

export function SectionHeader({ badge, title, titleAccent, subtitle, centered, dark, className }: SectionHeaderProps) {
  return (
    <div className={cn('mb-12 lg:mb-16', centered && 'text-center', className)}>
      {badge && (
        <div className={cn('inline-flex items-center gap-2 mb-4', centered && 'justify-center w-full')}>
          <div className="w-5 h-0.5 bg-brand-teal rounded" />
          <span className="font-mono text-xs uppercase tracking-widest text-brand-teal font-medium">
            {badge}
          </span>
          <div className="w-5 h-0.5 bg-brand-teal rounded" />
        </div>
      )}
      <h2 className={cn(
        'font-display font-black uppercase leading-none',
        'text-4xl sm:text-5xl lg:text-6xl',
        dark ? 'text-white' : 'text-brand-charcoal'
      )}>
        {title}
        {titleAccent && (
          <span className="text-brand-teal"> {titleAccent}</span>
        )}
      </h2>
      {subtitle && (
        <p className={cn(
          'font-body mt-4 text-lg leading-relaxed max-w-2xl',
          centered && 'mx-auto',
          dark ? 'text-brand-stone' : 'text-brand-stone'
        )}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

// Zellige-pattern divider between sections
export function ZelligeDivider({ className }: { className?: string }) {
  return (
    <div className={cn('h-px w-full overflow-hidden', className)}>
      <div className="h-full zellige-divider opacity-60" style={{ height: '40px', marginTop: '-20px' }} />
    </div>
  );
}
