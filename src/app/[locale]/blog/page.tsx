import type { Metadata } from 'next';
import Link from 'next/link';
import { getPosts } from '@/lib/db';
import { buildMetadata, generateBreadcrumbSchema, SITE_URL } from '@/lib/seo';
import { JsonLd } from '@/components/seo/JsonLd';
import { BreadcrumbNav } from '@/components/ui/BreadcrumbNav';
import { Container, SectionWrapper } from '@/components/ui/SectionWrapper';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { cn } from '@/lib/utils';
import type { Locale, Post } from '@/types';

interface BlogPageProps {
  params: { locale: Locale };
}

export async function generateMetadata({ params: { locale } }: BlogPageProps): Promise<Metadata> {
  const isAr = locale === 'ar';
  return buildMetadata({
    title: isAr
      ? 'مدونة بصير سيستم | نصائح POS وإدارة التجارة في المغرب'
      : 'Blog Bassir System | Conseils POS et Gestion Commerce Maroc',
    description: isAr
      ? 'مقالات حول برامج نقطة البيع، إدارة التجارة المغربية، اختيار الكاشير، وحلول RFID للحمامات والمسابح.'
      : 'Articles sur les logiciels POS, la gestion du commerce marocain, le choix de caisse enregistreuse, et les solutions RFID pour hammams et piscines.',
    path: '/blog',
    locale,
  });
}

