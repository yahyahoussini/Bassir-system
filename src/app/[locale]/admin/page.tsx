import Link from 'next/link';
export default function AdminPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-charcoal">
      <div className="text-center px-6">
        <div className="w-16 h-16 rounded-2xl bg-brand-teal flex items-center justify-center mx-auto mb-6">
          <span className="font-display font-black text-brand-charcoal text-2xl">B</span>
        </div>
        <h1 className="font-display font-black uppercase text-3xl text-white mb-3">Admin</h1>
        <p className="font-body text-brand-stone mb-6">En cours de construction — Étape 09</p>
        <Link href="/fr" className="font-body text-sm text-brand-teal hover:underline">← Accueil</Link>
      </div>
    </div>
  );
}
