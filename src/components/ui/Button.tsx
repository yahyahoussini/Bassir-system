'use client';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { type ComponentPropsWithoutRef, type ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'whatsapp' | 'outline-teal';
type Size = 'sm' | 'md' | 'lg' | 'xl';

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  variant?: Variant;
  size?: Size;
  href?: string;
  external?: boolean;
  loading?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  children: ReactNode;
}

const variants: Record<Variant, string> = {
  primary:
    'bg-brand-teal text-brand-charcoal font-semibold hover:bg-brand-teal-dark active:scale-[0.98] shadow-brand hover:shadow-brand-lg',
  secondary:
    'bg-brand-charcoal text-white font-semibold hover:bg-brand-slate active:scale-[0.98]',
  ghost:
    'bg-transparent text-brand-charcoal font-medium hover:bg-brand-cloud active:scale-[0.98]',
  'outline-teal':
    'bg-transparent border-2 border-brand-teal text-brand-teal font-semibold hover:bg-brand-teal hover:text-brand-charcoal active:scale-[0.98]',
  whatsapp:
    'bg-[#25D366] text-white font-semibold hover:bg-[#1ebe5a] active:scale-[0.98] shadow-[0_4px_16px_rgba(37,211,102,0.35)]',
};

const sizes: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm rounded-lg gap-1.5',
  md: 'px-6 py-3 text-base rounded-xl gap-2',
  lg: 'px-8 py-4 text-lg rounded-xl gap-2.5',
  xl: 'px-10 py-5 text-xl rounded-2xl gap-3',
};

export function Button({
  variant = 'primary',
  size = 'md',
  href,
  external,
  loading,
  icon,
  iconPosition = 'left',
  children,
  className,
  disabled,
  ...props
}: ButtonProps) {
  const base = cn(
    'inline-flex items-center justify-center font-body transition-all duration-200 cursor-pointer select-none',
    'disabled:opacity-50 disabled:pointer-events-none',
    variants[variant],
    sizes[size],
    className
  );

  const content = (
    <>
      {loading && (
        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      )}
      {!loading && icon && iconPosition === 'left' && icon}
      <span>{children}</span>
      {!loading && icon && iconPosition === 'right' && icon}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={base}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
      >
        {content}
      </Link>
    );
  }

  return (
    <button className={base} disabled={disabled || loading} {...props}>
      {content}
    </button>
  );
}

// WhatsApp button shorthand
export function WhatsAppButton({
  phone = '212661415578',
  message,
  size = 'lg',
  children,
  className,
}: {
  phone?: string;
  message?: string;
  size?: Size;
  children?: ReactNode;
  className?: string;
}) {
  const url = message
    ? `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
    : `https://wa.me/${phone}`;

  return (
    <Button
      variant="whatsapp"
      size={size}
      href={url}
      external
      className={className}
      icon={
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.523 5.847L.057 23.5l5.752-1.507A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.808 9.808 0 01-5.032-1.384l-.36-.214-3.733.979.997-3.645-.235-.374A9.808 9.808 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182c5.43 0 9.818 4.388 9.818 9.818 0 5.43-4.388 9.818-9.818 9.818z" />
        </svg>
      }
    >
      {children || 'WhatsApp'}
    </Button>
  );
}