// Static starter posts — shown when DB is empty
const STATIC_POSTS_FR = [
  {
    id: '1', slug: 'meilleur-logiciel-pos-maroc', published: true,
    title_fr: 'Meilleur logiciel POS Maroc 2025 : guide complet pour choisir votre caisse',
    excerpt_fr: 'Comment choisir le bon logiciel de caisse pour votre commerce au Maroc ? Interface arabe, licence à vie, compatibilité matériel... On vous guide.',
    category: 'Logiciel POS', reading_time: 7,
    published_at: '2025-01-15',
    cover_image: null,
  },
  {
    id: '2', slug: 'caisse-enregistreuse-arabe-maroc', published: true,
    title_fr: 'Caisse enregistreuse en arabe au Maroc : pourquoi c\'est essentiel',
    excerpt_fr: 'Pourquoi une caisse enregistreuse avec interface en arabe fait la différence pour votre équipe et vos opérations quotidiennes.',
    category: 'Commerce', reading_time: 5,
    published_at: '2025-01-22',
    cover_image: null,
  },
  {
    id: '3', slug: 'logiciel-hammam-rfid-maroc', published: true,
    title_fr: 'Logiciel hammam et piscine avec RFID au Maroc : tout ce qu\'il faut savoir',
    excerpt_fr: 'Les bracelets RFID révolutionnent la gestion des hammams et piscines au Maroc. Accès contrôlé, paiement cashless, rapports en temps réel.',
    category: 'RFID', reading_time: 6,
    published_at: '2025-02-01',
    cover_image: null,
  },
  {
    id: '4', slug: 'licence-vie-vs-abonnement-pos', published: true,
    title_fr: 'Licence à vie vs abonnement mensuel POS : quel modèle choisir pour votre commerce ?',
    excerpt_fr: 'Analyse complète des deux modèles de tarification pour les logiciels POS au Maroc. Calcul du retour sur investissement sur 3 et 5 ans.',
    category: 'Business', reading_time: 8,
    published_at: '2025-02-10',
    cover_image: null,
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  'Logiciel POS': 'text-brand-teal bg-brand-teal-light',
  'Commerce': 'text-blue-600 bg-blue-50',
  'RFID': 'text-purple-600 bg-purple-50',
  'Business': 'text-amber-600 bg-amber-50',
};

function PostCard({ post, locale }: { post: any; locale: Locale }) {
  const isAr = locale === 'ar';
  const title = isAr && post.title_ar ? post.title_ar : post.title_fr;
  const excerpt = isAr && post.excerpt_ar ? post.excerpt_ar : post.excerpt_fr;
  const date = post.published_at ? new Date(post.published_at).toLocaleDateString(isAr ? 'ar-MA' : 'fr-MA', { year: 'numeric', month: 'long', day: 'numeric' }) : '';

  return (
    <Link href={`/${locale}/blog/${post.slug}`} className="group block h-full">
      <article className="bg-white rounded-brand-lg border border-brand-cloud/60 shadow-card overflow-hidden card-hover h-full flex flex-col">
        {/* Cover */}
        <div className="relative h-48 bg-brand-charcoal overflow-hidden flex-shrink-0">
          {post.cover_image ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={post.cover_image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center zellige-divider">
              <div className="text-center px-6">
                <div className="font-display font-black uppercase text-brand-teal/20 text-5xl leading-none">
                  {title?.substring(0, 2).toUpperCase()}
                </div>
              </div>
            </div>
          )}
          {/* Category badge */}
          {post.category && (
            <div className="absolute top-4 left-4">
              <span className={cn('font-mono text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full font-medium', CATEGORY_COLORS[post.category] ?? 'text-brand-stone bg-brand-cloud')}>
                {post.category}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-1">
          <div className="flex items-center gap-3 mb-3">
            {post.reading_time && (
              <span className="font-mono text-xs text-brand-stone">{post.reading_time} min</span>
            )}
            {date && (
              <>
                <span className="text-brand-cloud">·</span>
                <span className="font-mono text-xs text-brand-stone">{date}</span>
              </>
            )}
          </div>
          <h2 className="font-display font-black uppercase text-lg text-brand-charcoal mb-2 group-hover:text-brand-teal transition-colors duration-200 leading-tight line-clamp-3 flex-1">
            {title}
          </h2>
          <p className="font-body text-sm text-brand-stone leading-relaxed line-clamp-2 mb-4">
            {excerpt}
          </p>
          <div className="flex items-center gap-2 text-brand-teal font-body text-sm font-medium mt-auto">
            <span>{isAr ? 'اقرأ المزيد' : 'Lire la suite'}</span>
            <svg className={cn('w-4 h-4 group-hover:translate-x-1 transition-transform duration-200', isAr && 'rotate-180')} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </article>
    </Link>
  );
}

export default async function BlogPage({ params: { locale } }: BlogPageProps) {
  const isAr = locale === 'ar';
  const dbPosts = await getPosts();
  const posts = dbPosts.length > 0 ? dbPosts : STATIC_POSTS_FR;

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Bassir System', url: `${SITE_URL}/${locale}` },
    { name: isAr ? 'المدونة' : 'Blog', url: `${SITE_URL}/${locale}/blog` },
  ]);

  const blogListingSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: isAr ? 'مدونة بصير سيستم' : 'Blog Bassir System',
    description: isAr ? 'مقالات حول POS والتجارة المغربية' : 'Articles sur le POS et le commerce marocain',
    url: `${SITE_URL}/${locale}/blog`,
    publisher: { '@type': 'Organization', name: 'Bassir System', url: SITE_URL },
    blogPost: posts.map(p => ({
      '@type': 'BlogPosting',
      headline: isAr && (p as any).title_ar ? (p as any).title_ar : p.title_fr,
      url: `${SITE_URL}/${locale}/blog/${p.slug}`,
    })),
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={blogListingSchema} />

      {/* Hero */}
      <div className="bg-brand-charcoal pt-12 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle, #00C9B1 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-brand-teal" />
        <Container className="relative z-10">
          <BreadcrumbNav
            items={[
              { label: 'Bassir System', href: `/${locale}` },
              { label: isAr ? 'المدونة' : 'Blog' },
            ]}
            className="mb-6 [&_span]:text-white/40 [&_a]:text-white/40"
          />
          <h1 className="font-display font-black uppercase leading-none text-5xl sm:text-6xl text-white mb-4">
            {isAr ? 'المدونة' : 'Blog'}<br />
            <span className="text-brand-teal">{isAr ? 'بصير سيستم' : 'Bassir System'}</span>
          </h1>
          <p className="font-body text-lg text-white/60 max-w-xl">
            {isAr
              ? 'نصائح، أدلة وأخبار حول إدارة التجارة وبرامج POS في المغرب.'
              : 'Conseils, guides et actualités sur la gestion du commerce et les logiciels POS au Maroc.'}
          </p>
        </Container>
      </div>

      {/* Articles grid */}
      <SectionWrapper>
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, i) => (
              <ScrollReveal key={post.id} delay={i * 80}>
                <PostCard post={post} locale={locale} />
              </ScrollReveal>
            ))}
          </div>

          {posts.length === 0 && (
            <div className="text-center py-20">
              <div className="font-display font-black uppercase text-4xl text-brand-cloud mb-4">
                {isAr ? 'قريباً' : 'Bientôt'}
              </div>
              <p className="font-body text-brand-stone">
                {isAr ? 'المقالات قيد الإنشاء.' : 'Les articles arrivent bientôt.'}
              </p>
            </div>
          )}
        </Container>
      </SectionWrapper>

      {/* Bottom CTA */}
      <SectionWrapper cloud>
        <Container narrow className="text-center">
          <h2 className="font-display font-black uppercase text-3xl text-brand-charcoal mb-4">
            {isAr ? 'هل أنت مستعد؟' : 'Prêt à démarrer ?'}
          </h2>
          <p className="font-body text-brand-stone mb-6">
            {isAr ? 'تواصل معنا للحصول على عرض تجريبي مجاني.' : 'Contactez-nous pour une démo gratuite.'}
          </p>
          <Link href={`/${locale}/demo`}
            className="inline-flex items-center gap-2 px-8 py-4 bg-brand-teal text-brand-charcoal font-body font-semibold rounded-xl hover:bg-brand-teal-dark transition-colors shadow-brand">
            {isAr ? 'طلب عرض تجريبي مجاني' : 'Demander une démo gratuite'}
          </Link>
        </Container>
      </SectionWrapper>
    </>
  );
}
