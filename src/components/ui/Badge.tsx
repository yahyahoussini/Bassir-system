import { cn } from '@/lib/utils';
import { type ReactNode } from 'react';

type Variant = 'teal' | 'dark' | 'outline' | 'morocco';

interface BadgeProps {
  variant?: Variant;
  children: ReactNode;
  className?: string;
}

const variants: Record<Variant, string> = {
  teal: 'bg-brand-teal-light text-brand-teal border border-brand-teal/20',
  dark: 'bg-brand-charcoal text-white',
  outline: 'bg-transparent border border-brand-cloud text-brand-stone',
  morocco: 'bg-brand-teal text-brand-charcoal font-semibold',
};

export function Badge({ variant = 'teal', children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-mono text-xs tracking-wider uppercase font-medium',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
