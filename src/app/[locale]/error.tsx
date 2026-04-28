'use client';
import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Page error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center max-w-lg px-6">
        <div className="w-16 h-16 rounded-2xl bg-red-50 border border-red-200 flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>

        <h1 className="font-display font-black uppercase text-3xl text-brand-charcoal mb-3">
          Erreur inattendue
        </h1>
        <p className="font-body text-brand-stone mb-8">
          Une erreur est survenue. Veuillez réessayer ou nous contacter si le problème persiste.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-teal text-brand-charcoal font-body font-semibold rounded-xl hover:bg-brand-teal-dark transition-colors"
          >
            Réessayer
          </button>
          <Link
            href="/fr"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-brand-cloud text-brand-slate font-body font-semibold rounded-xl hover:border-brand-teal hover:text-brand-teal transition-colors"
          >
            Accueil
          </Link>
        </div>

        {process.env.NODE_ENV === 'development' && error.message && (
          <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-xl text-left">
            <p className="font-mono text-xs text-red-600 break-all">{error.message}</p>
          </div>
        )}
      </div>
    </div>
  );
}
